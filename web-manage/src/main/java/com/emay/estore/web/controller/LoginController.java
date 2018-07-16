package com.emay.estore.web.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.emay.estore.dto.system.authentication.Ticket;
import com.emay.estore.dto.system.authentication.UsernameAndPasswordAuthenticationCell;
import com.emay.estore.pojo.system.User;
import com.emay.estore.service.system.AuthenticationService;
import com.emay.estore.service.system.UserService;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.captcha.CaptchaProducer;
import cn.emay.common.encryption.Md5;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

/**
 * 登录-登出
 * 
 * @author 东旭
 *
 */
@Controller
public class LoginController {

	@Resource
	private CaptchaProducer cptchaProducer;

	@Resource
	private AuthenticationService as;

	@Resource
	private UserService userService;

	/**
	 * 登录页面
	 * 
	 * @throws Exception
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String toLogin(HttpServletRequest request, HttpServletResponse response, Model model) {
		if (WebUtils.isLogin(request, response))
			return "redirect:/";
		return "login";
	}

	/**
	 * 登录
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public void login(HttpServletRequest request, HttpServletResponse response) {
		String username = RequestUtils.getParameter(request, "username");
		String password = RequestUtils.getParameter(request, "password");
		String captcha = RequestUtils.getParameter(request, "captcha");
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || StringUtils.isEmpty(captcha)) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户名/密码/验证码不能为空"));
			return;
		}
		String sessionId = WebUtils.findSessionId(request, response);
		String key = "CAPTCHA_login_" + sessionId;
		boolean check = cptchaProducer.checkAndDelete(key, captcha);
		if (!check) {
			ResponseUtils.outputWithJson(response, Result.badResult("验证码错误"));
			return;
		}
		UsernameAndPasswordAuthenticationCell up = new UsernameAndPasswordAuthenticationCell(username, password);
		Ticket ticket = as.authentication(up);
		if (ticket.isBad()) {
			ResponseUtils.outputWithJson(response, Result.badResult(ticket.badInfo()));
			return;
		}
		WebUtils.login(request, response, ticket);
		ResponseUtils.outputWithJson(response, Result.rightResult());
	}

	/**
	 * 登出
	 */
	@RequestMapping(value = "/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		WebUtils.loginout(request, response);
		ResponseUtils.outputWithJson(response, Result.rightResult());
	}

	/**
	 * 检测是否是登录状态
	 */
	@RequestMapping(value = "/checklogin")
	public void checkLogin(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("isLogin", WebUtils.isLogin(request, response));
		ResponseUtils.outputWithJson(response, map);
	}

	/**
	 * 修改密码
	 */
	@RequestMapping(value = "/changepass")
	public void changepass(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String password = RequestUtils.getParameter(request, "password");
		String newpass = RequestUtils.getParameter(request, "newpass");
		if (password == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("-1", "原密码不能为空", null));
			return;
		}
		if (newpass == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("-1", "新密码不能为空", null));
			return;
		}
		User user = WebUtils.getCurrentUser(request, response);
		if (user == null) {
			WebUtils.sendNoLogin(request, response);
			return;
		}
		String pass = Md5.md5(password.getBytes());
		if (!user.getPassword().equals(pass)) {
			ResponseUtils.outputWithJson(response, Result.badResult("-1", "密码错误", null));
			return;
		}
		userService.changePassword(user.getId(), newpass);
		ResponseUtils.outputWithJson(response, Result.rightResult());
	}
}
