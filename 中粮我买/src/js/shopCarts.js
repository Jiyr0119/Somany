/*------------------------------购物车的数据生成-------------------------*/
	//读取cookie中的数据，显示到当前页面
	$(function(){
		var oldCookie = getCookie("shoplist"); 
		var str = "";
		for (var i = 0 ; i < oldCookie.length ; i++) {
			shopinfo = oldCookie[i];
			str += '<div class="order_list">
						<div class="order_info">
							<input type="checkbox" name="" id="" value="" class="ck" />
							<a href=""><img src="images/'+shopinfo.src+'"/></a>
							<div class="order_name">
								<a href="">'+shopinfo.name+'</a>
							</div>
						</div>
						<div class="order_price">'+shopinfo.price+'</div>
						<div class="order_num">
							<div class="updateCount"><span style="display:none;">-</span></div>
							<div class="num_txt">'+shopinfo.count+'</div>
							<div class="updateCount"><span style="display:none;">+</span></div>
						</div>
						<span style="display:none" data-id='+shopinfo.id+' data-name='+shopinfo.name+'  data-price='+shopinfo.price+' data-src='+shopinfo.src+'></span>
						<div class="cost"><span>'+(shopinfo.count*shopinfo.price)+'</span></div>
						<div class="delete">
							<a href="" class="del_btn">删除</a>
						</div>
					</div>'
		}
		$(".list_box").html(str);	
		
		
		//合计功能   （累加页面中商品的数量   、  总金额：被选中的商品总价累加 ）
		function  sumPrice(){
			var count = 0;//总数量
			var sum = 0;//总金额
			$(".ck:checked").each(function(){
				count +=parseInt( $(this).parent().parent().find(".num_txt").html() );
				sum +=parseInt( $(this).parent().parent().find(".cost span").html() ) ;
			})
			//把值写入  已选/ 商品金额 / 合计
			$(".num_total em").html(count);
			$(".pay_r_moeny").html(sum);	
			$(".moeny_total").html(sum);
		}

		
		//点击每个商品的复选框  完成将被选中的复选框的数量和金额合计
		$(".ck").click(function(){
	 		sumPrice();
		})
			
		//全选
		$("#selectAll").click(function(){
			$(".ck").prop("checked", $(this).prop("checked") );
			sumPrice();
		})
		
		//加减操作
		$(".updateCount").click(function(){
			var id= $(this).parent().next().data("id");
			var flag = $(this).find("span").html();
			var count = $(this).parent().find(".num_txt").html();
			if(flag == "-" && count == 1 ){  //如果商品的数量为1   并且点击的是 -    不在执行后面的代码
				return;
			}
			for(var i = 0 ; i < oldCookie.length ; i++){
				if( id == oldCookie[i].id){
					flag == "+" ? oldCookie[i].count++ : oldCookie[i].count--;
					
					//重新设置cookie
					setCookie("shoplist",JSON.stringify(oldCookie));
					
					//刷新页面信息
					$(this).parent().find(".num_txt").html( oldCookie[i].count );
					$(this).parent().parent().find(".cost span").html( oldCookie[i].count*oldCookie[i].price );
					break;
				}
			}
		})
		
		//删除
		$(".del_btn").click(function(){
			//找到当前要删除的商品的编号
			var id = $(this).parent().prev().prev().data("id");
			if( confirm("确定要删除么？") ){
				for(var i = 0 ; i < oldCookie.length ; i++){
					if( id == oldCookie[i].id){//找到了cookie数据中要删除的商品
						oldCookie.splice(i,1);
						
						//重新设置cookie
						setCookie("shoplist",JSON.stringify(oldCookie));
						break;
					}
				}
				$(this).parent().parent().remove();
			}
		})

	})




