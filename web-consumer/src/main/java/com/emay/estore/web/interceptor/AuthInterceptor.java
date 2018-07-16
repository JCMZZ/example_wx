package com.emay.estore.web.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.dto.estore.wx.ThirdSession;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.cache.redis.RedisClient;
import cn.emay.util.ResponseUtils;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Resource
	private RedisClient redis;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String sessionId = request.getHeader("sessionId");
		ThirdSession thirdSession = redis.get(RedisKey.LOGIN_SESSION_PREFIX + sessionId, ThirdSession.class);
		Map<String, Object> map = new HashMap<String, Object>();
		if (thirdSession == null) {
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return false;
		}
		if(StringUtils.isEmpty(thirdSession.getEstoreCacheUserDTO().getMobile())){//没有注册
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return false;
		}
		request.setAttribute(WebUtils.REQUEST_USER, thirdSession.getEstoreCacheUserDTO());
		
		String storeId = request.getHeader("storeId");
		if(StringUtils.isEmpty(storeId)){
			ResponseUtils.outputWithJson(response, Result.badResult("storeId is empty"));
			return false;
		}
		
		return true;
	}

}
