package com.emay.estore.pojo.estore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class EstoreGoods implements Serializable {

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
	 * 产品排序
	 */
	private Integer sortNum;

	/**
	 * 商品名称
	 */
	private String name;
	/**
	 * 商品描述
	 */
	private String goodsDescribe;
	/**
	 * 商品原价格
	 */
	private BigDecimal price;
	/**
	 * 商品折扣
	 */
	private BigDecimal discount;
	/**
	 * 商品折扣价
	 */
	private BigDecimal discountPrice;
	/**
	 * 创建时间
	 * 
	 */
	private Date createTime;
	/**
	 * 是否删除 0:未删除,1:已删除
	 */
	private Boolean isDelete;

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

	public Integer getSortNum() {
		return sortNum;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGoodsDescribe() {
		return goodsDescribe;
	}

	public void setGoodsDescribe(String goodsDescribe) {
		this.goodsDescribe = goodsDescribe;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(BigDecimal discountPrice) {
		this.discountPrice = discountPrice;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

}
