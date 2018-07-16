var emTableConfig = {
	outerDivId : "outerId",
	pagesShow : true, 
	totalNumbersShow:true,
	searchConfig : {
		buttonItems : [ {
			isShow : AUTH_ADD_ROLE == true,
			label : '添加角色',
			id : 'addRoleButton',
			onClickFunction : 'openAddBox()'
		} ],
		searchButton : false,
		resetButton : false
	},
	ajaxConfig : {
		url : SERVER_PATH + '/role/ajax/list',
		method : 'POST',
		data : {},
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
					title : "角色名",
					width : "30%",
					context : "<span style='color:blue;'>@{name}</span>"
				},
				{
					isShow : true,
					title : "操作",
					width : "70%",
					selectors : [
							{
								isShow :  AUTH_EDIT_ROLE == true,
								term : "@{name}",
								select : [ {
									value : "@{name}",
									context : "<span><a href='#' onClick='modify(@{id})'>修改</a></span>&nbsp"
								} ]
							},
							{
								isShow :  AUTH_DELETE_ROLE == true,
								term : "@{name}",
								select : [ {
									value : "@{name}",
									context : "<span><a href='#' onClick='deleteRole(@{id})'>删除</a></span>"
								} ]
							} ]
				} ]
	}
}

emTable('emTableConfig');

function openAddBox() {
	var html = '<dl class="alert-cen">';
	html += '<dt><label>角色名:</label><input type="text" id="addroleName" value=""/></dt>';
	html += '<dd class="authority" style="min-height:200px;">';
	html += '<div><span class="checkAll" >全选</span><span class="removeCheckAll" >取消全选</span></div><div id="auth" style="margin-top: 15px;">';
	$.ajax({
		url:  SERVER_PATH + "/role/ajax/authtree",
		type:'post',
		dataType:'json',
		success:function(data){	
			var auth = data.result.allauth;
			var ngvs = auth.ngvs;
			for(var i in ngvs){
				var ngv = ngvs[i];
				var ngvId = ngv.id;
				var ngvName = ngv.name;
				html += "<p style='color:black;'><b>"+ngvName+"</b></p>";
				var pages = ngv.pages;
				for(var j in pages){
					var page = pages[j];
					var pageId = page.id;
					var pageName = page.name;
					var opers = page.opers;
					var operL = opers?opers.length:0
					html += '<p style="margin-left:20px;margin-top:5px;color:black;" data-pages="'+operL+'">' + pageName + '<input type="checkbox" stype="page" id="'+pageId+'"  class="checkboxdo"/></p>';
					if(opers == null || opers.length == 0){
						continue;
					}
					html += '<p style="margin-left:40px;color:black;">';
					for(var k in opers){
						var oper = opers[k];
						var operId = oper.id;
						var operName = oper.name;
						html += '<input type="checkbox" id="'+operId+'" stype="oper" onClick="checkAble(this)" style="margin:0px 5px 0px 10px;" class="checkboxdo"/>' + operName ;
						
					}
					html += '</p>';
				}
			}
			html += '</div></dd>';
			html += '</dl>';
			$.fn.tipOpen({
				title : '新增角色',//弹框标题
				width : '500',//弹框内容宽度
				btn : [{
					label : '确定',
					onClickFunction : 'ajaxAdd()'
				}],//按钮是否显示
				concent : html
			});
			$(".checkAll").click(function(){
				$(".checkboxdo").prop("checked","checked");
				$("#auth").children('p').each(function(index,value){
					if($(value).data('pages') > 0){
						$(value).children('input').prop('disabled',true)
					}
				})
			});
			$(".removeCheckAll").click(function(){
				$(".checkboxdo").removeAttr("checked").prop('disabled',false);
			});
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}


function ajaxAdd(){
	var name = $('#addroleName').val();
	var ps = '';
	var os = '';
	$('.authority').find('p input[type=checkbox]:checked').each(function(index,element){
		var row = $(element).attr('id');
		var type = $(element).attr('stype');
		if(type == "page"){
			ps = ps + row + ",";
		}else{
			os = os + row + ",";
		}
	});
	if(name == null || name == ""){
		$.fn.tipAlert("名称不能为空！",1.5,0);
		return;
	}
	if(ps == '' && os == ''){
		$.fn.tipAlert("权限不能为空！",1.5,0);
		return;
	}
	
	$.ajax({
		url : SERVER_PATH + '/role/ajax/add',
		type : 'post',
		dataType : 'json',
		data : {
			pageauths :ps,
			operauths : os,
			roleName : name
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

function modify(id) {
	$.ajax({
		url:  SERVER_PATH + "/role/ajax/roleauth",
		type:'post',
		dataType:'json',
		data : {
			roleId :id
		},
		success:function(data){	
			if(data.success){
				var roleauth = data.result.roleauth;
				var pageAuths = roleauth.pageAuths;
				var operAuths = roleauth.operAuths;
				var roleName = data.result.roleName;
				$.ajax({
					url:  SERVER_PATH + "/role/ajax/authtree",
					type:'post',
					dataType:'json',
					success:function(data){	
						var html = '<dl class="alert-cen">';
						html += '<dt><label>角色名:</label><input type="text" id="modifyroleName" value="'+roleName+'"/></dt>';
						html += '<dd class="authority" style="min-height:200px;">';
						html += '<div><span class="checkAll" >全选</span><span class="removeCheckAll" >取消全选</span></div><div id="auth" style="margin-top: 15px;">';
						var auth = data.result.allauth;
						var ngvs = auth.ngvs;
						for(var i in ngvs){
							var ngv = ngvs[i];
							var ngvId = ngv.id;
							var ngvName = ngv.name;
							html += "<p style='color:black;'><b>"+ngvName+"</b></p>";
							var pages = ngv.pages;
							for(var j in pages){
								var page = pages[j];
								var pageId = page.id;
								var pageName = page.name;
								var opers = page.opers;
								var operL = opers?opers.length:0
								html += '<p style="margin-left:20px;margin-top:5px;color:black;" data-pages="'+operL+'">' + pageName + '<input type="checkbox" stype="page" id="'+pageId+'"  class="checkboxdo" ';
								if(pageAuths[pageId] == true){
									html += ' checked="checked" ';
									for(var k in opers){
										if(operAuths[opers[k].id] == true){
											html += ' disabled="disabled" ';
										}
									}
								}
								html += '/></p>';
								if(opers == null || opers.length == 0){
									continue;
								}
								html += '<p style="margin-left:40px;color:black;">';
								for(var k in opers){
									var oper = opers[k];
									var operId = oper.id;
									var operName = oper.name;
									html += '<input type="checkbox" id="'+operId+'" onClick="checkAble(this)" stype="oper" style="margin:0px 5px 0px 10px;" class="checkboxdo"';
									if(operAuths[operId] == true){
										html += ' checked="checked" ';
									}
									html += '/>' + operName ;
								}
								html += '</p>';
							}
						}
						html += '</div></dd>';
						html += '</dl>';
						$.fn.tipOpen({
							title : '修改角色信息',//弹框标题
							width : '500',//弹框内容宽度
							btn : [{
								label : '确定',
								onClickFunction : 'ajaxmodify('+id+')'
							}],//按钮是否显示
							concent : html
						});
						$(".checkAll").click(function(){
							$(".checkboxdo").prop("checked","checked");
							$("#auth").children('p').each(function(index,value){
								if($(value).data('pages') > 0){
									$(value).children('input').prop('disabled',true)
								}
							})
						});
						$(".removeCheckAll").click(function(){
							$(".checkboxdo").removeAttr("checked").prop('disabled',false);
						});
					},
					error:function(){
						$.fn.tipAlert('系统异常',1.5,0);
					}
				});
			}else{
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,2);
		}
	});
}
// 复选框查看
function checkAble(obj) {
	if($(obj).prop('checked')){
		$(obj).parent().prev().children('input').prop({checked:true,disabled:true})
	}
	var isArray = []
	$(obj).parent().children('input').each(function(index,value){
		isArray.push($(value).prop('checked'))
	})
	if(isArray.indexOf(true) === -1){
		$(obj).parent().prev().children('input').prop('disabled',false)
	}
}
function ajaxmodify(id){
	var modifyroleName = $('#modifyroleName').val();
	var ps = '';
	var os = '';
	$('.authority').find('p input[type=checkbox]:checked').each(function(index,element){
		var row = $(element).attr('id');
		var type = $(element).attr('stype');
		if(type == "page"){
			ps = ps + row + ",";
		}else{
			os = os + row + ",";
		}
	});
	if(modifyroleName == null || modifyroleName == ""){
		$.fn.tipAlert("名称不能为空！",1.5,0);
		return;
	}
	if(ps == '' && os == ''){
		$.fn.tipAlert("权限不能为空！",1.5,0);
		return;
	}

	$.ajax({
		url : SERVER_PATH + "/role/ajax/modify",
		type : 'post',
		dataType : 'json',
		data : {
			pageauths :ps,
			operauths : os,
			roleName : modifyroleName,
			roleId : id
		},
		success : function(data) {
			if (data.success) {
				$.fn.tipAlert("修改成功",1.5,1);
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

function deleteRole(id){
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
		url :  SERVER_PATH + "/role/ajax/delete",
		type : 'post',
		dataType : 'json',
		data : {
			roleId : id
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