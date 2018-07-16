package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.Navigation;

/**
 * @author frank
 */
public interface NavigationDao extends BaseSuperDao<Navigation> {

	/**
	 * 按照顺序查找全部
	 */
	public List<Navigation> findAllOrderByIndex();

}