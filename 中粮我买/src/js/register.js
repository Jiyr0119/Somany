
requirejs.config({
	paths: {
		"jquery": "jquery-1.8.3",
		"vd": "validate"
	}
})

requirejs(["jquery","vd"], function($, vd) {
	//验证手机号
	var flagPhone = false
	$("#phone").blur(function() {
		phone = $(this).val()
		if(vd.checkPhone(phone)) {
			$(this).next("span").css("display", "none")
			$(this).css("border-color", "green")
			flagPhone = true
		}else {
			$(this).next("span").css("display", "block")
			$(this).css("border-color", "red")
			flagPhone = false
		}
	})
	//验证用户名
	var flagName = false
	$("#uname").blur(function() {
		name = $(this).val()
		if(vd.checkName(name)) {
			$(this).next("span").css("display", "none")
			$(this).css("border-color", "green")
			flagName = true
		}else {
			$(this).next("span").css("display", "block")
			$(this).css("border-color", "red")
			flagName = false
		}
	})
	//验证密码
	var flagPwd = false
	$("#upwd").blur(function() {
		password = $(this).val()
		if(vd.checkPwd(password)) {
			$(this).next("span").css("display", "none")
			$(this).css("border-color", "green")
			flagPwd = true
		}else {
			$(this).next("span").css("display", "block")
			$(this).css("border-color", "red")
			flagPwd = false
		}
	})
	
	//确认密码
	var flagSure = false
	$("#surepwd").blur(function() {
		var secondPwd = $(this).val()
		var fristPwd = $("#upwd").val()
		if( secondPwd== fristPwd) {
			$(this).next("span").css("display", "none")
			$(this).css("border-color", "green")
			flagSure = true
		} else {
			$(this).next("span").css("display", "block")
			$(this).css("border-color", "red")
			flagSure = false
		}
	})
	
	//随机生成验证码
	function createYzm(){
		var arr="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
		var thisStr="";
		for (var i = 0; i < 4; i++) {
			thisStr += arr[Math.floor(Math.random()*62)];
		}
		return thisStr;
	}
	createYzm();
	
	//点击换一张按钮，更换验证码
	$(".change").click(function(){
		$(".yzm").html(createYzm());
	})
	
	//验证验证码是否正确
	var flagYzm = false
	$("#code").blur(function() {
		var myYzm = $(this).val()
		var yzm = $(".yzm").html()
		if(myYzm == yzm) {
			$(this).next("span").css("display", "none")
			$(this).css("border-color", "green")
			flagYzm = true
		} else {
			$(this).next("span").css("display", "block")
			$(this).css("border-color", "red")
			flagYzm = false
		}
	})

	//点击注册按钮，如果以上信息都正确，则允许提交，通过ajax请求数据
	$("#reg").click(function(){
		if(flagPhone && flagName && flagPwd && flagSure && flagYzm) {
			var deff = $.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"register",
					userID:$("#uname").val(),
					password:$("#upwd").val()
				}
			});
			deff.done(function(msg){  //请求成功
				//服务器返回数据  0  1  2 。。
				switch(msg){
					case "0" : $("#s_reg").show().html("用户名重复了");
								setTimeout(function(){
									$("#s_reg").hide();
								},2000)
								;break;
					case "1" : $("#s_reg").show().html("注册成功了，3秒后将跳转到登录进行登录");
								setTimeout(function(){
									location.href = "login.html";
								},3000)
							   break;
					case "2" : $("#s_reg").show().html("服务器产生错误，稍后再试");
								setTimeout(function(){
									$("#s_reg").hide();
								},2000)
								break;
				}
			})
			deff.error(function(){ //请求失败
				alert("请求失败了");
			})
		}else{
			alert("请正确填写信息！")
		}
	})
	
	//点击登陆按钮，跳转登陆界面
	$(".login").click(function(){
		location.href = "login.html";
	})
})