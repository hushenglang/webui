/**
 * Depended on Tick-core.js
 * Listeners:
 * on tick
 */
$(function(){
    var langTextCss=$("#index_lang").val()=="zh_CN"?"":"-tw";
	function refresh(symbol){

		if(symbol == '022'){
			$("#box_022_bid").html(Util.fixToStrTwodecimal(Tick.gold.ask));
			$("#box_022_ask").html(Util.fixToStrTwodecimal(Tick.gold.bid));
			$("#box_022_low").html(Util.fixToStrTwodecimal(Tick.gold.priceLow));
			$("#box_022_high").html(Util.fixToStrTwodecimal(Tick.gold.priceHigh));
			$("#box_022_localTime").html(Util.timestampToHHMMSS(Tick.gold.time));
			$("#box_022_spread").html(Tick.gold.spread);
			
			var leftCssSellBackG =
				(Tick.gold.bidTrend == 0) ? 'bs-jiaqian lls-box-fon5'+langTextCss+' fl' :
					((Tick.gold.bidTrend > 0)? 'bs-jiaqian lls-box-fon3'+langTextCss+' fl' : 'bs-jiaqian lls-box-fon1'+langTextCss+' fl');
			var rightCssBuyBackG =  
				(Tick.gold.askTrend == 0)?	'bs-count lls-box-fon6'+langTextCss+' fr' :
					((Tick.gold.askTrend > 0)? 'bs-count lls-box-fon4'+langTextCss+' fr' : 'bs-count lls-box-fon2'+langTextCss+' fr');
	
			$("#box_022_bid").parent('p').attr('class', leftCssSellBackG);
			$("#box_022_ask").parent('p').attr('class', rightCssBuyBackG);
			
			if(!('undefined' === typeof Tick.gold.symbol.buyinterest)) {
				$("#box_022_buyinterest").html(Tick.gold.symbol.buyinterest);		
			} 
			if(!('undefined' === typeof Tick.gold.symbol.buyinterest)){
				$("#box_022_sellinterest").html(Tick.gold.symbol.sellinterest);
			}	
			
		}
		if(symbol == '023'){
			$("#box_023_bid").html(Util.fixToStrThreedecimal(Tick.silver.ask));
			$("#box_023_ask").html(Util.fixToStrThreedecimal(Tick.silver.bid));
			$("#box_023_low").html(Util.fixToStrThreedecimal(Tick.silver.priceLow));
			$("#box_023_high").html(Util.fixToStrThreedecimal(Tick.silver.priceHigh));
			$("#box_023_localTime").html(Util.timestampToHHMMSS(Tick.silver.time));
			$("#box_023_spread").html(Tick.silver.spread);
			
			var leftCssSellBackG = 
				(Tick.silver.bidTrend == 0) ? 'bs-jiaqian lls-box-fon5'+langTextCss+' fl' :
					((Tick.silver.bidTrend > 0)? 'bs-jiaqian lls-box-fon3'+langTextCss+' fl' : 'bs-jiaqian lls-box-fon1'+langTextCss+' fl');
			var rightCssBuyBackG = 
				(Tick.silver.askTrend == 0)?	'bs-count lls-box-fon6'+langTextCss+' fr' :
					((Tick.silver.askTrend > 0)? 'bs-count lls-box-fon4'+langTextCss+' fr' : 'bs-count lls-box-fon2'+langTextCss+' fr');
			
			$("#box_023_bid").parent('p').attr('class', leftCssSellBackG);
			$("#box_023_ask").parent('p').attr('class', rightCssBuyBackG);
			
			if(!('undefined' === typeof Tick.silver.symbol.buyinterest)) {
				$("#box_023_buyinterest").html(Tick.silver.symbol.buyinterest);		
			} 
			if(!('undefined' === typeof Tick.silver.symbol.buyinterest)){
				$("#box_023_sellinterest").html(Tick.silver.symbol.sellinterest);
			}	
			
		}
	}
	
	/**
	 * 设置格子报价是否显示. 暂停交易了就不能显示了
	 */
	function setTickBoxDisplay(prdid, status){
		if(prdid==0&&status==0){
			$("#trade_swicth_div1_llg,#trade_swicth_div2_llg").show();
			$("#timer_div1_llg,#timer_div2_llg").hide();
			isSymbolSessionLLG = false;
		}else if(prdid==0&&status==1){
			$("#trade_swicth_div1_llg,#trade_swicth_div2_llg").hide();
		}
		
		if(prdid==1&&status==0){
			$("#trade_swicth_div1_lls,#trade_swicth_div2_lls").show();
			$("#timer_div1_lls,#timer_div2_lls").hide();
			isSymbolSessionLLS = false;
		}else if(prdid==1&&status==1){
			$("#trade_swicth_div1_lls,#trade_swicth_div2_lls").hide();
		}
	}
	
	//显示距离开始的倒计时flag-true 显示; flag-false 关闭
	function displayTradeOpenTimer(flag, beginTime, prdid){
		if(flag){
			if(prdid=='0'){
				llgTimerflagCount++;
				$("#timer_div1_llg,#timer_div2_llg").show();
				$("#trade_swicth_div1_llg,#trade_swicth_div2_llg").hide();
				runTimer(beginTime, "timer_time_llg", llgTimerflagCount);
			}else if(prdid=='1'){
				llsTimerflagCount++;
				$("#timer_div1_lls,#timer_div2_lls").show();
				$("#trade_swicth_div1_lls,#trade_swicth_div2_lls").hide();
				runTimer(beginTime, "timer_time_lls", llsTimerflagCount);
			}
		}else{
			if(prdid=='0'){
				$("#timer_div1_llg,#timer_div2_llg").hide();
			}
			if(prdid=='1'){
				$("#timer_div1_lls,#timer_div2_lls").hide();
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

	// add listeners
	socket.listeners.$add({
		"tick" : function(para, data){ 
			for(var i = 0; i < para + 1; i++){
				refresh(data[i].symbol);
			}
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
	
});