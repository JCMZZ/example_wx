package com.emay.estore.web.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.dto.estore.user.EstoreCacheUserDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerCardRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerMyDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;
import com.emay.estore.service.estore.EstoreCustomerService;
import com.emay.estore.util.ResponseUtils;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;

@Controller
@RequestMapping("/customer")
public class EstoreCustomerController {
	@Resource
	private EstoreCustomerService estoreCustomerService;
	
	@RequestMapping("/findCustomer")
	public void findCustomer (HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreCacheUserDTO estoreCacheUserDTO = WebUtils.getCurrentUser(request, response);
		EstoreCustomerMyDTO dto = estoreCustomerService.findCustomer(estoreCacheUserDTO.getId());
		ResponseUtils.outputWithJson(response,Result.rightResult(dto));
			
	}
	@RequestMapping("/findBalanceRecord")
	public void findBalance (HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreCacheUserDTO estoreCacheUserDTO = WebUtils.getCurrentUser(request, response);
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<EstoreCustomerBalanceRecordDTO>  ecbdto = estoreCustomerService.findBalanceRecord(estoreCacheUserDTO.getId(),(start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response,Result.rightResult( ecbdto));
		
		
	}
	@RequestMapping("/findScoreRecord")
	public void findScoreRecord(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreCacheUserDTO estoreCacheUserDTO = WebUtils.getCurrentUser(request, response);
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<EstoreCustomerScoreRecordDTO>  ecsr =estoreCustomerService.findScoreRecord(estoreCacheUserDTO.getId(), (start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response,Result.rightResult(ecsr));
		
	}
	@RequestMapping("/findCard")
	public void findCardRecord(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreCacheUserDTO estoreCacheUserDTO = WebUtils.getCurrentUser(request, response);
		EstoreCustomerCardRecordDTO ecrd = estoreCustomerService.findCard(estoreCacheUserDTO.getId());
		ResponseUtils.outputWithJson(response,Result.rightResult(ecrd));	
	}		
}
