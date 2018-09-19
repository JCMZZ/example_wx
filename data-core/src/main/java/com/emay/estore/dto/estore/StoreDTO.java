package com.emay.estore.dto.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 小程序返回商户dto
 *
 */
public class StoreDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * id
	 */
	private Long id;
	/**
	 * 地址
	 */
	private String address;
	/**
	 * 名称
	 */
	private String storeName;
	/**
	 * 手机号
	 */
	private String mobile;
	/**
	 * 描述
	 */
	private String describe;
	/**
	 * 经度
	 */
	private BigDecimal longitude;
	/**
	 * 维度
	 */
	private BigDecimal dimension;
	/**
	 * 图片地址
	 */
	private List<String> imgList;
	
	/**
	 * 广告位链接地址
	 */
	private String adLinkPath;
	
	/**
	 * 广告位图片地址
	 */
	private String adImagePath;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public BigDecimal getDimension() {
		return dimension;
	}

	public void setDimension(BigDecimal dimension) {
		this.dimension = dimension;
	}

	public List<String> getImgList() {
		return imgList;
	}

	public void setImgList(List<String> imgList) {
		this.imgList = imgList;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getAdLinkPath() {
		return adLinkPath;
	}

	public void setAdLinkPath(String adLinkPath) {
		this.adLinkPath = adLinkPath;
	}

	public String getAdImagePath() {
		return adImagePath;
	}

	public void setAdImagePath(String adImagePath) {
		this.adImagePath = adImagePath;
	}
	

}
