package com.emay.estore.pojo.system;

import java.io.Serializable;

/**
 * 页面权限
 * 
 * @author 东旭
 *
 */
public class AuthPage implements Serializable {

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
     * 页面顺序
     */
    private Integer index;

    /**
     * 权限CODE
     */
    private String authCode;

    /**
     * 页面URL
     */
    private String pageUrl;

    /**
     * 所属导航ID
     */
    private Long navigationId;

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

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}

	public Long getNavigationId() {
		return navigationId;
	}

	public void setNavigationId(Long navigationId) {
		this.navigationId = navigationId;
	}


}
