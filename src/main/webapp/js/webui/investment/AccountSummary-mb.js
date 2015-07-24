/**
 * ---------- update view --------------
 */
$(function(){
	
	var posItem2Array = new Object2Array({
//		二期操作
//		"operations":  function(data, obj){
//			if(obj.lot > 0){
//				return '<ul class="weit-list">' + 
//				'<li><a id="Close' + obj.prdid + obj.tradedir + '" href="javascript:">平倉</a></li>' + 
//				'</ul>';
//			}else{
//				return '';
//			}
//		}, 
		"prdid": function(data){return (data == 0) ? i18n.llg:i18n.lls;}, // 合約
		"tradedir": function(data){return (data == 0) ? i18n.buy:i18n.sell;}, // 0買/1賣  
		"buglot": function(data, obj){return (obj.tradedir == 0)? Util.fixToStrTwodecimal(obj.lot) : '';}, // 數量
		"selllot": function(data, obj){return (obj.tradedir == 1)? Util.fixToStrTwodecimal(obj.lot) : '';}, // 數量
		"openedprice": function(data, obj){
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}
			return tmpprice;
		}, // 開倉價
		"closedprice": function(data, obj){ // 平倉價, 市價
			var tmpprice;
			if(obj.prdid==0){
				tmpprice = Util.fixToStrTwodecimal(data);
			}else{
				tmpprice = Util.fixToStrThreedecimal(data);
			}
			if(obj.profit > 0){
				return '<font color="green">' + tmpprice + '</font>';	
			}else if(obj.profit < 0){
				return '<font color="red">' + tmpprice + '</font>';
			}else {
				return tmpprice;	
			}
		},
		"profit": function(data){return Util.fixToStrTwodecimal(data);}, // 盈虧
		"interest": function(data){return Util.fixToStrTwodecimal(data);}, // 利息
		"netprofit": function(data){return Util.fixToStrTwodecimal(data);},// 淨盈虧
		"margin": function(data){return Util.fixToStrTwodecimal(data);}, // 保證金
		"tradeunit": function(data, obj){return Util.fixToStrTwodecimal(data * obj.lot);} // 合約單位
	});

	/**
	 * refresh table
	 */
	AccountSummary.onUpdate = function(){		
		// refresh if div display
		var display = $("#accountSummary").parent().css("display");
		if(display != 'none'){
			var summaries = AccountSummary.summaries;
			var $accountSummaryTable = $('#accountSummaryTable').dataTable();
			$accountSummaryTable.fnClearTable();
			for(var i = 0; i < summaries.length; i++){
				var summary = summaries[i];
				if(summary.lot == 0){
					continue;
				}
				$accountSummaryTable.fnAddData(posItem2Array.toArray(summary),true);	
				
				// add close button listener
				function CloseOrder(summary){
					var _summary = summary;
					this.close = function(){
						// close button click event here
						Alert("click  " + '#Close' + _summary.prdid + _summary.tradedir);
					};
				}
				$('#Close' + summary.prdid + summary.tradedir).click(new CloseOrder(summary).close);
			}
		}
	};
	
	
	$('#accountSummary').html('<table id="accountSummaryTable"  cellpadding="0" cellspacing="0" class="liebiao-tabox weituo-tabox"></table>');
	
	// init
	$('#accountSummaryTable').dataTable( {
		"aaData": [],
		"aoColumns": [
//			二期操作
//		    { "sTitle": "", "sClass": "ta-le"},          
			{ "sTitle": i18n.accountsummary.ct},
			{ "sTitle": i18n.accountsummary.buysell},
			{ "sTitle": i18n.accountsummary.buylot},
			{ "sTitle": i18n.accountsummary.selllot},
			{ "sTitle": i18n.accountsummary.openprice},
			{ "sTitle": i18n.accountsummary.closeprice},
			{ "sTitle": i18n.accountsummary.pl},
			{ "sTitle": i18n.accountsummary.interest},
			{ "sTitle": i18n.accountsummary.netpl},
			{ "sTitle": i18n.accountsummary.margin},
			{ "sTitle": i18n.accountsummary.unit}
		],
		"sScrollY": "198px",
		"sScrollX": "100%",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
        "asStripeClasses": ['','tr-bg'],
        "oLanguage": {
            "sEmptyTable": " "
         }
	} );
	$('#accountSummary th').unbind('click');
});

/**
 * refresh
 * 總投資額度
 * 總浮動盈虧
	<div class="tz-qian clearfix">
		<div class="tz-qian-l fl"></div>
		<div class="tz-qian-c fl">
			<span class="tz-qian-pad">總投資額度：<font id="investTotalAmount"></font></span><span>總浮動盈虧：<font id="investTotalProfitLoss"></font></span>
		</div>
		<div class="tz-qian-r fl"></div>
	</div>
$(function(){
	// update investTotalProfitLoss and investTotalAmount
	socket.listeners.$after({		
		// 報價 
		"secTick": function(para, data){
			$("#investTotalProfitLoss").html(Util.fixToStrTwodecimal(AccountSummary.investTotalProfitLoss));
			$("#investTotalAmount").html(Util.fixToStrTwodecimal(AccountSummary.investTotalAmount));
		}
	});
});
 */