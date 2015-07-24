<%@page import="com.gwghk.gold.util.ConfigLoader"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Date"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.util.ConstantsUtil" %>
<%@ page import="web.action.accountadmin.LoginAction" %>
<%@ page import=" com.gwghk.gold.util.ConfigLoader" %>

<!doctype html>
<html lang="UTF-8">
<head>
<base target="webui" />
<script type="text/javascript">
window.name="webui";

var frontRootURL = "<%=(String) ConfigLoader.getInstance().getProperties("/init.properties").get("frontRootURL")%>";

var goldadminWndow=null;

//客户中心
function gotoGoldAdmin(linkid){	
	if(goldadminWndow!=null){
		goldadminWndow.close();
	}
	var goldadminURL = "<%=request.getContextPath()%>"+"/rgs_register?linkid="+linkid+"&lang=zh_CN&service="+frontRootURL;
	console.log(goldadminURL);
	goldadminWndow=window.open(goldadminURL,"goldadmin",null); 
}

//存款
function gotoGoldAdminDeposite(linkid){	
	if(goldadminWndow!=null){
		goldadminWndow.close();
	}
	var serverURL = frontRootURL+"/?platformType=GW"+"&redirect="+frontRootURL+"/fundDepositOnline.do?platformType=GW";
	var encodeServerURL = encodeURIComponent(serverURL);
	var goldadminURL = "<%=request.getContextPath()%>"+"/rgs_register?linkid="+linkid+"&lang=zh_CN&service="+encodeServerURL;
	console.log(goldadminURL);
	goldadminWndow=window.open(goldadminURL,"goldadmin",null); 
}

//取款
function gotoGoldAdminWithDrew(linkid){	
	if(goldadminWndow!=null){
		goldadminWndow.close();
	}
	var serverURL = frontRootURL+"/?platformType=GW"+"&redirect="+frontRootURL+"/fundDrawings.do?platformType=GW";
	var encodeServerURL = encodeURIComponent(serverURL);
	var goldadminURL = "<%=request.getContextPath()%>"+"/rgs_register?linkid="+linkid+"&lang=zh_CN&service="+encodeServerURL;
	console.log(goldadminURL);
	goldadminWndow=window.open(goldadminURL,"goldadmin",null); 
}

//开关联帐户
function gotoGoldAdminOpenAccount(linkid){	
	if(goldadminWndow!=null){
		goldadminWndow.close();
	}
	var serverURL = frontRootURL+"/?platformType=GW"+"&redirect="+frontRootURL+"/openAccount.do?platformType=GW";
	var encodeServerURL = encodeURIComponent(serverURL);
	var goldadminURL = "<%=request.getContextPath()%>"+"/rgs_register?linkid="+linkid+"&lang=zh_CN&service="+encodeServerURL;
	console.log(goldadminURL);
	goldadminWndow=window.open(goldadminURL,"goldadmin",null); 
}
	
</script>

<meta charset="UTF-8" />
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.util.ConstantsUtil" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
Boolean isImitate = (Boolean)(request.getSession().getAttribute("SESSION_ADMIN_IMITATE_LOGIN"));
%>
<meta name="loginname" content="${adminLoginInfo.fcustomersParam.loginname }" />
<meta name="contextPath" content="<%=basePath%>" />
<meta name="currentLanguage" content="${WW_TRANS_I18N_LOCALE}" />
<meta name="demoflag" content="${SESSION_ADMIN_IMITATE_LOGIN}" />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/> 

<title><s:text name="label.home.22"></s:text></title>
<meta content="金道,GTS,客户,WEB UI,繫统" name="keywords" />
<meta content="金道,GTS,客户,WEB UI,繫统" name="description" />

<script type="text/javascript">
var basePath="<%=basePath%>";
var session_device_type="<%=session.getAttribute("SESSION_DEVICE_TYPE")%>";
<%String session_is_ie8 = (String)session.getAttribute("SESSION_IS_IE8");%>; //y-是,其他-不是
var seesion_login_uid="<%=session.getId()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/My97DatePicker/WdatePicker.js" charset="UTF-8"></script>
<!-- IE8則不需要下面script文件  -->
<%if(!("y".equals(session_is_ie8))){ %>
	<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxThirdParty.js"></script>
	<link href="<%=request.getContextPath()%>/chart/stx-demo-theme-1.css" rel="stylesheet" type="text/css" />
	<link href="<%=request.getContextPath()%>/chart/stx-demo.css" rel="stylesheet" type="text/css" />
<%} %>

<script type="text/javascript">
var isLogined = false; // logined nodejs
var isJustLogined = <%=session.getAttribute("IS_JUST_LOGINED")%>; // first time to trading page.
<% session.setAttribute("IS_JUST_LOGINED", false); %>

</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/common_zh.js"></script>
<% 
if(!"true".equals(ConstantsUtil.getProp("test"))){
%>
	<script type="text/javascript">
	var debugui = false; 
	</script>
	<%if(!("y".equals(session_is_ie8))){ %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/all-dt.js?v=<%=LoginAction.getLastVersion().getVersion()%>" charset="UTF-8"></script>
	<%}else{ %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/all-dt-ie8.js?v=<%=LoginAction.getLastVersion().getVersion()%>" charset="UTF-8"></script>
	<%} %>
<%		
}else{
%>
	<script type="text/javascript">
	var debugui = true; 
	</script>
	<!-- third party -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/socket.io.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.9.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/json2.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.cookie.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.roll.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/jquery.dataTables.min.js" ></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/object2Array.js" ></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/dataTable/js/page4dataTable.js" ></script>
	<!-- STX Chart  -->
	<!-- IE8則不需要下面script文件  -->
	<%if(!("y".equals(session_is_ie8))){ %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxDecription.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/excanvas.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/iscroll.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stx.js"></script>
		<script type="text/javascript"  src="<%=request.getContextPath()%>/chart/stxKernelOs.js"></script>
		<script type="text/javascript" charset="ISO-8859-1" src="<%=request.getContextPath()%>/chart/stxModulus.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxThirdParty.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/chart/stxTimeZoneData.js"></script>
	<%} %>
	<!-- webui -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/listener-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/common-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/logger-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/globalData-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/socketLogin-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/comm/util-core.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/news/news-dt.js" charset="UTF-8"></script>
	
	<%-- 报价 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick-core.js"></script>
	<%-- 格子报价 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick2Box-dt.js"></script>
	<%-- 列表报价 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/Tick2List-dt.js"></script>
	
	<%-- 校验  --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/Validator-core.js" charset="UTF-8"></script>
	<%-- 账户仓位  --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountPositions-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountPositions-dt.js" charset="UTF-8"></script>
	<%-- 账户汇总 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountSummary-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/AccountSummary-dt.js" charset="UTF-8"></script>
	<%-- 账户资金模块 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/accountInfo/accountBaseInfo-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/accountInfo/accountBaseInfo-dt.js" charset="UTF-8"></script>
	
	<%-- 已平仓部位 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/ClosedPosition-dt.js" charset="UTF-8"></script>
	<%-- 当日委託 --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/PendingOrders-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/PendingOrders-dt.js" charset="UTF-8"></script>
	<%--实时动态  --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/DynamicUpdates-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/DynamicUpdates-dt.js" charset="UTF-8"></script>
	
	<%--System Time --%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/SystemTime-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/SystemConnection-dt.js" charset="UTF-8"></script>
	
	<%-- chart --%>
	<!-- IE8則不需要下面script文件  -->
	<%if(!("y".equals(session_is_ie8))){ %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/chart/Chart-dt.js" charset="UTF-8"></script>
	<%} %>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/quotation/quotationGTS-dt.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/report/report-dt.js"></script>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/bulletin/bulletin-dt.js" charset="UTF-8"></script>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/closeCommon-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/marketClose-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/investment/pendingClose-dt.js" charset="UTF-8"></script>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/modifyTradeCommon-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/tradeGlobalData-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/market-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/pendingOrder-dt.js" charset="UTF-8"></script>
		
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/tradeCommon-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/tradeGlobalData-core.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/market-dt.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/webui/trade/pendingOrder-dt.js" charset="UTF-8"></script>

<%	
}
%>
<script type="text/javascript">
SystemCookie.init("${adminLoginInfo.fcustomersParam.loginname}");
</script>

<script type="text/javascript">
if("night"==SystemCookie.getDayNight()){
	$("head").append("<link href=\"<%=request.getContextPath()%>/css/index-night-zh.css?v=<%=LoginAction.getLastVersion().getVersion()%>\" id=\"indexcss\" rel=\"stylesheet\" type=\"text/css\" />");
}else{
	$("head").append("<link href=\"<%=request.getContextPath()%>/css/index-zh.css?v=<%=LoginAction.getLastVersion().getVersion()%>\" id=\"indexcss\" rel=\"stylesheet\" type=\"text/css\" />");
}
</script>
<link href="<%=request.getContextPath()%>/css/popcss.css" rel="stylesheet" type="text/css" />

</head>
<body>
<s:form action="Administrator" method="post" name="adminForm" id="adminForm" namespace="/"  theme="simple" >
		<input type="hidden" id="index_lang" name="lang" value="zh_CN" />
		<input type="hidden" id="index_version" name="deviceType"  value="<s:property value="#session.SESSION_DEVICE_TYPE"/>" />
		<s:submit style="display:none" />
	</s:form>

<div id="loading" style="margin:auto; width:200px;">
	<p>
		<img src="images/loading_2.gif" />
	</p>
	<p>正在载入页面，请稍候 ...</p>
</div>

<div id="body" style="display:none">
	<!-- nav bar begin -->
	<div class="head_box">
		<div class="logo_box"><a href="http://www.24k.hk" class="logo">金道贵金属-www.24k.hk</a></div>
	    <div class="top_nav">
	        <ul class="tnav_item">
	        	<li class="n1"><a href="javascript:">资金</a>
	            	<dl class="tnav_drop">
	                	<dt>资金存取</dt>
	                    	<%if(isImitate!=null&&isImitate==true){ %>
		                    	<dd><a href="javascript:" onclick="openImitateTipsBox()">存款</a></dd>
		                    	<dd><a href="javascript:" onclick="openImitateTipsBox()">取款</a></dd>
	                    	<%}else{ %>
	                    	 	<dd><a href="javascript:" onclick="gotoGoldAdminDeposite('deposit')">存款</a></dd>
		                    	<dd><a href="javascript:" onclick="gotoGoldAdminWithDrew('deposit')">取款</a></dd>	
	                    	<%} %>
	                </dl>
	            </li>
	            <li class="n2"><a href="javascript:" >账户</a>
	            	<dl class="tnav_drop">
	                	<dt>账户服务</dt>
	                    <%if(isImitate!=null&&isImitate==true){ %>
	                    	<dd><a href="http://oa.24k.hk/zh/realaccount_open.html" target="_blank">真实开户</a></dd>
	                    <%}else{ %>
                    	 	 <dd><a href="javascript:" onclick="gotoGoldAdminOpenAccount('openaccount')">真实开户</a></dd>
	                    <%} %>
	                    <dd><a href="javascript:"  class="left-nav1">报表查询</a></dd>
	                    <dd><a href="javascript:" id="resetPassword_btn">修改密码</a></dd>
	                    <%if(isImitate!=null&&isImitate==true){ %>
	                    	<dd><a href="javascript:" onclick="openImitateTipsBox()">客户中心</a></dd>
	                    <%}else{ %>
                    	 	<dd><a href="javascript:" onclick="gotoGoldAdmin('deposit')">客户中心</a></dd>
	                    <%} %>
	                </dl>
	            </li>
	            <li class="n3"><a href="javascript:" class="left-nav3">消息<span class="tnum" id="nav_news_tnum"></span></a></li>
	            <li class="n4"><a href="javascript:" >系统</a>
	            	<dl class="tnav_drop" style="display:none">
	                	<dt>系统</dt>
	                    <dd class="vs_box"><span>语言 -</span><a href="javascript://" onclick="setLanguage('zh_CN');" class="current">简体</a><a onclick="setLanguage('zh_TW');" href="javascript://">繁体</a></dd>
	                    <dd class="vs_box" style="display:none"><span>模式 -</span><a id="change_to_day" href="javascript://">日间</a><a id="change_to_night" href="javascript://" class="current">夜间</a></dd>
	                    <dd><a href="http://www.24k.hk/common/GTS_web_trading_guide.pdf" target="_blank">平台指南</a></dd>
	                    <dd><a href="http://it.24k.hk/releases.html" target="_blank">最近更新</a></dd>
	                    <dd><a href="javascript:" id="contactus_btn">联系我们</a></dd>
	                    <dd><a href="javascript:" id="shengM">免责声明</a></dd>
	                    <dd><a href="javascript:" id="about_tips_btn">关于</a></dd>
	                </dl>
	            </li>
	            <li class="n5"><a href="#" id="logout_btn" >退出</a></li>
	    	</ul>
	    </div>
	</div>
	<!-- nav bar end -->
	
	<div class="main_box clearfix">
		
		<!-- 报价窗口begin -->
		<div class="mleft_box">
	    	<div class="titBar_box">
	            <a href="javascript://" class="zooming_btn" id="mleft_zoom"></a>
	            <ul class="tab_item clearfix" id="quoteTab">
	                <li><a href="javascript://" class="current">格子报价</a></li>
	                <li><a href="javascript://">列表报价</a></li>
	            </ul>
	        </div>
	        <div class="quote_content">
	        	<!--格子报价begin-->
					<%@ include file="quotation/Tick2Box-zh.jsp" %>
				<!--格子报价end-->
	            
	            <!--列表报价报价begin-->
					<%@ include file="quotation/Tick2List-zh.jsp" %>
				<!--列表报价报价end-->
	        </div>
		</div><!-- m left end-->
		<!-- 报价窗口end -->
		
		<!-- 图表start -->
		<div class="mright_box">
			<!-- IE8則不需要下面script文件  -->
			<%if(!("y".equals(session_is_ie8))){ %>
				<%@ include file="quotation/chart-zh.jsp" %>
			<%}else{ %>
				<%@ include file="quotation/chart-ie8-zh.jsp" %>
			<%} %>
		</div>
	    <!-- 图表 end-->
	    
	   <!-- investment box start -->
	   <%@ include file="investment/investmentBox-zh.jsp"%>
	   <!-- investment box end -->
	   
	</div>
	
	<!-- 免责声明 start -->
	<%@include file="/jsp/webui/bulletin/declaration-zh.jsp" %>
	
	<!-- 账户资金 -->
	<%@ include file="accountInfo/accountBaseInfo-zh.jsp"%>
	
	<!-- 交易弹出框begin-->
		<%@include file="/jsp/webui/trade/trade-zh.jsp" %>
	<!-- 交易弹出框end -->
	
	<!-- 新闻弹出框列表 begin-->    
    <div id="leftNewsDiv" style="display: none"></div>
	<!-- 新闻弹出框列表 end-->    
	
	<!--持仓部位begin-->
		<%@ include file="investment/positions-zh.jsp"%>
	<!--持仓部位end-->
	
	<!-- 修改委託单弹出框begin -->
		<%@include file="/jsp/webui/trade/modifyTrade-zh.jsp"%>			
	<!-- 修改委託单弹出框end -->
	
	<!-- 报表弹出框 -->
	<%@include file="/jsp/webui/report/report-zh.jsp" %>
	
	<!-- 密码重置-->
	<%@include file="/jsp/webui/accountInfo/resetPassword-zh.jsp" %>
	
	<!-- 价格明细以及产品属性begin-->
		<%@include file="/jsp/webui/quotation/priceList-zh.jsp" %>
	<!-- 价格明细以及产品属性end -->
	
		<!-- 公告弹出框列表 -->
    <%@include file="/jsp/webui/bulletin/bulletin-zh.jsp" %>
	
	<!--温馨提示 begin-->
		<div class="layer-box dn" id="cancelorder_confirm">
		    <p class="mm-fail-p content" id="cancelorder_confirm_tips">您确定要取消该笔委托单吗？</p>
		    <p class="more-lls-btn gez-btninfo"><a id="cancelorder_confirm_btn_yes" href="javascript:" class="sure_btn">确定</a><a id="cancelorder_confirm_btn_no" href="javascript:">取消</a></p>
		</div>
	<!--温馨提示 end-->
	
	<!--最新公告-->
	<div class="pop_notice n dn" id="bulletinNotice" >
		<h2 class="not_tit"><a href="javascript://" class="not_close" id="bulletinNotice_btn_close">关闭</a><span class="name">最新公告</span></h2>
	    <div class="not_content clearfix">
	    	<p id="bulletinNotice_text"></p>
	        <div><a href="javascript:openBulletWin('#leftGg');" class="not_golink fr">去围观</a></div>
	    </div>
	</div>
	
	<!-- 最新公告弹出层begin -->
	<div id="instant_msg" class="latest-news-gg">
	  <h2>最新公告<a id="instant_msg_close_btn" class="latest-n-gdel" href="javascript://" title="关闭"></a></h2>
	  <div class="latest-news-list">
	    <h3 id="instant_msg_title"></h3>
	    <p id="instant_msg_content"></p>
	    <p id="instant_msg_link" class="l-nmore-link"></p>
	  </div>
	</div>
	<!-- 最新公告弹出层end -->
	
</div>
<script type="text/javascript">
$(function(){
	
	//右上菜单项
	function topNav(){
		var curPar;
		$(".tnav_item li").mouseover(function(){
			curPar = $(this);
			$("a",curPar).addClass("hover");
			$(".tnav_drop",curPar).show();
		}).mouseout(function(){
			$(".tnav_drop").hide();
			$("a",curPar).removeClass("hover");
		});
	};
	topNav();
	//语言/模式切换
	$(".vs_box a").click(function(){
		$(this).addClass("current").siblings("a").removeClass("current");	
	});
	
	//修改密码
	$('#resetPassword_btn').click(function(){
		$('#resetPasswordBox').dialog({
			title:'修改密码',
			width:312,
			modal: true
			});
		$("#resetpwd_oldpwd").focus();
	});
	
	
});
</script>



				

</body>
</html>
