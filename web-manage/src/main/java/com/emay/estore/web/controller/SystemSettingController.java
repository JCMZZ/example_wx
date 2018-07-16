package com.emay.estore.web.controller;

import java.text.MessageFormat;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.pojo.system.Settings;
import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.system.SettingsService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.RegularCheckUtils;
import com.emay.estore.web.utils.WebUtils;

/**
 * 系统配置
 * 
 */
@PageAuth("SETTING")
@RequestMapping("/setting")
@Controller
public class SystemSettingController {

	private static Logger log = Logger.getLogger(SystemSettingController.class);

	@Resource
	private SettingsService settingsService;
	@Resource
	private UserOperLogService userOperLogService;

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "setting";
	}

	/**
	 * 配置列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response) {
		List<Settings> list = settingsService.findAll();// 系统配置
		ResponseUtils.outputWithJson(response, Result.rightResult(list));
	}

	/**
	 * 修改系统配置
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ajax/modify")
	public void modify(HttpServletRequest request, HttpServletResponse response) {
		String settingKey = RequestUtils.getParameter(request, "settingKey");
		String settingValue = RequestUtils.getParameter(request, "settingValue");
		if (StringUtils.isEmpty(settingKey)) {
			ResponseUtils.outputWithJson(response, Result.badResult("系统配置不存在"));
			return;
		}
		if (StringUtils.isEmpty(settingValue)) {
			ResponseUtils.outputWithJson(response, Result.badResult("修改信息不能为空"));
			return;
		}

		Result result = null;
		String depict = "";
		Settings ssetting = settingsService.findByKey(settingKey);
		if (ssetting == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("系统配置不存在"));
			return;
		}
		if (settingKey.equals("sms_split_number")) {
			if (!RegularCheckUtils.checkPositiveInteger(settingValue)) {
				ResponseUtils.outputWithJson(response, Result.badResult("请输入正整数"));
				return;
			}
			if (settingValue.length() > 3) {
				ResponseUtils.outputWithJson(response, Result.badResult("修改内容不能超过3位"));
				return;
			}
		}
		ssetting.setSettingValue(settingValue);
		result = settingsService.updateSettings(ssetting);
		depict = ssetting.getDepict();
		if (result.getSuccess()) {
			User currentUser = WebUtils.getCurrentUser(request, response);
			String service = "小程序pc服务";
			String module = "系统配置";
			String context = "修改系统配置,配置名称为 {0}";
			userOperLogService.saveLog(service, module, currentUser.getId(),currentUser.getUsername(), MessageFormat.format(context, new Object[] { depict }), UserOperLog.OPERATE_MODIFY);
			log.info("用户:" + currentUser.getUsername() + "修改基础数据中的系统配置:" + depict);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 配置详细信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ajax/detail")
	public void detail(HttpServletRequest request, HttpServletResponse response) {
		String settingKey = RequestUtils.getParameter(request, "settingKey");
		if (StringUtils.isEmpty(settingKey)) {
			ResponseUtils.outputWithJson(response, Result.badResult("系统配置不存在"));
			return;
		}
		Settings setting = settingsService.findByKey(settingKey);
		ResponseUtils.outputWithJson(response, Result.rightResult(setting));
	}
}
