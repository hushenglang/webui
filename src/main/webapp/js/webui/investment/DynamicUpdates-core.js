/**
 * 
 * listeners:
 * 建倉
 * MarketBuildRet
 * MarketCloseRet
 * 
 * 平倉
 * 
 * ForceClosedPos
 * 
 * 进阶单委托
 * AdvOrderRet
 * 
 * 委托單
 * OrderItem
 * PendingOrderRet
 * CancelOrderRet
 * ModifyOrderRet
 * 
 */
var DynamicUpdates = {
	records : [],
	onAdd : function(record){},
	
	clear : function(){
		console.log("clear dynamicUpdates records.");
		while(this.records.length > 0) { 
			this.records.pop(); 
		}
		this.onClear();
	},
	onClear : function(){}
};
$(function(){	
	
	var records = [];
	var orders = [];
	
	function exportValues(){
		DynamicUpdates.records = records.slice(0);
	}
	
	// 添加訂單
	function mergeOrder(order){
		orders.push(order);
	}
	
	// 移除訂單
	function popOrder(orderId){
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
			return order;
		}
		return;
	}
	
	// GET訂單
	function getOrder(orderId){
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
			return order;
		}
		return;
	}
	

	function getOptype(optype) {
		var result = '';
		switch (optype) {
		case 0:
			result = i18n.dynamic.marketprice;
			break;
		case 1:
			result = i18n.dynamic.limitprice;
			break;
		case 2:
			result =i18n.dynamic.stop;
			break;
		case 3:
			result = i18n.dynamic.autoreplace;
			break;
		default:
			result = '';
		}
		return result;
	}
	
	/**
	 * 	optype: 交易类型 0 市价， 1 限价， 2 止损， 3 自动替代， 4 利息，5 调整
	 *  targetoid：开仓单号
	 *  oid：成交单号
	 *  tradedir： 0 买， 1卖
	 *  lot: 手数
	 *  
	 *  validflag 为1或2为进阶委托
	 *  	此时如positiondir为0表示开仓， 1为平仓，为空再判断第二张单号：roid 如为空平仓， 不空表示开仓
	 *  validflag 为空表示普通单
	 *      此时如有开仓单号targetoid表示平仓， targetoid为空表示开仓
	 */
	function message(optype, targetoid, oid, tradedir, lot, prdid, price, validflag, roid, positiondir){
		
		var open = true;
		if(validflag == 1 || validflag == 2){ //進堦委托
			// 平倉
			if(positiondir==0){ // positiondir 0-开仓, 1-平仓
				open = true;
			}else if(positiondir == 1){
				open = false;
			}else{
				if(Util.isNotBlank(roid)){ // roid　第二張單，平倉單號碼
					open = true;
				}else{
					open = false; // 平倉
				}
			}
		}else{
			if(Util.isNotBlank(targetoid)){
				open = false; // 平倉
			}
		}
		
		var priceStr = "";
		
		if($.isArray(price)){
			for(var i = 0 ; i < price.length; i++){
				var p = price[i];
				if(p != 0){
					if(priceStr.length > 0){
						priceStr += i18n.dynamic.or;
					}
					var tmpprice;
					if(prdid==0){
						tmpprice = Util.fixToStrTwodecimal(p);
					}else{
						tmpprice = Util.fixToStrThreedecimal(p);
					}
					priceStr += '@' + tmpprice;		
				}
			}
		}else{
			var tmpprice;
			if(prdid==0){
				tmpprice = Util.fixToStrTwodecimal(price);
			}else{
				tmpprice = Util.fixToStrThreedecimal(price);
			}
			priceStr = '@' + tmpprice;
		}
		
		var msg;
		//进阶委托和普通委托的显示不一样, 要分开处理
		if(validflag == 1 || validflag == 2){
			msg = i18n.dynamic.advpending + 
			(open ? i18n.dynamic.openposition : i18n.dynamic.closeposition) +
			'#' +  Util.simpleOid(oid) + ' ' +
				((tradedir == 0) ? i18n.dynamic.buy : i18n.dynamic.sell) + 
				Util.fixToStrTwodecimal(lot) + '*' + 
			((prdid == 0)?i18n.dynamic.llg:i18n.dynamic.lls) + 
			priceStr; // @1234.00
		}else{
			msg = getOptype(optype) + 
			(open ? i18n.dynamic.openposition : i18n.dynamic.closeposition) +
			' #' +  Util.simpleOid(oid) + ' ' +
				((tradedir == 0) ? i18n.dynamic.buy : i18n.dynamic.sell) + 
				Util.fixToStrTwodecimal(lot) + '* ' + 
			((prdid == 0)?i18n.dynamic.llg:i18n.dynamic.lls) + 
			priceStr; // @1234.00
		}
		return msg;
	}
	
	function addDynamicUpdate(d){
		console.log("Add dynamicUpdates record", d);
		records.unshift(d);
		exportValues();
		DynamicUpdates.onAdd(d);
	}
	
	function getValidFlag(oid){
		console.log('getValidFlag:' + oid);
		for(var index in orders){
			var orderObj = orders[index];
			if(orderObj.oid == oid){
				return orderObj.validflag;
			}
		}
		return 0;
	}
	
	// 登入數據接收完畢
	var orderEnd = false;
	socket.listeners.$add({'OrderEnd': function(para, data) {
		if(orderEnd == true){
			return;
		}
		orderEnd = true;
			
		// Add listener
		socket.listeners.$add(
			{
				//市價開倉
				"MarketBuildRet": function(para, data){
					mergeOrder(para);
					if(para.code == 0){
						var d = {
								time: para.time, 
								status: i18n.dynamic.done,
								message: message(
										0, // 市價
										para.targetoid, 
										para.oid, 
										para.tradedir,
										para.lot, 
										para.prdid,
										para.doneprice)
						};
						addDynamicUpdate(d);
					}
				},
				
				// 平倉
				"MarketCloseRet": function(para, data){
					if(para.code == 0){
						var order = popOrder(para.oid); // 現有委托單
						var d = {
								time: para.closedtime, 
								status: i18n.dynamic.done,
								message: message(
										0, // 市價
										para.targetoid, 
										para.oid, 
										para.tradedir,
										para.lot, 
										para.prdid,
										para.closedprice)
						};
						addDynamicUpdate(d);
					}
				},
				// 強制平倉
				"ForceClosedPos": function(para, data){
					for(var i in data){
						var order = popOrder(data[i].oid); //現有委托單
						var d = {
								time: data[i].closedtime, 
								status: i18n.dynamic.done,
								message: message(
										data[i].optype, 
										data[i].targetoid, 
										data[i].oid, 
										data[i].tradedir,
										data[i].lot, 
										data[i].prdid,
										data[i].closedprice)
						};
						addDynamicUpdate(d);
					}

				},
				// 現有委托單
				"OrderItem": function(para, data){
					mergeOrder(para);
					var status = i18n.dynamic.wait;
					if(para.validflag == 1){
						status = i18n.dynamic.invalid;
					}else{
						status = (para.tradestatus == 1) ? i18n.dynamic.done:i18n.dynamic.wait; // 狀態 -1取消 0等待 1已執行 
					}
					var d = {
							time: para.time, 
							status: status,
							message: message(
									para.optype, 
									para.targetoid, 
									para.oid, 
									para.tradedir,
									para.lot, 
									para.prdid,
									[para.limitprice, para.price], 
									para.validflag,
									para.roid,
									para.positiondir)
					};
					addDynamicUpdate(d);
				},
				// 下委托單，包括进阶委托单
				"PendingOrderRet": function(para, data){
					if(para.code == 0){
						mergeOrder(para);
						var d = {
							time: SystemTime.time, 
							status: i18n.dynamic.wait,
							message: message(
										para.optype, 
										para.targetoid, 
										para.oid, 
										para.tradedir,
										para.lot, 
										para.prdid,
										[para.limitprice, para.price],
										getValidFlag(para.oid), 
										para.targetoid, 
										para.positiondir)
						};
						addDynamicUpdate(d);
					}
				},
				// 取消委托單
				"CancelOrderRet" : function(para, data){
					if(para.code == 0){
						var order = popOrder(para.oid); // 現有委托單
						if(!order) {
							order = para;
						}
						
						var d = {
							time: para.time, 
							status: i18n.dynamic.cancel,
							message: message(
									order.optype, 
									order.targetoid, 
									order.oid, 
									order.tradedir,
									order.lot, 
									order.prdid,
									[para.limitprice, para.price],
									para.validflag,
									para.roid,
									para.positiondir)
						};
						addDynamicUpdate(d);
					} else {	//系统取消
						if(Util.isNotEmpty(para.oid)) {
							var order = getOrder(para.oid); // 現有委托單
							
							if(order) {
								var d = {
										time: para.time, 
										status: i18n.dynamic.cancel,
										message: message(
												order.optype, 
												order.targetoid, 
												order.oid, 
												order.tradedir,
												order.lot, 
												order.prdid,
												order.limitprice)
								};
								addDynamicUpdate(d);
							}
						}
					}
				},
				// 修改委托單
				"ModifyOrderRet" :function(para, data){
					if(para.code == 0){
						mergeOrder(para);
						var d = {
							time: para.time, 
							status: i18n.dynamic.altered,
							message: message(
									para.optype, 
									para.targetoid, 
									para.oid, 
									para.tradedir,
									para.lot, 
									para.prdid,
									[para.limitprice, para.price])
						};
						addDynamicUpdate(d);
					}
				},
				// 平仓委托单成交以后会返回一条 ClosedPos 命令
				"ClosedPos" :function(para, data){
					if(para.code == 0 && para.targetoid != ''){
						var optype = PendingOrder.getOptypeByOid(para.targetoid);
						
						if('' != optype) {
							mergeOrder(para);
							var d = {
									time: para.closedtime, 
									status: i18n.dynamic.done,
									message: message(
											optype, 
											para.targetoid, 
											para.targetoid, 
											para.tradedir,
											para.lot, 
											para.prdid,
											para.closedprice)
							};
							addDynamicUpdate(d);
						}
					}
				},
				// 建仓委托单成交以后会返回一条 PosItem 命令
				// 包括进阶委托单
				"PosItem" :function(para, data){
					if(para.code == 0 && para.targetoid != ''){
						var optype = PendingOrder.getOptypeByOid(para.targetoid);
						
						if('' != optype) {
							mergeOrder(para);
							var d = {
									time: SystemTime.time, 
									status: i18n.dynamic.done,
									message: message(
											optype, 
											'',		//开仓 
											para.targetoid, 
											para.tradedir,
											para.lot, 
											para.prdid,
											para.doneprice, 
											getValidFlag(para.targetoid), 
											para.oid, 
											0) //开仓
							};
							addDynamicUpdate(d);
						}
					}
				},
				// AdvOrderRet 进阶单委托或修改返回
				"AdvOrderRet" :function(para, data){
					if(para.code == 0){
						for(var i = 0; i < para.num; i++){
							var isModifyFlag = isModifyStatus(data[i].oid);
							mergeOrder(data[i]);
							var d = {
									time: data[i].time, 
									status: (isModifyFlag)?i18n.dynamic.altered:(data[i].validflag == 1) ? i18n.dynamic.invalid :
										((data[i].tradestatus == 1) ? i18n.dynamic.done : i18n.dynamic.wait), // 狀態 -1取消 0等待 1已執行 
									message: message(
											data[i].optype, 
											data[i].targetoid,  
											data[i].oid, 
											data[i].tradedir,
											data[i].lot, 
											data[i].prdid,
											(data[i].optype==3)?[data[i].limitprice, data[i].price]:(data[i].optype==1)?data[i].limitprice:data[i].price, 
											data[i].validflag,
											data[i].roid,
											data[i].positiondir)
								};
							addDynamicUpdate(d);						
						}
					}
					
					//detemine order is modify order
					function isModifyStatus(oid){
						for(var index in orders){
							var orderObj = orders[index];
							if(orderObj.oid == oid){
								return true;
							}
						}
						return false;
					}
				}
			});
	}});
});