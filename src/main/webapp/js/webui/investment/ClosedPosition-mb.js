/**
 * 己平仓列表
 */
$(function(){
	
	
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
		"_profit": function(data, obj){return Util.fixToStrTwodecimal(obj.profit - obj.interest);}, // 盈虧 
		"interest": function(data){return Util.fixToStrTwodecimal(data);}, // 利息
		"profit": function(data){return Util.fixToStrTwodecimal(data);}, // 淨盈虧
		"tradeunit": function(data, obj){return Util.fixToStrTwodecimal(data * obj.lot);}, // 合約單位
		"cashback": function(data){return Util.fixToStrTwodecimal(data);}, // 回赠金额
		"openedtime": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");}, // 開倉時間
		"closedtime": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");} // 平倉時間
	});
	
	
	socket.listeners.$add({
			// 平倉單
			"ClosedPos": function(para, data){
					var data = closedPos2Array.toArray(para);
					$('#closedPositionTable').dataTable().fnAddData(data);
				},
			// 市價平倉
			"MarketCloseRet": function(para, data){
					if(para.code == 0){
						var data = closedPos2Array.toArray(para);
						$('#closedPositionTable').dataTable().fnAddData(data);
					}
				},
			// 紧急平仓 
			"ForceClosedPos": function(para, paradata){
				if(para.code == 0){
					var data = closedPos2Array.toArray(paradata[0]);
					$('#closedPositionTable').dataTable().fnAddData(data);
					}
				}
			});
	
	$('#closedPosition').html('<table id="closedPositionTable"  cellpadding="0" cellspacing="0" class="liebiao-tabox weituo-tabox"></table>');
	
	// init
	$('#closedPositionTable').dataTable( {
		"aaData": [],
		"aoColumns": [
			{ "sTitle": i18n.closedposition.cid, "sClass": "ta-le"},
			{ "sTitle": i18n.closedposition.ct, "sClass": "ta-le"},
			{ "sTitle": i18n.closedposition.buysell},
			{ "sTitle": i18n.closedposition.lot},
			{ "sTitle": i18n.closedposition.openprice},
			{ "sTitle": i18n.closedposition.closeprice},
			{ "sTitle": i18n.closedposition.pl},
			{ "sTitle": i18n.closedposition.interest},
			{ "sTitle": i18n.closedposition.netpl},
			{ "sTitle": i18n.closedposition.unit},
			{ "sTitle": i18n.closedposition.coupon},
			{ "sTitle": i18n.closedposition.opentime, "sClass": "ta-le"},
			{ "sTitle": i18n.closedposition.closetime, "sClass": "ta-le"}
		],
		"sScrollY": "198px",
		"sScrollX": "100%",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"aaSorting": [[ 0, "desc" ]],
        "asStripeClasses": ['','tr-bg'],
        "oLanguage": {
            "sEmptyTable": " "
         }
	} );
	
});