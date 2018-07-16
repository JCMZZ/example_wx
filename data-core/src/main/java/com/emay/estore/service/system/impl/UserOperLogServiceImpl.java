package com.emay.estore.service.system.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.system.UserOperLogDao;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.RegularCheckUtils;

import cn.emay.common.db.Page;

/**
 * cn.emay.eucp.common.moudle.db.system.ManageUserOperLog Service implement
 * 
 * @author frank
 */
@Service
public class UserOperLogServiceImpl implements UserOperLogService {

	@Resource
	private UserOperLogDao userOperLogDao;

	@Override
	public void saveLog(String service, String module,Long userId, String userName, String content, String type) {
		UserOperLog log = new UserOperLog();
		log.setContent(content);
		log.setModule(module);
		log.setUsername(userName);
		log.setOperTime(new Date());
		log.setType(type);
		log.setUserId(userId);
		log.setService(service);
		userOperLogDao.save(log);
	}

	@Override
	public Page<UserOperLog> findByPage(String username, String content, Date startDate, Date endDate, int start, int limit) {
		if(!RegularCheckUtils.isEmpty(username)){
			username = username.toLowerCase();
		}
		return userOperLogDao.findByPage(username, content, startDate, endDate, start, limit);
	}

}