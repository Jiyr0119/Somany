/*
	通过ID获取DOM节点对象
*/
function $(id) {
	return document.getElementById(id);
}

/*
	获取CSS样式
*/
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}

/*
	运动框架
*/
function bufferMove(obj, oTarget, fn, ratio = 8) {
	// 清除定时器
	clearInterval(obj.iTimer);

	// 开启一个新的定时器
	obj.iTimer = setInterval(function () {
		var bBtn = true;
		for(var sAttr in oTarget) {
			if(sAttr === 'opacity') {
				var iCur = Math.round(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = Math.round(parseFloat(getStyle(obj, sAttr)));
			}

			// 计算速度
			var iSpeed = (oTarget[sAttr] - iCur) / ratio;

			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			var iNext = iCur + iSpeed;

			if(sAttr === 'opacity') {
				obj.style.opacity = iNext / 100;
				obj.style.filter  = 'alpha(opacity=' + iNext + ')';
			} else {
				obj.style[sAttr] = iNext + 'px';
			}

			if(iNext !== oTarget[sAttr]) {
				bBtn = false;
			}
		}

		if(bBtn === true) {
			clearInterval(obj.iTimer);
			fn && fn();
		}
	}, 50);
}