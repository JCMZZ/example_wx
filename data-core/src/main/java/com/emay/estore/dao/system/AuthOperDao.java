package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.AuthOper;

/**
 * @author frank
 */
public interface AuthOperDao extends BaseSuperDao<AuthOper> {

	/**
	 * 按照顺序查找全部
	 */
	public List<AuthOper> findAllOrderByIndex();

	public List<AuthOper> findUserAuthOpersOrderByIndex(Long userId);

}