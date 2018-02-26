/*
	加载动画对象
*/
const Loading = {
	el: null,
	imgs: [
		'images/loading1.png',
		'images/loading2.png',
		'images/loading3.png',
	],
	create: function () {
		let oLoading = document.createElement('img');
		oLoading.className = 'loading';
		oLoading.src = this.imgs[0];
		document.body.appendChild(oLoading);

		this.el = oLoading;
	},
	show: function () {
		if(!this.el) {
			this.create();
		}
		this.el.style.display = 'block';

		// loading动画
		let iIndex = 1;
		this.iTimer = setInterval(function () {
			this.el.src = this.imgs[iIndex];
			iIndex++;

			if(iIndex >= this.imgs.length) {
				iIndex = 0;
			}
		}.bind(this), 200);
	},
	hide: function () {
		// 清除定时器
		clearInterval(this.iTimer);
		this.el.style.display = 'none';
	}
};