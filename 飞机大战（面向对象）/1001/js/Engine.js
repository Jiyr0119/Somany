/*
	游戏引擎
*/
const Engine = {
	// 存储我方发射的子弹
	bullets: {},
	// 存储敌方创造的飞机
	enemies: {},
	// 游戏初始化
	start: function () {
		// 背景图运动
		this.bgMove();
		// 显示LOGO
		LOGO.show();

		// 让LOGO进场
		let oThat = this;
		bufferMove(LOGO.el, {top: 100}).then(function () {
			// 显示加载动画
			Loading.show();

			// 三秒钟以后消失LOGO和加载动画
			setTimeout(function () {
				LOGO.hide();
				Loading.hide();

				// 显示我方飞机
				Me.show();
				Me.shoot();

				// 创建敌方飞机
				oThat.createEnemy();

				// 执行碰撞检测
				oThat.impact();
			}, 3000);
		});
	},
	// 背景图运动
	bgMove: function () {
		let
			oBox = $('box'),
			iY = 0;

		setInterval(function () {
			iY += 6;
			oBox.style.backgroundPosition = '0 '+ iY + 'px';
		}, 50);
	},
	// 创建敌方飞机
	createEnemy: function () {
		setInterval(function () {
			Math.random() > 0.5 ? new Enemy(S_ENEMY).move() : '';
		}, 2000);
		setInterval(function () {
			Math.random() > 0.5 ? new Enemy(M_ENEMY).move() : '';
		}, 4000);
		setInterval(function () {
			Math.random() > 0.5 ? new Enemy(L_ENEMY).move() : '';
		}, 8000);
	},
	// 碰撞检测
	impact: function () {
		setInterval(function () {
			for(var i in this.bullets) {
				for(var j in this.enemies) {
					if(pz(this.bullets[i].el, this.enemies[j].el)) {
						// 销毁子弹
						this.bullets[i].destroy();

						// 减少血量
						this.enemies[j].blood -= 10;

						if(this.enemies[j].blood <= 0) {
							// 销毁飞机
							this.enemies[j].destroy();
						}
						break;
					}
				}
			}
		}.bind(this), 40);
	}
};