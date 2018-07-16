package com.emay.estore.web.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.system.UserOperLogService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

/**
 * 用户日志
 * 
 */
@PageAuth("LOG")
@RequestMapping("/log")
@Controller
public class UserOperLogController {

	@Resource
	private UserOperLogService userOperLogService;

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "log";
	}

	/**
	 * 日志列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String username = RequestUtils.getParameter(request, "username");// 用户名
		String content = RequestUtils.getParameter(request, "content");// 内容
		Date startDate=RequestUtils.getDateParameter(request, "startDate", "yyyy-MM-dd HH:mm:ss",null);
		Date endDate=RequestUtils.getDateParameter(request, "endDate", "yyyy-MM-dd HH:mm:ss",null);
		Page<UserOperLog> page = userOperLogService.findByPage(username, content, startDate, endDate, start, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}
}
