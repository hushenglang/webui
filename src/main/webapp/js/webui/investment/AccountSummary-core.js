/**
 * Depends on Tick-core.js, AccountPositions-core.js
 * 
 * listeners : 
 * on tick
 * after PosItem
 * after MarketBuildRet
 * after MarketCloseRet
 */
var AccountSummary = {
		onUpdate : function(order){
			// to be replaced
		},
		
};
$(function(){

	var goldBuild = {
			"prdid": 0, // 合約
			"tradedir": 0, // 買/賣
			"lot": 0, // 數量
			"openedprice": 0.00, // 開倉價
			"closedprice": 0.00,// 平倉價
			"profit": 0.00, // 盈虧
			"interest": 0.00, // 利息
			"netprofit": 0.00,// 淨盈虧
			"margin": 0.00, // 保證金
			"tradeunit": 0, // 合約單
			"totalInvest" : 0
	};
	var goldClose = jQuery.extend(true, {}, goldBuild);
	var silverBuild = jQuery.extend(true, {}, goldBuild);
	var silverClose = jQuery.extend(true, {}, goldBuild);
	// 初始化
	goldBuild.prdid = 0;
	goldBuild.tradedir = 0;
	goldClose.prdid = 0;
	goldClose.tradedir = 1;
	silverBuild.prdid = 1;
	silverBuild.tradedir = 0;
	silverClose.prdid = 1;
	silverClose.tradedir = 1;
	var summaries = [goldBuild, goldClose, silverBuild, silverClose];
	
	
	var urGoldBuild = jQuery.extend(true, {}, goldBuild);
	var urGoldClose = jQuery.extend(true, {}, goldBuild);
	var urSilverBuild = jQuery.extend(true, {}, goldBuild);
	var urSilverClose = jQuery.extend(true, {}, goldBuild);
	// 初始化
	urGoldBuild.prdid = 0;
	urGoldBuild.tradedir = 0;
	urGoldClose.prdid = 0;
	urGoldClose.tradedir = 1;
	urSilverBuild.prdid = 1;
	urSilverBuild.tradedir = 0;
	urSilverClose.prdid = 1;
	urSilverClose.tradedir = 1;
	var urSummaries = [urGoldBuild, urGoldClose, urSilverBuild, urSilverClose];
	
	var investTotalAmount = 0;
	var investTotalProfitLoss = 0;
	
	/**
	 * Export
	 */
	function exportValues(obj){
		obj.summaries = summaries.slice(0);
		obj.urSummaries = urSummaries.slice(0);
		obj.goldBuild = goldBuild;
		obj.goldClose = goldClose;
		obj.silverBuild = silverBuild;
		obj.silverClose = silverClose;
		obj.investTotalAmount = investTotalAmount;
		obj.investTotalProfitLoss = investTotalProfitLoss;
	}

	/**
	 * select summary record for update
	 */
	function select(order){
		for(var i = 0; i < summaries.length; i++){
			var summary = summaries[i];
			if(order.prdid == summary.prdid && order.tradedir == summary.tradedir){
				return summaries[i];
			}
		}
		return null;
	}
	
	/**
	 * select urgent close summary record for update
	 */
	function urSelect(order){
		for(var i = 0; i < urSummaries.length; i++){
			var summary = urSummaries[i];
			if(order.prdid == summary.prdid && order.tradedir == summary.tradedir){
				return urSummaries[i];
			}
		}
		return null;
	}
	
	/**
	 * clear summaries
	 */
	function clear(){
		var rs = summaries.concat(urSummaries);
		for(var i = 0; i < rs.length; i++){
			rs[i].lot = 0;	
			rs[i].openedprice = 0.00;
			rs[i].closedprice = 0.00;
			rs[i].profit = 0.00;
			rs[i].interest = 0.00;
			rs[i].netprofit = 0.00;
			rs[i].margin = 0.00;
			rs[i].tradeunit = 0;
			rs[i].totalInvest = 0;
		}
	}
	
	
	/*
	 * close price
when(p.productid = 0 and g.ordertype = 0) then @ask_022 + sellspread -- bid gold 
when(p.productid = 0 and g.ordertype = 1) then @bid_022 + buyspread -- ask gold 
when(p.productid = 1 and g.ordertype = 0) then @ask_023 + sellspread -- bid silver 
when(p.productid = 1 and g.ordertype = 1) then @bid_023 + buyspread -- ask silver 
	 * 
	 * float profit
when(b.ordertype = 0) then (b.closeprice-b.price)*b.lot*b.tradeunit + b.interest -- bid 
when(b.ordertype = 1) then (b.price-b.closeprice)*b.lot*b.tradeunit + b.interest -- ask 
	 * 
	 */
	/**
	 * Calculate:
	 * investTotalAmount
	 * investTotalProfitLoss
	 */
	function calculate(){
		investTotalAmount = 0;
		investTotalProfitLoss = 0;
		for(var i = 0; i < summaries.length; i++){
			var summary = summaries[i];
			if(summary.lot == 0){
				continue;
			}
			
			if(!('undefined' === typeof Tick.getClosedPrice)){
				// 現價
				summary.closedprice = Tick.getClosedPrice(summary.prdid, summary.tradedir);
				// 總投資額度
				investTotalAmount += summary.closedprice * summary.lot * summary.tradeunit;
				// 總浮動盈虧
				investTotalProfitLoss += summary.netprofit;	
			}
		}
	}
	
	/**
	 * Accumulate: 
	 * openedprice
	 * lot
	 * interest
	 * margin
	 */
	function accumulate(){
		clear();
		var orders = AccountPositions.orders;
		if(!('undefined' === typeof orders)){
			for(var i = 0; i < orders.length; i++){
				var order = orders[i];
				var summary = null;
				// 緊急平倉
				if(order.flag == 1){
					summary = urSelect(order);
				}else{
					summary = select(order);	
				}
				summary.totalInvest += Util.accMul(order.lot, order.doneprice);
				summary.lot = Util.accAdd(summary.lot, order.lot);
				summary.openedprice = Util.accDiv(summary.totalInvest, summary.lot);
				summary.interest = Util.accAdd(summary.interest, order.interest);
				summary.margin = Util.accAdd(summary.margin, order.margin);	
				summary.tradeunit = order.tradeunit;

				summary.profit = Util.accAdd(summary.profit, order.profit);
				summary.netprofit = Util.accAdd(summary.netprofit, order.netprofit);
			}			
		}
	}
	
	// add listener
	socket.listeners.$add({
		// 報價
		"secTick": function(para, data){
			accumulate();	
			calculate();
			exportValues(AccountSummary);
			AccountSummary.onUpdate();
		}
	});	
	// Add after listeners
	socket.listeners.$after({
		// 持倉
		"PosItem": function(para, data){
			accumulate();	
			calculate();
			exportValues(AccountSummary);
			AccountSummary.onUpdate();
		},
		// 建倉
		"MarketBuildRet": function(para, data){
			accumulate();	
			calculate();
			exportValues(AccountSummary);
			AccountSummary.onUpdate();
		},
		// 平倉
		"MarketCloseRet": function(para, data){
			accumulate();	
			calculate();
			exportValues(AccountSummary);
			AccountSummary.onUpdate();	
		},
		
	});	
	
});