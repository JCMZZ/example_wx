package com.emay.estore.dao.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.orm.hibernate4.HibernateTemplate;

import cn.emay.common.db.Page;
import cn.emay.common.db.PojoDaoSupport;

public class BaseSuperDaoImpl<E extends java.io.Serializable> extends PojoDaoSupport<E> {

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
	
	/**
	 * 返回分页list DTO对象
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	public <T> Page<T> findSqlForPageForMysql(Class<T> clazz, String sql, List<Object> parameters, int start, int limit) {
		return this.findSqlForPageForMysql(sql, parameters, start, limit, new BeanPropertyRowMapper<T>(clazz));
	}

	public Page<Map<String, Object>> findSqlForPageMapForMysql(String sql, List<Object> parameters, int start, int limit) {
		return this.findSqlForPageForMysql(sql, parameters, start, limit, getColumnMapRowMapper());
	}

	/**
	 * 按页获取数据
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	public <T> List<T> findSqlForListForMysql(Class<T> clazz, String sql, List<Object> parameters, int currentPage, int pageSize) {
		StringBuffer querySql = new StringBuffer(sql);
		if (pageSize > 0) {
			int start = (currentPage - 1) * pageSize;
			querySql.append(" LIMIT " + start + "," + pageSize + "");
		}
		List<T> list = findSqlForListObj(querySql.toString(), parameters, new BeanPropertyRowMapper<T>(clazz));
		return list;
	}

	/**
	 * 返回分页list DTO对象
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	public <T> Page<T> findSqlForPageForMysql(String sql, List<Object> parameters, int start, int limit, RowMapper<T> rowMapper) {
		Integer totalCount = queryTotalCount(sql, parameters);
		StringBuffer querySql = new StringBuffer(sql);
		querySql.append(" LIMIT " + start + "," + limit + "");
		List<T> list = findSqlForListObj(querySql.toString(), parameters, rowMapper);
		Page<T> page = new Page<T>();
		page.setList(list);
		page.setNumByStartAndLimit(start, limit, totalCount);
		return page;
	}

	/**
	 * 返回List dto
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public <T> List<T> findSqlForListObj(String sql, List<Object> parameters, RowMapper<T> rowMapper) {
		Object[] args = params(parameters);
		List<T> list = jdbcTemplate.query(sql, args, rowMapper);
		return list;
	}

	public <T> List<T> findSqlForListObj(Class<T> clazz, String sql, List<Object> parameters) {
		return this.findSqlForListObj(sql, parameters, new BeanPropertyRowMapper<T>(clazz));
	}

	/**
	 * 返回单个对象
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public <T> T findSqlForObj(Class<T> clazz, String sql, List<Object> parameters) {
		Object[] args = params(parameters);
		BeanPropertyRowMapper<T> argTypes = new BeanPropertyRowMapper<T>(clazz);
		T t = jdbcTemplate.queryForObject(sql, argTypes, args);
		return t;
	}

	/**
	 * 返回单个对象
	 *
	 * @param clazz
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public <T> List<T> findSqlForSingleColumn(String sql, List<Object> parameters) {
		Object[] args = params(parameters);
		SingleColumnRowMapper<T> singleColumnRowMapper = new SingleColumnRowMapper<T>();
		List<T> t = jdbcTemplate.query(sql, singleColumnRowMapper, args);
		return t;
	}

	private Object[] params(List<Object> parameters) {
		if (null == parameters) {
			parameters = new ArrayList<Object>();
		}
		Object[] args = parameters.toArray();
		return args;
	}

	private Integer queryTotalCount(String sql, List<Object> parameters) {
		// 寻找from
		int fromindex = sql.toLowerCase().indexOf(" from ");
		if (fromindex < 0) {
			throw new RuntimeException("sql" + " has no from");
		}
		// 判断是否能截取最后的order
		boolean isHasOrder = false;
		int orderbyindex = sql.toLowerCase().indexOf(" order ");
		if (orderbyindex > 0) {
			isHasOrder = !sql.toLowerCase().substring(orderbyindex).contains(")");
		}
		// 截取order
		String countsql = sql;
		if (isHasOrder) {
			orderbyindex = countsql.toLowerCase().indexOf(" order ");
			countsql = countsql.substring(0, orderbyindex);
		}
		// 拼接SQL
		countsql = "select count(*)  from ( " + countsql + " ) total ";
		// System.out.println("PojoDaoImpl.class selct count sql is : " + countsql);
		Object[] args = params(parameters);
		Integer totalCount = jdbcTemplate.queryForObject(countsql, args, Integer.class);
		return totalCount;
	}

	private RowMapper<Map<String, Object>> getColumnMapRowMapper() {
		return new ColumnMapRowMapper();
	}

}
