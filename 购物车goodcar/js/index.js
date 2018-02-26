// 思路：
/*  1 : 点击加入购物车，把当前商品的信息存入cookie中;
    2 : 点击查看购物车，打开购物车界面
    3 : 在购物车界面，判断是否有cookie
    4 : 若有cookie值，将内容显示在界面中
 */

window.onload=function(){
	var goodList = $("goods-list")  //获取ul 
	var addBtn = goodList.getElementsByTagName("a") // 获取加入购物车按钮
	
	//为每一个加入购物车按钮添加动作
	for(var i=0;i<addBtn.length;i++){
		addBtn[i].onclick=function(){
			/*  1  需要写入cookie的商品信息：
				商品ID、商品名称、商品价格、图片地址、商品数量
				(商品ID,独一无二的，代表当前的商品，
				为了不固定HTML和js结构，把商品的信息都看作数据，缓存到a链接上
			*/
			var goodsId   = this.getAttribute("data-id");
			var goodsName = this.getAttribute("data-title");
			var goodsPrice= this.getAttribute("data-price");
			var goodsPic  = this.getAttribute("data-url");
			var goodsNum  = 1;
			
			// 5 判断一下本地有没有cookie。 没有，创建数组容器存储 ；  有，cookie本身就是一个数组，直接添加进行
			var aGoods = getCookie("goods");
			if(aGoods==[]){  // 5.1 判断是否第一次添加到cookie中  ，若是创建新数组
				var aGoods = [];  // 4.1 解决存储时覆盖的问题，创建一个数组 ,解决存储多个商品的信息
			}
			
			// 6 判断是否被添加过 ，添加过 ++ ，没有添加则添加  (假设法 ，开关变量)
			var flag = true;
			for(var i= 0 ;i<aGoods.length;i++){
				//某个商品id 之前是否出现过
				if(aGoods[i].id == goodsId){
					aGoods[i].num++;
					flag = false;
					break;
				}
			}
			
			
			if(flag == true){
				// 2  五条信息同时存在的，用对象来存储这五个信息，一个对象一个商品 
				var oGoods = {
					id   : goodsId,
					name : goodsName,
					price: goodsPrice,
					pic  : goodsPic,
					num  : goodsNum
				};
			
				//4.2 把对象放到数组中   // 5.2 不是第一次添加，直接放进数组中
				aGoods.push(oGoods);
			}
			
			// 3 把这条信息放到cookie中 , 以字符串的格式存在cookie中
			// 把这个对象    格式化成   json格式的字符串  存储   (json格式的字符串) :JSON.stringfy 
			setCookie("goods",JSON.stringify(aGoods),7)
		}
	}
}
