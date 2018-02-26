// 通过id获取dom节点
	function $(id){
		return document.getElementById(id);
	}

// 创建节点
	function create(ele){
		return document.createElement(ele);
	}

//随机整数
	function randomInt(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}

//碰撞检测
	function pz(obj1, obj2) {
	var 
		i1L = obj1.offsetLeft,
		i1T = obj1.offsetTop,
		i1W = obj1.offsetWidth,
		i1H = obj1.offsetHeight,
		i2L = obj2.offsetLeft,
		i2T = obj2.offsetTop,
		i2W = obj2.offsetWidth,
		i2H = obj2.offsetHeight;

	if( i1L + i1W <= i2L
		|| i1T + i1H <= i2T
		|| i2L + i2W <= i1L 
		|| i2T + i2H <= i1T
	){
		return false;
	} else {
		return true;
	}
}
	
//获取唯一键名 key
	function uniqueKey(){
		return '' + new Date().getDate() + Math.random()*Math.pow(10,5);
	}
