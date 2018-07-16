package com.emay.estore.dto.system.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.emay.estore.pojo.system.AuthPage;

public class PageDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * ID
	 */
	private Long id;

	/**
	 * 页面名称
	 */
	private String name;

	/**
	 * 权限CODE
	 */
	private String authCode;

	/**
	 * 页面URL
	 */
	private String pageUrl;

	/**
	 * 所有操作
	 */
	private List<OperDTO> opers = new ArrayList<OperDTO>();

	public PageDTO() {

	}

	public PageDTO(AuthPage page) {
		this.id = page.getId();
		this.name = page.getName();
		this.authCode = page.getAuthCode();
		this.pageUrl = page.getPageUrl();
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

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}

	public List<OperDTO> getOpers() {
		return opers;
	}

	public void setOpers(List<OperDTO> opers) {
		this.opers = opers;
	}

}
