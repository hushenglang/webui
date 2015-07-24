<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>重设密码</title>
<meta content="金道,GTS,客户,WEB UI,系统" name="keywords" />
<meta content="金道,GTS,客户,WEB UI,系统" name="description" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link href="<%=request.getContextPath()%>/mobile/css/login-mobile.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.10.3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.placeholder.1.3.min.js"></script>	
<script type="text/javascript">
var platformArray=["GW:GTS交易账户"];
function changeValidateCode() {	
	document.getElementById("createImg").style.display="";///CreateImg.action
	var timenow = new Date().getTime();	
	document.getElementById("createImg").src="<%=request.getContextPath()%>/VerifyCodeServlet?d="+timenow;	
}
$(function(){
	$("#shengM").click(function(){
	    $("#disclaimerDiv").dialog({
	      width:300,
		  height:350,
	      modal:true
	     });
	});
	$.Placeholder.init();
	<s:if test="#request.code_error==1000">
	$("#error_msg").show().html("请正确输入验证码！");
	</s:if>
	<s:if test="#request.code_error==1024 || #request.code_error==1023 || #request.code_error==1025 || #request.code_error==1068">
	$("#error_msg").show().html("请正确输入交易账号！");
	</s:if>
});
function accountnoChange(){
	var accountno=document.getElementById("accountno");
	var platform=document.getElementById("platform");
	if($.trim(accountno.value)=='请输入交易账号'){
		return;
	}
 	if($.trim(accountno.value)==""){
 		accountno.value="";
 	}
	var accountnoValue=$.trim(accountno.value);
	if(!isNaN(accountnoValue)){
		if(accountnoValue.length==7){
			platform.value=platformArray[0].split(":")[0];
		}else{
			platform.value="";
			accountno.value="";
			accountno.focus();
			$("#error_msg").show().html("请输入正确的交易账号！");
			return;
		}
		$("#error_msg").hide();
	}else{
		platform.value="";
		accountno.value="";
		accountno.focus();
		$("#error_msg").show().html("请输入正确的交易账号！");
		return;
	}
	
}
function submitlogin(){
	if(document.getElementById("accountno").value=="请输入交易账号" || document.getElementById("accountno").value==""){
		$("#error_msg").show().html("请输入交易账号！");
		document.getElementById("accountno").focus();
		return false;
	}else{
		$("#error_msg").hide();
	}
	if(document.getElementById("accountname").value=="请输入中文姓名/英文姓名" || document.getElementById("accountname").value==""){
		$("#error_msg").show().html("请输入中文姓名/英文姓名！");
		document.getElementById("accountname").focus();
		return false;
	}else{
		$("#error_msg").hide();
	}
	if(document.getElementById("code").value=="" || document.getElementById("code").value=="请输入验证码"){
		$("#error_msg").show().html("请输入验证码！");
		document.getElementById("code").focus();
		return false;
	}else{
		$("#error_msg").hide();
	}
	document.getElementById("formlogin").submit();
}
function reset(){
	document.getElementById("accountno").value="";
	document.getElementById("accountname").value="";
	document.getElementById("code").value="";
	$.Placeholder.init();
}
</script>

</head>

<body>
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
贵金属交易涉及相当大的风险，其并非对每个投资者都适合。请参照风险披露声明和本协议，了解有关风险的详细资料。虽然网上交易为客户带来很多方便或更有效率，但它并不降低贵金属交易本身的风险。因此客户在交易前，须准备承担此风险。</li>
        <li><strong>iii. 密码保护</strong><br />
客户必须将密码保密，确保没有第三方取用其交易设施。客户同意对所有经电邮或电子交易平台传送来的指示和对所有经由电邮、电子交易平台、电话或书面向金道贵金属发出的指示确实负责，即使是由第三方发出，这些指示已和客户密码采取的或不采取的行动所造成之后果负责。客户须对密码的保密性、安全性及其使用独自承担责任。</li>
        <li class="li-bg"><strong>iv.报价错误</strong><br />
倘若报价或成交价出现错误时，金道贵金属对于账户结餘相应错误并不负责。有关错误可能包括但不限于：交易员的错误报价，非国际市场价之报价、或是任何报价错误（例如由于硬件、软件或者通讯线路或系统故障导致报价错误或者第三者提供了错误的外部数据数据）。金道贵金属不需为错误所导致的账户余额负责，客户下单时需预留足够的时间执行订单和系统计算所需保证金的时间。若订单的执行价格或订单设定和市场价格过于接近，这可能会触发其他订单（所有订单类型）或发出保证金提示。金道贵金属不会对由於系统没有足够时间执行订单或进行运算所產生的保证金提示、账户结餘或账户头寸负责。上文不得视作内容尽列，一旦发生报价或执行错误，金道贵金属保留对有关账户进行必要更正或调整的权利。对於报价或执行错误而产生的任何争议，我们将依据绝对酌情权进行解决。若因此带来任何损失、损害或责任，客户同意予以赔偿使金道贵金属不受损害。</li>
        <li><strong>v. 套等</strong><br />
互联网、联机延误及报价上的误差有时会造成在金道贵金属交易平台上的报价无法准确地反映实时市场价格。 「套等」及「切汇」，或因网络连接的延误而利用差价获利的行为，并不能存在于客户直接向庄家进行买卖的场外交易市场​​中。金道贵金属不容许客户在本公司的交易平台上进行此等套等行為。依据因价格滞后带来的套等机会进行的交易有可能会被撤销。金道贵金属保留权利对涉及上述交易的账户进行必要的修正和调整。金道贵金属可依据绝对酌情权，要求交易员进行干预或核准所有下单以及或终止有关客户的账户，而不需事先通知客户。对套戥及/或操控价格而产生的纠纷，金道贵金属将依据绝对酌情权进行解决。金道贵金属保留冻结客户提款的权利直至能够完全解决上述的问题为止。于此陈述的任何行动或决议将不会损害或放弃令金道贵金属对客户和其僱员拥有之任何权力或赔偿。</li>
        <li class="li-bg"><strong>vi. 操控价格、执行及平台</strong><br />
金道贵金属绝对严禁以任何形式对其价格、执行及平台进行操控。若金道贵金属怀疑任何账户从事操控，金道贵金属保留对账户进行调查及审核等的相关权利，并从涉嫌账户中扣除由相关活动所赚取的盈利款项。金道贵金属保留对相关账户进行必要更正或调整的权利。对于涉嫌从事操控的账户，金道贵金属依据绝对酌情权，要求交易员进行干预、对下单进行核准以及或终止有关客户的账户。对於由套戥及或操控所产生的任何纠纷，金道贵金属将依据绝对酌情权进行解决。金道贵金属可依据酌情权决定向任何相关监管机构或执法机构报告有关事件。于此处所陈述的任何行动或决议并不免除或损害金道贵金属对客户和其雇员拥有之任何权利或赔偿。</li>
      </ul>
    </div>
  </div>
</div>
<!-- layer end -->

<div id="header" class="clearfix">
  <a href="retakePassword.action?lang=zh_TW" class="fr">繁体</a>
</div>

<div id="con-bgbox">
  <h1 class="logo"><a href="http://www.24k.hk" class="hide-t">金道贵金属</a></h1>
  <!-- login begin -->
  <div class="login-wrapper">
    <div class="user-dengl">
      <div class="login-box">
        <!-- 真实交易begin -->
        <div class="form-box" id="trueTrade">
          <h2>重设密码</h2>
          <form id="formlogin" action="<%=request.getContextPath()%>/doRetakePassword.action" method="post">
			<input type="hidden" name="platform" id="platform"></input>
			<input type="hidden" name="lang" value="zh_CN" />
          <div class="form-listbox clearfix">
            <div class="input-box"><input type="text" name="accountno" id="accountno" onblur="accountnoChange()" value="${accountno }" placeholder="请输入交易账号" class="in-aput in-icon1" /></div>
          </div>
          <div class="form-listbox clearfix">
            <div class="input-box"><input type="text" name="platformText" id="platformText" disabled="disabled" value="GTS交易账户" class="in-aput in-icon4 inp-fon" /></div>
          </div>
          <div class="form-listbox clearfix">
            <div class="input-box"><input type="text" name="accountname" id="accountname" value="${accountname }" placeholder="请输入中文姓名/英文姓名" class="in-aput in-icon5" /></div>
          </div>
          <div class="form-listbox clearfix">
            <div class="input-box input-box-yzm"><input type="text" value="" name="code" id="code" maxlength="4" placeholder="请输入验证码" class="in-aput in-icon3 vcen" />
            <div class="yzm-img"><img src="<%=request.getContextPath()%>/VerifyCodeServlet" onclick="changeValidateCode()" id="createImg" width="74" height="30" alt="验证码" class="vcen" /></div>
            <p class="f-wd-text"><a href="javascript://" onclick="changeValidateCode()" class="blue">换一张</a></p>
          </div>
          <div class="ly-btnbox"><a class="qingc-btn" href="javascript:submitlogin();void(0);">提交</a><a class="submit-btn" href="javascript:reset();void(0);">重置</a></div>
          <div class="ly-zh-info clearfix">
          </div>
          <div class="form-listbox">
            <div class="tishi-info red" id="error_msg" style="display: none;">请输入正确的交易账号！</div>
          </div>
          <p class="log-set-info">请输入您要重置的交易账户，新密码将会发送到您的登记邮箱。<br />如有任何查询，请联络<a onclick="window.open('http://www.onlineservice-hk.com/k800/chatClient/chatbox.jsp?companyID=209&amp;configID=16&amp;enterurl=http://www.24k.hk/', 'window1', 'HEIGHT=420, WIDTH=565,top=0,left=0');" href="javascript:void(0);">在线客服</a></p>
        </div>      
        </form>
        <!-- 真实交易end --> 
        </div>
      </div>
    </div>  
  <!-- login end -->
  </div>
</div>
<div id="footer">
  <p class="menu-link"><a href="javascript://" id="shengM">免责声明</a>|<a a href="http://www.24k.hk/zh/contact.html" target="_blank">联络我们</a></p>
  <p class="copy-info">Copyright &copy; 2009-2014 金道贵金属有限公司 版权所有，不得转载</p>
  <p class="kexin-web"><a href="https://ss.knet.cn" target="_blank"><img src="<%=request.getContextPath()%>/images/cnnic.png" oncontextmenu="return false;" alt="可信网站"></a></p>
</div>
</body>
</html>
