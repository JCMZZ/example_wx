package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreService implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final int SERVICE_STATE_NON_PUSH= 0;// 未推送
	public static final int SERVICE_STATE_TO_PAY= 1;// 待支付
	public static final int SERVICE_STATE_PAYMENT_SUCCESS= 2;// 支付成功
	public static final int SERVICE_STATE_PAYMENT_FAIL= 3;// 支付失败
	
	public static final int SERVICE_MODE_SMS= 1;// 推荐方式-短信
	
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
	 * 微信支付订单号
	 */
	private String wxOrderNo;
	/**
	 * 微信支付状态
	 */
	private Integer wxOrderState;
	/**
	 * 我方支付订单号
	 */
	private String outTradeNo;
	/**
	 * 推荐方式1sms
	 */
	private Integer serviceMode;
	/**
	 * 服务类型1新客2老客3自主 ServiceTypeEnum
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

	public Integer getWxOrderState() {
		return wxOrderState;
	}

	public void setWxOrderState(Integer wxOrderState) {
		this.wxOrderState = wxOrderState;
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

	public String getOutTradeNo() {
		return outTradeNo;
	}

	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}

	public String getWxOrderNo() {
		return wxOrderNo;
	}

	public void setWxOrderNo(String wxOrderNo) {
		this.wxOrderNo = wxOrderNo;
	}

}
