var i18n = {};
var WebUiChartWords = {};
i18n.lang = 1; // 0 simplified chinese 1 tradtional chinese

i18n.tickhistorytitle = "成交前後報價明細";
i18n.tickhistorydemoalert = "本功能僅供真實賬戶查詢";
i18n.tickhistorynotallowed = '本功能僅供2014年7月19日之後的數據查詢';
i18n.tickhistoryurgenclose = '緊急平倉單報價序號暫不提供';
i18n.message = "提示";
i18n.ok = "確定";
i18n.cancel = "取消";
i18n.closed = "關閉";
i18n.buy = "買入";
i18n.sell = "賣出";
i18n.connectionFail = "連接失敗";
i18n.connStatusFine = "已連接";
i18n.connStatusFail = "已斷開";
i18n.accDisableOrConnectFail = "賬戶不可用或者服務器連接失敗";
i18n.connectionFailTip = "對不起，正在連接市場資料，請稍後再試。";
i18n.readDateError = "讀取數據失敗";
i18n.accReconnection = "對不起，賬戶已經在它處登入，如需登入，請先從它處註銷。錯誤號5";
i18n.accTraderOccupied = "網絡斷開, 請嘗試重新連接。錯誤號38";
i18n.connectionBreak = "已斷開連接";
i18n.logout = "登出";
i18n.confirmLogout = "您確定要登出這個賬戶嗎？";
i18n.loginFail = "登陸失敗,錯誤代碼";
i18n.loginException = "登陸異常";
i18n.errorCode = "錯誤號";
i18n.point = "點";
i18n.indicatorPara = "指標參數";
i18n.inputNumber = "請輸入數字";
i18n.pricePosition = "價位";
i18n.chartMin = "分鐘線";
i18n.chartHour = "小時線";
i18n.chartDay = "日線";
i18n.chartWeek = "周線";
i18n.chartMon = "月線";
i18n.chartTip = "數據加載中,稍等.....";
i18n.chartopen = "開";
i18n.charthigh = "高";
i18n.chartlow = "低";
i18n.chartclose = "收";
i18n.charttime = "時";
i18n.llg = "倫敦金";
i18n.lls = "倫敦銀";
i18n.openposition = "開倉";
i18n.closeposition = "平倉";
i18n.confirmCancelOrder = "是否取消已有平倉委託？";
i18n.confirmCancelCurrentOrder="你確定要取消該筆委託單嗎？";
i18n.daycss = "日間";
i18n.nightcss = "夜間";
i18n.tradeCommon_title="委託下單";
i18n.save="保存";
i18n.cancel="取消";


i18n.tick = {};
i18n.tick.code = "代碼";
i18n.tick.name = "名稱";
i18n.tick.price = "現價";
i18n.tick.sellPrice = "賣價";
i18n.tick.buyPrice = "買價";
i18n.tick.openPrice = "開盤";
i18n.tick.high = "最高";
i18n.tick.low = "最低";
i18n.tick.lastDayPrice = "前收市";
i18n.tick.bp = "升跌";
i18n.tick.scope = "升跌幅度";
i18n.tick.bInterestRate = "買利率";
i18n.tick.sInterestRate = "賣利率";
i18n.tick.time = "時間";

i18n.news = {};
i18n.news.tabnews = "新聞";
i18n.news.messageGotoNum = "輸入頁碼有誤!";
i18n.news.messageNum = "請輸入數字!";
i18n.news.close = "關閉";
i18n.news.newstitle = "新聞標題";
i18n.news.time = "時間";
i18n.news.list = "列表";

i18n.acposition = {};
i18n.acposition.orderno = "訂單號";
i18n.acposition.ct = "合約";
i18n.acposition.buysell = "買/賣";
i18n.acposition.lot = "手數";
i18n.acposition.openprice = "開倉價";
i18n.acposition.closeprice = "平倉價";
i18n.acposition.pl = "盈虧";
i18n.acposition.interest = "利息";
i18n.acposition.netpl = "淨盈虧";
i18n.acposition.unit = "合約單位";
i18n.acposition.margin = "保證金";
i18n.acposition.opentime = "開倉時間";

i18n.closedposition = {};
i18n.closedposition.cid = "平倉號";
i18n.closedposition.ct = "合約";
i18n.closedposition.buysell = "買/賣";
i18n.closedposition.lot = "手數";
i18n.closedposition.openprice = "開倉價";
i18n.closedposition.closeprice = "平倉價";
i18n.closedposition.pl = "盈虧";
i18n.closedposition.interest = "利息";
i18n.closedposition.netpl = "淨盈虧";
i18n.closedposition.unit = "合約單位";
i18n.closedposition.coupon = "回贈金額";
i18n.closedposition.opentime = "開倉時間";
i18n.closedposition.closetime = "平倉時間";

i18n.accountsummary = {};
i18n.accountsummary.ct = "合約";
i18n.accountsummary.buysell = "買/賣";
i18n.accountsummary.buylot = "買數量";
i18n.accountsummary.selllot = "賣數量";
i18n.accountsummary.openprice = "開倉價";
i18n.accountsummary.closeprice = "平倉價";
i18n.accountsummary.pl = "盈虧";
i18n.accountsummary.interest = "利息";
i18n.accountsummary.netpl = "淨盈虧";
i18n.accountsummary.margin = "保證金";
i18n.accountsummary.unit = "合約單位";

i18n.dynamic = {};
i18n.dynamic.time = "時間";
i18n.dynamic.status = "狀態";
i18n.dynamic.info = "信息";
i18n.dynamic.marketprice = "市價";
i18n.dynamic.limitprice = "限價";
i18n.dynamic.stop = "止蝕";
i18n.dynamic.autoreplace = "自動替代";
i18n.dynamic.openposition = "開倉";
i18n.dynamic.closeposition = "平倉";
i18n.dynamic.buy = "買入";
i18n.dynamic.sell = "賣出";
i18n.dynamic.llg = "倫敦金";
i18n.dynamic.lls = "倫敦銀";
i18n.dynamic.done = "已執行";
i18n.dynamic.wait = "等待";
i18n.dynamic.cancel = "已取消";
i18n.dynamic.altered = "已修改";
i18n.dynamic.or = "或";
i18n.dynamic.invalid = "未生效";
i18n.dynamic.advpending = "進階委託";

i18n.pendingorder = {};
i18n.pendingorder.oid = "委託號";
i18n.pendingorder.unit = "合約";
i18n.pendingorder.ct = "類別";
i18n.pendingorder.buysell = "買/賣";
i18n.pendingorder.lot = "手數";
i18n.pendingorder.limitprice = "限價";
i18n.pendingorder.lost = "止蝕";
i18n.pendingorder.status = "狀態";
i18n.pendingorder.limittime = "期限";
i18n.pendingorder.ordertime = "委託時間";
i18n.pendingorder.relatedid = "關聯單號";
i18n.pendingorder.remark = "備註";
i18n.pendingorder.openposition = "開倉";
i18n.pendingorder.closeposition = "平倉";
i18n.pendingorder.invalid = "未生效";
i18n.pendingorder.done = "已執行";
i18n.pendingorder.cancel = "已取消";
i18n.pendingorder.wait = "等待";
i18n.pendingorder.day = "當日有效";
i18n.pendingorder.week = "當周有效";

i18n.bulletin = {};
i18n.bulletin.title = "公告";
i18n.bulletin.noRecord = "對不起,沒有相關記錄!";
i18n.bulletin.dateFormat = "yyyy年MM月dd日";

i18n.report = {};
i18n.report.allProduct = "所有產品";
i18n.report.subtotal = "小計";
i18n.report.total = "總計";
i18n.report.marketPrice = "市價";
i18n.report.limitPrice = "限價";
i18n.report.stopLoss = "止蝕";
i18n.report.autoChange = "自動替代";
i18n.report.systemCancel = "繫統取消";
i18n.report.execution = "執行";
i18n.report.manCancel = "手動取消";
i18n.report.effectiveInDate = "當日有效";
i18n.report.effectiveInWeekly = "當周有效";
i18n.report.advancedCommissioned = "進階委託";
i18n.report.emergencyClose = "緊急平倉";
i18n.report.systemClose = "繫統平倉";
i18n.report.departmemtDonatedMoney = "匯贈錢";
i18n.report.networkDonatedMoney = "網贈錢";
i18n.report.tokenDeposit = "代幣優惠";
i18n.report.tokenExpire = "代幣到期";
i18n.report.tokenCommission = "代幣傭金";
i18n.report.tokenProfit = "代幣盈虧";
i18n.report.tokenBrokerage = "代幣經紀傭金";
i18n.report.deposit = "存款";
i18n.report.withdrawals = "取款";
i18n.report.profit = "盈虧";
i18n.report.fee = "手續費";
i18n.report.commission = "傭金";
i18n.report.systemCleared = "繫統清零";
i18n.report.cashback = "回贈金額";
i18n.report.tokenDiscount = "代幣優惠";
i18n.report.TokenExpire = "代幣到期";
i18n.report.autoCancelWithdrawal = "自動取消取款";
i18n.report.specialAdjustment = "特殊金額調整";
i18n.report.preferential = "優惠";
i18n.report.transfer = "轉賬";
i18n.report.cgsefee = "交易編碼費";
i18n.report.mispayCgseFee = "補繳交易編碼費";
i18n.report.grants = "返傭";
i18n.report.rebate = "贈金";
i18n.report.consignReporttotalname = "總可用優惠金額";
i18n.report.page = "頁";
i18n.report.noOfRecord = "條記錄";
i18n.report.buy = "買";
i18n.report.sell = "賣";
i18n.report.grantsGuarantee='保障優惠';

i18n.report.cashbackOption_rebate = "回贈";
i18n.report.cashbackOption_token = "代幣";
i18n.report.weiye = "尾頁";
i18n.report.nextPage = "下一頁";
i18n.report.prevPage = "上一頁";
i18n.report.headPage = "首頁";
i18n.report.ye = "頁";
i18n.report.dao = "到";
i18n.report.submit = "確定";
i18n.report.success = "查詢成功";
i18n.report.tablename = "報表";
i18n.report.noRecord="無記錄";
i18n.report.ticknotavalible="數據傳輸中, 請閣下於交易10分鐘後再查詢, 謝謝!";

var WebUIError = {
	// server side
	"-1" : "參數無效",
	1 : "對不起，賬戶號碼不正確，請重新輸入。錯誤號1",
	2 : "對不起，賬戶已被停用，請聯絡我們的客戶服務員。電郵：cs@24k.hk。錯誤號2",
	3 : "模擬賬戶過期，請開立真實賬戶。錯誤號3",
	4 : "對不起，密碼不正確，請重新輸入。錯誤號 4",
	5 : "對不起，賬戶已在它處登錄。錯誤號5",
	6 : "發現新版本，請更新升級。",
	8 : "信息有誤，請重試。錯誤號8",
	18 : "對不起，繫統沒有相關數據，請重試。錯誤號18",
	32 : "對不起，您已經多次輸入錯誤賬號或密碼，請聯繫客戶服務專員。錯誤號32",
	38 : "網絡斷開，請嘗試重新連接。錯誤號 38",
	54 : "對不起，未激活的賬戶不可登陸。請閣下先入金激活賬戶然後再登錄。錯誤號：54",
	5 : "對不起，賬戶已經被其他電腦登入。如果要登入，請先讓其他電腦登出。錯誤號5	",
	38 : "網絡斷開，請嘗試重新連接。錯誤號 38",
	13 : "對不起，已超出最大持倉手數（XX手）。錯誤號13",
	17 : "現時市價超出可接受範圍，請重試。錯誤號17",
	19 : "對不起，訂單已平倉，無效操作。錯誤號19",
	23 : "對不起，已超出最大持倉手數（XX手）。錯誤號23	",
	24 : "所需保證金不足，請存入資金。錯誤號24",
	30 : "對不起，交易失敗，請稍後再試。錯誤號30",
	36 : "對不起，已超出最大持倉單上限（100張）。錯誤號36",
	42 : "賬戶額度發生變化，請重新下單。錯誤號42",
	43 : "賬戶額度發生變化，請重新下單。錯誤號43",
	47 : "價格已經變動，請重新下單。錯誤號 47",
	51 : "價格已經變動，請重新下單。錯誤號 51",
	52 : "	價格已經變動，請重新下單。錯誤號 52",
	53 : "價格已經變動，請重新下單。錯誤號 53",
	10 : "委託單參數錯誤，請重新輸入。錯誤號10",
	11 : "委託價格超出可接受範圍，請重新輸入。錯誤號11",
	12 : "委託手數超出可接受範圍，請重新輸入。錯誤號12",
	15 : "對不起，委託單信息不存在，無效操作。錯誤號15",
	20 : "對不起，委託開倉不可超過20張單，請重試。錯誤號20",
	21 : "對不起，委託平倉手數不能超過持倉手數，請重試。錯誤號21",
	27 : "對不起，委託單信息不存在，無效操作。錯誤號27",
	28 : "委託單已執行，不可修改。錯誤號28",
	44 : "錯誤的進階單，請重試。錯誤號44",
	9 : "非交易時段，操作無效。錯誤號9",
	16 : "市場已暫停，請稍後交易。錯誤號16",
	25 : "數據傳輸失敗，請稍後再試。錯誤號25",
	26 : "交易暫時無法進行，請稍後再試。錯誤號26",
	33 : "繫統結算，請稍候交易，錯誤號33",
	7 : "沒有權限 .錯誤號 7",
	22 : "對不起，繫統更新中，暫停操作。錯誤號 22",
	31 : "服務器內存不足。錯誤號31",
	37 : "錯誤的回贈配置。錯誤號37",
	44 : "錯誤的進階單，請重試。錯誤號44",
	45 : "非訂制用戶不可進行相關操作，錯誤號45",
	46 : "錯誤的會籍。錯誤號46",

	// client side
	10101 : "登錄超時，請重試。錯誤號10101",
	10102 : "請輸入帳戶。錯誤號10102",
	10103 : "請輸入密碼。錯誤號10103",
	10113 : "非交易時段，操作無效.錯誤號10113",
	10120 : "請聯絡客服服務專員.錯誤號10120",
	10104 : "請輸入有效手數。有效手數為0.05的倍數.錯誤號10104",
	10119 : "單筆交易的有效手數範圍是（最小手） 手-（最大手）  手.錯誤號10119",
	10105 : "請輸入正確可成交範圍（{0}-{1}美元）。錯誤號10105",
	10106 : "限價買入價須低於市場買價至少XX美元.錯誤號10106",
	10107 : "限價賣出價須高於市場賣價至少XX美元。錯誤號10107",
	10108 : "止蝕買入價須高於市場買價至少XX美元.錯誤號10108",
	10109 : "止蝕賣出價須低於市場賣價至少XX美元。錯誤號10109",
	10110 : "限價買入價須低於市場買價至少XX美元，止蝕買入價須高於市場買價至少YY美元。錯誤號10110",
	10111 : "限價賣出價須高於市場賣價至少XX美元，止蝕賣出價須低於市場賣價至少YY美元.錯誤號10111",
	10112 : "委託單價格超出可接受範圍（↑↓XX美金）.錯誤號10112",
	10122 : "平倉委託價須至少距離開倉委託價格XX美元。錯誤號10122",
	10123 : "倉委託價格至多距離開倉委託價格XX美元。錯誤號10123",
	10123 : "平倉委託價格至多距離開倉委託價格XX美元。錯誤號10123",
	10122 : "平倉委託價須至少距離開倉委託價格XX美元。錯誤號10122",
	10116 : "操作超時，請稍後查詢或重新登錄，以倉位元動態和報表的實際成交記錄為準。錯誤號10116",
	10113 : "非交易時段，操作無效.錯誤號10113",
	10118 : "該訂單正在審批中，不可交易。錯誤號10118",
	80001 : "請輸入有效手數，有效手數為0.05的整倍數",
	10117 : "對不起，平倉手數不能超過持倉手數，請重試.錯誤號10117",
	80002 : "是否取消已有平倉委託？  確定  取消",
	80003 : "點擊‘確定’，直接進行平倉，同時原有平倉委託全數取消",
	80004 : "點擊‘取消’，視為不進行市價平倉操作，將不進行任何操作處理’",
	80005 : "同開倉， 錯誤號有10105至10111",
	10116 : "操作超時，請稍後查詢或重新登錄，以倉位元動態和報表的實際成交記錄為準。錯誤號10116",
	10113 : "非交易時段，操作無效.錯誤號10113",
	80006 : "同開倉， 錯誤號有10105至10111",
	10116 : "操作超時，請稍後查詢或重新登錄，以倉位元動態和報表的實際成交記錄為準。錯誤號10116"
};

WebUiChartWords.wordLists = {
	"defaultWord" : {
		"1D" : "",
		"1 D" : "",
		"3 D" : "",
		"1 W" : "",
		"2 Wk" : "",
		"1 Mo" : "",
		"5 Min" : "",
		"10 Min" : "",
		"15 Min" : "",
		"30 Min" : "",
		"1 hour" : "",
		"Chart" : "",
		"Chart Style" : "",
		"Candle" : "",
		"Bar" : "",
		"Colored Bar" : "",
		"Line" : "",
		"Hollow Candles" : "",
		"Chart Scale" : "",
		"Log Scale" : "",
		"Studies" : "",
		"Accumulative Swing Index" : "",
		"Aroon" : "",
		"Aroon Oscillator" : "",
		"Average True Range" : "",
		"Bollinger Bands" : "",
		"Center Of Gravity" : "",
		"Chaikin Money Flow" : "",
		"Chaikin Volatility" : "",
		"Chande Forecast Oscillator" : "",
		"Chande Momentum Oscillator" : "",
		"Commodity Channel Index" : "",
		"Coppock Curve" : "",
		"Detrended Price Oscillator" : "",
		"Directional Movement System" : "",
		"Ease of Movement" : "",
		"Ehler Fisher Transform" : "",
		"Elder Force Index" : "",
		"Elder Ray" : "",
		"Fractal Chaos Bands" : "",
		"Fractal Chaos Oscillator" : "",
		"Gopalakrishnan Range Index" : "",
		"High Low Bands" : "",
		"High Minus Low" : "",
		"Highest High Value" : "",
		"Historical Volatility" : "",
		"Intraday Momentum Index" : "",
		"Keltner Channel" : "",
		"Klinger Volume Oscillator" : "",
		"Linear Reg Forecast" : "",
		"Linear Reg Intercept" : "",
		"Linear Reg R2" : "",
		"Linear Reg Slope" : "",
		"Lowest Low Value" : "",
		"MACD" : "",
		"Mass Index" : "",
		"Median Price" : "",
		"Momentum Oscillator" : "",
		"Money Flow Index" : "",
		"Moving Average" : "",
		"Moving Average Envelope" : "",
		"Negative Volume Index" : "",
		"On Balance Volume" : "",
		"Parabolic SAR" : "",
		"Performance Index" : "",
		"Positive Volume Index" : "",
		"Pretty Good Oscillator" : "",
		"Price Oscillator" : "",
		"Price Rate of Change" : "",
		"Price Volume Trend" : "",
		"Prime Number Bands" : "",
		"Prime Number Oscillator" : "",
		"QStick" : "",
		"Random Walk Index" : "",
		"RAVI" : "",
		"RSI":" RSI 顏色",
		"Schaff Trend Cycle" : "",
		"Standard Deviation" : "",
		"Stochastics" : "",
		"Stochastic Momentum Index" : "",
		"Stochastic Oscillator" : "",
		"Swing Index" : "",
		"Time Series Forecast" : "",
		"Trade Volume Index" : "",
		"TRIX" : "",
		"True Range" : "",
		"Twiggs Money Flow" : "",
		"Typical Price" : "",
		"Ultimate Oscillator" : "",
		"Vertical Horizontal Filter" : "",
		"Volume" : "",
		"Vol Underlay" : "",
		"Volume Oscillator" : "",
		"Volume Rate of Change" : "",
		"Weighted Close" : "",
		"Williams %R" : "",
		"Williams Accumulation Distribution" : "",
		"Timezone" : "",
		"Change Timezone" : "",
		"Default Themes" : "",
		"Light" : "",
		"Dark" : "",
		"Custom Themes" : "",
		"New Custom Theme" : "",
		"Select Tool" : "",
		"None" : "",
		"Crosshairs" : "",
		"Annotation" : "",
		"Fibonacci" : "",
		"Horizontal" : "",
		"Ray" : "",
		"Segment" : "",
		"Rectangle" : "",
		"Ellipse Center" : "",
		"Ellipse Left" : "",
		"Fill:" : "",
		"Line:" : "",
		"O: " : "",
		"H: " : "",
		"V: " : "",
		"C: " : "",
		"L: " : "",
		"save":"保存",
		"cancel":"取消",
		"Create" : "新增",
		"Show Zones" : "",
		"OverBought" : "",
		"OverSold" : "",
		"Choose Timezone" : "",
		"Close" : "",
		"Shared Chart URL" : "",
		"Share This Chart!" : "",
		"Create a New Custom Theme" : "",
		"Candles" : "",
		" Border" : "",
		"Line/Bar/Wick" : "",
		"Background" : "",
		"Grid Lines" : "",
		"Date Dividers" : "",
		"Axis Text" : "",
		"New Theme Name:" : "",
		"Save Theme" : "",
		"rsi" : "",
		"Period" : "週期",
		"ma" : "",
		"Field" : "",
		"Type" : "",
		"MA" : "",
		"macd" : "",
		"Fast MA Period" : "",
		"Slow MA Period" : "",
		"Signal Period" : "",
		"Signal" : "",
		"stochastics" : "",
		"Smooth" : "",
		"Fast" : "",
		"Slow" : "",
		"Aroon Up" : "",
		"Aroon Down" : "",
		"Lin R2" : "",
		"RSquared" : "",
		"Lin Fcst" : "",
		"Forecast" : "",
		"Lin Incpt" : "",
		"Intercept" : "",
		"Time Fcst" : "",
		"VIDYA" : "",
		"R2 Scale" : "",
		"STD Dev" : "",
		"Standard Deviations" : "標準差",
		"Moving Average Type" : "",
		"Trade Vol" : "",
		"Min Tick Value" : "",
		"Swing" : "",
		"Limit Move Value" : "限制移動值",
		"Acc Swing" : "",
		"Price Vol" : "",
		"Pos Vol" : "",
		"Neg Vol" : "",
		"On Bal Vol" : "",
		"Perf Idx" : "",
		"Stch Mtm" : "",
		"%K Periods" : "",
		"%K Smoothing Periods" : "",
		"%K Double Smoothing Periods" : "",
		"%D Periods" : "",
		"%D Moving Average Type" : "",
		"%K" : "",
		"%D" : "",
		"Hist Vol" : "",
		"Bar History" : "",
		"Ultimate" : "",
		"Cycle 1" : "",
		"Cycle 2" : "",
		"Cycle 3" : "",
		"W Acc Dist" : "",
		"Vol Osc" : "",
		"Short Term Periods" : "",
		"Long Term Periods" : "",
		"Points Or Percent" : "",
		"Chaikin Vol" : "",
		"Rate Of Change" : "",
		"Price Osc" : "",
		"Long Cycle" : "",
		"Short Cycle" : "",
		"EOM" : "",
		"CCI" : "",
		"Detrended" : "",
		"Aroon Osc" : "",
		"Elder Force" : "",
		"Ehler Fisher" : "",
		"EF" : "",
		"EF Trigger" : "",
		"Schaff" : "",
		"Coppock" : "",
		"Chande Fcst" : "",
		"Intraday Mtm" : "",
		"Random Walk" : "",
		"Random Walk High" : "",
		"Random Walk Low" : "",
		"Directional" : "",
		"ADX" : "",
		"DI+" : "",
		"DI-" : "",
		"High Low" : "",
		"High Low Bands Top" : "",
		"High Low Bands Median" : "",
		"High Low Bands Bottom" : "",
		"MA Env" : "",
		"Shift Percentage" : "",
		"Envelope Top" : "",
		"Envelope Median" : "",
		"Envelope Bottom" : "",
		"Fractal High" : "",
		"Fractal Low" : "",
		"Prime Bands Top" : "",
		"Prime Bands Bottom" : "",
		
		"Keltner" : "",
		"Shift" : "",
		"Keltner Top" : "",
		"Keltner Median" : "",
		"Keltner Bottom" : "",
		"PSAR" : "",
		"Minimum AF" : "",
		"Maximum AF" : "",
		"Klinger" : "",
		"Signal Periods" : "",
		"KlingerSignal" : "",
		"Elder Bull Power" : "",
		"Elder Bear Power" : "",
		"LR Slope" : "",
		"Slope" : "",
		"Result":"輸出顏色",
		"Field":"選項",
		"Open":"開市",
		"High":"最高",
		"Low":"最低",
		"Close":"收市",
		"Type":"類型",
		"Simple":"簡單",
		"Exponential":"指數", 
		"Time Series":"時間序列",
		"Triangular":"三角形",
		"Variable":"變異",
		"Weighted":"加權",
		"Wells Wilder":"維爾德平滑",
		"MA":"MA 顏色",
		"Fast MA Period":"快速均線參數",
		"Slow MA Period":"慢速均線參數",
		"Signal Period":"離差均線參數",
		"MACD":"MACD 顏色",
		"Signal":"Signal 顏色",
		"Limit Move Value":"限制移動值",
		"Standard Deviations":"標準差",
		"Moving Average Type":"MA 類型",
		"Bollinger Band Top":"布林帶上軌",
		"Bollinger Band Median":"布林帶中軌",
		"Bollinger Band Bottom":"布林帶下軌",
		"Minimum AF":"最小AF",
		"Maximum AF":"最大AF",
		"Smooth":"平穩",
		"Fast":"快",
		"Slow":"慢",
		"ma":"MA",
		"macd":"MACD",
		"Price ROC":"ROC",
		"rsi":"RSI",
		"stochastics":"KDJ"
	}

};


i18n.trade={
	    "title1" : "$/點",
	    "title2" : " 1點=",
		"buyType": "<span class='text-space'>買</span>入：",
		"askType": "<span class='text-space'>賣</span>出：",
		"investmentQuotaRequestNum" : "投資額度必須爲數字",
		"investmentQuotaRange" : "請輸入有效投資額度",
		"investmentQuotaOnlyInputTwoDights" : "投資額度小數位不能超過兩位",
		"investmentValid": "請輸入正確的投資額度({0})。錯誤號10234",
		"investmentValidIsEnough" : "您當前的可用額度不足以支付手續費，是否將投資額度調整為{0},以嘗試繼續交易?",
		"mid" : "之間",
		"volumeNum" : "您輸入的手數無效,請輸入正確的數值",
		"volumeRange" : "請輸入有效的手數",
		"volumeRangeOnlyInputTwoDights" : "手數小數位不能超過兩位",
		"intSize" : "的整數倍",
		"volumeValid": "請輸入有效手數。有效手數為{0}的倍數.錯誤號10104",
		"10119": "單筆交易的有效手數範圍是（{0}） 手-（{1}） 手.錯誤號10119",
		"transRangeNum" : "您輸入的可成交範圍無效,請輸入正確的數值",
		"transRangeValid": "請輸入正確可成交範圍({0}-{1}點),錯誤號10208",
	    "pendingOrderPriceMin" : "委託價格不在可接受範圍內，請檢查價格後再輸入。錯誤號10209",
	    "pendingOrderPriceMax" : "委託價格不在可接受範圍內，請檢查價格後再輸入。錯誤號10210",
		"volume": "手",
		"day" : "/天",
		"sumitting" : "提交中...",
		"sumitedSuccess" : "已執行",
		"dayEffective": "當日有效",
		"weekEffective" : "當周有效",
		
		"opentypeLimit" : "<span class='text-space'>開</span>倉：限價",
		"opentypeStop" : "<span class='text-space'>開</span>倉：止蝕",
		"opentypeBuyOco" : "<span class='text-space'>開</span>倉：自動替代",
		"closetypeLimit" : "<span class='text-space'>平</span>倉：限價",
		"closetypeStop" : "<span class='text-space'>平</span>倉：止蝕",
		"closetypeBuyOco" : "<span class='text-space'>平</span>倉：自動替代",
		"closetypeLimitLabel" : "<span class='text-space'>限</span>價：",
		"closetypeStopLabel" : "<span class='text-space'>止</span>蝕：",
		
		
		"margin" : "保&nbsp;&nbsp;&nbsp;證&nbsp;&nbsp;金：",
		
		"label_buy" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;買&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入：",
		"label_sell" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;賣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出：",
		"sell" : "賣出",
		"buy" :  "買入",
		
		"typeLimit" : "<span class='text-space'>類</span>型：限價",
		"typeStop" : "<span class='text-space'>類</span>型：止蝕",
		"typeBuyOco" : "<span class='text-space'>類</span>型：自動替代",
		"typeBuyAdvance" : "<span class='text-space'>類</span>型：進階委託",
		"limitType": "限價",
		"stopType": "止蝕",
		"buyOcoType": "自動替代",
		"investmentQuotaTxt" : "投資額度：",
		"volumeTxt" : "<span class='text-space'>手</span>數：",
		"expirTxt" : "<span class='text-space'>期</span>限：" ,
		"pendingOrderNoTxt" : "委&nbsp;&nbsp;&nbsp;託&nbsp;&nbsp;號：",
		"limitAskTxt": "限價賣出：",
		"limitBuyTxt": "限價買入：",
		"stopAskTxt": "止蝕賣出：",
		"stopBuyTxt": "止蝕買入："
	};