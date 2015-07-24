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
				return Util.fixToStrTwodecimal(data);	
			}
		},
		"interest": function(data){return Util.fixToStrTwodecimal(data);}, // 利息
		"netprofit": function(data){
			if(data > 0){
				return '<span class="td_greenbg">' + Util.fixToStrTwodecimal(data) + '</span>';	
			}else if(data < 0){
				return '<span class="td_redbg">' + Util.fixToStrTwodecimal(data) + '</span>';
			}else{
				return '<span>' + Util.fixToStrTwodecimal(data) + '</span>';
			}
		},// 淨盈虧
		"margin": function(data){return Util.fixToStrTwodecimal(data);}, // 保證金
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
				var summaryArray = posItem2Array.toArray(summary);
				try{
					$accountSummaryTable.fnAddData(summaryArray,true);	
				}catch(e){
					console.log("", e);
				}
				// add close button listener
				function CloseOrder(summary){
					var _summary = summary;
					this.close = function(){
						// close button click event here
						alert("click  " + '#Close' + _summary.prdid + _summary.tradedir);
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
			{ "sTitle": i18n.accountsummary.ct, "sWidth":"113"},
			{ "sTitle": i18n.accountsummary.buysell, "sWidth":"114"},
			{ "sTitle": i18n.accountsummary.buylot, "sWidth":"114"},
			{ "sTitle": i18n.accountsummary.selllot, "sWidth":"134"},
			{ "sTitle": i18n.accountsummary.openprice, "sWidth":"134"},
			{ "sTitle": i18n.accountsummary.closeprice, "sWidth":"134"},
			{ "sTitle": i18n.accountsummary.interest, "sWidth":"154"},
			{ "sTitle": i18n.accountsummary.pl, "sWidth":"154", "sClass":"td_nopading"},
			{ "sTitle": i18n.accountsummary.margin, "sWidth":"154"},
		],
		"sScrollY": "120px",
		"sScrollX": "15000px",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"aaSorting": [[ 1, "desc" ]],
        "asStripeClasses": ["", "tr-bg"],
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
	$('#accountSummary th').unbind('click');
		
	//after AccBasInfo has been set, then render the accountSummary_amount_num
	var triggerRefreshAccountSummaryAmount = function(){
		if(accountBaseInfo.floatPl!=0){
			var htmlText;
			if(accountBaseInfo.floatPl<0){
				htmlText = "<span style='color:#EA4242'>"+accountBaseInfo.floatPl+"</span>";
			}else{
				htmlText = "<span style='color:#00df15'>"+accountBaseInfo.floatPl+"</span>";
			}
			$('#accountSummary_amount_num').html(htmlText);
		}else{
			htmlText = "<span style='color:#00df15'>0</span>";
			$('#accountSummary_amount_num').html(htmlText);
		}
	};
	socket.listeners.$after({	
		// 報價 
		"secTick": triggerRefreshAccountSummaryAmount,
		// 持倉
		"PosItem": triggerRefreshAccountSummaryAmount,
		// 建倉
		"MarketBuildRet": triggerRefreshAccountSummaryAmount,
		// 平倉
		"MarketCloseRet": triggerRefreshAccountSummaryAmount
	});
	$.fn.dataTableExt.sErrMode = 'throw'; //此处是消除datatabls的warning提示.
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