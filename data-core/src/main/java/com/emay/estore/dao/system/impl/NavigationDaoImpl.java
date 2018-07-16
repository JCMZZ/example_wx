package com.emay.estore.dao.system.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.NavigationDao;
import com.emay.estore.pojo.system.Navigation;

/**
 * @author frank
 */
@Repository
public class NavigationDaoImpl extends BaseSuperDaoImpl<Navigation> implements NavigationDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Navigation> findAllOrderByIndex() {
		String hql = this.FIND_ALL_HQL + " order by index asc ";
		return (List<Navigation>) this.getListResult(hql);
	}

}