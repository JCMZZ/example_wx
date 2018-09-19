var emTableConfig = {
	outerDivId : "outerId",
	pagesShow : true, 
	totalNumbersShow:true,
	searchConfig : {
		searchItems : [{
			isShow : true,
			label : '广告链接',
			id : 'name',
			type : 'input'
//		},{
//			isShow : true,
//			label : '营业执照编号',
//			id : 'storeLicence',
//			type : 'input'
//		},{
//			isShow : true,
//			label : 'APPID',
//			id : 'appId',
//			type : 'input'
//		},{
//			isShow : true,
//			label : '秘钥',
//			id : 'appSecret',
//			type : 'input'
//		},{
//			isShow : true,
//			label : '已绑定手机号',
//			id : 'mobile',
//			type : 'input'
		}],
		buttonItems : [  {
			isShow:true,
			label : '增加',
			id : 'addBtn',
			onClickFunction : 'addBusiness()'
		}],
		searchButton : true,
		resetButton : false
	},
	ajaxConfig : {
		url : SERVER_PATH + '/adManage/ajax/list',
		method : 'POST',
		data : {
			linkPath:'#name'
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
		rowItems : [{
					isShow : true,
					title : "广告图",
					width : "15%",
					context : "<image class='linkImage' src='@{imageUrl}'>"
				},{
					isShow : true,
					title : "广告链接",
					width : "12%",
					context : "@{linkPath}"
				},{
					width : "10%",
					title : "操作",
					selectors :
						[{
							isShow : true,
							term : "@{id}",
							select : [{
								value :"@{id}",
								context :"<span><a href='#' onClick='modifyUser(@{id})'>修改</a></span>&nbsp&nbsp;"+
									"<span><a href='#' onClick='upload(@{id})'>上传图片</a></span>&nbsp&nbsp;"
							}]
						}]
				}]
	}
}

//关闭弹框
function closeTip(){
	$.fn.tipShut(0)
}

//初始化页面
emTable('emTableConfig');
//添加广告
function addBusiness(){
	var txt = $('#outerId_table_table tbody tr td').text()
	if (txt == '暂无数据') {
		var html='<div class="item"><label class="item-label">广告链接：</label><input type="text" id="addlinkPath"  class="item-text" name="storeLicence"  /></div>';
		$.fn.tipOpen({
			title : "广告链接新增",
			width : '500',
			height:'',
			tipClose:false,
			concent :html,
			btn : [{
				label : '确认',
				onClickFunction : 'addTrue(this, 0)'
			}]
		});
	} else {
		$.fn.tipAlert("只能添加一条广告",1.5,0);
	}
}

//添加确认
function addTrue(obj,type){
	var data = {};
	var linkPath = $('#addlinkPath').val();
	data["linkPath"] = linkPath;
	var reg = /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
	if (linkPath != '') {
		if(!reg.test(linkPath)){
			$.fn.tipAlert("链接路径格式不正确！",1.5,0);
			return;
		}
	} 
	$(obj).parents('.tipBorder').hide();
	$('.layer').remove();
	$.ajax({
		url : SERVER_PATH + '/adManage/ajax/add',
		data:data,
		dataType : 'json',
		success : function(data) {
			$(obj).parents('.tipBorder').remove();
			if(data.success){
				emTable('emTableConfig');
			}else{
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$(obj).parents('.tipBorder').remove();
			$.fn.tipAlert('error',1.5,2);
		}
	});
}


//修改广告
function modifyUser(id){
	$.ajax({
		url:  SERVER_PATH + '/adManage/ajax/info',
		type:'post',
		dataType:'json',
		data:{
			id:id,
		},
		success:function(data){
			if (data.success) {
				var linkPath = data.result.linkPath
				if (linkPath == null){
					linkPath = ''
				}
				var html ='<div class="item"><label class="item-label">广告链接：</label><input type="text" id="modifylinkPath" value="'+linkPath+'"  class="item-text" name="storeLicence"  /></div>';
				$.fn.tipOpen({
					title : "广告链接修改",
					width : '500',
					height:'',
					tipClose:false,
					concent :html,
					btn : [{
						label : '确认',
						onClickFunction : 'modifyTrue(this,'+ id +')'
					}]
				});
			}
		}
	})
}

////修改确认
function modifyTrue(obj, id){
	var data = {};
	var linkPath = $('#modifylinkPath').val();
	console.log(linkPath)
	var reg = /^(https):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
	if (linkPath != '') {
		if(!reg.test(linkPath)){
			$.fn.tipAlert("链接路径格式不正确！",1.5,0);
			return;
		}
	} 
	$(obj).parents('.tipBorder').hide();
	$('.layer').remove();
	$.ajax({
		url : SERVER_PATH + '/adManage/ajax/modify',
		type: 'post',
		data:{
			linkPath: linkPath,
			id: id
		},
		dataType : 'json',
		success : function(data) {
			$(obj).parents('.tipBorder').remove();
			if(data.success){
				emTable('emTableConfig');
			}else{
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$(obj).parents('.tipBorder').remove();
			$.fn.tipAlert('error',1.5,2);
		}
	});
}

// 上传图片
function upload(storeId){
	var addHtml = "<input type='file' id='fileInput' name='fileInput'/><div class='tipPrompt red'></div>";
	$.fn.tipOpen({
		title : "上传资料 ",
		width : '325',
		height: '80',
		tipClose:false,
		btn : [{
			label : '上传',
			onClickFunction : 'importFile(this,'+storeId+')'
		}],
		concent : addHtml
	});
}
// 确认上传
function importFile(obj,storeId){
	var importFile = $('#fileInput').val();
	var fileId = 'fileInput';
	if($("#fileInput").val() === ''){
		fileId = 'null';
		$.fn.tipAlert('请选择上传的文件',1.5,2);
		return;
	}
//	else if(!importFile.endWith('.xlsx')){
//		$.fn.tipAlert('请上传.xlsx格式的文件',1.5,2);
//		return;
//	}
	$(obj).parents('.tipBorder').hide();
	$('.layer').remove();
	$.ajaxFileUpload({
		url : SERVER_PATH + '/adManage/ajax/upload',
		secureuri : false,
		fileElementId : fileId,
		data:{
			id:storeId
		},
		dataType : 'json',
		success : function(data) {
			$(obj).parents('.tipBorder').remove();
			if(data.success){
				emTable('emTableConfig');
			}else{
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error : function() {
			$(obj).parents('.tipBorder').remove();
			$.fn.tipAlert('error',1.5,2);
		}
	});
}
