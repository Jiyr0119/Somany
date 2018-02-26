function $(id) {
	return document.getElementById(id);
}
window.onload = function () {
	let
		oBox		= $('box'),
		oContent	= $('content'),
		oArrow 		= $('arrow'),
		oLeft		= $('left'),
		oRight		= $('right'),
		oList		= $('list'),
		aContentLi 	= Array.from(oContent.children),
		aListLi 	= Array.from(oList.children);
		
	let
		iImgIndex = 0, // 针对图片的下标
		iBtnIndex = 0; // 针对按钮的下标
		
	const iPerWidth = 490;

	//箭头事件
	// 给box添加进入和离开事件
	oBox.onmouseenter = function () {
		oArrow.style.display = 'block';
	}
	
	// 给box添加进入和离开事件
	oBox.onmouseleave = function () {
		oArrow.style.display = 'none';
	}
	
	//右箭头点击事件
	oRight.onclick = function () {
		iImgIndex++;
		iBtnIndex++;
		
		if(iBtnIndex >= aListLi.length) {
			iBtnIndex = 0;
		}
		
		if(iImgIndex >= aContentLi.length) {
			iImgIndex = 1;
			oContent.style.left = 0;
		}
		
		startMove(oContent, {left: - iImgIndex * iPerWidth});
		
		aListLi.forEach(function (v) {
			v.className = '';
		});
		aListLi[iBtnIndex].className = 'current';
	}
	//左箭头点击事件 
	oLeft.onclick = function () {
		iImgIndex--;
		iBtnIndex--;
		
		if(iBtnIndex <0 ) {
			iBtnIndex = 4;
		}
		
		if(iImgIndex <0 ) {
			iImgIndex = 4;
			oContent.style.left = - 5*iPerWidth + 'px';
		}
		
		startMove(oContent, {left: - iImgIndex * iPerWidth});
		
		aListLi.forEach(function (v) {
			v.className = '';
		});
		aListLi[iBtnIndex].className = 'current';
	}
}
