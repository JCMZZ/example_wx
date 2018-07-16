package com.emay.estore.dto.estore.user;

import java.io.Serializable;

public class EstoreCustomerCardRecordDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * id
	 */
	private Long id;
	
	/**
	 * 卡号
	 */
	private String number;
	/**
	 * 卡片等级
	 */
	private Integer level;
	/**
	 * 商户id
	 */
	private Long storeId;
	/**
	 * 卡片名称
	 */
	private String name;
	/**
	 * 卡片描述
	 */
	private String cardDescribe;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public Long getStoreId() {
		return storeId;
	}
	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCardDescribe() {
		return cardDescribe;
	}
	public void setCardDescribe(String cardDescribe) {
		this.cardDescribe = cardDescribe;
	}
	

}
