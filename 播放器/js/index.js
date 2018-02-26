function Page(){
	this.video = $("#video");
	this.videoElem = this.video[0];
	this.playBtnElem = $("#play");
	this.perTimerElem = $(".perTimer");
	this.shengTimerElem = $(".shengTimer");
	this.volumeBtnElem = $("#volume-btn");
	this.volumeElem = $("#volume");
	this.processElem = $("#process");
	this.fullScreenElem = $("#fullScreen");
	this.duration = 0 ;	
	this.flag = true;
	this.onoff = true;
}

$.extend(Page.prototype, {
	init: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		this.video.on("canplay", $.proxy(this.handelCanPlay, this));
		this.video.on("timeupdate", $.proxy(this.handelTimeUpdate, this));
		this.playBtnElem.on("click", $.proxy(this.handlePlayBtnClick, this));
		this.volumeBtnElem.on("click", $.proxy(this.handleVolumeBtnClick, this));
		this.volumeElem.on("change", $.proxy(this.handleVolumeChange, this));
		this.processElem.on("change", $.proxy(this.handleProcessChange, this));
		this.fullScreenElem.on("click", $.proxy(this.handleFullScreenBtnClick, this));
	},
	
	handelTimeUpdate: function(e) {
		var rate = (e.target.currentTime / this.duration);
		this.processElem.val(rate);
		this.processElem.css('background', 'linear-gradient(to right, #059CFA, white ' + (rate*100) + '%, white)')
	},
	
	handelCanPlay: function() {
		this.duration = this.videoElem.duration;
	},
	
	handlePlayBtnClick: function() {
		if(this.flag){
			this.videoElem.play(); 
			this.playBtnElem.css({
				"background-image":"url(./imgs/stop.png)"
			});
			this.flag = false;
		}else{
			this.videoElem.pause();
			this.playBtnElem.css({
				"background-image":"url(./imgs/play.png)"
			});
			this.flag = true;
		}
	},
	
	handleVolumeBtnClick: function() {
		if(this.onoff){
			this.volumeElem.show();
			this.onoff = false;
		}else{
			this.volumeElem.hide();	
			this.onoff = true;		
		}
	},
	
	handleVolumeChange: function(e) {
		var target = $(e.target); 
		this.videoElem.volume = target.val();
		console.log(target.val())
		this.volumeElem.css('background', 'linear-gradient(to right, #059CFA, white ' + (target.val()*100) + '%, white)')
	},
	
	handleProcessChange: function(e) {
		var target = $(e.target); 
			nowTime = this.duration* target.val();
		this.videoElem.currentTime = nowTime;
	},

	handleFullScreenBtnClick: function() {
		this.launchFullscreen(this.videoElem);
	},

	launchFullscreen: function(element) {

		if(element.requestFullscreen) {
        	element.requestFullscreen();
	    } else if(element.mozRequestFullScreen) {
	        element.mozRequestFullScreen();
	    } else if(element.msRequestFullscreen){
	        element.msRequestFullscreen();
	    } else if(element.oRequestFullscreen){
	        element.oRequestFullscreen();
	    }else if(element.webkitRequestFullscreen){
	        element.webkitRequestFullScreen();
	    }else{
	        var docHtml = document.documentElement;
	        var docBody = document.body;
	        var videobox = document.getElementById('videobox');
	        var cssText = 'width:100%;height:100%;overflow:hidden;';
	        docHtml.style.cssText = cssText;
	        docBody.style.cssText = cssText;
	        videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
	        document.IsFullScreen = true;
    	}	
	},

	exitFullscreen: function (){
	    if (document.exitFullscreen) {
	        document.exitFullscreen();
	    } else if (document.msExitFullscreen) {
	        document.msExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	    } else if(document.oRequestFullscreen){
	        document.oCancelFullScreen();
	    }else if (document.webkitExitFullscreen){
	        document.webkitExitFullscreen();
	    }else{
	        var docHtml = document.documentElement;
	        var docBody = document.body;
	        var videobox = document.getElementById('videobox');
	        docHtml.style.cssText = "";
	        docBody.style.cssText = "";
	        videobox.style.cssText = "";
	        document.IsFullScreen = false;
	    }
	}
	
});

//var change = function($input) {}
//$('#process').RangeSlider({ min: 0,   max: 100,  step: 0.1,  callback: change});

var page = new Page();
page.init();