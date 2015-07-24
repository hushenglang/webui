/**
 * 开仓交易全局对象
 */



/**
 * 市价、委托单data对象
 * 包含的key目前有:
 *  dtime(交易时间)、tradeType(买卖类型)、prdcode(产品Code)、produceName、minDistance(限价、止损价的最小距离)、maxslrange(限价、止损价的最大距离)、pipsDigits(Pips小数位)
 *  officePriceDights(报价小数位)、symbol(产品symbol)、eachPointPrice(产品每点的价值)、investmentQuotaMin(最小投资额度)、investmentQuotaMax(最大投资额度)
 *  investmentQuotaStep(投资步长)、volumeListSize(默认手数列表的大小)、volumeLotinfo(默认手数列表)、minimalVolume(最小手数)、maximalVolume(最大手数)、
 *  defaultTransactionRange(默认成交范围)、maxTransactionRange(最大成交范围)、限价步长
 */
var marketAndOrderObj={
	isOpenTradeWindow : false,    // 判断是否打开交易窗口
	defaultTradeType: "0",        // 买卖类型
	dtime: "",                    // 交易时间
	ask: "",                      // 卖价
	buy: "",                      // 买价
	prdcode: "",                  // 产品Code
	produceName: "",              // produceName(产品名)
	minDistance: "",              // 限价、止损价的最小距离
	maxslrange: "",               // 限价、止损价的最大距离
	limitAndStopStep: "",         // 限价和止损步长
	pipsDigits: "",               // PIPs小数位
	officePriceDights: "",        // 报价小数位
	symbol: "",                   // 产品symbol
	eachPointPrice: "",           // 产品每点的价值
	investmentQuotaMin:"",        // 最小投资额度
	investmentQuotaMax:"",        // 最大投资额度
	investmentQuotaStep:"",       // 投资额度步长
	defaultInvestmentQuota:"",    // 默认投资额度(计算出来的)
    volumeListSize:"",            // 默认手数列表的大小
    volumeLotinfo: "",            // 默认手数列表
    minimalVolume: "",            // 最小手数
    maximalVolume: "",            // 最大手数
    volumeStep : "",              // 手数步长
    defaultVolume:"",             // 默认手数(计算出来的)
    defaultTransactionRange: "",  // 默认成交范围
    maxTransactionRange : "",     // 最大成交范围
    transactionRangeStep : "",    // 成交范围步长
    marketSeq : "",               // 市价单序列号  
    pendingOrderSeq : "",         // 委托单序列号
    commission : "",              // 手续费参数
    buyinterest : "",                // 买利息参数
    sellinterest : "",               // 卖利息参数
    isPosition : false,           // 是否持仓
    isInvestment : false,         // 是否投资组合
    positionOrder : {},           // 持仓单对象
    isAllowCloseTradeWindow : false, // 是否允许关闭交易窗口
    marketSubmitStartTime : "",      // 市价单开始提交时间
    isSubmittingMarket : false,      // 市价单是否提交中
    isResponseMarket : false,        // 市价单提交后，服务器是否响应
    orderSubmitStartTime : "",       // 委托单开始提交时间
    isSubmittingorder : false,       // 委托单是否提交中
    isResponseorder : false,          // 委托单提交后，服务器是否响应
    unitMargin : "",					  //单位保证金即每手保证金 (这里根据用户类别,是否为周末或假期来决定此处的值)
    orderspread : "",			    // 进阶单点差
    maxrange : "",			  	    //最大委托价格范围
    limitspread : "",	//最小距离, 限价用
    triggerspread : "", //最小距离, 停损用
    
    
    /**
     * 功能：设置市价单和委托单的相关数据
     * [ 'newP', 'localTime', 'spread', 'bid', 'ask', 'low', 'high', 'buyinterest', 'sellinterest', 'lastbid',
    			'lastask' ]
     */
    setMarketAndPendingOrderData : function(obj){
    	
    	// 设置交易类型(buySell 买:"0" 卖: "1")
    	this.defaultTradeType = obj.buySell == null || obj.buySell == undefined ? "0" : obj.buySell;
    	
    	//设置产品买买价
        var formatedBid =  obj.bid  == null || obj.bid == undefined ? "":obj.bid;
        if(obj.prdcode=='022'){
        	this.buy = Util.fixToStr(formatedBid);
        }else if(obj.prdcode=='023'){
        	this.buy = Util.fixToStrThreedecimal(formatedBid);
        }
        
    	//设置产品卖价
    	var formatedAsk = obj.ask  == null || obj.ask == undefined ? "":obj.ask;
    	this.ask = Util.fixToStr(formatedAsk);
    	 if(obj.prdcode=='022'){
    		 this.ask = Util.fixToStr(formatedAsk);
         }else if(obj.prdcode=='023'){
         	this.ask = Util.fixToStrThreedecimal(formatedAsk);
         }
    	
      //设置产品name
    	var produceName = obj.prdname == null || obj.prdname == undefined ? "" : obj.prdname;
    	this.produceName = produceName;
    	
    	// 设置产品Code
    	var prdcode = obj.prdcode == null || obj.prdcode == undefined ?  "" : obj.prdcode;
    	this.prdcode = prdcode;
    	
    	// 设置交易时间
    	this.dtime = obj.dtime;
    	
       //设置买利息、卖利息卖参数(用于隔夜利息计算)
        this.buyinterest = obj.buyinterest;
        this.sellinterest = obj.sellinterest;
        
    	//设置产品symbol
    	this.symbol = obj.prdcode;
    	
    	// 设置手数列表, 设置最小手数、最大手数、手数步长
    	var tmpLotInfo = obj.lotinfo;//接口返回的手数列表
    	var tmpLotArray = [];
    	if(tmpLotInfo) {
    		tmpLotArray = tmpLotInfo.split(',');//s手数数组  
    	}
    	
    	this.volumeListSize = tmpLotArray.length;
        this.volumeLotinfo = tmpLotArray;
       
        this.minimalVolume = obj.minlot;
        this.maximalVolume = obj.maxlot;
        this.volumeStep = obj.unitlot;
        
        //设置默认成交范围、最大成交范围
        this.defaultTransactionRange = obj.defmprange;
        this.maxTransactionRange = obj.maxmprange;
        
        //设置单位保证金,逻辑如下:客户端自行判断,
        
        this.unitMargin = obj.inimargin;
       
        
        this.orderspread = obj.orderspread;
        this.maxrange = obj.maxrange;
        this.maxmprange = obj.maxmprange;
        
        this.limitspread = obj.limitspread;
        this.triggerspread = obj.triggerspread;
        
        this.lotlimit = obj.lotlimit;
    },
    
    /**
     * 功能：若symbollist有推送刷新市价单和委托单的相关数据
     * [ 'newP', 'localTime', 'spread', 'bid', 'ask', 'low', 'high', 'buyinterest', 'sellinterest', 'lastbid',
    			'lastask' ]
     */
    refreshMarketAndPendingOrderData : function(obj){
    	
       //设置买利息、卖利息卖参数(用于隔夜利息计算)
        this.buyinterest = obj.buyinterest;
        this.sellinterest = obj.sellinterest;
    	
    	// 设置手数列表, 设置最小手数、最大手数、手数步长
    	var tmpLotInfo = obj.lotinfo;//接口返回的手数列表
    	var tmpLotArray = [];
    	if(tmpLotInfo) {
    		tmpLotArray = tmpLotInfo.split(',');//s手数数组  
    	}
    	
    	this.volumeListSize = tmpLotArray.length;
        this.volumeLotinfo = tmpLotArray;
       
        this.minimalVolume = obj.minlot;
        this.maximalVolume = obj.maxlot;
        this.volumeStep = obj.unitlot;
        
        //设置默认成交范围、最大成交范围
        this.defaultTransactionRange = obj.defmprange;
        this.maxTransactionRange = obj.maxmprange;
        
        //设置单位保证金,逻辑如下:客户端自行判断,
        
        this.unitMargin = obj.inimargin;
       
        
        this.orderspread = obj.orderspread;
        this.maxrange = obj.maxrange;
        this.maxmprange = obj.maxmprange;
        
        this.limitspread = obj.limitspread;
        this.triggerspread = obj.triggerspread;
    },
    
	 clear: function(){
			this.isOpenTradeWindow = false;    // 判断是否打开交易窗口
			this.defaultTradeType= "0";        // 买卖类型
			this.dtime= "";                    // 交易时间
			this.ask= "";                      // 卖价
			this.buy= "";                      // 买价
			this.prdcode= "";                  // 产品Code
			this.produceName= "";              // produceName(产品名)
			this.minDistance= "";              // 限价、止损价的最小距离
			this.maxslrange= "";               // 限价、止损价的最大距离
			this.limitAndStopStep= "";         // 限价和止损步长
			this.pipsDigits= "";               // PIPs小数位
			this.officePriceDights= "";        // 报价小数位
			this.symbol= "";                   // 产品symbol
			this.eachPointPrice= "";           // 产品每点的价值
			this.investmentQuotaMin="";        // 最小投资额度
			this.investmentQuotaMax="";        // 最大投资额度
			this.investmentQuotaStep="";       // 投资额度步长
			this.defaultInvestmentQuota="";    // 默认投资额度(计算出来的)
			this.volumeListSize="";            // 默认手数列表的大小
			this.volumeLotinfo= "";            // 默认手数列表
			this.minimalVolume= "";            // 最小手数
			this.maximalVolume= "";            // 最大手数
			this.volumeStep = "";              // 手数步长
			this.defaultVolume="";             // 默认手数(计算出来的)
			this.defaultTransactionRange= "";  // 默认成交范围
			this.maxTransactionRange = "";     // 最大成交范围
			this.transactionRangeStep = "";    // 成交范围步长
			this.marketSeq = "";               // 市价单序列号  
			this.pendingOrderSeq = "";         // 委托单序列号
			this.commission = "";              // 手续费参数
			this.buyinterest = "";                // 买利息参数
			this.sellinterest = "";               // 卖利息参数
			this.isPosition = false;           // 是否持仓
			this.isInvestment = false;         // 是否投资组合
			this.positionOrder = {};           // 持仓单对象
			this.isAllowCloseTradeWindow = false; // 是否允许关闭交易窗口
			this.marketSubmitStartTime = "";      // 市价单开始提交时间
			this.isSubmittingMarket = false;      // 市价单是否提交中
			this.isResponseMarket = false;        // 市价单提交后，服务器是否响应
			this.orderSubmitStartTime = "";       // 委托单开始提交时间
			this.isSubmittingorder = false;       // 委托单是否提交中
			this.isResponseorder = false;          // 委托单提交后，服务器是否响应
			this.unitMargin = "";					  //单位保证金即每手保证金 (这里根据用户类别;是否为周末或假期来决定此处的值)
			this.orderspread = "";			    // 进阶单点差
			this.maxrange = "";			  	    //最大委托价格范围
			this.limitspread = "";	//最小距离; 限价用
			this.triggerspread = ""; //最小距离; 停损用
		}
    
};

/**
 * 修改委托单,全局对象
 */
var pendingOrderObjModify = {
	oid: "", 			//委托号或特别处理大单序列号
	targetoid: "",		//需要平仓的单号
	roid: "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

	 prdid:"", //产品ID　0.london gold　1.london silver 2.HK gold
	 optype :"", //下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
	 tradedir :"", //买卖方向：trade direction　  0买　1卖
	 positiondir :"", //仓位方向：position direction 建仓0/平仓1
	 validtype :"",//委托有效时间:0为当日有效，1为本周有效
	 validflag :"",//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
	 lot :"",//手数
	 limitprice :"",//委托限价单价
	 price :"",//单价;自动替换单时为触价单价
	 prdcode :"", //产品代码
	 produceName: "",//产品名称
		 
	 /**
	  * 设置修改委托单,委托单对象
	  */
	 setModifyPendingOrderData : function(obj){
	 	this.oid = obj.oid;
	 	this.targetoid = obj.targetoid;
	 	this.roid = obj.roid;
	 	this.prdid = obj.prdid;
	 	this.optype = obj.optype;
	 	this.tradedir = obj.tradedir;
	 	this.positiondir = obj.positiondir;
	 	this.validtype = obj.validtype;
	 	this.validflag = obj.validflag;
	 	this.lot = obj.lot;
	 	this.price = obj.price;
	 	this.prdcode = obj.prdcode;
	 },


	clear : function(){
		this.oid = null;
	 	this.targetoid = null;
	 	this.roid = null;
	 	this.prdid = null;
	 	this.optype = null;
	 	this.tradedir = null;
	 	this.positiondir =null;
	 	this.validtype = null;
	 	this.validflag = null;
	 	this.lot = null;
	 	this.price = null;
	 	this.prdcode = null;
	}
	 
};

/**
 * 修改进阶委托单,全局对象
 * 0-开仓单对象, 1-平仓单对象
 */
var advPendingOrderObjModify = {
		data: [
{
	oid: "", 			//委托号或特别处理大单序列号
	targetoid: "",		//需要平仓的单号
	roid: "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

	 prdid:"", //产品ID　0.london gold　1.london silver 2.HK gold
	 optype :"", //下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
	 tradedir :"", //买卖方向：trade direction　  0买　1卖
	 positiondir :"", //仓位方向：position direction 建仓0/平仓1
	 validtype :"",//委托有效时间:0为当日有效，1为本周有效
	 validflag :"",//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
	 lot :"",//手数
	 limitprice :"",//委托限价单价
	 price :"",//单价;自动替换单时为触价单价
	 prdcode :"", //产品代码
	 produceName: ""//产品名称
},
{
	oid: "", 			//委托号或特别处理大单序列号
	targetoid: "",		//需要平仓的单号
	roid: "",			//mod20100919,关联单号:进阶单时,该单号是第二张单的单号

	 prdid:"", //产品ID　0.london gold　1.london silver 2.HK gold
	 optype :"", //下单类型：operation type  0市价单  1限价盘 2止蚀盘 3自动替代
	 tradedir :"", //买卖方向：trade direction　  0买　1卖
	 positiondir :"", //仓位方向：position direction 建仓0/平仓1
	 validtype :"",//委托有效时间:0为当日有效，1为本周有效
	 validflag :"",//mod20100919,生效标志: 0生效(非进阶单) 1进阶单未生效,2进阶单生效;
	 lot :"",//手数
	 limitprice :"",//委托限价单价
	 price :"",//单价;自动替换单时为触价单价
	 prdcode :"", //产品代码
	 produceName: ""//产品名称
	}], 
	/**
	 * 设置修改委托单,委托单对象
	 */
	setModifyAdvancePendingOrderData : function(advPendingOrderObj){
		var openPendingOrderObj = advPendingOrderObj[0];
		this.data[0].oid = openPendingOrderObj.oid;
		this.data[0].targetoid = openPendingOrderObj.targetoid;
		this.data[0].roid = openPendingOrderObj.roid;
		this.data[0].prdid = openPendingOrderObj.prdid;
		this.data[0].optype = openPendingOrderObj.optype;
		this.data[0].tradedir = openPendingOrderObj.tradedir;
		this.data[0].positiondir = openPendingOrderObj.positiondir;
		this.data[0].validtype = openPendingOrderObj.validtype;
		this.data[0].validflag = openPendingOrderObj.validflag;
		this.data[0].lot = openPendingOrderObj.lot;
		this.data[0].limitprice = openPendingOrderObj.limitprice;
		this.data[0].price = openPendingOrderObj.price;
		this.data[0].prdcode = openPendingOrderObj.prdcode;
		
		var closePendingOrderObj = advPendingOrderObj[1];
		this.data[1].oid = closePendingOrderObj.oid;
		this.data[1].targetoid = closePendingOrderObj.targetoid;
		this.data[1].roid = closePendingOrderObj.roid;
		this.data[1].prdid = closePendingOrderObj.prdid;
		this.data[1].optype = closePendingOrderObj.optype;
		this.data[1].tradedir = closePendingOrderObj.tradedir;
		this.data[1].positiondir = closePendingOrderObj.positiondir;
		this.data[1].validtype = closePendingOrderObj.validtype;
		this.data[1].validflag = closePendingOrderObj.validflag;
		this.data[1].lot = closePendingOrderObj.lot;
		this.data[1].limitprice = closePendingOrderObj.limitprice;
		this.data[1].price = closePendingOrderObj.price;
		this.data[1].prdcode = closePendingOrderObj.prdcode;
	},

	clear : function(){
		this.data[0] = {};
		this.data[1] = {};
	}
	
};


