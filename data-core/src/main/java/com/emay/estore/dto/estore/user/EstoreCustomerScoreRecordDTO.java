package com.emay.estore.dto.estore.user;

import java.io.Serializable;
import java.math.BigDecimal;

public class EstoreCustomerScoreRecordDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * c端用户id
	 */
	private Long userCustomerId;
	/**
	 * 变更类型
	 */
	private String type;
	/**
	 * 变更后余额
	 */
	private BigDecimal changeScore;
	/**
	 * 创建时间
	 */
	private String createTime;

	public Long getUserCustomerId() {
		return userCustomerId;
	}

	public void setUserCustomerId(Long userCustomerId) {
		this.userCustomerId = userCustomerId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public BigDecimal getChangeScore() {
		return changeScore;
	}

	public void setChangeScore(BigDecimal changeScore) {
		this.changeScore = changeScore;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
