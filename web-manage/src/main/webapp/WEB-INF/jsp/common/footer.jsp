<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="footer">
	<div class="footer-cen">北京亿美软通科技有限公司版权所有     【售后服务电话：400-779-7255】</div>
</div>
<script type="text/javascript">
window.onload=function(){
	var $main=$('.main');
	var $header=$('.header_header');
	var $footer=$('.footer');
	var browserHeight=document.documentElement.clientHeight;
	var mainHeight=$main.outerHeight();
	var headerHeight=$header.outerHeight();
	var footerHeight=$footer.outerHeight();
	if((mainHeight+footerHeight+headerHeight) < browserHeight){
		mainHeight=browserHeight-footerHeight-headerHeight;
		$main.css({'min-height':mainHeight});
	}
}
</script>
