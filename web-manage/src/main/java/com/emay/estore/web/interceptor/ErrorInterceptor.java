package com.emay.estore.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.util.ResponseUtils;

public class ErrorInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (WebUtils.isAjaxRequest(request)) {
			ResponseUtils.outputWithJson(response, Result.badResult("-1", "request not found", null));
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
