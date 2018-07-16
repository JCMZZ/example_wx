package com.emay.estore.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.captcha.CaptchaProducer;
import cn.emay.util.RequestUtils;

/**
 * 根
 * 
 * @author 东旭
 *
 */
@Controller
public class IndexController {

	@Resource
	private CaptchaProducer cptchaProducer;

	/**
	 * 初始页面
	 */
	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "index";
	}

	/**
	 * 错误页面。 error拦截器，会区分异步请求的返回
	 */
	@RequestMapping("error")
	public String error(HttpServletRequest request, HttpServletResponse response, Model model) {
		String from = request.getHeader("referer");
		model.addAttribute("from_url", from);
		return "error";
	}

	/**
	 * 验证码图片
	 */
	@RequestMapping("captcha")
	public void index(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sessionId = WebUtils.findSessionId(request, response);
		String type = RequestUtils.getParameter(request, "type");
		String key = "CAPTCHA_" + type + "_" + sessionId;
		cptchaProducer.create(response.getOutputStream(), key, 15 * 60);
		response.getOutputStream().close();
	}

}
