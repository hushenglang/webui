<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Date"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.util.ConstantsUtil" %>
<%@ page import="web.action.accountadmin.LoginAction" %>
<%@ page import=" com.gwghk.gold.util.ConfigLoader" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!doctype html>
<html>
<head>

<base target="webui" />
<script type="text/javascript">
	window.name="webui";
	
	var frontRootURL = "<%=(String) ConfigLoader.getInstance().getProperties("/init.properties").get("frontRootURL")%>";
	
	var goldadminWndow=null;
	function gotoGoldAdmin(linkid){	
		if(goldadminWndow!=null){
			goldadminWndow.close();
		}
		var serverURL = frontRootURL+"/?platformType=GW"+"&redirect="+frontRootURL+"/mobileIndex.do";
		var encodeServerURL = encodeURIComponent(serverURL);
		var goldadminURL = "<%=request.getContextPath()%>"+"/rgs_register?linkid="+linkid+"&lang=zh_CN&service="+encodeServerURL;
		console.log(goldadminURL);
		goldadminWndow=window.open(goldadminURL,"goldadmin",null); 
	}
	
</script>

<meta name="loginname" content="${adminLoginInfo.fcustomersParam.loginname }" />
<meta name="contextPath" content="<%=basePath%>" />
<meta name="currentLanguage" content="${WW_TRANS_I18N_LOCALE}" />
<meta name="demoflag" content="${SESSION_ADMIN_IMITATE_LOGIN}" />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/> 
<title><s:text name="label.home.22"></s:text></title>
<meta content="金道,GTS,客户,WEB UI,系统" name="keywords" />
<meta content="金道,GTS,客户,WEB UI,系统" name="description" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link href="<%=path%>/mobile/css/index.css" rel="stylesheet" type="text/css">
<link href="<%=path%>/mobile/css/jq-ui.css" rel="stylesheet" type="text/css">
<link href="<%=request.getContextPath()%>/js/dataTable/css/page.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
var basePath="<%=basePath%>";
var session_device_type="<%=session.getAttribute("SESSION_DEVICE_TYPE")%>";
var seesion_login_uid="<%=session.getId()%>";
</script>

<script type="text/javascript">
var isLogined = false; // logined nodejs
var isJustLogined = <%=session.getAttribute("IS_JUST_LOGINED")%>; // first time to trading page.
<% session.setAttribute("IS_JUST_LOGINED", false); %>
</script>

<% 
if(!"true".equals(ConstantsUtil.getProp("test"))){
%>
<script type="text/javascript">
var debugui = false; 
</script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/My97DatePicker/WdatePicker.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/common_zh.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/common_mb_zh.js"></script>

<!-- STX Chart  -->
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxThirdParty.js"></script>
<link href="<%=request.getContextPath()%>/chart/stx-demo.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/chart/stx-demo-theme-1.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/all-mb.js?v=<%=LoginAction.getLastVersion().getVersion()%>" charset="UTF-8"></script>
<%		
}else{
%>
<script type="text/javascript">
var debugui = true; 
</script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/socket.io.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.10.3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.roll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/json2.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/My97DatePicker/WdatePicker.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/jquery.dataTables.min.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/object2Array.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/page4dataTable.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/common_zh.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/common_mb_zh.js"></script>

<!-- STX Chart  -->
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxDecription.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/excanvas.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/iscroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxThirdParty.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stx.js"></script>
<script type="text/javascript"  src="<%=request.getContextPath()%>/chart/stxKernelOs.js"></script>
<script type="text/javascript" charset="ISO-8859-1" src="<%=request.getContextPath()%>/chart/stxModulus.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxThirdParty.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxTimeZoneData.js"></script>
<link href="<%=request.getContextPath()%>/chart/stx-demo.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/chart/stx-demo-theme-1.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/news/news-mb.js" charset="UTF-8"></script>
<%-- core --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/listener-core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/common-core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/logger-core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/globalData-core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/socketLogin-core.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/util-core.js"></script>
<%-- 報價 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick-core.js"></script>
<%-- 校驗  --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/Validator-core.js" charset="UTF-8"></script>
<%-- 賬戶倉位  --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountPositions-core.js" charset="UTF-8"></script>
<%-- 賬戶匯總 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountSummary-core.js" charset="UTF-8"></script>
<%-- 賬戶資金模塊 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/accountInfo/accountBaseInfo-core.js" charset="UTF-8"></script>
<%-- 當日委託 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/PendingOrders-core.js" charset="UTF-8"></script>
<%--實時動態  --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/DynamicUpdates-core.js" charset="UTF-8"></script>
<%-- 格子報價 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick2Box-mb.js"></script>
<%-- 列表報價 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick2List-mb.js"></script>
<%-- 賬戶倉位  --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountPositions-mb.js" charset="UTF-8"></script>
<%-- 賬戶匯總 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountSummary-mb.js" charset="UTF-8"></script>
<%-- 賬戶資金模塊 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/accountInfo/accountBaseInfo-mb.js" charset="UTF-8"></script>
<%-- 已平倉部位 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/ClosedPosition-mb.js" charset="UTF-8"></script>
<%-- 當日委託 --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/PendingOrders-mb.js" charset="UTF-8"></script>
<%--實時動態  --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/DynamicUpdates-mb.js" charset="UTF-8"></script>
<%--System Time --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/SystemTime-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/SystemConnection-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/quotationGTS-mb.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/report/report-mb.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/bulletin/bulletin-mb.js" charset="UTF-8"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/chart/Chart-mb.js" charset="UTF-8"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/closeCommon-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/marketClose-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/pendingClose-mb.js" charset="UTF-8"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/modifyTradeCommon-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/tradeGlobalData-core.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/market-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/pendingOrder-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/tradeCommon-mb.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/index-mb.js" charset="UTF-8"></script>
<%	
}
%>

<script type="text/javascript">
SystemCookie.init("${adminLoginInfo.fcustomersParam.loginname}");
</script>

</head>

<body>

<script type="text/javascript">
	//$(document).keydown(function(){return key(arguments[0])});
</script>

<div id="loading" style="position:absolute;height:150px;width:200px;text-align:center;left:50%;top:50%;margin:-75px 0 0 -100px;">
<p><img src="images/loading_2.gif" /></p>
<p style="padding-top:5px">正在载入页面，请稍候 ...</p>
</div>
<div id="body" style="display:none">

<!-- 交易弹出框 -->
<%@include file="../jsp/trade/trade-zh.jsp" %>
<!-- 修改委托单弹出框 -->
<%@include file="../jsp/trade/modifyTrade-zh.jsp"%>
	
<div id="wrapper">
  <!-- header begin -->
  <div id="header">
    <div class="logo"><a href="javascript:" class="hide-t">金道贵金属</a></div>
  </div>
  <!-- header end -->

  <!--center begin-->  
  <div class="center-box">   
        <div class="rbox-wrap1" id="index_tickbox_div">
          <!--格子报价begin-->
          <div class="zzlb-baoj">
            <div class="navbox clearfix">
              <div class="navbox-l fl"></div>
              <div class="navbox-c fl">
                <div class="nav-qh clearfix">
                  <ul>
                    <li class="on-na">报价列表</li>
                  </ul>
                </div>
              </div>
            </div>            
            <!--格子报价begin-->
			<%@ include file="quotation/Tick2Box-zh.jsp" %>
			<!--格子报价end-->
          </div>
          <!--格子报价end-->
        </div>
        
        <div class="rbox-wrap2 clearfix" id="index_investment_div" style="display:none;">                              
          <div class="navbox clearfix">
            <div class="navbox-l fl"></div>
            <div class="navbox-c fl">
              <div class="nav-qh">
                <ul class="fl" id="investment-entrust-fl">
						<li class="on-na" tn="accountPositionsTable">持仓部位</li>
						<li tn="closedPositionTable">已平仓部位</li>
						<li tn="pendingOrderTables">当日委托</li>
						<li tn="accountSummaryTable">账户总结</li>
						<li tn="dynamicUpdatesTable">实时动态</li>
				</ul>
              </div>
            </div>
          </div>

          <div class="tubiao-data weitu-data" id="investment-entrust-cont">
            <div>
            <!--持仓部位begin-->
               <%@ include file="investment/positions-zh.jsp"%>
            <!--持仓部位end-->
            </div>
            <!--已平仓部位begin-->
            <div class="touz-tabox" id="closedPosition"></div>
            <!--已平仓部位end-->

            <!-- 当日委托begin -->
            <div class="touz-tabox" id="pendingOrders"></div>
            <!-- 当日委托end -->

            <!-- 账户总结begin -->
            <div class="touz-tabox" id="accountSummary">
               
            </div>
            <!-- 账户总结end -->

            <!-- 实时动态begin -->
            <div class="touz-tabox" id="dynamicUpdates">
            </div>
            <!-- 实时动态end -->              
          </div>
          <div class="time-acinfo" id="lastDynamicUpdate"></div>
        </div>
  </div>
  <!--center end-->
</div>

<div id="index_tab_div" style="display:none">
  <div class="top-menubox clearfix">
    <a href="javascript:" class="back-pre-page" id="btn_tab_div_back">返回</a>
    <h3 class="top-h-title" id="tab_div_title" ></h3>
    <a href="javascript://" class="back-main-page" id="tab_back_home"></a>
  </div>
   <!-- 新闻列表 -->   
   <%@include file="../jsp/news/news-zh.jsp" %>
   <!-- 公告弹出框列表 -->
   <%@include file="../jsp/bulletin/bulletin-zh.jsp" %>
   <!-- 报表弹出框 -->
  <%@include file="../jsp/report/report-zh.jsp" %>
   <!-- 图表模块 -->
  <%@include file="../jsp/chart/chart-zh.jsp" %>
</div>

<!-- footer begin -->
<div id="footer" class="clearfix">
  <div class="menu-box-con fl clearfix">
    <ul>
      <li class="m-icon0"><a href="javascript://" id="btn_menu_index_home" tn="wrapper"><i></i>主页</a></li>
      <li class="m-icon1"><a href="javascript://" id="btn_menu_chart" tn="index_chart_div"><i></i>图表</a></li>
      <li class="m-icon2"><a href="javascript://" id="btn_menu_report_01" tn="index_report_container"><i></i>报表</a></li>
      <li class="m-icon3"><a href="javascript://" id="btn_menu_investment" tn="index_investment_div"><i></i>仓位</a></li>
      <li class="m-icon4"><a href="javascript:" id="btn_menu_bulletin_01" tn="index_leftGg"><i></i>公告</a></li>
      <li class="m-icon5"><a href="javascript:" id="btn_menu_new_01" tn="index_leftNewsDiv"><i></i>新闻</a></li>
      <% if(session.getAttribute("usernamedemo")==null){ %>
      <li class="m-icon6"><a onclick="gotoGoldAdmin('deposit')"><i></i>存取款</a></li>
      
      <%}else{ %>
      <li class="m-icon6"><a href="https://goldadmin.24k.hk/goldadmin/changeDemoMobileTradePwd.do" target="_blank"><i></i>修改密码</a></li>
      <%} %>
      <li class="m-icon7"><a href="http://www.24k.hk/zh/finance/index.html" target="_blank"><i></i>财经日历</a></li>
      <li class="m-icon8"><a href="http://m.24k.hk/zh/subjectlist.html" target="_blank"><i></i>优惠活动</a></li>
      <li class="m-icon9"><a href="javascript:" id="btn_menu_qq_01"><i></i>QQ客服</a></li>
      <li class="m-icon10"><a href="javascript:" id="btn_menu_online_01"><i></i>在线客服</a></li>
      <li class="m-icon11"><a href="javascript:" id="btn_menu_language_01" tn="zh_TW"><i></i>繁體</a></li>
      <li class="m-icon12"><a href="javascript:" id="btn_menu_full_ver_01"><i></i>桌面版</a></li>
      <li class="m-icon13" style="display:none"><a href="javascript:" id="btn_menu_style_change_01" tn="day"><i></i>夜间</a></li>
      <li class="m-icon16"><a href="http://www.24k.hk/common/GTS_web_trading_guide.pdf" target="_blank"><i></i>平台指南</a></li>
      <li class="m-icon14"><a href="javascript:" id="btn_menu_logout_btn_01"><i></i>登出</a></li>
      <li class="m-icon15 dn" id="menu-layer"><a href="javascript://"><i></i>菜单</a></li>
    </ul>
  </div>
  <!-- 弹出层begin -->
  <div class="menu-tan-box dn">
    <div class="menu-top-bg"></div>
    <ul class="menu-box-con menu-cent-box">
      <li class="m-icon4"><a href="javascript:" id="btn_menu_bulletin_02" tn="index_leftGg"><i></i>公告</a></li>
      <li class="m-icon5"><a href="javascript:" id="btn_menu_new_02" tn="index_leftNewsDiv"><i></i>新闻</a></li>
      <% if(session.getAttribute("usernamedemo")==null){ %>
      <li class="m-icon6"><a onclick="gotoGoldAdmin('deposit')"><i></i>存取款</a></li>
      <%}else{ %>
      <li class="m-icon6"><a href="https://goldadmin.24k.hk/goldadmin/changeDemoMobileTradePwd.do" target="_blank"><i></i>修改密码</a></li>
      <%} %>
      <li class="m-icon7"><a href="http://www.24k.hk/tw/finance/index.html" target="_blank"><i></i>财经日历</a></li>
      <li class="m-icon8"><a href="http://m.24k.hk/zh/subjectlist.html" target="_blank"><i></i>优惠活动</a></li>
      <li class="m-icon9"><a href="javascript:" id="btn_menu_qq_02"><i></i>QQ客服</a></li>
      <li class="m-icon10"><a href="javascript:" id="btn_menu_online_02"><i></i>在线客服</a></li>
      <li class="m-icon11"><a href="javascript:" id="btn_menu_language_02" tn="zh_TW"><i></i>繁體</a></li>
      <li class="m-icon12"><a href="javascript:" id="btn_menu_full_ver_02"><i></i>桌面版</a></li>
      <li class="m-icon13" style="display:none"><a href="javascript:" id="btn_menu_style_change_02" tn="day"><i></i>夜间</a></li>
      <li class="m-icon16"><a href="http://www.24k.hk/common/GTS_web_trading_guide.pdf" target="_blank"><i></i>平台指南</a></li>
      <li class="m-icon14"><a href="javascript:" id="btn_menu_logout_btn_02"><i></i>登出</a></li>
    </ul>
    <div class="menu-bot-bg"></div>
  </div>
  <!-- 弹出层end -->
  <div class="ftinfo fl dn">
	    <div class="ftinfo-l fl"></div>
	    <div class="ftinfo-c bobao-atbox fl">
	      <p class="bobao-info fl">伦敦金：<span id="symbol022Price">---</span><span id="symbol022PriceChange">---</span></p>
	      <p class="bobao-info fr">伦敦银：<span id="symbol023Price">---</span><span id="symbol023PriceChange">---</span></p>
	    </div>
	    <div class="ftinfo-r fl"></div>
	  </div>
		  
	<!--消息提示begin-->
	<div id="bulletinNotice" class="mess-layer clearfix" >
	  <span class="mess-title fl">提示：您有新的公告！</span>
	  <p  class="mess-btn fr"><a id="bulletinNotice_check" href="javascript:">查看</a><a id="bulletinNotice_never" href="javascript:" class="me-bigw">不再提醒</a></p>
	</div>
	<!--消息提示end-->
	
	<!--消息提示begin-->
	<div id="marginLevelWarning" class="mess-layer clearfix" >
	  <span class="mess-title fl">提示：维持保证金不足，请及时补足资金</span>
	  <p class="mess-btn fr"> <a id="marginLevelWarningConfirm" href="javascript:">确认</a></p>
	</div>
	<!--消息提示end-->
	<!-- 	<div class="ftinfo fl ">
			<div class="ftinfo-l fl"></div>
			<div class="ftinfo-c fl" id="newsGong" style="display:none">
				<ul>
				</ul>
			</div>
			<div class="ftinfo-r fl"></div>
		</div> -->
		<div class="frtimt frtimt-red fr" id="index_connect_tip">
			<div class="frt-stadus">服务器连接已断开<i></i></div>
			<span id="sp_conn_status">连接状态：连接中</span>
			<span>&nbsp;行情资讯由金道贵金属公司提供</span>
			系统时间：
			<font id="sp_service_time" time="<%=new Date().getTime() %>">00:00:00</font>
	   </div>
  </div>
  
	<!--溫馨提示 begin-->
	<div class="layer-box dn" id="cancelorder_confirm">
	  <div class="layer-con layer-con-weit">
	    <h3 class="top-menubox" id="cancelorder_confirm_title">提示</h3>
	    <div class="lay-kuang-fon">
	      <div class="lay-kuang-con">
	        <p class="wxts-pinfo" id="cancelorder_confirm_tips">您确定要取消该笔委托单吗？</p>
	        <p class="more-lls-btn gez-btninfo"><a href="javascript:" id="cancelorder_confirm_btn_yes">確定</a><a href="javascript:" class="gez-qx-btn" id="cancelorder_confirm_btn_no" >取消</a></p>
	      </div>
	    </div>
	  </div>
	</div>
	
	<!--登出提示 begin-->
	<div class="layer-box dn" id="div_logout_confirm">
	  <div class="layer-con layer-con-weit">
	    <h3 class="top-menubox">提示</h3>
	    <div class="lay-kuang-fon">
	      <div class="lay-kuang-con">
	        <p class="wxts-pinfo">您确定要登出这个账户吗？</p>
	        <p class="more-lls-btn gez-btninfo"><a href="javascript:" id="btn_logout_confirm">確定</a><a href="javascript:" class="gez-qx-btn" id="btn_logout_cancel" >取消</a></p>
	      </div>
	    </div>
	  </div>
	</div>
    <!--登出提示  end-->
<!-- footer end -->
   <s:form action="Administrator" method="post" name="adminForm" id="adminForm" namespace="/" >
        <input type="hidden" id="index_lang" name="lang" value="zh_CN" />
		<input type="hidden" id="index_version" name="deviceType"  value="<s:property value="#session.SESSION_DEVICE_TYPE"/>" />
		<s:submit style="display:none" />
   </s:form>
 </div>
</body>
</html>

