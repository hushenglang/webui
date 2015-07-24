/**
 * 	委托开仓
 * 
 */
$(function() {
	$("#limitPrice").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("limitPrice"));
	});
	
	$("#stopPrice").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("stopPrice"));
	});
	
	$("#orderVolumeInput").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,document.getElementById("orderVolumeInput"),2);
	});
	$("#orderVolumeInput").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("orderVolumeInput"));
		 var cv=$("#orderVolumeInput").val();
		 if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maximalVolume)){
			$("#orderVolumeInput").val(marketAndOrderObj.maximalVolume);
		 }else{
			 _changeOrderVolumeForInputText();
		 }
	});
	
	$("#advance_open_orderVolumeInput").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,document.getElementById("advance_open_orderVolumeInput"),2);
	});
	$("#advance_open_orderVolumeInput").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("advance_open_orderVolumeInput"));
		 var cv=$("#advance_open_orderVolumeInput").val();
		 if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maximalVolume)){
			$("#advance_open_orderVolumeInput").val(marketAndOrderObj.maximalVolume);
		 }else{
			 _changeAdvanceOrderVolumeForInputText();
		 }
	});
	
	
	$("#modify_limitPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&&
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_limitPrice"),5);
	});
	
	$("#modify_stopPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&& 
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_stopPrice"),5);
	});
	
	$("#modify_advance_open_limitPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&& 
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_advance_open_limitPrice"),5);
	});
	
	$("#modify_advance_open_stopPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&& 
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_advance_open_stopPrice"),5);
	});
	
	$("#modify_advance_close_limitPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&& 
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_advance_close_limitPrice"),5);
	});
	
	$("#modify_advance_close_stopPrice").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,this,2)&& 
		Util.allowMaxIntLenKeyPress(event,document.getElementById("modify_advance_close_stopPrice"),5);
	});
	
	//修改委托单手数
	$("#orderVolumeSel-btn").on('click',function(){
		var lis=$("#orderVolumeSel li");
		lis.removeClass("sxc-lihov");
		lis.each(function(){
			if($(this).attr("tv")==$("#orderVolumeInput").val()){
				$(this).addClass("sxc-lihov");
			}
		});
		$("#orderVolumeSel").toggle();
	 });
	//修改进阶单手数
	$("#advance_open_orderVolumeSel-btn").on('click',function(){
		var lis=$("#advance_open_orderVolumeSel li");
		lis.removeClass("sxc-lihov");
		lis.each(function(){
			if($(this).attr("tv")==$("#advance_open_orderVolumeInput").val()){
				$(this).addClass("sxc-lihov");
			}
		});
		$("#advance_open_orderVolumeSel").toggle();
	});
	
	//修改进阶委托单手数来修改其的保证金
	$("#advance_open_orderVolumeInput").on('keyup', _changeAdvanceOrderVolumeForInput);
	
	// 委托下单 改变类型
	$("#orderBusiTypeSel").on('change', _changeOrderBusiType);
	
	// 进阶委托单开仓下单 改变类型
	$("#advance_open_orderBusiTypeSel").on('change', _changeAdvanceOpenOrderBusiType);
	
	$("#advance_open_limitPrice").blur(_changeAdvanceOpenOrderBusiType);
	$("#advance_open_stopPrice").blur(_changeAdvanceOpenOrderBusiType);
	$("#advance_open_limitPrice").on("keyup", _changeAdvanceOpenOrderBusiType);
	$("#advance_open_stopPrice").on("keyup", _changeAdvanceOpenOrderBusiType);
	
	$("#modify_advance_open_limitPrice").blur(_changeModifyAdvanceOpenOrderBusiType);
	$("#modify_advance_open_limitPrice").on("keyup", _changeModifyAdvanceOpenOrderBusiType);
	
	$("#modify_advance_open_stopPrice").blur(_changeModifyAdvanceOpenOrderBusiType);
	$("#modify_advance_open_stopPrice").on("keyup", _changeModifyAdvanceOpenOrderBusiType);
	
	// 进阶委托单平仓下单 改变类型
	$("#advance_close_orderBusiTypeSel").on('change', _changeAdvanceCloseOrderBusiType);
	
	// 委托下单提交
	$("#btnOrderOK").unbind('click').on('click', submitPendingOrder);
	
	// 进阶委托下单提交
	$("#btnAdvanceOrderOK").unbind('click').on('click', submitAdvancePendingOrder);
	
	// 修改委托下单提交
	$("#modify_btnOrderOK").unbind('click').on('click', submitModifyPendingOrder);
	
});

/**
 * 功能：初始化修改进阶委托单窗口的内容
 *@param advPendingOrderObj
 *		 进阶委托单对象
 *@author Joe
 *@date   2013-11-21下午3:20:07
 *@param  obj  相关的数据对象键值对
 */
initModifyAdvancePendingOrderDiv = function(advPendingOrderObj, symbolObj){
	$("#modify_pendingOrderTable tr[name='unadvance']").hide();
	$("#modify_pendingOrderTable tr[name='advance']").show();
	
	Util.bindSpinnerEvent(symbolObj.prdcode, "modify_advance_open_limitPrice");
	Util.bindSpinnerEvent(symbolObj.prdcode, "modify_advance_open_stopPrice");
	Util.bindSpinnerEvent(symbolObj.prdcode, "modify_advance_close_limitPrice");
	Util.bindSpinnerEvent(symbolObj.prdcode, "modify_advance_close_stopPrice");
	var spinnerStep = Util.getSpinnerStep(symbolObj.prdcode);
	
	var openPendingOrderObj = advPendingOrderObj[0];
	var closePendingOrderObj = advPendingOrderObj[1];
	
	var open_opttype = openPendingOrderObj.optype; //开仓类型 0市价单  1限价盘 2停损盘  
	var open_limitprice = openPendingOrderObj.limitprice;//开仓限价价格
	var open_stopprice = openPendingOrderObj.price;//开仓止损价格
	var lot = openPendingOrderObj.lot;//开仓手数
	var open_tradedir = openPendingOrderObj.tradedir; //买卖方向：trade direction　  0买　1卖
	
	var close_opttype = closePendingOrderObj.optype;//平仓类型 0市价单  1限价盘 2停损盘 3自动替代
	var close_limitprice = closePendingOrderObj.limitprice;//平仓限价价格
	var close_stopprice = closePendingOrderObj.price;//平仓止损价格
	var validtype = closePendingOrderObj.validtype;//委托有效时间:0为当日有效，1为本周有效
	var close_tradedir = closePendingOrderObj.tradedir; //买卖方向：trade direction　  0买　1卖
	
	if(open_opttype==1)
		open_price = open_limitprice;
	else if(open_opttype==2)
		open_price = open_stopprice;

	if(close_opttype==1)
		close_price = close_limitprice;
	else if(close_opttype==2)
		close_price = close_stopprice;
	
	/**初始化页面控件显示**/
	$("#modify_orderBusiType").html(i18n.dynamic.advpending);
	
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange;//最大委托价格范围
	var limitspread = symbolObj.limitspread;
	var triggerspread = symbolObj.triggerspread;
	
	
	/******************************初始化开仓类型**********************************/
	var open_optypename = '---';
	if(open_opttype==1) {
		open_optypename = i18n.dynamic.limitprice;
	}
	else if(open_opttype==2) {
		open_optypename = i18n.dynamic.stop;
	}
	
	$("#modify_advance_open_orderBusiType").html(open_optypename);
	
	//初始化开仓价格和买卖方向
	var open_tradeTypeName;//开仓买卖方向
	var close_TradeTypeName;//平仓买卖方向
	var close_TradeTypeNameForCoc;//平仓买卖方向
	var currentTradePrice;
	if(open_tradedir==0)
		currentTradePrice = Util.formatPriceByPrdcode(symbolObj.prdcode, symbolObj.bid);
	else if(open_tradedir==1)
		currentTradePrice = Util.formatPriceByPrdcode(symbolObj.prdcode, symbolObj.ask);
	else
		currentTradePrice='---';
	if(open_tradedir==0){
		open_tradeTypeName = i18n.trade.tip_label_buy;
		close_TradeTypeName = i18n.trade.tip_label_sell;
		close_TradeTypeNameForCoc = i18n.trade.sell;
		//进阶委托
		$("#modify_advance_open_limitOperate").html("≤"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice), Number(limitspread))));
		$("#modify_advance_open_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice),Number(limitspread))));
		$("#modify_advance_open_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice),Number(maxrange))));
		$("#modify_advance_open_limitPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
		});
		
		$("#modify_advance_open_stopOperate").html("≥"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice), Number(triggerspread))));
		$("#modify_advance_open_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice),Number(maxrange))));
		$("#modify_advance_open_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice),Number(triggerspread))));
		$("#modify_advance_open_stopPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
		});
		
	}
	else if(open_tradedir==1){
		open_tradeTypeName = i18n.trade.tip_label_sell;
		close_TradeTypeName = i18n.trade.tip_label_buy;
		close_TradeTypeNameForCoc = i18n.trade.buy;
		//进阶委托
		$("#modify_advance_open_limitOperate").html("≥"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice), Number(limitspread))));
		$("#modify_advance_open_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice),Number(maxrange))));
		$("#modify_advance_open_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(currentTradePrice),Number(limitspread))));
		$("#modify_advance_open_limitPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
		});
		
		$("#modify_advance_open_stopOperate").html("≤"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice), Number(triggerspread))));
		$("#modify_advance_open_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice),Number(triggerspread))));
		$("#modify_advance_open_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(currentTradePrice),Number(maxrange))));
		$("#modify_advance_open_stopPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
		});
		
	}else{
		open_tradeTypeName='---';
	}
	if(open_opttype==1){ //限价
		$("#modify_advance_open_pendingOrderTradedType_limitPrice").html(open_tradeTypeName); //文字显示初始化
		$("#modify_advance_open_limitPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, open_limitprice)); //价格初始化
		//控制限价和止损价控件的显示
		$("#modify_advance_open_pendingOrder_limitPrice").show();
		$("#modify_advance_open_pendingOrder_stopPrice").hide();
	}else if(open_opttype==2){//停损
		$("#modify_advance_open_pendingOrderTradedType_stopPrice").html(open_tradeTypeName);
		$("#modify_advance_open_stopPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, open_stopprice));
		$("#modify_advance_open_pendingOrder_limitPrice").hide();
		$("#modify_advance_open_pendingOrder_stopPrice").show();
	}
	
	//初始化手数
	$("#modify_advance_orderVolumeSpan").html(Util.fixToStrTwodecimal(lot));
	
	//初始化保证金
	var userMargin = getUserMargin(symbolObj.prdcode);
	$("#modify_advance_pendingMargin").html(Util.fixToStrTwodecimal(userMargin*lot) + '&nbsp;USD');
	
	
	
	/******************************初始化平仓类型**********************************/
	//初始化开仓类型
	var close_optypename;
	if(close_opttype==1)
		close_optypename = i18n.dynamic.limitprice;
	else if(close_opttype==2)
		close_optypename = i18n.dynamic.stop;
	else if(close_opttype==3)
		close_optypename = i18n.dynamic.autoreplace;
	$("#modify_advance_close_orderBusiType").html(close_optypename);
	
	//初始化价格和文字
	if(open_tradedir==0){
		var advance_open_limitPrice = $("#modify_advance_open_limitPrice").val();
		var advance_open_stopPrice = $("#modify_advance_open_stopPrice").val();
		if(open_opttype == OrderType.BUY_LIMIT){
			$("#modify_advance_close_limitOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice ), Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice ), Number(orderspread))));
			$("#modify_advance_close_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
			$("#modify_advance_close_stopOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice), Number(orderspread))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice), Number(maxrange))));
			$("#modify_advance_close_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
		}else if(open_opttype == OrderType.BUY_STOP){
			$("#modify_advance_close_limitOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice ), Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice ), Number(orderspread))));
			$("#modify_advance_open_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
			$("#modify_advance_close_stopOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread))));
			$("#modify_advance_open_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
		}
	}
	else if(open_tradedir==1){
		var advance_open_limitPrice = $("#modify_advance_open_limitPrice").val();
		var advance_open_stopPrice = $("#modify_advance_open_stopPrice").val();
		var closeBusiType = getAdvancePendingOrderTypeValue('close');
		if(open_opttype == OrderType.BUY_LIMIT){
			$("#modify_advance_close_limitOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice ), Number(maxrange))));
			$("#modify_advance_close_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
			$("#modify_advance_close_stopOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread))));
			$("#modify_advance_close_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
		}else if(open_opttype == OrderType.BUY_STOP){
			$("#modify_advance_close_limitOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice ), Number(maxrange))));
			$("#modify_advance_close_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
			$("#modify_advance_close_stopOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread))));
			$("#modify_advance_close_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin : function( event, ui ) {_changeModifyAdvanceOpenOrderBusiType();}
			});
			
		}
		
	}
	
	if(close_opttype==1){ //限价
		$("#modify_advance_close_pendingOrderTradedType_limitPrice").html(close_TradeTypeName); //文字显示初始化
		$("#modify_advance_close_limitPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, close_limitprice)); //价格初始化
		$("#modify_advance_close_pendingOrder_limitPrice").show();
		$("#modify_advance_close_pendingOrder_stopPrice").hide();
	}else if(close_opttype==2){//停损
		$("#modify_advance_close_pendingOrderTradedType_stopPrice").html(close_TradeTypeName);
		$("#modify_advance_close_stopPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, close_stopprice));
		$("#modify_advance_close_pendingOrder_limitPrice").hide();
		$("#modify_advance_close_pendingOrder_stopPrice").show();
	}else if(close_opttype==3){//自动替换
		$("#modify_advance_close_pendingOrderTradedType_limitPrice").html(i18n.dynamic.limitprice+close_TradeTypeNameForCoc+"："); //文字显示初始化
		$("#modify_advance_close_pendingOrderTradedType_stopPrice").html(i18n.dynamic.stop+close_TradeTypeNameForCoc+"：");
		$("#modify_advance_close_limitPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, close_limitprice)); //价格初始化
		$("#modify_advance_close_stopPrice").val(Util.formatPriceByPrdcode(symbolObj.prdcode, close_stopprice));
		$("#modify_advance_close_pendingOrder_limitPrice").show();
		$("#modify_advance_close_pendingOrder_stopPrice").show();
	}
	
	//初始化期限
	var validtypeText;
	if(validtype==0){
		validtypeText = i18n.report.effectiveInDate;
	}
	else if(validtype==1){
		validtypeText =i18n.report.effectiveInWeekly;
	}
	else{
		validtypeText = '---';
	}
	$("#modify_advance_defaultExpir").html(validtypeText);
	
	//

};

/**
 * 功能：初始化修改普通委托单窗口的内容
 *@author Joe
 *@date   2013-11-21下午3:20:07
 *@param  obj  相关的数据对象键值对
 */
initModifyPendingOrderDiv = function(pendingOrderObj, symbolObj){
	$("#modify_pendingOrderTable tr[name='unadvance']").show();
	$("#modify_pendingOrderTable tr[name='advance']").hide();
	
	Util.bindSpinnerEvent(pendingOrderObj.prdid, "modify_limitPrice");
	Util.bindSpinnerEvent(pendingOrderObj.prdid, "modify_stopPrice");
	var spinnerStep = Util.getSpinnerStep(pendingOrderObj.prdid);
	
	var prdid = pendingOrderObj.prdid; //产品ID　0.london gold　1.london silver 2.HK gold
	var optype = pendingOrderObj.optype; //下单类型：operation type  0市价单  1限价盘 2停损盘 3自动替代
	var tradedir = pendingOrderObj.tradedir; //买卖方向：trade direction　  0买　1卖
	var validtype = pendingOrderObj.validtype;//委托有效时间:0为当日有效，1为本周有效
	var lot = pendingOrderObj.lot;//手数
	var limitprice = pendingOrderObj.limitprice;//委托限价单价
	var price = pendingOrderObj.price;//单价;自动替换单时为触价单价
	
	/**************************初始化非进阶类型**************************/
	var optypename;
	//初始化类型
	if(optype==1){
		optypename = i18n.dynamic.limitprice;
	}
	else if(optype==2){
		optypename = i18n.dynamic.stop;
	}
	else if(optype==3){
		optypename =i18n.dynamic.autoreplace;
	}
	$("#modify_orderBusiType").html(optypename);
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange;//最大委托价格范围
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	
	var tradeTypeName;
	var opposeTradeTypeName;
	var tradePrice;
	var defalutLimitPrice; 
	var defalutStopPrice;
	
	if(tradedir==0)
		tradePrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, symbolObj.bid);
	else if(tradedir==1)
		tradePrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, symbolObj.ask);
	else
		tradePrice='---';
	if(tradedir==0){
		tradeTypeName = i18n.trade.tip_label_buy;
		tradeTypeNameForCoc = i18n.trade.buy;
		opposeTradeTypeName= i18n.trade.tip_label_sell;
		defalutLimitPrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice), Number(limitspread)));
		$("#modify_limitOperate").html("≤"+defalutLimitPrice);
		$("#modify_limit_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(limitspread))));
		$("#modify_limit_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(maxrange))));
		$("#modify_limitPrice").spinner({
			step: spinnerStep,
			numberFormat: "n"
		});
		
		defalutStopPrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice), Number(triggerspread)));
		$("#modify_stopOperate").html("≥"+defalutStopPrice);
		$("#modify_stop_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_stop_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(triggerspread))));
		$("#modify_stopPrice").spinner({
			step: spinnerStep,
			numberFormat: "n"
		});
	}
	else if(tradedir==1){
		tradeTypeName = i18n.trade.tip_label_sell;
		tradeTypeNameForCoc = i18n.trade.sell;
		opposeTradeTypeName = i18n.trade.tip_label_buy;
		defalutLimitPrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice), Number(limitspread)));
		$("#modify_limitOperate").html("≥"+defalutLimitPrice);
		$("#modify_limit_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_limit_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(limitspread))));
		$("#modify_limitPrice").spinner({
			step: spinnerStep,
			numberFormat: "n"
		});
		
		defalutStopPrice = Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice), Number(triggerspread)));
		$("#modify_stopOperate").html("≤"+defalutStopPrice);
		$("#modify_stop_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(triggerspread))));
		$("#modify_stop_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(maxrange))));
		$("#modify_stopPrice").spinner({
			step: spinnerStep,
			numberFormat: "n"
		});
	}else{
		tradeTypeName='---';
	}
	
	//初始化价格
	if(optype==1){ //限价
		$("#modify_pendingOrderTradedType_limitPrice").html(tradeTypeName); //文字显示初始化
		$("#modify_limitPrice").val(limitprice); //价格初始化
		//控制限价和止损价控件的显示
		$("#modify_pendingOrder_limitPrice").show();
		$("#modify_pendingOrder_stopPrice").hide();
	}else if(optype==2){//停损
		$("#modify_pendingOrderTradedType_stopPrice").html(tradeTypeName);
		$("#modify_stopPrice").val(price);
		$("#modify_pendingOrder_limitPrice").hide();
		$("#modify_pendingOrder_stopPrice").show();
	}else if(optype==3){//自动替代
		$("#modify_pendingOrderTradedType_limitPrice").html(i18n.dynamic.limitprice+tradeTypeNameForCoc+"：");
		$("#modify_pendingOrderTradedType_stopPrice").html(i18n.dynamic.stop+tradeTypeNameForCoc+"：");
		$("#modify_limitPrice").val(limitprice);
		$("#modify_stopPrice").val(price);
		$("#modify_pendingOrder_limitPrice").show();
		$("#modify_pendingOrder_stopPrice").show();
	}
	
	//初始化手数
	$("#modify_orderVolumeSpan").html(Util.fixToStrTwodecimal(lot));
	
	//初始化保证金
	var userMargin = getUserMargin(symbolObj.prdcode);
	$("#modify_pendingMargin").html(Util.fixToStrTwodecimal(userMargin*lot));
		
	//初始化期限
	var validtypeText;
	if(validtype==0)
		validtypeText = i18n.report.effectiveInDate;
	else if(validtype==1)
		validtypeText = i18n.report.effectiveInWeekly;
	else
		validtypeText = '---';
	$("#modify_defaultExpir").html(validtypeText);
	
};


/**
 * 功能：初始化普通委托单和进阶委托单下单窗口的内容
 *@author Gavin.guo
 *@date   2013-11-21下午3:20:07
 *@param  obj  相关的数据对象键值对
 */
initPendingOrderDiv = function(pendingOrderObj, obj){
	_settingPendingOrderDiv(obj);
};

/**
 * 功能：当初始化委托单或刷新委托单窗口的内容时调用
 *@author Gavin.guo
 *@date   2013-11-21下午3:30:00 
 */
_settingPendingOrderDiv = function(obj){
	// 初始化买卖信息
	var tradeTypeValue = marketAndOrderObj.defaultTradeType;
	var tradeTypeName;
	var opposeTradeTypeName;
	if(tradeTypeValue==0){
		tradeTypeName=i18n.trade.buy;
		opposeTradeTypeName=i18n.trade.sell;
	}
	else if(tradeTypeValue==1){
		tradeTypeName=i18n.trade.sell;
		opposeTradeTypeName=i18n.trade.buy;
	}
	else
		tradeTypeName='---';
	$("#pendingOrderTradedType").html(tradeTypeName);
	$("#advance_open_pendingOrderTradedType").html(tradeTypeName);
	$("#advance_close_pendingOrderTradedType").html(opposeTradeTypeName);
	
	
	// 初始化限价,停损范围
	var tradeTypeValue = marketAndOrderObj.defaultTradeType; //买卖方向 0-买, 1-卖
	refreshOrInitPendingOrderPrice(tradeTypeValue, 1);
	refreshOrInitAdvancePendingOrderPrice(tradeTypeValue, 1);
	
	//初始化类型下拉框
	initPendingOrderSelType();

	//根据当前的类类型,显示或灰掉限价、停损
	_showLimitOrStopByBusiType(getPendingOrderTypeValue());
	//进阶委托单根据当前的类类型,显示或灰掉限价、停损
	_showAdvanceOpenLimitOrStopByBusiType(getPendingOrderTypeValue('open'));
	_showAdvanceCloseLimitOrStopByBusiType(getPendingOrderTypeValue('close'));
	
	//初始化手数
	initPendingOrderVolume();
	initAdvancePendingOrderVolume();
	
	//初始化默认保证金
    var tmpMargin = parseFloat($("#orderVolumeInput").val()) * getUserMargin(marketAndOrderObj.prdcode);
    $("#pendingMargin").html(Util.fixToStrTwodecimal(tmpMargin));
    $("#advance_open_pendingMargin").html(Util.fixToStrTwodecimal(tmpMargin));
    
	//初始化期限
	var tradeTypes = document.getElementsByName("radioExpir");
    for(var i = 0 ; i< tradeTypes.length; i++) {
    	var tradeType = tradeTypes[i];
    	if(tradeType.value == 0){
    		tradeType.checked = true;
    	}
    }
    var tradeTypes = document.getElementsByName("advance_radioExpir");
    for(var i = 0 ; i< tradeTypes.length; i++) {
    	var tradeType = tradeTypes[i];
    	if(tradeType.value == 0){
    		tradeType.checked = true;
    	}
    }
};

//初始化普通委托单价格
refreshOrInitPendingOrderPrice = function(tradeTypeValue, isInit){
	
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "limitPrice");
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "stopPrice");
	
	var spinnerStep = Util.getSpinnerStep(marketAndOrderObj.prdcode);
	
	var limitspread = Number(marketAndOrderObj.limitspread);
	var triggerspread = Number(marketAndOrderObj.triggerspread);
	var maxrange = Number(marketAndOrderObj.maxrange);
	var tradePrice;
	if(tradeTypeValue==0)
		tradePrice = Number(marketAndOrderObj.buy);
	else if(tradeTypeValue==1)
		tradePrice = Number(marketAndOrderObj.ask);
	else
		tradePrice='---';
	
	var defalutInputLimitPrice; //默认限价输入框带入的价格.
	var defalutInputStopPrice; //默认止损输入框带入的价格.
	
	if(tradeTypeValue==0){//买入
		defalutInputLimitPrice = Util.accSub(tradePrice,limitspread);
		$("#limitOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutInputLimitPrice));
		
		$("#limit_max").val(Util.accSub(tradePrice,limitspread));
		$("#limit_min").val(Util.accSub(tradePrice,maxrange));
		
		defalutInputStopPrice = Util.accAdd(tradePrice,triggerspread);
		$("#stopOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutInputStopPrice));
		$("#stop_max").val(Util.accAdd(tradePrice,maxrange));
		$("#stop_min").val(Util.accAdd(tradePrice,triggerspread));
	}
	else if(tradeTypeValue==1){//卖出
		defalutInputLimitPrice = Util.accAdd(tradePrice,limitspread);
		$("#limitOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutInputLimitPrice));
		$("#limit_max").val(Util.accAdd(tradePrice,maxrange));
		$("#limit_min").val(Util.accAdd(tradePrice,limitspread));
		
		defalutInputStopPrice = Util.accSub(tradePrice,triggerspread);
		$("#stopOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutInputStopPrice));
		$("#stop_max").val(Util.accSub(tradePrice,triggerspread));
		$("#stop_min").val(Util.accSub(tradePrice,maxrange));
	}
	
	//若是初始化,则给价格框输入默认值
	if(isInit==1){
		$("#limitPrice").val(defalutInputLimitPrice);
		$("#limitPrice").spinner({
			step: spinnerStep,
			min : 0,
			max : 10000,
			numberFormat: "n"
		});
		
		$("#stopPrice").val(defalutInputStopPrice);
		$("#stopPrice").spinner({
			step: spinnerStep,
			min : 0,
			max : 10000,
			numberFormat: "n"
		});
	}
};

//初始化刷新进阶委托单价格, 开仓初始化时,进阶的类型只可能是限价
refreshOrInitAdvancePendingOrderPrice = function(tradeTypeValue, isInit){
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "advance_open_limitPrice");
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "advance_open_stopPrice");
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "advance_close_limitPrice");
	Util.bindSpinnerEvent(marketAndOrderObj.prdcode, "advance_close_stopPrice");
	
	var spinnerStep = Util.getSpinnerStep(marketAndOrderObj.prdcode);
	
	var tradePrice;
	if(tradeTypeValue==0)
		tradePrice = marketAndOrderObj.buy;
	else if(tradeTypeValue==1)
		tradePrice = marketAndOrderObj.ask;
	else
		tradePrice='---';

	// 更新平仓限价,停损范围
	var orderspread = marketAndOrderObj.orderspread; //进阶单点差
	var maxrange = marketAndOrderObj.maxrange;//最大委托价格范围
	var limitspread = marketAndOrderObj.limitspread;
	var triggerspread = marketAndOrderObj.triggerspread;
	
	var advance_open_limitPrice = $("#advance_open_limitPrice").val();
	var advance_open_stopPrice = $("#advance_open_stopPrice").val();
	
	var defalutOpenInputLimitPrice; //默认开仓限价输入框带入的价格.
	var defalutOpenInputStopPrice; //默认开仓止损输入框带入的价格.
	
	var defalutCloseInputLimitPrice; //默认平仓限价输入框带入的价格.
	var defalutCloseInputStopPrice; //默认平仓止损输入框带入的价格.
	
	if(tradeTypeValue==0){//买入
		//进阶委托
		defalutOpenInputLimitPrice = Util.accSub(Number(tradePrice), Number(limitspread));
		$("#advance_open_limitOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutOpenInputLimitPrice));
		$("#advance_open_Limit_max").val(Util.accSub(Number(tradePrice),Number(limitspread)));
		$("#advance_open_Limit_min").val(Util.accSub(Number(tradePrice),Number(maxrange)));
		
		defalutOpenInputStopPrice = Util.accAdd(Number(tradePrice), Number(triggerspread));
		$("#advance_open_stopOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutOpenInputStopPrice));
		$("#advance_open_Stop_max").val(Util.accAdd(Number(tradePrice),Number(maxrange)));
		$("#advance_open_Stop_min").val(Util.accAdd(Number(tradePrice),Number(triggerspread)));
		
		//若是初始化,则给价格框输入默认值
		if(isInit==1){
			$("#advance_open_limitPrice").val(defalutOpenInputLimitPrice);
			$("#advance_open_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
			});
			
			$("#advance_open_stopPrice").val(defalutOpenInputStopPrice);
			$("#advance_open_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
			});
			advance_open_limitPrice = $("#advance_open_limitPrice").val();
			advance_open_stopPrice = $("#advance_open_stopPrice").val();
		}
		
		var openBusiType = getAdvancePendingOrderTypeValue('open');
		if(openBusiType == OrderType.BUY_LIMIT){
			
			defalutCloseInputLimitPrice = Util.accAdd(Number(advance_open_limitPrice ), Number(orderspread));
			$("#advance_close_limitOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputLimitPrice));
			$("#advance_close_Limit_max").val(Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange)));
			$("#advance_close_Limit_min").val(Util.accAdd(Number(advance_open_limitPrice ), Number(orderspread)));
			
			defalutCloseInputStopPrice = Util.accSub(Number(advance_open_limitPrice) , Number(orderspread));
			$("#advance_close_stopOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputStopPrice));
			$("#advance_close_Stop_max").val(Util.accSub(Number(advance_open_limitPrice) , Number(orderspread)));
			$("#advance_close_Stop_min").val(Util.accSub(Number(advance_open_limitPrice) , Number(maxrange)));
			
		}else if(openBusiType == OrderType.BUY_STOP){
			
			defalutCloseInputLimitPrice = Util.accAdd(Number(advance_open_stopPrice ), Number(orderspread));
			$("#advance_close_limitOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputLimitPrice));
			$("#advance_close_Limit_max").val(Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange)));
			$("#advance_close_Limit_min").val(Util.accAdd(Number(advance_open_stopPrice ), Number(orderspread)));
			
			defalutCloseInputStopPrice = Util.accSub(Number(advance_open_stopPrice) , Number(orderspread));
			$("#advance_close_stopOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputStopPrice));
			$("#advance_close_Stop_max").val(Util.accSub(Number(advance_open_stopPrice) , Number(orderspread)));
			$("#advance_close_Stop_min").val(Util.accSub(Number(advance_open_stopPrice) , Number(maxrange)));
			
		}
	}
	else if(tradeTypeValue==1){//卖出
		//进阶委托
		defalutOpenInputLimitPrice = Util.accAdd(Number(tradePrice),Number(limitspread));
		$("#advance_open_limitOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutOpenInputLimitPrice));
		$("#advance_open_Limit_max").val(Util.accAdd(Number(tradePrice),Number(maxrange)));
		$("#advance_open_Limit_min").val(Util.accAdd(Number(tradePrice),Number(limitspread)));
		
		defalutOpenInputStopPrice = Util.accSub(Number(tradePrice), Number(triggerspread));
		$("#advance_open_stopOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutOpenInputStopPrice));
		$("#advance_open_Stop_max").val(Util.accSub(Number(tradePrice),Number(triggerspread)));
		$("#advance_open_Stop_min").val(Util.accSub(Number(tradePrice),Number(maxrange)));
		
		//若是初始化,则给价格框输入默认值
		if(isInit==1){
			$("#advance_open_limitPrice").val(defalutOpenInputLimitPrice);
			$("#advance_open_limitPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
			});
			
			$("#advance_open_stopPrice").val(defalutOpenInputStopPrice);
			$("#advance_open_stopPrice").spinner({
				step: spinnerStep,
				numberFormat: "n",
				spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
			});
			advance_open_limitPrice = $("#advance_open_limitPrice").val();
			advance_open_stopPrice = $("#advance_open_stopPrice").val();
		}
		
		var openBusiType = getAdvancePendingOrderTypeValue('open');
		if(openBusiType == OrderType.BUY_LIMIT){
			
			defalutCloseInputLimitPrice = Util.accSub(Number(advance_open_limitPrice) , Number(orderspread));
			$("#advance_close_limitOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputLimitPrice));
			$("#advance_close_Limit_max").val(Util.accSub(Number(advance_open_limitPrice) , Number(orderspread)));
			$("#advance_close_Limit_min").val(Util.accSub(Number(advance_open_limitPrice ), Number(maxrange)));
			
			defalutCloseInputStopPrice = Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread));
			$("#advance_close_stopOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputStopPrice));
			$("#advance_close_Stop_max").val(Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange)));
			$("#advance_close_Stop_min").val(Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread)));

		}else if(openBusiType == OrderType.BUY_STOP){
			
			defalutCloseInputLimitPrice = Util.accSub(Number(advance_open_stopPrice) , Number(orderspread));
			$("#advance_close_limitOperate").html("≤"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputLimitPrice));
			$("#advance_close_Limit_max").val(Util.accSub(Number(advance_open_stopPrice) , Number(orderspread)));
			$("#advance_close_Limit_min").val(Util.accSub(Number(advance_open_stopPrice ), Number(maxrange)));
			
			defalutCloseInputStopPrice = Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread));
			$("#advance_close_stopOperate").html("≥"+Util.formatPriceByPrdcode(marketAndOrderObj.prdcode, defalutCloseInputStopPrice));
			$("#advance_close_Stop_max").val(Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange)));
			$("#advance_close_Stop_min").val(Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread)));
			
		}
	}
	
	
	//若是初始化,则给价格框输入默认值
	if(isInit==1){
		$("#advance_close_limitPrice").val(defalutCloseInputLimitPrice);
		$("#advance_close_limitPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
		});
		
		$("#advance_close_stopPrice").val(defalutCloseInputStopPrice);
		$("#advance_close_stopPrice").spinner({
			step: spinnerStep,
			numberFormat: "n",
			spin: function( event, ui ) {_changeAdvanceOpenOrderBusiType();}
		});
	}
};

/**
 * 功能：初始委托下单的类型
 */
initPendingOrderSelType = function(){
	// 清空类型下拉框
	$("#orderBusiTypeSel").empty();
	//清空进阶部分类型下拉框
	$("#advance_open_orderBusiTypeSel").empty();
	$("#advance_close_orderBusiTypeSel").empty();
	var options = "";
	options += "<option value='" + pendingOrdertype.LIMIT + "'>" + i18n.trade.limitType + "</option>";      // 限价
	options += "<option value='" + pendingOrdertype.STOP + "'>" + i18n.trade.stopType+"</option>";          // 停损价
	options += "<option value='" + pendingOrdertype.BUY_OCO + "'>" + i18n.trade.buyOcoType + "</option>";   // 自动替代
	options += "<option value='" + pendingOrdertype.ADVANCE + "'>" + i18n.dynamic.advpending + "</option>";   // 进阶委托
	$("#orderBusiTypeSel").append(options);
	
	var advance_open_options = "";
	advance_open_options += "<option value='" + pendingOrdertype.LIMIT + "'>" + i18n.trade.limitType + "</option>";      // 限价
	advance_open_options += "<option value='" + pendingOrdertype.STOP + "'>" + i18n.trade.stopType+"</option>";          // 停损价
	$("#advance_open_orderBusiTypeSel").append(advance_open_options);
	
	var advance_close_options = "";
	advance_close_options += "<option value='" + pendingOrdertype.LIMIT + "'>" + i18n.trade.limitType + "</option>";      // 限价
	advance_close_options += "<option value='" + pendingOrdertype.STOP + "'>" + i18n.trade.stopType+"</option>";          // 停损价
	advance_close_options += "<option value='" + pendingOrdertype.BUY_OCO + "'>" + i18n.trade.buyOcoType + "</option>";   // 自动替代
	$("#advance_close_orderBusiTypeSel").append(advance_close_options);
};

/**
 * 功能：获取委托下单的类型值
 */
getPendingOrderTypeValue = function() {
	var busiType = $("#orderBusiTypeSel").val();
	var pendingOrderTradedType = marketAndOrderObj.defaultTradeType;
	if (pendingOrderTradedType == 0) { // 买
		if (busiType == pendingOrdertype.LIMIT) { // 限价买入
			return OrderType.BUY_LIMIT;
		} else if (busiType == pendingOrdertype.STOP) { // 停损价买入
			return OrderType.BUY_STOP;
		} else if (busiType == pendingOrdertype.BUY_OCO) { // 自动替代买入
			return OrderType.BUY_OCO;
		} else if (busiType == pendingOrdertype.ADVANCE) { // 进阶委托
			return OrderType.BUY_advance;
		} else {
			return OrderType.BUY_LIMIT;
		}
	} else {
		if (busiType == pendingOrdertype.LIMIT) { // 限价卖出
			return OrderType.SELL_LIMIT;
		} else if (busiType == pendingOrdertype.STOP) { // 停损价卖出
			return OrderType.SELL_STOP;
		} else if (busiType == pendingOrdertype.BUY_OCO) { // 自动替代卖出
			return OrderType.SELL_OCO;
		}else if (busiType == pendingOrdertype.ADVANCE) { // 进阶委托
			return OrderType.SELL_advance;
		} else {
			return OrderType.SELL_LIMIT;
		}
	}
};

/**
 * 功能：获取进阶委托下单的类型值
 */
getAdvancePendingOrderTypeValue = function(param) {
	var busiType;
	if(param=='open')
		busiType = $("#advance_open_orderBusiTypeSel").val();
	else if(param=='close')
		busiType = $("#advance_close_orderBusiTypeSel").val();
	else
		return;
	var pendingOrderTradedType = marketAndOrderObj.defaultTradeType;
	if (pendingOrderTradedType == 0) { // 买
		if (busiType == pendingOrdertype.LIMIT) { // 限价买入
			return OrderType.BUY_LIMIT;
		} else if (busiType == pendingOrdertype.STOP) { // 停损价买入
			return OrderType.BUY_STOP;
		} else if (busiType == pendingOrdertype.BUY_OCO) { // 自动替代买入
			return OrderType.BUY_OCO;
		} else if (busiType == pendingOrdertype.ADVANCE) { // 进阶委托
			return OrderType.BUY_advance;
		} else {
			return OrderType.BUY_LIMIT;
		}
	} else {
		if (busiType == pendingOrdertype.LIMIT) { // 限价卖出
			return OrderType.SELL_LIMIT;
		} else if (busiType == pendingOrdertype.STOP) { // 停损价卖出
			return OrderType.SELL_STOP;
		} else if (busiType == pendingOrdertype.BUY_OCO) { // 自动替代卖出
			return OrderType.SELL_OCO;
		}else if (busiType == pendingOrdertype.ADVANCE) { // 进阶委托
			return OrderType.SELL_advance;
		} else {
			return OrderType.SELL_LIMIT;
		}
	}
};

/**
 * 功能：初始化委托下单的手数
 */
initPendingOrderVolume = function(){
	_setVolumeList("#orderVolumeSel","#orderVolumeInput","#orderVolumeRange","#orderVolumeSelSpan");
	var cookieVol=SystemCookie.getTradeVol(marketAndOrderObj.prdcode);
	if(Util.isNotBlank(cookieVol)){
		// 如果 1)默认手数已小于当前的最小单量  2) 默认手数大于最大单量设定   3)默认手数不满足步长限制    则手数输入框 默认填入最小单量,同时取消掉勾选状态,清空cookie
		var defaultVolume = parseFloat(Util.fixToStrTwodecimal(cookieVol));
		var minimalVolume = parseFloat(marketAndOrderObj.minimalVolume);
		var maximalVolume = parseFloat(marketAndOrderObj.maximalVolume);
		var volumeStep    = Util.accMul(marketAndOrderObj.volumeStep,100);
		if(defaultVolume < minimalVolume || defaultVolume > maximalVolume || Util.accMul(Util.accSub(defaultVolume,minimalVolume),100) % volumeStep != 0){
			$("#orderVolumeSel").val(Util.fixToStrTwodecimal(marketAndOrderObj.minimalVolume));
			$("#orderVolumeInput").val(defaultVolume);
			document.getElementsByName("defaultOrderVolumeCheckbox")[0].checked = true;
		}else{
			$("#orderVolumeSel").val(Util.fixToStrTwodecimal(cookieVol));
			$("#orderVolumeInput").val(Util.fixToStrTwodecimal(cookieVol));
			document.getElementsByName("defaultOrderVolumeCheckbox")[0].checked = true;
		}
	}else{
		var tempArray = marketAndOrderObj.volumeLotinfo;
		$("#orderVolumeInput").val(Util.fixToStrTwodecimal(tempArray[0]));
		$("#defaultOrderVolumeCheckbox").attr("checked",false);
	}
};

/**
 * 功能：初始化进阶委托下单的手数
 */
initAdvancePendingOrderVolume = function(){
	_setVolumeList("#advance_open_orderVolumeSel","#advance_open_orderVolumeInput","#advance_open_orderVolumeRange","#advance_open_orderVolumeSelSpan");
	var cookieVol=SystemCookie.getTradeVol(marketAndOrderObj.prdcode);
	if(Util.isNotBlank(cookieVol)){
		// 如果 1)默认手数已小于当前的最小单量  2) 默认手数大于最大单量设定   3)默认手数不满足步长限制    则手数输入框 默认填入最小单量,同时取消掉勾选状态,清空cookie
		var defaultVolume = parseFloat(Util.fixToStrTwodecimal(cookieVol));
		var minimalVolume = parseFloat(marketAndOrderObj.minimalVolume);
		var maximalVolume = parseFloat(marketAndOrderObj.maximalVolume);
		var volumeStep    = Util.accMul(marketAndOrderObj.volumeStep,100);
		if(defaultVolume < minimalVolume || defaultVolume > maximalVolume || Util.accMul(Util.accSub(defaultVolume,minimalVolume),100) % volumeStep != 0){
			$("#advance_open_orderVolumeSel").val(Util.fixToStrTwodecimal(marketAndOrderObj.minimalVolume));
			$("#advance_open_orderVolumeInput").val(defaultVolume);
			document.getElementsByName("defaultOrderVolumeCheckbox")[0].checked = true;
		}else{
			$("#advance_open_orderVolumeSel").val(Util.fixToStrTwodecimal(cookieVol));
			$("#advance_open_orderVolumeInput").val(Util.fixToStrTwodecimal(cookieVol));
			document.getElementsByName("advance_open_defaultOrderVolumeCheckbox")[0].checked = true;
		}
	}else{
		var tempArray = marketAndOrderObj.volumeLotinfo;
		$("#advance_open_orderVolumeInput").val(Util.fixToStrTwodecimal(tempArray[0]));
		$("#advance_open_defaultOrderVolumeCheckbox").attr("checked",false);
	}
};


/**
 * 功能：更新修改进阶委托单窗口的内容
 *@author Gavin.guo
 *@date   2013-11-21下午3:30:00
 */
refreshModifyAdvPendingOrderDiv = function(symbolObj){
	// 判断是否打开下单窗口,没有打开不刷新
	if(!$("#modify_marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange;//最大委托价格范围
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	
	var pendingOrderTradeDir = pendingOrderObjModify.tradedir;
	var openPendingObj = advPendingOrderObjModify.data[0];
	var closePendingObj = advPendingOrderObjModify.data[1];
	
	/****************开仓处理******************/
	var open_tradedir = openPendingObj.tradedir;
	var close_tradedir = closePendingObj.tradedir;
	
	var tradePrice;
	if(open_tradedir==0)
		tradePrice = Util.formatPriceByPrdcode(symbolObj.prdcode, symbolObj.bid);
	else if(open_tradedir==1)
		tradePrice = Util.formatPriceByPrdcode(symbolObj.prdcode, symbolObj.ask);
	else
		tradePrice='---';
	if(open_tradedir==0){
		$("#modify_advance_open_limitOperate").html("≤"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice), Number(limitspread))));
		$("#modify_advance_open_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice),Number(limitspread))));
		$("#modify_advance_open_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice),Number(maxrange))));
		
		$("#modify_advance_open_stopOperate").html("≥"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice), Number(triggerspread))));
		$("#modify_advance_open_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_advance_open_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice),Number(triggerspread))));
		
	}
	else if(open_tradedir==1){
		$("#modify_advance_open_limitOperate").html("≥"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice), Number(limitspread))));
		$("#modify_advance_open_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_advance_open_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(tradePrice),Number(limitspread))));
		
		$("#modify_advance_open_stopOperate").html("≤"+Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice), Number(triggerspread))));
		$("#modify_advance_open_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice),Number(triggerspread))));
		$("#modify_advance_open_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(tradePrice),Number(maxrange))));
	}
	
}

/**
 * 功能：更新修改委托单窗口的内容
 *@author Gavin.guo
 *@date   2013-11-21下午3:30:00
 */
refreshModifyPendingOrderDiv = function(symbolObj){
	// 判断是否打开下单窗口,没有打开不刷新
	if(!$("#modify_marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange;//最大委托价格范围
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	
	var tradedir = pendingOrderObjModify.tradedir;
	
	var tradePrice;
	if(tradedir==0)
		tradePrice = Util.fixToStrTwodecimal(symbolObj.bid);
	else if(tradedir==1)
		tradePrice = Util.fixToStrTwodecimal(symbolObj.ask);
	else
		tradePrice='---';
	if(tradedir==0){
		$("#modify_limitOperate").html("≤"+Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice), Number(limitspread))));
		$("#modify_limit_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(limitspread))));
		$("#modify_limit_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(maxrange))));
		
		$("#modify_stopOperate").html("≥"+Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice), Number(triggerspread))));
		$("#modify_stop_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_stop_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(triggerspread))));
	}
	else if(tradedir==1){
		$("#modify_limitOperate").html("≥"+Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(limitspread))));
		$("#modify_limit_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(maxrange))));
		$("#modify_limit_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accAdd(Number(tradePrice),Number(limitspread))));
		
		$("#modify_stopOperate").html("≤"+Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(triggerspread))));
		$("#modify_stop_max").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(triggerspread))));
		$("#modify_stop_min").val(Util.formatPriceByPrdcode(pendingOrderObj.prdid, Util.accSub(Number(tradePrice),Number(maxrange))));
	}else
		tradeTypeName='---';

};

/**
 * 功能：更新委托下单窗口的内容
 *@author Gavin.guo
 *@date   2013-11-21下午3:30:00
 */
refreshPendingOrderDiv = function(obj){
	// 判断是否打开下单窗口,没有打开不刷新
	if(!$("#marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	
	// 更新初始化参数
	marketAndOrderObj.setMarketAndPendingOrderData(obj);
	
	// 更新弹出框标题
	var title = marketAndOrderObj.produceName;
	$("#marketAndPendingOrderDiv").dialog('option', 'title',title);
	
	// 初始化限价,停损范围
	var tradeTypeValue = marketAndOrderObj.defaultTradeType; //买卖方向 0-买, 1-卖
	
	refreshOrInitPendingOrderPrice(tradeTypeValue);
	refreshOrInitAdvancePendingOrderPrice(tradeTypeValue);
	
};

/**
 * 功能：更新限价相关信息
 */
refreshPendingOrderLimit = function(pendingOrderTradedType){
	var minDistance = marketAndOrderObj.minDistance;
    var maxDistance = marketAndOrderObj.maxslrange;
	//$("#limitPrice").spinner('option', 'step', marketAndOrderObj.limitAndStopStep);
	if(pendingOrderTradedType == 0 || pendingOrderTradedType == "0"){ // 买
		 var formatedAsk = marketAndOrderObj.ask;
		 var askLimitMin = Util.fixToStrTwodecimal(Util.accSub(formatedAsk, maxDistance));
		 var askLimitMax = Util.fixToStrTwodecimal(Util.accSub(formatedAsk, minDistance));
		 $("#askLimitMin").val(askLimitMin);
		 $("#askLimitMax").val(askLimitMax);
		 $("#limitOperate").html(" ≤ "+formatLimitPrice(askLimitMax));
	}else{  // 卖
		 var formatedBid = marketAndOrderObj.buy;
		 var buyLimitMin = Util.accaccAdd(formatedBid,minDistance);
		 var buyLimitMax =  Util.accaccAdd(formatedBid,maxDistance);
		 $("#buyLimitMin").val(buyLimitMin);
		 $("#buyLimitMax").val(buyLimitMax);
		 $("#limitOperate").html(" ≥ "+formatLimitPrice(buyLimitMin));
	}
};


/**
 * 功能：修改委托下单时提交
 */
submitModifyPendingOrder = function(){
	if((pendingOrderObjModify.validflag==1||pendingOrderObjModify.validflag==2)&&advPendingOrderObjModify.data[1].validflag!=2&&typeof advPendingOrderObjModify.data[1].validflag!='undefined'){
		if(validateModifyAdvPendingOrderPrice())
			doSubmitModifyAdvPendingOrder();
	}
	else if(pendingOrderObjModify.validflag==0||advPendingOrderObjModify.data[1].validflag==2|| typeof advPendingOrderObjModify.data[1].validflag=='undefined'){
		if(validateModifyPendingOrderPrice())
			doSubmitModifyPendingOrder();
	}
};



/**
 * 功能：执行进阶委托下单
 */
doSubmitModifyAdvPendingOrder = function(){
	
	var openPendingOrderObj = advPendingOrderObjModify.data[0];
	var closePendingOrderObj = advPendingOrderObjModify.data[1];
	
	_getModifyAdvancePendingOrderSuccessSubmitedData(openPendingOrderObj.prdid);
	
	var openOptype = openPendingOrderObj.optype;  //下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
	var closeOptype = closePendingOrderObj.optype;  //下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
	
	var openLimitprice='';
	var openStopprice='';
	if(openOptype==1)
		openLimitprice = $("#modify_advance_open_limitPrice").val();
	else if(openOptype==2)
		openStopprice = $("#modify_advance_open_stopPrice").val();
	
	var closeLimitprice='';
	var closeStopprice='';
	if(closeOptype==1)
		closeLimitprice = $("#modify_advance_close_limitPrice").val();
	else if(closeOptype==2)
		closeStopprice = $("#modify_advance_close_stopPrice").val();
	else if(closeOptype==3){
		closeLimitprice = $("#modify_advance_close_limitPrice").val();
		closeStopprice = $("#modify_advance_close_stopPrice").val();
	}
	
	var currentTime =new Date().getTime();
	
	$("#modify_pendOrderSuccessMsg").hide();
	$("#modify_pendOrderPreSubmittingMsg").show();
	$("#modify_pendOrderPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
	$("#modify_orderUID").hide();  											  // 提交中时,没有委托号显示
	$("#modify_pendingOrderC").hide();                                           // 提交中时不显示关闭按钮 
	$("#modify_submitedSuccessPendingOrderTable").show();
	$("#modify_submitedFailedPendingOrderTable").hide();
	$("#modify_pendingOrderFC").hide();
	$("#modify_pendingOrderTable").hide();
	$("#modify_pendingOrderP").hide();
	
	var param = {
		//以下同OrderItem的参数
		"oid": openPendingOrderObj.oid, 			//委托号或特别处理大单序列号
		"targetoid": "",		//需要平仓的单号
		"roid": openPendingOrderObj.roid,			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

		"prdid": openPendingOrderObj.prdid,			//产品ID　0.london gold　1.london silver 2.HK gold
		"optype": openPendingOrderObj.optype,			//下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
		"tradedir": openPendingOrderObj.tradedir,			//买卖方向：trade direction　  0买　1卖
		"positiondir": openPendingOrderObj.positiondir,		//仓位方向：position direction 建仓0/平仓1
		"tradestatus": 0,		//交易状态：-1取消 0未成交 1已成交
		"validtype": openPendingOrderObj.validtype,			//委托有效时间:0为当日有效，1为本周有效
		"validflag": 2,			//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;

		"lot": openPendingOrderObj.lot,			//手数
		"time": currentTime,		//建仓时间
		"limitprice": Number(openLimitprice),		//委托限价单价
		"price" : Number(openStopprice), //委托止损单价
		"range": 1.0,			//有效范
		"tradeunit": 1,			//波幅（安司）
		
		"ext_info": {
			"oid": closePendingOrderObj.oid, 			//委托号或特别处理大单序列号
			"targetoid": "",		//需要平仓的单号
			"roid": closePendingOrderObj.roid,			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

			"prdid": closePendingOrderObj.prdid,			//产品ID　0.london gold　1.london silver 2.HK gold
			"optype": closePendingOrderObj.optype,			//下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
			"tradedir": closePendingOrderObj.tradedir,			//买卖方向：trade direction　  0买　1卖
			"positiondir": closePendingOrderObj.positiondir,		//仓位方向：position direction 建仓0/平仓1
			"tradestatus": 0,		//交易状态：-1取消 0未成交 1已成交
			"validtype": closePendingOrderObj.validtype,			//委托有效时间:0为当日有效，1为本周有效
			"validflag": 1,			//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
			"lot": openPendingOrderObj.lot,			//手数
			"time": currentTime,		//建仓时间
			"limitprice": Number(closeLimitprice),		//委托限价单价
			"price" : Number(closeStopprice), //委托止损单价
			"range": 1.0,			//有效范
			"tradeunit": 1			//波幅（安司）
		}
	};
	
	
	// 修改进阶委托单SOCKET请求;
	socket.emit('request', 0x1010d, param);
	
	// 提交订单后判断服务器是否在60以内响应
	tradeTimeOutObj = setTimeout(checkIsMoreThan60sAfterSubmit,60*1000);
};

/**
 * 功能：委托下单
 */
doSubmitModifyPendingOrder = function(){
	
	_getModifyPendingOrderSuccessSubmitedData(pendingOrderObjModify.prdid);
	
	var currentTime =new Date().getTime();
	var limitPrice;
	var stopPrice;
	if(pendingOrderObjModify.optype==1)
		limitPrice = $("#modify_limitPrice").val();
	else if(pendingOrderObjModify.optype==2)
		stopPrice = $("#modify_stopPrice").val();
	else if(pendingOrderObjModify.optype==3){
		 limitPrice = $("#modify_limitPrice").val();
		 stopPrice = $("#modify_stopPrice").val();
	}
	
	$("#modify_pendOrderSuccessMsg").hide();
	$("#modify_pendOrderPreSubmittingMsg").show();
	$("#modify_pendOrderPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
	$("#modify_orderUID").hide();  											  // 提交中时,没有委托号显示
	$("#modify_pendingOrderC").hide();                                           // 提交中时不显示关闭按钮 
	$("#modify_submitedSuccessPendingOrderTable").show();
	$("#modify_submitedFailedPendingOrderTable").hide();
	$("#modify_pendingOrderFC").hide();
	$("#modify_pendingOrderTable").hide();
	$("#modify_pendingOrderP").hide();
	
	var param = {
		"open_close": pendingOrderObjModify.positiondir,	// 修改建仓挂单: 0   修改平仓挂单: 1

		//以下同OrderItem的参数
		"oid": pendingOrderObjModify.oid, 			//委托号或特别处理大单序列号
		"targetoid": "",		//需要平仓的单号
		"roid": "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

		"prdid": pendingOrderObjModify.prdid,			//产品ID　0.london gold　1.london silver 2.HK gold
		"optype": pendingOrderObjModify.optype,			//下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
		"tradedir": pendingOrderObjModify.tradedir,			//买卖方向：trade direction　  0买　1卖
		"positiondir": pendingOrderObjModify.positiondir,		//仓位方向：position direction 建仓0/平仓1
		"tradestatus": 0,		//交易状态：-1取消 0未成交 1已成交
		"validtype": pendingOrderObjModify.validtype,			//委托有效时间:0为当日有效，1为本周有效
		"validflag": 0,			//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;

		"lot": pendingOrderObjModify.lot,			//手数
		"time": currentTime,		//建仓时间
		"limitprice": (isNaN(limitPrice))?0:Number(limitPrice),		//委托限价单价
		"price" : (isNaN(stopPrice))?0:Number(stopPrice), //委托止蚀单价
		"range": 1.0,			//有效范
		"tradeunit": 1			//波幅（安司）
	};
	
	// 委托开仓单SOCKET请求 修改挂单：
	socket.emit('request', 0x10104, param);
	
	// 提交订单后判断服务器是否在60以内响应
	tradeTimeOutObj = setTimeout(checkIsMoreThan60sAfterSubmit,60*1000);
};



/**
 * 功能：委托下单时提交
 */
submitPendingOrder = function(){
	if(!_checkPendingOrderSubmit()){
		return false;
	}
	ispendingSubmit = true;
	// 执行委托下单
	doSubmitPendingOrder();
};

/**
 * 功能：执行委托下单
 */
doSubmitPendingOrder = function(){
	marketAndOrderObj.orderSubmitStartTime =new Date().getTime();
	marketAndOrderObj.isSubmittingorder = true;
	marketAndOrderObj.isResponseorder = false;
	
	//构造prdid 产品ID　0.london gold　1.london silver 2.HK gold
	var tmpPrdCode = marketAndOrderObj.prdcode;
	var tmpPrdId = getPrdIdByPrdCode(tmpPrdCode); 
	
	// 委托单提交成功后,动态显示提交成功的内容
	_getPendingOrderSuccessSubmitedData(tmpPrdId);
	
	//获取订单手数
	var volume = Util.fixToNum($("#orderVolumeInput").val());
	
	//获取买卖方向
	var	dealType = marketAndOrderObj.defaultTradeType;
	
	//生成sequence
	var seq = Util.getRandomSeq();
	marketAndOrderObj.pendingOrderSeq = seq;
		
	//获取价格
	var limitPrice = 0;
	var stopPrice= 0;
	var busiType = getPendingOrderTypeValue();
	if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {  // 3或4
		limitPrice = $("#limitPrice").val();
	}
	if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {  // 5或6
		stopPrice = $("#stopPrice").val();
	}
	if (busiType == OrderType.BUY_OCO || busiType == OrderType.SELL_OCO) {  // 9或10
		limitPrice = $("#limitPrice").val();
		stopPrice = $("#stopPrice").val();
	}
	
	//获取有效期
	var expir = parseInt($("input[name='radioExpir']:checked").val());
	
	$("#pendOrderSuccessMsg").hide();
	$("#pendOrderPreSubmittingMsg").show();
	$("#pendOrderPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
	$("#orderUID").hide();  											  // 提交中时,没有委托号显示
	$("#pendingOrderC").hide();                                           // 提交中时不显示关闭按钮 
	$("#submitedSuccessPendingOrderTable").show();
	$("#submitedFailedPendingOrderTable").hide();
	$("#pendingOrderFC").hide();
	$("#pendingOrderTable").hide();
	$("#pendingOrderP").hide();
	disableTradeLi();
	marketAndOrderObj.isAllowCloseTradeWindow = false;
	hideCloseBtn("#marketAndPendingOrderDiv");
	
	var param = {
		"open_close" : 0, // 建仓: 0 平仓: 1
		// 以下同OrderItem的参数
		"oid" : "", // 委托号或特别处理大单序列号
		"targetoid" : "", // 需要平仓的单号
		"roid" : "", // mod20100919,关联单号:进阶单时,该单号是第二张单的单号
		
		"tradestatus" : 0, // 交易状态：-1取消 0未成交 1已成交
		"validflag" : 0, // mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
		"tradeunit" : 0, // 波幅（安司）
		"time" : marketAndOrderObj.dtime,
		"range" : 0, // 需求中没有此列
		
		"prdid" : tmpPrdId, // 产品ID 0.london gold 1.london silver 2.HK gold
		"optype" : busiType, // 下单类型：operation type 0市价单 1限价盘 2停损盘 3自动替代
		"tradedir" : dealType, // 买卖方向：trade direction 0买 1卖
		"positiondir" : 0, // 仓位方向：position direction 建仓0/平仓1
		"limitprice" : Number(limitPrice), // 委托限价单价
		"price" : Number(stopPrice),//委托止损价
		"validtype" : expir, // 委托有效时间:0为当日有效，1为本周有效
		"lot" : volume // 手数
	};
	
	console.log('%o',param);
	
	// 委托开仓单SOCKET请求
	socket.emit('request', 0x10102, param);
	
	// 提交订单后判断服务器是否在60以内响应
	tradeTimeOutObj = setTimeout(checkIsMoreThan60sAfterSubmit,60*1000);
};

/**
 * 功能：进阶委托下单时提交
 */
submitAdvancePendingOrder = function(){
	if(!_checkAdvancePendingOrderSubmit()){
		return false;
	}
	
	// 执行进阶委托下单
	doSubmitAdvancePendingOrder();
};

/**
 * 功能：执行委托下单
 */
doSubmitAdvancePendingOrder = function(){
	marketAndOrderObj.orderSubmitStartTime =new Date().getTime();
	marketAndOrderObj.isSubmittingorder = true;
	marketAndOrderObj.isResponseorder = false;
	
	//构造prdid 产品ID　0.london gold　1.london silver 2.HK gold
	var tmpPrdCode = marketAndOrderObj.prdcode;
	var tmpPrdId = getPrdIdByPrdCode(tmpPrdCode); 
	
	// 委托单提交成功后,动态显示提交成功的内容
	_getAdvancePendingOrderSuccessSubmitedData(tmpPrdId);
	
	//获取订单手数
	var volume = Util.fixToNum($("#advance_open_orderVolumeInput").val());
	
	//获取开平仓委托的买卖方向
	var	openDealType = marketAndOrderObj.defaultTradeType;
	var closeDealType;
	if(openDealType=='0')
		closeDealType='1';
	else
		closeDealType='0';
	
	//生成sequence
	var seq = Util.getRandomSeq();
	marketAndOrderObj.pendingOrderSeq = seq;
		
	//获取价格
	var advance_open_limitPrice = 0;
	var advance_open_stopPrice= 0;
	var advance_close_limitPrice = 0;
	var advance_close_stopPrice= 0;
	//开仓
	var openBusiType = getAdvancePendingOrderTypeValue('open');
	if (openBusiType == OrderType.BUY_LIMIT || openBusiType == OrderType.SELL_LIMIT) {  // 3或4
		advance_open_limitPrice = $("#advance_open_limitPrice").val();
	}
	if (openBusiType == OrderType.BUY_STOP || openBusiType == OrderType.SELL_STOP) {  // 5或6
		advance_open_stopPrice = $("#advance_open_stopPrice").val();
	}
	//平仓
	var closeBusiType = getAdvancePendingOrderTypeValue('close');
	if (closeBusiType == OrderType.BUY_LIMIT || closeBusiType == OrderType.SELL_LIMIT) {  // 3或4
		advance_close_limitPrice = $("#advance_close_limitPrice").val();
	}
	if (closeBusiType == OrderType.BUY_STOP || closeBusiType == OrderType.SELL_STOP) {  // 5或6
		advance_close_stopPrice = $("#advance_close_stopPrice").val();
	}
	if (closeBusiType == OrderType.BUY_OCO || closeBusiType == OrderType.SELL_OCO) {  // 9或10
		advance_close_limitPrice = $("#advance_close_limitPrice").val();
		advance_close_stopPrice = $("#advance_close_stopPrice").val();
	}
	
	//获取期限
	var expir = parseInt($("input[name='advance_radioExpir']:checked").val());
	
	$("#advance_pendOrderSuccessMsg").hide();
	$("#advance_pendOrderPreSubmittingMsg").show();
	$("#advance_pendOrderPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
	$("#advance_orderUID").hide();  											  // 提交中时,没有委托号显示
	$("#advance_pendingOrderC").hide();                                           // 提交中时不显示关闭按钮 
	$("#submitedSuccessAdvancePendingOrderTable").show();
	$("#submitedFailedAdvancePendingOrderTable").hide();
	$("#advance_pendingOrderFC").hide();
	$("#pendingOrderTable").hide();
	$("#advamcePendingOrderP").hide();
	disableTradeLi();
	marketAndOrderObj.isAllowCloseTradeWindow = false;
	hideCloseBtn("#marketAndPendingOrderDiv");
	
	var param = {
			//以下同OrderItem的参数
			"oid": "", 			//委托号或特别处理大单序列号
			"targetoid": "",		//需要平仓的单号
			"roid": "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

			"prdid": tmpPrdId,			//产品ID　0.london gold　1.london silver 2.HK gold
			"optype": openBusiType,			//下单类型：operation type  0市价单  1限价盘 2停损盘 3自动替代
			"tradedir": openDealType,			//买卖方向：trade direction　  0买　1卖
			"positiondir": 0,		//仓位方向：position direction 建仓0/平仓1
			"tradestatus": 0,		//交易状态：-1取消 0未成交 1已成交
			"validtype": expir,			//委托有效时间:0为当日有效，1为本周有效
			"validflag": 2,			//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;

			"lot": volume,			//手数
			"time": marketAndOrderObj.dtime,		//建仓时间
			"limitprice": Number(advance_open_limitPrice),		//委托限价单价
			"price" : Number(advance_open_stopPrice), //止损价
			"range": 0,			//有效范
			"tradeunit": 1,			//波幅（安司）
			
			"ext_info": {
					"oid": "", 			//委托号或特别处理大单序列号
					"targetoid": "",		//需要平仓的单号
					"roid": "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号
				
					"prdid": tmpPrdId,			//产品ID　0.london gold　1.london silver 2.HK gold
					"optype": closeBusiType,			//下单类型：operation type  0市价单  1限价盘 2停损盘 3自动替代
					"tradedir": closeDealType,			//买卖方向：trade direction　  0买　1卖
					"positiondir": 1,		//仓位方向：position direction 建仓0/平仓1
					"tradestatus": 0,		//交易状态：-1取消 0未成交 1已成交
					"validtype": expir,			//委托有效时间:0为当日有效，1为本周有效
					"validflag": 1,			//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
				
					"lot": volume,			//手数
					"time": marketAndOrderObj.dtime,		//建仓时间
					"limitprice": Number(advance_close_limitPrice),		//委托限价单价
					"price" : Number(advance_close_stopPrice), //止损价
					"range": 0,			//有效范
					"tradeunit": 1			//波幅（安司）
			}
		};
	
	// 委托开仓单SOCKET请求
	socket.emit('request', 0x1010c, param);
	
	// 提交订单后判断服务器是否在60以内响应
	tradeTimeOutObj = setTimeout(checkIsMoreThan60sAfterSubmit,60*1000);
};



/**
 * 功能:委托下单提交后的处理结果, PendingOrderRet
 */
GTShandlePendingOrderRequestR = function(para){
	ispendingSubmit = false;
	// 判断是否打开下单窗口,没有打开不处理
	if(!$("#marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	marketAndOrderObj.isAllowCloseTradeWindow = true;
	showCloseBtn("#marketAndPendingOrderDiv");
	if(marketAndOrderObj.isResponseorder){
		marketAndOrderObj.isSubmittingorder = false;
		return;
	}else{
		marketAndOrderObj.isSubmittingorder = false;
		marketAndOrderObj.isResponseorder = true;
	}
	if (para.code == 0) {//下单成功 code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
		// 选中默认手数后,将当前手数的值放到cookie中，便于下次打开委托单窗口时记住上次设定的默认手数
		var $doc = $("#defaultOrderVolumeCheckbox");
		SystemCookie.setTradeVol(marketAndOrderObj.prdcode, ($doc.is(":checked")?Util.fixToNum($("#orderVolumeInput").val()):null));
		//回显返回结果到页面
		$("#orderUID").show();
		$("#submitedPendingOrderUIDSpan").html(Util.simpleOid(para.oid));  // 显示委托号
		$("#pendOrderPreSubmittingMsg").hide();
		$("#pendOrderSuccessMsg").show();
		$("#pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
		$("#submitedSuccessPendingOrderTable").show();
		$("#pendingOrderC").show();
		$("#pendingOrderTable").hide();
		$("#pendingOrderP").hide();
		$("#submitedFailedPendingOrderTable").hide();
		$("#pendingOrderFC").hide();
	} else {
		//对应的错误提示信息+错误号
		$("#pendingOrderErrorMessage").html(WebUIError[para.code]);
		
		$("#submitedFailedPendingOrderTable").show();
		$("#pendOrderPreSubmittingMsg").hide();
		$("#pendOrderSuccessMsg").hide();
		$("#pendingOrderFC").show();
		$("#submitedSuccessPendingOrderTable").hide();
		$("#pendingOrderC").hide();
		$("#pendingOrderTable").hide();
		$("#pendingOrderP").hide();
	}
	clearTimeout(tradeTimeOutObj);
};

/**
 * 功能:委托下单修改后的处理结果
 */
GTShandleModifyPendingOrderRequestR = function(para, data){
	// 判断是否打开下单窗口,没有打开不处理
	if(!$("#modify_marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	showCloseBtn("#modify_marketAndPendingOrderDiv");
	//委托号
	var pendingOrderIds = Util.simpleOid(para.oid);
	if (para.code == 0) {//下单成功 code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
		//回显返回结果到页面
		$("#modify_submitedSuccessPendingOrderTable").show();
		$("#modify_pendOrderSuccessMsg").show();
		$("#modify_pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess);
		$("#modify_orderUID").show();
		$("#modify_modifyPendingOrderUIDSpan").html(Util.simpleOid(pendingOrderIds));  // 显示委托号
		$("#modify_pendingOrderC").show();
		
		$("#modify_pendingOrderTable").hide();
		$("#modify_pendingOrderP").hide();
		$("#modify_advamcePendingOrderP").hide();
		$("#modify_submitedFailedPendingOrderTable").hide();
		$("#modify_pendOrderPreSubmittingMsg").hide();
		$("#modify_pendingOrderFC").hide();
		$("#modify_submitedSuccessAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderC").hide();
		$("#modify_submitedFailedAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderFC").hide();
		
	} else {
		//对应的错误提示信息+错误号
		$("#modify_submitedFailedPendingOrderTable").show();
		$("#modify_pendingOrderErrorMessage").html(WebUIError[para.code]);
		$("#modify_pendingOrderFC").show();
		
		$("#modify_pendingOrderTable").hide();
		$("#modify_pendingOrderP").hide();
		$("#modify_advamcePendingOrderP").hide();
		$("#modify_submitedSuccessPendingOrderTable").hide();
		$("#modify_pendOrderPreSubmittingMsg").hide();
		$("#modify_pendingOrderC").hide();
		$("#modify_submitedSuccessAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderC").hide();
		$("#modify_submitedFailedAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderFC").hide();
	}
	clearTimeout(tradeTimeOutObj);
};

GTShandleModifyAdvPendingOrderRequestR = function(para, data) {
	// 判断是否打开下单窗口,没有打开不处理
	if (!$("#modify_marketAndPendingOrderDiv").dialog("isOpen")) {
		return;
	}
	showCloseBtn("#modify_marketAndPendingOrderDiv");

	// 獲取委託單id
	var orderids = Util.simpleOid(data[0].oid) + '  ' + Util.simpleOid(data[1].oid);
	if (para.code == '0') {
		// 回显返回结果到页面
		$("#modify_submitedSuccessAdvancePendingOrderTable").show();
		$("#modify_advance_orderUID").show();
		$("#modify_submitedAdvancePendingOrderUIDSpan").html(orderids); // 显示委托号
		$("#modify_advance_pendOrderSuccessMsg").show();
		$("#modify_advance_pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess); // 提交成功
		$("#modify_advance_pendingOrderC").show();
		
		$("#modify_pendingOrderP").hide();
		$("#modify_advamcePendingOrderP").hide();
		$("#modify_submitedSuccessPendingOrderTable").hide();
		$("#modify_pendingOrderC").hide();
		$("#modify_submitedFailedPendingOrderTable").hide();
		$("#modify_pendingOrderFC").hide();
		$("#modify_submitedFailedAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderFC").hide();
	} else {
		// 对应的错误提示信息+错误号
		$("#modify_submitedFailedAdvancePendingOrderTable").show();
		$("#modify_advance_pendingOrderErrorMessage").html(WebUIError[para.code]);
		$("#modify_advance_pendingOrderFC").show();
		
		$("#modify_pendingOrderP").hide();
		$("#modify_advamcePendingOrderP").hide();
		$("#modify_submitedSuccessPendingOrderTable").hide();
		$("#modify_pendingOrderC").hide();
		$("#modify_submitedFailedPendingOrderTable").hide();
		$("#modify_pendingOrderFC").hide();
		$("#modify_submitedSuccessAdvancePendingOrderTable").hide();
		$("#modify_advance_pendingOrderC").hide();
	}
	clearTimeout(tradeTimeOutObj);
};

/**
 * 功能：进阶委托下单提交后的处理结果
 */
GTShandleAdvancePendingOrderRequestR = function(para, data){
		marketAndOrderObj.isAllowCloseTradeWindow = true;
		showCloseBtn("#marketAndPendingOrderDiv");
		if(marketAndOrderObj.isResponseorder){
			marketAndOrderObj.isSubmittingorder = false;
			return;
		}else{
			marketAndOrderObj.isSubmittingorder = false;
			marketAndOrderObj.isResponseorder = true;
		}
		if (para.code == 0) {//下单成功 code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
			// 选中默认手数后,将当前手数的值放到cookie中，便于下次打开委托单窗口时记住上次设定的默认手数
			var $doc = $("#advance_open_defaultOrderVolumeCheckbox");
			SystemCookie.setTradeVol(marketAndOrderObj.prdcode, ($doc.is(":checked")?Util.fixToNum($("#advance_open_orderVolumeInput").val()):null));
			//獲取委託單id
			var orderids = Util.simpleOid(data[0].oid)+'  '+Util.simpleOid(data[1].oid);
			
			//回显返回结果到页面
			$("#advance_orderUID").show();
			$("#submitedAdvancePendingOrderUIDSpan").html(orderids);  // 显示委托号
			$("#advance_pendOrderPreSubmittingMsg").hide();
			$("#advance_pendOrderSuccessMsg").show();
			$("#advance_pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
			$("#submitedSuccessAdvancePendingOrderTable").show();
			$("#advance_pendingOrderC").show();
			$("#pendingOrderTable").hide();
			$("#pendingOrderP").hide();
			$("#submitedFailedAdvancePendingOrderTable").hide();
			$("#advance_pendingOrderFC").hide();
		} else {
			//对应的错误提示信息+错误号
			$("#pendingOrderErrorMessage").html(WebUIError[para.code]);
			
			$("#submitedFailedPendingOrderTable").show();
			$("#advance_pendOrderPreSubmittingMsg").hide();
			$("#advance_pendOrderSuccessMsg").hide();
			$("#advance_pendingOrderFC").show();
			$("#submitedSuccessAdvancePendingOrderTable").hide();
			$("#advance_pendingOrderC").hide();
			$("#pendingOrderTable").hide();
			$("#pendingOrderP").hide();
		}
		clearTimeout(tradeTimeOutObj);
};

/**
 * 功能：委托下单提交后的处理结果
 */
handlePendingOrderRequestR = function(para){
	if (para.seq == marketAndOrderObj.pendingOrderSeq) {
		marketAndOrderObj.isAllowCloseTradeWindow = true;
		showCloseBtn("#marketAndPendingOrderDiv");
		if(marketAndOrderObj.isResponseorder){
			marketAndOrderObj.isSubmittingorder = false;
			return;
		}else{
			marketAndOrderObj.isSubmittingorder = false;
			marketAndOrderObj.isResponseorder = true;
		}
		if (para.ret == Constant.RET_CODE_PENDING_SUCCESS) {
			// 选中默认手数后,将当前手数的值放到cookie中，便于下次打开委托单窗口时记住上次设定的默认手数
			var $doc = $("#defaultOrderVolumeCheckbox");
			SystemCookie.setTradeVol(marketAndOrderObj.prdcode, ($doc.is(":checked")?Util.Util.fixToNum($("#orderVolumeInput").val()):null));
			$("#orderUID").show();
			var orderUpdateData = getOrderUpdate4OrderId(para.order_id);
			$("#submitedPendingOrderUIDSpan").html(orderUpdateData.uid);  // 显示委托号
			$("#pendOrderPreSubmittingMsg").hide();
			$("#pendOrderSuccessMsg").show();
			$("#pendOrderSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
			$("#submitedSuccessPendingOrderTable").show();
			$("#pendingOrderC").show();
			$("#pendingOrderTable").hide();
			$("#pendingOrderP").hide();
			$("#submitedFailedPendingOrderTable").hide();
			$("#pendingOrderFC").hide();
		} else {
			//对应的错误提示信息+错误号
			if(para.ret == 1026 || para.ret == '1026'){
				var groupOrderlimit = getGroupOrderlimitData();
				$("#pendingOrderErrorMessage").html(WebUIError[para.ret].format(groupOrderlimit.limitOrders));
			}
			else if(para.ret == 155 || para.ret == '155'){
				var symbolConfig = getAmsSymbolConfig4Code(marketAndOrderObj.prdcode);
				$("#pendingOrderErrorMessage").html(WebUIError[para.ret].format(Util.fixToStrTwodecimal(symbolConfig.holdlimit)));
			}
			else{
				$("#pendingOrderErrorMessage").html(WebUIError[para.ret]);
			}
			$("#submitedFailedPendingOrderTable").show();
			$("#pendOrderPreSubmittingMsg").hide();
			$("#pendOrderSuccessMsg").hide();
			$("#pendingOrderFC").show();
			$("#submitedSuccessPendingOrderTable").hide();
			$("#pendingOrderC").hide();
			$("#pendingOrderTable").hide();
			$("#pendingOrderP").hide();
		}
	}
	clearTimeout(tradeTimeOutObj);
};

/**
 * 功能：委托单提交成功后,动态获取对应的文本框的值
 */
_getModifyPendingOrderSuccessSubmitedData = function(prdid){
	var str="",tradeTypeTxt="",busiTypeTxt="",price, optypename, expirText;
	var limitPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_limitPrice").val());
	var stopPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_stopPrice").val());
	
	var optype = pendingOrderObjModify.optype;
	var tradedir = pendingOrderObjModify.tradedir;
	var lot = pendingOrderObjModify.lot;
	var validtype = pendingOrderObjModify.validtype;
	var margin = $("#modify_pendingMargin").html();
	
	if(validtype==0)
		expirText = i18n.report.effectiveInDate;
	else if(validtype==1)
		expirText = i18n.report.effectiveInWeekly;
	else
		expirText = '---';
	
	// 先清空除了第一行和最后一行的所有tr
	$("#modify_submitedSuccessPendingOrderTable tr").not("#modify_submitedSuccessPendingOrderTr").remove();
	
	//买卖方向
	if(tradedir==0)
		busiTypeTxt=i18n.trade.tip_label_buy;
	else if(tradedir==1)
		busiTypeTxt=i18n.trade.tip_label_sell;
	
	//pending order type
	if(optype==1)
		optypename = i18n.pendingorder.limitprice;
	else if(optype==2)
		optypename = i18n.pendingorder.lost;
	else if(optype==3)
		optypename = i18n.dynamic.autoreplace;
	
	// 如果是限价和停损单 ()
	if(optype == OrderType.BUY_LIMIT || optype == OrderType.SELL_LIMIT || optype == OrderType.BUY_STOP || optype == OrderType.SELL_STOP){
		if(optype == OrderType.BUY_LIMIT){
			tradeTypeTxt = i18n.trade.typeLimit;  //"類型:限價"
			price = limitPriceText;
		}else if(optype == OrderType.SELL_LIMIT){
			tradeTypeTxt = i18n.trade.typeLimit;   //"類型:限價"
			price= limitPriceText;
		}else if(optype == OrderType.BUY_STOP){
			tradeTypeTxt = i18n.trade.typeStop;  //"類型:停損"
			price= stopPriceText;
		}else{
			tradeTypeTxt = i18n.trade.typeStop;  //"類型:停損"
			price= stopPriceText;
		}
		str = "<tr><td><ul class='subm-info'>"
				 +"<li>"+tradeTypeTxt+"</li>"
				 +"<li>"+busiTypeTxt+price+"</li>"
				 +"<li>"+i18n.trade.volumeTxt+Util.fixToStrTwodecimal(lot)+"</li>"
				 +"<li>"+i18n.trade.margin+margin+"USD</li>"
				 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
				 +"<li id='modify_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='modify_modifyPendingOrderUIDSpan'></span>"+"</li>"
			     +"</ul></td></tr>";
	    $("#modify_submitedSuccessPendingOrderTr").after(str);
	}
	
	// 如果是自动替代单,则提交成功后页面展示：类型 限价买入  停损买入   投资额度    手数   期限    委托号等字段
	else if(optype == OrderType.BUY_OCO || OrderType.SELL_OCO){
		var limitT = "";
		var stopT= "";
		if(optype == OrderType.BUY_OCO){
			tradeTypeTxt = i18n.trade.typeBuyOco;  // 自动替代
			limitT = i18n.trade.limitAskTxt;      // 限价买入 
			stopT = i18n.trade.stopAskTxt;        // 停损买入
		}else if(optype == OrderType.SELL_OCO){
			tradeTypeTxt = i18n.trade.typeBuyOco; // 自动替代
			limitT = i18n.trade.limitBuyTxt;      // 限价卖出
			stopT =  i18n.trade.stopBuyTxt;       // 停损卖出
		}
		str = "<tr><td><ul class='subm-info'>"
			 +"<li>"+tradeTypeTxt+"</li>"
			 +"<li>"+limitT+limitPriceText+"</li>"
			 +"<li>"+stopT+stopPriceText+"</li>"
			 +"<li>"+i18n.trade.volumeTxt+Util.fixToStrTwodecimal(lot)+"</li>"
			 +"<li>"+i18n.trade.margin+margin+"USD</li>"
			 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
			 +"<li id='modify_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='modify_modifyPendingOrderUIDSpan'></span>"+"</li>"
		     +"</ul></td></tr>";
		$("#modify_submitedSuccessPendingOrderTr").after(str);
	}
};

/**
 * 功能：修改进阶委托单提交成功后,动态获取对应的文本框的值
 */
_getModifyAdvancePendingOrderSuccessSubmitedData = function(prdid){
	var advance_open_priceText="";
	var advance_open_limitPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_advance_open_limitPrice").val());
	var advance_open_stopPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_advance_open_stopPrice").val());
	
	var advance_close_priceText="";
	var advance_close_limitPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_advance_close_limitPrice").val());
	var advance_close_stopPriceText = Util.formatPriceByPrdcode(prdid, $("#modify_advance_close_stopPrice").val());
	
	var advance_open_orderVolumeInputText = Util.fixToStrTwodecimal($("#modify_advance_orderVolumeSpan").text());//手数
	
	var advance_open_pendingMargin = $("#modify_advance_pendingMargin").text(); //保证金
	
	var openType = advPendingOrderObjModify.data[0].optype; //开仓类型
	var closeType = advPendingOrderObjModify.data[1].optype; //平仓类型
	var openTypeTxt=""; //开仓类型文字
	var closeTypeTxt=""; //平仓类型文字
	
	if(openType == OrderType.BUY_LIMIT || openType == OrderType.SELL_LIMIT || openType == OrderType.BUY_STOP || openType == OrderType.SELL_STOP || openType ==OrderType.SELL_OCO || openType ==OrderType.BUY_OCO){
		if(openType == OrderType.BUY_LIMIT){
			openTypeTxt = i18n.trade.opentypeLimit;  //"類型:限價"
			advance_open_priceText = advance_open_limitPriceText;
		}else if(openType == OrderType.SELL_LIMIT){
			openTypeTxt = i18n.trade.opentypeLimit;   //"類型:限價"
			advance_open_priceText = advance_open_limitPriceText;
		}else if(openType == OrderType.BUY_STOP){
			openTypeTxt = i18n.trade.opentypeStop;  //"類型:停損"
			advance_open_priceText = advance_open_stopPriceText;
		}else if(openType == OrderType.SELL_STOP){
			openTypeTxt = i18n.trade.opentypeStop;  //"類型:停損"
			advance_open_priceText = advance_open_stopPriceText;
		}
	}
	if(closeType == OrderType.BUY_LIMIT || closeType == OrderType.SELL_LIMIT || closeType == OrderType.BUY_STOP || closeType == OrderType.SELL_STOP || closeType ==OrderType.SELL_OCO || closeType ==OrderType.BUY_OCO){
		if(closeType == OrderType.BUY_LIMIT){
			closeTypeTxt = i18n.trade.closetypeLimit;  //"類型:限價"
			advance_close_priceText = advance_close_limitPriceText;
		}else if(closeType == OrderType.SELL_LIMIT){
			closeTypeTxt = i18n.trade.closetypeLimit;   //"類型:限價"
			advance_close_priceText = advance_close_limitPriceText;
		}else if(closeType == OrderType.BUY_STOP){
			closeTypeTxt = i18n.trade.closetypeStop;  //"類型:停損"
			advance_close_priceText = advance_close_stopPriceText;
		}else if(closeType == OrderType.SELL_STOP){
			closeTypeTxt = i18n.trade.closetypeStop;  //"類型:停損"
			advance_close_priceText = advance_close_stopPriceText;
		}else if(closeType == OrderType.SELL_OCO){
			closeTypeTxt = i18n.trade.closetypeBuyOco;  //"類型:自动替换"
		}else if(closeType == OrderType.SELL_OCO){
			closeTypeTxt = i18n.trade.closetypeBuyOco;  //"類型:自动替换"
		}
	}
	
	var expirText = $("#modify_advance_defaultExpir").text();   // "当日有效" : "当周有效"
	
	// 先清空除了第一行和最后一行的所有tr
	$("#modify_submitedSuccessAdvancePendingOrderTable tr").not("#modify_submitedSuccessAdvancePendingOrderTr").remove();
	
	//买卖方向
	var openBusiTypeTxt=""; //开仓买卖方向
	var closeBusiTypeTxt=""; //平仓买卖方向
	var tradeTypeValue = advPendingOrderObjModify.data[0].tradedir;
	if(tradeTypeValue==1){
		openBusiTypeTxt = i18n.trade.tip_label_sell;
		closeBusiTypeTxt = i18n.trade.tip_label_buy;
	}
	else if(tradeTypeValue==0){
		openBusiTypeTxt = i18n.trade.tip_label_buy;
		closeBusiTypeTxt = i18n.trade.tip_label_sell;
	}
	
	//开仓部分
	var successHTMLText = "<tr><td><ul class='subm-info'>"
	 +"<li>"+i18n.trade.typeBuyAdvance+"</li>"
	 +"<li>"+openTypeTxt+"</li>"
	 +"<li>"+openBusiTypeTxt+advance_open_priceText+"</li>"
	 +"<li>"+i18n.trade.volumeTxt+advance_open_orderVolumeInputText+"</li>"
	 +"<li>"+i18n.trade.margin+advance_open_pendingMargin+"</li>";
	 //平仓部分
	
	// 如果是限价和停损单 (页面展示：类型  买入  投资额度  手数   期限  委托号等字段)
	if(closeType == OrderType.BUY_LIMIT || closeType == OrderType.SELL_LIMIT || closeType == OrderType.BUY_STOP || closeType == OrderType.SELL_STOP){
		successHTMLText = successHTMLText
		+"<li>"+closeTypeTxt+"</li>"
		+"<li>"+closeBusiTypeTxt+advance_close_priceText+"</li>";
	}else{//自动替换
		successHTMLText = successHTMLText
		+"<li>"+closeTypeTxt+"</li>"
		+"<li>"+i18n.trade.closetypeLimitLabel+advance_close_limitPriceText+"</li>"
		+"<li>"+i18n.trade.closetypeStopLabel+advance_close_stopPriceText+"</li>";
	}
	successHTMLText = successHTMLText
	+"<li>"+i18n.trade.expirTxt+expirText+"</li>"
	+"<li id='modify_advance_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='modify_submitedAdvancePendingOrderUIDSpan'></span>"+"</li>"
    +"</ul></td></tr>";
	 $("#modify_submitedSuccessAdvancePendingOrderTr").after(successHTMLText);
};



/**
 * 功能：委托单提交成功后,动态获取对应的文本框的值
 */
_getPendingOrderSuccessSubmitedData = function(prdid){
	var str="",tradeTypeTxt="",busiTypeTxt="",price;
	var limitPriceText = Util.formatPriceByPrdcode(prdid, $("#limitPrice").val());
	var stopPriceText = Util.formatPriceByPrdcode(prdid, $("#stopPrice").val());
	var orderVolumeInputText = Util.fixToStrTwodecimal($("#orderVolumeInput").val());
	var expirText = parseInt($("input[name='radioExpir']:checked").val()) == 0 ? i18n.trade.dayEffective : i18n.trade.weekEffective;   // "当日有效" : "当周有效"
	
	var pendingmargin = $("#pendingMargin").text();
	
	// 先清空除了第一行和最后一行的所有tr
	$("#submitedSuccessPendingOrderTable tr").not("#submitedSuccessPendingOrderTr").remove();
	
	//买卖方向
	var tradeTypeValue = marketAndOrderObj.defaultTradeType;
	if(tradeTypeValue==0)
		busiTypeTxt=i18n.trade.tip_label_buy;
	else if(tradeTypeValue==1)
		busiTypeTxt=i18n.trade.tip_label_sell;
	
	var busiType = getPendingOrderTypeValue(); //委托类型
	
	// 如果是限价和停损单 (页面展示：类型  买入  投资额度  手数   期限  委托号等字段)
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
				 +"<li>"+i18n.trade.margin+pendingmargin+"USD</li>"
				 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
				 +"<li id='orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='submitedPendingOrderUIDSpan'></span>"+"</li>"
			     +"</ul></td></tr>";
	    $("#submitedSuccessPendingOrderTr").after(str);
	}
	
	// 如果是自动替代单,则提交成功后页面展示：类型 限价买入  停损买入   投资额度    手数   期限    委托号等字段
	else if(busiType == OrderType.BUY_OCO || OrderType.SELL_OCO){
		var limitT = "";
		var stopT= "";
		if(tradeTypeValue == 1){
			tradeTypeTxt = i18n.trade.typeBuyOco;  // 自动替代
			limitT = i18n.trade.limitAskTxt;      // 限价买入 
			stopT = i18n.trade.stopAskTxt;        // 停损买入
		}else if(tradeTypeValue == 0){
			tradeTypeTxt = i18n.trade.typeBuyOco; // 自动替代
			limitT = i18n.trade.limitBuyTxt;      // 限价卖出
			stopT =  i18n.trade.stopBuyTxt;       // 停损卖出
		}
		str = "<tr><td><ul class='subm-info'>"
			 +"<li>"+tradeTypeTxt+"</li>"
			 +"<li>"+limitT+limitPriceText+"</li>"
			 +"<li>"+stopT+stopPriceText+"</li>"
			 +"<li>"+i18n.trade.volumeTxt+orderVolumeInputText+"</li>"
			 +"<li>"+i18n.trade.margin+pendingmargin+"USD</li>"
			 +"<li>"+i18n.trade.expirTxt+expirText+"</li>"
			 +"<li id='orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='submitedPendingOrderUIDSpan'></span>"+"</li>"
		     +"</ul></td></tr>";
		$("#submitedSuccessPendingOrderTr").after(str);
	}
};

/**
 * 功能：委托单提交成功后,动态获取对应的文本框的值
 */
_getAdvancePendingOrderSuccessSubmitedData = function(prdid){
	var advance_open_priceText="";
	var advance_open_limitPriceText = Util.formatPriceByPrdcode(prdid, $("#advance_open_limitPrice").val());
	var advance_open_stopPriceText = Util.formatPriceByPrdcode(prdid, $("#advance_open_limitPrice").val());
	
	var advance_close_priceText="";
	var advance_close_limitPriceText = Util.formatPriceByPrdcode(prdid, $("#advance_close_limitPrice").val());
	var advance_close_stopPriceText = Util.formatPriceByPrdcode(prdid, $("#advance_close_stopPrice").val());
	
	var advance_open_orderVolumeInputText = Util.fixToStrTwodecimal($("#advance_open_orderVolumeInput").val());//手数
	
	var advance_open_pendingMargin = $("#advance_open_pendingMargin").text(); //保证金
	
	var openType = getAdvancePendingOrderTypeValue("open"); //开仓类型
	var closeType = getAdvancePendingOrderTypeValue("close"); //平仓类型
	var openTypeTxt=""; //开仓类型文字
	var closeTypeTxt=""; //平仓类型文字
	
	if(openType == OrderType.BUY_LIMIT || openType == OrderType.SELL_LIMIT || openType == OrderType.BUY_STOP || openType == OrderType.SELL_STOP || openType ==OrderType.SELL_OCO || openType ==OrderType.BUY_OCO){
		if(openType == OrderType.BUY_LIMIT){
			openTypeTxt = i18n.trade.opentypeLimit;  //"類型:限價"
			advance_open_priceText = advance_open_limitPriceText;
		}else if(openType == OrderType.SELL_LIMIT){
			openTypeTxt = i18n.trade.opentypeLimit;   //"類型:限價"
			advance_open_priceText = advance_open_limitPriceText;
		}else if(openType == OrderType.BUY_STOP){
			openTypeTxt = i18n.trade.opentypeStop;  //"類型:停損"
			advance_open_priceText = advance_open_stopPriceText;
		}else if(openType == OrderType.SELL_STOP){
			openTypeTxt = i18n.trade.opentypeStop;  //"類型:停損"
			advance_open_priceText = advance_open_stopPriceText;
		}
	}
	if(closeType == OrderType.BUY_LIMIT || closeType == OrderType.SELL_LIMIT || closeType == OrderType.BUY_STOP || closeType == OrderType.SELL_STOP || closeType ==OrderType.SELL_OCO || closeType ==OrderType.BUY_OCO){
		if(closeType == OrderType.BUY_LIMIT){
			closeTypeTxt = i18n.trade.closetypeLimit;  //"類型:限價"
			advance_close_priceText = advance_close_limitPriceText;
		}else if(closeType == OrderType.SELL_LIMIT){
			closeTypeTxt = i18n.trade.closetypeLimit;   //"類型:限價"
			advance_close_priceText = advance_close_limitPriceText;
		}else if(closeType == OrderType.BUY_STOP){
			closeTypeTxt = i18n.trade.closetypeStop;  //"類型:停損"
			advance_close_priceText = advance_close_stopPriceText;
		}else if(closeType == OrderType.SELL_STOP){
			closeTypeTxt = i18n.trade.closetypeStop;  //"類型:停損"
			advance_close_priceText = advance_close_stopPriceText;
		}else if(closeType == OrderType.SELL_OCO){
			closeTypeTxt = i18n.trade.closetypeBuyOco;  //"類型:自动替换"
		}else if(closeType == OrderType.SELL_OCO){
			closeTypeTxt = i18n.trade.closetypeBuyOco;  //"類型:自动替换"
		}
	}
	
	var expirText = parseInt($("input[name='advance_radioExpir']:checked").val()) == 0 ? i18n.trade.dayEffective : i18n.trade.weekEffective;   // "当日有效" : "当周有效"
	
	// 先清空除了第一行和最后一行的所有tr
	$("#submitedSuccessAdvancePendingOrderTable tr").not("#submitedSuccessAdvancePendingOrderTr").remove();
	
	//买卖方向
	var openBusiTypeTxt=""; //开仓买卖方向
	var closeBusiTypeTxt=""; //平仓买卖方向
	var closeBusiTypeTxtForAdv=""; //平仓买卖方向
	var tradeTypeValue = marketAndOrderObj.defaultTradeType;
	if(tradeTypeValue==0){
		openBusiTypeTxt = i18n.trade.tip_label_buy;
		closeBusiTypeTxt = i18n.trade.tip_label_sell;
		closeBusiTypeTxtForAdv = i18n.trade.sell;
	}
	else if(tradeTypeValue==1){
		openBusiTypeTxt = i18n.trade.tip_label_sell;
		closeBusiTypeTxt = i18n.trade.tip_label_buy;
		closeBusiTypeTxtForAdv = i18n.trade.buy;
	}
	
	//开仓部分
	var successHTMLText = "<tr><td><ul class='subm-info'>"
	 +"<li>"+i18n.trade.typeBuyAdvance+"</li>"
	 +"<li>"+openTypeTxt+"</li>"
	 +"<li>"+openBusiTypeTxt+advance_open_priceText+"</li>"
	 +"<li>"+i18n.trade.volumeTxt+advance_open_orderVolumeInputText+"</li>"
	 +"<li>"+i18n.trade.margin+advance_open_pendingMargin+"USD</li>";
	 //平仓部分
	
	// 如果是限价和停损单 (页面展示：类型  买入  投资额度  手数   期限  委托号等字段)
	if(closeType == OrderType.BUY_LIMIT || closeType == OrderType.SELL_LIMIT || closeType == OrderType.BUY_STOP || closeType == OrderType.SELL_STOP){
		successHTMLText = successHTMLText
		+"<li>"+closeTypeTxt+"</li>"
		+"<li>"+closeBusiTypeTxt+advance_close_priceText+"</li>";
	}else{//自动替换
		successHTMLText = successHTMLText
		+"<li>"+closeTypeTxt+"</li>"
		+"<li>"+i18n.trade.limitType+closeBusiTypeTxtForAdv+"："+advance_close_limitPriceText+"</li>"
		+"<li>"+i18n.trade.stopType+closeBusiTypeTxtForAdv+"："+advance_close_stopPriceText+"</li>";
	}
	successHTMLText = successHTMLText
	+"<li>"+i18n.trade.expirTxt+expirText+"</li>"
	+"<li id='advance_orderUID' style='display:none'>"+i18n.trade.pendingOrderNoTxt+"<span id='submitedAdvancePendingOrderUIDSpan'></span>"+"</li>"
    +"</ul></td></tr>";
	 $("#submitedSuccessAdvancePendingOrderTr").after(successHTMLText);
};

/**
 * 功能: 委托单提交时校验
 */
_checkPendingOrderSubmit = function() {
	var flag = false;
	flag = validatePendingOrderPrice();
	if (flag) {
		return _validateVolume("#orderVolumeInput");
	}
	return false;
};

/**
 * 效验委托单价格效验
 */
validatePendingOrderPrice = function(){
	var limitPrice = parseFloat($("#limitPrice").val());
	var limit_max =  parseFloat($("#limit_max").val());
	var limit_min =  parseFloat($("#limit_min").val());
	
	var stopPrice =  parseFloat($("#stopPrice").val());
	var stop_max =  parseFloat($("#stop_max").val());
	var stop_min =  parseFloat($("#stop_min").val());
	
	var busiType = getPendingOrderTypeValue();
	
	var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(marketAndOrderObj.prdcode);
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	var maxrange = symbolObj.maxrange; //最小距离, 停损用
	var re = /XX/g;
	var rey = /YY/g;
	
	var pendingOrderTradedType = marketAndOrderObj.defaultTradeType;//买卖方向 0-买;1-卖
	if(pendingOrderTradedType==0){
		//自动替代
		if ((busiType == OrderType.BUY_OCO)) {
			if(isNaN(limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice<limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(isNaN(stopPrice)){
				Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		} 
		
		// 限价
		if ((busiType == OrderType.BUY_LIMIT) || (busiType == OrderType.BUY_OCO) ) { 
			if(isNaN(limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice < limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10106].replace(re, limitspread));			
				return false;
			}
		}
	
		 // 止损
		if ((busiType == OrderType.BUY_STOP) || (busiType == OrderType.BUY_OCO) ) {
			if(isNaN(stopPrice)){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		}
	}
	
	if(pendingOrderTradedType==1){
		//自动替代
		if ((busiType == OrderType.BUY_OCO)) {
			if(isNaN(limitPrice)){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));		
				return false;
			}
			if(limitPrice<limit_min){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));			
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(isNaN(stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));			
				return false;
			}
		} 
		
		// 限价
		if ((busiType == OrderType.BUY_LIMIT) || (busiType == OrderType.BUY_OCO) ) { 
			if(isNaN(limitPrice)){
				Alert(WebUIError[10107].replace(re, triggerspread));	
				return false;
			}
			if(limitPrice < limit_min){
				Alert(WebUIError[10107].replace(re, triggerspread));	
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		}
	
		 // 止损
		if ((busiType == OrderType.BUY_STOP) || (busiType == OrderType.BUY_OCO) ) {
			if(isNaN(stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10109].replace(re, triggerspread));			
				return false;
			}
		}
	}
	return true;
};

/**
 * 效验修改委托单价格效验
 */
validateModifyPendingOrderPrice = function(){
	var limitPrice = parseFloat($("#modify_limitPrice").val());
	var limit_max = parseFloat($("#modify_limit_max").val());
	var limit_min = parseFloat($("#modify_limit_min").val());
	
	var stopPrice = parseFloat($("#modify_stopPrice").val());
	var stop_max = parseFloat($("#modify_stop_max").val());
	var stop_min = parseFloat($("#modify_stop_min").val());
	
	var busiType = pendingOrderObjModify.optype;
	
	var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(pendingOrderObjModify.prdcode);
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	var maxrange = symbolObj.maxrange; //最小距离, 停损用
	var re = /XX/g;
	var rey = /YY/g;
	
	var pendingOrderTradedType = pendingOrderObjModify.tradedir;//买卖方向 0-买;1-卖
	if(pendingOrderTradedType==0){
		//自动替代
		if ((busiType == OrderType.BUY_OCO)) {
			if(isNaN(limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice<limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10110].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(isNaN(stopPrice)){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		} 
		
		// 限价
		if ((busiType == OrderType.BUY_LIMIT) || (busiType == OrderType.BUY_OCO) ) { 
			if(isNaN(limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice < limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10106].replace(re, limitspread));			
				return false;
			}
		}
	
		 // 止损
		if ((busiType == OrderType.BUY_STOP) || (busiType == OrderType.BUY_OCO) ) {
			if(isNaN(stopPrice)){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		}
	}
	
	if(pendingOrderTradedType==1){
		//自动替代
		if ((busiType == OrderType.BUY_OCO)) {
			if(isNaN(limitPrice)){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));		
				return false;
			}
			if(limitPrice<limit_min){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));			
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(isNaN(stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10111].replace(re, limitspread).replace(rey, triggerspread));			
				return false;
			}
		} 
		
		// 限价
		if ((busiType == OrderType.BUY_LIMIT) || (busiType == OrderType.BUY_OCO) ) { 
			if(isNaN(limitPrice)){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(limitPrice < limit_min){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(limitPrice>limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
		}
	
		 // 止损
		if ((busiType == OrderType.BUY_STOP) || (busiType == OrderType.BUY_OCO) ) {
			if(isNaN(stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice < stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(stopPrice>stop_max){
				Alert(WebUIError[10109].replace(re, triggerspread));			
				return false;
			}
		}
	}
	
	return true;
};

//修改进阶委托单
validateModifyAdvPendingOrderPrice = function(){
	var openPendingObj = advPendingOrderObjModify.data[0];
	var closePendingObj = advPendingOrderObjModify.data[1];
	
	//开仓
	var advance_open_limitPrice = parseFloat($("#modify_advance_open_limitPrice").val());
	var advance_open_Limit_max = parseFloat($("#modify_advance_open_Limit_max").val());
	var advance_open_Limit_min = parseFloat($("#modify_advance_open_Limit_min").val());
	var advance_open_stopPrice = parseFloat($("#modify_advance_open_stopPrice").val());
	var advance_open_Stop_max = parseFloat($("#modify_advance_open_Stop_max").val());
	var advance_open_Stop_min = parseFloat($("#modify_advance_open_Stop_min").val());
	//平仓
	var advance_close_limitPrice = parseFloat($("#modify_advance_close_limitPrice").val());
	var advance_close_Limit_max = parseFloat($("#modify_advance_close_Limit_max").val());
	var advance_close_Limit_min = parseFloat($("#modify_advance_close_Limit_min").val());
	var advance_close_stopPrice = parseFloat($("#modify_advance_close_stopPrice").val());
	var advance_close_Stop_max = parseFloat($("#modify_advance_close_Stop_max").val());
	var advance_close_Stop_min = parseFloat($("#modify_advance_close_Stop_min").val());
	
	//开仓价格效验
	var openType = openPendingObj.optype; //开仓类型,1-限价, 2-停损
	var openTradeType = openPendingObj.tradedir;//开仓的买卖方向
	var symbolObj = QuotationGTS.getSymbolArrayByPrdId(openPendingObj.prdid);
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange; //最大距离, 停损用
	var re = /XX/g;
	
	if(openTradeType==0){//开仓买
		if ((openType == OrderType.BUY_LIMIT) ) { // 限价或进阶
			if(isNaN(advance_open_limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_limitPrice<advance_open_Limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_limitPrice>advance_open_Limit_max){
				Alert(WebUIError[10106].replace(re, limitspread));	
				return false;
			}
		} 
		
		if ((openType == OrderType.BUY_STOP) ) { // 止损或进阶
			if(isNaN(advance_open_stopPrice)){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(advance_open_stopPrice<advance_open_Stop_min){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(advance_open_stopPrice>advance_open_Stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
		}
	}else{//开仓卖
		if ((openType == OrderType.SELL_LIMIT)) { // 限价或进阶
			if(isNaN(advance_open_limitPrice)){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(advance_open_limitPrice<advance_open_Limit_min){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(advance_open_limitPrice>advance_open_Limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
		} 
		
		if ((openType == OrderType.SELL_STOP)) { // 止损或进阶
			if(isNaN(advance_open_stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
			if(advance_open_stopPrice<advance_open_Stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_stopPrice>advance_open_Stop_max){
				Alert(WebUIError[10109].replace(re, triggerspread));
				return false;
			}
		}
	}
	
	//平仓价格效验
	var closeType = closePendingObj.optype; //开仓类型
	if(openTradeType==1){//平仓是买的处理
		if ((closeType == OrderType.BUY_LIMIT) || (closeType == OrderType.BUY_OCO)) { // 限价或进阶
			if(isNaN(advance_close_limitPrice)){
				Alert(WebUIError[10123].replace(re, maxrange));			
				return false;
			}
			if(advance_close_limitPrice<advance_close_Limit_min){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
			if(advance_close_limitPrice>advance_close_Limit_max){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
		}
		
		if ( (closeType == OrderType.BUY_STOP)|| (closeType == OrderType.BUY_OCO)) { // 止损或进阶
			if(isNaN(advance_close_stopPrice)){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
			if(advance_close_stopPrice<advance_close_Stop_min){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
			if(advance_close_stopPrice>advance_close_Stop_max){
				Alert(WebUIError[10123].replace(re, maxrange));
				return false;
			}
		}
	}
	if(openTradeType==0){//平仓是卖的处理
		if ( (closeType == OrderType.SELL_LIMIT)|| (closeType == OrderType.SELL_OCO)) { // 止损或进阶
			if(isNaN(advance_close_limitPrice)){
				Alert(WebUIError[10122].replace(re, orderspread));		
				return false;
			}
			if(advance_close_limitPrice<advance_close_Limit_min){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
			if(advance_close_limitPrice>advance_close_Limit_max){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
		}
		
		if ( (closeType == OrderType.SELL_STOP)|| (closeType == OrderType.SELL_OCO)) { // 止损或进阶
			if(isNaN(advance_close_stopPrice)){
				Alert(WebUIError[10123].replace(re, maxrange));			
				return false;
			}
			if(advance_close_stopPrice<advance_close_Stop_min){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
			if(advance_close_stopPrice>advance_close_Stop_max){
				Alert(WebUIError[10122].replace(re, orderspread));
				return false;
			}
		}
	}
	return true;
};

/**
 * 功能: 进阶委托单提交时校验
 */
_checkAdvancePendingOrderSubmit = function() {
	var flag = false;
	flag = validateAdvPendingOrderPrice();
	if (flag) {
		return _validateVolume("#advance_open_orderVolumeInput");
	}
	return flag;
};

/**
 * 效验进阶委托单价格
 */
validateAdvPendingOrderPrice = function(){
	//开仓
	var advance_open_limitPrice = parseFloat($("#advance_open_limitPrice").val());
	var advance_open_Limit_max = parseFloat($("#advance_open_Limit_max").val());
	var advance_open_Limit_min = parseFloat($("#advance_open_Limit_min").val());
	var advance_open_stopPrice = parseFloat($("#advance_open_stopPrice").val());
	var advance_open_Stop_max = parseFloat($("#advance_open_Stop_max").val());
	var advance_open_Stop_min = parseFloat($("#advance_open_Stop_min").val());
	//平仓
	var advance_close_limitPrice = parseFloat($("#advance_close_limitPrice").val());
	var advance_close_Limit_max = parseFloat($("#advance_close_Limit_max").val());
	var advance_close_Limit_min = parseFloat($("#advance_close_Limit_min").val());
	var advance_close_stopPrice = parseFloat($("#advance_close_stopPrice").val());
	var advance_close_Stop_max = parseFloat($("#advance_close_Stop_max").val());
	var advance_close_Stop_min = parseFloat($("#advance_close_Stop_min").val());
	
	//开仓价格效验
	var openType = getAdvancePendingOrderTypeValue("open"); //开仓类型
	var symbolObj = QuotationGTS.getSymbolArrayByPrdcode(marketAndOrderObj.prdcode);
	var orderspread = symbolObj.orderspread; //最小距离, 限价用
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	var maxrange = symbolObj.maxrange; //最小距离, 停损用
	var re = /XX/g;
	
	var openTradeType = marketAndOrderObj.defaultTradeType;
	
	if(openTradeType==0){//开仓买
		if ((openType == OrderType.BUY_LIMIT) ) { // 限价或进阶
			if(isNaN(advance_open_limitPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_limitPrice<advance_open_Limit_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_limitPrice>advance_open_Limit_max){
				Alert(WebUIError[10106].replace(re, limitspread));	
				return false;
			}
		} 
		
		if ((openType == OrderType.BUY_STOP) ) { // 止损或进阶
			if(isNaN(advance_open_stopPrice)){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(advance_open_stopPrice<advance_open_Stop_min){
				Alert(WebUIError[10108].replace(re, triggerspread));	
				return false;
			}
			if(advance_open_stopPrice>advance_open_Stop_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
		}
		
		
	}else{//开仓卖
		if ((openType == OrderType.SELL_LIMIT)) { // 限价或进阶
			if(isNaN(advance_open_limitPrice)){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(advance_open_limitPrice<advance_open_Limit_min){
				Alert(WebUIError[10107].replace(re, limitspread));	
				return false;
			}
			if(advance_open_limitPrice>advance_open_Limit_max){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
		} 
		
		if ((openType == OrderType.SELL_STOP)) { // 止损或进阶
			if(isNaN(advance_open_stopPrice)){
				Alert(WebUIError[10112].replace(re, maxrange));			
				return false;
			}
			if(advance_open_stopPrice<advance_open_Stop_min){
				Alert(WebUIError[10112].replace(re, maxrange));	
				return false;
			}
			if(advance_open_stopPrice>advance_open_Stop_max){
				Alert(WebUIError[10109].replace(re, triggerspread));
				return false;
			}
		}
	}
	
	//平仓价格效验
	var closeType = getAdvancePendingOrderTypeValue("close"); //开仓类型
	if(openTradeType==1){//平仓是买的处理
		if ((closeType == OrderType.BUY_LIMIT) || (closeType == OrderType.BUY_OCO)) { // 限价或进阶
			if(isNaN(advance_close_limitPrice)){
				Alert(WebUIError[10123].replace(re, maxrange));			
				return false;
			}
			if(advance_close_limitPrice<advance_close_Limit_min){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
			if(advance_close_limitPrice>advance_close_Limit_max){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
		}
		
		if ( (closeType == OrderType.BUY_STOP)|| (closeType == OrderType.BUY_OCO)) { // 止损或进阶
			if(isNaN(advance_close_stopPrice)){
				Alert(WebUIError[10122].replace(re, orderspread));			
				return false;
			}
			if(advance_close_stopPrice<advance_close_Stop_min){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
			if(advance_close_stopPrice>advance_close_Stop_max){
				Alert(WebUIError[10123].replace(re, maxrange));
				return false;
			}
		}
	}
	if(openTradeType==0){//平仓是卖的处理
		if ( (closeType == OrderType.SELL_LIMIT)|| (closeType == OrderType.SELL_OCO)) { // 止损或进阶
			if(isNaN(advance_close_limitPrice)){
				Alert(WebUIError[10122].replace(re, orderspread));			
				return false;
			}
			if(advance_close_limitPrice<advance_close_Limit_min){
				Alert(WebUIError[10122].replace(re, orderspread));	
				return false;
			}
			if(advance_close_limitPrice>advance_close_Limit_max){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
		}
		
		if ( (closeType == OrderType.SELL_STOP)|| (closeType == OrderType.SELL_OCO)) { // 止损或进阶
			if(isNaN(advance_close_stopPrice)){
				Alert(WebUIError[10123].replace(re, maxrange));			
				return false;
			}
			if(advance_close_stopPrice<advance_close_Stop_min){
				Alert(WebUIError[10123].replace(re, maxrange));	
				return false;
			}
			if(advance_close_stopPrice>advance_close_Stop_max){
				Alert(WebUIError[10122].replace(re, orderspread));
				return false;
			}
		}
	}
	return true;
};


/**
 * 功能：委托下单修改类型时调用
 */
_changeOrderBusiType = function() {
	_showLimitOrStopByBusiType(getPendingOrderTypeValue());
};

/**
 * 功能：进阶委托下单开仓修改类型时调用
 */
_changeAdvanceOpenOrderBusiType = function() {
	_showAdvanceOpenLimitOrStopByBusiType(getAdvancePendingOrderTypeValue('open'));
};

/**
 * 功能：进阶委托下单平仓修改类型时调用
 */
_changeAdvanceCloseOrderBusiType = function() {
	_showAdvanceCloseLimitOrStopByBusiType(getAdvancePendingOrderTypeValue('close'));
};

/**
 * 动态更新 修改进阶委托单报价范围
 */
_changeModifyAdvanceOpenOrderBusiType = function(){
	var openPendingObj = advPendingOrderObjModify.data[0];
	var closePendingObj = advPendingOrderObjModify.data[1];
	
	var prdid = openPendingObj.prdid;
	var symbolObj;
	if(prdid=='0')
	  symbolObj = Tick.gold.symbol;
	else if(prdid=='1')
	  symbolObj = Tick.silver.symbol;
	
	var orderspread = symbolObj.orderspread; //进阶单点差
	var maxrange = symbolObj.maxrange;//最大委托价格范围
	var limitspread = symbolObj.limitspread; //最小距离, 限价用
	var triggerspread = symbolObj.triggerspread; //最小距离, 停损用
	
	/****************平仓处理******************/
	var close_tradedir = closePendingObj.tradedir;
	//初始化价格和文字
	var open_opttype = openPendingObj.optype;
	//初始化价格和文字
	if(close_tradedir==0){
		var advance_open_limitPrice = $("#modify_advance_open_limitPrice").val();
		var advance_open_stopPrice = $("#modify_advance_open_stopPrice").val();
		if(open_opttype == OrderType.BUY_LIMIT){
			$("#modify_advance_close_limitOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice ), Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice ), Number(maxrange))));
			
			$("#modify_advance_close_stopOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread))));
		}else if(open_opttype == OrderType.BUY_STOP){
			$("#modify_advance_close_limitOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice ), Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice ), Number(maxrange))));
			
			$("#modify_advance_close_stopOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread))));
		}
	}
	else if(close_tradedir==1){
		var advance_open_limitPrice = $("#modify_advance_open_limitPrice").val();
		var advance_open_stopPrice = $("#modify_advance_open_stopPrice").val();
		var closeBusiType = getAdvancePendingOrderTypeValue('close');
		if(open_opttype == OrderType.BUY_LIMIT){
			$("#modify_advance_close_limitOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice) , Number(maxrange))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_limitPrice ), Number(orderspread))));
			
			$("#modify_advance_close_stopOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(orderspread))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_limitPrice) , Number(maxrange))));
		}else if(open_opttype == OrderType.BUY_STOP){
			$("#modify_advance_close_limitOperate").html("≥"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Limit_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Limit_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice ), Number(orderspread))));
			
			$("#modify_advance_close_stopOperate").html("≤"+(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread)))));
			$("#modify_advance_close_Stop_max").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accAdd(Number(advance_open_stopPrice) , Number(maxrange))));
			$("#modify_advance_close_Stop_min").val(Util.formatPriceByPrdcode(symbolObj.prdcode, Util.accSub(Number(advance_open_stopPrice) , Number(orderspread))));
		}
		
	}
	
};


/**
 * 功能：进阶委托开仓下单根据不同类型,显示或隐藏限价框或停损框.
 * 描述：1)如果进阶开仓是限价,则限价框[可用] 止损框[不可用]
 * 	   2)如果进阶开仓是止损,则限价框[不可用] 止损框[可用]
 */
_showAdvanceOpenLimitOrStopByBusiType = function(busiType){
	// 如果进阶开仓是限价,则限价框[可用] 止损框[不可用]
	if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {
		$('#advance_open_limitPrice').attr("disabled",false);
		$('#advance_open_stopPrice').attr("disabled",true);
		$("#advance_open_limitPrice").spinner("enable");
		$("#advance_open_stopPrice").spinner("disable");
		
	}
	
	// 如果委托下单类型为买入停损或买出停损,则停损框亮起,限价框灰掉
	if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {
		$('#advance_open_limitPrice').attr("disabled",true);
		$('#advance_open_stopPrice').attr("disabled",false);
		$("#advance_open_limitPrice").spinner("disable");
		$("#advance_open_stopPrice").spinner("enable");
	}
	
	var tradeTypeValue = marketAndOrderObj.defaultTradeType; //买卖方向 0-买, 1-卖
	refreshOrInitPendingOrderPrice(tradeTypeValue);
	refreshOrInitAdvancePendingOrderPrice(tradeTypeValue);
};



/**
 * 功能：进阶委托开仓下单根据不同类型,显示或隐藏限价框或停损框.
 * 描述：3)如果进阶平仓是限价,则限价框[可用] 止损框[不可用]
 * 	   4)如果进阶平仓是止损,则限价框[不可用] 止损框[可用]
 */
_showAdvanceCloseLimitOrStopByBusiType = function(busiType){
	// 如果进阶开仓是限价,则限价框[可用] 止损框[不可用]
	if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {
		$('#advance_close_limitPrice').attr("disabled",false);
		$('#advance_close_stopPrice').attr("disabled",true);
		$("#advance_close_limitPrice").spinner("enable");
		$("#advance_close_stopPrice").spinner("disable");
		
	}
	
	// 如果委托下单类型为买入停损或买出停损,则停损框亮起,限价框灰掉
	if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {
		$('#advance_close_limitPrice').attr("disabled",true);
		$('#advance_close_stopPrice').attr("disabled",false);
		$("#advance_close_limitPrice").spinner("disable");
		$("#advance_close_stopPrice").spinner("enable");
	}
	
	// 如果委托下单类型为 自动替代,则限价框、停损框都亮起
	if (busiType == OrderType.BUY_OCO || busiType == OrderType.SELL_OCO) {
		$('#advance_close_limitPrice').attr("disabled",false);
		$('#advance_close_stopPrice').attr("disabled",false);
		$("#advance_close_limitPrice").spinner("enable");
		$("#advance_close_stopPrice").spinner("enable");
	}
	var tradeTypeValue = marketAndOrderObj.defaultTradeType; //买卖方向 0-买, 1-卖
};


/**
 * 功能：委托下单根据不同类型,显示或隐藏限价框或停损框.
 * 描述：1)如果委托下单类型为买入限价/买出限价 则限价框亮起,停损框灰掉
 *     2)如果委托下单类型为买入停损/买出停损 则停损框亮起,限价框灰掉
 *     3)如果委托下单类型为 自动替代 则限价框、停损框都亮起
 */
_showLimitOrStopByBusiType = function(busiType){
	// 如果委托下单类型为买入限价或买出限价 ,则限价框亮起,停损框灰掉
	if (busiType == OrderType.BUY_LIMIT || busiType == OrderType.SELL_LIMIT) {
		$("#pendingOrderTable tr[name='unadvance']").show();
		$("#pendingOrderTable tr[name='advance']").hide();
		$('#limitPrice').attr("disabled",false);
		$("#limitPrice").spinner("enable");
		
		$('#stopPrice').attr("disabled",true);
		$("#stopPrice").spinner("disable");
		
		$("#pendingOrderP").show();
		$("#advamcePendingOrderP").hide();
	}
	
	// 如果委托下单类型为买入停损或买出停损,则停损框亮起,限价框灰掉
	if (busiType == OrderType.BUY_STOP || busiType == OrderType.SELL_STOP) {
		$("#pendingOrderTable tr[name='unadvance']").show();
		$("#pendingOrderTable tr[name='advance']").hide();
		$('#limitPrice').attr("disabled",true);
		$("#limitPrice").spinner("disable");
		
		$('#stopPrice').attr("disabled",false);
		$("#stopPrice").spinner("enable");
		
		$("#pendingOrderP").show();
		$("#advamcePendingOrderP").hide();
	}
	
	// 如果委托下单类型为 自动替代,则限价框、停损框都亮起
	if (busiType == OrderType.BUY_OCO || busiType == OrderType.SELL_OCO) {
		$("#pendingOrderTable tr[name='unadvance']").show();
		$("#pendingOrderTable tr[name='advance']").hide();
		$('#limitPrice').attr("disabled",false);
		$("#limitPrice").spinner("enable");
		
		$('#stopPrice').attr("disabled",false);
		$("#stopPrice").spinner("enable");
		
		$("#pendingOrderP").show();
		$("#advamcePendingOrderP").hide();
	}
	
	if(busiType == OrderType.BUY_advance || busiType == OrderType.SELL_advance){
		$("#pendingOrderTable tr[name='unadvance']").hide();
		$("#pendingOrderTable tr[name='advance']").show();
		$("#pendingOrderP").hide();
		$("#advamcePendingOrderP").show();
	}
	
	
};

/**
 *功能：委托下单，修改手数时调用
 */
_changeOrderVolumeForInputText = function() {
	//修改手数input
	calculatePendingMargin($("#orderVolumeInput").val(),"pendingMargin");
};

/**
 *功能：委托下单，修改手数时调用
 */
_changeAdvanceOrderVolumeForInputText = function() {
	//修改手数input
	calculatePendingMargin($("#advance_open_orderVolumeInput").val(),"advance_open_pendingMargin");
};


/**
 * 计算委托单下单保证金
 */
calculatePendingMargin = function(lot, pendingMargin) {
	// 计算保证金
	var tmpOMMargin = lot * getUserMargin(marketAndOrderObj.prdcode);
	$("#"+pendingMargin).html(Util.fixToStrTwodecimal(tmpOMMargin));
};

/**
 *功能：进阶委托下单，修改手数时调用
 */
_changeAdvanceOrderVolumeForInput = function() {
	 Util.allowNumKeyUp(document.getElementById("advance_open_orderVolumeInput"));
	 var cv=$("#advance_open_orderVolumeInput").val();
	 if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maximalVolume)){
		$("#advance_open_orderVolumeInput").val(marketAndOrderObj.maximalVolume);
	 }
};

/**
 * 计算委托单下单保证金
 */
calculateAdvancePendingMargin = function(lot) {
	// 计算保证金
	var tmpAdvMargin = lot * getUserMargin(marketAndOrderObj.prdcode);
	$("#advance_open_pendingMargin").html(Util.fixToStrTwodecimal(tmpAdvMargin));
};

/**
 * 功能：格式化限价
 */
formatLimitPrice = function(limitPrice){
	//return parseFloat(limitPrice).toFixed(marketAndOrderObj.officePriceDights);
	return Util.fixToStrTwodecimal(limitPrice);
};

/**
 * 功能：格式化止损价
 */
formatStopPrice = function(stopPrice){
	//return parseFloat(stopPrice).toFixed(marketAndOrderObj.officePriceDights);
	return Util.fixToStrTwodecimal(stopPrice);
};

//取消訂單的dialog
cancelPendingOrderConfirmDialog = function( cancelPendingOrderFunc, orderid, prdid){
	$("#cancelorder_confirm_tips").html(i18n.confirmCancelCurrentOrder);
	$("#cancelorder_confirm").dialog();
	$("#cancelorder_confirm_title").html(((prdid==0)?i18n.llg:i18n.lls)+"--"+Util.simpleOid(orderid));
	$(".ui-dialog-titlebar-close", $("#cancelorder_confirm").parent()).hide();
	$("#cancelorder_confirm_btn_yes").unbind("click");
	$("#cancelorder_confirm_btn_no").unbind("click");
	$("#cancelorder_confirm_btn_yes").on("click",function(){
		$("#cancelorder_confirm").dialog("close");
		cancelPendingOrderFunc();
	});
	$("#cancelorder_confirm_btn_no").on("click",function(){
		$("#cancelorder_confirm").dialog("close");
	});
};

/**
 * 功能:取消委托订单
 */
cancelPendingOrder = function(pendingOrderObj, advOrders, callback){
	var cancelPendingOrderFunc = function() {
		var currentTime = new Date().getTime();
		//定义闭包func
		var emitCancelOrderRequest = function(requestPendingOrderObj){
			var param = {
					"open_close" : requestPendingOrderObj.positiondir, // 取消建仓挂单: 0 取消平仓挂单: 1
					// 以下同OrderItem的参数
					"oid" : requestPendingOrderObj.oid, // 委托号或特别处理大单序列号
					"targetoid" : "", // 需要平仓的单号
					"roid" : requestPendingOrderObj.roid, // mod20100919,关联单号:进阶单时,该单号是第二张单的单号

					"prdid" : requestPendingOrderObj.prdid, // 产品ID 0.london gold 1.london
														// silver 2.HK gold
					"optype" : requestPendingOrderObj.optype, // 下单类型：operation type 0市价单 1限价盘
														// 2止蚀盘 3自动替代
					"tradedir" : requestPendingOrderObj.tradedir, // 买卖方向：trade direction 0买
															// 1卖
					"positiondir" : requestPendingOrderObj.positiondir, // 仓位方向：position
																	// direction 建仓0/平仓1
					"tradestatus" : 0, // 交易状态：-1取消 0未成交 1已成交
					"validtype" : requestPendingOrderObj.validtype, // 委托有效时间:0为当日有效，1为本周有效
					"validflag" : requestPendingOrderObj.validflag, // mod20100919,生效标志:
																// 0生效(非进阶单)
																// 1进阶单未生效,2进阶单生效;
					"lot" : requestPendingOrderObj.lot == 'undefined' ? '' : requestPendingOrderObj.lot, // 手数
					"time" : currentTime, // 建仓时间
					"limitprice" : requestPendingOrderObj.limitprice, // 委托限价单价
					"price" : requestPendingOrderObj.price,
					"range" : 1.0, // 有效范
					"tradeunit" : 1 // 波幅（安司）
				};
				socket.listeners.$listenEvent(Constant.CMD_CANCEL_ORDER, param, "CancelOrderRet", function(para, data) {
					if (callback != null&&typeof advOrders=='undefined') {
						if (para.oid == requestPendingOrderObj.oid) {
							callback();
							return true;
						}
						return false;
					}
					return true;
				});
		};
		
		if(!advOrders||typeof advOrders=='undefined'){ //非关联单取消
			emitCancelOrderRequest(pendingOrderObj);
		}else{//关联单取消
			for(var index in advOrders){
				emitCancelOrderRequest(advOrders[index]);
			}
		}
		
	};
	cancelPendingOrderConfirmDialog(cancelPendingOrderFunc, pendingOrderObj.oid, pendingOrderObj.prdid);
};

//取消多个委托订单
cancelPendingOrdersRequest = function(orders, callback){
	for(var index=0; index<orders.length; index++){
		var orderObj = orders[index];
		cancelPendingOrderRequest(orderObj);
	}
	callback();
	function cancelPendingOrderRequest(requestPendingOrderObj){
		var currentTime = new Date().getTime();
		var param = {
				"open_close" : requestPendingOrderObj.positiondir, // 取消建仓挂单: 0 取消平仓挂单: 1
				// 以下同OrderItem的参数
				"oid" : requestPendingOrderObj.oid, // 委托号或特别处理大单序列号
				"targetoid" : "", // 需要平仓的单号
				"roid" : requestPendingOrderObj.roid, // mod20100919,关联单号:进阶单时,该单号是第二张单的单号

				"prdid" : requestPendingOrderObj.prdid, // 产品ID 0.london gold 1.london
													// silver 2.HK gold
				"optype" : requestPendingOrderObj.optype, // 下单类型：operation type 0市价单 1限价盘
													// 2止蚀盘 3自动替代
				"tradedir" : requestPendingOrderObj.tradedir, // 买卖方向：trade direction 0买
														// 1卖
				"positiondir" : requestPendingOrderObj.positiondir, // 仓位方向：position
																// direction 建仓0/平仓1
				"tradestatus" : 0, // 交易状态：-1取消 0未成交 1已成交
				"validtype" : requestPendingOrderObj.validtype, // 委托有效时间:0为当日有效，1为本周有效
				"validflag" : requestPendingOrderObj.validflag, // mod20100919,生效标志:
															// 0生效(非进阶单)
															// 1进阶单未生效,2进阶单生效;
				"lot" : requestPendingOrderObj.lot == 'undefined' ? '' : requestPendingOrderObj.lot, // 手数
				"time" : currentTime, // 建仓时间
				"limitprice" : requestPendingOrderObj.limitprice, // 委托限价单价
				"price" : requestPendingOrderObj.price,
				"range" : 1.0, // 有效范
				"tradeunit" : 1 // 波幅（安司）
			};
			socket.listeners.$listenEvent(Constant.CMD_CANCEL_ORDER, param, "CancelOrderRet");
	};
};