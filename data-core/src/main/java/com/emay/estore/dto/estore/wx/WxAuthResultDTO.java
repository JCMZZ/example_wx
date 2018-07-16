package com.emay.estore.dto.estore.wx;

import java.io.Serializable;

/**
 * 微信授权接口返回值dto
 *
 */
public class WxAuthResultDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String openid;//用户唯一标识

	private String session_key;//会话密钥
	
	private String unionid;//用户在开放平台的唯一标识符

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getSession_key() {
		return session_key;
	}

	public void setSession_key(String session_key) {
		this.session_key = session_key;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}
	
	
	

}
