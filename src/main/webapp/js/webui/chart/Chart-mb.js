//--1398692700 = Mon Apr 28 2014 00:00:00 GMT+0800 (中國標準時間)

var WebUiChart = {};
$(function(){
	
	//指標顏色彈出: 如點擊彈出以外，即除消顯示
	$(document).click(function(e){
	
		if(e.target && !($(e.target).is(".ciqColorPicker") || $(e.target).closest(".ciqColorPicker").length)){
			var list = $('.ciqColorPicker');
			for(var obj in list){
				if(list[obj] && list[obj].className == "ciqColorPicker"){
					var checked = list[obj].getAttribute("checked");
					if(checked && checked == "1"){
						if(list[obj].style.display == "block"){
							list[obj].style.display = "none";
							list[obj].removeAttribute("checked");
						}
					}else{
						if(list[obj].style.display == "block"){
							list[obj].setAttribute("checked", "1");
						}
						
					}
				}
			}
		}
		
	})
	
	
	WebUiChart.newsSocketConnected = false;
	var globalTick={Date:"",Open:0,High:0,Low:0,Close:0,Volume:0};
	var globalInterval = null;
	var defaultGetTickNum = 500;
	var numOftickDisplay = 200;
	var intervalType = "";
	var intervalLong = "";
	var lastIntervalOhlc = null;
	var lastIntervalTickDt = null;
	var minuteDateFormat = "yyyy-MM-dd hh:mm";
	var dayFormat = "yyyy-MM-dd";
	var stxx=new STXChart($$("chartContainer"));
	STXChart.prototype.prepend("headsUpHR", prependHeadsUpHR);
	STXMenuManager.makeMenus();
	STXMenuManager.registerChart(stxx);
	
	function resetGlobalTick(){
		globalTick={Date:"",Open:0,High:0,Low:0,Close:0,Volume:0};
	}
	
	WebUiChart.changeChartBySymbol = function (obj){
		if(obj.value == "022" ||obj.value == "023"){
			
			if(stxx.intervalType == "month"){
				displayMonthly(obj.value);
			}else if(stxx.intervalType == "week"){
				displayWeekly(obj.value);
			}else if(stxx.intervalType == "daily"){
				displayDaily(obj.value);
			}else {
				displayPeriod(intervalLong, obj.value);
			}
		
			WebUiChart.setChartType($("#stx-chart-type-select").val());
			$("#stx-chart-type-select").val($("#stx-chart-type-select").val());
			$("#stx-chart-tool-select").val("");
			showSelectPcode(obj.value);
		}
	};
	
	WebUiChart.init = function(){
		
		
		//true: 顯示最新價格直線
		stxx.setMasterLine(true);
		WebUiChart.setChartType('candle');
		displayDaily("022");
		
		WebUiChart.setChartType('candle');
		$("#stx-chart-type-select").val("candle");
		showSelectPcode("022");
		
	};
	
	/**
	 * 显示选择产品code
	 */
	function showSelectPcode(code){
		$("#iconsTitle").hide();
		$("#symbol_select_pcode").html(code);
	}
	/**
	 * Convert data into array format 
	 * [[time, open, high, low, close], ...]
	 */
	function convertOrderDate(data, type){
		
		
		var dateFormat = type == "minute" ? minuteDateFormat : dayFormat;
		var ohlc = [];
		
			for (var name = Object.keys(data).length -1; name >= 0; name--) {  //name == 0 最新
				var d = data[name];
				var convertedTime = null;
				if(!d.begin || d.begin < 0.1  || !d.highest || d.highest < 0.1   ||!d.lowest || d.lowest < 0.1  ||!d.end || d.end < 0.1  ) {
					continue;
				}
				var prdCode = $("#symbol-select").val();
				ohlc.push({
					Dm: d.tm,
					Date:	Util.getTime(d.tm, dateFormat), // the date
					Open:	parseFloat(Util.formatPriceByPrdcode(prdCode, d.begin)), // open
					High:	parseFloat(Util.formatPriceByPrdcode(prdCode, d.highest)), // high
					Low:	parseFloat(Util.formatPriceByPrdcode(prdCode, d.lowest)), // low
					Close:	parseFloat(Util.formatPriceByPrdcode(prdCode, d.end)), // close
					Volume:	0
				});
			}
		
		return ohlc;
	}
	
	
function convertDateFmByInterval(time,type){
		
		if(type =="month" || type =="week" ){
			var date = new Date(time * 1000);
			var month =  date.getMonth();
			var year = date.getFullYear();
			var day = date.getDate();
			if(type =="month" ){
				if(date){
					if(date.getDay() == 0){ //sun
					  	 return	new Date(year, month +1 == 12? 11: month +1, day -2).getTime() /1000;
					}else if(date.getDay() == 6){//sat
						 return	new Date(year, month +1 == 12? 11: month +1, day -1).getTime() /1000;
					}else{
						 return	new Date(year, month +1 == 12? 11: month +1, 0).getTime() /1000;
					}
				}else{
					return time;
				}
				
			}else if(type == "week"){
				var date = new Date(time * 1000);
				if(date){
					return	new Date(year, month +1 == 12? 11: month +1 , day -1).getTime() /1000;
				}else{
					return time;
				}
			}
		}else{
			return time;
		}
		
	}
	
	function displayMonthly(symbol){
		resetGlobalTick();
		stxx.intervalType = "month";
		// 查詢300個1MONTH標價 數據

		if(Util.isEmpty(symbol)){
			symbol = "022";
		}
		
		query(0, 60, 0, 5, {symbol:symbol}, function(para, data){
			// [[time, open, high, low, close], ...]
			var ohlc = convertOrderDate(data, stxx.intervalType);
			if(ohlc && ohlc[ohlc.length - 1]){
				showChart(ohlc, symbol);
			}
			
		});
	}
	
	function displayWeekly(symbol){
		resetGlobalTick();
		stxx.intervalType = "week";
		
		// 查詢600個1WEEK標價 數據
		
		if(Util.isEmpty(symbol)){
			symbol = "022";
		}
		
		query(0, 60, 1, 4, {symbol:symbol}, function(para, data){
			var ohlc = convertOrderDate(data, stxx.intervalType);
			if(ohlc && ohlc[ohlc.length - 1]){
				showChart(ohlc, symbol);
			}
			
		});
	}
	
	function displayDaily(symbol){
		resetGlobalTick();
		stxx.intervalType = "daily";
		
		// 查詢600個DAY標價 數據
		if(Util.isEmpty(symbol)){
			symbol = "022";
		}
		
		
		
		query(0, defaultGetTickNum, 0, 3, {symbol:symbol}, function(para, data){
			
			
			// [[time, open, high, low, close], ...]
			var ohlc = convertOrderDate(data, stxx.intervalType);
			if(ohlc && ohlc[ohlc.length - 1]){
				showChart(ohlc, symbol);
				!WebUiChart.chartShowed && (WebUiChart.chartShowed = true);
			}
			
		});
		
	}
	
	function displayPeriod(minutes, displayPeriod){
		resetGlobalTick();
		intervalLong = minutes;
		resetGlobalTick();
		stxx.intervalType = "minute";

		var periodType = 1;
		
		if(isNaN(minutes)){
			periodType =2;
			if(minutes == "1h"){
				stxx.hourLong = "1";
				minutes = 1;
			}else
			if(minutes == "4h"){
				stxx.hourLong = "4";
				minutes = 4;
			}else
			return;
		}else{
			stxx.hourLong = "";
		}
		stxx.interval = minutes;
		
		lastTickRawDate = null; //紀錄RAW query 中的millisec(沒有 X1000) ，主要用於query_period
		
		query(0, defaultGetTickNum, minutes, periodType, {symbol:displayPeriod}, function(para, data){
			if(data == null){
				return;
			}
			var ohlc = convertOrderDate(data, stxx.intervalType);
			if(ohlc && ohlc[ohlc.length - 1]){
				showChart(ohlc, displayPeriod);
				stxx.setPeriodicityV2(1, "1");
				stxx.draw();
			}
			
		});
	}

	socket.listeners.$after({
		// 報價 
		"secTick": function(para, data){
			
			var symbol = $("#symbol-select").val();
			
			
			
			if(lastIntervalOhlc == null || lastIntervalOhlc.Date==null || lastIntervalTickDt == null || symbol != data[0].symbol ){
				return; 
			}
			
			
			var currentDate = new Date(data[0].dtime * 1000); 
			
			if("minute" == stxx.intervalType ){
				if(!checkGlobalTickValid()){
					globalTick.Date = Util.getTime(data[0].dtime, minuteDateFormat, stxx); //dtime need * 1000
					globalTick.Open = data[0].newP;
					globalTick.Low = data[0].newP;
					globalTick.High = data[0].newP;
					globalTick.Dt = new Date(data[0].dtime * 1000);
					globalTick.Close = data[0].newP;
					stxx.appendMasterData([clone(globalTick)]);
					
				}else if( currentDate >= lastIntervalTickDt || currentDate >= nextIntervalTickDt){//新時段開始
					nextIntervalTickDt = STXMarket.getNextIntervalStartDate(lastIntervalTickDt,  stxx);
					globalTick.Date = Util.getTime(nextIntervalTickDt.getTime()/1000, minuteDateFormat, stxx);
					globalTick.Open = data[0].newP;
					globalTick.Low = data[0].newP;
					globalTick.High = data[0].newP;
					globalTick.Dt = nextIntervalTickDt;
					globalTick.Close = data[0].newP;
					
					lastIntervalTickDt = nextIntervalTickDt;
					
					//重新晝出新圖表
					stxx.appendMasterData([clone(globalTick)]);
				}else{ 
					//因為舊時段的ohlc是最新的ohlc(包括秒)，所以可以直接取出最後數據更新
					if(globalTick.Open == 0){
						globalTick.Open == data[0].newP;
					}
					globalTick.Low = Math.min(globalTick.Low, data[0].newP);
					globalTick.High = Math.max(globalTick.High, data[0].newP);
					globalTick.Dt = lastIntervalTickDt;
					globalTick.Close = data[0].newP;
					
					stxx.appendMasterData([clone(globalTick)]);
				}
			}else{
				
				var nextIntervalTickDt =  STXMarket.getNextIntervalStartDate(currentDate,  stxx);
				// Daily
				if(!checkGlobalTickValid()){//防止因行情服務器出錯拿不到數據而導致畫表顯示錯誤
					globalTick.Date = Util.getTime(data[0].dtime , dayFormat, stxx);
					globalTick.Open = data[0].newP;
					globalTick.Low = data[0].newP;
					globalTick.High = data[0].newP;
					globalTick.Dt = new Date(data[0].dtime * 1000);
					globalTick.Close = data[0].newP;
					stxx.appendMasterData([clone(globalTick)]);
					
				}else if( currentDate >= nextIntervalTickDt){//新時段開始
					
					lastIntervalTickDt = nextIntervalTickDt;
					nextIntervalTickDt = STXMarket.getNextIntervalStartDate(currentDate,  stxx);
					
					globalTick.Date = Util.getTime(nextIntervalTickDt.getTime()/1000, dayFormat);
					globalTick.Open = data[0].newP;
					globalTick.Low = data[0].newP;
					globalTick.High = data[0].newP;
					globalTick.Dt = new Date(data[0].dtime*1000);
					globalTick.Close = data[0].newP;
					
					//重新晝出新圖表
					stxx.appendMasterData([clone(globalTick)]);
					
					//更新最後時段及下一時段時間
				}else{ 
					
					//更新原來時段數據
					if(globalTick.Open == 0){
						globalTick.Open == data[0].newP;
					}
					globalTick.High = Math.max(globalTick.High, data[0].newP);
					globalTick.Low = Math.min(globalTick.Low, data[0].newP);
					globalTick.Close = data[0].newP;
					globalTick.Date = Util.getTime(currentDate.getTime()/1000, dayFormat);
					stxx.appendMasterData([clone(globalTick)]);
				}
			}
			
		}
	});	

	
	//globalTick={Date:"",Open:0,High:0,Low:0,Close:0,Volume:0};
	function checkGlobalTickValid(){
		return globalTick && globalTick.Date && globalTick.Open > 0 && globalTick.High > 0&& globalTick.Low > 0&& globalTick.Close > 0;
	}
	
	function genGlobalTick (ohlc){
			globalTick.High = ohlc[ohlc.length - 1].High;
			globalTick.Low = ohlc[ohlc.length - 1].Low;
			globalTick.Close = ohlc[ohlc.length - 1].Close;
			globalTick.Open = ohlc[ohlc.length - 1].Open;
			globalTick.Date = ohlc[ohlc.length - 1].Date;	
			globalTick.Dm = ohlc[ohlc.length - 1].Dm;
			lastIntervalOhlc = ohlc[ohlc.length - 1];
	}
	
	function showChart(ohlc, symbol){
		lastIntervalOhlc = ohlc[ohlc.length - 1];
		lastIntervalTickDt = new Date(lastIntervalOhlc.Dm * 1000);
		stxx.newChart(symbol, ohlc);
		if(ohlc.length < numOftickDisplay){
			stxx.setNumberOfCandle(ohlc.length);
		}else{
			stxx.setNumberOfCandle(numOftickDisplay);
		}
		genGlobalTick(ohlc);
		
	
	}
	
	
	function getMAInputs(period){
		var inputs = {Field:"Close", Period: period, Type: "simple", id:"MA ("+period+","+WebUiChartWords.wordLists.defaultWord.Close+","+WebUiChartWords.wordLists.defaultWord.Simple+")"};
		return inputs;
	}
	function getMAOutputs(color){
		var outputs = {MA: color};
		return outputs;
	}
	
	
	function getMACDInputs(fastMaPeriod, signlaPeriod, slowMaPeriod){
		var inputs = {"Fast MA Period":fastMaPeriod, 
						"Signal Period": signlaPeriod, 
						"Slow MA Period": slowMaPeriod,
						id:"MACD ("+fastMaPeriod+","+signlaPeriod+","+slowMaPeriod+")"};
		return inputs;
	}
	function getMACDOutputs(macdColor, signColor){
		var outputs = {MACD: macdColor, Signal: signColor};
		return outputs;
	}
	
	
	/**
	 * 再統計一次由最後分鐘數據到最後秒數數據，確保最後時段中的HIGH LOW CLOSE最準確
	 * 如果當中是新時段開始，即顯示新時段圖
	 
	queryPeriod(1397465700, 0, {symbol:"022"}, function(para, data){
		
	});*/
	
	
	/**
	 * 取得指定數量歷史報價
	 */
	function query(end, number,period_num, period_type, para, callback){
		var dfpara = {
					// para
					"time" : end, // 請求最新數據, time = 0
					"num" : number,
					"period_num" : period_num,  //  1-30 for minutes; 1-12 for hours; the other type :0
					"period_type" : period_type, // 1: minute, 2: hour, 3: daily, 4: week, 5: month
					"flag" : 0, //0 – asc	, 1 – desc
					"symbol" : "022"
				};	
		
		for(var name in para){
			dfpara[name] = para[name];
		}
		newsSocket.listeners.$listenSeq(Constant.CMD_QUOTE_QUERY, dfpara, callback);
	}
	
	
	/**
	 * 再統計一次由最後分鐘數據到最後秒數數據，確保最後時段中的HIGH LOW CLOSE最準確
	 * 如果當中是新時段開始，即顯示新時段圖
	 * period_type : 1: minute, 2: hour, 3: daily, 4: week, 5: month
	 * period_num :  1-30 for minutes; 1-12 for hours; the other type :0
	 * 如果取出某一分鐘起，每5分鐘最新數據:  {symbol:"022", period_type: 1, period_num:5 }
	 
	queryPeriod(1397465700, 0, {symbol:"022", period_type: 1, period_num:1 }, function(para, data){
		
	});
	
	 * 取得指定時間歷史數據, 可準確到秒數
	 */
	function queryPeriod(begin, end, para, callback){
		var dfpara = {
				// para
					"time_outdated" : begin,
					"time_latest" : end // 請求最新數據, time = 0
					
				};	
		for(var name in para){
			dfpara[name] = para[name];
		}	
		newsSocket.listeners.$listenSeq(Constant.CMD_QUOTE_PERIOD_QUERY, dfpara, callback);
	}
	
	
	

	WebUiChart.changePeriodicity = function(newInterval, objId){
		var symbol = $("#symbol-select").val();
		
		$("[lb=tmclick]").each(function() {
			
		   if(this.id == objId){
			   $(this).attr("class","tp-icon-hov tp-icon-on2");
		   }else{
			 
			   $(this).attr("class","tp-icon-hov");
		   }
		});
		
		if("week" == newInterval){
			displayWeekly(symbol);
		}else if("day" == newInterval){
			displayDaily(symbol);
		}else if("month" == newInterval){
			displayMonthly(symbol);
		}else{
			displayPeriod(newInterval, symbol);
		}
	};

	WebUiChart.createStudy = function(){
		STXStudies.go($$("studyDialog"), stxx);
	};
	
	
	WebUiChart.setChartTypeById = function(obj){
		var chartType = obj.value;
		if(chartType != ""){
			WebUiChart.setChartType(chartType);
		}
	};
	
	WebUiChart.setChartType = function(type){
		stxx.setChartType(type);
		
	};
	
	WebUiChart.changeToolClass = function(id){
		
		var attr = $("#"+id).attr("class");
		 if(attr == "tp-icon-hov"){
			   $(this).attr("class","tp-icon-hov tp-icon-on2");
		   }else{
			 
			   $(this).attr("class","tp-icon-hov");
		   }
		
	}
	
	WebUiChart.setChartToolCrossHair=function(){
		WebUiChart.setVectorType('');WebUiChart.crosshairs(true);
		$("#stx-chart-tool-select").val("crosshairs");
	}
	
	WebUiChart.setChartToolType = function (obj){
		var toolType = obj.value;
		if("none" == toolType){
			WebUiChart.setVectorType('');WebUiChart.crosshairs(false);
		}else if("crosshairs" == toolType){
			WebUiChart.setVectorType('');WebUiChart.crosshairs(true);
		}else if("clearDrawings" == toolType){
		
			WebUiChart.clearDrawings();
			WebUiChart.setVectorType('');WebUiChart.crosshairs(false);
		}else{
			WebUiChart.setVectorType(toolType);
		}
	}
	
	WebUiChart.crosshairs = function(trueFlase){
		STXDrawingToolbar.crosshairs(stxx,trueFlase);
	};
	
	WebUiChart.clearDrawings = function(){
		stxx.clearDrawings();
	};
	
	
	WebUiChart.setVectorType = function(type){
		STXDrawingToolbar.setVectorType(stxx,type);
	};
	
	WebUiChart.studyDialog=function(obj){
		if(!stxx || stxx.chart.dataSet.length==0) return;
		var study = obj.value;
		var studyText = obj.options[obj.selectedIndex].text;;
		
		obj.value = "";
		STXStudies.studyDialog(stxx, study, $$("studyDialog"));
		STXDialogManager.displayDialog("studyDialog");
			
		$('div#studyDialog div.title').html('<b>'+studyText+'</b>');
	
	};

	function runSampleUI(){
		STXThemeManager.builtInThemes={
				"Light":"stx-demo-theme-1.css",
				"Dark":"stx-demo-theme-2.css"
		};
		// Set up menu manager

		STXDrawingToolbar.initialize();
		STXDrawingToolbar.setVectorType(stxx, null);

	}

	
	
	WebUiChart.toggleFullScreenMode = function (){
		var wrapper=$$$(".stx-wrapper");
		if(window.fullScreenMode){
			var rightSide=stxx.chart.maxTicks-stxx.chart.scroll;
			wrapper.style.position=null;
			wrapper.style.left=null;
			wrapper.style.top=null;
			wrapper.style.width=null;
			var chartContainer=$$("chartContainer");
			chartContainer.style.height=chartContainer.style.prevHeight;
			chartContainer.style.width=chartContainer.style.prevWidth;
			wrapper.style.height=null;
			wrapper.style.width=null;
			
			document.getElementById('display_tick_div').style.display = "";
			document.getElementById('display_balance_div').style.display = "";
			document.getElementById('display_investment_box').style.display = "";
			
			stxx.resizeChart();
			stxx.chart.scroll=stxx.chart.maxTicks-rightSide;
			stxx.draw();
		}else{
			// stx-wrapper must be at the body level of the page for full screen to work
			// and it must have a z-index greater than anything else on the page
			wrapper.style.position="absolute";
			wrapper.style.left="0px";
			wrapper.style.top="0px";
			wrapper.style.width="100%";
			var chartContainer=$$("chartContainer");
			chartContainer.style.prevHeight=chartContainer.style.height;
			chartContainer.style.prevWidth=chartContainer.style.width;
			
			document.getElementById('display_tick_div').style.display = "none";
			document.getElementById('display_balance_div').style.display = "none";
			document.getElementById('display_investment_box').style.display = "none";
			
			
			resizeContainers();
			stxx.resizeChart();
		}
		window.fullScreenMode=!window.fullScreenMode;
	}
	
	
	
	
	function prependHeadsUpHR(){
		
		var crosshairTick = stxx.tickFromPixel(stxx.backOutX(STXChart.crosshairX), this.chart); 
		var prices= stxx.layout.crosshair ? this.chart.dataSet[crosshairTick]: this.chart.dataSet[this.chart.dataSet.length -1];
	
		$$("huOpen").innerHTML="";
		$$("huClose").innerHTML="";
		$$("huHigh").innerHTML="";
		$$("huLow").innerHTML="";
		$$("huTime").innerHTML="";
		
		if(prices!=null){
		
			if(prices){
				var prdCode = $("#symbol-select").val();
				$$("huTime").innerHTML=prices.Date;
				$$("huOpen").innerHTML=Util.formatPriceByPrdcode(prdCode, prices.Open);
				$$("huClose").innerHTML=Util.formatPriceByPrdcode(prdCode, prices.Close);
				$$("huHigh").innerHTML=Util.formatPriceByPrdcode(prdCode, prices.High);
				$$("huLow").innerHTML=Util.formatPriceByPrdcode(prdCode, prices.Low);
			}
		}
	}
	

	function resizeContainers(){
	    if(STX.ipad && STX.isIOS7){
	    	// IOS7 bug in landscape mode doesn't report the pageHeight correctly. The fix is to fix the height
	    	// in css and then adjust the body height to the new size
	    	STX.appendClassName($$$("html"),"ipad ios7");
	    	$$$("body").style.height=pageHeight()+"px";
	    }

		var chartContainer=$$("chartContainer");
		var chartArea=$$$(".stx-wrapper");
		var sidePanel=$$$(".stx-panel-side");
		var panelWidth=0;
		if(sidePanel && sidePanel.offsetLeft){
			panelWidth=chartArea.offsetWidth-sidePanel.offsetLeft;
		}
		
		chartContainer.style.width=(chartArea.offsetWidth-panelWidth)+"px";
		
		var bottomMargin=0;
		if($$$(".stx-footer")) bottomMargin=$$$(".stx-footer").offsetHeight;

		chartContainer.style.height=(pageHeight()-getPos(chartContainer).y - bottomMargin) + "px";
		chartArea.style.height=(pageHeight()-getPos(chartArea).y - bottomMargin) + "px";
		
		if(stxx && stxx.chart.canvas!=null){
			stxx.resizeChart();
		}
	}

	WebUiChart.setLine = function(thickness, type){// int, String 
		STXDrawingToolbar.setLine(thickness,type);
	}
	
	
	function resizeScreen(){
		if(stxx && stxx.chart.canvas!=null){
			if(window.fullScreenMode){
				resizeContainers();
			}else{
				stxx.resizeChart();
			}
		}
	}

	WebUiChart.setTheme = function(name){
		STXThemeManager.themes.enabledTheme = name;
		STXThemeManager.enableBuiltInTheme(WebUiChart.getStxChart(), name);
		stxx.draw();
	}
	
	WebUiChart.getStxChart = function(){
		return stxx;
	}
	
	window.onresize=resizeScreen;
	runSampleUI();
});


