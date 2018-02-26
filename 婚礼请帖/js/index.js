function Page(){
	this.upArrowElem = $(".uparrow");
	this.mapBtnElem = $(".js-mapbtn");
	this.mapConElem = $(".js-mapCon");
	this.mapCloseElem = $(".closeBtn");
}

$.extend(Page.prototype, {
	init: function() {
		this.swiperInit();
		this.bindEvents();
		this.createMap();
	},
	
	swiperInit: function(){
		var mySwiper = new Swiper ('.swiper-container', {
			direction : 'vertical',  
			onInit: function(swiper){ 
				swiperAnimateCache(swiper); 
				swiperAnimate(swiper); 
			}, 
			onSlideChangeEnd: function(swiper){ 
				swiperAnimate(swiper); 
			} 
		})
	},
	
	bindEvents: function() {
		this.mapBtnElem.on("click", $.proxy(this.handleMapClick, this));			
		this.mapCloseElem.on("click", $.proxy(this.handleCloseClick, this));
	},
	
	handleMapClick: function() {
		this.mapConElem.show();
		this.upArrowElem.hide();
	},
	
	handleCloseClick: function() {
		this.mapConElem.hide();
		this.upArrowElem.show();
	},
	
	createMap: function() {
		var map = new AMap.Map('container',{
	        resizeEnable: true,
	        zoom: 10,
	        center: [116.480983, 40.0958]
    	});
	    var marker = new AMap.Marker({
	        position: [116.480983, 39.989628]
	    });
	    marker.setMap(map);
	    marker.on('click',function(e){
	      infowindow.open(map,e.target.getPosition());
	    })
	    AMap.plugin('AMap.AdvancedInfoWindow',function(){
	       infowindow = new AMap.AdvancedInfoWindow({
	        content: '<div class="info-title">高德地图</div><div class="info-content">'+
	                '<img src="https://webapi.amap.com/images/amap.jpg">'+
	                '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br/>'+
	                '<a target="_blank" href = "https://mobile.amap.com/">点击下载高德地图</a></div>',
	        offset: new AMap.Pixel(0, -30)
	      });
	      infowindow.open(map,[116.480983, 39.989628]);
	    })
	}
	
});

var page = new Page();
page.init();