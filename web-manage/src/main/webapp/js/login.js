$("#username").focus();

$("#submit").click($submmit);

$("#captcha").keydown(function(event) {
	if (event.keyCode == 13) {
		$submmit();
	}
});

$(".mycaptchaimg").css({'cursor':'pointer'});

$(".captcha_a").click(refulshCaptcha);

function $submmit() {

	$(".dltx").show();
	$("#submit").hide();

	var username = $("#username").val();
	var password = $("#password").val();
	var captcha = $("#captcha").val();
	if (!username) {
		errorShow("请输入用户名");
		return;
	}
	if (!password) {
		errorShow("请输入密码");
		return;
	}
	password = hex_md5(password);
	if (!captcha) {
		errorShow("请输入验证码");
		return;
	}

	$.ajax({
		url : SERVER_PATH + "/login",
		type : 'post',
		dataType : 'json',
		data : {
			username : username,
			password : password,
			captcha : captcha
		},
		success : function(data) {
			if (data.success == true) {
				location.href = SERVER_PATH;
			} else {
				refulshCaptcha();
				errorShow(data.message);
			}
		},
		error : function() {
			refulshCaptcha();
			errorShow("系统错误");
		}
	});
}

function refulshCaptcha() {
	$(".mycaptchaimg").attr("src",SERVER_PATH + '/captcha?type=login&_=' + new Date().getTime());
}

function errorShow(error) {
	$(".dltx").hide();
	$("#submit").show();
	$(".errorsdiv").show();
	$("#errorspan").html(error);
	$("#errorspan").css("color", "red");
}
