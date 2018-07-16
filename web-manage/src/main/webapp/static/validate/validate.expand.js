// JavaScript Document

jQuery.validator.addMethod("isZipCode", function(value, element) {   
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "只能包括中文字、英文字母、数字和下划线");

//扩展
jQuery.extend(jQuery.validator.messages, {
	  required: "必选字段",
	  remote: "请修正该字段",
	  email: "请输入正确格式的电子邮件",
	  url: "请输入合法的网址",
	  date: "请输入合法的日期",
	  dateISO: "请输入合法的日期 (ISO).",
	  number: "请输入合法的数字",
	  digits: "只能输入1-9位正整数",
	  creditcard: "请输入合法的信用卡号",
	  equalTo: "请输入相同的密码",
	  accept: "请输入拥有合法后缀名的字符串",
	  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
	  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
	  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
	  min: jQuery.validator.format("请输入一个最小为{0} 的值")
});

//自定义方法，完成手机号码的验证
//name:自定义方法的名称，method：函数体, message:错误消息
$.validator.addMethod("phone", function(value, element, param){
    //方法中又有三个参数:value:被验证的值， element:当前验证的dom对象，param:参数(多个即是数组)
    //alert(value + "," + $(element).val() + "," + param[0] + "," + param[1]);
    return new RegExp(/^1[34578]\d{9}$/).test(value);
}, "手机号码不正确");
//转义
$.validator.addMethod("transferred", function(value, element) { 
	return !/\\/.test(value);
}, "不支持\\字符");
//汉字，英文，数字
$.validator.addMethod("isZipName", function(value, element) { 
	return /^[a-zA-Z0-9\u4e00-\u9fa5]{1,30}$/.test(value);
}, "只能包括中文字、英文字母、数字");
//修改密码
$.validator.addMethod("newPassReg", function(value, element, param){
    return  new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(value); 
}, "请输入6－16位数字和英文,区分大小写");
$.validator.addMethod("passwordTrue", function(value, element, param){
	var target = $(param);
	return value !== target.val();
}, "新密码与旧密码不能一样");
//新增通道
$.validator.addMethod("channelIp", function(value, element, param){
    return  new RegExp(/^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5])$/i).test(value); 
}, "IP格式错误");
$.validator.addMethod("channelPort", function(value, element, param){
    return  new RegExp(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/).test(value); 
}, "1-65535的整数");
$.validator.addMethod("channelNumber", function(value, element, param){
    return  new RegExp(/^[0-9]*$/).test(value); 
}, "请输入数字");
$.validator.addMethod("number", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,8}$/).test(value); 
}, "请输入1-9位正整数");
$.validator.addMethod("oneNum", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0}$/).test(value); 
}, "请输入1到9之间的正整数");
$.validator.addMethod("twoNum", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,1}$/).test(value); 
}, "不能以0开头的数字");

$.validator.addMethod("sendAgin", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-3]\d{0,1}$/).test(value); 
}, "请输入1-3的数字");

$.validator.addMethod("threeNum", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,2}$/).test(value); 
}, "不能以0开头的数字");
$.validator.addMethod("threeNumLessThan500", function(value, element, param){
    return  new RegExp(/^([1-9]\d?|[1-4]\d{2}?)$/).test(value); 
}, "不能以0开头且小于500的数字");
$.validator.addMethod("threeNumLessThan1000", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^(?:(?!0{1,3})\d{1,3})$/).test(value); 
}, "不能以0开头且小于1000的数字");
$.validator.addMethod("numLessThan500", function(value, element, param){
    return  new RegExp(/^([1-9]\d?|[1-4]\d{2}?)$/).test(value); 
}, "请输入1到499之间的正整数");
$.validator.addMethod("numLessThan300", function(value, element, param){
    return  new RegExp(/^([1-9]\d?|[1-2]\d{2}?)$/).test(value); 
}, "不能以0开头且小于300的数字");
$.validator.addMethod("numLessThan100", function(value, element, param){
    return  new RegExp(/^([1-9]\d?)$/).test(value); 
}, "不能以0开头且小于100的数字");
$.validator.addMethod("sendAddress", function(value, element, param){
	return  new RegExp(/^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5]):([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/).test(value); 
}, "IP格式错误");
$.validator.addMethod("numLessThanNew1212", function(value, element, param){
    return  new RegExp(/^(?:(?!0{1,3})\d{1,3})$|^1000$/).test(value); 
}, "大于0小于等于1000的数字");
$.validator.addMethod("numLessThanNew1000", function(value, element, param){
    return  new RegExp(/^[1-9]$|^[1-9]\d$|^[1-9]\d{2}$|^[1-3]\d{3}$|^4000$/).test(value); 
}, "大于0小于等于4000的数字");
$.validator.addMethod("numberLessOrEq2000", function(value, element, param){
    return  new RegExp(/^[1-9]$|^[1-9]\d$|^[1-9]\d{2}$|^1\d{3}$|^2000$/).test(value); 
}, "大于0小于等于2000的数字");

//读写模式
$.validator.addMethod("readWriteModeValue", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^(R|W|RW)$/).test(value); 
}, "请输入R或者W或者RW");
$.validator.addMethod("reportErrorCodeReg", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,2}$/).test(value); 
}, "状态报告错误代码最大为3位正整数");

$.validator.addMethod("channelNodeIp", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5]):([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/).test(value); 
}, "格式不正确");
$.validator.addMethod("sixNumber", function(value, element, param){
    return  new RegExp(/^[0-9]\d{0,5}$/).test(value); 
}, "请输入1-6位的数字");


//调配
$.validator.addMethod("turnNumber", function(value, element, param){
    return  new RegExp(/^([1-9]\d?|100)$/).test(value); 
}, "请输入1-100的正整数");

//号段管理
$.validator.addMethod("basesectionnumber", function(value, element, param){
    return  new RegExp(/^1[0-9]{2,3}$/).test(value); 
}, "请输入以1为开头的3或4位正整数");
$.validator.addMethod("sectionnumber", function(value, element, param){
    return  new RegExp(/^1[0-9]{6}$/).test(value); 
}, "请输入以1为开头的7位正整数");
$.validator.addMethod("c_user_name", function(value, element, param){
	return  new RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/).test(value); 
}, "请输入6-16位的大小写字母和数字");
//小程序APPID
$.validator.addMethod("wxAppId", function(value, element, param){
	if(value===''){
		return true
	}
	return  new RegExp(/^[a-zA-Z0-9]{18}$/).test(value); 
}, "请输入18位的字母和数字");
//小程序密钥
$.validator.addMethod("wxPass", function(value, element, param){
	if(value===''){
		return true
	}
	return  new RegExp(/^[a-zA-Z0-9]{32}$/).test(value); 
}, "请输入32位的字母和数字");
//小程序营业执照编号
$.validator.addMethod("wxLicense", function(value, element, param){
	return  new RegExp(/^[0-9]{15}$/).test(value); 
}, "请输入15位数字");
$.validator.addMethod("user_name", function(value, element, param){
	return  new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,15}$/).test(value); 
}, "请输入4-16位英文字母和数字，首位不能为数字");
$.validator.addMethod("real_name", function(value, element, param){
    return  new RegExp(/^[\u2E80-\u9FFFa-zA-Z]+$/).test(value); 
}, "请输入中文和英文");
/*邮箱*/
$.validator.addMethod("userEmail", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[\u4e00-\u9fa5a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]*[\u4e00-\u9fa5a-zA-Z0-9]+\.[a-zA-Z]*[\u4e00-\u9fa5a-zA-Z0-9]{2,3}$/).test(value); 
}, "请输入正确的邮箱");
/*部门名称*/
$.validator.addMethod("depName", function(value, element, param){
    return  new RegExp(/^[\u2E80-\u9FFFa-zA-Z]+$/).test(value); 
}, "请输入中文和英文");
/*预警配置*/
$.validator.addMethod("waringNum", function(value, element, param){
	if(value==''){
		return true;
		$("#waringfre-error").removeClass("valid");
	}
    return  new RegExp(/^\+?[1-9]\d{0,9}$/).test(value); 
}, "请输入1-9位的正整数");
$.validator.addMethod("warningNum", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,3}$/).test(value); 
}, "请输入1-4位的正整数");
/* 充值扣费 */
$.validator.addMethod("drNumber", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,8}$/).test(value); 
}, "请输入1-9位的正整数");
/*$.validator.addMethod("recontion", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^[\u2E80-\u9FFFa-zA-Z]+$/).test(value); 
}, "请输入中文和英文");
*/
$.validator.addMethod("recontion", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
	if(value.length > 50){
		return false;
	}
}, "输入内容不能超过50个字");
/*$.validator.addMethod("clientNum", function(value, element, param){
    return  new RegExp(/^[1-9][0-9]{4}$/).test(value); 
}, "请输入非0开头的5位数字");*/
$.validator.addMethod("clientNum", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,7}$/).test(value); 
}, "请输入1-8位的正整数");
$.validator.addMethod("spser", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,5}$/).test(value); 
}, "请输入1-6位的正整数");
$.validator.addMethod("serviceCodeReg", function(value, element, param){
    return  new RegExp(/^[1-9]\d{0,30}$/).test(value); 
}, "最多输入30位正整数");
$.validator.addMethod("extendCodeReg", function(value, element, param){
    return  new RegExp(/^[0-9]\d{0,9}$/).test(value); 
}, "最多输入10位整数");
$.validator.addMethod("createNum", function(value, element, param){
	 return  new RegExp(/^(?:[0-9]{1,3}|1000)$/).test(value);
}, "生成号码数量必须在1-1000之间");
$.validator.addMethod("codeStartNum", function(value, element, param){
	return  new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3}$/).test(value); 
}, "请输入3位字母或者数字");

$.validator.addMethod("numberMessage", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,8}$/).test(value); 
}, "请输入1-9位的正整数");
$.validator.addMethod("warningThresholdGlobalReg", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,7}$/).test(value); 
}, "请输入1-8位的正整数");

$.validator.addMethod("isnan", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^(\-|\+)?\d+(\.\d+)?$/).test(value); 
}, "请输入合法数值");
//输入合法正数
$.validator.addMethod("postivezero", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
	var number = +value;
    return  value > 0; 
}, "请输入正数值");
//输入非负整数 可单独为0 不可以0开头
$.validator.addMethod("forwardRecitation", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^(0|[1-9]\d*)$/).test(value); 
}, "请输入非负整数");

$.validator.addMethod("numberMobiles", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
	if(value.length>11){
		var arr=value.split(",");
        for(var i=0; i < arr.length; i++){
        	if(arr[i].length>11){
        		 return  new RegExp(/^1[34578]\d{9}$/).test(arr[i]); 	
        	}	
        }
	}else{
		return  new RegExp(/^1[34578]\d{9}$/).test(value); 
	}
	
   
}, "请输入正确的手机号");

/*客户信息*/
/*$.validator.addMethod("cNumber", function(value, element, param){
    return  new RegExp(/^[1-9][0-9]{4}$/).test(value); 
}, "请输入非0开头的5位数字");*/
$.validator.addMethod("cNumber", function(value, element, param){
    return  new RegExp(/^[1-9][0-9]{0,7}$/).test(value); 
}, "请输入非0开头的1-8位数字");
$.validator.addMethod("cName", function(value, element, param){
    return  new RegExp(/^[\u2E80-\u9FFF]+$/).test(value); 
}, "请输入中文");
$.validator.addMethod("cuserName", function(value, element, param){
	return  new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,15}$/).test(value); 
}, "请输入4-16位的英文字母和数字,首位不能为数字");
$.validator.addMethod("opersign", function(value, element, param){
    return  new RegExp(/^[\u2E80-\u9FFFa-zA-Z0-9]{2,8}$/).test(value); 
}, "请输入2-8位中英文和数字");
$.validator.addMethod("linkM", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^[\u2E80-\u9FFF]+$/).test(value); 
}, "请输入中文");

$.validator.addMethod("cMobile", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return new RegExp(/^1[34578]\d{9}$/).test(value);

}, "手机号码不正确");
$.validator.addMethod("newp", function(value, element, param){
    return new RegExp(/^[a-zA-Z\d+]{6,16}$/).test(value);
}, "输入密码不正确");
$.validator.addMethod("cEmail", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[\u4e00-\u9fa5a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]*[\u4e00-\u9fa5a-zA-Z0-9]+\.[a-zA-Z]*[\u4e00-\u9fa5a-zA-Z0-9]{2,3}$/).test(value); 
}, "请输入正确的邮箱");
/*客户角色、系统角色*/
$.validator.addMethod("allroleName", function(value, element, param){
	return  new RegExp(/^([\u4E00-\u9FA5]|\w)*$/).test(value); 
}, "角色名不能包含特殊字符");

/*问题反馈*/
$.validator.addMethod("phone", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
	return  new RegExp(/^1[0-9]{10}$/).test(value); 
}, "请输入正确手机号");
$.validator.addMethod("QQ", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
	return  new RegExp(/^[1-9]\d{4,10}$/).test(value); 
}, "请输入正确QQ号");

$.validator.addMethod("problemEmail", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[\u4e00-\u9fa5a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]*[\u4e00-\u9fa5a-zA-Z0-9]+\.[a-zA-Z]*[\u4e00-\u9fa5a-zA-Z0-9]{2,3}$/).test(value); 
}, "请输入正确的邮箱");
/*短信拦截*/
$.validator.addMethod("smsServiceCodeReg", function(value, element, param){
    return  new RegExp(/^[0-9]\d{0,6}$/).test(value); 
}, "请输入1-7位的数字");


/*运维系统 数据库配置*/

$.validator.addMethod("DBIP", function(value, element, param){
    return  new RegExp(/^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5])$/i).test(value); 
}, "IP格式错误");
$.validator.addMethod("DBPort", function(value, element, param){
    return  new RegExp(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/).test(value); 
}, "1-65535的整数");
$.validator.addMethod("DBnum", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^\+?[1-9]\d{0,8}$/).test(value); 
}, "请输入数字");

/*运维系统 接口管理*/
$.validator.addMethod("interface_ip", function(value, element, param){
    return  new RegExp(/^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5])$/i).test(value); 
}, "IP格式错误");
$.validator.addMethod("interface_port", function(value, element, param){
    return  new RegExp(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/).test(value); 
}, "1-65535的整数");
$.validator.addMethod("interface_code", function(value, element, param){
    return  new RegExp(/^(\d)*$/).test(value); 
}, "请输入数字");


/*签名表*/
$.validator.addMethod("signExt", function(value, element, param){
    return  new RegExp(/^.{2,30}$/).test(value); 
}, "请输入2-30个字符");
$.validator.addMethod("extendCodeExt", function(value, element, param){
	if(value=='' || value==" "){
		return true;
	}
    return  new RegExp(/^[0-9]\d{1,8}$/).test(value); 
}, "请输入2-9位的数字");

$.validator.addMethod("channelSignExt", function(value, element, param){
	if(value==''){
		return true;
	}
    return  new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/).test(value); 
}, "请输入除特殊字符外2-20个字符");
$.validator.addMethod("signServiceCodeReg", function(value, element, param){
    return  new RegExp(/^[0-9]\d{0,6}$/).test(value); 
}, "请输入1-7位的数字");
/*服务号管理-服务号备注*/
$.validator.addMethod("serviceCodeNote", function(value, element, param){
    return  new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/).test(value); 
}, "请输入中英文");
$.validator.addMethod("linkMan", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^[\u4E00-\u9FA5a-zA-Z]+$/).test(value);  
}, "请输入中文和英文");

/***********生成License—MAC地址**********/
$.validator.addMethod("macReg", function(value, element, param){
    return  new RegExp(/^(([0-9a-fA-F]{1,2}[-|:]){5}[0-9a-fA-F]{1,2},)*([0-9a-fA-F]{1,2}[-|:]){5}[0-9a-fA-F]{1,2}$/).test(value); 
}, "请输入正确的MAC地址");
/***********计费号码维护**********/
$.validator.addMethod("billnumberInpExg", function(value, element, param){
    return  new RegExp(/^(\d)*$/).test(value); 
}, "请输入数字");
/***********代理商平台代码**********/
$.validator.addMethod("agentPlatCode", function(value, element, param){
return  new RegExp(/^[a-zA-Z]{3}$/).test(value); 
}, "请输入3位英文字母");
/*******通道投诉*******/
$.validator.addMethod("complaintMobileExg", function(value, element, param){
    return new RegExp(/^1[345789]\d{9}$/).test(value);
}, "手机号码不正确");
/*****投诉率预警******/
$.validator.addMethod("warningThresholdExg", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,7}$/).test(value); 
}, "请输入1-8位正整数");

$.validator.addMethod("warningTimesExg", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,1}$/).test(value); 
}, "请输入1-2位正整数");
$.validator.addMethod("sncorrectExg", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d*$/).test(value); 
}, "请输入正整数");

$.validator.addMethod("sncorrectExg1000", function(value, element, param){
	  return  new RegExp(/^[2-9]$|^[1-9]\d$|^[1-9]\d{2}$|^1000$/).test(value); 
}, "2-1000的数字");
$.validator.addMethod("reChargeNum", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,8}$/).test(value); 
}, "请输入1-9位的正整数");
$.validator.addMethod("channelPort", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d{0,6}$/).test(value); 
}, "请输入1-7位的正整数");
$.validator.addMethod("warningThresholdExgTwo", function(value, element, param){
    return  new RegExp(/^(?!0(\.0{1,3})?$)(\d(\.\d{1,3})?|10)$/).test(value); 
}, "大于0小于等于10的数字支持三位小数");
$.validator.addMethod("setIntervalExg", function(value, element, param){
    return  new RegExp(/^\+?[1-9]\d$/).test(value); 
}, "请输入正整数");
//请输入非负整数
$.validator.addMethod("nonNegative", function(value, element, param){
    return  new RegExp(/^\d*$/).test(value); 
}, "请输入非负整数");
//服务号校正 
$.validator.addMethod("pushReportSuccessRateReg", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^([1-9]\d?|100)$/).test(value); 
}, "请输入1-100的正整数");
$.validator.addMethod("pushReportSuccessHourReg", function(value, element, param){
	if(value==null||value==''){
		return true;
	}
    return  new RegExp(/^[1-9]$|^[1-3]\d$|^40$/).test(value); 
}, "请输入1-40的正整数");