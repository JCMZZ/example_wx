package cn.emay.estore.task;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.estore.constant.CommonConstant;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.PeriodTask;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;

/**
 * 状态报告超时处理任务
 *		状态报告丢失，系统异常等情况按超时处理
 */
public class ReportTimeOutHandleTask implements PeriodTask {

	private Logger logger = Logger.getLogger(ReportTimeOutHandleTask.class);
	private RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);

	@Override
	public TaskResult exec(Map<String, String> initParams) {
		try {
			int timeout = CommonConstant.REPORT_TIMEOUT;// 96h
			long endTime = System.currentTimeMillis() - (timeout * 60 * 60 * 1000);
			Set<String> timeOutSet = redis.zrangeByScore(RedisKey.SMS_WAIT_REPORT_ZSET, 0, endTime, 0, 1000);
			if (timeOutSet != null && !timeOutSet.isEmpty()) {
				List<EstoreServiceSmsDetail> updateList = new ArrayList<EstoreServiceSmsDetail>();
				for (String customerId : timeOutSet) {
					// 生成更新数据
					updateList.add(new EstoreServiceSmsDetail(customerId, EstoreServiceSmsDetail.STATE_TIMEOUT, CommonConstant.TIMEOUT_CODE, CommonConstant.TIMEOUT_CODE));
				}
				if (!updateList.isEmpty()) {
					redis.lpush(RedisKey.SMS_UPDATE_DB_QUEUE, -1, updateList.toArray());
					updateList.clear();
				}
				redis.zrem(RedisKey.SMS_WAIT_REPORT_ZSET, timeOutSet.toArray(new String[timeOutSet.size()]));
				redis.hdel(RedisKey.SMS_WAIT_REPORT_HASH, timeOutSet.toArray(new String[timeOutSet.size()]));
			}

			return TaskResult.doBusinessSuccessResult();
		} catch (Exception e) {
			logger.error("【ReportTimeOutHandleTask】出现异常:", e);
			return TaskResult.doBusinessFailResult();
		}
	}

	@Override
	public long period() {
		return 60 * 1000l;// 1min
	}

}
