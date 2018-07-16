package cn.emay.estore.task;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.json.JsonHelper;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.estore.constant.CommonConstant;
import cn.emay.eucp.common.support.OnlyIdGenerator;
import cn.emay.sdk.client.SmsSDKClient;
import cn.emay.sdk.core.dto.sms.common.CustomSmsIdAndMobile;
import cn.emay.sdk.core.dto.sms.common.ResultModel;
import cn.emay.sdk.core.dto.sms.request.SmsBatchRequest;
import cn.emay.sdk.core.dto.sms.response.SmsResponse;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.ConcurrentPeriodTask;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.dto.estore.sms.MobileInfoDTO;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;
import com.emay.estore.service.estore.EstoreCustomerService;
import com.emay.estore.service.estore.EstoreServiceSmsBatchService;

/**
 * 
 * 短信发送任务
 *
 */
public class SmsSendTask implements ConcurrentPeriodTask {

	private Logger logger = Logger.getLogger(SmsSendTask.class);
	private RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);
	private EstoreCustomerService estoreCustomerService = BeanFactoryUtils.getBean(EstoreCustomerService.class);
	private EstoreServiceSmsBatchService estoreServiceSmsBatchService = BeanFactoryUtils.getBean(EstoreServiceSmsBatchService.class);
	private long period = 1000l;//1s

	@Override
	public TaskResult exec(Map<String, String> initParams) {
		String serviceId = redis.rpop(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE);
		try {
			if (StringUtils.isEmpty(serviceId)) {
				 period = 1000l;
				return TaskResult.notDoBusinessResult();
			}
			EstoreServiceSmsBatch batch = estoreServiceSmsBatchService.findByServiceId(Long.valueOf(serviceId));
			if (batch == null) {
				logger.error("数据库中没有服务id：" + serviceId + "的批次信息");
				return TaskResult.notDoBusinessResult();
			}
			// 判断号码文件是否存在
			Boolean isExist = false;
			String path = CommonConstant.MOBILE_FILE_PATH + File.separator + serviceId;
			File file = new File(path);
			File mobileFile = null;
			if (file.exists()) {
				File[] fileArr = file.listFiles();
				if (fileArr != null && fileArr.length > 0) {
					isExist = true;
					mobileFile = fileArr[0];
				}
			}
			List<MobileInfoDTO> mobileInfoList = null;
			if (!isExist) {
				// 若文件不存在，则从redis中获取自主营销服务信息
				String customUserIds = redis.hget(RedisKey.OWN_BATCH_USER_HASH, serviceId);
				if (StringUtils.isEmpty(customUserIds)) {
					logger.error("服务id：" + serviceId + "没有发送号码详情信息");
					return TaskResult.notDoBusinessResult();
				}
				List<Long> customUserIdList = new ArrayList<Long>();
				for(String cid :customUserIds.split(",")){
					customUserIdList.add(Long.valueOf(cid));
				}
				mobileInfoList = estoreCustomerService.findByCustomerIds(customUserIdList);
			} else {
				// 号码文件存在，则为新客、老客推荐服务
				try{
					mobileInfoList = parseTxt(mobileFile);
				} catch(Exception ex){
					logger.error("【SmsSendTask】文件解析出现异常:", ex);
					// 回滚
					redis.lpush(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE, serviceId, -1);
					return TaskResult.doBusinessFailResult();
				}
				
			}
			if (mobileInfoList == null || mobileInfoList.isEmpty()) {
				logger.error("服务id：" + serviceId + "没有发送号码详情信息");
				return TaskResult.notDoBusinessResult();
			}

			List<EstoreServiceSmsDetail> saveSmsDetailList = new ArrayList<EstoreServiceSmsDetail>();
			// 调用短信发送SDK接口
			SmsSDKClient client = CommonConstant.SMS_SDK_CLIENT;
			CustomSmsIdAndMobile[] cm = new CustomSmsIdAndMobile[mobileInfoList.size()];// 不考虑批次数量大于SDK接口批次最大数量(1000)的情况
			int i = 0;
			Date time = new Date();
			for (MobileInfoDTO dto : mobileInfoList) {
				String customSmsId = OnlyIdGenerator.genOnlyId(CommonConstant.SMS_INTERFACE_CODE);
				cm[i] = new CustomSmsIdAndMobile(customSmsId, dto.getMobile());
				saveSmsDetailList.add(new EstoreServiceSmsDetail(batch.getId(), dto.getId(), dto.getMobile(), customSmsId,time,EstoreServiceSmsDetail.STATE_SENDING,time));
				i++;
			}
			String content = batch.getContent();
			SmsBatchRequest request = new SmsBatchRequest(cm, content, null, null);
			long startTime = System.currentTimeMillis();
			ResultModel<SmsResponse[]> result = client.sendBatchSms(request);
			long endTime = System.currentTimeMillis();
			logger.info("短信SDK接口sendBatchSms耗时：" +(endTime - startTime)+ " ms");

			if (result.getCode().equals("SUCCESS")) {
				SmsResponse[] responses = result.getResult();
				logger.info("调用短信发送SDK接口成功，响应数据：" + JsonHelper.toJsonString(responses));
				Map<String, Object> responseMap = new HashMap<String, Object>();
				Map<String, Double> zestMap = new HashMap<String, Double>();
				long number = 1l;
				for (SmsResponse smsResponse : responses) {
					responseMap.put(smsResponse.getCustomSmsId(), smsResponse);
					zestMap.put(smsResponse.getCustomSmsId(), Double.valueOf((System.currentTimeMillis() + (number++))));
				}
				// 短信发送详情入库队列
				redis.lpush(RedisKey.SMS_SAVE_DB_QUEUE, -1, saveSmsDetailList.toArray());
				// 入待比对状态报告hash
				redis.hmset(RedisKey.SMS_WAIT_REPORT_HASH, responseMap, -1);
				// 状态报告超时检测zset
				redis.zadd(RedisKey.SMS_WAIT_REPORT_ZSET, zestMap);
				if(!isExist){
					//删除自主营销服务信息
					redis.hdel(RedisKey.OWN_BATCH_USER_HASH, serviceId);
				}
			} else {
				logger.info("调用短信发送SDK接口失败，code：" + result.getCode());
				// 回滚
				redis.lpush(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE, serviceId, -1);
			}
			 period = 50l;
			return TaskResult.doBusinessSuccessResult();
		} catch (Exception e) {
			logger.error("【SmsSendTask】出现异常:", e);
			// 回滚
			redis.lpush(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE, serviceId, -1);
			return TaskResult.doBusinessFailResult();
		}

	}

	@Override
	public int needConcurrent(int alive, int min, int max) {
		return redis.llen(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE).intValue();
	}

	@Override
	public long period() {
		return period;
	}

	/**
	 * 解析Txt
	 * 
	 * @return
	 */
	private List<MobileInfoDTO> parseTxt(File file) {
		List<MobileInfoDTO> dtoList = new ArrayList<MobileInfoDTO>();
		BufferedReader reader = null;
		try {
			InputStreamReader inReader = new InputStreamReader(new FileInputStream(file), "gbk");
			reader = new BufferedReader(inReader);
			String line = reader.readLine();
			if (line != null && !"".equals(line.trim())) {
				while (line != null) {
					if (line != null && !"".equals(line.trim())) {
						line = line.trim();
						String[] lineArr = null;
						Long customerId = null;
						String mobile = "";
						lineArr = line.split(",", 2);// 手机号，customerId
						if (!StringUtils.isEmpty(lineArr[0])) {
							mobile = lineArr[0];
						}
						if (lineArr.length > 1 && !StringUtils.isEmpty(lineArr[1])) {
							customerId = Long.valueOf(lineArr[1]);
						}
						dtoList.add(new MobileInfoDTO(customerId, mobile));
					}
					line = reader.readLine();
				}
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (reader != null) {
					reader.close();
				}
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		return dtoList;
	}

}
