package com.emay.estore.pojo.system;

import java.io.Serializable;

/**
 * 角色-权限
 * 
 * @author 东旭
 *
 */
public class RoleAuth implements Serializable {

	private static final long serialVersionUID = 1L;

	public final static String AUTH_TYPE_PAGE = "PAGE";// 页面权限
	public final static String AUTH_TYPE_OPER = "OPER";// 操作权限

	/**
	 * ID
	 */
	private Long id;

	/**
	 * 角色ID
	 */
	private Long roleId;

	/**
	 * 权限ID
	 */
	private Long authId;

	/**
	 * 权限类型
	 */
	private String type;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getAuthId() {
		return authId;
	}

	public void setAuthId(Long authId) {
		this.authId = authId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
