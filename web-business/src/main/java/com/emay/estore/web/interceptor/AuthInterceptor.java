package com.emay.estore.web.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.wx.ThirdSession;
import com.emay.estore.service.estore.EstoreAdminService;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.cache.redis.RedisClient;
import cn.emay.util.ResponseUtils;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Resource
	private RedisClient redis;
	@Resource
	private EstoreAdminService estoreAdminService;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String sessionId = request.getHeader("sessionId");
		ThirdSession thirdSession = redis.get(RedisKey.LOGIN_SESSION_PREFIX + sessionId, ThirdSession.class);
		Map<String, Object> map = new HashMap<String, Object>();
		//判断是否授权
		if (thirdSession == null) {
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return false;
		}
		String openId = thirdSession.getOpenId();
		//优点：此处查询用户信息可保证数据实时性；B端用户注册后不需要重新授权就可拿到店铺id，可优化为注册时缓存到redis；
		//缺点：需要查询数据库；
		EstoreAdminDTO user = estoreAdminService.findByOpenId(openId);
		if(user == null){
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return false;
		}
		if(StringUtils.isEmpty(user.getMobile())){//没有注册
			map.put("isLogin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no login", map));
			return false;
		}
		if(user.getStoreId()== null || user.getStoreId().longValue() == 0l){
			map.put("isAdmin", false);
			ResponseUtils.outputWithJson(response, Result.badResult("no admin authority", map));
			return false;
		}
		request.setAttribute(WebUtils.REQUEST_USER, user);
		return true;
	}

}
