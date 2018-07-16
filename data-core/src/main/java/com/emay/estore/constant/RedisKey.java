package com.emay.estore.constant;

public class RedisKey {
	
	public static final int EXPIRED_TIME = -1;
	
	//自主营销批次用户Hash
	public static final String OWN_BATCH_USER_HASH = "OWN_BATCH_USER_HASH";
	//login sessionId
	public static final String LOGIN_SESSION_PREFIX = "LOGIN_SESSION_";
	//每个ip发送短信数量
	public static final String IP_SEND_NUM_PREFIX = "IP_SEND_NUM_";
	//每个手机号发送短信数量
	public static final String MOBILE_SEND_NUM_PREFIX = "MOBILE_SEND_NUM_";
	//注册验证码
	public static final String CODE_PREFIX = "CODE_";
	
	/**
	 * 微信支付订单待对比hash
	 */
	public static final String WX_ORDER_HASH = "WX_ORDER_HASH";
	
	//服务待发队列
	public static final String SMS_SERVICE_WAIT_SEND_QUEUE = "SMS_SERVICE_WAIT_SEND_QUEUE";
	//短信发送详情入库队列
	public static final String SMS_SAVE_DB_QUEUE = "SMS_SAVE_DB_QUEUE";
	//待比对状态报告hash
	public static final String SMS_WAIT_REPORT_HASH = "SMS_WAIT_REPORT_HASH";
	//短信详情更新状态队列
	public static final String SMS_UPDATE_DB_QUEUE = "SMS_UPDATE_DB_QUEUE";
	//状态报告超时检测zset
	public static final String SMS_WAIT_REPORT_ZSET = "SMS_WAIT_REPORT_ZSET";
	///短信发送详情已入库Hash-判断是否可更新
	public static final String SMS_SAVE_DB_HASH = "SMS_SAVE_DB_HASH";
	//状态报告队列
	public static final String SMS_REPORT_QUEUE = "SMS_REPORT_QUEUE";
	
	
	
	
	
}
