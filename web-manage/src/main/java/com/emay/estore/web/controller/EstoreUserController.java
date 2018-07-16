package com.emay.estore.web.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.pojo.estore.EstoreUser;
import com.emay.estore.service.estore.EstoreUserService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@PageAuth("STOREUSER")
@Controller
@RequestMapping("/storeUser")
public class EstoreUserController {
	@Resource
	private EstoreUserService estoreUserService;
	Logger logger = Logger.getLogger(EstoreUserController.class);

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "estore/user/list";
	}

	@RequestMapping("to/userDetail")
	public String userDetail(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0L);
		model.addAttribute("userId", userId);
		return "estore/user/detail";
	}

	@RequestMapping("userList")
	public void selectUserList(HttpServletRequest request, HttpServletResponse response, Model model) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String mobile = RequestUtils.getParameter(request, "mobile");
		Page<EstoreUser> page = estoreUserService.findPage(start, limit, mobile);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/*
	 * 用户详情
	 */
	@RequestMapping("/selectUser")
	public void selectStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0L);
		Map<String, Object> map = estoreUserService.findUserDetail(userId);
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

}
