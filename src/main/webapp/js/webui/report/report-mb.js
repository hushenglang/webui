/****************************************************
 * 功能说明：报表操作
 * 日期：2014-04-25
 * 作者：James.pu
 ***************************************************/
/**
 * 初始化
 */
$(function() {
	//绑定事件(如放在init()中则会多次绑定)
	Report.btnEventBind();
});

/*
 * 报表类
 */
var Report = {
    tmpData:null,
	/**每页显示条数**/
	pageCount:10,
	/**额度记录项目代码**/
	transCodeMap:{
			"NETPAY":"存款",
			"MDEPOSIT":"存款",
			"CANCELDRAW":"存款",
			"WITHDRAW":"取款",
			"PC":"盈亏",
			"FEE":"手续费",
			"FEE_MA_FAULT":"手续费",
			"FEE_MA_DEPOSIT":"手续费",
			"FEE_MA_WITH":"手续费",
			"FEE_MA_CLEAR":"手续费",
			"FEE_MA_TRANSFER":"手续费",
			"FEE_MA_ST":"手续费",
			"FEE_MA_COMMIS":"手续费",
			"FEE_MA_WPRICE":"手续费",
			"FEE_MA_OTHER":"手续费",
			"FEE_MONEYADJUST":"手续费",
			"BET_YJ":"佣金",
			"PC_YJ":"佣金",
			"SYSCLEARZERO":"系统清零",
			"CASH_BACK":"回赠金额",
			"COUPON_IN":"代币优惠",
			"COUPON_OUT":"代币到期",
			"AC_DRAW":"自動取消取款",
			"FEE_SYSADJUST":"特殊金额调整",
			"PRESENT":"優惠",
			"TRANS_OUT":"轉賬",
			"TRANS_IN":"轉賬",
			"CGSE_FEE":"交易编码費",
			"MISPAID_PAYMENT":"補繳交易編碼費",
			"PC_CB":"返佣",
			"BFN":"贈金",
			"BFP":"贈金",
			"BFA":"贈金",
			"FEE_BFA_MOD":"贈金",
			"BFD":"贈金",
			"FEE_BFD_MOD":"贈金",
			"PT":"保障优惠",
			"FEE_PT_MOD":"保障优惠"
			
	},
	/**报表初始化及事件绑定**/
	init:function(){
		//清空历史数据
		this.initArray();
	},
	/** 事件绑定**/
	btnEventBind:function(){
		//tab切换事件
		var reportTab=$("#report_tab_container").children("li");
		reportTab.on("click",function(){
			 var indeNum=reportTab.index($(this));  //获取tab标签的索引值
			 $(this).addClass("on-na").siblings().removeClass("on-na");
			 $("#report_content_container").children().eq(indeNum).removeClass("dn").siblings().addClass("dn");
		});	
		//委托记录 查询按钮事件
		$("#report_btn_weituo_search").on("click",{obj:this},this.searchWeituo);
		//委托记录 下载 按钮事件
		$("#report_btn_weituo_download").on("click",{obj:this,id:'report_weituo_where',type:'downloadWeituo'},this.downloadReport);
		
		//成交记录 查询按钮事件
		$("#report_btn_trade_search").on("click",{obj:this},this.searchTrade);
		//成交记录 下载按钮事件
		$("#report_btn_trade_download").on("click",{obj:this,id:'report_trade_where',type:'downloadTradeReport'},this.downloadReport);
		
		//盈亏记录 查询按钮事件
		$("#report_btn_profit_search").on("click",{obj:this},this.searchProfit);
		//盈亏记录 下载按钮事件
		$("#report_btn_profit_download").on("click",{obj:this,id:'report_profit_where',type:'downloadProfitReport'},this.downloadReport);
		
		//额度记录 查询按钮事件
		$("#report_btn_balance_search").on("click",{obj:this},this.searchBalance);
		//额度记录 下载按钮事件
		$("#report_btn_balance_download").on("click",{obj:this,id:'report_balance_where',type:'downloadBalanceReport'},this.downloadReport);
		
		//优惠记录 查询按钮事件
		$("#report_btn_cashback_search").on("click",{obj:this},this.searchCashBack);
		//优惠记录 下载按钮事件
		$("#report_btn_cashback_download").on("click",{obj:this,id:'report_cashback_where',type:'downloadCashBackReport'},this.downloadReport);
		
		//报表详细记录返回事件
		$("#btn_report_detail_back").on("click",function(){
			$("#report_detail_table tbody").html("");
			$("#report_detail_div").hide();
			$("#tickhistory_detail_div").hide();
			$("#report_container_sub").show();
		});
		
		//tickhistory记录返回事件
		$("#btn_tickhistory_detail_back").on("click",function(){
			$("#report_container_sub").hide();
			$("#tickhistory_detail_div").hide();
			$("#report_detail_div").show();
		});
	},
	
	/**清空历史数据**/
	initArray:function() {
		$("#report_weituo_table > tbody").html("");
		
		$("#report_trade_table > tbody").html("");

		$("#report_profit_table > tbody").html("");
		$("[id^='report_profit_subtotal_'],[id^='report_profit_total_']").html("--");
		
		$("#report_balance_table > tbody").html("");
		$("[id^='report_balance_subtotal_'],[id^='report_balance_total_']").html("--");

		$("#report_cashback_table > tbody").html("");
		$("#report_cashback_total_01").html("--");
		
		$('[id="productId"]').val("");
		$('[id="dealType"]').val("");
		$("#cusTranCode").val("");
		$("#rebateType").val("");
		
		var currentDateStr = Util.getSimpleTime(new Date(), "yyyy-MM-dd");
		if(typeof SystemTime != 'undefined' && SystemTime != null) {
			currentDateStr = Util.getSimpleTime(SystemTime.time, "yyyy-MM-dd");
		}
		$('[id$="_beiginTime"]').val(currentDateStr);
		$('[id$="_endTime"]').val(currentDateStr);
	},
	
	/**下载功能**/
	downloadReport:function(event){
		var _id=event.data.id;
		var _type=event.data.type;
		var _this=event.data.obj;
		var inputData = $('#'+_id+' > form').serialize();
		inputData = inputData + '&' + 'pageCount=' +_this.pageCount;

		var downloadiframe = document.getElementById("downloadiframe");
		var url = 'downloadReport.action?reportType='+ _type + '&'+inputData +'&_d='+(new Date()).getTime();
		$.get( url, function () {
			downloadiframe.src = url;
		}).error( function () { 
			this.sessionInvalidLogout();
			
		});
		
	},
	showDetailRow:function(tableTitleId,aData){
	  $("#report_detail_table tbody").html("");
	  for(var i=0;i<aData.length;i++){
		  $("#report_detail_table tbody").append('<tr><th class="t-bnone">'+$(tableTitleId+" span").get(i).innerHTML+'</th><td class="t-bnone r-nonebor">'+aData[i]+'</td></tr>');
		}
	  $("#report_detail_title").html($('#report_tab_container li[class="on-na"]').html());
	  $("#report_container_sub").hide();
	  $("#tickhistory_detail_div").hide();
	  $("#report_detail_div").show();
	  
	  $("[name='priceseq_btn']").on("click",Report.showPriceSeqs);
	  
	},
	//显示历史报价dialog
	showPriceSeqs:function(){
	  var tickCode = $(this).attr("tickCode");//报价编号
	  var quoteTime = $(this).attr("quoteTime");//报价时间
	  var orderid = $(this).attr("orderid");//orderid
	  var productcode = $(this).attr("productcode");//productcode
	  //如果是demo帐号,不显示历史报价,给提示
	  var usertype = $("#usertype").val();
	  if(usertype==1){//模擬帳戶
		Alert(i18n.trade.tickhistorydemoalert);
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
	  $("#tickhistory_detail_title").text(tickCode+i18n.trade.tickhistorytitle);
	  if(!checkTickHistoryValidation(quoteTime)){
			Alert(i18n.report.ticknotavalible);
			return false;
		}
		
	  $("#report_container_sub").hide();
	  $("#report_detail_div").hide();
	  $("#tickhistory_detail_div").show();

	  $("#tickhistory_detail_table tbody").empty();
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
		$("#tickhistory_detail_table tbody").empty();
		
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
			var htmlTemplate = "<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>";
			if(selectedTickCode == tickSeq){
				htmlTemplate = "<tr class='tr-bg-on'><td>{0}</td><td>{1}</td><td >{2}</td></tr>";
			}
			var priceHtml;
			if(isUp==true){
				priceHtml = "<span style='color:#00bb13'>"+ask+" / "+bid+"&uarr;</span>"; //涨
			}else if(isUp==false){
				priceHtml = "<span style='color:#931B1C'>"+ask+" / "+bid+"&darr;</span>"; //跌
			}else{
				priceHtml = "<span>"+ask+" / "+bid+"</span>"; //跌
			}
			
			var htmlText = htmlTemplate.format(tickSeq, tickTime, priceHtml);
			$("#tickhistory_detail_table tbody").append(htmlText);
		}
		
		$("#index_report_container").scrollTop(560);
	  }
	  
	//10后的报价报价才能查看
	  function checkTickHistoryValidation(quoteTime){
		var tickTime = new Date(quoteTime);
		var min = tickTime.getMinutes();
		tickTime.setMinutes(min+10);
		var currentTime = new Date(SystemTime.time);
		if(currentTime<tickTime){
			return false;
		}
		return true;
	  }
	
	},
	
	/**委托记录**/
	searchWeituo:function(event){
		var _this=event.data.obj;
		var json = $('#report_weituo_where > form').serialize();
		json = json + '&' + 'pageCount=' +_this.pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchWeituo',
			data: json +'&_d='+(new Date()).getTime(),
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					rows=rows == ""? [] :rows.returnObj[0].list;
					var weiTao2Array = new Object2Array({
					"orderId": function(data){ return data.substr(data.length - 6);}, // 委托号
					"productId": function(data){return (data == 0) ? i18n.llg:i18n.lls;}, // 产品
					"direction": function(data){return (data == 'open') ? i18n.openposition:i18n.closeposition;}, // 类别 //
					"ordertype": function(data){return (data == 0) ? i18n.report.sell:i18n.report.buy;},
					"validflag": function(data,obj){
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
					"lot": function(data){return Util.isBlank(data)?"--":Util.fixToStrTwodecimal(data);},// 手數
					"limitprice": function(data, obj){return Util.isBlank(data)?"--":Util.formatPriceByPrdcode(obj.productId ,data);},  // 限价
					"price": function(data, obj){return (Util.isBlank(data)||data<0.0001)?"--":Util.formatPriceByPrdcode(obj.productId ,data);}, //止蝕
					
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
							result = i18n.report.effectiveInDate;  //
						}else {
							result =i18n.report.effectiveInWeekly;
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
					$('#report_weituo_table').dataTable({
						"aaData": weiTao2Array,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						"bDestroy": true,
						"aaSorting": [],
						"fnRowCallback": function(nRow, aData, iDisplayIndex ) {
							Report.tmpData=aData;
							$(nRow).on('click', function(){
								Report.showDetailRow('#report_weituo_title',aData);
							});
							return nRow;
						}
					} );
					var totalPage =  Math.ceil(totalResult/_this.pageCount);
					$("#totalPagesWeituo").val(totalPage);
					$('#report_weituo_table').dataTable().fnAdjustColumnSizing();
					$(".dataTables_empty").html(i18n.report.noRecord);
			},error : function(){
				Alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	},
	/**成交记录**/
	searchTrade:function(event){
		var _this=event.data.obj;
		var json = $('#report_trade_where > form').serialize();
		json = json + '&' + 'pageCount=' +_this.pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchTradeReport',
			data: json +'&_d='+(new Date()).getTime(),
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					rows=rows == ""? [] :rows.returnObj[0].list;
					
					var trade2Array = new Object2Array({
						"tradetime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							
						}, //交易时间
						"orderid": function(data){ return data.substr(data.length - 6);}, //订单号
						"consigntype": function(data){ return (data == 'open') ? i18n.openposition:i18n.closeposition;}, //类别
						"productcode": function(data){return (data == '022') ? i18n.llg:i18n.lls;}, //产品
						"type1": function(data, obj){ 
							if(obj.advancedConsign =="1"){
								return i18n.report.advancedCommissioned;//进阶委托
							}else{
								if(obj.optype == '1'){
									return i18n.report.limitPrice;//限价
								}else if(obj.optype == '2'){
									return i18n.report.stopLoss;//停损
								}else if(obj.optype == '3'){
									return i18n.report.autoChange;//自动替代
								}else if(obj.optype == '0' || obj.optype == '4'){
									return i18n.report.marketPrice;//市价
								}else{
									return "";
								}
								
							}
						},//类型
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
						"channel": function(data){ return data == "8"?i18n.report.emergencyClose:"";}//8:紧急平仓
						
					}).toArrays(rows);
					
					$('#report_trade_table').dataTable({
						"aaData": trade2Array,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						"bDestroy": true,
						"aaSorting": [],
						"fnRowCallback": function(nRow, aData, iDisplayIndex ) {
							$(nRow).on('click', function(){
								Report.showDetailRow('#report_trade_title',aData);
							});
							return nRow;
						}
					} );
					var totalPage =  Math.ceil(totalResult/_this.pageCount);
					$("#totalPagesTrade").val(totalPage);
					$('#report_trade_table').dataTable().fnAdjustColumnSizing();
					$(".dataTables_empty").html(i18n.report.noRecord);
					
			},error : function(){
				Alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}
			
		});
		
		
	},
	
	/**盈亏记录**/
	searchProfit:function(event){
		var _this=event.data.obj;
		var json = $('#report_profit_where > form').serialize();
		json = json + '&' + 'pageCount=' +_this.pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchProfitReport',
			data: json +'&_d='+(new Date()).getTime(),
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					
					//组装数据
					var weiTao2Array = new Object2Array({
						"productcode": function(data){return (data == '022') ? i18n.llg:i18n.lls;}, //产品
						"closedprice": function(data, obj){ return Util.formatPriceByPrdcode(obj.productcode,data);}, //平仓价格
						"profit": function(data){ return Util.fixToStrTwodecimal(data);},//净盈亏 
						"closedtime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
						}, //平仓时间
						"type1": function(data, obj){ 
							if(obj.advancedConsign =="1"){
								return i18n.dynamic.advpending;
							}else{
								if(obj.optype == '1'){
									return i18n.dynamic.limitprice;
								}else if(obj.optype == '2'){
									return i18n.dynamic.stop;
								}else if(obj.optype == '3'){
									return i18n.dynamic.autoreplace;
								}else if(obj.optype == '0' || obj.optype == '4'){
									return i18n.dynamic.marketprice;
								}else{
									return "";
								}
								
							}
						}, //类型
						"orderid": function(data){ return data.substr(data.length - 6);}, //平仓编号
						"ordertype": function(data){ return (data == 0) ? i18n.report.sell:i18n.report.buy;}, //买卖
						"lot": function(data){ return Util.fixToStrTwodecimal(data);}, //平仓手数
						"borderid": function(data){ return data.substr(data.length - 6);}, //订单编号
						"oldlot": function(data){ return Util.fixToStrTwodecimal(data);}, //开仓手数
						"openedprice": function(data, obj){return Util.formatPriceByPrdcode(obj.productcode,data);}, //开仓价格
						"interest": function(data){ return Util.fixToStrTwodecimal(data);}, //利息
						"cashback": function(data){ return (data < 0.0001)?"0.00":Util.fixToStrTwodecimal(data);},//回赠金价
						"openedtime": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
							}, //开仓时间
						
						"remark": function(data){ return (data > 3 || data < 0)?"系统平仓":"";}//备注
					}).toArrays(rows);
					//列表数据
					$('#report_profit_table').dataTable({
						"aaData": weiTao2Array,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						
						"bDestroy": true,
						"aaSorting": [],
						"fnRowCallback": function(nRow, aData, iDisplayIndex ) {
							$(nRow).on('click', function(){
								Report.showDetailRow('#report_profit_title',aData);
							});
							return nRow;
						}
					}).fnAdjustColumnSizing();
		            //小计
					$("#report_profit_subtotal_01").html(Util.fixToStrTwodecimal(pagingObj.pageclosedlot));//平仓手数
					$("#report_profit_subtotal_02").html(Util.fixToStrTwodecimal(pagingObj.pageopenlot));//开仓手数
					$("#report_profit_subtotal_03").html(Util.fixToStrTwodecimal(pagingObj.pageinterest));//利息
					$("#report_profit_subtotal_04").html(Util.fixToStrTwodecimal(pagingObj.pageprofit));//净盈亏
					/*$("#report_profit_subtotal_05").html(Util.fixToStrTwodecimal(pagingObj.pagecashback));//回赠金价*/					
					//总计
					$("#report_profit_total_01").html(Util.fixToStrTwodecimal(pagingObj.totalclosedlot));//平仓手数
					$("#report_profit_total_02").html(Util.fixToStrTwodecimal(pagingObj.totalopenlot));//开仓手数
					$("#report_profit_total_03").html(Util.fixToStrTwodecimal(pagingObj.totalinterest));//利息
					$("#report_profit_total_04").html(Util.fixToStrTwodecimal(pagingObj.totalprofit));//净盈亏
					//$("#report_profit_total_05").html(Util.fixToStrTwodecimal(pagingObj.totalcashback));//回赠金价
					//分页
					var totalPage =  Math.ceil(totalResult/_this.pageCount);
					$("#totalPagesProfit").val(totalPage);
					$(".dataTables_empty").html(i18n.report.noRecord);
			},error : function(){
				Alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	},
	
	/**额度记录**/
	searchBalance:function(event){
		var _this=event.data.obj;
		var json = $('#report_balance_where > form').serialize();
		json = json + '&' + 'pageCount=' +_this.pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchBalanceReport',
			data: json +'&_d='+(new Date()).getTime(),
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					//组装数据
					var weiTao2Array = new Object2Array({
						"jointime": function(data){
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd hh:mm:ss");
							}
						}, //时间
						"code": function(data){ return _this.transCodeMap[data];}, //项目
						"src_amount": function(data){ return Util.fixToStrTwodecimal(data);}, //交易前账户余额
						"income": function(data){ return Util.fixToStrTwodecimal(data);}, //收入
						"expend": function(data){ return Util.fixToStrTwodecimal(data);}, //支出
						"dst_amount": function(data){ return Util.fixToStrTwodecimal(data);}, //交易后账户余额
						"tradeno": function(data){ return  data.substr(data.length - 6);}, //流水号
						"remark": function(data){ return data;}//备注
					}).toArrays(rows);
					//列表
					$('#report_balance_table').dataTable({
						"aaData": weiTao2Array,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						
						"bDestroy": true,
						"aaSorting": [],
						"fnRowCallback": function(nRow, aData, iDisplayIndex ) {
							$(nRow).on('click', function(){
								Report.showDetailRow('#report_balance_title',aData);
							});
							return nRow;
						}
					} ).fnAdjustColumnSizing();
		
					//小计
					$("#report_balance_subtotal_01").html(Util.fixToStrTwodecimal(pagingObj.pageincome));//收入
					$("#report_balance_subtotal_02").html(Util.fixToStrTwodecimal(pagingObj.pageexpend));//支出
					//总计
					$("#report_balance_total_01").html(Util.fixToStrTwodecimal(pagingObj.totalincome));//收入
					$("#report_balance_total_02").html(Util.fixToStrTwodecimal(pagingObj.totalexpend));//支出
					//分页
					var totalPage =  Math.ceil(totalResult/_this.pageCount);
					$("#totalPagesBalance").val(totalPage);
					$(".dataTables_empty").html(i18n.report.noRecord);
			},error : function(){
				Alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	},
	
	/**优惠记录**/
	searchCashBack:function(event){
		var _this=event.data.obj;
		var json = $('#report_cashback_where > form').serialize();
		json = json + '&' + 'pageCount=' +_this.pageCount;
		$.ajax ({ 
			url: 'ReportForm.action?check=ajax&reportType=searchCashBackReport',
			data: json +'&_d='+(new Date()).getTime(),
			timeout:10000,
			type: 'get',
			success: function(json){
					var rows = json;
					var totalResult = rows == ""? 0: rows.returnObj[0].totalResult;
					var pagingObj = rows == ""? [] :rows.returnObj[0];
					rows = rows == ""? [] :rows.returnObj[0].list;
					//组装数据					
					var weiTao2Array = new Object2Array({
						"temp_method": function(data, obj){ 
							if(obj.cashbacktype ==1 ){//回贈
								if(obj.method == 1)return i18n.report.departmemtDonatedMoney;//'汇赠钱'
								else if(obj.method == 2)return i18n.report.networkDonatedMoney;//'网赠钱'
							}else if(obj.cashbacktype == 2 ){//代幣
								//1代币存入 2代币到期 3代币佣金 4代币盈亏 5代币经纪佣金
								if(obj.method == 1) return i18n.report.tokenDeposit;//"代币优惠"
								else if(obj.method == 2) return i18n.report.tokenExpire;//"代币到期"
								else if(obj.method == 3) return i18n.report.tokenCommission;//"代币佣金"
								else if(obj.method == 4) return i18n.report.tokenProfit;//"代币盈亏"
								else if(obj.method == 5) return i18n.report.tokenBrokerage;//"代币经纪佣金"
								
							} else return "";
						}, //类别
						"ablelot": function(data){ return data;}, //可用优惠手数
						"ableamount": function(data){ return data;}, //可用优惠金额
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
						}, //日期
						"amountPL": function(data){ return data;},//每手优惠金额 
						"backlot": function(data){ return data;},//优惠手数 
						"usedlot": function(data){ return data;},//已用优惠手数/金额
						"deadline": function(data){ 
							if(Util.isEmpty(data)){
								return '';
							}else{
								return Util.getSimpleTime(new Date(data.time), "yyyy-MM-dd");
							}
						}//到期日
					}).toArrays(rows);
					//列表数据
					$('#report_cashback_table').dataTable({
						"aaData": weiTao2Array,
						"bPaginate": false,
						"bFilter": false,
						"bInfo": false,
						"bDestroy": true,
						"fnRowCallback": function(nRow, aData, iDisplayIndex ) {
							$(nRow).on('click', function(){
								Report.showDetailRow('#report_cashback_title',aData);
							});
							return nRow;
						}
					} ).fnAdjustColumnSizing();
		            //可用总金额
					$("#report_cashback_total_01").html(Util.fixToStrTwodecimal(pagingObj.totalAbleamount));
					//分页
					var totalPage =  Math.ceil(totalResult/_this.pageCount);
					$("#totalPagesCashBack").val(totalPage);
					$(".dataTables_empty").html(i18n.report.noRecord);
			},error : function(){
				Alert("Invalid session, please login again!");
				location.href="LogOff.action";
			}

		});
	},
	
	sessionInvalidLogout:function () {
		Alert("Invalid session, please login again!");
		browserHistory.setKey(browserHistory.logoutKey);
		location.href="LogOff.action";
	},
	
	
	gotoPage:function(pageno){
		var a=["searchWeituo","searchTrade","searchProfit","searchBalance","searchCashBack"];
		var _index=0,pages=0,pageNum=0,checkid;
		$("#report_content_container").children().each(function(i){
			if($(this).css("display")=='block'){
				_index=i;
				checkid=$(this).find("input[name=pangeNo]");
				pageNum=$(this).find("input[name=pangeNo]").val();
				pages=$(this).find("input[name=totalPages]").val();
			}
		});
		
	 	if(pageNum == null) {
	 		pageNum = 1;
	 	}
	 	pageNum = new Number(pageNum);
	 	if(pageno=='first') {
	 		pageNum = 1; 
	 	}
	 	if(pageno=='pre') {
	 		pageNum = pageNum -1; 
	 		if(pageNum < 1){ 
	 			pageNum = 1;
	 		}
	 	}
	 	if(pageno=='next') {
	 		if(pageNum < pages){ 
	 			if(pageNum==pages){
	 				pageNum = pageNum;
	 			}else{
	 				pageNum = pageNum + 1;
	 			}
	 		} else {
	 			pageNum = pages;
	 		}
	 	}
	 	if(pageno=='last') {
	 		pageNum = pages; 
	 	}
	 	checkid.val(pageNum);
	 	if(a[_index]=='searchWeituo'){
	 		$("#report_btn_weituo_search").click();
		}
		if(a[_index]=='searchTrade'){
			$("#report_btn_trade_search").click();
		}
		if(a[_index]=='searchProfit'){
			$("#report_btn_profit_search").click();
		}
		if(a[_index]=='searchBalance'){
			$("#report_btn_balance_search").click();
		}
		if(a[_index]=='searchCashBack'){
			$("#report_btn_cashback_search").click();
		}
	 }
	
};

