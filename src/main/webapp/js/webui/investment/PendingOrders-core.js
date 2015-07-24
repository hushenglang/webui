/**
 * 当日委托
 */
var PendingOrder = {
	orders : [],
	onAddOrder : function(order, advOrders){
		// to be replaced
	},
	onUpdateOrder : function(order, advOrders){
		// to be replaced			
	},
	onDeleteOrder : function(orderId){
		// to be replaced
	},
	refreshPendingOrderNum : function(orders){
		// to be replaced
	},
	//根据委托号拿委托类型
	getOptypeByOid : function(oid) {
		for(var i = 0; i < PendingOrder.orders.length; i++){
			if(oid == PendingOrder.orders[i].oid){ 
				return PendingOrder.orders[i].optype;
			}
		}
		return '';
	}
};


$(function(){
	// 委托單
	var orders = [];
	// 保存第一張進堦委托單
	var advOrders = [];
	
	function exportValues(){
		PendingOrder.orders = orders.slice(0);	
		PendingOrder.refreshPendingOrderNum(PendingOrder.orders);
	}	
	
	function margeOrder(order, advOrders){
		var exist = false;
		console.log('order id:' + order.oid + ',  roid:' + order.roid + ' , optype:' + order.optype);
		
		if(Util.isEmpty(order.oid) && Util.isEmpty(order.roid)) {
			return;
		}
		// 如果是進堦委托單，平倉單設置開倉單號為關聯單號
		if((order.validflag == 1 || order.validflag == 2) && order.positiondir == 1) {
			if(advOrders){
				order.roid = advOrders[0].oid;
			}else{
				order.roid = order.oid;
			}
		}
		
		for(var i = 0; i < orders.length; i++){
			if(order.oid == orders[i].oid){
				exist = true;
				var targetoid = orders[i].targetoid;//stored for modify close pending order.
				var roid = orders[i].roid;//stored for modify close pending order.
				orders[i] = order;
				if(targetoid){//因为下委托单, 和修改委托单都是用这个方法, 而修改委托单的简体接口是没有返回关联单号的, 所以这个targetoid如果是空的话,说明是下委托单, 否则是关联委托单
					orders[i].targetoid = targetoid;
				}
				if(roid){//因为下委托单, 和修改委托单都是用这个方法, 而修改委托单的简体接口是没有返回关联单号的, 所以这个roid如果是空的话,说明是下委托单, 否则是关联委托单
					orders[i].roid = roid;
				}
				PendingOrder.onUpdateOrder(order, advOrders); // refresh table
				break;
			}
		}
		if (!exist && order != null && typeof order != 'undefined') {
			orders.push(order);
			PendingOrder.onAddOrder(order, advOrders); // refresh table
		}
		exportValues();
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
			PendingOrder.onDeleteOrder(order.oid); // refresh table
		}
		exportValues();
	}
	
	// 執行訂單
	function doOrder(oid){
		for(var i = 0; i < orders.length; i++){
			var order = orders[i];
			if(oid == order.oid){
				order.tradestatus = 1; // 已執行
				PendingOrder.onUpdateOrder(order); // refresh table
				break;
			}
		}
		exportValues();
	}
	
	
	// 添加進堦委托單
	function mergeAdvOrder(order){
		var exist = false;
		for(var i = 0; i < advOrders.length; i++){
			if(order.oid == advOrders[i].oid){
				exist = true;
				advOrders[i] = order;
				break;
			}
		}
		if(!exist){
			advOrders.push(order);
		}
	}
	
	// 移除進堦委托單
	function popAdvOrder(roid){
		var result = null;
		var i = -1;
		var found = false;
		for(i = 0; i < advOrders.length; i++){
			if(roid == advOrders[i].roid){
				found = true;
				break;
			}
		}
		if(found == true){
			result = advOrders[i];
			advOrders.splice(i,1);
		}
		return result;
	}
	
	// Add listener
	socket.listeners.$add(
		{
			// 監聽OrderItem，添加委托單
			"OrderItem": function(para, data){
				//不是進堦委托
				if(para.validflag != 1 && para.validflag!= 2){
					margeOrder(para);	
				}else{
					// 進堦委托
					if(Util.isNotBlank(para.roid)){
						mergeAdvOrder(para);
					}else{
						var order = popAdvOrder(para.oid);
						// 找到對應第一張進堦委托單 
						if(order != null){
							var advOrder = [order, para];
							margeOrder(advOrder[0], advOrder);
							margeOrder(advOrder[1], advOrder);							
						}
					}
				}
			},
			// 監聽進堦 AdvOrderRet
			"AdvOrderRet": function(para, data){
				if(para.code == 0){
					margeOrder(data['0'], data);
					margeOrder(data['1'], data);
				}
			},
			// 監聽 PendingOrderRet
			"PendingOrderRet": function(para, data){
				if(para.code == 0){
					margeOrder(para);
				}
			},
			// 監聽 CancelOrderRet,code=0表示成功下单，type: 0 手动取消 1系统取消, 其他参数跟OrderItem相同，code<>0表示失败
			"CancelOrderRet" : function(para, data){
				if(para.code == 0){ //手动取消成功
					deleteOrder(para.oid);
				} else { //系统取消
					para.tradestatus = -1; // 已取消
					margeOrder(para);
				}
			},
			// 監聽 ModifyOrderRet
			"ModifyOrderRet" : function(para, data){
				if(para.code == 0){
					margeOrder(para);	
				}
			},
			
			//建仓委托单成交以后会返回一条 PosItem 命令
			"PosItem" : function(para, data){
				doOrder(para.targetoid);
			},
			
			//平仓委托单成交以后会返回一条 ClosedPos 命令
			"ClosedPos": function(para, data){
				doOrder(para.targetoid);
			}
	});
	
});

