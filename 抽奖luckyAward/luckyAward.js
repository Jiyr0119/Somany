function Panel(panelCanvas) {
	this.elem = panelCanvas;
	this.ctx = panelCanvas.getContext("2d");
}

Object.assign(Panel.prototype, {
	init: function() {
		this.drawCanvas();
	},
	
	drawCanvas: function() {
		this.drawPannel();
		this.drawBorderPoint();
		this.drawArwardArea();
//		this.drawCenterPoint();
		this.drawArwardsTxt();
	},
	
	drawPannel:function() {
		this.ctx.save();   
		this.ctx.translate(400, 400); 

		this.ctx.beginPath();
		this.ctx.arc(0, 0, 240, 0, Math.PI*2);
		this.ctx.fillStyle = "#FDCC03";
		this.ctx.fill();   
		
		this.ctx.beginPath();
		this.ctx.arc(0, 0, 220, 0, Math.PI*2);
		this.ctx.fillStyle = "#FEFDFF";
		this.ctx.fill();   
		
		this.ctx.beginPath();
		this.ctx.arc(0, 0, 200, 0, Math.PI*2);
		this.ctx.fillStyle = "#FEFA8F";
		this.ctx.fill();   
	
		this.ctx.restore();
		
	},
	
	drawBorderPoint: function() {
		this.ctx.save();  
		this.ctx.translate(400, 400);
		
		for (var i = 0; i < 10; i++) {
			this.ctx.beginPath();
			this.ctx.arc(0, -230, 7, 0, Math.PI*2);
			this.ctx.fillStyle = "#FFFF89";
			this.ctx.fill();   
			this.ctx.rotate(Math.PI / 180 * 36);
		}
		
		this.ctx.restore();
	},
	
	drawArwardArea: function() {
		this.ctx.save();  
		this.ctx.translate(400, 400);
		
		for (var i = 0; i < 3; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, 0);
			this.ctx.arc(0, 0, 200, 0, Math.PI/3);
			this.ctx.fillStyle = "#FAF02C";
			this.ctx.fill();   
			this.ctx.rotate(Math.PI / 180 * 120);
		}
	
		this.ctx.restore();
	},
	
	drawArwardsTxt: function() {
		var arr = ["奖项一","奖项二","奖项三","奖项一","奖项二","奖项三"]
		this.ctx.save();  
		this.ctx.translate(400, 400);
		
		for (var i = 0; i < 6; i++) {
			this.ctx.beginPath();
			this.ctx.font = "30px Arial blod";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = 'middle' 
			this.ctx.fillStyle = "#FF7707";
			this.ctx.fillText(arr[i], 0, 150);
			this.ctx.rotate(Math.PI / 180 * 60);
		}
		
		this.ctx.restore();
	}	
});

function Point(pointCanvas) {
	this.elem = pointCanvas;
	this.ctx = pointCanvas.getContext("2d");
}

Object.assign(Point.prototype, {
	init: function() {
		this.drawCenterPoint();
	},
	
	drawCenterPoint: function() {
		this.ctx.save();  
		this.ctx.translate(400, 400);
		
		this.ctx.beginPath();
		this.ctx.arc(0, 0, 70, 0, Math.PI*2);
		this.ctx.fillStyle = "#F0EC07";
		this.ctx.fill();   
		
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.arc(0, 0, 60, 0, Math.PI*2);
		this.ctx.fillStyle = "#94D5FF";
		this.ctx.fill(); 
		
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.arc(0, 0, 50, 0, Math.PI*2);
		this.ctx.fillStyle = "#fff";
		this.ctx.fill(); 
		
		this.ctx.beginPath();
		this.ctx.moveTo(-60*Math.sin(Math.PI/12), -60*Math.cos(Math.PI/12) );
		this.ctx.lineTo(0, -100);
		this.ctx.lineTo( 60*Math.cos(Math.PI*(-5/12)), 60*Math.sin(Math.PI*(-5/12)) );
		this.ctx.strokeStyle = "#94D5FF"
		this.ctx.stroke();
		this.ctx.fillStyle = "#94D5FF";
		this.ctx.fill(); 

		this.ctx.restore();
	}
});