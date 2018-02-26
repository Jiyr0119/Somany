/*
	子弹的构造函数
*/
function Bullet() {
	let oBullet = document.createElement('div');
	oBullet.className = 'bullet';
	document.body.appendChild(oBullet);

	this.el = oBullet;

	// 将子弹对象存储到Engine.bullets属性，方便碰撞检测
	let iKey = uniqueKey();
	Engine.bullets[iKey] = this;

	this.key = iKey;

	// 初始化子弹的位置
	oBullet.style.top  = Me.el.offsetTop - oBullet.offsetHeight + 'px';
	oBullet.style.left = Me.el.offsetLeft + (Me.el.offsetWidth - oBullet.offsetWidth) / 2 + 'px';
}
Bullet.prototype = {
	constructor: Bullet,
	// 移动动作
	move: function () {
		this.iTimer = setInterval(function () {
			this.el.style.top = this.el.offsetTop - 8 + 'px';

			// 如果子弹飞出界面，则销毁
			if(this.el.offsetTop < -this.el.offsetHeight) {
				this.destroy();
			}
		}.bind(this), 50);
	},
	// 销毁动作
	destroy: function () {
		// 清除定时器
		clearInterval(this.iTimer);

		// 销毁当前子弹对象在Engine.bullets中的记录
		delete Engine.bullets[this.key];

		// 移除子弹的DOM节点
		document.body.removeChild(this.el);
	}
};