package com.emay.estore.dto.estore.user;

import java.io.Serializable;

/**
 * B端用户信息dto
 *
 */
public class EstoreAdminDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 手机号
	 */
	private String mobile;
	/**
	 * 性别1男2女0未知
	 */
	private Integer gender;
	/**
	 * 国家
	 */
	private String country;

	/**
	 * 省份
	 */
	private String province;

	/**
	 * 城市
	 */
	private String city;
	/**
	 * 用户语言
	 */
	private String language;
	/**
	 * 用户绑定状态0未绑定,1绑定
	 */
	private Integer bindState;
	/**
	 * estore_admin表id
	 */
	private Long id;

	/**
	 * 多平台用户唯一标识
	 */
	private String unionid;
	/**
	 * 微信openid
	 */
	private String wxOpenId;
	/**
	 * 用户id
	 */
	private Long userId;
	/**
	 * 昵称
	 */
	private String nickname;
	/**
	 * 商户id(默认0,未绑定商户管理员)
	 */
	private Long storeId;
	/**
	 * 商户名称
	 */
	private String storeName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}

	public String getWxOpenId() {
		return wxOpenId;
	}

	public void setWxOpenId(String wxOpenId) {
		this.wxOpenId = wxOpenId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Integer getBindState() {
		return bindState;
	}

	public void setBindState(Integer bindState) {
		this.bindState = bindState;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

}
