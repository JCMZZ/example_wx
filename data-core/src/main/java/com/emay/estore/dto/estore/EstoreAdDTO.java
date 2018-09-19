package com.emay.estore.dto.estore;

import java.io.Serializable;

public class EstoreAdDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * id
	 */
	private Long id;
	/**
	 * 链接跳转路径
	 */
	private String linkPath;
	/**
	 * 广告图片url
	 */
	private String imageUrl;
	
	public EstoreAdDTO() {
		
	}

	public EstoreAdDTO(Long id, String linkPath, String imageUrl) {
		this.id = id;
		this.linkPath = linkPath;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLinkPath() {
		return linkPath;
	}

	public void setLinkPath(String linkPath) {
		this.linkPath = linkPath;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


}
