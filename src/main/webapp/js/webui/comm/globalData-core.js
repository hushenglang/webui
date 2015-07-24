/**
 * 公共所有的行情数组。
 */
var symbolArray = new Array();

/**
 * AmsSymbolConfig数组
 */
var amsSymbolConfigArray = new Array();

/**
 * 处理后的市价单对象
 */
var orderDealData = {};

/**
 * 持仓列表
 */
var postList = [];
/**
 * 处理的委托单对象
 */
var orderUpdateData = {};

/**
 * 账户最大的订单对象
 */
var groupOrderlimit = {};

/**
 * 全局变量保存产品是否可交易数据
 */ 
var symbolTradeArray = new Array();

/**
 * 当前时间是否是假期
 */
var isHoliday = false;

/**
 * 当前时间是否是周末
 */
var isWeekend = false;

/**
 * 是否在LLG期数范围之内
 */
var isSymbolSessionLLG = false;

/**
 * 是否在LLS期数范围之内
 */
var isSymbolSessionLLS = false;

var llgTimerflagCount = 0; //这是是做为修改期数的全局变量, 目的是为了避免同一时段多次修改期数后, 由于上一次settimeout的执行无法关闭导致的问题
var llsTimerflagCount = 0; //这是是做为修改期数的全局变量, 目的是为了避免同一时段多次修改期数后, 由于上一次settimeout的执行无法关闭导致的问题

var ismarketSubmit = false;

var tradeTimeOutObj;//保存每次提交市价单或委托单后, 60s失效的settimeout对象.目的是在60s内可清除此timeout.

var ispendingSubmit;//为了避免提交委托单时多个相同监听接口的冲突,这里做一个开关变量. 

/**
 * 设置产品是否可交易数据
 */
var setSymbolTradeArray = function(symbolTradeObj){
	var isNew = true;
	for(var index in symbolTradeArray){
		var obj = symbolTradeArray[index];
		if(obj.prdid == symbolTradeObj.prdid){
			symbolTradeArray.splice(index,1);
			symbolTradeArray.push(symbolTradeObj);
			isNew = false;
			break;
		}
	}
	if(isNew){
		symbolTradeArray.push(symbolTradeObj);
	}
};

/**
 * 判断某个产品是否可交易
 * 
 */
var isSymbolTradeOpen = function(prdid){
	if(prdid==0){
		return isSymbolSessionLLG;
	}
	if(prdid==1){
		return isSymbolSessionLLS;
	}
	return false;
};


/**
 * 获取公共产品数组。
 * @returns {Array}
 */
var getSymbolArray = function() {
	return symbolArray;
};

/**
 * 根据产品source获取产品对象信息。
 * @param source 產品Tick的數據源。如：XAUUSD（伦敦金）
 * @returns
 */
var getSymbol4Code = function(code) {
	var tempArray = getSymbolArray();
	if (tempArray) {
		for (var index = 0; index < tempArray.length; index ++) {
			if (tempArray[index]['source'] == code) {
				return tempArray[index];
			}
		}
	}
};

/**
 * 根据产品代码获取产品对象信息。
 * @param code 产品代码。如：LLG 或 GT1\PM\LLG （伦敦金）
 * @example getSymbolByPrdcode("LLG") 或 getSymbolByPrdcode("GT1\PM\LLG")
 */
var getSymbolByPrdcode = function(code) {
	var tempArray = getSymbolArray();
	if (tempArray && tempArray.length > 0) {
		code = Util.getShowPrdCode(code);
		for (var index = 0; index < tempArray.length; index ++) {
			if (Util.getShowPrdCode(tempArray[index]["prdcode"]) == code) {
				return tempArray[index];
			}
		}
	}
};

/**
 * 功能：获取AmsSymbolConfig数组
 */
getAmsSymbolConfigArray = function(){
	return amsSymbolConfigArray;
};

/**
 * 功能：设置AmsSymbolConfig的相关数据
 *   1)如果AmsSymbolConfig数组中没有该产品，则将该产品配置信息放入数组
 *     如果已经有了该产品，则更新数组中对应产品的信息(比如在admin端改了相关参数,从Node.js服务器推送过来后,这里就需要更新)
 */
setAmsSymbolConfigArray = function(data){
	if (data){
		for (var index = 0; index < data.length; index ++) {
			if(amsSymbolConfigArray.length == 0 ){
				amsSymbolConfigArray.push(data[index]);
			}else{
				var dataIndex = data[index];
				var flag = false;
				for(var i=0;i<amsSymbolConfigArray.length;i++){
					if(amsSymbolConfigArray[i]['prdcode'] == dataIndex['prdcode']){
						amsSymbolConfigArray[i] = dataIndex;
						flag = true;
						break;
					}
				}
				if(!flag){
					amsSymbolConfigArray.push(dataIndex);
				}
			}
		}
     }
};

/**
 * 功能：根据产品code获取AmsSymbolConfig信息
 * @param  prdcode           产品code
 * @return AmsSymbolConfig   AmsSymbolConfig对象相关属性
 */
getAmsSymbolConfig4Code = function(prdcode){
	var tempArray = getAmsSymbolConfigArray();
	if (tempArray) {
		for (var index = 0; index < tempArray.length; index ++) {
			if (tempArray[index].prdcode == prdcode) {
				return tempArray[index];
			}
		}
	}
};
/**
 * 功能：根据代理商设定的行情产品的flags判断，用户的该产品是否予以显示
 * @param prdcode 行情产品的prdcode
 * @returns true: 展示；false：不展示；
 */
showSymbol4AmsConfig = function(prdcode) {
	var amsSymbolConfig = getAmsSymbolConfig4Code(prdcode);
	if (amsSymbolConfig) {
		if (amsSymbolConfig.flags & 0x0001) {
			return true;
		} else {
			return ;
		}
	} else {
		return false;
	}
};

/**
 * 功能：获取处理后的市价单数据
 */
getOrderDealData = function(){
	return orderDealData;
};

/**
 * 功能：设置处理后的市价单的相关数据
 */
setOrderDealData = function(data){
	if (data){
		orderDealData = data;
	}
};

/**
 * 功能：根据市价单Id获取处理后的市价单信息
 * @param  orderId   市价单Id
 * @return  处理后的市价单信息
 */
getOrderDeal4OrderId = function(orderId) {
	var orderDealData = getOrderDealData();
	if(orderDealData) {
		if(orderDealData.order_id == orderId){
			return orderDealData;
		}
	}
};

/**
 * 功能：获取处理后的委托单数据
 */
getOrderUpdateData = function(){
	return orderUpdateData;
};

/**
 * 功能：设置处理后的委托单的相关数据
 */
setOrderUpdateData = function(data){
	if (data){
		orderUpdateData = data;
	}
};

/**
 * 功能：根据委托单Id获取处理后的委托单信息
 * @param  orderId   委托单Id
 * @return  处理后的委托单信息
 */
getOrderUpdate4OrderId = function(orderId){
	var orderUpdateData = getOrderUpdateData();
	if(orderUpdateData) {
		if(orderUpdateData.order_id == orderId){
			return orderUpdateData;
		}
	}
};

/**
 * 功能：获取处理后的最大的订单数数据
 */
getGroupOrderlimitData = function(){
	return groupOrderlimit;
};

/**
 * 功能：设置处理后的最大的订单数的相关数据
 */
setGroupOrderlimitData = function(data){
	if (data){
		groupOrderlimit = data;
	}
};

// 全局变量类
var Global = {
	'tick' : null,// 实时行情
	'bid_022' : 0,// 伦敦金买价
	'ask_022' : 0,// 伦敦金卖价
	'bid_023' : 0,// 伦敦银买价
	'ask_023' : 0,// 伦敦银卖价
	'newP_022' : 0,// 伦敦金现价
	'newP_023' : 0,// 伦敦银现价
	'time_022' : 0,// 伦敦金更新时间
	'time_023' : 0,// 伦敦银更新时间
	'last_chart_time_022' : 0,// 伦敦金K线图上一次更新时间
	'last_chart_time_023' : 0,// 伦敦银K线图上一次更新时间
	'sumNetProfit' : 0,// 总净盈亏
	'netValue' : 0,// 净值
	'validValue' : 0,// 可用资金
	'depositLevel' : 0,// 按金百分比
	'loginResult' : -1,// 登陆结果
	'last2DayQuotes_022' : null,// 伦敦金最近两天行情
	'last2DayQuotes_023' : null,// 伦敦银最近两天行情
	'accountBaseInfo' : null,// 账户信息
	'userInformation' : null,// 用户信息
	'symbolList' : null,// 产品信息
	'symbol_022' : null,// 伦敦金产品配置
	'symbol_023' : null,// 伦敦银产品配置
	'configs' : null,// 配置信息
	'config_022' : null,// 伦敦金配置信息
	'config_023' : null,// 伦敦银配置信息
	'loginname':$('meta[name="loginname"]').attr("content"),//登录名称
	'contextPath':$('meta[name="contextPath"]').attr("content"),//域名地址
	'currentLanguage':$('meta[name="currentLanguage"]').attr("content"),//语言 zh_CN
	'connectStatus':'disconnect',//连接状态
	'userStatus':0,//用户状态 0:启用,-2:暂停，1：冻结，-1：禁用
	'maxloss':0//最大虧損配額,maxloss 不等於0就是點選了
};
// 常量类
var Constant = {
	'PRDCODE_022' : 'GT1/PM/LLG',// 伦敦金产品编码
	'PRDCODE_023' : 'GT1/PM/LLS',// 伦敦银产品编码
	'SOURCE_022':'XAUUSD',// 伦敦金产品源代码
	'SOURCE_023':'XAGUSD',// 伦敦银产品源代码
	'CMD_LAST_TICK' : 0x10303,// 接口编号：最新行情
	'CMD_QUOTE_QUERY' : 0x10301,// 接口编号：行情查询
	'CMD_QUOTE_PERIOD_QUERY' : 0x10302,// 接口编号：行情查询
	'CMD_OPEN_MARKET' : 0x10100,// 接口编号：市价开仓
	'CMD_CLOSE_MARKET' : 0x10101,// 接口编号：市价平仓
	'CMD_PENDING_ORDER' : 0x10102,// 接口编号：委托开仓/平仓
	'CMD_CANCEL_ORDER' : 0x10103,// 接口编号：取消委托单
	'CMD_ALTER_WAGER' :    0x10109, // 接口编号：调整额度
	'CMD_MODIFY_ORDER' : 0x10104,// 接口编号：修改委托单
	'CMD_GET_SINGLE_NEWS' : 0x10402, //接口编号：拿新闻内容
	'CMD_GET_NEWS_BY_PAGE' : 0x10401, //接口编号：拿新闻列表
	'CMD_ORDER_EXCUTED': 0x10106, // 接口编号： openMarket/closeMarket/pending/PendingOrderRet结果
	'QUOTE_QUERY_SEQ_022' : 320022,// 请求编号：伦敦金最后两天行情查询
	'QUOTE_QUERY_SEQ_023' : 320023,// 请求编号：伦敦银最后两天行情查询
	'QUOTE_CHART_QUERY_022' : 210022,// 请求编号：伦敦金K线图数据查询
	'QUOTE_CHART_QUERY_023' : 210023,// 请求编号：伦敦银K线图数据查询
	'QUOTE_QUERY_PERIOD_TYPE_MIN' : 1,
	'QUOTE_QUERY_PERIOD_TYPE_HOUR' : 2,
	'QUOTE_QUERY_PERIOD_TYPE_DAY' : 3,
	'QUOTE_QUERY_PERIOD_TYPE_WEEK' : 4,
	'QUOTE_QUERY_PERIOD_TYPE_MONTH' : 5,
	'QUOTE_QUERY_FLAG_NTO' : 0,// 从新到旧
	'QUOTE_QUERY_FLAG_OTN' : 1,// 从旧到新
	'LOGIN_RESULT_OK' : 0,// 登陆结果：成功
	'TRADE_RIGHT_DISABLED' : 0,// 交易关闭
	'TRADE_RIGHT_BUY' : 1,// 仅限长仓
	'TRADE_RIGHT_SELL' : 2,// 仅限短仓
	'TRADE_RIGHT_CLOSE' : 3,// 仅限平仓
	'TRADE_RIGHT_ALL' : 4,// 全部可进行
	'DIV_ID_OPEN_MARKET' : 'openMarketDiv',// 开仓单交易窗口ID
	'DIV_ID_CLOSE_MARKET' : 'closeMarketDiv',// 平仓交易窗口ID
	'RET_CODE_SUCCESS' : 0,// 请求成功
	'RET_CODE_BROKER' : 1011,// 请求需要延迟
	'RET_CODE_PENDING_SUCCESS' : 1000,// 委托单成功
	'RET_CODE_WRONG_PRICE' :111,// 价格有误
	'RET_CODE_ORDER_INVL_PRICE':1009 ,//GT1价格有误
	'RET_CODE_INVL_VOLUME':1018,//GT1手数无效
	'RET_CODE_ON_HOLIDAY':1013,//非交易时段
	'RET_CODE_VOLUME':112,//手数错误
	'ENTRY_OPEN' : 0,// 开仓
	'ENTRY_CLOSE' : 1,// 平仓
	'GT1_LANG_CHINESE_SIMP' : 0x0804, // 简体中文
	'GT1_LANG_CHINESE_TRAD' : 0x0404, // 繁体
    'GT1_LANG_ENGLISH' : 0x0809,      // 英文
	'INVALID_VAL' : "---"/*无效值显示*/
};

// 索引，便与管理与维护
var Index = {
	'POSLIST_TD_PROFIT' : 4,
	'POSLIST_TD_VOLUME' : 3,
	'ORDERLIST_TD_STATE' : 4,
	'ORDERLIST_TD_VOLUME' : 3
};

// 请求全局变量
var Request = {
	'openMarket' : {
		cmd : Constant.CMD_OPEN_MARKET,
		ret_cmd : Constant.CMD_ORDER_EXCUTED,
		seq : 0,
		flag : true
	},
	'pendingOrder' : {
		cmd : Constant.CMD_PENDING_ORDER,
		ret_cmd : Constant.CMD_ORDER_EXCUTED,
		seq : 0,
		flag : true
	},
	'closeMarket' : {
		cmd : Constant.CMD_CLOSE_MARKET,
		ret_cmd : Constant.CMD_ORDER_EXCUTED,
		seq : 0,
		flag : true
	},
	'cancelOrder' : {
		cmd : Constant.CMD_CANCEL_ORDER,
		seq : 0,
		flag : true
	},
	'alterWager' : {
		cmd : Constant.CMD_ALTER_WAGER,
		ret_cmd : Constant.CMD_ORDER_EXCUTED,
		seq : 0,
		flag : true
	},
	modifyOrder : {
		cmd : Constant.CMD_MODIFY_ORDER,
		ret_cmd : Constant.CMD_ORDER_EXCUTED,
		seq : 0,
		flag : true
	}
};

/**
 * 委托单类型枚举
 */
var OrderType = {
	UNKNOWN : 0,
	BUY : 1,
	SELL : 2,
	BUY_LIMIT : 1, 	/*买-限价*/
	SELL_LIMIT : 1, /*卖-限价*/
	BUY_STOP : 2, 	/*买-停损*/
	SELL_STOP : 2, 	/*卖-停损*/
	BUY_STOP_LIMIT : 7,
	SELL_STOP_LIMIT : 8,
	BUY_OCO : 3, 	/*买-自动替代*/
	SELL_OCO : 3, 	/*卖-自动替代*/
	BUY_ANDVANCE : 4, 	/*买-进阶委托*/
	SELL_ANDVANCE : 4 	/*卖-进阶委托*/
};

//pending订单类型定义
var pendingOrdertype ={  
	LIMIT : 'L',        // 限价
	STOP : 'S',         // 止损
	BUY_OCO : 'B',       // 自動替代
	ADVANCE : 'A'		//进阶委托
};

// 订单状态枚举
var OrderState = {
	'STARTED' : 1,// 未生效
	'PLACED' : 2,// 等待
	'FILLED' : 4,// 已执行
	'CANCELED' : -1,// 已取消
	'EXPIRED' : -2 // order expired
};

//订单类型定义
var pendingOrdertype ={  
	LIMIT : 'L',        // 限价
	STOP : 'S',         // 止损
	BUY_OCO : 'B',       // 自動替代
	ADVANCE : 'A'		//进阶委托
};

//邮件属性
var mail ={
		lastMailIdkey: "last_mail_id",
		Request_Mail:0x10108
};


//新闻接口对应语言值
var newsLanguageValue=function (){
	var language=3;
	if(Global.currentLanguage=='zh_TW'){
		language=3;
	}else if(Global.currentLanguage=='zh_CN'){
		language=2;
	}else{
		language=1;
	}
	return language;
};

//node接口那边定义的用户状态，必须用userRight接口传递过来的para.user_right与之进行位与操作才能判断出用户的状态
var userNodeType = {
		USER_RIGHT_TRADE_DISABLED : 0x00000004, // 冻结 公式： right & USER_RIGHT_TRADE_DISABLED
		USER_RIGHT_SUSPENDED	: 0x00002000,	// s状态  公式： right & USER_RIGHT_SUSPENDED
		USER_RIGHT_LOCKED : 0x00000800,	// 锁定 公式： right & USER_RIGHT_LOCKED
		USER_RIGHT_ENABLED : 0x00000001 // 禁用  公式：！（right & USER_RIGHT_ENABLED ）
};
// 判断用户权限
checkUserAuth = function(action) {
	if (Global.userStatus & userNodeType.USER_RIGHT_TRADE_DISABLED) {// 冻结 
		return globelData.userStatus['error_msg_1'];
	} else if (Global.userStatus & userNodeType.USER_RIGHT_SUSPENDED) {// s状态
		if (action && (action == globelData.action.delete_delegate || action == globelData.action.close_order)) { // s状态可以取消委托单,订单
		} else {
			return globelData.userStatus['error_msg_-2'];
		}
	} else if (Global.userStatus & userNodeType.USER_RIGHT_LOCKED) {	// 锁定
		return globelData.userStatus['error_msg_1'];
	} else if ( ! (Global.userStatus & userNodeType.USER_RIGHT_ENABLED)) {// 禁用
		return globelData.userStatus['error_msg_-1'];
	}
};


var globelData = {};
{
	/**
	 * 交易之前的判断
	 * @param data {globelData.action(required:true), prdcode|prcode(required:false), showMsg(required:false, defautl:false)}
	 * @returns
	 */
	globelData.getSymbolTradeState = function (data)
	{
		var result = {code:-1, msg:""};
		var showMsg = data.showMsg;
		var action = data.action;
		var prdcode = data.prdcode;
		
		if(Util.isEmpty(prdcode)){
			prdcode = data.prcode;
		}
		if(prdcode.indexOf("\\") >= 0){
			prdcode = Util.getShowPrdCode(prdcode);
		}
		
		if(Global.connectStatus == 'connect'){
			var userStatus = Global.userStatus;
			if(userStatus & globelData.userStatus.USER_RIGHT_SUSPENDED){
				userStatus = globelData.userStatus.USER_RIGHT_SUSPENDED;
			}else if(userStatus & globelData.userStatus.USER_RIGHT_TRADE_DISABLED){
				userStatus = globelData.userStatus.USER_RIGHT_TRADE_DISABLED;
			}
			var userAuth = action[userStatus];
			//用户状态
			if(userAuth){
				if(prdcode == "XAUUSD"){ // 伦敦金
					prdcode = "LLG";
				}
				if(prdcode == "XAGUSD"){ // 伦敦银
					prdcode = "LLS";
				}
				var symbolCfgInfo = getSymbolByPrdcode(prdcode);
				if(symbolCfgInfo){
					var amsSymbolCfgInfo = getAmsSymbolConfig4Code(symbolCfgInfo.prdcode);
					var flags = symbolCfgInfo.flags;
					var flagsAms = amsSymbolCfgInfo.flags;
					var defaultflagAms = amsSymbolCfgInfo.flags;

					//非交易时段（假期、周末）；
					if(flags & globelData.symbolFlags.SYMBOL_FLAG_ABLE){
						//defaultflagAms 0x00000008: 使用默認交易許可,  flagsAms 0x0001: 啟用
						if(defaultflagAms & 0x00000008 || flagsAms & 0x0001){
							if (flags & globelData.symbolFlags.SYMBOL_FLAG_OUT_OF_SESSION || flags & globelData.symbolFlags.SYMBOL_FLAG_HOLIDAY){
								result.msg = WebUIError["10202"];
							}else{
								if(action){
									//产品交易状态（全部交易、禁用、仅平仓）；
									var trade_right = symbolCfgInfo.trade_right;
									var ams_trade_right = amsSymbolCfgInfo.trade_right;
									if(trade_right == globelData.tradeRight.all){
										result.code = 1;
									}else if(trade_right == globelData.tradeRight.close_position && action.operate == globelData.tradeRight.close_position){
										result.code = 1;
									}else{
										result.msg = WebUIError["10211"];										
									}
									
									//用户产品交易状态（全部交易、禁用、仅平仓）；
									if(result.code == 1){
										if(ams_trade_right == globelData.tradeRight.all){
											result.code = 1;
										}else if(ams_trade_right == globelData.tradeRight.close_position && action.operate == globelData.tradeRight.close_position){
											result.code = 1;
										}else{
											result.code = -1;
											result.msg = WebUIError["10211"];										
										}
									}
								}else{
									result.code = 1;
								}
							}
						}else{
							result.msg = WebUIError["10211"];
						}
					}else{
						result.msg = WebUIError["10202"];
					}
				}else{
					result.msg = WebUIError["10211"];
				}
			}else{
				result.msg = globelData.userStatus["error_msg_" + userStatus];
//				result.msg = userAuthMsg;
				if(Util.isEmpty(result.msg)){
					result.msg = WebUIError["10206"];
				}
			}
		}else{
			result.msg = WebUIError["10204"];
		}
		
		if(result.code == -1){
			if(typeof showMsg == 'undefined' || showMsg == null || showMsg == true){
				Alert(result.msg);
			}
		}
		return result;
	};
	//产品权限
	globelData.tradeRight={
		"close":0,//	關閉
		"long_position":1,//	只限長倉
		"short_position":2,//	只限短倉
		"close_position":3,//	只限平倉
		"all":4//	全部可進行
	};
	//假期状态
	globelData.symbolFlags={
		SYMBOL_FLAG_ABLE			: 0x0800,
		SYMBOL_FLAG_DISABLE			: 0x0001,
		SYMBOL_FLAG_OUT_OF_SESSION	: 0x0002,
		SYMBOL_FLAG_HOLIDAY			: 0x0004,
		SYMBOL_FLAG_SOURCE			: 0x0008
	};
	//用户状态
	globelData.userStatus={
		"error_msg_0":"",/*启用*/
		"error_msg_4":WebUIError["10206"], /*冻结*/
		"error_msg_8192": WebUIError["10205"], /*暂停 S*/
		
		USER_RIGHT_NONE				:0x00000000,  // none - 禁用
		USER_RIGHT_ENABLED			:0x00000001,  // client allowed to connect
		USER_RIGHT_PASSWORD			:0x00000002,  // client need to change password
		USER_RIGHT_TRADE_DISABLED	:0x00000004,  // client trading disabled   -- 冻结
		USER_RIGHT_INVESTOR			:0x00000008,  // client is investor
		USER_RIGHT_CONFIRMED		:0x00000010,  // client certificate confirmed
		USER_RIGHT_TRAILING			:0x00000020,  // trailing stops are allowed
		USER_RIGHT_READONLY			:0x00000200,  // client is readonly
		USER_RIGHT_FORBIDDEN		:0x00000400,  // account is forbidden, never use again
		USER_RIGHT_LOCKED			:0x00000800,  // account is locked for security, such as wrong password   -- 锁定
		USER_RIGHT_EXPIRED			:0x00001000,  // account is expired
		USER_RIGHT_SUSPENDED		:0x00002000  // account cannot create new position  -- S状态
	};
	/**
	 * 账号状态权限默认为false，如 add_order 冻结账号（1）无权限 "1":false,可以省略
	 */
	globelData.action={
		//'新增市价单'
		add_order:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": false, /*暂停 S 0x00002000*/
			"operate": globelData.tradeRight.all//tradeRight
		}, 
		//'新增委托'
		add_delegate:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": false, /*暂停 S 0x00002000*/
			"operate":globelData.tradeRight.all //tradeRight
		}, 
		//'修改委托'
		update_delegate:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": false, /*暂停 S 0x00002000*/
			"operate":globelData.tradeRight.all //tradeRight
		}, 
		//'删除委托'
		delete_delegate:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": true, /*暂停 S 0x00002000*/
			"operate":globelData.tradeRight.close_position //tradeRight
		}, 
		//'修改投资额度'
		update_amount:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": false, /*暂停 S 0x00002000*/
			"operate":globelData.tradeRight.all //tradeRight
		}, 
		//'关闭订单'
		close_order:{
			"1":true,/*启用*/ 
			"4":false, /*冻结  0x00000004*/
			"8192": true, /*暂停 S 0x00002000*/
			"operate":globelData.tradeRight.close_position //tradeRight
		}
	};
};
//清空全局数组和对象
clearGlobalDataArrayAndObject= function()
{
	// 清空公共所有的行情数组。
	clearArray(symbolArray);
	//清空 AmsSymbolConfig数组
	clearArray(amsSymbolConfigArray);
	// 清理下单的公共对象，释放内存。
	clearTradeData();
};
