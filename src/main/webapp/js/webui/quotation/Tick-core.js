/**
 * Tick
 * 
 * listeners : 
 * before tick
 * on SymbolList
 */

 //{"0":{"dtime":1395913664,"symbol":"022","ask":1293.47998,"bid":1293.97998,"newP":1293.72998,"high":1306.400024,"low":1291.130005}}
var Tick = {
	"gold": {"prdcode": "022"},
	"silver" : {"prdcode": "023"},
	"usdinx" : {"prdcode": "050"},
	"oil" : {"prdcode": "00E"}
};

var goldPriceListQueue=new Array(); //黄金价格明细队列20口报价
var silverPriceListQueue=new Array(); //白银价格明细队列20口报价

$(function(){
	
	var gold = {
			ask: 0,
			bid: 0,
			price: 0,
			priceHigh: 0,
			priceLow: 0,
			time: 0,
			buySpread: 0,
			sellSpread: 0,
			spread: 0,
			lastClose: 0,
			open: 0,
			symbol: {},
			lastTickData: {},
			lastTickPara: {}
		};
	gold.prdcode = "022";

	var silver = jQuery.extend(true, {}, gold);
	silver.prdcode = "023";
	
	var usdinx = jQuery.extend(true, {}, gold);
	usdinx.prdcode = "050";
	
	var oil = jQuery.extend(true, {}, gold);
	oil.prdcode = "00E";
	
	var symbols = [gold, silver, usdinx, oil];
	
	Tick.$get = function(prdcode){
		for(var  i = 0; i < symbols.length; i++){
			var symbol = symbols[i];
			if(prdcode == symbol.prdcode){
				return symbol; 
			}
		}
		return null;
	};
	
	Tick.$getPriceListQueue = function(prdcode){
		if(prdcode=="022"){
			return goldPriceListQueue;
		}else{
			return silverPriceListQueue;
		}
	};
	
	/**
	 * export values to obj
	 */ 
	function exportValues(){
		
		Tick.gold.askTrend = gold.ask - Tick.gold.ask;
		Tick.gold.bidTrend = gold.bid - Tick.gold.bid;
		Tick.gold.priceTrend = gold.price - Tick.gold.price;
		for(var name in gold){
			Tick.gold[name] = gold[name];	
		}
		
		Tick.silver.askTrend = silver.ask - Tick.silver.ask;
		Tick.silver.bidTrend = silver.bid - Tick.silver.bid;
		Tick.silver.priceTrend = silver.price - Tick.silver.price; 
		for(var name in silver){
			Tick.silver[name] = silver[name];	
		}
		
		Tick.usdinx.askTrend = usdinx.ask - Tick.usdinx.ask;
		Tick.usdinx.bidTrend = usdinx.bid - Tick.usdinx.bid;
		Tick.usdinx.priceTrend = usdinx.price - Tick.usdinx.price; 
		for(var name in silver){
			Tick.usdinx[name] = usdinx[name];	
		}
		
		Tick.oil.askTrend = oil.ask - Tick.oil.ask;
		Tick.oil.bidTrend = oil.bid - Tick.oil.bid;
		Tick.oil.priceTrend = oil.price - Tick.oil.price; 
		for(var name in silver){
			Tick.oil[name] = oil[name];	
		}
	}
	
	
	
	var firstTick = {"022": false, "023": false};
	
	// Add listener
	socket.listeners.$add({
		//取得點差
		"SymbolList": function(para, data){
			for(var i = 0; i < para.num; i++){
				var e = data["" + i];
				// 金
				if(e.prdcode == "022"){
					gold.buySpread = e.buyspread;
					gold.sellSpread = e.sellspread;
					gold.symbol = e;
				}
				// 銀
				if(e.prdcode == "023"){
					silver.buySpread = e.buyspread;
					silver.sellSpread = e.sellspread;
					silver.symbol = e;
				}
			}
			exportValues();
		}
	});
	
	
	var lastTick = {};
	var secTickUpdateTime = {};
	
	// 觸發每秒報價
	function tiggerSecTick(){
		for(var name in lastTick){
			var data = lastTick[name];
			var t = data[0];
			var lastUpdateTime = secTickUpdateTime[t.symbol];
			if( 'undefined' === typeof lastUpdateTime || 
					lastUpdateTime != null || lastUpdateTime < t.dtime){
				secTickUpdateTime[t.symbol] = t.dtime;
				socket.listeners.$trigger('secTick', 0, data);
			}
		}
		// 每秒刷新
		setTimeout(tiggerSecTick, 1000);
	}
	tiggerSecTick();
	
	// before tick listener
	socket.listeners.$before({
		// 報價
		"tick": function(para, data){
			// 更新 Tick數據
			var t={};
			for(var i = 0; i < para + 1; i++){
				t = data[i];
				if(firstTick[t.symbol] == false || (!isHoliday && !isWeekend)){
					if(firstTick[t.symbol] == false){
						console.info("fist tick received.", t.symbol);
					}
					var prod = Tick.$get(t.symbol); // prod = gold/silver
					if(prod == null) {
						continue;
					}
					// 緩存上一口報價
					lastTick[t.symbol] = {"0":t};
					prod.time = t.dtime * 1000;
					
					if(prod.prdcode=='022'){
						prod.ask = Util.fixToStrTwodecimal(t.ask + prod.sellSpread);
						prod.bid = Util.fixToStrTwodecimal(t.bid + prod.buySpread);	
						prod.price = Util.fixToStrTwodecimal(t.newP);
						prod.priceHigh = Util.fixToStrTwodecimal(t.high);
						prod.priceLow =Util.fixToStrTwodecimal( t.low);
						
						var tmpNum=(Math.round((prod.bid - prod.ask)* 1000))%10;
						if(tmpNum>0)
							prod.spread = Util.fixToStr((prod.bid - prod.ask) * 100, 1,0);
						else
							prod.spread = Util.fixToStr(Math.round((prod.bid - prod.ask) * 100), 0,0);
					}else{
						prod.ask = Util.fixToStrThreedecimal(t.ask + prod.sellSpread);
						prod.bid = Util.fixToStrThreedecimal(t.bid + prod.buySpread);	
						prod.price = Util.fixToStrThreedecimal(t.newP);
						prod.priceHigh = Util.fixToStrThreedecimal(t.high);
						prod.priceLow =Util.fixToStrThreedecimal( t.low);
						
						var tmpNum=(Math.round((prod.bid - prod.ask)* 1000))%10;
						if(tmpNum>0)
							prod.spread = Util.fixToStr((prod.bid - prod.ask) * 100, 1,0);
						else
							prod.spread = Util.fixToStr(Math.round((prod.bid - prod.ask) * 100), 0,0);
					}
					
					prod.lastTickData = data;
					prod.lastTickPara = para;
					firstTick[t.symbol] = true;	
					
				}
			}
			exportValues();
			addTickToPriceListQueue(t);//向价格明细队列中添加tick报价对象.
		},
		// 每秒報價
		"secTick": function(para, data){
			//
		}
		
	});
	
	/**
	 * 向价格明细队列中添加tick报价对象.
	 */
	function addTickToPriceListQueue(tickobj){
		if(tickobj.symbol=="022"){
			var prdObj = jQuery.extend(true, {}, Tick.gold);
			goldPriceListQueue.unshift(prdObj);
			if(goldPriceListQueue.length>20){
				goldPriceListQueue.pop();
			}
		}else if(tickobj.symbol=="023"){
			var prdObj = jQuery.extend(true, {}, Tick.silver);
			silverPriceListQueue.unshift(prdObj);
			if(silverPriceListQueue.length>20){
				silverPriceListQueue.pop();
			}
		}
	}
	
	/** enable, if last tick data push from newsSocket
	newSocket.listeners.$before({
		"secTick": function(para, data){
			// tigger socket tick event
			for(var i = 0; i < para + 1; i++){
				var t = data[i];
				if(firstTick[t.symbol] == false){
					console.log("return last tick ", para, data);
					socket.listeners.$trigger('tick', para, data);		
				}
			}
		}
	});
	*/
	
	/**
	 * get last closed and open price
	 */
	function initCloseOpenPrice(){
		
		function Callback(symbol){		
			var _symbol = symbol;
			this.call = function(para, data){
				if(data == 0) {
					return;
				}
				// 第一条数据中取开盘价
				var begin = data[0]['begin'];
				_symbol.open = begin;
				// 第二条数据中取昨收价
				var end = data[1]['end'];
				_symbol.lastClose = end;
				exportValues();
				if(firstTick[_symbol.prdcode] == true){
					console.log("trigger tick symbol " +  _symbol.prdcode);
					socket.listeners.$trigger('tick', _symbol.lastTickPara, _symbol.lastTickData);
				}
			};
		}
		
		// get last close and open price.
		for(var i = 0; i < symbols.length; i++){
			var symbol = symbols[i].prdcode;
			newsSocket.listeners.$listenSeq(Constant.CMD_QUOTE_QUERY, 
					{ // para
						"time" : 0,
						"num" : 2,
						"period_num" : 1,
						"period_type" : 3,
						"flag" : 0,
						"symbol" : symbol},
					new Callback(symbols[i]).call
			);		
		}
		setTimeout(initCloseOpenPrice, 600000); // call every 10min
	};
	
	
	/**
	 * get last tick
	 * 如未有tick報價送至，取得最後報價用於顯示
	 */
	socket.listeners.$add({
		'OrderEnd': function(){
				for(var name in firstTick){
					// 如果未有tick，取最後一口价
					if(firstTick[name] == false){
						console.log("get last tick " + name);
						socket.emit('request', Constant.CMD_LAST_TICK, {'0': name});
					}		
				}
			}
	});
	
	// init CloseOpenPrice
	newsSocket.listeners.$add({
		'loginR': function(para, data){
			initCloseOpenPrice();
		}
	});
	
	/**
	 * get closed price by prdid and tradedir
	 */
	Tick.getClosedPrice = function(prdid, tradedir){
		// 現價
		var closedprice = 0;
		// 金
		if(prdid == 0){ 
			if(tradedir == 0){ //bid
				closedprice = gold.ask; // + gold.sellSpread;
			}
			if(tradedir == 1){ //ask
				closedprice = gold.bid; // + gold.buySpread;
			}
		}
		//銀
		if(prdid == 1){ 
			if(tradedir == 0){ //bid
				closedprice = silver.ask; // + silver.sellSpread;
			}
			if(tradedir == 1){ //ask
				closedprice = silver.bid; // + silver.buySpread;
			}
		}
		return closedprice;
	};
});