$(function(){
	
	var data = {
		"gold":{
			prdcode: "022", // 代碼
			prdname: i18n.llg, // 名稱
			newP: "---", // 現價
			ask: "---", // 賣價
			bid: "---", // 買價
			open: "---", // 开盘
			high: "---", // 最高
			low: "---", // 最低
			lastclose: "---", // 昨收
			change: "---", // 涨跌
			changePercent: "---", // 幅度
			buyinterest: "---", // 买利率
			sellinterest: "---", // 卖利率
			localtime: "---" // 时间
		}, 
		"silver":{
			prdcode: "023",
			prdname: i18n.lls,
			newP: "---",
			ask: "---",
			bid: "---",
			open: "---",
			high: "---",
			low: "---",
			lastclose: "---",
			change: "---",
			changePercent: "---",
			buyinterest: "---",
			sellinterest: "---",
			localtime: "---"
		},
		"usdinx":{
			prdcode: "050",
			prdname: i18n.lls,
			newP: "---",
			ask: "---",
			bid: "---",
			open: "---",
			high: "---",
			low: "---",
			lastclose: "---",
			change: "---",
			changePercent: "---",
			buyinterest: "---",
			sellinterest: "---",
			localtime: "---"
		},
		"oil":{
			prdcode: "00E",
			prdname: i18n.lls,
			newP: "---",
			ask: "---",
			bid: "---",
			open: "---",
			high: "---",
			low: "---",
			lastclose: "---",
			change: "---",
			changePercent: "---",
			buyinterest: "---",
			sellinterest: "---",
			localtime: "---"
		}
	};
	
	
	function refresh(symbol){
		var result = {};
		var tick = {};
		
		if(symbol == '022'){
			Tick.gold.ask = (Util.fixToStrTwodecimal(Tick.gold.ask));
			Tick.gold.bid = (Util.fixToStrTwodecimal(Tick.gold.bid));
			Tick.gold.price = (Util.fixToStrTwodecimal(Tick.gold.price));
			Tick.gold.priceLow = (Util.fixToStrTwodecimal(Tick.gold.priceLow));
			Tick.gold.priceHigh = (Util.fixToStrTwodecimal(Tick.gold.priceHigh));
			Tick.gold.lastClose = (Util.fixToStrTwodecimal(Tick.gold.lastClose));
			Tick.gold.open = (Util.fixToStrTwodecimal(Tick.gold.open));
			result = data.gold;
			tick = Tick.gold;			
			
			result.newP = tick.price; // 現價
			result.open = (tick.open != 0) ? tick.open : '---'; // 开盘
			result.lastclose = (tick.lastClose != 0) ? tick.lastClose : '---'; // 昨收
			result.buyinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.buyinterest * 100) + '%'; // 买利率
			result.sellinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.sellinterest * 100) + '%'; // 卖利率
			result.localtime = Util.timestampToHHMMSS(tick.time); // 时间
			// 幅度
			var changePercent = (tick.price - tick.lastClose) * 100 / tick.price;
			result.changePercent = Util.fixToStrTwodecimal(changePercent);
			// 漲跌
			var change = tick.price - tick.lastClose;
			result.change = Util.formatPriceByPrdcode(symbol, change);
			
			$("#list_022_localTime").html(Util.timestampToHHMMSS(Tick.gold.time));
			$("#list_022_spread").html(Tick.gold.spread);
			$("#list_022_bid").html(Util.fixToStrTwodecimal(Tick.gold.ask));
			$("#list_022_ask").html(Util.fixToStrTwodecimal(Tick.gold.bid));
			$("#list_022_price").html(Util.fixToStrTwodecimal(Tick.gold.price));
			$("#list_022_low").html(Util.fixToStrTwodecimal(Tick.gold.priceLow));
			$("#list_022_high").html(Util.fixToStrTwodecimal(Tick.gold.priceHigh));
			$("#list_022_open").html(result.open);
			$("#list_022_lastclose").html(result.lastclose);
			$("#list_022_buyinterest").html(result.buyinterest);
			$("#list_022_sellinterest").html(result.sellinterest);
			$("#list_022_change").html(result.change);
			$("#list_022_changePercent").html(result.changePercent);

			var bidClass = (Tick.gold.bidTrend == 0) ? '' :
				((Tick.gold.bidTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_022_bid").parent().attr("class",bidClass);
			
			var askClass = (Tick.gold.askTrend == 0)?	'' :
				((Tick.gold.askTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_022_ask").parent().attr("class",askClass);
		}
		else if(symbol == '023'){
			Tick.silver.ask = (Util.fixToStrThreedecimal(Tick.silver.ask));
			Tick.silver.bid = (Util.fixToStrThreedecimal(Tick.silver.bid));
			Tick.silver.price = (Util.fixToStrThreedecimal(Tick.silver.price));
			Tick.silver.priceLow = (Util.fixToStrThreedecimal(Tick.silver.priceLow));
			Tick.silver.priceHigh = (Util.fixToStrThreedecimal(Tick.silver.priceHigh));
			Tick.silver.lastClose = (Util.fixToStrThreedecimal(Tick.silver.lastClose));
			Tick.silver.open = (Util.fixToStrThreedecimal(Tick.silver.open));
			result = data.silver;
			tick = Tick.silver;			
			
			result.newP = tick.price; // 現價
			result.open = (tick.open != 0) ? tick.open : '---'; // 开盘
			result.lastclose = (tick.lastClose != 0) ? tick.lastClose : '---'; // 昨收
			result.buyinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.buyinterest * 100) + '%'; // 买利率
			result.sellinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.sellinterest * 100) + '%'; // 卖利率
			result.localtime = Util.timestampToHHMMSS(tick.time); // 时间
			// 幅度
			var changePercent = (tick.price - tick.lastClose) * 100 / tick.price;
			result.changePercent = Util.fixToStrTwodecimal(changePercent);
			// 漲跌
			var change = tick.price - tick.lastClose;
			result.change = Util.formatPriceByPrdcode(symbol, change);
			
			$("#list_023_localTime").html(Util.timestampToHHMMSS(Tick.silver.time));
			$("#list_023_spread").html(Tick.silver.spread);
			$("#list_023_bid").html(Util.fixToStrThreedecimal(Tick.silver.ask));
			$("#list_023_ask").html(Util.fixToStrThreedecimal(Tick.silver.bid));
			$("#list_023_price").html(Util.fixToStrThreedecimal(Tick.silver.price));
			$("#list_023_low").html(Util.fixToStrThreedecimal(Tick.silver.priceLow));
			$("#list_023_high").html(Util.fixToStrThreedecimal(Tick.silver.priceHigh));
			$("#list_023_open").html(result.open);
			$("#list_023_lastclose").html(result.lastclose);
			$("#list_023_buyinterest").html(result.buyinterest);
			$("#list_023_sellinterest").html(result.sellinterest);
			$("#list_023_change").html(result.change);
			$("#list_023_changePercent").html(result.changePercent);
			
			var bidClass = (Tick.silver.bidTrend == 0) ? '' :
				((Tick.silver.bidTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_023_bid").parent().attr("class",bidClass);
			
			var askClass = (Tick.silver.askTrend == 0)?	'' :
				((Tick.silver.askTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_023_ask").parent().attr("class",askClass);
		}
		else if(symbol == '050'){
			Tick.usdinx.ask = (Util.fixToStrThreedecimal(Tick.usdinx.ask));
			Tick.usdinx.bid = (Util.fixToStrThreedecimal(Tick.usdinx.bid));
			Tick.usdinx.price = (Util.fixToStrThreedecimal(Tick.usdinx.price));
			Tick.usdinx.priceLow = (Util.fixToStrThreedecimal(Tick.usdinx.priceLow));
			Tick.usdinx.priceHigh = (Util.fixToStrThreedecimal(Tick.usdinx.priceHigh));
			Tick.usdinx.lastClose = (Util.fixToStrThreedecimal(Tick.usdinx.lastClose));
			Tick.usdinx.open = (Util.fixToStrThreedecimal(Tick.usdinx.open));
			result = data.usdinx;
			tick = Tick.usdinx;			
			
			result.newP = tick.price; // 現價
			result.open = (tick.open != 0) ? tick.open : '---'; // 开盘
			result.lastclose = (tick.lastClose != 0) ? tick.lastClose : '---'; // 昨收
			result.buyinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.buyinterest * 100) + '%'; // 买利率
			result.sellinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.sellinterest * 100) + '%'; // 卖利率
			result.localtime = Util.timestampToHHMMSS(tick.time); // 时间
			// 幅度
			var changePercent = (tick.price - tick.lastClose) * 100 / tick.price;
			result.changePercent = Util.fixToStrTwodecimal(changePercent);
			// 漲跌
			var change = tick.price - tick.lastClose;
			result.change = Util.formatPriceByPrdcode(symbol, change);
			
			$("#list_050_localTime").html(Util.timestampToHHMMSS(Tick.usdinx.time));
			$("#list_050_spread").html(Tick.usdinx.spread);
			$("#list_050_bid").html(Util.fixToStrThreedecimal(Tick.usdinx.ask));
			$("#list_050_ask").html(Util.fixToStrThreedecimal(Tick.usdinx.bid));
			$("#list_050_price").html(Util.fixToStrThreedecimal(Tick.usdinx.price));
			$("#list_050_low").html(Util.fixToStrThreedecimal(Tick.usdinx.priceLow));
			$("#list_050_high").html(Util.fixToStrThreedecimal(Tick.usdinx.priceHigh));
			$("#list_050_open").html(result.open);
			$("#list_050_lastclose").html(result.lastclose);
			$("#list_050_buyinterest").html(result.buyinterest);
			$("#list_050_sellinterest").html(result.sellinterest);
			$("#list_050_change").html(result.change);
			$("#list_050_changePercent").html(result.changePercent);
			
			var bidClass = (Tick.usdinx.bidTrend == 0) ? '' :
				((Tick.usdinx.bidTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_050_bid").parent().attr("class",bidClass);
			
			var askClass = (Tick.usdinx.askTrend == 0)?	'' :
				((Tick.usdinx.askTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_050_ask").parent().attr("class",askClass);
		}
		else if(symbol == '00E'){
			Tick.oil.ask = (Util.fixToStrThreedecimal(Tick.oil.ask));
			Tick.oil.bid = (Util.fixToStrThreedecimal(Tick.oil.bid));
			Tick.oil.price = (Util.fixToStrThreedecimal(Tick.oil.price));
			Tick.oil.priceLow = (Util.fixToStrThreedecimal(Tick.oil.priceLow));
			Tick.oil.priceHigh = (Util.fixToStrThreedecimal(Tick.oil.priceHigh));
			Tick.oil.lastClose = (Util.fixToStrThreedecimal(Tick.oil.lastClose));
			Tick.oil.open = (Util.fixToStrThreedecimal(Tick.oil.open));
			result = data.oil;
			tick = Tick.oil;			
			
			result.newP = tick.price; // 現價
			result.open = (tick.open != 0) ? tick.open : '---'; // 开盘
			result.lastclose = (tick.lastClose != 0) ? tick.lastClose : '---'; // 昨收
			result.buyinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.buyinterest * 100) + '%'; // 买利率
			result.sellinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.sellinterest * 100) + '%'; // 卖利率
			result.localtime = Util.timestampToHHMMSS(tick.time); // 时间
			// 幅度
			var changePercent = (tick.price - tick.lastClose) * 100 / tick.price;
			result.changePercent = Util.fixToStrTwodecimal(changePercent);
			// 漲跌
			var change = tick.price - tick.lastClose;
			result.change = Util.formatPriceByPrdcode(symbol, change);
			
			$("#list_00E_localTime").html(Util.timestampToHHMMSS(Tick.oil.time));
			$("#list_00E_spread").html(Tick.oil.spread);
			$("#list_00E_bid").html(Util.fixToStrThreedecimal(Tick.oil.ask));
			$("#list_00E_ask").html(Util.fixToStrThreedecimal(Tick.oil.bid));
			$("#list_00E_price").html(Util.fixToStrThreedecimal(Tick.oil.price));
			$("#list_00E_low").html(Util.fixToStrThreedecimal(Tick.oil.priceLow));
			$("#list_00E_high").html(Util.fixToStrThreedecimal(Tick.oil.priceHigh));
			$("#list_00E_open").html(result.open);
			$("#list_00E_lastclose").html(result.lastclose);
			$("#list_00E_buyinterest").html(result.buyinterest);
			$("#list_00E_sellinterest").html(result.sellinterest);
			$("#list_00E_change").html(result.change);
			$("#list_00E_changePercent").html(result.changePercent);
			
			var bidClass = (Tick.oil.bidTrend == 0) ? '' :
				((Tick.oil.bidTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_00E_bid").parent().attr("class",bidClass);
			
			var askClass = (Tick.oil.askTrend == 0)?	'' :
				((Tick.oil.askTrend > 0)? 'lp_price_up' : 'lp_price_ub');
			$("#list_00E_ask").parent().attr("class",askClass);
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
	socket.listeners.$after({
		"quote_query" : function(_para, _data){
			if(data.gold.open == '---'){
				refresh(data.gold.prdcode);
			}
			if(data.silver.open == '---'){
				refresh(data.silver.prdcode);
			}
		}
	});
	
	
	//黄金价格明细
	$('#btn_tick_list_gold_tickPriceList').click(function(){
		var thisOffset = $(this).offset();
		$('#gold_tickPriceListBox').css({"left":thisOffset.left+20, "top":thisOffset.top+2});
		$('#gold_tickPriceListBox').toggle();
		
		$('#silver_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
		$('#silver_attribute_box').hide();
		
		priceListFuncObj.initPriceListBox(goldPriceListQueue, '#gold_tickPriceListBox', '#gold_tickPriceListTable');
	});
	
	//白银价格明细
	$('#btn_tick_list_silver_tickPriceList').click(function(){
		var thisOffset = $(this).offset();
		$('#silver_tickPriceListBox').css({"left":thisOffset.left+20, "top":thisOffset.top+2});
		$('#silver_tickPriceListBox').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
		$('#silver_attribute_box').hide();
		
		priceListFuncObj.initPriceListBox(silverPriceListQueue, '#silver_tickPriceListBox', '#silver_tickPriceListTable');
	});
	
	//黄金产品属性
	$('#btn_tick_list_gold_productAttribute').click(function(){
		var thisOffset = $(this).offset();
		$('#gold_attribute_box').css({"left":thisOffset.left+20, "top":thisOffset.top+2});
		$('#gold_attribute_box').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#silver_tickPriceListBox').hide();
		$('#silver_attribute_box').hide();
	});
	
	//白银产品属性
	$('#btn_tick_list_silver_productAttribute').click(function(){
		var thisOffset = $(this).offset();
		$('#silver_attribute_box').css({"left":thisOffset.left+20, "top":thisOffset.top+2});
		$('#silver_attribute_box').toggle();
		
		$('#gold_tickPriceListBox').hide();
		$('#silver_tickPriceListBox').hide();
		$('#gold_attribute_box').hide();
	});
	
});