
var pageCount = 20;


var productArray = [{name:i18n.report.allProduct, value:''}, {name:i18n.llg, value:'0'}, {name:i18n.lls, value:'1'}];

var entryArray = [{name:'所有', value:''}, {name:i18n.openposition, value:'1'}, {name:i18n.closeposition, value:'0'}]; 

var cusTranCodeArray = [{name:'所有 ', value:''},
                       	{name: i18n.report.deposit, value:'MDEPOSIT'}, //'CANCELDRAW','MDEPOSIT','NETPAY'
                    	{name: i18n.report.withdrawals, value:'WITHDRAW'},  //WITHDRAW
                    	{name:i18n.report.profit, value:'PC'}, //PC
                    	{name:i18n.report.fee, value:'FEE'}, //'FEE','FEE_MA_FAULT','FEE_MA_DEPOSIT','FEE_MA_WITH','FEE_MA_CLEAR','FEE_MA_TRANSFER','FEE_MA_ST','FEE_MA_COMMIS','FEE_MA_WPRICE','FEE_MA_OTHER','FEE_MONEYADJUST'
                    	{name:i18n.report.commission, value:'BET_YJ'}, //'BET_YJ', 'PC_YJ'
                    	{name:i18n.report.systemCleared, value:'SYSCLEARZERO'}, //SYSCLEARZERO
                    	{name:i18n.report.cashback, value:'CASH_BACK'}, //CASH_BACK
                    	{name:i18n.report.tokenDiscount, value:'COUPON_IN'}, //COUPON_IN
                    	{name:i18n.report.TokenExpire, value:'COUPON_OUT'}, //COUPON_OUT
                    	{name:i18n.report.autoCancelWithdrawal, value:'AC_DRAW'}, //AC_DRAW
                    	{name:i18n.report.specialAdjustment, value:'FEE_SYSADJUST'}, //FEE_SYSADJUST
                    	{name:i18n.report.preferential, value:'PRESENT'},//PRESENT
                    	{name:i18n.report.transfer, value:'TRANS_IN_OUT'}, //'TRANS_IN','TRANS_OUT'
                    	{name:i18n.report.cgsefee, value:'CGSE_FEE'},//CGSE_FEE
                    	{name:i18n.report.mispayCgseFee, value:'MISPAID_PAYMENT'},//MISPAID_PAYMENT
                    	{name:i18n.report.grants, value:'PC_CB'}, //PC_CB
                    	{name:i18n.report.rebate, value:'BFN'},  //'BFN','BFA'
                    	{name:i18n.report.grantsGuarantee, value:'PT'} //保障優惠 (PT)
                    	];

var rebateTypeArray = [{name:i18n.report.cashbackOption_token, value:'2'},{name:i18n.report.cashbackOption_rebate, value:'1'}];

function checkTable(v,n){
		$('input,select',$('#'+n)).each(function(){
			var name = $(this).attr('name');
			
			if(this==v || name.indexOf('pageNo') != -1){
				return;
			}
			if(name == 'uid'){
				$(this).attr("disabled",!(v.checked));
			}else if(name == 'box'){
				$(this).attr("disabled",!(v.checked));
			}else{
				$(this).attr("disabled",v.checked);
			}
		});
	
}

/*!
 * 报表弹出框JS
 * 
 */
var Report = {
	// tab初始化
	tabClick: function() {
		$("#baobiaoUlId li").on('click', function(){  //报表
			var li=$("#baobiaoUlId li");
			li.removeClass("on-na");
			$($("#baobiaoListId").children("div").get(li.index(this))).removeClass("dn").siblings("div").addClass("dn");
			$(this).addClass("on-na");
		});
		$("#baobiaoUlId li").eq(0).click();
		
	},
	// open报表弹出框。
	openDialog : function () {
		Report.init();
		$("#tableWeituo > tbody").html("");
		$("#paperWeituo").html("");
		$('#leftBaobiao').dialog('open');
	},
	// 报表初始化
	init : function() {
		Report.initArray();
		// 报表DIV show()
		$('#leftBaobiao').dialog({
			closeOnEscape: false,
			autoOpen: false,
			height:420,
			width:990,
			title:i18n.report.tablename,
			resizable: false,
			modal: true
		});
		
	},
	
	initArray:function() {//
		//重設報表環境
		$("#tableWeituo > tbody").html("");
		$("#paperWeituo").html("");
		
		$("#tableTradeReport > tbody").html("");
		$("#paperTradeReport").html("");

		$("#tableProfitReport > tbody").html("");
		$("#paperProfitReport").html("");
		
		$("#tableBalanceReport > tbody").html("");
		$("#paperBalanceReport").html("");

		$("#tableCashBackReport > tbody").html("");
		$("#paperCashBackReport").html("");
		
		$('[id="productId"]').val("");
		$('[id="dealType"]').val("");
		$("#cusTranCode").val("");
		$("#rebateType").val("1");
		
		var currentDateStr = Util.getSimpleTime(new Date(), "yyyy-MM-dd");
		if(typeof SystemTime != 'undefined' && SystemTime != null) {
			currentDateStr = Util.getSimpleTime(SystemTime.time, "yyyy-MM-dd");
		}
		$('[id$="_beiginTime"]').val(currentDateStr);
		$('[id$="_endTime"]').val(currentDateStr);
	}
};

// 报表初始化。
$(function() {
	Report.init();
	Report.tabClick();	
	//*************************** 查詢  ******************************//
	//點擊查詢: 委托記錄
	$("#searchWeituoHref").click(function() {
		$("#pageNoWeituo").val("1");
		populate('areaWeituo');
	});
	
	//點擊查詢: 成交记录
	$("#searchTradeReportHref").click(function() {
		$("#pageNoTradeReport").val("1");
		populate('areaTradeReport');
	});
	
	//點擊查詢: 盈亏记录
	$("#searchProfitReportHref").click(function() {
		$("#pageNoProfitReport").val("1");
		populate('areaProfitReport');
	});
	
	//點擊查詢: 额度记录
	$("#searchBalanceReportHref").click(function() {
		$("#pageNoBalanceReport").val("1");
		populate('areaBalanceReport');
	});
	
	//點擊查詢: 优惠记录
	$("#searchCashBackReportHref").click(function() {
		$("#pageNoRebateReport").val("1");
		populate('areaCashBackReport');
	});
	
	
	//*************************** 下載  ******************************//
	//點擊下載: 委托記錄
	$("#downloadWeituoHref").click(function() {
		downloadReport('areaWeituo', 'downloadWeituo');
	});
	
	//點擊下載: 成交记录
	$("#downloadTradeReportHref").click(function() {
		downloadReport('areaTradeReport', 'downloadTradeReport');
	});
	
	//點擊下載: 盈亏记录
	$("#downloadProfitReportHref").click(function() {
		downloadReport('areaProfitReport', 'downloadProfitReport');
	});
	
	//點擊下載: 额度记录
	$("#downloadBalanceReportHref").click(function() {
		downloadReport('areaBalanceReport', 'downloadBalanceReport');
	});
	
	//點擊下載: 优惠记录
	$("#downloadCashBackReportHref").click(function() {
		downloadReport('areaCashBackReport', 'downloadCashBackReport');
	});
	
	function downloadReport(id, type){
	var inputData = getJsonByDivArea(id);
		var pageNo = $("#pageNoWeituo").val();
		inputData = inputData + '&' + 'pangeNo=' + pageNo;
		inputData = inputData + '&' + 'pageCount=' +pageCount;
		var downloadiframe = document.getElementById("downloadiframe");
		var url = 'downloadReport.action?reportType='+ type + '&'+inputData +'&_d='+(new Date()).getTime();
		$.get( url, function () {
			downloadiframe.src = url;
		}).error( function () { 
			sessionInvalidLogout();
			
		});
		
	}
	
	
	function sessionInvalidLogout() {
		alert("Invalid session, please login again!");
		browserHistory.setKey(browserHistory.logoutKey);
		location.href="LogOff.action";
	};
	
	$('.left-nav1').on('click', function() {
		Report.openDialog();
	});
	
	
	function populate(divId){
		if('areaWeituo' == divId){
			populateWeituo();
		}else if('areaTradeReport' == divId){
			populateTradeReport();
		}else if('areaProfitReport' == divId){
			populateProfitReport();
		}else if('areaBalanceReport' == divId){
			populateBalanceReport();
		}else if('areaCashBackReport' == divId){
			populateCashBackReport();
		}
	}
	
	function getJsonByDivArea(divAreaId){
		var json = '';
		var queryWhere = [];
		$('input,select',$('#'+divAreaId)).each(function(){
			if($(this).attr("disabled")!='disabled'){
				var length = queryWhere;
				queryWhere[length] = {};
				if ($(this).attr('name')) {
					if($(this).is('input'))
					{	
						queryWhere[length][$(this).attr('name')] = $(this).val();
						json = json + '&' + $(this).attr('name') + '=' +  $(this).val();
					}else if($(this).is('select'))
					{
						json = json + '&'  + $(this).attr('name') + '=' +  $(this).val();
					}
				}
			}
		});
		return json +'&_d='+(new Date()).getTime();
	}
	
	//委托報表
	function populateWeituo(){
		var json = getJsonByDivArea('areaWeituo');
		var pageNo = $("#pageNoWeituo").val();
		json = json + '&' + 'pangeNo=' + pageNo;
		json = json + '&' + 'pageCount=' +pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchWeituo',
			data: json,
			timeout:10000,
			type: 'get',
			success: function(json){
				
					var rows = json;
		
					if(Util.isEmpty(rows) || Util.isEmpty(rows.returnObj)){
						rows = "";
					}
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					rows=rows == ""? [] :rows.returnObj[0].list;
					
					var weiTao2Array = new Object2Array({
					"orderId": function(data){ return data.substr(data.length - 6);}, // 委托号
					"validflag": function(data, obj){
						
						if(data == 1){
							return i18n.dynamic.advpending;
						}else{
							if(obj.optype == '1'){
								return i18n.report.limitPrice;
							}else if(obj.optype == '2'){
								return i18n.report.stopLoss;
							}else if(obj.optype == '3'){
								return i18n.report.autoChange;
							}else if(obj.optype == '0' || obj.optype == '4'){
								return i18n.report.marketPrice;
							}else{
								return "";
							}
						}
					},
					"direction": function(data){return (data == 'open') ? i18n.openposition:i18n.closeposition;}, // 类别 //
					"productId": function(data){return (data == 0) ? i18n.llg : i18n.lls;}, // 产品
					"ordertype": function(data){return (data == 0) ? i18n.report.buy:i18n.report.sell;},
					
					"lot": function(data){return Util.fixToStrTwodecimal(data);},// 手數
					"limitprice": function(data,obj){return Util.isEmpty(data)? '':  Util.formatPriceByPrdcode(obj.productId ,data);},  // 限价
					"price": function(data,obj){return (Util.isEmpty(data) || data<0.0001)?'': Util.formatPriceByPrdcode(obj.productId ,data);}, //止蝕
					
					"flag": function(data){
						var result = '';
						if(data == -1 || data ==-7 || data == -8){
							result = i18n.report.manCancel;
						}else if(data < -1){
							result = i18n.report.systemCancel;
						}else{
							result = i18n.report.execution;
						}
						return result;}, //狀態
					"validtype": function(data){
						var result = '';
						if(data==0){
							result = i18n.pendingorder.day;  
						}else {
							result =i18n.pendingorder.week;
						}
						return result;}, //期限
					"opentime": function(data){
						
						if(Util.isEmpty(data)){
							return '';
						}else{
							return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
						}
						}, // 委托時間
					"invalidtime": function(data){
						if(Util.isEmpty(data)){
							return '';
						}else{
							return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
						}
						
						}, // 執行時間
					"borderId": function(data){return data.substr(data.length - 6);}, // 訂單號
					"closeOrderId": function(data){return data.substr(data.length - 6);} // 平倉號
					}).toArrays(rows);
					$('#tableWeituo').dataTable({
						"aaData": weiTao2Array,
						"sScrollY": "200px",
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						"bAutoWidth": false,
						"bDestroy":true,
						"bSort": false,
				        "asStripeClasses": ['','tr-bg']
					} );
		
					
					var totalPage =  Math.ceil(totalResult/pageCount);
					drawPager('paperWeituo', 'pageNoWeituo', totalPage, totalResult,'areaWeituo');

					classPaper('paperWeituo', 'pageNoWeituo', totalPage, totalResult);
			},error : function(){
				sessionInvalidLogout();
			}

		});
	}
	
	//成交報表
	function populateTradeReport(){
		var json = getJsonByDivArea('areaTradeReport');
		var pageNo = $("#pageNoTradeReport").val();
		json = json + '&' + 'pangeNo=' + pageNo;
		json = json + '&' + 'pageCount=' +pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchTradeReport',
			data: json,
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					if(Util.isEmpty(rows) || Util.isEmpty(rows.returnObj)){
						rows = "";
					}
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					rows=rows == ""? [] :rows.returnObj[0].list;
					
					var trade2Array = new Object2Array({
						"tradetime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							
						}, 
						"orderid": function(data){ return data.substr(data.length - 6);}, 
						"type1": function(data, obj){ 
							if(obj.advancedConsign =="1"){
								return i18n.report.advancedCommissioned;
							}else{
								if(obj.optype == '1'){
									return i18n.report.limitPrice;
								}else if(obj.optype == '2'){
									return i18n.report.stopLoss;
								}else if(obj.optype == '3'){
									return i18n.report.autoChange;
								}else if(obj.optype == '0' || obj.optype == '4'){
									return i18n.report.marketPrice;
								}else{
									return "";
								}
								
							}
						}, 
						"consigntype": function(data){ return (data == 'open') ? i18n.openposition:i18n.closeposition;}, 
						"productcode": function(data){return (data == '022') ? i18n.llg:i18n.lls;}, 
						"ordertype": function(data){ return (data == 0) ? i18n.report.buy:i18n.report.sell;}, 
						"lot": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"tradeprice": function(data, obj){ return Util.formatPriceByPrdcode(obj.productcode ,data);}, 
						"priceseq": function(data, obj){
							var displayTickCode = '------';
							var tickCode='';
							if(data!=''){
								displayTickCode = data;
								tickCode = data;
							}
							var tmpDate = new Date();
							tmpDate.setYear(2014);
							tmpDate.setMonth(6);
							tmpDate.setDate(19);
							var tmpTime = tmpDate.getTime();
							var currentTime = obj.tradetime.time;
							if(currentTime<tmpTime){
								displayTickCode = '------';
								tickCode = '-1';
							}
							return "<a productcode='"+obj.productcode+"' class='baoj-num' name='priceseq_btn' orderid='"+obj.orderid+"' quoteTime='"+Util.getSimpleTime(new Date(obj.tradetime.time), "yyyy-MM-dd hh:mm:ss")+"' tickCode='"+tickCode+"' >"+displayTickCode+"</a>";},
						"closeorderid": function(data){ return data.substr(data.length - 6);}, 
						"cgse_code": function(data){ return (data.indexOf("REJECT")!=-1) ? "" : data;}, 
						"cgse_fee": function(data){ return $.isNumeric(data) && parseFloat(data) != 0 ? Util.fixToStrTwodecimal(data) + " USD" :"";	}, 
						"channel": function(data){ return data == "8"?i18n.report.emergencyClose:"";}
						
					}).toArrays(rows);
					
					//Log.debug(trade2Array);
					$('#tableTradeReport').dataTable({
						"aaData": trade2Array,
						"sScrollY": "200px",
						"bScrollCollapse": false,
						"bPaginate": false,
						"bFilter": false,
						"bDestroy":true,
						"bInfo": false,
						"bSort": false,
				        "asStripeClasses": ['','tr-bg'],
				        "fnDrawCallback": function(){
				        	$("[name='priceseq_btn']").on("click",showPriceSeqs);
				        }
					} );
		
					
					var totalPage =  Math.ceil(totalResult/pageCount);
					drawPager('paperTradeReport', 'pageNoTradeReport', totalPage, totalResult,'areaTradeReport');

					classPaper('paperTradeReport', 'pageNoTradeReport', totalPage, totalResult);
			},error : function(){
				alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	}
	
	function showPriceSeqs(){
		var tickCode = $(this).attr("tickCode");//报价编号
		var quoteTime = $(this).attr("quoteTime");//报价时间
		var orderid = $(this).attr("orderid");//orderid
		var productcode = $(this).attr("productcode");//productcode
		//如果是demo帐号,不显示历史报价,给提示
		var usertype = $("#usertype").val();
		if(usertype==1){//模擬帳戶
			Alert(i18n.tickhistorydemoalert);
			return;
		}
		//报价序号为空也不显示
		if(tickCode==''){
			Alert(i18n.tickhistoryurgenclose);
			return;
		}
		//报价序号为空也不显示
		if(tickCode=='-1'){
			Alert(i18n.tickhistorynotallowed);
			return;
		}
		orderid = orderid.substr(orderid.length - 6);
		if(!checkTickHistoryValidation(quoteTime)){
			Alert(i18n.report.ticknotavalible);
			return false;
		}
		$( "#priceSeq_dialog" ).dialog({
			width:596,
			modal: true,
			title: tickCode+i18n.tickhistorytitle
			});
		$("#priceSeq_dialog_cls_btn").on("click", function(){$( "#priceSeq_dialog" ).dialog("close");});
		$("#table_tickhistory_list").empty();
		//取数
		$.ajax ({ 
			url: 'QuoteHistory.action?quoteTime='+quoteTime+'&tickCode='+tickCode,
			timeout:10000,
			type: 'get',
			success: function(tickArray){
				displayTickHistoryList(tickArray, tickCode, productcode);
			}});
		
		//展示tick的历史报价
		function displayTickHistoryList(tickArray, selectedTickCode, productcode){
			$("#table_tickhistory_list").empty();
			var lastAsk=null;
			var isFirstTick = true;
			var isUp = null;//和上一口价格比是涨还是跌?
			for(var i=0;i<tickArray.length;i++){
				var tickHistoryObj = tickArray[i];
				var ask = Util.formatPriceByPrdcode(productcode, tickHistoryObj.ask);
				var bid = Util.formatPriceByPrdcode(productcode, tickHistoryObj.bid);
				if(lastAsk==null){
					lastAsk = ask;
				}else{
					isFirstTick=false;
					if(ask>lastAsk){ //涨
						isUp=true;
					}else if(ask<lastAsk){ //涨
						isUp=false;
					}else{//跌
						isUp=null;
					}
					lastAsk = ask;
				}
				var tickSeq = tickHistoryObj.tickCode;
				var tickTime = Util.getSimpleTime(new Date(tickHistoryObj.bidtime.time), "yyyy-MM-dd hh:mm:ss");
				
				var htmlTemplate = "<tr><td width='122'>{0}</td><td width='180'>{1}</td><td>{2}</td></tr>";
				
				if(selectedTickCode == tickSeq){
					htmlTemplate = "<tr class='tr-bg-on'><td width='122'>{0}</td><td width='180'>{1}</td><td>{2}</td></tr>";
				}
				var priceHtml;
				if(isUp==true){
					priceHtml = "<span style='color:#00bb13'>"+ask+" / "+bid+"&uarr;</span>"; //涨
				}else if(isUp==false){
					priceHtml = "<span style='color:#931B1C'>"+ask+" / "+bid+"&darr;</span>"; //跌
				}else{
					priceHtml = "<span>"+ask+" / "+bid+"</span>"; //跌
				}
				var htmlText = htmlTemplate.format(tickSeq, tickTime,  priceHtml);
				$("#table_tickhistory_list").append(htmlText);
			}
			$("#tick_history_scroll").scrollTop(258);
		}
		
		//10后的报价报价才能查看
		function checkTickHistoryValidation(quoteTime){
			quoteTime = quoteTime.replace(/-/g, '/');
			var tickTime = new Date(quoteTime);
			var min = tickTime.getMinutes();
			tickTime.setMinutes(min+10);
			var currentTime = new Date(SystemTime.time);
			if(currentTime<tickTime){
				return false;
			}
			return true;
		}
	}
	
	//盈亏记录
	function populateProfitReport(){
		var json = getJsonByDivArea('areaProfitReport');
		var pageNo = $("#pageNoProfitReport").val();
		json = json + '&' + 'pangeNo=' + pageNo;
		json = json + '&' + 'pageCount=' +pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchProfitReport',
			data: json,
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					if(Util.isEmpty(rows) || Util.isEmpty(rows.returnObj)){
						rows = "";
					}
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					
					
					var weiTao2Array = new Object2Array({
						"productcode": function(data){return (data == '022') ? i18n.llg:i18n.lls;}, 
						"type1": function(data, obj){ 
							if(obj.advancedConsign =="1"){
								return i18n.report.advancedCommissioned;
							}else{
								if(obj.optype == '1'){
									return i18n.report.limitPrice;
								}else if(obj.optype == '2'){
									return i18n.report.stopLoss;
								}else if(obj.optype == '3'){
									return i18n.report.autoChange;
								}else if(obj.optype == '0' || obj.optype == '4'){
									return i18n.report.marketPrice; 
								}else{
									return "";
								}
								
							}
						}, 
						"orderid": function(data){ return data.substr(data.length - 6);}, 
						"ordertype": function(data){ return (data == 0) ? i18n.report.sell:i18n.report.buy;}, 
						"lot": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"closedprice": function(data, obj){ return Util.formatPriceByPrdcode(obj.productcode, data);}, 
						"borderid": function(data){ return data.substr(data.length - 6);}, 
						"oldlot": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"openedprice": function(data, obj){return Util.formatPriceByPrdcode(obj.productcode, data);}, 
						"interest": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"profit": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"cashback": function(data){ return (data < 0.0001)?"0.00":Util.fixToStrTwodecimal(data);}, 
						"openedtime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							}, 
						"closedtime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							}, 
						"remark": function(data){ return (data > 3 || data < 0)?i18n.report.systemClose:"";}
					}).toArrays(rows);
					$('#tableProfitReport').dataTable({
						"aaData": weiTao2Array,
						"sScrollY": "200px",
						"bScrollCollapse": false,
						"bPaginate": false,
						"bFilter": false,
						"bDestroy":true,
						"bInfo": false,
						"bSort": false,
				        "asStripeClasses": ['','tr-bg']
					} );
		            
					$('#tableProfitReport').dataTable().fnAddData( [i18n.report.subtotal,"","","",
					                                                  	Util.fixToStrTwodecimal(pagingObj.pageclosedlot),"","",
						                              					Util.fixToStrTwodecimal(pagingObj.pageopenlot),"",
						                              					Util.fixToStrTwodecimal(pagingObj.pageinterest),
						                              					Util.fixToStrTwodecimal(pagingObj.pageprofit),
						                              					Util.fixToStrTwodecimal(pagingObj.pagecashback),
						                              					"","",""
					                                                  ]);
					$('#tableProfitReport').dataTable().fnAddData( [i18n.report.total,"","","",
					                                                  	Util.fixToStrTwodecimal(pagingObj.totalclosedlot),"","",
						                              					Util.fixToStrTwodecimal(pagingObj.totalopenlot),"",
						                              					Util.fixToStrTwodecimal(pagingObj.totalinterest),
						                              					Util.fixToStrTwodecimal(pagingObj.totalprofit),
						                              					Util.fixToStrTwodecimal(pagingObj.totalcashback),
						                              					"","",""
					                                                  ]);
					var totalPage =  Math.ceil(totalResult/pageCount);
					drawPager('paperProfitReport', 'pageNoProfitReport', totalPage, totalResult,'areaProfitReport');

					classPaper('paperProfitReport', 'pageNoProfitReport', totalPage, totalResult);
			},error : function(){
				alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	}
	
	//额度记录
	function populateBalanceReport(){
		var json = getJsonByDivArea('areaBalanceReport');
		var pageNo = $("#pageNoBalanceReport").val();
		json = json + '&' + 'pangeNo=' + pageNo;
		json = json + '&' + 'pageCount=' +pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchBalanceReport',
			data: json,
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					if(Util.isEmpty(rows) || Util.isEmpty(rows.returnObj)){
						rows = "";
					}
				
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					var weiTao2Array = new Object2Array({
						"jointime": function(data){
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							}, 
						"code": function(data){ return getTranCodeValue(data);}, 
						"src_amount": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"income": function(data){ return 0==data?'': Util.fixToStrTwodecimal(data);}, 
						"expend": function(data){ return 0==data?'':Util.fixToStrTwodecimal(data);}, 
						"dst_amount": function(data){ return Util.fixToStrTwodecimal(data);}, 
						"tradeno": function(data){ return  data.substr(data.length - 6);}, 
						"remark": function(data){ return data;}
					}).toArrays(rows);
					$('#tableBalanceReport').dataTable({
						"aaData": weiTao2Array,
						"sScrollY": "200px",
						"bScrollCollapse": false,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						"bDestroy":true,
						"bSort": false,
				        "asStripeClasses": ['','tr-bg']
					} );
		
					
					$('#tableBalanceReport').dataTable().fnAddData( ["",
					                                                  i18n.report.subtotal,"",
					                                                  Util.fixToStrTwodecimal(pagingObj.pageincome),
					                                                  Util.fixToStrTwodecimal(pagingObj.pageexpend),
					                                                  "","",""
					                                                  ]);
					$('#tableBalanceReport').dataTable().fnAddData( ["",
					                                                  i18n.report.total,"",
					                                                  Util.fixToStrTwodecimal(pagingObj.totalincome),
					                                                  Util.fixToStrTwodecimal(pagingObj.totalexpend),
					                                                  "","",""
					                                                  ]);
					
					var totalPage =  Math.ceil(totalResult/pageCount);
					drawPager('paperBalanceReport', 'pageNoBalanceReport', totalPage, totalResult,'areaBalanceReport');

					classPaper('paperBalanceReport', 'pageNoBalanceReport', totalPage, totalResult);
			},error : function(){
				alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	}
	
	//优惠记录
	function populateCashBackReport(){
		var json = getJsonByDivArea('areaCashBackReport');
		var pageNo = $("#pageNoCashBackReport").val();
		json = json + '&' + 'pangeNo=' + pageNo;
		json = json + '&' + 'pageCount=' +pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchCashBackReport',
			data: json,
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					if(Util.isEmpty(rows) || Util.isEmpty(rows.returnObj)){
						rows = "";
					}
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					
					console.log(rows);
					var weiTao2Array = new Object2Array({
						"temp_method": function(data, obj){ 
							
							if(obj.cashbacktype ==1 ){//回贈
								if(obj.method == 1)return i18n.report.departmemtDonatedMoney;
								else if(obj.method == 2)return i18n.report.networkDonatedMone;
							}else if(obj.cashbacktype == 2 ){//代幣
								//1代币存入 2代币到期 3代币佣金 4代币盈亏 5代币经纪佣金
								if(obj.method == 1) return i18n.report.tokenDeposit;
								else if(obj.method == 2) return i18n.report.tokenExpire;
								else if(obj.method == 3) return i18n.report.tokenCommission;
								else if(obj.method == 4) return i18n.report.tokenProfit;
								else if(obj.method == 5) return i18n.report.tokenBrokerage;
								
							} else return "";
						}, 
						"temp_tradedate": function(data,obj){ 
							//代幣
							if(obj.cashbacktype ==2 ){
								
								if(Util.isEmpty(obj.jointime)){
									return '';
								}else{
									return Util.getSimpleTime(new Date(obj.jointime.time), "yyyy-MM-dd hh:mm:ss");
								}
								
							}else{
								return "";
							}
						}, 
						"amountPL": function(data){ return data;}, 
						"backlot": function(data){ return data;}, 
						"usedlot": function(data){ return data;}, 
						"ablelot": function(data){ return data;}, 
						"ableamount": function(data){ return data;}, 
						"deadline": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd");
							}
							}
					}).toArrays(rows);
					$('#tableCashBackReport').dataTable({
						"aaData": weiTao2Array,
						"sScrollY": "200px",
						"bScrollCollapse": false,
						"bPaginate": false,
						"bFilter": false,
						"bDestroy":true,
						"bInfo": false,
						"bSort": false,
				        "asStripeClasses": ['','tr-bg']
					} );
		
					$('#tableCashBackReport').dataTable().fnAddData( [i18n.report.consignReporttotalname,"","","","","",
				                                                  	Util.fixToStrTwodecimal(pagingObj.totalAbleamount),""
				                                                  ]);
					
					var totalPage =  Math.ceil(totalResult/pageCount);
					drawPager('paperCashBackReport', 'pageNoCashBackReport', totalPage, totalResult,'areaCashBackReport');

					classPaper('paperCashBackReport', 'pageNoCashBackReport', totalPage, totalResult);
			},error : function(){
				alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	}
	
	
	
	
	function classPaper(pagingDivId, pageNoId, totalPage, totalCount) {
		
		var pageNo = $("#"+pageNoId).val();
		
		var showPageNo;
		
		if(totalCount == 0){
			showPageNo = 0;
			
		}else if(totalCount>0 && pageNo ==0){
			showPageNo = 1;
		}else{
			showPageNo = pageNo;
		}
		
		$('#currentPageId',$("#"+pagingDivId)).html('<strong>'+ showPageNo +'</strong>/'+ totalPage + i18n.report.page);
		$('#totalCountId',$("#"+pagingDivId)).html(totalCount);
		$(".dataTables_empty").html(i18n.report.noRecord);
	}
	
	function drawPager(pagingDivId, pageNoId, totalPage,totalCount, areadivId ){ // 渲染分页区域
		
		var input = document.createElement('input');
		input.id = 'pageJumping';
		$(input).attr('class', 'pa-input');
		
		if(totalCount >0){
			
			$(input).val($("#"+pageNoId).val()) ;
		}
		
		var submitA = document.createElement('a');
		submitA.id='page_submitId';
		$(submitA).attr('href', 'javascript:');
		$(submitA).attr('class', 'pa-btn');
		$(submitA).append(i18n.report.submit);
		
		var subSpan = document.createElement('span');
		$(subSpan).attr('class', 'go-page fr');
		$(subSpan).append(i18n.report.dao+'&nbsp;&nbsp;');
		$(subSpan).append(input);
		$(subSpan).append(i18n.report.ye+'&nbsp;&nbsp;');
		$(subSpan).append(submitA);
		
		var last = document.createElement('a');
		last.id='page_lastId';
		$(last).attr('href', 'javascript:');
		$(last).attr('class', 'next-n fr');
		$(last).append(i18n.report.weiye+'&nbsp;');
		
		var next = document.createElement('a');
		next.id='page_nextId';
		$(next).attr('href', 'javascript:');
		$(next).attr('class', 'next-n fr');
		$(next).append(i18n.report.nextPage+'&nbsp;&gt;');
		
		var prev = document.createElement('a');
		prev.id='page_prevId';
		$(prev).attr('href', 'javascript:');
		$(prev).attr('class', 'next-n fr');
		$(prev).append('&lt; '+i18n.report.prevPage);
		
		var first = document.createElement('a');
		first.id='page_firstId';
		$(first).attr('href', 'javascript:');
		$(first).attr('class', 'next-n fr');
		$(first).append('&nbsp;'+i18n.report.headPage);
		
		
		var paperDiv = document.getElementById(pagingDivId);
//		//按钮监听
		$(next).click(function () {
			
			changePage('next', pageNoId, totalPage, pagingDivId,areadivId);
		});
		$(prev).click(function () {
			changePage('prev',pageNoId, totalPage, pagingDivId, areadivId);
		});
		$(first).click(function () {
			changePage('first', pageNoId, totalPage, pagingDivId, areadivId);
		});
		$(last).click(function () {
			changePage('last', pageNoId, totalPage, pagingDivId,areadivId);
		});
		$(submitA).click(function(){
			changePage('input', pageNoId, totalPage, pagingDivId, areadivId);
		});
		
		$(paperDiv).children().remove();
		$(paperDiv).append(subSpan);
		$(paperDiv).append(last);
		$(paperDiv).append(next);
//		$(paperDiv).append('<div class="page-list fr"><a href="javascript:" class="p-click">1</a></div>');
		$(paperDiv).append(prev);
		$(paperDiv).append(first);
		$(paperDiv).append('<span class="total-y fr" id="currentPageId"><strong>0</strong>/0'+i18n.report.page+'</span>'
							+	'<span class="record-y fr">共<strong id="totalCountId">0</strong>'+i18n.report.noOfRecord+'</span>'
							+	'<span class="fr">'+i18n.report.success+'</span>');
	}
	
	
	function changePage (type, pageNoId, totalPage, pagingDivId, areadivId){ // 首页、上一页、下一页、尾页 调转 点击后触发事件
		var pageNo = $("#"+pageNoId).val();
		if (pageNo == 0) { // 若没点击查询按钮，则（首页、上一页、下一页、尾页 调转）不跳转。
			return;
		}
		
		var input = $("#pageJumping",$("#"+pagingDivId));
		
		switch (type) {
			case 'first':
				if(pageNo != 1){
					pageNo = 1;
					input.val('1');
				}else return false;
				break;
			case 'prev':
				if (pageNo > 1) {
					pageNo = parseInt(pageNo) - 1;
					input.val(pageNo);
				}else return false;
				break;
			case 'next':
				
				if (pageNo < totalPage) {
					pageNo = parseInt(pageNo) + 1;
					input.val(pageNo);
				}else return false;
				break;
			case 'last':
				if(pageNo != totalPage){
					pageNo = totalPage;
					input.val(totalPage);
				}else return false;
				break;
			case 'input':
				var pageNumber = parseInt(input.val());
				if(isNaN(pageNumber)){
					pageNumber = 1;
				}
				if(pageNumber < 1){
					pageNumber = 1;
				}else if (pageNumber > totalPage){
					pageNumber = totalPage;
				}
				pageNo = pageNumber;
				input.val(pageNumber);
				break;
		}
		
		 $("#"+pageNoId).val(input.val());
		
		populate(areadivId);
		input.val($("#"+pageNoId).val());
	}
	
	
	
	$('select[name=productId]', $("#leftBaobiao")).each(function() {
		$(this).children().remove();
		for (var i=0; i < productArray.length; i ++) {
			var option = document.createElement('option');
			$(option).attr('value', productArray[i].value);
			$(option).append(productArray[i].name);
			$(this).append(option);
		}
	});
	
	$('select[name=dealType]', $("#leftBaobiao")).each(function() {
		$(this).children().remove();
		for (var i=0; i < entryArray.length; i ++) {
			var option = document.createElement('option');
			$(option).attr('value', entryArray[i].value);
			$(option).append(entryArray[i].name);
			$(this).append(option);
		}
	});
	
	
	$('select[name=cusTranCode]', $("#leftBaobiao")).each(function() {
		$(this).children().remove();
		for (var i=0; i < cusTranCodeArray.length; i ++) {
			var option = document.createElement('option');
			$(option).attr('value', cusTranCodeArray[i].value);
			$(option).append(cusTranCodeArray[i].name);
			$(this).append(option);
		}
	});
	
	$('select[name=rebateType]', $("#leftBaobiao")).each(function() {
		$(this).children().remove();
		for (var i=0; i < rebateTypeArray.length; i ++) {
			var option = document.createElement('option');
			$(option).attr('value', rebateTypeArray[i].value);
			$(option).append(rebateTypeArray[i].name);
			$(this).append(option);
		}
	});
	
	
	function getTranCodeValue(key){
		return transCodeMap[key];
	}
	
	
	var transCodeMap = {
			"NETPAY":i18n.report.deposit,
			"MDEPOSIT":i18n.report.deposit,
			"CANCELDRAW":i18n.report.deposit,
			"WITHDRAW":i18n.report.withdrawals,
			"PC":i18n.report.profit,
			"FEE":i18n.report.fee,
			"FEE_MA_FAULT":i18n.report.fee,
			"FEE_MA_DEPOSIT":i18n.report.fee,
			"FEE_MA_WITH":i18n.report.fee,
			"FEE_MA_CLEAR":i18n.report.fee,
			"FEE_MA_TRANSFER":i18n.report.fee,
			"FEE_MA_ST":i18n.report.fee,
			"FEE_MA_COMMIS":i18n.report.fee,
			"FEE_MA_WPRICE":i18n.report.fee,
			"FEE_MA_OTHER":i18n.report.fee,
			"FEE_MONEYADJUST":i18n.report.fee,
			"BET_YJ":i18n.report.commission,
			"PC_YJ":i18n.report.commission,
			"SYSCLEARZERO":i18n.report.systemCleared,
			"CASH_BACK":i18n.report.cashback,
			"COUPON_IN":i18n.report.tokenDiscount,
			"COUPON_OUT":i18n.report.TokenExpire,
			"AC_DRAW":i18n.report.autoCancelWithdrawal,
			"FEE_SYSADJUST":i18n.report.specialAdjustment,
			"PRESENT":i18n.report.preferential,
			"TRANS_OUT":i18n.report.transfer,
			"TRANS_IN":i18n.report.transfer,
			"CGSE_FEE":i18n.report.cgsefee,
			"MISPAID_PAYMENT":i18n.report.mispayCgseFee,
			"PC_CB":i18n.report.grants,
			"BFN":i18n.report.rebate,
			"BFP":i18n.report.rebate,
			"BFA":i18n.report.rebate,
			"FEE_BFA_MOD":i18n.report.rebate,
			"BFD":i18n.report.rebate,
			"FEE_BFD_MOD":i18n.report.rebate,
			"FEE_PT_MOD":i18n.report.grantsGuarantee,
			"PT":i18n.report.grantsGuarantee
	};
	
	
});
