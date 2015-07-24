/**
 * 焦点控制类
 */
var FocusManage={
	dialogFocus:function(dialogId,tableId){
		$(tableId).hide();
		$(dialogId).dialog("open");
		$(tableId).show();
	}
};

$(function() {
	//样式切换方法
	function replaceCssLink(oldfname, newfname){
			var allLink=document.getElementsByTagName("link");
			for (var i=0;i<allLink.length;i++){
				if (allLink[i] && allLink[i].href!=null && allLink[i].href.indexOf(oldfname)!=-1){
					var link=document.createElement("link");
					link.setAttribute("rel", "stylesheet");
					link.setAttribute("type", "text/css");
					link.setAttribute("href",allLink[i].href.replace(oldfname,newfname));
					allLink[i].parentNode.replaceChild(link, allLink[i]);
					break;
				}
			}
		}
	//首页板块显示
	function showSetting(){
		$("#btn_tab_div_back").hide();
		if(jq_ui_isMobile){
			$("#btn_menu_investment").parent("li").show();
			$("#index_tab_div").append($("#index_investment_div"));
			$("#index_connect_tip").hide();
		}else{
			$("#btn_menu_investment").parent("li").hide();
			$("#index_investment_div").show();
		}
	}

	//调整投资组合模块的数据列表样式
	function adjustDataTable(){
		var obj=$("#investment-entrust-fl li[class='on-na']");
		if(obj.length >0){
			$(".dataTables_scrollHeadInner",$("#investment-entrust-cont")).width("100%");
			$("#"+obj.attr("tn")).width("100%");
			$("#"+obj.attr("tn")).dataTable().fnAdjustColumnSizing();
		}
	}
	
	//底部菜单弹出
	$("#menu-layer").click(function(){
		$(".menu-tan-box").toggle();
	});
   
	document.onclick=function(e){
       var e=e?e:window.event;
       var tar = e.srcElement||e.target;
       if($(tar).parents("#footer").length==0){
    	   $(".menu-tan-box").hide();
       }
   };
	
	//在线客服
	$('#btn_menu_online_01,#btn_menu_online_02,#btn_box_online').on('click', function(){
		var url="http://www.onlineservice-hk.com/k800/chatClient/chatbox.jsp?companyID=209&enterurl=http%3A%2F%2Fwww%2E24k%2Ehk%2Findex%2Ehtml&tm=1346658342836";
		window.open (url,'Live800Chatindow','height=520,width=740,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	});	
	
	//QQ 在线客服
	$('#btn_menu_qq_01,#btn_menu_qq_02,#btn_box_qq').on('click', function(){
		window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=800018282&cref=&ref=&f=1&ty=1&ap=&as=', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no'); 
	});	
	//登出
	$("#btn_menu_logout_btn_01,#btn_menu_logout_btn_02").on('click',function(){
		$(".menu-tan-box").hide();
		$("#div_logout_confirm").dialog({
			closeOnEscape: false,
			resizable: false,
			minWidth: 300,
			modal: true
		});	
		$(".ui-dialog-titlebar-close", $("#div_logout_confirm").parent()).hide();
		$("#btn_logout_confirm").click(function(){
			location.href = Global.contextPath + "/LogOff.action?t=" + new Date().getTime();
			return true;
		});
		$("#btn_logout_cancel").click(function(){
			$("#div_logout_confirm").dialog("close");
		});
	});
	
	//版面显示控制
	showSetting();
	//菜单列表
	$("#btn_menu_index_home").on("click",function(){
		$("#index_tab_div").hide();
		$("#wrapper").show();
	});
	$("#footer ul li a[id^=btn_menu_][tn^=index_]").on("click",function(){
		$(".menu-tan-box").hide();
		var showDivId="#"+$(this).attr("tn");
		var divH=document.documentElement.clientHeight-($(".top-menubox").height()+$(".menu-box-con").height()+5);
		$("#index_tab_div").children("div").not(".top-menubox").not(showDivId).hide();
		$("#tab_div_title").html($(this).text());
		$("#index_tab_div").show();
		$("#wrapper").hide();
		$(showDivId).height(divH).show();
		if("btn_menu_chart"==this.id && $(showDivId).attr("fc")=="f"){
			WebUiChart.init();
			$(showDivId).attr("fc","t");
		}
		else if("btn_menu_new_01"==this.id||"btn_menu_new_02"==this.id){
			news.conNewsSocket();
		}else if("btn_menu_report_01"==this.id){
			Report.init();
		}else if("btn_menu_investment"==this.id){
			adjustDataTable();
		}
	});
	//返回新闻首页
	$("#btn_tab_div_back").on('click', function() {
		$("#btn_tab_div_back,#news_content").hide();
		$("#newsList").show();
	});
	//返回主页
	$("#tab_back_home").on("click",function(){
		$("#index_tab_div").hide();
		$("#wrapper").show();
		adjustDataTable();
	});
	//版面伸缩控制
	$(window).resize(function() {
		adjustDataTable();
	});
	//模式切换
	$("#btn_menu_style_change_01,#btn_menu_style_change_02").on("click",function(){
		$(".menu-tan-box").hide();
		var styleBtns=$("#footer div ul li a[id^=btn_menu_style_change_0]");
		if($(this).attr("tn")=="night"){
			styleBtns.html("<i></i>"+i18n.nightcss);
			styleBtns.attr("tn","day");
			replaceCssLink("index-night.css","index.css");
			WebUiChart.setTheme("Light");
			SystemCookie.setDayNight("day");
		}else{
			styleBtns.html("<i></i>"+i18n.daycss);
			styleBtns.attr("tn","night");
			replaceCssLink("index.css","index-night.css");
			WebUiChart.setTheme("Dark");
			SystemCookie.setDayNight("night");
		}
	 });
	 if("night"==SystemCookie.getDayNight()){
		 $("#btn_menu_style_change_01").attr("tn","day");
		 $("#btn_menu_style_change_01").click();	
	 }else{
		 $("#btn_menu_style_change_02").attr("tn","night");
		 $("#btn_menu_style_change_02").click();	
	 }
	/**
	 * 切换语言
	 * @param language zh_CN/zh_TW
	 */
	$("#btn_menu_language_01,#btn_menu_language_02").on("click",function () {
		$("#index_lang").val($(this).attr("tn"));
		document.getElementById("adminForm").submit();
	});
	
	/**
	 * 版本切换
	 */
	$("#btn_menu_full_ver_01,#btn_menu_full_ver_02").on("click",function () {
		$("#index_version").val("dt");
		document.getElementById("adminForm").submit();	
	});
});


