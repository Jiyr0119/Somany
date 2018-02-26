window.onload=function(){
	var oLevel = $("level");
	var oScore = $("score");

	//事件委托(子元素添加相同的事件，委托到父元素身上)
	oLevel.onclick = function(evt){
		var e = evt || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName == "LI"){
			this.style.display = "none";
		}
			//游戏开始
			Engine.start();
	}

}
