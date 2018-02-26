
/*------------------nav-list-------------------*/

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
	// 鼠标划入一级导航，二级导航显示
	$(function(){
		$(".nav_first").on("mouseover","li",function(){
			$(".nav_second").css({"display":"block"})
			$(".nav_second>ul").eq($(this).index()).css("display","block").siblings().css("display","none")
		})
		$(".nav_first").mouseout(function(){
			$(".nav_second").css("display","none")
		})
		$(".nav_second").mouseover(function(){
			$(".nav_second").css("display","block")
		})
		$(".nav_second").mouseout(function(){
			$(".nav_second").css("display","none")
		})
	});
	

/*--------------------------轮播图（没写完）---------------------*/
	$(function(){
		var index = 0;
		var timer = setInterval(autoPlay,2500);
		//轮播函数
		function autoPlay(){
			index++;
			if( index == $(".btn_list a").size() ){
				index = 0;
			}
			$(".btn_list a").eq(index).addClass("active").siblings().removeClass("active");
			$(".img_list li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		}
		 
		//鼠标移入图片盒子上  停止定时器
		$(".img_list img").mouseover(function(){
				clearInterval(timer);
				index = $(this).index()-1;
//				$(".banner_arrow").show();
				autoPlay();
		})
		//鼠标移入图片盒子上  开启定时器
		$(".img_list img").mouseout(function(){
			clearInterval(timer);
//			$(".banner_arrow").hide();
			timer = setInterval(autoPlay,2500);
		})

	})


/*----------------------选项卡（右上）--------------------*/
	$(function(){
		$(".nav_r_title").find("li").mouseenter(function(){
	 		$(this).addClass("nav_r_current");
	 		$(this).siblings().removeClass("nav_r_current");
	 		$(".nav_r_wrap .nav_r_cont").eq($(this).index()).addClass("selected");
	 		$(".nav_r_wrap .nav_r_cont").eq($(this).index()).siblings().removeClass("selected");		
		});	
	})
	

/*---------------------今日推荐-----------------------------*/
	$.ajax({
			type:"get",
			//根据index找文件
			url:"json/todaygoods.json",
			success:function(res){
				var html="";
				for(var i=0;i<res.list.length;i++){
					//获取了每一组数据
					var child = res.list[i];
//					console.log(child)
					html += "<li class='goods_info'>
								<a href='#'><img src="+child.src+"/></a>
								<div class='infoBox'>
									<p class='txtLink1'>"+child.txt1+"</p>
									<p class='txtLink2'>"+child.txt2+"</p>
									<div class='buyBox'>
										<span class='money'>"+child.price+"</span>
										<a href='#' class='look'>去看看</a>
									</div>
								</div>
							</li>"
				}					 
			$(".today_goods_list").html(html);
			}
	})

	//箭头事件  (有问题)
	$(function(){
		$(".today_right").mouseover(function(){
			$(".today_arrow").show();
		})
		$(".today_right").mouseout(function(){
			$(".today_arrow").hide();
		})
		$(".today_right").click(function(){
			$(".today_goods_list").animate({"margin-left":-972},1500)
		})
		$(".today_left").click(function(){
			$(".today_goods_list").animate({"margin-left":0},1500)
		})
	})
	
/*----------------------------楼梯数据获取----------------------------*/
$.ajax({
		type:"get",
		//根据index找文件
		url:"json/floorList.json",
		success:function(res){
			var nav=" ";
			var goods=" ";
			var goodsCon=" ";
			var floor=" ";
			for(var i in res){
				// res[i]  拿到 floorlist 对象
				for(var j in res[i]){
					// res[i][j] 拿到每一个楼层对象  1F / 2F,再分别拿到左右两部分.	
					
					// 左侧导航
					var navList = res[i][j].navList;
					
					for(var k=0;k<navList.length;k++){
						var navCon = navList[k];
					}
					nav = '<div class="floor_left"><h3><i></i>'+navCon.title+'</h3><div class="floor_l_con"><span>'+navCon.floorNum+
							 '</span><ul class="floor_l_top"><li><i style="background-image: url('+navCon.icon[0]+');"></i><a href="">'+navCon.leftnav[0]+
							 '</a></li><li><i style="background-image: url('+navCon.icon[1]+');"></i><a href="">'+navCon.leftnav[1]+
							 '</a></li><li><i style="background-image: url('+navCon.icon[2]+');"></i><a href="">'+navCon.leftnav[2]+
							 '</a></li><li><i style="background-image: url('+navCon.icon[3]+');"></i><a href="">'+navCon.leftnav[3]+
							 '</a></li><li><i style="background-image: url('+navCon.icon[4]+');"></i><a href="">'+navCon.leftnav[4]+
							 '</a></li><li><i style="background-image: url('+navCon.icon[5]+');"></i><a href="">'+navCon.leftnav[5]+
							 '</a></li></ul><div class="floor_l_bottom"><a href=""><img src="'+navCon.leftSrc+'"/></a></div></div></div>'
				
					//右侧商品列表
					var goodsList = res[i][j].goodsList;	
				
					for(var m =0;m <goodsList.length;m++){
						var good = goodsList[m];
						goodsCon +='<li><dl><dt><a href=""><img src="'+good.src+'"/></a></dt><dd class="floor_name"><a href="">'+good.txt+'</a></dd><dd class="floor_price"><span>'+good.price+'</span></dd></dl></li>';
					}
					goods = '<div class="floor_right"><ul class="floor_r_title"><li class="floor_tltile_cur">精选推荐</li><li>热卖推荐</li></ul><div id="floor_r_con"><ul class="floor_r_list">'+goodsCon+'</ul></div></div>';
				
				 	//楼层
				 	floor =''+nav+goods;
				}
			};
			$(".floor_box").html(floor);
		}		
	})

/*----------------------------楼梯效果---------------------*/
/*
	 思路：
	 	1、点击左侧楼层号，对应的楼层字体红色
	 				           改变 对应的楼层位置     （滚动条滚走的距离）
	 	2、点击top按钮，回到顶部
	 	
	 	3、触发滚动条，根据滚动条滚走的距离  设置楼层号的样式
	 		关键判断：  当前哪一个楼层在可视区的高度超出了 h/2   
	*/
	$(function(){
		
		var flag = true;//开关边框控制滚动条是否被触发  假设值为true时  可以触发滚动条
		// 1.  点击层楼导航
		$(".floor_nav_box li:not(:last)").click(function(){
			flag = false;
			//当前点击的span的文字红色  其余默认颜色
			$(this).find("a")
				   .addClass("f_active")
				   .end()
				   .siblings()
				   .find("a")
				   .removeClass("f_active");
			
			
			//根据当前操作的楼层号的下标  找到对应楼层距离文档顶部的 距离 
			var topHeight = $(".floor_box").eq( $(this).index() ).offset().top;
		
			//设置滚动条滚走的距离 为  topHeight
			$("body,html").stop().animate({"scrollTop":topHeight},1000,function(){
				flag = true; //点击事件动画完成后，将开关变量改变成true，让scroll滚动条事件可以继续执行
			})
		})
		
		//2. 点击楼层号的最后一个按钮Top   滚动条回到顶部,并清空所有按钮的样式
		$(".top").click(function(){
			flag = false;
			$("body,html").animate({"scrollTop":0},1000,function(){
				flag = true;
			});
			$(".floor_nav_box li:not(:last)").find("a").removeClass("f_active");
		})
		
		//3.操作滚动条
		$(window).scroll(function(){
			if(flag){
				//获取滚动条滚走距离
				var sTop = $(document).scrollTop();
				var h = $("#floors_box").offset().top;
				if(sTop>h){
					$("#floor_nav").show();
				}else{
					$("#floor_nav").hide();
				}
				var $floor = $(".floor_box").filter(function(){
					return Math.abs( $(this).offset().top - sTop ) < $(this).height()/2;
				})
				//根据楼层的索引  找到对应的楼层号   设置样式
				$(".floor_nav_box li").eq( $floor.index() )
								 .find("a")
								 .addClass("f_active")
								 .end()
								 .siblings()
								 .find("a")
								 .removeClass("f_active");
								 
			}
		})
	
	})
	

/*------------------------footer-nav-------------------------------*/
	$.ajax({
			type:"get",
			//根据index找文件
			url:"json/footerNav.json",
			success:function(res){
				var html="";
				for(var i = 0; i<res.list.length;i++){
					var child = res.list[i]
					html += '<li class="section"><h3 class="footer_title"><a href="">'+child.title+
					'</a></h3><div class="footer_pic"><a href=""><img src="'+child.src+
					'"/></a></div><ul class="footer_nav_list"><li><a href="">'+child.list[0]+
					'</a></li><li><a href="">'+child.list[1]+
					'</a></li><li><a href="">'+child.list[2]+
					'</a></li><li><a href="">'+child.list[3]+
					'</a></li><li><a href="">'+child.list[4]+
					'</a></li><li><a href="">'+child.list[5]+
					'</a></li><li><a href="">'+child.list[6]+
					'</a></li><li><a href="">'+child.list[7]+
					'</a></li><li><a href="">'+child.list[8]+
					'</a></li><li><a href="">'+child.list[9]+
					'</a></li></ul></li>'
				}
				$(".nav_con").html(html);
			}
	})