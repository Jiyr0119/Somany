/*------------------------------商品列表页------------------------------*/

//ajax 请求数据,生成商品列表
	$.ajax({
		type:"get",
		url:"json/products.json",
		success:function(res){
			var html="";
			for(var i=0;i<res.list.length;i++){
				var child = res.list[i];
				html += '<li class="pro_warp">
							<div class="pro_detail">
								<div class="pro_pic">
									<a href="javascript:;"><img src="images/'+child.src+'"/></a>
								</div>
								<div class="pro_price">
									'+child.price+'元
								</div>
								<div class="pro_name">
									<a href="javascript:;">'+child.name+'</a>
								</div>
								<div class="pro_read">
									<span class="evaluated">已评价<a href=""><em>805</em></a></span>
									<span class="collection"><b class="png"></b>收藏</span>
									<span class="buycarts">
										<b class="png"></b>
										<span class="buy_btn">加入购物车</span>
									</span>
								</div>
								<span style="display:none" data-id='+child.id+' data-name='+child.name+'  data-price='+child.price+' data-src='+child.src+'></span>
							</div>
						</li>'
			}					 
		$(".pro_list").html(html);
		}
	})
	

/*--------------------点击商品跳转商品详情页-----------------*/

	$(function(){
		//给每一个加入购物车按钮绑定事件
		$(".pro_list").on("click",".pro_warp",function(){
			var arr = [];//用来存放所有购买的商品
			var proInfo = {
				//在最后放一个隐藏的span标签存放数据，用data()方法获取自定义属性值
				"name":$(this).parent().parent().next().data("name"),  
				"price":$(this).parent().parent().next().data("price"), 
				"src":$(this).parent().parent().next().data("src"), 
				"id":$(this).parent().parent().next().data("id"),
				"count": 1   //记录这个商品在购物车中的个数
			}
//			console.log(proInfo)
			var flag = true;//当开关的值为true时   可以向数组中push新数据  
			//当再次点击 或 刷新页面时，会将数组清空，此时cookie的数据也会被清除，要解决数组信息不会被覆盖的问题
			// 解决办法：  在没将新点击的商品存入到数组之前  可以先将cookie的信息取出来 存到数组中  
			oldCookie = getCookie("shoplist");//取出cookie中的数据
			if( oldCookie.length!=0 ){//判断cookie中是否有数据，如果有数据，先将原cookie的数据存入到数组中 
				arr = oldCookie;	//先将原cookie的数据存入到数组中 
				for(var i = 0 ; i < arr.length ; i++){ //遍历arr   判断 当前点击的对象 在arr中是否存在  如果存在，让 count+1
					if( proInfo.id == arr[i].id){
						arr[i].count++;
						flag = false;
						break;
					}
				}
			}
			if( flag ){ //当开关的值为true时   可以向数组中push新数据  
				arr.push( proInfo );
			}
			//将数组信息存入到cookie中
			setCookie("shoplist", JSON.stringify(arr) );

			location.href = "goodsDetails.html";
			
			console.log( document.cookie );
		})

	})


/*------------------------点击添加购物车跳转购物车-----------------------*/

	$(function(){
		//给每一个加入购物车按钮绑定事件
		$(".pro_list").on("click",".buy_btn",function(evt){
			var e=evt||event;
			var arr = [];//用来存放所有购买的商品
			var proInfo = {
				//在最后放一个隐藏的span标签存放数据，用data()方法获取自定义属性值
				"name":$(this).parent().parent().next().data("name"),  
				"price":$(this).parent().parent().next().data("price"), 
				"src":$(this).parent().parent().next().data("src"), 
				"id":$(this).parent().parent().next().data("id"),
				"count": 1   //记录这个商品在购物车中的个数
			}
//			console.log(proInfo)
			var flag = true;//当开关的值为true时   可以向数组中push新数据  
			//当再次点击 或 刷新页面时，会将数组清空，此时cookie的数据也会被清除，要解决数组信息不会被覆盖的问题
			// 解决办法：  在没将新点击的商品存入到数组之前  可以先将cookie的信息取出来 存到数组中  
			oldCookie = getCookie("shoplist");//取出cookie中的数据
			if( oldCookie.length!=0 ){//判断cookie中是否有数据，如果有数据，先将原cookie的数据存入到数组中 
				arr = oldCookie;	//先将原cookie的数据存入到数组中 
				for(var i = 0 ; i < arr.length ; i++){ //遍历arr   判断 当前点击的对象 在arr中是否存在  如果存在，让 count+1
					if( proInfo.id == arr[i].id){
						arr[i].count++;
						flag = false;
						break;
					}
				}
			}
			if( flag ){ //当开关的值为true时   可以向数组中push新数据  
				arr.push( proInfo );
			}
			//将数组信息存入到cookie中
			setCookie("shoplist", JSON.stringify(arr) );
			
			if( !confirm("点击确定:继续购物 ;点击取消: 跳转到购物车页面") ){
				location.href = "shopCarts.html";
			}
//			console.log( document.cookie );	
			
			//阻止事件冒泡，点击购物车触发点击li事件
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		})

	})
