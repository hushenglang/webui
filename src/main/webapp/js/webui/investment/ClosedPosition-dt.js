/**
 * 己平仓列表
 */
$(function(){
	
	// init
	var pTable = $('#closedPositionTable').dataTable( {
		"aaData": [],
		"aoColumns": [
			{ "sTitle": i18n.closedposition.cid, "sWidth": "117"},
			{ "sTitle": i18n.closedposition.ct, "sWidth": "125"},
			{ "sTitle": i18n.closedposition.buysell, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.lot, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.openprice, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.closeprice, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.interest, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.pl, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.coupon, "sWidth": "127", "sClass":"td_nopading"},
			{ "sTitle": i18n.closedposition.opentime, "sWidth": "127"},
			{ "sTitle": i18n.closedposition.closetime, "sWidth": "127"}
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
	var closedPos2Array = new Object2Array({
		"oid": function(data){return Util.simpleOid(data);}, // 平倉號
		"prdid": function(data){return (data == 0) ? i18n.llg:i18n.lls;}, // 合約
		"tradedir": function(data){return (data == 1) ? i18n.buy:i18n.sell;}, // 開倉  1買/0賣    跟開倉一樣
		"lot": function(data){return Util.fixToStrTwodecimal(data);}, // 手數
		"openedprice": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}
			return tmpprice;
		}, // 開倉價
		"closedprice": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}
			return tmpprice;
		}, // 平倉價
		"interest": function(data){return Util.fixToStrTwodecimal(data);}, // 利息
		"profit": function(data){
			if(data > 0){
				return '<span class="td_greenbg">' + Util.fixToStrTwodecimal(data) + '</span>';	
			}else if(data < 0){
				return '<span class="td_redbg">' + Util.fixToStrTwodecimal(data) + '</span>';
			}else{
				return '<span>' + Util.fixToStrTwodecimal(data) + '</span>';
			}
		}, // 淨盈虧
		"cashback": function(data){return Util.fixToStrTwodecimal(data);}, // 回赠金额
		"openedtime": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");}, // 開倉時間
		"closedtime": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");} // 平倉時間
	});
	
	var closedPositionOrderNum = 0;
	
	//after AccBasInfo has been set, then render the accountSummary_amount_num
	var triggerRefreshClosedPositionOrderAmount = function(){
		$('#closedPosition_amount_num').html(closedPositionOrderNum);
	};
	
	socket.listeners.$add({
			// 平倉單
			"ClosedPos": function(para, data){
					var data = closedPos2Array.toArray(para);
					pTable.fnAddData(data);
					closedPositionOrderNum++;
					triggerRefreshClosedPositionOrderAmount();
					$('#closedPosition th:first').trigger('click');
				},
			// 市價平倉
			"MarketCloseRet": function(para, data){
					if(para.code == 0){
						var data = closedPos2Array.toArray(para);
						pTable.fnAddData(data);
						closedPositionOrderNum++;
						triggerRefreshClosedPositionOrderAmount();
					}
					$('#closedPosition th:first').trigger('click');
				},
			// 紧急平仓 
			"ForceClosedPos": function(para, paradata){
				if(para.code == 0){
					var data = closedPos2Array.toArray(paradata[0]);
					pTable.fnAddData(data);
					closedPositionOrderNum++;
					triggerRefreshClosedPositionOrderAmount();
				}
				$('#closedPosition th:first').trigger('click');
				}
			});
	$.fn.dataTableExt.sErrMode = 'throw'; //此处是消除datatabls的warning提示.
});