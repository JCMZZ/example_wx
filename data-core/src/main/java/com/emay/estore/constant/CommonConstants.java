package com.emay.estore.constant;

import cn.emay.util.PropertiesUtil;


public class CommonConstants {

	public final static String SESSION_ID = "EMSD";
	public final static String TOKEN_ID = "TCDI";

	public static final String SESSION_COOKIES_ID = "e_m_f_p_s";
	public static final String CHAR_SET_UTF8 = "UTF-8";
	public static String WEB_CONFIG_PATH = "webConfig.properties";

	public static String APPID;
	public static String APPSECRET;
	public static String KEY;// 你的商户的api秘钥
	public static String MCH_ID;// 商户号
	public static String UNIFIEDORDER_URL;// 统一下单地址
	public static String NOTIFY_URL;// 回调地址
	
	/* 商店图片上限 */
	public static final Integer STORE_IMG_MAX = 5;
	
	/* 文件存放基础路径 */
	public static String IMG_BASE_PATH;
	/* 文件存放路径 */
	public final static String STOREIMGPATH = "img/store/";//+storeid
	public final static String HEADIMGPATH_C = "img/head/c/";//+customerid
	public final static String HEADIMGPATH_B = "img/head/b/";//+adminid
	public final static String GOODSIMGPATH = "img/goods/";//+storeid+goodsid
	public final static String STOREDATAPATH = "img/data/";//+storeid

	/* 图片支持类型 */
	public static final String IMGTYPE = "jpg,png,jpeg";

	/* 图片大小上限 */
	public static final Integer IMGMAXSIZE = 1024 * 1024;

	/* 默认三张卡片 */
	public static final String GOLD = "金";
	public static final String SILVER = "银";
	public static final String COPPER = "铜";

	/* 默认三张卡片等级 */
	public static final int GOLD_LV = 3;
	public static final int SILVER_LV = 2;
	public static final int COPPER_LV = 1;

	/* 默认卡片说明 */
	public static final String CARD_DESC = "1：持卡可以享受会员的尊贵服务，消费时请主动出示此卡；\n" + 
			"2：此卡为储值/积分卡，请妥善保管，若有遗失请及时到本店挂失补办；\n" + 
			"3：此卡一经办理非店方原因，不找零、不提现、不退换；\n" + 
			"4：此卡为实名制会员卡，仅限本人使用不可转借他人。";
	// 小程序登录态有效时长--7天
	public static int LOGIN_EXPIRY_TIME = 7;
	// 短信发送量统计有效时长--1天
	public static int SMS_COUNT_EXPIRY_TIME = 1;
	// 注册验证码有效时长--30min
	public static int CODE_EXPIRY_TIME =  30;
	
	//每个IP每天发送短信数量
	public static int IP_DAY_SEND_NUM =  10;
	//每个手机号每天发送短信数量
	public static int MOBILE_DAY_SEND_NUM = 3;
	
	//短信发送相关
	public static String SMS_APPID;//亿美服务帐号
	public static String SMS_SECRETKEY;//亿美服务密码
	public static String SMS_IP;//亿美网关IP
	public static int SMS_PORT;//亿美网关端口
	
	public static String SEND_MESSAGE_SCENE;//判断短信发送是测试或者真实发送
	
	private static void init() {
		try {
			APPID = PropertiesUtil.getProperty("miniprogram.appId", WEB_CONFIG_PATH);
			APPSECRET = PropertiesUtil.getProperty("miniprogram.appSecret", WEB_CONFIG_PATH);
			IMG_BASE_PATH = PropertiesUtil.getProperty("img_base_path", WEB_CONFIG_PATH);
			
			LOGIN_EXPIRY_TIME = PropertiesUtil.getIntProperty("login_expiry_time", WEB_CONFIG_PATH, 7);
			LOGIN_EXPIRY_TIME = LOGIN_EXPIRY_TIME * 24 * 60 * 60;//转换为秒，redis超时时间
			
			SMS_COUNT_EXPIRY_TIME = PropertiesUtil.getIntProperty("sms_count_expiry_time", WEB_CONFIG_PATH, 1);
			SMS_COUNT_EXPIRY_TIME =  SMS_COUNT_EXPIRY_TIME * 24 * 60 * 60;//转换为秒，redis超时时间
			
			CODE_EXPIRY_TIME = PropertiesUtil.getIntProperty("code_expiry_time", WEB_CONFIG_PATH, 30);
			CODE_EXPIRY_TIME =  CODE_EXPIRY_TIME * 60;//转换为秒，redis超时时间
			
			IP_DAY_SEND_NUM = PropertiesUtil.getIntProperty("ip_day_send_num", WEB_CONFIG_PATH, 10);
			MOBILE_DAY_SEND_NUM = PropertiesUtil.getIntProperty("mobile_day_send_num", WEB_CONFIG_PATH, 3);
			
			KEY = PropertiesUtil.getProperty("miniprogram.key", WEB_CONFIG_PATH);
			MCH_ID = PropertiesUtil.getProperty("miniprogram.mch_id", WEB_CONFIG_PATH);
			UNIFIEDORDER_URL = PropertiesUtil.getProperty("miniprogram.unifiedorder_url", WEB_CONFIG_PATH);
			NOTIFY_URL = PropertiesUtil.getProperty("miniprogram.notify_url", WEB_CONFIG_PATH);
			
			SMS_APPID = PropertiesUtil.getProperty("sms.appId", WEB_CONFIG_PATH);
			SMS_SECRETKEY = PropertiesUtil.getProperty("sms.secretkey", WEB_CONFIG_PATH);
			SMS_IP = PropertiesUtil.getProperty("sms.ip", WEB_CONFIG_PATH);
			SMS_PORT = PropertiesUtil.getIntProperty("sms.port", WEB_CONFIG_PATH,80);
			
			SEND_MESSAGE_SCENE = PropertiesUtil.getProperty("send.message.scene", WEB_CONFIG_PATH);
			
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(-1);
		}
	}

	static {
		init();
	}

}
