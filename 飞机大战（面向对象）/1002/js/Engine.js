/*
 	游戏引擎
 */

var Engine = {
	//存储我方发射的子弹
	bullets : {},
	//存储敌方创造的飞机
	Enemies : {},
	start : function (){
		//背景移动
		this.bgMove();
		//创建显示logo
		Logo.show();
		//logo动画入场
		var that = this;
		startMove(Logo.ele,{top:100}).then(function(){
			//创建显示加载动画
			Loading.show();
			
			//三秒钟后终止logo和加载
			setTimeout(function(){
				Logo.hide();
				Loading.hide();

				//我方飞机
				Plane.show();
				
				//飞机开火
				Plane.shoot();
				
				//创建敌方飞机
				that.createEnemy();
				
				//碰撞检测
				that.impact();
			},3000)
			
		});
		
	},
	bgMove : function(){
		var oBox = $("box")
		var iY = 0 ;
		setInterval(function(){
			iY += 10 ;
			oBox.style.backgroundPositionY = iY + 'px';
		},50)
		
	},
	createEnemy : function(){
		setInterval(function(){
			//小型飞机
			Math.random()>0.5 ? new Enemy(1) : "";
		},1000)
		setInterval(function(){
			//中型飞机
			Math.random()>0.5 ? new Enemy(2) : "";
		},3000)
		setInterval(function(){
			//大型飞机
			Math.random()>0.5 ? new Enemy(3) : "";
		},5000)
	},
	impact : function(){
		//定时器 每隔多久检测一次
		//外层循环是子弹，内层循环是敌机。 拿一颗子弹去遍历所有敌机，判断是否发生碰撞
		setInterval(function(){
			for (var i in this.bullets){
				for(var j in this.Enemies){
					if(pz(this.bullets[i].ele,this.Enemies[j].ele)){
						//销毁子弹
						this.bullets[i].destroy();
						//减少血量
						this.Enemies[j].blood -=10;
						
						if(this.Enemies[j].blood<=0){
							//累加得分
							let iScore = Number($('scoreNum').innerHTML);
							iScore +=this.Enemies[j].score;   
							$("scoreNum").innerHTML = iScore;
							//销毁
							this.Enemies[j].destroy();
						}
						break;
					}
				}
			}
		}.bind(this),40)
	}
};
