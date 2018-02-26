
function Bullet(){
	var oBullet = create('div');
		oBullet.className = 'bullet';
		document.body.appendChild(oBullet);
		
		this.ele = oBullet;
		
		/*	将子弹对象存储到Engine  bullets 中去，用来做碰撞检测
			键名不能重复，否则会覆盖。利用时间戳,加随机数，避免同一秒创造了敌机机和子弹
		 */
		var iKey = uniqueKey();
		Engine.bullets[iKey] = this;
		this.key = iKey;
		
		//初始化位置
		oBullet.style.top = Plane.ele.offsetTop - oBullet.offsetHeight + 'px';
		oBullet.style.left = Plane.ele.offsetLeft + (Plane.ele.offsetWidth - oBullet.offsetWidth)/2 + 'px'
}
Bullet.prototype = {
	constructor : Bullet,
	move : function(){
		// 子弹的运动
		this.bTimer = setInterval(function(){
			this.ele.style.top = this.ele.offsetTop - 10 + 'px';
			//飞出页面销毁
			if(this.ele.offsetTop < -this.ele.offsetHeight){
				this.destroy();
			}
		}.bind(this),50)
	},
	destroy : function(){
		//清除定时器
		clearInterval(this.bTimer);
		// 销毁当前子弹对象在Engine.bullets中的记录
		delete Engine.bullets[this.key];
		//移除dom节点
		document.body.removeChild(this.ele)
	}
}
