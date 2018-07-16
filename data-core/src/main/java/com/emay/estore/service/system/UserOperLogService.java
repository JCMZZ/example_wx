package com.emay.estore.service.system;

import java.util.Date;

import com.emay.estore.pojo.system.UserOperLog;

import cn.emay.common.db.Page;

/**
 * cn.emay.eucp.common.moudle.db.system.ManageUserOperLog Service Super
 * 
 * @author frank
 */
public interface UserOperLogService {

	/**
	 * 存储日志
	 * 
	 * @param userOperLog
	 */
	void saveLog(String service, String module,Long userId, String userName, String content, String type);
	
	/**
	 * 分页查询
	 * 
	 * @param username
	 * @param start
	 * @param limit
	 * @return
	 */
	Page<UserOperLog> findByPage(String username, String content, Date startDate, Date endDate, int start, int limit);

}