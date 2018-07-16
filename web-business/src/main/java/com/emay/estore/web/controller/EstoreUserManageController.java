package com.emay.estore.web.controller;

import java.math.BigDecimal;
import java.text.MessageFormat;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;
import com.emay.estore.pojo.estore.EstoreCardType;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreCardService;
import com.emay.estore.service.estore.EstoreCardTypeService;
import com.emay.estore.service.estore.EstoreCustomerService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.RegularCheckUtils;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@Controller
@RequestMapping("/userManage")
public class EstoreUserManageController {
	@Resource
	private EstoreCardService estoreCardService;
	@Resource
	private EstoreCustomerService estoreCustomerService;
	@Resource
	private EstoreCardTypeService estoreCardTypeService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreUserManageController.class);

	/*
	 * 用户列表
	 */
	@RequestMapping("/customerList")
	public void selectService(HttpServletRequest request, HttpServletResponse response) {
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		Page<EstoreCustomerInfoDTO> page = estoreCustomerService.findCustomerListPage((start - 1) * limit, limit, storeId);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/*
	 * 用户信息
	 */
	@RequestMapping("/customerInfo")
	public void selectUser(HttpServletRequest request, HttpServletResponse response) {
		Long customerId = RequestUtils.getLongParameter(request, "customerId", 0L);
		EstoreCustomerInfoDTO dto = estoreCustomerService.findCustomerInfo(customerId);
		ResponseUtils.outputWithJson(response, Result.rightResult(dto));
	}

	/*
	 * 卡片列表
	 */
	@RequestMapping("/cardList")
	public void cardList(HttpServletRequest request, HttpServletResponse response) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		List<EstoreCardType> list = estoreCardTypeService.findEstoreCardTypes(storeId);
		ResponseUtils.outputWithJson(response, Result.rightResult(list));
	}

	/*
	 * 卡片更新
	 */
	@RequestMapping("/updateCard")
	public void updateCard(HttpServletRequest request, HttpServletResponse response) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		Long customerId = RequestUtils.getLongParameter(request, "customerId", 0L);
		Long cardId = RequestUtils.getLongParameter(request, "cardId", 0L);
		Long cardTypeId = RequestUtils.getLongParameter(request, "cardTypeId", 0L);
		String cardNumber = RequestUtils.getParameter(request, "cardNumber");
		int type = RequestUtils.getIntParameter(request, "type", -1);// 1改卡号,2改卡id
		if (!RegularCheckUtils.checkCardNum(cardNumber)) {
			ResponseUtils.outputWithJson(response, Result.badResult("卡号应仅包含数字和字母,20位以内"));
			return;
		}
		if (type == -1) {
			ResponseUtils.outputWithJson(response, Result.badResult("请选择正确操作"));
			return;
		}
		Result result = estoreCardService.updateCard(cardId, cardTypeId, cardNumber, type, storeId);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "用户管理";
			String oper = "";
			if (type == 1) {
				oper = "更新用户卡号";
			} else if (type == 2) {
				oper = "更新用户卡片";
			}
			String context = oper + "，企业id为:{0} 用户id为:{1} 卡片id为:{2} 卡片种类id为:{3}";
			logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "对用户卡片进行了更新,用户id为：" + customerId + "卡片id为：" + cardId + "卡号为：" + cardNumber);
			userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId, customerId, cardId, cardTypeId }),
					UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, Result.rightResult(result));
	}

	/*
	 * 积分余额修改
	 */
	@RequestMapping("/updateAccount")
	public void updateAccount(HttpServletRequest request, HttpServletResponse response) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long customerId = RequestUtils.getLongParameter(request, "customerId", 0L);
		int type = RequestUtils.getIntParameter(request, "type", -1);// 1改积分,2改余额\
		int operType = RequestUtils.getIntParameter(request, "operType", -1);// 1加2减
		BigDecimal num = RequestUtils.getBigDecimalParameter(request, "num", new BigDecimal(0));
		if (type == -1 || operType == -1) {
			ResponseUtils.outputWithJson(response, Result.badResult("请选择正确操作"));
			return;
		}
		
		Result result = estoreCustomerService.updateAccount(customerId, num, eadto, type, operType);
		ResponseUtils.outputWithJson(response, Result.rightResult(result));
	}

	/*
	 * 余额流水
	 */
	@RequestMapping("/findBalanceRecord")
	public void findBalanceRecord(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long userCustomerId = RequestUtils.getLongParameter(request, "userCustomerId", 0L);
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<EstoreCustomerBalanceRecordDTO> ecbdto = estoreCustomerService.findBalanceRecord(userCustomerId, (start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(ecbdto));

	}

	/*
	 * 积分流水
	 */
	@RequestMapping("/findScoreRecord")
	public void findScoreRecord(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long userCustomerId = RequestUtils.getLongParameter(request, "userCustomerId", 0L);
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<EstoreCustomerScoreRecordDTO> ecsr = estoreCustomerService.findScoreRecord(userCustomerId, (start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(ecsr));

	}
}
