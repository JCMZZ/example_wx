package com.emay.estore.service.system.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.system.UserDao;
import com.emay.estore.dto.system.authentication.AuthenticationCell;
import com.emay.estore.dto.system.authentication.Ticket;
import com.emay.estore.dto.system.authentication.UsernameAndPasswordAuthenticationCell;
import com.emay.estore.dto.system.authentication.WebTicket;
import com.emay.estore.pojo.system.User;
import com.emay.estore.service.system.AuthenticationService;

import cn.emay.common.cache.KeyValueCacheService;
import cn.emay.common.encryption.Md5;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	final static String WEB_AUTH_TICKET = "WEB/AUTH/TICKET/";

	@Resource
	private KeyValueCacheService cache;
	@Resource
	private UserDao userDao;

	public Ticket authentication(AuthenticationCell authenticationCell) {
		if (authenticationCell == null) {
			return WebTicket.badTicket("用户票据异常");
		}
		if (!authenticationCell.getClass().equals(UsernameAndPasswordAuthenticationCell.class)) {
			return WebTicket.badTicket("用户票据异常");
		}
		UsernameAndPasswordAuthenticationCell up = (UsernameAndPasswordAuthenticationCell) authenticationCell;
		User user = userDao.findByUserName(up.getUsername());
		if (user == null) {
			return WebTicket.badTicket("用户名或密码错误");
		}
		if (user.getState() == User.STATE_OFF) {
			return WebTicket.badTicket("用户已锁定，请联系管理员解锁");
		}
		if (user.getState() == User.STATE_DELETE) {
			return WebTicket.badTicket("用户名或密码错误");
		}
		String pass = Md5.md5(up.getPassword().getBytes());
		if (up.getPassword() == null || !user.getPassword().equals(pass)) {
			return WebTicket.badTicket("用户名或密码错误");
		}
		Ticket ticket = WebTicket.rightTicket(String.valueOf(user.getId()));
		cache.set(WEB_AUTH_TICKET + ticket.getToken(), ticket, WebTicket.WEB_AUTH_TICKET_TIMEOUT);
		return ticket;
	}

	@Override
	public Ticket check(String token) {
		return cache.get(WEB_AUTH_TICKET + token, WebTicket.class);
	}

	@Override
	public Ticket checkAndReflush(String token) {
		Ticket ticket = cache.get(WEB_AUTH_TICKET + token, WebTicket.class);
		if (ticket == null) {
			return null;
		}
		ticket.refulshExpireTime();
		cache.set(WEB_AUTH_TICKET + ticket.getToken(), ticket, WebTicket.WEB_AUTH_TICKET_TIMEOUT);
		return ticket;
	}

	@Override
	public boolean remove(String token) {
		return cache.del(WEB_AUTH_TICKET + token);
	}

}
