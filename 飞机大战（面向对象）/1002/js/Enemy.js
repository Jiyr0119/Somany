
// 飞机构造函数
function Enemy(type){
	this.type = type;
	this.ele = create('div');
	this.init();
}
Enemy.prototype = {
	init : function(){
		switch(this.type){
			case 1:
					this.ele.className = 'small_enemy';
					this.blood = 10;
					this.speed = 10;
					this.score = 10;
					this.dieImgs = [
						'images/plane1_die1.png',
						'images/plane1_die2.png',
						'images/plane1_die3.png',
					];
					break;
			case 2:
					this.ele.className = 'middle_enemy';
					this.blood = 20;
					this.speed = 6;
					this.score = 20;
					this.dieImgs = [
						'images/plane2_die1.png',
						'images/plane2_die2.png',
						'images/plane2_die3.png',
						'images/plane2_die4.png',
					];
					break;
			case 3:
					this.ele.className = 'large_enemy';
					this.blood = 30;
					this.speed = 4;
					this.score = 50;
					this.dieImgs = [
						'images/plane3_die1.png',
						'images/plane3_die2.png',
						'images/plane3_die3.png',
						'images/plane3_die4.png',
						'images/plane3_die5.png',
						'images/plane3_die6.png',
					];
					break;
		}
		document.body.appendChild(this.ele);
		/*	将子弹对象存储到Engine  bullets 中去，用来做碰撞检测
		键名不能重复，否则会覆盖。利用时间戳,加随机数，避免同一秒创造了敌机机和子弹
 		*/
		var iKey = uniqueKey();
		Engine.Enemies[iKey] = this;
		
		this.key = iKey;
		
		//敌机的初始化位置 
		var min = $("box").offsetLeft;
		var max = $("box").offsetWidth-this.ele.offsetWidth + min;
		this.ele.style.left = randomInt(min,max) + "px"
		this.ele.style.top =-this.ele.offsetHeight+ "px";
		
		//敌机运动 
		this.move();
	},
	move : function(){
		this.eTimer = setInterval(function(){
			this.ele.style.top = this.ele.offsetTop + this.speed +'px'
		//飞出页面销毁
		if(this.ele.offsetTop >= window.innerHeight){
			//游戏结束
			alert("游戏结束，您的分数是："+ $("scoreNum").innerHTML);
			this.destroy(0);
		}
		}.bind(this),100)
	},
	destroy(identity) {
		// 清除定时器
		clearInterval(this.iTImer);

		// 销毁当前飞机对象在Engine.enemies中的记录
		delete Engine.Enemies[this.key];

		// 如果identity = 0说明飞机飞出界面,销毁这个对象
		if(identity === 0) {
			// 移除飞机DOM节点
			document.body.removeChild(this.ele);
		} else {
			// 显示死亡动画
			this.dieAni(0);
		}
	},
	dieAni(iIndex) {
		if(iIndex < this.dieImgs.length) {
			this.ele.style.backgroundImage = 'url(' + this.dieImgs[iIndex] + ')';
			setTimeout(function () {
				this.dieAni(++iIndex);
			}.bind(this), 100);
		} else {
			// 移除飞机DOM节点
			document.body.removeChild(this.ele);
		}
	}
}
