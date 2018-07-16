<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="common/global.jsp"%>
<link type="text/css" href="${STATIC_PATH}/css/setting.css" rel="stylesheet" />
</head>
<body>
	<%@ include file="common/header.jsp"%>
	<div class="main">
		<div class="main-left">
			<%@ include file="common/left.jsp"%>
		</div>
		<div class="main-right">
			<%@ include file="common/crumbs.jsp"%>
			<div class="sysbox">
				<h2>系统配置</h2>
				<table>
					<thead>
						<tr>
							<th>名称</th>
							<th>说明</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="mainTab" >
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="${STATIC_PATH}/js/setting.js"></script>
	<%@ include file="common/footer.jsp"%>
</body>
</html>

