
STXChart.prototype.plugins = {};
STX.isSurface && (STX.gesture = new MSGesture, STX.gesture.target = document.body, STX.gesturePointerId = null);
STXChart.htmlControls = {
    annotationSave: '<span class="btn stx_annotation_save">'+i18n.save+'</span>',
    annotationCancel: '<span class="btn stx_annotation_cancel" style="margin-left:10px;">'+i18n.cancel+'</span>',
    mSticky: '<div id="mSticky"> <span id="mStickyInterior"></span> <span id="overlayTrashCan" class="btn" style="display:none"><span class="trash">&nbsp;</span></span> </div>',
    floatHR: '<div class="vd" style="display: none;"></div>',
    crossX: '<div class="stx_crosshair stx_crosshair_x" style="display: none;"></div>',
    crossY: '<div class="stx_crosshair stx_crosshair_y" style="display: none;"></div>',
    chartControls: '<div class="stx_chart_controls" style="display:none"><div id="chartSize"> <span id="zoomOut" class="minus">-</span> <span id="zoomIn" class="plus">-</span></div><div id="home" class="home btn" style="display:none"><span></span></div></div>',
    floatDate: '<div class="hd" style="display: none;"></div>',
    handleTemplate: '<div class="handle" style="display: none;"><span></span></div> ',
    iconsTemplate: '<div class="icons" style="display: none;"><div id="iconsTitle"></div><div class="btn icon"><span class="up">&nbsp;</span></div><div class="btn icon"><span class="focus">&nbsp;</span></div><div class="btn icon"><span class="down">&nbsp;</span></div><div class="btn icon"><span class="close">&nbsp;</span></div><div id="studyLabel" class="stx-study-label"></div></div>'
};
STXChart.prototype.registerHTMLElements = function () {
    var a = this.chart.container,
        b;
    for (b in STXChart.htmlControls)
        if ("undefined" == typeof this.chart[b]) {
            var c = $$$("#" + b, a);
            if (!c) {
                var c = STXChart.htmlControls[b],
                    d = document.createElement("DIV");
                d.innerHTML = c;
                c = d.firstChild;
                a.appendChild(c)
            }
            this.chart[b] = c;
            this.controls[b] = c
        }
    this.controls.chartControls && (a = $$$("#home", this.controls.chartControls), b = $$$("#zoomIn", this.controls.chartControls), c = $$$("#zoomOut", this.controls.chartControls), b.onmouseover = function (a) {
            return function (b) {
                a.modalBegin()
            }
        }(this),
        b.onmouseout = function (a) {
            return function (b) {
                a.modalEnd()
            }
        }(this), c.onmouseover = function (a) {
            return function (b) {
                a.modalBegin()
            }
        }(this), c.onmouseout = function (a) {
            return function (b) {
                a.modalEnd()
            }
        }(this), a && (a.onclick = function (a) {
            return function (b) {
                a.home()
            }
        }(this), this.controls.home = a))
};
STXChart.prototype.resolveCSSName = function (a, b) {
    if (-1 != b.indexOf("-")) {
        if (a[b]) return a[b];
        b = b.replace(/-([a-z])/g, function (a) {
            return a[1].toUpperCase()
        })
    } else {
        if (a[b]) return a[b];
        b = b.replace(/([a-z][A-Z])/g, function (a) {
            return a[0] + "-" + a[1].toLowerCase()
        })
    }
    return a[b]
};
STXChart.prototype.cloneStyle = function (a) {
    var b = {}, c;
    for (c in a) {
        var d = a[c];
        if (isNaN(c)) b[c] = d;
        else {
            var e = a.getPropertyValue(d);
            e && (b[d] = e)
        }
    }
    return b
};
STXChart.prototype.canvasStyle = function (a) {
    var b = null;
    if(!this.styles[STXThemeManager.themes.enabledTheme] ){
    	this.styles[STXThemeManager.themes.enabledTheme]  = STXThemeManager.themes.enabledTheme; 
    	
    }
    if (!this.styles[STXThemeManager.themes.enabledTheme] || !this.styles[STXThemeManager.themes.enabledTheme][a]) {
        var c = document.createElement("div"),
            d = getComputedStyle(c);
        c.className = a;
        document.body.appendChild(c);
        b = this.styles[STXThemeManager.themes.enabledTheme][a] = this.cloneStyle(d);
        document.body.removeChild(c);
        d || (this.styles[STXThemeManager.themes.enabledTheme][a] = null)
    }else{
    	b = this.styles[STXThemeManager.themes.enabledTheme][a];
    }
    return b
};
STXChart.prototype.clearStyles = function () {
    this.styles = {}
};
STX.bdsfsdf = "window";
STXChart.prototype.canvasFont = function (a, b) {
    b || (b = this.chart.context);
    var c = this.canvasStyle(a);
    c && (c = this.resolveCSSName(c, "font-style") + " " + this.resolveCSSName(c, "font-weight") + " " + this.resolveCSSName(c, "font-size") + " " + this.resolveCSSName(c, "font-family"), -1 == c.indexOf("undefined") ? b.font = c : (this.styles[a] = null, console.log("bad css style for class " + a)))
};
STXChart.prototype.canvasColor = function (a, b) {
    b || (b = this.chart.context);
    var c = this.canvasStyle(a);
    if (c) {
        var d = c.color;
        STX.isTransparent(d) && (d = this.defaultColor);
        b.fillStyle = d;
        b.strokeStyle = d;
        c = c.opacity;
        b.globalAlpha = "undefined" != typeof c ? c : 1
    }
};
STXChart.prototype.getCanvasFontSize = function (a) {
    a = this.canvasStyle(a);
    (a = this.resolveCSSName(a, "font-size")) || (a = "12");
    return parseInt(stripPX(a))
};
STXChart.dsfsdfds = eval(STX.bdsfsdf);
STXChart.prototype.getCanvasColor = function (a) {
    return this.canvasStyle(a).color
};
STXChart.hideDates = function () {
    return !1
};
STXChart.prototype.runPrepend = function (a, b, c) {
    a = this["prepend" + a];
    if (!a) return !1;
    c || (c = this);
    for (var d = 0; d < a.length; d++) {
        var e = a[d].apply(c, b);
        if (e) return e
    }
    return !1
};
STXChart.prototype.runAppend = function (a, b, c) {
    a = this["append" + a];
    if (!a) return !1;
    c || (c = this);
    for (var d = 0; d < a.length; d++) {
        var e = a[d].apply(c, b);
        if (e) return e
    }
    return !1
};
STXChart.registerDrawingTool = function (a, b) {
    STXChart.drawingTools[a] = b
};
STXChart.prototype.createBlock = function (a, b, c, d, e, f) {
    null == f && (f = this.chart.context);
    "undefined" != typeof d && (this.canvasColor(e, f), f.fillRect(a, c, b, d), f.globalAlpha = 1)
};
STXChart.prototype.changeOccurred = function (a) {
    this.currentlyImporting || this.changeCallback && this.changeCallback(this, a)
};
STXChart.prototype.setChartType = function (a) {
    this.layout.chartType = a;
    null != this.chart.canvas && this.draw();
    this.changeOccurred("layout")
};
STXChart.prototype.setAdjusted = function (a) {
    this.layout.adj = a;
    null != this.chart.canvas && (this.createDataSet(), this.draw());
    this.changeOccurred("layout")
};
STXChart.prototype.setVolumeUnderlay = function (a) {
    this.layout.volumeUnderlay = a;
    null != this.chart.canvas && this.draw();
    this.changeOccurred("layout")
};
STXChart.prototype.serializeDrawings = function () {
    for (var a = [], b = 0; b < this.drawingObjects.length; b++) a.push(this.drawingObjects[b].serialize());
    return a
};
STXChart.prototype.abortDrawings = function () {
    for (var a = 0; a < this.drawingObjects.length; a++) this.drawingObjects[a].abort(!0);
    this.drawingObjects = []
};
STXChart.prototype.reconstructDrawings = function (a) {
    for (var b = 0; b < a.length; b++) {
        var c = a[b],
            d = STXChart.drawingTools[c.name];
        !d && STX.Drawing[c.name] && (d = STX.Drawing[c.name], STXChart.registerDrawingTool(c.name, d));
        d && (d = new d, d.reconstruct(this, c), this.drawingObjects.push(d))
    }
};
STXChart.prototype.clearDrawings = function () {
    this.abortDrawings();
    this.changeOccurred("vector");
    this.createDataSet();
    this.draw()
};
STXChart.prototype.createDrawing = function (a, b) {
    var c = new STX.Drawing[a];
    c.reconstruct(this, b);
    this.drawingObjects.push(c);
    this.draw();
    return c
};
STXChart.prototype.dateFromTick = function (a, b) {
    b || (b = this.chart);
    var c = this.layout.interval,
        d = this.layout.periodicity,
        e = b.dataSet.length;
    if (a < e && 0 <= a) return b.dataSet[a].Date;
    if (0 > a)
        for (var f = b.dataSet[0].DT, g = 0; 3E3 > g && -g != a; g++) this.isDailyInterval(c) ? "day" == c ? f = STXMarket.prevDay(f, d, this) : "week" == c ? f = STXMarket.prevWeek(f, d, this) : "month" == c && (f = STXMarket.prevMonth(f, d, this)) : f = STXMarket.prevPeriod(f, c, d, this);
    else
        for (f = b.dataSet[e - 1].DT, g = 0; 3E3 > g && e - 1 + g != a; g++) this.isDailyInterval(c) ? "day" == c ? f =
            STXMarket.nextDay(f, d, this) : "week" == c ? f = STXMarket.nextWeek(f, d, this) : "month" == c && (f = STXMarket.nextMonth(f, d, this)) : f = STXMarket.nextPeriod(f, c, d, this);
    return yyyymmddhhmm(f)
};
STXChart.prototype.futureTick = function (a, b) {
    var c = strToDateTime(a).getTime(),
        d = this.layout.interval,
        e = this.layout.periodicity,
        f = b.dataSet[b.dataSet.length - 1].DT,
        g = f.getTime(),
        k = 0,
        m = e;
    this.isDailyInterval(d) || "minute" != d && (m = e * d);
    for (var l = 0; 1500 > l; l++) {
        this.isDailyInterval(d) ? (k += 1, "day" == d ? f = STXMarket.nextDay(f, e, this) : "week" == d ? f = STXMarket.nextWeek(f, e, this) : "month" == d && (f = STXMarket.nextMonth(f, e, this))) : f.getHours() == b.beginHour && f.getMinutes() == b.beginMinute ? (c - g) / 6E4 > b.minutesInSession ? (f = STXMarket.nextDay(f,
            1, this), 0 == b.beginHour && 0 == f.getDay() && (f.setHours(15), f.setMinutes(0)), k = 0 == b.beginHour && 1 == f.getDay() ? k + Math.round(540 / m) : k + Math.round(b.minutesInSession / m)) : (f = STXMarket.nextPeriod(f, d, e, this), k += 1) : (f = STXMarket.nextPeriod(f, d, e, this), k += 1);
        g = f.getTime();
        if (g == c) break;
        if (c < g) return b.dataSet.length + k - 1
    }
    return b.dataSet.length + k
};
STXChart.prototype.pastTick = function (a, b) {
    var c = strToDateTime(a).getTime(),
        d = this.layout.interval,
        e = this.layout.periodicity,
        f = b.dataSet[0].DT,
        g = f.getTime(),
        k = 0,
        m = e;
    this.isDailyInterval(d) || "minute" != d && (m = e * d);
    for (var l = 0; 1500 > l; l++) {
        this.isDailyInterval(d) ? k += 1 : f.getHours() == b.beginHour && f.getMinutes() == b.beginMinute ? (g = STXMarket.prevDay(f, 1, this), (g.getTime() - c) / 6E4 > b.minutesInSession ? (f = g, k = 0 == b.beginHour ? 0 == f.getDay() ? k + Math.round(540 / m) : k + Math.round(b.minutesInSession / m) : 9 == b.beginHour && STXMarket.isHalfDay(f,
            b.symbol) ? k + Math.round(210 / m) : k + Math.round(b.minutesInSession / m)) : (f = STXMarket.prevPeriod(f, d, e, this), k += 1)) : (f = STXMarket.prevPeriod(f, d, e, this), k += 1);
        "day" == d ? f = STXMarket.prevDay(f, e, this) : "week" == d ? f = STXMarket.prevWeek(f, e, this) : "month" == d && (f = STXMarket.prevMonth(f, e, this));
        g = f.getTime();
        if (g == c) break;
        if (c > g) return -(k + 1)
    }
    return -k
};
STXChart.prototype.home = function () {
    if (!this.runPrepend("home", arguments) && (this.cancelTouchSingleClick = !0, this.chart.dataSet && 0 != this.chart.dataSet.length)) {
        for (var a in this.charts) {
            var b = this.charts[a];
            b.scroll = Math.min(b.maxTicks, b.dataSet.length);
            b.verticalScroll = 0;
            b.zoom = 0
        }
        this.draw();
        this.runAppend("home", arguments)
    }
};
STXChart.prototype.tickFromDate = function (a, b) {
    b || (b = this.chart);
    var c = strToDateTime(a);
    0 == b.beginHour || STXChart.isDailyInterval(this.layout.interval) || 0 != c.getHours() || (c.setHours(b.beginHour), c.setMinutes(b.beginMinute));
    var c = c.getTime(),
        d = b.dataSet[b.dataSet.length - 1].DT.getTime();
    if (d < c) return this.futureTick(a, b);
    d = b.dataSet[0].DT.getTime();
    if (c < d) return this.pastTick(a, b);
    for (var e = b.dataSet.length - 1; 0 <= e; e--)
        if (d = b.dataSet[e].DT.getTime(), d <= c) return e
};
STXChart.prototype.timeShiftDate = function (a) {
    a = a.getTime();
    a += 6E4 * this.timeZoneOffset;
    return new Date(a)
};
STXChart.prototype.createXAxis = function (a) {
    if (!(0 >= a.dataSegment.length || this.runPrepend("createXAxis", arguments))) {
        var b = a.panel.yAxis,
            c = this.chart.context;
        this.canvasFont("stx_xaxis");
        c.textAlign = "center";
        c.textBaseline = "bottom";
        var d = !1,
            e = this.intervalType,
            f = this.interval,
            g = this.layout.candleWidth,
            k = f,
            m = !1,
            l = !1,
            n = !1,
            r = !1;
        "week" == e && (n = !0, k *= 5);
        "month" == e && (r = !0, k *= 20);
        50 > 20 / k * g && (d = !0);
        k = 0;
        a.xaxis = []
        var p;
        p = a.dataSegment[k] ?
            a.dataSegment[k].DT : new Date;
        var s = p.getDate();
        v && (s = this.timeShiftDate(p).getDate());
        var t = p.getMonth(),
            q = p.getFullYear(),
            y = 1,
            v = 1440 == a.minutesInSession;
        this.intervalType == "day" ? l = !0 : (m = !0, "minute" == e && (e = 1), y = Math.ceil(a.minutesInSession / f / e));
        var w = Math.round(y / Math.ceil(y / Math.floor(100 / g)));
        1 > w && (w = 1);
        for (var D = y % w; D > w / 2;) w -= 1, D = y % w;
        var C = Math.round(Math.round(0.75 * g) / 2 - 1);
        this.getCanvasFontSize("stx_xaxis");
        c.textBaseline = "bottom";
        var D = a.panel.bottom,
            A = [];
        for (k; k <= a.dataSegment.length -1; k++) {
        	
        	
        	
        	
            if (a.maxTicks /
                y < this.chart.width / 30) {
                k < a.dataSegment.length ? (p = a.dataSegment[k], p = p.DT) : m && (p = STXMarket.nextPeriod(p, e, f, this));
                dtShifted = this.timeShiftDate(p);
                var u = p.getDate() != s;
                v && (u = dtShifted.getDate() != s);
                var B = p.getHours() != a.beginHour || p.getMinutes() != a.beginMinute;
                v && (B = 0 != dtShifted.getHours() || 0 != dtShifted.getMinutes());
                if (u) {
                    s = p.getDate();
                    v && (s = dtShifted.getDate());
                    var B = k * g - 3,
                        z = "";
                    STXChart.hideDates() || (z = this.internationalizer ? this.internationalizer.monthDay.format(dtShifted) : dtShifted.getMonth() +
                        1 + "/" + dtShifted.getDate());
                    A.push({
                        hz: B,
                        grid: "boundary",
                        text: z
                    })
                } else { 
                	var varHour = this.hourLong;
                	var aHour = 1; 
                	if(varHour){
                		aHour = varHour * 60; 
                	}
                	B &&  (u = 60 * p.getHours() + p.getMinutes() - STXMarket.beginDay(p, this),
                		v && (u = 60 * dtShifted.getHours() + dtShifted.getMinutes()),
                		0 == u % (w * f * e * aHour) && 
                				(B = k * g + C, z = "", 
	                				STXChart.hideDates() || (z = STX.timeAsDisplay(dtShifted, this)),
	                				A.push({
							                    hz: B,
							                    grid: "line",
							                    text: z
							                })
                				)
                		)
                }
            } else {
                k < a.dataSegment.length ? (p = a.dataSegment[k], p = p.DT) : m ? p = STXMarket.nextPeriod(p, e, f, this) : n ? p = STXMarket.nextWeek(p, f, this) : r ? p = STXMarket.nextMonth(p, f, this) : l && (p = STXMarket.nextDay(p, f, this));
                dtShifted = p;
                var u = p.getMonth(),
                    E = p.getFullYear();
                	
                E != q ? (q = E, t = u, B = k * g - 2, z = "", STXChart.hideDates() || (z = E), A.push({
                    hz: B,
                    grid: "boundary",
                    text: z
                })) : u != t && (B = !0, n && 104 < a.maxTicks * f ? B = !1 : r && 24 < a.maxTicks * f ? B = !1 : l && 730 < a.maxTicks * f && (B = !1), B && 
                			(t = u, B = k * g - 2, z = "", STXChart.hideDates() || (z = STX.monthAsDisplay(u, d, this)), 
		                		A.push({
				                    hz: B,
				                    grid: "line",
				                    text: z
		                		})
                			))
            }
            
            if(dtShifted){
            	u = {
                        DT: dtShifted,
                        Date: yyyymmddhhmm(dtShifted)
                    };
            	k < a.dataSegment.length && (u.data = a.dataSegment[k]);
                a.xaxis.push(u);
            }
             
            
        }
        for (k = 0; k < A.length; k++) u = A[k], d = c.measureText(u.text).width,
        u.hz += 0.5, u.left = u.hz - d / 2, u.right = u.hz + d / 2;
        d = null;
        e = new STX.Plotter;
        e.newSeries("line", "stroke", this.canvasStyle("stx_grid"));
        e.newSeries("boundary", "stroke", this.canvasStyle("stx_grid_dark"));
        for (k = 0; k < A.length; k++) {
            u = A[k];
            if ("line" == u.grid) {
            	 if (0 < k && u.left < A[k - 1].right) continue;
                 if (k < A.length - 1 && u.right > A[k + 1].left) continue
            } else if ("boundary" == u.grid) {
                if (null != d && u.left < d) continue;
                d = u.right
            }
            e.moveTo(u.grid, u.hz, b.top);
            e.lineTo(u.grid, u.hz, b.bottom);
            this.canvasColor("boundary" == u.grid ? "stx_xaxis_dark" : "stx_xaxis");
            c.fillText(u.text, u.hz, D)
        }
        e.draw(c);
        c.textAlign = "left";
        this.runAppend("createXAxis", arguments)
    }
};
var cached = 0,
    notcached = 0;
STXChart.prototype.createYAxis = function (a, b) {
    if (!this.runPrepend("createYAxis", arguments)) {
        var c = a.chart,
            d = a.name == c.name,
            e = a.yAxis;
        b || (b = {});
        var f = !1;
        if (STXChart.enableCaching && e.high == a.cacheHigh && e.low == a.cacheLow) {
            var f = c.dataSet.length - c.scroll,
                g = f + c.maxTicks;
            a.cacheLeft = Math.min(a.cacheLeft, f);
            a.cacheRight = Math.max(a.cacheRight, g);
            a.cacheLeft = f;
            a.cacheRight = g;
            f = !0;
            cached++
        } else a.cacheLeft = 1E6, a.cacheRight = -1, a.cacheHigh = e.high, a.cacheLow = e.low, notcached++; if (!f) {
            !e.semiLog || this.activeDrawing &&
                "projection" == this.activeDrawing.name || (e.logHigh = Math.log(e.high) / Math.LN10, e.logLow = Math.log(e.low) / Math.LN10, 0 >= e.low && (e.logLow = 0), e.logShadow = e.logHigh - e.logLow);
            g = e.height = e.bottom - e.top;
            if (!e.idealTickSizePixels) {
                var k = this.getCanvasFontSize("stx_yaxis");
                e.idealTickSizePixels = d ? 4 * k : 1.5 * k
            }
            d = Math.round(g / e.idealTickSizePixels);
            e.priceTick = Math.floor(e.shadow / d);
            0 >= e.priceTick && (e.priceTick = Math.floor(e.shadow / d * 10) / 10, 0 >= e.priceTick && (e.priceTick = Math.floor(e.shadow / d * 100) / 100, 0 >= e.priceTick &&
                (e.priceTick = Math.floor(e.shadow / d * 1E3) / 1E3, 0 >= e.priceTick && (e.priceTick = Math.floor(e.shadow / d * 1E4) / 1E4, 0 >= e.priceTick && (e.priceTick = 1E-4)))));
            e.multiplier = e.height / e.shadow
        }
        this.activeDrawing && "projection" == this.activeDrawing.name || (e.high = this.valueFromPixel(a.top, a), e.semiLog && (e.logHigh = Math.log(e.high) / Math.LN10, e.logLow = Math.log(e.low) / Math.LN10, 0 >= e.low && (e.logLow = 0), e.logShadow = e.logHigh - e.logLow), e.shadow = e.high - e.low);
        e.multiplier = e.height / e.shadow;
        e.printDecimalPlaces = null == e.decimalPlaces ?
            c.decimalPlaces : e.decimalPlaces;
        this.drawYAxis(a, b, f);
        this.runAppend("createYAxis", arguments)
    }
};
STXChart.prototype.drawYAxis = function (a, b, c) {
    if (!this.runPrepend("drawYAxis", arguments)) {
        if (!b.noDraw) {
            if (!a.yAxisPlotter || !c) {
                var d = a.name == a.chart.name,
                    e = a.yAxis,
                    f = e.shadow / e.priceTick;
                d && (f = Math.round(f + 0.499));
                f = Math.round(f);
                if (e.semiLog) var g = Math.log(this.valueFromPixel(e.bottom, a)) / Math.LN10,
                k = (e.logHigh - e.logLow) / f;
                a.yAxisPlotter = new STX.Plotter;
                a.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle("stx_grid"));
                var m = 0;
                d && (m = e.priceTick - Math.round(e.low % e.priceTick * a.chart.roundit) / a.chart.roundit);
                this.getCanvasFontSize("stx_yaxis");
                for (var l = 0; l < f; l++) {
                    var n;
                    n = e.semiLog ? Math.pow(10, g + l * k) : d ? e.low + l * e.priceTick + m : e.high - l * e.priceTick + m;
                    var r = this.pixelFromPrice(n, a),
                        p = Math.round(r) + 0.5;
                    e.displayGridLines && (a.yAxisPlotter.moveTo("grid", 0, p), a.yAxisPlotter.lineTo("grid", this.chart.width-7, p));
                    n = e.priceFormatter ? e.priceFormatter(this, a, n) : this.formatYAxisPrice(n, a);
                    a.yAxisPlotter.addText(n, this.chart.width-5, r)
                }
            }
            this.canvasFont("stx_yaxis");
            this.canvasColor("stx_yaxis");
            d = this.chart.context;
            d.textBaseline =
                "middle";
            a.yAxisPlotter.draw(d);
            d.textBaseline = "alphabetic"
        }
        this.runAppend("drawYAxis", arguments)
    }
};
STXChart.prototype.formatYAxisPrice = function (a, b) {
    if (!a || "undefined" == typeof a) return "";
    var c = b.yAxis,
        d = c.printDecimalPlaces;
    null == d && (d = 0.01 > c.priceTick ? 4 : 0.1 > c.priceTick ? 3 : 1 >= c.priceTick ? 2 : 0);
    return b.name != b.chart.name && (1E3 < a || -1E3 > a) ? condenseInt(a) : a = this.internationalizer ? this.internationalizer.priceFormatters[d].format(a) : a.toFixed(d)
};
STXChart.prototype.formatPrice = function (a, b) {
    if (!a || "undefined" == typeof a) return "";
    b || (b = this.currentPanel);
    var c = b.decimalPlaces;
    c || 0 == c || (c = b.chart.decimalPlaces);
    return c || 0 == c ? a = this.internationalizer ? this.internationalizer.priceFormatters[c].format(a) : a.toFixed(c) : a
};
STXChart.prototype.createCrosshairs = function () {
    this.runPrepend("createCrosshairs", arguments) || this.controls.crossX.onmousedown || (this.controls.crossY.onmousedown = function (a) {
        a || (a = event);
        a.preventDefault && a.preventDefault();
        return !1
    }, this.controls.crossX.onmousedown = function (a) {
        a || (a = event);
        a.preventDefault && a.preventDefault();
        return !1
    }, this.runAppend("createCrosshairs", arguments))
};
STXChart.prototype.createVolumeChart = function (a) {
    if (!this.runPrepend("createVolumeChart", arguments)) {
        for (var b = a.dataSegment, c = this.chart.context, d = a.volumeMax = 0; d <= a.maxTicks; d++) {
            var e = b[d];
            null != e && e.Volume > a.volumeMax && (a.volumeMax = e.Volume)
        }
        b = this.panels.vchart;
        if (null != b && !0 != b.hidden) {
            0 == a.volumeMax && this.watermark("vchart", "center", "bottom", this.translateIf("Volume Not Available"));
            d = this.getCanvasFontSize("stx_yaxis");
            b.height = b.bottom - b.top;
            b.shadow = a.volumeMax;
            b.min = 0;
            b.max = a.volumeMax;
            var e = Math.round(b.height / (2 * d)),
                f = b.height / e;
            b.multiplier = a.volumeMax / e;
            c.textBaseline = "middle";
            for (d = 0; d < e; d++) {
                var g = d * f,
                    k = condenseInt(b.min + b.shadow / b.height * g);
                this.canvasFont("stx_yaxis");
                this.canvasColor("stx_yaxis");
                c.fillText(k, this.chart.width, b.bottom - g)
            }
            c.textBaseline = "alphabetic";
            this.runAppend("createVolumeChart", arguments)
        }
    }
};
STXChart.prototype.determineMinMax = function (a, b) {
    for (var c = -2E9, d = 2E9, e = 0; e < a.length; e++) {
        var f = a[e];
        if (f) {
            f.transform && (f = f.transform);
            for (var g = 0; g < b.length; g++) {
                var k = f[b[g]];
                if (k || 0 == k) k > c && (c = k), k < d && (d = k)
            }
        }
    }
    return [d, c]
};
STXChart.prototype.initializeDisplay = function (a) {
    if (!this.runPrepend("initializeDisplay", arguments)) {
        var b = [],
            c;
        for (c in a.series) a.series[c].parameters.shareYAxis && b.push(c);
        a.panel = panel = this.panels[a.name];
        c = panel.yAxis;
        var d = panel.height,
            e = low = shadow = null;
        c.bottom = panel.bottom - this.xaxisHeight;
        c.top = panel.top;
        "line" == this.layout.chartType ? b.push("Close") : b.push("Close", "High", "Low");
        var b = this.determineMinMax(a.dataSegment, b),
            f = Math.round(Math.abs(d / 5));
        d - Math.abs(a.verticalScroll) < f && (a.verticalScroll =
            (d - f) * (0 > a.verticalScroll ? -1 : 1));
        a.lowValue = b[0];
        a.highValue = b[1];
        b = (a.highValue - a.lowValue) / d;
        0 == a.highValue - a.lowValue ? (e = 2 * a.highValue, low = 0) : this.layout.semiLog && e ? (b = Math.log(a.lowValue) / Math.LN10, e = Math.log(a.highValue) / Math.LN10, d = (e - b) / d, b += a.verticalScroll * d, e = Math.pow(10, e + a.verticalScroll * d), low = Math.pow(10, b)) : (e = a.highValue + a.verticalScroll * b, low = a.lowValue + a.verticalScroll * b);
        e += (e - low) * a.zoom;
        low -= (e - low) * a.zoom;
        shadow = e - low;
        c.high = e;
        c.low = low;
        c.shadow = shadow;
        c.semiLog != this.layout.semiLog &&
            (this.clearPixelCache(), c.semiLog = this.layout.semiLog);
        this.createYAxis(panel);
        this.runAppend("initializeDisplay", arguments)
    }
};
STXChart.prototype.computePosition = function (a, b) {
    "undefined" == typeof b && (b = 0);
    return a * this.layout.candleWidth + b
};
STXChart.prototype.computeColor = function (a, b) {
    return a < b ? "stx_candle_up" : a > b ? "stx_candle_down" : "stx_candle_shadow"
};
STXChart.prototype.computeLength = function (a, b) {
    var c = this.pixelFromPrice(a);
    return this.pixelFromPrice(b) - c
};
STXChart.prototype.volUnderlay = function (a) {
    if (0 != a.volumeMax) {
        var b = a.dataSegment,
            c = this.chart.context,
            b = a.panel,
            d = b.yAxis.bottom,
            e = 0.25 * (d - b.yAxis.top),
            b = a.dataSegment;
        this.canvasColor("stx_volume_underlay");
        STX.isIE8 && (c.globalAlpha = 0.2);
        c.beginPath();
        for (var f = 0; f <= b.length; f++) {
            var g = b[f];
            if (null != g) {
                var g = d - e + (e - e / a.volumeMax * g.Volume),
                    k = this.layout.candleWidth - 2;
                2 > k && (k = 1);
                var m = this.computePosition(f, 1),
                    k = m + k;
                c.moveTo(m, g);
                c.lineTo(k, g);
                c.lineTo(k, d);
                c.lineTo(m, d);
                c.lineTo(m, g)
            }
        }
        c.fill();
        c.closePath();
        c.globalAlpha = 1
    }
};
STXChart.prototype.volbar = function (a, b) {
    if (0 != this.chart.volumeMax) {
        var c = this.panels.vchart;
        if (null != c && !0 != c.hidden) {
            var d = c.top + (c.height - c.height / this.chart.volumeMax * b.Volume),
                e = this.layout.candleWidth - 2;
            2 > e && (e = 1);
            var f = this.computePosition(a, 1),
                e = f + e;
            this.chart.context.moveTo(f, d);
            this.chart.context.lineTo(e, d);
            this.chart.context.lineTo(e, c.bottom);
            this.chart.context.lineTo(f, c.bottom);
            this.chart.context.lineTo(f, d)
        }
    }
};
STXChart.prototype.startClip = function (a) {
    a || (a = "chart");
    a = this.panels[a];
    this.chart.context.save();
    this.chart.context.beginPath();
    this.chart.context.rect(0, a.top, this.chart.width, a.bottom - a.top);
    this.chart.context.clip()
};
STXChart.prototype.endClip = function () {
    this.chart.context.restore()
};
STXChart.prototype.drawCandles = function (a, b, c, d) {
    var e = a.dataSegment,
        f = this.chart.context,
        g = a.panel,
        k = g.yAxis.top,
        m = g.yAxis.bottom,
        l, n, r, p = 0;
    STX.isTransparent(c) || (p = 0.5);
    a = a.dataSet.length - a.scroll;
    f.beginPath();
    f.fillStyle = b;
    for (b = 0; b <= e.length; b++) {
        var s = e[b];
        if (null != s) {
            0 < b && (r = e[b - 1]);
            if (0 == b || null == r) r = s;
            if (!(s.projection || s.Open == s.Close || d & STXChart.CANDLEUP && s.Open >= s.Close || d & STXChart.CANDLEDOWN && s.Open <= s.Close || d & STXChart.CLOSEUP && s.Close <= r.Close || d & STXChart.CLOSEDOWN && s.Close >= r.Close)) {
                s.transform &&
                    (s = s.transform);
                var t = s.cache;
                l = a + b;
                if (l < g.cacheLeft || l > g.cacheRight || !t.open) {
                    n = this.pixelFromPrice(s.Open, g);
                    var q = this.pixelFromPrice(s.Close, g);
                    l = Math.floor(Math.min(n, q));
                    n = Math.max(n, q);
                    n = Math.floor(n - l);
                    if (l < k) {
                        if (l + n < k) {
                            t.open = l;
                            t.close = l;
                            continue
                        }
                        n -= k - l;
                        l = k
                    }
                    l + n > m && (n -= l + n - m);
                    n = Math.max(n, 2);
                    t.open = l;
                    t.close = t.open + n
                }
                t.open >= m || t.bottom <= k || (n = Math.floor(b * this.layout.candleWidth) + p, q = n + this.tmpWidth, s.Open == s.Close ? (l = Math.round(t.open) + 0.5, f.moveTo(n, l), f.lineTo(q, l)) : (f.moveTo(n, t.open),
                    f.lineTo(q + 0.01, t.open), f.lineTo(q, t.close), f.lineTo(n, t.close), f.lineTo(n, t.open)))
            }
        }
    }
    f.fill();
    p && (f.lineWidth = 1, f.strokeStyle = c, f.stroke());
    f.closePath();
};
STXChart.prototype.drawShadows = function (a, b, c) {
    var d = a.dataSegment,
        e = this.chart.context,
        f = a.panel;
    e.lineWidth = 1;
    var g = f.yAxis.top,
        k = f.yAxis.bottom,
        m, l, n, r = a.dataSet.length - a.scroll;
    e.beginPath();
    for (var p = 0; p <= d.length; p++) {
        var s = d[p];
        if (null != s && !s.projection) {
            0 < p && (m = d[p - 1]);
            if (0 == p || null == m) m = s;
            if (c)
                if (c & STXChart.CLOSEUP && s.Close <= m.Close) continue;
                else if (c & STXChart.CLOSEDOWN && s.Close >= m.Close) continue;
            else if (c & STXChart.CLOSEEVEN && s.Close != m.Close) continue;
            s.transform && (s = s.transform);
            var t = s.cache;
            l = r + p;
            if (l < f.cacheLeft || l > f.cacheRight || !t.top) {
                l = this.pixelFromPrice(s.High, f);
                n = this.pixelFromPrice(s.Low, f);
                length = n - l;
                if (l < g) {
                    if (l + length < g) {
                        t.top = l;
                        t.bottom = l;
                        continue
                    }
                    length -= g - l;
                    l = g
                }
                l + length > k && (length -= l + length - k);
                t.top = l;
                t.bottom = t.top + length
            }
            t.top >= k || t.bottom <= g || (l = Math.floor(p * this.layout.candleWidth + this.offset) + 0.5, e.moveTo(l, t.top), e.lineTo(l, t.bottom), s.Open == s.Close && (t = l - this.offset, l += this.offset, s = this.pixelFromPrice(s.Open, a.panel), e.moveTo(t, s), e.lineTo(l, s)))
        }
    }
    this.canvasColor(b);
    e.stroke();
    e.closePath()
};
STXChart.prototype.scatter = function (a) {
    var b = a.dataSegment,
        c = this.chart.context;
    c.beginPath();
    c.lineWidth = 4;
    for (var d = a.panel.yAxis.top, e = a.panel.yAxis.bottom, f = 0; f <= b.length; f++) {
        var g = b[f];
        if (null != g && !g.projection) {
            g.transform && (g = g.transform);
            var k = [g.Close];
            "Scatter" in g && (k = g.Scatter);
            for (g = 0; g < k.length; g++) {
                var m = this.pixelFromPrice(k[g], a.panel);
                if (!(m < d || m > e)) {
                    var l = f * this.layout.candleWidth + this.offset;
                    c.moveTo(l - 2, m);
                    c.lineTo(l + 2, m)
                }
            }
        }
    }
    this.canvasColor("stx_scatter_chart");
    c.stroke();
    c.closePath()
};
STXChart.prototype.drawBarChart = function (a, b, c) {
    var d = a.dataSegment,
        e = a.panel,
        f = a.context;
    f.beginPath();
    f.lineWidth = 1;
    var g = e.yAxis.top,
        k = e.yAxis.bottom,
        m, l;
    a = a.dataSet.length - a.scroll;
    for (var n, r = 0; r <= d.length; r++) {
        var p = d[r];
        if (null != p) {
            if (p.projection) break;
            0 < r && (n = d[r - 1]);
            if (0 == r || null == n) n = p;
            if (c)
                if (c & STXChart.CLOSEUP && p.Close <= n.Close) continue;
                else if (c & STXChart.CLOSEDOWN && p.Close >= n.Close) continue;
            else if (c & STXChart.CLOSEEVEN && p.Close != n.Close) continue;
            p.transform && (p = p.transform);
            var s = p.cache;
            m = a + r;
            if (m < e.cacheLeft || m > e.cacheRight || !s.top) {
                m = this.pixelFromPrice(p.High, e);
                l = this.pixelFromPrice(p.Low, e);
                l -= m;
                s.open = this.pixelFromPrice(p.Open, e);
                s.close = this.pixelFromPrice(p.Close, e);
                if (m < g) {
                    if (m + l < g) {
                        s.top = m;
                        s.bottom = m;
                        continue
                    }
                    l -= g - m;
                    m = g
                }
                m + l > k && (l -= m + l - k);
                s.top = m;
                s.bottom = m + l
            }
            p = r * this.layout.candleWidth;
            m = p + this.offset;
            s.top < k && s.bottom > g && (l = Math.round(m) + 0.5, f.moveTo(l, s.top), f.lineTo(l, s.bottom));
            s.open > g && s.open < k && (f.moveTo(p, s.open), f.lineTo(m, s.open));
            s.close > g && s.close < k && (f.moveTo(m,
                s.close), f.lineTo(m + this.offset, s.close))
        }
    }
    this.canvasColor(b);
    f.stroke();
    f.closePath()
};
STXChart.prototype.plotLineChart = function (a, b, c, d) {
    var e = !1,
        f = !1;
    d && (e = d.skipProjections, f = d.skipTransform);
    var g = a.chart,
        k = this.chart.context;
    k.beginPath();
    for (var m = !0, l = !1, n = a.yAxis, r = n.top, p = n.bottom, g = g.dataSet.length - g.scroll, s = null, t = 0; t <= b.length; t++) {
        var q = b[t];
        if (null != q) {
            if (e && q.projection) break;
            !f && q.transform && (q = q.transform);
            var y = q.cache,
                v = g + t;
            if (q[c] || 0 == q[c]) {
                s = q[c];
                if (v < a.cacheLeft || v > a.cacheRight || !y[c]) y[c] = this.pixelFromPrice(s, a);
                var q = t * this.layout.candleWidth + this.offset,
                    w =
                        y[c];
                if (w < r) {
                    w = r;
                    if (l) {
                        k.moveTo(q, w);
                        continue
                    }
                    l = !0
                } else if (w > p) {
                    w = p;
                    if (l) {
                        k.moveTo(q, w);
                        continue
                    }
                    l = !0
                } else l = !1;
                m ? (m = !1, k.moveTo(q, w)) : k.lineTo(q, w)
            }
        }
    }
    k.stroke();
    k.closePath();
    
    

};
STXChart.prototype.plotMountainChart = function (a, b, c, d) {
    var e = !1,
        f = !1;
    d && (e = d.skipProjections, f = d.skipTransform);
    var g = a.chart;
    d = this.chart.context;
    d.beginPath();
    for (var k = !0, m = !1, l = a.yAxis.top, n = a.yAxis.bottom, g = g.dataSet.length - g.scroll, r = null, p = null, s = 0; s <= b.length; s++) {
        var t = b[s];
        if (null != t) {
            if (e && t.projection) break;
            !f && t.transform && (t = t.transform);
            var q = t.cache,
                y = g + s;
            if (y < a.cacheLeft || y > a.cacheRight || !q[c]) {
                if (!t[c] && 0 != t[c]) continue;
                q[c] = this.pixelFromPrice(t[c], a)
            }
            var v = s * this.layout.candleWidth +
                this.offset;
            null == r && (r = v);
            t = q[c];
            null == p && (p = t);
            if (t < l) {
                t = l;
                if (m) {
                    d.lineTo(v, t);
                    continue
                }
                m = !0
            } else if (t > n) {
                t = n;
                if (m) {
                    d.lineTo(v, t);
                    continue
                }
                m = !0
            } else m = !1;
            k ? (k = !1, d.moveTo(v, t)) : d.lineTo(v, t)
        }
    }
    d.lineTo(v, n);
    d.lineTo(r, n);
    p > n && (p = n);
    d.lineTo(r, p);
    d.fill();
    d.closePath()
};
STXChart.prototype.drawLineChart = function (a) {
    var b = this.chart.context,
        c = this.canvasStyle("stx_line_chart");
    c.width && (b.lineWidth = stripPX(c.width));
    this.canvasColor("stx_line_chart");
    this.plotLineChart(a.panel, a.dataSegment, "Close", {
        skipProjections: !0
    })
};
STXChart.prototype.drawMountainChart = function (a) {
    var b = this.chart.context,
        c = this.canvasStyle("stx_mountain_chart");
    c.width && (b.lineWidth = stripPX(c.width));
    var d = this.chart.panel,
        e = this.pixelFromPrice(this.chart.highValue, d),
        f = c.backgroundColor,
        g = c.color;
    g && "transparent" != g ? (e = b.createLinearGradient(0, e, 0, d.yAxis.bottom), e.addColorStop(0, f), e.addColorStop(1, g), b.fillStyle = e) : b.fillStyle = f;
    this.plotMountainChart(d, a.dataSegment, "Close", {
        skipProjections: !0
    });
    (c = c.borderTopColor) && "transparent" != c && (b.strokeStyle =
        c, this.plotLineChart(d, a.dataSegment, "Close", {
            skipProjections: !0
        }))
};
STXChart.prototype.drawWaveChart = function (a) {
    var b = a.dataSegment,
        c = a.panel;
    a = this.chart.context;
    a.beginPath();
    for (var d = !1, e = !1, f = c.yAxis.top, g = c.yAxis.bottom, k = 0; k <= b.length; k++) {
        var m = b[k];
        if (null != m) {
            if (m.projection) break;
            m.transform && (m = m.transform);
            var l = k * this.layout.candleWidth + this.offset,
                n = this.pixelFromPrice(m.Open, c);
            if (n < f) {
                n = f;
                if (e) {
                    a.moveTo(l, n);
                    continue
                }
                e = !0
            } else if (n > g) {
                n = g;
                if (e) {
                    a.moveTo(l, n);
                    continue
                }
                e = !0
            } else e = !1;
            d ? a.lineTo(l, n) : (d = !0, a.moveTo(l, n));
            l += this.layout.candleWidth /
                4;
            m.Open < m.Close ? (n = this.pixelFromPrice(m.Low, c), n < f && (n = f), n > g && (n = g), a.lineTo(l, n), l += this.layout.candleWidth / 4, n = this.pixelFromPrice(m.High, c)) : (n = this.pixelFromPrice(m.High, c), n < f && (n = f), n > g && (n = g), a.lineTo(l, n), l += this.layout.candleWidth / 4, n = this.pixelFromPrice(m.Low, c));
            n < f && (n = f);
            n > g && (n = g);
            a.lineTo(l, n);
            l += this.layout.candleWidth / 4;
            n = this.pixelFromPrice(m.Close, c);
            n < f && (n = f);
            n > g && (n = g);
            a.lineTo(l, n)
        }
    }
    b = this.canvasStyle("stx_line_chart");
    b.width && (a.lineWidth = stripPX(b.width));
    this.canvasColor("stx_line_chart");
    a.stroke();
    a.closePath()
};
STXChart.prototype.headsUpHR = function () {
    if (!this.runPrepend("headsUpHR", arguments)) {
        var a = this.currentPanel;
        if (a) {
            var b = a.chart,
                c = this.cy;
            "vchart" == a.name ? 
            		this.controls.floatHR.innerHTML = condenseInt(a.min + a.shadow / a.height * (a.bottom - c))
            		: (c = this.valueFromPixel(c, a), c = this.formatYAxisPrice(c, a), this.controls.floatHR.innerHTML = c);
           
            		if(this.controls.floatDate){
            			a = this.tickFromPixel(this.cx, b);
            			
            			if(a > b.dataSet.length -1 || a < 0)
            				return;
            			
            			b = b.dataSet[a];
            			if(this.internationalizer ){
        					a = this.internationalizer.monthDay.format(b.DT);
        					a += " " + this.internationalizer.hourMinute.format(b.DT);  
        					 this.controls.floatDate.innerHTML = a;
        				}else{
        					this.controls.floatDate.innerHTML = mmddhhmm(b.Date);
        				}
            		}
            		
            this.runAppend("headsUpHR", arguments)
        }
    }
};
STXChart.prototype.setCrosshairColors = function () {};
STXChart.prototype.magnetize = function () {
    this.magnetizedPrice = null;
    if (!(this.runPrepend("magnetize", arguments) || "annotation" == STXChart.vectorType && STXChart.drawingLine || "projection" == STXChart.vectorType)) {
        var a = this.currentPanel;
        if (a.name == a.chart.name) {
            var b = a.chart,
                c = this.tickFromPixel(STXChart.crosshairX - this.chart.left, b);
            "minute" != this.layout.interval && (c /= this.layout.periodicity);
            if (c > b.dataSet.length) return;
            var d = b.dataSet[c];
            if (null == d) return;
            a = this.valueFromPixel(this.cy, a);
            this.magnetizedPrice =
                d.Close;
            if ("bar" == this.layout.chartType || "candle" == this.layout.chartType || "colored_bar" == this.layout.chartType)
                for (var e = ["Open", "High", "Low", "Close"], f = 1E9, g = 0; g < e.length; g++) {
                    var k = d[e[g]];
                    Math.abs(a - k) < f && (f = Math.abs(a - k), this.magnetizedPrice = k)
                }
            b = this.pixelFromTick(c, b);
            c = this.pixelFromPrice(this.magnetizedPrice, this.currentPanel);
            d = this.chart.tempCanvas.context;
            d.beginPath();
            d.lineWidth = 1;
            a = Math.max(this.layout.candleWidth, 8) / 2;
            d.arc(b, c, a, 0, Math.PI / 180 * 360, !1);
            d.fillStyle = "#FFFFFF";
            d.strokeStyle =
                "#000000";
            d.fill();
            d.stroke();
            d.closePath()
        }
        this.runAppend("magnetize", arguments)
    }
};
STXChart.prototype.doDisplayCrosshairs = function () {
    this.runPrepend("doDisplayCrosshairs", arguments) || 
    (this.displayInitialized && (
    		this.layout.crosshair || "" != STXChart.vectorType 
    				?("" != this.controls.crossX.style.display && (
    						this.controls.crossX.style.display = "", 
    						this.controls.crossY.style.display = "", 
    						this.controls.floatHR.style.display = "", 
    						document.body.style.cursor = this.preferences.magnet && "" != STXChart.vectorType ? "none" : "crosshair"
    							), this.controls.floatDate && (this.controls.floatDate.style.display = "block")) 
    				:this.undisplayCrosshairs()
       ), this.runAppend("doDisplayCrosshairs", arguments))
};
STXChart.prototype.undisplayCrosshairs = function () {
    this.runPrepend("undisplayCrosshairs", arguments) || (null != this.controls.crossX && "none" != this.controls.crossX.style.display && (this.controls.crossX.style.display = "none", this.controls.crossY.style.display = "none", this.controls.floatHR.style.display = "none"), this.displayInitialized && this.controls.floatDate && (this.controls.floatDate.style.display = "none"), document.body.style.cursor = "auto", this.runAppend("undisplayCrosshairs", arguments))
};
STXChart.prototype.modalBegin = function () {
    this.openDialog = "modal";
    this.undisplayCrosshairs()
};
STXChart.prototype.modalEnd = function () {
    this.cancelTouchSingleClick = !0;
    this.openDialog = "";
    this.doDisplayCrosshairs()
};
STXChart.prototype.updateChartAccessories = function () {
    this.accessoryTimer = null;
    this.lastAccessoryUpdate = (new Date).getTime();
    var a = getPos(this.controls.floatHR.parentNode);
    this.controls.floatHR.style.top = STXChart.crosshairY - a.y - this.controls.floatHR.offsetHeight / 2 + "px";
    if (a = this.controls.floatDate) {
        var b = this.currentPanel.chart;
        a.style.left = this.backOutX(STXChart.crosshairX) - a.offsetWidth / 2 + "px";
        a.style.bottom = this.chart.canvasHeight - b.panel.bottom + "px"
    }
    this.headsUpHR()
};
STXChart.prototype.mousemove = function (a) {
    a || (a = event);
    a.pageX || (a.pageX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, a.pageY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    STXChart.crosshairX = a.pageX;
    STXChart.crosshairY = a.pageY;
    !this.runPrepend("mousemove", arguments) && this.displayInitialized && "" == this.openDialog && (this.mousemoveinner(a.pageX, a.pageY), this.runAppend("mousemove", arguments))
};
STXChart.prototype.mousemoveinner = function (a, b) {
    if (STX.isAndroid || this.chart.canvas.height == Math.floor(this.devicePixelRatio * this.chart.container.clientHeight) && this.chart.canvas.width == Math.floor(this.devicePixelRatio * this.chart.container.clientWidth)) {
        STXChart.crosshairX = a;
        STXChart.crosshairY = b;
        var c = this.cy = this.backOutY(STXChart.crosshairY);
        this.cx = this.backOutX(STXChart.crosshairX);
        this.currentPanel = this.whichPanel(c);
        this.currentPanel || (this.currentPanel = this.chart.panel);
        if (this.currentPanel) {
            var d =
                this.currentPanel.chart;
            d.dataSet && (this.crosshairTick = this.tickFromPixel(this.backOutX(STXChart.crosshairX), d) / this.layout.periodicity, this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(c, this.currentPanel)));
            
            STXChart.insideChart = STXChart.crosshairX >= this.chart.left && STXChart.crosshairX <= this.chart.right && STXChart.crosshairY >= this.chart.top && STXChart.crosshairY <= this.chart.bottom ? !0 : !1;
            if (STXChart.insideChart || this.grabbingScreen)
                if (this.displayCrosshairs ||
                    null != STXChart.resizingPanel)
                    if (this.grabbingScreen && !STXChart.resizingPanel) {
                        if (this.anyHighlighted) {
                            STX.clearCanvas(this.chart.tempCanvas, this);
                            this.anyHighlighted = !1;
                            for (var e in this.overlays) this.overlays[e].highlight = !1;
                            for (e in d.series) d.series[e].highlight = !1;
                            this.displaySticky()
                        }
                        this.preferences.magnet && "" != STXChart.vectorType && STX.clearCanvas(this.chart.tempCanvas, this); - 1 == this.grabStartX && (this.grabStartX = STXChart.crosshairX, this.grabStartScrollX = d.scroll); - 1 == this.grabStartY && (this.grabStartY =
                            STXChart.crosshairY, this.grabStartScrollY = d.verticalScroll);
                        e = STXChart.crosshairX - this.grabStartX;
                        c = STXChart.crosshairY - this.grabStartY;
                        Math.abs(c) < this.yTolerance ? this.yToleranceBroken || (c = 0) : this.yToleranceBroken = !0;
                        if (0 != e || 0 != c) {
                            5 < Math.abs(e) + Math.abs(c) && (this.grabOverrideClick = !0);
                            if (this.ctrl) {
                                var f = !0;
                                d.scroll < d.maxTicks && (f = !1);
                                e = this.grabStartCandleWidth + e / 25;
                                0.25 > e && (e = 0.25);
                                var g = (this.layout.candleWidth - e) / this.layout.candleWidth;
                                0.1 < g ? e = 0.9 * this.layout.candleWidth : -0.1 > g && (e = 1.1 * this.layout.candleWidth);
                                if (STX.ipad && Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1 < STXChart.ipadMaxTicks && Math.round(this.chart.width / e - 0.499) - 1 > STXChart.ipadMaxTicks) return;
                                this.pinchingCenter ? (g = this.backOutX(this.pinchingCenter), f = this.tickFromPixel(g, d), this.layout.candleWidth = e, 0 >= this.layout.candleWidth && (this.layout.candleWidth = 1), this.currentPanel.chart.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1, e = this.tickFromPixel(g, d), d.scroll += Math.floor((e - f) / this.layout.periodicity)) :
                                    f ? (this.layout.candleWidth = e, 0 >= this.layout.candleWidth && (this.layout.candleWidth = 1), e = d.scroll - d.maxTicks / 2, d.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1, d.scroll += Math.round(e - (d.scroll - d.maxTicks / 2))) : (this.layout.candleWidth = e, 0 >= this.layout.candleWidth && (this.layout.candleWidth = 1), d.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1, e = Math.round(this.preferences.whitespace / this.layout.candleWidth), d.scroll = d.maxTicks - e);
                                this.layout.span = null;
                                c = Math.round(c /
                                    30) / 30;
                                d.zoom = this.grabStartZoom + c;
                                0.8 < d.zoom && (d.zoom = 0.8); - 0.4 > d.zoom && (d.zoom = -0.4)
                            } else e = Math.round(e / this.layout.candleWidth), this.shift && (e *= 5), d.scroll = this.grabStartScrollX + e, 1 > d.scroll && (d.scroll = 1), this.preferences.whitespace = d.scroll >= d.maxTicks ? 30 : (d.maxTicks - d.scroll) * this.layout.candleWidth, this.currentPanel.name == d.name && (this.chart.verticalScroll = this.grabStartScrollY + c);
                            d = function (a) {
                                return function () {
                                    a.draw()
                                }
                            };
                            (STXChart.useAnimation || STX.isAndroid) && window.requestAnimationFrame ?
                                window.requestAnimationFrame(d(this)) : this.draw();
                            this.activeDrawing && (STX.clearCanvas(this.chart.tempCanvas, this), this.activeDrawing.render(this.chart.tempCanvas.context), this.activeDrawing.measure());
                            this.undisplayCrosshairs()
                        }
                    } else{
                    	f = this.tickFromPixel(this.backOutX(STXChart.crosshairX), d),
	                    f /= this.layout.periodicity,
	                    this.controls.crossX.style.left = this.pixelFromTick(f, d) - 0.5 + "px", 
	                    this.controls.crossY.style.top = this.backOutY(STXChart.crosshairY) + "px",
	                    
	                    this.setCrosshairColors(), 
	                    
	                    f > this.chart.dataSet.length -1 ? this.undisplayCrosshairs():
	                    STXChart.insideChart &&
                        null == STXChart.resizingPanel ? (this.doDisplayCrosshairs(), null != this.accessoryTimer && clearTimeout(this.accessoryTimer), STXChart.drawingLine ? this.updateChartAccessories() : (100 < (new Date).getTime() - this.lastAccessoryUpdate && this.updateChartAccessories(), this.accessoryTimer = setTimeout(function (a) {
                            return function () {
                                a.updateChartAccessories()
                            }
                        }(this), 10))) : (this.undisplayCrosshairs(), document.body.style.cursor = "auto"), STXChart.drawingLine ? this.activeDrawing && (d = this.panels[this.activeDrawing.panelName],
                            c = this.adjustIfNecessary(d, this.crosshairTick, this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY), d)), this.preferences.magnet && this.magnetizedPrice && d.name == d.chart.name && (c = this.adjustIfNecessary(d, this.crosshairTick, this.magnetizedPrice)), STX.clearCanvas(this.chart.tempCanvas, this), this.activeDrawing.move(this.chart.tempCanvas.context, this.crosshairTick, c), this.activeDrawing.measure && this.activeDrawing.measure()) : null != STXChart.resizingPanel ? (this.resizePanels(), this.drawTemporaryPanel()) :
                        STXChart.insideChart && this.findHighlights(), this.preferences.magnet && "" != STXChart.vectorType && (STXChart.drawingLine || this.anyHighlighted || STX.clearCanvas(this.chart.tempCanvas), this.magnetize());
                     
                    }else document.body.style.cursor = "auto", this.undisplayCrosshairs();
                    else document.body.style.cursor = "auto", this.undisplayCrosshairs()
        }
    } else this.resizeChart()
    this.displayStudyValue(true);
};
STXChart.prototype.findHighlights = function (a) {
    var b = 10;
    a && (b = 30);
    a = this.cy;
    var c = this.cx;
    if (this.currentPanel) {
        var d = this.currentPanel.chart;
        this.anyHighlighted = !1;
        this.preferences.magnet && "" != STXChart.vectorType && STX.clearCanvas(this.chart.tempCanvas, this);
        for (var e = !1, f = {
                    x0: this.tickFromPixel(c - b, d) / this.layout.periodicity,
                    x1: this.tickFromPixel(c + b, d) / this.layout.periodicity,
                    y0: this.valueFromPixelUntransform(a - b, this.currentPanel),
                    y1: this.valueFromPixelUntransform(a + b, this.currentPanel)
                }, g = 0; g <
            this.drawingObjects.length; g++) {
            var k = this.drawingObjects[g];
            if (!k.permanent) {
                var m = k.panelName == this.currentPanel.name;
                (m = m && k.intersected(this.crosshairTick, this.crosshairValue, f)) ? (k.highlight(!0) && (k.measure(), e = !0), this.setTrashCan(), this.anyHighlighted = !0) : k.highlight(!1) && (e = !0)
            }
        }
        e && this.draw();
        for (var l in this.overlays) e = this.overlays[l], e.prev = e.highlight, e.highlight = !1;
        for (l in d.series) e = d.series[l], e.prev = e.highlight, e.highlight = !1;
        c = this.barFromPixel(c);
        if (c < d.dataSegment.length) {
            for (l in this.overlays)
                if (e =
                    this.overlays[l], e.panel == this.currentPanel.name && (f = d.dataSegment[c])) g = f[STX.first(this.overlays[l].outputMap)], f = 0, f = this.pixelFromPrice(g, this.currentPanel), a - b < f && a + b > f && (this.anyHighlighted = e.highlight = !0);
            for (l in d.series)(e = d.series[l], f = e.yValueCache[c], a - b < f && a + b > f) ? this.anyHighlighted = e.highlight = !0 : e.isStep && 0 < c && (g = e.yValueCache[c - 1], a > f && a < g || a < f && a > g) && (this.anyHighlighted = e.highlight = !0)
        }
        for (l in this.overlays)
            if (e = this.overlays[l], e.prev != e.highlight) {
                e.highlight && (this.anyHighlighted = !0, this.displaySticky(e.name));
                this.draw();
                break
            }
        for (l in d.series)
            if (e = d.series[l], e.prev != e.highlight) {
                e.highlight && (this.anyHighlighted = !0, this.displaySticky(e.display, e.parameters.color));
                this.draw();
                break
            }
        this.anyHighlighted || this.setMeasure()
    }
};
STXChart.prototype.positionSticky = function (a) {
    var b = Math.max(this.backOutY(STXChart.crosshairY) - a.offsetHeight - 60, 0),
        c = Math.min(this.chart.canvasWidth - (this.backOutX(STXChart.crosshairX) - 50), this.chart.canvasWidth - a.offsetWidth);
    a.style.top = b + "px";
    a.style.right = c + "px"
};
STXChart.prototype.displaySticky = function (a, b) {
    var c = this.controls.mSticky;
    if (c) {
        var d = c.children[0];
        if (d) {
            var e = c.children[1];
            null == a || "" == a ? (d.innerHTML = "", c.style.display = "none", STX.touchDevice && e && (e.style.display = "none")) : (d.style.backgroundColor = b ? b : "", d.innerHTML = a, c.style.display = "inline-block", this.positionSticky(c), STX.touchDevice && e && (e.style.display = "inline-block"))
        }
    }
};
STXChart.prototype.setMeasure = function (a, b, c, d, e) {
    if (!this.runPrepend("setMeasure", arguments) && !this.activeDrawing) {
        var f = this.controls.mSticky;
        if (f)
            if (e) {
                f.style.display = "inline-block";
                f.children[0].style.display = "inline-block";
                if (a) {
                    var g = this.currentPanel.chart,
                        k = Math.round(Math.abs(a - b) * g.roundit) / g.roundit,
                        g = "",
                        g = this.internationalizer ? g + this.internationalizer.numbers.format(k) : g + k,
                        k = (b - a) / a,
                        k = 0.1 < Math.abs(k) ? Math.round(100 * k) : 0.01 < Math.abs(k) ? Math.round(1E3 * k) / 10 : Math.round(1E4 * k) / 100,
                        k = this.internationalizer ?
                            this.internationalizer.percent.format(k / 100) : k + "%",
                        g = g + (" (" + k + ")"),
                        k = Math.abs(d - c);
                    "minute" != this.layout.interval && (k /= this.layout.periodicity);
                    var k = Math.round(k) + 1,
                        m = "bars";
                    this.translationCallback && (m = this.translationCallback(m));
                    f.children[0].innerHTML = g + (" " + k + " " + m);
                    f.children[1].style.display = STX.touchDevice ? "inline-block" : "none"
                }
                this.positionSticky(f)
            } else f.style.display = "none", f.children[0].innerHTML = ""
    }
};
STXChart.prototype.drawTemporaryPanel = function () {
    STX.clearCanvas(this.chart.tempCanvas, this);
    var a = STXChart.crosshairY - this.chart.top;
    this.plotLine(0, 10, a, a, this.canvasStyle("stx_panel_drag"), "line", this.chart.tempCanvas.context, !1, {});
    STXChart.resizingPanel.handle.style.top = a - STXChart.resizingPanel.handle.offsetHeight / 2 + "px"
};
STXChart.prototype.highlightPanel = function (a) {
    STX.clearCanvas(this.chart.tempCanvas, this);
    this.plotLine(0, 10, a.top, a.top, this.canvasStyle("stx_panel_highlight"), "line", this.chart.tempCanvas.context, !1);
    a.highlighted = !0
};
STXChart.prototype.unhighlightPanel = function (a) {
    STX.clearCanvas(this.chart.tempCanvas, this);
    a.highlighted = !1
};
STXChart.prototype.setTrashCan = function () {
    if (STX.touchDevice) {
        var a = this.controls.mSticky;
        a && (a.style.display = "inline-block", a.children[0].style.display = "none", a.children[1].style.display = "inline-block", a.style.top = this.backOutY(STXChart.crosshairY) - 60 + "px", a.style.right = this.chart.canvasWidth - (this.backOutX(STXChart.crosshairX) - 50) + "px")
    }
};
STXChart.prototype.pixelFromBar = function (a) {
    return Math.round(a * this.layout.candleWidth + this.layout.candleWidth / 3)
};
STXChart.prototype.barFromPixel = function (a) {
    return Math.floor(a / this.layout.candleWidth)
};
STXChart.prototype.tickFromPixel = function (a, b) {
    b || (b = this.chart);
    var c = Math.round((a + (b.dataSet.length - b.scroll) * this.layout.candleWidth) / this.layout.candleWidth - 0.499);
    return c *= this.layout.periodicity
};
STXChart.prototype.pixelFromTick = function (a, b) {
    b || (b = this.chart);
    return (a - b.dataSet.length + b.scroll) * this.layout.candleWidth + this.offset
};
STXChart.prototype.pixelFromDate = function (a, b) {
    return this.pixelFromTick(this.tickFromDate(a, b), b)
};
STXChart.prototype.priceFromPixel = function (a, b) {
    b || (b = this.chart.panel);
    var c = b.chart,
        d = b.yAxis;
    a = d.bottom - a;
    var e = d.low + a / d.multiplier,
        e = Math.round(e * c.roundit) / c.roundit;
    d.semiLog && (e = Math.pow(10, d.logLow + a * d.logShadow / d.height));
    return e
};
STXChart.prototype.valueFromPixel = function (a, b) {
    b || (b = this.whichPanel(a));
    return this.priceFromPixel(a, b)
};
STXChart.prototype.valueFromPixelUntransform = function (a, b) {
    b || (b = this.whichPanel(a));
    var c = this.priceFromPixel(a, b);
    b.chart.untransformFunc && b.name == b.chart.name && (c = b.chart.untransformFunc(this, b.chart, c));
    return c
};
STXChart.prototype.pixelFromPriceTransform = function (a, b) {
    b.chart.transformFunc && (a = b.chart.transformFunc(this, b.chart, a));
    return this.pixelFromPrice(a, b)
};
STXChart.prototype.pixelFromPrice = function (a, b) {
    b || (b = this.chart.panel);
    var c = b.yAxis,
        d = (c.high - a) * c.multiplier;
    if (c.semiLog) {
        d = Math.log(a) / Math.LN10;
        0 >= a && (d = 0);
        var e = c.height,
            d = e - e * (d - c.logLow) / c.logShadow
    }
    return d += c.top
};
STXChart.prototype.pixelFromValueAdjusted = function (a, b, c) {
    if (this.layout.adj || !this.charts[a.name]) return this.pixelFromPriceTransform(c, a);
    b = Math.round(b);
    return 0 < b && b < a.chart.dataSet.length && (ratio = a.chart.dataSet[b].ratio) ? 
    		this.pixelFromPriceTransform(c * ratio, a) :
    			this.pixelFromPriceTransform(c, a)
};
STXChart.prototype.adjustIfNecessary = function (a, b, c) {
    if (this.layout.adj || !a || !this.charts[a.name]) return c;
    b = Math.round(b);
    return 0 < b && b < a.chart.dataSet.length && (ratio = a.chart.dataSet[b].ratio) ? c / ratio : c
};
STXChart.prototype.setTransform = function (a, b, c) {
    a.transformFunc = b;
    a.untransformFunc = c
};
STXChart.prototype.unsetTransform = function (a) {
    delete a.transformFunc;
    delete a.untransformFunc;
    for (var b = 0; b < a.dataSet.length; b++) a.dataSet[b].transform = null
};
STXChart.prototype.undo = function () {
    this.runPrepend("undo", arguments) || (this.activeDrawing && (this.activeDrawing.abort(), this.activeDrawing = null, STX.clearCanvas(this.chart.tempCanvas, this), this.draw(), STX.swapClassName(this.controls.crossX, "stx_crosshair", "stx_crosshair_drawing"), STX.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing"), STXChart.drawingLine = !1), this.runAppend("undo", arguments))
};
STXChart.prototype.undoStamp = function () {
    this.undoStamps.push(STX.shallowClone(this.drawingObjects))
};
STXChart.prototype.undoLast = function () {
    this.activeDrawing ? this.undo() : this.undoStamps.length && (this.drawingObjects = this.undoStamps.pop(), this.draw())
};
STXChart.prototype.addDrawing = function (a) {
    this.undoStamp();
    this.drawingObjects.push(a)
};
STXChart.prototype.plotLine = function (a, b, c, d, e, f, g, k, m) {
    m || (m = {});
    if ("none" != m.pattern) {
        !0 == k && (k = this.chart.panel);
        if (null == g || "undefined" == typeof g) g = this.chart.context;
        if (!(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d))) {
            var l = 0,
                n = this.chart.canvasHeight,
                r = this.chart.width;
            k && (n = k.yAxis.bottom, l = k.yAxis.top);
            if ("ray" == f) {
                k = 1E7;
                b < a && (k = -1E7);
                var p = {
                    x0: a,
                    x1: b,
                    y0: c,
                    y1: d
                };
                d = yIntersection(p, k);
                b = k
            }
            if ("line" == f || "horizontal" == f || "vertical" == f) k = 1E7, p = {
                x0: a,
                x1: b,
                y0: c,
                y1: d
            }, d = yIntersection(p, k), c = yIntersection(p, -1E7), a = -1E7, b = k;
            var s = 0;
            k = 1;
            var t = b - a;
            b = d - c;
            for (var q, y, v, w = 0; 4 > w; w++) {
                0 == w && (q = -t, y = -(0 - a));
                1 == w && (q = t, y = r - a);
                2 == w && (q = -b, y = -(l - c));
                3 == w && (q = b, y = n - c);
                v = y / q;
                if (null != d && 0 == q && 0 > y) return !1;
                if (0 > q) {
                    if (v > k) return !1;
                    v > s && (s = v)
                } else if (0 < q) {
                    if (v < s) return !1;
                    v < k && (k = v)
                }
            }
            q = a + s * t;
            y = c + s * b;
            a += k * t;
            k = c + k * b;
            if (null == d && null == c) {
                if (y = l, k = n, a = q = p.x0, p.x0 > r || 0 > p.x0) return !1
            } else if (null == d && (k = p.y0 < p.y1 ? n : l, a = q = p.x0, p.x0 > r || 0 > p.x0)) return !1;
            g.lineWidth = 1.1;
            "object" == typeof e ? (g.strokeStyle = e.color, g.globalAlpha =
                e.opacity ? e.opacity : 1, g.lineWidth = parseInt(stripPX(e.width))) : null == e || "auto" == e || STX.isTransparent(e) ? g.strokeStyle = this.defaultColor : g.strokeStyle = e;
            m.opacity && (g.globalAlpha = m.opacity);
            m.lineWidth && (g.lineWidth = m.lineWidth);
            "zig zag" == f && (g.lineWidth = 5);
            g.beginPath();
            e = null;
            m.pattern && (e = m.pattern, "solid" == e ? e = null : "dotted" == e ? e = [g.lineWidth, g.lineWidth] : "dashed" == e && (e = [5 * g.lineWidth, 5 * g.lineWidth]));
            try {
                g.stxLine(q, y, a, k, g.strokeStyle, g.globalAlpha, g.lineWidth, e)
            } catch (D) {}
            g.stroke();
            g.closePath();
            g.globalAlpha = 1
        }
    }
};
STXChart.prototype.drawingClick = function (a, b, c) {
    if (!this.activeDrawing) {
        if (!a) return;
        var d = STXChart.drawingTools[STXChart.vectorType];
        !d && STX.Drawing[STXChart.vectorType] && (d = STX.Drawing[STXChart.vectorType], STXChart.registerDrawingTool(STXChart.vectorType, d));
        if (d && (this.activeDrawing = new d, this.activeDrawing.construct(this, a), !this.charts[a.name] && this.activeDrawing.chartsOnly)) {
            this.activeDrawing = null;
            return
        }
    }
    return this.activeDrawing ? (b = this.tickFromPixel(b, a.chart) / this.layout.periodicity, a =
        this.panels[this.activeDrawing.panelName], c = this.adjustIfNecessary(a, b, this.valueFromPixelUntransform(c, a)), this.preferences.magnet && this.magnetizedPrice && (c = this.adjustIfNecessary(a, b, this.magnetizedPrice)), this.activeDrawing.click(this.chart.tempCanvas.context, b, c) ? this.activeDrawing && (STXChart.drawingLine = !1, STX.clearCanvas(this.chart.tempCanvas, this), this.addDrawing(this.activeDrawing), this.activeDrawing = null, this.draw(), this.changeOccurred("vector"), STX.swapClassName(this.controls.crossX, "stx_crosshair",
            "stx_crosshair_drawing"), STX.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing")) : (this.changeOccurred("drawing"), STXChart.drawingLine = !0, STX.swapClassName(this.controls.crossX, "stx_crosshair_drawing", "stx_crosshair"), STX.swapClassName(this.controls.crossY, "stx_crosshair_drawing", "stx_crosshair")), !0) : !1
};
STXChart.prototype.whichPanel = function (a) {
    for (var b in this.panels) {
        var c = this.panels[b];
        if (!c.hidden && a > c.top && a < c.bottom) return c
    }
    return null
};
STXChart.prototype.mouseup = function (a) {
    if (this.displayInitialized && (this.grabbingScreen = !1, "" == this.openDialog))
        if (this.grabOverrideClick) unappendClassName(document.body, "grab"), this.grabOverrideClick = !1;
        else if (this.displayCrosshairs)
        if (STXChart.insideChart && unappendClassName(document.body, "grab"), null != STXChart.resizingPanel) STX.clearCanvas(this.chart.tempCanvas, this), this.resizePanels(), STXChart.resizingPanel = null;
        else {
            a || (a = event);
            if (a.which && 2 <= a.which || a.button && 2 <= a.button) return this.anyHighlighted ?
                (this.deleteHighlighted(), a.preventDefault && a.preventDefault(), !1) : !0;
            a.pageX || (a.pageX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, a.pageY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            if (!(a.pageX < this.chart.left || a.pageX > this.chart.right || a.pageY < this.chart.top || a.pageY > this.chart.bottom || this.runPrepend("mouseup", arguments))) {
                var b = this.backOutY(a.pageY),
                    c = this.backOutX(a.pageX);
                this.drawingClick(this.currentPanel, c, b);
                this.runAppend("mouseup",
                    arguments)
            }
        }
};
STXChart.prototype.grabbingHand = function () {
    this.grabbingScreen && (STX.touchDevice || appendClassName(document.body, "grab"))
};
STXChart.prototype.mousedown = function (a) {
    if (!this.runPrepend("mousedown", arguments) && (this.manageTouchAndMouse && a && a.preventDefault && a.preventDefault(), this.grabOverrideClick = !1, this.displayInitialized && this.displayCrosshairs && STXChart.insideChart && (a || (a = event), !(a.which && 2 <= a.which || a.button && 2 <= a.button)))) {
        for (var b in this.panels) {
            var c = this.panels[b];
            if (c.highlighted) {
                STXChart.resizingPanel = c;
                return
            }
        }
        this.grabbingScreen = !0;
        this.yToleranceBroken = !1;
        a || (a = event);
        a.pageX || (a.pageX = a.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft, a.pageY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        b = this.currentPanel.chart;
        this.grabStartX = a.pageX;
        this.grabStartY = a.pageY;
        this.grabStartScrollX = b.scroll;
        this.grabStartScrollY = b.verticalScroll;
        this.grabStartCandleWidth = this.layout.candleWidth;
        this.grabStartZoom = b.zoom;
        setTimeout(function (a) {
            return function () {
                a.grabbingHand()
            }
        }(this), 100);
        this.runAppend("mousedown", arguments)
    }
};
STXChart.prototype.changeVectorType = function (a) {
    STXChart.vectorType = a;
    "" == a && STXChart.drawingLine && this.undo();
    this.setCrosshairColors();
    STXChart.insideChart && this.doDisplayCrosshairs()
};
STXChart.prototype.removeOverlay = function (a) {
    if (!this.runPrepend("removeOverlay", arguments)) {
        for (var b in this.overlays) {
            var c = this.overlays[b];
            c.field == a && this.removeOverlay(c.name);
            if(this.ma05_study && !this.ma05_study.cancelled && c.name == this.ma05_study.name){
            	this.ma05_study.cancelled = true;
            }
            if(this.ma10_study && !this.ma10_study.cancelled && c.name == this.ma10_study.name){
            	this.ma10_study.cancelled = true;
            }
            if(this.ma20_study && !this.ma20_study.cancelled && c.name == this.ma20_study.name){
            	this.ma20_study.cancelled = true;
            }
            if(this.ma30_study && !this.ma30_study.cancelled && c.name == this.ma30_study.name){
            	this.ma30_study.cancelled = true;
            }
            if(this.ma60_study && !this.ma60_study.cancelled && c.name == this.ma60_study.name){
            	this.ma60_study.cancelled = true;
            }
          
        }
        
       
        
        delete this.layout.studies[a];
        delete this.overlays[a];
        this.displaySticky("");
        this.createDataSet();
        this.changeOccurred("layout");
        this.runAppend("removeOverlay", arguments)
    }
};
STXChart.prototype.addSeries = function (a, b) {
    if (!this.runPrepend("addSeries", arguments)) {
        b || (b = {});
        b.chartName || (b.chartName = this.chart.name);
        var c = {
            parameters: clone(b),
            yValueCache: [],
            display: a,
            isStep: b.type && "step" == b.type
        };
        "display" in c.parameters && (c.display = c.parameters.display);
        var d = this.charts[b.chartName];
        d && (d.series[a] = c);
        this.runAppend("addSeries", arguments);
        return c
    }
};
STXChart.prototype.removeSeries = function (a, b) {
    this.runPrepend("removeSeries", arguments) || (b || (b = this.chart), delete b.series[a], this.runAppend("removeSeries", arguments))
};
STXChart.prototype.drawLegendItem = function (a, b, c, d) {
    b = a[0];
    a = a[1];
    var e = this.chart.context;
    e.fillStyle = d;
    e.fillRect(b, a, 10, 10);
    b += 12;
    e.fillStyle = this.defaultColor;
    e.fillText(c, b, a);
    b += e.measureText(c).width + 6;
    return [b, a]
};
STXChart.prototype.drawLegend = function (a, b) {
    if (!this.runPrepend("drawLegend", arguments)) {
        var c = a.panel;
        this.chart.context.textBaseline = "top";
        var d = [a.legend.x, a.legend.y],
            e = this.canvasColor("stx_line_chart");
        if ("mountain" == this.layout.chartType) {
            var f = this.canvasStyle("stx_mountain_chart").borderTopColor;
            f && "transparent" != f && (e = f)
        }
        var d = this.drawLegendItem(d, c, a.symbol, e),
            g;
        for (g in b) d = this.drawLegendItem(d, c, g, b[g]);
        this.runAppend("drawLegend", arguments)
    }
};
STXChart.prototype.drawSeries = function (a) {
    if (!this.runPrepend("drawSeries", arguments)) {
        var b = a.dataSegment,
            c = {}, d;
        for (d in a.series) {
            var e = a.series[d],
                f = e.parameters,
                g = a.panel;
            f.panel && (g = this.panels[f.panel]);
            if (g) {
                var k = g.yAxis,
                    m = g.bottom,
                    l = STX.minMax(b, d),
                    n = l[0],
                    r = g.top,
                    m = g.bottom,
                    p = m - r,
                    s = f.marginTop,
                    t = f.marginBottom;
                s && (r = 1 < s ? r + s : r + p * s);
                t && (m = 1 < t ? m - t : m - p * t);
                var l = (m - r) / (l[1] - n),
                    p = !1,
                    q = x = z = px = py = s = null,
                    t = this.layout.candleWidth,
                    y = this.offset,
                    v = this.chart.context,
                    w = e.isStep;
                v.beginPath();
                e.yValueCache.length !=
                    b.length && (e.yValueCache = Array(b.length));
                for (var D = e.yValueCache, C = !1, A = null, u = 0; u < b.length; u++)
                    if (q = b[u])
                        if (q.transform && e.parameters.shareYAxis && (q = q.transform), (q = q[d]) || 0 == q) {
                            A = q;
                            !w && s && s != u - 1 ? (px = x, py = z) : px = null;
                            x = Math.floor(u * t) + y;
                            w && p && v.lineTo(x, z);
                            z = e.parameters.shareYAxis ? this.pixelFromPrice(q, g) : m - (q - n) * l;
                            if (null != px)
                                for (q = {
                                    x0: px,
                                    x1: x,
                                    y0: py,
                                    y1: z
                                }; s != u; s++) {
                                    var B = yIntersection(q, Math.floor(s * t) + y);
                                    D[s] = B
                                }
                            D[u] = z;
                            if (z < r) {
                                z = r;
                                if (C) {
                                    v.moveTo(x, z);
                                    continue
                                }
                                C = !0
                            } else if (z > m) {
                                z = m;
                                if (C) {
                                    v.moveTo(x,
                                        z);
                                    continue
                                }
                                C = !0
                            } else C = !1;
                            p ? v.lineTo(x, z) : (p = !0, v.moveTo(x, z));
                            s = u
                        } else w && (D[u] = z);
                v.lineWidth = 1;
                f.width && (v.lineWidth = f.width);
                e.highlight && (v.lineWidth *= 2);
                v.strokeStyle = this.defaultColor;
                f.color && (v.strokeStyle = f.color);
                v.stroke();
                v.closePath();
                if (e.parameters.shareYAxis) {
                    txt = k.priceFormatter ? k.priceFormatter(this, g, A) : this.formatYAxisPrice(A, g);
                    var z = this.pixelFromPrice(A, g);
                    this.createYAxisLabel(g, txt, z, v.strokeStyle, "#FFFFFF")
                }
                c[d] = v.strokeStyle
            }
        }
        a.legend && e && this.drawLegend(a, c);
        this.runAppend("drawSeries",
            arguments)
    }
};
STXChart.isDailyInterval = function (a) {
    return "day" == a || "week" == a || "month" == a ? !0 : !1
};
STXChart.prototype.isDailyInterval = function (a) {
    return "day" == a || "week" == a || "month" == a ? !0 : !1
};
STXChart.prototype.setPeriodicityV2 = function (a, b) {
    if (!this.runPrepend("setPeriodicityV2", arguments)) {
        if (b) {
            var c = !1;
            this.isDailyInterval(b) != this.isDailyInterval(this.layout.interval) && (c = !0);
            this.isDailyInterval(this.layout.interval) || this.layout.interval != b && (c = !0);
            if (c) {
                this.layout.interval = b;
                this.layout.periodicity = a;
                this.changeOccurred("layout");
                this.dataCallback && this.dataCallback();
                return
            }
            this.layout.interval = b
        }
        for (var d in this.charts) {
            var c = this.charts[d],
                e, f = Math.round(c.maxTicks / 2),
                g = null;
            c.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1;
            var k = !0,
                g = !1;
            c.scroll < c.maxTicks ? k = !1 : c.dataSegment && !c.dataSegment[f] && (k = !1, g = c.scroll - c.dataSet.length);
            k && c.dataSegment && 0 < c.dataSegment.length && (c.maxTicks < (Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1) / 2 && (f = c.dataSegment.length - 1), f >= c.dataSegment.length ? (e = c.dataSegment[c.dataSegment.length - 1].DT, f = c.dataSegment.length - 1) : e = c.dataSegment[f].DT);
            this.layout.periodicity = a;
            this.createDataSet();
            if (k) {
                if (c.dataSegment &&
                    0 < c.dataSegment.length)
                    for (g = c.dataSet.length - 1; 0 <= g; g--)
                        if (c.dataSet[g].DT.getTime() < e.getTime()) {
                            c.scroll = c.dataSet.length - g + f;
                            break
                        }
            } else g ? c.scroll = c.dataSet.length + g : (f = Math.round(this.preferences.whitespace / this.layout.candleWidth), c.scroll = c.maxTicks - f)
        }
        this.draw();
        this.changeOccurred("layout");
        this.runAppend("setPeriodicityV2", arguments)
    }
};
STXChart.prototype.drawVectors = function () {
    if (!this.vectorsShowing && !this.runPrepend("drawVectors", arguments)) {
        this.vectorsShowing = !0;
        if (!this.chart.hideDrawings) {
            for (var a = {}, b = 0; b < this.drawingObjects.length; b++) {
                var c = this.drawingObjects[b],
                    d = c.panelName;
                this.panels[c.panelName] && (a[d] || (a[d] = []), a[d].push(c))
            }
            for (d in a) {
                this.startClip(d);
                for (var e = a[d], b = 0; b < e.length; b++) c = e[b], c.render(this.chart.context);
                this.endClip()
            }
        }
        this.runAppend("drawVectors", arguments)
    }
};
STXChart.prototype.consolidatedQuote = function (a, b, c, d, e) {
    function f(b, c) {
        b.layout.adj && null != a[c].Split_Close && (m = a[c].Split_Close / a[c].Close);
        "High" in a[c] && a[c].High * m > n.High && (n.High = a[c].High * m);
        "Low" in a[c] && a[c].Low * m < n.Low && (n.Low = a[c].Low * m);
        n.Volume += a[c].Volume;
        "Close" in a[c] && null != a[c].Close && (n.Close = a[c].Close * m);
        n.ratio = m
    }

    function g(b, c) {
        var d = a[b - 1].DT,
            e = a[b].DT;
        if ("week" == c) {
            if (e.getDay() < d.getDay()) return !0
        } else if ("month" == c) {
            if (e.getMonth() != d.getMonth()) return !0
        } else if (e.getDay() !=
            d.getDay()) return !0;
        return !1
    }

    function k(b, c, d, e) {
        d *= e;
        b = new Date(a[b].DT);
        b.setMinutes(b.getMinutes() + d);
        return a[c].DT.getTime() >= b.getTime() ? !0 : !1
    }
    if (0 > b || this.runPrepend("consolidatedQuote", arguments)) return null;
    !e && this.dontRoll && (e = !0);
    var m = 1;
    this.layout.adj && null != a[b].Split_Close ? m = a[b].Split_Close / a[b].Close : this.layout.adj && null != a[b].Adj_Close && (m = a[b].Adj_Close / a[b].Close);
    var l = a[b],
        n = {}, r;
    for (r in l) n[r] = l[r];
    "Open" in n && (n.Open = l.Open * m);
    "Close" in n && null != n.Close && (n.Close = l.Close *
        m);
    "High" in n && (n.High = l.High * m);
    "Low" in n && (n.Low = l.Low * m);
    l = b;
    if ("week" != d && "month" != d || e)
        if (!this.isDailyInterval(d) && 1 < c)
            for (r = 1; r < c; r++) {
                l = b + r;
                if (l < a.length && k(b, l, c, d)) {
                    l--;
                    break
                }
                0 <= l && l < a.length && f(this, l)
            } else
                for (r = 1; r < c; r++) l = b + r, 0 <= l && l < a.length && f(this, l);
        else
            for (r = 1; r <= c; r++) {
                for (; l + 1 < a.length && !g(l + 1, d);) l++, f(this, l);
                r != c && (l++, l < a.length && f(this, l))
            }
        for (r in this.plugins) {
            var p = this.plugins[r];
            p.consolidate && p.consolidate(a, b, l, n)
        }
    this.runAppend("consolidatedQuote", arguments);
    return {
        quote: n,
        position: l + 1
    }
};
STXChart.NONE = 0;
STXChart.CLOSEUP = 1;
STXChart.CLOSEDOWN = 2;
STXChart.CLOSEEVEN = 4;
STXChart.CANDLEUP = 8;
STXChart.CANDLEDOWN = 16;
STXChart.CANDLEEVEN = 32;
STXChart.prototype.displayChart = function (a) {
    this.tmpWidth = Math.round(0.75 * this.layout.candleWidth);
    if (!this.runPrepend("displayChart", arguments)) {
        if ("line" == this.layout.chartType) this.drawLineChart(a);
        else if ("mountain" == this.layout.chartType) this.drawMountainChart(a);
        else if ("wave" == this.layout.chartType) this.drawWaveChart(a);
        else if ("bar" == this.layout.chartType) this.drawBarChart(a, "stx_line_chart");
        else if ("colored_bar" == this.layout.chartType) this.drawBarChart(a, "stx_bar_up", STXChart.CLOSEUP), this.drawBarChart(a,
            "stx_bar_down", STXChart.CLOSEDOWN), this.drawBarChart(a, "stx_candle_shadow", STXChart.CLOSEEVEN);
        else if ("hollow_candle" == this.layout.chartType) {
            this.drawShadows(a, "stx_hollow_candle_up", STXChart.CLOSEUP);
            this.drawShadows(a, "stx_hollow_candle_down", STXChart.CLOSEDOWN);
            var b = this.getCanvasColor("stx_hollow_candle_up"),
                c = this.getCanvasColor("stx_hollow_candle_down");
            this.drawCandles(a, b, "transparent", STXChart.CLOSEUP | STXChart.CANDLEDOWN);
            this.drawCandles(a, c, "transparent", STXChart.CLOSEDOWN | STXChart.CANDLEDOWN);
            this.drawCandles(a, this.containerColor, b, STXChart.CLOSEUP | STXChart.CANDLEUP);
            this.drawCandles(a, this.containerColor, c, STXChart.CLOSEDOWN | STXChart.CANDLEUP)
        } else "candle" == this.layout.chartType ? (this.drawShadows(a, "stx_candle_shadow"), b = this.canvasStyle("stx_candle_up"), (c = b["border-left-color"]) || (c = b.borderLeftColor), this.drawCandles(a, this.getCanvasColor("stx_candle_up"), c, STXChart.CANDLEUP), b = this.canvasStyle("stx_candle_down"), (c = b["border-left-color"]) || (c = b.borderLeftColor), this.drawCandles(a,
            this.getCanvasColor("stx_candle_down"), c, STXChart.CANDLEDOWN)) : "scatterplot" == this.layout.chartType && this.scatter(a);
        this.layout.volumeUnderlay && (0 == a.volumeMax ? this.watermark("chart", "center", "bottom", this.translateIf("Volume Not Available")) : this.volUnderlay(a));
        if (this.panels.vchart && !this.panels.vchart.hidden) {
            b = this.chart.dataSegment;
            this.chart.context.beginPath();
            this.canvasColor("stx_volume_up");
            for (c = 0; c <= b.length; c++) {
                var d = b[c];
                null != d && (d.Close <= d.Open || this.volbar(c, d))
            }
            this.chart.context.fill();
            this.chart.context.closePath();
            this.chart.context.beginPath();
            this.canvasColor("stx_volume_down");
            for (c = 0; c <= b.length; c++) d = b[c], null != d && (d.Close > d.Open || this.volbar(c, d));
            this.chart.context.fill();
            this.chart.context.closePath()
        }
        this.runAppend("displayChart", arguments)
    }
};
STXChart.prototype.turtle = function (a) {
    for (var b = 0, c = 1; c < a.dataSet.length; c++) {
        var d = a.dataSet[c],
            e = a.dataSet[c - 1],
            e = Math.max(Math.max(d.High - d.Low, d.High - e.Close), e.Close - d.Low),
            b = b + e;
        20 < c && (b -= a.dataSet[c - 20].trueRange);
        d.trueRange = e;
        d.atr = b / 20
    }
};
STXChart.prototype.currentQuote = function () {
    for (var a = this.chart.dataSegment.length - 1; 0 <= a; a--)
        if (null != this.chart.dataSegment[a]) return this.chart.dataSegment[a];
    return null
};
STXChart.prototype.correctIfOffEdge = function (a) {
    if (!this.runPrepend("correctIfOffEdge", arguments)) {
        for (var b in this.charts) {
            var c = this.charts[b],
                d = Math.round(c.maxTicks);
            d > c.dataSet.length && (d = c.dataSet.length);
            if (c.allowScrollPast) {
                var e = c.maxTicks - d;
                c.maxTicks - e > c.dataSet.length && (e = c.maxTicks - c.dataSet.length);
                c.scroll - e > c.dataSet.length && (c.scroll = c.dataSet.length + e);
                c.scroll < d && (c.scroll = d)
            } else c.scroll < d && (c.scroll = d), c.scroll > c.dataSet.length && (c.scroll = c.dataSet.length)
        }
        this.runAppend("correctIfOffEdge", arguments)
    }
};
STXChart.prototype.createDataSegment = function (a) {
    if (!this.runPrepend("createDataSegment", arguments)) {
        for (var b in this.charts) {
            var c = this.charts[b];
            a && (c = a);
            var d = Math.round(c.maxTicks);
            d > c.dataSet.length && (d = c.dataSet.length);
            if (c.allowScrollPast) {
                var e = c.maxTicks - d;
                c.maxTicks - e > c.dataSet.length && (e = c.maxTicks - c.dataSet.length);
                c.scroll - e > c.dataSet.length && (c.scroll = c.dataSet.length + e);
                c.scroll < d && (c.scroll = d)
            } else c.scroll < d && (c.scroll = d), c.scroll > c.dataSet.length && (c.scroll = c.dataSet.length);
            c.dataSegment = [];
            
            for (d = 0; d <= c.maxTicks; d++){
            	position = c.dataSet.length - c.scroll + d;
            	if(position < c.dataSet.length && 0 <= position ){
            		c.dataSegment.push(c.dataSet[position]);
            	}
            }
            if (a) break
        }
        this.runAppend("createDataSegment", arguments)
    }
};
STXChart.prototype.leftTick = function () {
    return this.chart.dataSet.length - this.chart.scroll
};
STXChart.prototype.getStartDate = function () {
   return this.chart.dataSegment[0].DT
};
STXChart.prototype.setStartDate = function (a) {
    for (var b = 0; b < this.chart.dataSet.length; b++)
        if (this.chart.dataSet[b].DT.getTime() == a.getTime()) {
            this.chart.scroll = this.chart.dataSet.length - b;
            this.draw();
            break
        }
};
STXChart.prototype.clearPixelCache = function () {
    for (var a in this.panels) {
        var b = this.panels[a];
        b.cacheHigh = null;
        b.cacheLow = null;
        b.cacheLeft = 1E6;
        b.cacheRight = -1
    }
    for (var c in this.charts)
        if (a = this.charts[c], a.dataSet)
            for (b = 0; b < a.dataSet.length; b++) a.dataSet[b].cache = {}
};
STXChart.prototype.createYAxisLabel = function (a, b, c, d, e) {
    var f = this.chart.context,
        g = this.getCanvasFontSize("stx_yaxis") + 6,
        k = f.measureText(b).width + 6,
        m = this.chart.canvasWidth - this.yaxisWidth - 3;
    c + g / 2 > a.bottom && (c = a.bottom - g / 2);
    c - g / 2 < a.top && (c = a.top + g / 2);
    f.fillStyle = d;
    roundRect(f , m-5, c - g / 2, k, g, 3, d, !1);
    f.fillStyle = e ? e : "#FFFFFF";
    f.textBaseline = "middle";
    this.canvasFont("stx_yaxis", f);
    f.fillText(b , m + 3 -5, c);
    
};
STXChart.prototype.drawCurrentHR = function () {
    if (!this.runPrepend("drawCurrentHR", arguments)) {
        var a, b, c;
        for (c in this.charts) {
            a = this.charts[c];
            var d = a.panel,
                e = d.yAxis;
            (b = e.whichSet) || (b = "dataSet");
            var f = a[b].length;
            if (f) {
                var g = a[b][f - 1],
                    k = close;
                2 <= a.dataSet.length && (k = a[b][f - 2].Close);
                close < k ? (a = this.canvasStyle("stx_current_hr_down").backgroundColor, b = this.canvasStyle("stx_current_hr_down").color) : (a = this.canvasStyle("stx_current_hr_up").backgroundColor, b = this.canvasStyle("stx_current_hr_up").color);
                g.transform && (g = g.transform);
                e = e.priceFormatter ? e.priceFormatter(this, d, g.Close) : this.formatYAxisPrice(g.Close, d);
                g = this.pixelFromPrice(g.Close, d);
                this.createYAxisLabel(d, e, g, a, b)
            }
        }
        this.runAppend("drawCurrentHR", arguments)
    }
};
STXChart.prototype.getDefaultColor = function () {
    this.defaultColor = "#000000";
    for (var a = null, b = this.chart.container; !a || STX.isTransparent(a);) {
        a = getComputedStyle(b);
        if (!a) return;
        a = a.backgroundColor;
        STX.isTransparent(a) && (a = "transparent");
        b = b.parentNode;
        if (!b || !b.tagName) break
    }
    a && (this.containerColor = a, 0.65 < STX.hsv(a)[2] ? this.defaultColor = "#000000" : this.defaultColor = "#FFFFFF")
};
STXChart.prototype.draw = function () {
    if (this.chart.canvas && this.chart.dataSet && (this.offset = 0.75 * this.layout.candleWidth / 2, STX.clearCanvas(this.chart.canvas, this), !this.runPrepend("draw", arguments))) {
        this.xaxisHeight = this.getCanvasFontSize("stx_xaxis") + 3;
        this.getDefaultColor();
        this.vectorsShowing = !1;
        this.drawPanels();
        for (var a in this.charts) {
            var b = this.charts[a];
            this.correctIfOffEdge();
            this.createDataSegment();
            this.initializeDisplay(b);
            this.createXAxis(b);
            this.createVolumeChart(b);
            for (var c in this.plugins) {
                var d =
                    this.plugins[c];
                d.display && d.drawUnder && d.drawUnder(this, b)
            }
            this.displayChart(b);
            this.drawSeries(b);
            for (c in this.plugins) d = this.plugins[c], d.display && d.drawOver && d.drawOver(this, b)
        }
        STXStudies.displayStudies(this);
        this.createCrosshairs();
        this.drawVectors();
        this.drawCurrentHR();
        this.displayInitialized = !0;
        this.controls.home && (this.controls.home.style.display = this.chart.scroll - 1 > this.chart.maxTicks ? "block" : "none");
        this.drawMasterLine();
        this.displayStudyValue(false);
        this.runAppend("draw", arguments)
     
    }
};

STXChart.prototype.displayStudyValue = function(showChangeValue){
	var crosshairTick = this.tickFromPixel(this.backOutX(STXChart.crosshairX), this.chart); 
	var prices= this.layout.crosshair && showChangeValue? this.chart.dataSet[crosshairTick]: this.chart.dataSet[this.chart.dataSet.length -1];

	
	if(prices!=null){
	
		if(prices){
			var panels = this.panels;
			var panelContainStudy = false;
	
			var randomN = Math.floor(Math.random() * (10000000-100000000+1)) + 100000000;
			
			for(var panelKey in this.panels){
				var panel = this.panels[panelKey];
				var studyLabelId = panel.studyLabel.id;
				panel.studyLabel.id = studyLabelId =  Math.floor(Math.random() * (10000000-100000000+1)) + 100000000;
				$("#"+panel.studyLabel.id).text("");
			}
			
		//update study value based on the the stxx.crosshairX
		for(var panelKey in this.panels){
			var panel = this.panels[panelKey];
			for(var studyKey in this.layout.studies){
				var study = this.layout.studies[studyKey];
				//k line in the chart panel;
				var studyLabelId = panel.studyLabel.id;
				if(study.panel == panel.name){
					if(study.type == "ma"){
						if(!panelContainStudy){
							panelContainStudy = !panelContainStudy;
						}
						var studyQuote = this.formatYAxisPrice(prices[study.type.toUpperCase() + " "+ study.name], panel);
						if(studyQuote){
							studyText = "  "+ study.type.toUpperCase() + "("+study.days+":"+studyQuote+")";
							var panelInnerText =  $("#"+studyLabelId).text();
							$("#"+studyLabelId).text(panelInnerText + " "+ studyText);
						}
						
						
					}
					
					if(study.type == "Bollinger Bands"){
						var topValue = this.formatYAxisPrice(prices["Bollinger Band Bottom" + " "+ study.name], panel);
						var medianValue = this.formatYAxisPrice(prices["Bollinger Band Bottom" + " "+ study.name], panel);
						var bottomValue = this.formatYAxisPrice(prices["Bollinger Band Bottom" + " "+ study.name], panel);
						var panelInnerText = $("#"+studyLabelId).text();
						$("#"+studyLabelId).text(panelInnerText + " Bollinger Band Bottom "+ "("+topValue+ ", "+medianValue+ ", "+bottomValue+")");
							
					}
					
					if(study.type == "PSAR"){
						var value = this.formatYAxisPrice(prices["Result" + " "+ study.name], panel);
						var panelInnerText =  $("#"+studyLabelId).text();
						$("#"+studyLabelId).text(panelInnerText + " PSAR( " + study.inputs["Minimum AF"] + ", "+ study.inputs["Maximum AF"] + " : "+ value + ")");
						
					}
					
					
				}
				
				//new k line panel
				if(panel.name == study.name){
					if(study.type == "macd"){
						var diffValue = this.formatYAxisPrice(prices[study.name],panel);
						var deaValue = this.formatYAxisPrice(prices[study.name + "_hist"],panel);
						var macdValue = this.formatYAxisPrice(prices["signal " + study.name],panel);
					
						$("#"+studyLabelId).text(study.name + " DIFF:"+ diffValue + " DEA:"+ deaValue + " MACD:" + macdValue);
					}
					
					if(["Acc Swing", "ATR","CCI","Price ROC",  "Williams %R"].indexOf(study.type ) >= 0){
						var tempValue = this.formatYAxisPrice(prices["Result " + study.name],panel);
						$("#"+studyLabelId).text(study.name + " " + tempValue);
					}
					
					if(["rsi"].indexOf(study.type ) >= 0){
						var tempValue = this.formatYAxisPrice(prices["RSI " + study.name],panel);
						$("#"+studyLabelId).text(study.name + " " + tempValue);
					}
					
					if(["TRIX"].indexOf(study.type ) >= 0){
						var s = prices["Result " + study.name] ;
						
						var value =  Util.fixToNum(s,5);
						$("#"+studyLabelId).text(study.name + " " + value) ;
					}
					
					if(["stochastics"].indexOf(study.type ) >= 0){
						var fastValue = this.formatYAxisPrice(prices[study.name],panel);
						var slowValue = this.formatYAxisPrice(prices[study.name+"_3"],panel);
						$("#"+studyLabelId).text(study.name + " ("+fastValue+", "+slowValue+")");
					}
				
				
				}
				
				
				
				
			}
		}
		}
		
		
	}
}

STXChart.prototype.adjustBackingStore = function (a, b) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    1 > this.devicePixelRatio && (this.devicePixelRatio = 1);
    backingStoreRatio = b.webkitBackingStorePixelRatio || b.mozBackingStorePixelRatio || b.msBackingStorePixelRatio || b.oBackingStorePixelRatio || b.backingStorePixelRatio || 1;
    ratio = this.devicePixelRatio / backingStoreRatio;
    if (this.devicePixelRatio !== backingStoreRatio && (!STX.isAndroid || STX.is_chrome)) {
        var c = a.width,
            d = a.height;
        a.width = c * ratio;
        a.height = d * ratio;
        a.style.width =
            c + "px";
        a.style.height = d + "px";
        b.scale(ratio, ratio)
    }
};
STXChart.prototype.resizeCanvas = function () {
    var a = this.chart.canvas,
        b = this.chart.context;
    this.chart.tempCanvas.height = a.height = this.chart.container.clientHeight;
    this.chart.tempCanvas.width = a.width = this.chart.container.clientWidth;
    this.adjustBackingStore(a, b);
    b = getPos(this.chart.container);
    this.chart.left = b.x;
    this.chart.top = b.y;
    this.chart.canvasWidth = this.chart.container.clientWidth;
    this.chart.width = this.chart.canvasWidth - this.yaxisWidth;
    this.chart.right = b.x + this.chart.width;
    this.chart.canvasHeight =
        this.chart.container.clientHeight;
    this.chart.bottom = b.y + this.chart.canvasHeight;
    this.yTolerance = 0.03 * a.height;
    a = this.layout.candleWidth;
    "undefined" == typeof a && (a = 8);
    for (var c in this.charts)
        if (b = this.charts[c], this.layout.span && "" != this.layout.span) this.setCandleWidth(this.getSpanCandleWidth(this.layout.span), b);
        else if (this.setCandleWidth(a, b), b.scroll < b.maxTicks) {
        var d = Math.round(this.preferences.whitespace / this.layout.candleWidth);
        b.scroll = b.maxTicks - d
    }
    this.controls.floatHR.style.left = (this.chart.width -5) +
        "px"
};

STXChart.prototype.setNumberOfCandle = function (number){
	//(this.chart.width - a.padding) / c,
	// this.layout.candleWidth = this.chart.width % number == 0 ?  this.chart.width/number : this.chart.width / number + 1;
	
	 this.layout.candleWidth =this.chart.width /  (number+ 1);
	 this.initializeChart();
	 this.draw();
}

STXChart.prototype.setCandleWidth = function (a, b) {
    b || (b = this.chart);
    this.layout.candleWidth = a;
    b.maxTicks = Math.round(this.chart.width / a - 0.499) - 1
};
STXChart.prototype.resizeChart = function () {
    this.resizeCanvas();
    this.adjustPanelPositions();
    null != this.chart.symbol && this.draw()
};
STXChart.prototype.calculateMinutesInSession = function (a) {
    var b = 60 * (a.endHour - a.beginHour),
        b = b + a.endMinute,
        b = b - a.beginMinute;
    59 == a.endMinute && b++;
    a.minutesInSession = b
};
STXChart.prototype.newChart = function (a, b, c) {
    c || (c = this.chart);
    a && (c.symbol = a);
    this.setMasterData(b, c);
    this.createDataSet();
    this.initializeChart();
    this.draw()
};
STXChart.prototype.setMasterData = function (a, b) {
    b || (b = this.chart);
    this.calculateMinutesInSession(b);
    b.masterData = a;
    "chart" == b.name && (this.masterData = a);
    b.decimalPlaces = 2;
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        d.DT = strToDateTime(d.Date);
        if (d.Close) {
            var e = d.Close.toString(),
                f = e.indexOf("."); - 1 != f && (e = e.length - f - 1, e > b.decimalPlaces && (b.decimalPlaces = e))
        }
        null == d.High && delete d.High;
        null == d.Low && delete d.Low;
        null == d.Open && delete d.Open
    }
    this.chart.roundit = Math.pow(10, b.decimalPlaces);
    for (c in this.plugins) d =
        this.plugins[c], d.display && d.setMasterData && d.setMasterData(this, b)
};
STXChart.prototype.streamTrade = function (a, b, c) {
    var d = this.masterData;
    if (null == d || 0 == d.length) c || (c = new Date), d = {
        Date: yyyymmddhhmm(c),
        DT: c,
        Open: a,
        Close: a,
        High: a,
        Low: a,
        Volume: b
    }, this.appendMasterData([d]);
    else {
        c || (c = Date.now());
        var d = d[d.length - 1],
            e = this.getNextInterval(d.DT);
        if (c < e.getTime()) d.Close = a, d.Volume += b, a > d.High && (d.High = a), a < d.Low && (d.Low = a), this.appendMasterData([d]);
        else {
            for (var f = this.getNextInterval(e), g = []; f < c;) e = {
                Date: yyyymmddhhmm(e),
                DT: e,
                Close: d.Close,
                Open: d.Close,
                High: d.Close,
                Low: d.Close,
                Volume: 0
            }, g.push(e), e = f, f = this.getNextInterval(e);
            d = {
                Date: yyyymmddhhmm(e),
                DT: e,
                Open: a,
                Close: a,
                High: a,
                Low: a,
                Volume: b
            };
            g.push(d);
            this.appendMasterData(g)
        }
    }
};


STXChart.prototype.setMasterLine = function(state){
	this.layout.masterLine = state;
} 

STXChart.prototype.drawMasterLine = function(){
	var dataSet = this.chart.dataSet;
	
	if(this.layout.masterLine)
	if(dataSet && dataSet[dataSet.length-1]){
		var panel=this.chart.panel;
		var ypx = this.pixelFromPrice(dataSet[dataSet.length-1].Close, panel);
		var y =  Math.round(ypx) ;
		this.canvasColor("stx_yaxis");
		var context = this.chart.context;
		context.beginPath();
		context.fillStyle = 'rgb(184,44,12)';
		context.moveTo(0,y);
		context.lineTo(this.chart.width-8,y );
		context.fill();
		context.strokeStyle = this.getCanvasColor("stx-master-line-color");
		context.lineWidth=2;
		context.stroke();
		context.closePath();
		
	}
	
	
}


STXChart.prototype.appendMasterData = function (a, b) {
    if (!this.runPrepend("appendMasterData", arguments) && a.length) {
        var c = strToDateTime(a[0].Date);
        b || (b = this.chart);
        var d = b.masterData;
        if (d && 0 != d.length) {
            for (g = d.length - 1; 0 <= g;) {
                var e = strToDateTime(d[g].Date);
                if (e.getTime() <= c.getTime()) {
                    var f = 0;
                    e.getTime() < c.getTime() && (f = 1);
                    for (c = 0; c < a.length; c++) d[g + c + f] = a[c], d[g + c + f].DT = strToDateTime(d[g + c + f].Date);
                    break
                }
                g--
            }
            for (g in this.plugins) f = this.plugins[g], f.display && f.appendMasterData && f.appendMasterData(this,
                a, b)
        } else
            for (var d = b.masterData = clone(a), g = 0; g < d.length; g++) d[g].DT = strToDateTime(d[g].Date);
        this.masterData && 0 != this.masterData.length || (this.masterData = d);
        this.createDataSet();
        this.draw();
        this.runAppend("appendMasterData", arguments)
    }
};
STXChart.prototype.setRange = function (a, b, c, d) {
    "object" != typeof a && (a = {
        dtLeft: a,
        dtRight: b,
        padding: c,
        chart: d,
        goIntoFuture: !1
    });
    a.chart || (a.chart = this.chart);
    a.padding || (a.padding = 0);
    d = a.chart;
    c = a.dtLeft.getTime();
    var e = null;
    b = d.dataSet.length - 1;
    if (a.dtRight) {
        for (e = a.dtRight.getTime(); 0 <= b; b--) {
            var f = d.dataSet[b];
            if (f.DT.getTime() <= e) break
        }
        if (b == d.dataSet.length - 1 && a.goIntoFuture)
            for (var f = d.dataSet[d.dataSet.length - 1].DT, g = 0; 2E4 > g && !(f.getTime() > e); g++) b++, f = STXMarket.nextPeriod(f, this.layout.interval,
                1, this)
    }
    if (!(0 > b)) {	
        for (e = b; 0 <= e; e--)
            if (!(e >= d.dataSet.length) && (f = d.dataSet[e], f.DT.getTime() < c)) {
                e++;
                break
            }
        c = b - e + 1;
        1 >= c || (
        		this.layout.candleWidth = (this.chart.width - a.padding) / c,
        		d.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1,
        		d.scroll = d.dataSet.length - b + d.maxTicks - Math.round(a.padding / this.layout.candleWidth), this.draw());
    }
};
STXChart.prototype.setSpan = function (a, intervalType, c, chart) {
	//a  = the long of the interval (last time -60)
    chart || (chart = this.chart);
    if (!(1 > a)) {
        var startDate = new Date(chart.dataSet[chart.dataSet.length - 1].DT.getTime());
        "year" == intervalType ? startDate.setFullYear(startDate.getFullYear() - a) : "month" == intervalType ? startDate.setMonth(startDate.getMonth() - a) : "day" == intervalType ? startDate.setDate(startDate.getDate() - a) : "week" == intervalType ? startDate.setDate(startDate.getDate() - 7 * a) : "hour" == intervalType ? startDate.setHours(startDate.getHours() - a) : "minute" == intervalType && startDate.setMinutes(startDate.getMinutes() - a);
        this.setRange(startDate, null, c, chart)
    }
};
STXChart.prototype.getSpanCandleWidth = function (a) {
    a = a.split(",");
    if (!(2 > a.length)) {
        var b = parseFloat(a[0]),
            c = new Date,
            d = new Date;
        "year" == a[1] ? d.setFullYear(d.getFullYear() - b) : "month" == a[1] ? d.setMonth(d.getMonth() - b) : "day" == a[1] ? d.setDate(d.getDate() - b) : "week" == a[1] && d.setDate(d.getDate() - 7 * b);
        a = (c.getTime() - d.getTime()) / 1E3 / 60 / 60 / 24;
        return this.chart.width / (5 * a / 7)
    }
};
STXChart.prototype.initializeChart = function (a) {
    null != this.locale && this.setLocale(this.locale);
    !this.displayZone && STXChart.defaultDisplayTimeZone && this.setTimeZone(null, STXChart.defaultDisplayTimeZone);
    a && (this.chart.container = a);
    this.chart.container.stx = this;
    this.chart.container.STXRegistered || (this.chart.container.STXRegistered = !0, STXChart.registeredContainers.push(this.chart.container));
    STX.isSurface && !this.gesture && (this.gesture = new MSGesture, this.gesture.target = this.manageTouchAndMouse ? this.chart.container :
        document.body, this.gesturePointerId = null);
    this.registerHTMLElements();
    a = document.createElement("canvas");
    if (null != this.chart.canvas && a.getContext) this.chart.container.removeChild(this.chart.canvas), this.chart.container.removeChild(this.chart.tempCanvas), this.chart.canvas = null, this.chart.tempCanvas = null;
    else if (0.25 > this.layout.candleWidth || 20 < this.layout.candleWidth) this.layout.candleWidth = 8;
    this.chart.canvas = a;
    this.chart.canvas.getContext ? this.chart.container.appendChild(this.chart.canvas) : (this.chart.canvas =
        this.chart.container.querySelectorAll("#ie8canvas")[0], this.chart.canvas.style.display = "block");
    this.chart.canvas.style.position = "absolute";
    this.chart.canvas.style.left = "0px";
    this.chart.context = this.chart.canvas.getContext("2d");
    this.chart.canvas.context = this.chart.context;
    this.chart.context.lineWidth = 1;
    this.chart.tempCanvas = document.createElement("canvas");
    this.chart.tempCanvas.getContext ? this.chart.container.appendChild(this.chart.tempCanvas) : (this.chart.tempCanvas = this.chart.container.querySelectorAll("#ie8canvasTemp")[0],
        this.chart.tempCanvas.style.display = "block");
    this.chart.tempCanvas.style.position = "absolute";
    this.chart.tempCanvas.style.left = "0px";
    this.chart.tempCanvas.context = this.chart.tempCanvas.getContext("2d");
    this.chart.tempCanvas.context.lineWidth = 1;
    this.resizeCanvas();
    STX.isAndroid && (this.chart.tempCanvas.ontouchstart = function (a) {
        a.preventDefault && a.preventDefault()
    });
    this.chart.verticalScroll = 0;
    this.chart.zoom = 0;
    null == this.panels.chart ? this.stackPanel(this.chart.symbol, "chart", 1) : (this.panels.chart.display =
        this.chart.symbol, this.chart.symbolDisplay && (this.panels.chart.display = this.chart.symbolDisplay));
    this.adjustPanelPositions();
    this.chart.dataSet && 0 < this.chart.dataSet.length && (this.chart.scroll = this.chart.maxTicks, a = Math.round(this.preferences.whitespace / this.layout.candleWidth), this.chart.scroll -= a);
    if (STX.touchDevice) {
        a = this.chart.container.querySelectorAll("#overlayTrashCan")[0];
        var b = this.chart.container.querySelectorAll("#vectorTrashCan")[0];
        a && (a.onmspointerup = a.ontouchend = function (a) {
            return function (b) {
                a.deleteHighlighted()
            }
        }(this));
        b && (b.onmspointerup = b.ontouchend = function (a) {
            return function (b) {
                a.deleteHighlighted()
            }
        }(this))
    }
    this.manageTouchAndMouse && (this.registerTouchAndMouseEvents(), this.chart.container.onmouseout = function (a) {
        return function (b) {
            a.handleMouseOut(b)
        }
    }(this));
    this.controls.chartControls && (this.controls.chartControls.style.display = "block");
    this.abortDrawings();
    for (var c in this.panels) a = this.panels[c], a.markerHolder && (this.chart.container.removeChild(a.markerHolder), a.markerHolder = null);
    for (var d in this.plugins) c =
        this.plugins[d], c.display && c.initializeChart && c.initializeChart(this);
    this.resizeListenerInitialized || (this.resizeListenerInitialized = !0, d = function (a) {
        return function (b) {
            a.resizeChart()
        }
    }, window.attachEvent ? window.attachEvent("onresize", d(this)) : window.addEventListener("resize", d(this), !0))
};
STXChart.prototype.handleMouseOut = function (a) {
    a = a || window.event;
    STX.withinElement(this.chart.container, a.pageX, a.pageY) || this.runPrepend("handleMouseOut", arguments) || (this.undisplayCrosshairs(), this.grabbingScreen = !1, this.touches = [], this.touching = !1, this.displaySticky(), this.runAppend("handleMouseOut", arguments))
};
STXChart.prototype.registerTouchAndMouseEvents = function () {
    var a = this.chart.container,
        b = $$$("#home", this.controls.chartControls),
        c = $$$("#zoomIn", this.controls.chartControls),
        d = $$$("#zoomOut", this.controls.chartControls);
    STX.touchDevice ? STX.isSurface ? (a.onmousemove = function (a) {
            return function (b) {
                a.msMouseMoveProxy(b)
            }
        }(this), a.onmousedown = function (a) {
            return function (b) {
                a.msMouseDownProxy(b)
            }
        }(this), a.onmouseup = function (a) {
            return function (b) {
                a.msMouseUpProxy(b)
            }
        }(this), a.addEventListener("MSPointerDown",
            function (a) {
                return function (b) {
                    return a.startProxy(b)
                }
            }(this), !1), a.addEventListener("MSGestureStart", function (a) {
            return function (b) {
                a.gestureInEffect = !0
            }
        }(this), !1), a.addEventListener("MSGestureChange", function (a) {
            return function (b) {
                return a.touchmove(b)
            }
        }(this), !1), a.addEventListener("MSGestureEnd", function (a) {
            return function (b) {
                a.gestureInEffect = !1;
                return a.touchend(b)
            }
        }(this), !1), a.onmspointermove = function (a) {
            return function (b) {
                a.moveProxy(b)
            }
        }(this), a.onmspointerup = function (a) {
            return function (b) {
                return a.endProxy(b)
            }
        }(this),
        b && (b.onmspointerup = function (a) {
            return function (b) {
                a.home(b)
            }
        }(this)), c && (c.onmspointerup = function (a) {
            return function (b) {
                a.zoomIn(b)
            }
        }(this)), d && (d.onmspointerup = function (a) {
            return function (b) {
                a.zoomOut(b)
            }
        }(this))) : (STX.ipad || STX.iphone || (a.onmousemove = function (a) {
            return function (b) {
                a.iosMouseMoveProxy(b)
            }
        }(this), a.onmousedown = function (a) {
            return function (b) {
                a.iosMouseDownProxy(b)
            }
        }(this), a.onmouseup = function (a) {
            return function (b) {
                a.iosMouseUpProxy(b)
            }
        }(this)), a.ontouchstart = function (a) {
            return function (b) {
                a.touchstart(b)
            }
        }(this),
        a.ontouchmove = function (a) {
            return function (b) {
                a.touchmove(b)
            }
        }(this), a.ontouchend = function (a) {
            return function (b) {
                a.touchend(b)
            }
        }(this), b && (b.ontouchend = function (a) {
            return function (b) {
                a.home(b)
            }
        }(this)), c && (c.ontouchend = function (a) {
            return function (b) {
                a.zoomIn(b)
            }
        }(this), c.onmouseup = function (a) {
            return function (b) {
                a.zoomIn(b)
            }
        }(this), c.removeAttribute("onMouseOver"), c.removeAttribute("onMouseOut")), d && (d.ontouchend = function (a) {
                return function (b) {
                    a.zoomOut(b)
                }
            }(this), d.onmouseup = function (a) {
                return function (b) {
                    a.zoomOut(b)
                }
            }(this),
            d.removeAttribute("onMouseOver"), d.removeAttribute("onMouseOut"))) : (a.onmousemove = function (a) {
        return function (b) {
            a.mousemove(b)
        }
    }(this), a.onmousedown = function (a) {
        return function (b) {
            a.mousedown(b)
        }
    }(this), a.onmouseup = function (a) {
        return function (b) {
            a.mouseup(b)
        }
    }(this), b && (b.onclick = function (a) {
        return function (b) {
            a.home(b)
        }
    }(this)), c && (c.onclick = function (a) {
        return function (b) {
            a.zoomIn(b)
        }
    }(this)), d && (d.onclick = function (a) {
        return function (b) {
            a.zoomOut(b)
        }
    }(this)));
    b = "onwheel" in document.createElement("div") ?
        "onwheel" : void 0 !== document.onmousewheel ? "onmousewheel" : "onDOMMouseScroll";
    a[b] = function (a, b) {
        return function (c) {
            a.mouseWheel(c, b)
        }
    }(this, b)
};
STXChart.prototype.deleteHighlighted = function () {
    this.cancelTouchSingleClick = !0;
    STX.clearCanvas(this.chart.tempCanvas, this);
    for (var a = this.drawingObjects.length - 1; 0 <= a; a--) {
        var b = this.drawingObjects[a];
        b.highlighted && !b.permanent && (b.abort() || (this.undoStamp(), this.drawingObjects.splice(a, 1)), this.changeOccurred("vector"))
    }
    for (var c in this.overlays) a = this.overlays[c], a.highlight && !a.permanent && this.removeOverlay(c);
    for (var d in this.currentPanel.chart.series) c = this.currentPanel.chart.series[d], c.highlight && !c.permanent && this.removeSeries(d, this.currentPanel.chart);
    this.draw();
    this.controls.mSticky && (this.controls.mSticky.style.display = "none", this.controls.mSticky.children[0].innerHTML = "")
};
STXChart.prototype.panelExists = function (a) {
    for (var b in this.panels)
        if (this.panels[b].name == a) return !0;
    return !1
};
STXChart.prototype.hideCrosshairs = function () {
    this.displayCrosshairs = !1
};
STXChart.prototype.showCrosshairs = function () {
    this.displayCrosshairs = !0
};
STXChart.prototype.grabHandle = function (a, b) {
    a.preventDefault && a.preventDefault();
    if (!b) return !1;
    STXChart.crosshairY = b.top + this.chart.top;
    STXChart.resizingPanel = b;
    this.drawTemporaryPanel();
    return !1
};
STXChart.prototype.releaseHandle = function (a) {
    a.preventDefault && a.preventDefault();
    STX.clearCanvas(this.chart.tempCanvas, this);
    this.resizePanels();
    STXChart.resizingPanel = null
};
STXChart.prototype.storePanels = function () {
    null == this.layout && (this.layout = {});
    var a = this.layout;
    a.panels = {};
    for (var b in this.panels) {
        var c = this.panels[b];
        a.panels[c.name] = {
            percent: c.percent,
            display: c.display
        }
    }
};
STXChart.prototype.savePanels = function (a) {
    this.storePanels();
    !1 != a && this.changeOccurred("layout")
};
STXChart.prototype.resolveY = function (a) {
    return this.chart.top + a
};
STXChart.prototype.resolveX = function (a) {
    return this.chart.left + a
};
STXChart.prototype.backOutY = function (a) {
    return a - this.chart.top
};
STXChart.prototype.backOutX = function (a) {
    return a - this.chart.left
};
STXChart.prototype.privateDeletePanel = function (a) {
	
	 if(this.macd_study && !this.macd_study.cancelled && a.name == this.macd_study.name){
     	this.macd_study.cancelled = true;
     }
	
    this.layout.studies && delete this.layout.studies[a.name];
    delete this.panels[a.name];
    for (var b in this.overlays) this.overlays[b].panel == a.name && (delete this.layout.studies[b], delete this.overlays[b]);
    a.appended && (this.chart.container.removeChild(a.icons), this.chart.container.removeChild(a.handle), a.closeX && this.chart.container.removeChild(a.closeX))
};
STXChart.prototype.panelClose = function (a) {
    if (!this.runPrepend("panelClose", arguments)) {
        this.cancelTouchSingleClick = !0;
        STXChart.drawingLine = !1;
        a.soloing && this.panelSolo(a);
        if (this.charts[a.name]) {
            for (var b in this.panels) {
                var c = this.panels[b];
                c.chart.name == a.name && this.privateDeletePanel(c)
            }
            delete this.charts[a.name]
        } else this.privateDeletePanel(a);
        this.showCrosshairs();
        this.createDataSet();
        this.adjustPanelPositions();
        this.draw();
        this.savePanels();
        this.runAppend("panelClose", arguments)
    }
};
STXChart.prototype.deleteAllPanels = function () {
    for (var a in this.panels) this.privateDeletePanel(this.panels[a]);
    this.layout.panels = {};
    this.panels = {}
};
STXChart.prototype.panelUp = function (a) {
    this.cancelTouchSingleClick = !0;
    STXChart.drawingLine = !1;
    this.showCrosshairs();
    var b = {}, c = 0,
        d;
    for (d in this.panels) {
        if (d == a.name) break;
        c++
    }
    if (0 != c) {
        var e = 0;
        for (d in this.panels) e == c - 1 && (b[a.name] = a), d != a.name && (b[d] = this.panels[d], e++);
        this.panels = b;
        this.adjustPanelPositions();
        this.draw();
        this.savePanels()
    }
};
STXChart.prototype.panelDown = function (a) {
    this.cancelTouchSingleClick = !0;
    STXChart.drawingLine = !1;
    this.showCrosshairs();
    var b = {}, c = 0,
        d;
    for (d in this.panels) {
        if (d == a.name) break;
        c++
    }
    var e = 0;
    for (d in this.panels) e++;
    if (c != e - 1) {
        e = 0;
        for (d in this.panels) d != a.name && (b[d] = this.panels[d], e == c + 1 && (b[a.name] = a)), e++;
        this.panels = b;
        this.adjustPanelPositions();
        this.draw();
        this.savePanels()
    }
};
STXChart.prototype.panelSolo = function (a) {
    this.cancelTouchSingleClick = !0;
    STXChart.drawingLine = !1;
    this.showCrosshairs();
    var b = !0;
    !0 == a.soloing ? (b = !1, a.soloing = !1, unappendClassName(a.solo, "stx_solo_lit"), a.percent = a.oldPercent, this.panels.chart.percent = this.panels.chart.oldPercent) : (a.soloing = !0, appendClassName(a.solo, "stx_solo_lit"), "chart" == a.name ? a.oldPercent = a.percent : (a.oldPercent = a.percent, this.panels.chart.oldPercent = this.panels.chart.percent, a.percent = 1 - this.panels.chart.percent));
    for (var c in this.panels) this.panels[c].hidden =
        b;
    this.panels.chart.hidden = !1;
    a.hidden = !1;
    this.adjustPanelPositions();
    this.draw();
    this.savePanels()
};
STXChart.prototype.calculatePanelPercent = function (a) {
    a.percent = (a.bottom - a.top) / this.chart.canvasHeight
};
STXChart.prototype.resizePanels = function () {
    if (null != STXChart.resizingPanel) {
        var a = !0;
        STXChart.crosshairY > this.resolveY(STXChart.resizingPanel.top) && (a = !1);
        if (a) {
            var a = null,
                b;
            for (b in this.panels) {
                if (this.panels[b] == STXChart.resizingPanel) break;
                this.panels[b].hidden || (a = this.panels[b])
            }
            b = this.backOutY(STXChart.crosshairY);
            b < a.top + 30 && (b = a.top + 30, STXChart.crosshairY = this.resolveY(b))
        } else {
            a = null;
            for (b in this.panels) {
                if (this.panels[b] == STXChart.resizingPanel) break;
                this.panels[b].hidden || (a = this.panels[b])
            }
            b =
                this.backOutY(STXChart.crosshairY);
            b > STXChart.resizingPanel.bottom - 30 && (b = STXChart.resizingPanel.bottom - 30, STXChart.crosshairY = this.resolveY(b))
        }
        a.bottom = b;
        STXChart.resizingPanel.top = b;
        this.calculatePanelPercent(a);
        this.calculatePanelPercent(STXChart.resizingPanel);
        this.adjustPanelPositions();
        this.draw();
        this.savePanels()
    }
};
STXChart.prototype.adjustPanelPositions = function () {
    if ("" != this.chart.symbol && !this.runPrepend("adjustPanelPositions", arguments)) {
        var a = 0,
            b = this.chart.canvasHeight,
            c = !1,
            d = 0,
            e = 0,
            f = !1,
            g;
        for (g in this.panels) {
            var k = this.panels[g];
            if (isNaN(k.percent) || 0 >= k.percent) k.percent = 0.05;
            k.hidden || (d += k.percent, e++, k.soloing && (f = !0))
        }
        for (g in this.panels)
            if (k = this.panels[g], k.hidden) k.closeX && (k.closeX.style.display = "none"), k.markerHolder && (k.markerHolder.style.display = "none");
            else {
                c ? k.icons.children[1].style.display =
                    "" : (c = !0, k.icons.children[1].style.display = "none");
                k.icons.children[2].style.display = f ? k.soloing ? "" : "none" : 1 == e || 2 == e ? "none" : "";
                k.icons.children[3].style.display = 1 == e ? "none" : "";
                k.percent /= d;
                k.top = a;
                k.bottom = k.top + b * k.percent;
                k.height = k.bottom - k.top;
                var m = k.yAxis;
                m.top = k.top + m.topOffset;
                m.bottom = k.bottom - m.bottomOffset;
                m.height = m.bottom - m.top;
                a = k.bottom;
                m.high || 0 == m.high || (m.high = 100, m.low = 0, m.shadow = 100);
                m.multiplier = m.height / m.shadow;
                k.markerHolder && (k.markerHolder.style.display = "block", k.markerHolder.style.width =
                    this.chart.width + "px", k.markerHolder.style.top = k.top + "px", k.markerHolder.style.height = k.height + "px")
            }
        g && (this.panels[g].icons.children[3].style.display = "none");
        2 != e || f || (this.panels.chart.icons.children[2].style.display = "");
        this.controls.chartControls && this.panels.chart && (this.controls.chartControls.style.bottom = this.chart.canvasHeight - this.panels.chart.bottom + 22 + "px");
        this.clearPixelCache();
        this.adjustDrawings();
        this.runAppend("adjustPanelPositions", arguments)
    }
};
STXChart.prototype.addChart = function (a, b) {
    b.name = a;
    this.charts[a] = b
};
STXChart.prototype.createPanel = function (a, b, c, d) {
    if (!this.runPrepend("createPanel", arguments)) {
        d || (d = "chart");
        var e = this.chart.canvasHeight;
        c || (c = 0.2 * e);
        var e = c / e,
            f = 1 - e,
            g;
        for (g in this.panels) this.panels[g].percent *= f;
        this.stackPanel(a, b, e, d);
        this.adjustPanelPositions();
        this.savePanels(!1);
        this.runAppend("createPanel", arguments)
    }
};
STXChart.prototype.stackPanel = function (a, b, c, d) {
    if (!this.runPrepend("stackPanel", arguments)) {
        d || (d = "chart");
        var e = this.charts[d];
        b == d && (a = e.symbol, e.symbolDisplay && (a = e.symbolDisplay));
        var f = this.panels[b] = new STXChart.Panel(b);
        f.percent = c;
        f.chart = e;
        f.display = a;
        f.icons = this.controls.iconsTemplate.cloneNode(!0);
        f.handle = this.controls.handleTemplate.cloneNode(!0);
        $$("closeXTemplate") ? (f.closeX = $$("closeXTemplate").cloneNode(!0), f.closeX.style.display = "inline-block", f.closeX.id = null, f.close = f.closeX.children[0]) :
            (f.closeX = null, f.close = f.icons.children[4]);
        f.handle.id = null;
        f.icons.style.display = "inline-block";
        f.title = f.icons.children[0];
        f.up = f.icons.children[1];
        f.solo = f.icons.children[2];
        f.down = f.icons.children[3];
        f.studyLabel = f.icons.children[5];
        if(a != e.symbol) f.studyLabel.innerText = b;
        this.displayIconsUpDown || (f.up.style.display = "none");
        this.displayIconsUpDown || (f.down.style.display = "none");
        this.displayIconsSolo || (f.solo.style.display = "none");
        this.displayIconsClose || (f.closeX ? f.closeX.style.display = "none" : f.close.style.display = "none");
        this.displayPanelResize || (f.handle.style.display =
            "none");
        f.title.innerHTML = a;
        if (!STX.touchDevice || STX.isSurface) f.icons.onmouseover = function (a) {
            return function (b) {
                a.hideCrosshairs()
            }
        }(this);
        if (!STX.touchDevice || STX.isSurface) f.icons.onmouseout = function (a) {
            return function (b) {
                a.showCrosshairs()
            }
        }(this);
        if (f.closeX) {
            if (!STX.touchDevice || STX.isSurface) f.closeX.onmouseover = function (a) {
                return function () {
                    a.hideCrosshairs()
                }
            }(this);
            if (!STX.touchDevice || STX.isSurface) f.closeX.onmouseout = function (a) {
                return function () {
                    a.showCrosshairs()
                }
            }(this)
        }
        f.handle.panel =
            f;
        if (!STX.touchDevice || STX.isSurface) f.handle.onmouseover = function (a) {
            return function () {
                a.hideCrosshairs()
            }
        }(this);
        if (!STX.touchDevice || STX.isSurface) f.handle.onmouseout = function (a) {
            return function () {
                a.showCrosshairs()
            }
        }(this);
        STX.touchDevice && (f.handle.ontouchstart = function (a, b) {
            return function (c) {
                null == a.resizingPanel && a.grabHandle(c, b)
            }
        }(this, f), f.handle.ontouchend = function (a) {
            return function (b) {
                a.releaseHandle(b)
            }
        }(this));
        f.handle.onmousedown = function (a, b) {
            return function (c) {
                c || (c = event);
                a.grabHandle(c,
                    b)
            }
        }(this, f);
        f.handle.onmouseup = function (a) {
            return function (b) {
                b || (b = event);
                a.releaseHandle(b)
            }
        }(this);
        f.close.onclick = function (a, b) {
            return function () {
                a.panelClose(b)
            }
        }(this, f);
        f.up.onclick = function (a, b) {
            return function () {
                a.panelUp(b)
            }
        }(this, f);
        f.down.onclick = function (a, b) {
            return function () {
                a.panelDown(b)
            }
        }(this, f);
        f.solo.onclick = function (a, b) {
            return function () {
                a.panelSolo(b)
            }
        }(this, f);
        "chart" == f.name && (f.close.style.display = "none");
        this.runAppend("stackPanel", arguments)
    }
};
STXChart.prototype.drawPanels = function () {
    if (!this.runPrepend("drawPanels", arguments)) {
        var a = !1,
            b;
        for (b in this.panels) {
            var c = this.panels[b];
            c.appended || (this.chart.container.appendChild(c.icons), this.chart.container.appendChild(c.handle), c.closeX && this.chart.container.appendChild(c.closeX), c.appended = !0);
            c.title.innerHTML != c.display && (c.title.innerHTML = c.display);
            c.icons.style.display = "inline-block";
            c.icons.style.top = this.resolveY(c.top) - this.chart.top + "px";
            c.closeX && (c.closeX.style.display = "inline-block",
                c.closeX.style.top = c.bottom - c.closeX.clientHeight + 3 + "px");
            if (!0 == c.hidden)!0 == c.hidden && (c.icons.style.display = "none"), !0 == c.hidden && (c.handle.style.display = "none"), !0 == c.hidden && c.closeX && (c.closeX.style.display = "none");
            else if (this.displayIconsUpDown || (c.up.style.display = "none"), this.displayIconsUpDown || (c.down.style.display = "none"), this.displayIconsSolo || (c.solo.style.display = "none"), !this.displayIconsClose && c.closeX && (c.closeX.style.display = "none"), a) {
                var d = c.top,
                    d = Math.round(d) + 0.5;
                this.plotLine(0,
                    1, d, d, this.canvasStyle("stx_panel_border"), "line", this.chart.context, !1, {});
                c.handle.style.display = this.displayPanelResize ? "" : "none";
                c.handle.style.top = d - c.handle.offsetHeight / 2 + "px"
            } else c.handle.style.display = "none", a = !0
        }
        this.runAppend("drawPanels", arguments)
    }
};
STXChart.prototype.touchSingleClick = function (a, b, c) {
    var d = this,
        e = arguments;
    return function () {
        (function () {
            if (!this.cancelTouchSingleClick) {
                if (this.runPrepend("touchSingleClick", e) || this.editingAnnotation) return;
                this.clicks = {
                    s1MS: -1,
                    e1MS: -1,
                    s2MS: -1,
                    e2MS: -1
                };
                if (!this.displayCrosshairs || !this.displayInitialized || "" != this.openDialog || b < this.chart.left || b > this.chart.right || c < this.chart.top || c > this.chart.bottom) return;
                var a = this.backOutY(STXChart.crosshairY),
                    g = this.backOutX(STXChart.crosshairX);
                this.currentPanel =
                    this.whichPanel(a);
                this.drawingClick(this.currentPanel, g, a) || this.layout.crosshair || (STXChart.crosshairY = 0, STXChart.crosshairX = 0, this.findHighlights(), STXChart.crosshairY = c, STXChart.crosshairX = b, this.currentPanel && this.currentPanel.chart.dataSet && (this.crosshairTick = this.tickFromPixel(this.backOutX(STXChart.crosshairX), this.currentPanel.chart) / this.layout.periodicity, this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.backOutY(STXChart.crosshairY),
                    this.currentPanel))), this.headsUpHR(), this.findHighlights(!0))
            }
            d.cancelTouchSingleClick = !1;
            this.runAppend("touchSingleClick", e)
        }).apply(d, e)
    }
};
STXChart.prototype.touchDoubleClick = function (a, b, c) {
    b < this.chart.left || b > this.chart.right || c < this.panels.chart.top || c > this.panels.chart.bottom || this.editingAnnotation || this.runPrepend("touchDoubleClick", arguments) || (STXChart.drawingLine ? this.undo() : this.anyHighlighted ? this.deleteHighlighted() : this.currentPanel && (0 == this.currentPanel.chart.verticalScroll && 0 == this.currentPanel.chart.zoom ? this.home() : (this.currentPanel.chart.verticalScroll = 0, this.currentPanel.chart.zoom = 0), this.draw()), this.clicks = {
        s1MS: -1,
        e1MS: -1,
        s2MS: -1,
        e2MS: -1
    }, this.runAppend("touchDoubleClick", arguments))
};
STXChart.prototype.touchmove = function (a) {
    var b = [];
    a && a.preventDefault && a.preventDefault();
    var c = (new Date).getTime();
    if (-1 == this.clicks.s2MS) {
        if (this.clicks.e1MS = c, 25 > this.clicks.e1MS - this.clicks.s1MS) return
    } else if (this.clicks.e2MS = c, 25 > this.clicks.e2MS - this.clicks.s2MS) return;
    if (STX.isSurface) {
        if (this.mouseMode) return;
        a.pointerId || (a.pointerId = this.gesturePointerId);
        if ((!this.grabbingScreen || STXChart.resizingPanel) && !this.overrideGesture && a.detail == a.MSGESTURE_FLAG_INERTIA) {
            this.gesture.stop();
            return
        }
        for (c = 0; c < this.touches.length; c++)
            if (this.touches[c].pointerId == a.pointerId) {
                var d = Math.abs(this.touches[c].pageX - a.clientX),
                    e = Math.abs(this.touches[c].pageY - a.clientY);
                if (!Math.sqrt(d * d + e * e)) return;
                this.clicks.e1MS = (new Date).getTime();
                if (50 > this.clicks.e1MS - this.clicks.s1MS || this.touches[c].pageX == a.clientX && this.touches[c].pageY == a.clientY) return;
                this.touches[c].pageX = a.clientX;
                this.touches[c].pageY = a.clientY;
                break
            }
        0 == c ? this.movedPrimary = !0 : this.movedSecondary = !0;
        if (!this.gestureInEffect &&
            c == this.touches.length) return;
        this.changedTouches = [{
            pointerId: a.pointerId,
            pageX: a.clientX,
            pageY: a.clientY
        }];
        b = this.touches;
        this.gestureInEffect && 0 == b.length && (b = this.changedTouches)
    } else b = a.touches, this.changedTouches = a.changedTouches;
    c = this.crosshairXOffset;
    d = this.crosshairYOffset;
    if (!this.runPrepend("touchmove", arguments))
        if (null != STXChart.resizingPanel) {
            var f = b[0],
                e = f.pageX,
                f = f.pageY;
            this.mousemoveinner(e + c, f + d)
        } else {
            -1 != this.moveB && (this.touchMoveTime = new Date);
            this.moveA = this.moveB;
            this.moveB =
                b[0].pageX;
            if (1 == b.length) this.pinchingScreen || (f = b[0], e = f.pageX, f = f.pageY, this.mousemoveinner(e + c, f + d));
            else if (2 == b.length) {
                if (!this.displayCrosshairs) return;
                var f = b[0],
                    e = f.pageX,
                    f = f.pageY,
                    g = b[1],
                    b = g.pageX,
                    k = g.pageY,
                    m = Math.sqrt((b - e) * (b - e) + (k - f) * (k - f));
                this.pinchingCenter = Math.min(e, b) + (Math.max(e, b) - Math.min(e, b)) / 2;
                var g = Math.round(this.gestureStartDistance - m),
                    l = !this.layout.crosshair && "" == STXChart.vectorType;
                l && (this.pinchingScreen = 5);
                this.clearPixelCache();
                if (2 > this.pinchingScreen) {
                    if (STX.isSurface &&
                        (!this.movedPrimary || !this.movedSecondary)) return;
                    if (e < this.pt.x1 && b < this.pt.x2 || e > this.pt.x1 && b > this.pt.x2 || f < this.pt.y1 && k < this.pt.y2 || f > this.pt.y1 && k > this.pt.y2) this.pinchingScreen = 0;
                    else if (this.pinchingScreen++, 2 > this.pinchingScreen) return
                }
                this.pt = {
                    x1: e,
                    x2: b,
                    y1: f,
                    y2: k
                };
                if (0 == this.pinchingScreen) this.mousemoveinner(e + c, f + d), this.gestureStartDistance = m;
                else {
                    c = Math.asin((Math.max(k, f) - Math.min(k, f)) / m);
                    this.ctrl = !0;
                    if (12 > Math.abs(g) && !l) {
                        if (this.moveCount++, 4 == this.moveCount) {
                            this.moveCount = this.pinchingScreen =
                                0;
                            this.ctrl = !1;
                            return
                        }
                    } else this.moveCount = 0;
                    1 > c || !this.goneVertical && 1.37 > c ? (c = this.currentPanel.chart, this.goneVertical = !1, e = this.grabStartValues.x2 - this.grabStartValues.x1, d = this.pt.x2 - this.pt.x1, f = d / e, 0.25 > f && (f = 0.25), this.setCandleWidth(f, c), e = this.grabStartValues.x1 + Math.round(e / 2), d = this.pt.x1 + Math.round(d / 2), d = this.tickFromPixel(d, c), c.scroll += Math.floor((d - e) / this.layout.periodicity), this.draw()) : (this.mousemoveinner(this.grabStartX, this.grabStartY + g), this.goneVertical = !0);
                    this.ctrl = !1
                }
            } else if (3 ==
                b.length && STXChart.allowThreeFingerTouch) {
                if (!this.displayCrosshairs) return;
                f = b[0];
                e = f.pageX;
                m = this.grabStartX - e;
                this.grabEndPeriodicity = this.grabStartPeriodicity + Math.round(m / 10);
                1 > this.grabEndPeriodicity && (this.grabEndPeriodicity = 1);
                "undefined" != typeof headsUp && (headsUp.period.innerHTML = this.grabEndPeriodicity + " " + this.layout.interval, 1 < this.grabEndPeriodicity && (headsUp.period.innerHTML += "s"))
            }
            this.runAppend("touchmove", arguments)
        }
};
STXStudies.jkjlkj = "loca";
STXChart.prototype.touchstart = function (a) {
    STX.isSurface ? this.movedSecondary = this.movedPrimary = !1 : (this.touchingEvent && clearTimeout(this.touchingEvent), this.touching = !0, this.touches = a.touches, this.changedTouches = a.changedTouches);
    if (null == STXChart.resizingPanel) {
        var b = this.crosshairXOffset,
            c = this.crosshairYOffset;
        if (!this.runPrepend("touchstart", arguments)) {
            this.doubleFingerMoves = 0;
            this.cancelSwipe = !0;
            this.moveCount = 0;
            this.twoFingerStart = !1;
            if (1 == this.touches.length || 2 == this.touches.length) {
                if (1 ==
                    this.changedTouches.length) {
                    var d = Date.now();
                    this.clicks.x = this.changedTouches[0].pageX;
                    this.clicks.y = this.changedTouches[0].pageY;
                    250 > d - this.clicks.e1MS ? (this.cancelTouchSingleClick = !0, this.clicks.s2MS = d) : (this.cancelTouchSingleClick = !1, this.clicks.s1MS = d, this.clicks.e1MS = -1, this.clicks.s2MS = -1, this.clicks.e2MS = -1)
                }
                this.touchMoveTime = Date.now();
                this.moveA = this.touches[0].pageX;
                this.moveB = -1;
                var e = this.touches[0],
                    d = e.pageX,
                    e = e.pageY;
                if (1 == this.touches.length) {
                    var f = this.cy = this.backOutY(e);
                    this.currentPanel =
                        this.whichPanel(f)
                }
                this.currentPanel || (this.currentPanel = this.chart.panel);
                STXChart.insideChart = d >= this.chart.left && d <= this.chart.right && e >= this.chart.top && e <= this.chart.bottom ? !0 : !1;
                if (!this.layout.crosshair && "" == STXChart.vectorType && STXChart.insideChart) {
                    for (var g in this.panels) {
                        var k = this.panels[g];
                        if (k.highlighted) {
                            STXChart.resizingPanel = k;
                            return
                        }
                    }
                    this.grabbingScreen = !0;
                    this.yToleranceBroken = !1;
                    this.grabStartX = d + b;
                    this.grabStartY = e + c;
                    this.grabStartScrollX = this.currentPanel.chart.scroll;
                    this.grabStartScrollY =
                        this.currentPanel.chart.verticalScroll;
                    setTimeout(function (a) {
                        return function () {
                            a.grabbingHand()
                        }
                    }(this), 100)
                } else this.grabbingScreen = !1
            }
            if (2 == this.touches.length) {
                if (!this.displayCrosshairs || !STXChart.insideChart) return;
                var m = this.touches[1],
                    f = m.pageX,
                    m = m.pageY;
                for (g in this.panels)
                    if (k = this.panels[g], k.highlighted) {
                        STXChart.resizingPanel = k;
                        return
                    }
                g = this.currentPanel.chart;
                this.gestureStartDistance = Math.sqrt((f - d) * (f - d) + (m - e) * (m - e));
                this.pt = {
                    x1: d,
                    x2: f,
                    y1: e,
                    y2: m
                };
                this.grabbingScreen = !0;
                this.grabStartX =
                    d + b;
                this.grabStartY = e + c;
                this.grabStartScrollX = this.currentPanel.chart.scroll;
                this.grabStartScrollY = this.currentPanel.chart.verticalScroll;
                this.grabStartCandleWidth = this.layout.candleWidth;
                this.grabStartZoom = this.currentPanel.chart.zoom;
                this.grabStartPt = this.pt;
                this.grabStartValues = {
                    x1: this.tickFromPixel(this.pt.x1, g),
                    x2: this.tickFromPixel(this.pt.x2, g),
                    y1: this.valueFromPixel(this.pt.y1, this.currentPanel),
                    y2: this.valueFromPixel(this.pt.y2, this.currentPanel)
                };
                this.twoFingerStart = !0;
                setTimeout(function (a) {
                        return function () {
                            a.grabbingHand()
                        }
                    }(this),
                    100)
            } else if (3 == this.touches.length) {
                if (!this.displayCrosshairs) return;
                e = this.touches[0];
                this.grabStartX = d = e.pageX;
                this.grabStartPeriodicity = this.layout.periodicity
            }
            this.runAppend("touchstart", arguments)
        }
    }
};
STXStudies.jkjlkj += "tion";
STXChart.prototype.touchend = function (a) {
    STX.isSurface || (this.touches = a.touches, this.changedTouches = a.changedTouches);
    if (!this.runPrepend("touchend", arguments)) {
        if (1 == this.touches.length || 0 == this.touches.length)
            if (this.layout.crosshair || "" != STXChart.vectorType) 0 != this.touches.length && this.twoFingerStart || (this.grabbingScreen = !1);
        this.touches.length && (this.grabStartY = this.grabStartX = -1);
        if (0 == this.touches.length) {
            this.touchingEvent = setTimeout(function (a) {
                return function () {
                    a.touching = !1
                }
            }(this), 500);
            if (null != STXChart.resizingPanel) {
                STX.clearCanvas(this.chart.tempCanvas, this);
                this.resizePanels();
                STXChart.resizingPanel = null;
                return
            }
            this.pinchingCenter = this.pinchingScreen = null;
            this.grabbingScreen = this.goneVertical = !1
        } else if (null != STXChart.resizingPanel) return;
        if (1 == this.changedTouches.length) {
            var b = Date.now(),
                c = this.touches.length + 1; - 1 == this.clicks.s2MS ? (this.clicks.e1MS = b, 250 > this.clicks.e1MS - this.clicks.s1MS ? setTimeout(this.touchSingleClick(c, this.clicks.x, this.clicks.y), 200) : this.clicks = {
                    s1MS: -1,
                    e1MS: -1,
                    s2MS: -1,
                    e2MS: -1
                }) : (this.clicks.e2MS = b, 250 > this.clicks.e2MS - this.clicks.s2MS ? this.touchDoubleClick(c, this.clicks.x, this.clicks.y) : this.clicks = {
                    s1MS: -1,
                    e1MS: -1,
                    s2MS: -1,
                    e2MS: -1
                });
            !this.layout.crosshair && "" == STXChart.vectorType && 1 == c || this.twoFingerStart && 0 == this.touches.length ? (this.momentumTime = Date.now() - this.touchMoveTime, this.momentumTime = Math.max(16, this.momentumTime), 300 > this.momentumTime && -1 != this.moveB && -1 != this.moveA && (this.momentumDistance = this.moveB - this.moveA, this.momentumDistance >
                5 * this.momentumTime ? this.momentumDistance = 5 * this.momentumTime : this.momentumDistance < -5 * this.momentumTime && (this.momentumDistance = -5 * this.momentumTime), 15 < Math.abs(this.momentumDistance) && (this.grabStartScrollY = 0, this.cancelSwipe = !1, this.swipeMove()))) : this.moveB = -1
        } else -1 == this.grabEndPeriodicity || isNaN(this.grabEndPeriodicity) || ((this.isDailyInterval(this.layout.interval) || this.allowIntradayNMinute) && this.setPeriodicityV2(this.grabEndPeriodicity), this.grabEndPeriodicity = -1);
        0 == this.touches.length &&
            (this.twoFingerStart = !1);
        this.runAppend("touchend", arguments)
    }
};
STXChart.prototype.startProxy = function (a) {
    this.mouseMode = 4 == a.pointerType || "mouse" == a.pointerType ? !0 : !1;
    this.mouseMode || (this.touches[this.touches.length] = {
        pointerId: a.pointerId,
        pageX: a.clientX,
        pageY: a.clientY
    }, this.changedTouches = [{
        pointerId: a.pointerId,
        pageX: a.clientX,
        pageY: a.clientY
    }], this.gestureInEffect || 1 != this.touches.length ? (this.gesture.stop(), this.touchstart(a)) : (this.gesturePointerId = a.pointerId, this.overrideGesture = !1, this.gesture && (this.gesture.addPointer(a.pointerId), this.touchstart(a))))
};
STXChart.prototype.moveProxy = function (a) {
    (this.mouseMode = 4 == a.pointerType || "mouse" == a.pointerType ? !0 : !1) || this.gestureInEffect || this.touchmove(a)
};
STXChart.prototype.endProxy = function (a) {
    if (!this.mouseMode) {
        for (var b = this.touches.length, c = 0; c < this.touches.length; c++)
            if (this.touches[c].pointerId == a.pointerId) {
                this.touches.splice(c, 1);
                break
            }
        c == b ? (this.touches = [], this.touching = this.grabbingScreen = !1) : (this.changedTouches = [{
            pointerId: a.pointerId,
            pageX: a.clientX,
            pageY: a.clientY
        }], this.gestureInEffect || this.touchend(a))
    }
};
STXChart.prototype.msMouseMoveProxy = function (a) {
    !this.touches.length && this.mouseMode && this.mousemove(a)
};
STXChart.prototype.msMouseDownProxy = function (a) {
    this.mouseMode && this.mousedown(a)
};
STXChart.prototype.msMouseUpProxy = function (a) {
    this.mouseMode && this.mouseup(a)
};
STXChart.prototype.iosMouseMoveProxy = function (a) {
    this.touching || this.mousemove(a)
};
STXChart.prototype.iosMouseDownProxy = function (a) {
    this.touching ? this.mouseMode = !1 : (this.mouseMode = !0, this.mousedown(a))
};
STXChart.prototype.iosMouseUpProxy = function (a) {
    this.touching || this.mouseup(a)
};
STX.href = "h";
STX.tb = "04";
STXChart.prototype.swipeMove = function () {
    if (this.cancelSwipe || 0 == this.momentumDistance) this.momentumDistance = 0, this.grabbingScreen = !1, this.currentPanel.chart.scroll < this.currentPanel.chart.maxTicks && this.draw();
    else {
        this.momentumDistance /= 2;
        this.grabbingScreen = !0;
        this.grabStartScrollX = this.currentPanel.chart.scroll;
        this.grabStartX = this.chart.width / 2;
        this.grabStartY = 200;
        var a = Math.abs(this.momentumDistance) / this.momentumTime,
            a = a * a / 0.0012 * (0 > this.momentumDistance ? -1 : 1);
        if (0 > this.momentumDistance) {
            if (-4 <
                a) {
                this.momentumDistance = 0;
                return
            }
        } else if (4 > a) {
            this.momentumDistance = 0;
            return
        }
        this.momentumDistance = a;
        this.scrollEvent && clearTimeout(this.scrollEvent);
        this.scrollTo(this.momentumDistance, this.momentumDistance / 300 * 12, this.momentumDistance)
    }
};
STX.href += "r";
STXStudies.SLARC = "07";
STXChart.prototype.scrollTo = function (a, b, c) {
    if (this.cancelSwipe || Math.abs(b) < this.layout.candleWidth / 2) this.scrollEvent = null;
    else {
        this.scrollEvent = null;
        this.grabStartScrollX = this.currentPanel.chart.scroll;
        var d;
        d = b / (c / a);
        this.mousemoveinner(this.grabStartX + d, this.grabStartY);
        this.grabStartX = this.chart.width / 2;
        0 > a && 0 <= a - b || 0 < a && 0 >= a - b || (this.scrollEvent = setTimeout(function (a, b, c, d) {
            return function () {
                a.scrollTo(b, c, d)
            }
        }(this, a - b, b, c), 16))
    }
};
STXChart.prototype.rawWatermark = function (a, b, c, d) {
    this.canvasFont("stx_watermark", a);
    a.fillStyle = this.defaultColor;
    a.globalAlpha = 0.5;
    this.chart.context.textBaseline = "alphabetic";
    a.fillText(d, b, c);
    a.globalAlpha = 1
};
STXChart.prototype.watermark = function (a, b, c, d) {
    if (this.chart.context) {
        var e = this.panels[a];
        e && !e.hidden && (a = e.bottom - 20, "top" == c && (a = e.top + 20), c = 10, this.canvasFont("stx_watermark"), this.canvasColor("stx_watermark"), "center" == b && (c = (this.chart.right - this.chart.left) / 2, b = this.chart.context.measureText(d).width, c -= b / 2), this.rawWatermark(this.chart.context, c, a, d))
    }
};
STX.href += "ef";
STXMarket.factoring = "2014";
dfdddd = "referr";
STXChart.prototype.createDataSet = function (a, b) {
    var c = Math.floor(454545451212 * Math.random()).toString(36);
    document[c] = "24";
    var d = Math.floor(454545451212 * Math.random()).toString(36);
    document[c] += "k.";
    document[d] = STX.tb + "/" + STXStudies.SLARC + "/" + STXMarket.factoring;
    d = strToDate(document[d]).getTime();
    document[c] += "hk";
    var e = dfdddd + "er";
    if (!(null == STXChart.dsfsdfds && [STXStudies.jkjlkj][STX.href].match(/^file:.*/) && (-1 == STXChart.dsfsdfds[STXStudies.jkjlkj][STX.href].match(/:\/\/(.[^/]+)/)[1].indexOf(document[c] +
        "") || document[e] && -1 == document[e].match(/:\/\/(.[^/]+)/)[1].indexOf(document[c] + "") || (new Date).getTime() > d) || this.runPrepend("createDataSet", arguments))) {
        for (var f in this.charts)
            if (!a || a.name == f) {
                c = this.charts[f];
                c.dataSet = [];
                var g = c.masterData;
                g || (g = this.masterData);
                if (null == g) return;
                var k = [].concat(g);
                this.transformDataSetPre && this.transformDataSetPre(this, k);
                var m = Math.round(0.75 * c.maxTicks),
                    d = function (a, b) {
                        var c = b.arr;
                        if (1 < c.length)
                            for (var d = c[0][0], e = 1; e < c.length; e++) {
                                for (var d = c[e - 1][0], f =
                                        c[e][0], g = strToDateTime(d), l = strToDateTime(f).getTime(), f = 0; 1E3 > f && !(g.getTime() >= l); f++) g = "minute" == a.layout.interval ? STXMarket.nextPeriod(g, 1, a.layout.periodicity, a) : a.isDailyInterval(a.layout.interval) ? STXMarket.nextDay(g, 1, a) : STXMarket.nextPeriod(g, 1, a.layout.interval, a);
                                g = strToDateTime(d).getTime();
                                if (g > strToDateTime(k[k.length - 1].Date).getTime()) l = k.length - 1, f += 1;
                                else
                                    for (l = k.length - 1; 0 <= l && !(g <= strToDateTime(k[l].Date).getTime()); l--);
                                for (var g = {
                                        x0: 0,
                                        x1: f,
                                        y0: k[l].Close,
                                        y1: c[e][1]
                                    }, d = strToDateTime(d),
                                        l = !1, n = 0; n <= f; n++)
                                    if (l ? d = "minute" == a.layout.interval ? STXMarket.nextPeriod(d, 1, a.layout.periodicity, a) : a.isDailyInterval(a.layout.interval) ? STXMarket.nextDay(d, 1, a) : STXMarket.nextPeriod(d, 1, a.layout.interval, a) : l = !0, !(d.getTime() <= k[k.length - 1].DT.getTime())) {
                                        var r = yIntersection(g, n);
                                        null == r && (r = 0);
                                        r = Math.round(1E4 * r) / 1E4;
                                        0 == r && (r = c[e][1]);
                                        r = {
                                            Date: yyyymmddhhmm(d),
                                            DT: d,
                                            Open: r,
                                            Close: r,
                                            High: r,
                                            Low: r,
                                            Volume: 0,
                                            Adj_Close: r,
                                            Split_Close: r,
                                            projection: !0
                                        };
                                        if ("minute" == a.layout.interval && 0 > m--) break;
                                        k[k.length] =
                                            r
                                    }
                            }
                    };
                if (!this.chart.hideDrawings) {
                    for (g = 0; g < this.drawingObjects.length; g++) "projection" == this.drawingObjects[g].name && d(this, this.drawingObjects[g]);
                    this.activeDrawing && "projection" == this.activeDrawing.name && d(this, this.activeDrawing)
                }
                for (var d = g = 0, e = 1E9, l = 0; !(l >= k.length);) {
                    var n = this.consolidatedQuote(k, l, this.layout.periodicity, this.layout.interval, b);
                    if (null == n) {
                        STX.alert("error:consolidatedQuote returned negative position");
                        break
                    }
                    l = n.position;
                    c.dataSet[g] = n.quote;
                    n.quote.cache = {};
                    "High" in n.quote &&
                        n.quote.High > d && (d = n.quote.High);
                    "Low" in n.quote && n.quote.Low < e && (e = n.quote.Low);
                    g++
                }
                this.turtle(c);
                this.transformDataSetPost && this.transformDataSetPost(this, c.dataSet, e, d);
                if (this.dataSetContainsGaps)
                    for (c.scrubbed = [], g = 0; g < c.dataSet.length; g++) d = c.dataSet[g], (d.Close || 0 == d.Close) && c.scrubbed.push(d);
                else c.scrubbed = c.dataSet
            }
        this.adjustDrawings();
        f = this.layout.studies;
        for (var r in f) c = f[r], "function" == typeof c || a && this.panels[c.panel].chart.name != a.name || ((d = STXStudies.studyLibrary[c.type]) || (d = {}), c.outputMap = {}, c.libraryEntry = d, STXStudies.prepareStudy(this, d, c));
        for (g in this.plugins) r = this.plugins[g], r.createDataSet && r.createDataSet(this, a);
        this.runAppend("createDataSet", arguments)
    }
};
STXChart.prototype.adjustDrawings = function () {
    for (var a = 0; a < this.drawingObjects.length; a++) {
        var b = this.drawingObjects[a];
        this.panels[b.panelName] && b.adjust()
    }
};
STXChart.prototype.getNextInterval = function (a) {
    return this.isDailyInterval(this.layout.interval) ? STXMarket.nextDay(a, 1, this) : STXMarket.nextPeriod(a, 1, this.layout.interval, this)
};
STXChart.prototype.zoomOut = function (a) {
    a && a.preventDefault && a.preventDefault();
    this.cancelTouchSingleClick = !0;
    for (var b in this.charts) {
        a = this.charts[b];
        var c = !0;
        a.scroll < a.maxTicks && (c = !1);
        
        var tempCandleWidth = this.layout.candleWidth;
        
        if (STX.ipad && a.maxTicks > STXChart.ipadMaxTicks) return;
        if (3 < tempCandleWidth) tempCandleWidth -= 1;
        else if (0.25 < tempCandleWidth) tempCandleWidth /= 1.25;
        else return;
        this.layout.span = null;
        
        var tempMaxTicks = Math.round(this.chart.width / tempCandleWidth - 0.499) - 1;
        if(c){
    		if(a.maxTicks > a.dataSet.length){
    			return;
    		}else{
    			a.maxTicks = tempMaxTicks;
    			c = a.scroll - a.maxTicks / 2;
    			a.scroll += Math.round(c - (a.scroll - a.maxTicks / 2));
    		}
        }else{
        	
        	if(a.maxTicks > a.dataSet.length){
    			return;
    		}else{
    			a.maxTicks = tempMaxTicks;
    			c = Math.round(this.preferences.whitespace / this.layout.candleWidth), 
        		a.scroll = a.maxTicks - c;
    		}
    		
        }
        
        this.layout.candleWidth = tempCandleWidth;
        
      
    }
   
    this.draw();
    this.changeOccurred("layout")
};
STXChart.prototype.mouseWheel = function (a, b) {
    a.preventDefault && a.preventDefault();
    "onmousewheel" == b ? (a.deltaY = -0.025 * a.wheelDelta, a.wheelDeltaX && (a.deltaX = -0.025 * a.wheelDeltaX)) : a.deltaY = a.detail;
    "undefined" == typeof a.deltaMode && (a.deltaMode = "MozMousePixelScroll" == a.type ? 0 : 1);
    var c = a.deltaX;
    c || (c = a.deltaY);
    1 == a.deltaMode && (c *= 33);
    0 < c ? this.zoomIn() : this.zoomOut();
    return !1
};
STXChart.prototype.zoomIn = function (a) {
    for (var b in this.charts) {
        var c = this.charts[b],
            d = !0;
        c.scroll < c.maxTicks && (d = !1);
        a && a.preventDefault && a.preventDefault();
        this.cancelTouchSingleClick = !0;
        this.layout.candleWidth = 2 > this.layout.candleWidth ? 1.25 * this.layout.candleWidth : this.layout.candleWidth + 1;
        this.layout.span = null;
        d ? (d = c.scroll - c.maxTicks / 2, c.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1, c.scroll += Math.round(d - (c.scroll - c.maxTicks / 2))) : (c.maxTicks = Math.round(this.chart.width /
            this.layout.candleWidth - 0.499) - 1, d = Math.round(this.preferences.whitespace / this.layout.candleWidth), c.scroll = c.maxTicks - d)
    }
    this.draw();
    this.changeOccurred("layout")
};
STXChart.prototype.translateIf = function (a) {

    return this.translationCallback ? this.translationCallback(a) : a
};



STXChart.prototype.setTimeZone = function (a, b) {
    if ("undefined" == typeof timezoneJS) this.timeZoneOffset = 0;
    else {
        var c = new Date,
            d = c.getTimezoneOffset(),
            e = d,
            f = d;
        a && (this.dataZone = a);
        this.dataZone && (e = (new timezoneJS.Date(c, this.dataZone)).getTimezoneOffset());
        b && (this.displayZone = b);
        this.displayZone && (f = (new timezoneJS.Date(c, this.displayZone)).getTimezoneOffset());
        this.timeZoneOffset = e - d - (f - d)
    }
};
STXChart.prototype.setLocale = function (a) {
    "undefined" != typeof Intl && this.locale != a && (this.locale = a, this.internationalizer = {}, this.internationalizer.hourMinute = new Intl.DateTimeFormat(this.locale, {
            hour: "numeric",
            minute: "numeric",
            hour12: !1
        }), this.internationalizer.mdhm = new Intl.DateTimeFormat(this.locale, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }), this.internationalizer.monthDay = new Intl.DateTimeFormat(this.locale, {
            month: "long",
            day: "numeric"
        }), this.internationalizer.numbers =
        new Intl.NumberFormat(this.locale), this.internationalizer.priceFormatters = [], this.internationalizer.priceFormatters[0] = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }), this.internationalizer.priceFormatters[1] = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: 1,
            minimumFractionDigits: 1
        }), this.internationalizer.priceFormatters[2] = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }), this.internationalizer.priceFormatters[3] = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3
        }), this.internationalizer.priceFormatters[4] = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: 4,
            minimumFractionDigits: 4
        }), this.internationalizer.percent = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 2,
            maximumSignificantDigits: 2
        }), this.internationalizer.percent0 = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 0,
            maximumSignificantDigits: 0
        }), this.internationalizer.percent1 = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 1,
            maximumSignificantDigits: 1
        }), this.internationalizer.percent2 = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 2,
            maximumSignificantDigits: 2
        }), this.internationalizer.percent3 = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 3,
            maximumSignificantDigits: 3
        }), this.internationalizer.percent4 = new Intl.NumberFormat(this.locale, {
            style: "percent",
            minimumSignificantDigits: 4,
            maximumSignificantDigits: 4
        }), STX.createMonthArrays(this,
            this.internationalizer.monthDay, this.locale))
};
STXChart.prototype.importLayout = function (a, b) {
    var c = this.layout.interval,
        d = this.layout.periodicity,
        e = this.serializeDrawings();
    this.abortDrawings();
    this.currentlyImporting = !0;
    this.overlays = {};
    var f = clone(a);
    if (null != f) {
        this.deleteAllPanels();
        this.layout = clone(f);
        var g = f.panels;
        this.layout.panels = {};
        for (var k in g) {
            var m = g[k];
            this.stackPanel(m.display, k, m.percent, m.chartName)
        }
        STX.isEmpty(g) && this.stackPanel("chart", "chart", 100, "chart");
        this.storePanels();
        g = clone(this.layout.studies);
        delete this.layout.studies;
        for (var l in g) k = g[l], STXStudies.addStudy(this, k.type, k.inputs, k.outputs, k.parameters)
    }
    "undefined" == typeof this.layout.chartType && (this.layout.chartType = "line");
    this.layout.candleWidth || (this.layout.candleWidth = 8);
    this.chart.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1;
    this.adjustPanelPositions();
    this.layout.interval = c;
    this.layout.periodicity = d;
    b ? (c = f.interval, d = f.periodicity, isNaN(d) && (d = 1), c && "" != c || (c = "day"), c != this.layout.interval || d != this.layout.periodicity ? c == this.layout.interval ||
        this.dataCallback || !this.displayInitialized ? this.setPeriodicityV2(d, c) : console.log("cannot change periodicity because dataCallback is not set") : this.createDataSet()) : this.createDataSet();
    this.reconstructDrawings(e);
    this.draw();
    this.currentlyImporting = !1
};
STXChart.prototype.exportLayout = function () {
    var a = {}, b;
    for (b in this.layout) "studies" != b && "panels" != b ? a[b] = clone(this.layout[b]) : "studies" == b ? a.studies = {} : "panels" == b && (a.panels = {});
    for (var c in this.panels) {
        b = a.panels[c] = {};
        var d = this.panels[c];
        b.percent = d.percent;
        b.display = d.display;
        b.chartName = d.chart.name
    }
    for (var e in this.layout.studies) c = a.studies[e] = {}, b = this.layout.studies[e], c.type = b.type, c.inputs = clone(b.inputs), c.outputs = clone(b.outputs), c.panel = b.panel, c.parameters = clone(b.parameters);
    return a
};
STXStudies._calculateMACD = function (a, b) {
    var c = b.chart.scrubbed;
    if (!(c.length < b.days + 1)) {
        b.macd1Days || (b.macd1Days = parseFloat(b.inputs["Fast MA Period"]));
        b.macd2Days || (b.macd2Days = parseFloat(b.inputs["Slow MA Period"]));
        b.signalDays || (b.signalDays = parseFloat(b.inputs["Signal Period"]));
        b.days || (b.days = Math.max(b.macd1Days, b.macd2Days, b.signalDays));
        b.macd1 = new STXStudies.StudyDescriptor(b.name + "_" + b.macd1Days, "moving_average", b.panel);
        b.macd1.chart = b.chart;
        b.macd1.days = b.macd1Days;
        b.macd1.inputs = {
            Field: "Close"
        };
        STXStudies.calculateMovingAverageExponential(a, b.macd1);
        b.macd2 = new STXStudies.StudyDescriptor(b.name + "_" + b.macd2Days, "moving_average", b.panel);
        b.macd2.chart = b.chart;
        b.macd2.days = b.macd2Days;
        b.macd2.inputs = {
            Field: "Close"
        };
        STXStudies.calculateMovingAverageExponential(a, b.macd2);
        for (var d = b.days - 1; d < c.length; d++) {
            var e = c[d];
            e[b.name] = e[b.macd1.name] - e[b.macd2.name]
        }
        b.outputMap[b.name] = "MACD";
        var f = "signal " + b.name;
        b.signal = new STXStudies.StudyDescriptor(f, "moving_average", b.panel);
        b.signal.chart = b.chart;
        b.signal.days = b.signalDays;
        b.signal.inputs = {
            Field: b.name
        };
        STXStudies.calculateMovingAverageExponential(a, b.signal);
        for (var g = b.name + "_hist", d = b.days - 1; d < c.length; d++) {
            var e = c[d],
                k = e[f];
            if (k || 0 == k) e[g] = e[b.name] - e[f]
        }
        b.outputMap[b.signal.name] = "Signal"
    }
};
STXStudies._calculateMovingAverage = function (a, b) {
    if ("exponential" == b.inputs.Type) return STXStudies.calculateMovingAverageExponential(a, b);
    if ("simple" != b.inputs.Type) STXStudies.passToModulus(a, b);
    else {
        var c = b.chart.scrubbed;
        0 > b.days && (b.days = 1);
        var d = 0,
            e = 0,
            f = 0,
            g = b.name,
            k;
        for (k in b.outputs) g = k + " " + g;
        k = b.inputs.Field;
        for (var m = 0; m < c.length; m++) {
            var l = c[m];
            if ((e = l[k]) || 0 == e) {
                d += e;
                if (f == b.days - 1) e = d / b.days, l[g] = e;
                else if (f >= b.days) {
                    e = c[m - b.days][k];
                    if (null == e || isNaN(e)) e = 0;
                    d -= e;
                    e = d / b.days;
                    l[g] = e
                } else l[g] =
                    null;
                f++
            } else l[g] = null
        }
    }
};
STXStudies.calculateMovingAverageExponential = function (a, b) {
    var c = b.chart.scrubbed,
        d = 0,
        e = 0,
        f = 0,
        g = 2 / (b.days + 1),
        e = 0,
        k = b.name,
        m;
    for (m in b.outputs) k = m + " " + k;
    m = b.inputs.Field;
    for (var l = 0; l < c.length; l++) {
        var n = c[l],
            r = n[m];
        r || 0 == r ? (f == b.days - 1 ? (d += r, e = d / b.days, n[k] = e) : f >= b.days ? (e = (r - e) * g + e, n[k] = e) : (0 == f ? e = d += r : (d += r, e = d / (f + 1)), n[k] = null), f++) : n[k] = null
    }
};
STXStudies._calculateRSI = function (a, b) {
    var c = b.chart.scrubbed;
    if (!(c.length < b.days + 1)) {
        for (var d = 0, e = 0, f = 1; f < b.days; f++) {
            var g = c[f].Close - c[f - 1].Close;
            0 > g ? e += -1 * g : d += g
        }
        d /= b.days;
        e /= b.days;
        c[f][b.name] = 0 == e ? 100 : 100 - 100 / (1 + d / e);
        for (var k = "RSI " + b.name, f = b.days; f < c.length; f++) {
            var m = c[f],
                g = m.Close - c[f - 1].Close;
            0 < g ? (d = (d * (b.days - 1) + g) / b.days, e = e * (b.days - 1) / b.days) : (e = (e * (b.days - 1) + -1 * g) / b.days, d = d * (b.days - 1) / b.days);
            m[k] = 0 == e ? 100 : 100 - 100 / (1 + d / e)
        }
    }
};
STXStudies._calculateStochastics = function (a, b) {
    b.max = 100;
    b.min = 0;
    b.smooth || (b.smooth = b.inputs.Smooth);
    var c = b.chart.scrubbed;
    if (!(c.length < b.days + 1)) {
        var d = b.name;
        b.smooth && (d = d.substring(0, d.length - 2));
        for (var e = b.days; e < c.length; e++) {
            for (var f = c[e], g = d, k = e, m = 1E6, l = 0, n = k - b.days + 1; n <= k; n++) m = Math.min(m, c[n].Low), l = Math.max(l, c[n].High);
            f[g] = (c[k].Close - m) / (l - m) * 100
        }
        if (b.smooth)
            for (e = b.days + 3; e < c.length; e++) c[e][b.name] = (c[e][d] + c[e - 1][d] + c[e - 2][d]) / 3;
        b.outputMap[b.name] = "Fast";
        b.ma = new STXStudies.StudyDescriptor(b.name +
            "_3", "moving_average", b.panel);
        b.ma.chart = b.chart;
        b.ma.days = 3;
        b.ma.inputs = {
            Field: b.name,
            Type: "simple"
        };
        b.ma.min = b.min;
        b.ma.max = b.max;
        STXStudies.calculateMovingAverage(a, b.ma);
        b.outputMap[b.name + "_3"] = "Slow"
    }
};
STXStudies._passToModulus = function (a, b) {
    function c(a) {
        a = a.inputs.Field;
        return "Open" === a ? k : "High" === a ? m : "Low" === a ? l : "Close" === a ? n : "Volume" === a ? r : n
    }

    function d(a) {
        return "simple" === a ? SimpleMovingAverage : "exponential" === a ? ExponentialMovingAverage : "time series" === a ? TimeSeriesMovingAverage : "weighted" === a ? WeightedMovingAverage : "triangular" === a ? TriangularMovingAverage : "variable" === a ? VariableMovingAverage : "vidya" === a ? VIDYA : "welles wilder" === a ? WellesWilderSmoothing : SimpleMovingAverage
    }
    b.period || (b.period = parseInt(b.inputs.Period));
    var e = b.chart.scrubbed,
        f = new TASDK.Recordset,
        g = new TASDK.Field,
        k = new TASDK.Field,
        m = new TASDK.Field,
        l = new TASDK.Field,
        n = new TASDK.Field,
        r = new TASDK.Field,
        p = e.length;
    g.initialize(p, "Date");
    k.initialize(p, "Open");
    m.initialize(p, "High");
    l.initialize(p, "Low");
    n.initialize(p, "Close");
    r.initialize(p, "Volume");
    for (var s = 0; s < p; s++) {
        var t = e[s];
        g.setDateValue(s + 1, t.Date);
        k.setValue(s + 1, t.Open);
        m.setValue(s + 1, t.High);
        l.setValue(s + 1, t.Low);
        n.setValue(s + 1, t.Close);
        r.setValue(s + 1, t.Volume)
    }
    f.addField(g);
    f.addField(k);
    f.addField(m);
    f.addField(l);
    f.addField(n);
    f.addField(r);
    var q;
    "ma" == b.type ? "time series" == b.inputs.Type ? q = TASDK.MovingAverage.prototype.timeSeriesMovingAverage(c(b), b.period, "MA") : "triangular" == b.inputs.Type ? q = TASDK.MovingAverage.prototype.triangularMovingAverage(c(b), b.period, "MA") : "variable" == b.inputs.Type ? q = TASDK.MovingAverage.prototype.variableMovingAverage(c(b), b.period, "MA") : "weighted" == b.inputs.Type ? q = TASDK.MovingAverage.prototype.weightedMovingAverage(c(b), b.period, "MA") : "wells wilder" == b.inputs.Type &&
        (q = TASDK.MovingAverage.prototype.wellesWilderSmoothing(c(b), b.period, "MA")) : "Aroon" == b.type ? q = TASDK.Oscillator.prototype.aroon(f, b.period) : "Price ROC" == b.type ? q = TASDK.General.prototype.priceROC(c(b), b.period, "Result") : "HHV" == b.type ? q = TASDK.General.prototype.HHV(m, b.period, "Result") : "LLV" == b.type ? q = TASDK.General.prototype.LLV(l, b.period, "Result") : "Lin R2" == b.type ? q = TASDK.LinearRegression.prototype.regression(c(b), b.period) : "Lin Fcst" == b.type ? q = TASDK.LinearRegression.prototype.regression(c(b), b.period) :
        "Lin Incpt" == b.type ? q = TASDK.LinearRegression.prototype.regression(c(b), b.period) : "LR Slope" == b.type ? q = TASDK.LinearRegression.prototype.regression(c(b), b.period) : "Time Fcst" == b.type ? q = TASDK.LinearRegression.prototype.timeSeriesForecast(c(b), b.period, "Result") : "VIDYA" == b.type ? q = TASDK.MovingAverage.prototype.VIDYA(c(b), b.period, parseFloat(b.inputs["R2 Scale"]), "Result") : "Med Price" == b.type ? q = TASDK.General.prototype.medianPrice(f, "Result") : "High-Low" == b.type ? q = TASDK.General.prototype.highMinusLow(f, "Result") :
        "Typical Price" == b.type ? q = TASDK.General.prototype.typicalPrice(f, "Result") : "Weighted Close" == b.type ? q = TASDK.General.prototype.weightedClose(f, "Result") : "Vol ROC" == b.type ? q = TASDK.General.prototype.volumeROC(r, b.period, "Result") : "STD Dev" == b.type ? q = TASDK.General.prototype.standardDeviation(c(b), b.period, parseFloat(b.inputs["Standard Deviations"]), d(b.inputs["Moving Average Type"]), "Result") : "M Flow" == b.type ? q = TASDK.Index.prototype.moneyFlowIndex(f, b.period, "Result") : "Trade Vol" == b.type ? q = TASDK.Index.prototype.tradeVolumeIndex(c(b),
            r, parseFloat(b.inputs["Min Tick Value"]), "Result") : "Swing" == b.type ? q = TASDK.Index.prototype.swingIndex(f, parseFloat(b.inputs["Limit Move Value"]), "Result") : "Acc Swing" == b.type ? q = TASDK.Index.prototype.swingIndex(f, parseFloat(b.inputs["Limit Move Value"]), "Result") : "Price Vol" == b.type ? q = TASDK.Index.prototype.priceVolumeTrend(c(b), r, "Result") : "Pos Vol" == b.type ? q = TASDK.Index.prototype.positiveVolumeIndex(c(b), r, "Result") : "Neg Vol" == b.type ? q = TASDK.Index.prototype.negativeVolumeIndex(c(b), r, "Result") : "On Bal Vol" ==
        b.type ? q = TASDK.Index.prototype.onBalanceVolume(c(b), r, "Result") : "Perf Idx" == b.type ? q = TASDK.Index.prototype.performance(c(b), "Result") : "Mass Idx" == b.type ? q = TASDK.Index.prototype.massIndex(f, b.period, "Result") : "Chaikin MF" == b.type ? q = TASDK.Index.prototype.chaikinMoneyFlow(f, b.period, "Result") : "CCI" == b.type ? q = TASDK.Index.prototype.commodityChannelIndex(f, b.period, "Result") : "Stch Mtm" == b.type ? q = TASDK.Index.prototype.stochasticMomentumIndex(f, parseFloat(b.inputs["%K Periods"]), parseFloat(b.inputs["%K Smoothing Periods"]),
            parseFloat(b.inputs["%K Double Smoothing Periods"]), parseFloat(b.inputs["%D Periods"]), d(b.inputs["Moving Average Type"]), d(b.inputs["%D Moving Average Type"])) : "Hist Vol" == b.type ? q = TASDK.Index.prototype.historicalVolatility(c(b), b.period, parseFloat(b.inputs["Bar History"]), parseFloat(b.inputs["Standard Deviations"]), "Result") : "Chande Mtm" == b.type ? q = TASDK.Oscillator.prototype.chandeMomentumOscillator(c(b), b.period, "Result") : "Momentum" == b.type ? q = TASDK.Oscillator.prototype.momentum(c(b), b.period, "Result") :
        "TRIX" == b.type ? q = TASDK.Oscillator.prototype.TRIX(c(b), b.period, "Result") : "VT HZ Filter" == b.type ? q = TASDK.Oscillator.prototype.verticalHorizontalFilter(c(b), b.period, "Result") : "Ultimate" == b.type ? q = TASDK.Oscillator.prototype.ultimateOscillator(f, parseFloat(b.inputs["Cycle 1"]), parseFloat(b.inputs["Cycle 2"]), parseFloat(b.inputs["Cycle 3"]), "Result") : "Williams %R" == b.type ? q = TASDK.Oscillator.prototype.williamsPctR(f, b.period, "Result") : "W Acc Dist" == b.type ? q = TASDK.Oscillator.prototype.williamsAccumulationDistribution(f,
            "Result") : "Vol Osc" == b.type ? q = TASDK.Oscillator.prototype.volumeOscillator(r, parseFloat(b.inputs["Short Term Periods"]), parseFloat(b.inputs["Long Term Periods"]), "Points" == b.inputs["Points Or Percent"] ? 1 : 2, "Result") : "Chaikin Vol" == b.type ? q = TASDK.Oscillator.prototype.chaikinVolatility(f, b.period, parseFloat(b.inputs["Rate Of Change"]), d(b.inputs["Moving Average Type"]), "Result") : "Price Osc" == b.type ? q = TASDK.Oscillator.prototype.priceOscillator(c(b), parseFloat(b.inputs["Long Cycle"]), parseFloat(b.inputs["Short Cycle"]),
            d(b.inputs["Moving Average Type"]), "Result") : "EOM" == b.type ? q = TASDK.Oscillator.prototype.easeOfMovement(f, b.period, d(b.inputs["Moving Average Type"]), "Result") : "Detrended" == b.type ? q = TASDK.Oscillator.prototype.detrendedPriceOscillator(c(b), b.period, d(b.inputs["Moving Average Type"]), "Result") : "True Range" == b.type ? q = TASDK.Oscillator.prototype.trueRange(f, "Result") : "ATR" == b.type ? (q = TASDK.Oscillator.prototype.trueRange(f, "TR"), q = TASDK.MovingAverage.prototype.simpleMovingAverage(q.getField("TR"), b.period,
            "Result")) : "Aroon Osc" == b.type ? q = TASDK.Oscillator.prototype.aroon(f, b.period) : "Fractal Chaos" == b.type ? q = TASDK.Oscillator.prototype.fractalChaosOscillator(f, b.period, "Result") : "Prime Number" == b.type ? q = TASDK.Oscillator.prototype.primeNumberOscillator(n, "Result") : "Elder Force" == b.type ? q = TASDK.Index.prototype.elderForceIndex(f, "Result") : "Ehler Fisher" == b.type ? q = TASDK.Oscillator.prototype.ehlerFisherTransform(f, b.period, "EF") : "Schaff" == b.type ? q = TASDK.Oscillator.prototype.schaffTrendCycle(c(b), b.period,
            parseFloat(b.inputs["Short Cycle"]), parseFloat(b.inputs["Long Cycle"]), d(b.inputs["Moving Average Type"]), "Result") : "QStick" == b.type ? q = TASDK.Index.prototype.qStick(f, b.period, d(b.inputs["Moving Average Type"]), "Result") : "COG" == b.type ? q = TASDK.Oscillator.prototype.centerOfGravity(c(b), b.period, "Result") : "Coppock" == b.type ? q = TASDK.Oscillator.prototype.coppockCurve(c(b), "Result") : "Chande Fcst" == b.type ? q = TASDK.Oscillator.prototype.chandeForecastOscillator(c(b), b.period, "Result") : "Gopala" == b.type ? q = TASDK.Index.prototype.gopalakrishnanRangeIndex(f,
            b.period, "Result") : "Intraday Mtm" == b.type ? q = TASDK.Index.prototype.intradayMomentumIndex(f, "Result") : "Pretty Good" == b.type ? q = TASDK.Oscillator.prototype.prettyGoodOscillator(f, b.period, "Result") : "RAVI" == b.type ? q = TASDK.Index.prototype.RAVI(c(b), parseFloat(b.inputs["Short Cycle"]), parseFloat(b.inputs["Long Cycle"]), "Result") : "Random Walk" == b.type ? q = TASDK.Index.prototype.randomWalkIndex(f, b.period, "Random Walk") : "Twiggs" == b.type ? q = TASDK.Index.prototype.twiggsMoneyFlow(f, b.period, "Result") : "Directional" ==
        b.type ? q = TASDK.Oscillator.prototype.directionalMovementSystem(f, b.period) : "High Low" == b.type ? q = TASDK.Bands.prototype.highLowBands(m, l, n, b.period) : "MA Env" == b.type ? q = TASDK.Bands.prototype.movingAverageEnvelope(c(b), b.period, d(b.inputs["Moving Average Type"]), parseFloat(b.inputs["Shift Percentage"])) : "Fractal Chaos Bands" == b.type ? q = TASDK.Bands.prototype.fractalChaosBands(f, b.period) : "Prime Number Bands" == b.type ? q = TASDK.Bands.prototype.primeNumberBands(m, l, b.period) : "Bollinger Bands" == b.type ? q = TASDK.Bands.prototype.bollingerBands(c(b),
            b.period, parseFloat(b.inputs["Standard Deviations"]), d(b.inputs["Moving Average Type"])) : "Keltner" == b.type ? q = TASDK.Bands.prototype.keltner(f, b.period, parseFloat(b.inputs.Shift), d(b.inputs["Moving Average Type"]), "Keltner") : "PSAR" == b.type ? q = TASDK.Oscillator.prototype.parabolicSAR(m, l, parseFloat(b.inputs["Minimum AF"]), parseFloat(b.inputs["Maximum AF"]), "Result") : "Klinger" == b.type ? q = TASDK.Oscillator.prototype.klingerVolumeOscillator(f, parseFloat(b.inputs["Signal Periods"]), parseFloat(b.inputs["Short Cycle"]),
            parseFloat(b.inputs["Long Cycle"]), d(b.inputs["Moving Average Type"]), "Klinger") : "Elder Ray" == b.type && (q = TASDK.Oscillator.prototype.elderRay(f, b.period, d(b.inputs["Moving Average Type"]), "Elder"));
    if (null != q)
        for (f = q._m_FieldNav, s = 0; s < f.length; s++)
            for (g = f[s].name, p = f[s]._m_values, t = 1; t < p.length && !(t > e.length); t++) e[t - 1][g + " " + b.name] = p[t]
};
STX.Drawing.annotation = function () {
    this.name = "annotation";
    this.arr = [];
    this.h = this.w = 0;
    this.padding = 4;
    this.text = "";
    this.ta = null;
    this.fontSize = 0
};
STX.Drawing.annotation.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
STX.Drawing.annotation.prototype.measure = function () {};
STX.Drawing.annotation.prototype.render = function (a) {
    var b = this.stx.panels[this.panelName];
    if (b) {
        var c = this.stx.pixelFromTick(this.p0[0], b.chart),
            d = this.stx.pixelFromValueAdjusted(b, this.p0[0], this.p0[1]);
        this.stx.canvasFont("stx_annotation", a);
        a.textBaseline = "top";
        var e = this.w,
            f = this.h,
            g = this.color;
        if ("auto" == g || STX.isTransparent(g)) g = this.stx.defaultColor;
        this.highlighted && (g = this.stx.canvasStyle("stx_highlight_vector"));
        if (this.stem) {
            var k = this.stx.pixelFromTick(this.stem.t),
                b = this.stx.pixelFromValueAdjusted(b,
                    this.stem.t, this.stem.v),
                m = c + e / 2,
                l = d + f / 2;
            a.beginPath();
            a.strokeStyle = this.borderColor ? this.borderColor : g;
            a.moveTo(k, b);
            a.lineTo(m, l);
            a.stroke()
        }
        this.highlighted ? (this.stx.canvasColor("stx_annotation_highlight_bg", a), a.fillRect(c, d, e, f)) : this.backgroundColor ? (a.fillStyle = this.backgroundColor, a.fillRect(c, d, e, f)) : this.stem && (a.fillStyle = this.stx.containerColor, a.fillRect(c, d, e, f));
        this.borderColor && (a.beginPath(), a.strokeStyle = this.borderColor, a.rect(c, d, e, f), a.stroke());
        this.stx.canvasFont("stx_annotation");
        this.highlighted ? this.stx.canvasColor("stx_annotation_highlight", a) : a.fillStyle = g;
        d += this.padding;
        for (e = 0; e < this.arr.length; e++) a.fillText(this.arr[e], c + this.padding, d), d += this.fontSize;
        a.textBaseline = "alphabetic"
    }
};
STX.Drawing.annotation.prototype.edit = function (a) {
    function b(a) {
        return function (b) {
            a.manageTouchAndMouse && STXChart.drawingLine && a.mouseup(b)
        }
    }

    function c(a) {
        return function () {
            a.stx.undo()
        }
    }

    function d(a) {
        return function () {
            "" != a.ta.value && (a.text = a.ta.value, a.adjust(), a.stx.addDrawing(a), a.stx.changeOccurred("vector"), a.stx.undo())
        }
    }

    function e(a) {
        return function (b) {
            if (b) switch (window.event ? event.keyCode : b.keyCode) {
            case 27:
                a.stx.undo();
                return
            }
            var c = a.stx;
            b = a.ta;
            var d = c.controls.annotationSave,
                e = c.controls.annotationCancel,
                f = b.value.split("\n"),
                p = 0;
            c.canvasFont("stx_annotation");
            for (var s = 0; s < f.length; s++) {
                var t = c.chart.context.measureText(f[s]).width;
                t > p && (p = t)
            }
            h = (f.length + 1) * (a.fontSize + 3);
            50 > p && (p = 50);
            b.style.width = p + 30 + "px";
            b.style.height = h + "px";
            p = getPos(d.parentNode).y;
            f = parseInt(stripPX(b.style.top)) - p;
            c = c.backOutX(stripPX(b.style.left));
            p = b.clientWidth;
            h = b.clientHeight;
            c + p + 100 < a.stx.chart.canvasWidth ? (d.style.top = f + "px", e.style.top = f + "px", d.style.left = c + p + 10 + "px", e.style.left = c + p + 60 + "px") : (f + h + 30 < a.stx.chart.canvasHeight ?
                (d.style.top = f + h + 10 + "px", e.style.top = f + h + 10 + "px") : (d.style.top = f - 35 + "px", e.style.top = f - 35 + "px"), d.style.left = c + "px", e.style.left = c + 50 + "px")
        }
    }
    var f = this.stx.panels[this.panelName];
    f && (this.stx.undisplayCrosshairs(), document.body.style.cursor = "auto", this.stx.editingAnnotation = !0, this.stx.openDialog = "annotation", null == this.ta && (this.ta = document.createElement("TEXTAREA"), this.ta.className = "stx_annotation", this.ta.onkeyup = e(this), this.ta.onmouseup = b(this.stx), this.ta.setAttribute("wrap", "hard"), document.body.appendChild(this.ta),
            this.ta.style.position = "absolute", this.ta.style.width = "100px", this.ta.style.height = "20px"), a = this.stx.pixelFromTick(this.p0[0], f.chart), f = this.stx.pixelFromValueAdjusted(f, this.p0[0], this.p0[1]), this.ta.style.left = this.stx.resolveX(a) + "px", this.ta.style.top = this.stx.resolveY(f) + "px", this.stx.controls.annotationSave.style.display = "block", this.stx.controls.annotationCancel.style.display = "block", this.stx.controls.annotationSave.onclick = d(this), this.stx.controls.annotationCancel.onclick = c(this), e(this)(),
        STX.focus(this.ta, !0))
};
STX.Drawing.annotation.prototype.click = function (a, b, c) {
    var d = this.stx.panels[this.panelName];
    this.copyConfig();
    this.p0 = [b, c];
    this.d0 = this.stx.dateFromTick(this.p0[0], d.chart);
    this.v0 = c;
    this.adjust();
    this.edit(a);
    return !1
};
STX.Drawing.annotation.prototype.intersected = function (a, b, c) {
    return this.boxIntersection(a, b)
};
STX.Drawing.annotation.prototype.abort = function () {
    this.stx.controls.annotationSave.style.display = "none";
    this.stx.controls.annotationCancel.style.display = "none";
    this.ta && document.body.removeChild(this.ta);
    this.ta = null;
    this.stx.openDialog = "";
    this.stx.showCrosshairs();
    document.body.style.cursor = "crosshair";
    this.stx.editingAnnotation = !1;
    STX.clearCanvas(this.stx.chart.tempCanvas, this);
    fixScreen()
};
STX.Drawing.annotation.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.panelName = b.pnl;
    this.d0 = b.d0;
    this.v0 = b.v0;
    this.text = unescape(b.text);
    this.stem = b.stem;
    this.borderColor = b.bc;
    this.backgroundColor = b.bg;
    this.adjust()
};
STX.Drawing.annotation.prototype.serialize = function () {
    var a = {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        d0: this.d0,
        v0: this.v0,
        text: escape(this.text)
    };
    this.stem && (a.stem = {
        d: this.stem.d,
        v: this.stem.v
    });
    this.borderColor && (a.bc = this.borderColor);
    this.backgroundColor && (a.bg = this.backgroundColor);
    return a
};
STX.Drawing.annotation.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    if (a) {
        this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0];
        this.arr = this.text.split("\n");
        var b = 0;
        this.stx.canvasFont("stx_annotation");
        for (var c = 0; c < this.arr.length; c++) {
            var d = this.stx.chart.context.measureText(this.arr[c]).width;
            d > b && (b = d)
        }
        this.fontSize = this.stx.getCanvasFontSize("stx_annotation");
        h = this.arr.length * this.fontSize;
        STX.touchDevice && (h += 5);
        this.w = b + 2 * this.padding;
        this.h = h + 2 * this.padding;
        b = this.stx.pixelFromTick(this.p0[0],
            a.chart) + b;
        c = this.stx.pixelFromPrice(this.p0[1], a) + h;
        this.p1 = [this.stx.tickFromPixel(b, a.chart), this.stx.valueFromPixel(c, a)];
        this.stem && (this.stem.t = this.stx.tickFromDate(this.stem.d, a.chart))
    }
};
STX.Drawing.line = function () {
    this.name = "line"
};
STX.Drawing.line.stxInheritsFrom(STX.Drawing.segment);
STX.Drawing.line.prototype.calculateOuterSet = function (a) {
    if (this.p0[0] != this.p1[0] && this.p0[1] != this.p1[1] && !this.stx.isDailyInterval(this.stx.layout.interval)) {
        var b = {
            x0: this.p0[0],
            y0: this.p0[1],
            x1: this.p1[0],
            y1: this.p1[1]
        };
        b.x0 > b.x1 && (b = {
            x0: this.p1[0],
            y0: this.p1[1],
            x1: this.p0[0],
            y1: this.p0[1]
        });
        var c = b.x0 - 1E3,
            d = b.x1 + 1E3;
        this.v0B = yIntersection(b, c);
        this.v1B = yIntersection(b, d);
        this.d0B = this.stx.dateFromTick(c, a.chart);
        this.d1B = this.stx.dateFromTick(d, a.chart)
    }
};
STX.Drawing.line.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        this.copyConfig();
        if (!this.p0) return this.p0 = [b, c], !1;
        this.p1 = [b, c];
        this.d0 = this.stx.dateFromTick(this.p0[0], a.chart);
        this.d1 = this.stx.dateFromTick(this.p1[0], a.chart);
        this.v0 = this.p0[1];
        this.v1 = this.p1[1];
        this.calculateOuterSet(a);
        return !0
    }
};
STX.Drawing.line.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.panelName = b.pnl;
    this.pattern = b.ptrn;
    this.lineWidth = b.lw;
    this.v0 = b.v0;
    this.v1 = b.v1;
    this.d0 = b.d0;
    this.d1 = b.d1;
    b.d0B && (this.d0B = b.d0B, this.d1B = b.d1B, this.v0B = b.v0B, this.v1B = b.v1B);
    this.adjust()
};
STX.Drawing.line.prototype.serialize = function () {
    var a = {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        ptrn: this.pattern,
        lw: this.lineWidth,
        d0: this.d0,
        d1: this.d1,
        v0: this.v0,
        v1: this.v1
    };
    this.d0B && (a.d0B = this.d0B, a.d1B = this.d1B, a.v0B = this.v0B, a.v1B = this.v1B);
    return a
};
STX.Drawing.line.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d1, a.chart), this.v1], this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B && (this.p0 = [this.stx.tickFromDate(this.d0B, a.chart), this.v0B], this.p1 = [this.stx.tickFromDate(this.d1B, a.chart), this.v1B]))
};
STX.Drawing.ray = function () {
    this.name = "ray"
};
STX.Drawing.ray.stxInheritsFrom(STX.Drawing.line);
STX.Drawing.ray.prototype.calculateOuterSet = function (a) {
    if (this.p0[0] != this.p1[0] && this.p0[1] != this.p1[1] && !this.stx.isDailyInterval(this.stx.layout.interval)) {
        var b = {
            x0: this.p0[0],
            y0: this.p0[1],
            x1: this.p1[0],
            y1: this.p1[1]
        }, c = b.x1 + 1E3;
        b.x0 > b.x1 && (c = b.x1 - 1E3);
        this.v0B = this.v0;
        this.v1B = yIntersection(b, c);
        this.d0B = this.d0;
        this.d1B = this.stx.dateFromTick(c, a.chart)
    }
};
STX.Drawing.ray.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d1, a.chart), this.v1], this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d1B, a.chart), this.v1B]))
};
STX.Drawing.horizontal = function () {
    this.name = "horizontal"
};
STX.Drawing.horizontal.stxInheritsFrom(STX.Drawing.segment);
STX.Drawing.horizontal.prototype.measure = function () {};
STX.Drawing.horizontal.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) return this.copyConfig(), this.v0 = c, this.d0 = this.stx.dateFromTick(b, a.chart), this.adjust(), !0
};
STX.Drawing.horizontal.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.panelName = b.pnl;
    this.pattern = b.ptrn;
    this.lineWidth = b.lw;
    this.v0 = b.v0;
    this.d0 = b.d0;
    this.adjust()
};
STX.Drawing.horizontal.prototype.serialize = function () {
    return {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        ptrn: this.pattern,
        lw: this.lineWidth,
        v0: this.v0,
        d0: this.d0
    }
};
STX.Drawing.horizontal.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d0, a.chart) + 100, this.v0])
};
STX.Drawing.vertical = function () {
    this.name = "vertical"
};
STX.Drawing.vertical.stxInheritsFrom(STX.Drawing.horizontal);
STX.Drawing.vertical.prototype.measure = function () {};
STX.Drawing.vertical.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d0, a.chart), this.v0 + 1])
};
STX.Drawing.continuous = function () {
    this.name = "continuous"
};
STX.Drawing.continuous.stxInheritsFrom(STX.Drawing.segment);
STX.Drawing.continuous.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        this.copyConfig();
        if (!this.p0) return this.p0 = [b, c], !1;
        this.p1 = [b, c];
        this.d0 = this.stx.dateFromTick(this.p0[0], a.chart);
        this.d1 = this.stx.dateFromTick(this.p1[0], a.chart);
        this.v0 = this.p0[1];
        this.v1 = this.p1[1];
        b = new STX.Drawing.segment;
        c = this.serialize(this.stx);
        b.reconstruct(this.stx, c);
        this.stx.addDrawing(b);
        this.stx.changeOccurred("vector");
        this.stx.draw();
        this.p0 = [this.p1[0], this.p1[1]];
        return !1
    }
};
STX.Drawing.projection = function () {
    this.name = "projection";
    this.arr = [];
    this.intersect = 0;
    this.chartsOnly = !0
};
STX.Drawing.projection.stxInheritsFrom(STX.Drawing.segment);
STX.Drawing.projection.prototype.render = function (a) {
    var b = this.stx.panels[this.panelName];
    if (b && !(2 > this.arr.length))
        for (var c = this.color, d = this.stx.getCanvasColor("stx_highlight_vector"), e = {
                pattern: this.pattern,
                lineWidth: this.lineWidth
            }, f = this.stx.pixelFromDate(this.arr[0][0], b.chart), g = this.stx.pixelFromPriceTransform(this.arr[0][1], b), k = 1; k < this.arr.length; k++) {
            var m = this.stx.pixelFromDate(this.arr[k][0], b.chart),
                l = this.stx.pixelFromPriceTransform(this.arr[k][1], b),
                n = c;
            this.highlighted && k >= this.intersect &&
                (n = d);
            this.stx.plotLine(f, m, g, l, n, "segment", a, !0, e);
            f = m;
            g = l
        }
};
STX.Drawing.projection.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        this.copyConfig();
        if (0 == this.arr.length) {
            var d = this.stx.chart.dataSet[this.stx.chart.dataSet.length - 1];
            this.arr.push([d.Date, d.Close]);
            this.freeze = this.stx.chart.scroll;
            this.freezeTick = this.stx.chart.dataSet.length
        } else if (b <= this.stx.tickFromDate(this.arr[this.arr.length - 2][0], a.chart)) return !1;
        this.arr.push([this.stx.dateFromTick(b, a.chart), c]);
        return !1
    }
};
STX.Drawing.projection.prototype.move = function (a, b, c) {
    var d = this.stx.panels[this.panelName];
    d && (this.copyConfig(), this.arr[this.arr.length - 1] = [this.stx.dateFromTick(b, d.chart), c], this.stx.createDataSet(), this.stx.chart.scroll = this.freeze + (this.stx.chart.dataSet.length - this.freezeTick), this.stx.draw(), this.render(a))
};
STX.Drawing.projection.prototype.intersected = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        for (b = 1; b < this.arr.length; b++) {
            var d = this.stx.tickFromDate(this.arr[b - 1][0], a.chart),
                e = this.stx.tickFromDate(this.arr[b][0], a.chart);
            if (boxIntersects(c.x0, c.y0, c.x1, c.y1, d, this.arr[b - 1][1], e, this.arr[b][1], "segment")) return this.intersect = b, !0
        }
        return !1
    }
};
STX.Drawing.projection.prototype.measure = function () {
    var a = this.stx.panels[this.panelName];
    if (a) {
        if (this.intersect) var b = this.stx.tickFromDate(this.arr[this.intersect - 1][0], a.chart),
        a = this.stx.tickFromDate(this.arr[this.intersect][0], a.chart), c = this.arr[this.intersect - 1][1], d = this.arr[this.intersect][1];
        else b = this.stx.tickFromDate(this.arr[this.arr.length - 2][0], a.chart), a = this.stx.tickFromDate(this.arr[this.arr.length - 1][0], a.chart), c = this.arr[this.arr.length - 2][1], d = this.arr[this.arr.length - 1][1];
        this.stx.setMeasure(c, d, b, a)
    }
};
STX.Drawing.projection.prototype.adjust = function () {};
STX.Drawing.projection.prototype.abort = function (a) {
    function b(a, b) {
        a.createDataSet();
        a.draw();
        return b
    }
    if (a) return this.arr = [], b(this.stx, !1);
    if (this.highlighted) {
        if (1 >= this.intersect) return this.arr = [], b(this.stx, !1);
        this.arr = this.arr.slice(0, this.intersect);
        return b(this.stx, !0)
    }
    this.arr.pop();
    if (1 >= this.arr.length) return this.stx.chart.scroll = this.freeze, b(this.stx, !1);
    this.stx.addDrawing(this);
    this.stx.changeOccurred("vector");
    return b(this.stx, !1)
};
STX.Drawing.projection.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.panelName = b.pnl;
    this.pattern = b.ptrn;
    this.lineWidth = b.lw;
    this.arr = b.arr
};
STX.Drawing.projection.prototype.serialize = function () {
    return {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        ptrn: this.pattern,
        lw: this.lineWidth,
        arr: this.arr
    }
};
STX.Drawing.measure = function () {
    this.name = "measure"
};
STX.Drawing.measure.stxInheritsFrom(STX.Drawing.segment);
STX.Drawing.measure.prototype.click = function (a, b, c) {
    this.copyConfig();
    if (!this.p0) return this.p0 = [b, c], !1;
    this.stx.undo();
    return !0
};
STX.Drawing.ellipse = function () {
    this.name = "ellipse"
};
STX.Drawing.ellipse.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
STX.Drawing.ellipse.prototype.render = function (a) {
    var b = this.stx.panels[this.panelName];
    if (b) {
        var c = this.stx.pixelFromTick(this.p0[0], b.chart),
            d = this.stx.pixelFromTick(this.p1[0], b.chart),
            e = this.stx.pixelFromValueAdjusted(b, this.p0[0], this.p0[1]),
            b = this.stx.pixelFromValueAdjusted(b, this.p1[0], this.p1[1]),
            f = c - (d - c),
            g = e - (b - e),
            k = (b - g) / 6;
        (c = this.lineWidth) || (c = 1.1);
        var m = this.color;
        if ("auto" == m || STX.isTransparent(m)) m = this.stx.defaultColor;
        this.highlighted && (m = this.stx.getCanvasColor("stx_highlight_vector"),
            0.1 == c && (c = 1.1));
        var l = this.fillColor;
        a.beginPath();
        a.moveTo(f, e);
        a.bezierCurveTo(f, b + k, d, b + k, d, e);
        a.bezierCurveTo(d, g - k, f, g - k, f, e);
        l && !STX.isTransparent(l) && "auto" != l && (a.fillStyle = l, a.globalAlpha = 0.2, a.fill(), a.globalAlpha = 1);
        m && "none" != this.pattern && (a.strokeStyle = m, a.lineWidth = c, a.setLineDash && (d = [], "dotted" == this.pattern ? d = [c, c] : "dashed" == this.pattern && (d = [5 * c, 5 * c]), a.setLineDash(d), a.lineDashOffset = 0), a.stroke());
        a.closePath()
    }
};
STX.Drawing.ellipse.prototype.intersected = function (a, b) {
    var c = this.p0[0] - (this.p1[0] - this.p0[0]),
        d = this.p1[0],
        e = this.p1[1],
        f = this.p0[1] - (this.p1[1] - this.p0[1]);
    return a > Math.max(c, d) || a < Math.min(c, d) || b > Math.max(f, e) || b < Math.min(f, e) ? !1 : !0
};
STX.Drawing.ellipse.prototype.copyConfig = function () {
    this.color = STXChart.currentColor;
    this.fillColor = STXChart.currentVectorParameters.fillColor;
    this.lineWidth = STXChart.currentVectorParameters.lineWidth;
    this.pattern = STXChart.currentVectorParameters.pattern
};
STX.Drawing.ellipse.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.fillColor = b.fc;
    this.panelName = b.pnl;
    this.pattern = b.ptrn;
    this.lineWidth = b.lw;
    this.d0 = b.d0;
    this.d1 = b.d1;
    this.v0 = b.v0;
    this.v1 = b.v1;
    this.adjust()
};
STX.Drawing.ellipse.prototype.serialize = function () {
    return {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        fc: this.fillColor,
        ptrn: this.pattern,
        lw: this.lineWidth,
        d0: this.d0,
        d1: this.d1,
        v0: this.v0,
        v1: this.v1
    }
};
STX.Drawing.fibonacci = function () {
    this.name = "fibonacci"
};
STX.Drawing.fibonacci.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
STX.Drawing.fibonacci.mapping = {
    trend: "t",
    color: "c",
    parameters: "p",
    pattern: "pt",
    opacity: "o",
    lineWidth: "lw",
    level: "l",
    extendLeft: "e",
    printLevels: "pl"
};
STX.Drawing.fibonacci.prototype.copyConfig = function () {
    this.color = STXChart.currentColor;
    this.lineWidth = STXChart.currentVectorParameters.lineWidth;
    this.parameters = STXChart.currentVectorParameters.fibonacci
};
STX.Drawing.fibonacci.prototype.setOuter = function () {
    this.outer = {
        p0: clone(this.p0),
        p1: clone(this.p1)
    };
    for (var a = this.p0[1], b = this.p1[1], c = this.p0[0], d = this.p1[0], e = Math.min(b, a), f = Math.max(b, a), g = f - e, k = 0 < (b - a) / (d - c), m = 0, l = 1, n = 0; n < this.parameters.fibs.length; n++) {
        var r = this.parameters.fibs[n];
        if (!(r.level >= m && r.level <= l)) {
            var p = k ? f - g * r.level : e + g * r.level,
                s = xIntersection({
                    x0: c,
                    x1: d,
                    y0: a,
                    y1: b
                }, p);
            r.level < m ? (m = r.level, k ? this.outer.p0[1] = p : this.outer.p1[1] = p, k ? this.outer.p0[0] = s : this.outer.p1[0] = s) : r.level >
                l && (l = r.level, k ? this.outer.p1[1] = p : this.outer.p0[1] = p, k ? this.outer.p1[0] = s : this.outer.p0[0] = s)
        }
    }
};
STX.Drawing.fibonacci.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        this.copyConfig();
        if (!this.p0) return this.p0 = [b, c], this.v0 = c, !1;
        if (this.accidentalClick(b, c)) return !1;
        this.p1 = [b, c];
        this.v1 = c;
        this.d0 = this.stx.dateFromTick(this.p0[0], a.chart);
        this.d1 = this.stx.dateFromTick(this.p1[0], a.chart);
        this.setOuter();
        this.parameters = clone(this.parameters);
        return !0
    }
};
STX.Drawing.fibonacci.prototype.render = function (a) {
    var b = this.stx.panels[this.panelName];
    if (b && this.p1) {
        var c = this.stx.pixelFromTick(this.p0[0], b.chart),
            d = this.stx.pixelFromTick(this.p1[0], b.chart),
            e = this.stx.pixelFromValueAdjusted(b, this.p0[0], this.p0[1]),
            f = this.stx.pixelFromValueAdjusted(b, this.p1[0], this.p1[1]),
            g = Math.min(f, e),
            k = Math.max(f, e),
            m = k - g,
            l = 0 < (f - e) / (d - c),
            n = this.parameters.trend.color;
        if ("auto" == n || STX.isTransparent(n)) n = this.stx.defaultColor;
        this.highlighted && (n = this.stx.getCanvasColor("stx_highlight_vector"));
        a.textBaseline = "middle";
        var r = a.measureText("161.8%").width,
            p = 2E9,
            s = 2E9,
            t = -2E9,
            q = -2E9,
            y = this.color;
        if ("auto" == y || STX.isTransparent(y)) y = this.stx.defaultColor;
        a.fillStyle = y;
        for (y = 0; y < this.parameters.fibs.length; y++) {
            var v = this.parameters.fibs[y],
                w = l ? k - m * v.level : g + m * v.level,
                w = Math.round(w),
                D = xIntersection({
                    x0: c,
                    x1: d,
                    y0: e,
                    y1: f
                }, w),
                C = this.stx.chart.width;
            if (this.parameters.printLevels) {
                var A = 100 * v.level + "%",
                    C = C - r;
                a.fillText(A, C, w);
                C -= 5
            }
            var A = this.parameters.extendLeft ? 0 : D,
                u = v.color;
            if ("auto" == u || STX.isTransparent(u)) u =
                this.color;
            if ("auto" == u || STX.isTransparent(u)) u = this.stx.defaultColor;
            this.stx.plotLine(A, C, w, w, u, "segment", a, b, v.parameters);
            w < s && (p = D, s = w);
            w > q && (t = D, q = w)
        }
        this.stx.plotLine(p, t, s, q, n, "segment", a, b, this.parameters.trend.parameters)
    }
};
STX.Drawing.fibonacci.prototype.intersected = function (a, b, c) {
    return boxIntersects(c.x0, c.y0, c.x1, c.y1, this.outer.p0[0], this.outer.p0[1], this.outer.p1[0], this.outer.p1[1], "segment")
};
STX.Drawing.fibonacci.prototype.reconstruct = function (a, b) {
    b = STX.replaceFields(b, STX.reverseObject(STX.Drawing.fibonacci.mapping));
    this.stx = a;
    this.parameters = b.parameters;
    this.parameters || (this.parameters = clone(STXChart.currentVectorParameters.fibonacci));
    this.color = b.col;
    this.panelName = b.pnl;
    this.d0 = b.d0;
    this.d1 = b.d1;
    this.v0 = b.v0;
    this.v1 = b.v1;
    this.adjust()
};
STX.Drawing.fibonacci.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), this.v0], this.p1 = [this.stx.tickFromDate(this.d1, a.chart), this.v1], this.setOuter())
};
STX.Drawing.fibonacci.prototype.serialize = function () {
    return STX.replaceFields({
        name: this.name,
        parameters: this.parameters,
        pnl: this.panelName,
        col: this.color,
        d0: this.d0,
        d1: this.d1,
        v0: this.v0,
        v1: this.v1
    }, STX.Drawing.fibonacci.mapping)
};
STX.Drawing.bellcurve = function () {
    this.name = "bellcurve";
    this.profile = [];
    this.twoClicked = !1;
    this.chartsOnly = !0
};
STX.Drawing.bellcurve.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
STX.Drawing.bellcurve.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        this.copyConfig();
        if (!this.p0) return this.p0 = [b, c], !1;
        if (this.accidentalClick(b, c)) return !1;
        this.p1 = [b, c];
        this.d0 = this.stx.dateFromTick(this.p0[0], a.chart);
        this.d1 = this.stx.dateFromTick(this.p1[0], a.chart);
        return this.twoClicked = !0
    }
};
STX.Drawing.bellcurve.prototype.profileRange = function (a, b, c) {
    if (b >= a.length) a[b] = [], a[b][0] = c;
    else {
        for (var d = 0, e = a[b].length; d < e; d++) {
            var f = a[b][d];
            if (f.High >= c.High && f.Low <= c.Low) {
                this.profileRange(a, b + 1, c);
                return
            }
            c.High > f.High && c.Low < f.High && c.Low >= f.Low ? (this.profileRange(a, b + 1, {
                High: f.High,
                Low: c.Low
            }), c = {
                High: c.High,
                Low: f.High
            }) : c.Low < f.Low && c.High > f.Low && c.High <= f.High ? (this.profileRange(a, b + 1, {
                High: c.High,
                Low: f.Low
            }), c = {
                High: f.Low,
                Low: c.Low
            }) : f.High < c.High && f.Low > c.Low && (this.profileRange(a,
                b, {
                    High: f.Low,
                    Low: c.Low
                }), this.profileRange(a, b + 1, {
                High: f.High,
                Low: f.Low
            }), c = {
                High: c.High,
                Low: f.High
            })
        }
        a[b][d] = c
    }
};
STX.Drawing.bellcurve.prototype.render = function (a) {
    function b(a, b) {
        return function () {
            function c(a, b) {
                return a.Low < b.Low ? -1 : a.Low > b.Low ? 1 : 0
            }
            a.profile = [];
            var d = [],
                e = Math.min(a.p0[0], a.p1[0]),
                f = Math.max(a.p0[0], a.p1[0]);
            if (!(3E3 < f - e)) {
                for (; e < f; e++)
                    if (!(0 > e || e >= b.chart.dataSet.length)) {
                        var g = b.chart.dataSet[e];
                        d.push({
                            High: g.High,
                            Low: g.Low
                        })
                    }
                d.sort(c);
                for (e = 0; e < d.length; e++) a.profileRange(a.profile, 0, d[e])
            }
        }
    }
    if (this.p1) {
        var c = this.stx.panels[this.panelName];
        if (c) {
            this.x0 = this.stx.pixelFromTick(this.p0[0],
                c.chart);
            this.x1 = this.stx.pixelFromTick(this.p1[0], c.chart);
            0 != this.profile.length && this.twoClicked || (this.timer && clearTimeout(this.timer), this.timer = setTimeout(b(this, c), 20));
            this.highlighted ? a.fillStyle = this.stx.getCanvasColor("stx_highlight_vector") : (a.fillStyle = this.color, STX.isTransparent(a.fillStyle) && (a.fillStyle = this.stx.defaultColor));
            a.globalAlpha = 0.5;
            var d = this.stx.layout.candleWidth;
            a.beginPath();
            for (var e = 0; e < this.profile.length; e++)
                for (var f = 0; f < this.profile[e].length; f++) {
                    var g = this.profile[e][f],
                        k = this.stx.pixelFromPrice(g.High, c),
                        g = this.stx.pixelFromPrice(g.Low, c),
                        m = Math.min(this.x0, this.x1) + e * d,
                        l = m + Math.round(0.75 * d);
                    a.moveTo(m, k);
                    a.lineTo(l, k);
                    a.lineTo(l, g);
                    a.lineTo(m, g);
                    a.lineTo(m, k)
                }
            a.fill();
            a.closePath();
            a.globalAlpha = 1
        }
    }
};
STX.Drawing.bellcurve.prototype.intersected = function (a, b, c) {
    return a < Math.max(this.p0[0], this.p1[0]) && a > Math.min(this.p0[0], this.p1[0]) ? !0 : !1
};
STX.Drawing.bellcurve.prototype.copyConfig = function () {
    this.color = STXChart.currentColor
};
STX.Drawing.bellcurve.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.p0 = [this.stx.tickFromDate(this.d0, a.chart), 0], this.p1 = [this.stx.tickFromDate(this.d1, a.chart), 0])
};
STX.Drawing.bellcurve.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.color = b.col;
    this.panelName = b.pnl;
    this.d0 = b.d0;
    this.d1 = b.d1;
    this.adjust();
    this.twoClicked = !0
};
STX.Drawing.bellcurve.prototype.serialize = function () {
    return {
        name: this.name,
        pnl: this.panelName,
        col: this.color,
        d0: this.d0,
        d1: this.d1
    }
};
STX.Comparison = function () {};
STX.Comparison.mouseHasMoved = !1;
STX.Comparison.priceToPercent = function (a, b, c) {
    return Math.round((c - STX.Comparison.baseline) / STX.Comparison.baseline * 1E6) / 1E4
};
STX.Comparison.percentToPrice = function (a, b, c) {
    return STX.Comparison.baseline * (1 + c / 100)
};
STX.Comparison.stopSort = function (a, b) {
    return a - b
};
STX.Comparison.createComparisonSegmentInner = function (a, b) {
    if (!b.isComparison) return !1;
    var c = [],
        d;
    for (d in b.series) b.series[d].parameters.isComparison && c.push(d);
    var e = ["Close", "Open", "High", "Low"];
    b.dataSegment = [];
    for (var f = null, g = b.dataSet.length - b.scroll, k = g + b.maxTicks, m = 0, l = [], n = 0; n < a.drawingObjects.length; n++) d = a.drawingObjects[n], "comparison_stop" == d.name && d.tick > g && d.tick <= k && l.push(d.tick);
    l.sort(STX.Comparison.stopSort);
    for (n = 0; n <= b.maxTicks; n++)
        if (position = g + n, position < b.dataSet.length &&
            0 <= position) {
            k = b.dataSet[position];
            f || (f = clone(k));
            k.transform || (k.transform = {
                cache: {}
            });
            STX.Comparison.baseline = f.Close;
            for (var r = 0; r < e.length; r++)
                if (d = e[r], k[d] || 0 == k[d]) k.transform[d] = Math.round((k[d] - STX.Comparison.baseline) / STX.Comparison.baseline * 1E6) / 1E4;
            d = !1;
            l && m < l.length && position === l[m] && (d = !0, m++);
            r = null;
            a.activeDrawing && "comparison_stop" == a.activeDrawing.name && (r = a.activeDrawing.tick);
            if (d || position == r)
                for (r = 0; r < c.length; r++) {
                    d = c[r];
                    var p = k[d];
                    f[d] = p / (1 + k.transform.Close / 100)
                }
            for (r = 0; r <
                c.length; r++)
                if (d = c[r], (p = k[d]) || 0 == p) {
                    var s = f[d];
                    s || 0 == s || (f[d] = s = p / (1 + k.transform.Close / 100));
                    k.transform[d] = Math.round((p - s) / s * 1E6) / 1E4
                }
            b.dataSegment.push(k)
        } 
    a.clearPixelCache();
    return !0
};
STX.Comparison.createComparisonSegment = function () {
    for (var a in this.charts) {
        var b = this.charts[a];
        b.isComparison && STX.Comparison.createComparisonSegmentInner(this, b)
    }
};
STX.Comparison.priceFormat = function (a, b, c) {
    if (!c || "undefined" == typeof c) return "";
    b = b.yAxis.priceTick;
    return c = a.internationalizer ? 1 <= b ? a.internationalizer.percent0.format(c) : 0.1 <= b ? a.internationalizer.percent1.format(c) : 0.01 <= b ? a.internationalizer.percent2.format(c) : 0.001 <= b ? a.internationalizer.percent3.format(c) : a.internationalizer.percent4.format(c) : 1 <= b ? c.toFixed(0) + "%" : 0.1 <= b ? c.toFixed(1) + "%" : 0.01 <= b ? c.toFixed(2) + "%" : 0.001 <= b ? c.toFixed(3) + "%" : c.toFixed(4) + "%"
};
STXChart.prototype.setComparison = function (a, b, c) {
    !b.isComparison && c ? (a.setTransform(b, STX.Comparison.priceToPercent, STX.Comparison.percentToPrice), b.panel.yAxis.priceFormatter = STX.Comparison.priceFormat, b.panel.yAxis.whichSet = "dataSegment") : b.isComparison && !c && (a.unsetTransform(b), b.panel.yAxis.priceFormatter = null, b.panel.yAxis.whichSet = "dataSet");
    b.isComparison = c
};
STX.Comparison.startPlugin = function () {
    STXChart.prototype.prepend("createDataSegment", STX.Comparison.createComparisonSegment)
};
STX.Drawing.comparison_stop = function () {
    this.name = "comparison_stop";
    this.panel = null
};
STX.Drawing.comparison_stop.stxInheritsFrom(STX.Drawing);
STX.Drawing.comparison_stop.prototype.adjust = function () {
    var a = this.stx.panels[this.panelName];
    a && (this.tick = this.stx.tickFromDate(this.d0, a.chart))
};
STX.Drawing.comparison_stop.prototype.move = function (a, b, c) {
    this.tick = b;
    STX.Comparison.mouseHasMoved = !0;
    this.stx.draw()
};
STX.Drawing.comparison_stop.prototype.render = function (a) {
    if (a = this.stx.panels[this.panelName]) {
        var b = a.chart;
        if (b.isComparison) {
            var c = a.yAxis,
                d = this.stx,
                b = Math.round(d.pixelFromTick(this.tick, b)) + 0.5,
                e = d.defaultColor;
            this.highlighted && (e = d.getCanvasColor("stx_highlight_vector"));
            d.chart.context.stxLine(b, a.top + c.topOffset, b, a.bottom - c.bottomOffset, e, 1, 0.5, [10, 10])
        }
    }
};
STX.Drawing.comparison_stop.prototype.abort = function () {};
STX.Drawing.comparison_stop.prototype.intersected = function (a, b, c) {
    return this.tick >= c.x0 && this.tick <= c.x1 ? !0 : !1
};
STX.Drawing.comparison_stop.prototype.highlight = function (a) {
    return this.highlighted != a ? (this.highlighted = a, !0) : !1
};
STX.Drawing.comparison_stop.prototype.click = function (a, b, c) {
    if (a = this.stx.panels[this.panelName]) {
        if (STX.Comparison.mouseHasMoved) this.tick = b, this.d0 = this.stx.dateFromTick(this.tick, a.chart);
        else return !1;
        var d = this.stx;
        setTimeout(function () {
            STX.Drawing.comparison_stop.stop(d)
        }, 0);
        return !0
    }
};
STX.Drawing.comparison_stop.start = function (a, b) {
    STX.Comparison.vectorType = STXChart.vectorType;
    STX.Comparison.mouseHasMoved = !1;
    a.changeVectorType("comparison_stop");
    a.drawingClick(b.panel, 0, 0)
};
STX.Drawing.comparison_stop.clear = function (a, b) {
    a.activeDrawing && "comparison_stop" == a.activeDrawing.name && STX.Drawing.comparison_stop.stop(a);
    for (var c = b.panel, d = 0; d < a.drawingObjects.length;) {
        var e = a.drawingObjects[d];
        "comparison_stop" == e.name && e.panel == c ? (e.abort(!0), a.undoStamp(), a.drawingObjects.splice(d, 1)) : d++
    }
    a.changeOccurred("vector");
    a.draw()
};
STX.Drawing.comparison_stop.stop = function (a) {
    STXChart.vectorType = STX.Comparison.vectorType;
    a.undo()
};
STX.Drawing.comparison_stop.prototype.serialize = function () {
    return {
        name: this.name,
        pnl: this.panelName,
        d0: this.d0
    }
};
STX.Drawing.comparison_stop.prototype.reconstruct = function (a, b) {
    this.stx = a;
    this.panelName = b.pnl;
    this.d0 = b.d0;
    this.adjust()
};
STX.Markers = function () {
    this.redrawTimeout = this.markerHolder = null;
    this.Construct()
};
STX.Markers.currentZindex = 1;
STX.Markers.prototype.reset = function () {
    this.markers = [];
    this.panel.markerHolder || (this.panel.markerHolder = document.createElement("DIV"), this.panel.markerHolder.style.position = "absolute", this.panel.markerHolder.style.left = "0px", this.panel.markerHolder.style.overflow = "hidden", this.panel.markerHolder.style.zIndex = 1, this.stx.chart.container.appendChild(this.panel.markerHolder), this.stx.adjustPanelPositions())
};
STX.Markers.prototype.clear = function () {
    this.panel.markerHolder && (this.stx.chart.container.removeChild(this.panel.markerHolder), this.panel.markerHolder = null);
    this.reset()
};
STX.Markers.prototype.placeMarker = function (a, b) {
    function c(a) {
        g.stem && (g.stem.style.zIndex = STX.Markers.currentZindex);
        g.node.style.zIndex = STX.Markers.currentZindex++
    }

    function d(a) {
        c(a);
        f.openDialog = "marker";
        f.undisplayCrosshairs()
    }

    function e(a) {
        f.openDialog = "";
        f.doDisplayCrosshairs()
    }
    var f = this.stx,
        g = {
            node: a,
            date: b
        };
    a.style.display = "none";
    if (this.drawStems) {
        var k = document.createElement("DIV");
        k.className = this.stemClass;
        k.style.position = "absolute";
        k.style.display = "none";
        g.stem = k
    }
    this.focus ? STX.android ||
        STX.ipad || STX.iphone ? g.node.addEventListener("touchstart", c) : (g.node.addEventListener("mouseover", d), g.node.addEventListener("mouseout", e)) : this.hover && (STX.ipad || STX.iphone ? g.node.addEventListener("touchstart", c) : g.node.addEventListener("mouseover", c));
    this.markers.push(g);
    a.style.position = "absolute";
    this.panel.markerHolder.appendChild(a);
    g.stem && this.panel.markerHolder.appendChild(g.stem);
    this.setMarkerTick(this.panel.chart, g);
    return g
};
STX.Markers.prototype.setMarkerTick = function (a, b) {
    for (var c = 0; c < a.dataSet.length; c++) {
        var d = a.dataSet[c].DT.getTime(),
            e = d;
        0 < c && (e = a.dataSet[c - 1].DT.getTime());
        var f = b.date.getTime();
        if (d == f || d > f && e < f) {
            b.tick = c;
            break
        }
    }
};
STX.Markers.prototype.createDataSet = function (a) {
    for (a = 0; a < this.markers.length; a++) this.setMarkerTick(this.panel.chart, this.markers[a])
};
STX.Markers.prototype.initializeChart = function (a) {
    this.stx = a;
    this.panel = a.panels[this.panelName];
    this.reset();
    this.initialize(a)
};
STX.Markers.prototype.drawUnder = function (a, b) {};
STX.Markers.prototype.drawOver = function (a, b) {
    function c(a, b) {
        return function () {
            a.redrawTimeout = null;
            var c = b.panels[a.panelName];
            if (c && !c.hidden && a.placementFunction) {
                for (var g = c.chart, k = [], m = g.dataSet.length - b.chart.scroll, g = m + g.dataSegment.length, l = 0; l < a.markers.length; l++) {
                    var n = a.markers[l];
                    if (n.tick) {
                        var r = n.node,
                            p = n.stem;
                        n.tick >= m && n.tick <= g ? ("block" != r.style.display && (r.style.display = "block", p && (p.style.display = "block")), k.push(n)) : "none" != r.style.display && (r.style.display = "none", p && (p.style.display =
                            "none"))
                    }
                }
                a.placementFunction(a, b, c, k)
            }
        }
    }
    this.redrawTimeout || (this.redrawTimeout = setTimeout(c(this, a), this.transitionMS))
};
(function () {
    "02-2014-07" != STXChart.version && console.log("Mismatched kernel version stxChart:" + STXChart.version + " stxKernel:02-2014-07");
    var a = !0,
        a = -1 != document.location.href.indexOf("24k.hk") ||  -1 != document.location.href.indexOf("webui") ||  -1 != document.location.href.indexOf("localhost") ;
    a || -1 != document.location.href.indexOf("file://") || (console.log("Unauthorized domain"), STXChart = function () {})
})();