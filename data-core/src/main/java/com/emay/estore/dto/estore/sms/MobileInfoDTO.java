package com.emay.estore.dto.estore.sms;

import java.io.Serializable;

/**
 * 发送手机号相关信息dto
 *
 */
public class MobileInfoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * estore_customer表id
	 */
	private Long id;
	/**
	 * 手机号
	 */
	private String mobile;
	
	public MobileInfoDTO(){
		
	}
	
	public MobileInfoDTO(Long id,String mobile){
		this.id = id;
		this.mobile = mobile;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


}
