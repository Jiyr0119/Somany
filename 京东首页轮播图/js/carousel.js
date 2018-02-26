(function ($) {
	let Carousel = function (oCarousel) {
		let
			oDirectionBtn = oCarousel.children('.carousel-direction-btn'),
			oLeftBtn	  = oDirectionBtn.children('.carousel-left-btn'),
			oRightBtn	  = oDirectionBtn.children('.carousel-right-btn'),
			oBtnList	  = oCarousel.children('.carousel-btn-list'),
			aBtnList	  = oBtnList.children(),
			oImgList	  = oCarousel.children('.carousel-img-list'),
			aImgList	  = oImgList.children();

		let oThat = this;

		// 显示的图片对应的索引
		this.iIndex = 0;
		this.aBtnList = aBtnList;
		this.aImgList = aImgList;

		// 鼠标移入移出事件
		oCarousel.hover(function () {
			// 停止运动
			clearInterval(oThat.iTimer);
			oDirectionBtn.css('display', 'block');
		}, function () {
			// 继续自动运动
			oThat.autoMove();

			oDirectionBtn.css('display', 'none');
		});

		// 给按钮列表绑定事件
		
		aBtnList.bind('mouseenter', function () {
			oThat.iIndex = $(this).index();

			// 开始运动
			oThat.move();
		});

		// 左侧按钮绑定事件
		oLeftBtn.bind('click', function () {
			oThat.iIndex--;
			if(oThat.iIndex < 0) {
				oThat.iIndex = aBtnList.length - 1;
			}

			// 开始运动
			oThat.move();
		});

		// 右侧按钮绑定事件
		oRightBtn.bind('click', function () {
			oThat.rightMove();
		});

		// 自动运动
		this.autoMove();
	};

	Carousel.prototype.move = function () {
		this.aImgList.stop().css('display', 'block').animate({
			opacity: 0
		}, 200).eq(this.iIndex).stop().animate({
			opacity: 1
		}, 200);
		// 让对应的按钮拥有class
		this.aBtnList.removeClass('carousel-active').eq(this.iIndex).addClass('carousel-active');
	};
	Carousel.prototype.rightMove = function () {
		this.iIndex++;
		if(this.iIndex >= this.aBtnList.length) {
			this.iIndex = 0;
		}

		// 开始运动
		this.move();
	};
	Carousel.prototype.autoMove = function () {
		this.iTimer = setInterval(function () {
			this.rightMove();
		}.bind(this), 3000);
	};

	// 注册成jQuery的插件
	$.fn.extend({
		carousel: function () {
			$(this).each(function () {
				new Carousel($(this));
			});
		}
	});
})(jQuery);