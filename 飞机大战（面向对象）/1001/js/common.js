/*
	通过ID获取DOM节点
*/
function $(id) {
	return document.getElementById(id);
}
/*
	获取属性的函数
*/
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}
//随机整数
function randomInt(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
/*
	缓冲运动
*/
function bufferMove(obj, oTarget) {
	return new Promise(function (resolve) {
		// 清除定时器
		clearInterval(obj.iTimer);
		obj.iTimer = setInterval(function () {
			let bBtn = true;
			for(var sAttr in oTarget) {
				// 获取当前值
				if(sAttr === 'opacity') {
					var iCur = Math.round(getStyle(obj, sAttr) * 100);
				} else {
					var iCur = Math.round(parseFloat(getStyle(obj, sAttr)));
				}
				// 获取速度
				var iSpeed = (oTarget[sAttr] - iCur ) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				// 计算下一次出现的位置
				var iNext = iCur + iSpeed;

				// 赋值
				if(sAttr === 'opacity') {
					obj.style.opacity = iNext / 100;
					obj.style.filter  = 'alpha(opacity=' + iNext +')';
				} else {
					obj.style[sAttr] = iNext + 'px';
				}

				// 判断当前属性运动是否已完成
				if(oTarget[sAttr] !== iNext) {
					bBtn = false;
				}
			}

			if(bBtn) {
				clearInterval(obj.iTimer);
				resolve();
			}
		}, 50);
	});
}
/*
	碰撞检测函数
*/
function pz(obj1, obj2) {
	let
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
/*
	随机生成唯一key
*/
function uniqueKey() {
	return '' + new Date().getTime() + Math.random() * Math.pow(10, 5);
}


