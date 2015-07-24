/**
 * Depended on Tick-core.js
 * Listeners:
 * on tick
 */
$(function(){
    var langTextCss=$("#index_lang").val()=="zh_CN"?"":"-tw";
    
	function refresh(symbol){

		if(symbol == '022'){
			$("#box_022_bid").html(boldPirceDisplayFormat(Util.fixToStrTwodecimal(Tick.gold.ask)));
			$("#box_022_ask").html(boldPirceDisplayFormat(Util.fixToStrTwodecimal(Tick.gold.bid)));
			$("#box_022_low").html(Util.fixToStrTwodecimal(Tick.gold.priceLow));
			$("#box_022_high").html(Util.fixToStrTwodecimal(Tick.gold.priceHigh));
			$("#box_022_localTime").html(Util.timestampToHHMMSS(Tick.gold.time));
			$("#box_022_spread").html(Tick.gold.spread);
			
			var leftCssSellBackG =
				(Tick.gold.bidTrend == 0) ? 'quote_sell quote_sell_gray' :
					((Tick.gold.bidTrend > 0)? 'quote_sell quote_sell_up' : 'quote_sell quote_sell_ub');
			var rightCssBuyBackG =  
				(Tick.gold.askTrend == 0)?	'quote_buy quote_buy_gray' :
					((Tick.gold.askTrend > 0)? 'quote_buy quote_buy_up' : 'quote_buy quote_buy_ub');
			$("#box_022_bid").parent().attr('class', leftCssSellBackG);
			$("#box_022_ask").parent().attr('class', rightCssBuyBackG);
			
		}
		else if(symbol == '023'){
			$("#box_023_bid").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.silver.ask)));
			$("#box_023_ask").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.silver.bid)));
			$("#box_023_low").html(Util.fixToStrThreedecimal(Tick.silver.priceLow));
			$("#box_023_high").html(Util.fixToStrThreedecimal(Tick.silver.priceHigh));
			$("#box_023_localTime").html(Util.timestampToHHMMSS(Tick.silver.time));
			$("#box_023_spread").html(Tick.silver.spread);
			var leftCssSellBackG =
				(Tick.silver.bidTrend == 0) ? 'quote_sell quote_sell_gray' :
					((Tick.silver.bidTrend > 0)? 'quote_sell quote_sell_up' : 'quote_sell quote_sell_ub');
			var rightCssBuyBackG =  
				(Tick.silver.askTrend == 0)?	'quote_buy quote_buy_gray' :
					((Tick.silver.askTrend > 0)? 'quote_buy quote_buy_up' : 'quote_buy quote_buy_ub');
			$("#box_023_bid").parent().attr('class', leftCssSellBackG);
			$("#box_023_ask").parent().attr('class', rightCssBuyBackG);
			
		}
		else if(symbol == '050'){
			$("#box_050_bid").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.usdinx.ask)));
			$("#box_050_ask").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.usdinx.bid)));
			$("#box_050_low").html(Util.fixToStrThreedecimal(Tick.usdinx.priceLow));
			$("#box_050_high").html(Util.fixToStrThreedecimal(Tick.usdinx.priceHigh));
			$("#box_050_localTime").html(Util.timestampToHHMMSS(Tick.usdinx.time));
			$("#box_050_spread").html(Tick.usdinx.spread);
			var leftCssSellBackG =
				(Tick.usdinx.bidTrend == 0) ? 'quote_sell quote_sell_gray' :
					((Tick.usdinx.bidTrend > 0)? 'quote_sell quote_sell_up' : 'quote_sell quote_sell_ub');
			var rightCssBuyBackG =  
				(Tick.usdinx.askTrend == 0)?	'quote_buy quote_buy_gray' :
					((Tick.usdinx.askTrend > 0)? 'quote_buy quote_buy_up' : 'quote_buy quote_buy_ub');
			$("#box_050_bid").parent().attr('class', leftCssSellBackG);
			$("#box_050_ask").parent().attr('class', rightCssBuyBackG);
			
		}
		else if(symbol == '00E'){
			$("#box_00E_bid").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.oil.ask)));
			$("#box_00E_ask").html(boldPirceDisplayFormat(Util.fixToStrThreedecimal(Tick.oil.bid)));
			$("#box_00E_low").html(Util.fixToStrThreedecimal(Tick.oil.priceLow));
			$("#box_00E_high").html(Util.fixToStrThreedecimal(Tick.oil.priceHigh));
			$("#box_00E_localTime").html(Util.timestampToHHMMSS(Tick.oil.time));
			$("#box_00E_spread").html(Tick.oil.spread);
			var leftCssSellBackG =
				(Tick.oil.bidTrend == 0) ? 'quote_sell quote_sell_gray' :
					((Tick.oil.bidTrend > 0)? 'quote_sell quote_sell_up' : 'quote_sell quote_sell_ub');
			var rightCssBuyBackG =  
				(Tick.oil.askTrend == 0)?	'quote_buy quote_buy_gray' :
					((Tick.oil.askTrend > 0)? 'quote_buy quote_buy_up' : 'quote_buy quote_buy_ub');
			$("#box_00E_bid").parent().attr('class', leftCssSellBackG);
			$("#box_00E_ask").parent().attr('class', rightCssBuyBackG);
			
		}
	}
	
	/**
	 * 设置格子报价是否显示. 暂停交易了就不能显示了
	 */
	function setTickBoxDisplay(prdid, status){
		if(prdid==0&&status==0){
			isSymbolSessionLLG = false;
			$("#li_llg").addClass("stop_business");
			$("#tr_llg").addClass("stop_business");
			$("#close_div_llg").show();
		}else if(prdid==0&&status==1){
			$("#li_llg").removeClass("stop_business");
			$("#tr_llg").removeClass("stop_business");
			$("#close_div_llg").hide();
		}
		
		if(prdid==1&&status==0){
			isSymbolSessionLLS = false;
			$("#li_lls").addClass("stop_business");
			$("#tr_lls").addClass("stop_business");
			$("#close_div_lls").show();
		}else if(prdid==1&&status==1){
			$("#li_lls").removeClass("stop_business");
			$("#tr_lls").removeClass("stop_business");
			$("#close_div_lls").hide();
		}
	}
	
	//显示距离开始的倒计时flag-true 显示; flag-false 关闭
	function displayTradeOpenTimer(flag, beginTime, prdid){
		if(flag){
			if(prdid=='0'){
				llgTimerflagCount++;
				$("#timer_div_llg").show();
				$("#li_llg").addClass("stop_business");
				$("#tr_llg").addClass("stop_business");
				runTimer(beginTime, "timer_time_llg", llgTimerflagCount);
			}else if(prdid=='1'){
				llsTimerflagCount++;
				$("#timer_div_lls").show();
				$("#li_lls").addClass("stop_business");
				$("#tr_lls").addClass("stop_business");
				runTimer(beginTime, "timer_time_lls", llgTimerflagCount);
			}
		}else{
			if(prdid=='0'){
				$("#timer_div_llg").hide();
				$("#li_llg").removeClass("stop_business");
				$("#tr_llg").removeClass("stop_business");
			}
			if(prdid=='1'){
				$("#timer_div_lls").hide();
				$("#li_lls").removeClass("stop_business");
				$("#tr_lls").removeClass("stop_business");
			}
		}
		
		function runTimer(begintime, prdTimerId, timerCount){
			var currentTime = new Date(SystemTime.time);
			var ts = begintime.getTime()-currentTime.getTime();
			if(ts>=0){
		        var hh = parseInt(ts / 1000 / 60 / 60, 10);//计算剩余的小时数 
		        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数 
		        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数 
		        hh = checkTime(hh); 
		        mm = checkTime(mm); 
		        ss = checkTime(ss); 
		        if(prdTimerId=='timer_time_llg'&&timerCount==llgTimerflagCount){
		        	$("#"+prdTimerId).text(hh + ":" + mm + ":" + ss);
		        	setTimeout(function(){runTimer(begintime, prdTimerId, timerCount);},1000); 
		        }else if(prdTimerId=='timer_time_lls'&&timerCount==llsTimerflagCount){
		        	$("#"+prdTimerId).text(hh + ":" + mm + ":" + ss);
		        	setTimeout(function(){runTimer(begintime, prdTimerId, timerCount);},1000); 
		        }
			}else{
				$("#"+prdTimerId).text("00:00:00"); 
			}
	        
	        function checkTime(i){   
	           if (i < 10) {   
	               i = "0" + i;   
	            }   
	           return i;   
	        }
		}
	}
	
	
	/**
	 * 设置产品到期时间点,并将过期产品设置为不可以交易
	 */
	function setTimeoutTradeStart(para){
		var begintime = para.begintime.toDate();
		var currentTime = new Date(SystemTime.time);
		var interval = begintime.getTime()-currentTime.getTime();
		if(interval>0){
			if(para.prdid=='0'){
				isSymbolSessionLLG = false;
			}else if(para.prdid=='1'){
				isSymbolSessionLLS = false;
			}
			//到达产品期数开始时间,开启交易
			displayTradeOpenTimer(true, begintime, para.prdid);
			setTimeout(setTradeStart, interval);
		}else{
			if(para.prdid=='0'){
				isSymbolSessionLLG = true;
			}else if(para.prdid=='1'){
				isSymbolSessionLLS = true;
			}
		}
		
		
		function setTradeStart(){
			//到达产品期数开始时间,开启交易
			displayTradeOpenTimer(false, null, para.prdid);
			if(para.prdid=='0'){
				isSymbolSessionLLG = true;
			}else if(para.prdid=='1'){
				isSymbolSessionLLS = true;
			}
		}
		
	}
	
	/**
	 * 设置产品到期时间点,并将过期产品设置为不可以交易
	 */
	function setTimeoutTradeExpired(para){
		var endTime = para.endtime.toDate();
		var currentTime = new Date(SystemTime.time);
		var interval = endTime.getTime()-currentTime.getTime();
		//到达产品期数结束时间,关闭交易
		if(interval<86400000){//期数如果离当前时间1天以上就不用执行
			setTimeout(setTradeExpired, interval);
		}
		
		function setTradeExpired(){
			if(para.prdid=='0'){
				isSymbolSessionLLG = false;
			}else if(para.prdid=='1'){
				isSymbolSessionLLS = false;
			}
			for(var index in symbolTradeArray){
				var obj = symbolTradeArray[index];
				if(obj.endtime!=undefined){
					var endTime = obj.endtime.toDate();
					var currentTime = new Date();
					if(endTime<currentTime){
						setTickBoxDisplay(obj.prdid, 0);
					}
				}
			}
		}
		
	}

	/**
	 * 格子报价价格格式化后显示
	 */
	function boldPirceDisplayFormat(price){
		if(price!=null&&price!=""){
			var charsArray = price.split(".");
			return charsArray[0]+".<strong>"+charsArray[1]+"</strong>";
		}else{
			return "";
		}
	}
	
	// add listeners
	socket.listeners.$add({
		"tick" : function(para, data){ 
			for(var i = 0; i < para + 1; i++){
				refresh(data[i].symbol);
			}
		}
	});
	
	// add listeners
	socket.listeners.$after({
		"tick" : function(para, data){
			priceListFuncObj.refreshGoldPriceListBox();	
			priceListFuncObj.refreshSilverPriceListBox();	
		}
	});
	
	//AmsSymbolSessionList产品是否交易或暂停监听
	socket.listeners.$add({'AmsSymbolSessionList':function(para,data){
		setSymbolTradeArray(para);
		setTickBoxDisplay(para.prdid, para.status);
		if(isLogined&&para.status==1){
			setTimeoutTradeStart(para);
			setTimeoutTradeExpired(para);
		}else{
			// 登入數據接收完畢
			socket.listeners.$add({'OrderEnd': function() {
				if(para.status==1){
					setTimeoutTradeStart(para);
					setTimeoutTradeExpired(para);
				}
			}});
		}
	}});
	
	// Add listener
	socket.listeners.$add({
		//取得點差
		"SymbolList": function(para, data){
			for(var i = 0; i < para.num; i++){
				var e = data["" + i];
				// 金
				if(e.prdcode == "022"){
					setTickBoxDisplay(0, e.tradestatus);
				}
				// 銀
				if(e.prdcode == "023"){
					setTickBoxDisplay(1, e.tradestatus);
				}
			}
			//刷新实时显示值
			QuotationGTS.refreshMarketAndPendingTradeDialog(data);
		}
	});
	
	//黄金价格明细
	$('#btn_gold_tickPriceList').click(function(){
		var thisOffset = $(this).offset();
		$('#gold_tickPriceListBox').css({"left":thisOffset.left+52, "top":thisOffset.top-3});
		$('#gold_tickPriceListBox').toggle();
		
		$('#silver_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
		$('#silver_attribute_box').hide();
		
		priceListFuncObj.initPriceListBox(goldPriceListQueue, '#gold_tickPriceListBox', '#gold_tickPriceListTable');
	});
	
	//白银价格明细
	$('#btn_silver_tickPriceList').click(function(){
		var thisOffset = $(this).offset();
		$('#silver_tickPriceListBox').css({"left":thisOffset.left+52, "top":thisOffset.top-3});
		$('#silver_tickPriceListBox').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
		$('#silver_attribute_box').hide();
		
		priceListFuncObj.initPriceListBox(silverPriceListQueue, '#silver_tickPriceListBox', '#silver_tickPriceListTable');
	});
	
	//黄金产品属性
	$('#btn_gold_productAttribute').click(function(){
		var thisOffset = $(this).offset();
		$('#gold_attribute_box').css({"left":thisOffset.left+28, "top":thisOffset.top-3});
		$('#gold_attribute_box').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#silver_tickPriceListBox').hide();
		$('#silver_attribute_box').hide();
	});
	
	//白银产品属性
	$('#btn_silver_productAttribute').click(function(){
		var thisOffset = $(this).offset();
		$('#silver_attribute_box').css({"left":thisOffset.left+28, "top":thisOffset.top-3});
		$('#silver_attribute_box').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#silver_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
	});
	
});

//price List func object
var priceListFuncObj = {
		/**
		 * refresh price list
		 */
		refreshGoldPriceListBox : function() {
			var display = $("#gold_tickPriceListBox").css("display");
			if (display != "none") {
				var productObj = Tick.gold;
				this.renderPriceListBox(productObj, "#gold_tickPriceListTable");
			}
		},

		/**
		 * refresh price list
		 */
		refreshSilverPriceListBox : function() {
			var display = $("#silver_tickPriceListBox").css("display");
			if (display != "none") {
				var productObj = Tick.silver;
				this.renderPriceListBox(productObj, "#silver_tickPriceListTable");
			}
		},

		// 首次初始化价格明细box
		initPriceListBox : function(productObjQueue, priceListBoxId, priListTableId) {
			var display = $(priceListBoxId).css("display");
			if (display != "none") {
				$(priListTableId).empty();
				for ( var i = productObjQueue.length-1; i >=0; i--) {
					var productObj = productObjQueue[i];
					this.renderPriceListBox(productObj, priListTableId);
				}
			}
		},

		// render price list box
		renderPriceListBox : function(productObj, priceListBoxId) {
			var time = Util.timestampToHHMMSS(productObj.time);
			var tickPriceListTableObj = $(priceListBoxId);
			var trTickPriceListTableObj = tickPriceListTableObj.find("tr");
			var newPrice = productObj.price;
			var lengTrTickPriceListTableObj = trTickPriceListTableObj.size();
			if (lengTrTickPriceListTableObj >= 20) {
				trTickPriceListTableObj.last().remove();
			}
			var priceClass = "";
			if (productObj.priceTrend != 0) {
				priceClass = (productObj.priceTrend > 0) ? 'jg_price_up' : 'jg_price_ub';
			}else{
				priceClass='jg_price_plain';
			}
			tickPriceListTableObj.prepend('<tr><td>' + time + '</td><td><span class="' + priceClass + '">' + newPrice
					+ '</span></td></tr>');
		},

	};
