<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="../../common/global.jsp"%>
<style>
	#outerId_table_table a{
		display:inline-block;
		width:100%;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
		cursor: pointer;
	}
	select{
		width:140px;
	}
</style>
</head>
<body>
	<%@ include file="../../common/header.jsp"%>
	<div class="main">
		<div class="main-left">
			<%@ include file="../../common/left.jsp"%>
		</div>
		<div class="main-right">
			<%@ include file="../../common/crumbs.jsp"%>
			<div id="outerId"></div>
		</div>
	</div>
	<script type="text/javascript" src="${STATIC_PATH}/js/estore/service/list.js"></script>
	<%@ include file="../../common/footer.jsp"%>
</body>
</html>