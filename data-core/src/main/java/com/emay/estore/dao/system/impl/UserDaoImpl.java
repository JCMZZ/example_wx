package com.emay.estore.dao.system.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.UserDao;
import com.emay.estore.pojo.system.User;

import cn.emay.common.db.Page;

/**
 * @author frank
 */
@Repository
public class UserDaoImpl extends BaseSuperDaoImpl<User> implements UserDao {

	@Override
	public User findByUserName(String username) {
		return this.findByProperty("username", username);
	}

	public Page<User> findPage(int start, int limit, String userName, int state) {
		Map<String, Object> param = new HashMap<String, Object>();
		String hql = "from User where state != :deletestate ";
		if (!StringUtils.isEmpty(userName)) {
			hql += " and  username like :userName ";
			param.put("userName", "%" + userName + "%");
		}
		if (state != -1) {
			hql += " and state = :state ";
			param.put("state", state);
		}
		param.put("deletestate", User.STATE_DELETE);
		hql += " order by createTime desc ";
		return this.getPageResult(hql, start, limit, param, User.class);
	}

}