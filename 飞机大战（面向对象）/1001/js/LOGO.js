/*
	LOGO对象
*/
const LOGO = {
	el: null,
	create: function () {
		let oLogo = document.createElement('img');
		oLogo.src="images/logo.png";
		oLogo.className = 'logo';
		document.body.appendChild(oLogo);

		this.el = oLogo;
	},
	show: function () {
		if(!this.el) {
			this.create();
		}
		this.el.style.display = 'block';
	},
	hide: function () {
		this.el.style.display = 'none';
	}
};