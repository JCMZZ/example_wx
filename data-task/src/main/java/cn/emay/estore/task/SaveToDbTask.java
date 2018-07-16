package cn.emay.estore.task;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;
import com.emay.estore.service.estore.EstoreServiceSmsDetailService;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.estore.constant.CommonConstant;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.ConcurrentPeriodTask;

/**
 * 
 * 入库任务
 *
 */
public class SaveToDbTask implements ConcurrentPeriodTask{
	
	private Logger logger = Logger.getLogger(SaveToDbTask.class);
	private EstoreServiceSmsDetailService estoreServiceSmsDetailService = BeanFactoryUtils.getBean(EstoreServiceSmsDetailService.class);
	private RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);
	private int saveNum = CommonConstant.ONCE_SAVE_DB_NUM;

	@Override
	public TaskResult exec(Map<String, String> initParams) {
		List<EstoreServiceSmsDetail> saveList = new ArrayList<EstoreServiceSmsDetail>();
		Map<String,Object> saveMap = new HashMap<String,Object>();
		try {
			for(int i = 0;i< saveNum;i++){
				EstoreServiceSmsDetail smsDetail = redis.rpop(RedisKey.SMS_SAVE_DB_QUEUE, EstoreServiceSmsDetail.class);
				if(smsDetail == null){
					break;
				}
				saveList.add(smsDetail);
				saveMap.put(smsDetail.getCustomerId(), smsDetail.getCustomerId());
			}
			if (!saveList.isEmpty()) {
				estoreServiceSmsDetailService.saveBatchSmsDetail(saveList);
				//短信发送详情已入库Hash-判断是否可更新
				redis.hmset(RedisKey.SMS_SAVE_DB_HASH, saveMap, -1);
				saveList.clear();
				saveMap.clear();
			}
			
			return TaskResult.doBusinessSuccessResult();
		} catch (Exception e) {
			logger.error("【SaveToDbTask】数据入库任务出现异常，数据回滚", e);
			//回滚
			if(!saveList.isEmpty()){
				redis.lpush(RedisKey.SMS_SAVE_DB_QUEUE, -1, saveList.toArray());
			}
			if(!saveMap.isEmpty()){
				Set<String> keySet = saveMap.keySet();
				redis.hdel(RedisKey.SMS_SAVE_DB_HASH, keySet.toArray(new String[keySet.size()]));
			}
			return TaskResult.doBusinessFailResult();
		}
	}
	
	@Override
	public long period() {
		long size = redis.llen(RedisKey.SMS_SAVE_DB_QUEUE);
		if (size > 0) {
			return 50l;
		} else {
			return 1000l;
		}
	}

	@Override
	public int needConcurrent(int alive, int min, int max) {
		long size = redis.llen(RedisKey.SMS_SAVE_DB_QUEUE);
		Long num = size / saveNum;
		if (num == 0) {
			return 1;
		}
		return num.intValue();
	}
}

