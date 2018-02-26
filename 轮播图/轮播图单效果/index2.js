 function $(id){
	return document.getElementById(id)
}

// 自动轮播
	var autoplay_timer = null;  
	autoplay_timer = setInterval(autoPlay,1500) 
	let 
	    iImgIndex = 0, // 针对图片的下标
    	iBtnIndex = 0; // 针对按钮的下标

	//图和列表连在一起
	function autoPlay(){
		iImgIndex ++; // 针对图片的下标
		iBtnIndex ++; // 针对按钮的下标
	
		if(iBtnIndex >= $("list").children.length) {
			iBtnIndex = 0;
		}
		
		if(iImgIndex >= $("content").children.length) {
			iImgIndex = 1;
			$("content").style.left = 0;
		}
		
		//利用排他思想，都清空
		for(var i=0 ;i<$("list").children.length;i++){
			$("list").children[i].className="";
		}
		//操作当前(this找不到,用下标index记录)
		$("list").children[iBtnIndex].className="current";
		startMove($("content"),{left:-(iImgIndex*490)})	
	}
	
//鼠标事件
	//为每个列表下标添加事件: 滑到列表下标显示相应的图片
	for(var i=0;i<$("list").children.length;i++){
		$("list").children[i].iBtnIndex=i;//为每一个列表li添加索引
		$("content").children[i].iImgIndex=i;//为每一个图片li添加索引
		
		$("list").children[i].onmouseover=function(){
			//终止定时器
			clearInterval(autoplay_timer);
			//解决下标不对应
			iBtnIndex=this.iBtnIndex-1
			autoPlay();    
		}
		$("list").children[i].onmouseout=function(){
			//鼠标离开重新启动定时器
			autoplay_timer = setInterval(autoPlay,1500);
		}
	}
