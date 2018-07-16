package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.util.Date;

public class EstoreServiceSmsDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// 短信发送状态
	public static final int STATE_SENDING = 1;// 发送中
	public static final int STATE_SUCCESS = 2;// 发送成功
	public static final int STATE_FAIL = 3;// 发送失败
	public static final int STATE_TIMEOUT = 4;// 发送超时

	/**
	 * id
	 */
	private Long id;
	/**
	 * 批次id
	 */
	private Long batchId;
	/**
	 * customer用户id
	 */
	private Long userCustomerId;
	/**
	 * 手机号
	 */
	private String mobile;
	/**
	 * 自定义短信id
	 */
	private String customerId;
	/**
	 * 发送时间
	 */
	private Date sendTime;
	/**
	 * 短信发送状态
	 */
	private Integer state;
	/**
	 * 状态报告code
	 */
	private String responseCode;
	/**
	 * 状态报告message
	 */
	private String responseMessage;
	/**
	 * 创建时间
	 */
	private Date createTime;

	public EstoreServiceSmsDetail() {

	}

	public EstoreServiceSmsDetail(Long batchId, Long userCustomerId, String mobile, String customerId, Date sendTime, Integer state, Date createTime) {
		this.batchId = batchId;
		this.userCustomerId = userCustomerId;
		this.mobile = mobile;
		this.customerId = customerId;
		this.sendTime = sendTime;
		this.state = state;
		this.createTime = createTime;
	}
	
	public EstoreServiceSmsDetail(String customerId,Integer state,String responseCode,String responseMessage){
		this.customerId = customerId;
		this.state = state;
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

	public Long getUserCustomerId() {
		return userCustomerId;
	}

	public void setUserCustomerId(Long userCustomerId) {
		this.userCustomerId = userCustomerId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getResponseMessage() {
		return responseMessage;
	}

	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}

}
