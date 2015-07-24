<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.util.ConstantsUtil"%>
<%@ page import="web.bean.AdsVo"%>
<%@ page import="java.util.List"%>

<% 
//轮播图片对象
AdsVo adsVo = (AdsVo)request.getAttribute("adsVo"); 

%>

<%
	if ("http".equals(request.getScheme()) && !"localhost".equals(request.getServerName())
			&& !"true".equals(ConstantsUtil.getProp("test"))) {
%>
<jsp:forward page="/redirect.html" />
<%
	}
%>

<%
	String path = request.getContextPath();

	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
	String demoNum = "";
	Cookie[] cookies = request.getCookies();
	if (cookies != null && cookies.length > 0) {
		Cookie cookie = null;
		for (Cookie c : cookies) {
			if (c.getName().equals("rememberMe")) {
				cookie = c;
				break;
			}
		}
		for (Cookie c1 : cookies) {
			if (c1.getName().equals("usernamedemo")) {
				demoNum = c1.getValue();
				break;
			}
		}
		if (cookie != null) {
			pageContext.setAttribute("rememberMe", cookie.getValue());
		}
	}
%>
<!doctype html>
<html lang="UTF-8">
<head>
<meta charset="UTF-8" />
<title><s:text name="label.home.22" /></title>
<meta content="金道,GTS,客护,WEB UI,繫统" name="keywords" />
<meta content="金道,GTS,客护,WEB UI,繫统" name="description" />

<title>GT1-客户登入</title>
<meta name="keywords" content="GT1登录" />
<meta name="description" content="GT1登录" />

<link href="<%=request.getContextPath()%>/css/login.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.9.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>

</head>

<body>
	<%@include file="disclaimer/disclaimer-zh.jsp" %>
	
	<div class="headbg">
		<div id="header" class="clearfix">
			<h1 class="logo fl">
				<a href="http://www.24k.hk" class="hide-t" title="金道贵金属">GT1-客户登入</a>
			</h1>
			<p class="r-menu fr">
				<a href="<%=path%>/Login.action?lang=zh_TW"
					onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'fanti',1,true]);"
					>繁体</a>|
				<a href="<%=path%>/Login.action?lang=zh_CN"
					onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'jianti',1,true]);"class="c-on">简体</a>
			</p>
		</div>
	</div>
	<div id="con-bgbox">
		<!-- login begin -->
		<div class="user-dengl">
			
			<!--活动图片start -->
		    <div class="login_artpic">
		    	<%if(adsVo==null){
		    		%>
		    		<a href="#">
		    			<img src="images/logbg.jpg" width="482" height="323">
		    		</a>
		    	<% }else{
		    		%>
		    		<a href="<%=adsVo.getUrl()%>" target="<%=adsVo.getTarget()%>">
		    			<img src="<%=adsVo.getPic1()%>" width="482" height="323">
		    		</a>
		    	<% } %>
		    	
		    </div>
		    <!--活动图片end -->
			
			<div class="login-box">
				<div class="nav-qhbox">
					<ul>
						<li id="li_tab_real" class="current">真实交易</li>
						<li id="li_tab_demo" class="">模拟交易</li>
					</ul>
				</div>
				<!-- 真实交易begin -->
				<s:form theme="simple" action="Home" name="loginForm" id="loginForm"
					method="post" namespace="/">
				
				<input type="hidden" id="imitate" name="imitate" value="0" />
				
				<div class="form-box">
					<div class="form-listbox clearfix">
						<div class="input-box fl">
							<s:textfield name="username" id="username" placeholder="请输入真实交易帐号"
									cssClass="in-aput inp-fon" tabIndex="1"/>
						</div>
					</div>
					<div class="form-listbox clearfix">
						<div class="input-box fl">
							<s:password name="password" id="password" theme="simple"  placeholder="请输入密码" value=""
									cssClass="in-aput inp-fon" tabIndex="2"/>
						</div>
						<p class="f-wd-text fl">
							<a target="_blank" id="btn_forgot_password" href="https://goldadmin.24k.hk/goldadmin/retakePassword.do?locale=zh_TW" class="blue" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'wang',1,true]);">忘记密码</a>
								<a target="_blank" id="btn_modify_password" style="display:none" href="https://goldadmin.24k.hk/goldadmin/changeDemoMobileTradePwd.do?locale=zh_TW" class="blue" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'wang',1,true]);">修改密码</a>
						</p>
					</div>
					<div class="form-listbox clearfix">
						<div class="input-box fl">
							<s:textfield name="randomNumber" id="randomNumber" size="4"
								theme="simple" autocomplete="off" placeholder="请输入验证码"
								cssClass="in-aput inp-fon in-aput-yzm vcen" tabIndex="3"/>
							<img src="" id="createImg" width="62" height="28" alt="验证码"
								class="vcen" onclick="changeValidateCode()" />
							
						</div>
						<p class="f-wd-text fl"><a href="javascript://" onclick="changeValidateCode()" class="blue">换一张</a></p>
					</div>
					<div class="ly-btnbox">
						<a class="submit-btn" id="btn_submit" href="javascript:doSubmit();"
								title="登入" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'yidong',1,true]);">登入</a>
						
						<!-- <a target="_blank" href="#" class="blue">游客登入</a> -->
					</div>
					<div class="ly-zh-info clearfix">
						<p class="fl">
							<a href="#nogo" class="reg_real">注册真实账户</a>
						</p>
						<p class="fr">
							<a href="#nogo" class="reg_mo">注册模拟账户</a>
						</p>
					</div>
					<div class="form-listbox">
						<div class="tishi-info red" id="errorTip"><s:fielderror cssStyle="color:red"><s:param>errorMsg</s:param></s:fielderror></div>
					</div>
				</div>
				</s:form>
				<!-- 真实交易end -->
			</div>
		</div>
		<!-- login end -->

	</div>

 	<!--版本提示 begin-->
    <div id="version_tip_div" style="display:none;"><strong>非常抱歉，该版本暂不支持非android、ios、windows系统的浏览器访问！</strong></div>
    
    <div id="brower_tip_div" style="display:none;">
	      <!-- IE7 login begin -->
		  <div id="con-bgbox">
			  <div class="user-dengl">
				<div class="market_content">
		        	<div class="market_nosup">
		            	<p class="nosup_txt1">您的浏览器版本过低</p>
		                <p class="nosup_txt2">建议使用Chrome、Firefox、搜狗（高速模式）、360（极速模式）、Opera、遨游、IE 9等浏览器以便正常使用本系统。</p>
		                <div class="browser_box">
							<a href="http://www.google.cn/chrome/browser/desktop/index.html" target="_balnk" class="chrome">下载Chrome浏览器</a>
							<a href="http://www.firefox.com.cn/download/" target="_balnk" class="firefox">下载Firefox浏览器</a> 
							<a href="http://ie.sogou.com/"target="_balnk"  class="sougu">下载搜狗浏览器</a>
							<a href="http://se.360.cn/" target="_balnk" class="browser360">下载360浏览器</a>
		                </div>
		            </div>
		        </div>
			  </div>
		  </div>
		  <!-- IE7 login end -->
      </div>


	<div id="footer">
		<p class="menu-link">
			<a href="javascript://" id="shengM" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'resert',1,true]);">免责声明</a>|
			<a target="_blank" href="http://www.24k.hk/zh/contact.html" onclick="_gaq.push(['_trackEvent', 'ui', '24k', 'contact',1,true]);">联络我们</a>
		</p>
		<p class="copy-info">Copyright &copy; 2009-2014 金道贵金属有限公司
			版权所有，不得转载</p>
		<p class="kexin-web">
			<a href="https://ss.knet.cn" target="_blank">
				<img src="images/cnnic.png" oncontextmenu="return false;" alt="可信网站">
			</a>
		</p>
	</div>

<!-- below is webapp's script -->
<script type="text/javascript">
	//submit handler function
	function doSubmit(){
		if($('#username').val() == '' || $('#username').val() == '请输入真实交易帐号'|| $('#username').val() == '请输入模拟交易帐号'){
		 	$('#errorTip').html('请输入真实交易帐号');
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
		var usertype=0;
		var isImitate = $("#imitate").val();
		if(isImitate==1){
			document.loginForm.action="<%=request.getContextPath()%>/demologin.action";
			 usertype=1;
		}else{
			document.loginForm.action="<%=request.getContextPath()%>/Home.action";
		}
		$.getJSON("<%=request.getContextPath()%>/loginCheck.action?usertype="+usertype+"&username="+$('#username').val()+"&password="+$('#password').val()+"&randomNumber="+$('#randomNumber').val(),function(data){
			if(data.map.errorcode!=0){
				$("#errorTip").html(decodeURI(data.map.errormsg).replace("+",""));
				changeValidateCode();
				if(data.map.errorcode=='1'){
					$('#randomNumber').focus();
					$("#randomNumber").val("");
				}else{
					$('#username').focus();
					$('#password').val("");
					$('#randomNumber').val("");
				}
			}else{
				$("#errorTip").html("");
				document.loginForm.submit();
			}
		});
	}
	
	//change Image Validation Code Function
	function changeValidateCode() {	
		document.getElementById("createImg").style.display="";///CreateImg.action
		var timenow = new Date().getTime();	
		document.getElementById("createImg").src="<%=request.getContextPath()%>/VerifyCodeServlet?d="+timenow;	
	}
	
	//init web
	$(function(){
		//binding switch tab event
		$("#li_tab_real").on("click", function(){
			$("#li_tab_real").addClass("current");
			$("#li_tab_demo").removeClass("current");
			$("#imitate").val(0);
			$("#username").attr("placeholder", "请输入真实交易帐号");
		});
		
		$("#li_tab_demo").on("click", function(){
			$("#li_tab_real").removeClass("current");
			$("#li_tab_demo").addClass("current");
			$("#imitate").val(1);
			$("#username").attr("placeholder", "请输入模拟交易帐号");
		});
		
		//init image validation code
		changeValidateCode();
		
		//add enter key event
		$("#randomNumber").keydown(function(e){ 
			var curKey = e.which; 
			if(curKey == 13){ 
				$("#randomNumber").blur();
				$("#btn_submit").click(); 
				doSubmit();
				return false; 
			} 
		}); 
		
		//username input focus
		$('#username').focus();
	});
</script>

<!-- below is related to google analystic script -->
<script type="text/javascript">
$("#shengM").click(function(){
    $("#agreeCon").dialog({
      width:660,
      height:400,
      modal:true
      });
});

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
