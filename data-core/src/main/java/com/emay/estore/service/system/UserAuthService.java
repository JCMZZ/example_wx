package com.emay.estore.service.system;

import com.emay.estore.dto.system.auth.AuthTree;
import com.emay.estore.pojo.system.Role;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

/**
 * @author frank
 */
public interface UserAuthService {

	public Page<Role> findPage(int start, int limit);

	public Result addRole(String pageAuthIds, String operAuthIds, String roleName);

	public Result modifyRole(String pageAuthIds, String operAuthIds, String roleName, Long roleId);

	public Result deleteRole(Long roleId);

	public Result findAllAuthByRoleId(Long roleId);

	public AuthTree findSystemAuthTree();
	
	public AuthTree findUserAuthTree(Long userId);

}