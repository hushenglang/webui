/**
 * 
 * Calculate account base info
 * 
 * Depends on Tick-core.js, AccountPositions-core.js, AccountSummary
 * 
 * listeners :
 * after tick
 * after PosItem
 * after MarketBuildRet
 * afterMarketCloseRet
 * on AccBasInfo
 * on balance_change
 * 
 * 餘額 '#balance';
 * 淨值 '#netValue';
 * 佔用資金 '#availDisposableCapital';
 * 可用資金 '#availWithdrawCapital';
 * 總淨盈虧 '#floatPl';
 * 按金水準 '#marginLevel';
 * 強制平倉點% '#cutMargin'; 
 */
var accountBaseInfo = {
		balance : 0,
		netValue : 0,
		availDisposableCapital : 0,
		availWithdrawCapital : 0,
		floatPl : 0,
		marginLevel : 0,
		cutMargin : 0,
		warnratio : 0,
		userstatus : 0,
		goldinimargin : 0,
		silverinimargin : 0,
		lockedcredit : 0,
		comlpatedLoad : false,
		onUpdate : function(orderId){
			// to be replaced
		}
		
};
$(function(){
	
	var balance = 0;
	var netValue = 0;
	var availDisposableCapital = 0;
	var availWithdrawCapital = 0;
	var floatPl = 0;
	var marginLevel = 0;
	var cutMargin = 0;
	var warnratio = 0;
	var accBaseInfo_cutMargin = 0;
	var accBaseInfo_warnratio = 0;
	var userstatus = 0;
	var goldinimargin = 0;
	var silverinimargin = 0;
	var lockedcredit = 0;
	var comlpatedLoad = false;
	
	function exportValues(){
		accountBaseInfo.balance = balance;
		accountBaseInfo.netValue = netValue;
		accountBaseInfo.availDisposableCapital = availDisposableCapital;
		accountBaseInfo.availWithdrawCapital = availWithdrawCapital;
		accountBaseInfo.floatPl = floatPl;
		accountBaseInfo.marginLevel = marginLevel;
		accountBaseInfo.cutMargin = (accBaseInfo_cutMargin != 0) ? accBaseInfo_cutMargin : cutMargin;
		accountBaseInfo.warnratio = (accBaseInfo_warnratio != 0) ? accBaseInfo_warnratio : warnratio;
		accountBaseInfo.userstatus = userstatus;
		accountBaseInfo.goldinimargin = goldinimargin;
		accountBaseInfo.silverinimargin = silverinimargin;
		accountBaseInfo.lockedcredit = lockedcredit;
		accountBaseInfo.comlpatedLoad = comlpatedLoad; 
	}
	
	/**
	 * 計算佔用資金
	 * 不同方向，相同單位保證金，兩者抵消部分 * 0.5 即(buymargin * 0.25 + sellmargin 0.25)
	 */
	function calculateAvailDisposableCapital(){
		if (AccountPositions.orders == undefined || AccountPositions.orders == null) {
			return 0;
		}
		var records = [];
		for(var i = 0; i < AccountPositions.orders.length; i++){
			var order = AccountPositions.orders[i];
			var type = {prdid: order.prdid, marginPerUnit: Util.accDiv(order.margin, order.lot)};
			var record = null;
			for(var j = 0; j < records.length; j++){
				if(Util.isEqual(type, records[j].type)){
					record = records[j];
					break;
				}
			}
			if(record == null){
				record = {"type":type, "buy": 0, "sell":0};
				records.push(record);
			}
			if(order.tradedir == 0){
				record.buy += order.margin;
			}
			if(order.tradedir == 1){
				record.sell += order.margin;
			}
		}
		
		var result = 0;
		for(var i = 0; i < records.length; i++){
			var record = records[i];
			var minMargin = 0;
			var leftMargin = 0;
			if(record.buy < record.sell){
				minMargin = record.buy;	
				leftMargin = record.sell - record.buy;
			}else{
				minMargin = record.sell;
				leftMargin = record.buy - record.sell;
			}
			result += ((minMargin * 0.5) + leftMargin); 
		}
		return result;
	}
	
	/**
	 * 計算模塊數值
	 */
	function calculate(){
		if(!('undefined' === typeof AccountSummary.summaries)){
			var summaries = AccountSummary.summaries.concat(AccountSummary.urSummaries);
			var netprofit = 0; 
			for(var i = 0; i < summaries.length; i++){
				var summary = summaries[i];
				netprofit += summary.netprofit;
			}
			floatPl = Util.fixToStrTwodecimal(netprofit); // 浮動盈虧
			availDisposableCapital = calculateAvailDisposableCapital(); // 佔用資金（保障金）
			availWithdrawCapital = Util.fixToStrTwodecimal(balance + netprofit - availDisposableCapital); // 可用資金
			netValue = Util.fixToStrTwodecimal(balance + netprofit); // 淨值
			if(availDisposableCapital == 0){
				marginLevel = "--";
			}else{
				marginLevel = Util.fixToStrTwodecimal(Util.accMul(Util.accDiv(netValue, availDisposableCapital) , 100)); // 按金水平	
			}
						
		}
	}
	
	// 登入數據接收完畢
	var orderEnd = false;
	socket.listeners.$add({'OrderEnd': function(para, data) {
		if(orderEnd == true){
			return;
		}
		orderEnd = true;
		
		setTimeout(function(){
			var trigger = function(para, data){
				calculate();
				exportValues();
				accountBaseInfo.onUpdate();
			};
			trigger();
			
			// Add after listener
			socket.listeners.$after({		
				// 報價 
				"secTick": trigger,
				// 持倉
				"PosItem": trigger,
				// 建倉
				"MarketBuildRet": trigger,
				// 平倉
				"MarketCloseRet": trigger
			});
			comlpatedLoad = true;
		}, 500);
	}});
	
	socket.listeners.$add({	
		//賬號信息
		"AccBasInfo": function(para, data){
			balance = para.credit;
			lockedcredit = para.lockedcredit;
			accBaseInfo_warnratio = para.warnratio;	
			accBaseInfo_cutMargin = para.minratio;
			userstatus = para.userstatus;
			goldinimargin = para.goldinimargin;
			silverinimargin = para.silverinimargin;
			lockedcredit = para.lockedcredit;
			calculate();
			exportValues();
			accountBaseInfo.onUpdate();
		},
		//額度變化
		"balance_change": function(para, data){
			balance = para.credit;
			lockedcredit = para.lockedcredit;
			calculate();
			exportValues();
			accountBaseInfo.onUpdate();
		},
		
		//此接口是为了获取最小保证金比率(强制平仓比例),服务器配置回包        -- 登陆时也会推送
		"trade_config_notify": function(para, data){
			warnratio = para.warnratio;	
			cutMargin = para.minratio;	
			exportValues();
			accountBaseInfo.onUpdate();
		}
	});	
	
});