var validate={
    //请输入汉字
	"CHS":function(value){
		    return /^[\u0391-\uFFE5]+$/.test(value);
	 },
	 //用户名为不以下划线开头的5-20位英文字母、数字及下划线!
	"NCH":function(value){
		     return /^(?!_)[a-zA-Z0-9_?]{5,20}$/.test(value);
	 },
	 //邮政编码不存在
    "post":function(value){
    	 return /^[1-9]\d{5}$/.test(value);
    },
    //QQ号码不正确
    "QQ":function(value){
    	 return /^[1-9]\d{4,10}$/.test(value);
    },
    //手机号码不正确
    "phone":function(value){
    	return /^1[0-9]{10}$/.test(value);
    },
    //手机号严格校验
    "mobile":function(value){
    	return /^1[0-9]{10}$/.test(value);
    },
    //座机号码不正确
    "offictel":function(value){
        return /^([0-9]{3,4}|[0-9]{3,4}-)?[0-9]{7,8}(-[0-9]{0,4})?$/.test(value);
    },
    //登录名称只允许汉字、英文字母、数字及下划线。
    "loginName":function(value){
    	 return /^[\u0391-\uFFE5\w]+$/.test(value);
    },
    //密码只允许8-18位英文字母+特殊字符或者数字任意一个的组合。
    "password":function(value){
    	return /((?=.*[a-zA-Z])(?=.*\d)|(?=[a-zA-Z])(?=.*[^a-zA-Z0-9])).{8,18}$/.test(value);
     },
    //数值
     "number":function(value){
    	 return /^\d+$/.test(value);
     },
     //电子邮箱格式错误
     "email":function(value){
    	 return /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/i.test(value);     
     },
     //IP地址格式不正确
     "ip":function(value){
         return /^(?:(?:[01]?\d?\d|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d?\d|2[0-4]\d|25[0-5])$/i.test(value);  
     },
   //emay IP地址格式不正确
     "emayip":function(value){
         return /^([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}||(localhost))+\.?)$/i.test(value);  
     },
     //网址格式错误.
     "url":function(value){
         return /(http[s]{0,1}):\/\//i.test($.trim(value));      
     },
     //必填校验
     "required":function(value){
    	 if(null==value || value=="" || value.length==0){
    		 return false;
    	 }
    	 return true;
     },
     "notNull":function(value){
    	 if(null==value || value=="" || value.length==0){
    		 return false;
    	 }
    	 return true;
     },
     //是否超出长度
     "outLenght":function(value,len){
    	 if(value.length>len){
    		 return false;
    	 }
    	 return true;
     },
     //号码段不正确
     "sectionnumber":function(value){
    	 return /^1[0-9]{6}$/.test(value);
     },
     "basesectionnumber":function(value){
    	 return /^1[0-9]{2,3}$/.test(value);
     }
};
