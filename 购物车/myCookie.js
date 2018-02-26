function getCookie(key){
	cookie_info = document.cookie;
	if (cookie_info) {
		//由于取出来的cookie信息 可能会包含其他的数据，而这些数据的特点是 用 ；分隔的 ，并且还会有一些多余的空白和分号
		//将cookie中的信息空白和分号都替换成 ；   然后用分号分隔成数组
		list = cookie_info.replace(/;\s/g,";").split(';');
		//循环这个list数组   将数组中=后面的值取出来  存入到一个新的变量中
		for (var i=0;i<list.length;i++) {
			item = list[i].split('=');
			if (item[0] == key) {
				//满足条件 将之前cookie中的信息存入到新变量中
				oldCookie = item[1];
				return JSON.parse(oldCookie); //返回一个 数组
			}
		}
		//console.log(cookie_info)
			
		return [];//如果cookie中 没有想要的 键值   也返回一个空数组		
	}
	return [];// 如果cookie中没有值，返回一个空数组
}

//设置cookie信息
function setCookie(key,value,exdays){
	var now = new Date();
	now.setTime(now.getTime()+exdays*24*60*60*1000);
	document.cookie=key+"="+value+";"+"Expires"+"="+now+";";
}
//删除removeCookie方法
function removeCookie(key){
	setCookie(key,"",-1);
}
