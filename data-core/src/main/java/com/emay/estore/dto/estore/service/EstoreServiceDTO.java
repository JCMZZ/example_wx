package com.emay.estore.dto.estore.service;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreServiceDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private Long id;
	/**
	 * 商户id
	 */
	private Long storeId;
	/**
	 * 商品id
	 */
	private Long goodsId;
	/**
	 * 推荐方式1sms
	 */
	private Integer serviceMode;
	/**
	 * 服务类型1新客2老客3自主
	 */
	private Integer serviceType;
	/**
	 * 服务状态[0-未推送，1-待支付，2-支付成功，3-支付失败]
	 */
	private Integer serviceState;
	/**
	 * 服务费用
	 */
	private BigDecimal servicePrice;
	/**
	 * 服务人数
	 */
	private Integer servicePeopleNum;
	/**
	 * 操作人b端id
	 */
	private Long operatrAdminId;
	/**
	 * 购买服务时间
	 */
	private Date serviceTime;
	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 产品名称
	 */
	private String name;

	/**
	 * 商户名称
	 */
	private String storeName;

	/**
	 * 短信真实条数
	 */
	private Integer realNum;
	/**
	 * 短信内容
	 */
	private String content;
	
	/**
	 * 批次id
	 */
	private Long batchId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Long getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}

	public Integer getServiceMode() {
		return serviceMode;
	}

	public void setServiceMode(Integer serviceMode) {
		this.serviceMode = serviceMode;
	}

	public Integer getServiceType() {
		return serviceType;
	}

	public void setServiceType(Integer serviceType) {
		this.serviceType = serviceType;
	}

	public Integer getServiceState() {
		return serviceState;
	}

	public void setServiceState(Integer serviceState) {
		this.serviceState = serviceState;
	}

	public BigDecimal getServicePrice() {
		return servicePrice;
	}

	public void setServicePrice(BigDecimal servicePrice) {
		this.servicePrice = servicePrice;
	}

	public Integer getServicePeopleNum() {
		return servicePeopleNum;
	}

	public void setServicePeopleNum(Integer servicePeopleNum) {
		this.servicePeopleNum = servicePeopleNum;
	}

	public Long getOperatrAdminId() {
		return operatrAdminId;
	}

	public void setOperatrAdminId(Long operatrAdminId) {
		this.operatrAdminId = operatrAdminId;
	}

	public Date getServiceTime() {
		return serviceTime;
	}

	public void setServiceTime(Date serviceTime) {
		this.serviceTime = serviceTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public Integer getRealNum() {
		return realNum;
	}

	public void setRealNum(Integer realNum) {
		this.realNum = realNum;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

}
