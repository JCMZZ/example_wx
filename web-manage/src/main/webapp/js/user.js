var emTableConfig = {
	outerDivId : "outerId",
	pagesShow : true, 
	totalNumbersShow:true,
	searchConfig : {
		searchItems : [ {
			isShow : true,
			label : '用户名',
			id : 'username',
			type : 'input'
		} ,{
			isShow : true,
			label : '状态',
			id : 'state',
			type : 'select',
			options : [ {
				context : '全部'
			}, {
				context : '启用',
				value : 2
			}, {
				context : '停用',
				value : 1
			} ]
		} ],
		buttonItems : [ {
			isShow : AUTH_ADD_USER == true,
			label : '添加用户',
			id : 'addUserButton',
			onClickFunction : 'openAddBox()'
		} ],
		searchButton : true,
		resetButton : true
	},
	ajaxConfig : {
		url : SERVER_PATH + '/user/ajax/list',
		method : 'POST',
		data : {
			username : '#username',
			state : '#state'
		},
		startType : "startNum",
		startParams : "start",
		limitParams : "limit",
		defaultLimit : 20,
		supportLimit : [ 20, 50, 100 ],
		result : {
			dataArray : "result.list",
			totalCount : "result.totalCount",
			totalPageNum : "result.totalPage",
			currentPageNum : "result.currentPageNum"
		}
	},
	tableConfig : {
		isNeedIndexRow : true,
		rowItems : [
				{
					isShow : true,
					title : "用户名",
					width : "15%",
					context : "<span style='color:blue;'>@{username}</span>"
				},
				{
					isShow : true,
					title : "姓名",
					width : "15%",
					context : "@{nickname}"
				},
				{
					isShow : true,
					title : "手机号",
					width : "15%",
					context : "@{mobile}"
				},
				{
					isShow : true,
					title : "邮箱",
					width : "15%",
					context : "@{email}"
				},
				{
					isShow : true,
					title : "状态",
					width : "15%",
					selectors : [ {
						isShow : true,
						term : "@{state}",
						select : [ {
							value : 2,
							context : "启用"
						}, {
							value : 1,
							context : "停用"
						}, {
							value : 0,
							context : "删除"
						} ]
					} ]
				},
				{
					isShow : true,
					title : "操作",
					width : "20%",
					selectors : [
							{
								isShow : AUTH_OPER_USER == true,
								term : "@{state}",
								select : [
										{
											value : 2,
											context : "<span><a href='#' onClick='offUser(@{id})'>停用</a></span>&nbsp"
										},
										{
											value : 1,
											context : "<span><a href='#' onClick='onUser(@{id})'>启用</a></span>&nbsp"
										} ]
							},
							{
								isShow :  AUTH_EDIT_USER == true,
								term : "@{username}",
								select : [ {
									value : "@{username}",
									context : "<span><a href='#' onClick='modifyUser(@{id})'>修改</a></span>&nbsp"
								} ]
							},{
								isShow :  AUTH_DELETE_USER == true,
								term : "@{username}",
								select : [ {
									value : "@{username}",
									context : "<span><a href='#' onClick='deleteUser(@{id})'>删除</a></span>"
								} ]
							} ]
				} ]
	}
}

emTable('emTableConfig');

function openAddBox() {
	var html = '<dl class="alert-cen">';
	html += '<dt><label>用户名:</label><input type="text" id="addUsername" value=""/></dt>';
	html += '<dt><label>登录密码:</label><input type="password" id="password" value=""/></dt>';
	html += '<dt><label>再次输入密码:</label><input type="password" id="passwordTwo" value=""/></dt>';
	html += '<dt><label>姓名:</label><input type="text" id="nickname" value=""/></dt>';
	html += '<dt><label>手机号码:</label><input type="text" id="mobile" value="" /></dt>';
	html += '<dt><label>Email:</label><input type="text" id="email" value="" /></dt>';
	html += '<dd class="authority">';
	html += '<div><span class="checkAll" >全选</span><span class="removeCheckAll" >取消全选</span></div><div style="margin-top: 15px;">';
	$.ajax({
		url:  SERVER_PATH + "/user/ajax/allroles",
		type:'post',
		dataType:'json',
		success:function(data){	
			var list = data.result.allroles;
			for(var i  in list){
				var roleName = list[i].name;
				var roleId = list[i].id;
				html += '<b>';
				html += ''+roleName+'<input type="checkbox" id="'+roleId+'"  class="checkboxdo"/>';
				html += '</b>';
			}
			html += '</div></dd>';
			html += '</dl>';
			$.fn.tipOpen({
				title : '新增用户信息',//弹框标题
				width : '500',//弹框内容宽度
				btn : [{
					label : '确定',
					onClickFunction : 'ajaxAddUsr()'
				}],//按钮是否显示
				concent : html
			});
			$(".checkAll").click(function(){
				$(".checkboxdo").prop("checked","checked");
			});
			$(".removeCheckAll").click(function(){
				$(".checkboxdo").removeAttr("checked");
			});
		},
		error:function(){
			$.fn.tipAlert('系统异常',1,2);
		}
	});
	
	
}


function ajaxAddUsr(){
	
	var username = $('#addUsername').val();
	var password = $('#password').val();
	var passwordTwo = $('#passwordTwo').val();
	var nickname = $('#nickname').val();
	var mobile = $('#mobile').val();
	var email = $('#email').val();
	
	var ps='';
	$('.authority').find('b input[type=checkbox]:checked').each(function(index,element){
		var row = $(element).attr('id');
		ps= ps + row+',';	
	});
	
	if(username == null || username == ""){
		$.fn.tipAlert('用户名不能为空！',1.5,0);
		return;
	}
	
	if(password == null || password == "" || passwordTwo == null || passwordTwo == ""){
		$.fn.tipAlert("密码不能为空！",1.5,0);
		return;
	}
	if(password != passwordTwo){
		$.fn.tipAlert("两次密码输入不一致！",1.5,0);
		return;
	}
	if(nickname == null || nickname ==""){
		$.fn.tipAlert("姓名不能为空！",1.5,0);
		return;
	}
	if(mobile == null || mobile ==""){
		$.fn.tipAlert("手机号不能为空！",1.5,0);
		return;
	}
	var partten = /^1[3,5,8]\d{9}$/;
    if(!partten.test(mobile)){
    	$.fn.tipAlert('手机号码不正确',1.5,0);
        return false;
    }
	if(email == null || email ==""){
		$.fn.tipAlert("Email不能为空！",1.5,0);
		return;
	}
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!reg.test(email)){
		$.fn.tipAlert("Email格式不正确！",1.5,0);
		return;
	}
	
	if(ps == null || ps ==""){
		$.fn.tipAlert("角色不能为空！",1.5,0);
		return;
	}
	
	password = hex_md5(password);
	
	$.ajax({
		url : SERVER_PATH + '/user/ajax/add',
		type : 'post',
		dataType : 'json',
		data : {
			username :username,
			password : password,
			nickname : nickname,
			mobile : mobile,
			email : email,
			roles : ps
		},
		success : function(data) {
			if (data.success) {
				location.reload();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$.fn.tipAlert('error',1.5,2);
		}
	});
}

function onUser(id) {
	$.ajax({
		url : SERVER_PATH +  "/user/ajax/on",
		type : 'post',
		dataType : 'json',
		data : {
			userId : id
		},
		success : function(data) {
			if (data.success) {
				location.reload();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$.fn.tipAlert('error',1.5,2);
		}
	});
}

function offUser(id) {
	$.ajax({
		url :  SERVER_PATH + "/user/ajax/off",
		type : 'post',
		dataType : 'json',
		data : {
			userId : id
		},
		success : function(data) {
			if (data.success) {
				location.reload();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$.fn.tipAlert('error',1.5,2);
		}
	});
}

function modifyUser(id) {
	$.ajax({
		url:  SERVER_PATH + "/user/ajax/userinfo",
		type:'post',
		dataType:'json',
		data : {
			userId : id
		},
		success:function(data){	
			if (data.success) {
				var reNickname = data.result.user.nickname;
				var reUsername = data.result.user.username;
				var reMobile = data.result.user.mobile;
				var reEmail = data.result.user.email;
				var roles = data.result.user.roles;
				var html = '<dl class="alert-cen">';
				html += '<dt style="display: none;"><label>id:</label><input type="text" id="userId" value="'+id+'"/></dt>';
				html += '<dt><label>用户名:</label><span>'+reUsername+'</span></dt>';
				html += '<dt><label>登录密码:</label><input type="password" id="password" value="******"/></dt>';
				html += '<dt><label>再次输入密码:</label><input type="password" id="passwordTwo" value="******"/></dt>';
				html += '<dt><label>姓名:</label><input type="text" id="nickname" value="'+reNickname+'"/></dt>';
				html += '<dt><label>手机号码:</label><input type="text" id="mobile" value="'+reMobile+'" /></dt>';
				html += '<dt><label>Email:</label><input type="text" id="email" value="'+reEmail+'" /></dt>';
				html += '<dd class="authority">';
				html += '<div><span class="checkAll" >全选</span><span class="removeCheckAll" >取消全选</span></div><div style="margin-top: 15px;">';
				$.ajax({
					url:  SERVER_PATH + "/user/ajax/allroles",
					type:'post',
					dataType:'json',
					success:function(data){	
						var list = data.result.allroles;
						for(var i  in list){
							var roleName = list[i].name;
							var roleId = list[i].id;
							html += '<b>';
							html += ''+roleName+'<input type="checkbox" id="'+roleId+'"  class="checkboxdo"/>';
							html += '</b>';
						}
						html += '</div></dd>';
						html += '</dl>';
						$.fn.tipOpen({
							title : '修改用户信息',//弹框标题
							width : '500',//弹框内容宽度
							btn : [{
								label : '确定',
								onClickFunction : 'ajaxmodifyUser()'
							}],//按钮是否显示
							concent : html
						});
						$(".checkAll").click(function(){
							$(".checkboxdo").prop("checked","checked");
						});
						$(".removeCheckAll").click(function(){
							$(".checkboxdo").removeAttr("checked");
						});
						for (var i in roles){
							$('.authority').find('b input[type=checkbox]').each(function(index,element){
								var ID = $(element).attr('id');
								if(ID == roles[i]){
									$(element).attr("checked", true);
								}
							});
						}
					},
					error:function(){
						alert('系统异常');
					}
				});
			} else {
				alert(data.message);
			}
		},
		error:function(){
			alert('系统异常');
		}
	});
}

function ajaxmodifyUser(){
	var id = $('#userId').val();
	var nickname = $('#nickname').val();
	var mobile = $('#mobile').val();
	var email = $('#email').val();

	var roles='';
	$('.authority').find('b input[type=checkbox]:checked').each(function(index,element){
		var row = $(element).attr('id');
		roles = roles + row+',';	
	});

	var password = $('#password').val();
	var passwordTwo = $('#passwordTwo').val();

	if(password != passwordTwo){
		$.fn.tipAlert("两次密码输入不一致！",1.5,0);
		return;
	}
	if(roles == null || roles ==""){
		$.fn.tipAlert("角色不能为空！",1.5,0);
		return;
	}
	password = hex_md5(password);
	$.ajax({
		url : SERVER_PATH + "/user/ajax/modify",
		type : 'post',
		dataType : 'json',
		data : {
			userId : id,
			password : password,
			nickname : nickname,
			mobile : mobile,
			email : email,
			roles : roles
		},
		success : function(data) {
			if (data.success) {
				location.reload();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$.fn.tipAlert('error',1.5,2);
		}
	});
}

function deleteUser(id){
	$.fn.tipOpen({
		title : '是否删除',//弹框标题
		width : '300',//弹框内容宽度
		btn : [{
			label : '确定',
			onClickFunction : 'ajaxDelete('+id+')'
		}],//按钮是否显示
		concent : ''
	});
}

function ajaxDelete(id){
	$.ajax({
		url :  SERVER_PATH + "/user/ajax/delete",
		type : 'post',
		dataType : 'json',
		data : {
			userId : id
		},
		success : function(data) {
			if (data.success) {
				location.reload();
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$.fn.tipAlert('error',1.5,2);
		}
	});
}