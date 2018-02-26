window.onload=function(){
	waterFall();
	
	//触发滚动条事件
	window.onscroll=function(){
		/*如果窗口的高度 + 滚动条隐藏的高度(scrollTop) > 最后一个panel的top值 + 自身高度的一半，
		    说明用户即将浏览到底部，需要加载新的数据填充到页面中，供用户继续浏览。*/
		
		//最后一个盒子所在列的高度
		var oBoxs = document.getElementsByClassName("box")
		var lastBoxHeight = oBoxs[oBoxs.length-1].offsetTop + oBoxs[oBoxs.length-1].offsetHeight/2;
		
		// 浏览器的高度 
		var windowHeight= window.innerHeight;
		// 页面滚走的距离
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;  
	
		if(lastBoxHeight < windowHeight + scrollTop){
			for(var i =0 ;i<data.length;i++){
				var oBox = create("div");
				oBox.className = "box";
				$("main").appendChild(oBox);
				
				var oPic = create("div");
				oPic.className ="pic";
				oBox.appendChild(oPic);
				
				var oImg = create("img");
				oImg.src=data[i];
				oPic.appendChild(oImg)
				waterFall()
			}
		}
	}
}
function $(id){
	return document.getElementById(id)
}

function waterFall(){
	// 1. 确认瀑布流容器的样式（列数，居中）
	var oBoxs = document.getElementsByClassName("box")
	
	// 确认每个图片的宽度
	var boxWidth = oBoxs[0].offsetWidth;
	
	//确认浏览器的宽度
	var windowWidth = window.innerWidth;
	
	//确定列数
	var cols = parseInt(windowWidth/boxWidth) 
	
	//确定main的样式 
	$("main").style.cssText="width: "+(cols*boxWidth)+"px; margin: 0 auto;"
	
	
	//2. 摆放每张图片的位置  （永远在最矮的那一列放）
	
	//定义一个数组存放每一列的高度
	hArr=[]; 
	
	//遍历所有的box,讲前几个图片的高度存入到数组中，后边的图片位置要根据数组中的最小值来确定
	for(var i=0;i<oBoxs.length;i++){
		if(i<6){
			hArr.push(oBoxs[i].offsetHeight)
		}else{
			// 遍历数组， 一直找数组中的最小值 （数组存放的值是该列的高度）
			var minIndex = getMinHeightIndex()
			
			/* 	确定后边图片的位置 
			  	定位 left :当前的下标*一个盒子的宽度
				定位  top  :hArr[当前下标]   数组里存的是高度 
			 */
			oBoxs[i].style.position="absolute"
			oBoxs[i].style.left = minIndex * boxWidth +'px';
			oBoxs[i].style.top = hArr[minIndex] +'px'; 
			
			//更新数组 : 该应当前的minIndex在数组中对应位置的值 
			hArr[minIndex] = hArr[minIndex]+oBoxs[i].offsetHeight
		} 
	}
}


//摆放的过程，实际上是不断的寻找最小高度的过程
function getMinHeightIndex(){
	// 假设最小高度，最小高度下标
	var minHeight = hArr[0];
	var minHeightIndex = 0;
	//遍历找最小的
	for(var i=0;i<hArr.length;i++){
		if(hArr[i]<minHeight){
			minHeight = hArr[i];
			minHeightIndex = i
		}
	}
	return minHeightIndex;
}

function create(obj){
	return document.createElement(obj)
}
