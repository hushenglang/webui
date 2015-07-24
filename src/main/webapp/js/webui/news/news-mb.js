/**
 *  新闻功能
 *  create by alan.wu
 */
var news={
	currSocket:null,
	currTitle:"",//当前选中的标题
	titleData:null,
	totalRows:null,
	init:function(){
		news.setSocket();
	},
	conNewsSocket:function(){
		if(news.currSocket) {
			if(!news.currSocket.socket.connected) {
				console.log('currSocket reconnect......');
				news.setSocket();
				setTimeout(function () {
					//do nothing
				}, 2000);
			}
			setTimeout(function(){
				news.currSocket.emit('request', Constant.CMD_GET_NEWS_BY_PAGE, {"page":0, "language":newsLanguageValue()});
			}, 1000);		
		}
	},
	setSocket:function(){
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
				if(initConfig.flag == 'error'){
					location.href = 'LogOff.action';
				}
				
				news.currSocket = $.createSocket("news", initConfig.newsUrl); 
				//開始監聽socket
				$.listenSocket(news.currSocket);	
				// 驗證login
				news.currSocket.listeners.$add({'AccLogin': function(para, data) {
					// if code != 0, login fail
					if(para.code != 0){
						// if login fail, disconnect and return
						if(debugui) {
							alert('news mb 73: AccLogin error');
						}
						news.currSocket.disconnect();
					}
				}});
				// 登陆结果
				news.currSocket.listeners.$add({'loginR': function(para) {
					console.log('news loginR', para);
				}});
				// 连接成功， 登入 currSocket
				news.currSocket.listeners.$add({'connect': function() {
					console.log('B connected');
					try {
						// login
						news.currSocket.emit('addme', initConfig.loginname, initConfig.pwd);
					} catch (e) {
						console.log(i18n.connectionFail + "：" + e);//连接失败：
					}
				}});
				// 重连事件
				news.currSocket.listeners.$add({'reconnect': function() {
					console.log('news reconnect');
				}});
				// 连接断开
				news.currSocket.listeners.$add({'disconnect': function() {
					console.log('news disconnect');
					// 断开后直接刷新，清理缓存。
				}});
				// 其他平台登录
				news.currSocket.listeners.$add({'OtherLogin': function() {
					console.log('news OtherLogin');
					if(news.currSocket) {
						news.currSocket.disconnect();
						news.currSocket = null;
					}
				}});
				
				news.currSocket.listeners.$add({'newsTitleAck': function(para, data){
					var lis="",dtitle="";
					//分页设置 ---开始---  perPageSize每页显示条数
					var perPageSize=8;
					$("#news_totalPages").val(Math.ceil(para.num/perPageSize));
					$("#news_pageNum").val(1);
				 	//设置全局变量
				 	news.titleData=data;
				 	news.totalRows=para.num;
				 	//分页设置 ---结束---
					for(var i = 0; i < perPageSize; i++) {
						dtitle=data[i].title;
						dtitle=dtitle.length>21?(dtitle.substring(0, 20)):dtitle;
						lis+='<li nId="'+data[i].newsid+'" ntm="'+data[i].newstime+'" tn="'+data[i].title+'"><a href="javascript:">'+dtitle+'<br/><span class="news-l-tim">'+ Util.getUTCDateFromMis(data[i].newstime,"yyyy-MM-dd hh:mm:ss")+'</span><s class="jiant-icon"></s></a>';
					}
					$("#newsList ul").html(lis);
					$("#newsList ul li").on('click', function(){
						news.currSocket.emit('request',Constant.CMD_GET_SINGLE_NEWS, {"newsid":$(this).attr("nId"),"language":newsLanguageValue(),"newstime":$(this).attr("ntm")});
						news.currTitle=$(this).attr("tn");
					});
				}});
				news.currSocket.listeners.$add({'newsContentAck': function(para, data){
					$("#news_content_title").html(news.currTitle);
					$("#btn_tab_div_back").show();
					$("#news_content").show();
					$("#newsList").hide();
					$("#news_content_time").html(Util.getUTCDateFromMis(para.newstime,"yyyy-MM-dd hh:mm:ss"));
					$("#news_content_detail").html(para.content);
				}});
				//新闻接收接口
				news.currSocket.listeners.$add({'newsUpdate': function(para, data) {
					if($('#news_pageNum').val()==1){
						$('#newsList ul li:last').remove();
						var lis='<li nId="'+para.newsid+'" ntm="'+para.newstime+'" tn="'+para.title+'"><a href="javascript:">'+para.title+'<br/><span class="news-l-tim">'+ Util.getUTCDateFromMis(para.newstime,"yyyy-MM-dd hh:mm:ss")+'</span><s class="jiant-icon"></s></a>';
						$('#newsList ul').prepend(lis);
					}
					$("#newsList ul li[nId="+para.newsid+"]").on('click', function(){
						news.currSocket.emit('request',Constant.CMD_GET_SINGLE_NEWS, {"newsid":$(this).attr("nId"),"language":newsLanguageValue(),"newstime":$(this).attr("ntm")});
						news.currTitle=$(this).attr("tn");
					});
				}});
			}
		});
	},
	gotoPage:function(pageno){
	 	var pages = $("#news_totalPages").val();
	 	var pageNum = $("#news_pageNum").val();
	 	if(Util.isBlank(pageNum)) {
	 		pageNum = 0;
	 	}
	 	pageNum = new Number(pageNum);
	 	if(pageno=='first') {
	 		pageNum = 0; 
	 	}
	 	if(pageno=='pre') {
	 		pageNum = pageNum -1; 
	 		if(pageNum < 0){ 
	 			pageNum = 0;
	 		}
	 	}
	 	if(pageno=='next') {
	 		if(pageNum < pages){ 
	 			if(pageNum==(pages-1)){
	 				pageNum = pageNum;
	 			}else{
	 				pageNum = pageNum + 1;
	 			}
	 		} else {
	 			pageNum = pages;
	 		}
	 	}
	 	if(pageno=='last') {
	 		pageNum = pages-1; 
	 	}
	 	 $("#news_pageNum").val(pageNum);
	 	var data=news.titleData,lis="";
	 	var lastszie=(pageNum+1)*8>news.totalRows?news.totalRows:(pageNum+1)*8;
	 	for(var i = pageNum*8; i < lastszie; i++) {
			dtitle=data[i].title;
			dtitle=dtitle.length>21?(dtitle.substring(0, 20)):dtitle;
			lis+='<li nId="'+data[i].newsid+'" ntm="'+data[i].newstime+'" tn="'+data[i].title+'"><a href="javascript:">'+dtitle+'<br/><span class="news-l-tim">'+ Util.getUTCDateFromMis(data[i].newstime,"yyyy-MM-dd hh:mm:ss")+'</span><s class="jiant-icon"></s></a>';
		}
		$("#newsList ul").html(lis);
		$("#newsList ul li").on('click', function(){
			news.currSocket.emit('request',Constant.CMD_GET_SINGLE_NEWS, {"newsid":$(this).attr("nId"),"language":newsLanguageValue(),"newstime":$(this).attr("ntm")});
			news.currTitle=$(this).attr("tn");
		});
	 }
};

var newsSocket;
$(function(){
	news.init();
	newsSocket=news.currSocket;
});

