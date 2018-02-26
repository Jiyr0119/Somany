//获取随机数
function getRand(min,max){
	return Math.floor( Math.random()*(max-min+1)+min );
}


//获取六位十六进制数的颜色值
function getColor(){
	var r = getRand(0,255).toString(16);
	var g = getRand(0,255).toString(16);
	var b = getRand(0,255).toString(16);
	return (r.length<2?"0"+r:r) + (g.length<2?"0"+g:g) + (b.length<2?"0"+b:b) ;
}


//通过id找到要操作 的元素
function $(id){
	return document.getElementById(id);
}


//时间转字符串
function dateToString(d,sign){
		var sign=sign||"-";
		var h=d.getHours()<10?"0"+d.getHours():d.getHours();
		var m=d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes();
		var s=d.getSeconds()<10?"0"+d.getSeconds():d.getSeconds();
		return d.getFullYear()+sign+
			   d.getMonth()+sign+
			   d.getDate()+sign+" "+
			   h+":"+m+":"+s
	}

//实现表格打印
function fnPrintTable(m,n){
		document.write('<table border="1" width="500" height="30" cellspacing="0" cellpadding="0">')
			for(var row=1;row<=m;row++){
				document.write('<tr height="30">')
					for(var col=1;col<=n;col++){
						document.write('<td></td>')
					}
				document.write('</tr>')
			}
		document.write('</table>')
	}


//获取行内元素样式值
function getStyle(obj,attr){
	return window.getComputedStyle? window.getComputedStyle(obj,false)[attr]:obj.currentStyle[attr];
}
