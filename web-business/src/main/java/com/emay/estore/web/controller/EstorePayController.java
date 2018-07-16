package com.emay.estore.web.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
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
		Integer serviceType = RequestUtils.getIntParameter(request, "serviceType", -1);// 服务类型1新客2老客3自主
		Long serviceId = RequestUtils.getLongParameter(request, "serviceId", 0l);// 服务id
		BigDecimal servicePrice = RequestUtils.getBigDecimalParameter(request, "servicePrice", new BigDecimal(0));// 服务价格
		Integer price = BigDecimalUtils.mul(servicePrice, 100).intValue();
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		// 获取openid
		String openId = eadto.getWxOpenId();
		Long storeId = eadto.getStoreId();
		if (serviceId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("服务选择有误"));
			return;
		}
		if (serviceType == -1) {
			ResponseUtils.outputWithJson(response, Result.badResult("服务类型错误"));
			return;
		}
		if (StringUtils.isBlank(openId)) {
			ResponseUtils.outputWithJson(response, Result.badResult("未获取到用户信息"));
			return;
		}
		if (price <= 0) {
			ResponseUtils.outputWithJson(response, Result.badResult("价格有误"));
			return;
		}

		OrderInfo order = new OrderInfo();
		order.setAppid(CommonConstants.APPID);
		order.setMch_id(CommonConstants.MCH_ID);
		order.setNonce_str(RandomNumberUtils.getNumbersAndLettersRandom(32));// 随机串
		order.setBody(ServiceTypeEnum.findNameByCode(serviceType.toString()));// 商品描述
		order.setOut_trade_no(OnlyIdGenerator.genOnlyId(storeId.toString()));// 订单号
		order.setTotal_fee(BigDecimalUtils.mul(servicePrice, 100).intValue());// 金额,单位分 price
		order.setSpbill_create_ip(RequestUtils.getRemoteRealIp(request));//210.12.41.130; 终端IP
		order.setNotify_url(CommonConstants.NOTIFY_URL);// 通知地址
		order.setTrade_type(PayTypeEnum.JSAPI.name());// 交易类型,小程序固定
		order.setOpenid(openId);
		// order.setSign_type("MD5");//默认MD5
		// 生成签名
		String sign;
		try {
			sign = Signature.getSign(order);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			ResponseUtils.outputWithJson(response, Result.badResult("签名失败"));
			return;
		}
		order.setSign(sign);
		logger.info(order.toString());
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
				ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
				return;
			}
			if (!service.getResultCode().equals(EmayHttpResultCode.SUCCESS)) {
				ResponseUtils.outputWithJson(response, Result.badResult(service.getResultCode().getName()));
				return;
			}
			String resultString = service.getResultString();
			logger.info("resultString: " + resultString);
			Map<String, String> map = Dom2Map(resultString);
			if ("SUCCESS".equals(map.get("return_code"))) {
				if ("SUCCESS".equals(map.get("result_code"))) {
					Map<String, String> result = new HashMap<>();
					result.put("prepay_id", map.get("prepay_id"));
					estoreServiceService.updateServiceOutTradeNo(serviceId, order.getOut_trade_no());
					redis.hset(RedisKey.WX_ORDER_HASH, order.getOut_trade_no(), serviceId, -1);
					ResponseUtils.outputWithJson(response, Result.rightResult(result));
					return;
				}
			}
			ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
		} catch (Exception e) {
			ResponseUtils.outputWithJson(response, Result.badResult("支付通道连接失败"));
			return;
		}
	}

	/**
	 * 微信支付回调
	 */
	@RequestMapping("/notify")
	public void notify(@RequestBody String requestBody, HttpServletResponse response) {
		Integer serviceState = -1;
		String out_trade_no = "";
		String transaction_id = "";
		String result = "<xml><return_code><![CDATA[FAIL]]></return_code></xml>";
		Map<String, String> map = Dom2Map(requestBody);
		logger.info("requestBody: " + map);
		String return_code = map.get("return_code");
		if ("SUCCESS".equals(return_code)) {
			if ("SUCCESS".equals(return_code)) {
				serviceState = EstoreService.SERVICE_STATE_PAYMENT_SUCCESS;
			} else if ("FAIL".equals(return_code)) {
				serviceState = EstoreService.SERVICE_STATE_PAYMENT_FAIL;
			}
			out_trade_no = map.get("out_trade_no");
			transaction_id = map.get("transaction_id");
			if (redis.hexists(RedisKey.WX_ORDER_HASH, out_trade_no)) {
				Long serviceId = redis.hget(RedisKey.WX_ORDER_HASH, out_trade_no, Long.class);
				estoreServiceService.updateServiceState(serviceId, serviceState, return_code, transaction_id);
				response.setContentType("text/plain;charset=utf-8");
				result = "<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>";
				//放代发队列
				redis.lpush(RedisKey.SMS_SERVICE_WAIT_SEND_QUEUE, serviceId, -1);
			}
		}
		OutputStream out = null;
		try {
			out = response.getOutputStream();
			out.write(result.getBytes("UTF-8"));
			out.flush();
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (out != null)
					out.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
	}

	/**
	 * xml 转 Map
	 * 
	 * @param xml
	 * @return
	 */
	public static Map<String, String> Dom2Map(String xml) {
		Map<String, String> map = new HashMap<String, String>();
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
