<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="common/global.jsp"%>
<style>
*{margin:0; padding:0;}
body{ background-color: #f3f3f4;
    color: #676a6c;
    font-family:"open sans";
    font-size: 13px;
    overflow-x: hidden;
    }
@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
        -ms-transform: translateY(-20px);
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
    }
}
.error{text-align:center;margin:auto;
	 -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    z-index: 100;
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}
h1{font-size:170px; font-weight:100;line-height:1.1;  margin:20px 0 10px;color: inherit;}
h3{margin:10px 0;}
a{
	display:inline-block;
	background-color: #1ab394;
    border-color: #1ab394;
    color: #ffffff !important;
    border-radius:3px;
    width:100px;
    margin:10px auto;
    text-decoration:none;
    padding:10px 20px;
}
a:hover{
	background-color: #18a689;
}
</style>
<body>

	<div class="error">
        <h1>404</h1>
        <h3 class="font-bold">页面未找到！</h3>
        <div>抱歉，页面好像去火星了~</div>
        <a href="${SERVER_PATH}">返回首页</a>
    </div>
</body>
</html>