package com.emay.estore.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.emay.estore.util.ResponseUtils;

import cn.emay.common.Result;

public class ErrorInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (request.getHeader("Content-Type") != null && request.getHeader("Content-Type").contains("application/x-www-form-urlencoded")) {
			//AJAX 返回 JSON
			ResponseUtils.outputWithJson(response, Result.badResult(-1, "您没有权限访问当前功能！", null));
			return false;
		} else {
			return true;
		}
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		if (ex != null)
			ex.printStackTrace();
	}

}
