var Loading = {
	ele : null,
	imgs : [
		"images/loading1.png",
		"images/loading2.png",
		"images/loading3.png"
	],
	create : function(){
		var oLoading =create('img');
			oLoading.src= this.imgs[0];
			oLoading.className = "loading";
			document.body.appendChild(oLoading);
			
			this.ele = oLoading;
	},
	show :function(){
		if(!this.ele){
			this.create();
		}
		this.ele.style.display = "block";
		
		// loading 动画
		var picIndex = 1;
		this.itimer=setInterval(function(){
			this.ele.src = this.imgs[picIndex];
			picIndex++;
			if(picIndex >= this.imgs.length){
				picIndex = 0;
			}
		}.bind(this),300)
	},
	hide :function(){
		clearInterval(this.itimer)
		this.ele.style.display = "none";
	}
}
