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
		}
	};
	
	var tick2Array = new Object2Array({
		"prdname": function(data){return data;},
		"ask": function(data){return data;},
		"bid": function(data){return data;},
		"newP": function(data){return data;},
		"high": function(data){return data;},
		"low": function(data){return data;},
		"open": function(data){return data;},
		"lastclose": function(data){return data;},
		"sellinterest": function(data){return data;},
		"buyinterest": function(data){return data;},
		"change": function(data){return data;},
		"changePercent": function(data){return data;},
		"localtime": function(data){return data;},
		"prdcode": function(data){return data + '00';}
	});
	
	
	function refresh(symbol){
		var rowRecord = getTick(symbol);
		if(rowRecord == null) {
			return;
		}
		
		$('#symbol' + symbol + 'Price').html(rowRecord.newP);
		$('#symbol' + symbol + 'PriceChange').html(rowRecord.change);
		
		var $quotationTable = $('#quotationTableId').dataTable();
		
		var nodes = $quotationTable.fnGetNodes();
		for(var i = 0; i < nodes.length; i++){
			var node = nodes[i];
			var d = $quotationTable.fnGetData(node);
			// found matched symbol
			if(d[13].substring(0,3) == symbol){
				var index = $quotationTable.fnGetPosition(node);
				d = tick2Array.toArray(rowRecord);
				
				// update
				$quotationTable.fnUpdate(d, index);
				
				// 把 tick list 對應 tr更新到 tool tip
				if($("#quotationTableId").attr("tip") == 'open'){
					var trHtml = $("#quotationTableId [symbol='" + symbol + "']").html();
					$("#tick2ListTip [symbol='" + symbol + "']").html(trHtml);
					break;
				}
			}
		}		
	}
	
	function getTick(symbol){
		
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
		} else {
			if(symbol == '023'){
				Tick.silver.ask = (Util.fixToStrThreedecimal(Tick.silver.ask));
				Tick.silver.bid = (Util.fixToStrThreedecimal(Tick.silver.bid));
				Tick.silver.price = (Util.fixToStrThreedecimal(Tick.silver.price));
				Tick.silver.priceLow = (Util.fixToStrThreedecimal(Tick.silver.priceLow));
				Tick.silver.priceHigh = (Util.fixToStrThreedecimal(Tick.silver.priceHigh));
				Tick.silver.lastClose = (Util.fixToStrThreedecimal(Tick.silver.lastClose));
				Tick.silver.open = (Util.fixToStrThreedecimal(Tick.silver.open));
				result = data.silver;
				tick = Tick.silver;
			} else {
				return null;
			}
		}
		
		result.newP = tick.price; // 現價
		
		result.open = (tick.open != 0) ? tick.open : '---'; // 开盘
		result.high = tick.priceHigh; // 最高
		result.low = tick.priceLow; // 最低
		result.lastclose = (tick.lastClose != 0) ? tick.lastClose : '---'; // 昨收
		if(tick.lastClose != 0){
			
			// 賣價
			var askChange = tick.ask - tick.lastClose;
			var askClass = (askChange > 0) ? 'maij-fon2' : (askChange < 0) ? 'maij-fon1' : 'maij-fon3';
			result.ask = '<span class="' + askClass + '" onclick="QuotationGTS.callModifyFun(\'' + symbol + '\', 1);">' +
				tick.ask + '</span>'; 
			
			// 買價
			var bidChange = tick.bid - tick.lastClose;
			var bidClass = (bidChange > 0) ? 'maij-fon2' : (bidChange < 0) ? 'maij-fon1' : 'maij-fon3';
			result.bid = '<span class="' + bidClass + '" onclick="QuotationGTS.callModifyFun(\'' + symbol + '\', 0);">' + 
				tick.bid + '</span>'; 
			
			// 漲跌
			var change = tick.price - tick.lastClose;
			result.change = Util.formatPriceByPrdcode(symbol, change);
			if(change > 0){
				result.change = '<font color = "green">' + result.change + '</font>';	
			}else if(change < 0){
				result.change = '<font color = "red">' + result.change + '</font>';	
			}
			// 幅度
			var changePercent = (tick.price - tick.lastClose) * 100 / tick.price;
			result.changePercent = Util.fixToStrTwodecimal(changePercent);
			if(changePercent > 0){
				result.changePercent = '<font color = "green">' + result.changePercent + '%</font>';	
			}else if(changePercent < 0){
				result.changePercent = '<font color = "red">' + result.changePercent + '%</font>';	
			}
		}
		result.buyinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.buyinterest * 100) + '%'; // 买利率
		result.sellinterest = ('undefined' === typeof tick.symbol.buyinterest) ? '---' : Util.fixToStrTwodecimal(tick.symbol.sellinterest * 100) + '%'; // 卖利率
		result.localtime = Util.timestampToHHMMSS(tick.time); // 时间
		
		return result;
	}
	
	// add listeners
	socket.listeners.$add({
		"secTick" : function(para, data){
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

	// init
	$('#quotationTableId').dataTable( {
		"aaData": tick2Array.toArrays([data.gold, data.silver]),
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
        "asStripeClasses": ['','tr-bg'],
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			$(nRow).attr('symbol', aData[13]);
			return nRow;
		}
	} );
});