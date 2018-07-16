package com.emay.estore.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.auth.OperationAuth;
import com.emay.estore.auth.PageAuth;
import com.emay.estore.dto.system.auth.AuthTree;
import com.emay.estore.dto.system.auth.RoleAuthDTO;
import com.emay.estore.pojo.system.Role;
import com.emay.estore.service.system.UserAuthService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

/**
 * 角色
 * 
 * @author 东旭
 *
 */
@PageAuth("ROLE")
@Controller
@RequestMapping(value = "/role")
public class RoleController {

	@Resource
	private UserAuthService authService;

	/**
	 * 角色管理页面
	 */
	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "role";
	}

	/**
	 * 角色列表
	 */
	@RequestMapping("/ajax/list")
	public void rolelist(HttpServletRequest request, HttpServletResponse response) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Page<Role> userpage = authService.findPage(start, limit);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put(Page.CURRENT_PAGE, userpage.getCurrentPageNum());
//		map.put(Page.DATA_LIST, userpage.getList());
//		map.put(Page.LIMIT, userpage.getLimit());
//		map.put(Page.START, userpage.getStart());
//		map.put(Page.TOTAL_COUNT, userpage.getTotalCount());
//		map.put(Page.TOTAL_PAGE, userpage.getTotalPage());
		ResponseUtils.outputWithJson(response, Result.rightResult(userpage));
	}

	/**
	 * 角色所有权限
	 */
	@RequestMapping("/ajax/roleauth")
	public void userauth(HttpServletRequest request, HttpServletResponse response) {
		Long roleId = RequestUtils.getLongParameter(request, "roleId", 0l);
		if (roleId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("角色不存在"));
			return;
		}
		Result result = authService.findAllAuthByRoleId(roleId);
		if(!result.getSuccess()){
			ResponseUtils.outputWithJson(response, result);
			return;
		}
		Object[] objs = (Object[]) result.getResult();
		RoleAuthDTO rad = (RoleAuthDTO) objs[1];
		String roleName = (String) objs[0];
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("roleauth", rad);
		map.put("roleName", roleName);
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

	/**
	 * 所有权限
	 */
	@RequestMapping("/ajax/authtree")
	public void authtree(HttpServletRequest request, HttpServletResponse response) {
		AuthTree dto = authService.findSystemAuthTree();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("allauth",dto);// 系统权限树
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

	/**
	 * 修改角色权限
	 */
	@OperationAuth("EDIT_ROLE")
	@RequestMapping("/ajax/modify")
	public void modify(HttpServletRequest request, HttpServletResponse response) {
		String pageauths = RequestUtils.getParameter(request, "pageauths");
		String operauths = RequestUtils.getParameter(request, "operauths");
		String roleName = RequestUtils.getParameter(request, "roleName");
		Long roleId = RequestUtils.getLongParameter(request, "roleId", 0l);
		boolean isHasAuth = (operauths != null && operauths.trim().length() != 0) || (pageauths != null && pageauths.trim().length() != 0);
		if (!isHasAuth || roleName == null || roleName.trim().length() == 0 || roleId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("角色名与权限均不允许为空"));
			return;
		}
		if(pageauths == null || pageauths.trim().length() == 0){
			ResponseUtils.outputWithJson(response, Result.badResult("角色页面权限不允许为空"));
			return;
		}
		if (roleId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("超管角色不能编辑"));
			return;
		}
		Result result = authService.modifyRole(pageauths, operauths, roleName, roleId);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 添加角色
	 */
	@OperationAuth("ADD_ROLE")
	@RequestMapping("/ajax/add")
	public void add(HttpServletRequest request, HttpServletResponse response) {
		String pageauths = RequestUtils.getParameter(request, "pageauths");
		String operauths = RequestUtils.getParameter(request, "operauths");
		String roleName = RequestUtils.getParameter(request, "roleName");
		boolean isHasAuth = (operauths != null && operauths.trim().length() != 0) || (pageauths != null && pageauths.trim().length() != 0);
		if (!isHasAuth || roleName == null || roleName.trim().length() == 0) {
			ResponseUtils.outputWithJson(response, Result.badResult("角色名与权限均不允许为空"));
			return;
		}
		if(pageauths == null || pageauths.trim().length() == 0){
			ResponseUtils.outputWithJson(response, Result.badResult("角色页面权限不允许为空"));
			return;
		}
		Result result = authService.addRole(pageauths, operauths, roleName);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 删除角色
	 */
	@OperationAuth("DELETE_ROLE")
	@RequestMapping("/ajax/delete")
	public void delete(HttpServletRequest request, HttpServletResponse response) {
		Long roleId = RequestUtils.getLongParameter(request, "roleId", 0l);
		if (roleId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("角色不存在"));
			return;
		}
		if (roleId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("超管角色不能删除"));
			return;
		}
		Result result = authService.deleteRole(roleId);
		ResponseUtils.outputWithJson(response, result);
	}

}
