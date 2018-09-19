package com.emay.estore.web.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.encryption.Base64;
import cn.emay.common.http.client.EmayHttpClient;
import cn.emay.common.http.common.EmayHttpResultCode;
import cn.emay.common.http.request.impl.EmayHttpRequestKV;
import cn.emay.common.http.response.impl.bytes.EmayHttpResponseBytes;
import cn.emay.common.http.response.impl.bytes.EmayHttpResponseBytesPraser;
import cn.emay.common.json.JsonHelper;
import cn.emay.sdk.client.SmsSDKClient;
import cn.emay.sdk.core.dto.sms.common.ResultModel;
import cn.emay.sdk.core.dto.sms.request.SmsSingleRequest;
import cn.emay.sdk.core.dto.sms.response.SmsResponse;
import cn.emay.sdk.util.exception.SDKParamsException;
import cn.emay.util.DateUtil;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.constant.RedisKey;
import com.emay.estore.dto.estore.user.EstoreCacheUserDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerDTO;
import com.emay.estore.dto.estore.wx.ThirdSession;
import com.emay.estore.dto.estore.wx.WxAuthResultDTO;
import com.emay.estore.dto.estore.wx.WxUserInfoDTO;
import com.emay.estore.pojo.estore.EstoreUser;
import com.emay.estore.service.estore.EstoreCustomerService;
import com.emay.estore.service.estore.EstoreUserService;
import com.emay.estore.util.AESUtil;
import com.emay.estore.util.RandomNumberUtils;
import com.emay.estore.util.RegularCheckUtils;
import com.emay.estore.web.utils.WebUtils;

@Controller
public class LoginController {

	private Logger log = Logger.getLogger(LoginController.class);

	@Resource
	private EstoreUserService estoreUserService;
	@Resource
	private EstoreCustomerService estoreCustomerService;
	@Resource
	private RedisClient redis;

	/**
	 * 微信授权
	 */
	@RequestMapping("/wxLoginAuth")
	public void wxLoginAuth(HttpServletRequest request, HttpServletResponse response) {
		String code = RequestUtils.getParameter(request, "code");// 临时登录凭证code
		log.info("code:" + code);
		String rawData = RequestUtils.getParameter(request, "rawData");// 不包括敏感信息的原始数据字符串，用于计算签名
		// 使用sha1(rawData+sessionkey)得到字符串，用于校验用户信息
		String signature = RequestUtils.getParameter(request, "signature");
		String encryptedData = RequestUtils.getParameter(request, "encryptedData");// 包括敏感数据在内的完整用户信息的加密数据
		String iv = RequestUtils.getParameter(request, "iv");// 加密算法的初始向量

		Long storeId = WebUtils.getCurrentStoreId(request, response);
		if (storeId == null || storeId.longValue() == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}

		// 使用登录凭证 code 获取 session_key 和 openid
		String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + CommonConstants.APPID + "&secret=" + CommonConstants.APPSECRET + "&js_code=" + code + "&grant_type=authorization_code";
		EmayHttpClient httpClient = new EmayHttpClient();
		EmayHttpRequestKV httpRequest = new EmayHttpRequestKV(url, "UTF-8", "GET", null, null, null);
		EmayHttpResponseBytes httpResponse = httpClient.service(httpRequest, new EmayHttpResponseBytesPraser());
		if (httpResponse.getResultCode().equals(EmayHttpResultCode.SUCCESS)) {
			try {
				String json = new String(httpResponse.getResultBytes(), "UTF-8");
				log.info("微信授权响应json:" + json);
				WxAuthResultDTO dto = JsonHelper.fromJson(WxAuthResultDTO.class, json);
				if (dto == null) {
					ResponseUtils.outputWithJson(response, Result.badResult("授权失败"));
					return;
				}
				String openId = dto.getOpenid();
				String sessionKey = dto.getSession_key();
				if (StringUtils.isEmpty(openId) || StringUtils.isEmpty(sessionKey)) {
					ResponseUtils.outputWithJson(response, Result.badResult("授权失败"));
					return;
				}
				// String sign = SHA1(rawData + sessionKey);
				// if (!sign.equals(signature)) {
				// ResponseUtils.outputWithJson(response,
				// Result.badResult("签名校验失败"));
				// return;
				// }

				// 对encryptedData加密数据进行AES解密
				byte[] dataByte = Base64.decode(encryptedData);// 被加密的数据
				byte[] keyByte = Base64.decode(sessionKey);// 加密秘钥
				byte[] ivByte = Base64.decode(iv);// 偏移量
				byte[] resultByte = AESUtil.decrypt(dataByte, keyByte, ivByte, "AES/CBC/PKCS7Padding");
				String result = new String(resultByte, "UTF-8");
				WxUserInfoDTO wxUserInfoDTO = JsonHelper.fromJson(WxUserInfoDTO.class, result);
				if (wxUserInfoDTO != null) {
					Boolean isRegister = false;
					EstoreCacheUserDTO cacheUser = new EstoreCacheUserDTO();
					// 判断用户是否存在，不存在则入库
					EstoreCustomerDTO user = estoreCustomerService.findByStoreIdAndOpenId(storeId, openId);
					if (user == null) {
						Result res = estoreUserService.saveCustomerUser(wxUserInfoDTO, storeId);
						cacheUser = (EstoreCacheUserDTO) res.getResult();
					} else {
						// 判断用户是否注册
						if (!StringUtils.isEmpty(user.getMobile())) {
							isRegister = true;
						}
						BeanUtils.copyProperties(user, cacheUser);
					}

					// 3rd_session
					String sessionId = UUID.randomUUID().toString().toUpperCase().replace("-", "");
					ThirdSession thirdSession = new ThirdSession(openId, sessionKey, cacheUser);
					redis.set(RedisKey.LOGIN_SESSION_PREFIX + sessionId, thirdSession, CommonConstants.LOGIN_EXPIRY_TIME);
					log.info("sessionId:" + sessionId);

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("sessionId", sessionId);
					map.put("isReg", isRegister);
					ResponseUtils.outputWithJson(response, Result.rightResult(map));
					return;
				}
			} catch (Exception e) {
				log.error("微信授权异常：", e);
			}
		}
		ResponseUtils.outputWithJson(response, Result.badResult("授权失败"));
	}

	/**
	 * 发送验证码
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sendCode")
	public void sendVerificationCode(HttpServletRequest request, HttpServletResponse response) {
		//判断是否授权
		String sessionId = request.getHeader("sessionId");
		ThirdSession thirdSession = redis.get(RedisKey.LOGIN_SESSION_PREFIX + sessionId, ThirdSession.class);
		Map<String, Object> map = new HashMap<String, Object>();
		if (thirdSession == null) {
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return;
		}
		
		String mobile = RequestUtils.getParameter(request, "mobile");
		Long storeId = WebUtils.getCurrentStoreId(request, response);
		if (StringUtils.isEmpty(mobile)) {
			ResponseUtils.outputWithJson(response, Result.badResult("手机号不能为空"));
			return;
		}
		if (!RegularCheckUtils.checkMobileFormat(mobile)) {
			ResponseUtils.outputWithJson(response, Result.badResult("手机号格式不正确"));
			return;
		}
		Boolean isExist = estoreCustomerService.isExist(storeId, mobile);
		if (isExist) {
			ResponseUtils.outputWithJson(response, Result.badResult("该手机号已被注册"));
			return;
		}

		// 短信验证码接口安全校验
		String day = DateUtil.toString(new Date(), "yyyyMMdd");
		String ip = RequestUtils.getRemoteRealIp(request);

		Long mobileSendNum = redis.hIncrBy(RedisKey.MOBILE_SEND_NUM_PREFIX + day, mobile, 1);
		redis.expire(RedisKey.MOBILE_SEND_NUM_PREFIX + day, CommonConstants.SMS_COUNT_EXPIRY_TIME);
		if (mobileSendNum > CommonConstants.MOBILE_DAY_SEND_NUM) {
			ResponseUtils.outputWithJson(response, Result.badResult("同一手机号每天只能发送" + CommonConstants.MOBILE_DAY_SEND_NUM + "次验证码"));
			return;
		}

		Long ipSendNum = redis.hIncrBy(RedisKey.IP_SEND_NUM_PREFIX + day, ip, 1);
		redis.expire(RedisKey.IP_SEND_NUM_PREFIX + day, CommonConstants.SMS_COUNT_EXPIRY_TIME);
		if (ipSendNum > CommonConstants.IP_DAY_SEND_NUM) {
			ResponseUtils.outputWithJson(response, Result.badResult("同一IP每天只能发送" + CommonConstants.IP_DAY_SEND_NUM + "次验证码"));
			return;
		}
		// V8短信接口
		String randomCode = RandomNumberUtils.getRandomCode(6);
		String content = "【亿美软通】您的验证码是" + randomCode + "。如非本人操作，请忽略。";
		try {
			//判断短信发送是测试或者真实发送
			SmsSDKClient client = null;
			if(!StringUtils.isEmpty(CommonConstants.SEND_MESSAGE_SCENE) && CommonConstants.SEND_MESSAGE_SCENE.toLowerCase().equals("test")){
				client = new SmsSDKClient(CommonConstants.SMS_IP, CommonConstants.SMS_PORT, CommonConstants.SMS_APPID,CommonConstants.SMS_SECRETKEY);
			}else{
				client = new SmsSDKClient(CommonConstants.SMS_APPID,CommonConstants.SMS_SECRETKEY);
			}
			SmsSingleRequest smsRequest = new SmsSingleRequest(mobile, content, null, null, null);
			ResultModel<SmsResponse> result = client.sendSingleSms(smsRequest);
			if (result.getCode().equals("SUCCESS")) {
				log.info("发送验证码接口请求成功");
				SmsResponse smsResponse = result.getResult();
				log.info("发送验证码接口响应:" + JsonHelper.toJsonString(smsResponse.toString()));
			} else {
				log.info("发送验证码接口请求失败，code："+ result.getCode());
			}
		} catch (SDKParamsException e) {
			log.error("发送验证码异常：", e);
		}
		redis.set(RedisKey.CODE_PREFIX + mobile, randomCode, CommonConstants.CODE_EXPIRY_TIME);
		log.info("短信内容：" + content);
		ResponseUtils.outputWithJson(response, Result.rightResult());
	}

	/**
	 * 注册
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/register")
	public void register(HttpServletRequest request, HttpServletResponse response) {
		//判断是否授权
		String sessionId = request.getHeader("sessionId");
		ThirdSession thirdSession = redis.get(RedisKey.LOGIN_SESSION_PREFIX + sessionId, ThirdSession.class);
		Map<String, Object> map = new HashMap<String, Object>();
		if (thirdSession == null) {
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return;
		}
		Long storeId = WebUtils.getCurrentStoreId(request, response);
		EstoreCustomerDTO user = estoreCustomerService.findByStoreIdAndOpenId(storeId, thirdSession.getOpenId());
		if(user == null){
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return;
		}
		//参数
		String mobile = RequestUtils.getParameter(request, "mobile");
		String verificationCode = RequestUtils.getParameter(request, "verificationCode");
		
		if (StringUtils.isEmpty(mobile) || StringUtils.isEmpty(verificationCode)) {
			ResponseUtils.outputWithJson(response, Result.badResult("参数不能为空"));
			return;
		}
		if (!RegularCheckUtils.checkMobileFormat(mobile)) {
			ResponseUtils.outputWithJson(response, Result.badResult("手机号格式不正确"));
			return;
		}
		String vcode = redis.get(RedisKey.CODE_PREFIX + mobile);
//		String vcode = "1111";//仅用于外网测试不能实际发送验证码的情况
		if (!verificationCode.equals(vcode)) {
			ResponseUtils.outputWithJson(response, Result.badResult("验证码错误"));
			return;
		}
		EstoreUser estoreUser = estoreUserService.findByMobile(mobile);
		if (estoreUser == null) {
			// 根据id更新用户手机号
			estoreUserService.updateUserMobile(user.getUserId(), mobile);
		} else {
			Boolean isExist = estoreCustomerService.isExist(storeId, mobile);
			if (isExist) {
				ResponseUtils.outputWithJson(response, Result.badResult("该手机号已被注册"));
				return;
			}
			// 如果手机号已存在，则删除estore_user表中当前用户的信息，并更新estore_customer中user_id
			estoreUserService.deleteById(user.getUserId());
			estoreCustomerService.updateUserId(estoreUser.getId(), user.getUserId());
			// 更新redis中的userId
			thirdSession.getEstoreCacheUserDTO().setUserId(estoreUser.getId());
		}
		thirdSession.getEstoreCacheUserDTO().setMobile(mobile);
		redis.set(RedisKey.LOGIN_SESSION_PREFIX + sessionId, thirdSession, CommonConstants.LOGIN_EXPIRY_TIME);
		
		ResponseUtils.outputWithJson(response, Result.rightResult());
	}

	private static String SHA1(String str) {
		try {
			// 指定sha1算法
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			digest.update(str.getBytes());
			// 获取字节数组
			byte messageDigest[] = digest.digest();
			// Create Hex String
			StringBuffer hexString = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < messageDigest.length; i++) {
				String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexString.append(0);
				}
				hexString.append(shaHex);
			}
			return hexString.toString().toLowerCase();

		} catch (NoSuchAlgorithmException e) {
			return "";
		}
	}

}
