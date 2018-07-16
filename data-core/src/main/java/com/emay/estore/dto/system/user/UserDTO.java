package com.emay.estore.dto.system.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserRole;

public class UserDTO {

	/**
	 * id
	 */
	private Long id;

	/**
	 * 姓名
	 */
	private String nickname;

	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 邮箱
	 */
	private String email;

	/**
	 * 手机
	 */
	private String mobile;

	/**
	 * 状态
	 */
	private Integer state;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 角色列表
	 */
	private List<Long> roles;

	public UserDTO(User user, List<UserRole> userroles) {
		this.createTime = user.getCreateTime();
		this.email = user.getEmail();
		this.id = user.getId();
		this.mobile = user.getMobile();
		this.nickname = user.getNickname();
		this.state = user.getState();
		this.username = user.getUsername();
		roles = new ArrayList<Long>();
		for (UserRole ur : userroles) {
			roles.add(ur.getRoleId());
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public List<Long> getRoles() {
		return roles;
	}

	public void setRoles(List<Long> roles) {
		this.roles = roles;
	}

}
