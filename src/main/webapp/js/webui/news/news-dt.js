/**
 *  新闻功能
 */
var newsSocket;

$(function(){
try{
	initNewsSocket();
	
	$('.left-nav2').on('click', function() {
		if(newsSocket) {
			if(!newsSocket.socket.connected) {
				console.log('newsSocket reconnect......');
				initNewsSocket();
				setTimeout(function () {
					//do nothing
				}, 2000);
			}
			
			initNewsDiv();
			$('#leftNewsDiv').dialog('open');			
			setTimeout(function () {
				newsSocket.emit('request', Constant.CMD_GET_NEWS_BY_PAGE, {"page":0, "language":newsLanguageValue()});
			}, 1000);
		}
	});
	
	function getNextPage(totalResult, newssize){
		if(totalResult > newssize) {
			var pages = Math.ceil(totalResult/10);
			for(var i = 1; i < pages; i++) {
				newsSocket.emit('request', Constant.CMD_GET_NEWS_BY_PAGE, {"page":i, "language":newsLanguageValue()});
			}
		}
	}
	 
} catch(e) {
	alert(e);
}


});

//显示当前用户所有要看的新闻详情和tab
function showUserNews(id){
	$('#news_scroll_div table').each(function(){
	   var i=$(this).attr("size");
	   if(id==i){
			$('#newtab_'+i).attr("class","news-open");
			if(i==0){
				$('#newlist_'+i).attr("class","liebiao-tabox mail-tablist");
				$('#newlist_0_paginate').show();
			}else{
				$('#newlist_'+i).attr("class","liebiao-tabox mail-tablist mail-ndetail");
				$('#newlist_0_paginate').hide();
			}
		}else{
			$('#newtab_'+i).attr("class","");
			if(i==0){
				$('#newlist_'+i).attr("class","liebiao-tabox mail-tablist dn");
				$('#newlist_0_paginate').hide();
			}else{
				$('#newlist_'+i).attr("class","liebiao-tabox mail-tablist mail-ndetail dn");
			}
		}
   });
	
}

//关闭 新闻选项卡
function closenewtab(i){
	$('#newtab_'+i).remove();
	$('#newlist_'+i).remove();
	var have=$('#newtab_'+i).prev().size();
	if(have>0){
		var size=$('#newtab_'+i).prev().attr("size");
		showUserNews(size);
	}else{
		showUserNews(0);
	}
}


function initNewsSocket() {
  try{
	$.ajax({
		type : "post",
		url : "InitGoldMain.action?genId=false",
		dataType : "json",
		async: false,
		error : function(XMLHttpRequest, status, e) {
			console.log(i18n.readDateError + ":"+e.message);//读取数据失败
		},
		
		success : function(result) {
			var initConfig = result.initConfig;	
			if(!initConfig){
				location.href = 'LogOff.action';
			}
			// check login flag "error" or "success"
			if(initConfig.flag == 'error'){
				location.href = 'LogOff.action';
			}
			
			// Create socket
			newsSocket = $.createSocket("news", initConfig.newsUrl); 
			//開始監聽socket
			$.listenSocket(newsSocket);	
			
			
			// 驗證login
			newsSocket.listeners.$add({'AccLogin': function(para, data) {
				// if code != 0, login fail
				if(para.code != 0){
					// if login fail, disconnect and return
					if(debugui) {
						alert('news 118: AccLogin error');
					}
					newsSocket.disconnect();
				}
			}});
			
			// 登陆结果
			newsSocket.listeners.$add({'loginR': function(para) {
				console.log('news loginR', para);
			}});
			
			// 连接成功， 登入 newsSocket
			newsSocket.listeners.$add({'connect': function() {
				console.log('B connected');
				WebUiChart.newsSocketConnected = true;
				try {
					// login
					newsSocket.emit('addme', initConfig.loginname, initConfig.pwd);
					
					
					var mbChecking = ($("#index_chart_div").length==0);
					if(!WebUiChart.chartShowed && WebUiChart.orderDisplayed && mbChecking){
						console.log("CHART: starting WebUiChart.init()");
						WebUiChart.init() ;
					}
					
				} catch (e) {
					console.log(i18n.connectionFail + "：" + e);//连接失败：
				}
			}});
			
			
			// 重连事件
			newsSocket.listeners.$add({'reconnect': function() {
				console.log('news reconnect');
			}});
			
			// 连接断开
			newsSocket.listeners.$add({'disconnect': function() {
				console.log('news disconnect');
				// 断开后直接刷新，清理缓存。
				//window.location.reload();
			}});
			
			// 其他平台登录
			newsSocket.listeners.$add({'OtherLogin': function() {
				console.log('news OtherLogin');
				if(newsSocket) {
					newsSocket.disconnect();
					newsSocket = null;
				}
			}});
			
			newsSocket.listeners.$add({'newsTitleAck': function(para, data){
				var oTable = $('#newlist_0').dataTable();
				var da = [];
				for(var i = 0; i < para.num; i++) {
					var d = {
							newsid: data[i].newsid,
							language: data[i].language,
							newstime: data[i].newstime, 
							title: data[i].title
					};
					da.push(d);
					//$('#title_' + data[i].newsid).on('click', new NewsItem(data[i]).open);
				}
				oTable.fnAddData(news2Array.toArrays(da));
				//$( oTable.fnGetNodes()).each().on('click', new NewsItem(data[i]).open);
			}});
			
			// newsUpdate  para {"newsid":"8400a705701da872b1dfb8ec26ccf9","language":2,"newstime":1396432806000,"title":"德国拍卖近25亿欧元五年期债券，收益率略微上升"} data 0
			newsSocket.listeners.$add({'newsContentAck': function(para, data){
				var html='';
				var str='';
				var title_text=$('#title_'+para.newsid).text();
				if(title_text.length>6){
					str=title_text.substring(0,6)+"...";
				}else{
					str=title_text+"...";
				}				
				
				//包括列表存在选择框     <6时候还能打开
				var inner_table_size=$('#news_scroll_div table').size();
				for(var i = 0; i < inner_table_size; i++) {
					var idd = $('#newlist_' + i).attr('idd');
					if(idd == para.newsid) {
						return;
					}
				}
				if(inner_table_size<6){
					html+='<table size="'+inner_table_size+'" id="newlist_'+inner_table_size+'" border="0" idd ="' + para.newsid + '"'
					+' cellspacing="0" cellpadding="0" class="liebiao-tabox mail-tablist mail-ndetail dn">'
					+'	<thead><tr>'
					+' 		<th class="t-left"><strong>'+title_text+'</strong></th>'
					+'		<th class="non-bor t-left" width="200"><strong>'+Util.getUTCDateFromMis(para.newstime,"yyyy-MM-dd hh:mm:ss")
					+'		</strong></th>'
					+'		</tr></thead>'
					+'	<tbody><tr><td class="non-bor t-left" colspan="2">'
					+'		<div class="news-detail">'+para.content+'</div></td> </tr>'
					+'	</tbody></table>';
					
					$('#news_scroll_div').append(html);
					$('#new_tabs').append('<li id="newtab_'+inner_table_size+'" size="'+inner_table_size+'" newsid="'+para.newsid+'" onclick="showUserNews('+inner_table_size+')" class="">'+str
							+' <a href="javascript:closenewtab('+inner_table_size+');" class="new-del-btn" title="'+i18n.news.close+'"></a></li>');
					showUserNews(inner_table_size);
				}
			}});
			
			//新闻接收接口
			newsSocket.listeners.$add({'newsUpdate': function(para, data) {
				if($('#news_currentPage').html()==1){
					$('#news_tbody tr :last').remove();
					
					var	innerHtml='<tr class="tr-bg">';
					innerHtml+='<td class="t-left"><a id="title'+para.newsid+'" href="javascript:showNewsContent(\''+para.newsid+'\',\''+para.newstime+'\')">'+para.title+'</a></td>';
					innerHtml+='<td class="non-bor t-left">'+Util.getUTCDateFromMis(para.newstime,"yyyy-MM-dd hh:mm:ss")+'</td></tr>';
					$('#news_tbody').prepend(innerHtml);
				}
				var size=$('#news_tbody tr').size();
				for(var i = 0; i < size; i++){
					var num=i%2;
					if(num==0){
						$('#news_tbody tr').eq(i).attr("class","tr-bg");
					}else{
						$('#news_tbody tr').eq(i).attr("class","t-left");
					}
				}
			}});
		}
	});
	}catch(e) {
		alert(e);
	}
}


function NewsItem(news) {
	var _n = news;
	this.open = function () {
		newsSocket.emit('request',Constant.CMD_GET_SINGLE_NEWS, {"newsid":_n.newsid,"language":newsLanguageValue(),"newstime":_n.newstime});
	};
}

function NewsItem(id, time) {
	this.open = function () {
		newsSocket.emit('request',Constant.CMD_GET_SINGLE_NEWS, {"newsid":id,"language":newsLanguageValue(),"newstime":time});
	};
}


//轉換  function
var news2Array = new Object2Array({
	"title": function(data, obj){
		data=data.length>30?(data.substring(0, 29))+"...":data;
		return '<a id="title_' + obj.newsid + '" href="javascript:">' + data + '</a>';
		},
	"newstime": function(data){
		var timestr = Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");
		return '<span id=\'' + data + '\'>' + timestr + '</span>';
	}
});

function initNewsDiv() {
	$('#leftNewsDiv').dialog({
		closeOnEscape: false,
		autoOpen: false,
		height:420,
		width:768,
		title:i18n.news.tabnews,
		resizable:false,
		modal: true
	});
	var s = '<div class="layer-con layer-con-mainews">' + 
		'<div class="navbox-c navbox-blin">' + 
	      '<div class="nav-qh clearfix">' +
	       '<ul class="tan-ul fl">' +
	          '<li onclick="showUserNews(0)" class="on-na">'+ i18n.news.list +'</li>' +
	        '</ul>' +
	        '<ul id="new_tabs" class="news-tan fl">' +
	        '</ul>' +
	      '</div>' +
	    '</div>' +
	    '<div  id="news_scroll_div" class="mail-news-scroll">';

	$('#leftNewsDiv').html(s + '<table id="newlist_0" size="0" idd="0" cellpadding="0" cellspacing="0" class="liebiao-tabox mail-tablist"></table></div></div>');
	
	//
	//$('#newlist_0 tbody tr').each( function() {
	//	var nTds = $('td', this);
	//	var id = $(nTds[0]).children('a').attr('id');
	//	id = id.substr(6);
	//	var time = $(nTds[1]).children('span').attr('id');
	//	var t = id + '_' + time;
	//	this.setAttribute( 'title', t);
	//});
	//$('#newlist_0 tbody tr[title]').on('click', function() {
	//	var title = this.attr('title').split("_");
	//	new NewsItem(title[0], title[1]).open;
	//});
	
	// init bRetrieve?
	$('#newlist_0').dataTable( {
		"aaData": [],
		"aoColumns": [
		              { "sTitle": "<strong>"+i18n.news.newstitle+"</strong>","sClass":"t-left"},
		              { "sTitle": "<strong>"+i18n.news.time+"</strong>","sClass":"non-bor t-left non-rbor","sWidth":"150px"},
		              ],
		              //"bPaginate": false,
		"sPaginationType": "input",
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,	
		"iDisplayLength": 10,
		"aaSorting": [[ 1, "desc" ]],
		"sDom": '<"top">rt<"bottom"fp><"clear">',
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			var ea = $('td:eq(0)', nRow).children('a');
			var id = ea.attr('id').substr(6);
			var time = $('td:eq(1)', nRow).children('span').attr('id');			
			$(ea).click(new NewsItem(id, time).open);
			return nRow;
		},
        "asStripeClasses": ['','tr-bg']
	} );
	$(".dataTables_empty").html("<img src='images/loading_2.gif' height='70px' width='70px'/>");
	
}