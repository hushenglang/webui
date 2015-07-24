<%@page import="web.util.ConstantsUtil"%>
<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.constant.Constant"%>

<%@ page import="web.util.ConstantsUtil" %>

<%
if ("http".equals(request.getScheme()) && !"true".equals(ConstantsUtil.getProp("test"))) {
%>
<jsp:forward page="/redirect.html" />
<% } %>

<%

	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
    String demoNum="";
	Cookie[] cookies = request.getCookies();
	if (cookies != null && cookies.length > 0)
	{
		Cookie cookie=null;
		for (Cookie c : cookies)
		{
			if (c.getName().equals("rememberMe"))
			{
				cookie = c;
				break;
			}
		}
		for (Cookie c1 : cookies)
		{
			if (c1.getName().equals("usernamedemo")) 
			{
				demoNum=c1.getValue();
				break;
			} 
		}
		if (cookie != null)
		{
			pageContext.setAttribute("rememberMe", cookie.getValue());
		}
	}
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<title><s:text name="label.home.22" /></title>
<meta content="金道,GTS,客户,WEB UI,系统" name="keywords" />
<meta content="金道,GTS,客户,WEB UI,系统" name="description" />

<link href="<%=request.getContextPath()%>/mobile/css/login.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.10.3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.placeholder.1.3.min.js"></script>	
</head>

<body>
	<%@include file="disclaimer/disclaimer-zh.jsp" %>
<!-- layer begin -->
<div id="header" class="clearfix">
  <span class="fr">
  <a href="<%=path%>/Login.action?lang=zh_TW" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'fanti',1,true]);">繁體</a><a href="<%=path%>/Login.action?lang=zh_CN" class="c-on" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'jianti',1,true]);">简体</a>
  </span>
</div>

<div id="con-bgbox">
  <h1 class="logo"><a href="http://www.24k.hk" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'logo',1,true]);" class="hide-t">金道贵金属</a></h1>
  <!-- login begin -->
  <div class="login-wrapper">
    <div class="user-dengl">
      <div class="login-box">
        <div class="nav-qhbox">
          <ul id="ul_tabs">
            <li item="1" class="nav-on" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'real_trade',1,true]);">真实交易</li>
            <li item="2" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'demo_trade',1,true]);">模拟交易</li>
          </ul>
        </div>
        <s:form theme="simple" action="Home" name="loginForm" id="loginForm"
					method="post" namespace="/">
					<!-- hidden value -->
					<input type="hidden" name="lang" value="zh_CN"/>
					<input type="hidden" name="deviceType" id="deviceType"/>
					<input type="hidden" id="realnum" name="realnum"
						value="<s:property value="username"/>" />
					<input type="hidden" id="demoNum" name="demoNum"
						value="<%=demoNum %>" />
					<s:hidden id="check" name="check" value="true"></s:hidden>
					<input type="hidden" id="imitate" name="imitate" value="false" />
					<input type="hidden" id="rs" name="rs"
						value="<s:property value="#session.SESSION_ADMIN_IMITATE_LOGIN"/>" />
        <!-- 真实交易begin -->
        <div class="form-box" id="trueTrade">
          <div class="form-listbox clearfix">
            <div class="input-box">
              <s:textfield name="username" id="username" placeholder="请输入真实交易账号" cssClass="in-aput in-icon1" />
            </div>
          </div>
          <div class="form-listbox clearfix">
            <div class="input-box"><s:password name="password" id="password" theme="simple"  placeholder="请输入密码" cssClass="in-aput in-icon2 inp-fon" /></div>
            <p class="f-wd-text">
            <a target="_blank" id="btn_forgot_password" href="retakePassword.action?lang=zh_CN" class="blue">忘记密码</a>
            <a target="_blank" id="btn_modify_password" style="display:none" href="https://goldadmin.24k.hk/goldadmin/changeDemoMobileTradePwd.do?locale=zh_CN" class="blue">修改密码</a>
            </p>
          </div>
          <div class="form-listbox clearfix">
            <div class="input-box input-box-yzm">
            <s:textfield name="randomNumber" id="randomNumber" size="4" theme="simple" autocomplete="off" placeholder="请输入验证码" cssClass="in-aput in-icon3 vcen" />
            <div class="yzm-img"><img src="" id="createImg" width="62" height="28" alt="验证码" class="vcen" onclick="changeValidateCode()" /></div>
            <p class="f-wd-text"><a href="javascript://" onclick="changeValidateCode()" class="blue">换一张</a></p>
          </div>
		   <div class="ly-btnbox"><a class="qingc-btn" href="javascript: doSubmit('mb');" title="登入">登入移动版</a><a class="submit-btn" href="javascript: doSubmit('dt');" title="登入">登入桌面版</a></div>
          <div class="ly-zh-info clearfix">
            <p class="fl"><a target="_blank" href="http://m.24k.hk/zh/realaccount_open.html" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'real_open',1,true]);">注册真实账户</a></p>
			<p class="fr"><a target="_blank" href="http://m.24k.hk/zh/account_02.html" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'demo_open',1,true]);">注册模拟账户</a></p>
          </div>
          <div class="form-listbox">
            <div class="tishi-info red" id="errorTip"><s:fielderror cssStyle="color:red"><s:param>errorMsg</s:param></s:fielderror></div>
          </div>
        </div> 
      </div>
      </s:form>
    </div>  
  <!-- login end -->
  </div>
</div>

</div>
<!--版本提示 begin-->
<div id="version_tip_div" style="display:none;"><strong>非常抱歉，该版本暂不支持非android、ios、windows系统的浏览器访问！</strong></div>
<div id="brower_tip_div" style="display:none;"><strong>非常抱歉，该版本暂不支持低于ie9版本的浏览器访问，可以使用高版本的ie浏览器或其他浏览器！</strong></div>
<div id="footer">
  <p class="menu-link"><a href="javascript://" id="shengM" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'resert',1,true]);">免责声明</a>|<a href="http://www.24k.hk/zh/contact.html" target="_blank" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'contact',1,true]);">联络我们</a></p>
  <p class="copy-info">Copyright &copy; 2009-2014 金道贵金属有限公司 版权所有，不得转载。版本 <s:property value="versionControlRecord.version"/> (<s:property value="versionControlRecord.date"/>)</p>
  <p class="kexin-web"><a href="https://ss.knet.cn" target="_blank"><img src="<%=request.getContextPath()%>/images/cnnic.png" oncontextmenu="return false;" alt="可信网站"/></a></p>
</div>
   
<script language="javascript">
var flag = -1; // -1:初始；0:已发送登陆请求；1:已响应登陆错误信息

function changeValidateCode() {	
	document.getElementById("createImg").style.display="";///CreateImg.action
	var timenow = new Date().getTime();	
	document.getElementById("createImg").src="<%=request.getContextPath()%>/VerifyCodeServlet?d="+timenow;	
}
changeValidateCode();

function trim(str) { 
	return str.replace(/^\s+|\s+$/, ''); 
}

function doSubmit(type){
	var atype=$(".nav-on").attr("item");
	flag = -1;
	if($('#username').val() == '' || $('#username').val() == '请输入真实交易账号'|| $('#username').val() == '请输入模拟交易账号'){
	 	$('#errorTip').html(atype==1?'请输入真实交易账号':'请输入模拟交易账号');
	 	$('#username').focus();
		return ;
	}
	if($('#password').val() == '' || $('#password').val() == '请输入交易密码'){
	 	$('#errorTip').html('请输入交易密码');
	 	$('#password').focus();
		return ;
	} 
 
	if($('#randomNumber').val() =='' || $('#randomNumber').val() == '请输入验证码'){
	 	$('#errorTip').html('请输入验证码'); 
	 	$('#randomNumber').focus();
	 	changeValidateCode();
	 	return ;
	}
	$("#deviceType").val(type);
	var usertype=0;
	if ($('#imitate').val() == "true") {
		 document.loginForm.action="<%=request.getContextPath()%>/demologin.action";
		 usertype=1;
	} else {
		document.loginForm.action="<%=request.getContextPath()%>/Home.action";
	}
	$.getJSON("<%=request.getContextPath()%>/loginCheck.action?usertype="+usertype+"&username="+$('#username').val()+"&password="+$('#password').val()+"&randomNumber="+$('#randomNumber').val(),function(data){
		if(data.map.errorcode!=0){
			$("#errorTip").html(decodeURI(data.map.errormsg).replace("+",""));
			changeValidateCode();
		}else{
			$("#errorTip").html("");
			document.loginForm.submit();
		}
	});
}

$(function (){
	 $("#shengM").click(function(){
		    $("#disclaimerDiv").dialog({
		      width:300,
		      height:350,
		      modal:true
		     });
	});
	 
	$('#randomNumber').val("");
	$.Placeholder.init();
	var tabLi=$('#ul_tabs li');
	tabLi.click(function (){
		var o = $(this), attrTtem;
		tabLi.removeClass("nav-on");
		$(this).addClass("nav-on");
		$('#errorTip').html('');
		$("#password").val("");
		attrTtem = o.attr("item");
		$('#imitate').val(attrTtem == 2);
		
		if(attrTtem==='1'){
			$('#username').attr('placeholder','请输入真实交易账号');
			$("#btn_forgot_password").show();
			$("#btn_modify_password").hide();
		}else if(attrTtem==='2'){
			$('#username').attr('placeholder','请输入模拟交易账号');
			$("#btn_forgot_password").hide();
			$("#btn_modify_password").show();
		}
	});

	if($('#imitate').val()!='')
	{
		$('#imitate').val($('#rs').val());
	}
	else
	{
		$('#imitate').val("false");
	}
	
	if($('#imitate').val() == "true"){
		$('#ul_tabs li[item="2"]').click();
		$("#username").val($('#demoNum').val());
	}
 
	 
	
	$('#ul_tabs li[item="1"]').click(function(){
		$("#username").val($('#realnum').val());
	});
	$('#ul_tabs li[item="2"]').click(function(){
		$("#username").val($('#demoNum').val());
	});

	document.getElementsByTagName('form')[0].onkeyup = function(e){
	    var e = e || event;
	    var keyNum = e.which || e.keyCode;
	    if(keyNum==13) doSubmit("mb");
	    return true;
	};
	
	
});
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-31478987-1']);
  _gaq.push(['_setDomainName', '24k.hk']);
  _gaq.push(['_addIgnoredRef', '24k.hk']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_addOrganic', 'soso', 'w']);
  _gaq.push(['_addOrganic', 'sogou', 'query']);
  _gaq.push(['_addOrganic', 'youdao', 'q']);
  _gaq.push(['_addOrganic', 'baidu', 'word']);
  _gaq.push(['_addOrganic', 'baidu', 'q1']);
  _gaq.push(['_addOrganic', 'ucweb', 'keyword']);
  _gaq.push(['_addOrganic', 'ucweb', 'word']);
  _gaq.push(['_addOrganic', '114so', 'kw']);
  _gaq.push(['_addOrganic', '360', 'q']);
  _gaq.push(['_addOrganic', 'so', 'q']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>