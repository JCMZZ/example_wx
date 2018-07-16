package com.emay.estore.dao.base;

import java.io.Serializable;
import java.util.List;

public interface BaseSuperDao<E extends Serializable> {

	/**
	 * 增
	 */
	public void save(E entity);

	/**
	 * 改
	 */
	public void update(E entity);

	/**
	 * 删
	 */
	public void delete(E entity);

	/**
	 * 根据ID查
	 */
	public E findById(Serializable id);

	/**
	 * 查询所有
	 */
	public List<E> findAll();

	/**
	 * 批量增
	 */
	public void saveBatch(List<E> entities);

	/**
	 * 批量改
	 */
	public void updateBatch(List<E> entities);

	/**
	 * 批量删
	 */
	public void deleteBatch(List<E> entities);

}
