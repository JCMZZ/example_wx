package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.RoleAuth;

/**
 * @author frank
 */
public interface RoleAuthDao extends BaseSuperDao<RoleAuth> {

	/**
	 * 删除角色的所有权限
	 */
	public void deleteByRoleId(Long id);

	/**
	 * 查询角色的所有权限
	 */
	public List<RoleAuth> findByRoleId(Long id);

}