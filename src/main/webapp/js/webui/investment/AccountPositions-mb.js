/**
 * 持仓部位
 * ---------- update view --------------
 */
$(function(){
	
   $('#accountPositions').html('<table id="accountPositionsTable"  cellpadding="0" cellspacing="0" class="liebiao-tabox weituo-tabox"></table>');
	// init
	var pTable = $('#accountPositionsTable').dataTable( {
		"aaData": [],
		"aoColumns": [
		    { "sTitle": "", "sClass": "ta-le"},
			{ "sTitle": i18n.acposition.orderno, "sClass": "ta-le"},
			{ "sTitle": i18n.acposition.ct, "sClass": "ta-le"},
			{ "sTitle": i18n.acposition.buysell},
			{ "sTitle": i18n.acposition.lot},
			{ "sTitle": i18n.acposition.openprice},
			{ "sTitle": i18n.acposition.closeprice},
			{ "sTitle": i18n.acposition.pl},
			{ "sTitle": i18n.acposition.interest},
			{ "sTitle": i18n.acposition.netpl},
			{ "sTitle": i18n.acposition.unit},
			{ "sTitle": i18n.acposition.margin},
			{ "sTitle": i18n.acposition.opentime},
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
	$('#accountPositions th').unbind('click');
	
	function highlightIfTrue(flag, text){
		if(flag){
			return '<font color="red">' + text + '</font>'; 
		}else{
			return text;
		}
	}
	
	var posItem2Array = new Object2Array({
		"operations":  function(data, obj){
			// flag == 1 為凍結
			if(obj.lot > 0 && obj.flag != 1){
				return '<ul class="weit-list">' + 
				'<li><a id="ClosePos' + obj.oid + '" href="javascript:">'+ i18n.closeposition +'</a></li>' +
				'</ul>';
			}else{
				return '';
			}
		}, 
		"oid": function(data, obj){ // 訂單號
			// 凍結 或 緊急平倉需要紅色標記
			return highlightIfTrue((obj.flag == 1), Util.simpleOid(data));
		}, 
		"prdid": function(data, obj){return highlightIfTrue((obj.flag == 1), (data == 0) ? i18n.llg:i18n.lls);}, // 合約
		"tradedir": function(data, obj){return highlightIfTrue((obj.flag == 1), (data == 0) ? i18n.buy:i18n.sell);}, // 0買/1賣  
		"lot": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));}, // 手數
		"doneprice": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}
			return highlightIfTrue((obj.flag == 1), tmpprice);}, // 開倉價
		"closedprice": function(data, obj){ // 平倉價, 市價
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}	
			// 緊急平倉，沒有平倉价
				if(obj.flag == 1 && obj.closedprice == 0){
					return highlightIfTrue((obj.flag == 1), "--");
				}else{
					if(obj.flag == 1){
						return '<font color="red">' + tmpprice + '</font>';//盈利还是亏损都显示红色
					}else{
						if(obj.profit > 0){
							return '<font color="green">' + tmpprice + '</font>';
						}else if(obj.profit < 0){
							return '<font color="red">' + tmpprice + '</font>';
						}else{
							return tmpprice;	
						}
					}
				}
			},
		"profit": function(data, obj){ // 盈虧, 動態盈虧
			// 緊急平倉，沒有平倉价
				if(obj.flag == 1 && obj.closedprice == 0){
					return highlightIfTrue((obj.flag == 1), "--");
				}else{
					return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));
				}
			}, 
		"interest": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));}, // 利息
		"netprofit": function(data, obj){ // 淨盈虧, 動態盈虧
			// 緊急平倉，沒有平倉价
			if(obj.flag == 1 && obj.closedprice == 0){
				return highlightIfTrue((obj.flag == 1), "--");
			}else{
				return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));
			}
		},
		"tradeunit": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data * obj.lot));}, // 合約單位
		"margin": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));}, // 保證金
		"time": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss"));} // 開倉時間
	});
	
	// open close position window.
	function CloseOrder(order){
		var _order = order;
		this.close = function(){
			CloseCommon.closePost(_order);	
		};
	}
	
	// 注入監聽
	
	// 添加 order
	AccountPositions.onAddOrder = function (order){
		var data = posItem2Array.toArray(order);
		if(pTable!=null&&pTable!=undefined){
			pTable.fnAddData(data,true);
			$('#ClosePos' + order.oid).click(new CloseOrder(order).close);
		}
	};
	
	// 修改 order
	AccountPositions.onUpdateOrder = function(order){		
		var display = '';
		if(bodyShow == true){
			display = $("#accountPositions").parent().css("display");	
		}
		// refresh if div diplay
		if(display != 'none'){
			//var $accountPositionsTable = $('#accountPositionsTable').dataTable();
			var nodes = pTable.fnGetNodes();
			for(var i = 0; i < nodes.length; i++){
				var node = nodes[i];
				var data = pTable.fnGetData(node);
				// found matched oid
				if(Util.isSameOid(Util.html2Text(data[1]), order.oid)){
					var index = pTable.fnGetPosition(node);
					// update
					data = posItem2Array.toArray(order);
					//pTable.fnUpdate(data, index,undefined,false,false);
					for(var k=1;k<data.length;k++){
						pTable.fnUpdate(data[k],index,k,false,false);
					}
					var closePosBtn = $('#ClosePos' + order.oid);
					closePosBtn.unbind("click");//避免重复的click绑定
					closePosBtn.click(new CloseOrder(order).close);
					break;
				}
			}	
		}
	};
	
	// 刪除 order
	AccountPositions.onDeleteOrder = function(oid){
		//var $accountPositionsTable = $('#accountPositionsTable').dataTable();
		var nodes = pTable.fnGetNodes();
		for(var i = 0; i < nodes.length; i++){
			var node = nodes[i];
			var data = pTable.fnGetData(node);
			// found matched oid
			if(Util.isSameOid(Util.html2Text(data[1]), oid)){
				var index = pTable.fnGetPosition(node);
				// delete
				pTable.fnDeleteRow(index);
				break;
			}
		}
	};	
	
	// 數據接收完畢
	var orderEnd = false;
	socket.listeners.$after({'OrderEnd': function(para, data) {
		if(orderEnd == true){
			return;
		}
		orderEnd = true;
		
		setTimeout(function(){
			pTable.fnAdjustColumnSizing();
		} ,500);
	}});
	
});