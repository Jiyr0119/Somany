//设置cookie
function setCookie(key,value,day){
	if( day ){
		var now = new Date();
		now.setDate(now.getDate() +day)
		document.cookie = key + "=" + value + ";expires=" + now;
	}else{
		document.cookie =  key + "=" + value;
	}
}
//获取cookie
function getCookie(key){
	//判断cookie是否存在
	if( document.cookie ){
		//如果cookie存在就获取
		var str = document.cookie;
		var arr = str.split("; ");
		for(var i = 0 ; i < arr.length ; i++){
			item = arr[i].split("=");
			if( item[0] == key){
				//说明根据已知的key  已经能够找到 value ，可以直接将value返回
				return JSON.parse( item[1] );//将结果转成对象返回
			}
		}
		// 如果cookie存在，但是不存在key的值  
		return [];
	}
	//如果cookie不存在  返回一个空数组
	return [];
}



//删除cookie
function removeCookie(key){
	setCookie(key,"",-1);
}
