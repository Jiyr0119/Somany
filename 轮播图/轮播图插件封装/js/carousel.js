/*
	轮播图的插件
*/
(function () {
	var Carousel = function (obj) {
		// 每一个LI的高度
		this.iPerH = 340;

		// 缓存轮播图DOM对象
		this.el = obj;

		// 轮播图下标
		this.iIndex = 0;

		// 记录定时器的返回值
		let iTimer = null;

		let oThat = this;


		// 添加移入事件，显示方向按钮
		let oDirectionBtn = byClassName(this.el, 'carousel-direction-btn')[0];
		this.el.onmouseenter = function () {
			clearInterval(iTimer);
			oDirectionBtn.style.display = 'block';
		}
		// 鼠标移出事件
		this.el.onmouseleave = function () {
			// 开启新的定时器
			iTimer = setInterval(function () {
				oThat.next();
			}, 3000);

			oDirectionBtn.style.display = 'none';
		}
		
		let oImgList  = byClassName(this.el, 'carousel-img-list')[0];
		let aImgList  = oImgList.children;
		let oBtnList  = byClassName(this.el, 'carousel-btn-list')[0];
		let aBtnList  = oBtnList.children;

		// 获取左侧按钮
		let oLeftBtn = byClassName(this.el, 'carousel-left-btn')[0];
		oLeftBtn.onclick = function () {
			this.iIndex--;
			if(this.iIndex < 0) {
				this.iIndex = aImgList.length - 1;
			}
			this.move();
		}.bind(this);

		// 获取右侧按钮
		let oRightBtn = byClassName(this.el, 'carousel-right-btn')[0];
		oRightBtn.onclick = function () {
			this.next();
		}.bind(this);

		// 小按钮列表添加鼠标进入事件
		
		for(var i = 0; i < aBtnList.length; i++) {
			aBtnList[i].index = i;
			aBtnList[i].onmouseenter = function () {
				oThat.iIndex = this.index;
				oThat.move();
			}
		}

		// 定时器运动
		iTimer = setInterval(function () {
			this.next();
		}.bind(this), 3000);

		// 缓存其它方法中用到的对象
		this.oImgList = oImgList;
		this.aImgList = aImgList;
		this.aBtnList = aBtnList;
	}
	// 轮播图运动
	Carousel.prototype.move = function () {
		bufferMove(this.oImgList, {top: -this.iIndex * this.iPerH});

		// 显示对应的按钮
		for(var i = 0; i < this.aBtnList.length; i++) {
			this.aBtnList[i].className = '';
		}
		this.aBtnList[this.iIndex].className = 'carousel-active';
	}
	Carousel.prototype.next = function () {
		this.iIndex++;
		if(this.iIndex >= this.aImgList.length) {
			this.iIndex = 0;
		}
		this.move();
	}
	// 将轮播图构造函数变成全局变量
	window.Carousel = Carousel;
})();