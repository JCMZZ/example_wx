package cn.emay.estore.constant;

import cn.emay.sdk.client.SmsSDKClient;
import cn.emay.util.PropertiesUtil;

public class CommonConstant {

	// 服务号码文件路径
	public static final String MOBILE_FILE_PATH = PropertiesUtil.getProperty("service.mobile.file.path", "estore.service.properties");
	// 亿美服务帐号
	public static final String SMS_APPID = PropertiesUtil.getProperty("sms.appId", "estore.service.properties");
	// 亿美服务密码
	public static final String SMS_SECRETKEY = PropertiesUtil.getProperty("sms.secretkey", "estore.service.properties");
	// 亿美网关IP
	public static final String SMS_IP = PropertiesUtil.getProperty("sms.ip", "estore.service.properties");
	// 亿美网关端口
	public static final int SMS_PORT = PropertiesUtil.getIntProperty("sms.port", "estore.service.properties", 80);
	// 短信SDK接口每批次可提交的最大手机号数量
	public static final int MAX_MOBILE = PropertiesUtil.getIntProperty("sms.sdk.interface.max.mobile", "estore.service.properties", 1000);
	//短信接口代码-生成唯一标识
	public static final String SMS_INTERFACE_CODE = PropertiesUtil.getProperty("sms.interface.code", "estore.service.properties");
	//设置状态报告超时处理时间-4天（短信状态报告超时为3天，此处设置比短信超时时间长）
	public static final int REPORT_TIMEOUT = PropertiesUtil.getIntProperty("report.timeout", "estore.service.properties", 96);
	
	public static final String SEND_MESSAGE_SCENE = PropertiesUtil.getProperty("send.message.scene", "estore.service.properties");

	// 缓存数据初始化时间
	public static long CACHE_DATA_INIT_TIME;
	// SDK客户端
	public static SmsSDKClient SMS_SDK_CLIENT;
	
	//每次保存到数据库数量
	public static final int ONCE_SAVE_DB_NUM = 1000;
	//状态报告超时code
	public static String TIMEOUT_CODE = "TIMEOUT";

}
