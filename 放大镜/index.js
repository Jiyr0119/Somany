function $(id){
	return document.getElementById(id);
}
window.onload = function () {
	let
		oBox 	  = $('box'),
		oThumbBox = $('thumb-box'),
		oThumbImg = Array.from(oThumbBox.getElementsByTagName('img')),
		oMiddleBox= $('middle-box'),
		oMiddleImg= $('middle-img'),
		oShadow	  = $('shadow'),
		oLargeBox = $('large-box'),
		oLargeImg = $('large-img');

	// 选项卡效果
	oThumbImg.forEach(function (v) {
		v.onmouseenter = function () {

			// 改变中型图片和大型图片的地址
			oMiddleImg.src = this.src;
			oLargeImg.src = this.src;

			// 清除所有的img的className
			oThumbImg.forEach(function (n) {
				n.className = '';
			});
			this.className = 'active';
		}
	});

	// 放大镜效果

	/*
		显示隐藏右侧的DIV
	*/
	oMiddleBox.onmouseenter = function () {
		oLargeBox.style.display = 'block';
	}
	oMiddleBox.onmouseleave = function () {
		oLargeBox.style.display = 'none';
		oShadow.style.left = '-9999px';
		oShadow.style.top  = '-9999px';
	}

	// 移动放大镜
	oMiddleBox.onmousemove = function (ev) {
		let e = ev || window.event;

		// 计算遮罩层的位置
		let iL = e.clientX - oShadow.offsetWidth / 2 - oBox.offsetLeft - oMiddleBox.offsetLeft;
		let iT = e.clientY - oShadow.offsetHeight / 2 - oBox.offsetTop - oMiddleBox.offsetTop;
		
		// 范围的判断
		if(iL < 0) {
			iL = 0;
		}
		if(iT < 0) {
			iT = 0;
		}
		if(iL > oMiddleBox.offsetWidth - oShadow.offsetWidth) {
			iL = oMiddleBox.offsetWidth - oShadow.offsetWidth;
		}
		if(iT > oMiddleBox.offsetHeight - oShadow.offsetHeight) {
			iT = oMiddleBox.offsetHeight - oShadow.offsetHeight;
		}
		oShadow.style.left = iL + 'px';
		oShadow.style.top  = iT + 'px';

		// 右侧图片移动
		// 比例：iSmallMaxL / iBigMaxL = iSmallMoveL / iBigMoveL
		// iBigMoveL = iSmallMoveL * iBigMaxL / iSmallMaxL

		var iBigL = iL * oLargeBox.offsetWidth / oShadow.offsetWidth;
		var iBigT = iT * oLargeBox.offsetHeight / oShadow.offsetHeight;

		oLargeImg.style.left = -iBigL + 'px';
		oLargeImg.style.top  = -iBigT + 'px';

	}
}