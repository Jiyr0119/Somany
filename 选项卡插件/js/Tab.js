/*
	选项卡的构造函数
*/
(function ($) {
	let Tab = function (oTab) {
		this.tab = oTab;

		// 读取配置
		this.getConfig();

		// 获取菜单LI，添加事件
		let aTabMenuLi = oTab.find('.tab-menu li');
		let aTabItem   = oTab.find('.tab-body .tab-item');

		aTabMenuLi.bind(this.type, function () {
			let iIndex = $(this).index();

			// 显示鼠标操作的菜单
			aTabMenuLi.removeClass('tab-active').eq(iIndex).addClass('tab-active');
			// 显示对应的DIV
			aTabItem.removeClass('tab-active').eq(iIndex).addClass('tab-active');
		});
	};
	// 读取配置
	Tab.prototype.getConfig = function () {
		let aType = ['mouseenter', 'click'];
		let oType = this.tab.data('type');

		this.type = $.inArray(oType, aType) ? oType : aType[0];
	};
	window.Tab = Tab;
})(jQuery);