package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.AuthOper;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.Role;

import cn.emay.common.db.Page;

/**
 * @author frank
 */
public interface RoleDao extends BaseSuperDao<Role> {

	/**
	 * 分页查询
	 */
	public Page<Role> findPage(int start, int limit);

	public List<AuthPage> findAllPageAuth(Long roleId);

	public List<AuthOper> findAllOperAuth(Long roleId);

}