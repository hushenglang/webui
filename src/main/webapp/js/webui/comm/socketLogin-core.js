/**
 * 登陆node.js服务器函数，返回全局变量socket
 */
//socket 客户端
var socket;
var bodyShow = false;
var nodeSid = "";

// 初始化以及方法注册
$(function() {
	var refresh = false;
	var clientTime = jQuery.cookie("clientTime");
	//防止重复打开页面， 如果clientTime 值存在并且差小于两秒禁止打开页面
	if(clientTime && (Math.abs(new Date().getTime() - clientTime) < 2000 )){
		$("body").hide();
		closeWindows();
		return;
	}
	// 初始化SOCKET
	initSocket();
	//初始化登出事件
	$("#logout_btn").click(function(){
		Confirm({
			title : i18n.logout,//登出
			content : i18n.confirmLogout,//是否登出平臺
			okValue : i18n.ok,//確定
			ok : function() {
				location.href = Global.contextPath + "/LogOff.action?t=" + new Date().getTime() + "&nodeSid=" + nodeSid;
				return true;
			},
			cancelValue : i18n.cancel,//取消
			cancel : true
		});
	});
		
	//浏览器关闭是清空 cookie clientTime
	try {
		window.onunload = function (){
			console.log("window.onunload ...");
			jQuery.cookie("clientTime", "");
		};
	} catch (e) {}
	try {
		window.onbeforeunload = function (){
			refresh = true;
			console.log("window.onbeforeunload ...");
			jQuery.cookie("clientTime", "");
		};
	} catch (e) {}
	
	
	// 初始化SOCKET
	function initSocket() {
		
		// login timeout
		setTimeout(function(){
			if(SystemConnection.login == false){
				if(debugui) {
					alert('SystemConnection.login == false');
				}
				location.href = 'Login.action?errorcode=10101';	
			}
		}, 60000);
		
		// 取得登入信息
		$.ajax({
			type : "post",
			url : "InitGoldMain.action?genId=true",
			dataType : "json",
			async: false,
			error : function(XMLHttpRequest, status, e) {
				console.log(i18n.readDateError + ":"+e.message);//读取数据失败
			},
			success : function(result) {
				var initConfig = result.initConfig;	
				
				// check login flag "error" or "success"
				if(!initConfig || initConfig.flag == 'error'){
					location.href = 'LogOff.action?nodeSid=' + nodeSid;
				}
				
				// Create socket
				socket = $.createSocket("trade", initConfig.nodeUrl); 
				
				//開始監聽socket
				$.listenSocket(socket);				
				
				// 连接socket成功, 進行登入
				socket.listeners.$add({'connect': function() {
						try {
							// login
							console.info("emit addme sid", initConfig.loginname, initConfig.nodeSid);
							if(initConfig.isRGSLogin=='true'){
								console.log("RGS Login");
								socket.emit('addme', initConfig.loginname, "###hash"+initConfig.pwd);
							}else{
								console.log("NOT RGS Login");
								socket.emit('addme', initConfig.loginname, initConfig.pwd);
							}
							nodeSid = initConfig.nodeSid;
						} catch (e) {
							console.log(i18n.connectionFail + "：" + e);// 连接失败：
						}
					}});
				
				// Login 返回
				socket.listeners.$add({'AccLogin': function(para, data) {
					// if code != 0, login fail
					if(para.code != 0){
						if(debugui) {
							alert('para.code != 0');
						}
						// if login fail, disconnect and return
						socket.disconnect();
						location.href = 'Login.action?errorcode=' + para.code;
					}
				}});
				
				// 登入數據接收完畢
				var orderEnd = false;
				socket.listeners.$add({'OrderEnd': function(para, data) {
					if(orderEnd == true){
						return;
					}
					orderEnd = true;
					
					// if code != 0, login fail
					if(para.code == 0){
											
						// if receive all package, show body
						setTimeout(function(){
							$("#body").show();
							bodyShow = true;
							$("#loading").hide();
							// init chart
							if(typeof WebUiChart!="undefined"){
								WebUiChart.orderDisplayed = true;
								var mbChecking = ($("#index_chart_div").length==0);
								if(!WebUiChart.chartShowed && WebUiChart.newsSocketConnected && mbChecking){
									console.log("CHART: starting WebUiChart.init()");
									WebUiChart.init() ;
								}
							}
							//数据接收完成则默认显示仓位列表
							$("#investment-entrust-fl li[tn='accountPositionsTable']").click();
							//周末的逻辑判断和处理
							weekendHandler();
							//设置浏览器历史记录标记
							browserHistory.setKey();
						}, 500);
						
					}
					//是否已经登陆
					isLogined = true;
				}});
				
				// reload account info
				socket.listeners.$add({"reload_info": function(para, data) {
					if( initConfig.loginname == para.loginname ){
						window.location.href = window.location.href;	
					}
				}});

				// 重连事件
				socket.listeners.$add({'reconnect': function() {
					console.log('reconnect');
					//清空全局数组和对象
					clearGlobalDataArrayAndObject();
					SystemConnection.updateConnectStatus('connect');
				}});

				// 连接断开
				socket.listeners.$add({'disconnect': function() {
					console.log(socket.$$name + ' disconnect');
					if('trade' == socket.$$name) {
						//清空全局数组和对象
						clearGlobalDataArrayAndObject();
					}
				}});

				// 其他平台登录
				socket.listeners.$add({'OtherLogin': function(para) {
					console.log('OtherLogin');
					SystemConnection.updateConnectStatus('disconnect');
					if (socket) {
						socket.disconnect();
						socket = null;
					}
					//清空全局数组和对象
					clearGlobalDataArrayAndObject();
					logoutAjax();
					//被踢原因 1同一帐户重复登录，先前登录者被踢 2被管理员踢出 3因交易员登录退出 
					var errorMsg = i18n.accReconnection;
					if(para.code===1){
						errorMsg = i18n.accReconnection;//同一帳戶在別處登錄
					}else if(para.code===2){
						errorMsg = i18n.accReconnection;//被管理员踢出
					}else if(para.code===3){
						errorMsg = i18n.accTraderOccupied;//因交易员登录退出
					}
					setTimeout(function(){
						location.href = 'LogOff.action?nodeSid=' + nodeSid;
					},5000);
					Alert(errorMsg, function(){
						location.href = 'LogOff.action?nodeSid=' + nodeSid;	
					});
				}});

				// 登陆结果
				socket.listeners.$add({'loginR': function(para) {
					console.log('loginR', para);
					//清空全局数组和对象
					//clearGlobalDataArrayAndObject();
					loginReturn(para);
					
					// 清空数组中公告数据,同时向note.js服务器发起公告请求
					//clearBulletinFromArray();
					//initBulletinAsk();
					if($("meta[name=loginname]").length>0 && $("meta[name=loginname]").attr("content")!=""){
					    browserHistory.init();
					}
				}});
				
				// 获取产品列表
				socket.listeners.$add({'SymbolList': function(para, data) {
					QuotationGTS.init(para, data);
				}});
				
				// 获取当前账户最大的订单数
				socket.listeners.$add({'group_orderlimit': function(para, data) {
					setGroupOrderlimitData(para);
				}});
				
				// 获取AmsSymbolConfig信息
				socket.listeners.$add({'AmsSymbolConfig': function(para, data) {
					data.length = para.num;				
					setAmsSymbolConfigArray(data);	
					Quotation.updateSymbolConfig(data);
				}});
				
				// 市价下单返回的信息
				socket.listeners.$add({'ondeal': function(para, data) {
					setOrderDealData(para);
				}});
				
				// 委托下单返回的信息
				socket.listeners.$add({'order_update': function(para) {
					setOrderUpdateData(para);
					//Order.refreshOrder(para); // 委托下单或改单，更新委托列表
					Investment.businessMethod.replacePostByOrder(para);
					Investment.businessMethod.refreshSuccessClosePos(para); // 关闭订单成功后，刷新成交价
				}});
				
				socket.listeners.$add({'bulletin_remove': function(para, data) {
					deleteBulletinFromArray(para);
				}});
				
				/**
				 * 建仓返回结果 新Cmd, code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
				 */
				socket.listeners.$add({'MarketBuildRet': function(para, data) {
					console.log('MarketBuildRet', para, data);
					GTShandleMarketRequestR(para);
				}});
				
				/**
				 * 委托订单下单返回结果 新Cmd, code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
				 */
				socket.listeners.$add({'PendingOrderRet': function(para, data) {
					if(ispendingSubmit){
						GTShandlePendingOrderRequestR(para);
					}
				}});
				
				/**
				 * 进阶委托订单下单返回结果 新Cmd, code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
				 */
				socket.listeners.$add({'AdvOrderRet': function(para, data) {
					console.log('AdvOrderRet', para, data);
					GTShandleAdvancePendingOrderRequestR(para, data);
					GTShandleModifyAdvPendingOrderRequestR(para, data);
				}});
				
				/**
				 * modify委托订单下单返回结果 新Cmd, code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
				 */
				socket.listeners.$add({'ModifyOrderRet': function(para, data) {
					console.log('ModifyOrderRet', para, data);
					GTShandleModifyPendingOrderRequestR(para, data);
					//Investment.businessMethod.handleRequestR(para); // 投资组合请求结果处理
				}});
				
				//市价平仓  Para订单信息, Data: NULL
				socket.listeners.$add({'MarketCloseRet':function(para,data){
					 try{					 
						if(MarketClose.isSubmit){
						  MarketClose.GTShandleMarketRequestR(para);
						}
				   	 } catch(e) {
				   		 alert(e);
				   	 }
				}});
				
				// 禁止用戶繼續使用
				socket.listeners.$add({'userRight': function(para, data) {
					Global.userStatus = para.user_right;
					if( ! (Global.userStatus & userNodeType.USER_RIGHT_ENABLED)){ // 禁用直接退出登录
						logoutAjax();
						Alert(WebUIError["10212"], function (){
							if(debugui) {
								alert('core 281: userRight err');
							}
							socket = null;
							location.href = 'LogOff.action';
						});
					}
				}});
				
				// 假期处理
				socket.listeners.$add({'HolidayItem': function(para, data) {
					var begintime = para.begintime;
					var endtime = para.endtime;
					var currentTimeDate = new Date();
					var beginInterval = begintime-currentTimeDate.getTime();
					var endInterval = endtime-currentTimeDate.getTime();
					setTimeout(beginHolidayHandler, beginInterval);
					setTimeout(endHolidayHandler, endInterval);
					
					//开始假期时候做的处理放在此处
					function beginHolidayHandler(){
						isHoliday = true;
						//1.取消所有未到价成交的委托单；这个动作服务器会做
						//cancelPendingOrdersRequest(PendingOrder.orders);
						//2.清空已平仓部位、实时动态的记录信息；
						DynamicUpdates.onClear();
						$("#closedPositionTable").dataTable().fnClearTable();
						//3.更新仓位利息（服务器计算、UI显示）、净盈亏（UI端计算）；
						AccountPositions.refresh();
						
						//4.假期开始时使用假期保证金，检测按金水平是否低于斩仓水平（交易服务器处理，UI更新保证金、及删除已斩仓的仓位等显示问题）），强制平仓条件
						
					}
					
					//结束假期做的处理放在此处
					function endHolidayHandler(){
						isHoliday = false;
						//1.假期结束后，系统恢复正常交易。
					}
					
				}});
			}
		});
	}
});




//登出tomcat 服务器
function logoutAjax(callBack){
	$.ajax({
		type: "POST",
		url: Global.contextPath + "/LogOff.action?t=" + new Date().getTime() + "&nodeSid=" + nodeSid,
		cache:false,
		success:function(){
			if(callBack){
				callBack();
			}
		}
	});
}

// 登陆结果
function loginReturn(result) {
	try{
		Global.loginResult = result;
		// 登陆失败
		var retCode = result.ret;
		if (retCode != Constant.LOGIN_RESULT_OK) {
			var errMsg = WebUIError[retCode]; // 错误信息
			if (errMsg) {
				Alert(errMsg);
			} else {
				Alert(i18n.loginFail + '：' + retCode);//登陸失敗,錯誤代碼
				location.href="LogOff.action?nodeSid=" + nodeSid;
			}

			SystemConnection.updateConnectStatus('disconnect');
			socketLoginReconnect();
			return;
		}else{
			SystemConnection.updateConnectStatus('connect');
		}
	} catch(e) {
//		console.log(i18n.loginException + "：" + e);//登陆异常
	}
}

var count = 0; // 重连次数。
function socketLoginReconnect(){
	//已斷開連接
	if (count > 2) {
		console.log('home....');
		clearInterval(intervalConn);
		//清空全局数组和对象
		clearGlobalDataArrayAndObject();
		logoutAjax();
		if(debugui) {
			alert('core 417: count > 2: ' + count);
		}
		location.href="LogOff.action?nodeSid=" + nodeSid;
	}
	if(Global.connectStatus == 'disconnect'){
		count ++;
		socket.socket.reconnect();
		console.log('io.reconnect ...');
	}else if(Global.connectStatus == 'connect'){
		return;
	}
	//setTimeout(showServiseTime, 15000);
}

function closeWindows(){
	var browserName=navigator.appName; 
	if (browserName=="Netscape") { 
		window.open('','_parent',''); window.close();
	} else if (browserName=="Microsoft Internet Explorer") {
		window.opener = "whocares"; window.close(); 
	}

	setTimeout(function (){
		window.location.href = 'about:blank ';
	}, (500));
}

/**
 * 判断周末条件：
	1.产品状态为暂停状态；UI只有判断LLG的就可以了
	2.当前服务器时间“不在”产品期数范围内
	3.根据当前服务器时间判断是否周末 周六3点后 - 周一8点前
	(1 || 2） && 3 成立才是周末哦
 */
function weekendHandler(){
	var symbolObj = QuotationGTS.getSymbolArrayByPrdcode('022');
	if(typeof symbolObj!="undefined"){
		if(symbolObj.tradestatus=='0'||!isSymbolSessionLLG){//交易状态:(目前值都是1) 0暂停 1由期数(future)来决定收市和开市
			var saturday = getWeekendStartDate().getTime();
			var monday = getWeekendEndDate().getTime();
			var currentTime = new Date();
			if(typeof SystemTime != 'undefined' && SystemTime != null) {
				currentTime = SystemTime.time;
			}
			if(currentTime>=saturday&&currentTime<=monday){
				beginWeekendHandler();
			}else{
				endWeekendHandler();
			}
		}
	}
	
	/*下面是闭包方法声明*/
	//开始周末时候做的处理放在此处
	function beginWeekendHandler(){
		isWeekend = true;
		//1.取消所有未到价成交的委托单；
		//cancelPendingOrdersRequest(PendingOrder.orders);
		//2.清空已平仓部位、实时动态的记录信息；
		DynamicUpdates.onClear();
		$("#closedPositionTable").dataTable().fnClearTable();
		//3.更新仓位利息（服务器计算、UI显示）、净盈亏（UI端计算）；
		AccountPositions.refresh();

		//4.假期开始时使用假期保证金，检测按金水平是否低于斩仓水平（交易服务器处理，UI更新保证金、及删除已斩仓的仓位等显示问题）），强制平仓条件
	}

	//结束或未到周末做的处理放在此处
	function endWeekendHandler(){
		isWeekend = false;
		//1.周末结束后，系统恢复正常交易。
	}
	
	// 获取周末开始时间
	function getWeekendStartDate(){
		var date = new Date(SystemTime.time);
		var day = date.getDay();
		var intervalday = 6-day;
		if(intervalday>0){
			date.setDate(date.getDate()+intervalday);
			date.setHours(3);
			date.setMinutes(0);
			date.setSeconds(0);
		}
		return date;
	}
	
	//获取周末结束时间
	function getWeekendEndDate(){
		var date = new Date(SystemTime.time);
		var day = date.getDay();
		var intervalday = 8-day;
		if(intervalday>0){
			date.setDate(date.getDate()+intervalday);
			date.setHours(8);
			date.setMinutes(0);
			date.setSeconds(0);
		}
		return date;
	}
	//每隔一个小时执行一次是否已经处于周末
	setTimeout(weekendHandler, 60*60*1000);
}



