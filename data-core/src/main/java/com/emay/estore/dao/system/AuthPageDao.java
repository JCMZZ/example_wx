package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.AuthPage;

/**
 * @author frank
 */
public interface AuthPageDao extends BaseSuperDao<AuthPage> {

	/**
	 * 按照顺序查找全部
	 */
	public List<AuthPage> findAllOrderByIndex();

	public List<AuthPage> findUserAuthPagesOrderByIndex(Long userId);

}