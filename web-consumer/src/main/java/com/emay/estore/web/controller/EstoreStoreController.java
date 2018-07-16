package com.emay.estore.web.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.dto.estore.StoreDTO;
import com.emay.estore.service.estore.EstoreStoreService;
import com.emay.estore.service.system.UserOperLogService;

import cn.emay.common.Result;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@Controller
@RequestMapping("/store")
public class EstoreStoreController {
	@Resource
	private EstoreStoreService estoreStoreService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreStoreController.class);

	/*
	 * 查看商户信息
	 */
	@RequestMapping("/selectStore")
	public void selectStore(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		// EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		StoreDTO dto = estoreStoreService.find(storeId);
		ResponseUtils.outputWithJson(response, Result.rightResult(dto));
	}

}
