package com.emay.estore.dto.estore.wx;

import java.io.Serializable;

import com.emay.estore.dto.estore.user.EstoreCacheUserDTO;

/**
 * 3rd_session
 *
 */
public class ThirdSession implements Serializable {

	private static final long serialVersionUID = 1L;

	private String openId;

	private String sessionKey;

	private EstoreCacheUserDTO estoreCacheUserDTO;

	public ThirdSession() {

	}

	public ThirdSession(String openId, String sessionKey, EstoreCacheUserDTO estoreCacheUserDTO) {
		this.openId = openId;
		this.sessionKey = sessionKey;
		this.estoreCacheUserDTO = estoreCacheUserDTO;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public EstoreCacheUserDTO getEstoreCacheUserDTO() {
		return estoreCacheUserDTO;
	}

	public void setEstoreCacheUserDTO(EstoreCacheUserDTO estoreCacheUserDTO) {
		this.estoreCacheUserDTO = estoreCacheUserDTO;
	}

}
