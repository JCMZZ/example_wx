package com.emay.estore.dto.system.auth;

import java.io.Serializable;

import com.emay.estore.pojo.system.AuthOper;

public class OperDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	

	/**
	 * ID
	 */
	private Long id;

	/**
	 * 操作名称
	 */
	private String name;

	/**
	 * 权限CODE
	 */
	private String authCode;
	
	public OperDTO(){
		
	}

	public OperDTO(AuthOper oper) {
		this.id = oper.getId();
		this.name = oper.getName();
		this.authCode = oper.getAuthCode();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

}
