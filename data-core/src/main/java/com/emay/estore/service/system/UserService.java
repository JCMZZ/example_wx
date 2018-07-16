package com.emay.estore.service.system;

import java.util.List;

import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserRole;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

public interface UserService {

	/**
	 * 改变用户密码
	 */
	public Result changePassword(Long userId, String newpass);

	/**
	 * 改变用户状态
	 */
	public Result statechange(Long userId, int state);

	/**
	 * 保存用户
	 */
	public void save(User user);

	/**
	 * 更新用户
	 */
	public void update(User user);

	/**
	 * 按照ID查找用户
	 */
	public User findUserById(Long userId);

	/**
	 * 按照用户名查找用户
	 */
	public User findByUserName(String username);

	/**
	 * 分页查询用户
	 */
	public Page<User> findPage(int start, int limit, String userName, int state);

	/**
	 * 获取用户的所有角色
	 */
	public List<UserRole> getUserRoles(Long userId);

	/**
	 * 删除用户
	 * @return 
	 */
	public Result deleteUser(Long userId);

	/**
	 * 启用用户
	 * @return 
	 */
	public Result on(Long userId);

	/**
	 * 停用用户
	 * @return 
	 */
	public Result off(Long userId);

	/**
	 * 添加用户
	 */
	public Result addUser(String username, String nickname, String password, String email, String mobile, String roles, User currentUser);

	/**
	 * 修改用户
	 */
	public Result modifyUser(String nickname, String password, String email, String mobile, String roles, Long userId);

}
