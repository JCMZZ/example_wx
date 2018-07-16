package com.emay.estore.dto.estore;

import java.io.Serializable;
import java.util.Date;

public class EstoreCardTypeDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * id
	 */
	private Long id;
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
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	public EstoreCardTypeDTO() {
		
	}

	public EstoreCardTypeDTO(Integer level, Long storeId, String name, String cardDescribe, Date createTime) {
		super();
		this.level = level;
		this.storeId = storeId;
		this.name = name;
		this.cardDescribe = cardDescribe;
		this.createTime = createTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
