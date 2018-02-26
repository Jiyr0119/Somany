//target 目标值
//obj  要操作的对象
//attr  要操作的属性
//  fn 用来接收一个功能   fn就是一个函数名称 

//第五版解决问题 :一个定时器多个功能，当某一个到了就停了，可能其他还没完成
//改版 : 在定时器内部定义一个开关变量flag  ，当所有动作都执行完毕时 flag=true   
//一次定时器  ，遍历玩json的所有的键。 width  height ..当for in 全都遍历完以后再进入 if判断 。
function startMove(obj,json,fn){
	//再次点击按钮时  清除定时器
	clearInterval(obj.timer); //为每一个obj对象 添加一个 timer属性
	obj.timer = setInterval(function(){
		var flag = true;//当所有动作都执行完毕时，停止定时器  此时假设flag 值为true
		for (var attr in json) {//遍历json对象  attr代表操作的属性名称
			var current = 0;
			//获取当前操作对象的实际属性值
			if( attr == "opacity" ){
				current = parseFloat(getStyle(obj,attr))*100;//透明度操作整数
			}else{
				current =parseInt(getStyle(obj,attr)) ;	//非透明度获取值
			}
			
			var speed = (json[attr] - current)/10;
			speed = speed>0?Math.ceil(speed) : Math.floor(speed);
			if( json[attr] !=  current  ){ //表示某个功能结束
				flag = false;
			}
			
			//如果attr值是一个opacity 或者 zIndex 单独操作  ,带px值类型的用else里的 
			if(attr == "opacity"){
				obj.style.opacity = (current + speed)/100;//设置小数
			}else if(attr == "zIndex"){
				obj.style.zIndex = current + speed;
			}else{
				obj.style[attr] = current + speed + "px";
			}			
		}
		//当循环结束时  判断flag的值是否为 true  ，如果为 true  才停止定时器
		if(flag){
			clearInterval(obj.timer);
			if(fn){//如果fn存在，就调用该函数
				fn();//函数调用：上一个功能结束后，进入下一个函数的执行
			}
		}
	},30)
}

function getStyle(obj,attr){
	return window.getComputedStyle?window.getComputedStyle(obj,false)[attr]:obj.currentStyle[attr];
}