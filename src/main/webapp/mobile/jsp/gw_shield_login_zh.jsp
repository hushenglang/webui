<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.constant.Constant" %>
<%@ page import="web.constant.GWShieldConstant" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>金道GTS客户WEB UI系统</title>
<meta name="keywords" content="GT1登录" />
<meta name="description" content="GT1登录" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link href="<%=path%>/mobile/css/login-mobile.css" rel="stylesheet" type="text/css">
</head>

<script type="text/javascript">
	function submitForm(){
		var gw_shield_code = $("#gw_shield_code").val();
		if(gw_shield_code==''||gw_shield_code==null){
			$("#gw_shield_code").focus();
			return false;
		}
		document.forms.gwshieldform.submit();
	}
</script>
<body>
	<%
		request.setAttribute("realnum", request.getParameter("realnum"));
		request.setAttribute("demoNum", request.getParameter("demoNum"));
		request.setAttribute("check", request.getParameter("check"));
		request.setAttribute("imitate", request.getParameter("imitate"));
		request.setAttribute("rs", request.getParameter("rs"));
		request.setAttribute("randomNumber", request.getParameter("randomNumber"));
		request.setAttribute("deviceType", request.getParameter("deviceType"));
	%>
<!-- layer begin -->
<div class="layer-out dn" id="agreeCon">
  <div class="layer-con">
    <div class="lay-tt"><a href="javascript://" class="del-btn" title="关闭"></a></div>
    <div class="layer-topbg"><a href="http://www.24k.hk" target="_blank" title="金道贵金属"></a></div>
    <div class="lay-cenbox">  
      <ul class="lay-list">
        <li><strong>i. 互联网故障</strong><br />
互联网的运作不在金道贵金属控制范围之内，因此不能确保通过互联网的接收和发放的信号，客户电子设备的结构或联接的可靠性，金道贵金属绝不对互联网上交易中出现的通讯故障、错误或延迟负责。 </li>
        <li class="li-bg"><strong>ii. 市场风险和网上交易</strong><br />
贵金属交易涉及相当大的风险，其并非对每个投资者都适合。请参照风险披露声明和本协议，了解有关风险的详细资料。虽然网上交易为客户带来很多方便或更有效率，但它并不降低贵金属交易本身的风险。因此客户在交易前，须淮备承担此风险。</li>
        <li><strong>iii. 密码保护</strong><br />
客户必须将密码保密，确保没有第三方取用其交易设施。客户同意对所有经电邮或电子交易平台传送来的指示和对所有经由电邮、电子交易平台、电话或书面向金道贵金属发出的指示确实负责，即使是由第三方发出，这些指示已和客户密码采取的或不采取的行动所造成之后果负责。客户须对密码的保密性、安全性及其使用独自承担责任。</li>
        <li class="li-bg"><strong>iv.报价错误</strong><br />
倘若报价或成交价出现错误时，金道贵金属对于账户结馀相应错误并不负责。有关错误可能包括但不限于：交易员的错误报价，非国际市场价之报价、或是任何报价错误（例如由于硬件、软件或者通讯线路或系统故障导致报价错误或者第三者提供了错误的外部数据数据）。金道贵金属不需为错误所导致的账户余额负责，客户下单时需预留足够的时间执行订单和系统计算所需保证金的时间。若订单的执行价格或订单设定和市场价格过于接近，这可能会触发其他订单（所有订单类型）或发出保证金提示。金道贵金属不会对由于系统没有足够时间执行订单或进行运算所产生的保证金提示、账户结馀或账户头寸负责。上文不得视作内容尽列，一旦发生报价或执行错误，金道贵金属保留对有关账户进行必要更正或调整的权利。对于报价或执行错误而产生的任何争议，我们将依据绝对酌情权进行解决。若因此带来任何损失、损害或责任，客户同意予以赔偿使金道贵金属不受损害。</li>
        <li><strong>v. 套等</strong><br />
互联网、联机延误及报价上的误差有时会造成在金道贵金属交易平台上的报价无法淮确地反映实时市场价格。 「套等」及「切汇」，或因网络连接的延误而利用差价获利的行为，并不能存在于客户直接向庄家进行买卖的场外交易市场​​中。金道贵金属不容许客户在本公司的交易平台上进行此等套等行为。依据因价格滞后带来的套等机会进行的交易有可能会被撤销。金道贵金属保留权利对涉及上述交易的账户进行必要的修正和调整。金道贵金属可依据绝对酌情权，要求交易员进行干预或核淮所有下单以及或终止有关客户的账户，而不需事先通知客户。对套戳及/或操控价格而产生的纠纷，金道贵金属将依据绝对酌情权进行解决。金道贵金属保留冻结客户提款的权利直至能够完全解决上述的问题为止。于此陈述的任何行动或决议将不会损害或放弃令金道贵金属对客户和其僱员拥有之任何权力或赔偿。</li>
        <li class="li-bg"><strong>vi. 操控价格、执行及平台</strong><br />
金道贵金属绝对严禁以任何形式对其价格、执行及平台进行操控。若金道贵金属怀疑任何账户从事操控，金道贵金属保留对账户进行调查及审核等的相关权利，并从涉嫌账户中扣除由相关活动所赚取的盈利款项。金道贵金属保留对相关账户进行必要更正或调整的权利。对于涉嫌从事操控的账户，金道贵金属依据绝对酌情权，要求交易员进行干预、对下单进行核淮以及或终止有关客户的账户。对于由套戳及或操控所产生的任何纠纷，金道贵金属将依据绝对酌情权进行解决。金道贵金属可依据酌情权决定向任何相关监管机构或执法机构报告有关事件。于此处所陈述的任何行动或决议并不免除或损害金道贵金属对客户和其雇员拥有之任何权利或赔偿。</li>
      </ul>
    </div>
  </div>
</div>
<!-- layer end -->

<div id="header" class="clearfix">
</div>

<div id="con-bgbox">
  <h1 class="logo"><a href="#" class="hide-t">金道贵金属</a></h1>
  <!-- login begin -->
  <div class="login-wrapper">
    <div class="user-dengl">
      <div class="login-box">
       
       
       <form id="gwshieldform" action="GWShieldLogin.action" method="post">
	        <div class="form-box" id="trueTrade">
	          <div class="form-listbox clearfix">
	            <p class="jdd-p-info">请输入金道盾动态密码：</p>
	            <div class="input-box inp-jdd-fon"><input type="text" value="" name="gw_shield_code" id="gw_shield_code" class="in-aput in-icon2 inp-fon" /></div>
	          </div>
	          <div class="ly-btnbox"><a class="qingc-btn" id="submit_btn" href="#" onclick="javascript:submitForm()">确认</a><a  class="submit-btn"  href="<%=request.getContextPath()%>">退出</a></div>
	          <div class="form-listbox">
	            <div id="errormsg_loginfail" style="display:none" class="tishi-info red">动态密码错误，请确认后重新输入！</div>
		        <div id="errormsg_lock" style="display:none" class="tishi-info red">金道盾动态密码验证功能已锁定，若需解锁请联系客服！</div>
		        <div id="errormsg_dynamic_code_used" style="display:none" class="tishi-info red">阁下输入的动态密码已使用，请输入更新后的动态密码！</div>
		        <div id="errormsg_5timelock" style="display:none" class="tishi-info red">阁下输入的动态密码连续校验5次没有通过，<span id="countdownSpan">5</span> 秒后将自动退出。若有疑问请联系在线客服！</div>
	          </div>
	        </div>  
	        
        	<input type="hidden" name="realnum" value="<%=request.getAttribute("realnum") %>"/> 
			<input type="hidden" name="demoNum" value="<%=request.getAttribute("demoNum") %>"/> 
			<input type="hidden" name="check" value="<%=request.getAttribute("check") %>"/> 
			<input type="hidden" name="imitate" value="<%=request.getAttribute("imitate") %>"/> 
			<input type="hidden" name="rs" value="<%=request.getAttribute("rs") %>"/> 
			<input type="hidden" name="randomNumber" value="<%=request.getAttribute("randomNumber") %>"/> 
			<input type="hidden" name="deviceType" value="<%=request.getAttribute("deviceType") %>"/> 
			<input type="hidden" name="count" value="<%=request.getAttribute("count") %>"/>  
        </form>
           
      </div>
    </div>  
  <!-- login end -->
  </div>
</div>
<div id="footer">
  <p class="menu-link"><a href="javascript://" id="shengM">免责声明</a>|<a href="#">隐私条款</a>|<a href="#">联络我们</a></p>
  <p class="copy-info">Copyright &copy; 2009-2014 金道贵金属有限公司 版权所有，不得转载</p>
  <p class="kexin-web"><a href="https://ss.knet.cn" target="_blank"><img src="<%=request.getContextPath()%>/images/cnnic.png" oncontextmenu="return false;" alt="可信网站"></a></p>
</div>

<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.9.2.min.js"></script>
<script type="text/javascript">
$(function(){
  $("#shengM").click(function(){
    $("#agreeCon").dialog({
      width:300,
      height:350,
      modal:true
      });
  })
});  
//go to login page in 5 seconds
function gotoLoginPageIn5seconds(){
	setTimeout(function(){
		window.location.href="<%=request.getContextPath()%>";
	},5000);
	
	setInterval(function(){
		var newNum = $("#countdownSpan").text()-1;
		if(newNum>0){
			$("#countdownSpan").text(newNum);
		}
	},1000);
}
$("#gw_shield_code").focus();
</script>

		<%
        	String msgcode = (String)request.getAttribute("msgcode");
        	if(GWShieldConstant.SHIELDCODE_ERROR_LOGINFAIL.equals(msgcode)) {
        %>
	        <script type="text/javascript">
	        	$("#errormsg_loginfail").show();
	        </script>
        <%
        	}else if(GWShieldConstant.SHIELDCODE_ERROR_5TIMESFAIL.equals(msgcode)) {
         %>
    	    <script type="text/javascript">
       	        $("#errormsg_5timelock").show();
       	    	$("#submit_btn").removeAttr('href');
       	    	gotoLoginPageIn5seconds();
       	    </script>
       	<%
       		}else if(GWShieldConstant.SHIELDCODE_ERROR_DYNAMIC_CODE_USED.equals(msgcode)) {
         %>
    	    <script type="text/javascript">
       	        $("#errormsg_dynamic_code_used").show();
       	    </script>
       	<%
      		}else if(GWShieldConstant.SHIELDCODE_ERROR_LOCK.equals(msgcode)) {
         %>
    	    <script type="text/javascript">
       	        $("#errormsg_lock").show();
       	    </script>
       	<%
	       	}
        %>

		<input type="hidden" value="<%=msgcode %>"/>
		

</body>
</html>
