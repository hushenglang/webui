var i18n = {};
var WebUiChartWords = {};
i18n.lang=0; //0 simplified chinese 1 tradtional chinese

i18n.tickhistorytitle = "成交前后报价明细";
i18n.tickhistorydemoalert = '本功能仅供真实账户查询';
i18n.tickhistorynotallowed = '本功能仅供2014年7月19日之后的数据查询';
i18n.tickhistoryurgenclose = '紧急平仓单报价序号暂不提供';
i18n.message = "提示";
i18n.ok = "确定";
i18n.cancel = "取消";
i18n.closed="关闭";
i18n.buy = "买入"; 
i18n.sell = "卖出";
i18n.connectionFail="连接失败";
i18n.connStatusFine="已连接";
i18n.connStatusFail="已断开";
i18n.accDisableOrConnectFail="账户不可用或者服务器连接失败";
i18n.connectionFailTip="对不起，正在连接市场数据，请稍后再试。";
i18n.readDateError="读取数据失败";
i18n.accReconnection="对不起，账户已经在它处登入，如需登入，请先从它处注销。错误号5";
i18n.accTraderOccupied="网络断开, 请尝试重新连接。错误号38";
i18n.connectionBreak="已断开连接";
i18n.logout="登出";
i18n.confirmLogout="您确定要登出这个账户吗？";
i18n.loginFail="登陆失败,错误代码";
i18n.loginException="登陆异常";
i18n.errorCode="错误号";
i18n.point="点";
i18n.indicatorPara="指标参数";
i18n.inputNumber="请输入数字";
i18n.pricePosition="价位";
i18n.chartMin="分钟线";
i18n.chartHour="小时线";
i18n.chartDay="日线";
i18n.chartWeek="周线";
i18n.chartMon="月线";
i18n.chartTip="数据加载中,稍等.....";
i18n.chartopen="开";
i18n.charthigh="高";
i18n.chartlow="低";
i18n.chartclose="收";
i18n.charttime="时";
i18n.llg="伦敦金";
i18n.lls="伦敦银";
i18n.openposition="开仓";
i18n.closeposition="平仓";
i18n.confirmCancelOrder="是否取消已有平仓委托？";
i18n.confirmCancelCurrentOrder="您确定要取消该笔委托单吗？";
i18n.daycss="日间";
i18n.nightcss="夜间";
i18n.tradeCommon_title="委托下单";
i18n.save="保存";
i18n.cancel="取消";

i18n.tick={};
i18n.tick.code="代码";
i18n.tick.name="名称";
i18n.tick.price="现价";
i18n.tick.sellPrice="卖价";
i18n.tick.buyPrice="买价";
i18n.tick.openPrice="开盘";
i18n.tick.high="最高";
i18n.tick.low="最低";
i18n.tick.lastDayPrice="昨收";
i18n.tick.bp="升跌";
i18n.tick.scope="升跌幅度";
i18n.tick.bInterestRate="买利率";
i18n.tick.sInterestRate="卖利率";
i18n.tick.time="时间";


i18n.news={};
i18n.news.tabnews="新闻";
i18n.news.messageGotoNum="输入页码有误!";
i18n.news.messageNum="请输入数字!";
i18n.news.close="关闭";
i18n.news.newstitle="新闻标题";
i18n.news.time="时间";
i18n.news.list="列表";

i18n.acposition={};
i18n.acposition.orderno="订单号";
i18n.acposition.ct="合约";
i18n.acposition.buysell="买/卖";
i18n.acposition.lot="手数";
i18n.acposition.openprice="开仓价";
i18n.acposition.closeprice="平仓价";
i18n.acposition.pl="盈亏";
i18n.acposition.interest="利息";
i18n.acposition.netpl="净盈亏";
i18n.acposition.unit="合约单位";
i18n.acposition.margin="保证金";
i18n.acposition.opentime="开仓时间";

i18n.closedposition={};
i18n.closedposition.cid="平仓号";
i18n.closedposition.ct="合约";
i18n.closedposition.buysell="买/卖";
i18n.closedposition.lot="手数";
i18n.closedposition.openprice="开仓价";
i18n.closedposition.closeprice="平仓价";
i18n.closedposition.pl="盈亏";
i18n.closedposition.interest="利息";
i18n.closedposition.netpl="净盈亏";
i18n.closedposition.unit="合约单位";
i18n.closedposition.coupon="回赠金额";
i18n.closedposition.opentime="开仓时间";
i18n.closedposition.closetime="平仓时间";

i18n.accountsummary={};
i18n.accountsummary.ct="合约";
i18n.accountsummary.buysell="买/卖";
i18n.accountsummary.buylot="买数量";
i18n.accountsummary.selllot="卖数量";
i18n.accountsummary.openprice="开仓价";
i18n.accountsummary.closeprice="平仓价";
i18n.accountsummary.pl="盈亏";
i18n.accountsummary.interest="利息";
i18n.accountsummary.netpl="净盈亏";
i18n.accountsummary.margin="保证金";
i18n.accountsummary.unit="合约单位";


i18n.dynamic={};
i18n.dynamic.time="时间";
i18n.dynamic.status="状态";
i18n.dynamic.info="信息";
i18n.dynamic.marketprice="市价";
i18n.dynamic.limitprice="限价";
i18n.dynamic.stop="停损";
i18n.dynamic.autoreplace="自动替代";
i18n.dynamic.openposition="开仓";
i18n.dynamic.closeposition="平仓";
i18n.dynamic.buy="买入";
i18n.dynamic.sell="卖出";
i18n.dynamic.llg="伦敦金";
i18n.dynamic.lls="伦敦银";
i18n.dynamic.done="已执行";
i18n.dynamic.wait="等待";
i18n.dynamic.cancel="已取消";
i18n.dynamic.altered="已修改";
i18n.dynamic.or="或";
i18n.dynamic.invalid="未生效";
i18n.dynamic.advpending="进阶委托";

i18n.pendingorder={};	
i18n.pendingorder.oid="委托号";
i18n.pendingorder.unit="合约";
i18n.pendingorder.ct="类别";
i18n.pendingorder.buysell="买/卖";
i18n.pendingorder.lot="手数";
i18n.pendingorder.limitprice="限价";
i18n.pendingorder.lost="停损";
i18n.pendingorder.status="状态";
i18n.pendingorder.limittime="期限";
i18n.pendingorder.ordertime="委托时间";
i18n.pendingorder.relatedid="关联单号";
i18n.pendingorder.remark="备注";
i18n.pendingorder.openposition="开仓";
i18n.pendingorder.closeposition="平仓";
i18n.pendingorder.invalid="未生效";
i18n.pendingorder.done="已执行";
i18n.pendingorder.wait="等待";
i18n.pendingorder.cancel = "已取消";
i18n.pendingorder.day="当日有效";
i18n.pendingorder.week="当周有效";

i18n.bulletin={};
i18n.bulletin.title="公告";
i18n.bulletin.noRecord="对不起,没有相关记录!";
i18n.bulletin.dateFormat="yyyy年MM月dd日";

i18n.report={};
i18n.report.allProduct="所有产品";
i18n.report.subtotal="小计";
i18n.report.total="总计";
i18n.report.marketPrice="市价";
i18n.report.limitPrice="限价";
i18n.report.stopLoss="停损";
i18n.report.autoChange="自动替代";
i18n.report.systemCancel="系统取消";
i18n.report.execution="执行";
i18n.report.manCancel="手动取消";
i18n.report.effectiveInDate="当日有效";
i18n.report.effectiveInWeekly="当周有效";
i18n.report.advancedCommissioned="进阶委托";
i18n.report.emergencyClose="紧急平仓";
i18n.report.systemClose="系统平仓";
i18n.report.departmemtDonatedMoney="汇赠钱";
i18n.report.networkDonatedMoney="网赠钱";
i18n.report.tokenDeposit="代币优惠";
i18n.report.tokenExpire="代币到期";
i18n.report.tokenCommission="代币佣金";
i18n.report.tokenProfit="代币盈亏";
i18n.report.tokenBrokerage="代币经纪佣金";
i18n.report.deposit="存款";
i18n.report.withdrawals="取款";
i18n.report.profit="盈亏";
i18n.report.fee="手续费";
i18n.report.commission="佣金";
i18n.report.systemCleared="系统清零";
i18n.report.cashback="回赠金额";
i18n.report.tokenDiscount="代币优惠";
i18n.report.TokenExpire="代币到期";
i18n.report.autoCancelWithdrawal="自动取消取款";
i18n.report.specialAdjustment="特殊金额调整";
i18n.report.preferential="优惠";
i18n.report.transfer="转账";
i18n.report.cgsefee="交易编码费";
i18n.report.mispayCgseFee="补缴交易编码费";
i18n.report.grants="返佣";
i18n.report.rebate="赠金";
i18n.report.consignReporttotalname="总可用优惠金额";
i18n.report.page="页";
i18n.report.noOfRecord="条记录";
i18n.report.buy="买";
i18n.report.sell="卖";
i18n.report.grantsGuarantee='保障优惠';

i18n.report.cashbackOption_rebate="回赠";
i18n.report.cashbackOption_token="代币";
i18n.report.weiye="尾页";
i18n.report.nextPage="下一页";
i18n.report.prevPage="上一页";
i18n.report.headPage="首页";
i18n.report.ye="页";
i18n.report.dao="到";
i18n.report.submit="确定";
i18n.report.success="查询成功";
i18n.report.tablename="报表";
i18n.report.noRecord="无记录";
i18n.report.ticknotavalible="数据传输中, 请阁下于交易10分钟后再查询, 谢谢!";

var WebUIError = {
		//server side
	"-1" : "参数无效",
	1 : "对不起，账户号码不正确，请重新输入。错误号1",
	2 : "对不起，账户已被停用，请联络我们的客户服务员。电邮：cs@24k.hk。错误号2",
	3 : "模拟账户过期，请开立真实账户。错误号3",
	4 : "对不起，密码不正确，请重新输入。错误号 4",
	5 : "对不起，账户已在它处登录。错误号5",
	6 : "发现新版本，请更新升级。",
	8 : "信息有误，请重试。错误号8",
	18 : "对不起，系统没有相关数据，请重试。错误号18",
	32 : "对不起，您已经多次输入错误账号或密码，请联系客户服务专员。错误号32",
	38 : "网络断开，请尝试重新连接。错误号 38",
	54 : "对不起，未激活的账户不可登陆。请阁下先入金激活账户然后再登录。错误号：54",
	5 : "对不起，账户已经被其他电脑登入。如果要登入，请先让其他电脑登出。错误号5	",
	38 : "网络断开，请尝试重新连接。错误号 38",
	13 : "对不起，已超出最大持仓手数（XX手）。错误号13",
	17 : "现时市价超出可接受范围，请重试。错误号17",
	19 : "对不起，订单已平仓，无效操作。错误号19",
	23 : "对不起，已超出最大持仓手数（XX手）。错误号23	",
	24 : "所需保证金不足，请存入资金。错误号24",
	30 : "对不起，交易失败，请稍后再试。错误号30",
	36 : "对不起，已超出最大持仓单上限（100张）。错误号36",
	42 : "账户额度发生变化，请重新下单。错误号42",
	43 : "账户额度发生变化，请重新下单。错误号43",
	47 : "价格已经变动，请重新下单。错误号 47",
	51 : "价格已经变动，请重新下单。错误号 51",
	52 : "	价格已经变动，请重新下单。错误号 52",
	53 : "价格已经变动，请重新下单。错误号 53",
	10 : "委托单参数错误，请重新输入。错误号10",
	11 : "委托价格超出可接受范围，请重新输入。错误号11",
	12 : "委托手数超出可接受范围，请重新输入。错误号12",
	15 : "对不起，委托单信息不存在，无效操作。错误号15",
	20 : "对不起，委托开仓不可超过20张单，请重试。错误号20",
	21 : "对不起，委托平仓手数不能超过持仓手数，请重试。错误号21",
	27 : "对不起，委托单信息不存在，无效操作。错误号27",
	28 : "委托单已执行，不可修改。错误号28",
	44 : "错误的进阶单，请重试。错误号44",
	9 : "非交易时段，操作无效。错误号9",
	16 : "市场已暂停，请稍后交易。错误号16",
	25 : "数据传输失败，请稍后再试。错误号25",
	26 : "交易暂时无法进行，请稍后再试。错误号26",
	33 : "系统结算，请稍候交易，错误号33",
	7 : "没有权限 .错误号 7",
	22 : "对不起，系统更新中，暂停操作。错误号 22",
	31 : "服务器内存不足。错误号31",
	37 : "错误的回赠配置。错误号37",
	44 : "错误的进阶单，请重试。错误号44",
	45 : "非订制用户不可进行相关操作，错误号45",
	46 : "错误的会籍。错误号46",
		
	//client side
		10101: "登录超时，请重试。错误号10101",
		10102: "请输入账户。错误号10102",
		10103: "请输入密码。错误号10103",
		10113: "非交易时段，操作无效.错误号10113",
		10120: "请联络客服服务专员.错误号10120",
		10104: "请输入有效手数。有效手数为0.05的倍数.错误号10104",
		10119: "单笔交易的有效手数范围是（最小手） 手-（最大手）  手.错误号10119",
		10105: "請輸入正確可成交範圍（{0}-{1}美元）。錯誤號10105",
		10106: "限价买入价须低于市场买价至少XX美元.错误号10106",
		10107: "限价卖出价须高于市场卖价至少XX美元。错误号10107",
		10108: "停损买入价须高于市场买价至少XX美元.错误号10108",
		10109: "停损卖出价须低于市场卖价至少XX美元。错误号10109",
		10110: "限价买入价须低于市场买价至少XX美元，停损买入价须高于市场买价至少YY美元。错误号10110",
		10111: "限价卖出价须高于市场卖价至少XX美元，停损卖出价须低于市场卖价至少YY美元.错误号10111",
		10112: "委托单价格超出可接受范围（↑↓XX美金）.错误号10112",
		10122: "平仓委托价须至少距离开仓委托价格XX美元。错误号10122",
		10123: "仓委托价格至多距离开仓委托价格XX美元。错误号10123",
		10123: "平仓委托价格至多距离开仓委托价格XX美元。错误号10123",
		10122: "平仓委托价须至少距离开仓委托价格XX美元。错误号10122",
		10116: "操作超时，请稍后查询或重新登录，以仓位动态和报表的实际成交记录为准。错误号10116",
		10113: "非交易时段，操作无效.错误号10113",
		10118: "该订单正在审批中，不可交易。错误号10118",
		80001: "请输入有效手数，有效手数为0.05的整倍数",
		10117: "对不起，平仓手数不能超过持仓手数，请重试.错误号10117",
		80002: "是否取消已有平仓委托？  确定  取消",
		80003: "点击‘确定’，直接进行平仓，同时原有平仓委托全数取消",
		80004: "点击‘取消’，视为不进行市价平仓操作，将不进行任何操作处理’",
		80005: "同开仓， 错误号有10105至10111",
		10116: "操作超时，请稍后查询或重新登录，以仓位动态和报表的实际成交记录为准。错误号10116",
		10113: "非交易时段，操作无效.错误号10113",
		80006: "同开仓， 错误号有10105至10111",
		10116: "操作超时，请稍后查询或重新登录，以仓位动态和报表的实际成交记录为准。错误号10116"
};

WebUiChartWords.wordLists={
		"defaultWord":{"1D":"",
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
			"RSI":" RSI 顏色",
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
			"save":"保存",
			"cancel":"取消",
			"Create":"新增",
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
			"Period":"周期",
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
			"Standard Deviations":"标准差",
			"Moving Average Type":"",
			"Trade Vol":"",
			"Min Tick Value":"",
			"Swing":"",
			"Limit Move Value":"限制移动值",
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
			"Slope":"",
			"Result":"输出颜色",
			"Field":"选项",
			"Open":"开市",
			"High":"最高",
			"Low":"最低",
			"Close":"收市",
			"Type":"类型",
			"Simple":"简单",
			"Exponential":"指数", 
			"Time Series":"时间序列",
			"Triangular":"三角形",
			"Variable":"变异",
			"Weighted":"加权",
			"Wells Wilder":"威尔德平滑",
			"MA":"MA 颜色",
			"Fast MA Period":"快速均线参数",
			"Slow MA Period":"慢速均线参数",
			"Signal Period":"离差均线参数",
			"MACD":"MACD 颜色",
			"Signal":"Signal 颜色",
			"Limit Move Value":"限制移动值",
			"Standard Deviations":"标准差",
			"Moving Average Type":"MA 类型",
			"Bollinger Band Top":"布林带上轨",
			"Bollinger Band Median":"布林带中轨",
			"Bollinger Band Bottom":"布林带下轨",
			"Minimum AF":"最小AF",
			"Maximum AF":"最大AF",
			"Smooth":"平稳",
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
	    "title1" : "$/点",
	    "title2" : " 1点=",
		"buyType": "<span class='text-space'>买</span>入：",
		"askType": "<span class='text-space'>卖</span>出：",
		"investmentQuotaRequestNum" : "投资额度必须为数字",
		"investmentQuotaRange" : "请输入有效投资额度",
		"investmentQuotaOnlyInputTwoDights" : "投资额度小数位不能超过两位",
		"investmentValid": "请输入正确的投资额度({0})。错误号10234",
		"investmentValidIsEnough" : "您当前的可用额度不足以支付手续费，是否将投资额度调整为{0},以尝试继续交易?",
		"mid" : "之间",
		"volumeNum" : "您输入的手数无效,请输入正确的数值",
		"volumeRange" : "请输入有效的手数",
		"volumeRangeOnlyInputTwoDights" : "手数小数位不能超过两位",
		"intSize" : "的整数倍",
		"volumeValid": "请输入有效手数。有效手数为{0}的倍数.错误号10104",
		"10119": "单笔交易的有效手数范围是（{0}） 手-（{1}） 手.错误号10119",
		"transRangeNum" : "您输入的可成交范围无效,请输入正确的数值",
		"transRangeValid": "请输入正确可成交范围({0}-{1}点),错误号10208",
	    "pendingOrderPriceMin" : "委托价格不在可接受范围内，请检查价格后再输入。错误号10209",
	    "pendingOrderPriceMax" : "委托价格不在可接受范围内，请检查价格后再输入。错误号10210",
		"volume": "手",
		"day" : "/天",
		"sumitting" : "提交中...",
		"sumitedSuccess" : "已执行",
		"dayEffective": "当日有效",
		"weekEffective" : "当周有效",
		
		"opentypeLimit" : "<span class='text-space'>开</span>仓：限价",
		"opentypeStop" : "<span class='text-space'>开</span>仓：停损",
		"opentypeBuyOco" : "<span class='text-space'>开</span>仓：自动替代",
		"closetypeLimit" : "<span class='text-space'>平</span>仓：限价",
		"closetypeStop" : "<span class='text-space'>平</span>仓：停损",
		"closetypeBuyOco" : "<span class='text-space'>平</span>仓：自动替代",
		"closetypeLimitLabel" : "<span class='text-space'>限</span>价：",
		"closetypeStopLabel" : "<span class='text-space'>停</span>损：",
		
		
		"margin" : "保&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;金：",
		
		"label_buy" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;买&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入：",
		"label_sell" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出：",
		"sell" : "卖出",
		"buy" :  "买入",
		
		"typeLimit" : "<span class='text-space'>类</span>型：限价",
		"typeStop" : "<span class='text-space'>类</span>型：停损",
		"typeBuyOco" : "<span class='text-space'>类</span>型：自动替代",
		"typeBuyAdvance" : "<span class='text-space'>类</span>型：进阶委托",
		"limitType": "限价",
		"stopType": "停损",
		"buyOcoType": "自动替代",
		"investmentQuotaTxt" : "投资额度：",
		"volumeTxt" : "<span class='text-space'>手</span>数：",
		"expirTxt" : "<span class='text-space'>期</span>限：" ,
		"pendingOrderNoTxt" : "委&nbsp;&nbsp;&nbsp;托&nbsp;&nbsp;号：",
		"limitAskTxt": "限价卖出：",
		"limitBuyTxt": "限价买入：",
		"stopAskTxt": "停损卖出：",
		"stopBuyTxt": "停损买入："
	};
