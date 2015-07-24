/*
 * stxAdvanced.js 
 */


/*
 * STX.Comparison - enables comparison charting
 */
STX.Comparison.startPlugin();
STX.Comparison.colorOrder=["#b387d7","#ff9250","#e36460","#dcdf67","#b3d987","#ffcd2b","#66cac4","#97b8f7"];
STX.Comparison.colorPointer=0;
STX.Comparison.type="compare";
STX.Comparison.attachColorPicker=function(){
	var swatch=$$$("#menuWrapperCompare .color");
	STX.Comparison.colorSelection=getComputedStyle(swatch).backgroundColor;
	STXMenuManager.attachColorPicker(swatch, $$$("#menuWrapperCompare #menuCompare"), function(color){
		STX.Comparison.colorSelection="#" + color;
	}, true);
};

STX.Comparison.processComparison=function(stx, symbol, comparison){
	// Match up the comparison and store the data point
    var timezoneOffset=0;
	var mIterator=0,cIterator=0;
	while(mIterator<stx.masterData.length && cIterator<comparison.length){
		var c=comparison[cIterator];
		var m=stx.masterData[mIterator];
		if(!c.DT) c.DT=strToDateTime(c.Date);
		if(c.DT.getTime()==m.DT.getTime()){
			m[symbol]=c.Close;
			cIterator++;
			mIterator++;
			continue;
		}
		if(c.DT<m.DT) cIterator++;
		else mIterator++;
	}
};

STX.Comparison.add=function(stx, compareSymbol){
	$$$("#compareSymbol").blur();
	if(!compareSymbol) compareSymbol=$$$("#compareSymbol").value.toUpperCase();
	if(compareSymbol=="") return;
	function processResponse(symbol){
		return function(err, comparisonData){
			if(err) return;
			if(!stx.chart.legend){
				stx.chart.legend={
						x: 260,
						y: 10
				};
			}
            $$$("#compareSymbol").value="";
        	$$$("#compareNone").style.display="none";
            STX.Comparison.processComparison(stx, symbol, comparisonData);
			var isComparison=STX.Comparison.type=="compare";
			var myseries = stx.addSeries(symbol, {color: STX.Comparison.colorSelection, isComparison:isComparison, shareYAxis:isComparison});
			stx.createDataSet();
			if(isComparison){
				stx.setComparison(stx, stx.chart, true);
			}
			stx.draw();
			if(!STX.Comparison.comparisons[symbol]){
				var template=$$$(".symComparisonTemplate");
				var div=template.cloneNode(true);
				$$$(".stxItem", div).innerHTML=symbol;
				$$$(".close", div).onclick=function(stx, symbol){return function(){
					stx.removeSeries(symbol);
					stx.draw();
				};}(stx, symbol);
				div.style.display="";
				template.parentNode.appendChild(div);
				STX.Comparison.comparisons[symbol]={
						"div": div
				};
			}
			// Set up the next default color
			STX.Comparison.colorPointer++;
			if(STX.Comparison.colorPointer>=STX.Comparison.colorOrder.length) STX.Comparison.colorPointer=0;
			STX.Comparison.colorSelection=$$$("#menuWrapperCompare .color").style.backgroundColor=STX.Comparison.colorOrder[STX.Comparison.colorPointer];
		};
	}
	STX.Comparison.fetch(stx, compareSymbol, processResponse(compareSymbol));
	
};

/* Override this with your version of fetch! The data you fetch should be in the standard chart JSON format.
 * Once your data is fetched, call cb(error, data);
 * */
STX.Comparison.fetch=function(stx, comparisonSymbol, cb){
	// Your code to fetch data
};

STX.Comparison.reset=function(stx){
	for(var field in STX.Comparison.comparisons){
		var comparison=STX.Comparison.comparisons[field];
		var div=comparison.div;
		div.parentNode.removeChild(div);
	}
	STX.Comparison.comparisons={};
	STX.Comparison.colorPointer=0;
	STX.Comparison.colorSelection=$$$("#menuWrapperCompare .color").style.backgroundColor=STX.Comparison.colorOrder[STX.Comparison.colorPointer];
	stx.chart.series={};
	stx.setComparison(stx, stx.chart, false);
	$$$("#compareNone").style.display="";
};

STX.Comparison.initialize=function(stx){
	STX.Comparison.attachColorPicker();
	STX.Comparison.comparisons={};	// Holding object for comparison symbols
	STX.inputKeyEvents($$$("#compareSymbol"), function(){
		var compareSymbol=$$$("#compareSymbol").value.toUpperCase();
		if(compareSymbol==stx.chart.symbol) return;
	    STXMenuManager.closeThisMenu($$$("#compareSymbol"));
	    STX.Comparison.add(stx);
	});
};


STXChart.prototype.prepend("removeSeries", function(field){
	var comparison=STX.Comparison.comparisons[field];
	if(!comparison) return;
	var div=comparison.div;
	div.parentNode.removeChild(div);
	delete STX.Comparison.comparisons[field];
	if(STX.isEmpty(STX.Comparison.comparisons)){
		STX.Comparison.reset(this);
	}
});

/*
 * STX.Markers - Provides the ability to overlay HTML elements on the chart which move with the chart. Use stxInheritsFrom to
 * derive a class from the base class. Then override functions as necessary.
 */

/*
 * This method gets called when a STX.Markers object is initialized. You may override these values in your initialize() function
 */
STX.Markers.prototype.Construct=function(){
	this.display=true;	// Use this to control whether to display the plugin or not, such as from a menu selection
	this.markers=[];
	this.panelName="chart";	// This can be a different panel
	this.panel=null;		// This will get set automatically given the panel name
	this.placementFunction=null;	// Set this to the placement function of your choice
	this.attached=false;	// Set to true once the panel container is created
	this.hover=true;		// If true then markers will z-index increment when touched or moused over
	this.focus=true;		// If true then markers will take focus away from the chart when touched or moused over
	this.drawStems=true;	// If true then stems will be created that link the markers to the chart bar
	this.stemClass="stx-stem";	// Defines the color and width of the stem
	this.transitionMS=25;		// Milliseconds delay to prevent too many redraws.
};


/*
 * Places a marker directly above the chart candle.
 */
STX.Markers.AboveCandle=function(self, stx, panel, markerSet){
	var chart=panel.chart;
	for(var i=0;i<markerSet.length;i++){
		var marker=markerSet[i];
		var node=marker.node;
		var stem=marker.stem;
		// Getting clientWidth and clientHeight is a very expensive operation
		// so we'll cache the results. Don't use this function if your markers change
		// shape or size dynamically!
		if(!marker.clientWidth) marker.clientWidth=node.clientWidth;
		if(!marker.clientHeight) marker.clientHeight=node.clientHeight;
		var quotes=chart.dataSet[marker.tick];

		var bottom;
		if(stx.layout.chartType=="line" || stx.layout.chartType=="mountain"){
			bottom=Math.round(panel.bottom-stx.pixelFromPriceTransform(quotes.Close, panel))+"px";
		}else{
			bottom=Math.round(panel.bottom-stx.pixelFromPriceTransform(quotes.High, panel))+"px";
		}
		
		node.style.left=Math.round(stx.pixelFromTick(marker.tick)-marker.clientWidth/2)+"px";
		if(node.style.bottom!=bottom) node.style.bottom=bottom;
	}
};

// This method intelligently places markers above the chart so that they can all be seen. It is computationally expensive
// so only use it when you have a few dozen markers on the screen

STX.Markers.BubblePlacement=function(self, stx, panel, markerSet){
	function overlap(aR, bL, aB, bB, aT, bT){
		if(aR<bL) return false;
		if(aT<=bB && aT>=bT) return true;
		if(aB>=bT && aB<=bB) return true;
		return false;
	}
	var prevMarker=null;
	var prevLeft=null;
	var prevBottom=null;
	var chart=panel.chart;
	for(var i=0;i<markerSet.length;i++){
		var marker=markerSet[i];
		var node=marker.node;
		var stem=marker.stem;

		// Getting clientWidth and clientHeight is a very expensive operation
		// so we'll cache the results. Don't use this function if your markers change
		// shape or size dynamically!
		if(!marker.clientWidth) marker.clientWidth=node.clientWidth;
		if(!marker.clientHeight) marker.clientHeight=node.clientHeight;
		var quotes=chart.dataSet[marker.tick];


		var left=stx.pixelFromTick(marker.tick);
		var nodeLeft=Math.round(left-marker.clientWidth/2);
		var bottom;
		if(stx.layout.chartType=="line" || stx.layout.chartType=="mountain"){
			bottom=panel.bottom-stx.pixelFromPriceTransform(quotes.Close, panel);
		}else{
			bottom=panel.bottom-stx.pixelFromPriceTransform(quotes.High, panel);
		}
		var absoluteBottom=bottom;
		
		if(stem){
			stem.style.left=Math.round(left)+"px";
			var stemBottom=absoluteBottom+"px";
			if(stem.style.bottom!=stemBottom) stem.style.bottom=stemBottom;
			bottom+=60;
		}
		if(prevMarker){
			var right=left+marker.clientWidth;
			var prevTop=prevBottom-prevMarker.clientHeight;
			var top=bottom-marker.clientHeight;
			if(overlap(right, prevLeft, prevBottom, bottom, prevTop, top)){
				bottom=stripPX(prevMarker.node.style.bottom)+prevMarker.clientHeight+10;
			}
		}
		if(stem){
			var stemHeight=Math.round(bottom-absoluteBottom)+"px";
			if(stem.style.height!=stemHeight) stem.style.height=stemHeight;
		}
		node.style.left=nodeLeft+"px";
		var nodeBottom=bottom+"px";
		if(node.style.bottom!=nodeBottom) node.style.bottom=nodeBottom;
		prevMarker=marker;
		prevLeft=nodeLeft;
		prevBottom=bottom;
	}
};


/*
 * Instantiates a stxMarkers plugin with an stx and a name to associate the plugin.
 * Call this when you create your marker object.
 * Multiple stxMarkers plugins can be run by choosing different names for each
 */
STX.Markers.prototype.main=function(stx, name){
	stx.plugins[name]=this;
};

// Override this with your initialization function
STX.Markers.prototype.initialize=function(stx){};

/************************** STXSocial ********************************/

function STXSocial(){
}

STXSocial.Decoration=function(){
	this.initialize=function(stx, canvas, widthPX, heightPX){};	// Override this with a function to calculate and store header and footer pixels
	this.headerPX=0;
	this.footerPX=0;
	this.decorate=function(stx, context){};	// Override this with a function to actually decorate the canvas
};

// Create a png image based on the current chart. If widthPX and heightPX are passed in
// then the image will be scaled to the requested dimensions. If either widthPX or heightPX
// are passed but not the other then the image will be scaled accordingly but maintain
// it's dimensions.
// This function is asynchronous and requires a callback function. The callback will be passed
// a data object which can be sent to a server or converted to an image.
// decorationObj can be used to "decorate" the canvas. For instance, you can add a header
// or footer to the canvas. The defaultDecorator will be used if null is passed in. To not use
// a decorator pass an empty object in {}
STXSocial.createImage=function(stx, widthPX, heightPX, decorationObj, cb){
	if(!decorationObj) decorationObj=STXSocial.defaultDecorator;
	if(!decorationObj.initialize) decorationObj=null;
	
	// Compute and/or determine sizes of headers and footers for decorator
	if(decorationObj!=null){
		decorationObj.initialize(stx, stx.chart.canvas, widthPX, heightPX);
	}
	
	// Set background for any part of canvas that is currently transparent
	STX.fillTransparentCanvas(stx.chart.context, stx.containerColor, stx.chart.canvas.width, stx.chart.canvas.height);
	
	// Render panel labels
	STXSocial.watermarkPanels(stx);
	
	// We use style height/width instead of the canvas width/height when the backing store is 2x on retina screens
	var renderedHeight=stx.chart.canvas.height;
	var renderedWidth=stx.chart.canvas.width;
	if(stx.chart.canvas.style.height && stx.chart.canvas.style.height!=""){
		renderedHeight=stripPX(stx.chart.canvas.style.height);
		renderedWidth=stripPX(stx.chart.canvas.style.width);
	}
	if(widthPX && heightPX){
		renderedHeight=heightPX;
		renderedWidth=widthPX;
		if(decorationObj!=null){
			renderedHeight=renderedHeight-decorationObj.headerPX-decorationObj.footerPX;
		}
	}else if(heightPX){
		if(decorationObj){
			renderedHeight=heightPX-decorationObj.headerPX-decorationObj.footerPX;
		}
		renderedWidth=stx.chart.canvas.width*(renderedHeight/stx.chart.canvas.height);
	}else if(widthPX){
		renderedWidth=widthPX;
		renderedHeight=stx.chart.canvas.height*(widthPX/stx.chart.canvas.width);
		if(decorationObj){
			renderedHeight=renderedHeight+decorationObj.headerPX + decorationObj.footerPX;
		}
	}
	var totalHeight=renderedHeight;
	var y=0;
	if(decorationObj){
		totalHeight=totalHeight+decorationObj.headerPX + decorationObj.footerPX;
		y=decorationObj.headerPX;
	}

	// Render the canvas as an image
	var shareImage=document.createElement("img");
	shareImage.onload = function(){
		// Print the image on a new canvas of appropriate size
		var canvas=document.createElement("canvas");
		canvas.width=renderedWidth;
		canvas.height=totalHeight;
		var context=canvas.getContext("2d");
		stx.adjustBackingStore(canvas, context);
		STX.fillTransparentCanvas(context, "#FFFFFF", canvas.width, canvas.height);
		context.drawImage(this, 0, 0, stx.chart.canvas.width, stx.chart.canvas.height, 0, y, renderedWidth, renderedHeight);

		// Add any decorations
		if(decorationObj!=null){
			decorationObj.decorate(stx, context);
		}
		stx.draw();	// redraw the canvas to get rid of the watermark panels

		cb(canvas.toDataURL("image/png"));	// return the data
	};
	shareImage.src=stx.chart.canvas.toDataURL("image/png");
};


// BEGIN Copy and paste this to your own decorator to customize the image headers and footers
STXSocial.defaultDecorator=new STXSocial.Decoration();
STXSocial.defaultDecorator.initialize=function(stx, canvas, widthPX, heightPX){
	this.headerPX=50;
	this.footerPX=0;
};
STXSocial.defaultDecorator.decorate=function(stx, context){
	var cursor=10;
	var centerLine=24;
	context.textBaseline="middle";
	stx.canvasColor("stx_share", context);
	stx.canvasFont("stx_share_symbol", context);
	var w=context.measureText(stx.chart.symbol).width;
	context.fillText(stx.chart.symbol, cursor, centerLine);
	
	cursor+=w+5;	
	stx.plotLine(cursor, cursor, centerLine-8, centerLine+8, stx.canvasStyle("stx_share"), "segment", context);
	
	cursor+=5;
	
	stx.canvasFont("stx_share", context);
	var txt=mmddyyyy(stx.chart.dataSegment[0].Date) + "-" + mmddyyyy(stx.chart.dataSegment[stx.chart.dataSegment.length-1].Date);
	w=context.measureText(txt).width;
	context.fillText(txt, cursor, centerLine);

	cursor+=w+5;
	stx.plotLine(cursor, cursor, centerLine-8, centerLine+8, stx.canvasStyle("stx_share"), "segment", context);

	cursor+=5;
	txt=STX.readablePeriodicity(stx);
	context.fillText(txt, cursor, centerLine);
	context.textBaseline="alphabetic";
};
// END copy and paste


// Uploads an image to a server. See sample python code for parsing the data
// on the server side. The callback will take two parameters. The first parameter is an error
// condition (server status), or null if there is no error. The second parameter (if no error) will contain
// the response from the server
// payload is an optional object that contains meta-data for the server. If payload
// exists then the image will be added as a member of the payload object, otherwise
// an object will be created
// dataImage should be a data representation of an image created by the call canvas.toDataURL such as is returned by STXSocial.createImage
// If you are getting a status of zero back then you are probably encountering a cross-domain ajax issue. Check your access-control-allow-origin header on the server side

STXSocial.uploadImage=function(dataImage, url, payload, cb){
	if(!payload) payload={};
	payload.image=dataImage;
	var valid=postAjax(url, JSON.stringify(payload), function(status, response){
		if(status!=200){
			cb(status, null);
			return;
		}
		cb(null, response);
	});
	if(!valid) cb(0, null);
};

// The panel names in our charts are div tags which will not render as images.
// This method will draw the panel names on the canvas itself. It is called
// temporarily when creating an image.
STXSocial.watermarkPanels=function(stx){
	//stx.chart.context.font="12px Helvetica";
	//stx.chart.context.strokeStyle="#7c878b";
	stx.canvasFont("stx_panels");
	stx.chart.context.globalAlpha=1;
	stx.chart.context.textBaseline="alphabetic";
	stx.chart.context.textAlign="left";
	var first=false;
	for(var p in stx.panels){
		var panel=stx.panels[p];
		if(panel.hidden==true) continue;
		if(panel.name=="chart") continue;
		stx.canvasColor("stx_panel_background");
		var t=panel.icons.offsetTop;
		semiRoundRect(stx.chart.context, 0, t+4, 70, 20, 5, true);

		stx.canvasColor("stx_panels");
		stx.chart.context.fillText(panel.title.innerHTML.toUpperCase(), panel.icons.offsetLeft+4, t+18);
	}	
};

/*
 * Here's an example of how you can display the image on the screen. Create a real dialog using HTML if you want to use this.
 */
STXSocial.displayImageExample=function(imgData){
	var div=document.createElement("div");
	div.style.margin="0 auto";
	div.style.width="1000px";
	div.style.border="solid black 3px";
	div.style.zIndex=100;
	div.style.position="relative";
	div.style.top="-500px";

	var img=document.createElement("img");
	img.onload=function(){
		div.appendChild(img);
		document.body.appendChild(div);			
	};
	img.src=imgData;
};

/*
 * positioning should be an array [x,y] which indicates pixels away from edge. Use negative values to position from right or bottom.
 * leave null to center image
 * 
 * Call this function only once with your STXChart object!
 */
STXSocial.brandMyChart=function(stx, imageURL, positioning){
	function prependDisplayChart(stx, image, positioning){
		return function(){
			var x=stx.chart.canvasWidth/2-image.width/2;
			var y=stx.panels["chart"].height/2-image.height/2;
			if(positioning){
				if(positioning[0]>0){
					x=positioning[0];
				}else{
					x=stx.chart.width-image.width+positioning[0];
				}
				if(positioning[1]>0){
					y=positioning[1];
				}else{
					y=stx.panels["chart"].height-image.height+positioning[1];
				}
			}
			stx.chart.context.drawImage(image, x, stx.panels["chart"].top+y);
		};
	}

	var image=document.createElement("img");
	image.onload=function(stx, prependDisplayChart, positioning){
		return function(){
			STXChart.prototype.prepend("displayChart", prependDisplayChart(stx, this, positioning));
			stx.draw();
		};
	}(stx, prependDisplayChart, positioning);
	image.src=imageURL;
};

STX.Quotes=function(){};
STX.Quotes.Demo=function(){};	// Demo version of quotes. Create another class for your quote feed.

STX.Quotes.nextDataSource=function(params, currentSource){
	return null;
};

/*
 * Fetch multiple quotes asynchronously, possibly from various data sources. cb returns an array of results. Each result
 * is an object containing err, data where err will either be null or the error condition
 */
STX.Quotes.multiFetch=function(arr, cb){
	var tracker={
		counter:0,
		finished: arr.length,
		results: []
	};

	function handleResponse(params, tracker, cb){
		return function(err, data){
			tracker.results.push({err:err, params: params, data:data});
			tracker.counter++;
			if(tracker.counter==tracker.finished){
				cb(tracker.results);
			}
		};
	}
	for(var i=0;i<arr.length;i++){
		var params=arr[i];
		STX.Quotes.fetch(params, handleResponse(params, tracker, cb));
	}
};

/*
 * Fetch data. This method will automatically determine the appropriate data source
 * for the data depending on the interval and user permissions.
 * Callback function will return fc(error, data) where error will be null if no error and data will be in format required by kernel
 * params{
 * 	source: "Demo" or the name of your custom source class
 * 	stx: STXChart object
 * 	+ any other parameters that require to implement your quote feed (such as start date, end date, number of bars, etc)
 * }
 */
STX.Quotes.fetch=function(params, cb){
    if(!params.source) params.source="Demo";
	function handleResponse(error, data){
		cb(error, data);
	};
	STX.Quotes[params.source].fetch(params, handleResponse);
};

/*
 * Returns how many bars should be fetched. If we're fetching a series then it's simply the number
 * of bars already in the chart. Otherwise it's the number of bars to fetch to fill up the screen.
 * If startDate is requested then this function is not called.
 */
STX.Quotes.barsToFetch=function(params){
	if(params.isSeries) return params.stx.masterData.length;

	var p=params.stx.layout.periodicity;
	// Rough calculation, this will account for 24x7 securities
	if(params.stx.layout.interval=="month") p=30*p;
	if(params.stx.layout.interval=="week") p=7*p;

	var bars=params.stx.chart.maxTicks*p;
	return bars;
};

/*
 * This is a demo version of fetch. You will need to create one for your own quote feed that behaves similarly
 */
STX.Quotes.Demo.fetch=function(params, cb){
	function setQuotes(response){
		eval(response);
		return historicalQuote;
	}
	
	url="http://demoquotes.whitelabelstockcharts.com/" + params.symbol.toUpperCase();
	var bars=STX.Quotes.barsToFetch(params);
	postAjax(url, null, function(status, response){
		if(status!=200){
			cb(status);
			return;
		}
		var quotes=setQuotes(response);
		var newQuotes=[];
		for(var i=0;i<quotes.length;i++){
			newQuotes[i]={};
			newQuotes[i].Date=quotes[i][0];
			newQuotes[i].Open=quotes[i][1];
			newQuotes[i].High=quotes[i][2];
			newQuotes[i].Low=quotes[i][3];
			newQuotes[i].Close=quotes[i][4];
			newQuotes[i].Volume=quotes[i][5];
			newQuotes[i].Adj_Close=quotes[i][6];
		}
		cb(null, newQuotes);
	});
};





