package com.emay.estore.web.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.service.estore.EstoreGoodsService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@PageAuth("GOODS")
@Controller
@RequestMapping("/goods")
public class EstoreGoodsController {
	@Resource
	private EstoreGoodsService estoreGoodsService;

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "estore/goods/list";
	}

	@RequestMapping("/findPcGoods")
	public void findPcGoods(HttpServletRequest request, HttpServletResponse response, Model model) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String goodsName = RequestUtils.getParameter(request, "goodsName");
		String storeName = RequestUtils.getParameter(request, "storeName");
		Date startTime = RequestUtils.getDateParameter(request, "startTime", "yyyy-MM-dd HH:mm:ss", null);
		Date endTime = RequestUtils.getDateParameter(request, "endTime", "yyyy-MM-dd HH:mm:ss", null);
		Page<GoodsDTO> page = estoreGoodsService.findPcGoods(goodsName, storeName, startTime, endTime, start, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}
}
