package cn.emay.estore.init;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;


import cn.emay.estore.constant.CommonConstant;
import cn.emay.sdk.client.SmsSDKClient;
import cn.emay.sdk.util.exception.SDKParamsException;
import cn.emay.task.core.TaskManager;


public class InitService {

	private Logger logger = Logger.getLogger(InitService.class);

	// 是否已经初始化
	private static boolean isInited = false;

	public void init() {
		CommonConstant.CACHE_DATA_INIT_TIME = System.currentTimeMillis();
		initSmsSDKClient();
		initBaseData();
	}

	/**
	 * 用户初始化
	 */
	private void initBaseData() {

		TaskManager.getInstance().newTaskScheduler("BusinessTask", "business-emay-task.xml");
	}

	public void destroy() {
		isInited = false;
		CommonConstant.SMS_SDK_CLIENT = null;
		TaskManager.getInstance().getTaskScheduler("BusinessTask").destory();
	}

	public synchronized void initSmsSDKClient() {
		if (isInited == true) {
			return;
		}
		try {
			//判断短信发送是测试或者真实发送
			if(!StringUtils.isEmpty(CommonConstant.SEND_MESSAGE_SCENE) && CommonConstant.SEND_MESSAGE_SCENE.toLowerCase().equals("test")){
				CommonConstant.SMS_SDK_CLIENT  = new SmsSDKClient(CommonConstant.SMS_IP, CommonConstant.SMS_PORT, CommonConstant.SMS_APPID,CommonConstant.SMS_SECRETKEY);
			}else{
				CommonConstant.SMS_SDK_CLIENT  = new SmsSDKClient(CommonConstant.SMS_APPID,CommonConstant.SMS_SECRETKEY);
			}
			CommonConstant.SMS_SDK_CLIENT = new SmsSDKClient(CommonConstant.SMS_IP, CommonConstant.SMS_PORT, CommonConstant.SMS_APPID,CommonConstant.SMS_SECRETKEY);
		} catch (SDKParamsException e) {
			logger.error("SmsSDKClient实例化异常：", e);
		}
		isInited = true;
	}
}
