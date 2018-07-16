package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreUserDao;
import com.emay.estore.pojo.estore.EstoreUser;

import cn.emay.common.db.Page;

@Repository
public class EstoreUserDaoImpl extends BaseSuperDaoImpl<EstoreUser> implements EstoreUserDao {

	@Override
	public void updateUserMobile(Long userId, String mobile) {
		String sql = "update estore_user set mobile = '" + mobile + "' where id = " + userId;
		this.execSql(sql);
	}

	@Override
	public EstoreUser findUserByProperty(String fieldName, Object value) {
		return this.findByProperty(fieldName, value);
	}

	@Override
	public void deleteUserByProperty(String fieldName, Object value) {
		this.deleteByProperty(fieldName, value);
	}

	@Override
	public Page<EstoreUser> findPage(int start, int limit, String mobile) {
		String sql = "select * from estore_user where 1=1 ";
		List<Object> list = new ArrayList<Object>();
		if (!StringUtils.isBlank(mobile)) {
			sql += " and mobile = ?";
			list.add(mobile);
		}
		return this.findSqlForPageForMysql(EstoreUser.class, sql, list, start, limit);
	}
}
