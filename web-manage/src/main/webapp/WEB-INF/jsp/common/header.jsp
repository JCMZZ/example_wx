<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--  上方工具条   --%>
<div class="header_header">
	<div class="header_left">
		<a href="${SERVER_PATH}"><img src="${STATIC_PATH}/img/logo.png" /></a>
	</div>
	<div class="header_right">
		<div class="header_middle">400-779-7255</div>
		<dl>
			<dt><i></i>欢迎您:<span class="value_header">${user.nickname}</span></dt>
			<dt><a id="changepassword" href="javascript:void(0)">修改密码</a></dt>
			<dd class="goOut" id = "logout" title="退出"></dd>
		</dl>
	</div>
</div>
<script type="text/javascript" src="${STATIC_PATH}/static/md5.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/js/header.js"></script>