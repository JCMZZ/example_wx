package com.emay.estore.service.system.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emay.estore.dao.system.RoleDao;
import com.emay.estore.dao.system.UserDao;
import com.emay.estore.dao.system.UserRoleDao;
import com.emay.estore.pojo.system.Role;
import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserRole;
import com.emay.estore.service.system.UserService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.common.encryption.Md5;

@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;
	@Resource
	private UserRoleDao userRoleDao;
	@Resource
	private RoleDao roleDao;

	public Result changePassword(Long userId, String newpass) {
		if (userId == null || userId == 0l) {
			return Result.badResult("用户不存在");
		}
		User user = this.findUserById(userId);
		if (user == null) {
			return Result.badResult("用户不存在");
		}
		String pass = Md5.md5(newpass.getBytes());
		user.setPassword(pass);
		this.update(user);
		return Result.rightResult();
	}

	public Result statechange(Long userId, int state) {
		if (userId == null || userId == 0l) {
			return Result.badResult("用户不存在");
		}
		User user = this.findUserById(userId);
		if (user == null) {
			return Result.badResult("用户不存在");
		}
		if (state != User.STATE_DELETE && state != User.STATE_OFF && state != User.STATE_ON) {
			return Result.badResult("状态值错误");
		}
		user.setState(state);
		this.update(user);
		return Result.rightResult();
	}

	public void save(User user) {
		if (user == null) {
			return;
		}
		userDao.save(user);
	}

	public void update(User user) {
		if (user == null) {
			return;
		}
		userDao.update(user);
	}

	public User findUserById(Long userId) {
		if (userId == null || userId == 0l) {
			return null;
		}
		return userDao.findById(userId);
	}

	public User findByUserName(String username) {
		if (username == null) {
			return null;
		}
		return userDao.findByUserName(username);
	}

	@Override
	public Page<User> findPage(int start, int limit, String userName, int state) {
		return userDao.findPage(start, limit, userName, state);
	}

	@Override
	public List<UserRole> getUserRoles(Long userId) {
		return userRoleDao.findByUserId(userId);
	}

	private void changeUserState(Long userId, int state) {
		User user = userDao.findById(userId);
		user.setState(state);
		userDao.update(user);
	}

	@Override
	public Result deleteUser(Long userId) {
		User user = this.findUserById(userId);
		if (user == null) {
			return Result.badResult("用户不存在");
		}
		this.changeUserState(userId, User.STATE_DELETE);
		return Result.rightResult();
	}

	@Override
	public Result on(Long userId) {
		User user = this.findUserById(userId);
		if (user == null) {
			return Result.badResult("用户不存在");
		}
		if (user.getState().intValue() == User.STATE_DELETE) {
			return Result.badResult("已删除用户不能再次启用");
		}
		this.changeUserState(userId, User.STATE_ON);
		return Result.rightResult();
	}

	@Override
	public Result off(Long userId) {
		User user = this.findUserById(userId);
		if (user == null) {
			return Result.badResult("用户不存在");
		}
		this.changeUserState(userId, User.STATE_OFF);
		return Result.rightResult();
	}

	private List<UserRole> getUserRoles(String roleIds) {
		String[] roleIdArray = roleIds.split(",");
		Set<Long> roleIdSet = new HashSet<Long>();
		for (String roleId : roleIdArray) {
			try {
				roleIdSet.add(Long.valueOf(roleId));
			} catch (Exception e) {
			}
		}
		List<UserRole> urs = new ArrayList<UserRole>();
		List<Role> roles = roleDao.findAll();
		for (Role role : roles) {
			if (roleIdSet.contains(role.getId())) {
				UserRole ur = new UserRole();
				ur.setRoleId(role.getId());
				urs.add(ur);
			}
		}
		return urs;
	}

	@Transactional
	@Override
	public Result addUser(String username, String nickname, String password, String email, String mobile, String roles, User currentUser) {
		List<UserRole> urs = this.getUserRoles(roles);
		if (urs.size() == 0) {
			return Result.badResult("权限不能为空");
		}
		User now = userDao.findByUserName(username);
		if (now != null) {
			return Result.badResult("用户名已存在");
		}
		// 这里只做了用户名不能重复，邮箱或者手机不能重复自己扩展
		String pass = Md5.md5(password.getBytes());
		User user = new User(nickname, username, pass, email, mobile, currentUser.getId());
		userDao.save(user);
		for (UserRole ur : urs) {
			ur.setUserId(user.getId());
		}
		userRoleDao.saveBatch(urs);
		return Result.rightResult();
	}

	@Override
	public Result modifyUser(String nickname, String password, String email, String mobile, String roles, Long userId) {
		User user = this.findUserById(userId);
		if(user == null){
			return Result.badResult("用户不存在");
		}
		user.setNickname(nickname);
		if (!"******".equals(password)) {
			String pass = Md5.md5(password.getBytes());
			user.setPassword(pass);
		}
		user.setEmail(email);
		user.setMobile(mobile);
		List<UserRole> urs = this.getUserRoles(roles);
		if (urs.size() == 0) {
			return Result.badResult("权限不能为空");
		}
		for (UserRole ur : urs) {
			ur.setUserId(user.getId());
		}
		userDao.update(user);
		userRoleDao.deleteByUserId(user.getId());
		userRoleDao.saveBatch(urs);
		return Result.rightResult();
	}

}
