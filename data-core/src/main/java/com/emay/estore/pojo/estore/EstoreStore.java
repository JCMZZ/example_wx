package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import com.emay.estore.dto.estore.StoreDTO;

public class EstoreStore implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 商户启用
	 */
	public static final Integer ON = 0;
	/**
	 * 商户停用
	 */
	public static final Integer OFF = 1;
	/**
	 * id
	 */
	private Long id;
	/**
	 * 商户名称
	 */
	private String name;
	/**
	 * 小程序app_id
	 */
	private String appId;
	/**
	 * 小程序app_secret
	 */
	private String appSecret;
	/**
	 * 地址
	 */
	private String address;
	/**
	 * 手机号
	 */
	private String mobile;

	/**
	 * 营业执照号
	 */
	private String storeLicence;
	/**
	 * 描述
	 */
	private String storeDescribe;
	/**
	 * 经度
	 */
	private BigDecimal longitude;
	/**
	 * 维度
	 */
	private BigDecimal dimension;
	/**
	 * 状态
	 */
	private Integer state;
	/**
	 * 创建时间
	 */
	private Date createTime;

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

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getAppSecret() {
		return appSecret;
	}

	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret;
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

	public String getStoreLicence() {
		return storeLicence;
	}

	public void setStoreLicence(String storeLicence) {
		this.storeLicence = storeLicence;
	}

	public String getStoreDescribe() {
		return storeDescribe;
	}

	public void setStoreDescribe(String storeDescribe) {
		this.storeDescribe = storeDescribe;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public StoreDTO getDTO() {
		StoreDTO dto = new StoreDTO();
		dto.setId(id);
		dto.setAddress(address);
		dto.setDescribe(storeDescribe);
		dto.setMobile(mobile);
		dto.setLongitude(longitude);
		dto.setDimension(dimension);
		dto.setStoreName(name);
		return dto;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
}
