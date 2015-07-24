var bulletionArray = [];
var bulletionArray_temp= [];
$(function() {
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
				/*if(isLogined && bulletionArray.length > 0&&$("#index_leftGg").attr("tn")!="true"){
					$('#btn_menu_bulletin_01').click();
				}*/
			}, 500);
		}
	}});
	
});
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
	if(bulletionArray.length == 0 ){
		bulletionArray.push(param);
	}else{
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
		}
	}
	findBulletinList();
};

/**
 * 功能：清空数组中公告信息
 */
clearBulletinFromArray  = function(){
	bulletionArray = [];
	bulletionArray_temp = [];
};

/**
 * 功能：从数组中删除对应的公告
 */
deleteBulletinFromArray = function(data){
	for (var i = 0; i < bulletionArray.length; i++) {
		if (bulletionArray[i].id == data.bulletinid) {
			bulletionArray.remove(i);
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
		var liStr="",rollLiStr="";
		for (var i = 0; i < len; i++) {
			var eachBulletin = bulletionArray[i];
			if(eachBulletin.flags==1 || i18n.lang != eachBulletin.lang){
				continue;
			}
	    	rollLiStr += "<li style='background:none;padding:6px 0px 6px 2px;'>"+eachBulletin.text+"&nbsp;&nbsp;&nbsp"+Util.getUTCDate(eachBulletin.time/1000,"yyyy-MM-dd")+"</li>";
		    liStr+="<li style='background:none;padding:6px 0px 6px 2px;'>";
			liStr+="<p class='gg-time'>"+ Util.getUTCDate(eachBulletin.time/1000,i18n.bulletin.dateFormat)+"</p>"+"<p class='gg-coninfo'>"+eachBulletin.text+"</p>";
			liStr+="</li>";
		}
		
		if(liStr==""){
			 $("#noRecord").show();
	   		 $("#bulletinUL").hide();
	   		 $("#newsGong ul li").remove();
	   		 $("#newsGong ul").append("<li style='background:none;padding:6px 0px 6px 2px;'>"+i18n.bulletin.noRecord+"</li>");
		}else{
			 $("#bulletinUL").append(liStr);
	   		 $("#newsGong ul li").remove();
	   		 $("#newsGong ul").append(rollLiStr == "" ? "<li style='background:none;padding:6px 0px 6px 2px;'>"+i18n.bulletin.noRecord+"</li>" : rollLiStr);
	   		 //對於帶鏈接公告，彈出新窗口處理
			 $(".gg-coninfo a").each(function(){
					$(this).attr("target","_blank");
			});
	    }
	}else{
	    $("#noRecord").show();
	    $("#bulletinUL").hide();
	    $("#newsGong ul li").remove();
	    $("#newsGong ul").append("<li style='background:none;padding:6px 0px 6px 2px;'>"+i18n.bulletin.noRecord+"</li>");
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
		
	$("#bulletinNotice").hide();
	var neverShow = false;
	$("#bulletinNotice_never").click(function(){
		$("#bulletinNotice").hide();
		neverShow = true;
	});
	$("#bulletinNotice_check").click(function(){
		$("#bulletinNotice").hide();
		$('#btn_menu_bulletin_01').click();
	});
	
	// 公告提示
	function showBulletinNotice(){
		if(neverShow == false){
			$("#bulletinNotice").show();
			setTimeout(function(){
				$("#bulletinNotice").hide();
			}, "8000");	
		}
	}

	var orderEnd = false;
	socket.listeners.$after({'OrderEnd':function(){
			if(orderEnd == true){
				return;
			}
			orderEnd = true;
			// 如果有公告顯示提示
			if(isJustLogined && bulletionArray.length > 0){
				//showBulletinNotice();
			}
			// 再有新公告，彈出提示
			socket.listeners.$after({'bulletin_add': function(para, data) {
				if((para.flags == 0 || para.flags == 2) && i18n.lang == para.lang){
					// return if existed.
					for (var i = 0; i < bulletionArray_temp.length; i++) {
						if (bulletionArray_temp[i].id == para.id) {
							return;
						}
					}
					showBulletinNotice();
				}
			}});
		}
	});
});
