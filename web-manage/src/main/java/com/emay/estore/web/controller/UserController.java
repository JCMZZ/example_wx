package com.emay.estore.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.auth.OperationAuth;
import com.emay.estore.auth.PageAuth;
import com.emay.estore.dto.system.user.SimpleUserDTO;
import com.emay.estore.dto.system.user.UserDTO;
import com.emay.estore.pojo.system.Role;
import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserRole;
import com.emay.estore.service.system.UserAuthService;
import com.emay.estore.service.system.UserService;
import com.emay.estore.web.utils.WebUtils;

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
@PageAuth("USER")
@Controller
@RequestMapping(value = "/user")
public class UserController {

	@Resource
	private UserAuthService authService;

	@Resource
	private UserService userService;

	/**
	 * 用户管理页面
	 */
	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "user";
	}

	/**
	 * 用户列表
	 */
	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		int state = RequestUtils.getIntParameter(request, "state", -1);
		String username = RequestUtils.getParameter(request, "username");
		Page<User> userpage = userService.findPage(start, limit, username, state);
		List<SimpleUserDTO> dtos = new ArrayList<SimpleUserDTO>();
		for(User user : userpage.getList()){
			SimpleUserDTO dto = new SimpleUserDTO(user);
			dtos.add(dto);
		}
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put(Page.CURRENT_PAGE, userpage.getCurrentPageNum());
//		map.put(Page.DATA_LIST, dtos);
//		map.put(Page.LIMIT, userpage.getLimit());
//		map.put(Page.START, userpage.getStart());
//		map.put(Page.TOTAL_COUNT, userpage.getTotalCount());
//		map.put(Page.TOTAL_PAGE, userpage.getTotalPage());
		ResponseUtils.outputWithJson(response, Result.rightResult(userpage));
	}

	/**
	 * 用户详细信息
	 */
	@RequestMapping("/ajax/userinfo")
	public void userinfo(HttpServletRequest request, HttpServletResponse response) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0l);
		if (userId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		User user = userService.findUserById(userId);
		if (user == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		List<UserRole> userRoles = userService.getUserRoles(userId);
		UserDTO dto = new UserDTO(user, userRoles);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user", dto);// 用户
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

	/**
	 * 系统所有角色
	 */
	@RequestMapping("/ajax/allroles")
	public void allRoles(HttpServletRequest request, HttpServletResponse response) {
		Page<Role> userpage = authService.findPage(0, 0);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("currentPageNum", userpage.getCurrentPageNum());
		map.put(Page.DATA_LIST, userpage.getList());
		map.put(Page.LIMIT, userpage.getLimit());
		map.put(Page.START, userpage.getStart());
		map.put(Page.TOTAL_COUNT, userpage.getTotalCount());
		map.put(Page.TOTAL_PAGE, userpage.getTotalPage());
		map.put("allroles", userpage.getList());// 系统所有角色
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

	/**
	 * 修改用户
	 */
	@OperationAuth("EDIT_USER")
	@RequestMapping("/ajax/modify")
	public void modify(HttpServletRequest request, HttpServletResponse response) {
		String nickname = RequestUtils.getParameter(request, "nickname");
		String password = RequestUtils.getParameter(request, "password");
		String email = RequestUtils.getParameter(request, "email");
		String mobile = RequestUtils.getParameter(request, "mobile");
		String roles = RequestUtils.getParameter(request, "roles");
		Long userId = RequestUtils.getLongParameter(request, "userId", 0l);
		if (userId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		if (userId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("不能操作ADMIN"));
			return;
		}
		if (StringUtils.isEmpty(mobile) || StringUtils.isEmpty(nickname) || StringUtils.isEmpty(password) || StringUtils.isEmpty(email) || StringUtils.isEmpty(roles)) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户信息不能为空"));
			return;
		}
		Result result = userService.modifyUser(nickname, password, email, mobile, roles, userId);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 添加用户
	 */
	@OperationAuth("ADD_USER")
	@RequestMapping("/ajax/add")
	public void add(HttpServletRequest request, HttpServletResponse response) {
		String username = RequestUtils.getParameter(request, "username");
		String nickname = RequestUtils.getParameter(request, "nickname");
		String password = RequestUtils.getParameter(request, "password");
		String email = RequestUtils.getParameter(request, "email");
		String mobile = RequestUtils.getParameter(request, "mobile");
		String roles = RequestUtils.getParameter(request, "roles");
		if (StringUtils.isEmpty(mobile) || StringUtils.isEmpty(username) || StringUtils.isEmpty(nickname) || StringUtils.isEmpty(password) || StringUtils.isEmpty(email) || StringUtils.isEmpty(roles)) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户信息不能为空"));
			return;
		}
		User currentUser = WebUtils.getCurrentUser(request, response);
		Result result = userService.addUser(username, nickname, password, email, mobile, roles, currentUser);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 删除用户
	 */
	@OperationAuth("OPER_USER")
	@RequestMapping("/ajax/delete")
	public void delete(HttpServletRequest request, HttpServletResponse response) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0l);
		if (userId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		if (userId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("不能操作ADMIN"));
			return;
		}
		Result result = userService.deleteUser(userId);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 启用用户
	 */
	@OperationAuth("OPER_USER")
	@RequestMapping("/ajax/on")
	public void on(HttpServletRequest request, HttpServletResponse response) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0l);
		if (userId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		if (userId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("不能操作ADMIN"));
			return;
		}
		Result result = userService.on(userId);
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 停用用户
	 */
	@OperationAuth("OPER_USER")
	@RequestMapping("/ajax/off")
	public void off(HttpServletRequest request, HttpServletResponse response) {
		Long userId = RequestUtils.getLongParameter(request, "userId", 0l);
		if (userId == 0l) {
			ResponseUtils.outputWithJson(response, Result.badResult("用户不存在"));
			return;
		}
		if (userId == 1l) {
			ResponseUtils.outputWithJson(response, Result.badResult("不能操作ADMIN"));
			return;
		}
		Result result = userService.off(userId);
		ResponseUtils.outputWithJson(response, result);
	}

}
