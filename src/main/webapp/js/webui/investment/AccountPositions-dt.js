/**
 * 持仓部位
 * ---------- update view --------------
 */
$(function(){
   //以下这段代码必须保留，否则列表会错位，移动版已经放到index-mb.js代码中
  /* $(window).bind('resize', function () { 
		var obj=$("#investment-entrust-fl li[class='on-na']");
		if(obj.length >0){
			$("#"+obj.attr("tn")).dataTable().fnAdjustColumnSizing();
		}
   });*/
	// init
	var pTable = $('#accountPositionsTable').dataTable( {
		"aaData": [],
		"aoColumns": [
		    { "sTitle": "", "sWidth": "110"},
			{ "sTitle": i18n.acposition.orderno, "sWidth": "120"},
			{ "sTitle": i18n.acposition.ct, "sWidth": "120"},
			{ "sTitle": i18n.acposition.buysell, "sWidth": "120"},
			{ "sTitle": i18n.acposition.lot, "sWidth": "120"},
			{ "sTitle": i18n.acposition.openprice, "sWidth": "120"},
			{ "sTitle": i18n.acposition.closeprice, "sWidth": "120"},
			{ "sTitle": i18n.acposition.interest, "sWidth": "120"},
			{ "sTitle": i18n.acposition.pl, "sWidth": "120", "sClass":"td_nopading"},
			{ "sTitle": i18n.acposition.margin, "sWidth": "120"},
			{ "sTitle": i18n.acposition.opentime, "sWidth": "120"},
		],
		"sScrollY": "120px",
		"sScrollX": "15000px",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"aaSorting": [[ 1, "desc" ]],
        "oLanguage": {
            "sEmptyTable": " "
         },
         "columnDefs": [
						{
						    "defaultContent": "",
						    "targets": -1
						  }
                      ],
	} );
	
	//$('#accountPositions th').unbind('click');
	
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
				'<li><input type="button" id="ClosePos' + obj.oid + '" value="'+i18n.closeposition+'" class="change_btn"/></li>' +
				
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
			return highlightIfTrue((obj.flag == 1), tmpprice);
		}, // 開倉價
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
		"interest": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));}, // 利息
		"netprofit": function(data, obj){ // 淨盈虧, 動態盈虧
				// 緊急平倉，沒有平倉价
				if(obj.flag == 1 && obj.closedprice == 0){
					return highlightIfTrue((obj.flag == 1), "--");
				}else{
					if(data > 0){
						return '<span class="td_greenbg">' + Util.fixToStrTwodecimal(data) + '</span>';	
					}else if(data < 0){
						return '<span class="td_redbg">' + Util.fixToStrTwodecimal(data) + '</span>';
					}else{
						return '<span>' + Util.fixToStrTwodecimal(data) + '</span>';
					}
				}
			},
		"margin": function(data, obj){return highlightIfTrue((obj.flag == 1), Util.fixToStrTwodecimal(data));}, // 保證金
		"time": function(data, obj){
			var f = highlightIfTrue((obj.flag == 1), Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss"));
			return f;
			} // 開倉時間
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
			try{
				pTable.fnAddData(data,true);
			}catch(e){
				console.log(e);
			}
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
	// refresh Account Position Amount 
	AccountPositions.refreshAccountPositionsAmount = function(orders){
		$("#accountPositions_posnum").text(orders.length);
	}
	
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
	$.fn.dataTableExt.sErrMode = 'throw'; //此处是消除datatabls的warning提示.
});