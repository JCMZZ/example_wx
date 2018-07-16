package com.emay.estore.dao.system.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.RoleAuthDao;
import com.emay.estore.pojo.system.RoleAuth;

/**
 * @author frank
 */
@Repository
public class RoleAuthDaoImpl extends BaseSuperDaoImpl<RoleAuth> implements RoleAuthDao {

	@Override
	public void deleteByRoleId(Long id) {
		String hql = " delete  RoleAuth where roleId = :roleId ";
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("roleId", id);
		this.execByHql(hql, param);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<RoleAuth> findByRoleId(Long id) {
		String hql = "from RoleAuth where roleId =:roleId";
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("roleId", id);
		return (List<RoleAuth>) this.getListResult(hql, param);
	}

}