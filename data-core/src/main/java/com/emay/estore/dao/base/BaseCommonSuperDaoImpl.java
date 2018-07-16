package com.emay.estore.dao.base;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate4.HibernateTemplate;

import cn.emay.common.db.DaoSupport;

public class BaseCommonSuperDaoImpl extends DaoSupport {

	@Resource
	protected JdbcTemplate jdbcTemplate;
	@Resource
	protected HibernateTemplate hibernateTemplate;
	@Resource
	protected SessionFactory sessionFactory;

	@Override
	protected JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	@Override
	protected HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Override
	protected SessionFactory getSessionFactory() {
		return sessionFactory;
	}

}
