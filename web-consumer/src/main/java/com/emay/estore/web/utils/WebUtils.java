package com.emay.estore.web.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;

import com.emay.estore.dto.estore.user.EstoreCacheUserDTO;

public class WebUtils {

	public final static String REQUEST_USER = "USER";

	/**
	 * 获取C端当前登录用户
	 */
	public static EstoreCacheUserDTO getCurrentUser(HttpServletRequest request, HttpServletResponse response) {
		return (EstoreCacheUserDTO) request.getAttribute(REQUEST_USER);
	}

	/**
	 * 获取当前店铺id
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	public static Long getCurrentStoreId(HttpServletRequest request, HttpServletResponse response) {
		String storeId = request.getHeader("storeId");
		if (StringUtils.isEmpty(storeId)) {
			return null;
		}
		return Long.valueOf(storeId);
	}
	

}
