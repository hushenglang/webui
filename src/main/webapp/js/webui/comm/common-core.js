/**
 * 公共方法
 */

/**
 * 字符串 替换 占位符 alert("http://{0}/{1}".format("www.xxx.com", "index.html"));
 * @returns {String}
 */
String.prototype.format=function()
{
	if(arguments.length==0) return this;
	for(var s=this, i=0; i<arguments.length; i++) 
	  s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
	return s;
};

/**
 * 字符串替换所有
 * @param s1
 * @param s2
 * @returns
 */
String.prototype.replaceAll=function(s1,s2){   
	return this.replace(new RegExp(s1,"gm"),s2);   
};

/**
 * 左补齐字符串
 * 
 * @param nSize 要补齐的长度
 * @param ch 要补齐的字符
 * @return
 */
String.prototype.padLeft = function(nSize, ch)
{
    var len = 0;
    var s = this ? this : "";
    ch = ch ? ch : '0';// 默认补0

    len = s.length;
    while (len < nSize)
    {
        s = ch + s;
        len++;
    }
    return s;
};

/**
 * 右补齐字符串
 * 
 * @param nSize 要补齐的长度
 * @param ch 要补齐的字符
 * @return
 */
String.prototype.padRight = function(nSize, ch)
{
    var len = 0;
    var s = this ? this : "";
    ch = ch ? ch : '0';// 默认补0

    len = s.length;
    while (len < nSize)
    {
        s = s + ch;
        len++;
    }
    return s;
};

/**
 * 左移小数点位置（用于数学计算，相当于除以Math.pow(10,scale)）
 * 
 * @param scale 要移位的刻度
 * @return
 */
String.prototype.movePointLeft = function(scale)
{
    var s, s1, s2, ch, ps, sign;
    ch = '.';
    sign = '';
    s = this ? this : "";

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : "";
    s2 = ps[1] ? ps[1] : "";
    if (s1.slice(0, 1) == '-')
    {
        s1 = s1.slice(1);
        sign = '-';
    }
    if (s1.length <= scale)
    {
        ch = "0.";
        s1 = s1.padLeft(scale);
    }
    return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
};

/**
 * 右移小数点位置（用于数学计算，相当于乘以Math.pow(10,scale)）
 * 
 * @param scale 要移位的刻度
 * @return
 */
String.prototype.movePointRight = function(scale)
{
    var s, s1, s2, ch, ps;
    ch = '.';
    s = this ? this : "";

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : "";
    s2 = ps[1] ? ps[1] : "";
    if (s2.length <= scale)
    {
        ch = '';
        s2 = s2.padRight(scale);
    }
    return s1 + s2.slice(0, scale) + ch + s2.slice(scale, s2.length);
};

/**
 * 移动小数点位置（用于数学计算，相当于（乘以/除以）Math.pow(10,scale)）
 * 
 * @param scale 要移位的刻度（正数表示向右移；负数表示向左移动；0返回原值）
 * @return
 */
String.prototype.movePoint = function(scale)
{
    if (scale >= 0)
        return this.movePointRight(scale);
    else
        return this.movePointLeft(-scale);
};

//string to date yyyy-mm-dd hh:mm:ss
String.prototype.toDate = function() 
{ 
var temp = this.toString(); 

temp = temp.replace(/-/g, "/"); 

var date = new Date(Date.parse(temp)); 

return date; 
};

/**
 * 重写Number.toFixed函数，解决不同浏览器的四舍五入差异。
 */
Number.prototype.toFixed = function(scale) {
    var s, s1, s2, start;

    s1 = this + "";
    start = s1.indexOf(".");
    s = s1.movePoint(scale);

    if (start >= 0)
    {
        s2 = Number(s1.substr(start + scale + 1, 1));
        if (s2 >= 5 && this >= 0 || s2 < 5 && this < 0)
        {
            s = Math.ceil(s); // 取大于等于指定数的最小整数
        }
        else
        {
            s = Math.floor(s); // 取小于等于指定数的最大整数
        }
    }

    return s.toString().movePoint(-scale);
};
/**
 * 功能：删除数组中某个下标的元素
 */
Array.prototype.remove = function(index){ 
    if(isNaN(index) || index > this.length){
    	return false;
    }
    this.splice(index,1); 
};

/**
 * 取模（余数）. 先移位成整型再取模再移位
 * 解决：浮点型取模存在精度问题。
 * @param {Number} x
 * @param {Number} y
 * @type Number
 * @returns {Number}
*/
Math.mod = function(x, y) {
	var r1 = 0;
	var r2 = 0;
	var m, scale;
	try { 
		var n1 = x.toString();
		if(n1.indexOf('.') != -1) {
			r1 = n1.split('.')[1].length;
		}
	} catch (e) { r1 = 0; }
	try { 
		var n2 = y.toString();
		if(n2.indexOf('.') != -1) {
			r2 = n2.split(".")[1].length;
		}
	} catch (e) { r2 = 0; }
	
	scale = Math.max(r1, r2);
	m = Math.pow(10, scale);
    return ( (Number(x).mul(m)) % (Number(y).mul(m)) ) * Math.pow(10, -scale);
};

//工具类
var Util = {
		
	getSpinnerStep : function(prdcode){
		if(prdcode=='022'||prdcode=='0'){
			return 0.01;
		}else if(prdcode=='023' ||prdcode=='1'){
			return 0.001;
		}
		return 0.01;
	},	
	
	getSpinnerStepLength : function(prdcode){
		if(prdcode=='022'||prdcode=='0'){
			return 2;
		}else if(prdcode=='023' ||prdcode=='1'){
			return 3;
		}
		return 2;
	},	
	
	bindSpinnerEvent : function(prdcode, elementid){
		if(prdcode=='022'||prdcode=='0'){
			$("#"+elementid).unbind('keypress');
			$("#"+elementid).on('keypress', function(event){
				return  Util.allowMaxDightsLenKeyPress(event,document.getElementById(elementid),2)
				        && Util.allowMaxIntLenKeyPress(event,document.getElementById(elementid),5);
			});	
		}else{
			$("#"+elementid).unbind('keypress');
			$("#"+elementid).on('keypress', function(event){
				return  Util.allowMaxDightsLenKeyPress(event,document.getElementById(elementid),3)
				        && Util.allowMaxIntLenKeyPress(event,document.getElementById(elementid),5);
			});	
		}
	},
	
	formatPriceByPrdcode:function(prdcode, price){
		if(prdcode=='022'||prdcode=='0'){
			return this.fixToStrTwodecimal(price);
		}else{
			return this.fixToStrThreedecimal(price);
		}
	},
		
	// 两个浮点数求和
	accAdd : function(num1, num2) {
		var r1 = 0;
		var r2 = 0;
		var m;
		try {
			var n1 = num1.toString();
			if(n1.indexOf('.') != -1) {
				r1 = n1.split('.')[1].length;
			}
		} catch (e) {
			r1 = 0;
		}
		try {
			var n2 = num2.toString();
			if(n2.indexOf('.') != -1) {
				r2 = n2.split(".")[1].length;
			}
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		// return (num1*m+num2*m)/m;
		return Math.round(num1 * m + num2 * m) / m;
	},

	// 两个浮点数相减
	accSub : function(num1, num2) {
		var r1 = 0;
		var r2 = 0;
		var m;
		
		try {
			var n1 = num1.toString();
			if(n1.indexOf('.') != -1) {
				r1 = n1.split('.')[1].length;
			}
		} catch (e) {
			r1 = 0;
		}
		try {
			var n2 = num2.toString();
			if(n2.indexOf('.') != -1) {
				r2 = n2.split(".")[1].length;
			}
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
	},
	// 两数相除
	accDiv : function(num1, num2) {
		var t1, t2, r1, r2;
		try {
			if(num1.toString().indexOf('.') != -1) {
				t1 = num1.toString().split('.')[1].length;
			} else {
				t1 = 0;
			}
		} catch (e) {
			t1 = 0;
		}
		try {
			if(num2.toString().indexOf('.') != -1) {
				t2 = num2.toString().split(".")[1].length;
			} else {
				t2 = 0;
			}
		} catch (e) {
			t2 = 0;
		}
		r1 = Number(num1.toString().replace(".", ""));
		r2 = Number(num2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
	},
	// 两数乘法
	accMul : function(num1, num2) {
		var m = 0, s1 = num1.toString(), s2 = num2.toString();
		try {
			if(s1.indexOf(".") != -1) {
				m += s1.split(".")[1].length;
			}
		} catch (e) {
		}
		try {
			if(s2.indexOf(".") != -1) {
				m += s2.split(".")[1].length;
			}
		} catch (e) {
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},
		
	/**
	 * 去后六位ID
	 */
	simpleOid : function(oid){
		var len = oid.length;
		if (len > 6){
			return oid.substring(len - 6, len);
		}
		return oid; 
	},
	
	html2Text : function(html){
//		html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
//		html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
//		html = html.replace(/<\/div>/ig, '\n');
//		html = html.replace(/<\/li>/ig, '\n');
//		html = html.replace(/<li>/ig, '  *  ');
//		html = html.replace(/<\/ul>/ig, '\n');
//		html = html.replace(/<\/p>/ig, '\n');
//		html = html.replace(/<br\s*[\/]?>/gi, "\n");
		html = html.replace(/<[^>]+>/ig, '');
		return html;
	},
	
	/**
	 * 判斷是否同一oid
	 */
	isSameOid : function(o1, o2){
		return (this.simpleOid(o1) == this.simpleOid(o2)); 
	},
		
	isEqual : function(o1, o2){
		for(var name in o1){
			if(o1[name] != o2[name] ){
				return false;
			}
		}
		return true;
		
	},
		/**
		 * 时间转换, timestamp转换为HH:MM:SS
		 * 
		 * @param x
		 */
	timestampToHHMMSS : function(x) {
		var tmpDate = new Date(x);
		var hour = (String(tmpDate.getHours()).length == 1) ? "0" + tmpDate.getHours() : tmpDate.getHours();
		var minutes = (String(tmpDate.getMinutes()).length == 1) ? "0" + tmpDate.getMinutes() : tmpDate.getMinutes();
		var seconds = (String(tmpDate.getSeconds()).length == 1) ? "0" + tmpDate.getSeconds() : tmpDate.getSeconds();
		return hour + ":" + minutes + ":" + seconds;
	},
		
	/**
	 * 字符串空值判断
	 * @param str
	 * @returns {Boolean}
	 */
	isEmpty : function(str) {
		return typeof(str) == "undefined" || str == '' || str == null;
	},

	/**
	 * 字符串非空判断
	 * @param str
	 * @returns {Boolean}
	 */
	isNotEmpty : function(str) {
		return !this.isEmpty(str);
	},

	/**
	 * 字符串空值或者空白判断
	 * @param str
	 * @returns {Boolean}
	 */
	isBlank : function(str) {
		return typeof(str) == "undefined" ||str==null|| str == '' || str == 'null' || str.toString().replaceAll('\\s', '') == '';
	},
	
	/**
	 * 字符串不为空值并且不为空白判断
	 * @param str
	 * @returns {Boolean}
	 */
	isNotBlank : function(str) {
		return !this.isBlank(str);
	},

	/**
	 * x四舍五入保留digits位小数返回字符串，默认保留两位
	 * @param x 源数值
	 * @param digits 默认为2
	 * @param minDigits 最小显示位数，有值时去掉 digits到minDigits 后面的0
	 */
	fixToStr : function(x, digits, minDigits) {
		digits = (digits || digits==0) ? digits : 2;
		var f = parseFloat(x);
		if (isNaN(f)) {
			return "";
		}
		var result = f.toFixed(digits);
		if(minDigits && minDigits >= 0){
			var regExp = new RegExp("0{1," + (digits - minDigits) + "}$"); 
			result = result.replace(regExp, "");
		}
		return result;
	},
	// 两位小数点处理
	fixToStrTwodecimal : function(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return '0.00';
		}

		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');

		if (rs < 0) {
			s += '.00';
		} else {
			while (s.length <= rs + 2) {
				s += '0';
			}
		}
		return s;
	},
	// 三位小数点处理
	fixToStrThreedecimal : function(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return '0.000';
		}

		var f = Math.round(x * 1000) / 1000;
		var s = f.toString();
		var rs = s.indexOf('.');

		if (rs < 0) {
			s += '.000';
		} else {
			while (s.length <= rs + 3) {
				s += '0';
			}
		}
		return s;
	},
	// x四舍五入保留digits位小数返回数字
	fixToNum : function(x, digits) {
		return parseFloat(this.fixToStr(x, digits));
	},
	// 根据秒数和指定的格式返回local时间
	getSimpleTime : function(times, format) {
		var srcTime = new Date(times);
		return Util.isEmpty(format)?srcTime:srcTime.format(format);
	},
	getTime : function(times, format) {
		var srcTime = new Date(times * 1000);
		return Util.isEmpty(format)?srcTime:srcTime.format(format);
	},
	// 根据 秒数 和指定的格式返回UTC时间
	getUTCDate : function(times, format) {
		return this.getUTCDateFromMis(times * 1000, format);
	},
	// 根据 毫秒数 和指定的格式返回UTC时间
	getUTCDateFromMis : function(times, format) {
		var srcTime = new Date( times + new Date().getTimezoneOffset() * 60000 );
		return Util.isEmpty(format)?srcTime:srcTime.format(format);
	},
	// 返回随机请求序列
	getRandomSeq : function() {
		return Math.round(Math.random() * (999999999 - 100000000)) + 100000000;
	},

	/**
	 * 获取显示的产品代码
	 * @example Util.getShowPrdCode("GT1/PM/LLG")->LLG
	 */
	getShowPrdCode : function(v){
		return v ? v.substring(v.lastIndexOf("/") + 1).substring(v.lastIndexOf("\\") + 1) : "";
	},
	/**
	 * 功能:向上舍入(类似于excel中的roundUp)
	 */
	roundUp : function(n,f){
	   if(Util.getDecimalLen(n) <= f){
			return n;
	   }
	   var flag = false;
	   if(n < 0){
		   n = -n;
		   flag = true;
	   }
	   n = n * Math.pow(10,f);
	   n = Math.ceil(n) / Math.pow(10,f);
	   return flag ? -n : n;
	},
	/**
	 * 功能：向下舍入(类似于excel中的roundDown)
	 */
	roundDown : function(n,f){
		if(Util.getDecimalLen(n) <= f){
			return n;
		}
		var flag = false;
		if(n < 0){
			n = -n;
			flag = true;
		}
		n = n * Math.pow(10,f);
		n = Math.floor(n) / Math.pow(10,f);
		return flag ? -n : n;
	},
	/**
	 * 功能：input只能输入数字
	 */
	allowNumKeyPress : function(event) {
		var keyCode = event.which;
		if(navigator.userAgent.indexOf('Firefox') >= 0 && keyCode == 0){ // 火狐下 delete键盘 、左右方向键盘 keycode都是0,特殊处理
			return true;
		}
		if (keyCode == 46 || keyCode == 8 || (keyCode >= 48 && keyCode <= 57)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 功能：控制输入的最大值
	 * @param event     当前触发的事件
	  * @param curObj   当前对象(例如：document.getElementById("limitPrice"))
	 * @param maxValue  最大值
	 */
	allowMaxValueKeyPress : function(event,curObj,maxValue){
		var keyCode = event.which;
		if(navigator.userAgent.indexOf('Firefox') >= 0 && keyCode == 0){ // 火狐下 delete键盘 、左右方向键盘 keycode都是0,特殊处理
			return true;
		}
		if(keyCode != 46 && keyCode != 8){
			if(keyCode <48 || keyCode > 57){
				 return false;
			}
		}
		if(Util.allowInputWhenSelectKeyPress(keyCode,curObj)){
			return true;
		}
		if(curObj != null && curObj != ''){
			var curValue = curObj.value;
		    if(curValue != null && curValue != ''){
		    	var inputVal = parseFloat(curValue) + parseFloat(String.fromCharCode(keyCode));
				if(parseFloat(inputVal) > parseFloat(maxValue)){
					 return false;
				}
		    }
		}
		return true;
	},
	/**
	 * 功能：控制输入小数点的位数
	 * @param event     当前触发的事件
	 * @param curObj    当前对象(例如：document.getElementById("limitPrice"))
	 * @param maxDights 允许最大的小数位
	 */
	allowMaxDightsLenKeyPress : function(event,curObj,maxDights){
		var keyCode = event.which;
		if(navigator.userAgent.indexOf('Firefox') >= 0 && keyCode == 0){ // 火狐下 delete键盘 、左右方向键盘 keycode都是0,特殊处理
			return true;
		}
		if(keyCode != 46 && keyCode != 8){
			if(keyCode <48 || keyCode > 57){
				 return false;
			}
		}
		if(Util.allowInputWhenSelectKeyPress(keyCode,curObj)){
			return true;
		}
		var curValue = curObj.value;
		if(curValue != null && curValue != ''){
			var charCode = String.fromCharCode(keyCode) == "" ? "" : String.fromCharCode(keyCode);
			if(curValue.indexOf(".") != -1){
				if(charCode == '.'){
					return false;
				}
				if(Util.getCursorPosition(curObj) > curValue.indexOf(".") && charCode != "" && Util.getDecimalLen(curValue+charCode) > maxDights){
					return false;
				}
			}
			if(maxDights == 0){
				if(charCode == '.'){
					return false;
				}
			}
		}
		return true;
	},
	/**
	 * 功能：控制输入整数位的位数
	 * @param event     当前触发的事件
	 * @param curObj    当前对象(例如：document.getElementById("limitPrice"))
	 * @param maxIntLen 允许最大的整数位数
	 */
	allowMaxIntLenKeyPress : function(event,curObj,maxIntLen){
		var keyCode = event.which;
		if(navigator.userAgent.indexOf('Firefox') >= 0 && keyCode == 0){ // 火狐下 delete键盘 、左右方向键盘 keycode都是0,特殊处理
			return true;
		}
		if(keyCode != 46 && keyCode != 8){
			if(keyCode <48 || keyCode > 57){
				 return false;
			}
		}
		if(Util.allowInputWhenSelectKeyPress(keyCode,curObj)){
			return true;
		}
		var curValue = curObj.value;
		if(curValue != null && curValue != ''){
			var curIntValue = curValue.split(".")[0];
			var charCode = String.fromCharCode(keyCode) == "" ? "" : String.fromCharCode(keyCode);
			if(curValue.indexOf(".") != -1){
				if((Util.getCursorPosition(curObj) <= curValue.indexOf(".")) && Util.getIntLen(curIntValue+charCode) > maxIntLen){
					return false;
				}
			}else{
				if(Util.getIntLen(curIntValue+charCode) > maxIntLen){
					return false;
				}
			}
		}
		return true;
	},
	/**
	 * 功能：判断当用鼠标选中input内容时,是否允许输入键盘字符(限制输入非数字)
	 */
	allowInputWhenSelectKeyPress : function(keyCode,curObj){
		var agt=navigator.userAgent.toLowerCase();
		var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("omniweb") == -1));
		var selection = "";  
		if(!ie){
			if (curObj.selectionStart!= undefined) {   
				selection = curObj.value.substr(curObj.selectionStart, curObj.selectionEnd-curObj.selectionStart);   
		    }
			return selection != "" ? true : false;
		}else{   
			if(document.selection){
				selection = document.selection.createRange().text;
			}else{   
			    selection = window.getSelection();   
		    }
		    return selection != "" ? true : false;
	   }
	},
	/**
	 * 功能：获取input光标的位置
	 * @param input 当前对象(例如：document.getElementById("limitPrice"))
	 */
	getCursorPosition : function(input){
		if(navigator.userAgent.indexOf("MSIE")>0){
			var cuRange=document.selection.createRange();
			var tbRange=input.createTextRange();
			tbRange.collapse(true);
			tbRange.select();
			var headRange=document.selection.createRange();
			headRange.setEndPoint("EndToEnd",cuRange);
			var pos=headRange.text.length;
			cuRange.select();
			return pos;
		}
		else{
			return input.selectionStart;
		}
	},
	/**
	 * 功能：键盘放下时限制输入框数字
	 *   1)先把非数字的都替换掉，除了数字和.
	 *   2)必须保证第一个为数字而不是.
	 *   3)保证只有出现一个.而没有多个.
	 *   4)保证.只出现一次，而不能出现两次以上
	 */
	allowNumKeyUp : function(curObj){
		if(curObj != null && curObj != ''){
		var curValue = curObj.value;
		if(isNaN(curValue)){
			curObj.value = curValue.replace(/[^\d.]/g,"").replace(/^\./g,"")
			                       .replace(/\.{2,}/g,".").replace(".","$#$")
			                       .replace(/\./g,"").replace("$#$",".");
		}}
	},
	/**
	 * 功能：spinner只能输入数字
	 */
	allowNumKeyPressSpinner : function(){
	    var re = /^\d+(?=\.{0,1}\d+$|$)/;
		if(!re.test($(this).val())){
			$(this).val("");
			$(this).focus();
			return;
		}
	},
	/**
	 * 功能：获取整数位的长度
	 */
	getIntLen : function(n){
		n = $.trim(n);
		var arr = n.toString().split(".");
		return arr[0].length;
	},
	/**
	 * 功能：获取小数位的长度
	 */
	getDecimalLen : function(n){
		var arr = n.toString().split(".");
		if(arr.length == 1){
			return 0;
		}else{
			return arr[1].length;
		}
	},
	maxLength: function(maxLength) {
        var $textBox = this;
        $textBox.unbind("input propertychange change");
        $textBox.bind("input propertychange change", function() {
            var val = $textBox.val().toString();
            if (val.length > maxLength) {
                $textBox.val(val.substring(0, maxLength));
            }
        });
    }
};

/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds() // millisecond
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
/**
 * 数字精确加法;
 */
Number.prototype.add = function (arg){
	return Util.accAdd(arg,this);
};
/**
 * 数字精确减法;
 */
Number.prototype.sub = function (arg){
	return Util.accSub(this,arg);
};
/**
 * 数字精确乘法;
 */
Number.prototype.mul = function (arg){
	return Util.accMul(arg,this);
};
/**
 * 数字精确除法;
 */
Number.prototype.div = function (arg){
	return Util.accDiv(this,arg);
};

/**
 * 数字精确加法;
 */
String.prototype.add = function (arg){
	return Util.accAdd(arg,this);
};
/**
 * 数字精确减法;
 */
String.prototype.sub = function (arg){
	return Util.accSub(this,arg);
};
/**
 * 数字精确乘法;
 */
String.prototype.mul = function (arg){
	return Util.accMul(arg,this);
};
/**
 * 数字精确除法;
 */
String.prototype.div = function (arg){
	return Util.accDiv(this,arg);
};

/**
 * @example
 *     var cls = 'my-class', text = 'Some text';
 *     var s = String.format('<div class="{0}">{1}</div>', cls, text); // s now contains the string: '<div class="my-class">Some text</div>'
 *
 * @param {String} string The tokenized string to be formatted.
 * @param {Mixed...} values The values to replace tokens `{0}`, `{1}`, etc in order.
 * @return {String} The formatted string.
 */
String.format = function(format) {
	if (!format || arguments.length == 0) return "";
	var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
};


var index={
	//初始化
	init:function(){
		this.tabClick();
		//this.localeChange();
		this.initDisclaimer();
	},
	//tab点击
	tabClick:function(){
		$("#quoted-price-fl li").on('click', function(){  //报价
			$(".scroll-data").hide();
			var li=$("#quoted-price-fl li");
			li.removeClass("on-na");
			$($(".scroll-data").get(li.index(this))).show();
			$(this).addClass("on-na");
			
		});
		$("#investment-entrust-fl li").on('click', function(){ //投资组合&委托
			var li=$("#investment-entrust-fl li");
			var navNum = li.index($(this));  //获取tab标签的索引值
			$(this).addClass("on-na").siblings().removeClass("on-na");
			$("#investment-entrust-cont").children("div").eq(navNum).show().siblings().hide();
			if(Util.isNotBlank($(this).attr("tn"))){
				var oTable = $('#'+$(this).attr("tn")).dataTable();
				if($(this).attr("tn")=="accountSummaryTable"){
					AccountSummary.onUpdate();//更新状态
				}
				if(oTable.length >0){
					$(".dataTables_scrollHeadInner",$("#investment-entrust-cont")).width("100%");
					$('#'+$(this).attr("tn")).width("100%");
					oTable.fnAdjustColumnSizing();
				}
			}
		});
		//$("#investment-entrust-fl li[tn='accountPositionsTable']").click();
	},
	
	initDisclaimer : function () { // 免责声明 
		var disDialog = $("#disclaimerDiv");
		disDialog.dialog({
			autoOpen: false,
			modal: true,
			resizable: false,
			width: 600,
			height: 450
		});
		$("#disclaimer").on('click', function(){
			disDialog.dialog( "open" );
		});
		/*$("#disclaimer_btnok").on('click', function(){
			disDialog.dialog( "close" );
		});*/
	}
};

/**
 * 消息提示框
 */
var MsgDialog = {
	$alertDiv : null,
	$confirmDiv : null,
	init : function() {
		this._createMsgDialog();
	},
	_createMsgDialog : function() {
		this.$alertDiv = $('<div title="提示" class="dn"><p class="mm-fail-p content"></p><p class="more-lls-btn gez-btninfo del-wid btns"></p></div>').appendTo("body");
		this.$alertDiv.dialog({
			closeOnEscape: false,
			autoOpen: false,
			modal: true,
			resizable: false,
			minWidth: 350
		});
		this.$confirmDiv = $('<div title="提示" class="dn"><p class="mm-fail-p content"></p><p class="more-lls-btn gez-btninfo btns"></p></div>').appendTo("body");
		this.$confirmDiv.dialog({
			closeOnEscape: false,
			autoOpen: false,
			modal: true,
			resizable: false,
			minWidth: 350
		});
	}
};

$(function() {
	index.init(); //加载index对象
	MsgDialog.init();
});

/**
 * 提示框
 * Confirm({
		title : "标题",
		content : "消息内容",
		okValue : "确定",--按钮
		ok : function(){}--确定事件,
		cancelValue : "取消",--按钮
		cancel : function(){}--取消事件
	});
 */
function Confirm(options) {
	options = $.extend({ $div : MsgDialog.$confirmDiv }, options);
	var $dlg = options.$div;
	var $content = $dlg.find('.content');
	var $btnset = $dlg.find('.btns');

	if (options.title)
		$dlg.dialog( "option", "title", options.title );

	if (options.content)
		$content.html(options.content);

	$btnset.children().remove();

	if (options.isAlert) {
		$dlg.on( "dialogclose", function( event, ui ) {
			if ($.isFunction(options.ok))
				options.ok();
		});
	}
	if (options.okValue) {
		$('<a href="javascript:">' + options.okValue + '</a>').appendTo($btnset)
			.on('click', function () {
				if ($.isFunction(options.ok))
					options.ok();
				$dlg.dialog( "close" );
            });
	}
	if (options.cancelValue) {
		$('<a href="javascript:">' + options.cancelValue + '</a>').appendTo($btnset)
			.on('click', function () {
				if ($.isFunction(options.cancel))
					options.cancel();
				$dlg.dialog( "close" );
            });
	}

	$dlg.dialog( "open" );
};

/**
 * 提示框alert
 * @example Alert("this is alert"); 或者 Alert("this is alert", function(){ // do some thing });
 */
var Alert = function(msg, okfun) {
	if($("#index_version").val()=="dt"){
		Confirm({
			$div : MsgDialog.$alertDiv,
			content : msg,
			okValue : i18n.ok,//確定
			ok : okfun || true,
			isAlert : true
		});
	}else{
		/**
		 * 消息提示框
		 */
		var alertBoxDiv=$('<div class="layer-box dn">'+
		  '<div class="layer-con layer-con-weit">'+
			'<h3 style="text-align:center">'+i18n.message+'</h3>'+
			'<div class="lay-kuang-fon">'+
			  '<div class="lay-kuang-con">'+
			    '<p tn="content" class="vis_tip"></p>'+
			    '<p class="more-lls-btn gez-btninfo"><a href="javascript:" class="gez-qx-btn">'+i18n.closed+'</a></p>'+
			'</div></div></div></div>');
		 alertBoxDiv.dialog({
			closeOnEscape: false,
			modal: true,
			autoOpen: false,
			resizable: false,
			minWidth: 300
		});
		 $("p[tn=content]",alertBoxDiv).html(msg);
		 $(".ui-dialog-titlebar-close",alertBoxDiv.parent()).hide();
		 alertBoxDiv.dialog("open");
		 $(".gez-qx-btn",alertBoxDiv).click(function(){
			 if($.isFunction(okfun)){
				 okfun();
			 }
			 alertBoxDiv.dialog("close");
		 });
	}
};
var AlertWithOK = function(msg, okfun) {
	if($("#index_version").val()=="dt"){
		Confirm({
			$div : MsgDialog.$alertDiv,
			content : msg,
			okValue : i18n.ok,//確定
			ok : okfun || true,
			isAlert : true
		});
	}else{
		/**
		 * 消息提示框
		 */
		var alertBoxDiv=$('<div class="layer-box dn">'+
		  '<div class="layer-con layer-con-weit">'+
			'<h3 style="text-align:center">'+i18n.message+'</h3>'+
			'<div class="lay-kuang-fon">'+
			  '<div class="lay-kuang-con">'+
			    '<p tn="content" class="vis_tip"></p>'+
			    '<p class="more-lls-btn gez-btninfo"><a id="gez_ok_btn" href="javascript:">'+i18n.ok+'</a></p>'+
			'</div></div></div></div>');
		 alertBoxDiv.dialog({
			closeOnEscape: false,
			modal: true,
			autoOpen: false,
			resizable: false,
			minWidth: 300
		});
		 $("p[tn=content]",alertBoxDiv).html(msg);
		 $(".ui-dialog-titlebar-close",alertBoxDiv.parent()).hide();
		 alertBoxDiv.dialog("open");
		 $("#gez_ok_btn",alertBoxDiv).click(function(){
			 if($.isFunction(okfun)){
				 okfun();
			 }
			 alertBoxDiv.dialog("close");
		 });
	}
};
/**
 * 清空数组
 */
clearArray=function(ary)
{
	if(ary!=null&&ary.length>0)
	{
		ary.splice(0,ary.length);  
	}
};

/**
 * 根据prdid获取prdcode
 */
getPrdCodeByPrdId = function(prdid){
	var prdcode;
	if(prdid=='0')
		prdcode = '022';
	else if(prdid=='1')
		prdcode = '023';
	return prdcode;
};

/**
 * 根据prdcode获取prdid
 */
getPrdIdByPrdCode = function(prdcode){
	var prdid;
	if(prdcode=='022'){
		prdid = '0';
	}
	else if(prdcode=='023'){
		prdid = '1';
	}
		
	return prdid;
};

/**
 * 获取当前用户的保证金;
 * 逻辑:若是定制保证金去定制, 不是去通用保证金.用户开仓平仓委托下单
 */
getUserMargin = function(prdcode){
	var symbolObj;
	var customMargin; //如果是0-则是非定制; 不是0就是定制
	if(prdcode=='022'||prdcode=='0'){
		symbolObj = Tick.gold.symbol;
		customMargin = accountBaseInfo.goldinimargin;
	}
	else if(prdcode=='023'||prdcode=='1'){
		symbolObj = Tick.silver.symbol;
		customMargin = accountBaseInfo.silverinimargin;
	}

	if(isHoliday){
		return Util.fixToStrTwodecimal(symbolObj.holidaymargin);
	}
	
	if(isWeekend){
		return Util.fixToStrTwodecimal(symbolObj.weekendmargin);
	}
	
	if(customMargin==0)//非定制,取symbolobj中的
		return Util.fixToStrTwodecimal(symbolObj.inimargin);
	else 
		return Util.fixToStrTwodecimal(customMargin);
};
/**
 * 系统cookie类
 */
var SystemCookie={
	account:"",	
    init:function(account){
    	this.account=account;
    },
	setTradeVol:function(prcode,vol){
		$.cookie(this.account+"_tVolume_"+prcode,vol,{expires:3650});//有效期为10年
	},
    getTradeVol:function(prcode){
		return $.cookie(this.account+"_tVolume_"+prcode);
	},
	setDayNight:function(val){
		$.cookie(this.account+"_dayNight",val);//浏览器关闭后清除
	},
	getDayNight:function(){
		return $.cookie(this.account+"_dayNight");
	},
	setMarginLevel:function(isWarn){
		$.cookie(seesion_login_uid+"_MarginLevel",isWarn);//根据sessionid每次进入都弹出
	},
	getMarginLevel:function(){
		return $.cookie(seesion_login_uid+"_MarginLevel");
	}
};

