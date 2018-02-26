var Logo = {
		ele : null ,
		create: function(){
			var oLogo = create('img');
				oLogo.src = "images/logo.png"
				oLogo.className = "logo";
				document.body.appendChild(oLogo);
				
				this.ele = oLogo;
		},
		show: function (){
			if(!this.ele){
				this.create();
			}
			this.ele.style.display = "block";
		},
		hide: function (){
			this.ele.style.display = "none";
		}
	}
