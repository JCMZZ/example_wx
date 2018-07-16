<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%--  左边导航栏   --%>
<div class="left_nav">
<c:forEach items="${tree.ngvs}" var="nvg">
	<h2 class="left_nav_module"><span class="nav-ico nav-ico-1"></span>${nvg.name}<i></i></h2>
	<ul  class="left_nav_menu" >
		<c:forEach items="${nvg.pages}" var="page">
			<li 
				<c:if test="${page.id eq currentPage.id}">
					<c:out value=" class = left_nav_high "></c:out>
					<c:set var="currentNVG" value="${nvg.name}"></c:set>
				</c:if>
			>
				<a href="${SERVER_PATH}${page.pageUrl}"><i></i>${page.name}</a>
			 </li>
		</c:forEach>
	</ul>
</c:forEach>
</div>
