// -------------------------------------------------------------------------------------------
// Copyright 2012 by Modulus
// -------------------------------------------------------------------------------------------
// Be sure your webserver is set to deliver UTF-8 charset
// For apache add "AddDefaultCharset UTF-8" to httpd.conf
// otherwise use \u unicode escapes for non-ascii characters


var debugDoc=null;

function STX(){
}

if(typeof exports!="undefined") exports.STX=STX;

STX.ipad = navigator.userAgent.indexOf("iPad") != -1;
STX.iphone = navigator.userAgent.indexOf("iPhone") != -1;
STX.isSurface = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
STX.touchDevice = typeof(document.ontouchstart)!="undefined" || STX.isSurface;
STX.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
STX.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
STX.isIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
STX.isIE9 = (navigator.userAgent.indexOf("Trident/5") > -1) || (navigator.userAgent.indexOf("MSIE 9.0")>-1);
STX.isIE8 = false;
STX.isIOS7 = navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i);
STX.isSurfaceApp = window.MSApp;
STX.noKeyboard = STX.ipad || STX.iphone || STX.isAndroid || STX.isSurfaceApp;

STX.openDebugger=function(){
	var w=window.open("", "Debug", "width=500, height=400, scrollbars=1");
	debugDoc=w.document;
};

STX.debug=function(str){
	if(debugDoc==null){
		return;
	}
	debugDoc.writeln(str);
};

STX.inspectProperties=function(theObject){
   var theProperties = "";
   for (var i in theObject){
	if(i!="outerText" && i!="innerText" && i!="outerHTML" && i!="innerHTML"){
		if(typeof(theObject[i])=="function"){
			theProperties +=  i + "" + "()" + "<br>";
			console.log(i+"()");
		}else{
			try{
				console.log(i+"="+theObject[i]);
				theProperties +=  i + " = " + theObject[i] + "<br>";
			}catch(e){
			}
		}
	}
   }
   theProperties+="<P>";
   STX.debug(theProperties);
};

STX.colorToHex=function(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    if(!digits) digits=/(.*?)rgba\((\d+), (\d+), (\d+),.*\)/.exec(color);

    var red = parseFloat(digits[2]);
    var green = parseFloat(digits[3]);
    var blue = parseFloat(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    var s=digits[1] + '#' + rgb.toString(16);
    return s.toUpperCase();
};

STX.isTransparent=function(color){
	if(!color) return false;
	if(color=="transparent") return true;
	var digits=/(.*?)rgba\((\d+), (\d+), (\d+), (.*)\)/.exec(color);
	if(digits==null) return false;
	if(parseFloat(digits[5])==0) return true;
	return false;
};

// Accepts a css color, either # or rgb() but not a named color such as "black"
STX.hsv=function(color) {
	var hex=STX.colorToHex(color);
	if(hex.substr(0,1)==="#") hex=hex.slice(1);
	for(var i=hex.length;i<6;i++){
		hex+="0";
	}
	var r=parseInt(hex.slice(0,2),16);
	var g=parseInt(hex.slice(2,4),16);
	var b=parseInt(hex.slice(4,6),16);
	 var computedH = 0;
	 var computedS = 0;
	 var computedV = 0;

	 //remove spaces from input RGB values, convert to int
	 var r = parseInt( (''+r).replace(/\s/g,''),10 );
	 var g = parseInt( (''+g).replace(/\s/g,''),10 );
	 var b = parseInt( (''+b).replace(/\s/g,''),10 );

	 if ( r==null || g==null || b==null ||
	     isNaN(r) || isNaN(g)|| isNaN(b) ) {
	   return null;
	 }
	 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
	   return null;
	 }
	 r=r/255; g=g/255; b=b/255;
	 var minRGB = Math.min(r,Math.min(g,b));
	 var maxRGB = Math.max(r,Math.max(g,b));

	 // Black-gray-white
	 if (minRGB==maxRGB) {
	  computedV = minRGB;
	  return [0,0,computedV];
	 }

	 // Colors other than black-gray-white:
	 var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
	 var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
	 computedH = 60*(h - d/(maxRGB - minRGB));
	 computedS = (maxRGB - minRGB)/maxRGB;
	 computedV = maxRGB;
	 return [computedH,computedS,computedV];
};

function $$(id, source){
	if(!source) return document.getElementById(id);
	if(source.id==id) return source;	// Found it!
	if(!source.hasChildNodes) return null;
	for(var i=0;i<source.childNodes.length; i++){
		var element=$$(id, source.childNodes[i]);
		if(element!=null) return element;
	}
	return null;
}

function $$$(selector, source){
	if(!source) source=document;
	return source.querySelectorAll(selector)[0];	// We use querySelectorAll for backward compatibility with IE
}

function getEventDOM(e){
	if(!e){
		return window.event.srcElement;
	}else{
		return e.target;
	}
}

function getHostName(url) {
	try{
		return url.match(/:\/\/(.[^/]+)/)[1];
	}catch(e){
		return "";
	}
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
/*
 * function clone(data){ return eval('(' + JSON.stringify(data) + ')'); }
 */
function clone(from, to)
{
    if (from == null || typeof from != "object") return from;
    // if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var n in from)
    {
        to[n] = typeof to[n] == "undefined" ? clone(from[n], null) : to[n];
    }

    return to;
}

/*
 * Non-recursive clone. Use this to avoid deep cloning.
 */
STX.shallowClone=function(from){
	if(from.constructor==Array){
		var to=new Array(from.length);
		for(var i=0;i<from.length;i++){
			to[i]=from[i];
		}
		return to;
	}else{
		var to={};
		for(var field in from){
			to[field]=from[field];
		}
		return to;
	}
};

function uniqueID(){
	var epoch=new Date();
	var id=epoch.getTime().toString(36);
	id+=Math.floor(Math.random()*Math.pow(36,2)).toString(36);
	return id.toUpperCase();
}

function clearNode(node){
	if ( node.hasChildNodes() ){
		while ( node.childNodes.length >= 1 ){
    		node.removeChild( node.firstChild );
		}
	}
}


STX.monthLetters=["01","02","03","04","05","06","07","08","09","10","11","12"];
STX.monthAbv=["01","02","03","04","05","06","07","08","09","10","11","12"];

STX.monthAsDisplay=function(i, displayLetters,stx){
	if(displayLetters){
		if(stx && stx.monthLetters) return stx.monthLetters[i];
		return STX.monthLetters[i];
	}else{
		if(stx && stx.monthAbv) return stx.monthAbv[i];
		return STX.monthAbv[i];
	}
};

STX.timeAsDisplay=function(dt, stx){
	if(stx && stx.internationalizer){
		return stx.internationalizer.hourMinute.format(dt);
	}else{
		var min=dt.getMinutes();
		if(min<10) min="0" + min;
		return dt.getHours() + ":" + min;
	}
};

// Extract the name of the month from the locale. We do this by creating a
// localized date for the first
// date of each month. Then we extract the alphabetic characters. MonthLetters
// then becomes the first
// letter of the month. Note that in the current Intl.js locale, chinese and
// japanese months are implemented
// as 1月 through 12月 which causes this algorithm to fail. Hopefully real months
// will be available when Intl
// becomes a browser standard, otherwise this method or the locale will need to
// be modified for those or other special cases
STX.createMonthArrays=function(stx, formatter, locale){
	stx.monthAbv=[];
	stx.monthLetters=[];
	var dt=new Date();
	var shortenMonth=true;
	if(STXI18N.longMonths && STXI18N.longMonths[locale]) shortenMonth=false;
	for(var i=0;i<12;i++){
		dt.setDate(1);
		dt.setMonth(i);
		var str=formatter.format(dt);
		if(shortenMonth){
			var month="";
			for(var j=0;j<str.length;j++){
				var c=str.charAt(j);
				var cc=c.charCodeAt(0);
				if(cc<65) continue;
				month+=c;
			}
			stx.monthAbv[i]=month;
			stx.monthLetters[i]=month[0];
		}else{
			stx.monthAbv[i]=str;
			stx.monthLetters[i]=str;
		}
	}
};

function condenseInt(txt){
	if(!txt || typeof txt=="undefined") return "";
	if(txt>0){
		if(txt>1000000) txt=Math.round(txt/100000)/10 + "m";
		else if(txt>1000) txt=Math.round(txt/100)/10 + "k";
		else txt=txt.toFixed(0);
	}else{
		if(txt<-1000000) txt=Math.round(txt/100000)/10 + "m";
		else if(txt<-1000) txt=Math.round(txt/100)/10 + "k";
		else txt=txt.toFixed(0);
	}
	return txt;
}

function boxIntersects(bx1, by1, bx2, by2, x0, y0, x1, y1, vtype){
	if     (linesIntersect(bx1, bx2, by1, by1, x0, x1, y0, y1, vtype)) return true;
	else if(linesIntersect(bx1, bx2, by2, by2, x0, x1, y0, y1, vtype)) return true;
	else if(linesIntersect(bx1, bx1, by1, by2, x0, x1, y0, y1, vtype)) return true;
	else if(linesIntersect(bx2, bx2, by1, by2, x0, x1, y0, y1, vtype)) return true;
	return false;
}

function linesIntersect(x1, x2, y1, y2, x3, x4, y3, y4, type){
	var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
	var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
	var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
	var EPS = .000001;

	if(denom==0){
		if(numera==0 && numerb==0) return true; // coincident
		return false; // parallel
	}

	var mua = numera / denom;
	var mub = numerb / denom;
	if(type=="segment" || type=="zig zag"){
		if (mua>=0 && mua<=1 && mub>=0 && mub<=1) return true;
	}else if(type=="line" || type=="horizontal" || type=="vertical"){
		if (mua>=0 && mua<=1) return true;
	}else if(type=="ray"){
		if (mua>=0 && mua<=1 && mub>=0) return true;
	}
	return false;

}

function yIntersection(vector, x){
	var x1=vector.x0, x2=vector.x1, x3=x, x4=x;
	var y1=vector.y0, y2=vector.y1, y3=0, y4=10000;
	var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
	var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
	var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
	var EPS = .000001;

	if(denom==0) return null;

	var mua=numera/denom;
	var y=y1 + (mua * (y2-y1));
	return y;
}

function xIntersection(vector, y){
	var x1=vector.x0, x2=vector.x1, x3=0, x4=10000;
	var y1=vector.y0, y2=vector.y1, y3=y, y4=y;
	var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
	var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
	var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
	var EPS = .000001;

	if(denom==0) return null;
	var mua=numera/denom;
	var x=x1 + (mua * (x2-x1));
	return x;
}

function stripPX(text){
	return parseInt(text.substr(0, text.indexOf("p")));
}

// function pageHeight() { return document.documentElement.clientHeight;}
// function pageWidth() { return document.documentElement.clientWidth;}
function pageHeight() {
	var h=window.innerHeight;
	if(top!=self){
		try{
			if(h>parent.innerHeight) h=parent.innerHeight;
		}catch(e){}
	}
	return h;
}

function pageWidth() {
	var w=window.innerWidth;
	if(top!=self){
		try{
			if(w>parent.innerWidth) w=parent.innerWidth;
		}catch(e){}
	}
	return w;
}

STX.scrub=function(obj, removeNulls){
	for(var i in obj){
		if(typeof(obj[i])=="undefined")
			delete obj[i];
		if(removeNulls && obj[i]==null)
			delete obj[i];
	}
};

function strToDateTime(dt){
	if(dt == null || dt == '' ) {
		return new Date();
	}
	
	var myDateArray = null;
	if(dt.length==12){	// yyyymmddhhmm
		var y=parseFloat(dt.substring(0,4));
		var m=parseFloat(dt.substring(4,6)) - 1;
		var d=parseFloat(dt.substring(6,8));
		var h=parseFloat(dt.substring(8,10));
		var mn=parseFloat(dt.substring(10,12));
		var d=new Date(y, m, d, h, mn, 0, 0);
		return d;
	}else{
		var lr=dt.split(" ");
		if(dt.indexOf("T")!=-1) lr=dt.split("T");
		
		if(lr[0].indexOf('/')!=-1) myDateArray=lr[0].split("/");
		else if(lr[0].indexOf('-')!=-1) myDateArray=lr[0].split("-");

		if(myDateArray && myDateArray[0].length==4){	// YYYY-MM-DD
			year=parseFloat(myDateArray[0],10);
			myDateArray[0]=myDateArray[1];
			myDateArray[1]=myDateArray[2];
		}

		if(lr.length>1){
			var lr=lr[1].split(':');
			return new Date(year,myDateArray[0]-1,myDateArray[1], lr[0], lr[1], 0, 0);
		}else{
			return new Date(year,myDateArray[0]-1,myDateArray[1], 0, 0, 0, 0);
		}
	}
}

function strToDate(dt){
	var myDateArray;
	if(dt.indexOf('/')!=-1) myDateArray=dt.split("/");
	else if(dt.indexOf('-')!=-1) myDateArray=dt.split("-");
	else if(dt.length>=8){
		return new Date(parseFloat(dt.substring(0,4)), parseFloat(dt.substring(4,6))-1, parseFloat(dt.substring(6,8)));
	}else{
		return new Date();
	}
	if(myDateArray[2].indexOf(' ')!=-1){
		myDateArray[2]=myDateArray[2].substring(0, myDateArray[2].indexOf(' '));
	}
	var year=parseFloat(myDateArray[2],10);
	if(year<20) year+=2000;
	if(myDateArray[0].length==4){	// YYYY-MM-DD
		year=parseFloat(myDateArray[0],10);
		myDateArray[0]=myDateArray[1];
		myDateArray[1]=myDateArray[2];
	}
	return new Date(year,myDateArray[0]-1,myDateArray[1]);
}

function mmddyyyy(d){
	dt=strToDate(d);
	var m=dt.getMonth()+1;
	if(m<10) m="0" + m;
	var d=dt.getDate();
	if(d<10) d="0" + d;
	return m + "/" + d + "/" + dt.getFullYear();
}

function yyyymmdd(dt){
	var m=dt.getMonth()+1;
	if(m<10) m="0" + m;
	var d=dt.getDate();
	if(d<10) d="0" + d;
	return dt.getFullYear() + "-" + m + "-" + d;
}

function yyyymmddhhmm(dt){
	var m=dt.getMonth()+1;
	if(m<10) m="0" + m;
	var d=dt.getDate();
	if(d<10) d="0" + d;
	var h=dt.getHours();
	if(h<10) h="0" + h;
	var mn=dt.getMinutes();
	if(mn<10) mn="0" + mn;
	return '' + dt.getFullYear() + m + d + h + mn;
};

STX.friendlyDate=function(dt){
	var m=dt.getMonth()+1;
	if(m<10) m="0" + m;
	var d=dt.getDate();
	if(d<10) d="0" + d;
	var h=dt.getHours();
	if(h<10) h="0" + h;
	var mn=dt.getMinutes();
	if(mn<10) mn="0" + mn;
	return '' + dt.getFullYear() + "/" + m + "/" + d + " " + h + ":" + mn;
};

function mmddhhmm(strdt){
	var dt=strToDateTime(strdt);
	var m=dt.getMonth()+1;
	if(m<10) m="0" + m;
	var d=dt.getDate();
	if(d<10) d="0" + d;
	var h=dt.getHours();
	if(h<10) h="0" + h;
	var mn=dt.getMinutes();
	if(mn<10) mn="0" + mn;
	if(h=="00" && mn=="00") return m + "-" + d + "-" + dt.getFullYear();
	return m + "-" + d + " " + h + ":" + mn;
}

function getETDateTime(){
	var d=new Date();
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
	var utc = localTime + localOffset;
	var offset = -4;
	if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
			offset = -5;
	var est = utc + (3600000*offset);
	var nd = new Date(est);
	return nd;
}

STX.fromET=function(est){
	var d=new Date();
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
	var utc = localTime + localOffset;
	var offset = 4;
	if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
			offset = 5;
	var localTime = est.getTime() + (3600000*offset);
	var nd = new Date(localTime);
	return nd;
};

STX.money=function(val){
	return "$" + (Math.round(val*10000)/10000).toFixed(2);
};

function getAjaxServer(url){
	var server=false;
	var crossDomain=true;
	if(STX.isIE9 && url){
		if(getHostName(url)=="") crossDomain=false;
	}
	if(STX.isIE9 && crossDomain){
		server = new XDomainRequest();
		return server;
	}
	try{
		server = new XMLHttpRequest();
	}catch(e){
		try{
			server = new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				server = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){
				alert("ajax not supported in browser");
			}
		}
	}
	return server;
}

STX.qs=function(query) {
	var qsParm = new Array();
	if(!query) query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}else{
			var key = parms[i];
			qsParm[key] = null;
		}
	}
	return qsParm;
}

function convertClickToTouchEnd(id){
	var node=$$(id);
	var s=node.getAttribute("onClick");
	if(s && s!=""){
		node.removeAttribute("onClick");
		node.setAttribute("onTouchEnd", s);
	}
}


function getPos(el) {
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

STX.withinElement=function(node, x, y){
	var xy=getPos(node);
	if(x<xy.x) return false;
	if(y<xy.y) return false;
	if(x>xy.x+node.clientWidth) return false;
	if(y>xy.y+node.clientHeight) return false;
	return true;
};

function fixScreen(){
	window.scrollTo(0,0);
}


function setCaretPosition(ctrl, pos){
	ctrl.style.zIndex=5000;
	if(ctrl.setSelectionRange){
		STX.focus(ctrl);
		try{
			ctrl.setSelectionRange(pos,pos);
		}catch(e){}
	}else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function appendClassName(node, className){
	STX.appendClassName(node, className);
}
function unappendClassName(node, className){
	STX.unappendClassName(node, className);
}

STX.appendClassName=function(node, className){
	if(node.className==className) return; // already a class
	var s=node.className.split(" ");
	for(var i in s){
		if(s[i]==className) return;	// already a class
	}
	if(node.className=="") node.className=className;
	else node.className+=" " + className;
};

STX.unappendClassName=function(node, className){
	if(node.className.indexOf(className)==-1) return;
	if(node.className==className){
		node.className="";
	}else{
		var s=node.className.split(" ");
		var newClassName="";
		for(var i in s){
			if(s[i]==className) continue;
			if(newClassName!="") newClassName+=" ";
			newClassName+=s[i];
		}
		node.className=newClassName;
	}
};

STX.swapClassName=function(node, newClassName, oldClassName){
	STX.unappendClassName(node, oldClassName);
	STX.appendClassName(node, newClassName);
};

// Don't use, just for crosshairs
var blocks=[];
function createDIVBlock(left, width, top, height){
	var block=document.createElement("div");
	block.style.position="fixed";
	block.style.left=left + "px";
	block.style.width=width + "px";
	block.style.top=top + "px";
	block.style.height=height + "px";
	document.body.appendChild(block);
	blocks[blocks.length]=block;
	return block;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	  if (typeof stroke == "undefined" ) {
	    stroke = true;
	  }
	  if (typeof radius === "undefined") {
	    radius = 5;
	  }
	  ctx.beginPath();
	  ctx.moveTo(x + radius, y);
	  ctx.lineTo(x + width - radius, y);
	  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	  ctx.lineTo(x + width, y + height - radius);
	  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  ctx.lineTo(x + radius, y + height);
	  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	  ctx.lineTo(x, y + radius);
	  ctx.quadraticCurveTo(x, y, x + radius, y);
	  ctx.closePath();
	  if (stroke) {
	    ctx.stroke();
	  }
	  if (fill) {
	    ctx.fill();
	  }
}

function semiRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
	  if (typeof stroke == "undefined" ) {
	    stroke = true;
	  }
	  if (typeof radius === "undefined") {
	    radius = 5;
	  }
	  ctx.beginPath();
	  ctx.moveTo(x, y);
	  ctx.lineTo(x + width - radius, y);
	  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	  ctx.lineTo(x + width, y + height - radius);
	  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  ctx.lineTo(x, y + height);
	  ctx.lineTo(x, y);
	  ctx.closePath();
	  if (stroke) {
	    ctx.stroke();
	  }
	  if (fill) {
	    ctx.fill();
	  }
}
function getLines(ctx,phrase,l) {
	var wa=phrase.split(" "), phraseArray=[], lastPhrase="", measure=0;
	var fw=false;
	for (var i=0;i<wa.length;i++) {
		var w=wa[i];
		measure=ctx.measureText(lastPhrase+w).width;
		if (measure<l) {
			if(fw) lastPhrase+=" ";
			fw=true;
			lastPhrase+=w;
		}else {
			phraseArray.push(lastPhrase);
			lastPhrase=w;
		}
		if (i===wa.length-1) {
			phraseArray.push(lastPhrase);
			break;
		}
	}
	return phraseArray;
}

STX.clearCanvas=function(canvas, stx){
	canvas.context.clearRect(0, 0, canvas.width, canvas.height);
	if(STX.isAndroid && !STX.is_chrome){	// Android browser last remaining
											// one to need this clearing method
		if(STXChart.useOldAndroidClear && stx){
			canvas.context.fillStyle=stx.containerColor;
			canvas.context.fillRect(0, 0, canvas.width, canvas.height);
			canvas.context.clearRect(0, 0, canvas.width, canvas.height);
		}
		var w=canvas.width;
    	canvas.width=1;
    	canvas.width=w;
	}
}

STX.alert=function(text){
	alert(text);
}

STX.horizontalIntersect=function(vector, x, y){
	if(x<Math.max(vector.x0, vector.x1) && x>Math.min(vector.x0, vector.x1)) return true;
	return false;
}

STX.twoPointIntersect=function(vector, x, y, radius){
	return boxIntersects(x-radius, y-radius, x+radius, y+radius, vector.x0, vector.y0, vector.x1, vector.y1, "segment");
};

STX.boxedIntersect=function(vector, x, y){
	if(x>Math.max(vector.x0, vector.x1) || x<Math.min(vector.x0, vector.x1)) return false;
	if(y>Math.max(vector.y0, vector.y1) || y<Math.min(vector.y0, vector.y1)) return false;
	return true;
}

STX.isInElement=function(div, x, y){
	if(x<div.offsetLeft) return false;
	if(x>div.offsetLeft+div.clientWidth) return false;
	if(y<div.offsetTop) return false;
	if(y>div.offsetTop+div.clientHeight) return false;
	return true;
}

STX.privateBrowsingAlert=false;
STX.localStorageSetItem=function(name, value){
	try{
		localStorage.setItem(name, value);
	}catch(e){
		if(!STX.privateBrowsingAlert){
			STX.alert("Your browser is in Private Browsing mode. Chart annotations will not be saved.");
			STX.privateBrowsingAlert=true;
		}
	}
}

// The most complicated function ever written
//
// colorClick = the div that the user clicks on to pull up the color picker. The color picker will set the
//              background of this to the selected color
//
// cpHolder = A global object that is used to contain the color picker and handle closures of the containing dialog.
//
// cb = Callback function for when the color is picked fc(color)

STX.attachColorPicker = function(colorClick, cpHolder, cb){
	var closure=function(colorClick, cpHolder, cb){
		return function(color){
			if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
			colorClick.style.backgroundColor="#"+color;
			if(cb) cb(color);
		}
	};
	colorClick.onclick=(function(fc, cpHolder){ return function(){
		if(cpHolder.colorPickerDiv==null){
			cpHolder.colorPickerDiv=document.createElement("DIV");
			cpHolder.colorPickerDiv.className="ciqColorPicker";
			document.body.appendChild(cpHolder.colorPickerDiv);
		}
		STX.createColorPicker(cpHolder.colorPickerDiv, fc);
		cpHolder.colorPickerDiv.style.display="block";
		var xy=getPos(this);
		var x=xy.x+this.clientWidth;
		if((x+cpHolder.colorPickerDiv.offsetWidth)>pageWidth())
			x-=(x+cpHolder.colorPickerDiv.offsetWidth)-pageWidth()+20;
		cpHolder.colorPickerDiv.style.left=x+"px";

		var y=(xy.y);
		if(y+cpHolder.colorPickerDiv.clientHeight>pageHeight())
			y-=(y+cpHolder.colorPickerDiv.clientHeight)-pageHeight();
		cpHolder.colorPickerDiv.style.top=y+"px";
	}})(closure(colorClick, cpHolder, cb), cpHolder);
};

STX.createColorPicker = function (div, fc) {
	var colors=["ffffff","ffd0cf","ffd9bb","fff56c","eaeba3","d3e8ae","adf3ec","ccdcfa","d9c3eb",
				"efefef","eb8b87","ffb679","ffe252","e2e485","c5e093","9de3df","b1c9f8","c5a6e1",
				"cccccc","e36460","ff9250","ffcd2b","dcdf67","b3d987","66cac4","97b8f7","b387d7",
				"9b9b9b","dd3e39","ff6a23","faaf3a","c9d641","8bc176","33b9b0","7da6f5","9f6ace",
				"656565","b82c0b","be501b","e99b54","97a030","699158","00a99d","5f7cb8","784f9a",
				"343434","892008","803512","ab611f","646c20","46603a","007e76","3e527a","503567",
				"000000","5c1506","401a08","714114","333610","222f1d","00544f","1f2a3c","281a33"
];
	clearNode(div);
	var ul=document.createElement("ul");
	div.appendChild(ul);
	for(var i=0;i<colors.length;i++){
		var c=colors[i];
		var li=document.createElement("li");
		var a=document.createElement("a");
		li.appendChild(a);
		a.href="javascript://";
		a.title=c;
		a.style.background="#"+c;
		a.innerHTML=c;
		ul.appendChild(li);
		a.onclick=(function(c){ return function(){ fc(c);};})(c);
	}
}

STX.isEmpty = function( o ) {
    for ( var p in o ) {
        if ( o.hasOwnProperty( p ) ) { return false; }
    }
    return true;
}

// Convenience function, returns the first property in an object, not guaranteed to work in all browsers
STX.first = function( o ) {
    for ( var p in o ) {
        return p;
    }
    return null;
}

STX.last = function( o ) {
	var l=null;
    for ( var p in o ) {
        l=p;
    }
    return l;
}

// Returns the number of properties in an object
STX.objLength = function( o ) {
	var i=0;
    for ( var p in o ) {
        i++;
    }
    return i;
}

STX.Plotter=function(){
	this.seriesArray=[];
	this.seriesMap={};
	this.text=[];
}
STX.Plotter.prototype={
		Series: function(name, strokeOrFill, color, opacity){
			this.name=name;
			this.strokeOrFill=strokeOrFill;
			this.color=color;
			this.opacity=opacity;
			this.moves=[];
			if(!opacity) this.opacity=1;
		},
		// Third argument can be either a color or a STXChart.Style object
		newSeries: function(name, strokeOrFill, colorOrStyle, opacity){
			var series;
			if(colorOrStyle.constructor == String) series=new this.Series(name, strokeOrFill, colorOrStyle, opacity);
			else series=new this.Series(name, strokeOrFill, colorOrStyle["color"], colorOrStyle["opacity"]);
			this.seriesArray.push(series);
			this.seriesMap[name]=series;
		},
		moveTo: function(name, x, y){
			var series=this.seriesMap[name];
			series.moves.push({"action":"moveTo","x":x,"y":y});
		},
		lineTo: function(name, x, y){
			var series=this.seriesMap[name];
			series.moves.push({"action":"lineTo","x":x,"y":y});
		},
		quadraticCurveTo: function(name, x0, y0, x1, y1){
			var series=this.seriesMap[name];
			series.moves.push({"action":"quadraticCurveTo","x0":x0, "y0":y0, "x1":x1, "y1":y1});
		},
		addText: function(text, x, y){
			this.text.push({"text":text,"x":x,"y":y});
		},
		drawText: function(context){
			for(var i=0;i<this.text.length;i++){
				var textObj=this.text[i];
				context.fillText(textObj.text, textObj.x, textObj.y);
			}
		},
		draw: function(context){
			this.drawText(context);
			for(var i=0;i<this.seriesArray.length;i++){
				var series=this.seriesArray[i];
				context.beginPath();
				context.lineWidth=1;
				context.globalAlpha=series.opacity;
				context.fillStyle=series.color;
				context.strokeStyle=series.color;
				for(var j=0;j<series.moves.length;j++){
					var move=series.moves[j];
					if(move.action=="quadraticCurveTo"){
						(context[move.action])(move.x0, move.y0, move.x1, move.y1);
					}else{
						(context[move.action])(move.x, move.y);
					}
				}
				if(series.strokeOrFill=="fill"){
					context.fill();
				}else{
					context.stroke();
				}
				context.closePath();
			}
			context.globalAlpha=1;
		}
}

// Microsoft RT disallows innerHTML that contains dom elements. Use this method
// to override.
STX.innerHTML=function(node, html){
	if(window.MSApp){
		MSApp.execUnsafeLocalFunction(function (){
			node.innerHTML=html;
		});
	}else{
		node.innerHTML=html;
	}
}


STX.loadUI=function(url, cb){
	var i=document.createElement("iframe");
	i.src=url+"?" + uniqueID();
	i.hidden=true;
	i.onload=(function(i){
		return function(){
			var iframeDocument = i.contentDocument || i.contentWindow.document;
			if(iframeDocument){
				var html=iframeDocument.body.innerHTML;
				document.body.removeChild(i);
				var div=document.createElement("div");
				STX.innerHTML(div, html);
				for(var j=0;j<div.children.length;j++){
					var ch=div.children[j].cloneNode(true);
					document.body.appendChild(ch);
				}
				cb();
			}
		}
	})(i);
	document.body.appendChild(i);
}

CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
	  // Our growth rate for our line can be one of the following:
	  // (+,+), (+,-), (-,+), (-,-)
	  // Because of this, our algorithm needs to understand if the x-coord and
	  // y-coord should be getting smaller or larger and properly cap the
		// values
	  // based on (x,y).
	  var lt = function (a, b) { return a <= b; };
	  var gt = function (a, b) { return a >= b; };
	  var capmin = function (a, b) { return Math.min(a, b); };
	  var capmax = function (a, b) { return Math.max(a, b); };

	  var checkX = { thereYet: gt, cap: capmin };
	  var checkY = { thereYet: gt, cap: capmin };

	  if (fromY - toY > 0) {
	    checkY.thereYet = lt;
	    checkY.cap = capmax;
	  }
	  if (fromX - toX > 0) {
	    checkX.thereYet = lt;
	    checkX.cap = capmax;
	  }

	  this.moveTo(fromX, fromY);
	  var offsetX = fromX;
	  var offsetY = fromY;
	  var idx = 0, dash = true;
	  while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
	    var ang = Math.atan2(toY - fromY, toX - fromX);
	    var len = pattern[idx];

	    offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
	    offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

	    if (dash) this.lineTo(offsetX, offsetY);
	    else this.moveTo(offsetX, offsetY);

	    idx = (idx + 1) % pattern.length;
	    dash = !dash;
	  }
	};

CanvasRenderingContext2D.prototype.stxLine = function (fromX, fromY, toX, toY, color, opacity, lineWidth, pattern) {
	this.beginPath();
	this.lineWidth=lineWidth;
	this.strokeStyle=color;
	this.globalAlpha=opacity;
	if(pattern){
		this.dashedLineTo(fromX, fromY, toX, toY, pattern);
	}else{
		this.moveTo(fromX, fromY);
		this.lineTo(toX, toY);
	}
	this.stroke();
	this.closePath();
}

CanvasRenderingContext2D.prototype.stxCircle = function(x, y,radius, filled){
	this.beginPath();
	this.arc(x, y, radius, 0, 2* Math.PI, false);
	if(filled) this.fill();
	this.stroke();
	this.closePath();
}

// Create a boxed label around a text item.
STX.textLabel = function (x, y, text, stx, style) {
	stx.canvasFont(style);
	var m=stx.chart.context.measureText(text);
	var fontHeight=stx.getCanvasFontSize(style);
	var s=stx.canvasStyle(style);
	var context=stx.chart.context;
	var arr=text.split("\n");
	var maxWidth=0;
	for(var i in arr){
		var m=stx.chart.context.measureText(arr[i]);
		if(m.width>maxWidth) maxWidth=m.width;
	}
	var height=arr.length*fontHeight;
	context.textBaseline="alphabetic";
	context.strokeStyle=s["border-left-color"];
	context.fillStyle=s["background-color"];
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x+maxWidth+10, y);
	context.lineTo(x+maxWidth+10, y+height+2);
	context.lineTo(x, y+height+2);
	context.lineTo(x, y);
	context.stroke();
	context.fill();
	context.closePath();
	context.strokeStyle=s["color"];
	context.fillStyle=s["color"];
	context.textBaseline="top";
	var y1=0;
	for(var i in arr){
		context.fillText(arr[i], x+5, y+y1+1);
		y1+=fontHeight;
	}
}

// Microsoft surface bug requires a timeout for cursor to show in focused text
// box
// Ipad also, sometimes, when embedded in an iframe but that's up to the caller
// to figure out
STX.focus = function (node, useTimeout){
	if(STX.isSurface || useTimeout){
		setTimeout(function(){node.focus();}, 0);
	}else{
		node.focus();
	}
}

// Finds all of the nodes that match the text. Traversal starts at startNode.
// This is a recursive function so be careful not to start too high in the DOM
// tree
STX.findNodesByText = function(startNode, text){
	if(startNode.innerHTML==text) return [startNode];
	var nodes=[];
	for(var i=0;i<startNode.childNodes.length;i++){
		var pushNodes=STX.findNodesByText(startNode.childNodes[i], text);
		if(pushNodes!=null){
			nodes=nodes.concat(pushNodes);
		}
	}
	if(nodes.length) return nodes;
	return null;
};

// Convenience function to hide nodes that contain certain text
STX.hideByText = function(startNode, text){
	var nodes=STX.findNodesByText(startNode, text);
	for(var i=0;i<nodes.length;i++){
		nodes[i].style.display="none";
	}
};

STX.intersectLineLineX = function(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
    var result;

    var ua_t = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
    var u_b  = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);

    var ua = ua_t / u_b;

    return ax1 + ua * (ax2 - ax1);
};

STX.intersectLineLineY = function(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
    var result;

    var ua_t = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
    var u_b  = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);

    var ua = ua_t / u_b;

    return ay1 + ua * (ay2 - ay1);
};

// Sets all transparent parts of the canvas to the background color
STX.fillTransparentCanvas = function(context, color, width, height){
	var compositeOperation = context.globalCompositeOperation;
	context.globalCompositeOperation = "destination-over";
	context.fillStyle = color;
	context.fillRect(0,0,width,height);
	context.globalCompositeOperation = compositeOperation;
};

STX.readablePeriodicity=function(stx){
	var displayPeriodicity=stx.layout.periodicity;
	var displayInterval=stx.layout.interval;
	if(!stx.isDailyInterval(displayInterval)){
		if(stx.layout.interval!="minute"){
			displayPeriodicity=stx.layout.interval*stx.layout.periodicity;
		}
		displayInterval="min";
	}
	if(displayPeriodicity%60==0){
		displayPeriodicity/=60;
		displayInterval="hour";
	}
	return displayPeriodicity + " " + displayInterval.capitalize();
};

// Post to ajax. If a payload is sent then it will post, otherwise it will get.
// cb is a callback function that
// should access http status as parameter 1 and the server response as parameter
// 2.
// To prevent browser caching, a timestamp is added to every query.
// This function supports cross origin ajax on IE9
function postAjax(url, payload, cb, contentType, noEpoch){
	var server=getAjaxServer(url);
	if(!server) return false;
	var epoch=new Date();
	if(!noEpoch){
		if(url.indexOf('?')==-1) url+="?" + epoch.getTime();
		else url+="&" + epoch.getTime();
	}
	if(!STX.isIE9){
		server.open(payload?"POST":"GET", url, true);
		if(!contentType) contentType='application/x-www-form-urlencoded';
		if(payload) server.setRequestHeader('Content-Type', contentType);
	}else{
		url=url.replace("https","http");
		server.open(payload?"POST":"GET", url, true);
		server.onload=function(){
			cb(200, server.responseText);
		};
		server.onerror=function(){
			cb(0, null);
		};
		server.onprogress=function(){};
	}
	server.onreadystatechange=function(){
		if(server.readyState==4){
			if(server.status==404){
				cb(server.status, null);
			}else if(server.status!=200){
				cb(server.status, server.responseText);
			}else{
				// Optional code for processing headers. Doesn't work for IE9
				/*var headerString=server.getAllResponseHeaders();
				var headerArray=headerString.split("\n");
				var headers={};
				for(var i=0;i<headerArray.length;i++){
					var split=headerArray[i].split(":");
					if(split[1] && split[1].charAt(0)==' ') split[1]=split[1].substring(1);
					if(split[0]!="")
					headers[split[0]]=split[1];
				}*/
				cb(200, server.responseText);
			}
		}
	};
	try{
		server.send(payload);
	}catch(e){
		cb(0, e);
	}
	return true;
};

STX.log10=function(y){
	return Math.log(y)/Math.LN10;
};

// Adds getComputedStyle for older browsers such as IE8
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		var style = {};
		for(var prop in el.currentStyle){
			style[prop]=el.currentStyle[prop];
		}
		style.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {
					return arguments[2].toUpperCase();
				});
			}
			return this[prop] ? this[prop] : null;
		};
		return style;
	}
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	    for (var i = (start || 0), j = this.length; i < j; i++) {
	        if (this[i] === obj) { return i; }
	    }
	    return -1;
	}
}

STX.newChild=function(div, tagName, className){
	var div2=document.createElement(tagName);
	if(className) div2.className=className;
	div.appendChild(div2);
	return div2;
};

STX.androidDoubleTouch=null;
STX.clickTouch=function(div, fc){
	// Annoyingly, Android default browser sometimes registers onClick events twice, so we ignore any that occur
	// within a half second
	function closure(div, fc){
		return function(e){
			if(STX.androidDoubleTouch==null){
				STX.androidDoubleTouch=new Date().getTime();
			}else{
				if(new Date().getTime()-STX.androidDoubleTouch<500) return;
				STX.androidDoubleTouch=new Date().getTime();
			}
			(fc)(e);
		};
	}
	if(STX.ipad || STX.iphone){
		div.ontouchend=fc;
	}else{
		if(STX.isAndroid){
			div.onclick=closure(div, fc);
		}else{
			div.onclick=fc;
		}
	}
};

/*
 * This method will return an tuple [min,max] that contains the minimum
 * and maximum values in the series where values are series[field]
 */
STX.minMax=function(series, field){
    var min=2000000000;
    var max=-2000000000;
    var entry;
    for(var i=0;i<series.length;i++){
    	var entry=series[i];
    	if(!entry) continue;
        var val=entry[field];
        if(!val && val!=0) continue;
        if(isNaN(val)) continue;
        min=Math.min(min, val);
        max=Math.max(max, val);
    }
    return [min,max];
};

/*
 * This method will iterate through the object and replace all of the fields
 * using the mapping object. This would generally be used to compress an object
 * for serialization. so that for instance "lineWidth" becomes "lw". This method
 * is called recursively.
 */
STX.replaceFields=function(obj, mapping){
	var newObj={};
	for(var field in obj){
		var value=obj[field];
		var replaced=mapping[field];
		if(!replaced) replaced=field;
		if(value!=null && typeof value=="object"){
			if(value.constructor==Array){
				var arr=newObj[replaced]=new Array(value.length);
				for(var i=0;i<arr.length;i++){
					var val=value[i];
					if(typeof val=="object"){
						arr[i]=STX.replaceFields(val, mapping);
					}else{
						arr[i]=val;
					}
				}
			}else{
				newObj[replaced]=STX.replaceFields(value, mapping);
			}
		}else{
			newObj[replaced]=value;
		}
	}
	return newObj;
};

/*
 * This method reverses the fields and values in an object
 */
STX.reverseObject=function(obj){
	var newObj={};
	for(var field in obj){
		newObj[obj[field]]=field;
	}
	return newObj;
};

/* captures enter key events. Also clears the input box on escape key. cb should be the callback function when enter key is pressed. */
STX.inputKeyEvents=function(node, cb){
    node.addEventListener("keyup", function(e){
	    var key = (window.event) ? event.keyCode : e.keyCode;
	    switch(key){
		    case 13:
			    cb();
			    break;
            case 27:
                node.value="";
                break;
		    default:
			    break;
	    }
    }, false);
};


function STXI18N(){}
if(typeof exports!="undefined") exports.STXI18N=STXI18N;

// Hack code to make a multi line string easy cut & paste from a spreadsheet
STXI18N.hereDoc=function(f){
	return f.toString().replace(/^[^\/]+\/\*!?/,'').replace(/\*\/[^\/]+$/,'');
};

// Paste translation spreadsheet inbetween the comment tags. Make sure no leading tabs, trailing commas or spaces!
STXI18N.csv=STXI18N.hereDoc(function(){/*!en,ar,fr,de,hu,it,pu,ru,es,zh,ja
Chart,الرسم البياني,Graphique,Darstellung,Diagram,Grafico,Gráfico,График,Gráfica,图表,チャート
Chart Style,أسلوب الرسم البياني,Style de graphique,Darstellungsstil,Diagram stílusa,Stile grafico,Estilo do gráfico,Тип графика,Estilo de gráfica,图表类型,チャート形式
Candle,الشموع,Bougie,Kerze,Gyertya,Candela,Vela japonesa,Свеча,Vela,蜡烛,ローソク足
Bar,الأعمدة,Barre,Balken,Sáv,Barra,Barras,Бар,Barra,直线,棒
Colored Bar,الأعمدة الملونة,Barre en couleur,Farbiger Balken,Színes sáv,Barra colorata,Barras coloridas,Цветной бар,Barra de color,彩线,カラー棒
Line,الخطوط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,曲线,線
Hollow Candles,الشموع المفرغة,Bougies creuses,Hohlkerzen,Üres gyertyák,Candele Vuote,Vela vazia,Пустые свечи,Velas huecas,空心蜡烛,陽線ローソク足
Chart Scale,مقياس الرسم البياني,Échelle du graphique,Darstellungsskala,Diagram beosztás,Scala Grafico,Escala do gráfico,Шкала графика,Escala de la gráfica,图表尺度,チャート目盛
Log Scale,المقياس اللوغارتمي,Logarithmique,Log-Skala,Logaritmikus beosztás,Scala Log,Logarítmica,Лог. шкала,Logaritmo,对数尺度,対数目盛
Clear Drawings,مسح الرسومات,Éliminer les graphiques,Deutliche Zeichnungen,Ábrák törlése,Cancella Disegni,Limpar desenhos,Удалить изображения,Eliminar los dibujos,清空图示,描画をクリア
Studies,دراسات,Études,Studien,Elemzések,Studi,Estudos,Моделирование,Estudios,研究,スタディ
Timezone,المنطقة الزمنية,Plage horaire,Zeitzone,Időzóna,Fuso orario,Fuso horário,Часовой пояс,Zona horaria,时区,タイムゾーン
Change Timezone,تغيير المنطقة الزمنية,Modifier la plage horaire,Zeitzone ändern,Időzóna módosítása,Cambia fuso orario,Alterar fuso horário,Изменить часовой пояс,Cambiar zona horaria,更改时区,タイムゾーンの変更
Default Themes,الأنساق الافتراضية,Modèles de graphiques par défaut,Standardlayouts,Alapértelmezett témák,Temi di default,Temas padrão,Исходные темы,Temas predeterminados,默认主题,既定のテーマ
White,أبيض,Blanc,Weiß,Fehér,Bianco,Branco,Белая,Blanco,白色,白
Black,أسود,Noir,Schwarz,Fekete,Nero,Preto,Черная,Negro,黑色,黒
Custom Themes,أنساق مخصصة,Modèles personnalisés,Individuelle Layouts,Egyedi témák,Personalizza temi,Temas personalizados,Пользовательские темы,Temas personalizados,自定义主题,カスタムテーマ
New Custom Theme,نسق جديد مخصص,Nouveau modèle personnalisé,Neue individuelle Layouts,Új egyedi téma,Nuovo Tema Personalizzato,Novo tema personalizado,Создать пользовательскую тему,Nuevo tema personalizado,新自定义主题,新規カスタムテーマ
Select Tool,حدد أداة,Sélectionner,Werkzeug,Eszköz,Seleziona,Selecionar,Выбор,Seleccionar,选择工具,ツールの選択
None,لا شيء,Aucune,Keines,Egyik sem,Nessuno,Nenhuma,Без,Ninguna,无,なし
Crosshairs,علامات \"+\",Croix,Fadenkreuze,Célkeresztek,Mirini,Mira,Перекрестья,Cruz visor,十字线,十字
Annotation,تعليق توضيحي,Annotation,Anmerkung,Magyarázat,Annotazione,Anotação,Примечание,Anotación,注释,注釈
Horizontal,أفقي,Horizontal,Horizontal,Vízszintes,Orizzontale,Horizontal,Горизонт.,Horizontal,水平,水平
Segment,قطاع,Segment,Segment,Szegmens,Segmento,Segmento,Сегмент,Segmento,细分,区切り
Fill,التعبئة,Remplir,Füllen,Kitöltés,Riempimento,Preenchimento,Заливка,Relleno,填充,塗りつぶし
Line,خط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,线条,線
save,حفظ,Sauvegarder,speichern,mentés,salva,guardado,сохранение,guardar,存档,保存
cancel,إلغاء,Annuler,abbrechen,mégse,annulla,cancelamento,отмена,cancelar,取消,キャンセル
Close,إغلاق,Fermer,Schließen,Bezárás,Chiudi,Fecho,Закрыть,Cerrar,关闭,閉じる
Create,إنشاء,Créer,Erstellen,Létrehozás,Crea,Criação,Создать,Crear,创建,新規作成
Show Zones,عرض المناطق,Afficher des zones,Zonen anzeigen,Zónák megjelenítése,Mostra Zone,Mostrar zonas,Показать зоны,Mostrar zonas,显示区域,ゾーンの表示
OverBought,مُبَالَغ في الشراء,Suracheté,Überkauft,Túlvásárolt,Ipercomprato,Sobrecompra,OverBought (перекупленность),Exceso compra,超买,買い持ち
OverSold,مُبَالَغ في البيع,Survendu,Überverkauft,Túlértékesített,Ipervenduto,Sobrevenda,OverSold (перепроданность),Exceso venta,超卖,売り持ち
Choose Timezone,اختر منطقة زمنية,Choisir la plage horaire,Zeitzone wählen,Időzóna kiválasztása,Scegli Fuso orario,Escolher o fuso horário,Выбор врем. пояса,Elegir zona horaria,选择时区,タイムゾーンの選択
Create a New Custom Theme,إنشاء نسق جديد,Créer un nouveau modèle personnalisé,Neues individuelles Layout erstellen,Új egyedi téma létrehozása,Crea Nuovo Tema Personalizzato,Criar novo tema personalizado,Создать новую пользовательскую тему,Crear un nuevo tema personalizado,创建新的自定义主题,カスタムテーマの新規作成
Candles,شموع,Bougies,Kerzen,Gyertyák,Candele,Velas,Свечи,Velas,蜡烛,ローソク足
Border,الحدود,Ligne frontière,Rand,Szegély,Margine,Limite,Контур,Borde,边框,境界
Background,الخلفية,Contexte,Hintergrund,Háttér,Sfondo,Fundo,Фон,Fondo,背景,背景
Grid Lines,خطوط الشبكة,Lignes de quadrillage,Gitterlinien,Rácsvonalak,Griglia,Linhas grelha,Линии сетки,Líneas de cuadrícula,网格线,グリッド線
Date Dividers,فواصل التاريخ,Caractères de séparation,Datentrenner,Dátumelválasztók,Divisori Data,Divisores de data,Раздел. полей дат,Divisores de fecha,日期分隔符,日付区切り
Axis Text,بيان المحاور,Titres des axes,Achsentext,Tengely szövege,Testo Asse,Texto eixo,Название оси,Texto del eje,轴标题,軸ラベル
New Theme Name,اسم النسق الجديد,Nom du nouveau modèle,Neuer Layoutname,Új téma neve,Nome Nuovo Tema,Novo nome do tema,Название темы,Nombre del nuevo tema,新主题名称,新規テーマ名
Save Theme,حفظ النسق,Sauvegarder,Speichern,Téma mentése,Salva Tema,Guardar,Сохранить,Guardar,保存主题,テーマの保存
CURRENCIES,العملات,DEVISES,DEVISEN,DEVIZÁK,VALUTE,MOEDAS,ВАЛЮТЫ,DIVISAS,货币,通貨
*/});

STXI18N.language="en";
STXI18N.longMonths={"zh":true,"ja":true};	// Prints entire month from locale for languages that don't support shortening
STXI18N.wordLists={
		"en":{"1D":"",
			"1 D":"",
			"3 D":"",
			"1 W":"",
			"2 Wk":"",
			"1 Mo":"",
			"5 Min":"",
			"10 Min":"",
			"15 Min":"",
			"30 Min":"",
			"1 hour":"",
			"Chart":"",
			"Chart Style":"",
			"Candle":"",
			"Bar":"",
			"Colored Bar":"",
			"Line":"",
			"Hollow Candles":"",
			"Chart Scale":"",
			"Log Scale":"",
			"Studies":"",
			"Accumulative Swing Index":"",
			"Aroon":"",
			"Aroon Oscillator":"",
			"Average True Range":"",
			"Bollinger Bands":"",
			"Center Of Gravity":"",
			"Chaikin Money Flow":"",
			"Chaikin Volatility":"",
			"Chande Forecast Oscillator":"",
			"Chande Momentum Oscillator":"",
			"Commodity Channel Index":"",
			"Coppock Curve":"",
			"Detrended Price Oscillator":"",
			"Directional Movement System":"",
			"Ease of Movement":"",
			"Ehler Fisher Transform":"",
			"Elder Force Index":"",
			"Elder Ray":"",
			"Fractal Chaos Bands":"",
			"Fractal Chaos Oscillator":"",
			"Gopalakrishnan Range Index":"",
			"High Low Bands":"",
			"High Minus Low":"",
			"Highest High Value":"",
			"Historical Volatility":"",
			"Intraday Momentum Index":"",
			"Keltner Channel":"",
			"Klinger Volume Oscillator":"",
			"Linear Reg Forecast":"",
			"Linear Reg Intercept":"",
			"Linear Reg R2":"",
			"Linear Reg Slope":"",
			"Lowest Low Value":"",
			"MACD":"",
			"Mass Index":"",
			"Median Price":"",
			"Momentum Oscillator":"",
			"Money Flow Index":"",
			"Moving Average":"",
			"Moving Average Envelope":"",
			"Negative Volume Index":"",
			"On Balance Volume":"",
			"Parabolic SAR":"",
			"Performance Index":"",
			"Positive Volume Index":"",
			"Pretty Good Oscillator":"",
			"Price Oscillator":"",
			"Price Rate of Change":"",
			"Price Volume Trend":"",
			"Prime Number Bands":"",
			"Prime Number Oscillator":"",
			"QStick":"",
			"Random Walk Index":"",
			"RAVI":"",
			"RSI":"",
			"Schaff Trend Cycle":"",
			"Standard Deviation":"",
			"Stochastics":"",
			"Stochastic Momentum Index":"",
			"Stochastic Oscillator":"",
			"Swing Index":"",
			"Time Series Forecast":"",
			"Trade Volume Index":"",
			"TRIX":"",
			"True Range":"",
			"Twiggs Money Flow":"",
			"Typical Price":"",
			"Ultimate Oscillator":"",
			"Vertical Horizontal Filter":"",
			"Volume":"",
			"Vol Underlay":"",
			"Volume Oscillator":"",
			"Volume Rate of Change":"",
			"Weighted Close":"",
			"Williams %R":"",
			"Williams Accumulation Distribution":"",
			"Timezone":"",
			"Change Timezone":"",
			"Default Themes":"",
			"Light":"",
			"Dark":"",
			"Custom Themes":"",
			"New Custom Theme":"",
			"Select Tool":"",
			"None":"",
			"Crosshairs":"",
			"Annotation":"",
			"Fibonacci":"",
			"Horizontal":"",
			"Ray":"",
			"Segment":"",
			"Rectangle":"",
			"Ellipse Center":"",
			"Ellipse Left":"",
			"Fill:":"",
			"Line:":"",
			"O: ":"",
			"H: ":"",
			"V: ":"",
			"C: ":"",
			"L: ":"",
			"save":"",
			"cancel":"",
			"Create":"",
			"Show Zones":"",
			"OverBought":"",
			"OverSold":"",
			"Choose Timezone":"",
			"Close":"",
			"Shared Chart URL":"",
			"Share This Chart!":"",
			"Create a New Custom Theme":"",
			"Candles":"",
			" Border":"",
			"Line/Bar/Wick":"",
			"Background":"",
			"Grid Lines":"",
			"Date Dividers":"",
			"Axis Text":"",
			"New Theme Name:":"",
			"Save Theme":"",
			"rsi":"",
			"Period":"",
			"ma":"",
			"Field":"",
			"Type":"",
			"MA":"",
			"macd":"",
			"Fast MA Period":"",
			"Slow MA Period":"",
			"Signal Period":"",
			"Signal":"",
			"stochastics":"",
			"Smooth":"",
			"Fast":"",
			"Slow":"",
			"Aroon Up":"",
			"Aroon Down":"",
			"Lin R2":"",
			"RSquared":"",
			"Lin Fcst":"",
			"Forecast":"",
			"Lin Incpt":"",
			"Intercept":"",
			"Time Fcst":"",
			"VIDYA":"",
			"R2 Scale":"",
			"STD Dev":"",
			"Standard Deviations":"",
			"Moving Average Type":"",
			"Trade Vol":"",
			"Min Tick Value":"",
			"Swing":"",
			"Limit Move Value":"",
			"Acc Swing":"",
			"Price Vol":"",
			"Pos Vol":"",
			"Neg Vol":"",
			"On Bal Vol":"",
			"Perf Idx":"",
			"Stch Mtm":"",
			"%K Periods":"",
			"%K Smoothing Periods":"",
			"%K Double Smoothing Periods":"",
			"%D Periods":"",
			"%D Moving Average Type":"",
			"%K":"",
			"%D":"",
			"Hist Vol":"",
			"Bar History":"",
			"Ultimate":"",
			"Cycle 1":"",
			"Cycle 2":"",
			"Cycle 3":"",
			"W Acc Dist":"",
			"Vol Osc":"",
			"Short Term Periods":"",
			"Long Term Periods":"",
			"Points Or Percent":"",
			"Chaikin Vol":"",
			"Rate Of Change":"",
			"Price Osc":"",
			"Long Cycle":"",
			"Short Cycle":"",
			"EOM":"",
			"CCI":"",
			"Detrended":"",
			"Aroon Osc":"",
			"Elder Force":"",
			"Ehler Fisher":"",
			"EF":"",
			"EF Trigger":"",
			"Schaff":"",
			"Coppock":"",
			"Chande Fcst":"",
			"Intraday Mtm":"",
			"Random Walk":"",
			"Random Walk High":"",
			"Random Walk Low":"",
			"Directional":"",
			"ADX":"",
			"DI+":"",
			"DI-":"",
			"High Low":"",
			"High Low Bands Top":"",
			"High Low Bands Median":"",
			"High Low Bands Bottom":"",
			"MA Env":"",
			"Shift Percentage":"",
			"Envelope Top":"",
			"Envelope Median":"",
			"Envelope Bottom":"",
			"Fractal High":"",
			"Fractal Low":"",
			"Prime Bands Top":"",
			"Prime Bands Bottom":"",
			"Bollinger Band Top":"",
			"Bollinger Band Median":"",
			"Bollinger Band Bottom":"",
			"Keltner":"",
			"Shift":"",
			"Keltner Top":"",
			"Keltner Median":"",
			"Keltner Bottom":"",
			"PSAR":"",
			"Minimum AF":"",
			"Maximum AF":"",
			"Klinger":"",
			"Signal Periods":"",
			"KlingerSignal":"",
			"Elder Bull Power":"",
			"Elder Bear Power":"",
			"LR Slope":"",
			"Slope":""}
};


/* Returns a word list containing unique words. Each word references an array of DOM
 * nodes that contain that word. This can then be used for translation.
 */
STXI18N.findAllTextNodes=function(){
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;
	var ws=new RegExp("^\\s*$");
	var wordList={};

    while(node = walker.nextNode()) {
        if(!ws.test(node.nodeValue)){
        	if(node.parentNode.tagName=="SCRIPT") continue;
        	if(wordList[node.nodeValue]==null) wordList[node.nodeValue]=[];
			wordList[node.nodeValue].push(node);
		}
    }
    // Get all the words from the study library that are used to populate the study dialogs.
    // These will have an empty array since they aren't associated with any nodes
    if(STXStudies.studyLibrary){
    	for(var study in STXStudies.studyLibrary){
        	if(wordList[study]==null) wordList[study]=[];
        	var s=STXStudies.studyLibrary[study];
        	if(s.inputs){
        		for(var input in s.inputs){
                	if(wordList[input]==null) wordList[input]=[];
        		}
        	}
        	if(s.outputs){
        		for(var output in s.outputs){
                	if(wordList[output]==null) wordList[output]=[];
        		}
        	}
    	}
    }
	return wordList;
};

/*
 * STXI18N.missingWordList will scan the UI by walking all the text elements. It will determine which
 * text elements have not been translated for the given language and return those as a JSON object.
 */
STXI18N.missingWordList=function(language){
	if(!language) language="defaultWord";
	var wordsInUI=STXI18N.findAllTextNodes();
	var missingWords={};
	var languageWordList=WebUiChartWords.wordLists[language];
	if(!languageWordList) languageWordList={};
	for(var word in wordsInUI){
		if(typeof languageWordList[word]=="undefined"){
			missingWords[word]="";
		}
	}
	return missingWords;
};

/*
 * A convenient function for creating a human readable JSON object suitable for delivery to a translator.
 */
STXI18N.printableMissingWordList=function(language){
	var missingWords=JSON.stringify(STXI18N.missingWordList(language));
	missingWords=missingWords.replace("\",\"","\",\n\"", "\g");
	return missingWords;
};

/*
 * Passes through the UI and translates all of the text for the given language.
 */
STXI18N.translateUI=function(language){
	
	
	if(!language) language=STXI18N.language;
	var wordsInUI=STXI18N.findAllTextNodes();
	var languageWordList=STXI18N.wordLists[language];
	if(!languageWordList) return;
	for(var word in wordsInUI){
		var translation=languageWordList[word];
		if(!translation) continue;
		var nodes=wordsInUI[word];
		for(var i=0;i<nodes.length;i++){
			nodes[i].data=translation;
		}
	}
};

/*
 * Translates an individual word for a given language. Set stxx.translationCallback to this function
 * in order to automatically translate all textual elements on the chart itself.
 */
STXI18N.translate=function(word, language){
	if(!language) language="defaultWord";
	var languageWordList=WebUiChartWords.wordLists[language];
	if(!languageWordList) return word;
	var translation=languageWordList[word];
	if(!translation) return word;
	return translation;
};

/*
 * Converts a CSV array of translations into the required JSON format. You can output this to the console and paste back in if desired.
 * Assumes that the header row of the CSV is the language codes and that the first column is the key language (English). Assumes non-quoted words.
 */
STXI18N.convertCSV=function(csv){
	if(!csv) csv=STXI18N.csv;
	var lines=csv.split("\n");
	var headerRow=lines[0];
	var languages=headerRow.split(",");
	for(var j=0;j<languages.length;j++){
		var lang=languages[j];
		if(!STXI18N.wordLists[lang]){
			STXI18N.wordLists[lang]={};
		}
	}
	for(var i=1;i<lines.length;i++){
		var words=lines[i].split(",");
		var key=words[0];
		for(var j=1;j<words.length;j++){
			STXI18N.wordLists[languages[j]][key]=words[j];
		}
	}
};

/*
 * This method dynamically loads the locale using JSONP. Once the locale is loaded then the chart widget itself
 * is updated for that locale. Use this function when a user can select a locale dynamically so as to avoid
 * having to include specific locale entries as <script> tags. The optional callback will be called when the locale
 * has been set. The callback will be called with null on success, otherwise with an error message.
 */
STXI18N.setLocale=function(stx, locale, cb){
	if(window.OldIntl){	// Intl built into browser
    	stx.setLocale(locale);
    	if(cb) cb(null);
		return;
	}
	var localeFileURL="locale-data/jsonp/" + locale + ".js";
	var script=document.createElement("SCRIPT");
	script.async = true;
	script.src = localeFileURL;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s.nextSibling);
    script.onload=function(){
    	stx.setLocale(locale);
    	if(cb) cb(null);
    };
    script.onerror=function(){
    	if(cb) cb("cannot load script");
    };
};

function STXMarket(){
}
if(typeof exports!="undefined") exports.STXMarket=STXMarket;

// Override this depending on your market data!!!
STXMarket.isForexFuturesSymbol=function(symbol){
	if(!symbol) return false;
	if(symbol.length>=6) return true;
	return false;
};

STXMarket.isMarketDay=function(symbol, nd){
	if(!nd) nd=getETDateTime();
	if(STXMarket.isForexFuturesSymbol(symbol)){
		if(nd.getDay()==6) return false;
		//TODO, if type of security is future then check isHoliday()
	}else{
		if(nd.getDay()==0) return false;
		if(nd.getDay()==6) return false;
		if(STXMarket.isHoliday(nd, symbol)) return false;
	}
	return true;
};

STXMarket.isMarketOpen=function(symbol, stx){
	if(!STXMarket.isMarketDay(symbol)) return false;
	var nd=getETDateTime();
	if(!stx){
		if((nd.getHours()>9 || (nd.getHours()==9 && nd.getMinutes()>29)) && (nd.getHours()<16 || (nd.getHours()==16 && nd.getMinutes()<5))) return true;
	}else{
		if((nd.getHours()>stx.chart.beginHour || (nd.getHours()==stx.chart.beginHour && nd.getMinutes()>stx.chart.beginMinute))
		&& (nd.getHours()<stx.chart.endHour || (nd.getHours()==stx.chart.endHour && nd.getMinutes()<stx.chart.endMinute+5))) return true;
	}
	return false;
};

STXMarket.isAfterMarket=function(symbol){
	if(!STXMarket.isMarketDay(symbol)) return false;
	var nd=getETDateTime();
	if((nd.getHours()>16 || (nd.getHours()==16 && nd.getMinutes()>0))) return true;
	return false;
};

STXMarket.isAfterDelayed=function(symbol){
	if(!STXMarket.isMarketDay(symbol)) return false;
	var nd=getETDateTime();
	if((nd.getHours()>16 || (nd.getHours()==16 && nd.getMinutes()>20))) return true;
	return false;
};

STXMarket.isForexOpen=function(nd){
	if(!nd) nd=getETDateTime();
	if(nd.getDay()==6) return false;
	if(nd.getDay()==5 && nd.getHours()>=18) return false;
	if(nd.getDay()==0 && nd.getHours()<15) return false;
	return true;
};

// Contains array of epochs
STXMarket.holidayArray=[];
STXMarket.halfDayArray=[];

// Contains epochs hashed to midnight for quick mathematical comparison
STXMarket.holidayHash={};
STXMarket.halfDayHash={};

STXMarket.initializeHolidays=function(){
	// This sets the hashOffset for comparison of dates. This assumes eastern time
	// Change your offset if you are calculating holidays for a different timezone
	var d=new Date();
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
	var utc = localTime + localOffset;
	var offset = -4;
	if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
			offset = -5;
	STXMarket.hashOffset=3600000*offset;

	// Be sure to put these in order!
	STXMarket.holidayArray.push(new Date("01/02/2012").getTime());
	STXMarket.holidayArray.push(new Date("01/16/2012").getTime());
	STXMarket.holidayArray.push(new Date("02/20/2012").getTime());
	STXMarket.holidayArray.push(new Date("04/06/2012").getTime());
	STXMarket.holidayArray.push(new Date("05/28/2012").getTime());
	STXMarket.holidayArray.push(new Date("07/04/2012").getTime());
	STXMarket.holidayArray.push(new Date("09/03/2012").getTime());
	STXMarket.holidayArray.push(new Date("10/29/2012").getTime());
	STXMarket.holidayArray.push(new Date("10/30/2012").getTime());
	STXMarket.holidayArray.push(new Date("11/22/2012").getTime());
	STXMarket.holidayArray.push(new Date("12/25/2012").getTime());
	STXMarket.holidayArray.push(new Date("01/01/2013").getTime());
	STXMarket.holidayArray.push(new Date("01/21/2013").getTime());
	STXMarket.holidayArray.push(new Date("02/18/2013").getTime());
	STXMarket.holidayArray.push(new Date("03/29/2013").getTime());
	STXMarket.holidayArray.push(new Date("05/27/2013").getTime());
	STXMarket.holidayArray.push(new Date("07/04/2013").getTime());
	STXMarket.holidayArray.push(new Date("09/02/2013").getTime());
	STXMarket.holidayArray.push(new Date("11/28/2013").getTime());
	STXMarket.holidayArray.push(new Date("12/25/2013").getTime());
	STXMarket.holidayArray.push(new Date("01/01/2014").getTime());
	STXMarket.holidayArray.push(new Date("01/20/2014").getTime());
	STXMarket.holidayArray.push(new Date("02/17/2014").getTime());
	STXMarket.holidayArray.push(new Date("04/18/2014").getTime());
	STXMarket.holidayArray.push(new Date("05/26/2014").getTime());
	STXMarket.holidayArray.push(new Date("07/04/2014").getTime());
	STXMarket.holidayArray.push(new Date("09/01/2014").getTime());
	STXMarket.holidayArray.push(new Date("11/27/2014").getTime());
	STXMarket.holidayArray.push(new Date("12/25/2014").getTime());

	STXMarket.halfDayArray.push(new Date("07/03/2012").getTime());
	STXMarket.halfDayArray.push(new Date("11/23/2012").getTime());
	STXMarket.halfDayArray.push(new Date("12/24/2012").getTime());
	STXMarket.halfDayArray.push(new Date("07/03/2013").getTime());
	STXMarket.halfDayArray.push(new Date("11/29/2013").getTime());
	STXMarket.halfDayArray.push(new Date("12/24/2013").getTime());
	STXMarket.halfDayArray.push(new Date("07/03/2014").getTime());
	STXMarket.halfDayArray.push(new Date("11/28/2014").getTime());
	STXMarket.halfDayArray.push(new Date("12/24/2014").getTime());

	// The hash is based on the epoch. Note that the epoch is milliseconds since Jan 1, 1970 but in UTC time.
	// We mod by the number of milliseconds in a day in order to get midnight that day in UTC time
	// This means that when searching in the hash we need to adjust our time to UTC before modding.
	for(var i=0; i<STXMarket.holidayArray.length;i++){
		var g=STXMarket.holidayArray[i];
		var midnight=g-g%(24*60*60*1000);
		STXMarket.holidayHash[midnight]=true;
	}
	for(var i=0; i<STXMarket.halfDayArray.length;i++){
		var g=STXMarket.halfDayArray[i];
		var midnight=g-g%(24*60*60*1000);
		STXMarket.halfDayHash[midnight]=true;
	}

};

STXMarket.initializeHolidays();

STXMarket.isHoliday=function(dt, symbol){
	// This comparison assumes dt is being passed in Eastern Time
	var ms=dt.getTime() + STXMarket.hashOffset;
	ms=ms-ms%(24*60*60*1000);
	if(STXMarket.holidayHash[ms]){
		var dt2=new Date(ms);
		return true;
	}
	return false;
};

STXMarket.isHalfDay=function(dt, symbol){
	// This comparison assumes dt is being passed in Eastern Time
	var ms=dt.getTime() + STXMarket.hashOffset;
	ms=ms-ms%(24*60*60*1000);
	if(STXMarket.halfDayHash[ms]) return true;
	return false;
};

STXMarket.incDate=function(dt, amt){
	if(!amt) amt=1;
	dt.setDate(dt.getDate() + amt);
	return dt;
};

STXMarket.decDate=function(dt, amt){
	if(!amt) amt=1;
	dt.setDate(dt.getDate() - amt);
	return dt;
};

STXMarket.nextDay=function(dt, inc, stx){
	if(!inc) inc=1;
	var dt2=new Date(dt.getTime());
	for(var i=0;i<inc;i++){
		dt2=STXMarket.incDate(dt2);
		if(!stx.calendarAxis){
			if(stx.chart.beginHour==0){	// forex. Note that the time is not accurate if the date lands on a Sunday
				if(dt2.getDay()==6) dt=STXMarket.incDate(dt2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt=STXMarket.incDate(dt2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt=STXMarket.incDate(dt2);
				if(dt2.getDay()==6) dt=STXMarket.incDate(dt2);
			}else{
				if(dt2.getDay()==0) dt=STXMarket.incDate(dt2);
				if(dt2.getDay()==6) dt=STXMarket.incDate(dt2,2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt=STXMarket.incDate(dt2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt=STXMarket.incDate(dt2);
				if(dt2.getDay()==0) dt=STXMarket.incDate(dt2);
				if(dt2.getDay()==6) dt=STXMarket.incDate(dt2,2);
			}
		}
	}
	return dt2;
};

STXMarket.prevDay=function(dt, inc, stx){
	if(!inc) inc=1;
	var dt2=new Date(dt.getTime());
	for(var i=0;i<inc;i++){
		dt2=STXMarket.decDate(dt2);
		if(!stx.calendarAxis){
			if(stx.chart.beginHour==0){	//forex. Note that the time is not accurate if the date lands on a Sunday
				if(dt2.getDay()==6) dt2=STXMarket.decDate(dt2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt2=STXMarket.decDate(dt2);
				if(dt2.getDay()==6) dt2=STXMarket.decDate(dt2);
			}else{
				if(dt2.getDay()==6) dt2=STXMarket.decDate(dt2);
				if(dt2.getDay()==0) dt2=STXMarket.decDate(dt2);
				if(STXMarket.isHoliday(dt2, stx.chart.symbol)) dt2=STXMarket.decDate(dt2);
				if(dt2.getDay()==6) dt2=STXMarket.decDate(dt2);
				if(dt2.getDay()==0) dt2=STXMarket.decDate(dt2,2);
			}
		}
	}
	return dt2;
};



/**
 * 取出圖表下一個分鐘時段的開始時間
 * 輸入:現在的開始時間(DATE), 時段的長度(分鐘計算) 
 */
STXMarket.getNextIntervalStartDate = function(date,  stx){
	
	if(Util.isEmpty(date)){
		return null;
	}
	
	
	var intervalType = stx.intervalType;
	var interval = stx.interval;
	var hourLong = stx.hourLong;
	
	if("daily" == intervalType){
		 return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
	}else if("week" == intervalType){
		 return new Date(date.getFullYear(), date.getMonth(), date.getDate()+7);
	}else if("month" == intervalType){
		return new Date(date.getFullYear(), date.getMonth()+1, 0);
	}else if("minute" == intervalType){
		date.setSeconds(0);
		if(hourLong){
			date.setMinutes(0);
			return new Date(date.getTime() + hourLong * 60 * 60 * 1000);
		}else{
			return new Date(date.getTime() + interval * 60 * 1000);
		}
		
	}
	
}

STXMarket.nextPeriod=function(dt, interval, inc, stx){
	var t1=dt.getTime();
	var multiplier=interval;
	if(interval=="minute") multiplier=1;
	t1+=inc*multiplier*60*1000;
	var future=new Date(t1);
	if(!stx.calendarAxis){
		if(stx.chart.beginHour==0 && stx.chart.beginMinute==0){
			if(STXMarket.isForexFuturesSymbol(stx.chart.symbol)){
				if(dt.getDay()==5 && dt.getHours()>=18){
					var fmorning=new Date(dt.getYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0).getTime();
					fmorning+=2 * 24 * 60 * 60 * 1000;
					fmorning+=15 * 60 * 60 * 1000;	// Currencies open at Sunday 3:00pm
					dt=new Date(fmorning);
				}
			}
		}else{
			var endHour=stx.chart.endHour;
			if(STXMarket.isHalfDay(future)){	// Half day
				endHour=13;
			}
			if(future.getHours()>endHour || (future.getHours()==endHour && future.getMinutes()>=stx.chart.endMinute) || future.getHours()==0){
				dt=STXMarket.nextDay(dt, 1, stx);
				dt.setHours(stx.chart.beginHour);
				dt.setMinutes(stx.chart.beginMinute);
				dt.setSeconds(0);
				dt.setMilliseconds(0);
				return dt;
			}
		}
	}
	return future;
};

STXMarket.prevPeriod=function(dt, interval, inc, stx){
	var multiplier=interval;
	var t1=dt.getTime();
	if(!stx.calendarAxis && stx.chart.beginHour==0 && dt.getDay()==0 && dt.getHours()<15){	// Forex. Skip from Sunday to Friday evening
		var fridayEvening=new Date(dt.getTime()-(2*24*60*60*1000));
		fridayEvening.setHours(18);
		fridayEvening.setMinutes(0);
		fridayEvening.setSeconds(0);
		fridayEvening.setMilliseconds(0);
		t1=fridayEvening.getTime();
	}else{
		t1-=inc*multiplier*60*1000;
	}
	var past=new Date(t1);
	if(!stx.calendarAxis){
		if(past.getHours()==stx.chart.beginHour && past.getMinutes()<stx.chart.beginMinute){
			var dt2=STXMarket.prevDay(dt, 1, stx);
			var endHour=stx.chart.endHour;
			if(STXMarket.isHalfDay(dt2)){
				endHour=13;	// Half day
			}
			dt2.setHours(endHour);
			dt2.setMinutes(stx.chart.endMinute);
			dt2.setSeconds(0);
			dt2.setMilliseconds(0);
			return dt2;
		}
	}
	return past;
};

STXMarket.nextWeek=function(dt, inc, stx){
	var pd=new Date(dt.getTime());
	if(!inc) inc=1;
	for(var i=0;i<inc;i++){
		for(var j=0;j<14;j++){
			dt=STXMarket.nextDay(dt, 1, stx);
			if(dt.getDay()<=pd.getDay()) break;
		}
		if(j==14) console.log("nextWeek function skipped 14 days. Probably infinite loop. Check dates in dataSet.");
		pd=new Date(dt.getTime());
	}
	return dt;
};

STXMarket.prevWeek=function(dt, inc, stx){
	var pd=new Date(dt.getTime());
	if(!inc) inc=1;
	for(var i=0;i<inc;i++){
		if(pd.getDay()==0){	// Sunday, so we can just subtract 7 and ignore holidays
			dt=pd;
			dt.setDate(dt.getDate()-7);
		}else{
			while(1){
				dt=STXMarket.prevDay(dt, 1, stx);
				if(dt.getDay()<=pd.getDay()) break;
			}
		}
		pd=new Date(dt.getTime());
	}
	return dt;
};

STXMarket.nextMonth=function(dt, inc, stx){
	var pd=new Date(dt.getTime());
	if(!inc) inc=1;
	for(var i=0;i<inc;i++){
		while(1){
			dt=STXMarket.nextDay(dt, 1, stx);
			if(dt.getMonth()!=pd.getMonth()) break;
		}
		pd=new Date(dt.getTime());
	}
	return dt;
};

STXMarket.prevMonth=function(dt, inc, stx){
	var pd=new Date(dt.getTime());
	if(!inc) inc=1;
	for(var i=0;i<inc;i++){
		while(1){
			dt=STXMarket.prevDay(dt, 1, stx);
			if(dt.getMonth()!=pd.getMonth()) break;
		}
		pd=new Date(dt.getTime());
	}
	return dt;
};

STXMarket.beginDay=function(dt, stx){
	if(stx.chart.beginHour!=0){
		return stx.chart.beginHour*60 + stx.chart.beginMinute;
	}
	if(dt.getDay()==0) return 15*60;
	return stx.chart.beginHour*60 + stx.chart.beginMinute;
};

STXMarket.endDay=function(dt, stx){
	if(stx.chart.beginHour!=0){
		//Would be nice to take into account half market days for equities
		return stx.chart.endHour*60 + stx.chart.endMinute;
	}
	if(dt.getDay()==5) return 18*60;
	return stx.chart.endHour*60 + stx.chart.endMinute;
};

STXMarket.isQuarterEnd=function(dt){
	if(dt.getMonth()==2){
		if(dt.getDate()==31) return true;
		if(dt.getDay()==5 && (dt.getDate()==30 || dt.getDate()==29)) return true;
		return false;
	}
	if(dt.getMonth()==5){
		if(dt.getDate()==30) return true;
		if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==28)) return true;
		return false;
	}
	if(dt.getMonth()==8){
		if(dt.getDate()==30) return true;
		if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==28)) return true;
		return false;
	}
	if(dt.getMonth()==11){
		if(dt.getDate()==31) return true;
		if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==30)) return true;
		return false;
	}
	return false;
};


function STXStudies(){
}

if(typeof exports!="undefined") exports.STXStudies=STXStudies;

STXStudies.studyPanelMap={};
STXStudies.colorPickerDiv=null;

STXStudies.StudyDescriptor=function(name, type, panel, inputs, outputs, parameters){
	this.name=name;
	this.type=type;
	this.panel=panel;
	this.inputs=inputs;
	this.outputs=outputs;
	this.libraryEntry=STXStudies.studyLibrary[type];
	this.outputMap={};	// Maps dataSet label to outputs label "RSI (14)" : "RSI", for the purpose of figuring color
	this.min=null;
	this.max=null;
	this.parameters=parameters;	// Optional parameters, i.e. zones
};

STXStudies.generateID=function(stx, studyName, inputs){
	var translatedStudy=studyName;
	if(stx) translatedStudy=stx.translateIf(translatedStudy);
	id=translatedStudy + " (";
	var first=false;
	for(var field in inputs){
		if(!first){
			first=true;
		}else{
			id+=",";
		}
		var val=inputs[field];
		id+=val;
	}
	id+=")";
	return id;
};

STXStudies.go=function(div, stx){
	var inputs={}; var outputs={};
	var translatedStudy=div.study;
	if(stx) translatedStudy=stx.translateIf(translatedStudy);
	inputs.id = translatedStudy + " (";
	var inputItems=div.querySelectorAll(".inputTemplate");
	var first=false;
	for(var i=0;i<inputItems.length;i++){
		if(inputItems[i].style.display!="none"){
			var field=inputItems[i].querySelectorAll(".heading")[0].fieldName;
			var inputDOM=inputItems[i].querySelectorAll(".data")[0].childNodes[0];
			var value=inputDOM.value;
			if(inputDOM.getAttribute("type")=="checkbox"){
				inputs[field]=inputDOM.checked;
			}else{
				inputs[field]=value;
			}
			if(!first){
				first=true;
			}else{
				inputs.id+=",";
			}
			if(inputDOM.getAttribute("type")=="checkbox"){
				inputs.id+=inputDOM.checked?"T":"F";
			}else if(inputDOM.nodeName =="SELECT"){
				inputs.id+=inputDOM.options[inputDOM.selectedIndex].text;
			}else{
				var translatedValue=value;
				if(stx) translatedValue=stx.translateIf(translatedValue);
				inputs.id+=translatedValue;
			}
		}
	}
	inputs.id+=")";
	if(inputItems.length==1){
		inputs.id=div.study;
	}
	var outputItems=div.querySelectorAll(".outputTemplate");
	for(var i=0;i<outputItems.length;i++){
		if(outputItems[i].style.display!="none"){
			var field=outputItems[i].querySelectorAll(".heading")[0].fieldName;
			var color=outputItems[i].querySelectorAll(".color")[0].style.backgroundColor;
			if(!color || color=="") color="auto";
			outputs[field]=color;
		}
	}
	//if(div.stx.panelExists(inputs.id)) return null;
	var parameters={};
	STXStudies.getCustomParameters(div, parameters);
	var sd=STXStudies.addStudy(div.stx, div.study, inputs, outputs, parameters);
	div.stx.draw();
	return sd;
};

/*
 * This method parses out custom parameters from the study dialog. For this to work, the studyLibrary entry
 * must contain a value "parameters". This object should then include a "template" which is the id of the html
 * element that is appended to the studyDialog. Then another object "init" should contain all of the id's
 * within that template which contain data.
 */
STXStudies.getCustomParameters=function(div, parameters){
	
	
	var sd=STXStudies.studyLibrary[div.study];
	if(!sd) return;
	if(!sd.parameters) return;
	if(!sd.parameters.template) return;
	if(!sd.parameters.init) return;
	var template=div.querySelectorAll("#" + sd.parameters.template)[0];
	if(!template) return;
	for(var field in sd.parameters.init){
		var el=template.querySelectorAll("#" + field)[0];
		if(!el) continue;
		if(el.tagName=="INPUT"){
			if(el.type=="checkbox"){
				parameters[field]=el.checked;
			}else{
				parameters[field]=el.value;
			}
		}else{
			parameters[field]=el.style.backgroundColor;
		}
	}
};

STXStudies.prepareStudy=function(stx, study, sd){
	if(typeof(study.calculateFN)=="undefined") study.calculateFN=STXStudies.passToModulus;
	if(typeof(study.seriesFN)=="undefined") study.seriesFN=STXStudies.displaySeriesAsLine;
	if(sd.chart.dataSet && study.calculateFN) study.calculateFN(stx, sd);
	// Unless overriden by the calculation function we assume the convention that the dataSet entries
	// will begin with the output name such as "RSI rsi (14)"
	if(STX.isEmpty(sd.outputMap)){
		for(var i in sd.outputs){
			sd.outputMap[i + " " + sd.name]=i;
		}
	}
	if(study.overlay){
		stx.overlays[sd.name]=sd;
	}

};

STXStudies.addStudy=function(stx, type, inputs, outputs, parameters){
	
	var study=STXStudies.studyLibrary[type];
	if(!study) study={};
	if(!parameters) parameters={};
	if(!parameters.chartName) parameters.chartName="chart";
	var sd=null;
	if(study.initializeFN){
		sd=study.initializeFN(stx, type, inputs, outputs, parameters);
	}else{
		sd=STXStudies.initializeFN(stx, type, inputs, outputs, parameters);
	}
	sd.chart=stx.charts[parameters.chartName];
	if(!sd) return;
	if(!stx.layout.studies) stx.layout.studies={};
	stx.layout.studies[sd.inputs["id"]]=sd;
	stx.changeOccurred("layout");
	STXStudies.prepareStudy(stx, study, sd);
	sd.study=study;
	sd.type=type;
	return sd;
};

STXStudies.quickAddStudy=function(stx, studyName, inputs, outputs, parameters){
	if(!parameters) parameters={};
	var sl=STXStudies.studyLibrary[studyName];
	if(!outputs) outputs=sl.outputs;
	if(!outputs) outputs={"Result":"auto"};
	inputs.id=STXStudies.generateID(stx, studyName, inputs);
	var sd=STXStudies.addStudy(stx, studyName, inputs, outputs, parameters);
	stx.draw();
	return sd;
};

STXStudies.removeStudy=function(stx, sd){
	if(sd.libraryEntry && sd.libraryEntry.overlay){
		stx.removeOverlay(sd.name);
		stx.draw();
	}else{
		var panel=stx.panels[sd.panel];
		if(panel)
			stx.panelClose(panel);
	}
};

STXStudies.studyDialog=function(stx, study, div){
	div.style.display="block";
	div.study=study;
	div.stx=stx;
	var chart=stx.chart;	// Currently the dialog only supports adding studies to the primary chart

	var inputs=div.querySelectorAll("#inputs")[0];
	var inputItems=inputs.querySelectorAll(".inputTemplate");
	for(var i=0;i<inputItems.length;i++){
		if(inputItems[i].style.display!="none"){
			inputs.removeChild(inputItems[i]);
		}
	}
	var outputs=div.querySelectorAll("#outputs")[0];
	var outputItems=outputs.querySelectorAll(".outputTemplate");
	for(var i=0;i<outputItems.length;i++){
		if(outputItems[i].style.display!="none"){
			outputs.removeChild(outputItems[i]);
		}
	}

	var sd=STXStudies.studyLibrary[study];
	if(!sd) sd={};
	if(typeof(sd.inputs)=="undefined") sd.inputs={"Period":14};
	for(var i in sd.inputs){
		var newInput=inputItems[0].cloneNode(true);
		inputs.appendChild(newInput);
		newInput.style.display="block";
		

		newInput.querySelectorAll(".heading")[0].innerHTML=stx.translateIf(i);
		newInput.querySelectorAll(".heading")[0].fieldName=i;
		var formField=null;
		var acceptedData=sd.inputs[i];
		if(acceptedData.constructor==Number){
			formField=document.createElement("input");
			formField.setAttribute("type", "number");
			formField.value=acceptedData;
		}else if(acceptedData.constructor==String){
			if(acceptedData=="ma" || acceptedData=="ema"){
				formField=document.createElement("select");
				var option=document.createElement("OPTION");option.value="simple";option.text=stx.translateIf("Simple");formField.add(option, null);
				var option=document.createElement("OPTION");option.value="exponential";option.text=stx.translateIf("Exponential");formField.add(option, null);
				if(acceptedData=="ema") option.selected=true;
				var option=document.createElement("OPTION");option.value="time series";option.text=stx.translateIf("Time Series");formField.add(option, null);
				var option=document.createElement("OPTION");option.value="triangular";option.text=stx.translateIf("Triangular");formField.add(option, null);
				var option=document.createElement("OPTION");option.value="variable";option.text=stx.translateIf("Variable");formField.add(option, null);
				var option=document.createElement("OPTION");option.value="weighted";option.text=stx.translateIf("Weighted");formField.add(option, null);
				var option=document.createElement("OPTION");option.value="wells wilder";option.text=stx.translateIf("Wells Wilder");formField.add(option, null);
			}else if(acceptedData=="field"){
				formField=document.createElement("select");
				var count=0;
				for(var field in chart.dataSet[chart.dataSet.length-1]){
					if(["Date","DT","Dt", "Dm", "trueRange", "projection","split","distribution", "atr", "stch_14", "ratio","transform","cache"].indexOf(field) >= 0) continue;
					if(["Date", "Open", "High", "Low", "Close"].indexOf(field) >= 0){
						if(field=="Volume" && !stx.panels["vchart"]) continue;
						var option=document.createElement("OPTION");
						option.value=field;
						option.text=stx.translateIf(field);
						formField.add(option, null);
						if(field=="Close") formField.selectedIndex=count;
						count++;
					}
					
					
				}
			}
		}else if(acceptedData.constructor==Boolean){
			formField=document.createElement("input");
			formField.setAttribute("type","checkbox");
			if(acceptedData==true) formField.checked=true;
		}else if(acceptedData.constructor==Array){
			formField=document.createElement("select");
			for(var i=0;i<acceptedData.length;i++){
				var option=document.createElement("OPTION");option.value=acceptedData[i];option.text=acceptedData[i];formField.add(option, null);
			}
		}
		if(formField) newInput.querySelectorAll(".data")[0].appendChild(formField);
	}
	if(typeof(sd.outputs)=="undefined") sd.outputs={"Result":"auto"};
	for(var i in sd.outputs){
		var newOutput=outputItems[0].cloneNode(true);
		outputs.appendChild(newOutput);
		newOutput.style.display="block";
		newOutput.querySelectorAll(".heading")[0].innerHTML=stx.translateIf(i);
		newOutput.querySelectorAll(".heading")[0].fieldName=i;
		var colorClick=newOutput.querySelectorAll(".color")[0];
		if(sd.outputs[i]!="auto"){
			colorClick.style.backgroundColor=sd.outputs[i];
			unappendClassName(colorClick, "stxColorDarkChart");
		}else{
			if(stx.defaultColor=="#FFFFFF") appendClassName(colorClick, "stxColorDarkChart");
		}

		STX.attachColorPicker(colorClick, div);
	}

	// Optional parameters for studies. This is driven by a UI template that must be created by the developer, and which
	// is referenced from the study description (studyLibrary entry).
	var parametersEL=div.querySelectorAll("#parameters")[0];
	if(parametersEL){
		clearNode(parametersEL);
		if(sd.parameters && sd.parameters.template && sd.parameters.init){
			var template=document.querySelectorAll("#" + sd.parameters.template)[0];
			if(template){
				template=template.cloneNode(true);
				template.style.display="block";
				parametersEL.appendChild(template);
				for(var field in sd.parameters.init){
					var value=sd.parameters.init[field];
					var el=template.querySelectorAll("#" + field)[0];
					if(!el) continue;
					if(el.tagName=="INPUT"){
						if(el.type=="checkbox"){
							el.checked=value;
						}else{
							el.value=value;
						}
					}else{
						if(value=="auto"){
							value="";
							if(stx.defaultColor=="#FFFFFF") appendClassName(el, "stxColorDarkChart");
						}else{
							unappendClassName(el, "stxColorDarkChart");
						}
						el.style.backgroundColor=value;
						STX.attachColorPicker(el, div);
					}
				}
			}
		}
	}
};

STXStudies.displayStudies=function(stx){
	var s=stx.layout.studies;
	if(!s) return;
	for(var panelName in stx.panels){
		stx.panels[panelName].min=null;
		stx.panels[panelName].studyLabel.innerText="";
	}
	for(var n in s){
		var sd=s[n];
		var panel=stx.panels[sd.panel];
		if(panel){
			if(panel.hidden) continue;
			if(sd.permanent){
				if(panel.closeX){
					panel.closeX.style.display="none";
				}else{
					panel.close.style.display="none";
				}
			}
			panel.axisDrawn=false;	// to prevent y-axis from being drawn multiple times
		}
		var libraryEntry=STXStudies.studyLibrary[sd.type];
		var quotes=sd.chart.dataSegment;									// Find the appropriate data to drive this study
		if(!libraryEntry || typeof(libraryEntry.seriesFN)=="undefined"){	// null means don't display, undefined means display by default as a series
			STXStudies.displaySeriesAsLine(stx, sd, quotes);
		}else{
			if(libraryEntry.seriesFN){
				if(panel) libraryEntry.seriesFN(stx, sd, quotes);
			}
		}
		
	}
};

/*
 * Convenience function for determining the min and max for a given data point
 */
STXStudies.calculateMinMaxForDataPoint=function(stx, name, quotes){
	var min=2000000000;
	var max=-2000000000;
	for(var i=0;i<quotes.length;i++){
		var m=quotes[i][name];
		if(typeof m=="undefined" || m==null) continue;
		if(isNaN(m)) continue;
		min=Math.min(m,min);
		max=Math.max(m,max);
	}
	return {"min":min,"max":max};
};

STXStudies.determineMinMax=function(stx, sd, quotes){
	var panel=stx.panels[sd.panel];
	if(!panel) return;
	if(panel.min!=null) return;
	if(sd.min==null){
		if(sd.libraryEntry && sd.libraryEntry.range=="0 to 100"){
			panel.min=0; panel.max=100;
		}else if(sd.libraryEntry && sd.libraryEntry.range=="-1 to 1"){
			panel.min=-1; panel.max=1;
		}else if(!sd.libraryEntry || sd.libraryEntry.range!="bypass"){
			panel.min=2000000000;
			panel.max=-2000000000;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				for(var j in sd.outputMap){
					var m=quote[j];
					if(typeof m=="undefined" || m==null) continue;
					if(isNaN(m)) continue;
					panel.min=Math.min(m,panel.min);
					panel.max=Math.max(m,panel.max);
				}
				var m=quote[sd.name+"_hist"];
				if(typeof m=="undefined" || m==null) continue;
				if(isNaN(m)) continue;
				panel.min=Math.min(m,panel.min);
				panel.max=Math.max(m,panel.max);
			}
		}
	}else{
		panel.min=sd.min; panel.max=sd.max;
	}
	panel.shadow=panel.max-panel.min;
	if(panel.max>0 && panel.min<0) panel.shadow=panel.max + panel.min*-1;
	panel.yAxis.high=panel.max;
	panel.yAxis.low=panel.min;
	panel.yAxis.shadow=panel.yAxis.high-panel.yAxis.low;
};

STXStudies.createYAxis=function(stx, sd, quotes, panel){
	if(!panel.axisDrawn){
		panel.height=panel.bottom-panel.top;
		STXStudies.determineMinMax(stx, sd, quotes);
		panel.yAxis.displayGridLines=false;	// Don't display grid lines on studies
		if(sd.libraryEntry && sd.libraryEntry.yaxis){
			stx.createYAxis(panel, {"dontDraw":true});
			sd.libraryEntry.yaxis(stx, sd);
		}else{
			// If zones are enabled then we don't want to draw the yAxis
			var parameters={
					"noDraw": (sd.parameters && sd.parameters.studyOverZonesEnabled)
			};
			stx.createYAxis(panel, parameters);
		}
		if(panel.min<0 && panel.max>0){
			STXStudies.drawHorizontal(stx, sd, quotes, 0);
		}
		panel.axisDrawn=true;
	}
};

STXStudies.displaySeriesAsLine=function(stx, sd, quotes){
	if(quotes.length==0) return;
	var panel=stx.panels[sd.panel];
	if(!panel) return;
	if(panel.hidden==true) return;
	if(panel.name!=sd.chart.name){
		STXStudies.createYAxis(stx, sd, quotes, panel);
	}

	for(var i in sd.outputMap){
		STXStudies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
	}
};
STXStudies.displayIndividualSeriesAsLine=function(stx, sd, panel, name, quotes){
	if(!panel.height) panel.height=panel.bottom-panel.top;
	var chart=panel.chart;
	STXStudies.studyPanelMap[name]=panel.name;
    var context=stx.chart.context;
	context.lineWidth=1;
	if(sd.highlight) context.lineWidth=3;
	var color=sd.outputs[sd.outputMap[name]];
	if(color=="auto") color=stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
	context.strokeStyle=color;

    stx.plotLineChart(panel, quotes, name, {skipTransform:true, label:stx.preferences.labels});

	if(sd.libraryEntry && sd.libraryEntry.appendDisplaySeriesAsLine) sd.libraryEntry.appendDisplaySeriesAsLine(stx, sd, quotes, name, panel);
};

STXStudies.drawHorizontal=function(stx, sd, quotes, price){
	var panel = stx.panels[sd.name];
	if(!panel) return;

	var yAxis=panel.yAxis;
	var y=stx.pixelFromPrice(0, panel);
	stx.plotLine(stx.chart.left, stx.chart.width, y, y, "#DDDDDD", "line", stx.chart.context, false, {});
};

STXStudies.displayKlinger=function(stx, sd, quotes) {
	var panel=stx.panels[sd.panel];
	STXStudies.createYAxis(stx, sd, quotes, panel);
	STXStudies.createHistogram(stx, sd, quotes);
	STXStudies.displaySeriesAsLine(stx, sd, quotes);
};

STXStudies.calculateKlinger=function(stx, sd){
	STXStudies.passToModulus(stx, sd);
	var field=sd.name+"_hist", klinger="Klinger " + sd.name, klingerSignal="KlingerSignal " + sd.name;
	for(var i=0;i<sd.chart.scrubbed.length;i++){
		var quote=sd.chart.scrubbed[i];
		quote[field]=quote[klinger]-quote[klingerSignal];
	}
};

STXStudies.displayMACD=function(stx, sd, quotes) {
	var panel=stx.panels[sd.panel];
	STXStudies.createYAxis(stx, sd, quotes, panel);
	STXStudies.createHistogram(stx, sd, quotes, false);
	STXStudies.displaySeriesAsLine(stx, sd, quotes);
};

STXStudies.displayPSAR2=function(stx, sd, quotes){
	stx.startClip(sd.panel);
	stx.chart.context.beginPath();
	var field="Result " + sd.name;
	for(var x=0;x<quotes.length;x++){
		var quote=quotes[x];
		if(quote==null) continue;
		var x0=stx.computePosition(x, 0);
		var y0=stx.pixelFromPrice(quote[field], stx.panels[sd.panel]);
		stx.chart.context.moveTo(x0,y0);
		stx.chart.context.lineTo(x0+3, y0);
	}
	stx.chart.context.lineWidth=1;
	if(sd.highlight) stx.chart.context.lineWidth=3;
	var color=sd.outputs["Result"];
	if(color=="auto") color=stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
	stx.chart.context.strokeStyle=color;
	stx.chart.context.stroke();
	stx.chart.context.closePath();
	stx.endClip();
};

// Centered will center the histogram on the panel, otherwise the histogram is centered on the zero axis
STXStudies.createHistogram=function(stx, sd, quotes, centered){
	STXStudies.determineMinMax(stx, sd, quotes);
	var panel = stx.panels[sd.name];

	var myWidth=stx.layout.candleWidth-2;
	if(myWidth<2) myWidth=1;

	var y=stx.pixelFromPrice(0, panel);
	if(centered){
		y=panel.top + panel.height/2;
	}

	var context=stx.chart.context;
	var field=sd.name+"_hist";
	context.beginPath();
	for(var i=0;i<quotes.length;i++){
		var quote=quotes[i];
		if(quote==null) continue;
		var x0=stx.computePosition(i, 1);
		var x1=x0 + myWidth;
		var y1=stx.pixelFromPrice(quote[field], panel);
		context.moveTo(x0, y);
		context.lineTo(x1, y);
		context.lineTo(x1, y1);
		context.lineTo(x0, y1);
		context.lineTo(x0, y);
	}
	stx.canvasColor("stx_histogram");
	context.fill();
	context.closePath();
	context.globalAlpha=1;
};

STXStudies.prettify={
		"Close":"C",
		"Open":"O",
		"High":"H",
		"Low":"L",
		",simple":"",
		"simple":"",
		"exponential":"ema",
		"time series":"ts",
		"triangular":"tri",
		"variable":"var",
		"weighted":"wa",
		"wells wilder":"ww"
};

STXStudies.prettyRE=/^.*\((.*?)\).*$/;

STXStudies.prettyDisplay=function(id){
	var match = STXStudies.prettyRE.exec(id);
	if(!match) return id;
	var guts=match[1];
	if(guts){
		for(var i in STXStudies.prettify){
			guts=guts.replace(i, STXStudies.prettify[i]);
		}
		id=id.replace(match[1], guts);
	}
	return id;
};

STXStudies.initializeFN=function(stx, type, inputs, outputs, parameters){
	if(!inputs) inputs={
			id: type
	};
	if(!parameters) parameters={};
	if(!inputs.display) inputs.display=STXStudies.prettyDisplay(inputs.id);
	var sd=new STXStudies.StudyDescriptor(inputs.id, type, inputs.id, inputs, outputs, parameters);
	if(inputs["Period"]) sd.days=parseFloat(sd.inputs["Period"]);
	var study=STXStudies.studyLibrary[type];
	if(stx.panelExists(inputs.id)){
		sd.panel=stx.panels[inputs.id].name;
	}else if(!study || !study.overlay){
		stx.createPanel(inputs.display, inputs.id, null, parameters.chartName);
	}else{
		var panel=null;
		if(inputs["Field"]){
			panel=STXStudies.studyPanelMap[inputs["Field"]];
			if(inputs["Field"]=="Volume") panel="vchart";
		}
		if(!panel) panel=parameters.chartName;	// If a panel isn't specified then this is an overlay on the chart itself
		sd.panel=panel;
	}
	return sd;
};

STXStudies.initializeStochastics=function(stx, type, inputs, outputs){
	inputs.display="Stoch (" + inputs["Period"] + ")";
	return STXStudies.initializeFN.apply(null, arguments);
};

STXStudies.overZones=function(stx, sd, quotes){
	if(quotes.length==0) return;
	var panel=stx.panels[sd.panel];
	if(!panel) return;
	if(panel.hidden==true) return;
	var parameters=sd.parameters;
	STXStudies.displaySeriesAsLine(stx, sd, quotes);
	if(sd.parameters && sd.parameters.studyOverZonesEnabled){
		var overBought=parseFloat(sd.parameters.studyOverBoughtValue), overSold=parseFloat(sd.parameters.studyOverSoldValue);
		var ypx=panel.height/panel.shadow;
		var overBoughtY=panel.bottom-ypx*overBought;
		var overSoldY=panel.bottom-ypx*overSold;
		var parameters={
			lineWidth: 1
		};
		stx.chart.context.globalAlpha=.2;
		stx.plotLine(0,stx.chart.width-5, overBoughtY, overBoughtY, sd.parameters.studyOverBoughtColor, "segment", stx.chart.context, false, parameters);
		stx.chart.context.globalAlpha=.2;
		stx.plotLine(0,stx.chart.width-5, overSoldY, overSoldY, sd.parameters.studyOverSoldColor, "segment", stx.chart.context, false, parameters);

		if(!sd.libraryEntry.yaxis){
			// Draw the y-axis with overbought/oversold
			var fontHeight=stx.getCanvasFontSize("stx_yaxis");
			stx.canvasFont("stx_yaxis");
			stx.canvasColor("stx_yaxis");
			stx.chart.context.fillText(overBought, stx.chart.width, overBoughtY + (fontHeight/2));
			stx.chart.context.fillText(overSold, stx.chart.width, overSoldY + (fontHeight/2));
		}
	}
};

STXStudies.calculateMACD=function(stx, sd) { STXStudies._calculateMACD(stx, sd); };
STXStudies.calculateRSI=function(stx, sd){STXStudies._calculateRSI(stx,sd);};
STXStudies.calculateStochastics=function(stx, sd){STXStudies._calculateStochastics(stx, sd);};
STXStudies.passToModulus=function(stx, sd){STXStudies._passToModulus(stx, sd);};
STXStudies.calculateMovingAverage=function(stx, sd){STXStudies._calculateMovingAverage(stx, sd);};


STXStudies.studyLibrary={
		"rsi": {
			"inputs": {"Period":14},
			"calculateFN": STXStudies.calculateRSI,
			"seriesFN": STXStudies.overZones,
			"range": "0 to 100",
			"outputs":{"RSI":"auto"},
			"parameters": {
				template:"studyOverZones",
				init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
			}
		},
		"ma": {
			"overlay": true,
			"range": "bypass",
			"calculateFN": STXStudies.calculateMovingAverage,
			"inputs": {"Period":50,"Field":"field","Type":"ma"},
			"outputs": {"MA":"#FF0000"}
		},
		"macd": {
			"calculateFN": STXStudies.calculateMACD,
			"seriesFN": STXStudies.displayMACD,
			"inputs": {"Fast MA Period":12,"Slow MA Period":26,"Signal Period":9},
			"outputs":{"MACD":"auto", "Signal":"#FF0000"}
		},
		"stochastics": {
			"initializeFN": STXStudies.initializeStochastics,
			"calculateFN": STXStudies.calculateStochastics,
			"inputs": {"Period":14,"Smooth":true},
			"outputs":{"Fast":"auto", "Slow":"#FF0000"}
		},
		"Aroon": {
			"range": "0 to 100",
			"outputs":{"Aroon Up":"#00FF00", "Aroon Down":"#FF0000"}
		},
		"Lin R2": {
			"inputs": {"Period":14,"Field":"field"},
			"outputs":{"RSquared":"auto"}
		},
		"Lin Fcst": {
			"overlay": true,
			"inputs": {"Period":14,"Field":"field"},
			"outputs":{"Forecast":"auto"}
		},
		"Lin Incpt": {
			"overlay": true,
			"inputs": {"Period":14,"Field":"field"},
			"outputs":{"Intercept":"auto"}
		},
		"Time Fcst": {
			"overlay": true,
			"inputs": {"Period":14,"Field":"field"}
		},
		"VIDYA": {
			"overlay": true,
			"inputs": {"Period":50,"Field":"field", "R2 Scale":.65}
		},
		"STD Dev": {
			"inputs": {"Period":14,"Field":"field", "Standard Deviations":2, "Moving Average Type":"ma"}
		},
		"Trade Vol": {
			"inputs": {"Field":"field", "Min Tick Value":.5}
		},
		"Swing": {
			"inputs": {"Limit Move Value":.5}
		},
		"Acc Swing": {
			"inputs": {"Limit Move Value":.5}
		},
		"Price Vol": {
			"inputs": {"Field":"field"}
		},
		"Pos Vol": {
			"inputs": {"Field":"field"}
		},
		"Neg Vol": {
			"inputs": {"Field":"field"}
		},
		"On Bal Vol": {
			"inputs": {"Field":"field"}
		},
		"Perf Idx": {
			"inputs": {"Field":"field"}
		},
		"Stch Mtm": {
			"inputs": {"%K Periods":13,"%K Smoothing Periods":25, "%K Double Smoothing Periods":2, "%D Periods":9, "Moving Average Type":"ma", "%D Moving Average Type":"ma"},
			"outputs":{"%K":"auto", "%D":"#FF0000"}
		},
		"Hist Vol": {
			"inputs": {"Field":"field", "Period":14, "Bar History":10, "Standard Deviations":2}
		},
		"Ultimate": {
			"inputs": {"Cycle 1":3, "Cycle 2":8, "Cycle 3":14}
		},
		"W Acc Dist": {
			"inputs": {}
		},
		"Vol Osc": {
			"inputs": {"Short Term Periods":8, "Long Term Periods":14, "Points Or Percent":["Points","Percent"]}
		},
		"Chaikin Vol": {
			"inputs": {"Period":14, "Rate Of Change":2, "Moving Average Type":"ma"}
		},
		"Price Osc": {
			"inputs": {"Field":"field", "Long Cycle":8, "Short Cycle":3, "Moving Average Type":"ma"}
		},
		"EOM": {
			"inputs": {"Period":14, "Moving Average Type":"ma"}
		},
		"CCI": {
			"inputs": {"Period":20}
		},
		"Detrended": {
			"inputs": {"Field":"field","Period":14, "Moving Average Type":"ma"}
		},
		"True Range": {
			"inputs": {}
		},
		"Aroon Osc": {
			"outputs":{"Aroon Oscillator":"auto"}
		},
		"Elder Force": {
			"inputs": {}
		},
		"Ehler Fisher": {
			"outputs":{"EF":"auto", "EF Trigger":"#FF0000"}
		},
		"Schaff": {
			"inputs": {"Field":"field","Period":14, "Short Cycle":13, "Long Cycle":25, "Moving Average Type":"ma"}
		},
		"QStick": {
			"inputs": {"Period":14, "Moving Average Type":"ma"}
		},
		"Coppock": {
			"inputs": {"Field":"field"}
		},
		"Chande Fcst": {
			"inputs": {"Field":"field", "Period":14}
		},
		"Intraday Mtm": {
			"inputs": {}
		},
		"RAVI": {
			"inputs": {"Field":"field", "Short Cycle":13, "Long Cycle":25}
		},
		"Random Walk": {
			"outputs": {"Random Walk High":"#FF0000", "Random Walk Low":"#0000FF"}
		},
		"Directional": {
			"outputs": {"ADX":"#00FF00", "DI+":"#FF0000", "DI-":"#0000FF"}
		},
		"High Low": {
			"overlay": true,
			"outputs": {"High Low Bands Top":"auto", "High Low Bands Median":"auto", "High Low Bands Bottom":"auto"}
		},
		"MA Env": {
			"overlay": true,
			"inputs": {"Field":"field", "Period":50, "Shift Percentage": 5},
			"outputs": {"Envelope Top":"auto", "Envelope Median":"auto", "Envelope Bottom":"auto"}
		},
		"Fractal Chaos Bands": {
			"overlay": true,
			"outputs": {"Fractal High":"auto", "Fractal Low":"auto"}
		},
		"Prime Number Bands": {
			"overlay": true,
			"outputs": {"Prime Bands Top":"auto", "Prime Bands Bottom":"auto"}
		},
		"Bollinger Bands": {
			"overlay": true,
			"inputs": {"Field":"field", "Period":50, "Standard Deviations": 2, "Moving Average Type":"ma"},
			"outputs": {"Bollinger Band Top":"auto", "Bollinger Band Median":"auto", "Bollinger Band Bottom":"auto"}
		},
		"Keltner": {
			"overlay": true,
			"inputs": {"Period":50, "Shift": 5, "Moving Average Type":"ema"},
			"outputs": {"Keltner Top":"auto", "Keltner Median":"auto", "Keltner Bottom":"auto"}
		},
		"PSAR": {
			"overlay": true,
			"seriesFN": null,
			"calculateFN": STXStudies.passToModulus,
			"seriesFN": STXStudies.displayPSAR2,
			"inputs": {"Minimum AF":.02,"Maximum AF":.2}
		},
		"Klinger": {
			"seriesFN": STXStudies.displayKlinger,
			"calculateFN": STXStudies.calculateKlinger,
			"inputs": {"Signal Periods":13, "Short Cycle": 34, "Long Cycle": 55, "Moving Average Type":"ma"},
			"outputs": {"Klinger":"auto","KlingerSignal":"#FF0000"}
		},
		"Elder Ray": {
			"inputs": {"Period":13, "Moving Average Type":"ema"},
			"outputs": {"Elder Bull Power":"#00DD00", "Elder Bear Power":"#FF0000"}
		},
		"LR Slope": {
			"inputs": {"Period":14,"Field":"field"},
			"outputs":{"Slope":"auto"}
		}
};


if(!Function.prototype.stxInheritsFrom){
	Function.prototype.stxInheritsFrom = function (parentClassOrObject){
		this.prototype=new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	};
}

/*
 * Base class for Drawing Tools. Use stxInheritsFrom() to build a subclass for custom drawing tools.
 * The name of the subclass should be STX.Drawing.yourname. Whenever STXChart.vectorType==yourname, then
 * your drawing tool will be the one that is enabled when the user begins a drawing. Capitalization of yourname
 * must be an exact match otherwise ther kernel will not be able to find your drawing tool.
 *
 * Each of the STX.Drawing prototype functions may be overridden. To create a functioning drawing tool
 * you must override the functions below that create alerts.
 *
 * Drawing clicks are always delivered in *adjusted price*. That is, if a stock has experienced splits then
 * the drawing will not display correctly on an unadjusted price chart unless this is considered during the rendering
 * process. Follow the templates to assure correct rendering under both circumstances.
 */
STX.Drawing=function (){
	this.chartsOnly=false;	// Set this to true to restrict drawing to panels containing charts (as opposed to studies)
};

STX.Drawing.prototype.abort=function(forceClear){};
STX.Drawing.prototype.measure=function(){};
STX.Drawing.prototype.construct=function(stx, panel){
	this.stx=stx;
	this.panelName=panel.name;
};
STX.Drawing.prototype.render=function(context)					{alert("must implement render function!");};
STX.Drawing.prototype.click=function(context, tick, value)		{alert("must implement click function!");};
STX.Drawing.prototype.move=function(context, tick, value)		{alert("must implement move function!");};
STX.Drawing.prototype.intersected=function(tick, value, box)	{alert("must implement intersected function!");};
STX.Drawing.prototype.reconstruct=function(stx, obj)				{alert("must implement reconstruct function!");};
STX.Drawing.prototype.serialize=function()						{alert("must implement serialize function!");};
STX.Drawing.prototype.adjust=function()							{alert("must implement adjust function!");};

/*
 * Base class for drawings that require two mouse clicks. Override
 */
STX.Drawing.BaseTwoPoint=function(){
	this.p0=null;
	this.p1=null;
	this.color="";
};

STX.Drawing.BaseTwoPoint.stxInheritsFrom(STX.Drawing);

// Override this function to copy all of the config necessary to render your drawing
STX.Drawing.BaseTwoPoint.prototype.copyConfig=function(){
	this.color=STXChart.currentColor;
};

STX.Drawing.BaseTwoPoint.prototype.highlight=function(highlighted){	// return true if the highlighting status changes
	if(this.highlighted!=highlighted){
		this.highlighted=highlighted;
		return true;
	}
	return false;
};

// Intersection is based on a hypothetical box that follows a user's mouse or finger around
// An intersection occurs when either the box crosses over the drawing.The type should be "segment", "ray" or "line" depending on whether
// the drawing extends infinitely in any or both directions. radius determines the size of the box in pixels and is
// determined by the kernel depending on the user interface (mouse, touch, etc)

STX.Drawing.BaseTwoPoint.prototype.lineIntersection=function(tick, value, box, type){
	if(this.stx.layout.semiLog){
		return boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), this.p1[0], STX.log10(this.p1[1]), type);
	}else{
		return boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], this.p1[0], this.p1[1], type);
	}
};

STX.Drawing.BaseTwoPoint.prototype.boxIntersection=function(tick, value){
	if(tick>Math.max(this.p0[0], this.p1[0]) || tick<Math.min(this.p0[0], this.p1[0])) return false;
	if(value>Math.max(this.p0[1], this.p1[1]) || value<Math.min(this.p0[1], this.p1[1])) return false;
	return true;
};

/*
 * Any two-point drawing that results in a drawing that is less than 10 pixels
 * can safely be assumed to be an accidental click. Such drawings are so small
 * that they are difficult to highlight and delete, so we won't allow them.
 *
 * Note, it is very important to use pixelFromValueAdjusted() rather than pixelFromPrice(). This will
 * ensure that saved drawings always render correctly when a chart is adjusted or transformed for display
 */
STX.Drawing.BaseTwoPoint.prototype.accidentalClick=function(tick, value){
	var panel=this.stx.panels[this.panelName];
	var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
	var x1=this.stx.pixelFromTick(tick, panel.chart);
	var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
	var y1=this.stx.pixelFromValueAdjusted(panel, tick, value);
	var h=Math.abs(x1-x0);
	var v=Math.abs(y1-y0);
	var length=Math.sqrt(h*h+v*v);
	if(length<10) return true;
};

/*
 * value will be the actual underlying, unadjusted value for the drawing. Any adjustments or transformations
 * are reversed out by the kernel. Internally, drawings should store their raw data (date and value) so that
 * they can be rendered on charts with different layouts, axis, etc
 */
STX.Drawing.BaseTwoPoint.prototype.click=function(context, tick, value){
	this.copyConfig();
	if(!this.p0){
		this.p0=[tick,value];
		return false;
	}
	if(this.accidentalClick(tick, value)) return false;
	var panel=this.stx.panels[this.panelName];

	this.p1=[tick,value];
	this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
	this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
	this.v0=this.p0[1];
	this.v1=this.p1[1];

	return true;	// kernel will call render after this
};

STX.Drawing.BaseTwoPoint.prototype.adjust=function(){
	// If the drawing's panel doesn't exist then we'll check to see
	// whether the panel has been added. If not then there's no way to adjust
	var panel=this.stx.panels[this.panelName];
	if(!panel) return;
	this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
	this.p1=[this.stx.tickFromDate(this.d1, panel.chart), this.v1];
};

STX.Drawing.BaseTwoPoint.prototype.move=function(context, tick, value){
	this.copyConfig();
	this.p1=[tick,value];
	this.render(context);
};

STX.Drawing.BaseTwoPoint.prototype.measure=function(){
	this.stx.setMeasure(this.p0[1], this.p1[1], this.p0[0], this.p1[0], true);
};

STX.Drawing.segment=function(){
	this.name="segment";
};

STX.Drawing.segment.stxInheritsFrom(STX.Drawing.BaseTwoPoint);

STX.Drawing.segment.prototype.render=function(context){
	var panel=this.stx.panels[this.panelName];
	if(!panel) return;
	var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
	var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
	var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
	var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);

	var color=this.color;
	var width=this.lineWidth;
	if(this.highlighted){
		var w=this.stx.canvasStyle("stx_highlight_vector").width;
		color=this.stx.getCanvasColor("stx_highlight_vector");
		//if(w) width=stripPX(w);
	}else{
		this.stx.setMeasure(null,null,null,null,false);
	}

	var parameters={
			pattern: this.pattern,
			lineWidth: width
	};
	this.stx.plotLine(x0, x1, y0, y1, color, this.name, context, panel, parameters);
};

STX.Drawing.segment.prototype.abort=function(){
	this.stx.setMeasure(null,null,null,null,false);
};


STX.Drawing.segment.prototype.intersected=function(tick, value, box){
	return this.lineIntersection(tick, value, box, this.name);
};

STX.Drawing.segment.prototype.copyConfig=function(){
	this.color=STXChart.currentColor;
	this.lineWidth=STXChart.currentVectorParameters.lineWidth;
	this.pattern=STXChart.currentVectorParameters.pattern;
};

STX.Drawing.segment.prototype.reconstruct=function(stx, obj){
	this.stx=stx;
	this.color=obj["col"];
	this.panelName=obj["pnl"];
	this.pattern=obj["ptrn"];
	this.lineWidth=obj["lw"];
	this.d0=obj["d0"];
	this.d1=obj["d1"];
	this.v0=obj["v0"];
	this.v1=obj["v1"];
	this.adjust();
};

STX.Drawing.segment.prototype.serialize=function(){
	return {
		name:this.name,
		pnl: this.panelName,
		col:this.color,
		ptrn:this.pattern,
		lw:this.lineWidth,
		d0:this.d0,
		d1:this.d1,
		v0:this.v0,
		v1:this.v1
	};
};



STX.Drawing.rectangle=function(){
	this.name="rectangle";
};

STX.Drawing.rectangle.stxInheritsFrom(STX.Drawing.BaseTwoPoint);

STX.Drawing.rectangle.prototype.render=function(context){
	var panel=this.stx.panels[this.panelName];
	if(!panel) return;
	var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
	var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
	var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
	var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);

	var x=Math.round(Math.min(x0, x1))+.5;
	var y=Math.min(y0, y1);
	var width=Math.max(x0,x1)-x;
	var height=Math.max(y0, y1)-y;
	var edgeColor=this.color;
	if(this.highlighted){
		edgeColor=this.stx.getCanvasColor("stx_highlight_vector");
	}

	var fillColor=this.fillColor;
	if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
		context.beginPath();
		context.rect(x, y, width, height);
		context.fillStyle=fillColor;
		context.globalAlpha=.2;
		context.fill();
		context.closePath();
		context.globalAlpha=1;
	}

	var parameters={
			pattern: this.pattern,
			lineWidth: this.lineWidth
	};
	if(this.highlighted && parameters.pattern=="none"){
		parameters.pattern="solid";
		if(parameters.lineWidth==.1) parameters.lineWidth=1;
	}

	// We extend the vertical lines by .5 to account for displacement of the horizontal lines
	// HTML5 Canvas exists *between* pixels, not on pixels, so draw on .5 to get crisp lines
	this.stx.plotLine(x0, x1, y0, y0, edgeColor, "segment", context, panel, parameters);
	this.stx.plotLine(x1, x1, y0-.5, y1+.5, edgeColor, "segment", context, panel, parameters);
	this.stx.plotLine(x1, x0, y1, y1, edgeColor, "segment", context, panel, parameters);
	this.stx.plotLine(x0, x0, y1+.5, y0-.5, edgeColor, "segment", context, panel, parameters);
};


STX.Drawing.rectangle.prototype.intersected=function(tick, value){
	return this.boxIntersection(tick, value);
};

STX.Drawing.rectangle.prototype.copyConfig=function(){
	this.color=STXChart.currentColor;
	this.fillColor=STXChart.currentVectorParameters.fillColor;
	this.lineWidth=STXChart.currentVectorParameters.lineWidth;
	this.pattern=STXChart.currentVectorParameters.pattern;
};

STX.Drawing.rectangle.prototype.reconstruct=function(stx, obj){
	this.stx=stx;
	this.color=obj["col"];
	this.fillColor=obj["fc"];
	this.panelName=obj["pnl"];
	this.pattern=obj["ptrn"];
	this.lineWidth=obj["lw"];
	this.d0=obj["d0"];
	this.d1=obj["d1"];
	this.v0=obj["v0"];
	this.v1=obj["v1"];
	this.adjust();
};

STX.Drawing.rectangle.prototype.serialize=function(){
	return {
		name:this.name,
		pnl: this.panelName,
		col:this.color,
		fc:this.fillColor,
		ptrn:this.pattern,
		lw:this.lineWidth,
		d0:this.d0,
		d1:this.d1,
		v0:this.v0,
		v1:this.v1
	};
};


STXTouchAction="onclick";
if(STX.touchDevice && (STX.ipad || STX.iphone)) STXTouchAction="ontouchend";

/*
 * STXMenuManager
 *
 * This widget manages menus. First, it ensures that charts do not react to users clicking or tapping on menus that overlap
 * the charting area. Then it also allows users to close menus by tapping outside of the menu area. This is accomplished
 * through the use of invisible, temporary overlay divs. Menu manager is a singleton. It automatically exists and only one is required per page.
 * Simply register your charts with the manager in order for it to automatically engage.
 */
STXMenuManager=function(){};
STXMenuManager.registeredCharts=[];
STXMenuManager.openMenu=null;
STXMenuManager.useOverlay=true;
STXMenuManager.menusDisabled=false;	// Set to true for instance when opening a dialog
STXMenuManager.onClass=null;
STXMenuManager.offClass=null;
STXMenuManager.menus=[];

STXMenuManager.registerChart=function(stx){
	STXMenuManager.registeredCharts.push(stx);
	if(!STXMenuManager.bodyOverlay){
		STXMenuManager.bodyOverlay=STX.newChild(document.body, "DIV", "stxBodyOverlay");
	}
};

/*
 * Override whether or not to use overlays. If overlays are not enabled then menus will still co-react
 * but no overlay will be generated to allow tapping outside of the menus
 */
STXMenuManager.useOverlays=function(useOverlay){
	STXMenuManager.useOverlay=useOverlay;
};

STXMenuManager.cancelSingleClick=function(){
	if(STXTouchAction=="ontouchend"){
		for(var i=0;i<STXMenuManager.registeredCharts.length;i++){
			STXMenuManager.registeredCharts[i].cancelTouchSingleClick=true;
		}
	}
};

/* Turns on the menu manager. Pass a callback for when the user taps outside of the menu. The callback function will receive the name.
 * name should be unique for each menu on the page, so that clicking one menu will close an already open menu
 */
STXMenuManager.menuOn=function(name, callback, cascading){
	function tapMe(callback, name){
		return function(e){
			STXMenuManager.menuOff();
			callback(name);
		};
	}
	if(STXMenuManager.registeredCharts.length==0) return;
	if(STXMenuManager.openMenu){
		if(name==STXMenuManager.openMenu) return;	// menu already open and manager active
		STXMenuManager.closeCurrentMenu();
	}
	STXMenuManager.openMenu=name;
	if(STXMenuManager.useOverlay){
		STXMenuManager.bodyOverlay.style.display="block";
		STXMenuManager.bodyOverlay[STXTouchAction]=tapMe(callback, name);
	}
	STXMenuManager.closeCurrentMenu=callback;
	for(var i=0;i<STXMenuManager.registeredCharts.length;i++){
		STXMenuManager.registeredCharts[i].openDialog=name;
	}
};

STXMenuManager.menuOff=function(){
	if(STXMenuManager.registeredCharts.length==0) return;
	document.activeElement.blur();	// Hide keyboard on touch devices
	STXMenuManager.openMenu=null;
	if(STXMenuManager.useOverlay){
		STXMenuManager.bodyOverlay.style.display="none";
		STXMenuManager.bodyOverlay[STXTouchAction]=null;
	}
	this.cancelSingleClick();
	if(STXDialogManager.stack.length==0){
		for(var i=0;i<STXMenuManager.registeredCharts.length;i++){
			STXMenuManager.registeredCharts[i].openDialog="";
		}
	}
};

STXMenuManager.makeMenus=function(){
	function toggle(div, menu){
		return function(e){
			function turnMeOff(div){
				return function(){
					div.style.display="none";
					if(div.colorPickerDiv!=null) div.colorPickerDiv.style.display="none";
				};
			}
			var dom=getEventDOM(e);
			do{
				if(dom.className && dom.className.indexOf("menuOutline")!=-1) return;	// clicked inside the menuDisplay and not the menu button
				if(dom.className && dom.className.indexOf("stxMenu")!=-1) break; // clicked the actual button
				dom=dom.parentNode;
			}while(dom);
			if(div.style.display=="none"){
				var menuName=uniqueID();
				if(STXMenuManager.menusDisabled && !menu.alwaysOn) return;
				STXMenuManager.menuOn(menuName, turnMeOff(div));
				div.style.display="block";
			}else{
				STXMenuManager.menuOff();
				div.style.display="none";
			}
		};
	}
	function activate(menuOutline, clickable, priorClick){
		return function(e){
			STXMenuManager.menuOff();
			menuOutline.style.display="none";
			//if(priorClick) priorClick();
			var action=clickable.getAttribute("stxToggle");
			eval(action);
		};
	}
	STXMenuManager.menus=document.querySelectorAll(".stxMenu");
	for(var i=0;i<STXMenuManager.menus.length;i++){
		var menu=STXMenuManager.menus[i];
		var menuOutline=menu.querySelectorAll(".menuOutline")[0];
		menu.alwaysOn=(menu.className.indexOf("stxAlwaysOn")!=-1);
		menu[STXTouchAction]=toggle(menuOutline, menu);

		var clickables=menuOutline.querySelectorAll("*[stxToggle]");
		for(var j=0;j<clickables.length;j++){
			clickables[j][STXTouchAction]=activate(menuOutline, clickables[j], clickables[j][STXTouchAction]);
		}
	}
};

STXMenuManager.disableMenus=function(){
	STXMenuManager.menusDisabled=true;
	for(var i=0;i<STXMenuManager.menus.length;i++){
		var menu=STXMenuManager.menus[i];
		if(STXMenuManager.onClass) unappendClassName(menu, STXMenuManager.onClass);
		if(STXMenuManager.offClass) appendClassName(menu, STXMenuManager.offClass);
	}
};

STXMenuManager.enableMenus=function(){
	STXMenuManager.menusDisabled=false;
	for(var i=0;i<STXMenuManager.menus.length;i++){
		var menu=STXMenuManager.menus[i];
		if(STXMenuManager.offClass) unappendClassName(menu, STXMenuManager.offClass);
		if(STXMenuManager.onClass) appendClassName(menu, STXMenuManager.onClass);
	}};

/*
 * Close the menu that an element lives in. For instance, when hitting enter in an input box contained
 * within a menu simply send the input box itself in and the library will find and close the menu for you.
 */
STXMenuManager.closeThisMenu=function(el){
	while(el && typeof(el.className)!="undefined" && el.className.indexOf("menuOutline")==-1){
		el=el.parentNode;
	}
	if(el){
		el.style.display="none";
	}
	STXMenuManager.menuOff();
};

/*
 * Attach a color picker to a div (swatch).
 * colorClick should be the swatch DOM element
 *
 * cpHolder should be a DOM element that contains the color picker. If the color picker is within a dialog
 * or menu then cpHolder should be that dialog or menu in order to assure that the color picker is closed
 * when the menu or dialog is closed
 *
 * cb is the callback when the color is selected fc(color)
 *
 * noMenuBehavior when set to true bypasses the menuing system, otherwise the color picker is treated as a menu
 * element and will close whenever another menu is opened. Always use noMenuBehavior when the color picker
 * is contained within a parent menu otherwise the color picker could get orphaned on the screen.
 */
STXMenuManager.attachColorPicker = function(colorClick, cpHolder, cb, noMenuBehavior){
	var closure=function(colorClick, cpHolder, cb){
		return function(color){
			if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
			colorClick.style.backgroundColor="#"+color;
			if(cb) cb(color);
			if(!noMenuBehavior) STXMenuManager.menuOff();
		};
	};
	function closeMe(cpHolder){
		return function(){
			if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
		};
	}

	colorClick[STXTouchAction]=(function(fc, cpHolder){ return function(){
		if(!noMenuBehavior) STXMenuManager.menuOn("colorPicker", closeMe(cpHolder));
		if( cpHolder.colorPickerDiv==null){
			cpHolder.colorPickerDiv=document.createElement("DIV");
			cpHolder.colorPickerDiv.className="ciqColorPicker";
			document.body.appendChild(cpHolder.colorPickerDiv);
		}
		STX.createColorPicker(cpHolder.colorPickerDiv, fc);
		cpHolder.colorPickerDiv.style.display="block";
		var xy=getPos(this);
		var x=xy.x+this.clientWidth;
		if((x+cpHolder.colorPickerDiv.offsetWidth)>pageWidth())
			x-=(x+cpHolder.colorPickerDiv.offsetWidth)-pageWidth()+20;
		cpHolder.colorPickerDiv.style.left=x+"px";

		var y=(xy.y);
		if(y+cpHolder.colorPickerDiv.clientHeight>pageHeight())
			y-=(y+cpHolder.colorPickerDiv.clientHeight)-pageHeight();
		cpHolder.colorPickerDiv.style.top=y+"px";
	};})(closure(colorClick, cpHolder, cb), cpHolder);
};
/*
 * STXDialogManager
 *
 * A widget for managing modal dialogs. It maintains an internal stack so that multiple dialogs may be open simultaneously.
 * Optionally set useOverlay to true in order to create an overlay for dimming the screen
 */
STXDialogManager=function(){};
STXDialogManager.useOverlay=false;
STXDialogManager.stack=[];

STXDialogManager.modalBegin=function(){
	STXMenuManager.menusDisabled=true;
	for(var i=0;i<STXChart.registeredContainers.length;i++){
		var stx=STXChart.registeredContainers[i].stx;
		stx.modalBegin();
	}
};

STXDialogManager.modalEnd=function(){
	STXMenuManager.menusDisabled=false;
	for(var i=0;i<STXChart.registeredContainers.length;i++){
		var stx=STXChart.registeredContainers[i].stx;
		stx.modalEnd();
	}
};

STXDialogManager.displayDialog=function(id){
	STXDialogManager.modalBegin();
	if(STXDialogManager.useOverlay && !STXDialogManager.bodyOverlay){
		STXDialogManager.bodyOverlay=STX.newChild(document.body, "DIV", "stxDialogOverlay");
	}
	if(STXDialogManager.useOverlay){
		STXDialogManager.bodyOverlay.style.display="block";
	}
	var node=id;
	if(typeof id=="string") node=$$(id);
	node.style.display="block";
	STXDialogManager.stack.push(node);
};

STXDialogManager.dismissDialog=function(){
	document.activeElement.blur();	// Hide keyboard on touch devices
	var node=STXDialogManager.stack.pop();
	node.style.display="none";
	if(node.colorPickerDiv!=null) node.colorPickerDiv.style.display="none";

	if(STXDialogManager.stack.length==0){
		if(STXDialogManager.bodyOverlay && STXDialogManager.bodyOverlay.style.display=="block"){
			STXDialogManager.bodyOverlay.style.display="none";
		}
		STXDialogManager.modalEnd();
	}
	fixScreen();
};


/*
 * STXThemeManager
 *
 * A widget for managing chart colors and themes. The dialog functionality assumes that color picker
 * divs have been set up with a class that matches one of the stx chart configuration classes (such as stx_candle_up)
 *
 * The classMapping determines which classes are mapped to each color picker. If null then apply to the container itself
 */
STXThemeManager=function(){};
STXThemeManager.addBaseThemeClassToBody=true;	// This will add "Dark" or "Light" to the HTML body classes
STXThemeManager.baseThemeEL=null;
STXThemeManager.builtInThemes={};
STXThemeManager.themes={
		enabledTheme:null,
		customThemes:{}
};
STXThemeManager.classMapping={
	stx_candle_up: {stx_candle_up:true, stx_bar_up:true, stx_hollow_candle_up:true},
	stx_candle_down: {stx_candle_down:true, stx_bar_down:true, stx_hollow_candle_down:true},
	stx_candle_shadow: {stx_candle_shadow:true, stx_line_chart:true},
	stx_grid: {stx_grid:true},
	stx_grid_dark: {stx_grid_dark:true},
	stx_xaxis_dark: {stx_xaxis_dark:true, stx_xaxis:true, stx_yaxis:true, stx_yaxis_dark:true},
	backgroundColor: null
};

/*
 * Populate a dialog with the existing colors from a chart
 */
STXThemeManager.populateDialog=function(id, stx){
	function toggleBorders(){
		if($$$("#candleBordersOn",$$(id)).checked){
			stx.styles["stx_candle_up"]["border-left-color"]=$$(id).querySelectorAll(".border.stx_candle_up")[0].style.backgroundColor;
			stx.styles["stx_candle_down"]["border-left-color"]=$$(id).querySelectorAll(".border.stx_candle_down")[0].style.backgroundColor;
		}else{
			stx.styles["stx_candle_up"]["border-left-color"]="transparent";
			stx.styles["stx_candle_down"]["border-left-color"]="transparent";
		}
		stx.draw();
	}
	function chooseColor(property, className){
		return function(color){
			var mapping=STXThemeManager.classMapping[className];
			if(mapping){
				for(var mapped in mapping){
					stx.canvasStyle(mapped);
					stx.styles[mapped][property]="#"+color;
				}
			}else{
				stx.chart.container.style[className]="#" + color;
			}
			stx.draw();
			if(property=="border-left-color" && color && color!="transparent"){
				$$$("#candleBordersOn", $$(id)).checked=true;
			}
		};
	}
	$$$("#candleBordersOn",$$(id)).checked=false;
	$$$("#candleBordersOn",$$(id)).onclick=toggleBorders;

	var computed="#FFFFFF";
	if(stx.chart.container){
		computed=getComputedStyle(stx.chart.container);
	}
	for(var className in STXThemeManager.classMapping){
		var mapping=STXThemeManager.classMapping[className];
		var color=null;
		var borderColor=null;

		if(mapping){
			var firstClass=STX.first(mapping);
			var style=stx.canvasStyle(firstClass);
			color=style.color;
			borderColor=style["border-left-color"];
		}else{
			color=computed[className];
			if(STX.isTransparent(color) && className=="backgroundColor") color=stx.containerColor;
		}

		var picker=$$(id).querySelectorAll(".color." + className)[0];
		if(picker){
			picker.style.backgroundColor=color;
			if(!picker[STXTouchAction]){
				STXMenuManager.attachColorPicker(picker, STXDialogManager, chooseColor("color", className));
			}
		}

		var picker=$$(id).querySelectorAll(".border." + className)[0];
		if(picker){
			picker.style.backgroundColor=borderColor;
			if(!picker[STXTouchAction]){
				STXMenuManager.attachColorPicker(picker, STXDialogManager, chooseColor("border-left-color", className));
			}
			if(borderColor && borderColor!="transparent") $$$("#candleBordersOn", $$(id)).checked=true;
		}
	}
};

/*
 * Convert colors from a chart into a theme object
 */
STXThemeManager.createTheme=function(stx){
	var theme={};
	if(STXThemeManager.baseTheme) theme["baseTheme"]=STXThemeManager.baseTheme;
	for(var className in STXThemeManager.classMapping){
		var mapping=STXThemeManager.classMapping[className];
		if(mapping){
			var firstClass=STX.first(mapping);
			var style=stx.canvasStyle(firstClass);
			theme[className]={color:style.color};
			if(style["border-left-color"] && style["border-left-color"]!="transparent"){
				theme[className]["border-left-color"]=style["border-left-color"];
			}else{
				theme[className]["border-left-color"]="transparent";
			}
		}else{
			if(stx.chart.container)
				theme[className]=stx.chart.container.style[className];
		}
	}
	return theme;
};

/*
 * Save a theme by name. Optional callback function when finished of fc(str) where str is a stringified version of the themes
 * that can be used for saving to a server or to local storage
 */
STXThemeManager.saveTheme=function(name, stx){
	var theme=STXThemeManager.createTheme(stx);
	STXThemeManager.themes.customThemes[name]=theme;
	STXThemeManager.themes.enabledTheme=name;
	if(STXThemeManager.storageCB) STXThemeManager.storageCB(JSON.stringify(STXThemeManager.themes), stx);
	STXThemeManager.themesToMenu(STXThemeManager.el, STXThemeManager.el2, STXThemeManager.stx, STXThemeManager.storageCB);
};

STXThemeManager.setThemes=function(obj, stx){
	if(obj!=null){
		if(obj.customThemes) STXThemeManager.themes.customThemes=obj.customThemes;
		STXThemeManager.themes.enabledTheme=obj.enabledTheme;
		if(STXThemeManager.themes.enabledTheme){
			STXThemeManager.enableTheme(stx, STXThemeManager.themes.enabledTheme);
		}
	}
};

STXThemeManager.enableTheme=function(stx, theme){
	function addCustomizations(){
		var obj=STXThemeManager.themes.customThemes[theme];
		for(var className in obj){
			if(className=="baseTheme") continue;
			var mapping=STXThemeManager.classMapping[className];
			if(mapping){
				for(var mapped in mapping){
					stx.canvasStyle(mapped);
					stx.styles[mapped].color=obj[className].color;
					if(obj[className]["border-left-color"]){
						stx.styles[mapped]["border-left-color"]=obj[className]["border-left-color"];
					}
				}
			}else{
				if(stx.chart.container) stx.chart.container.style[className]=obj[className];
			}
		}
		if(stx.chart.container){
			stx.clearPixelCache();	// force new yAxis to be drawn
			stx.draw();
		}
	}
	var obj=STXThemeManager.themes.customThemes[theme];
	if(obj){
		var baseTheme=obj["baseTheme"];
		STXThemeManager.loadBuiltInTheme(stx, baseTheme, addCustomizations);
		STXThemeManager.themes.enabledTheme=theme;
		if(STXThemeManager.storageCB) STXThemeManager.storageCB(JSON.stringify(STXThemeManager.themes), stx);
	}else{
		STXThemeManager.loadBuiltInTheme(stx, theme);
	}
};

STXThemeManager.enableBuiltInTheme=function(stx, theme){
	stx.clearStyles();
	STXThemeManager.loadBuiltInTheme(stx, theme);
	STXThemeManager.themes.enabledTheme=theme;
	if(STXThemeManager.storageCB) STXThemeManager.storageCB(JSON.stringify(STXThemeManager.themes), stx);
};

/*
 * Pass null theme to remove the current built in theme, that is, go back to the defaults
 */
STXThemeManager.loadBuiltInTheme=function(stx, theme, cb){
	var links=document.getElementsByTagName("link");
	var lastLink=links[links.length-1];
	var linkContainer=lastLink.parentNode;
	if(STXThemeManager.baseThemeEL){
		linkContainer.removeChild(STXThemeManager.baseThemeEL);
		STXThemeManager.baseThemeEL=null;
	}
	if(!theme){
		if(cb) cb();
		return;
	}
	var lnk=document.createElement("link");
	lnk.rel="stylesheet";
	lnk.type="text/css";
	lnk.media="screen";
	lnk.href= "chart/"+ STXThemeManager.builtInThemes[theme];
	linkContainer.insertBefore(lnk, lastLink.nextSibling);
	STXThemeManager.baseThemeEL=lnk;
	lnk.onload=function(){
		stx.styles={};
		stx.chart.container.style.backgroundColor="";
		stx.clearPixelCache();	// force new yAxis to be drawn
		stx.draw();
		if(STXThemeManager.addBaseThemeClassToBody){
			unappendClassName($$$("body"), STXThemeManager.baseTheme);
			appendClassName($$$("body"), theme);
		}
		STXThemeManager.baseTheme=theme;
		if(cb) cb();
	};
};
/*
 * el - The menu element where themes will be added
 * stx - a chart
 * cb - A callback method for storing the themes
 */
STXThemeManager.themesToMenu=function(el, el2, stx, cb){
	STXThemeManager.el=el;
	STXThemeManager.el2=el2;
	STXThemeManager.stx=stx;
	STXThemeManager.storageCB=cb;

	function useBuiltInTheme(theme){
		return function(){
			STXThemeManager.enableBuiltInTheme(stx, theme);
		};
	}
	function useTheme(theme){
		return function(){
			STXThemeManager.enableTheme(stx, theme);
		};
	}

	function deleteTheme(theme){
		return function(){
			delete STXThemeManager.themes.customThemes[theme];
			STXThemeManager.themesToMenu(el, el2, stx, cb);
			if(cb) cb(JSON.stringify(STXThemeManager.themes), stx);
		};
	}
	var els=el.querySelectorAll("li");
	for(var i=0;i<els.length;i++){
		if(els[i].style.display=="block")
			el.removeChild(els[i]);
	}

	var template=el.querySelectorAll(".themeSelectorTemplate")[0];
	for(var theme in STXThemeManager.themes.customThemes){
		var li=template.cloneNode(true);
		li.style.display="block";
		var stxItem=$$$(".stxItem",li);
		stxItem.innerHTML=theme;
		stxItem[STXTouchAction]=useTheme(theme);
		el.appendChild(li);
		$$$(".stxClose", li)[STXTouchAction]=deleteTheme(theme);
	}
	clearNode(el2);
	for(var theme in STXThemeManager.builtInThemes){
		var li=STX.newChild(el2, "li");
		li.innerHTML=STXI18N.translate(theme);
		li[STXTouchAction]=useBuiltInTheme(theme);
	}
};

STX.iscroll=function(){};
STX.iscroll.scrollers=[];
STX.iscroll.newScroller=function(node, params){
	var iscroll = new iScroll(node, params);
	STX.iscroll.scrollers.push(iscroll);
	return iscroll;
};
STX.iscroll.refresh=function(){
	for(var i=0;i<STX.iscroll.scrollers;i++){
		var iscroll=STX.iscroll.scrollers[i];
		iscroll.refresh();
	}
};

/*
STXLookupWidget

This is a widget that can be used to display symbol search results

config={
	input: // reference to an input field to attach to
	textCallback: // function to call when a symbol is entered of format func(this, txt, filter)
	selectCallback: // function to call when the user selects a symbol or hits enter func(this, txt, filter)
	filters: // an array of security classes to filter on. Valid values are: ALL, STOCKS, FOREX, INDEXES. Null to not provide a filter.
}
*/

STXLookupWidget=function(config){
	this.config=config;
	this.div=null;
	this.currentFilter=null;
	this.filterButtons=[];
	this.height=480;
};

/*
 * Call this function with the results from your search. results should be an array of the following object:
 * {
 * symbol: symbol,
 * description: full name of security,
 * exchange: optional exchange
 * }
 */
STXLookupWidget.prototype.displayResults=function(results){
	function select(that, symbol){
		return function(e){
			that.config.input.value=symbol;
			that.config.selectCallback(that, symbol, that.currentFilter);
			that.close();
			that.config.input.blur();
		};
	}
	if(results.length>0){
		this.display();
	}else{
		return;
	}
	clearNode(this.ul);
	for(var i=0;i<results.length;i++){
		var result=results[i];
		var li=STX.newChild(this.ul, "LI");
		var symbolSpan=STX.newChild(li, "span");
		symbolSpan.innerHTML=result.symbol;
		var descriptionSpan=STX.newChild(li, "span");
		descriptionSpan.innerHTML=result.description;
		var exchangeSpan=STX.newChild(li, "span");
		if(result.exchange) exchangeSpan.innerHTML=STXI18N.translate(result.exchange);
		STXScrollManager.attach(li, select(this, result.symbol));
	}
	if(!this.iscroll){
		this.iscroll = STX.iscroll.newScroller($$$(".stxLookupSymbols").parentNode, {vScrollbar: true, hScroll:false, hideScrollbar: false});
	}else{
		this.iscroll.refresh();
	}
};

STXLookupWidget.prototype.init=function(){
	function closure(that){
		return function(e){
			var div=getEventDOM(e);
			var key = (window.event) ? event.keyCode : e.keyCode;
			switch(key){
				case 13:
					var symbol=div.value;
					that.close();
					that.config.selectCallback(that, symbol, that.currentFilter);
					div.blur();
					break;
				case 27:
					that.close();
					div.blur();
					break;
				default:
					//TODO, clear symbol icon
					that.config.textCallback(that, div.value, that.currentFilter, false);	// false means user typed in input box
					break;
			}
			e = e||event;
			e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
		};
	}
	function closure2(that){
		return function(e){
			var div=getEventDOM(e);
			that.config.textCallback(that, div.value, that.currentFilter, true);	// true means user clicked in input box
		};
	}
	this.config.input.onkeyup=closure(this);
	this.config.input.onclick=closure2(this);
};

STXLookupWidget.prototype.display=function(){
	function pressFilter(that, div, filter){
		return function(){
			for(var i=0;i<that.filterButtons.length;i++){
				unappendClassName(that.filterButtons[i],"on");
			}
			appendClassName(div, "on");
			that.currentFilter=filter;
			that.config.textCallback(that, that.config.input.value, that.currentFilter);
		};
	}
	if(this.div==null){
		this.div=STX.newChild(this.config.input.parentNode, "DIV", "menuOutline stxLookupResults");
		var ul=STX.newChild(this.div, "UL", "stxResults");
		if(this.config.filters){
			var li=STX.newChild(ul, "LI", "stxLookupFilter");
			for(var i=0;i<this.config.filters.length;i++){
				var filter=this.config.filters[i];
				var div=STX.newChild(li, "div", "btn");
				div.innerHTML=STXI18N.translate(filter);
				div[STXTouchAction]=pressFilter(this, div, filter);
				this.filterButtons.push(div);
			}
			var divider=STX.newChild(ul, "LI", "divider");
		}
		var li=STX.newChild(ul, "LI");
		this.ul=STX.newChild(li, "UL", "menuSelect stxLookupSymbols");
		li.style.maxHeight=this.height + "px";
	}else{
		this.div.style.display="inline-block";
	}

	function closeCallback(that){
		return function(){
			that.close();
		};
	}
	STXMenuManager.menuOn("lookup", closeCallback(this));

};

STXLookupWidget.prototype.close=function(){
	if(this.div) this.div.style.display="none";
	STXMenuManager.menuOff();
};


/*
 * STXScrollManager
 *
 * This is a widget for detecting whether a user has scrolled between the time that they press the mouse and let go. Otherwise
 * the act of scrolling a dialog would cause a selection. To use, register start as your mousedown or touchstart event. Then
 * call isClick(e) during your mouseup or touchend event to determine whether the user truly clicked or not.
 */
STXScrollManager=function(){};
STXScrollManager.x=0;
STXScrollManager.y=0;
STXScrollManager.downTime=0;

/*
 * Use this method to attach a click event to a node that is within an iscroll
 */
STXScrollManager.attach=function(node, fc){
	if(navigator.pointerEnabled){
		node.addEventListener("pointerdown", STXScrollManager.start);
	}else if(navigator.msMaxTouchPointers>1){
		node.addEventListener("MSPointerDown", STXScrollManager.start);
	}else{
		node.addEventListener("mousedown", STXScrollManager.start);
		node.addEventListener("touchstart", STXScrollManager.start);
	}
	node.addEventListener("click", function(fc){
		return function(e){
			if(STXScrollManager.isClick(e)){
				fc(e);
			}
		};
	}(fc));
};

STXScrollManager.start=function(e){
	STXScrollManager.x=e.pageX;
	STXScrollManager.y=e.pageY;
	STXScrollManager.downTime=new Date().getTime();
};

STXScrollManager.isClick=function(e){
	var now=new Date().getTime();
	if(now-STXScrollManager.downTime>2000) return false;	// Over two seconds from mouse down to mouse up is not a click
	if(Math.abs(e.pageX-STXScrollManager.x)>10) return false;	// Moved mouse or finger too much
	if(Math.abs(e.pageY-STXScrollManager.y)>10) return false;
	return true;
};

/*
 * Use this method to attach a right click event to a node. Second argument is the callback function.
 */
STXScrollManager.attachRightClick=function(node, fc){
	function closure(fc){
		return function(e){
			if((e.which && e.which>=2) || (e.button && e.button>=2)){
				fc(e);
			}
		};
	}
	if(navigator.pointerEnabled){
		node.addEventListener("pointerup", closure(fc));
	}else if(navigator.msMaxTouchPointers>1){
		node.addEventListener("MSPointerUp", closure(fc));
	}else{
		node.addEventListener("mouseup", closure(fc));
	}
	node.rightClickable=true;
};

STXScrollManager.onContextMenu=function(e){
	if(e.target.rightClickable){ // If node is right clickable then kill context menu, which will allow the mouseup event to trigger
		e.preventDefault();
		return false;
	}
	// otherwise the standard context menu will appear
}

document.addEventListener("contextmenu", STXScrollManager.onContextMenu, false);

/*
 * STXTimeZoneWidget
 *
 * Lets users pick a local timezone for display on the xaxis of charts
 */
STXTimeZoneWidget=function(){};


//Creates a menu structure which can be used to provide a user with timezone selection
//First level tier is the region. Each region has an array of cities. If the array is empty
//then no cities are available for that region. The timezone should be reconstructed as
//region/city. For instance, "America/New_York". Or for regions without cities simply "Iran".
//The reconstructed value can then be passed into stxx.setTimeZone();

STXTimeZoneWidget.init=function(){
	if(typeof timezoneJS!="undefined"){
		STXTimeZoneWidget.timezoneMenu={};

		for(var i in timezoneJS.timezone.zones){
			//if(typeof timezoneJS.timezone.zones[i]=="string") continue;	// translations
			var s=i.split("/");
			var region=s[0];
			if(!STXTimeZoneWidget.timezoneMenu[region]) STXTimeZoneWidget.timezoneMenu[region]=[];

			if(s.length>1){
				var city=s[1];
				if(s.length>2) city+="/" + s[2];
				STXTimeZoneWidget.timezoneMenu[region].push(city);
			}
		}
	}
};

STXTimeZoneWidget.setTimeZone=function(zone){
	STXChart.defaultDisplayTimeZone=zone;
	for(var i=0;i<STXChart.registeredContainers.length;i++){
		var stx=STXChart.registeredContainers[i].stx;
		stx.setTimeZone(stx.dataZone, zone);
		stx.draw();
	}
};

STXTimeZoneWidget.removeTimeZone=function(){
	STXChart.defaultDisplayTimeZone=null;
	for(var i=0;i<STXChart.registeredContainers.length;i++){
		var stx=STXChart.registeredContainers[i].stx;
		stx.displayZone=null;
		stx.setTimeZone();
		if(STXTimeZoneWidget.storageCB){
			STXTimeZoneWidget.storageCB(null);
		}
		stx.draw();
	}
};

STXTimeZoneWidget.timeZoneMap={
		"(GMT-12:00) International Date Line West":"Asia/Anadyr",
		"(GMT-11:00) Midway Island, Samoa":"Pacific/Midway",
		"(GMT-10:00) Hawaii":"Pacific/Honolulu",
		"(GMT-09:00) Alaska":"America/Juneau",
		"(GMT-08:00) Pacific Time (US and Canada); Tijuana":"America/Los_Angeles",
		"(GMT-07:00) Mountain Time (US and Canada)":"America/Denver",
		"(GMT-07:00) Chihuahua, La Paz, Mazatlan":"America/Chihuahua",
		"(GMT-07:00) Arizona":"America/Phoenix",
		"(GMT-06:00) Central Time (US and Canada)":"America/Chicago",
		"(GMT-06:00) Saskatchewan":"Canada/Saskatchewan",
		"(GMT-06:00) Guadalajara, Mexico City, Monterrey":"America/Mexico_City",
		"(GMT-06:00) Central America":"America/Panama",
		"(GMT-05:00) Eastern Time (US and Canada)":"EST",
		"(GMT-05:00) Indiana (East)":"America/Indiana/Knox",
		"(GMT-05:00) Bogota, Lima, Quito":"America/Bogota",
		"(GMT-04:00) Atlantic Time (Canada)":"Canada/Atlantic",
		"(GMT-04:00) Caracas, La Paz":"America/Caracas",
		"(GMT-04:00) Santiago":"America/Santiago",
		"(GMT-03:30) Newfoundland and Labrador":"Canada/Newfoundland",
		"(GMT-03:00) Brasilia":"Brazil/East",
		"(GMT-03:00) Buenos Aires, Georgetown":"America/Argentina/Buenos_Aires",
		"(GMT-03:00) Greenland":"America/Argentina/Buenos_Aires",
		"(GMT-02:00) Mid-Atlantic":"Atlantic/South_Georgia",
		"(GMT-01:00) Azores":"Atlantic/Azores",
		"(GMT-01:00) Cape Verde Islands":"Atlantic/Cape_Verde",
		"(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London":"Europe/London",
		"(GMT) Casablanca, Monrovia":"Africa/Casablanca",
		"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague":"Europe/Belgrade",
		"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb":"Europe/Sarajevo",
		"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris":"Europe/Brussels",
		"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna":"Europe/Amsterdam",
		"(GMT+01:00) West Central Africa":"Africa/Windhoek",
		"(GMT+02:00) Bucharest":"Europe/Bucharest",
		"(GMT+02:00) Cairo":"Africa/Cairo",
		"(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius":"Europe/Helsinki",
		"(GMT+02:00) Athens, Istanbul, Minsk":"Europe/Athens",
		"(GMT+02:00) Jerusalem":"Asia/Jerusalem",
		"(GMT+02:00) Harare, Pretoria":"Africa/Harare",
		"(GMT+03:00) Moscow, St. Petersburg, Volgograd":"Europe/Moscow",
		"(GMT+03:00) Kuwait, Riyadh":"Asia/Kuwait",
		"(GMT+03:00) Nairobi":"Africa/Nairobi",
		"(GMT+03:00) Baghdad":"Asia/Baghdad",
		"(GMT+03:30) Tehran":"Asia/Tehran",
		"(GMT+04:00) Abu Dhabi, Muscat":"Asia/Muscat",
		"(GMT+04:00) Baku, Tbilisi, Yerevan":"Asia/Baku",
		"(GMT+04:30) Kabul":"Asia/Kabul",
		"(GMT+05:00) Ekaterinburg":"Asia/Yekaterinburg",
		"(GMT+05:00) Islamabad, Karachi, Tashkent":"Asia/Karachi",
		"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi":"Asia/Kolkata",
		"(GMT+05:45) Kathmandu":"Asia/Katmandu",
		"(GMT+06:00) Astana, Dhaka":"Asia/Dhaka",
		"(GMT+06:00) Sri Jayawardenepura":"Asia/Colombo",
		"(GMT+06:00) Almaty, Novosibirsk":"Asia/Novosibirsk",
		"(GMT+06:30) Yangon Rangoon":"Asia/Rangoon",
		"(GMT+07:00) Bangkok, Hanoi, Jakarta":"Asia/Bangkok",
		"(GMT+07:00) Krasnoyarsk":"Asia/Krasnoyarsk",
		"(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi":"Asia/Hong_Kong",
		"(GMT+08:00) Kuala Lumpur, Singapore":"Asia/Kuala_Lumpur",
		"(GMT+08:00) Taipei":"Asia/Taipei",
		"(GMT+08:00) Perth":"Australia/Perth",
		"(GMT+08:00) Irkutsk, Ulaanbaatar":"Asia/Irkutsk",
		"(GMT+09:00) Seoul":"Asia/Seoul",
		"(GMT+09:00) Osaka, Sapporo, Tokyo":"Asia/Tokyo",
		"(GMT+09:00) Yakutsk":"Asia/Yakutsk",
		"(GMT+09:30) Darwin":"Australia/Darwin",
		"(GMT+09:30) Adelaide":"Australia/Adelaide",
		"(GMT+10:00) Canberra, Melbourne, Sydney":"Australia/Canberra",
		"(GMT+10:00) Brisbane":"Australia/Brisbane",
		"(GMT+10:00) Hobart":"Australia/Hobart",
		"(GMT+10:00) Vladivostok":"Asia/Vladivostok",
		"(GMT+10:00) Guam, Port Moresby":"Pacific/Guam",
		"(GMT+11:00) Magadan, Solomon Islands, New Caledonia":"Etc/GMT+11",
		"(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands":"Pacific/Fiji",
		"(GMT+12:00) Auckland, Wellington":"Pacific/Auckland",
		"(GMT+13:00) Nuku'alofa":"Pacific/Tongatapu"
};
/*
 * Populates the dialog. This can be a long list. If "shortList==true" then a shorter list
 * composed of just GMT offsets will be displayed.
 */
STXTimeZoneWidget.populateDialog=function(id){
	if(!STXTimeZoneWidget.timezoneMenu) STXTimeZoneWidget.init();

	function setTimezone(zone){
		return function(e){
			STXDialogManager.dismissDialog();
			var translatedZone=STXTimeZoneWidget.timeZoneMap[zone];
			STXTimeZoneWidget.setTimeZone(translatedZone);
			if(STXTimeZoneWidget.storageCB){
				STXTimeZoneWidget.storageCB(translatedZone);
			}
		};
	}
	if(typeof timezoneJS=="undefined") return;
	var el=$$(id);
	if(!el) return;
	var ul=el.querySelector("ul");
	var template=ul.querySelector("li#timezoneTemplate").cloneNode(true);
	clearNode(ul);
	ul.appendChild(template);
	var arr=[];
	for(var zone in STXTimeZoneWidget.timeZoneMap){
		arr.push(zone);
	}
	for(var i=0;i<arr.length;i++){
		var zone=arr[i];
		var display=zone;
		var li=template.cloneNode(true);
		li.style.display="block";
		li.innerHTML=display;
		STXScrollManager.attach(li, setTimezone(zone));
		ul.appendChild(li);
	}
	if(!STXTimeZoneWidget.iscroll){
		STXTimeZoneWidget.iscroll = new iScroll("timezoneDialogWrapper", {vScrollbar: false, hScroll:false, hideScrollbar: false, vScroll:true});
	}else{
		STXTimeZoneWidget.iscroll.refresh();
	}
};

/*
 * Initialize the time zone manager with a prior saved timezone (initialTimeZone) and a callback
 * mechanism for saving the timezone.
 */
STXTimeZoneWidget.initialize=function(initialTimeZone, cb){
	if(initialTimeZone){
		STXTimeZoneWidget.setTimeZone(initialTimeZone);
	}
	STXTimeZoneWidget.storageCB=cb;
};


/*
 * STXStorageManager
 *
 * A widget for saving and getting name value pairs. Uses browser localStorage by default but you can override
 * the get and store functions to save to a different data store.
 */
STXStorageManager=function(){};


STXStorageManager.get=function(key){
	if(!localStorage) return null;
	var datum=localStorage.getItem(key);
	return datum;
};

STXStorageManager.store=function(key, value){
	localStorage.setItem(key, value);
};

STXStorageManager.remove=function(key){
	localStorage.removeItem(key);
};

STXStorageManager.callbacker=function(key){
	return function(value, stx){
		if(value==null){
			STXStorageManager.remove(key);
		}else{
			STXStorageManager.store(key, value);
		}
	};
};

STXDrawingToolbar=function(){};

STXDrawingToolbar.initialize=function(){
	function setLineColor(){
		return function(color){
			if(color=="000000" || color=="ffffff") STXChart.currentColor="auto";
			else STXChart.currentColor="#" + color;
		};
	}
	function setFillColor(){
		return function(color){
			STXChart.currentVectorParameters.fillColor="#" + color;
		};
	}
	var toolbar=$$$(".tubiao-data");
	//var lineColorPicker=$$$(".stxLineColorPicker", toolbar);
	//var fillColorPicker=$$$(".stxFillColorPicker", toolbar);
	var lineColorPicker=$$$(".stxLineColorPicker");
	var fillColorPicker=$$$(".stxFillColorPicker");
	STXChart.currentColor=lineColorPicker.style.backgroundColor;
	STXChart.currentVectorParameters.fillColor=fillColorPicker.style.backgroundColor;

	STXMenuManager.attachColorPicker(lineColorPicker, toolbar, setLineColor());
	STXMenuManager.attachColorPicker(fillColorPicker, toolbar, setFillColor());
};

STXDrawingToolbar.setLineColor=function(stx){
	var toolbar=$$$(".tubiao-data");
	var lineColorPicker=$$$(".stxLineColorPicker", toolbar);
	var lineColorPicker=$$$(".stxLineColorPicker");
	if(STXChart.currentColor=="transparent"){
		lineColorPicker.style.backgroundColor=stx.defaultColor;
	}else{
		lineColorPicker.style.backgroundColor=STXChart.currentColor;
	}
};

STXDrawingToolbar.configurator={
		".stxToolbarFill":{"line":false, "ray":false, "segment":false, "annotation": false, "horizontal":false, "fibonacci":false},
		".stxToolbarLine":{},
		".stxToolbarLinePicker":{"fibonacci": false, "annotation": false},
		".stxToolbarNone":{"line":false, "ray":false, "segment":false, "annotation": false, "horizontal":false, "fibonacci":false},
		".stxToolbarDotted":{},
		".stxToolbarDashed":{}
};

STXDrawingToolbar.setLine=function(width, pattern){
	var className="stx-line stxLineDisplay weight" + width;
	STXChart.currentVectorParameters.lineWidth=width+.1;	// Use 1.1 instead of 1 to get good anti-aliasing on Android Chrome
	if(pattern=="solid"){
		STXChart.currentVectorParameters.pattern="solid";
		className+=" style1";
	}else if(pattern=="dotted"){
		STXChart.currentVectorParameters.pattern="dotted";
		className+=" style2";
	}else if(pattern=="dashed"){
		STXChart.currentVectorParameters.pattern="dashed";
		className+=" style3";
	}else if(pattern=="none"){
		STXChart.currentVectorParameters.pattern="none";
	}
	var display=$$$(".stxLineDisplay");
	if(display) display.className=className;
};

STXDrawingToolbar.setVectorType=function(stx,vectorType){
	if(vectorType==null || vectorType==""){
		stx.changeVectorType("");
		for(var i in STXDrawingToolbar.configurator){
			var all=document.querySelectorAll(i);
			for(var j=0;j<all.length;j++){
				all[j].style.display="none";
			}
		}
		//$$("toolSelection").innerHTML=STXI18N.translate("Select Tool");
		return;
	}
	for(var i in STXDrawingToolbar.configurator){
		var all=document.querySelectorAll(i);
		for(var j=0;j<all.length;j++){
			if(STXDrawingToolbar.configurator[i][vectorType]==false){
				all[j].style.display="none";
			}else{
				all[j].style.display="";
			}
		}
	}
	stx.changeVectorType(vectorType);
	//var prettyDisplay=STXI18N.translate(vectorType.capitalize());
	//$$("toolSelection").innerHTML=prettyDisplay;
	STXDrawingToolbar.setLineColor(stx);
};

STXDrawingToolbar.crosshairs=function(stx, state){
	STXDrawingToolbar.setVectorType(stx, null);
	stx.layout.crosshair=state;
	/*if(state){
		$$("toolSelection").innerHTML=STXI18N.translate("Crosshairs");
	}else{
		$$("toolSelection").innerHTML=STXI18N.translate("Select Tool");
	}*/
	stx.draw();
	stx.changeOccurred("layout");
	stx.doDisplayCrosshairs();
};

STXChart.drawingLine=false; // Toggles to true when a drawing is initiated
STXChart.resizingPanel=null; // Toggles to true when a panel is being resized
STXChart.vectorType="";		// The type of drawing currently enabled "segment", "line", "ray", etc. See sample.html menu
STXChart.crosshairX=0;	// Current X screen coordinate of the crosshair
STXChart.crosshairY=0;
STXChart.insideChart=false;	// Toggles to true whenever the mouse cursor is within the chart. Only works with a single chart with mouse events managed at the document level.
STXChart.currentColor="auto";	// Currently selected color for drawing tools. This may be changed by developing a menu with a color picker.
STXChart.drawingTools={};
STXChart.version="02-2014-07";
STXChart.useAnimation=false;	// Set to true to force use of HTML5 canvas animation API
STXChart.ipadMaxTicks=1500;		// performance limitation as of IOS7
STXChart.enableCaching=false;
STXChart.currentVectorParameters={
		pattern:"solid",
		lineWidth:1,
		fillColor:"#7DA6F5",
		fibonacci:{
				trend:{color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				fibs:[
				      {level:-.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:-.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:0, color:"auto", parameters:{pattern:"solid", lineWidth:1}},
				      {level:.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:.5, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:1, color:"auto", parameters:{pattern:"solid", lineWidth:1}},
				      {level:1.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
				      {level:2.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}}
				      ],
				extendLeft: false,
				printLevels: true
			}
};

STXChart.defaultDisplayTimeZone=null;	// If set, then new STXChart objects will pull their display timezone from this

if(typeof $$=="undefined"){
	$$=function(node){
		return{};
	};
}

STXChart.Chart=function(){};
STXChart.YAxis=function(){};
STXChart.Panel=function(name){
	this.yAxis=new STXChart.YAxis();
	this.name=name;
};

/*
 * Basic Chart object. stxx.charts is an object that can contain multiple charts. For backward compatibility, there
 * is always one chart called stxx.chart which points to the first chart in the charts object. This chart contains
 * some variables that are applicable to all of the charts on the screen (i.e. canvas, canvasWidth, canvasHeight, etc)
 *
 * Each chart contains a unique set of data. In theory each chart supports a separate scroll position but this is not implemented
 */

STXChart.YAxis.prototype={
	high: null,				// High value on y axis
	low: null,				// Low value on y axis
	shadow: null,			// high - low
	logHigh: null,			// High log value on y axis
	logLow: null,			// Low log value on y axis
	logShadow: null,		// logHigh - logLow
	multipler: null,		// Computed automatically. Divide pixel by this to get the price (then add to low). Or multiply price by this to get the pixel (then add to top)
	bottomOffset: 0,		// set this to set the y-axis bottom, this number of pixels above the panel's bottom
	topOffset: 0,			// set this to set the y-axis top, this number of pixels below the panel's top
	bottom: null,			// calculated automatically (panel.top+yAxis.topOffset)
	top: null,				// calculated automatically (panel.bottom-yAxis.bottomOffset)
	height: null,			// bottom - top
	decimalPlaces: null,		// 0-4 or leave null and the chart will automatically detect
	idealTickSizePixels: null,	// ideal size between y-axis values in pixels. Leave null to automatically calculate
	displayGridLines: true,		// set to false to not plot grid lines
	priceFormatter: null		// callback function to override default formatting fc(stx, panel, price)
};

STXChart.Panel.prototype={
		name: null,						// Name of panel
		display: null,					// Display text of panel
		chart: null,					// The chart from which this panel derives it's data
		yAxis: null,
		top: null,						// Y location of top of chart
		bottom: null,					// Y location of bottom of chart
		height: null,					// height of chart in pixels
		percent: null					// percent of overall window this panel takes up
};

STXChart.Chart.prototype={
		name: null,		// This will be set as the name of the chart
		panel: null,	// The STXChart.Panel associated with the display of the chart itself
		symbol: null,	// Set this to the current symbol
		symbolDisplay: null,	// Set this for an alternate display on the chart label than symbol
	    series: {}, // Series that are drawn on chart, or for comparison. A series may have a different y-axis calculation than the price chart.
		scroll: 0,			// Currently number of ticks scrolled. Zero would theoretically be scrolled completely to the left.
		standStill: 0,		// Used internally
		maxTicks: 0,	// Horizontal number of chart ticks that currently fit in the canvas, based on candlewidth and spacing
		verticalScroll: 0, // Amount of vertical scroll
		masterData: null,	// The master data for this chart. This data is never modified by the chart engine itself
		dataSet: null,		// Contains the current complete data set, adjusted for periodicity and with calculated studies
		scrubbed: null,		// Contains the data set, scrubbed for null entries (gap dates) (if this.dataSetContainsGaps)
		dataSegment: null,	// Contains the segment of the data set that is displayed on the screen
		xaxis:[],			// Contains data entries for the full xaxis. It is a superset of dataSegment
		zoom: 0,			// Vertical zoom
		volumeMax: 0,			// Contains the maximum volume displayed if (volume study selected)
		decimalPlaces: 2,		// Maximum number of decimal places in data set. Computed automatically.
		roundit: 100,			// Computed automatically to round y-axis display
		intervalType: null,   //minute daily week month
		interval: null,      // the long of the interval
		beginHour:0,
		beginMinute:0,
		endHour:23,
		endMinute:59,
		minutesInSession:1440,	// Auto calculated
		calendarAxis: false		// If true then axis will be calendar time, ignoring weekends, holidays and closing hours
	};

function STXChart(container){
	this.panels={};	// READ ONLY. An array of currently enabled panels
	this.overlays={};	// READ ONLY. An array of currently enabled overlay studies
    this.charts={};		// The charts on the screen. Will contain at least one item, "chart"

    this.controls={};	// contains the HTML controls for the chart (zoom, home, etc)
	this.goneVertical=false;	// Used internally for pinching algorithm
	this.pinchingScreen=false;	// "
	this.grabbingScreen=false;	// Toggles to true when the screen is being panned
	this.grabStartX=0;			// Used internally for panning
	this.grabStartY=0;			// "
	this.grabStartScrollX=0;	// "
	this.grabStartScrollY=0;	// "
	this.grabStartCandleWidth=0;	// Used internally for zooming
	this.grabStartZoom=0;			// "
	this.grabOverrideClick=false;	// "
	this.vectorsShowing=false;		// Used internally to ensure that vectors aren't drawn more than once
	this.mouseMode=true;			// For Windows8 devices this is set to true or false depending on whether the last touch was a mouse click or touch event. To support all-in-one computers

	this.anyHighlighted=false;		// Toggles to true if any drawing or overlay is highlighted for deletion
	this.accessoryTimer=null;		// Used internally to speed drawing performance
	this.lastAccessoryUpdate=new Date().getTime();	// "
	this.displayCrosshairs=true;	// Use doDisplayCrosshairs() or undisplayCrosshairs()
	this.hrPanel=null;				// Current panel that mouse is hovering over
	this.annotationTA=null;			// Contains the textArea for a currently edited annotation
	this.editingAnnotation=false;	// True if an annotation is open for editing
	this.openDialog="";				// Set this to non-blank to disable chart touch and mouse events

	this.displayIconsUpDown=true;	// Set these to false to not display these components
	this.displayIconsSolo=true;
	this.displayIconsClose=true;
	this.displayPanelResize=true;
	this.manageTouchAndMouse=true;	// If true then the STXChart object will manage it's own touch and mouse events, by attaching them to the container div
	this.touches=[];
	this.changedTouched=[];
	this.crosshairTick=null;
	this.crosshairValue=null;
	this.yaxisWidth=40;

	this.pt={
		x1:-1,
		x2:-1,
		y1:-1,
		y2:-1
	};
	this.moveA=-1;	// Used internally for touch
	this.moveB=-1;	// "
	this.touchStartTime=-1;	// "
	this.cancelSwipe=false; // "
	this.momentumDistance=0; // "
	this.momentumTime=0; // "
	this.gestureStartDistance=-1; // "
	this.grabStartPeriodicity=1; // "
	this.grabEndPeriodicity=-1; // "
	this.scrollEvent=null; // "
	this.cmd=false; // "
	this.ctrl=false; // "
	this.shift=false; // "
	this.crosshairXOffset=-40;	// Offset for touch devices so that finger isn't blocking crosshair
	this.crosshairYOffset=-40;
	this.displayInitialized=false; // This gets set to true when the display has been initialized

	this.clicks={
		s1MS: -1,
		e1MS: -1,
		s2MS: -1,
		e2MS: -1
	};

	this.cancelTouchSingleClick=false; // Set this to true whenever a screen item is touched so as to avoid a chart touch event
	this.layout={	// Contains the current screen layout
		interval: "day",
		periodicity: 1,
		candleWidth: 8,	// In pixels
		volumeUnderlay: false,
		adj: true,	// Whether adjusted or nominal prices are being displayed
		chartType: "candle",
		studies: {},
		panels: {}
	};
	this.preferences={
		magnet: false,
		labels: true,	// display labels on y-axis for all studies
		whitespace: 100	// Initial whitespace on right of the screen in pixels
	};
	this.translationCallback=STXI18N.translate;	// fc(english) should return a translated phrase given the English phrase. See separate translation file for list of phrases.
	this.locale=null;			// set this to the locale string to use when localizing charts. locale string should reference a loaded ECMA-402 Intl locale. Leaving null will use the default browser locale. Or call stx.setLocale(locale) to change the locale dynamically.
	this.dataZone=null;			// set by setTimeZone()
	this.displayZone=null;		// set by setTimeZone()
	this.timeZoneOffset=0;		// use setTimeZone() to compute this value
	this.changeCallback=null;	// fc(stxChart, change) where "change" is either "layout" or "vectors". Use this for storing chart configurations or drawings.
	this.masterData=null;		// Contains the historical quotes for the current chart
	this.transformDataSetPre=null;			// Use this to transform the data set previous to a createDataSet() event, such as change in periodicity
	this.transformDataSetPost=null;
	this.dataCallback=null;					// Used by setPeriodicityV2 which will call this if an interval is requested that it does not have
	this.dontRoll=false;					// Set this to true if server data comes as week or monthly and doesn't require rolling computation from daily
	this.drawingObjects=[];					// Drawing objects on the chart
	this.undoStamps=[];
	this.dataSetContainsGaps=false;
	this.chart=new STXChart.Chart();
	this.chart.name="chart";
	this.chart.top=0;									// Screen location of top of canvas
	this.chart.width=null;								// Width of the chart, up to but not including the Y axis
	this.chart.left=0;									// Screen location of left of canvas
	this.chart.right=-1;								// Screen location of right of canvas
	this.chart.canvas=null;								// Contains the HTML5 canvas with the chart and drawings
	this.chart.tempCanvas=null;							// lays on top of the canvas and is used when creating drawings
	this.chart.canvasHeight=null;						// Full height of the canvas
	this.chart.canvasWidth=null;						// Full width of the canvas
	this.chart.container=container;
	this.chart.allowScrollPast=true;					// If true then allow users to scroll back in time so that chart can be right aligned
	this.chart.hideDrawings=false;						// Set to true to hide drawings
	this.charts["chart"]=this.chart;
	this.styles={};					// Contains CSS styles used internally to render canvas elements
	if(container){
		this.registerHTMLElements();
	}
}

if(typeof exports!="undefined") exports.STXChart=STXChart;

STXChart.DrawingDescriptor={
		"name": "",
		"render": null, /// function(vector, color, context, highlight (boolean), temporary (boolean), stx)
		"intersected": null,	/// function(vector, x, y) returns whether coordinates intersect the object
		"click": null,	/// function(vector, clickNumber) called when mouse click or tap. Return true to end drawing. False to accept more clicks.
		"abort": null	/// called when user has aborted drawing action (esc key for instance)
};

STXChart.prototype.prepend=function(o,n){
	var prepends=STXChart.prototype["prepend"+o];
	if(!prepends){
		STXChart.prototype["prepend"+o]=[n];
	}else{
		prepends=[n].concat(prepends);
	}
};
STXChart.prototype.append=function(o,n){
	var appends=STXChart.prototype["append"+o];
	if(!appends){
		STXChart.prototype["append"+o]=[n];
	}else{
		appends.push(n);
	}
};
STXChart.prototype.remove=function(o){
	delete STXChart.prototype["append"+o];
	delete STXChart.prototype["prepend"+o];
};

STXChart.registeredContainers=[];	// This will contain an array of all of the STX container objects
// Note that if you are dynamically destroying containers in the DOM you should delete them from this array when you do so

STXChart.handleContextMenu=function(e){ // This code prevents the browser context menu from popping up if you right click on a drawing or overlay
	if(!e) e=event;
	for(var i=0;i<STXChart.registeredContainers.length;i++){
		var stx=STXChart.registeredContainers[i].stx;
		if(stx){
			if(stx.anyHighlighted){
				if(e.preventDefault) e.preventDefault();
				return false;
			}
		}
	}
};

if(typeof document!="undefined") document.addEventListener("contextmenu", STXChart.handleContextMenu);