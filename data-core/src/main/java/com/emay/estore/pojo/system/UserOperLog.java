package com.emay.estore.pojo.system;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户操作日志
 * 
 * @author Frank
 *
 */
public class UserOperLog implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final String OPERATE_ADD = "ADD";
	public static final String OPERATE_DELETE = "DELETE";
	public static final String OPERATE_MODIFY = "MODIFY";
	public static final String OPERATE_DOWNLOAD = "DOWNLOAD";
	private Long id;//
	private Long userId;// 用户ID
	private String username;// 用户名
	private String module;// 模块名称
	private String content;// 内容
	private String type;// 操作类型[ADD-增，DELETE-删，MODIFY-改，SELECT-查]
	private Date operTime;// 操作时间[yyyy-MM-dd HH:mm:ss]
	private String service;// 服务模块

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public Date getOperTime() {
		return operTime;
	}

	public void setOperTime(Date operTime) {
		this.operTime = operTime;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}
}
