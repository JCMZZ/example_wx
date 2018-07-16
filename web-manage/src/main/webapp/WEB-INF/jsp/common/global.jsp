<%--  各种参数以及 HEAD信息  --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%--head设置--%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<%-- 写入系统变量 与 js变量 --%>
<c:set var="SERVER_PATH" value="${pageContext.request.contextPath}"></c:set>
<c:set var="STATIC_PATH" value="${pageContext.request.contextPath}"></c:set>
<script type="text/javascript">
	var SERVER_PATH = '${SERVER_PATH}';
	var STATIC_PATH = '${STATIC_PATH}';
	var currentUserId = ${user.id == null ? -1 : user.id};
	var currentUserNickname = '${user.nickname == null ? "" : user.nickname}';
	${authscript}
</script>
<link type="image/x-icon" rel="shortcut icon" href="${STATIC_PATH}/img/favicon.ico">
<link type="image/x-icon" rel="bookmark" href="${STATIC_PATH}/img/favicon.ico">
<link type="image/x-icon" rel="icon" href="${STATIC_PATH}/img/favicon.ico">
<%-- 全局CSS js --%>
<script type="text/javascript" src="${STATIC_PATH}/static/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/date/WdatePicker.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/emTable/emTable.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/tip/jQuery.tipbox.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/validate/validate.expand.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/validate/validate.js"></script>
<script type="text/javascript" src="${STATIC_PATH}/static/authcommon.js"></script>
<link type="text/css" href="${STATIC_PATH}/static/tip/tipCss.css" rel="stylesheet" />
<link href="${STATIC_PATH}/static/emTable/emTable.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="${STATIC_PATH}/css/estore/lib/validate.css">
<link rel="stylesheet" type="text/css" href="${STATIC_PATH}/css/estore/lib/common.css">
<link rel="stylesheet" type="text/css" href="${STATIC_PATH}/css/common.css">
<link rel="stylesheet" type="text/css" href="${STATIC_PATH}/css/style.css">
<c:if test="${currentPage.name != null}">
	<title>${currentPage.name}</title>
</c:if>
