/*-----------------------ajax获取数据生成商品信息-----------*/




/*----------------------------放大镜-------------------------*/
$(function(){
	$("#bottom li").mouseover(function(){
 		var index = $(this).index();
 		$(this).css("border-color","red").siblings().css("border-color","#ccc")
 		$("#small img").eq(index).show().siblings("img").hide();
 		$("#big img").eq(index).show().siblings().hide();
// 		$("#mask").css("background","(0,0,0,.5)")
 	})
 	$("#small").on({
 		"mouseover":function(){
 			$("#mask").show();
 			$("#big").show();
// 			$("#layer").show();
 		},
 		"mouseout":function(){
 			$("#mask").hide();
 			$("#big").hide();
// 			$("#layer").hide();
 		},
 		"mousemove":function(evt){
 			var evt = evt || event;
 			 
 			var x = evt.pageX - $("#small").offset().left - $("#mask").width()/2;
 			var y = evt.pageY - $("#small").offset().top - $("#mask").height()/2;
 			var maxW = $("#small").width() - $("#mask").width();
 			var maxH = $("#small").height() - $("#mask").height();
 			//边界处理
 			x = x <= 0 ? 0 : (x>=maxW ? maxW : x);
 			y = y <= 0 ? 0 : (y>=maxH ? maxH : y);
 			
 			$("#mask").css({
 				"left" : x + "px",
 				"top" :y + "px",
 				"backgroundPositionX":-x + "px",
 				"backgroundPositionY": -y +"px"
 			})
 			
 			//大图宽度/小图宽度 = 大图移动距离 / mask移动距离
 			var bigImgX = x * $(".bigImage").width()/$("#small").width();
 			var bigImgY = y * $(".bigImage").height()/$("#small").height();
 			
 			$(".bigImage").css({
 				"left": - bigImgX + "px",
 				"top" : -bigImgY + "px"
 			})
 		}
 	})
})