package com.emay.estore.web.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.emay.estore.dto.estore.user.EstoreAdminDTO;

public class WebUtils {

	public final static String REQUEST_USER = "USER";

	/**
	 * 获取B端当前登录用户
	 */
	public static EstoreAdminDTO getCurrentUser(HttpServletRequest request, HttpServletResponse response) {
		return (EstoreAdminDTO) request.getAttribute(REQUEST_USER);
	}

}
