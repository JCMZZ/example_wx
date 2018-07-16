package com.emay.estore.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.dto.estore.service.EstoreServiceDTO;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;
import com.emay.estore.service.estore.EstoreServiceService;
import com.emay.estore.service.estore.EstoreServiceSmsDetailService;
import com.emay.estore.service.system.UserOperLogService;

@PageAuth("SERVICE_MANAGE")
@Controller
@RequestMapping("/service/manage")
public class EstoreServiceManageController {
	@Resource
	private EstoreServiceService estoreServiceService;
	@Resource
	private EstoreServiceSmsDetailService estoreServiceSmsDetailService;
	@Resource
	private UserOperLogService userOperLogService;

	Logger logger = Logger.getLogger(EstoreServiceManageController.class);

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "estore/service/list";
	}

	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response) {
		String storeName = RequestUtils.getParameter(request, "storeName");// 商户名称
		Integer serviceType = RequestUtils.getIntParameter(request, "serviceType", 0);// 服务类型1新客2老客3自主
		Integer serviceState = RequestUtils.getIntParameter(request, "serviceState", -1);// 状态[0-未推送，1-待支付，2-支付成功，3-支付失败]
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);

		Page<EstoreServiceDTO> page = estoreServiceService.findManagePage(storeName, serviceType, serviceState, start, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}
	
	@RequestMapping("/info")
	public String info(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long batchId = RequestUtils.getLongParameter(request, "batchId", 0l);
		model.addAttribute("batchId", batchId);
		return "estore/service/info";
	}
	
	@RequestMapping("/ajax/info")
	public void infoDo(HttpServletRequest request, HttpServletResponse response) {
		Long batchId = RequestUtils.getLongParameter(request, "batchId", 0l);
		String mobile = RequestUtils.getParameter(request, "mobile");
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<EstoreServiceSmsDetail> page = estoreServiceSmsDetailService.findPage(batchId, mobile, start, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}
}
