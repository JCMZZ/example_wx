package com.emay.estore.dao.system.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.UserOperLogDao;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.util.RegularCheckUtils;

import cn.emay.common.db.Page;

/**
 * cn.emay.eucp.common.moudle.db.system.ManageUserOperLog Dao implement
 * 
 * @author frank
 */
@Repository
public class UserOperLogDaoImpl extends BaseSuperDaoImpl<UserOperLog> implements UserOperLogDao {

	@Override
	public Page<UserOperLog> findByPage(String username, String content, Date startDate, Date endDate, int start, int limit) {
		Map<String, Object> param = new HashMap<String, Object>();
		String hql = "from UserOperLog m where 1=1";
		if (!StringUtils.isEmpty(content)) {
			hql += " and  m.content like :context ";
			param.put("context", "%" + RegularCheckUtils.specialCodeEscape(content) + "%");
		}
		if (!StringUtils.isEmpty(username)) {
			hql += " and  m.username = :username ";
			param.put("username", RegularCheckUtils.specialCodeEscape(username));
		}
		if (!StringUtils.isEmpty(startDate)) {
			hql += " and m.operTime >= :startDate";
			param.put("startDate", startDate);
		}
		if (!StringUtils.isEmpty(endDate)) {
			hql += " and m.operTime <= :endDate";
			param.put("endDate", endDate);
		}
		hql += " order by m.id desc ";
		return this.getPageResult(hql, start, limit, param, UserOperLog.class);
	}
}