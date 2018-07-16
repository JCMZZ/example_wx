//左侧功能模块菜单
$(function(){
	$(".left_nav_menu li").each(function(index,element){
		if($(element).hasClass('left_nav_high')){
			$(element).parent().show();
			$(element).parent().prev().addClass('left_nav_module-on');
		}
	});
	$(".left_nav_module").click(function(){
		var $this = $(this);
		if(!$this.hasClass("left_nav_module-on")){
			$(".left_nav_menu").slideUp(600);
			$(".left_nav_module").removeClass("left_nav_module-on");
			if(0 != $this.next(".left_nav_menu").length){
				$this.next(".left_nav_menu").slideDown(600);
			}
			$this.addClass("left_nav_module-on");
		}else{
			$this.removeClass("left_nav_module-on");
			$this.next(".left_nav_menu").slideUp(600);
		}
	});
})
	

$("#logout").click(logout);

$("#changepassword").click(function(){
	var html ='<dl class="alert-cen">';
	html += '<dt><label style="width:100px;">旧密码:</label><input type="password" id="password"/></dt>';
	html += '<dt><label style="width:100px;">新密码:</label><input type="password" id="newpass"/></dt>';
	html += '<dt><label style="width:100px;">再次输入新密码:</label><input type="password" id="affirm"/></dt>';
	html += '</dl>';
	$.fn.tipOpen({
		title : '修改密码',//弹框标题
		width : '500',//弹框内容宽度
		btn : [{
			label : '确定',
			onClickFunction : 'modifyPassword()'
		}],//按钮是否显示
		concent : html
	});
});

function logout(){
	$.ajax({
		url : SERVER_PATH + "/logout?_=" + (new Date()).getTime() ,
		type : 'get',
		dataType : 'json',
		success : function(data) {
			location.href = SERVER_PATH + "/login";
		},
		error : function() {
			location.href = SERVER_PATH + "/login";
		}
	})
}

function modifyPassword(){
	var password = $("#password").val();
	var newpass = $("#newpass").val();
	var affirm = $("#affirm").val();
	if(password == newpass || password == affirm ){
		$.fn.tipAlert("新密码与旧密码不能相同!",1.5,0);
		return;
	}else if(!(newpass == affirm) ){
		$.fn.tipAlert("兩次新密碼不一致!",1.5,0);
		return;
	}
	password = hex_md5(password);
	newpass = hex_md5(newpass);
	 $.ajax({
		url : SERVER_PATH + "/changepass",
		type : "post",
		dataType : "json",
		data : {
			password : password,
			newpass : newpass
		},
		error:function() {
			alert("系統异常!");
		},
		success:function(data) {
			if (data.success) {
				$.fn.tipAlert("修改密码成功,请重新登陆!",1.5,0);
				logout();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		}
	});
}

/*setInterval(function(){
	$.ajax({
		url : SERVER_PATH + "/checklogin?_=" + (new Date()).getTime() ,
		type : 'get',
		dataType : 'json',
		success : function(data) {
			if(!data.isLogin){
				$.fn.tipAlert('离开太久，系统已经登出，请重新登陆',1.5,0);
				location.href = SERVER_PATH + "/login";
			}
		},
		error : function() {
			
		}
	});
},1000 * 60);*/
$.ajaxSetup({
	//请求成功后触发
	complete: function (xhr, status) {
		if(xhr.responseText == undefined){
			return;
		}
		if(xhr.responseText.indexOf('<') !== -1){ return }
		var res = eval('('+xhr.responseText+')');
		if(res == undefined || res.code == undefined){
			return;
		}
		if(res.code == '-222'){
			$.fn.tipAlert('离开太久，系统已经登出，请重新登陆',1.5,0);
		   location.href = SERVER_PATH + "/login";
		 }
	}
})


$(function(){
	$(".left_nav_page li").each(function(index,element){
		if($(element).hasClass('left_nav_high')){
			$(element).parent().show();
			$(element).parent().prev().addClass('left_nav_nav-on');
		}
	});
	$(".left_nav_nav").click(function(){
		var $this = $(this);
		if(!$this.hasClass("left_nav_nav-on")){
			$(".left_nav_page").slideUp(200);
			$(".left_nav_nav").removeClass("left_nav_nav-on");
			if(0 != $this.next(".left_nav_page").length){
				$this.next(".left_nav_page").slideDown(200);
			}
			$this.addClass("left_nav_nav-on");
		}else{
			$this.removeClass("left_nav_nav-on");
			$this.next(".left_nav_page").slideUp(200);
		}
	});
})