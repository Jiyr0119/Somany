/*
 	选项卡构造函数
 */
	/*  创建构造函数,传过来的参数是当前要操作的tab
	    new Tab($('#tab-1 .tab'));
	*/
	var Tab = function(oTab){
		
		//对象身上添加属性，不写var，直接  .  就可以。 this.tab = oTab = #tab-1 .tab
		this.tab = oTab;

		//读取配置
		this.getConfig();
		// 给li添加点击事件 
		var aTabMenuLi = oTab.find(".tab-menu li");
		var aTabItem   = oTab.find("#tab-body .tab-item");

		aTabMenuLi.bind(this.type, function () {
			console.log(this.type)
			let iIndex = $(this).index();
			// 显示鼠标操作的菜单
			aTabMenuLi.removeClass('tab-active').eq(iIndex).addClass('tab-active');
			// 显示对应的DIV
			aTabItem.removeClass('tab-active').eq(iIndex).addClass('tab-active');
		});
	}
	Tab.prototype.getConfig = function(){
		var arrType = ['mouseenter','click'];
		var myType = this.tab.data('type');
		
		this.type = $.inArray(myType,arrType)? myType : arrType[0];
		//jQuery.inArray()函数用于在数组中搜索指定的值，并返回其索引值。如果数组中不存在该值，则返回 -1。
	}
	window.Tab = Tab;

