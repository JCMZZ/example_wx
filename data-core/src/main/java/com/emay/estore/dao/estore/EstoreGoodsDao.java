package com.emay.estore.dao.estore;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.pojo.estore.EstoreGoods;

public interface EstoreGoodsDao extends BaseSuperDao<EstoreGoods> {
	/**
	 * 商品列表展示
	 * @param orderType TODO
	 * @param orderMethod TODO
	 */
	public Page<GoodsDTO> findGoods(Long storeId, int start, int limit, Integer orderType, Integer orderMethod);

	// 商品详情
	public List<GoodsDTO> goods(Long goodsId);

	// 修改名称
	public void updateName(Long id, String name);

	// 修改描述
	public void updateDescribe(Long id, String goodsDescribe);

	// 添加商品
	public Result addGoods(Long storeId, String name, String goodsDescribe, BigDecimal price, BigDecimal discountPrice);

	// 商品置顶
	public void updateStick(Long id, Long storeId);

	List<GoodsDTO> findByIds(List<Long> ids);
	public Page<GoodsDTO> findPcGoods(String goodsName, String storeName, Date startDate, Date endDate, int start, int limit);

	GoodsDTO findByName(String name, Long id, Long storeId);

}