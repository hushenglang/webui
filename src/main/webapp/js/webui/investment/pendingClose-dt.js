/**
 * 委托平仓
 */
var PeningClose = {
	/**
	 * 功能：初始化委托单平仓窗口的内容
	 *@param  obj  相关的数据对象键值对
	 */
	initPendingOrderDiv : function(post){
		
		var spinnerStep = Util.getSpinnerStep(CloseCommon.post.prdcode);
		$("#c_limitPrice").spinner({
		     step: spinnerStep,
		     numberFormat: "n"
		});
		$("#c_stopPrice").spinner({
		     step: spinnerStep,
		     numberFormat: "n"
		});
		Util.bindSpinnerEvent(CloseCommon.post.prdcode, "c_limitPrice");
		Util.bindSpinnerEvent(CloseCommon.post.prdcode, "c_stopPrice");
		// 初始化买卖信息
		var tradeTypeValue = post.buysell;
		var tradeTypeName = '---';
		
		if(tradeTypeValue==0) {
			tradeTypeName= i18n.buy;
		}
		else if(tradeTypeValue==1) {
			tradeTypeName= i18n.sell;
		}
		$("#c_pendingOrderTradedType").html(tradeTypeName);
		
		// 先清空类型下拉框
		$("#c_orderBusiTypeSel").empty();
		//初始化类型下拉框
		this.initPendingOrderType();
		// 初始化限价,停损范围
		var tradePrice = CloseCommon.getClosePrice();

		var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(CloseCommon.post.prdcode);
		
		if(!symbolObj) {
			console.log('data lost , reload...');
			window.location.reload();
			return;
		}
		var limitspread = symbolObj.limitspread; //最小距离, 限价用
		var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
		if(tradeTypeValue==0){//买入
			$("#c_limitOperate").html("≤"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, limitspread)));
			$("#c_limitPrice").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, limitspread)));
			$("#c_stopOperate").html("≥"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, triggerspread)));
			$("#c_stopPrice").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, triggerspread)));
			$("#c_buyLimitMax").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, limitspread)));
			$("#c_buyStopMin").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, triggerspread)));
		}
		else if(tradeTypeValue==1){//卖出
			$("#c_limitOperate").html("≥"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, limitspread)));
			$("#c_limitPrice").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, limitspread)));
			$("#c_stopOperate").html("≤"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, triggerspread)));
			$("#c_stopPrice").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, triggerspread)));
			$("#c_askLimitMin").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, limitspread)));
			$("#c_askStopMax").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, triggerspread)));
		}
		
		this.refresh();
		
		this._showLimitOrStopByBusiType(1);
		    
		//初始化手数
		$("#c_orderVolumeInput").val(Util.fixToStrTwodecimal(post.lot));
		
		//初始化期限
		var tradeTypes = document.getElementsByName("c_radioExpir");
	    for(var i = 0 ; i< tradeTypes.length; i++) {
	    	var tradeType = tradeTypes[i];
	    	if(tradeType.value == 0){
	    		tradeType.checked = true;
	    	}
	    }
	},
	
	
	refresh : function() {
		if('undefined' === typeof CloseCommon.post || CloseCommon.post == null) {
			return;
		}
		// 初始化限价,停损范围
		var tradePrice = CloseCommon.getClosePrice();
		
		var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(CloseCommon.post.prdcode);
		var limitspread = symbolObj.limitspread; //最小距离, 限价用
		var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
		
		var tradeTypeValue = CloseCommon.post.buysell;
		if(tradeTypeValue==0){//买入
			$("#c_limitOperate").html("≤"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, limitspread)));
			$("#c_stopOperate").html("≥"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, triggerspread)));
			$("#c_buyLimitMax").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, limitspread)));
			$("#c_buyStopMin").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, triggerspread)));
		}
		else if(tradeTypeValue==1){//卖出
			$("#c_limitOperate").html("≥"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, limitspread)));
			$("#c_stopOperate").html("≤"+Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, triggerspread)));
			$("#c_askLimitMin").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accAdd(tradePrice, limitspread)));
			$("#c_askStopMax").val(Util.formatPriceByPrdcode(CloseCommon.post.prdcode, Util.accSub(tradePrice, triggerspread)));
		}
	},
	
	/**
	 * 功能：初始委托平仓的类型
	 */
	initPendingOrderType : function(){
		var options = "";
		options += "<option value='" + pendingOrdertype.LIMIT + "'>" + i18n.trade.limitType + "</option>";      // 限价
		options += "<option value='" + pendingOrdertype.STOP + "'>" + i18n.trade.stopType+"</option>";          // 停损价
		options += "<option value='" + pendingOrdertype.BUY_OCO + "'>" + i18n.trade.buyOcoType + "</option>";   // 自动替代
		$("#c_orderBusiTypeSel").append(options);
	},
	
	/**
	 * 功能：获取委托平仓的类型值
	 */
	getPendingOrderTypeValue : function(){
		//L 限价 1,S 停损 2,B 自动替代 3
		var busiType = $("#c_orderBusiTypeSel").val();

		if(busiType == pendingOrdertype.LIMIT){ //限价 1
			return  OrderType.BUY_LIMIT; 
		}
		if(busiType == pendingOrdertype.STOP){   //停损 2
			return OrderType.BUY_STOP;
		}
		if(busiType == pendingOrdertype.BUY_OCO){  //自动替代 3
			return OrderType.BUY_OCO;
		}
	},
	
	/**
	 * 功能：判断当前输入的价格是否合法
	 */
	validatePrice : function(){
		var busiType = $("#c_orderBusiTypeSel").val();
		var buysell = CloseCommon.post.buysell;
		
		var tradePrice = CloseCommon.getClosePrice();
		
		var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(CloseCommon.post.prdcode);
		var limitspread = symbolObj.limitspread; //最小距离, 限价用
		var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
		var maxrange = symbolObj.maxrange;//最大委托价格范围
		var c_limitPrice = $("#c_limitPrice").val();
		var c_stopPrice = $("#c_stopPrice").val();		 
		var re = /XX/g;
		var rey = /YY/g;
		
		if(buysell == 0){ // 买
			c_limit_min=Number(Util.accSub(tradePrice,maxrange));
			c_limit_max=Number(Util.accSub(tradePrice,limitspread));
			c_stop_min=Number(Util.accAdd(tradePrice,triggerspread));
			c_stop_max=Number(Util.accAdd(tradePrice,maxrange));
			
			//自动替代
			if ((busiType == pendingOrdertype.BUY_OCO)) {
				if(isNaN(c_limitPrice)){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_limitPrice<c_limit_min){
					Alert(WebUIError[10112].replace(re, maxrange));			
					return false;
				}
				if(c_limitPrice>c_limit_max){
					Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
					return false;
				}
				if(isNaN(c_stopPrice)){
					Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
					return false;
				}
				if(c_stopPrice < c_stop_min){
					Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
					return false;
				}
				if(c_stopPrice>c_stop_max){
					Alert(WebUIError[10112].replace(re, maxrange));			
					return false;
				}
			} 
			
			// 限价
			if ((busiType == pendingOrdertype.LIMIT) || (busiType == pendingOrdertype.BUY_OCO) ) { 
				if(isNaN(c_limitPrice)){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_limitPrice < c_limit_min){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_limitPrice > c_limit_max){
					Alert(WebUIError[10106].replace(re, limitspread));	
					return false;
				}
			}
		
			 // 止损
			if ((busiType == pendingOrdertype.STOP) || (busiType == pendingOrdertype.BUY_OCO) ) {
				if(isNaN(c_stopPrice)){
					Alert(WebUIError[10108].replace(re, triggerspread));	
					return false;
				}
				if(c_stopPrice < c_stop_min){
					Alert(WebUIError[10108].replace(re, triggerspread));	
					return false;
				}
				if(c_stopPrice > c_stop_max){
					Alert(WebUIError[10112].replace(re, maxrange));			
					return false;
				}
			}
			
		}else{
			c_limit_min=Number(Util.accAdd(tradePrice,limitspread));
			c_limit_max=Number(Util.accAdd(tradePrice,maxrange));
			c_stop_min=Number(Util.accSub(tradePrice,maxrange));
			c_stop_max=Number(Util.accSub(tradePrice,triggerspread));
			
			if ((busiType == pendingOrdertype.BUY_OCO)) {
				if(isNaN(c_limitPrice)){
					Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));		
					return false;
				}
				if(c_limitPrice<c_limit_min){
					Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));			
					return false;
				}
				if(c_limitPrice>c_limit_max){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(isNaN(c_stopPrice)){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_stopPrice < c_stop_min){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_stopPrice>c_stop_max){
					Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));		
					return false;
				}
			} 
			
			// 限价
			if ((busiType == pendingOrdertype.LIMIT) || (busiType == pendingOrdertype.BUY_OCO) ) { 
				if(isNaN(c_limitPrice)){
					Alert(WebUIError[10107].replace(re, triggerspread));	
					return false;
				}
				if(c_limitPrice < c_limit_min){
					Alert(WebUIError[10107].replace(re, triggerspread));	
					return false;
				}
				if(c_limitPrice>c_limit_max){
					Alert(WebUIError[10112].replace(re, maxrange));			
					return false;
				}
			}
		
			 // 止损
			if ((busiType == pendingOrdertype.STOP) || (busiType == pendingOrdertype.BUY_OCO) ) {
				if(isNaN(c_stopPrice)){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_stopPrice < c_stop_min){
					Alert(WebUIError[10112].replace(re, maxrange));	
					return false;
				}
				if(c_stopPrice>c_stop_max){
					Alert(WebUIError[10109].replace(re, triggerspread));			
					return false;
				}
			}
			
		}
		
		return true;
	},
	
	/**
	 * 功能：委托平仓时提交
	 */
	submitPendingOrder : function(){
		var post = CloseCommon.post;
		
		if(!this.checkPendingOrderSubmit(post)){
			return false;
		}
		
		// 执行委托平仓
		this.doSubmitPendCloseAndCancelPendingOrder(post);
	},
	
	/**
	 * 功能: 委托单提交时校验
	 * 
	 * result： true 验证成功
	 * result： false 验证失败
	 */
	checkPendingOrderSubmit : function(post){
		var result = CloseCommon.validateVolume(post);
		
		if(result) {
			result = this.validatePrice();
		}
		
		return result;
	},
	
	/**
	 * 是否需要取消平仓委托订单. leftCloseLot-剩余可平仓手数(仓位总手数-当前平仓手数)
	 */ 
	doSubmitPendCloseAndCancelPendingOrder: function(post){
		if(!Validator.checkMarketPrice(post.prdcode)){
			return;
		}
		var closeLot = Util.fixToNum($("#c_orderVolumeInput").val());
		var totalLot = post.lot;
		var leftCloseLot =  parseFloat(totalLot)-parseFloat(closeLot);
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
				PeningClose.doSubmitPendingOrder(post);
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
			this.doSubmitPendingOrder(post);
		}
	},
	/**
	 * 功能：执行委托平仓
	 */
	doSubmitPendingOrder : function(post){
		var take_profit = 0;
		var stop_loss = 0;
		var price = null;
		
		CloseCommon.orderSubmitStartTime =new Date().getTime();
		CloseCommon.isSubmittingorder = true;
		CloseCommon.isResponseorder = false;
		
		var symbolList = getSymbolArray();
		var obj = null;
		if(symbolList) {
			for(var i = 0; i < symbolList.length; i++) {
				if(symbolList[i].prdcode == post.prdcode) {
					obj = symbolList[i];
					break;
				}
			}
		}	
		
		// 委托单提交成功后,动态显示提交成功的内容
		this._getPendingOrderSuccessSubmitedData(post, obj);
		
		var volume = Util.fixToNum($("#c_orderVolumeInput").val());
		
		var seq = Util.getRandomSeq();
		post.pendingOrderSeq = seq;
			
		var expir = parseInt($("input[name='c_radioExpir']:checked").val());
		
		var busiType = this.getPendingOrderTypeValue();
		if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {  // 3或4
			price = $("#c_limitPrice").spinner("value");
			take_profit = price;			
		}
		if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {  // 5或6
			price = $("#c_stopPrice").spinner("value");
			stop_loss = price;
		}
		if (busiType == OrderType.BUY_OCO || busiType == OrderType.SELL_OCO) {  // 9或10
			stop_loss = $("#c_stopPrice").spinner("value");
			take_profit = $("#c_limitPrice").spinner("value");
		}
		$("#c_pendOrderSuccessMsg").hide();
		$("#c_pendOrderPreSubmittingMsg").show();
		$("#c_pendOrderPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
		$("#c_orderUID").hide();  											  // 提交中时,没有委托号显示
		$("#c_pendingOrderC").hide();                                           // 提交中时不显示关闭按钮 
		$("#c_submitedFailedPendingOrderTable").hide();		
		$("#c_submitedSuccessPendingOrderTable").show();
		$("#c_pendingOrderFC").hide();
		$("#c_pendingOrderTable").hide();
		$("#c_pendingOrderP").hide();
		CloseCommon.disableTradeLi();
		CloseCommon.isAllowCloseTradeWindow = false;
		CloseCommon.hideCloseBtn();
		
		var tmpPrdId = '--';
		if(post.prdcode =='022')
			tmpPrdId = 0;
		else if(post.prdcode == '023')
			tmpPrdId = 1;
		
		var buysell = post.buysell;
		var dealType = buysell;
		
		var param = {
				"open_close" : 1, // 建仓: 0 平仓: 1
				"oid" : "", // 委托号或特别处理大单序列号
				"targetoid" : post.oid, // 需要平仓的单号
				"roid" : "", // mod20100919,关联单号:进阶单时,该单号是第二张单的单号
				
				"prdid" : tmpPrdId, // 产品ID 0.london gold 1.london silver 2.HK gold
				"optype" : busiType, // 下单类型：operation type 0市价单 1限价盘 2止蚀盘 3自动替代
				"tradedir" : dealType, // 买卖方向：trade direction 0买 1卖
				"positiondir" : 1, // 仓位方向：position direction 建仓0/平仓1
				"tradestatus" : 0, // 交易状态：-1取消 0未成交 1已成交
				"validtype" : expir, // 委托有效时间:0为当日有效，1为本周有效
				"validflag" : 0, // mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
				
				"lot" : volume, // 手数
				"time" : obj.dtime,
				"price" : Number(stop_loss),//委托止损价
				"limitprice" : Number(take_profit), // 委托限价单价
				"range" : 0, // 需求中没有此列
				"tradeunit" : 0, // 波幅（安司）
				
		};
		
		// 委托平仓单SOCKET请求
		socket.emit('request', Request.pendingOrder.cmd, param);
		
		// 提交订单后判断服务器是否在60以内响应
		tradeTimeOutObj = setTimeout(function() {CloseCommon.checkIsMoreThan60sAfterSubmit();}, 60*1000);
		
	},
	
	/**
	 * 功能：处理委托平仓提交的结果
	 */
	handlePendingOrderRequestR : function(para){
		var post = CloseCommon.post;
		
		if (post != null && para != null) {
			
			CloseCommon.isAllowCloseTradeWindow = true;
			CloseCommon.showCloseBtn();
			
			if(CloseCommon.isResponseorder){
				CloseCommon.isSubmittingorder = false;
				return;
			}else{
				CloseCommon.isSubmittingorder = false;
				CloseCommon.isResponseorder = true;
			}
			
			if (para.code == 0) {
				$("#c_orderUID").show();
				$("#c_submitedPendingOrderUIDSpan").html(Util.simpleOid(para.oid));  // 显示委托号
				$("#c_pendOrderPreSubmittingMsg").hide();
				$("#c_pendOrderSuccessMsg").show();
				$("#c_pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
				$("#c_submitedSuccessPendingOrderTable").show();
				$("#c_pendingOrderC").show();
				$("#c_pendingOrderTable").hide();
				$("#c_pendingOrderP").hide();
				$("#c_submitedFailedPendingOrderTable").hide();
				$("#c_pendingOrderFC").hide();
			} else {
				//对应的错误提示信息+错误号
				if(para.ret == 1026 || para.ret == '1026'){
					$("#c_pendingOrderErrorMessage").html(WebUIError[para.code].format(364));
				}
				else if(para.ret == 155 || para.ret == '155'){
					//var symbolConfig = getAmsSymbolConfig4Code(marketAndOrderObj.prdcode);
					$("#c_pendingOrderErrorMessage").html(WebUIError[para.code].format(Util.fixToStrTwodecimal(368)));
				}
				else{
					$("#c_pendingOrderErrorMessage").html(WebUIError[para.code]);
				}
				$("#c_submitedFailedPendingOrderTable").show();
				$("#c_pendOrderPreSubmittingMsg").hide();
				$("#c_pendOrderSuccessMsg").hide();
				$("#c_pendingOrderFC").show();
				$("#c_submitedSuccessPendingOrderTable").hide();
				$("#c_pendingOrderC").hide();
				$("#c_pendingOrderTable").hide();
				$("#c_pendingOrderP").hide();
			}
		}
		clearTimeout(tradeTimeOutObj);
	},
	
	/**
	 * 功能：委托单提交成功后,动态获取对应的文本框的值
	 */
	_getPendingOrderSuccessSubmitedData : function(post, data){
		var str="",tradeTypeTxt="",busiTypeTxt="",price;
		var limitPriceText = Util.formatPriceByPrdcode(post.prdcode, $("#c_limitPrice").spinner("value"));
		var stopPriceText = Util.formatPriceByPrdcode(post.prdcode, $("#c_stopPrice").spinner("value"));
		var orderVolumeInputText = Util.fixToStrTwodecimal($("#c_orderVolumeInput").val());
		var expirText = parseInt($("input[name='c_radioExpir']:checked").val()) == 0 ? i18n.trade.dayEffective : i18n.trade.weekEffective;   // "当日有效" : "当周有效"
		
		// 先清空除了第一行和最后一行的所有tr
		$("#c_submitedSuccessPendingOrderTable tr").not("#c_submitedSuccessPendingOrderTr").remove();
		
		var busiType = this.getPendingOrderTypeValue();
		var buysell = post.buysell;
		var limitT = "";
		var stopT= "";
		
		if(buysell == 0) { //buy
			busiTypeTxt = i18n.trade.buyType;
			limitT = i18n.trade.limitBuyTxt;      // 限价买入
			stopT =  i18n.trade.stopBuyTxt;       // 停损买入
		} else {
			busiTypeTxt = i18n.trade.askType; 
			limitT = i18n.trade.limitAskTxt;      // 限价卖出 
			stopT = i18n.trade.stopAskTxt;        // 停损卖出
		}
		// 如果是限价和停损单 (页面展示：类型  卖出  手数   期限  委托号等字段
		if(busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT || busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP){
			if(busiType == OrderType.BUY_LIMIT){
				tradeTypeTxt = i18n.trade.typeLimit;  //"類型:限價"
				price = limitPriceText;
			}else if(busiType == OrderType.SELL_LIMIT){
				tradeTypeTxt = i18n.trade.typeLimit;   //"類型:限價"
				price= limitPriceText;
			}else if(busiType == OrderType.BUY_STOP){
				tradeTypeTxt = i18n.trade.typeStop;  //"類型:停損"
				price= stopPriceText;
			}else{
				tradeTypeTxt = i18n.trade.typeStop;  //"類型:停損"
				price= stopPriceText;
			}
			str = "<tr><td><ul class='subm-info'>"
					 +"<li>"+tradeTypeTxt+"</li>"
					 +"<li>"+busiTypeTxt+price+"</li>"
					 +"<li>"+i18n.trade.volumeTxt+orderVolumeInputText+"</li>"
					 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
					 +"<li id='c_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='c_submitedPendingOrderUIDSpan'></span>"+"</li>"
				     +"</ul></td></tr>";
		    $("#c_submitedSuccessPendingOrderTr").after(str);
		}
		
		// 如果是自动替代单,则提交成功后页面展示：类型 限价卖出  停损卖出  手数   期限    委托号
		else if(busiType == OrderType.BUY_OCO || OrderType.SELL_OCO){			
			tradeTypeTxt = i18n.trade.typeBuyOco;  // 自动替代
			
			str = "<tr><td><ul class='subm-info'>"
				 +"<li>"+tradeTypeTxt+"</li>"
				 +"<li>"+limitT+limitPriceText+"</li>"
				 +"<li>"+stopT+stopPriceText+"</li>"
				 +"<li>"+i18n.trade.volumeTxt+orderVolumeInputText+"</li>"
				 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
				 +"<li id='c_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='c_submitedPendingOrderUIDSpan'></span>"+"</li>"
			     +"</ul></td></tr>";
			$("#c_submitedSuccessPendingOrderTr").after(str);
		}
	},	
	
	/**
	 * 功能：委托平仓修改类型时调用
	 */
	_changeOrderBusiType : function() {
		var orderType = this.getPendingOrderTypeValue();
		this._showLimitOrStopByBusiType(orderType);
	},
	
	/**
	 * 功能：委托平仓根据不同类型,显示或隐藏限价框或停损框.
	 * 描述：1)如果委托平仓类型为卖出限价/买出限价 则限价框亮起,停损框灰掉
	 *     2)如果委托平仓类型为卖出停损/买出停损 则停损框亮起,限价框灰掉
	 *     3)如果委托平仓类型为 自动替代 则限价框、停损框都亮起
	 */
	_showLimitOrStopByBusiType : function(busiType){
		// L 限价 1
		if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {
			$("#c_limitPrice").spinner("enable");
			$("#c_stopPrice").spinner("disable");
			
			$('#c_limitPrice').attr("disabled",false);
			$('#c_stopPrice').attr("disabled",true);
		}
		
		// S 停损 2
		if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {
			$("#c_limitPrice").spinner("disable");
			$("#c_stopPrice").spinner("enable");
			
			$('#c_limitPrice').attr("disabled",true);
			$('#c_stopPrice').attr("disabled",false);
		}
		
		//  B 自动替代 3
		if (busiType == OrderType.BUY_OCO || busiType == OrderType.SELL_OCO) {
			$("#c_limitPrice").spinner("enable");
			$("#c_stopPrice").spinner("enable");
			
			$('#c_limitPrice').attr("disabled",false);
			$('#c_stopPrice').attr("disabled",false);
		}
	},

};



$(function() {
	// 相关验证(限价、停损价、投资额度、手数仅允许输入的最大值、小数位)
	//$("#c_limitPrice", "#c_stopPrice").spinner();
	$("#c_limitPrice").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("c_limitPrice"));
	});
	
	$("#c_stopPrice").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("c_stopPrice"));
	});
	
	$("#c_pendingOrderInvestmentQuota").on('keypress', function(event){
		return Util.allowMaxValueKeyPress(event,document.getElementById("c_pendingOrderInvestmentQuota"),marketAndOrderObj.investmentQuotaMax)
		       && Util.allowMaxDightsLenKeyPress(event,document.getElementById("c_pendingOrderInvestmentQuota"),2)
		       && Util.allowMaxIntLenKeyPress(event,document.getElementById("c_pendingOrderInvestmentQuota"),Util.getIntLen(marketAndOrderObj.investmentQuotaMax));
	});
	$("#c_pendingOrderInvestmentQuota").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("c_pendingOrderInvestmentQuota"));
	});
	
	$("#c_orderVolumeInput").on('keypress', function(event){
		return Util.allowMaxValueKeyPress(event,document.getElementById("c_orderVolumeInput"),marketAndOrderObj.maximalVolume)
			   && Util.allowMaxDightsLenKeyPress(event,document.getElementById("c_orderVolumeInput"),2)
			   && Util.allowMaxIntLenKeyPress(event,document.getElementById("c_orderVolumeInput"),5);
	});
	$("#c_orderVolumeInput").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("c_orderVolumeInput"));
		 //calculatePendingMargin($("#c_orderVolumeInput").val());
	});
	
	$("#c_limitPrice,#stopPrice,#c_pendingOrderInvestmentQuota,#c_orderVolumeInput").on({
		dragenter : function(event) {
			return false;
		},
		paste : function(event) {
			return false;
		}
	});
	
	// 委托平仓 改变类型
	$("#c_orderBusiTypeSel").on('change', function(){PeningClose._changeOrderBusiType();});
	
	// 委托平仓提交
	$("#c_btnOrderOK").on('click', function() {PeningClose.submitPendingOrder();});
	
	socket.listeners.$after({		
		// 報價 
		"tick": function(para, data){
			PeningClose.refresh();
		}
	});	
	
	socket.listeners.$add({'PendingOrderRet': function(para, data) {
		PeningClose.handlePendingOrderRequestR(para);
	}});
});
