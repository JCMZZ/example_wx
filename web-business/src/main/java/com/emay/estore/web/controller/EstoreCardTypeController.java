package com.emay.estore.web.controller;

import java.text.MessageFormat;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreCardType;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreCardTypeService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.RegularCheckUtils;
import com.emay.estore.web.utils.WebUtils;

@Controller
@RequestMapping("/cardType")
public class EstoreCardTypeController {
	@Resource
	private EstoreCardTypeService estoreCardTypeService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreCardTypeController.class);

	@RequestMapping("/updateCardDescribe")
	public void updateCardDescribe(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long cardId = RequestUtils.getLongParameter(request, "cardId", 0L);
		String cardDescribe = RequestUtils.getParameter(request, "cardDescribe");
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		if (StringUtils.isBlank(cardDescribe)) {
			ResponseUtils.outputWithJson(response, Result.badResult("说明不能为空"));
			return;
		}
		if (cardDescribe.length() > 300) {
			ResponseUtils.outputWithJson(response, Result.badResult("说明应少于300字"));
			return;
		}
		Result result = estoreCardTypeService.updateCardDescribe(cardId, cardDescribe);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "卡片管理";
			String context = "编辑卡片说明，卡片id：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { cardId }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>卡片管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑卡片说明，卡片id：" + cardId);
		}
		ResponseUtils.outputWithJson(response, result);

	}

	@RequestMapping("/findCardType")
	public void fingCardType(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		List<EstoreCardType> list = estoreCardTypeService.findEstoreCardTypes(eadto.getStoreId());
		ResponseUtils.outputWithJson(response, Result.rightResult(list));

	}

	@RequestMapping("/updateName")
	public void updateName(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);
		String name = RequestUtils.getParameter(request, "name");
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		if (!RegularCheckUtils.checkCardName(name)) {
			ResponseUtils.outputWithJson(response, Result.badResult("卡片户名称有误"));
			return;
		}
		Result result = estoreCardTypeService.updateName(id, name);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "卡片管理";
			String context = "编辑卡片名称为:{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { name }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>卡片管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑卡片名称为：" + name);
		}
		ResponseUtils.outputWithJson(response, result);
	}

}
