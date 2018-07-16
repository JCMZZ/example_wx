<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="common/global.jsp"%>
</head>
<body>
	<%@ include file="common/header.jsp"%>
	<div class="main">
		<div class="main-left">
			<%@ include file="common/left.jsp"%>
		</div>
		<div class="main-right">
			<%@ include file="common/crumbs.jsp"%>
			<div id="outerId"></div>
		</div>
	</div>
	<script type="text/javascript" src="${STATIC_PATH}/js/user.js"></script>
	<%@ include file="common/footer.jsp"%>
</body>
</html>