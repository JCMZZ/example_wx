package com.emay.estore.dao.estore.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreStoreDao;
import com.emay.estore.pojo.estore.EstoreStore;

import cn.emay.common.db.Page;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Repository
public class EstoreStoreDaoImpl extends BaseSuperDaoImpl<EstoreStore> implements EstoreStoreDao {

	@Override
	public void updateDescribe(Long storeId, String describe) {
		String hql = " update EstoreStore set storeDescribe = :describe where id = :storeId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("describe", describe);
		params.put("storeId", storeId);
		this.execByHql(hql, params);
	}

	@Override
	public void updateMobile(Long storeId, String mobile) {
		String hql = " update EstoreStore set mobile = :mobile where id = :storeId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mobile", mobile);
		params.put("storeId", storeId);
		this.execByHql(hql, params);
	}

	@Override
	public void updateAddress(Long storeId, String address, BigDecimal longitude, BigDecimal dimension) {
		String hql = " update EstoreStore set address = :address,longitude = :longitude,dimension = :dimension  where id = :storeId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("address", address);
		params.put("longitude", longitude);
		params.put("dimension", dimension);
		params.put("storeId", storeId);
		this.execByHql(hql, params);
	}

	@Override
	public Page<EstoreStore> findStore(int start, int limit, String name, String storeLicence, String appId, String appSecret, String mobile) {
		StringBuffer sql = new StringBuffer("select s.id,s.name,s.store_licence,s.app_id,s.app_secret,s.state ");
		List<Object> list = new ArrayList<Object>();
		if (!StringUtils.isBlank(mobile)) {
			sql.append(" from estore_store s,estore_admin a,estore_user u where 1=1 and a.store_id = s.id and a.user_id = u.id and u.mobile = ? ");
			list.add(mobile);
		} else {
			sql.append(" from estore_store s where 1=1 ");
		}
		if (!StringUtils.isBlank(name)) {
			sql.append("and s.name like ? ");
			list.add("%" + name + "%");
		}
		if (!StringUtils.isBlank(storeLicence)) {
			sql.append("and s.store_licence = ? ");
			list.add(storeLicence);
		}
		if (!StringUtils.isBlank(appId)) {
			sql.append("and s.app_id = ? ");
			list.add(appId);
		}
		if (!StringUtils.isBlank(appSecret)) {
			sql.append("and s.app_secret = ? ");
			list.add(appSecret);
		}
		sql.append(" order by s.id desc");
		return this.findSqlForPageForMysql(EstoreStore.class, sql.toString(), list, start, limit);
	}

	@Override
	public void updateStore(String name, String storeLicence, String appId, String appSecret, Long storeId) {
		String sql = "update estore_store s set s.store_licence = '" + storeLicence + "',s.`name` = '" + name + "'";
		if (!StringUtils.isBlank(appId)) {
			sql += " ,s.app_id = '" + appId + "'";
		}
		if (!StringUtils.isBlank(appSecret)) {
			sql += " ,s.app_secret = '" + appSecret + "'";
		}
		sql += " where s.id = " + storeId;
		this.execSql(sql);

	}

	@Override
	public void updateStoreState(Long storeId, Integer state) {
		String sql = "update estore_store set state = " + state + "  where id = " + storeId;
		this.execSql(sql);
	}

	@Override
	public List<EstoreStore> findRepeatByName(String name, Long storeId) {
		String sql = "select * from estore_store where 1=1 ";
		List<Object> parameters = new ArrayList<Object>();
		if (!StringUtils.isBlank(name)) {
			sql += " and name= ? ";
			parameters.add(name);
		}
		if (null != storeId && storeId != 0l) {
			sql += " and id != ? ";
			parameters.add(storeId);
		}
		return this.findSqlForListObj(EstoreStore.class, sql, parameters);
	}

}
