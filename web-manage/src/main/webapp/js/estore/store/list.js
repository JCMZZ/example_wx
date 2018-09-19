var emTableConfig = {
	outerDivId : "outerId",
	pagesShow : true, 
	totalNumbersShow:true,
	searchConfig : {
		searchItems : [{
			isShow : true,
			label : '企业名称',
			id : 'name',
			type : 'input'
		},{
			isShow : true,
			label : '营业执照编号',
			id : 'storeLicence',
			type : 'input'
		},{
			isShow : true,
			label : 'APPID',
			id : 'appId',
			type : 'input'
		},{
			isShow : true,
			label : '秘钥',
			id : 'appSecret',
			type : 'input'
		},{
			isShow : true,
			label : '已绑定手机号',
			id : 'mobile',
			type : 'input'
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
		url : SERVER_PATH + '/store/selectStoreList',
		method : 'POST',
		data : {
			name:'#name',
			storeLicence:'#storeLicence',
			appId:'#appId',
			appSecret:'#appSecret',
			mobile:'#mobile'
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
					title : "企业名称",
					width : "6%",
					context : "@{name}"
				},{
					isShow : true,
					title : "APPID",
					width : "10%",
					context : "@{appId}"
				},{
					isShow : true,
					title : "秘钥",
					width : "6%",
					context : "@{appSecret}"
				},{
					isShow : true,
					title : "营业执照编号",
					width : "16%",
					context : "@{storeLicence}"
				},{
					width : "12%",
					title : "操作",
					selectors :
						[{
							isShow : true,
							term : "@{state}",
							select : [{
								value :1,
								context :"<div class='btn_box rs' alt='查看详情' title='查看详情'><a href='javascript:void(0)' onClick='checkDetail(\"@{id}\")'><i class='iCon grey-see'></i></a></div>&nbsp;"+ 
								   "<div class='btn_box rs' alt='上传资料' title='上传资料'><a href='javascript:void(0)' onClick='upload(\"@{id}\")'><i class='iCon grey-upload'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='下载资料' title='下载资料'><a href='javascript:void(0)' onClick='down(\"@{id}\")'><i class='iCon grey-download'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='管理员绑定' title='管理员绑定'><a href='javascript:void(0)' onClick='bind(\"@{id}\")'><i class='iCon iCon grey-bind'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='修改' title='修改'><a href='javascript:void(0)' onClick='modifyBusiness(\"@{appId}\",\"@{appSecret}\",\"@{storeLicence}\",\"@{id}\")'><i class='iCon iCon grey-write'></i></a></div>&nbsp;"
//								   "<div class='btn_box rs' alt='启用' title='启用'><a href='javascript:void(0)' onClick='openStart(@{id},\"@{state}\",\"@{name}\")'><i class='iCon grey-enable'></i></a></div>&nbsp;"
							},{
								value :0,
								context :"<div class='btn_box rs' alt='查看详情' title='查看详情'><a href='javascript:void(0)' onClick='checkDetail(\"@{id}\")'><i class='iCon grey-see'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='上传资料' title='上传资料'><a href='javascript:void(0)' onClick='upload(\"@{id}\")'><i class='iCon grey-upload'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='下载资料' title='下载资料'><a href='javascript:void(0)' onClick='down(\"@{id}\")'><i class='iCon grey-download'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='管理员绑定' title='管理员绑定'><a href='javascript:void(0)' onClick='bind(\"@{id}\")'><i class='iCon iCon grey-bind'></i></a></div>&nbsp;"+
								   "<div class='btn_box rs' alt='修改' title='修改'><a href='javascript:void(0)' onClick='modifyBusiness(\"@{appId}\",\"@{appSecret}\",\"@{storeLicence}\",\"@{id}\")'><i class='iCon iCon grey-write'></i></a></div>&nbsp;"
//								   "<div class='btn_box rs' alt='停用' title='停用'><a href='javascript:void(0)' onclick='openStart(\"@{id}\",\"@{state}\",\"@{name}\")'><i class='iCon grey-disable'></i></a></div>&nbsp;"
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
//增加商户
function addBusiness(){
	var html='<div class="clear form_box"  id="add"><form method="post" id="addForm"><div class="item"><label class="item-label"><span class="xing">*</span>企业名称：</label><input type="text" id="addName"  class="item-text" name="name"  /></div>';
        html+='<div class="item"><label class="item-label">APPID：</label><input type="text" id="addAppId"  class="item-text" name="appId"  /></div>';
		html+='<div class="item"><label class="item-label">秘钥：</label><input type="text" id="addAppSecret"  class="item-text" name="appSecret"/></div>';
        html+='<div class="item"><label class="item-label"><span class="xing">*</span>营业执照编号：</label><input type="text" id="addStoreLicence"  class="item-text" name="storeLicence"  /></div>';
	$.fn.tipOpen({
		title : "企业新增",
		width : '500',
		height:'',
		tipClose:false,
		concent :html,
		btn : [{
			label : '确认',
			onClickFunction : 'addTrue(0)'
		}]
	});
}
//修改
function modifyBusiness(appId,appSecret,storeLicence,id){
	$.ajax({
		url:  SERVER_PATH + '/store/selectStore',
		type:'post',
		dataType:'json',
		data:{
			storeId:id,
		},
		success:function(data){
			if (data.success) {
				var html='<div class="clear form_box"  id="add"><form method="post" id="addForm"><div class="item"><label class="item-label"><span class="xing">*</span>企业名称：</label><input type="text" id="addName" value='+filterNull(data.result.storeName)+' class="item-text" name="name"  /></div>';
				    html+='<div class="item"><label class="item-label">APPID：</label><input type="text" id="addAppId"  value="'+appId+'" class="item-text" name="appId" /></div>';
					html+='<div class="item"><label class="item-label">秘钥：</label><input type="text" id="addAppSecret" value="'+appSecret+'"  class="item-text" name="appSecret"/></div>';
				    html+='<div class="item"><label class="item-label"><span class="xing">*</span>营业执照编号：</label><input type="text" id="addStoreLicence" value='+storeLicence+' class="item-text" name="storeLicence"  /></div>';
					$.fn.tipOpen({
						title : "企业修改",
						width : '500',
						height:'',
						tipClose:false,
						concent :html,
						btn : [{
							label : '确认',
							onClickFunction : 'addTrue(1,'+id+')'
						}],
					});
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	})
}
//确认
function addTrue(type,id){
	var url,message
	type?(url='/store/updateStore',message='修改成功'):(url='/store/addStore',message='添加成功')
	var $formCheckOut = $('#addForm');
    var validateor=$formCheckOut.validate({
    	rules:{     
    		name:{ 
				required:true,
				maxlength:50,
				transferred:true
			},
			appId:{ 
				wxAppId:true
			},
			appSecret:{
				wxPass:true
			}/*,
			storeLicence:{
				required:true,
				wxLicense:true
			}*/
    	},
		messages:{
			name:{
				required:"企业名称不能为空",
				maxlength:"最多可输入50个字",
				transferred:"不支持  \\ 字符"
			},
			appId:{ 
				wxAppId:"请输入18位的字母和数字"
			},
			appSecret:{
				wxPass:"请输入32位的字母和数字"
			}/*,
			storeLicence:{
				required:"营业执照编号不能为空",
				wxLicense:"请输入15-18位的字母和数字"
			}*/
		}
    });
    if($('#addForm').valid()){//是否验证成功
    	var licenceLength = $("#addStoreLicence").val().length;
    	if (licenceLength < 15 || licenceLength > 18) {
    		$.fn.tipAlert("营业执照编号请输入15-18位的字母和数字",1.5,0);
    		return false;
    	}
    	var data = {};
    	var objs = $("#addForm").serializeArray(); 
    	for(var i=0;i<objs.length;i++){
    		var items =objs[i];
    		data[items.name]=items.value;
    	}
    	if(id!==undefined){
    		data["storeId"] = id;
    	}
    	$.ajax({
    		url:  SERVER_PATH + url,
    		type:'post',
    		dataType:'json',
    		data:data,
    		success:function(data){
    			if (data.success) {
    				$.fn.tipLoddingEnd(true);
    				$.fn.tipAlert(message,1,1);
    				var limit=$('.limitSelect').val();
    				emrefulsh("emTableConfig", 0, limit);
    			} else {
    				$.fn.tipLoddingEnd(false);
    				$.fn.tipAlert(data.message,1.5,0);
    			}
    		},
    		error:function(){
    			$.fn.tipLoddingEnd(false);
    			$.fn.tipAlert('系统异常',1.5,0);
    		}
    	});
    }
}
// 启用停用
function openStart(id,state,storeName){
	$.ajax({
		url:  SERVER_PATH + "/store/ajax/updateStoreState",
		type:'post',
		dataType:'json',
		data:{
			storeId:id,
			state:state,
			storeName:storeName
		},
		success:function(data){
			if (data.success) {
				$.fn.tipLoddingEnd(true);
				let message = '';
				state === '1'?(message='启用成功'):(message='停用成功')
				$.fn.tipAlert(message,0.5,1);
				var limit=$('.limitSelect').val();
				emrefulsh("emTableConfig", 0, limit);
			} else {
				$.fn.tipLoddingEnd(false);
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipLoddingEnd(false);
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}
// 管理员绑定
function bind(id){
	$(".main-right #box_storeId").remove()
	$(".main-right").append('<input type="hidden" id="box_storeId" value='+id+' style="visibility: hidden;"/>')
    var tipBorderLen=$(".tipBorder").length;
    if(tipBorderLen==0){
    	var html="";
    	html='<div id="innerDiv"></div>';
		$.fn.tipOpen({
			title : "管理员绑定操作",
			width : '660',
			tipClose: false,
			height:'',
			concent :html,
			cancel:false,
			btn : [{
				label : '完成',
				onClickFunction : 'closeTip()'
			}]
		});
		emTableConfigtwo={
				outerDivId : "innerDiv",
				pagesShow : true, 
				totalNumbersShow:true,
				searchConfig : {
					searchItems : [{
	                      isShow : true,
	                      label : '',
	                      id : 'box_storeId',
	                      type : 'include'
			        },{
						label : '用户名称：',
						id : 'nickName',
						type : 'input'
					}],
					searchButton : true,
					resetButton : false
				},
				ajaxConfig : {
					url : SERVER_PATH + '/store/selectAdminList',
					method : 'POST',
					data : {
						storeId: '#box_storeId',
						adminName: '#nickName'
					},
					startType : "startNum",
					startParams : "start",
					limitParams : "limit",
					defaultLimit : 10,
					supportLimit : [ 10, 20, 50 ],
					result : {
						dataArray : "result.list",
						totalCount : "result.totalCount",
						totalPageNum : "result.totalPage",
						currentPageNum : "result.currentPageNum"
					}
				},
				tableConfig : {
					isNeedIndexRow: true,
					rowItems : [{
								title : "手机号",
								width : "30%",
								context : "@{mobile}"
							},{
								title : "用户名称",
								width : "20%",
								context : "<div class='leftdiv'>@{nickname}</div>"
							},{
								width : "10%",
								title : "操作",
								selectors :
									[{
										isShow : true,
										term : "@{bindState}",
										select : [{
											value :1,
											context : "<div class='btn_box rs' alt='解绑' title='解绑'><a href='javascript:void(0)' onClick='bindManage(\"@{id}\","+id+",\"@{bindState}\")'><i class='iCon grey-unlock'></i></a></div>&nbsp;"
										},{
											value :0,
											context : "<div class='btn_box rs' alt='绑定' title='绑定'><a href='javascript:void(0)' onclick='bindManage(\"@{id}\","+id+",\"@{bindState}\")'><i class='iCon grey-lock'></i></a></div>&nbsp;"
										}]
									}]
							}]
				}
			}
		$(".tipBorder").css("top","50px");
		emTable('emTableConfigtwo');
    }
}
// 绑定
function bindManage(id,storeId,bindState){
	$(".main-right #box_storeId").remove()
	$(".main-right").append('<input type="hidden" id="box_storeId" value='+storeId+' style="visibility: hidden;"/>')
	$.ajax({
		url:  SERVER_PATH + "/store/updateAdminBind",
		type:'post',
		dataType:'json',
		data:{
			storeId:storeId,
			bind:bindState,
			adminId:id
		},
		success:function(data){
			if (data.success) {
				let message = '';
				bindState === '0'?(message='绑定成功'):(message='解绑成功')
				$.fn.tipAlert(message,1,1);
				var limit=$('#innerDiv .limitSelect').val();
				emrefulsh("emTableConfigtwo", 0, limit);
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}
//查看详情
function filterNull(value){
	value || (value = "")
	return value
}
function checkDetail(id) {
//	window.location.href=SERVER_PATH + '/store/to/checkStore?storeId='+id;
	$.ajax({
		url:  SERVER_PATH + '/store/selectStore',
		type:'post',
		dataType:'json',
		data:{
			storeId:id,
		},
		success:function(data){
			if (data.success) {
				var html = ""
				var result = data.result
					html += "<table id='checkDetail'><tbody><tr><td>公司地址</td><td>"+filterNull(result.address)+"</td></tr><tr>"
					html += "<td>经度位置</td><td>"+filterNull(result.longitude)+"</td></tr><tr>"
					html += "<td>纬度位置</td><td>"+filterNull(result.dimension)+"</td></tr><tr>"
					html += "<td>公司电话</td><td>"+filterNull(result.mobile)+"</td></tr><tr>"
					html += "<td>公司简介</td><td>"+filterNull(result.describe)+"</td></tr></tbody></table>"
				$.fn.tipOpen({
					title : "详情",
					width : '500',
					tipClose:false,
					cancel:false,
					btn : [{
						label : '关闭',
						onClickFunction : 'closeTip(this)'
					}],
					concent : html
				});
				
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}
// 上传资料
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
		url : SERVER_PATH + '/store/uploadData',
		secureuri : false,
		fileElementId : fileId,
		data:{
			storeId:storeId
		},
		dataType : 'json',
		success : function(data) {
			$(obj).parents('.tipBorder').remove();
			if(data.success){
				$.fn.tipAlert(data.result,1.5,1);
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
// 下载资料
function down(storeId){
	var addHtml ="";
 	addHtml = "<div>是否下载资料?</div>";
	$.fn.tipOpen({
			title : "下载确认",// 弹框标题
			width : '300',// 弹框内容宽度
			height : '27',
			concent :addHtml,//弹框内容
			btn : [ {
		 		label : '确定',
		 		onClickFunction : 'exportExcelsave('+storeId+')'
		 	}]
	 });
}
//确认下载
function exportExcelsave(storeId){
	$.ajax({
		url:  SERVER_PATH + '/store/checkData',
		type:'post',
		dataType:'json',
		data:{
			storeId:storeId,
		},
		success:function(data){
			if (data.success) {
				$("#exportClientReportForm").remove();
				var formHtml = "<form id='exportClientReportForm' action='"+SERVER_PATH+"//store/download' method='post'>";
					formHtml +="<input type='hidden' value='"+storeId+"' name='storeId'/>";
					formHtml += "</form>";
				$("body").append(formHtml);
				$("#exportClientReportForm").submit();
			} else {
				$.fn.tipAlert('当前没有资料',1.5,0);
			}
			$.fn.tipShut(0);
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}
