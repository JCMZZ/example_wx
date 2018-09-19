package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import cn.emay.common.db.Page;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreServiceDao;
import com.emay.estore.dto.estore.service.EstoreServiceDTO;
import com.emay.estore.pojo.estore.EstoreService;
import com.emay.estore.util.RegularCheckUtils;

@Repository
public class EstoreServiceDaoImpl extends BaseSuperDaoImpl<EstoreService> implements EstoreServiceDao {

	@Override
	public Page<EstoreServiceDTO> findPage(Long storeId, Integer serviceType, Integer serviceState, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select s.id,s.store_id,s.goods_id,s.service_mode,s.service_type,s.service_state,s.service_price,s.service_people_num,s.service_time,s.create_time,g.name from estore_service s left join estore_goods g on s.goods_id = g.id where s.store_id = ?";
		parameters.add(storeId);
		if (serviceType != null && serviceType.intValue() > -1) {
			sql += " and s.service_type = ?";
			parameters.add(serviceType);
		}
		if (serviceState.intValue() == 0) {// 待推荐
			sql += " and (s.service_state = ? or s.service_state = ?)";
			parameters.add(EstoreService.SERVICE_STATE_NON_PUSH);
			parameters.add(EstoreService.SERVICE_STATE_PAYMENT_FAIL);

		} else if (serviceState.intValue() == 1) {// 待付费
			sql += " and (s.service_state = ? or s.service_state = ?)";
			parameters.add(EstoreService.SERVICE_STATE_TO_PAY);
			parameters.add(EstoreService.SERVICE_STATE_PAYMENT_FAIL);

		} else if (serviceState.intValue() == 2) {// 已付费
			sql += " and s.service_state = ?";
			parameters.add(EstoreService.SERVICE_STATE_PAYMENT_SUCCESS);
		}
		return this.findSqlForPageForMysql(EstoreServiceDTO.class, sql, parameters, start, limit);
	}

	@Override
	public Page<EstoreServiceDTO> findManagePage(String storeName, Integer serviceType, Integer serviceState, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select s.id,s.store_id,s.goods_id,s.service_type,s.service_state,s.service_price,s.service_people_num,s.operator_admin_id,s.service_time,s.create_time,es.name as storeName,b.real_num,b.content,b.id as batchId "
				+ " from estore_service s left join estore_store es on s.store_id= es.id left join estore_service_sms_batch b on s.id = b.service_id where 1=1 ";
		if (!StringUtils.isEmpty(storeName)) {
			sql += " and es.name like ?";
			parameters.add("%" + RegularCheckUtils.specialCodeEscape(storeName) + "%");
		}
		if (serviceType != null && serviceType.intValue() > 0) {
			sql += " and s.service_type = ?";
			parameters.add(serviceType);
		}
		if (serviceState != null && serviceState.intValue() > -1) {
			sql += " and s.service_state = ?";
			parameters.add(serviceState);
		}
		return this.findSqlForPageForMysql(EstoreServiceDTO.class, sql, parameters, start, limit);
	}

	@Override
	public void updateServiceOutTradeNo(Long serviceId, String out_trade_no) {
		String sql = "update estore_service s set s.out_trade_no= ? where s.id = ? ";
		List<Object> params = new ArrayList<Object>();
		params.add(out_trade_no);
		params.add(serviceId);
		this.jdbcTemplate.update(sql, params.toArray());

	}

	@Override
	public void updateServiceState(Long serviceId, Integer serviceState, String return_code, String transaction_id) {
		String sql = "update estore_service s set s.wx_order_state= ?, s.wx_order_no=?, service_state= ? where s.id = ? ";
		List<Object> params = new ArrayList<Object>();
		params.add(return_code);
		params.add(transaction_id);
		params.add(serviceState);
		params.add(serviceId);
		this.jdbcTemplate.update(sql, params.toArray());

	}
	
	@Override
	public EstoreService findServiceByProperty(String fieldName, Object value) {
		return this.findByProperty(fieldName, value);
	}

}
