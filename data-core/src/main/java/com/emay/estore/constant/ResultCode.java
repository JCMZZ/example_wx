package com.emay.estore.constant;

public class ResultCode {

	/*
	 * 系统业务错误
	 */
	public final static String SYS_ERR_TASK_ERROR = "EMY_ERR_SE0001";// TASK发送错误
	public final static String SYS_ERR_NUMBER_NO = "EMY_ERR_SE0002";// 号码无法识别
	public final static String SYS_ERR_ROUTE = "EMY_ERR_SE0003";// 路由配置问题
	public final static String SYS_ERR_GATEWAY = "EMY_ERR_SE0004";// 网关配置问题

	/*
	 * http错误，需要映射
	 */
	public final static String HTTP_ERR_HTTP_URL = "OPER_EMY_ERR_HE0001";// HTTP
																			// URL格式错误
	public final static String HTTP_ERR_ENCODING = "OPER_EMY_ERR_HE0002";// HTTP
																			// 编码错误
	public final static String HTTP_ERR_IO = "OPER_EMY_ERR_HE0003";// HTTP
																	// 超时或者IO错误
	public final static String HTTP_ERR_STATUS = "OPER_EMY_ERR_HE0004";// HTTP
																		// 返回错误状态

	/*
	 * 运营商返回错误
	 */
	public final static String OPER_ERR_RESULT = "OE0002";// 返回代码无法识别
	public final static String OPER_HTTP_ERR = "OE0004";// HTTP 错误
	public final static String ERR_REQUEST_CODE = "E404";// 请求超时
	public final static String ERR_CODE = "E999999";
	// 对外接口
	// 即时返回的信息
	public final static String OUTER_SUCCESS = "M0001";// 成功
	public final static String OUTER_REQUEST_ERROR = "M0002";// 无法解析请求错误
	public final static String OUTER_PACKAGE_ERROR = "M0003";// 套餐选择错误
	public final static String OUTER_IP_ERROR = "M0004";// IP未注册错误
	public final static String OUTER_APPID_ERROR = "M0005";// APPiD不识别错误
	public final static String OUTER_CHECK_ERROR = "M0006";// 解密校验失败错误
	public final static String OUTER_BALANCE_ERROR = "M0007";// 余额不足错误
	public final static String OUTER_NO_NUMBER_ERROR = "M0008";// 无可用号码错误
	public final static String OUTER_REQUEST_NOIN_ERROR = "M0009";// 请求被拒绝错误
	public final static String OUTER_ACCOUNT_ERROR = "M0010";// 账户配置错误
	public final static String OUTER_ETYPE_ERROR = "M0011";// 生效类型错误
	public final static String OUTER_OTHER = "M9999";// 其他错误
	public final static String OUTER_REPERT = "M0012";// 订单重复

	// 回调，单个原因
	public final static String N0001 = "N0001";// 成功
	public final static String N0002 = "N0002";// 运营商方面异常
	public final static String N0003 = "N0003";// 系统异常
	public final static String N0004 = "N0004";// 已成功提交运营商了，等待运营商返回结果

	// 不支持发送
	public final static String ERR_NOT_SUPPORT_SEND = "EMY_CHARGE_001"; // 不支持发送
	public final static String ERR_NOT_ENOUGH_MONEY = "EMY_CHARGE_002";// 余额不足错误

	// 万恒专用-下单接口订单代码
	public final static String OUTER_SUCCESS_WH = "200";// 提交成功
	public final static String OUTER_ORDERID_ERROR_WH = "201";// 订单已存在
	public final static String OUTER_PARAMETER_ERROR_WH = "400";// 缺少必需参数
	public final static String OUTER_SIGN_ERROR_WH = "401";// 签名错误
	public final static String OUTER_PACKAGE_ERROR_WH = "402";// 流量包未开通
	public final static String OUTER_MOBILE_ERROR_WH = "403";// 手机号码错误
	public final static String OUTER_BALANCE_ERROR_WH = "404";// 余额不足
	public final static String OUTER_IP_ERROR_WH = "405";// IP受限
	public final static String OUTER_TOKEN_ERROR_WH = "406";// token无效
	public final static String OUTER_OTHER_ERROR_WH = "500";// 其他错误
	public final static String OUTER_GATEWAY_ERROR_WH = "501";// 通道维护
	public final static String OUTER_SYS_ERROR_WH = "502";// 系统维护

	// 万恒专用-查询接口订单代码
	public final static String QUERY_ORDER_FAIL_WH = "100";// 充值失败,回调响应也用
	public final static String QUERY_ORDER_SUCCESS_WH = "200";// 充值成功,回调响应也用
	public final static String QUERY_ORDER_ING_WH = "202";// 充值中
	public final static String QUERY_ORDER_ERROR_WH = "203";// 订单未存在
	
	//腾讯平台错误码
	public final static String OUTER_SUCCESS_TX = "0x000";// 提交成功
	public final static String OUTER_ERRORSPID_TX = "0x1f0";// 错误的SPID
	public final static String OUTER_ANTHERROR_TX = "0x1f8";// 用户鉴权失败
	public final static String OUTER_ERROR_TX = "0x1fb";// 系统错误
	public final static String OUTER_NOUSER_TX = "0x1fc";// 无效的用户
	public final static String OUTER_NOTOKEN_TX = "0x1fd";// 无效的Token
	
	//腾讯业务错误码
	public final static String OUTER_LESS_PARAMETER_TX = "01";// 缺少必需参数
	public final static String OUTER_ERROR_SIGN_TX = "02";// sign字段检验失败

	
	//腾讯直充状态
	public final static String OUTER_NOT_ORDER_TX = "ORDER_NOT_EXIST";//一般是腾讯公司查询订单不存在时返回。
	public final static String OUTER_ORDER_SUCCESS_TX = "SUCCESS";// 充值成功，用户帐户已获得充值
	public final static String OUTER_ORDER_FAILED_TX = "ORDER_FAILED";// 等待发货中，用户已经付款，在供货商侧下单失败
	public final static String OUTER_UNDERWAY_TX = "UNDERWAY";// 充值中，运营商已接受请求，但未返回成功充值结果；
	public final static String OUTER_REQUEST_FAILED_TX = "REQUEST_FAILED";// 一般在接口联调时出现，参数错误缺少或签名验证失败（注意：缺货情况不是返回这个错误，而是需要接收订单，退款处理）
	public final static String OUTER_REFUND_PROCESS_TX = "REFUND_PROCESS";// 退款中
	public final static String OUTER_REFUND_SUCCESS_TX = "REFUND_SUCCESS";// 退款成功
	public final static String OUTER_REFUND_AFTER_SUCCESS_TX = "REFUND_AFTER_SUCCESS";// 交易成功转退款
	public final static String OUTER_UNKOWN_STATE_TX = "UNKOWN_STATE";// 未知状态
	

}
