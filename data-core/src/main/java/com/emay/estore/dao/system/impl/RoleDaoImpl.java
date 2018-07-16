package com.emay.estore.dao.system.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.RoleDao;
import com.emay.estore.pojo.system.AuthOper;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.Role;
import com.emay.estore.pojo.system.RoleAuth;

import cn.emay.common.db.Page;

/**
 * @author frank
 */
@Repository
public class RoleDaoImpl extends BaseSuperDaoImpl<Role> implements RoleDao {

	@Override
	public Page<Role> findPage(int start, int limit) {
		String hql = FIND_ALL_HQL + " where isDelete != 1 order by id asc";
		return this.getPageResult(hql, start, limit, null, Role.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AuthPage> findAllPageAuth(Long roleId) {
		String hql = " select p from AuthPage p , RoleAuth ra where p.id = ra.authId and ra.roleId = :roleId and ra.type = :pagetype";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("roleId", roleId);
		map.put("pagetype", RoleAuth.AUTH_TYPE_PAGE);
		return (List<AuthPage>) this.getListResult(hql, map);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AuthOper> findAllOperAuth(Long roleId) {
		String hql = " select p from AuthOper p , RoleAuth ra where p.id = ra.authId and ra.roleId = :roleId and ra.type = :pagetype";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("roleId", roleId);
		map.put("pagetype", RoleAuth.AUTH_TYPE_OPER);
		return (List<AuthOper>) this.getListResult(hql, map);
	}

}