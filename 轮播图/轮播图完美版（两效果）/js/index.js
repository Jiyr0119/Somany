window.onload = function () {
	let
		oBox 			= $('box'),
		oDirectionBtn 	= $('direction-btn'),
		oLeftBtn 		= $('left-btn'),
		oRightBtn 		= $('right-btn'),
		oList			= $('list'),
		aListLi			= oList.children,
		iPerWidth		= aListLi[0].offsetWidth,
		oBtnList		= $('btn-list'),
		aBtnListA		= Array.from(oBtnList.children);


	// 标识图片的下标
	let iIndex = 0;
	// 表示按钮的下标
	let iBtnIndex = 0;

	// 记录定时器的返回值
	let iTimer = null;

	// 鼠标移入，显示按钮
	oBox.onmouseenter = function () {
		clearInterval(iTimer);
		oDirectionBtn.style.display = 'block';
	}

	// 鼠标移出，隐藏按钮
	oBox.onmouseleave = function () {
		oDirectionBtn.style.display = 'none';
		// 自动运行
		autoMove();
	}


	// 复制第一个LI放到最后的位置
	oList.innerHTML += aListLi[0].outerHTML;

	// 改变ul的宽度
	oList.style.width = iPerWidth * aListLi.length + 'px';


	// 点击左侧按钮
	oLeftBtn.onclick = function () {
		iIndex--;
		iBtnIndex--;

		// 针对图片做的左侧临界点的判断
		if(iIndex < 0) {
			iIndex = aListLi.length - 2;
			oList.style.left = - (aListLi.length - 1) * iPerWidth + 'px';
		}

		// 针对按钮做左侧临界点的判断
		if(iBtnIndex < 0){
			iBtnIndex = aBtnListA.length - 1;
		}
		bufferMove(oList, {left: - iIndex * iPerWidth});

		// 给对应的按钮添加className
		aBtnListA.forEach(function (m) {
			m.className = '';
		});
		aBtnListA[iBtnIndex].className = 'active';
	}

	// 点击右侧按钮
	oRightBtn.onclick = function () {
		iIndex++;
		iBtnIndex++;

		// 针对图片做的右侧临界点的判断
		if(iIndex >= aListLi.length) {
			iIndex = 1;
			oList.style.left = 0;
		}

		// 针对按钮做右侧临界点的判断
		if(iBtnIndex >= aBtnListA.length){
			iBtnIndex = 0;
		}

		bufferMove(oList, {left: - iIndex * iPerWidth});

		// 给对应的按钮添加className
		aBtnListA.forEach(function (m) {
			m.className = '';
		});
		aBtnListA[iBtnIndex].className = 'active';
	}


	// 给按钮列表添加鼠标移入事件
	aBtnListA.forEach(function (v, k) {
		v.index = k;
		v.onmouseenter = function () {
			iIndex = this.index;
			iBtnIndex = this.index;

			bufferMove(oList, {left: - this.index * iPerWidth});

			// 给对应的按钮添加className
			aBtnListA.forEach(function (m) {
				m.className = '';
			});
			this.className = 'active';
		}
	});


	// 自动运行
	autoMove();

	function autoMove() {
		iTimer = setInterval(function () {
			iIndex++;
			iBtnIndex++;

			// 针对图片做的右侧临界点的判断
			if(iIndex >= aListLi.length) {
				iIndex = 1;
				oList.style.left = 0;
			}

			// 针对按钮做右侧临界点的判断
			if(iBtnIndex >= aBtnListA.length){
				iBtnIndex = 0;
			}

			bufferMove(oList, {left: - iIndex * iPerWidth});

			// 给对应的按钮添加className
			aBtnListA.forEach(function (m) {
				m.className = '';
			});
			aBtnListA[iBtnIndex].className = 'active';
		}, 3000);
	}
}