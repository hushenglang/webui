/**
 * 市价下单功能
 * 
 */
$(function() {
	
	// 相关验证(投资额度、成交范围、手数输入的最大值、小数位)
	$("#transactionRange").on('keypress', function(event){
		var spinnerStepLength = Util.getSpinnerStepLength(marketAndOrderObj.prdcode);
		return Util.allowMaxDightsLenKeyPress(event,document.getElementById("transactionRange"),spinnerStepLength);
	});	
	
	// 相关验证(投资额度、成交范围、手数输入的最大值、小数位)
	$("#transactionRange").on('keyup', function(event){
		var cv=$("#transactionRange").val();
		 if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maxTransactionRange)){
			$("#transactionRange").val(marketAndOrderObj.maxTransactionRange);
		 }
	});	
	
	// 相关验证(投资额度、成交范围、手数输入的最大值、小数位)
	$("#omVolumeInput").on('keypress', function(event){
		return Util.allowMaxDightsLenKeyPress(event,document.getElementById("omVolumeInput"),2);
	});
	
	$("#omVolumeInput").on('keyup', function(event){
		 Util.allowNumKeyUp(document.getElementById("omVolumeInput"));
		 var cv=$("#omVolumeInput").val();
		 if(Util.isNotBlank(cv)&& parseFloat(cv)>parseFloat(marketAndOrderObj.maximalVolume)){
			$("#omVolumeInput").val(marketAndOrderObj.maximalVolume);
		 }
		 calculateOMMargin($("#omVolumeInput").val());
	});
	
	
	// 市价下单,下拉改变手数
	
	$("#omVolumeSel-btn").on('click',function(){
		var lis=$("#omVolumeSel li");
		lis.removeClass("sxc-lihov");
		lis.each(function(){
			if($(this).attr("tv")==$("#omVolumeInput").val()){
				$(this).addClass("sxc-lihov");
			}
		});
		$("#omVolumeSel").toggle();
	 });
	
	
	// 市价下单提交
	$("#btnOmOK").unbind('click').on('click', submitMarket);
	
});

/**
 * 功能： 初始化市价下单窗口的内容
 *@param  obj   相关的数据对象键值对
 */
initMarketDiv = function(obj) {
	_settingMarketDiv(obj);
};

/**
 * 功能： 当初始化市价或刷新市价窗口的内容时调用
 *@param  obj   相关的数据对象键值对
 */
_settingMarketDiv = function(obj){
	// 初始化买卖信息
	var tradeTypeValue = marketAndOrderObj.defaultTradeType;
	var tradeTypeName;
	if(tradeTypeValue==0)
		tradeTypeName=i18n.trade.label_buy;
	else if(tradeTypeValue==1)
		tradeTypeName=i18n.trade.label_sell;
	else
		tradeTypeName='---';
	$("#omDefaultTradeType").html(tradeTypeName);
	
	// 初始化买卖价格信息
	var tradePrice;
	if(tradeTypeValue==0)
		tradePrice = marketAndOrderObj.buy;
	else if(tradeTypeValue==1)
		tradePrice = marketAndOrderObj.ask;
	else
		tradePrice='---';
	$("#tradePrice").html(tradePrice);
	
	
	
	// 初始化默认手数
    initMarketVolume();
	
  //计算获取用户保证金
	var userMargin = parseFloat($("#omVolumeInput").val()) * getUserMargin(marketAndOrderObj.prdcode);
	$("#omMargin").html(Util.fixToStrTwodecimal(userMargin));
   
	// 初始化成交范围
	initTransactionRange();
	
};

/**
 * 功能：初始化市价单的手数
 */
initMarketVolume = function(){
	_setVolumeList("#omVolumeSel","#omVolumeInput","#volumeRange","#omVolumeSelSpan");
	var cookieVol=SystemCookie.getTradeVol(marketAndOrderObj.prdcode);
	if(Util.isNotBlank(cookieVol)){
		// 如果 1)默认手数已小于当前的最小单量  2) 默认手数大于最大单量设定   3)默认手数不满足步长限制    则手数输入框 默认填入最小单量,同时取消掉勾选状态,清空cookie
		var defaultVolume = parseFloat(cookieVol);
		var minimalVolume = parseFloat(marketAndOrderObj.minimalVolume);
		var maximalVolume = parseFloat(marketAndOrderObj.maximalVolume);
		var volumeStep    = Util.accMul(marketAndOrderObj.volumeStep,100);
		if(defaultVolume < minimalVolume || defaultVolume > maximalVolume || Util.accMul(Util.accSub(defaultVolume,minimalVolume),100) % volumeStep != 0){
			$("#omVolumeSel").val(Util.fixToStr(marketAndOrderObj.minimalVolume));
			//获取手数列表的第一个值
			$("#omVolumeInput").val(defaultVolume);
			document.getElementsByName("defaultOmVolumeCheckbox")[0].checked = true;
		}else{
			$("#omVolumeSel").val(cookieVol);
			$("#omVolumeInput").val(cookieVol);
			document.getElementsByName("defaultOmVolumeCheckbox")[0].checked = true;
		}
	}else{
		var tempArray = marketAndOrderObj.volumeLotinfo;
		$("#omVolumeInput").val(Util.fixToStr(tempArray[0]));
		$("#defaultOmVolumeCheckbox").attr("checked",false);
	}
};

/**
 * 功能： 更新市价下单窗口的内容
 *@param  obj 相关的数据对象键值对
 */
refreshMarketDiv = function(obj){
	// 判断是否打开下单窗口,没有打开不刷新
	if(!$("#marketAndPendingOrderDiv").dialog("isOpen")){
		return;
	}
	
	// 更新初始化参数
	marketAndOrderObj.setMarketAndPendingOrderData(obj);
	
	// 更新弹出框标题
	var title = marketAndOrderObj.produceName;
	$("#marketAndPendingOrderDiv").dialog('option', 'title',title);
	
	// 更新买卖价信息
	var tradeTypeValue = marketAndOrderObj.defaultTradeType; //买卖方向
	var tradePrice;
	if(tradeTypeValue==0)
		tradePrice = marketAndOrderObj.buy;
	else if(tradeTypeValue==1)
		tradePrice = marketAndOrderObj.ask;
	else
		tradePrice='---';
	$("#tradePrice").html(tradePrice);
	
};

/**
 * 功能： 市价下单提交时调用
 * {"symbol":"022", "volume":1.3, "deal_type":1, "ext_info":{"Range":0.5, "TickPrice":1415.01, "TickTime":1366274700}}
 */
submitMarket = function(){
	//检查成交范围的合法性
	if(!_validateTransRange()) {
		return false;
	}
	// 检查市价下单合法性
	if(!_checkMarketSubmit()){
    	return false;
    }
	
	// 执行市价下单
	doSubmitMarket();
};

/**
 * (GTS)功能：执行市价下单
 */
doSubmitMarket = function(){
	var volume,seq,range,dealType,price, omMargin;
	marketAndOrderObj.marketSubmitStartTime =new Date().getTime();
	marketAndOrderObj.isSubmittingMarket = true;
	marketAndOrderObj.isResponseMarket = false;
	
	// 交易手数赋值
	volume = Util.fixToStrTwodecimal($("#omVolumeInput").val());
	$("#submitedVolumeSpan").text(volume);
	
	//保证金
	omMargin = $("#omMargin").text();
	
	seq = Util.getRandomSeq();
	marketAndOrderObj.marketSeq = seq;
	
	range =$("#transactionRange").spinner("value");
	if(range===''||typeof range ==='undefined'||range===null)
		range = '0';
	
	$("#submitedTransactionRangeSpan").text(parseFloat(range));
	
	//保证金赋值
	$("#submitedMargin").text($("#omMargin").text());
	
	// 交易类型、对应价格赋值
	if(marketAndOrderObj.defaultTradeType == "0"){
		dealType = 0;  // 买
		price = parseFloat(marketAndOrderObj.buy);
		$("#tradeTypeTitleTd").html(i18n.trade.tip_label_buy);  // 买入:
		$("#submitedTradePriceSpan").html(price);
	}else{
		dealType = 1;  // 卖
		price = parseFloat(marketAndOrderObj.ask);
		$("#tradeTypeTitleTd").empty();
		$("#tradeTypeTitleTd").html(i18n.trade.tip_label_sell);  // 卖出:
		$("#submitedTradePriceSpan").html(price);
	}
	
	//构造prdid 产品ID　0.london gold　1.london silver 2.HK gold
	var tmpPrdCode = marketAndOrderObj.prdcode;
	var tmpPrdId;
	if(tmpPrdCode=='022')
		tmpPrdId = 0;
	else if(tmpPrdCode=='023')
		tmpPrdId = 1;
	
	$("#marketSuccessMsg").hide();
	$("#marketPreSubmittingMsg").show();
	$("#marketPreSubmittingMsg").html(i18n.trade.sumitting);           // 提交中
	$("#marketC").hide();                                 			   // 提交中时不显示关闭按钮
	$("#submitedSuccessMarketTable").show();
	$("#submitedFailMarketTable").hide();
	$("#marketFC").hide();
	$("#marketTable").hide();
	$("#marketP").hide();
	$("#uidId").hide();
	$("#doneRange").show();
	disableTradeLi();
	marketAndOrderObj.isAllowCloseTradeWindow = false;
	hideCloseBtn("#marketAndPendingOrderDiv");
	
	// 构造参数对象,向交易服务器发送对应的数据
	var param = {
		"prdid" : tmpPrdId,
		"lot" : volume,
		"price" : price,
		"range" : range,
		"tradedir" : dealType,
		"ordertime" : marketAndOrderObj.dtime,
		"validtime" : 0,
		"closeid" : '',
		"margin" : omMargin,
		"charge" : 0
	};

	Log.debug(param);
	// 市价开仓单SOCKET请求
	socket.emit('request', 0x10100, param);
	// 提交订单后判断服务器是否在60以内响应
	tradeTimeOutObj = setTimeout(checkIsMoreThan60sAfterSubmit,60*1000);
};


/**
 * (GTS)功能：市价下单提交后的处理结果， MarketBuildRet
 */
GTShandleMarketRequestR = function(para){
	//界面显示逻辑处理
	marketAndOrderObj.isAllowCloseTradeWindow = true;
	showCloseBtn("#marketAndPendingOrderDiv");
	if(marketAndOrderObj.isResponseMarket){
		marketAndOrderObj.isSubmittingMarket = false;
		return;
	}else{
		marketAndOrderObj.isSubmittingMarket = false;
		marketAndOrderObj.isResponseMarket = true;
	}
	//下面是业务逻辑处理
	if (para.code == 0) {//下单成功 code=0表示成交，持仓信息有效，参数跟PosItem相同，code<>0表示失败，不需要读持仓信息，请参考错误码
		// 选中默认手数后,将当前手数的值放到cookie中，便于下次打开市价单窗口时记住上次设定的默认手数
		var $doc = $("#defaultOmVolumeCheckbox");
		SystemCookie.setTradeVol(marketAndOrderObj.prdcode, ($doc.is(":checked")?Util.fixToStrTwodecimal($("#omVolumeInput").val()):null));
		//回显返回结果到页面
		$("#submitedMarketUIDSpan").html(Util.simpleOid(para.oid));  // 单号
		$("#submitedTradePriceSpan").html(para.doneprice);
		// 提交时隐藏市价下单,显示提交成功后的Table
		$("#marketPreSubmittingMsg").hide();
		$("#marketSuccessMsg").show();
		$("#marketSuccessMsg").html(i18n.trade.sumitedSuccess);     // 提交成功
		$("#marketTable").hide();
		$("#marketP").hide();
		$("#submitedSuccessMarketTable").show();
		$("#marketC").show();
		$("#submitedFailMarketTable").hide();
		$("#marketFC").hide();
		$("#uidId").show();
	}else{ //下单失败
		//对应的错误提示信息+错误号:
		$("#marketErrorMessage").html(WebUIError[para.code].replace('XX',marketAndOrderObj.lotlimit));
		
		$("#marketPreSubmittingMsg").hide();
		$("#marketSuccessMsg").hide();
		$("#submitedFailMarketTable").show();
		$("#submitedSuccessMarketTable").hide();
		$("#marketC").hide();
		$("#marketFC").show();
		$("#marketTable").hide();
		$("#marketP").hide();
	}
	clearTimeout(tradeTimeOutObj);
};


/**
 * 功能:市价单提交时校验
 */
_checkMarketSubmit = function(){
	if(_validateVolume("#omVolumeInput")){
		return true;
	}
	return false;
};

/**
 * 功能：市价验证投资额度是否够用
 *  1)如果额度大于账户当前可用额度,直接给出可用额度不足。错误号1033
 *  2)如果额度小于可用额度
 *     当额度+手续费 > 可用额度   
 *        1、可用额度- 手续费 < 最小投资额度  提示信息：直接给出可用额度不足。错误号1033 
 *        2、可用额度- 手续费 > 最小投资额度  提示信息： 您当前的可用额度不足以支付手续费，是否将投资额度调整为({0}),以尝试继续交易?
 */
_validateMarketInvestmentIsEnough = function(investmentQuotaId){
	var investmentQuota = parseFloat($(investmentQuotaId).spinner("value"));
	var investmentQuotaMin = parseFloat(marketAndOrderObj.investmentQuotaMin);
	var balance = parseFloat($("#balance").html());  // 获取可用额度
	var serviceChargeS = parseFloat($("#serviceChargeS").html());   // 注意：这里的手续费是负数
	if(-serviceChargeS > balance){  // 手续费 > 可用额度 
		Alert(WebUIError[10235]);
		return false;
	}
	if(marketAndOrderObj.isInvestment){  // 如果有投资组合
		var curInvestmentQuota  = parseFloat(marketAndOrderObj.positionOrder.amount);
		var changeInvestmentQuota = investmentQuota -curInvestmentQuota;
		if(changeInvestmentQuota > balance){
			Alert(WebUIError[10235]);
			return false;
		}
		if(changeInvestmentQuota - serviceChargeS > balance){
			Confirm({
				content : i18n.trade.investmentValidIsEnough.format(Util.fixToStr(curInvestmentQuota+(balance+serviceChargeS))),
				okValue : i18n.ok,//確定
				ok : function() {
					$(investmentQuotaId).val(Util.fixToStr(curInvestmentQuota+(balance+serviceChargeS)));
					doSubmitMarket();
					return true;
				},
				cancelValue : i18n.cancel,
				cancel : false
			});
		}else{
			return true;
		}
	}else{  // 如果没有投资组合
		if(investmentQuota > balance){   // 投资额度 > 可用额度
			Alert(WebUIError[10235]);
			return false;
		}
		if(investmentQuota - serviceChargeS > balance){
			if(balance+serviceChargeS < investmentQuotaMin){
				Alert(WebUIError[10235]);
				return false;
			}else{
				Confirm({
					content : i18n.trade.investmentValidIsEnough.format(Util.fixToStr(balance+serviceChargeS)),
					okValue : i18n.ok,//確定
					ok : function() {
						$(investmentQuotaId).val(Util.fixToStr(balance+serviceChargeS));
						doSubmitMarket();
						return true;
					},
					cancelValue : i18n.cancel,
					cancel : false
				});
			}
		}else{
			return true;
		}
	}
};

/**
 * 功能：验证成交范围的合法性
 */
_validateTransRange = function(){
	var offerPriceDights = marketAndOrderObj.officePriceDights;
	var pipsDights       = marketAndOrderObj.pipsDigits;
	var transactionRange = $("#transactionRange").spinner("value");
	var maxTransactionRange = _getTransactionRangeFromServer(marketAndOrderObj.maxTransactionRange
            ,marketAndOrderObj.officePriceDights,marketAndOrderObj.pipsDigits);
	if(transactionRange == null || isNaN(transactionRange) || transactionRange < 0 || transactionRange > maxTransactionRange){
		Alert(WebUIError[10105].format(0,Util.fixToStr(maxTransactionRange,(offerPriceDights-pipsDights)))); 
		return false;
	}
	return true;
};

/**
 * 功能： 计算成交范围
 */
initTransactionRange = function(){
	var defaultTransactionRangeFromServer = marketAndOrderObj.defaultTransactionRange;  // 获取默认的成交范围
	var maxTransactionRangeFromServer = marketAndOrderObj.maxTransactionRange;          // 获取最大的成交范围
	$("#transactionRange").spinner({
		numberFormat : "n",
		step:0.01,
		min : 0,
		max : maxTransactionRangeFromServer
	});
	$("#transactionRange").val(parseFloat(defaultTransactionRangeFromServer));
	$("#transactionRangeSpan").html("0-"+parseFloat(maxTransactionRangeFromServer));
};

/**
 * 功能： refresh计算成交范围
 */
refreshTransactionRange = function(rangeName, rangeSpanName){
	var defaultTransactionRangeFromServer = marketAndOrderObj.defaultTransactionRange;  // 获取默认的成交范围
	var maxTransactionRangeFromServer = marketAndOrderObj.maxTransactionRange;          // 获取最大的成交范围
	$("#"+rangeName).spinner({
		numberFormat : "n",
		//step : marketAndOrderObj.transactionRangeStep,
		min : 0,
		max : maxTransactionRangeFromServer
	});
	$("#"+rangeName).val(parseFloat(defaultTransactionRangeFromServer));
	$("#"+rangeSpanName).html("0-"+parseFloat(maxTransactionRangeFromServer));
};

/**
 * 功能：计算从服务端获取的成交范围
 *@author Gavin.guo
 *@date   2013-11-22下午17:48:00
 *@param  source        服务端获的成交范围              
 *@param  offerPriceDights 报价小数位
 *@param  pipsDights Pips小数位
 */
_getTransactionRangeFromServer = function(source,offerPriceDights,pipsDights){
	return source*(Math.pow(10,pipsDights-offerPriceDights));
};

/**
 * 功能：计算提交到服务端的成交范围
 *@author Gavin.guo
 *@date   2013-11-22下午17:51:00
 *@param  source        UI端的成交范围              
 *@param  offerPriceDights 报价小数位
 *@param  pipsDights Pips小数位
 */
_getSubmitToServerTransactionRange = function(source,offerPriceDights,pipsDights){
	return source*(Math.pow(10,offerPriceDights-pipsDights));
};

/**
 * 功能：点击市价调整投资额度CheckBox框时调用
 *@author Gavin.guo
 *@date   2013-11-22下午17:10:00
 */
_onAdjustInvestmentQuota = function(){
	var $cr = $("#adjustInvestmentQuota");
    if ($cr.is(":checked")) {
    	$("#investmentQuota").spinner("enable");
    	$("#investmentQuotaSpan").show();
    }else{
    	$("#investmentQuota").spinner("disable");
    	$("#investmentQuotaSpan").hide();
    };
};

/**
 * 功能：市价下单，输入手数时调用
 */
_changeMarketVolumeInput = function(){
	Util.allowNumKeyUp(document.getElementById("omVolumeInput"));
	calculateOMMargin($("#omVolumeInput").val());
};


/**
 * 计算现金下单保证金
 */
calculateOMMargin = function(lot) {
	// 计算保证金
	var tmpOMMargin = lot * getUserMargin(marketAndOrderObj.prdcode);
	$("#omMargin").html(Util.fixToStrTwodecimal(tmpOMMargin));
};
