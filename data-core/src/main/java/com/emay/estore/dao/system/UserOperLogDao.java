package com.emay.estore.dao.system;

import java.util.Date;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.UserOperLog;

import cn.emay.common.db.Page;

/**
 * cn.emay.eucp.common.moudle.db.system.ManageUserOperLog Dao super
 * 
 * @author frank
 */
public interface UserOperLogDao extends BaseSuperDao<UserOperLog> {

	Page<UserOperLog> findByPage(String username, String content, Date startDate, Date endDate, int start, int limit);

}