/**
 * 行情展示QuotationGTS（格子报表、列表报表、自选报表）
 * 
 * @version 1.0
 * @author JOE
 * 
 */

var QuotationGTS = {

	/** 产品的唯一主键KEY，对应属性prdcode */
	symbolKey : 'prdcode',

	/** 产品table的所有headers数组 */
	headers : new Array(),
	
	/** 当前下单的产品对象。 */
	currentSymbolKey : '',
	
	/**
	 * 格子报价中需要根据tick动态数据进行动态更新的属性集。
	 * newP:现价, localtime:报价时间, spread:点差, bid:卖价, ask:卖价, low:最高价, high:最低价, buyinterest:买利息, sellinterest:卖利息
	 * lastbid:上一次卖价, lastask:上一次买价
	 */
	dynamicsNames : [ 'newP', 'localTime', 'spread', 'bid', 'ask', 'low', 'high', 'buyinterest', 'sellinterest', 'lastbid',
			'lastask' ],

	/**
	 * 格子行情、列表行情初始化。
	 * 
	 * @param para
	 *            为node提供的参数。
	 * @param data
	 */
	init : function(para, data) {
		data.length = para.num; //从服务器取出的para.num为data数组长度
		this.setSymbolArray(data); //设置全局行情常量数组。
		this.getLastTick(); // 获取历史tick数据。
//		this.getOpenClosePrice(); // 获取开盘和关闭报价
	},

	/**
	 * 设置产品列表到全局变量
	 * 
	 * @param dataList
	 *            从服务器取出的公共产品数组。
	 *           
	 */
	setSymbolArray : function(dataList) {
		if (dataList) {
			for ( var index = 0; index < dataList.length; index++) {
				removeSymbolFromSymbolArray(dataList[index]['prdcode']);
				//根据prdcode设置prdname
				if (dataList[index]['prdcode'] == '022')
					dataList[index]['prdname'] = i18n.llg;
				else if (dataList[index]['prdcode'] == '023')
					dataList[index]['prdname'] = i18n.lls;
				else
					dataList[index]['prdname'] = '--';
				//tick的报价屬性都設置到symbollist全局對象中
				dataList[index].ask='';
				dataList[index].bid='';
				dataList[index].newP='';
				dataList[index].low='';
				dataList[index].high='';
				
				symbolArray.push(dataList[index]);
			}
		};
		
		function removeSymbolFromSymbolArray(prdCode){
			for(var index in symbolArray){
				var symbolObj = symbolArray[index];
				if(symbolObj.prdcode==prdCode){
					symbolArray.splice(index,1);
					break;
				}
			}
		};
		
		
	},
	
	/**
	 * 刷新交易窗口的各个属性设置
	 */
	refreshMarketAndPendingTradeDialog: function(data){
		if($("#marketAndPendingOrderDiv").dialog("isOpen")){
			if(Number(data.length)===1&&data[0].prdcode===marketAndOrderObj.prdcode){
				marketAndOrderObj.refreshMarketAndPendingOrderData(data[0]);
				_setVolumeList("#omVolumeSel","#omVolumeInput","#volumeRange","#omVolumeSelSpan", true);
				_setVolumeList("#orderVolumeSel","#orderVolumeInput","#orderVolumeRange","#orderVolumeSelSpan", true);
				_setVolumeList("#advance_open_orderVolumeSel","#advance_open_orderVolumeInput","#advance_open_orderVolumeRange","#advance_open_orderVolumeSelSpan", true);
			}
			refreshTransactionRange("transactionRange", "transactionRangeSpan");
			
			//计算获取用户保证金
			var userUnitMargin = getUserMargin(marketAndOrderObj.prdcode); //用户单位保证金
			var userMargin = parseFloat($("#omVolumeInput").val()) * userUnitMargin;
			$("#omMargin").html(userMargin);
			
		    var tmpMargin = parseFloat($("#orderVolumeInput").val()) * userUnitMargin;
		    $("#pendingMargin").html(tmpMargin);
		    $("#advance_open_pendingMargin").html(tmpMargin);
		    
		    //refresh to get the update spread
		    marketAndOrderObj.orderspread = data[0].orderspread;
		    marketAndOrderObj.maxrange = data[0].maxrange;
		    marketAndOrderObj.maxmprange = data[0].maxmprange;
		    marketAndOrderObj.limitspread = data[0].limitspread;
		    marketAndOrderObj.triggerspread = data[0].triggerspread;
		    
		}
		
		if($("#c_marketAndPendingOrderDiv").dialog("isOpen")){
			if(Number(data.length)===1&&data[0].prdcode===marketAndOrderObj.prdcode){
				marketAndOrderObj.refreshMarketAndPendingOrderData(data[0]);
				_setVolumeList("#c_omVolumeSel","#c_omVolumeInput","#c_volumeRange","#c_omVolumeSelSpan", true);
				_setVolumeList("#c_orderVolumeSel","#c_orderVolumeInput","#c_orderVolumeRange","#c_orderVolumeSelSpan", true);
			}
			refreshTransactionRange("c_transactionRange", "c_transactionRangeSpan");
			
			//refresh to get the update spread
		    marketAndOrderObj.orderspread = data[0].orderspread;
		    marketAndOrderObj.maxrange = data[0].maxrange;
		    marketAndOrderObj.maxmprange = data[0].maxmprange;
		    marketAndOrderObj.limitspread = data[0].limitspread;
		    marketAndOrderObj.triggerspread = data[0].triggerspread;
		}
		
	},
	
	
	/**
	 * 取历史Tick数据 刚登录进系统，有些行情的TICK数据还没过来，所以取历史tick数据，为了不显示空白，仅美观，数据无实际意义。
	 */
	getLastTick : function() {
		var paramObj = {};
		var tempSymbolArray = getSymbolArray();
		if (tempSymbolArray) {
			for ( var i = 0; i < tempSymbolArray.length; i++) {
				paramObj[i] = tempSymbolArray[i]['prdcode'];
			}
			socket.emit('request', Constant.CMD_LAST_TICK, paramObj);
		}
	},
	
	/**
	 * 获取开盘，昨收信息。flag=0,从最新到旧数据
	 */
	getOpenClosePrice : function() {
		for ( var source in QuotationGTS.symbolSeq) {
			socket.emit('request', Constant.CMD_QUOTE_QUERY, {
				"time" : 0,
				"num" : 2,
				"period_num" : 1,
				"period_type" : 3,
				"flag" : 0,
				"symbol" : source,
				"seq" : QuotationGTS.symbolSeq[source]
			});
		}
	},
	
	/**
	 * 注:此方法一定要在updatebox和updatetable之前执行
	 * 保存最新报价到symbol对象中,并记录老报价, 此处是为了新报价和老报价进行比较
	 * @param ticDataArray
	 * @param symbolArray
	 */
	saveTickToSymbol : function(tick){
			if(tick == null) {
				return;
			}
			
			var tmpSymbol = this.getSymbolArrayByPrdcode(tick.prdcode);
			if (tmpSymbol == null || tmpSymbol == undefined) {
				return;
			}
			tmpSymbol['lastask'] = tmpSymbol['ask'];
			tmpSymbol['lastbid'] = tmpSymbol['bid'];
			tmpSymbol['ask'] = tick.ask;
			tmpSymbol['bid'] = tick.bid;
			tmpSymbol['dtime'] = tick.time;
			
			// 若tick对象为当前下单行情，则实时更新下单行情数据。
			if (tmpSymbol.prdcode == this.currentSymbolKey) {
				//刷新
				refreshMarketDiv(tmpSymbol);
				refreshPendingOrderDiv(tmpSymbol);
				refreshModifyPendingOrderDiv(tmpSymbol);
				refreshModifyAdvPendingOrderDiv(tmpSymbol);				
			}

	},
	
	/**
	 * 功能：根据prdcode获取行情对象。
	 * @param key 可为行情的source或者prdcode属性。
	 */
	getSymbolArrayByPrdcode : function(key) {
		var tempArray = getSymbolArray();
		if (tempArray) {
			for (var index = 0; index < tempArray.length; index ++) {
				if (tempArray[index]['source'] == key || tempArray[index]['prdcode'] == key) {
					return tempArray[index];
				}
			}
		}
	},
	
	/**
	 * 功能：根据prdId获取行情对象。
	 * @param key 可为行情的source或者prdcode属性。
	 */
	getSymbolArrayByPrdId : function(prdid) {
		var key;
		if (prdid==0){
			key=22;
		}else if (prdid==1){
			key=23;
		}
		var tempArray = getSymbolArray();
		if (tempArray) {
			for (var index = 0; index < tempArray.length; index ++) {
				if (tempArray[index]['source'] == key || tempArray[index]['prdcode'] == key) {
					return tempArray[index];
				}
			}
		}
	},
	
	/**
	 * 功能：清空行情模块数组和对象内存。
	 */
	clearQuotationArray : function() {
		this.currentSymbolKey = '';
	},
	
	
	/**
	 * 设置当前下单买产品；调用下单窗口函数。
	 * 
	 * @param prdcode
	 *            产品代码。
	 * @param buySell
	 *            下单的买卖标识。0：买；1：卖
	 */
	callModifyFun : function(prdcode, buySell) {
		if(isHoliday||isWeekend){//需求规定周末或者假期开始后,提示‘非交易时段，操作无效（10113）
			Alert(WebUIError["10113"]);
			return false;
		}
		
		if(accountBaseInfo.userstatus==4){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10120"]);
			return false;
		}
		var currentSymbol = this.getSymbolArrayByPrdcode(prdcode);
		if(!isSymbolTradeOpen(currentSymbol.prdid)){//用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			alert(WebUIError["10113"]);
			return false;
		}
		
		try{
			if (currentSymbol) {
				currentSymbol['buySell'] = buySell;
				this.currentSymbolKey = currentSymbol[this.symbolKey];
				openTradeWindowDiv(currentSymbol);
				currentSymbol = null;
			}
		} catch (e) {
			alert('line 1054, error:' +e);
		}
	},
	
	/**
	 * 修改当前委托单；调用下单窗口函数。
	 * @param pendingOrderObj 委托单数据对象
	 * @param advPendingOrderObj 产品对象
	 */
	callModifyPendingOrderFun : function(pendingOrderObj, advPendingOrderObj) {
		if(isHoliday||isWeekend){//需求规定周末或者假期开始后,提示‘非交易时段，操作无效（10113）
			Alert(WebUIError["10113"]);
			return false;
		}
		
		/*if(accountBaseInfo.userstatus==4){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10120"]);
			return false;
		}*/
		
		if(!isSymbolTradeOpen(pendingOrderObj.prdid)){//用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10113"]);
			return false;
		}
		
		var prdid = pendingOrderObj.prdid;
		//根据产品id获取产品code
		var prdcode = getPrdCodeByPrdId(prdid);
		//根据产品code获取产品id
		var symbolObj = this.getSymbolArrayByPrdcode(prdcode);
		this.currentSymbolKey = symbolObj[this.symbolKey];
		openModifyTradeWindowDiv(pendingOrderObj, advPendingOrderObj, symbolObj);
	},
	
	/**
	 * 取消当前委托单。
	 * @param pendingOrderObj 委托单数据对象
	 * @param advPendingOrderObj 产品对象
	 */
	callCancelPendingOrderFun : function(pendingOrderObj, advOrders, callback) {
		if(isHoliday||isWeekend){//需求规定周末或者假期开始后,提示‘非交易时段，操作无效（10113）
			Alert(WebUIError["10113"]);
			return false;
		}
		/*if(accountBaseInfo.userstatus==4){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10120"]);
			return false;
		}*/
		if(!isSymbolTradeOpen(pendingOrderObj.prdid)){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10113"]);
			return false;
		}
		cancelPendingOrder(pendingOrderObj, advOrders, callback);
	},
	/**
	 * 取消当前委托单。
	 * @param pendingOrderObj 委托单数据对象
	 * @param advPendingOrderObj 产品对象
	 */
	callCancelPendingOrderWithoutConfirm : function(pendingOrderObjArray, callback) {
		if(isHoliday||isWeekend){//需求规定周末或者假期开始后,提示‘非交易时段，操作无效（10113）
			Alert(WebUIError["10113"]);
			return false;
		}
		
		/*if(accountBaseInfo.userstatus==4){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10120"]);
			return false;
		}*/
		
		if(!isSymbolTradeOpen(pendingOrderObjArray[0].prdid)){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			Alert(WebUIError["10113"]);
			return false;
		}
		cancelPendingOrdersRequest(pendingOrderObjArray, callback);
	}
};


$(function(){
	// 实时行情
	socket.listeners.$after({'tick': function(para, data) {
		for(var i = 0; i < para + 1; i++){
			var t = data[i];
			var tick = Tick.$get(t.symbol);
			// 保存此次报价到symbol对象中, 此处是为了新报价和老报价进行比较
			// 更新相关联影响的模块报价。如：市价下单模块报价,委托单下单模块报价。
			QuotationGTS.saveTickToSymbol(tick); 
		}
	}});
});
