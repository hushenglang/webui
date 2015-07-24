/**
 * 当日委托
 */
$(function(){
	
	/*-- views --*/
	
	// 轉換  function
	var orderItem2Array = new Object2Array({
		"operation": function(data, obj){
				if(obj.tradestatus == 0){
					return '<ul class="weit-list">' + 
					'<li><a id="EditPO' + obj.oid + '" href="javascript:">修改</a></li>' +
					'<li><a id="CanclePO' + obj.oid + '" href="javascript:" >取消</a></li></ul>';				
				}else{
					return '';
				}
			}, //
		"oid": function(data){return Util.simpleOid(data);},// 委託號
		"prdid": function(data){return (data == 0) ? i18n.llg:i18n.lls;}, // 合約
		"positiondir": function(data){return (data == 0) ? i18n.pendingorder.openposition:i18n.pendingorder.closeposition;}, //類別 仓位方向：position direction 建仓0/平仓1
		"tradedir": function(data){return (data == 0) ? i18n.buy:i18n.sell;}, // 0買/1賣  
		"lot": function(data){return Util.fixToStrTwodecimal(data);},// 手數
		"limitprice1": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(obj.limitprice);
			}else{
				tmpprice = Util.fixToStrThreedecimal(obj.limitprice);
			}
			return (obj.optype==1||obj.optype==3) ? tmpprice : '--';
		},// 限價 
		"limitprice2": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(obj.price);
			}else{
				tmpprice = Util.fixToStrThreedecimal(obj.price);
			}
			return (obj.optype==2||obj.optype==3) ? tmpprice : '--';},// 停損
		"tradestatus": function(data, obj){ 
			if(obj.validflag == 1){
				return i18n.pendingorder.invalid;
			}else{
				var result = ''; 
				if(data == 1) {
					result = i18n.pendingorder.done;
				}
				if(data == -1) {
					result = i18n.pendingorder.cancel;
				}
				if(data == 0) {
					result = i18n.pendingorder.wait;
				}
				return result; // 狀態 -1取消 0等待 1已執行 
			}
		}, 
		"validtype": function(data){return (data == 0) ? i18n.pendingorder.day:i18n.pendingorder.week;}, // 期限, 0为当日有效，1为本周有效
		"time": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");}, // 委託時間
		"targetoid": function(data){return Util.simpleOid(data);}, // 關聯單號
		"roid": function(data, obj){return ((obj.targetoid)||(obj.positiondir == 1 && (obj.validflag == 1 || obj.validflag == 2)))
												? Util.simpleOid(data) : '' ;}// 備註, 進堦委托平倉單才顯示
	});
	
	// 添加order
	PendingOrder.onAddOrder = function(order, advOrders){
		var data = orderItem2Array.toArray(order);
		$('#pendingOrderTables').dataTable().fnAddData(data);
		
		// 調用修改訂單
		$('#EditPO' + order.oid).click(function(){
			QuotationGTS.callModifyPendingOrderFun(order, advOrders);
		});
		// 調用取消訂單
		$('#CanclePO' + order.oid).click(function(){
			QuotationGTS.callCancelPendingOrderFun(order, advOrders);
		});
	};
	
	// 修改 order
	PendingOrder.onUpdateOrder = function(para, advOrders){		
		var $pendingOrderTables = $('#pendingOrderTables').dataTable();
		var nodes = $pendingOrderTables.fnGetNodes();
		for(var i = 0; i < nodes.length; i++){
			var node = nodes[i];
			var data = $pendingOrderTables.fnGetData(node);
			// found matched oid
			if(Util.isSameOid(Util.html2Text(data[1]), para.oid)){
				var index = $pendingOrderTables.fnGetPosition(node);
				// update
				data = orderItem2Array.toArray(para);
				$pendingOrderTables.fnUpdate(data, index,undefined,false,false);
				break;
			}
		}
		
		// 調用修改訂單
		$('#EditPO' + para.oid).click(function(){
			QuotationGTS.callModifyPendingOrderFun(para, advOrders);
		});
		// 調用取消訂單
		$('#CanclePO' + para.oid).click(function(){
			QuotationGTS.callCancelPendingOrderFun(para, advOrders);
		});
	};
	
	// delete order
	PendingOrder.onDeleteOrder = function(oid){
		var $pendingOrderTables = $('#pendingOrderTables').dataTable();
		var nodes = $pendingOrderTables.fnGetNodes();
		for(var i = 0; i < nodes.length; i++){
			var node = nodes[i];
			var data = $pendingOrderTables.fnGetData(node);
			// found matched oid
			if(Util.isSameOid(Util.html2Text(data[1]), oid)){
				var index = $pendingOrderTables.fnGetPosition(node);
				// delete
				$pendingOrderTables.fnDeleteRow(index);
				break;
			}
		}
	};
	
	$('#pendingOrders').html('<table id="pendingOrderTables"  cellpadding="0" cellspacing="0" class="liebiao-tabox weituo-tabox"></table>');
	
	// init
	$('#pendingOrderTables').dataTable( {
		"aaData": [],
		"aoColumns": [
			{ "sTitle": "", "sClass": "ta-le"},
			{ "sTitle": i18n.pendingorder.oid, "sClass": "ta-le"},
			{ "sTitle": i18n.pendingorder.unit, "sClass": "ta-le"},
			{ "sTitle": i18n.pendingorder.ct, "sClass": "ta-le"},
			{ "sTitle": i18n.pendingorder.buysell},
			{ "sTitle": i18n.pendingorder.lot},
			{ "sTitle": i18n.pendingorder.limitprice},
			{ "sTitle": i18n.pendingorder.lost},
			{ "sTitle": i18n.pendingorder.status},
			{ "sTitle": i18n.pendingorder.limittime},
			{ "sTitle": i18n.pendingorder.ordertime},
			{ "sTitle": i18n.pendingorder.relatedid},
			{ "sTitle": i18n.pendingorder.remark}
		],
		"sScrollY": "198px",
		"sScrollX": "100%",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"aaSorting": [[ 1, "desc" ]],
        "asStripeClasses": ['','tr-bg'],
        "oLanguage": {
            "sEmptyTable": " "
         }
	} );
	
	$('#pendingOrders th').unbind( "click" );
});