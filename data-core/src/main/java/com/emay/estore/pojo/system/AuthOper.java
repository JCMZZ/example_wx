package com.emay.estore.pojo.system;

import java.io.Serializable;

/**
 * 操作权限
 * 
 * @author 东旭
 *
 */
public class AuthOper implements Serializable {

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
	 * 操作顺序
	 */
	private Integer index;

	/**
	 * 权限CODE
	 */
	private String authCode;

	/**
	 * 所属页面权限ID
	 */
	private Long pageAuthId;

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

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public Long getPageAuthId() {
		return pageAuthId;
	}

	public void setPageAuthId(Long pageAuthId) {
		this.pageAuthId = pageAuthId;
	}

}
