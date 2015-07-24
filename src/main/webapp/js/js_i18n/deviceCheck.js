var deviceCheck={
	sUserAgent:navigator.userAgent.toLowerCase(),
	isMobile:function(){
		var bIsIpad = this.sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = this.sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = this.sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = this.sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = this.sUserAgent.match(/ucbrowser/i) == "ucbrowser";
		var bIsAndroid = this.sUserAgent.match(/android/i) == "android";
		var bIsCE = this.sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = this.sUserAgent.match(/windows mobile/i) == "windows mobile";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
	},
	isPc:function(){
		var platform=navigator.platform.toLowerCase();
		var isWin =/win32|windows|win64/g.test(platform);
		var isMac =/mac68K|macppc|macintosh|macintel/g.test(platform); 
		var isLinux = platform.indexOf("linux") > -1; 
		var isWinNT = this.sUserAgent.indexOf("windows nt") > -1 
			|| this.sUserAgent.indexOf("windows xp") > -1 || this.sUserAgent.indexOf("windows 7") > -1 || this.sUserAgent.indexOf("windows 8") > -1; 
		return (isWin && isWinNT) || (isMac) || (isLinux);
	}
};
/**
 * 浏览器历史/缓存处理类
 */
var browserHistory={
	logoutKey:"logout",
	init:function(){
		 this.checkAccountSatus(); //定时检查用户状态，保持用户会话和UCWEB SID不失效;
	},
	setKey:function(){
		if(history && history.pushState!=undefined && bodyShow ){
			var _this=this;
			history.pushState(_this.logoutKey,_this.logoutKey,location.href);
			window.onpopstate = function(e){
				if(session_device_type=="mb"){
					  $("#btn_menu_logout_btn_01,#btn_menu_logout_btn_02").click();
				  }else{
					  $("#logout_btn").click();
				  }
				  history.pushState(_this.logoutKey,_this.logoutKey, location.href);
			};
		}
	},
	checkAccountSatus:function() {
		var ptype = $("#index_version").val(); //登陆的是移动版还是桌面版
		$.get(Global.contextPath + "/AccountStatus.action?check=ajax&t=" + new Date().getTime()+"&ptype="+ptype ,
			function(result){
				console.log(result);
			}
		);
		setTimeout(browserHistory.checkAccountSatus, (60 * 1000));
	}
};

$(function() {
	if(!deviceCheck.isMobile() && !deviceCheck.isPc() && $("#version_tip_div").length>0){
		$("#con-bgbox").hide();
		$("#version_tip_div").show();
	}
	if(deviceCheck.isPc() && /.?(msie)\s?[0-7]\.([0-9]+).*/g.test(deviceCheck.sUserAgent) && $("#brower_tip_div").length>0){
		$("#con-bgbox").hide();
		$("#brower_tip_div").show();
	}
	if(deviceCheck.sUserAgent.match(/ucbrowser/i) == "ucbrowser"){
		var control = navigator.control || {};
		if (control.gesture) {
		    control.gesture(false);
		}
	}

});

