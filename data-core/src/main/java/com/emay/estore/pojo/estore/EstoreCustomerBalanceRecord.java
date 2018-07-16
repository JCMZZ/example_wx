package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreCustomerBalanceRecord implements Serializable {

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
	 * 变更前余额
	 */
	private BigDecimal beforeBalance;
	/**
	 * 变更后余额
	 */
	private BigDecimal afterBalance;
	/**
	 * 变更余额
	 */
	private BigDecimal changeBalance;

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
	
	public EstoreCustomerBalanceRecord(){
		
	}

	public EstoreCustomerBalanceRecord(Integer type, BigDecimal beforeBalance, BigDecimal afterBalance, BigDecimal changeBalance, Long operatorAdminId, Long userCustomerId, Long storeId,
			Date createTime) {
		super();
		this.type = type;
		this.beforeBalance = beforeBalance;
		this.afterBalance = afterBalance;
		this.changeBalance = changeBalance;
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

	public BigDecimal getBeforeBalance() {
		return beforeBalance;
	}

	public void setBeforeBalance(BigDecimal beforeBalance) {
		this.beforeBalance = beforeBalance;
	}

	public BigDecimal getAfterBalance() {
		return afterBalance;
	}

	public void setAfterBalance(BigDecimal afterBalance) {
		this.afterBalance = afterBalance;
	}

	public BigDecimal getChangeBalance() {
		return changeBalance;
	}

	public void setChangeBalance(BigDecimal changeBalance) {
		this.changeBalance = changeBalance;
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
