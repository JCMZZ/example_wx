package com.emay.estore.web.controller;

import java.text.MessageFormat;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.constant.ServiceTypeEnum;
import com.emay.estore.dto.estore.service.EstoreServiceDTO;
import com.emay.estore.dto.estore.service.SimpleEstoreServiceDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreCustomerService;
import com.emay.estore.service.estore.EstoreServiceService;
import com.emay.estore.service.estore.EstoreServiceSmsBatchService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.web.utils.WebUtils;

@Controller
@RequestMapping("/service")
public class EstoreServiceController {
	@Resource
	private EstoreServiceService estoreServiceService;
	@Resource
	private EstoreServiceSmsBatchService estoreServiceSmsBatchService;
	@Resource
	private EstoreCustomerService estoreCustomerService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreServiceController.class);

	/**
	 * 增值服务列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/selectService")
	public void selectService(HttpServletRequest request, HttpServletResponse response) {
		Integer serviceType = RequestUtils.getIntParameter(request, "serviceType", 1);// 服务类型1新客2老客3自主
		Integer serviceState = RequestUtils.getIntParameter(request, "serviceState", 0);// 状态[0-待推荐，1-待付费，2-已付费]
		int start = RequestUtils.getIntParameter(request, "start", 1);// 当前页码
		int limit = RequestUtils.getIntParameter(request, "limit", 20);

		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		Page<EstoreServiceDTO> page = estoreServiceService.findPage(storeId, serviceType, serviceState, (start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/**
	 * 自主营销用户列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/selectUser")
	public void selectUser(HttpServletRequest request, HttpServletResponse response) {
		Integer orderType = RequestUtils.getIntParameter(request, "orderType", 0);// 排序类型：1余额2积分3等级
		Integer orderMethod = RequestUtils.getIntParameter(request, "orderMethod", 0);// 排序方式：1正序2倒序
		int start = RequestUtils.getIntParameter(request, "start", 1);// 当前页码
		int limit = RequestUtils.getIntParameter(request, "limit", 20);

		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		Page<EstoreCustomerInfoDTO> page = estoreCustomerService.findPage(storeId, orderType, orderMethod, (start - 1) * limit, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/**
	 * 编辑短信生成批次
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/batch")
	public void batch(HttpServletRequest request, HttpServletResponse response) {
		Long serviceId = RequestUtils.getLongParameter(request, "serviceId", 0l);// 服务id
		String content = RequestUtils.getParameter(request, "content");// 短信内容
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		if (serviceId == null || serviceId.longValue() <= 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}
		Result result = checkContent(content);
		if (!result.getSuccess()) {
			ResponseUtils.outputWithJson(response, result);
			return;
		}
		EstoreServiceSmsBatch batch = estoreServiceSmsBatchService.findByServiceId(serviceId);
		if (batch == null) {
			result = estoreServiceSmsBatchService.saveSmsBatch(serviceId, content, currentUser.getId());
		} else {
			result = estoreServiceSmsBatchService.updateSmsBatch(batch, content, currentUser.getId());
		}
		if (result.getSuccess()) {
			SimpleEstoreServiceDTO dto = (SimpleEstoreServiceDTO) result.getResult();
			String service = "小程序b端服务";
			String module = "智能营销";
			if (dto.getServiceType().intValue() == Integer.parseInt(ServiceTypeEnum.SERVICE_TYPE_OLD.getCode())) {
				module = "精准营销";
			}
			String context = "编辑短信内容：{0}，服务id：{1}";
			logger.info("【小程序b端服务>"+module+"】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑短信内容：" + content + "，服务id：" + serviceId);
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { content, serviceId }), UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 自主营销编辑短信生成服务、批次
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ownBatch")
	public void ownBatch(HttpServletRequest request, HttpServletResponse response) {
		String customerIds = RequestUtils.getParameter(request, "customerIds");// 客户ids
		String content = RequestUtils.getParameter(request, "content");// 短信内容
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		if (StringUtils.isEmpty(customerIds)) {
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}
		String[] cids = customerIds.split(",");
		if (cids.length > 1000) {
			ResponseUtils.outputWithJson(response, Result.badResult("所选用户过多"));
			return;
		}
		// 是否校验用户有效性todo

		Result result = checkContent(content);
		if (!result.getSuccess()) {
			ResponseUtils.outputWithJson(response, result);
			return;
		}
		result = estoreServiceSmsBatchService.saveOwnSmsBatch(customerIds, content, currentUser);
		if (result.getSuccess()) {
			SimpleEstoreServiceDTO dto = (SimpleEstoreServiceDTO) result.getResult();
			String service = "小程序b端服务";
			String module = "自主营销";
			String context = "编辑短信内容：{0}，服务id：{1}";
			logger.info("【小程序b端服务>自主营销】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑短信内容：" + content + "，服务id：" + dto.getId());
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { content, dto.getId() }), UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	private Result checkContent(String content) {
		if (StringUtils.isEmpty(content)) {
			return Result.badResult("短信内容不能为空");
		}
		if (content.length() > 1000) {
			return Result.badResult("短信内容不能超过1000字");
		}
		return Result.rightResult();
	}

}
