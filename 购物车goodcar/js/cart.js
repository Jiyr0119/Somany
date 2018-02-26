//思路 :  拿取cookie中的内容，在页面中显示出来


window.onload=function(){
	var oGoodList = $("goods-list");
	// 读取cookie中的字符串 (已经转化成对象了)
	var aGoods = getCookie("goods");
	
	for(var i=0;i<aGoods.length;i++){
	// 创建li
	var myLi = document.createElement('li');
	oGoods = aGoods[i];
	// 改变li的内容，替换数据使内容变成可以变得值  (该字符串中不能有换行)
	myLi.innerHTML = '<a href="javascript:;" data-id="'+oGoods.id+'">删除</a><img src="'+oGoods.pic+'" alt=""><div class="goods-title">'+oGoods.name+'</div><div class="goods-price">'+oGoods.price+'元，'+oGoods.num+'个</div>';
    
    // 讲li添加到页面中
    oGoodList.appendChild(myLi);
	}
	
	//删除  
	var aGoodsBtn  = oGoodList.getElementsByTagName('a');
	//为每个删除按钮添加事件
	for(var i = 0; i < aGoodsBtn.length; i++) {
		//点击删除时，将cookie对应的数据删除,(找要删除数据的id对应的商品，在数组中移除，移除后再写进去)
		aGoodsBtn[i].onclick = function () {

		}
	}
}

