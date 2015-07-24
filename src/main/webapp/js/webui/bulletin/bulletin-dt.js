	var bulletionArray = [];
	var bulletionArray_temp= [];
/**
 * 切换语言
 * @param language zh_CN/zh_TW
 */
function setLanguage(lang) {
	if($("#index_lang").val()==lang){
		return;
	}
	var form = document.getElementById("adminForm");
	$("#index_lang").val(lang);
	form.submit();
}




function swapStyleSheet(obj){
	var cssvalue = document.getElementById("indexcss").getAttribute("href");
	if(obj.id == 'change_to_day'){
		if(cssvalue.indexOf("night") > 0){
			cssvalue = cssvalue.replace("index-night", "index");	
		}
		WebUiChart.setTheme("Light");
		SystemCookie.setDayNight("day");
	}else if(obj.id == 'change_to_night'){
		if(cssvalue.indexOf("night") < 0){
			cssvalue = cssvalue.replace("index", "index-night");	
		}
		WebUiChart.setTheme("Dark");
		SystemCookie.setDayNight("night");
	}
	//由于引入执行2次，进行判断处理。已经处理过不进行下面互换操作
	if($("#"+obj.id).parent().children("a:eq(0)").attr("id")==obj.id){
		return;
	}
	//swap id & display value
	var nightElement = document.getElementById("change_to_night");
	var dayElement = document.getElementById("change_to_day");
	
	var dayElementHtml = $("#"+dayElement.id).html();
	
	var iclass= dayElementHtml.indexOf("m-icon12a") != -1 ? "m-icon12" : "m-icon12a";
	
	if(dayElementHtml.indexOf("<s>") != -1){
		$("#"+dayElement.id).html ("<i class='"+iclass+"'></i>"+i18n.nightcss + "<s></s>");	
		$("#"+nightElement.id).html("<i class='"+iclass+"'></i>" + i18n.daycss);
	}else{
		$("#"+dayElement.id).html ("<i class='"+iclass+"'></i>"+i18n.nightcss );	
		$("#"+nightElement.id).html("<i class='"+iclass+"'></i>" + i18n.daycss+ "<s></s>");
	}
	
	
	dayElement.id = 'change_to_night';
	nightElement.id = 'change_to_day';
	
	
	document.getElementById("indexcss").setAttribute("href",   cssvalue);
}

$(function() {	
	//在线客服
	$('.left-nav4').on('click', function(){
		var url="http://www.onlineservice-hk.com/k800/chatClient/chatbox.jsp?companyID=209&enterurl=http%3A%2F%2Fwww%2E24k%2Ehk%2Findex%2Ehtml&tm=1346658342836";
		window.open (url,'Live800Chatindow','height=520,width=740,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	});	
	
	//QQ 在线客服
	$('.left-nav7').on('click', function(){
		window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=800018282&cref=&ref=&f=1&ty=1&ap=&as=', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no'); 
	});	
	
	$("#locale_change_sele,#other_change_sele").mouseover(function () {
		$("#other_change_sele").removeClass("dn");
	});
	
	$("#locale_change_sele, #other_change_sele").mouseout(function () {
		$("#other_change_sele").addClass("dn");
	});
	
	$("#change_to_full_ver,#change_to_mini_ver").mouseover(function () {
		$("#change_to_mini_ver").addClass("jbban-icon");
	});
	
	$("#change_to_full_ver, #change_to_mini_ver").mouseout(function () {
		$("#change_to_mini_ver").removeClass("jbban-icon");
	});
	
	
	
	$("#gotofront_deposite,#gotofront_withdrew,#gotofront_main").mouseover(function () {
		$("#gotofront_withdrew").addClass("jbban-icon").show();
		$("#gotofront_main").addClass("jbban-icon").show();
	});
	
	$("#gotofront_deposite,#gotofront_withdrew,#gotofront_main").mouseout(function () {
		$("#gotofront_withdrew").removeClass("jbban-icon").hide();
		$("#gotofront_main").removeClass("jbban-icon").hide();
	});
	
	
	
	$("#change_to_full_ver, #change_to_mini_ver").mouseout(function () {
		$("#change_to_mini_ver").removeClass("jbban-icon");
	});
	
	$("#change_to_full_ver,#change_to_mini_ver").click(function(){
		if(this.id=="change_to_full_ver"&&$("#index_version").val()=="dt"){
			return;
		}
		var form = document.getElementById("adminForm");
		$("#index_version").val((this.id=="change_to_full_ver")?"dt":"mb");
		form.submit();	
	});
	$("#change_to_night, #change_to_day").mouseover(function () {
		var changeToNightObj = document.getElementById("change_to_night");
		if(!Util.isEmpty(changeToNightObj.getAttribute("onclick"))){
			$("#change_to_night").addClass("hei-bai-icon");
		}else{
			$("#change_to_day").addClass("hei-bai-icon");
		}
		
	});
	
	$("#change_to_night, #change_to_day").mouseout(function () {
		var changeToNightObj = document.getElementById("change_to_night");
		if(!Util.isEmpty(changeToNightObj.getAttribute("onclick"))){
			$("#change_to_night").removeClass("hei-bai-icon");
		}else{
			$("#change_to_day").removeClass("hei-bai-icon");
		}
		
	});
	
	// OrderEnd listener
	var orderEnd = false;
	socket.listeners.$add({'OrderEnd': function(para, data) {
		// login success
		if(para.code == 0){
			if(orderEnd == true){
				return;
			}
			orderEnd = true;
			
			setTimeout(function(){
//				去掉登陆时的公告弹窗
//				if(isLogined && bulletionArray.length > 0&&$("#leftGg").attr("tn")!="true"){
//					openBulletWin("#leftGg");
//				}
				$('.left-nav3').on('click', function(){
					openBulletWin('#leftGg');
				});
				
				// 设置公告滚动
			  /*  $("#newsGong").marquee({
			        direction:"left",
			        speed:30
			    });*/
			}, 500);
		}
	}});
	
});


/**
 * 功能：打开公告dialog对话框
 */
openBulletWin = function(bulletId){
	$("#bulletinNotice").hide();
	$(bulletId).dialog({
		closeOnEscape: false,
		title:i18n.bulletin.title,
		resize:false,
		width: "600",
        height: "450",
		modal: true
	});
	findBulletinList();
	if($("#bulletinUL li").length > 1){
		$("#bulletinUL li:odd").addClass("l-gg-bg");
	}
};

/**
 * 功能：将公告相关信息保存到数组中
 */
saveBulletinToArray = function(data){
	var param = {
		"id" :data.id,
		"lang" : data.lang,
		"flags" : data.flags,//0是弹出 1是滚动 2是全部
		"time" : data.time,
		"subject" : data.subject,
		"text" : data.text,
		"curLang" : Global.currentLanguage
	};
	var flag = false;
	for(var i=0;i<bulletionArray.length;i++){
		if(bulletionArray[i]['id'] == data.id){
			bulletionArray[i] = param;
			flag = true;
			break;
		}
	}
	if(!flag){
		bulletionArray.push(param);
		if(param.flags!=0 && i18n.lang == data.lang){
			$("#newsGong ul").append("<li bid=\"" + param.id + "\">"+param.text+"&nbsp;&nbsp;&nbsp"+Util.getUTCDate(param.time/1000,"yyyy-MM-dd")+"</li>");
		}
	}
};

/**
 * 功能：清空数组中公告信息
 */
clearBulletinFromArray  = function(){
	bulletionArray = [];
	bulletionArray_temp = [];
	$("#newsGong li").remove();
};

/**
 * 功能：从数组中删除对应的公告
 */
deleteBulletinFromArray = function(data){
	for (var i = 0; i < bulletionArray.length; i++) {
		if (bulletionArray[i].id == data.bulletinid) {
			bulletionArray.remove(i);
			$("#newsGong ul li").remove("[bid='" + data.bulletinid + "']");
			break;
		}
	}
	findBulletinList();
};

/**
 * 初始化公告请求
 */
initBulletinAsk = function(){
	var lang = Constant.GT1_LANG_CHINESE_TRAD;
	if(Global.currentLanguage == "zh_CN"){
		lang = Constant.GT1_LANG_CHINESE_SIMP;
	}
	if(Global.currentLanguage == "zh_TW"){
		lang = Constant.GT1_LANG_CHINESE_TRAD;
	}
};

/**
 * 功能：从数组中加载相关公告信息
 */
findBulletinList = function(){
	var len = bulletionArray.length;
	if(len > 0){
		bulletionArray.sort(compareTo);
		$("#bulletinUL").show();
	    $("#noRecord").hide();
	    $("#bulletinUL li").remove();
		var liStr="";
		for (var i = 0; i < len; i++) {
			var eachBulletin = bulletionArray[i];
			if(eachBulletin.flags==1 || i18n.lang != eachBulletin.lang){
				continue;
			}
		    liStr+="<li>";
			liStr+="<p class='gg-time'>"+ Util.getUTCDate(eachBulletin.time/1000,i18n.bulletin.dateFormat)+"</p>"+"<p class='gg-coninfo'>"+eachBulletin.text+"</p>";
			liStr+="</li>";
		}
		if(liStr==""){
			$("#noRecord").show();
		    $("#bulletinUL").hide();
		}else{
			$("#bulletinUL").append(liStr);
			//對於帶鏈接公告，彈出新窗口處理
			 $(".gg-coninfo a").bind("click",function(){
				    var url=$(this).attr("href");
				    window.open(url) ;
			 });
		}
	}else{
	    $("#noRecord").show();
	    $("#bulletinUL").hide();
	}
};

/**
 * 功能：公告按时间倒序排列
 * 
 */
compareTo = function(a,b){
    var iNum1 = parseInt(a.time);
    var iNum2 = parseInt(b.time);
    if(iNum1 < iNum2){
        return 1;
    }else if(iNum1 > iNum2){
        return -1;
    }else{
        return 0;
    }
};
function bulletionArray_temp_push(){
	bulletionArray_temp=[];
	if(bulletionArray.length>0){
		for(var i=0;i<bulletionArray.length;i++){
			bulletionArray_temp.push(bulletionArray[i]);
		}
	}
}

// 公告提示
$(function(){
	
	socket.listeners.$add({'bulletin_add': function(para, data) {
		bulletionArray_temp_push();
		saveBulletinToArray(para);
	}});
	
	socket.listeners.$add({'bulletin_del': function(para, data) {
		deleteBulletinFromArray(para);
		bulletionArray_temp_push();
	}});
	
	// 推送消息
	$("#instant_msg").hide();
	$("#instant_msg_close_btn").click(function(){
		$("#instant_msg").hide();
	});
	newsSocket.listeners.$add({'PushMsg' : function(para, data){
		//0:zh, 1:tw, 2:en
		if(i18n.lang == para.lang){
			// 彈出氣泡消息。
			$("#instant_msg_title").html(para.title);
			$("#instant_msg_content").html(para.content);
			$("#instant_msg_link").html("");
			$("#instant_msg_link").append($("#instant_msg_content").find("a"));
			$("#instant_msg_content").find("a").remove();
			$("#instant_msg").show();
//			setTimeout(function(){
//				$("#instant_msg").hide();
//			}, "10000");
		}
	}});
	
	$("#bulletinNotice_btn_close").click(function(){
		$("#bulletinNotice").hide();
	});
	
	$("#bulletinNotice_check").click(function(){
		$("#bulletinNotice").hide();
		// open bulletin dialog
		openBulletWin('#leftGg');
	});

	/*// 公告提示
	function showBulletinNotice(){
		if(neverShow == false){
			$("#bulletinNotice").show();
			setTimeout(function(){
				$("#bulletinNotice").hide();
			}, "8000");	
		}
	}*/
	
	// 公告提示
	function showBulletinNoticeNew(noticeObject){
		$("#bulletinNotice").show();
		var noticeText = noticeObject.text;
		$("#bulletinNotice_text").text(noticeText);
	}

	var orderEnd = false;
	socket.listeners.$after({'OrderEnd':function(){
			if(orderEnd == true){
				return;
			}
			orderEnd = true;
			// 如果有公告顯示提示
			if(isJustLogined == true && bulletionArray.length > 0){
				//showBulletinNotice();
			}
			if(bulletionArray.length>0){
				var tmpNewsAmount=0;
				var len = bulletionArray.length;
				if(len > 0){
					for (var i = 0; i < len; i++) {
						var eachBulletin = bulletionArray[i];
						if(eachBulletin.flags==1 || i18n.lang != eachBulletin.lang){
							continue;
						}else{
							tmpNewsAmount++;
						}
					}
				}
				$("#nav_news_tnum").text(tmpNewsAmount);
			}else{
				$("#nav_news_tnum").removeClass("tnum");
			}
			// 再有新公告，彈出提示
			socket.listeners.$before({'bulletin_add': function(para, data) {
					if((para.flags == 0 || para.flags == 2) && i18n.lang == para.lang){
						// return if existed.
						for (var i = 0; i < bulletionArray_temp.length; i++) {
							if (bulletionArray_temp[i].id == para.id) {
								return;
							}
						}
						showBulletinNoticeNew(para);
					}
			}});
		}
	});
	
});
