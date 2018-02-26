/*
	我方飞机
*/
const Me = {
	el: null,
	frequency: 0,
	create: function () {
		let oMe = document.createElement('img');
		oMe.className = 'me';
		oMe.src = 'images/me.png';
		document.body.appendChild(oMe);

		this.el = oMe;
	},
	show: function () {
		if(!this.el) {
			this.create();
		}

		// 初始化位置
		let
			iWinW = document.documentElement.clientWidth,
			iWinH = document.documentElement.clientHeight;
		this.el.style.left =  (iWinW - this.el.offsetWidth ) / 2 + 'px';
		this.el.style.top  =  iWinH + 'px';

		// 进入动画
		let
			oBox  = $('box'),
			oThat = this,
			iMinL = oBox.offsetLeft,
			iMaxL = oBox.offsetLeft + oBox.offsetWidth - oThat.el.offsetWidth;
		bufferMove(this.el, {top: iWinH - this.el.offsetHeight}).then(function () {
			document.onmousemove = function (ev) {
				let
					e  = ev || window.event,
					iL = e.clientX - oThat.el.offsetWidth / 2;

				// 左侧临界点的判断
				if(iL < iMinL) {
					iL = iMinL;
				}
				// 右侧临界点的判断
				if(iL > iMaxL) {
					iL = iMaxL;
				}
				oThat.el.style.left = iL + 'px';
			}
		});
	},
	shoot: function () {
		setInterval(function () {
			new Bullet().move();
		}, Me.frequency);
	},
};