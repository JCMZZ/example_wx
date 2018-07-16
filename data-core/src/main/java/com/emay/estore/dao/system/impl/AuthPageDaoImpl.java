package com.emay.estore.dao.system.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.AuthPageDao;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.RoleAuth;

/**
 * @author frank
 */
@Repository
public class AuthPageDaoImpl extends BaseSuperDaoImpl<AuthPage> implements AuthPageDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<AuthPage> findAllOrderByIndex() {
		String hql = this.FIND_ALL_HQL + " order by index asc ";
		return (List<AuthPage>) this.getListResult(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AuthPage> findUserAuthPagesOrderByIndex(Long userId) {
		String hql = "select ap from  UserRole ur , RoleAuth ra , AuthPage ap where ur.userId = :userId and ra.roleId = ur.roleId and ra.type = :opertype and ra.authId = ap.id";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("opertype", RoleAuth.AUTH_TYPE_PAGE);
		return (List<AuthPage>) this.getListResult(hql, map);
	}

}