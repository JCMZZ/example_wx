package com.emay.estore.web.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.service.estore.EstoreGoodsService;
import com.emay.estore.util.ResponseUtils;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;

@Controller
@RequestMapping("/goods")
public class EstoreGoodsController {
	@Resource 
	private EstoreGoodsService estoreGoodsService;
	/**
	 * 商品展示
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response, Model model) {
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);	
		Integer orderType = RequestUtils.getIntParameter(request, "orderType", 0);// 排序类型：0置顶 1 价格
		Integer orderMethod = RequestUtils.getIntParameter(request, "orderMethod", 0);// 排序方式：0倒序 1正序
		Long storeId = WebUtils.getCurrentStoreId(request, response);
		Page<GoodsDTO> list=estoreGoodsService.findGoods(storeId, (start-1)*limit, limit, orderType, orderMethod);
		ResponseUtils.outputWithJson(response, Result.rightResult(list));
				
	}

	/**
	 * 商品详情
	 */
	@RequestMapping("/ajax/info")
	public void info(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long goodsId = RequestUtils.getLongParameter(request, "goodsId", 0L);// goodsId
		Long storeId = WebUtils.getCurrentStoreId(request, response);
		Result result = estoreGoodsService.findGoodsInfo(goodsId,storeId);
	    ResponseUtils.outputWithJson(response, result);
	}	
}
