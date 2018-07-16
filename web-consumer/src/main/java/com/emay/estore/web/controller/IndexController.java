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
//	SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
//	Calendar cal = Calendar.getInstance();// 获取当前日期
//	String begin = format.format(cal.getTime());
//	Calendar cale = Calendar.getInstance();
//	// 设置为1号,当前日期既为本月第一天
//	cale.set(Calendar.DAY_OF_MONTH, 1);
//	int month = cal.get(Calendar.MONTH) + 1;
//	String mon = month + "月";
//	String end = format.format(cale.getTime());
//	User user = WebUtils.getCurrentUser(request, response);
//	Account account = WebUtils.getCurrentAccount(request, response);
//	List<Role> roleList = user.getRoleList();
//	boolean flag = false;
//	for (Role r : roleList) {
//	    if (r.getId() == 3) {
//		flag = true;
//		break;
//	    }
//	}
//	Map<String, Object> map = paymentChangeRecordService.queryPaymentChangeRecordByMonth(account.getId(), user.getId());
//	model.addAllAttributes(map);
//	model.addAttribute("begin", begin);
//	model.addAttribute("end", end);
//	model.addAttribute("month", mon);
//	model.addAttribute("flag", flag);
//	model.addAttribute("user", user);
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
