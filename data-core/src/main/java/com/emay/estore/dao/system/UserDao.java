package com.emay.estore.dao.system;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.User;

import cn.emay.common.db.Page;

public interface UserDao extends BaseSuperDao<User> {
	/**
	 * 根据用户名查询用户
	 */
	public User findByUserName(String username);

	/**
	 * 分页查询
	 */
	public Page<User> findPage(int start, int limit, String userName, int state);

}
