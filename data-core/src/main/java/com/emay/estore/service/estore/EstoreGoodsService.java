package com.emay.estore.service.estore;

import java.math.BigDecimal;
import java.util.Date;

import com.emay.estore.dto.estore.GoodsDTO;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

public interface EstoreGoodsService {
	/**
	 * 商品展示
	 * @param orderType TODO
	 * @param orderMethod TODO
	 * @return
	 */
	public Page<GoodsDTO> findGoods(Long storeId,int start, int limit, Integer orderType, Integer orderMethod);
	/**
	 * 商品详情
	 * @param goodsId
	 * @return
	 */
	Result findGoodsInfo(Long goodsId,Long storeId);
	
	/**
	 * 修改描述
	 */
	public Result updateDescribe(Long  id, String goodsDescribe);
	/**
	 * 修改名称
	 * @param id
	 * @param name
	 * @return
	 */
	public Result updateName(Long id,String name);
	/**
	 * 修改原价
	 * @param id
	 * @param price
	 * @return
	 */
	public Result updatePrice(Long id,BigDecimal price);
	/**
	 * 修改折扣价
	 * @param id
	 * @param discountPrice
	 * @return
	 */
	public Result updateDiscountPrice(Long id,BigDecimal discountPrice);
	/**
	 * 删除商品
	 * @param id
	 * @param storeId TODO
	 * @return
	 */
	public Result deleteGoods(Long id, Long storeId);
	/**
	 * 添加商品
	 * @param storeId
	 */
	public Result addGoods(Long storeId,String name,String goodsDescribe,BigDecimal price,BigDecimal discountPrice);

	/**
	 * 商品置顶
	 * @param sortNum
	 * @param id
	 * @return
	 */
	public Result updateStick(Long id,Long storeId);
	
	Boolean isExist(String goodsName, Long id, Long storeId);
	
	/**
	 * pc端商品详情
	 * @author IYU
	 * 
	 * @param goodsName
	 * @param storeName
	 * @param startDate
	 * @param endDate
	 * @param start
	 * @param limit
	 * @return
	 */
	public Page<GoodsDTO> findPcGoods(String goodsName, String storeName, Date startDate, Date endDate, int start, int limit);


	
}
