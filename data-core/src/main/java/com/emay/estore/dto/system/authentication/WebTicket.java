package com.emay.estore.dto.system.authentication;

import java.util.Date;
import java.util.UUID;

/**
 * 票据 <br/>
 * 认证后发放票据，持有效票据访问系统资源
 * 
 * @author 东旭
 *
 */
public class WebTicket implements Ticket {

	private static final long serialVersionUID = 1L;

	private String token;

	private String info;

	private Date expireTime;

	private String badInfo;

	private boolean isBad;

	public final static int WEB_AUTH_TICKET_TIMEOUT = 30 * 60;

	private WebTicket() {

	}

	public static WebTicket rightTicket(String info) {
		WebTicket ticket = new WebTicket();
		ticket.isBad = false;
		ticket.token = "WEB-" + UUID.randomUUID().toString().replace("-", "");
		ticket.info = info;
		ticket.expireTime = new Date(System.currentTimeMillis() + WEB_AUTH_TICKET_TIMEOUT * 1000l);
		return ticket;
	}

	public static WebTicket badTicket(String badinfo) {
		WebTicket ticket = new WebTicket();
		ticket.isBad = true;
		ticket.badInfo = badinfo;
		return ticket;
	}

	public String getToken() {
		return token;
	}

	public Date expireTime() {
		return expireTime;
	}

	@Override
	public String info() {
		return info;
	}

	@Override
	public void refulshExpireTime() {
		expireTime = new Date(System.currentTimeMillis() + WEB_AUTH_TICKET_TIMEOUT * 1000l);
	}

	@Override
	public boolean isBad() {
		return isBad;
	}

	@Override
	public String badInfo() {
		return badInfo;
	}

}
