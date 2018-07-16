$(function(){
	$.ajax({
		url:  SERVER_PATH + "/setting/ajax/list",
		type:'post',
		dataType:'json',
		success:function(data){
			if (data.success) {
				var list=data.result;
				var html;
				for(i in list){
					var id=list[i].id;
					var depict=list[i].depict;
					var settingKey=list[i].settingKey;
					var settingValue=list[i].settingValue;
					var unit=list[i].unit;
					var remark=list[i].remark;
					html+='<tr><td class="systd" ><span class="explain">'+depict+'&nbsp;:&nbsp;&nbsp;</span><span class="settingValue">'+settingValue+'&nbsp;&nbsp;</span><span class="unit">'+unit+'</span>';
					html+='</td><td class="remark"><span>'+remark+'</span></td>';
//					if(hasAuth("OPER_SYS_BASE_INFO_UPDATE")){
						html+='<td class="exbtn"><input type="button" value="修 改" onclick="modify(\''+settingKey+'\')"/></td></tr>';
//					}
					
				}
				$('#mainTab').html(html);
			} else {
				$.fn.tipAlert(data.message, 1.5, 0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	})		
})
function modify(id){
	$.ajax({
		url:  SERVER_PATH + "/setting/ajax/detail",
		type:'post',
		dataType:'json',
		data:{
			settingKey:id
		},
		success:function(data){
			if (data.success) {
				var id=data.result.id;
				var depict=data.result.depict;
				var settingKey=data.result.settingKey;
				var settingValue=data.result.settingValue;
				var unit=data.result.unit;
				var addHtml ="";
			 	addHtml = '<div align="center"><input type="hidden" id="setkey" value="'+settingKey+'"/><span>'+depict+'&nbsp;:&nbsp;&nbsp;</span><input type="text" id="setValue" value="'+settingValue+'" />&nbsp;&nbsp;&nbsp;<span>'+unit+'</span></div>';
			 	$.fn.tipOpen({
					title : "修改系统配置",// 弹框标题
					width : '320',// 弹框内容宽度
					height : '36',
					concent :addHtml,//弹框内容
					btn : [ {
				 		label : '保存',
				 		onClickFunction : 'modifySave()'
				 	}]				
				});
			} else {
				$.fn.tipAlert(data.message, 1.5, 0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	})		
	
}
function modifySave(){
	var setValue=$("#setValue").val();
	var setkey=$("#setkey").val();
	if (!validate.required(setValue)) {
		$.fn.tipAlert("修改内容不能为空", 1.5, 0);
		return false;
	}
	if((setkey=="sms_auting_setting") || (setkey=="page_send_file_size")){
		if (!validate.outLenght(setValue,9)) {
			$.fn.tipAlert("修改内容不能超过九位", 1.5, 0);
			return false;
		}
		 var pattern=/^\+?[1-9]\d*$/;
		 if(!pattern.test(setValue)){
			 $.fn.tipAlert("修改内容为正整数", 1.5, 0);
	         return false;
		 }
	}
	if(setkey=="sms_split_number"){
		if (!validate.outLenght(setValue,3)) {
			$.fn.tipAlert("修改内容不能超过3位", 1.5, 0);
			return false;
		}
		 var pattern=/^\+?[1-9]\d*$/;
		 if(!pattern.test(setValue)){
			 $.fn.tipAlert("修改内容为正整数", 1.5, 0);
	         return false;
		 }
	}
	$.ajax({
		url:  SERVER_PATH + "/setting/ajax/modify",
		type:'post',
		dataType:'json',
		data:{
			settingValue:setValue,
			settingKey:setkey
		},
		success:function(data){
			if (data.success) {
				$.fn.tipAlert('修改成功',1,1);
				window.location.reload();
			} else {
				$.fn.tipAlert(data.message, 1.5, 0);
			}
		},
		error:function(){
			$.fn.tipAlert('系统异常',1.5,0);
		}
	})		
	
}
