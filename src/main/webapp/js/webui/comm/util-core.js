/**
 * 改文件用于存放工具函数或数学函数，均面向对象编写
 */

var utils = {

	/**
	 * 去保留2位小数
	 * 
	 * @param x
	 */
	changeTwoDecimal : function(x) {
		var f_x = parseFloat(x);
		if (isNaN(f_x)) {
			alert('function:changeTwoDecimal->parameter error');
			return false;
		}
		var f_x = Math.round(x * 100) / 100;

		return f_x;
	},

	/**
	 * 时间转换, timestamp转换为HH:MM:SS
	 * 
	 * @param x
	 */
	timestampToHHMMSS : function(x) {
		var tmpDate = new Date(x);
		return tmpDate.getHours() + ":" + tmpDate.getMinutes() + ":" + tmpDate.getSeconds();
	}

};