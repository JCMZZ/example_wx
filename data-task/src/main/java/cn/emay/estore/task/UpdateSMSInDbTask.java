package cn.emay.estore.task;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;
import com.emay.estore.service.estore.EstoreServiceSmsDetailService;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.PeriodTask;

public class UpdateSMSInDbTask implements PeriodTask {

	private static final Logger logger = Logger.getLogger(UpdateSMSInDbTask.class);
	private static RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);
	private static EstoreServiceSmsDetailService estoreServiceSmsDetailService = BeanFactoryUtils.getBean(EstoreServiceSmsDetailService.class);
	private static int breakNum = 1000;

	@Override
	public long period() {
		int size = redis.llen(RedisKey.SMS_UPDATE_DB_QUEUE).intValue();
		if (size > 0) {
			return 50L;
		} else {
			return 1000l;
		}
	}

	@Override
	public TaskResult exec(Map<String, String> initParams) {
		List<EstoreServiceSmsDetail> list = new ArrayList<EstoreServiceSmsDetail>();
		List<EstoreServiceSmsDetail> rollBackList = new ArrayList<EstoreServiceSmsDetail>();
		List<String> delList = new ArrayList<String>();
		Long startTime = System.currentTimeMillis();
		try {
			for (int i = 0; i < breakNum; i++) {
				EstoreServiceSmsDetail rpop = redis.rpop(RedisKey.SMS_UPDATE_DB_QUEUE, EstoreServiceSmsDetail.class);
				if (null == rpop) {
					break;
				}
				boolean isSave = redis.hexists(RedisKey.SMS_SAVE_DB_HASH, rpop.getCustomerId());
				if (isSave) {
					list.add(rpop);
					if (rpop.getState() == EstoreServiceSmsDetail.STATE_SUCCESS || rpop.getState() == EstoreServiceSmsDetail.STATE_FAIL || rpop.getState() == EstoreServiceSmsDetail.STATE_TIMEOUT) {
						delList.add(rpop.getCustomerId());
					}
				} else {
					rollBackList.add(rpop);
					logger.info("【UpdateSMSInDbTask】 更新订单 CustomerId:" + rpop.getCustomerId() + "订单主对象未入库，回滚订单，订单状态：" + rpop.getState());
				}
			}
			if (rollBackList.size() > 0) {
				for (EstoreServiceSmsDetail detail : rollBackList) {
					redis.lpush(RedisKey.SMS_UPDATE_DB_QUEUE, detail, -1);
				}
			}
			try {
				if (list.size() > 0) {
					estoreServiceSmsDetailService.updateSmsDetail(list);
					for (String string : delList) {
						redis.hdel(RedisKey.SMS_SAVE_DB_HASH, string);
					}
					logger.info("【UpdateSMSInDbTask】更新状态" + list.size() + "条数据,用时" + (System.currentTimeMillis() - startTime) + "毫秒");
					delList.clear();
					list.clear();
				}
			} catch (Exception e) {
				logger.error("【UpdateSMSInDbTask】更新任务异常,数据回滚", e);
				if (list.size() > 0) {// 数据回滚
					for (EstoreServiceSmsDetail detail : list) {
						redis.lpush(RedisKey.SMS_UPDATE_DB_QUEUE, detail, -1);
					}
				}
			}
			return TaskResult.doBusinessSuccessResult();
		} catch (Exception e) {
			logger.info("【UpdateSMSInDbTask】数据入库失败", e);
			return TaskResult.doBusinessFailResult();
		}
	}
}