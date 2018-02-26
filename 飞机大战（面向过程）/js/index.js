	//获取页面元素
	var oBox   = $("box");
	var olevel = $("level");
	var olist  = Array.from(olevel.children);
	
    //为每个li添加点击事件
    for(var i = 0;i<olist.length;i++){
    	
    	olist[i].onclick=function(){
    		// 提示游戏开始，选择等级框消失
//  		alert('游戏马上开始')
    		olevel.style.display='none';
     	
     		//背景图的滚动
     		var iY = 0;
     		setInterval(function(){
     			iY -= 10 ;
     			oBox.style.backgroundPosition = '0'+ iY + 'px';
     		},100);
     		
     		/*1  加载游戏动画
     		  1.1 logo的创建，样式，添加，出现方式  
     		  1.2 logo出现后烟雾飞机加载动画 改变背景图片实现
     		  1.3  五秒钟后加载游戏动画消失*/
     		var oLogo = document.createElement('img');
     			oLogo.className='logo';
     			oLogo.src='images/logo.png';
     			document.body.appendChild(oLogo);
     			startMove(oLogo,{top:180},function(){
     			// 烟雾飞机的创建，样式，添加
     				var oLoad = document.createElement('img');
     					oLoad.className ='oLoad';
     					oLoad.src = 'images/loading1.png'
     					document.body.appendChild(oLoad)
     			
     					//烟雾飞机加载运动（改变下标）
     					var oLoadIndex = 1 ;
     					var oLoadTimer = setInterval(function(){
     						oLoadIndex++;
     						oLoad.src='images/loading'+oLoadIndex+'.png';
     						//循环运动
     						if(oLoadIndex >= 3){
     							oLoadIndex=0;
     						}
     					},800)
     					
     					//5秒钟后加载动画消失  停止定时器，移除logo和烟雾飞机
     					
     					/*2. 加载动画消失后，创建我方飞机
     					 2.1  飞机的创建，样式，添加，出现的位置
     					 2.2 飞机的鼠标事件，跟随鼠标移动，并进行边界处理
     					 2.3 飞机入场，入场之后产生子弹*/
     					setTimeout(function(){
     						clearInterval(oLoadTimer);
     						document.body.removeChild(oLogo);
     						document.body.removeChild(oLoad);
     					
     					//创建我方飞机,样式，添加
     					
     					var oMyPlane = document.createElement('div');
     						oMyPlane.className ='myplane';
     						document.body.appendChild(oMyPlane);
     						
     					//设置我方飞机的位置
     					//left : (屏幕宽度 - 飞机宽度)/2   top: 屏幕高度 -飞机高度  该处设死，写入场动画
     					var left = ( window.innerWidth-oMyPlane.offsetWidth)/2;
//   					var top  = window.innerHeight-oMyPlane.offsetHeight;
     					oMyPlane.style.left =left +'px';
//   					oMyPlane.style.top = top +'px';
     					
     					//设置我方飞机的鼠标移动事件
     					document.onmousemove=function(evt){
     						var e = evt ||window.event;
     						//鼠标位置
     						var myL = e.clientX - oMyPlane.offsetWidth /2 ;
     						var myT = e.clientY - oMyPlane.offsetHeight /2
     						//边界处理 (左边界：盒子左边    右边界：左边界+盒子宽-飞机宽)
     						var leftBorder = oBox.offsetLeft;
     						var rightBorder = leftBorder + oBox.offsetWidth - oMyPlane.offsetWidth;
     						//判断条件
     						if(myL < leftBorder){
     							myL = leftBorder;
     						}
     						if(myL > rightBorder){
     							myL = rightBorder;
     						}
     						//飞机移动
     						oMyPlane.style.left = myL +'px';
     						oMyPlane.style.top  = myT +'px';
     						
     					}
     					
     					//设置我方飞机的入场动画 入场后，设置子弹
   						startMove(oMyPlane,{bottom:0},function(){
   							
   							/* 3  子弹
   							   3.1   子弹的创建，样式，添加 
   							   3.2   子弹位置的确认（和飞机的位置有关）
   							   3.3  子弹的运动
   							   3.4  子弹的销毁（飞出屏幕后）
   							*/
   							//创建子弹,样式，添加
   							setInterval(function(){
   								var oBullet =document.createElement('div');
   								oBullet.className = 'bullet';
   								document.body.appendChild(oBullet);
   								
   								/* 子弹初始化位置（通过计算得来）
   								       子弹left： 飞机left + （飞机宽 - 子弹宽 ）/2
   								      子弹top :  飞机top - 子弹高
   								*/
   								var bL = oMyPlane.offsetLeft + (oMyPlane.offsetWidth - oBullet.offsetWidth) /2 ;
   							    var bT = oMyPlane.offsetTop - oBullet.offsetHeight;
   								
   								oBullet.style.left = bL + 'px';
   								oBullet.style.top  = bT + 'px';
   								
   								
   								//子弹运动
   								var bTimer = setInterval(function(){
   									oBullet.style.top = oBullet.offsetTop - 10 +'px'; 
   								
	   								//判断子弹是否飞出了界面
	   								if(oBullet.offsetTop < -oBullet.offsetHeight){
	   									
	   									//销毁子弹,清除定时器
	   									document.body.removeChild(oBullet);
	   									clearInterval(bTimer);
	   								}	
   								},30)
  
   							},500)
   							
   							/*
   							 4.  敌机 
   							 4.1   敌机的创建，样式，添加 （三种敌机，此处只写一种）
   							 4.2  敌机的位置（随机）
   							 4.3  敌机的运动
   							 */
   							
   							//创建敌机 ，样式，添加
   							setInterval(function(){
   								var oEnemy = document.createElement('img');
   								oEnemy.className = 'oEnemy';
   								oEnemy.dieImgs = [
   									'images/plane1_die1.png',
									'images/plane1_die2.png',
									'images/plane1_die3.png'
   								]
   								document.body.appendChild(oEnemy);
   								
   								/*敌机的位置（随机的位置） 
   								top: -敌机高度
   								left：随机位置 ，范围的确定（盒子宽-敌机宽）+ 盒子left*/
   								var eT = -oEnemy.offsetHeight;
   								var eL = Math.round(Math.random()*(oBox.offsetWidth-oEnemy.offsetWidth))+oBox.offsetLeft;
   								oEnemy.style.top = eT +'px';
   								oEnemy.style.left = eL +'px';
   								
   								/*敌机的运动*/
   								var eTimer =setInterval(function(){
   									oEnemy.style.top = oEnemy.offsetTop + 10 +'px'
   									
   									//敌机的销毁，分为两种    1.飞出界面   碰撞爆炸
   									
   									//判断敌机是否飞出了界面
	   								if(oEnemy.offsetTop > window.innerHeight){
	   									
	   									//销毁敌机,清除定时器
	   									document.body.removeChild(oEnemy);
	   									clearInterval(eTimer);
	   								}
	   								
	   								//碰撞事件  以一颗子弹为基准遍历所有飞机
	   								var bullets = document.getElementsByClassName('bullet');
	   								for(var i = 0; i < bullets.length; i++){
	   									if( bullets[i].offsetTop - oEnemy.offsetTop >=0  ){
											//top碰撞
											if(bullets[i].offsetTop - oEnemy.offsetTop <= oEnemy.offsetHeight){
												//left 碰撞
												if(bullets[i].offsetLeft - oEnemy.offsetLeft >= 0){
													if( bullets[i].offsetLeft - oEnemy.offsetLeft <= oEnemy.offsetWidth ){
														
														//死亡动画
														var dieIndex=0;
															var dieTimer = setInterval(function(){
									     						dieIndex++;
									     						oEnemy.style.backgroundImage = 'url(images/plane1_die'+dieIndex+'.png)';
									     					},10)
													}
												}
											}
										}
	   								}
	   								
   								},50)
   								
   							},3000)
   							
   						});
     					
     					},3000)
     			});
    	}
    }
