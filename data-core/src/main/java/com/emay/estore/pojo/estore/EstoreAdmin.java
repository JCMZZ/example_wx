package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.util.Date;

public class EstoreAdmin implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final Integer BIND = 0; //绑定
	public static final Integer DEBIND = 1; //解绑
	
	/**
	 * id
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
	 * 创建时间
	 */
	private Date createTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
