<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<title>登录</title>
<%@ include file="common/global.jsp"%>
<script type="text/javascript" src="${STATIC_PATH}/static/md5.js"></script>
</head>
<body class="gary-bg">
	<div class="login-main fadeInDown animated">
		<div class="login-logo">
			<img src="${STATIC_PATH}/img/login-logo.png" />
			<h3>欢迎使用EUCPV8</h3>
		</div>
		<div class="login-center">
				<div class="divleft">
					<label>用户名:</label>
					<input type="text" id="username"autocomplete="off" />
				</div>
				<div class="divleft">
					<label>密 码:</label>
					<input type="password" id="password" />
				</div>
				<div class="divleft captchadiv">
					<label>验证码:</label> 
					<input type="text" id="captcha" /> 
					<img src="${SERVER_PATH}/captcha?type=login" class="mycaptchaimg captcha_a" />
				</div>
				<div class="divleft errorsdiv">
					<span id="errorspan"></span>
				</div>
				<input type="button" id="submit" class="logbtn" value="登 录" />
		</div>
	</div>
	<script type="text/javascript" src="${STATIC_PATH}/js/login.js"></script>
</body>
</html>