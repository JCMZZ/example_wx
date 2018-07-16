package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.util.Date;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */

public class EstoreCard implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/*
	 * id
	 */
	private Long id;

	/*
	 * 卡片种类id
	 */
	private Long cardTypeId;
	/*
	 * 卡号
	 */
	private String number;
	/*
	 * 用户id
	 */
	private Long userCustomerId;
	private Date createTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCardTypeId() {
		return cardTypeId;
	}

	public void setCardTypeId(Long cardTypeId) {
		this.cardTypeId = cardTypeId;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Long getUserCustomerId() {
		return userCustomerId;
	}

	public void setUserCustomerId(Long userCustomerId) {
		this.userCustomerId = userCustomerId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
