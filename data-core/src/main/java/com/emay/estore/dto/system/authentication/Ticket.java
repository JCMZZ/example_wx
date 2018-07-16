package com.emay.estore.dto.system.authentication;

import java.io.Serializable;
import java.util.Date;

/**
 * 票据 <br/>
 * 认证后发放票据，持有效票据访问系统资源
 * 
 * @author 东旭
 *
 */
public interface Ticket extends Serializable {

	public String getToken();

	public Date expireTime();

	public void refulshExpireTime();

	public String info();

	public boolean isBad();

	public String badInfo();

}
