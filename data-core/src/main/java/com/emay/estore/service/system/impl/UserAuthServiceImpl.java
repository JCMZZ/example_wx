package com.emay.estore.service.system.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.system.AuthOperDao;
import com.emay.estore.dao.system.AuthPageDao;
import com.emay.estore.dao.system.NavigationDao;
import com.emay.estore.dao.system.RoleAuthDao;
import com.emay.estore.dao.system.RoleDao;
import com.emay.estore.dao.system.UserRoleDao;
import com.emay.estore.dto.system.auth.AuthTree;
import com.emay.estore.dto.system.auth.RoleAuthDTO;
import com.emay.estore.pojo.system.AuthOper;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.Navigation;
import com.emay.estore.pojo.system.Role;
import com.emay.estore.pojo.system.RoleAuth;
import com.emay.estore.service.system.UserAuthService;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

/**
 * @author frank
 */
@Service
public class UserAuthServiceImpl implements UserAuthService {

	@Resource
	private RoleDao roleDao;
	@Resource
	private RoleAuthDao roleAuthDao;
	@Resource
	private UserRoleDao userRoleDao;
	@Resource
	private AuthOperDao authOperDao;
	@Resource
	private AuthPageDao authPageDao;
	@Resource
	private NavigationDao navigationDao;

	@Override
	public Page<Role> findPage(int start, int limit) {
		return roleDao.findPage(start, limit);
	}

	@Override
	public Result deleteRole(Long roleId) {
		Role role = this.roleDao.findById(roleId);
		if (role == null) {
			return Result.badResult("角色不存在");
		}
		long count = userRoleDao.getNotDeleteUserCountByRole(roleId);
		if (count > 0) {
			return Result.badResult("角色正在被使用，不能删除");
		}
		role.setIsDelete(true);
		roleDao.update(role);
		return Result.rightResult();
	}

	private List<RoleAuth> getRoleAuthes(String pageAuthIds, String operAuthIds) {
		if(pageAuthIds == null || pageAuthIds.trim().length() == 0){
			return new ArrayList<RoleAuth>();
		}
		String[] pageautharray = pageAuthIds.split(",");
		String[] operautharray = null;
		if(operAuthIds != null && operAuthIds.trim().length() > 0){
			operautharray = operAuthIds.split(",");
		}
		
		Set<Long> operes = new HashSet<Long>();
		Set<Long> pages = new HashSet<Long>();

		for (String page : pageautharray) {
			try {
				pages.add(Long.valueOf(page));
			} catch (Exception e) {
			}
		}
		if(operautharray != null){
			for (String oper : operautharray) {
				try {
					operes.add(Long.valueOf(oper));
				} catch (Exception e) {
				}
			}
		}

		List<RoleAuth> ras = new ArrayList<RoleAuth>();
		List<AuthOper> authopers = authOperDao.findAllOrderByIndex();
		List<AuthPage> authpages = authPageDao.findAllOrderByIndex();
		for (AuthOper oper : authopers) {
			if (operes.contains(oper.getId())) {
				RoleAuth ra = new RoleAuth();
				ra.setAuthId(oper.getId());
				ra.setType(RoleAuth.AUTH_TYPE_OPER);
				ras.add(ra);
			}
		}
		for (AuthPage page : authpages) {
			if (pages.contains(page.getId())) {
				RoleAuth ra = new RoleAuth();
				ra.setAuthId(page.getId());
				ra.setType(RoleAuth.AUTH_TYPE_PAGE);
				ras.add(ra);
			}
		}
		return ras;
	}

	@Override
	public Result modifyRole(String pageAuthIds, String operAuthIds, String roleName, Long roleId) {
		Role role = this.roleDao.findById(roleId);
		if (role == null) {
			return Result.badResult("角色不存在");
		}
		List<RoleAuth> ras = this.getRoleAuthes(pageAuthIds, operAuthIds);
		if (ras.size() == 0) {
			return Result.badResult("无正确权限");
		}
		for (RoleAuth ra : ras) {
			ra.setRoleId(roleId);
		}
		roleAuthDao.deleteByRoleId(role.getId());
		roleAuthDao.saveBatch(ras);
		role.setName(roleName);
		this.roleDao.update(role);
		return Result.rightResult();
	}

	@Override
	public Result addRole(String pageAuthIds, String operAuthIds, String roleName) {
		List<RoleAuth> ras = this.getRoleAuthes(pageAuthIds, operAuthIds);
		if (ras.size() == 0) {
			return Result.badResult("无正确权限");
		}
		Role role = new Role();
		role.setCreateTime(new Date());
		role.setIsDelete(false);
		role.setName(roleName);
		this.roleDao.save(role);
		for (RoleAuth ra : ras) {
			ra.setRoleId(role.getId());
		}
		roleAuthDao.saveBatch(ras);
		return Result.rightResult();
	}

	@Override
	public Result findAllAuthByRoleId(Long roleId) {
		Role role = this.roleDao.findById(roleId);
		if (role == null) {
			return Result.badResult("角色不存在");
		}
		List<RoleAuth> ras = roleAuthDao.findByRoleId(roleId);
		List<AuthOper> allopers = authOperDao.findAllOrderByIndex();
		List<AuthPage> allpages = authPageDao.findAllOrderByIndex();
		RoleAuthDTO dto = new RoleAuthDTO(allopers, allpages, ras);
		return Result.rightResult(new Object[]{role.getName(),dto});
	}

	@Override
	public AuthTree findSystemAuthTree() {
		List<AuthOper> opers = authOperDao.findAllOrderByIndex();
		List<AuthPage> pages = authPageDao.findAllOrderByIndex();
		List<Navigation> navigations = navigationDao.findAllOrderByIndex();
		return new AuthTree(opers, pages, navigations);
	}

	@Override
	public AuthTree findUserAuthTree(Long userId) {
		List<AuthOper> opers = authOperDao.findUserAuthOpersOrderByIndex(userId);
		List<AuthPage> pages = authPageDao.findUserAuthPagesOrderByIndex(userId);
		List<AuthOper> opersList = new ArrayList<AuthOper>();
		List<AuthPage> pagesList = new ArrayList<AuthPage>();
		Set<Long> opersSet = new HashSet<Long>();
		Set<Long> pagesSet = new HashSet<Long>();
		for (AuthOper a : opers) {
			if (!opersSet.contains(a.getId())) {
				opersSet.add(a.getId());
				opersList.add(a);
			}
		}
		for (AuthPage a : pages) {
			if (!pagesSet.contains(a.getId())) {
				pagesSet.add(a.getId());
				pagesList.add(a);
			}
		}
		List<Navigation> navigations = navigationDao.findAllOrderByIndex();
		return new AuthTree(opersList, pagesList, navigations);
	}
}