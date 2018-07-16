<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="../../common/global.jsp"%>
<script type="text/javascript" >
	var userId = '${userId}'
</script>
</head>
<body>
	<%@ include file="../../common/header.jsp"%>
	<div class="main">
		<div class="main-left">
			<%@ include file="../../common/left.jsp"%>
		</div>
		<div class="main-right">
			<%@ include file="../../common/crumbs.jsp"%>
			<h1>B端详情</h1>
			<div id="outerB"></div>
			<h1>C端详情</h1>
			<div id="outerC"></div>
		</div>
	</div>
	<script type="text/javascript" src="${STATIC_PATH}/js/estore/user/detail.js"></script>
	<%@ include file="../../common/footer.jsp"%>
</body>
</html>