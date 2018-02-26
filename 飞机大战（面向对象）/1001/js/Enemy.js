/*
	创建敌方飞机的构造函数
	type：敌方飞机的类型
*/
// 小型飞机类型
const S_ENEMY = 'S_ENEMY';
// 中型飞机类型
const M_ENEMY = 'M_ENEMY';
// 大型飞机类型
const L_ENEMY = 'L_ENEMY';
class Enemy {
	constructor(type) {
		let oThat = this;
		let oEnemy = document.createElement('div');

		let oTypes = {
			S_ENEMY: function () {
				oEnemy.className = 's-enemy';
				oThat.speed = 6;
				oThat.dieImgs = [
					'images/plane1_die1.png',
					'images/plane1_die2.png',
					'images/plane1_die3.png',
				];
				// 血量
				oThat.blood = 10;
			},
			M_ENEMY: function () {
				oEnemy.className = 'm-enemy';
				oThat.speed = 4;
				oThat.dieImgs = [
					'images/plane2_die1.png',
					'images/plane2_die2.png',
					'images/plane2_die3.png',
					'images/plane2_die4.png',
				];
				// 血量
				oThat.blood = 20;
			},
			L_ENEMY: function () {
				oEnemy.className = 'l-enemy';
				oThat.speed = 3;
				oThat.dieImgs = [
					'images/plane3_die1.png',
					'images/plane3_die2.png',
					'images/plane3_die3.png',
					'images/plane3_die4.png',
					'images/plane3_die5.png',
					'images/plane3_die6.png',
				];
				// 血量
				oThat.blood = 40;
			},
		};
		oTypes[type]();

		document.body.appendChild(oEnemy);

		this.el = oEnemy;

		// 将子弹对象存储到Engine.enemies属性，方便碰撞检测
		let iKey = uniqueKey();
		Engine.enemies[iKey] = this;

		this.key = iKey;

		// 创建位置
		this.initPosition();
	}
	// 随机创建敌方飞机的位置
	initPosition() {
		let
			oBox = $('box'),
			iT   = -this.el.offsetHeight,
			iL   = oBox.offsetLeft + Math.round(Math.random() * (oBox.offsetWidth - this.el.offsetWidth));
		this.el.style.top  = iT + 'px';
		this.el.style.left = iL + 'px';
	}
	// 让飞机自动运行
	move() {
		let iWinH = document.documentElement.clientHeight;
		this.iTimer = setInterval(function () {
			this.el.style.top = this.el.offsetTop + this.speed + 'px';

			// 如果飞机飞出界面，自动销毁
			if(this.el.offsetTop > iWinH) {
				this.destroy(0);
			}
		}.bind(this), 50);
	}
	// 死亡动画
	dieAni(iIndex) {
		if(iIndex < this.dieImgs.length) {
			this.el.style.backgroundImage = 'url(' + this.dieImgs[iIndex] + ')';
			setTimeout(function () {
				this.dieAni(++iIndex);
			}.bind(this), 100);
		} else {
			// 移除飞机DOM节点
			document.body.removeChild(this.el);
		}
	}
	destroy(identity) {
		// 清除定时器
		clearInterval(this.iTImer);

		// 销毁当前飞机对象在Engine.enemies中的记录
		delete Engine.enemies[this.key];

		// 如果identity未0说明飞机飞出界面
		if(identity === 0) {
			// 移除飞机DOM节点
			document.body.removeChild(this.el);
		} else {
			// 显示死亡动画
			this.dieAni(0);
		}
	}
}