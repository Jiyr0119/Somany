/*	游戏引擎   
 	战斗机
 	子弹
 	敌机
 */

	//组件功能
	function $(id){
		return document.getElementById(id);
	}
	function create(ele){
		return document.createElement(ele);
	}
	function randomInt(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
	
	//游戏引擎
	window.onload=function(){
		new Engine();//游戏引擎对象（背景）
	};
	function Engine(){
		this.ele = $("body_main");
		this.aOpt =$("options").children;
		this.init();
	}
	
	//初始化函数
	Engine.prototype.init = function(){
		//有事件，记录this
		var that = this ;
		//为每一个模式添加点击事件
		for(var i = 0 ;i <this.aOpt.length;i++){
			this.aOpt[i].onclick = function(){
				//记录当前点击的li的value值，便于后期难易程度设置子弹速度
				that.choice = this.value;
				//删除Ul
				that.removeOpt();
			}
		}
	}
	//删除UL
	Engine.prototype.removeOpt = function(){
		//删除Ul
		this.aOpt[0].parentNode.remove();
		
		//删除之后，开始动画
		this.animation();
	}
//	动画入场
	Engine.prototype.animation = function(){
		// logo 入场
		this.logo = create("div");
		this.logo.className ="logo";
		document.body.appendChild(this.logo);
		startMove(this.logo,{top:200});
		
		//烟雾飞机入场
		this.loading = create("div");
		this.loading.className = "loading";
		document.body.appendChild(this.loading);
		
		//有定时器，缓存this
		var that = this
		var index = 1 ;
		var timer = setInterval(function(){
			that.loading.style.background ="url(images/loading"+(++index)+".png) no-repeat";
			if(index ==3 ){
				index = 0;
			}
		},700)
	
		//背景移动 
		var bodyMove = 0;
		setInterval(function(){
			bodyMove += 5 ;
			that.ele.style.backgroundPositionY = bodyMove + 'px'
		},30)
	
		//3秒钟后入场动画结束，进入游戏模式
		setTimeout(function(){
			//停loading的定时器
			clearInterval(timer);
			//删除logo 和loading
			that.loading.remove();
			that.logo.remove();
			
			//开始游戏模式
			that.gameStart();
		},5000)
	}
	Engine.prototype.gameStart = function(){
		//我放飞机初始化(战斗机就一个,所以使用json对象方式创建)
		plane.init();
		//开火，产生子弹
		plane.fire(this.choice);
		//创建敌机
		this.createEnemy(); 
	}
	//通过殷勤控制敌机创建大小
	Engine.prototype.createEnemy = function(){
		//每隔多久创建一个某种类型的敌机
		setInterval(function(){
			Math.random() > 0.5 ? new Enemy(1) : "";
		},1500)
		setInterval(function(){
			Math.random() > 0.5 ? new Enemy(2) : "";
		},2000)
		setInterval(function(){
			Math.random() > 0.5 ? new Enemy(3) : "";
		},5000)
	}
	//敌机构造函数
	function Enemy(type){
		this.type = type ;
		this.ele =create("div");
		this.init();
	}
	//敌机的初始化函数，实现创建敌机
	Enemy.prototype.init=function(){
		switch(this.type){
			case 1:
					this.ele.className="enemy-small" ;// 样式
					this.hp = 1;   //血量
					this.speed =10; //运动速度
					break;
			case 2:
					this.ele.className = "enemy-middle";
					this.hp = 3;
					this.speed = 8;
					break;
			
			case 3:
					this.ele.className = "enemy-large";
					this.hp = 8;
					this.speed = 5;
					break;
		}
		
		//敌机入场
		document.body.appendChild(this.ele);
		//敌机出现的位置的范围（水平方向  随机位置）
		var min = $("body_main").offsetLeft
		var max = $("body_main").offsetWidth-this.ele.offsetWidth + min;
		this.ele.style.left =randomInt(min,max) +'px';
		this.ele.style.top = -this.ele.offsetHeight +'px';
		
		//敌机移动
		this.move();
	}
	Enemy.prototype.move=function(){
		var that = this ;
		this.timer =setInterval(function(){
			that.ele.style.top = that.ele.offsetTop + that.speed +'px';
			//敌机运动出边界，终止定时器 并销毁
			if(that.ele.offsetTop>= window.innerHeight){
				that.die();
			}
			
			//敌机运动过程中产生碰撞，方法调用在敌机运动定时器中
			that.peng();
		},60)
	}
	Enemy.prototype.die = function(){
		clearInterval(this.timer);
		this.ele.remove();
	}
	Enemy.prototype.peng=function(){
		//以一个敌机为基准，检查所有子弹，判断哪一个子弹和敌机产生碰撞
		//获取页面中所有的子弹
		var bullets = document.getElementsByClassName("bullet");
		for(var i=0 ;i<bullets.length;i++){
		//top碰撞
			if(bullets[i].offsetTop - this.ele.offsetTop >= 0){
				if(bullets[i].offsetTop - this.ele.offsetTop <= this.ele.offsetHeight){
					//left碰撞
					if(bullets[i].offsetLeft - this.ele.offsetLeft >= 0){
						if(bullets[i].offsetLeft - this.ele.offsetLeft <= this.ele.offsetWidth){
							//根据页面中碰撞的子弹id,去数组中查找对应的子弹对象，然后将其销毁
							//查找bullets[i].id  在数组中是否存在
							for(var j=0 ;j<plane.bulletArr.length;j++){
								if(bullets[i].id==plane.bulletArr[j].id){
									//检测到碰撞，敌机死亡
									plane.bulletArr[j].die();
								}
							}
							//子弹敌机碰撞后，敌机的血量减少
							this.hp--;
							if(this.hp<=0){
								this.die();
							}
						
						}
					}
				}
			}
		}
	}
	var plane = {
		init: function(){
			//创建飞机
			this.ele = create('div');
			this.ele.className = 'my-warplain';
			document.body.appendChild(this.ele);
			//确定位置
			this.position();
		},
		position: function(){
			var left =(window.innerWidth- this.ele.offsetWidth)/2;
			var top = (window.innerHeight -this.ele.offsetHeight);
			this.ele.style.left = left +'px';
			this.ele.style.top = top +'px';
			
			//飞机移动
			this.move();
		},
		move: function(){
			var that = this;
			//整个游戏背景的宽高
			var offsetLeft = $("body_main").offsetLeft;
			var offsetWidth = $("body_main").offsetWidth;
			document.onmousemove=function(evt){
				var e = evt || window.event;
				var x = e.clientX -that.ele.offsetWidth/2;
				var y = e.clientY -that.ele.offsetHeight/2;
				//边界处理
				//左边界
				if(x < offsetLeft){
					x = offsetLeft;
				}
				//右边界
				if(x>offsetWidth-that.ele.offsetWidth+offsetLeft){
					x = offsetWidth-that.ele.offsetWidth+offsetLeft;
				}
				that.ele.style.left = x +'px';
				that.ele.style.top  = y +'px';
			}
		},
		fire:function(choice){
			var frequence = null;//控制定时器执行时间
			switch(choice){
				case 1:frequence = 800;break;
				case 2:frequence = 500;break;
				case 3:frequence = 200;break;
				case 4:frequence = 30;break;
			}
			
			var bulletId = 0;
			//定时器控制发炮时间
			setInterval(function(){
				plane.bulletArr.push( new Bullet(bulletId) ) ;//创建子弹对象  将创建出来的子弹存放到数组中
				bulletId++;
			},frequence)
		},
		//记录飞机参数  飞机的 宽度  高度  left top值  存储多个信息，用json
		planeInfo:function(){
			return {
				"x":this.ele.offsetLeft,
				"y":this.ele.offsetTop,
				"offsetWidth":this.ele.offsetWidth,
				"offsetHeight":this.ele.offsetHeight
			}
		},
		bulletArr:[]  //该数组庸才存放创建的子弹对象  
	};
	//子弹构造器
	function Bullet(id){
		//子弹的初始化方法（创建对象的属性确定子弹长什么样）
		this.ele = create('div');
		this.init();
		this.id = id;  //为每一个子弹添加一个id属性
		this.ele.id = id ; //为页面div元素（子弹）添加一个id
	}
	Bullet.prototype.init=function(){
		//创建一个子弹
		this.ele.className = "bullet";
		document.body.appendChild(this.ele);  //this.ele指向的是子弹，找到的是子弹的东西
		//子弹位置
		//子弹发出的位置和飞机的位置有关，所以要先获取飞机的位置信息
		var planeMsg = plane.planeInfo();
		this.ele.style.left = planeMsg.x+planeMsg.offsetWidth/2-this.ele.offsetWidth/2+"px";
		this.ele.style.top = planeMsg.y - this.ele.offsetHeight + "px";
	
		//子弹运动
		this.move();
	}
	Bullet.prototype.move = function(){
		var that = this ;
		this.timer =setInterval(function(){
			//子弹运动
			that.ele.style.top =that.ele.offsetTop -10 +'px';
			
			//子弹运动出边界就销毁
			if(that.ele.offsetTop <= 20){
				//销毁子弹
				that.die();
			}
		},30)
	}
	Bullet.prototype.die =function(){
		//终止定时器
		clearInterval(this.timer);
		this.ele.className = "bullet_die";
		var that = this ;
		//子弹延时销毁
		setTimeout(function(){
			that.ele.remove();
		},30)
		
		//当子弹消失，数组中的子弹也要消除掉
		for(var i =0 ; i< plane.bulletArr.length;i++){
			//通过当前页面中的子弹的id找
			if(this.id==plane.bulletArr[i].id){
				//删除数组中的某个数据
				plane.bulletArr.splice(i,1);
			}
		}
	}
	