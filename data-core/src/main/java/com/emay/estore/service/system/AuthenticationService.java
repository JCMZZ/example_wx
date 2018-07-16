package com.emay.estore.service.system;

import com.emay.estore.dto.system.authentication.AuthenticationCell;
import com.emay.estore.dto.system.authentication.Ticket;

/**
 * 认证服务 <br/>
 * 票据发放基于认证服务
 * 
 * @author 东旭
 *
 */
public interface AuthenticationService {

	public Ticket authentication(AuthenticationCell authenticationCell);

	public Ticket check(String token);

	public Ticket checkAndReflush(String token);

	public boolean remove(String token);

}
