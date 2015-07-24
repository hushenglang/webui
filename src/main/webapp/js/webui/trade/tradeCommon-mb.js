/**
 * 	开仓交易公共函数
 * 
 */
$(function() {
	// 默认不显示交易窗口
	$("#dialog:ui-dialog").dialog("destroy");
	// 弹出市价下单/委托下单对话框
	$("#marketAndPendingOrderDiv").dialog({
		closeOnEscape: false,
		resizable: false,
		autoOpen: false,
		position:["center","top+3%"],
		minWidth: 315,
		width:315,
		closable:true,
		modal: true
	});	
	//进阶委托5个文本框进行处理，离开时间replace不是数字和.的其他字符
	$("#advance_close_limitPrice,#advance_open_orderVolumeInput,#advance_open_limitPrice,#advance_open_stopPrice,#advance_close_stopPrice").blur(function(){
		var temp=$(this).val();
		$(this).val(temp.replace(/[^\d.]/g,''));
	});
});
/**
 * 功能:打开市价下单或委托下单窗口
 */
openTradeWindowDiv = function(obj){
	// 允许切换市价、委托下单Tab、显示右上角关闭按钮
	enableTradeLi();
	
	// 初始化相关变量
	marketAndOrderObj.isSubmittingMarket = false;
	marketAndOrderObj.isResponseMarket = false;
	marketAndOrderObj.isSubmittingorder = false;
	marketAndOrderObj.isResponseorder = false;
	marketAndOrderObj.isAllowCloseTradeWindow = true;
	showCloseBtn("#marketAndPendingOrderDiv");
	
	// 初始化市价单、委托单的相关值
	marketAndOrderObj.setMarketAndPendingOrderData(obj);
	
	// 初始化window标题
	$("#trade-prd-name").html(marketAndOrderObj.produceName);
	
	// 初始化市价单
	initMarketDiv(obj);
	
	// 初始化委托单
	initPendingOrderDiv(obj);
	
	// 默认切换到市价下单窗口
	changeToMarketDiv();
	FocusManage.dialogFocus("#marketAndPendingOrderDiv", "#marketTable");
	hideCloseBtn("#marketAndPendingOrderDiv");
	hideVolList();
};

/**
 * 不显示手数列表
 */
hideVolList=function(){
	$("ul[id$=VolumeSel]").hide();
};
/**
 * 功能：打开交易窗口,切换到市价下单Tab
 */
changeToMarketDiv = function(){
	hideVolList();
	$("#marketLi").addClass("on-na");
	$("#pendingOrderLi").removeClass("on-na");
	$("#pendingOrderLi").html(i18n.tradeCommon_title);
	$("#marketTable").show();
	$("#marketP").show();
	
	$("#pendingOrderTable").hide();
	$("#pendingOrderP").hide();
	$("#submitedSuccessMarketTable").hide();
	$("#marketC").hide();
	$("#submitedSuccessPendingOrderTable").hide();
	
	$("#submitedSuccessAdvancePendingOrderTable").hide();
	$("#submitedFailedAdvancePendingOrderTable").hide();
	
	$("#pendingOrderC").hide();
	$("#advance_pendingOrderC").hide();
	
    $("#submitedFailMarketTable").hide();
    $("#marketFC").hide();
    $("#submitedFailedPendingOrderTable").hide();
    $("#pendingOrderFC").hide();
    $("#advance_pendingOrderFC").hide();
    $("#advamcePendingOrderP").hide();
    
};

/**
 * 功能：打开交易窗口,切换到委托下单Tab
 */
changeToPendingOrderDiv = function(){
	hideVolList();
	$("#pendingOrderLi").addClass("on-na");
	$("#pendingOrderLi").html(i18n.tradeCommon_title);
	$("#marketLi").removeClass("on-na");
	$("#pendingOrderTable").show();
	$("#pendingOrderP").show();
	$("#marketTable").hide();
	$("#marketP").hide();
	$("#submitedSuccessMarketTable").hide();
	$("#marketC").hide();
	$("#submitedSuccessPendingOrderTable").hide();
	$("#submitedSuccessAdvancePendingOrderTable").hide();
	$("#submitedFailedAdvancePendingOrderTable").hide();
	$("#pendingOrderC").hide();
	$("#submitedFailMarketTable").hide();
    $("#marketFC").hide();
    $("#submitedFailedPendingOrderTable").hide();
    $("#pendingOrderFC").hide();
    
    var busiType = getPendingOrderTypeValue();
    if(busiType == OrderType.BUY_advance || busiType == OrderType.SELL_advance){//进阶委托
    	 $("#pendingOrderP").hide();
    	 $("#advamcePendingOrderP").show();
    }else{
    	 $("#pendingOrderP").show();
    	 $("#advamcePendingOrderP").hide();
    }
    
};

/**
 * 功能：刷新弹出框中的内容
 */
refreshTrade = function() {
	if(marketAndOrderObj && marketAndOrderObj.symbol != null) {
		var targetObj = getSymbol4Code(marketAndOrderObj.symbol);
		refreshMarketDiv(targetObj);
		refreshPendingOrderDiv(targetObj);
	}
};

/**
 * 功能：清理下单的公共对象，释放内存。
 */
clearTradeData = function() {
	amsSymbolConfigInfo	= {};
	marketAndOrderObj.clear();
	QuotationGTS.currentSymbolKey='';
};

/**
 * 功能：关闭窗口(同时释放amsSymbolConfigInfo、marketAndOrderObj对象)
 * @param windowDivId 窗口Id
 */
closeWindowDiv = function(windowDivId) {
	if(marketAndOrderObj.isAllowCloseTradeWindow){
		$(windowDivId).dialog("close");
		clearTradeData();
	}
};

/**
 * 功能：设置手数列表
 * @param  volumeSelectedId   手数下拉选择框Id
 * @param  volumeInputId      与手数下拉选择框对应的input框Id
 * @param  volumeRangeId      手数范围Id
 * @param  volumeSelSpan      手数select的spanId
 */
_setVolumeList = function(volumeSelectedId,volumeInputId,volumeRangeId,volumeSelSpan){
	var volumeOption = "";
 	if(marketAndOrderObj.volumeListSize == 0){ //手数列表为0,默认显示最小手数
 		$(volumeSelSpan).hide();
 		$(volumeSelSpan).next("span").addClass("shous-lay-con2-nd");
 		$(volumeInputId).addClass("sel-shous-inp-nd");
		$(volumeInputId).val(Util.fixToStr(marketAndOrderObj.minimalVolume));
		marketAndOrderObj.defaultVolume = Util.fixToStr(marketAndOrderObj.minimalVolume);
	}
	else{
		$(volumeSelSpan).show();
		$(volumeSelSpan).next("span").removeClass("shous-lay-con2-nd");
 		$(volumeInputId).removeClass("sel-shous-inp-nd");
		var  flag = false;
		var tempArray = marketAndOrderObj.volumeLotinfo;
		for ( var i = 0; i < marketAndOrderObj.volumeListSize; i++) {
			if(tempArray[i] == marketAndOrderObj.minimalVolume){
				//volumeOption += "<option value='" + tempArray[i] + "' selected = 'true'>"+ Util.fixToStr(tempArray[i]) + "</option>";
				volumeOption += "<li tv='" + tempArray[i] + "' class='sxc-lihov'>"+ Util.fixToStr(tempArray[i]) + "</li>";
				$(volumeInputId).val(Util.fixToStr(tempArray[i]));
				marketAndOrderObj.defaultVolume = Util.fixToStr(tempArray[i]);
				flag = true;
			}else{
				volumeOption += "<li tv='" + tempArray[i] + "'>"
				+ Util.fixToStr(tempArray[i]) + "</li>";
			}
		}
		if(!flag){
			$(volumeInputId).val(Util.fixToStr(marketAndOrderObj.minimalVolume));
		}
	}
	$(volumeSelectedId).children().remove();
	$(volumeSelectedId).append(volumeOption);
	$(volumeRangeId).html(Util.fixToStr(marketAndOrderObj.minimalVolume)+"-"+Util.fixToStr(marketAndOrderObj.maximalVolume));
	$("li",volumeSelectedId).on('click',function(){
		$(this).parent("ul").hide();
		$(volumeInputId).val($(this).attr("tv"));
		//修改手数来修改其的保证金
		if(volumeSelectedId=="#omVolumeSel"){
			calculateOMMargin($(this).attr("tv"));
		}
		else if(volumeSelectedId=="#orderVolumeSel"){
			calculatePendingMargin($(this).attr("tv"), "pendingMargin");
		}else if(volumeSelectedId=="#advance_open_orderVolumeSel"){
			calculateAdvancePendingMargin($(this).attr("tv"));
		}
	});
	
};

/**
 * 功能：验证手数合法性
 */
_validateVolume = function(omVolumeInputId){
	var minVolume = marketAndOrderObj.minimalVolume;
    var maxVolume = marketAndOrderObj.maximalVolume;
    var omVolumeInput = $(omVolumeInputId).val();
    var volumeStep = Util.accMul(marketAndOrderObj.volumeStep,100);
     //最小数手不做判断
    if(omVolumeInput == minVolume){
    	return true;
    }
    
    if(omVolumeInput == null || isNaN(omVolumeInput) || Util.getDecimalLen(omVolumeInput) > 2){
    	Alert(i18n.trade.volumeValid.format(marketAndOrderObj.volumeStep));  // 請輸入有效手數。錯誤號10207!
		return false;
	}
    
    if(omVolumeInput < minVolume || omVolumeInput > maxVolume){
	Alert(i18n.trade['10119'].format(minVolume,maxVolume));  // 請輸入有效手數。錯誤號10207!
	return false;
	}
    
	if(omVolumeInput != marketAndOrderObj.defaultVolume){// 如果不是默认手数
		if(Util.accMul(omVolumeInput,100) % volumeStep != 0){
			Alert(i18n.trade.volumeValid.format(marketAndOrderObj.volumeStep)); // 請輸入有效手數。錯誤號10207!
			return false;
		}
	}
	return true;
};

/**
 * 功能：计算投资额度的步长
 */
calculateInvestmentQuotaStep = function(){
	var investmentQuotaMin = marketAndOrderObj.investmentQuotaMin;
	var investmentQuotaMax = marketAndOrderObj.investmentQuotaMax;
	var step1 = Util.roundUp((investmentQuotaMax-investmentQuotaMin)/100,0);
	var step2 = Util.roundUp(step1,-Util.getIntLen(step1));
	return step2;
};

/**
 * 功能：计算投资额度
 */
calculateInvestmentQuota = function(obj,inputInvestmentQuotaId,adjustInvestmentQuotaId,investmentQuotaRangeTextId,investmentQuotaSpan){
    var inputSpinner = $(inputInvestmentQuotaId).spinner({
		numberFormat : "n",
		step : marketAndOrderObj.investmentQuotaStep,
		min : 0.00,
		mix : 99999.00
	});
    var investmentQuotaMin = parseFloat(marketAndOrderObj.investmentQuotaMin).toFixed(2);
	var investmentQuotaMax = parseFloat(marketAndOrderObj.investmentQuotaMax).toFixed(2);
	if(marketAndOrderObj.isInvestment){ // 判断是否有投资组合(即该帐号是否有持仓或委托单)
		var curPositionOrderAmout = parseFloat(marketAndOrderObj.positionOrder.amount).toFixed(2); // 获取当前投资额度
		if(parseFloat(curPositionOrderAmout) < parseFloat(investmentQuotaMin)){
			inputSpinner.spinner("disable");
			$(adjustInvestmentQuotaId).show();
			$(adjustInvestmentQuotaId).attr("checked",false);
			$(investmentQuotaSpan).hide();
			$(inputInvestmentQuotaId).val(curPositionOrderAmout);
			$(investmentQuotaRangeTextId).html(investmentQuotaMin + "-" + investmentQuotaMax);
		}
		/**
         * 当出现当前投资额度大于投资额度上限的情况：则有以下规则:
         * 1)可以直接下Out单、In单、Out-in单，但不可以调整当前投资额度(调大、调小都不可以)
         */
		else if(parseFloat(curPositionOrderAmout) > parseFloat(investmentQuotaMax)){
			inputSpinner.spinner("disable");
			$(adjustInvestmentQuotaId).hide();
			$(investmentQuotaSpan).hide();
			$(inputInvestmentQuotaId).val(curPositionOrderAmout);
			$(investmentQuotaRangeTextId).html(investmentQuotaMin + "-" + investmentQuotaMax);
		}else{
			//默认值为投资组合当前投资额度
			$(inputInvestmentQuotaId).val(curPositionOrderAmout);
			marketAndOrderObj.investmentQuotaMin= curPositionOrderAmout;
			
			// 在没有勾选复选框时灰化投资额度输入框,勾选后,亮开投资额度输入框
			inputSpinner.spinner("disable");
			$(adjustInvestmentQuotaId).show();
			$(investmentQuotaSpan).hide();
			$(adjustInvestmentQuotaId).attr("checked",false);
			$(investmentQuotaRangeTextId).html(curPositionOrderAmout+ "-" + investmentQuotaMax);
		}
	}else{
		//默认值为投资额度下限
		$(inputInvestmentQuotaId).val(investmentQuotaMin);
		inputSpinner.spinner("enable");
		$(adjustInvestmentQuotaId).hide();
		$(investmentQuotaSpan).hide();
		$(investmentQuotaRangeTextId).html(investmentQuotaMin + "-" + investmentQuotaMax);
	}
	return inputSpinner;
};

/**
 * 功能：刷新投资额度时
 */
refreshInvestmentQuota = function(inputInvestmentQuotaId,adjustInvestmentQuotaId,investmentQuotaSpan,investmentQuotaRange){
	if(marketAndOrderObj.isInvestment){  // 判断是否持仓
		var curPositionOrderAmout = parseFloat(marketAndOrderObj.positionOrder.amount).toFixed(2); // 获取当前投资额度
		if(parseFloat(curPositionOrderAmout) < parseFloat(marketAndOrderObj.investmentQuotaMin)){
			$(adjustInvestmentQuotaId).show();
			$(inputInvestmentQuotaId).spinner("disable");
		    if($(adjustInvestmentQuotaId).is(":checked")){
		    	 $(inputInvestmentQuotaId).spinner("enable");
		    }else{
		    	 $(inputInvestmentQuotaId).spinner("disable");
		    }
			$(investmentQuotaRange).html(marketAndOrderObj.investmentQuotaMin + "-" + marketAndOrderObj.investmentQuotaMax);
		}else if(parseFloat(curPositionOrderAmout) > parseFloat(marketAndOrderObj.investmentQuotaMax)){
			$(inputInvestmentQuotaId).spinner("disable");
			$(adjustInvestmentQuotaId).hide();
			$(investmentQuotaSpan).hide();
			$(investmentQuotaRange).html(marketAndOrderObj.investmentQuotaMin + "-" + marketAndOrderObj.investmentQuotaMax);
		}
		else{
			if(parseFloat(curPositionOrderAmout) != parseFloat($(investmentQuotaRange).html().split("-")[0])){
				$(inputInvestmentQuotaId).val(curPositionOrderAmout);
			}
			$(investmentQuotaRange).html(curPositionOrderAmout + "-" + marketAndOrderObj.investmentQuotaMax);
			$(adjustInvestmentQuotaId).show();
		}
	}else{
		if(parseFloat(marketAndOrderObj.investmentQuotaMin) != parseFloat($(investmentQuotaRange).html().split("-")[0])){
			$(inputInvestmentQuotaId).val(marketAndOrderObj.investmentQuotaMin);
		}
		$(investmentQuotaRange).html(marketAndOrderObj.investmentQuotaMin + "-" + marketAndOrderObj.investmentQuotaMax);
	}
};

/**
 * 功能：禁用市价下单、委托下单Tab
 */
disableTradeLi = function(){
	$("#marketLi").off();
	$("#pendingOrderLi").off();
	$("#marketLi").css("color","#ccc");
	$("#pendingOrderLi").css("color","#ccc");
};

/**
 * 功能：启用市价下单、委托下单Tab
 */
enableTradeLi = function(){
	$("#marketLi").on('click', changeToMarketDiv);
	$("#pendingOrderLi").on('click', changeToPendingOrderDiv);
	$("#marketLi").css("color","");
	$("#pendingOrderLi").css("color","");
};

/**
 * 功能：隐藏dialog的右上角关闭按钮
 */
hideCloseBtn = function(windowDivId){
	$(".ui-dialog-titlebar-close", $(windowDivId).parent()).hide();
};

/**
 * 功能：显示dialog的右上角关闭按钮
 */
showCloseBtn = function(windowDivId){
	//$(".ui-dialog-titlebar-close", $(windowDivId).parent()).show();
};

/**
 * 功能：根据spinnerId 生成一个基本的spinner
 * @param spinnerId  spinner的Id
 */
initBaseSpinnerById = function(spinnerId){
	$(spinnerId).spinner({
	      numberFormat : "n"
	});
};

/**
 * 功能：验证投资额度合法性
 */
_validateInvestmentQuota = function(investmentQuotaId,investmentQuotaRangeText,tradeTypeVal,openVolumeId){
	var investmentQuota = $(investmentQuotaId).spinner("value");
	if(investmentQuota == null || isNaN(investmentQuota) || Util.getDecimalLen(investmentQuota) > 2){
		Alert(i18n.trade.investmentValid.format($(investmentQuotaRangeText).html()));  //请输入正确的投资额度({0}-{1})。错误号10234
		return false;
	}
	var investment = parseFloat(investmentQuota);
	var investmentQuotaMin = parseFloat($(investmentQuotaRangeText).html().split("-")[0]);
	var investmentQuotaMax = parseFloat($(investmentQuotaRangeText).html().split("-")[1]);
	if(marketAndOrderObj.isInvestment){  // 判断是否有投资组合
		var curPositionOrderAmout = parseFloat(marketAndOrderObj.positionOrder.amount);
		if(investment != curPositionOrderAmout){  // 如果修改了投资额度,则投资额度必须在范围之间
			if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
				return false;
			}
		}
		if(curPositionOrderAmout < investmentQuotaMin){    // 当前投资额度小于投资额度下限,不可以下IN和OUT/IN单，只可下OUT单
			if(marketAndOrderObj.isPosition){ // 如果有持仓
				var positionTradeType = parseInt(marketAndOrderObj.positionOrder.type); // 获取持仓的类型  "1":买入,"2":卖出
				var handNum = parseFloat(marketAndOrderObj.positionOrder.handNum);      // 获取持仓的手数
				var openVolume = parseFloat($(openVolumeId).val());             		// 开仓手数 
				if((tradeTypeVal == "0" && positionTradeType == 2) || (tradeTypeVal == "1" && positionTradeType == 1)){  // 开仓买入持仓卖出  开仓卖出持仓买入
					if(openVolume <= handNum){ //如果开仓小于等于持仓，则为out单，否则为out-in单
						return true;
					}else{
						if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
							return false;
						}
					}
				}else{   // in单
					if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
						return false;
					}
				}
			}else{  //如果不是持仓，即为委托下单未执行
				if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
					return false;
				}
			}
		}else if(curPositionOrderAmout > investmentQuotaMax){ //当前投资额度大于投资额度上限的情况下，可以直接下OUT\IN、IN、OUT单，但是不可以修改投资额度
			return true;
		}else{
			if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
				return false;
			}
		}
	}else{
		if(!_commonInvestmentQuotaAlert(investment,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText)){
			return false;
		}
	}
	return true;
};

/**
 * 功能：投资额度公共提示信息
 */
_commonInvestmentQuotaAlert = function(investmentQuota,investmentQuotaMin,investmentQuotaMax,investmentQuotaRangeText){
	if(investmentQuota < investmentQuotaMin || parseFloat(investmentQuota) > investmentQuotaMax){
		Alert(i18n.trade.investmentValid.format($(investmentQuotaRangeText).html()));
		return false;
	}
	return true;
};

/**
 *功能：提交定单后，检查响应时间是否超过60s
 */
checkIsMoreThan60sAfterSubmit = function(){
	if(marketAndOrderObj.isSubmittingorder && !marketAndOrderObj.isResponseorder){
		//对应的错误提示信息+错误号
		showCloseBtn("#marketAndPendingOrderDiv");
		marketAndOrderObj.isSubmittingorder = false;
		marketAndOrderObj.isResponseorder = true;
		marketAndOrderObj.isAllowCloseTradeWindow = true;
		$("#pendingOrderErrorMessage").html(WebUIError[10116]);
		$("#submitedFailedPendingOrderTable").show();
		$("#pendOrderPreSubmittingMsg").hide();
		$("#pendOrderSuccessMsg").hide();
		$("#pendingOrderFC").show();
		$("#submitedSuccessPendingOrderTable").hide();
		$("#submitedSuccessAdvancePendingOrderTable").hide();
		$("#submitedFailedAdvancePendingOrderTable").hide();
		$("#pendingOrderC").hide();
		$("#pendingOrderTable").hide();
		$("#pendingOrderP").hide();
	}else if(marketAndOrderObj.isSubmittingMarket && !marketAndOrderObj.isResponseMarket){
		//对应的错误提示信息+错误号
		showCloseBtn("#marketAndPendingOrderDiv");
		marketAndOrderObj.isSubmittingMarket = false;
		marketAndOrderObj.isResponseMarket = true;
		marketAndOrderObj.isAllowCloseTradeWindow = true;
		$("#marketErrorMessage").html(WebUIError[10116]);
		$("#marketPreSubmittingMsg").hide();
		$("#marketSuccessMsg").hide();
		$("#submitedFailMarketTable").show();
		$("#submitedSuccessMarketTable").hide();
		$("#marketC").hide();
		$("#marketFC").show();
		$("#marketTable").hide();
		$("#marketP").hide();
	}
};