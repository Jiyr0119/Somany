		//引入头部
		$(function(){
			$("#Head").load("common.html #header",function(){
			/*--------------------city—selected-------------*/
			$(function(){
				//点击显示城市选择
				$(".city_list").click(function(){
					$(".city_select").show();
				});
				//关闭城市选择
				$(".city_select").find("i").click(function(){
					$(".city_select").hide();
				});
			})
	
	
			/*---------------------my-account-------------------*/
			$(function(){
				//添加划过显示/隐藏事件
				$(".mine").hover(function(){
					$(".Account").show();
				},function(){
					$(".Account").hide();
				})
			
				$(".Account").hover(function(){
					$(".Account").show();
				},function(){
					$(".Account").hide();
				})		
			});
			
			/*------------------login-register-----------------*/
	
			$(function(){
				$(".login").click(function(){
						location.href = "login.html";
				})
			
				$(".register").click(function(){
						location.href = "register.html";
				})
			})
	
		})
	
		//引入搜索框
		$("#Search").load("common.html #search")
	
		//引入导航
		$("#Nav").load("common.html #nav",function(){
			/*-------------------ajax请求数据------------*/
				$.ajax({
					type:"get",
					//根据index找文件
					url:"json/nav.json",
					success:function(res){
						var str="";
						var html="";
		//				console.log(res)
						for(var i in res){
							  //  <li class="kinds"><a href="#">肉禽水产</a></li>
							str+='<li class="kinds"><a href="#">'+i+'</a></li>';
							var html1="";
							for(var j in res[i]){
								var html2="";
								for(var m in res[i][j]){
									// 第三层：<li><a href="#">樱桃</a></li>
									html2+='<li><a href="#">'+res[i][j][m]+'</a></li>'
								}  
								// 第二层 ： <li><span>精品水果<i>></i></span><ul class="nav_detail">'+html2+'</ul></li>
								html1+='<li><span>'+j+'<i>></i></span><ul class="nav_detail">'+html2+'</ul></li>'
							}
							//第一层 ：<ul class="nav_second_list">整个卡片</ul>
							html+='<ul class="nav_second_list">' +html1+ '</ul>';
						}
						$(".nav_first").html(str);
						$(".nav_second").html(html);
					}
				})	
			
			
			/*-----------------三级导航--------------*/
			$(function(){
				$(".head").hover(function(){
					$(".nav_first").show()
				},function(){
					$(".nav_first").hide()
					$(".nav_second").hide()
				})
				
				$(".nav_first").mouseenter(function(){
					$(".nav_first").show()
				});
				
				$(".nav_first").on("mouseover","li",function(){
					$(".nav_second").css({"display":"block"})
					$(".nav_second>ul").eq($(this).index()).css("display","block").siblings().css("display","none")
				})
				$(".nav_second").mouseover(function(){
					$(".nav_second").css("display","block")
				})
				$(".nav_second").mouseout(function(){
					$(".nav_second").hide();
				})
			})
		})
	
		//引入footer
		$("#Foot").load("common.html #footer")
	})
	