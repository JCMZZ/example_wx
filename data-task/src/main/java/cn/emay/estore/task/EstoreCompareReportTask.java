package cn.emay.estore.task;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.json.JsonHelper;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.sdk.core.dto.sms.response.ReportResponse;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.ConcurrentPeriodTask;

/**
 * @author IYU
 * @date 2018年6月4日
 * 
 */

public class EstoreCompareReportTask implements ConcurrentPeriodTask {
	private static Logger logger = Logger.getLogger(EstoreCompareReportTask.class);
	private RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);
	Long period = 5L;

	@Override
	public TaskResult exec(Map<String, String> initParams) {
		TaskResult taskResult = compareReport();
		if (!taskResult.isRunBusiness()) {
			period = 3000L;
		} else {
			period = 5L;
		}

		return taskResult;
	}

	@Override
	public int needConcurrent(int aliveNodeNumber, int min, int maxNodeNumber) {
		int count = redis.llen(RedisKey.SMS_REPORT_QUEUE).intValue();
		if (count < 1) {
			return 1;
		}
		logger.info("CompareReportTask-needConcurrent:" + count);
		return count / 200;
	}

	public TaskResult compareReport() {
		ReportResponse response = null;
		try {
			// 状态报告队列拿一条数据
			String json = redis.rpop(RedisKey.SMS_REPORT_QUEUE);
			if (StringUtils.isNotBlank(json)) {
				response = JsonHelper.fromJson(ReportResponse.class, json);
			}
			if (response != null) {
				if (response.getCustomSmsId() == null) {
					logger.info("compareReport，对比CustomSmsId为空：" + JsonHelper.toJsonString(response));
					return TaskResult.doBusinessFailResult();
				}
				// 从提供给对比状态报告的hash中判断是否已经回来过状态报告
				if (redis.hexists(RedisKey.SMS_WAIT_REPORT_HASH, response.getCustomSmsId())) {
					EstoreServiceSmsDetail detail = new EstoreServiceSmsDetail();
					detail.setCustomerId(response.getCustomSmsId());
					detail.setResponseMessage(response.getDesc());
					detail.setResponseCode(response.getState());
					if ("DELIVRD".equals(response.getState())) {// 成功
						detail.setState(EstoreServiceSmsDetail.STATE_SUCCESS);
					} else if ("TIMEOUT".equals(response.getState())) {// 超时
						detail.setState(EstoreServiceSmsDetail.STATE_TIMEOUT);
					} else {
						detail.setState(EstoreServiceSmsDetail.STATE_FAIL);
					}
					redis.lpush(RedisKey.SMS_UPDATE_DB_QUEUE, detail, -1);
					logger.info(response.getCustomSmsId() + "compareReport done");
					return TaskResult.doBusinessSuccessResult();
				} else {
					logger.info(response.getCustomSmsId() + "compareReport，已经有状态报告！");
					return TaskResult.doBusinessSuccessResult();
				}
			} else {
				logger.debug("compareReport 没有待对比的状态报告！");
				return TaskResult.notDoBusinessResult();
			}
		} catch (Exception e) {
			period = 5000L;
			e.printStackTrace();
			if (null != response) {
				logger.info("compareReport，对比CustomSmsId为空：" + JsonHelper.toJsonString(response));
			}
			return TaskResult.doBusinessFailResult();
		}
	}

	@Override
	public long period() {
		return period;
	}
}
