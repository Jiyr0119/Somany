/*
	弹出层的插件
*/
function Popup() {
	// 缓存popup的DOM对象
	this.el = null;
}
// 创建弹出层
Popup.prototype.create = function ({title, content}={}) {
	let oPopup = document.createElement('div');
	oPopup.className = 'popup';
	oPopup.innerHTML = `
		<h3>
			<a href="javascript:;" class="popup-close">&times;</a>
			<span class="popup-title">${title}</span>
		</h3>
		<div class="popup-content">${content}</div>
		<div class="popup-btn">
			<a href="javascript:;" class="popup-confirm">确定</a>
			<a href="javascript:;" class="popup-cancel">取消</a>
		</div>`;

	document.body.appendChild(oPopup);

	// 添加关闭事件
	let oClose = oPopup.getElementsByClassName('popup-close')[0];
	oClose.onclick = function () {
		this.hide();
	}.bind(this);

	// 添加确定事件
	let oConfirm = oPopup.getElementsByClassName('popup-confirm')[0];
	oConfirm.onclick = function () {
		this.hide();
	}.bind(this);

	// 添加取消事件
	let oCancel = oPopup.getElementsByClassName('popup-cancel')[0];
	oCancel.onclick = function () {
		this.hide();
	}.bind(this);


	// 缓存DOM对象
	this.el = oPopup;
}

// 显示弹出层
Popup.prototype.show = function () {
	this.el.style.display = 'block';
}
// 隐藏弹出层
Popup.prototype.hide = function () {
	this.el.style.display = 'none';
}