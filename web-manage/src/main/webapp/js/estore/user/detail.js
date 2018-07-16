function backData(userId){
	$.ajax({
		url:  SERVER_PATH + '/storeUser/selectUser',
		type:'post',
		dataType:'json',
		data:{
			userId: userId
		},
		success:function(data){
			if (data.success) {
				htmlB(data.result.B)
				htmlC(data.result.C)
			} else {
				$.fn.tipAlert(data.message,1.5,0);
			}
		},
		error:function(){
			$.fn.tipLoddingEnd(false);
			$.fn.tipAlert('系统异常',1.5,0);
		}
	});
}
backData(userId)
// B端
function htmlB(data){
	var html = '';
		html += '<div id="outerId_table_parent" class="emtable_table_parent"><table id="outerId_table_table" class="emtable_table_table"><thead><tr>'
		html += '<th width="30%">手机号</th><th width="20%">用户昵称</th><th width="20%">商户名称</th></tr></thead><tbody>'
		for(var i = 0;i<data.length;i++){
			html += '<tr><td>'+data[i].mobile+'</td><td>'+data[i].nickname+'</td><td>'+data[i].storeName+'</td></tr>'
		}
		if(data.length <= 0){
			html += '<tr><td colspan="11">暂无数据</td></tr>'
		}
		html +=  '</tbody></table></div>'
	$("#outerB").html(html)
}
//C端
function htmlC(data){
	var html = '';
		html += '<div id="outerId_table_parent" class="emtable_table_parent"><table id="outerId_table_table" class="emtable_table_table"><thead><tr>'
		html += '<th width="5%">序号</th><th width="10%">手机号</th><th width="10%">用户昵称</th><th width="8%">余额</th><th width="8%">积分</th><th width="10%">商户名称</th></tr></thead><tbody>'
		for(var i = 0;i<data.length;i++){
			html += '<tr><td>'+(i+1)+'</td><td>'+data[i].mobile+'</td><td>'+data[i].nickname+'</td><td>'+data[i].balance+'</td><td>'+data[i].score+'</td><td>'+data[i].storeName+'</td></tr>'
		}
		if(data.length <= 0){
			html += '<tr><td colspan="11">暂无数据</td></tr>'
		}
		html +=  '</tbody></table></div>'
    $("#outerC").html(html)
}
