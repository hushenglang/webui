/**
 * 市价平仓
 */
var MarketClose = {
	isSubmit:false,
	/**
	 * 功能： 初始化市价平仓窗口的内容
	 */
	initMarketDiv : function(price, post) {
		this._settingMarketDiv(price, post);
	},
	
	/**
	 * 功能： 当初始化市价或刷新市价窗口的内容时调用
	 *@param  post   当前仓位信息
	 */
	_settingMarketDiv : function(post){
		// 初始化买卖信息
		var tradeTypeValue = post.buysell;
		var tradeTypeName;
		if(tradeTypeValue==0)
			tradeTypeName= i18n.trade.buyType;
		else if(tradeTypeValue==1)
			tradeTypeName= i18n.trade.askType;
		else
			tradeTypeName='---';
		$("#c_omDefaultTradeType").html(tradeTypeName);
		
		// 初始化买卖价格信息
		this.refresh();
		
		// 初始化默认手数
		$("#c_omVolumeInput").val(Util.fixToStrTwodecimal(post.lot));
	   
		// 初始化成交范围
		this._calculateTransactionRange(post.prdcode);
		
	},
	
	refresh : function() {
		$("#c_tradePrice").html(CloseCommon.getClosePrice());
	},
	
	/**
	 * 功能： 提交市价平仓
	 */
	submitMarketClose : function(){
		var post = CloseCommon.post;	//仓位信息
		
		if(post == null) {
			alert('data null, pls retry.');
			return;
		}
		
		// 检查市价平仓合法性
		if(!this.checkMarketSubmit(post)){
	    	return false;
		}
		// 执行市价平仓,若有委托单, 满足条件则取消委托.
		this.doSubmitMarketCloseAndCancelPendingOrder(post);
	},
	
	
	
	/**
	 * 是否需要取消平仓委托订单. leftCloseLot-剩余可平仓手数(仓位总手数-当前平仓手数)
	 */ 
	doSubmitMarketCloseAndCancelPendingOrder: function(post){
		var closeLot = Util.fixToStrTwodecimal($("#c_omVolumeInput").val());
		var totalLot = post.lot;
		var leftCloseLot =  parseFloat(totalLot)-parseFloat(closeLot);
		
		var callbackSubmitMarketClose = this.doSubmitMarketClose;
		var pendingOrders = [];
		var pendingLot = 0;
		// close button click event here
		for(var i = 0; i < PendingOrder.orders.length; i++){
			var pendingOrder = PendingOrder.orders[i];
			// 委托單在等待狀態
			if(post.oid == pendingOrder.targetoid && pendingOrder.tradestatus == 0){ 
				pendingOrders.push(pendingOrder);
				pendingLot = pendingLot + pendingOrder.lot;
			}	
		}
		if(leftCloseLot < pendingLot){
			var callbackFunc = function(){
				callbackSubmitMarketClose(post);
			};
			//执行取消
			$("#cancelorder_confirm_tips").text(i18n.confirmCancelOrder);
			$("#cancelorder_confirm").dialog({title:""});
			$("#cancelorder_confirm_btn_yes").unbind("click");
			$("#cancelorder_confirm_btn_no").unbind("click");
			$("#cancelorder_confirm_btn_yes").on("click",function(){
				$("#cancelorder_confirm").dialog("close");
				QuotationGTS.callCancelPendingOrderWithoutConfirm(pendingOrders, callbackFunc);		
			});
			$("#cancelorder_confirm_btn_no").on("click",function(){
				$("#cancelorder_confirm").dialog("close");
			});
			
		}else{
			callbackSubmitMarketClose(post);
		}
	},
	
	
	/**
	 * (GTS)功能：执行市价平仓
	 */
	doSubmitMarketClose : function(post){
		if(!Validator.checkMarketPrice(post.prdcode)){
			return;
		}
		//check before submit
		volume = Util.fixToStrTwodecimal($("#c_omVolumeInput").val());
		if(volume===''||typeof volume ==='undefined'||volume===null||isNaN(volume)){
			Alert(i18n.trade.volumeValid); // 請輸入有效手數。錯誤號10207!
			return false;
		}
		
		try{
			var volume,seq,range,dealType,price;
			
			CloseCommon.isSubmittingMarket = true;
			CloseCommon.isResponseMarket = false;
			
			// 交易手数赋值
			volume = Util.fixToStrTwodecimal($("#c_omVolumeInput").val());
			$("#c_submitedVolumeSpan").text(volume);
			
			seq = Util.getRandomSeq();
			post.marketSeq = seq;
			
			var dtime = Tick.gold.time;
			if(post.prdid == 1) {
				dtime = Tick.silver.time;
			}
			
			// 成交范围赋值,显示时以UI输入的，提交到服务器是按公式计算出来
			range =$("#c_transactionRange").spinner("value");
			if(range===''||typeof range ==='undefined'||range===null) {
				range = '0';
		    }
			
			//可成交范围
			$("#c_submitedTransactionRangeSpan").text(parseFloat(range));
			
			dealType = (post.buysell == 0)? 1: 0;
			price = CloseCommon.getClosePrice();
			
			$("#c_submitedSuccessMarketTable").show();
			$("#c_marketSuccessMsg").hide();
			$("#c_marketPreSubmittingMsg").show();
			$("#c_marketPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
			$("#c_doneRange").show();		//提交中显示可成交范围
			$("#c_uidId").hide();                                   			   // 提交中时,没有市价号显示
			$("#c_marketC").hide();                                 			   // 提交中时不显示关闭按钮
			$("#c_submitedFailMarketTable").hide();
			$("#c_marketFC").hide();
			$("#c_marketTable").hide();
			$("#c_marketP").hide();
			//买卖及价格
			var tradeTypeName;
			if(dealType==0)
				tradeTypeName= i18n.trade.askType;
			else if(dealType == 1)
				tradeTypeName= i18n.trade.buyType;
			else
				tradeTypeName='---';
			
			$("#c_tradeTypeTitleTd").html(tradeTypeName);
			$("#c_tradeTypeTitleTd").show();
			$("#c_submitedTradePriceSpan").html(price);
			$("#c_submitedTradePriceSpan").show();
			CloseCommon.disableTradeLi();
			CloseCommon.isAllowCloseTradeWindow = false;
			CloseCommon.hideCloseBtn();
			
			// 构造参数对象,向交易服务器发送对应的数据
			var param = {
				"prdid" : post.prdid,
				"lot" : volume,
				"price" : price,
				"range" : range,
				"tradedir" : dealType,
				"ordertime" : dtime,
				"validtime" : 0,
				"closeid" : post.oid,
				"margin" : post.margin,
				"charge" : 0
			};		
			// 市价平仓单SOCKET请求
			socket.emit('request', 0x10101, param);
			MarketClose.isSubmit = true;
			// 提交订单后判断服务器是否在60以内响应
			tradeTimeOutObj = setTimeout(function() {CloseCommon.checkIsMoreThan60sAfterSubmit();},60*1000);
		} catch(e) {
			alert('144' + e);
		}
	},
	
	/**
	 * (GTS)功能：市价平仓提交后的处理结果
	 */
	GTShandleMarketRequestR : function(para){
		MarketClose.isSubmit = false;
		//界面显示逻辑处理
		CloseCommon.isAllowCloseTradeWindow = true;
		showCloseBtn();
		
		if(CloseCommon.isResponseMarket){
			CloseCommon.isSubmittingMarket = false;
			return;
		}else{
			CloseCommon.isSubmittingMarket = false;
			CloseCommon.isResponseMarket = true;
		}
		
		//下面是业务逻辑处理
		if (para.code == 0) {//code=0表示平仓成功
			$("#c_submitedFailMarketTable").hide();
			$("#c_marketFC").hide();
			$("#c_submitedMarketUIDSpan").html(Util.simpleOid(para.oid));  //平仓号
			$("#c_submitedTradePriceSpan").html(
					(para.prdid==1)?Util.fixToStrThreedecimal(para.closedprice):Util.fixToStrTwodecimal(para.closedprice)
			);
			// 提交时隐藏市价平仓,显示提交成功后的Table
			$("#c_marketPreSubmittingMsg").hide();
			$("#c_marketSuccessMsg").show();
			$("#c_marketSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
			$("#c_marketTable").hide();
			$("#c_marketP").hide();
			$("#c_submitedSuccessMarketTable").show();
			
			$("#c_doneRange").hide();
			$("#c_uidId").show();  
			$("#c_marketC").show();
		}else{ //平仓失败
			$("#c_marketErrorMessage").html(WebUIError[para.code]);
			$("#c_marketPreSubmittingMsg").hide();
			$("#c_marketSuccessMsg").hide();
			$("#c_submitedFailMarketTable").show();
			$("#c_submitedSuccessMarketTable").hide();
			$("#c_marketC").hide();
			$("#c_marketFC").show();
			$("#c_marketTable").hide();
			$("#c_marketP").hide();
		}
		//界面显示逻辑处理
		CloseCommon.showCloseBtn();
		clearTimeout(tradeTimeOutObj);
	},
	
	
	/**
	 * 功能:市价单提交时校验
	 */
	checkMarketSubmit : function(post){
		//检查手数是否合法		
		if(CloseCommon.validateVolume(post)) {
			return true;
		}
		
		//當前是否為交易時間，若是非交易時段，則UI端需拒絕並提示‘非交易時段，操作無效。錯誤號10113’
		
		
		//當前是否為暫停交易（操盤端設置），若暫停交易，則UI端拒絕並提示‘非交易時段，操作無效。錯誤號10113’
		
		return false;
	},
	
	/**
	 * 功能：验证成交范围的合法性
	 */
	_validateTransRange : function(){
		var offerPriceDights = marketAndOrderObj.officePriceDights;
		var pipsDights       = marketAndOrderObj.pipsDigits;
		var transactionRange = $("#c_transactionRange").spinner("value");
		var maxTransactionRange = _getTransactionRangeFromServer(marketAndOrderObj.maxTransactionRange
	            ,marketAndOrderObj.officePriceDights,marketAndOrderObj.pipsDigits);
		if(transactionRange == null || isNaN(transactionRange) || transactionRange < 0 || transactionRange > maxTransactionRange){
			Alert(i18n.trade.transRangeValid.format(0,Util.fixToStr(maxTransactionRange,(offerPriceDights-pipsDights))));  //请输入正确可成交范围（X-XX点）。错误号10208
			return false;
		}
		return true;
	},
	
	/**
	 * 功能： 计算成交范围
	 */
	_calculateTransactionRange : function(prdcode){
		var symbolList = getSymbolArray();
		
		var obj = null;
		if(symbolList) {
			for(var i = 0; i < symbolList.length; i++) {
				if(symbolList[i].prdcode == prdcode) {
					obj = symbolList[i];
					break;
				}
			}
			
			if(obj) {
				var defaultTransactionRangeFromServer = obj.defmprange;  // 获取默认的成交范围
				var maxTransactionRangeFromServer = obj.maxmprange;    // 获取最大的成交范围
				marketAndOrderObj.maxTransactionRange=maxTransactionRangeFromServer;
				marketAndOrderObj.defaultTransactionRange=defaultTransactionRangeFromServer;
				var spinnerStep = Util.getSpinnerStep(CloseCommon.post.prdcode);
				$("#c_transactionRange").spinner({
					numberFormat : "n",
					step:spinnerStep,
					min : 0,
					max : maxTransactionRangeFromServer
				});
				$("#c_transactionRange").val(parseFloat(defaultTransactionRangeFromServer));
				$("#c_transactionRangeSpan").html("0-"+parseFloat(maxTransactionRangeFromServer));
			}
		}
	},
	
	/**
	 * 功能：市价平仓，修改手数时调用
	 */
	_changeMarketVolume : function(){
		$("#c_omVolumeInput").val(Util.fixToStr($(this).val()));
	},
	
	/**
	 * 功能：市价平仓，输入手数时调用
	 */
	_changeMarketVolumeInput : function(){
		Util.allowNumKeyUp(document.getElementById("c_omVolumeInput"));
	}	
};

$(function() {
	
	
	// 相关验证(投资额度、成交范围、手数输入的最大值、小数位)
	$("#c_investmentQuota").on('keypress', function(event){
		return Util.allowMaxValueKeyPress(event,document.getElementById("c_investmentQuota"),marketAndOrderObj.investmentQuotaMax)
		       && Util.allowMaxDightsLenKeyPress(event,document.getElementById("c_investmentQuota"),2)
		       && Util.allowMaxIntLenKeyPress(event,document.getElementById("c_investmentQuota"),Util.getIntLen(marketAndOrderObj.investmentQuotaMax));
	});
	$("#c_investmentQuota").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("c_investmentQuota"));
	});
	
	$("#c_transactionRange").on('keypress', function(event){
		var spinnerStepLength = Util.getSpinnerStepLength(CloseCommon.post.prdcode);
		return Util.allowMaxDightsLenKeyPress(event,document.getElementById("c_transactionRange"),spinnerStepLength);
	});
	$("#c_transactionRange").on('keyup', function(event){
		Util.allowNumKeyUp(document.getElementById("c_transactionRange"));
		var cv=$("#c_transactionRange").val();
		if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maxTransactionRange)){
			$("#c_transactionRange").val(marketAndOrderObj.maxTransactionRange);
		}
	});
	$("#c_transactionRange").on('blur', function(event){
		Util.allowNumKeyUp(document.getElementById("c_transactionRange"));
		var cv=$("#c_transactionRange").val();
		if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maxTransactionRange)){
			$("#c_transactionRange").val(marketAndOrderObj.maxTransactionRange);
		}
	});
	
	$("#c_omVolumeInput").on('keypress', function(event){
		return Util.allowMaxValueKeyPress(event,document.getElementById("c_omVolumeInput"),marketAndOrderObj.maximalVolume)
		       && Util.allowMaxDightsLenKeyPress(event,document.getElementById("c_omVolumeInput"),2)
		       && Util.allowMaxIntLenKeyPress(event,document.getElementById("c_omVolumeInput"),5);
	});
	
	$("#c_investmentQuota,#transactionRange,#omVolumeInput").on({
		dragenter : function(event) {
			return false;
		},
		paste : function(event) {
			return false;
		}
	});
	
	// 市价平仓,输入改变手数
	$("#c_omVolumeInput").on('keyup', function(){MarketClose._changeMarketVolumeInput();});
	
	// 市价平仓提交
	$("#c_btnOmOK").on('click', function(){MarketClose.submitMarketClose();});
	
	socket.listeners.$after({		
		// 報價 
		"tick": function(para, data){
			MarketClose.refresh();
		}
	});	
	
	socket.listeners.$add({		
		// 平倉
		"MarketCloseRet": function(para, data){
			MarketClose.GTShandleMarketRequestR(para);
		}
	});	
});
