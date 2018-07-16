package com.emay.estore.dto.system.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.emay.estore.pojo.system.Navigation;

public class NgvigationDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	

	/**
	 * ID
	 */
	private Long id;

	/**
	 * 导航名
	 */
	private String name;

	/**
	 * 所有页面 id
	 */
	private List<PageDTO> pages = new ArrayList<PageDTO>();
	
	public NgvigationDTO(){
		
	}

	public NgvigationDTO(Navigation ngvigation) {
		this.id = ngvigation.getId();
		this.name = ngvigation.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<PageDTO> getPages() {
		return pages;
	}

	public void setPages(List<PageDTO> pages) {
		this.pages = pages;
	}

}
