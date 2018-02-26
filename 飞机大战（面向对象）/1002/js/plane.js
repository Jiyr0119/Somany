var Plane = {
	ele : null,
	create : function(){
		var oPlane = create('img');
			oPlane.className = "myplane";
			oPlane.src = "images/me.png";
			document.body.appendChild(oPlane);
			
			this.ele = oPlane;
	},
	show : function(){
		if(!this.ele){
			this.create();
		}
		//确定初始位置
		var iLeft = (window.innerWidth - this.ele.offsetWidth)/2;
			iTop  =  window.innerHeight;
			this.ele.style.left = iLeft +'px';
			this.ele.style.top = iTop +'px';
			
		//飞机入场动画
		var  h = window.innerHeight - this.ele.offsetHeight;
			 startMove(this.ele,{top:h}).then(function(){
			 	//飞机的移动
			 		Plane.move();
			 });
	},
	move : function(){
		var that = this;
		var minLeft = $("box").offsetLeft;
		var maxLeft = minLeft + $("box").offsetWidth - this.ele.offsetWidth;
		document.onmousemove = function(evt){
			var e = evt || window.event;
			//鼠标位置
			var iL = e.clientX - that.ele.offsetWidth/2;
			var iT = e.clientY - that.ele.offsetHeight/2;
			//左侧边界
			if(iL < minLeft){
				iL = minLeft;
			}
			//右侧边界
			if(iL > maxLeft){
				iL = maxLeft;
			}
			that.ele.style.left = iL + 'px';
			that.ele.style.top = iT + 'px';
		}
	},
	shoot : function(){
		setInterval(function(){
			new Bullet().move();
		},300)
	},
	destroy : function(){
		
	}
}
