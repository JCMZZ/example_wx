package com.emay.estore.dto.estore.user;

import java.io.Serializable;

/**
 * 缓存用户信息dto
 *
 */
public class EstoreCacheUserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * estore_customer或者estore_admin表id
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
	 * 商户id
	 */
	private Long storeId;
	/**
	 * 手机号
	 */
	private String mobile;

	public EstoreCacheUserDTO() {

	}

	public EstoreCacheUserDTO(Long id, String unionid, String wxOpenId, Long userId, Long storeId) {
		this.id = id;
		this.unionid = unionid;
		this.wxOpenId = wxOpenId;
		this.userId = userId;
		this.storeId = storeId;
	}

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

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
