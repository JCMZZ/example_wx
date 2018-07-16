package com.emay.estore.dto.system.auth;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.emay.estore.pojo.system.AuthOper;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.RoleAuth;

/**
 * 用于编辑角色时，角色权限用于权限对照系统权限树打勾
 */
public class RoleAuthDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	

	private Map<Long, Boolean> pageAuths;

	private Map<Long, Boolean> operAuths;
	
	public RoleAuthDTO(){
		
	}
	
	public RoleAuthDTO(List<AuthOper> allopers,List<AuthPage> allpages,List<RoleAuth> ras){
		pageAuths = new HashMap<Long, Boolean>();
		operAuths = new HashMap<Long, Boolean>();
		Set<Long> operes = new HashSet<Long>();
		Set<Long> pages = new HashSet<Long>();
		for (RoleAuth ra : ras) {
			if (ra.getType().equals(RoleAuth.AUTH_TYPE_PAGE)) {
				pages.add(ra.getAuthId());
			} else {
				operes.add(ra.getAuthId());
			}
		}
		for (AuthOper oper : allopers) {
			if (operes.contains(oper.getId())) {
				operAuths.put(oper.getId(), true);
			} else {
				operAuths.put(oper.getId(), false);
			}
		}
		for (AuthPage page : allpages) {
			if (pages.contains(page.getId())) {
				pageAuths.put(page.getId(), true);
			} else {
				pageAuths.put(page.getId(), false);
			}
		}
	}

	public Map<Long, Boolean> getPageAuths() {
		return pageAuths;
	}

	public void setPageAuths(Map<Long, Boolean> pageAuths) {
		this.pageAuths = pageAuths;
	}

	public Map<Long, Boolean> getOperAuths() {
		return operAuths;
	}

	public void setOperAuths(Map<Long, Boolean> operAuths) {
		this.operAuths = operAuths;
	}

}
