package cn.emay.estore.task;

import java.util.Map;

import org.apache.log4j.Logger;

import com.emay.estore.constant.RedisKey;

import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.json.JsonHelper;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.estore.constant.CommonConstant;
import cn.emay.sdk.client.SmsSDKClient;
import cn.emay.sdk.core.dto.sms.common.ResultModel;
import cn.emay.sdk.core.dto.sms.request.ReportRequest;
import cn.emay.sdk.core.dto.sms.response.ReportResponse;
import cn.emay.task.core.common.TaskResult;
import cn.emay.task.core.define.PeriodTask;

/**
 * @author IYU
 * @date 2018年6月4日
 * 
 */

public class EstoreGetReportTask implements PeriodTask {
	private Logger logger = Logger.getLogger(EstoreGetReportTask.class);
	private RedisClient redis = BeanFactoryUtils.getBean(RedisClient.class);

	@Override
	public TaskResult exec(Map<String, String> arg0) {
		try {
			SmsSDKClient client = CommonConstant.SMS_SDK_CLIENT;
			ReportRequest request = new ReportRequest();
			ResultModel<ReportResponse[]> result = client.getReport(request);
			if ("SUCCESS".equals(result.getCode())) {
				ReportResponse[] responses = result.getResult();
				if (responses.length == 0) {
					return TaskResult.notDoBusinessResult();
				}
				logger.info("调用短信状态报告获取SDK接口成功，响应数据：" + JsonHelper.toJsonString(responses));
				for (ReportResponse response : responses) {
					redis.lpush(RedisKey.SMS_REPORT_QUEUE, response, -1);
				}
			} else {
				logger.info("调用短信状态报告获取SDK接口失败");
				return TaskResult.doBusinessFailResult();
			}
			return TaskResult.doBusinessSuccessResult();
		} catch (Exception e) {
			logger.info("调用短信状态报告获取SDK接口报错:" + e);
			return TaskResult.notDoBusinessResult();
		}

	}

	@Override
	public long period() {
		// TODO Auto-generated method stub
		return 1000 * 5l;
	}
}
