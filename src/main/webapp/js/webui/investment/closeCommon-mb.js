/**
 * 	平仓功能
 */
var CloseCommon = {
	isAllowCloseTradeWindow : false, // 是否允许关闭交易窗口	
	isSubmittingMarket : false,      // 市价单是否提交中
	isResponseMarket : false,        // 市价单提交后，服务器是否响应
	isSubmittingorder : false,       // 委托单是否提交中
	isResponseorder : false,         // 委托单提交后，服务器是否响应
	    
	_$closePostWindowDiv : null,
	
	_create : function() {
		this._$closePostWindowDiv = $("#c_marketAndPendingOrderDiv");
	},
	
	post:null,
	
	/**
	 * 平仓post
	 */
	closePost : function(postition) {
		this.post = postition;
		this.post.prdcode = getPrdCodeByPrdId(this.post.prdid);
		
		if(isHoliday||isWeekend){//需求规定周末或者假期开始后,提示‘非交易时段，操作无效（10113）
			alert(WebUIError["10113"]);
			return false;
		}
		/*if(accountBaseInfo.userstatus==4){//用户S状态，用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			alert(WebUIError["10120"]);
			return false;
		}*/
		if(!isSymbolTradeOpen(this.post.prdid)){//用户点击LLG，LLS的价格，直接提示“请联络客服服务专员.错误号10120”并返回
			alert(WebUIError["10113"]);
			return false;
		}
		try{
			var buysell = (this.post.tradedir == 1 ?  0: 1);
			this.post.buysell = buysell;
			this.openClosePostWindowDiv(this.post);
		} catch (e) {
			alert('line 24, error:' +e);
		}
	},
	/**
	 * 功能:打开平仓窗口
	 * p: 当前仓位信息
	 */
	openClosePostWindowDiv : function(p){
		// 允许切换市价、委托平仓Tab、显示右上角关闭按钮
		this.enableTradeLi();
		
		// 默认切换到市价平仓窗口
		this.changeToMarketDiv();
		
		// 初始化window标题
		var title = (p.prdid == 0)? i18n.llg:i18n.lls;
		title += '--'+ Util.simpleOid(p.oid);
		//this._$closePostWindowDiv.dialog('option', 'title',title);
		$("#c-trade-prd-name").html(title);
		// 初始化市价单
		MarketClose.initMarketDiv(p);
		// 初始化委托单
		PeningClose.initPendingOrderDiv(p);
		
		// 弹出市价平仓/委托平仓对话框
		//this._$closePostWindowDiv.dialog("open");
		// 弹出市价下单/委托下单对话框
		$("#c_marketAndPendingOrderDiv").dialog({
			closeOnEscape: false,
			resizable: false,
			autoOpen: false,
			position:["center","top+3%"],
			minWidth: 315,
			width:315,
			modal: true
		});
		FocusManage.dialogFocus("#c_marketAndPendingOrderDiv", "#c_marketTable");
		this.hideCloseBtn("#c_marketAndPendingOrderDiv");
	},
	
	//取得当前平仓价
	getClosePrice : function() {
		var tradePrice = '---';

		if(this.post) {
			var buysell = this.post.buysell;
			var prdcode = this.post.prdcode;
			
			if(buysell == 0) {	//buy
				if(prdcode == '022') {
					tradePrice = Tick.gold.bid;
				}
				if(prdcode == '023') {
					tradePrice = Tick.silver.bid;
				}
			}
			else if(buysell == 1) { //sell
				if(prdcode == '022') {
					tradePrice = Tick.gold.ask;
				}
				if(prdcode == '023') {
					tradePrice = Tick.silver.ask;
				}
			}
		}
		return tradePrice;
	},
	
	/**
	 * 功能：验证手数合法性
	 * 手数是否符合要求
	 * 可成交范围是否在规定范围内
	 */
	validateVolume : function(post){
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
		
		if(obj) {
			minVolume = obj.minlot;
			maxVolume = obj.maxlot;
			
			var omVolumeInput = $("#c_orderVolumeInput").val();
			if(this.post.closeType == 'market') {
				omVolumeInput = $("#c_omVolumeInput").val();
			} 
			//var volumeStep = Util.accMul(obj.unitlot,100);
			if((parseFloat(post.lot)!=parseFloat(omVolumeInput))&&(omVolumeInput == null || isNaN(omVolumeInput) || omVolumeInput=='' || omVolumeInput=='0' || Util.getDecimalLen(omVolumeInput) > 2
				)){
				Alert(WebUIError[10104]);  // 請輸入有效手數。錯誤號10104!
				return false;
			} else {
				var mm = Math.mod(omVolumeInput, 0.05);
				//alert("omVolumeInput:" + omVolumeInput + ", result:" + mm);				
				if(mm != 0) {
					Alert(WebUIError[10104]);  // 請輸入有效手數。錯誤號10207!
					return false;
				}
				
				if(Number(omVolumeInput) > Number(post.lot)) {
					Alert(WebUIError[10117]);  // 請輸入有效手數。錯誤號10207!
					return false;
				} 
			}
		}
		
		return true;
	},
	
	/**
	 * 功能：打开交易窗口,切换到市价平仓Tab
	 */
	changeToMarketDiv : function(){
		$("#c_marketLi").addClass("on-na");
		$("#c_pendingOrderLi").removeClass("on-na");
		
		$("#c_marketTable").show();
		$("#c_marketP").show();
		
		$("#c_marketSuccessMsg").hide();
		$("#c_pendingOrderTable").hide();
		$("#c_pendingOrderP").hide();
		$("#c_submitedSuccessMarketTable").hide();
		$("#c_marketC").hide();
		$("#c_submitedSuccessPendingOrderTable").hide();
		$("#c_pendingOrderC").hide();
	    $("#c_submitedFailMarketTable").hide();
	    $("#c_marketFC").hide();
	    $("#c_submitedFailedPendingOrderTable").hide();
	    $("#c_pendingOrderFC").hide();
	    CloseCommon.post.closeType = 'market';
	},
	
	/**
	 * 功能：打开交易窗口,切换到委托平仓Tab
	 */
	changeToPendingOrderDiv : function(){
		$("#c_pendingOrderLi").addClass("on-na");
		$("#c_marketLi").removeClass("on-na");
		
		$("#c_pendingOrderTable").show();
		$("#c_pendingOrderP").show();
		
		$("#c_marketTable").hide();
		$("#c_marketP").hide();
		$("#c_submitedSuccessMarketTable").hide();
		$("#c_marketC").hide();
		$("#c_submitedSuccessPendingOrderTable").hide();
		$("#c_pendingOrderC").hide();
		$("#c_submitedFailMarketTable").hide();
	    $("#c_marketFC").hide();
	    $("#c_submitedFailedPendingOrderTable").hide();
	    $("#c_pendingOrderFC").hide();
	    CloseCommon.post.closeType = 'pending';
	},
	
	/**
	 * 功能：关闭窗口(同时释放amsSymbolConfigInfo、marketAndOrderObj对象)
	 * @param windowDivId 窗口Id
	 */
	closeWindowDiv : function(obj) {
		this._$closePostWindowDiv.dialog("close");
		if(obj!=undefined&&($(obj).parent("#c_marketC").length>0)){
			 $("#investment-entrust-fl li").get(1).click();
		 }
		 if(obj!=undefined&&($(obj).parent("#c_pendingOrderC").length>0)){
			 $("#investment-entrust-fl li").get(2).click();
		 }
	},
	
	/**
	 * 功能：禁用市价平仓、委托平仓Tab
	 */
	disableTradeLi : function(){
		$("#c_marketLi").off();
		$("#c_pendingOrderLi").off();
		$("#c_marketLi").css("color","#c_ccc");
		$("#c_pendingOrderLi").css("color","#c_ccc");
	},
	
	/**
	 * 功能：启用市价平仓、委托平仓Tab
	 */
	enableTradeLi : function(){		
		$("#c_marketLi").on('click', this.changeToMarketDiv);
		$("#c_pendingOrderLi").on('click', this.changeToPendingOrderDiv);
		$("#c_marketLi").css("color","");
		$("#c_pendingOrderLi").css("color","");
	},
	
	/**
	 * 功能：隐藏dialog的右上角关闭按钮
	 */
	hideCloseBtn : function(){
		$(".ui-dialog-titlebar-close", CloseCommon._$closePostWindowDiv.parent()).hide();
	},
	
	/**
	 * 功能：显示dialog的右上角关闭按钮
	 */
	showCloseBtn : function(){
		//$(".ui-dialog-titlebar-close", CloseCommon._$closePostWindowDiv.parent()).show();
	},
	
	/**
	 *功能：提交定单后，检查响应时间是否超过60s
	 */
	checkIsMoreThan60sAfterSubmit : function(){
		if(CloseCommon.isSubmittingorder && !CloseCommon.isResponseorder){
			//对应的错误提示信息+错误号
			CloseCommon.showCloseBtn();
			CloseCommon.isSubmittingorder = false;
			CloseCommon.isResponseorder = true;
			CloseCommon.isAllowCloseTradeWindow = true;
			$("#c_pendingOrderErrorMessage").html(WebUIError[10116]);
			$("#c_submitedFailedPendingOrderTable").show();
			$("#c_pendOrderPreSubmittingMsg").hide();
			$("#c_pendOrderSuccessMsg").hide();
			$("#c_pendingOrderFC").show();
			$("#c_submitedSuccessPendingOrderTable").hide();
			$("#c_pendingOrderC").hide();
			$("#c_pendingOrderTable").hide();
			$("#c_pendingOrderP").hide();
		}else if(CloseCommon.isSubmittingMarket && !CloseCommon.isResponseMarket){
			//对应的错误提示信息+错误号
			CloseCommon.showCloseBtn();
			CloseCommon.isSubmittingMarket = false;
			CloseCommon.isResponseMarket = true;
			CloseCommon.isAllowCloseTradeWindow = true;
			$("#c_marketErrorMessage").html(WebUIError[10116]);
			$("#c_marketPreSubmittingMsg").hide();
			$("#c_marketSuccessMsg").hide();
			$("#c_submitedFailMarketTable").show();
			$("#c_submitedSuccessMarketTable").hide();
			$("#c_marketC").hide();
			$("#c_marketFC").show();
			$("#c_marketTable").hide();
			$("#c_marketP").hide();
		}
	}
};

$(function() {
	// 默认不显示交易窗口
	CloseCommon._create();
});
