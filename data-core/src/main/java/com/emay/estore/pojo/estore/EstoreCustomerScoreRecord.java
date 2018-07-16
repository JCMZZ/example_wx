package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreCustomerScoreRecord implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private Long id;

	/**
	 * 变更类型
	 */
	private Integer type;
	/**
	 * 变更前积分
	 */
	private BigDecimal beforeScore;
	/**
	 * 变更后积分
	 */
	private BigDecimal afterScore;
	/**
	 * 变更积分
	 */
	private BigDecimal changeScore;
	/**
	 * 操作人b端Id
	 */
	private Long operatorAdminId;
	/**
	 * 客户c端Id
	 */
	private Long userCustomerId;
	/**
	 * 商户Id
	 */
	private Long storeId;
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	public EstoreCustomerScoreRecord(){
		
	}

	public EstoreCustomerScoreRecord(Integer type, BigDecimal beforeScore, BigDecimal afterScore, BigDecimal changeScore, Long operatorAdminId, Long userCustomerId, Long storeId, Date createTime) {
		super();
		this.type = type;
		this.beforeScore = beforeScore;
		this.afterScore = afterScore;
		this.changeScore = changeScore;
		this.operatorAdminId = operatorAdminId;
		this.userCustomerId = userCustomerId;
		this.storeId = storeId;
		this.createTime = createTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public BigDecimal getBeforeScore() {
		return beforeScore;
	}

	public void setBeforeScore(BigDecimal beforeScore) {
		this.beforeScore = beforeScore;
	}

	public BigDecimal getAfterScore() {
		return afterScore;
	}

	public void setAfterScore(BigDecimal afterScore) {
		this.afterScore = afterScore;
	}

	public BigDecimal getChangeScore() {
		return changeScore;
	}

	public void setChangeScore(BigDecimal changeScore) {
		this.changeScore = changeScore;
	}

	public Long getOperatorAdminId() {
		return operatorAdminId;
	}

	public void setOperatorAdminId(Long operatorAdminId) {
		this.operatorAdminId = operatorAdminId;
	}

	public Long getUserCustomerId() {
		return userCustomerId;
	}

	public void setUserCustomerId(Long userCustomerId) {
		this.userCustomerId = userCustomerId;
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
