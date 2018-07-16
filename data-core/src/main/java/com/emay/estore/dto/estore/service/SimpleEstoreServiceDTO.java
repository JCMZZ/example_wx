package com.emay.estore.dto.estore.service;

import java.io.Serializable;
import java.math.BigDecimal;

public class SimpleEstoreServiceDTO implements Serializable {

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
	 * 服务费用
	 */
	private BigDecimal servicePrice;
	/**
	 * 服务类型1新客2老客3自主
	 */
	private Integer serviceType;
	
	public SimpleEstoreServiceDTO(){
		
	}
	
	public SimpleEstoreServiceDTO(Long id,BigDecimal servicePrice,Integer serviceType){
		this.id = id;
		this.servicePrice = servicePrice;
		this.serviceType = serviceType;
	}

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

	public BigDecimal getServicePrice() {
		return servicePrice;
	}

	public void setServicePrice(BigDecimal servicePrice) {
		this.servicePrice = servicePrice;
	}

	public Integer getServiceType() {
		return serviceType;
	}

	public void setServiceType(Integer serviceType) {
		this.serviceType = serviceType;
	}

}
