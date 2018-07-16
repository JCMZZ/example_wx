package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreCustomer implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private Long id;
	/**
	 * 多平台用户唯一标识
	 */
	private String unionid;
	/**
	 * 微信id
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
	 * 商户id
	 */
	private Long storeId;
	/**
	 * 余额
	 */
	private BigDecimal balance;
	/**
	 * 积分
	 */
	private BigDecimal score;
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

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public BigDecimal getScore() {
		return score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
