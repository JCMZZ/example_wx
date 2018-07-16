package com.emay.estore.dao.estore.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.BigDecimalUtils;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreGoodsDao;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.pojo.estore.EstoreGoods;

@Repository
public class EstoreGoodsDaoImpl extends BaseSuperDaoImpl<EstoreGoods> implements EstoreGoodsDao {
	
	/**
	 * 展示列表商品
	 */
	@Override
	public Page<GoodsDTO> findGoods(Long storeId, int start, int limit, Integer orderType, Integer orderMethod) {
		List<Object> list = new ArrayList<Object>();
		String sql = "select g.id,g.store_id,g.sort_num,g.name,g.price,g.discount,g.discount_price from estore_goods g where g.is_delete =0 and g.store_id= ? ";
		list.add(storeId);
		if(orderType!= null && orderType.intValue() == 1){//价格
			sql += " order by g.discount_price ";
		} else {
			sql += " order by g.sort_num ";
		}
		
		if(orderMethod!= null && orderMethod.intValue() == 0){// 倒序
			sql += " desc ";
		} 
		sql += ",g.id desc";//处理排序字段大量相同数量时，造成的排序分页混乱
		return this.findSqlForPageForMysql(GoodsDTO.class, sql, list, start, limit);
	}

	/**
	 * 商品详情
	 */
	@Override
	public List<GoodsDTO> goods(Long goodsId) {
		String sql = "select * from estore_goods where goodsId= ?";
		List<Object> list = new ArrayList<Object>();
		list.add(goodsId);
		return this.findSqlForListObj(GoodsDTO.class, sql, list);
	}

	/**
	 * 修改名称
	 */

	@Override
	public void updateName(Long id, String name) {
		String hql = " update EstoreGoods set name = :name where id = :id";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("name", name);
		params.put("id", id);
		this.execByHql(hql, params);

	}

	/**
	 * 修改描述
	 */
	@Override
	public void updateDescribe(Long id, String describe) {
		String hql = " update EstoreGoods set goodsDescribe = :describe where id = :id";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("describe", describe);
		params.put("id", id);
		this.execByHql(hql, params);

	}

	/**
	 * 添加商品
	 */

	@Override
	public Result addGoods(Long storeId,String name,String goodsDescribe,BigDecimal price,BigDecimal discountPrice) {
		EstoreGoods entity = new EstoreGoods();
		entity.setStoreId(storeId);
		entity.setName(name);
		entity.setGoodsDescribe(goodsDescribe);
		entity.setPrice(price);
		entity.setDiscountPrice(discountPrice);
		entity.setDiscount(BigDecimalUtils.div(BigDecimalUtils.mul(discountPrice, 10), price, 2));
		entity.setCreateTime(new Date());
		entity.setIsDelete(false);
		entity.setSortNum(0);
		this.save(entity);
		return Result.rightResult(entity.getId());
	}

	/**
	 * 商品置顶
	 */
	@Override
	public void updateStick(Long id,Long storeId) {
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select max(sortNum) from EstoreGoods where storeId= :storeId and isDelete =0";
		params.put("storeId", storeId);
		Object obj = this.getUniqueResult(hql, params);

		hql = "update EstoreGoods set sortNum= :sortNum where id= :id and storeId= :storeId";
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("sortNum", Integer.parseInt(obj.toString()) + 1);
		params.put("storeId", storeId);
		this.execByHql(hql, params);
	}

	@Override
	public List<GoodsDTO> findByIds(List<Long> ids) {
		if (ids == null || ids.size() == 0) {
			return null;
		}
		String sql = "select g.id,g.name from estore_goods g where g.is_delete = 0 and g.id in(" + org.apache.commons.lang3.StringUtils.join(ids, ",") + ")";
		return this.findSqlForListObj(GoodsDTO.class, sql, null);
	}
	
	@Override
	public GoodsDTO findByName(String name, Long id, Long storeId){
		List<Object> params = new ArrayList<Object>();
		String sql = "select id,store_id,name from estore_goods where is_delete=0 and name = ? and store_id = ?";
		params.add(name);
		params.add(storeId);
		if(id!= null && id.longValue() > 0l){
			sql += " and id != ?";
			params.add(id);
		}
		sql += " limit 1";
		List<GoodsDTO> list = this.findSqlForListObj(GoodsDTO.class, sql, params);
		if(list!= null && !list.isEmpty()){
			return list.get(0);
		}
		return null;
	}
	
	@Override
	public Page<GoodsDTO> findPcGoods(String goodsName, String storeName, Date startTime, Date endTime, int start, int limit) {
		String sql = "select g.id,s.`name` as storeName,s.id as storeId,g.`name`,g.goods_describe,g.discount_price,g.create_time from estore_goods g , estore_store s where g.is_delete = 0 and g.store_id = s.id ";
		List<Object> parameters = new ArrayList<Object>();
		if (!StringUtils.isBlank(goodsName)) {
			sql += "and g.name like ? ";
			parameters.add("%" + goodsName + "%");
		}
		if (!StringUtils.isBlank(storeName)) {
			sql += "and s.name like ? ";
			parameters.add("%" + storeName + "%");
		}
		if (null != startTime) {
			sql += " and g.create_time >= ? ";
			parameters.add(startTime);
		}
		if (null != endTime) {
			sql += " and g.create_time <= ? ";
			parameters.add(endTime);
		}
		sql += "order by g.id desc";
		return this.findSqlForPageForMysql(GoodsDTO.class, sql, parameters, start, limit);
	}
}
