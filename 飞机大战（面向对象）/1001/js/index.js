window.onload = function () {
	let oLevel = $('level');

	oLevel.onclick = function (ev) {
		let e = ev || window.event;
		let oTarget = e.srcElement || e.target;

		if(oTarget.nodeName === 'LI') {
			this.style.display = 'none';

			// 设定发射子弹的频率
			Me.frequency = oTarget.getAttribute('frequency');

			// 游戏开始
			Engine.start();
		}
	}
}