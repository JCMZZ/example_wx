package com.emay.estore.web.utils;

import java.io.IOException;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.system.authentication.Ticket;
import com.emay.estore.pojo.system.User;
import com.emay.estore.service.system.AuthenticationService;
import com.emay.estore.service.system.UserService;

import cn.emay.common.Result;
import cn.emay.common.cache.KeyValueCacheService;
import cn.emay.common.spring.BeanFactoryUtils;
import cn.emay.util.ResponseUtils;

public class WebUtils {

	public final static String X_REQUESTED_WITH = "X-Requested-With";
	public final static String XMLHTTPREQUEST = "XMLHttpRequest";

	@Resource
	private static AuthenticationService as = BeanFactoryUtils.getBean(AuthenticationService.class);
	@Resource
	private static KeyValueCacheService cache = BeanFactoryUtils.getBean(KeyValueCacheService.class);
	@Resource
	private static UserService userService = BeanFactoryUtils.getBean(UserService.class);

	/**
	 * 获取当前登录用户
	 */
	public static User getCurrentUser(HttpServletRequest request, HttpServletResponse response) {
		if (request.getAttribute("user") != null) {
			return (User) request.getAttribute("user");
		}
		findSessionId(request, response);
		String token = getLoginToken(request, response);
		if (token == null) {
			return null;
		}
		Ticket ticket = as.checkAndReflush(token);
		if (ticket == null) {
			return null;
		}
		Long userId = Long.valueOf(ticket.info());
		User user = userService.findUserById(userId);
		if (user == null) {
			return null;
		}
		request.setAttribute("user", user);
		return user;
	}

	private static String getLoginToken(HttpServletRequest request, HttpServletResponse response) {
		Cookie cookie = findCookie(request, CommonConstants.TOKEN_ID);
		return cookie == null ? null : cookie.getValue();
	}

	/**
	 * 是否有用户登录
	 */
	public static boolean isLogin(HttpServletRequest request, HttpServletResponse response) {
		User user = getCurrentUser(request, response);
		return user != null;
	}

	/**
	 * 登出
	 */
	public static void loginout(HttpServletRequest request, HttpServletResponse response) {
		String token = getLoginToken(request, response);
		if (token != null) {
			as.remove(token);
		}
		deleteCookie(request, response, CommonConstants.TOKEN_ID);
	}

	/**
	 * 登陆
	 */
	public static void login(HttpServletRequest request, HttpServletResponse response, Ticket ticket) {
		addCookie(response, CommonConstants.TOKEN_ID, ticket.getToken(), -1);
	}

	/**
	 * 获取系统自定义的SessionId
	 */
	public static String findSessionId(HttpServletRequest request, HttpServletResponse response) {
		Cookie cookie = findCookie(request, CommonConstants.SESSION_ID);
		String sessionId = null;
		if (cookie != null)
			sessionId = cookie.getValue();
		if (sessionId == null) {
			sessionId = UUID.randomUUID().toString().replace("-", "").toUpperCase();
			addCookie(response, CommonConstants.SESSION_ID, sessionId, -1);
		}
		return sessionId;
	}

	/**
	 * 跳到错误页面或者提示错误信息
	 */
	public static void sendError(HttpServletRequest request, HttpServletResponse response, String AjaxErrorMassage) throws IOException {
		if (isAjaxRequest(request)) {
			ResponseUtils.outputWithJson(response, Result.badResult("-1", AjaxErrorMassage, null));
		} else {
			response.sendRedirect(getLocalAddress(request) + "/error");
		}
	}

	/**
	 * 跳转到登陆页面或者提示未登陆信息
	 */
	public static void sendNoLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (isAjaxRequest(request)) {
			ResponseUtils.outputWithJson(response, Result.badResult("-222", "您还未登陆，请先登录", null));
		} else {
			response.sendRedirect(getLocalAddress(request) + "/login");
		}
	}

	/**
	 * 查询Cookie
	 */
	public static Cookie findCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					return cookie;
				}
			}
		}
		return null;
	}

	/**
	 * 加入Cookie
	 */
	public static void addCookie(HttpServletResponse response, String name, String value, int time) {
		Cookie cookie = new Cookie(name, value);
		if (time >= 0) {
			cookie.setMaxAge(time);
		}
		response.addCookie(cookie);
	}

	/**
	 * 删除Cookie
	 */
	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie cookie = findCookie(request, name);
		if (cookie != null) {
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
	}

	/**
	 * 是否AJAX请求
	 */
	public static boolean isAjaxRequest(HttpServletRequest request) {
		return XMLHTTPREQUEST.equalsIgnoreCase(request.getHeader(X_REQUESTED_WITH));
	}
	
	/**
	 * 获取 当前 域名
	 *
	 * @param request
	 * @return
	 */
	public static String getLocalAddress(HttpServletRequest request) {
		String uri = request.getRequestURI() == null ? "" : request.getRequestURI();
		String url = request.getRequestURL() == null ? "" : request.getRequestURL().toString();
		String contextPath = request.getContextPath() == null ? "" : request.getContextPath();
		return url.replace(uri, "") + contextPath;
	}

}
