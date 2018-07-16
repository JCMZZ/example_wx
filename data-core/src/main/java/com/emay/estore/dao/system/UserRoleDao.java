package com.emay.estore.dao.system;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.UserRole;

/**
 * @author frank
 */
public interface UserRoleDao extends BaseSuperDao<UserRole> {

	/**
	 * 获取角色的用户数量
	 */
	public long getNotDeleteUserCountByRole(Long roleId);

	/**
	 * 查询用户的所有角色
	 */
	public List<UserRole> findByUserId(Long userId);

	/**
	 * 删除用户的所有角色
	 */
	public void deleteByUserId(Long id);

}