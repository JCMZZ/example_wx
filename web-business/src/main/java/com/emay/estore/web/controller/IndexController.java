package com.emay.estore.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
//    @Resource
//    private UserPaymentService userPaymentService;
//
//    @Resource
//    private PaymentChangeRecordService paymentChangeRecordService;

    @RequestMapping("/")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
	return "index";
    }

    /**
     * 错误页面。 error拦截器，会区分异步请求的返回	
     */
    @RequestMapping("/error")
    public String error(HttpServletRequest request, HttpServletResponse response, Model model) {
	String from = request.getHeader("referer");
	model.addAttribute("from", from);
	return "error";
    }

}
