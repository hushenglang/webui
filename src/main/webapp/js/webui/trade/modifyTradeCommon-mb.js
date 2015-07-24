/**
 * 开仓修改公共函数
 */

$(function() {
	// 默认不显示交易窗口
	$("#dialog:ui-dialog").dialog("destroy");
	// 弹出市价下单/委托下单对话框
	$("#modify_marketAndPendingOrderDiv").dialog({
		closeOnEscape: false,
		resizable: false,
		autoOpen: false,
		position:["center","top+3%"],
		minWidth: 315,
		width:315,
		closable:true,
		modal: true
	});	
});
/**
 * 功能:打开修改市委托下单窗口
 */
openModifyTradeWindowDiv = function(pendingOrderObj, advPendingOrderObj,symbolObj){
	//clear 
	pendingOrderObjModify.clear();
	advPendingOrderObjModify.clear();
	// 初始化相关变量
	marketAndOrderObj.isSubmittingMarket = false;
	marketAndOrderObj.isResponseMarket = false;
	marketAndOrderObj.isSubmittingorder = false;
	marketAndOrderObj.isResponseorder = false;
	marketAndOrderObj.isAllowCloseTradeWindow = true;
	showCloseBtn("#modify_marketAndPendingOrderDiv");
	
	pendingOrderObjModify.setModifyPendingOrderData(pendingOrderObj);
	pendingOrderObjModify.prdcode=symbolObj.prdcode;//设置-prdcode
	
	if (typeof(advPendingOrderObj) != "undefined"){//若是进阶单,保存此对象
		advPendingOrderObjModify.setModifyAdvancePendingOrderData(advPendingOrderObj);
	}
	// 初始化window标题
	var title = symbolObj.prdname;
	title += '--'+ Util.simpleOid(pendingOrderObj.oid);
	$("#modify-trade-prd-name").html(title);
	
	//如果未普通委托单, 或者是进阶委托但开仓已经执行,平仓变为有效时, 作为普通委托单进行修改
	if (typeof(advPendingOrderObj) == "undefined"||advPendingOrderObj[1].validflag==2){//普通委托单初始化
		// 初始化委托单
		initModifyPendingOrderDiv(pendingOrderObj, symbolObj);
		//普通委托单窗口初始化
		changeToModifyPendingDiv();
	}else{//进阶委托单初始化
		
		initModifyAdvancePendingOrderDiv(advPendingOrderObj,symbolObj);
		//进阶委托单窗口初始化
		changeToModifyAdvPendingDiv();
	}
	// 弹出市价下单/委托下单对话框
	FocusManage.dialogFocus("#modify_marketAndPendingOrderDiv", "#modify_pendingOrderTable");
	hideCloseBtn("#modify_marketAndPendingOrderDiv");
};

/**
 * 功能:打开修改委托单页面的窗口
 */
changeToModifyPendingDiv = function(){
	$("#modify_pendingOrderLi").addClass("on-na");
	$("#modify_pendingOrderTable").show();
	$("#modify_submitedSuccessPendingOrderTable").hide();
	$("#modify_submitedSuccessAdvancePendingOrderTable").hide();
	$("#modify_submitedFailedAdvancePendingOrderTable").hide();
	$("#modify_pendingOrderC").hide();
    $("#modify_submitedFailedPendingOrderTable").hide();
    $("#modify_pendingOrderFC").hide();
    $("#modify_advance_pendingOrderC").hide();
    $("#modify_advance_pendingOrderFC").hide();
    $("#modify_advamcePendingOrderP").hide();
    $("#modify_pendingOrderP").show();
    
    $("#pendingOrderTable tr[name='unadvance']").show();
	$("#pendingOrderTable tr[name='advance']").hide();
};

/**
 * 功能:打开修改进阶委托单页面的窗口
 */
changeToModifyAdvPendingDiv = function(){
	$("#modify_pendingOrderLi").addClass("on-na");
	$("#modify_pendingOrderTable").show();
	$("#modify_submitedSuccessPendingOrderTable").hide();
	$("#modify_submitedSuccessAdvancePendingOrderTable").hide();
	$("#modify_submitedFailedAdvancePendingOrderTable").hide();
	$("#modify_pendingOrderC").hide();
    $("#modify_submitedFailedPendingOrderTable").hide();
    $("#modify_pendingOrderFC").hide();
    $("#modify_advance_pendingOrderC").hide();
    $("#modify_advance_pendingOrderFC").hide();
    $("#modify_advamcePendingOrderP").hide();
    $("#modify_pendingOrderP").show();
    
    $("#pendingOrderTable tr[name='unadvance']").hide();
	$("#pendingOrderTable tr[name='advance']").show();
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
