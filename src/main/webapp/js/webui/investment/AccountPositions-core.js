/**
 * 持仓部位 
 * listeners:
 * on PosItem
 * on MarketBuildRet
 * on MarketCloseRet
 */
var AccountPositions = {
		orders : [],
		refresh : function(){
			// to be replaced
		},
		onAddOrder : function(order){
			// to be replaced
		},
		onUpdateOrder : function(order){
			// to be replaced			
		},
		onDeleteOrder : function(orderId){
			// to be replaced
		},
		updateOrderBySystemPOrderClose : function(targetoid,lot){
			// to be replaced			
		},
		refreshAccountPositionsAmount:function(orders){
			// to be replaced	
		},
};
$(function(){

	var orders = [];
	
	/**
	 * export values to obj
	 */ 
	function exportValues(){
		AccountPositions.orders = orders.slice(0);
		AccountPositions.refreshAccountPositionsAmount(AccountPositions.orders);
	}
	
	// 添加訂單
	function mergeOrder(order){
		var exist = false;
		for(var i = 0; i < orders.length; i++){
			if(order.oid == orders[i].oid){
				exist = true;
				orders[i] = order;
				calculate(order);
				AccountPositions.onUpdateOrder(order);
				break;
			}
		}
		if(!exist){
			orders.push(order);
			calculate(order);
			AccountPositions.onAddOrder(order);
		}
	}
	
	// 更新利息
	function updateInterest(order){
		for(var i = 0; i < orders.length; i++){
			if(order.orderid == orders[i].oid){
				console.log(order.interest);
				orders[i].interest = order.interest;
				calculate(orders[i]);
				AccountPositions.onUpdateOrder(orders[i]);
				break;
			}
		}
	}
	
	// 移除訂單
	function deleteOrder(orderId){
		var i = -1;
		var found = false;
		for(i = 0; i < orders.length; i++){
			if(orderId == orders[i].oid){
				found = true;
				break;
			}
		}
		if(found == true){
			var order = orders[i];
			orders.splice(i,1);
			AccountPositions.onDeleteOrder(order.oid);
		}
	}
	
	/**
	 * Pending close
	 */
	function pendingClose(pendingOrder){
		for(var i = 0; i < orders.length; i++){
			var order = orders[i];
			// 找到對應訂單
			if(order.oid == pendingOrder.targetoid){
				// 如果手數相等
				if(order.lot == pendingOrder.lot){
					deleteOrder(order.oid);
				}else{
					order.lot = Util.accSub(order.lot, pendingOrder.lot);
					calculate(order);
					AccountPositions.onUpdateOrder(order);
				}
			}
		}
	}
	
	function getOrderById(oid){
		for(var i = 0; i < orders.length; i++){
			if(orders[i].oid == oid){
				return orders[i];
			}
		}
		return null;
	}
	
	
	/**
	 * Calculate
	 * closedprice
	 * profit
	 * netprofit
	 */
	function calculate(order){
		if(!('undefined' === typeof Tick.getClosedPrice)){
			// 現價, 非凍結 或 緊急平倉
			if(order.flag != 1){
				order.closedprice = Tick.getClosedPrice(order.prdid, order.tradedir);
				order.closedprice = Math.round(order.closedprice * 1000) / 1000;				
			}else{
				order.closedprice = order.UAprice;
			}
			
			// 浮動盈虧
			// 緊急平倉，沒有平倉价, profit = 0
			if(order.flag == 1 && order.closedprice == 0){
				order.profit = 0;
				order.netprofit = order.interest;
			}else{
				if(order.tradedir == 0){
					order.profit = (order.closedprice - order.doneprice) * (order.lot * order.tradeunit);
				}
				if(order.tradedir == 1){
					order.profit = (order.doneprice - order.closedprice) * (order.lot * order.tradeunit);
				}
				order.netprofit = order.profit + order.interest;
			}
		}
		
		//计算保证金
		order.margin = parseFloat(order.lot) * getUserMargin(order.code);
	}
	
	AccountPositions.refresh = function(prdcode){
		// 只更新對應prdcode的order
		for(var i = 0; i < orders.length; i++){
			var order = orders[i];
			if(!(typeof prdcode === 'undefined' )){
				var prdid = 0;
				if(prdcode == '022'){
					prdid = 0;	
				}else if(prdcode == '023'){
					prdid = 1;
				}
				if(order.prdid != prdid){
					continue;
				}
			}
			calculate(order);
			AccountPositions.onUpdateOrder(order);
		}
		exportValues();
	};
	
	// Add listener
	socket.listeners.$add({	
		// 報價
		"secTick": function(para, data){
			for(var i = 0; i < para + 1; i++){
				var t = data[i];
				AccountPositions.refresh(t.symbol);
			}
		},
		// 持倉
		"PosItem": function(para, data){
			mergeOrder(para);
			exportValues();
		},
		// 建倉
		"MarketBuildRet": function(para, data){
			if(para.code == 0){
				mergeOrder(para);
				exportValues();				
			}
		},
		// 平倉
		"MarketCloseRet": function(para, data){
			if(para.code == 0){
				var oid = para.targetoid;
				var order = getOrderById(oid);
				if(order != null){
					// 如果手數相等，刪除訂單
					if(para.lot == order.lot){
						deleteOrder(oid);							
					}else{
						//手數不相等，扣除手數
						order.lot = Util.accSub(order.lot, para.lot);
						// 扣除保證金
						order.margin = Util.accSub(order.margin, para.margin);
						mergeOrder(order);
					}
					exportValues();
				}
			}
		},		
		// 強制平倉
		"ForceClosedPos": function(para, data){
			for(var i = 0; i < para.num; i++){
				deleteOrder(data["" + i].targetoid);
			}
			exportValues();
		},
		
		// 更新利息
		"interest_notify": function(para, data){
			for(var i = 0; i < para.num; i++){
				updateInterest(data["" + i]);
			}
		},
		// 委托平倉
		"ClosedPos": function(para, data){
			for(var i = 0; i < PendingOrder.orders.length; i++){
				var order = PendingOrder.orders[i];
				if(para.targetoid == order.oid){
					pendingClose(order);
					break;
				}
			}
		} 
		
	});
	
});