package com.emay.estore.web.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.constant.PayTypeEnum;
import com.emay.estore.constant.RedisKey;
import com.emay.estore.constant.ServiceTypeEnum;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreService;
import com.emay.estore.pojo.pay.OrderInfo;
import com.emay.estore.service.estore.EstoreServiceService;
import com.emay.estore.util.OnlyIdGenerator;
import com.emay.estore.util.RandomNumberUtils;
import com.emay.estore.util.Signature;
import com.emay.estore.web.utils.WebUtils;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.thoughtworks.xstream.io.xml.XmlFriendlyNameCoder;

import cn.emay.common.Result;
import cn.emay.common.cache.redis.RedisClient;
import cn.emay.common.http.client.EmayHttpClient;
import cn.emay.common.http.common.EmayHttpResultCode;
import cn.emay.common.http.request.impl.EmayHttpRequestString;
import cn.emay.common.http.response.impl.string.EmayHttpResponseString;
import cn.emay.common.http.response.impl.string.EmayHttpResponseStringPraser;
import cn.emay.util.BigDecimalUtils;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@Controller
@RequestMapping("/pay")
public class EstorePayController {
	@Resource
	private RedisClient redis;
	@Resource
	private EstoreServiceService estoreServiceService;

	Logger logger = Logger.getLogger(EstorePayController.class);

	/**
	 * 增值服务购买
	 */
	@RequestMapping("/buyService")
	public void selectService(HttpServletRequest request, HttpServletResponse response) {
		Long serviceId = RequestUtils.getLongParameter(request, "serviceId", 0l);// 服务id
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		// 获取openid
		String openId = eadto.getWxOpenId();
		if (StringUtils.isEmpty(openId)) {
			logger.error("未获取到用户信息");
			ResponseUtils.outputWithJson(response, Result.badResult("未获取到用户信息"));
			return;
		}
		if (serviceId == 0l) {
			logger.error("服务参数错误");
			ResponseUtils.outputWithJson(response, Result.badResult("服务参数错误"));
			return;
		}
		EstoreService entity = estoreServiceService.findById(serviceId);
		if (entity == null) {
			logger.error("服务参数错误");
			ResponseUtils.outputWithJson(response, Result.badResult("服务参数错误"));
			return;
		}
		int price = BigDecimalUtils.mul(entity.getServicePrice(), 100).intValue();// 分
		String productDesc = ServiceTypeEnum.findNameByCode(entity.getServiceType().toString());// 商品描述

		OrderInfo order = new OrderInfo();
		order.setAppid(CommonConstants.APPID);
		order.setMch_id(CommonConstants.MCH_ID);
		order.setNonce_str(RandomNumberUtils.getNumbersAndLettersRandom(32));// 随机串
		order.setBody(productDesc);// 商品描述
		order.setOut_trade_no(OnlyIdGenerator.genOnlyId("000"));// 订单号
		order.setTotal_fee(price);// 金额,单位分 price
		order.setSpbill_create_ip(RequestUtils.getRemoteRealIp(request));// 210.12.41.130; 终端IP
		order.setNotify_url(CommonConstants.NOTIFY_URL);// 通知地址
		order.setTrade_type(PayTypeEnum.JSAPI.name());// 交易类型,小程序固定
		order.setOpenid(openId);
//		order.setSign_type("MD5");//默认MD5
		// 生成签名
		String sign;
		try {
			sign = Signature.getSign(order);
		} catch (IllegalAccessException e) {
			logger.error("签名异常：", e);
			ResponseUtils.outputWithJson(response, Result.badResult("签名失败"));
			return;
		}
		order.setSign(sign);
		logger.info("orderInfo:" + order.toString());
		// 调用统一下单接口
		String url = CommonConstants.UNIFIEDORDER_URL;
		XStream xStreamForRequestPostData = new XStream(new DomDriver("UTF-8", new XmlFriendlyNameCoder("-_", "_")));
		xStreamForRequestPostData.alias("xml", order.getClass());
		// 将要提交给API的数据对象转换成XML格式数据Post给API
		String postDataXML = xStreamForRequestPostData.toXML(order);
		logger.info("postDataXML: " + postDataXML);
		EmayHttpClient client = new EmayHttpClient();
		EmayHttpRequestString req = new EmayHttpRequestString(url, "UTF-8", "POST", null, null, postDataXML);
		EmayHttpResponseString service = null;
		try {
			service = client.service(req, new EmayHttpResponseStringPraser());
			if (null == service || null == service.getResultString()) {
				logger.error("支付通道连接失败");
				ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
				return;
			}
			if (!service.getResultCode().equals(EmayHttpResultCode.SUCCESS)) {
				logger.error("resultCode:" + service.getResultCode().getCode());
				ResponseUtils.outputWithJson(response, Result.badResult(service.getResultCode().getCode()));
				return;
			}
			String resultString = service.getResultString();
			logger.info("resultString: " + resultString);
			Map<String, String> map = Dom2Map(resultString);
			if ("SUCCESS".equals(map.get("return_code"))) {
				if ("SUCCESS".equals(map.get("result_code"))) {
					Long timeStamp = System.currentTimeMillis();
					String nonceStr = RandomNumberUtils.getNumbersAndLettersRandom(32);
					// 再次签名
					Map<String, String> signParam = new HashMap<String, String>();
					signParam.put("appId", CommonConstants.APPID);
					signParam.put("timeStamp", timeStamp.toString());
					signParam.put("nonceStr", nonceStr);
					signParam.put("package", "prepay_id=" + map.get("prepay_id"));
					signParam.put("signType", "MD5");
					String paySign = Signature.getSignMap(signParam);
					// 返回小程序端参数
					Map<String, Object> result = new HashMap<String, Object>();
					result.put("timeStamp", timeStamp.toString());
					result.put("nonceStr", nonceStr);
					result.put("package", "prepay_id=" + map.get("prepay_id"));
					result.put("signType", "MD5");
					result.put("paySign", paySign);
					result.put("productDesc", productDesc);
					result.put("price", entity.getServicePrice());
					estoreServiceService.updateServiceOutTradeNo(serviceId, order.getOut_trade_no());
					redis.hset(RedisKey.WX_ORDER_HASH, order.getOut_trade_no(), serviceId, -1);
					ResponseUtils.outputWithJson(response, Result.rightResult(result));
					return;
				}
			}
			ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
		} catch (Exception e) {
			logger.error("支付通道连接异常：", e);
			ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
			return;
		}
	}

	/**
	 * 微信支付回调 通知频率为15/15/30/180/1800/1800/1800/1800/3600，单位：秒
	 */
	@RequestMapping("/notify")
	public void notify(@RequestBody String requestBody, HttpServletResponse response) {
		Integer serviceState = -1;
		String out_trade_no = "";
		String transaction_id = "";
		String result = "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[]]></return_msg></xml>";
		byte[] resultByte = null;
		try {
			resultByte = result.getBytes("UTF-8");
			Map<String, String> map = Dom2Map(requestBody);
			logger.info("requestBody: " + map);
			String return_code = map.get("return_code");
			if ("SUCCESS".equals(return_code)) {
				// 验证调用返回或微信主动通知签名时，传送的sign参数不参与签名，将生成的签名与该sign值作校验。
				String sign = "";
				if (map.containsKey("sign")) {
					sign = map.get("sign");
					map.remove("sign");
				}
				// 生成签名
				String buildSign = Signature.getSignMap(map);
				if (!buildSign.equals(sign)) {
					logger.error("签名校验失败");
					ResponseUtils.outputBytes(response, resultByte);
					return;
				}
				// 金额校验
				out_trade_no = map.get("out_trade_no");
				EstoreService entity = estoreServiceService.findByOutTradeNo(out_trade_no);
				if (entity == null) {
					logger.error("我方订单号不存在，out_trade_no:" + out_trade_no);
					ResponseUtils.outputBytes(response, resultByte);
					return;
				}
				int price = BigDecimalUtils.mul(entity.getServicePrice(), 100).intValue();// 分
				if (price != Integer.parseInt(map.get("total_fee"))) {
					logger.error("金额校验失败");
					ResponseUtils.outputBytes(response, resultByte);
					return;
				}
				String result_code = map.get("result_code");
				if ("SUCCESS".equals(result_code)) {
					serviceState = EstoreService.SERVICE_STATE_PAYMENT_SUCCESS;
				} else if ("FAIL".equals(result_code)) {
					serviceState = EstoreService.SERVICE_STATE_PAYMENT_FAIL;
				}
				transaction_id = map.get("transaction_id");
				if (redis.hexists(RedisKey.WX_ORDER_HASH, out_trade_no)) {
					Long serviceId = redis.hget(RedisKey.WX_ORDER_HASH, out_trade_no, Long.class);
					estoreServiceService.updateServiceState(serviceId, serviceState, result_code, transaction_id);
					response.setContentType("text/plain;charset=utf-8");
					result = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
					resultByte = result.getBytes("UTF-8");
					// 放代发队列
					redis.lpush(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE, serviceId, -1);
					// 删除微信支付订单待对比hash
					redis.hdel(RedisKey.WX_ORDER_HASH, out_trade_no);
					ResponseUtils.outputBytes(response, resultByte);
					return;
				}
			}
			ResponseUtils.outputBytes(response, resultByte);
		} catch (UnsupportedEncodingException e) {
			logger.error("编码异常：", e);
			ResponseUtils.outputBytes(response, resultByte);
			return;
		} catch (Exception e) {
			logger.error("微信支付回调异常：", e);
			ResponseUtils.outputBytes(response, resultByte);
			return;
		}
	}

	/**
	 * xml 转 Map
	 * 
	 * @param xml
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Map<String, String> Dom2Map(String xml) {
		Map<String, String> map = new HashMap<String, String>();
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml);
		} catch (DocumentException e) {
			logger.error("DocumentException:", e);
		}
		if (doc == null)
			return map;
		Element root = doc.getRootElement();
		for (Iterator iterator = root.elementIterator(); iterator.hasNext();) {
			Element e = (Element) iterator.next();
			map.put(e.getName(), e.getText());
		}
		return map;
	}
}
