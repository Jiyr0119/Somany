
/*-------------------登陆---------------------*/

/*------------------点击登陆按钮----------------*/
$(function(){
	$("#login").click(function(){
		var deff = $.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"login",
				userID: $("#uname").val(),
				password:$('#upwd').val()
			}
		});
		deff.done(function(msg){
			switch(msg){
				case "0" : $("#s_log").show().html("用户名不存在");
							setTimeout(function(){
								$("#s_log").hide();
							},1500);
						  ;break;
				case "2" : $("#s_log").show().html("密码错误");
							setTimeout(function(){
								$("#s_log").hide()
							},1500);
							break;
				default : $("#s_log").show().html("登录成功!即将后跳转商城首页")
							setTimeout(function(){
								location.href = "index.html";
							},1500);
			}
		})
	})
	
	//点击注册，跳转注册页面
	$(".register").click(function(){
		location.href = "register.html";
	})
	
});

