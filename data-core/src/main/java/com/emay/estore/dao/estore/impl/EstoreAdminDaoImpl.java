package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreAdminDao;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreAdmin;

import cn.emay.common.db.Page;

@Repository
public class EstoreAdminDaoImpl extends BaseSuperDaoImpl<EstoreAdmin> implements EstoreAdminDao {

	@Override
	public EstoreAdminDTO findByOpenId(String openId) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select u.mobile,u.gender,u.country,u.province,u.city,u.language,a.id,a.unionid,a.wx_open_id,a.user_id,a.nickname,a.store_id from estore_user u, estore_admin a where u.id = a.user_id and a.wx_open_id = ?";
		parameters.add(openId);
		List<EstoreAdminDTO> list = this.findSqlForListObj(EstoreAdminDTO.class, sql, parameters);
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public EstoreAdminDTO findByMobile(String mobile) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select u.mobile,u.gender,a.id,a.unionid,a.wx_open_id,a.user_id,a.nickname,a.store_id from estore_user u, estore_admin a where u.id = a.user_id and u.mobile = ?";
		parameters.add(mobile);
		List<EstoreAdminDTO> list = this.findSqlForListObj(EstoreAdminDTO.class, sql, parameters);
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public Page<EstoreAdminDTO> selectAdminList(int start, int limit, Long storeId, String adminName) {
		StringBuffer sql = new StringBuffer(
				"select a.id,a.nickname,a.store_id as storeId,u.mobile,IF( a.store_id = 0, 0, 1) AS bindState from estore_admin a , estore_user u where 1=1 and a.user_id = u.id ");
		List<Object> list = new ArrayList<Object>();
		if (storeId != 0L) {
			sql.append("and store_id in (0,?) ");
			list.add(storeId);
		}
		if (!StringUtils.isBlank(adminName)) {
			sql.append("and nickname like ? ");
			list.add("%" + adminName + "%");
		}
		sql.append(" order by store_id,id desc");
		return this.findSqlForPageForMysql(EstoreAdminDTO.class, sql.toString(), list, start, limit);
	}

	@Override
	public void updateAdminBind(Long adminId, Long storeId, int bind) {
		if (bind == EstoreAdmin.BIND) {
			String hql = " update EstoreAdmin set storeId = :storeId where id = :adminId";
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("storeId", storeId);
			params.put("adminId", adminId);
			this.execByHql(hql, params);
		} else if (bind == EstoreAdmin.DEBIND) {
			String hql = " update EstoreAdmin set storeId = 0 where id = :adminId";
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("adminId", adminId);
			this.execByHql(hql, params);
		}
	}

	@Override
	public void updateUserId(Long oldUserId, Long newUserId) {
		String sql = "update estore_admin set user_id = " + oldUserId + " where user_id = " + newUserId;
		this.execSql(sql);
	}

	@Override
	public List<EstoreAdminDTO> findDTOByUserId(Long userId) {
		String sql = "select a.id,a.user_id as userId,a.nickname,a.store_id as storeId,s.name as storeName,u.mobile from estore_store s , estore_admin a,estore_user u where a.store_id = s.id AND u.id = a.user_id and a.user_id = " + userId;
		return this.findSqlForListObj(EstoreAdminDTO.class, sql, null);
	}
}
