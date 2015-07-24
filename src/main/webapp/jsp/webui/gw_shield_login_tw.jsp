<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="web.constant.Constant" %>
<%@ page import="web.constant.GWShieldConstant" %>
    
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>金道GTS客戶WEB UI系統</title>
<meta name="keywords" content="GT1登錄" />
<meta name="description" content="GT1登錄" />
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
<link href="<%=request.getContextPath()%>/css/login.css" rel="stylesheet" type="text/css">
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
    <div class="lay-tt"><a href="javascript://" class="del-btn" title="關閉"></a></div>
    <div class="layer-topbg"><a href="http://www.24k.hk" target="_blank" title="金道貴金屬"></a></div>
    <div class="lay-cenbox">  
      <ul class="lay-list">
        <li><strong>i. 互聯網故障</strong><br />
互聯網的運作不在金道貴金屬控制範圍之內，因此不能確保通過互聯網的接收和發放的信號，客戶電子設備的結構或聯接的可靠性，金道貴金屬絕不對互聯網上交易中出現的通訊故障、錯誤或延遲負責。 </li>
        <li class="li-bg"><strong>ii. 市場風險和網上交易</strong><br />
貴金屬交易涉及相當大的風險，其並非對每個投資者都適合。請參照風險披露聲明和本協議，了解有關風險的詳細資料。雖然網上交易爲客戶帶來很多方便或更有效率，但它並不降低貴金屬交易本身的風險。因此客戶在交易前，須準備承擔此風險。</li>
        <li><strong>iii. 密碼保護</strong><br />
客戶必須將密碼保密，確保沒有第三方取用其交易設施。客戶同意對所有經電郵或電子交易平臺傳送來的指示和對所有經由電郵、電子交易平臺、電話或書面向金道貴金屬發出的指示確實負責，即使是由第三方發出，這些指示已和客戶密碼采取的或不采取的行動所造成之後果負責。客戶須對密碼的保密性、安全性及其使用獨自承擔責任。</li>
        <li class="li-bg"><strong>iv.報價錯誤</strong><br />
倘若報價或成交價出現錯誤時，金道貴金屬對於賬戶結餘相應錯誤並不負責。有關錯誤可能包括但不限於：交易員的錯誤報價，非國際市場價之報價、或是任何報價錯誤（例如由於硬件、軟件或者通訊線路或系統故障導致報價錯誤或者第三者提供了錯誤的外部數據數據）。金道貴金屬不需爲錯誤所導致的賬戶余額負責，客戶下單時需預留足夠的時間執行訂單和系統計算所需保證金的時間。若訂單的執行價格或訂單設定和市場價格過於接近，這可能會觸發其他訂單（所有訂單類型）或發出保證金提示。金道貴金屬不會對由於系統沒有足夠時間執行訂單或進行運算所產生的保證金提示、賬戶結餘或賬戶頭寸負責。上文不得視作內容盡列，一旦發生報價或執行錯誤，金道貴金屬保留對有關賬戶進行必要更正或調整的權利。對於報價或執行錯誤而産生的任何爭議，我們將依據絕對酌情權進行解決。若因此帶來任何損失、損害或責任，客戶同意予以賠償使金道貴金屬不受損害。</li>
        <li><strong>v. 套等</strong><br />
互聯網、聯機延誤及報價上的誤差有時會造成在金道貴金屬交易平臺上的報價無法準確地反映實時市場價格。 「套等」及「切彙」，或因網絡連接的延誤而利用差價獲利的行爲，並不能存在於客戶直接向莊家進行買賣的場外交易市場​​中。金道貴金屬不容許客戶在本公司的交易平臺上進行此等套等行為。依據因價格滯後帶來的套等機會進行的交易有可能會被撤銷。金道貴金屬保留權利對涉及上述交易的賬戶進行必要的修正和調整。金道貴金屬可依據絕對酌情權，要求交易員進行幹預或核準所有下單以及或終止有關客戶的賬戶，而不需事先通知客戶。對套戥及/或操控價格而産生的糾紛，金道貴金屬將依據絕對酌情權進行解決。金道貴金屬保留凍結客戶提款的權利直至能夠完全解決上述的問題爲止。於此陳述的任何行動或決議將不會損害或放棄令金道貴金屬對客戶和其僱員擁有之任何權力或賠償。</li>
        <li class="li-bg"><strong>vi. 操控價格、執行及平臺</strong><br />
金道貴金屬絕對嚴禁以任何形式對其價格、執行及平臺進行操控。若金道貴金屬懷疑任何賬戶從事操控，金道貴金屬保留對賬戶進行調查及審核等的相關權利，並從涉嫌賬戶中扣除由相關活動所賺取的盈利款項。金道貴金屬保留對相關賬戶進行必要更正或調整的權利。對於涉嫌從事操控的賬戶，金道貴金屬依據絕對酌情權，要求交易員進行幹預、對下單進行核準以及或終止有關客戶的賬戶。對於由套戥及或操控所産生的任何糾紛，金道貴金屬將依據絕對酌情權進行解決。金道貴金屬可依據酌情權決定向任何相關監管機構或執法機構報告有關事件。於此處所陳述的任何行動或決議並不免除或損害金道貴金屬對客戶和其雇員擁有之任何權利或賠償。</li>
      </ul>
    </div>
  </div>
</div>
<!-- layer end -->

<div class="headbg">
	<div id="header" class="clearfix">
	  <h1 class="logo fl"><a href="http://www.24k.hk" class="hide-t" title="金道貴金屬">GT1-客戶登入</a></h1>
	  <!-- <p class="r-menu fr"><a href="#nogo">繁體</a>|<a href="../zh/login.html" class="c-on">簡體</a></p> -->
	</div>
</div>
<div id="jdd-bgbox" class="jdd-ban-bg">
  <!-- login begin -->
  <div class="user-dengl">
    <div class="login-box login-box-jdd">
       <form id="gwshieldform" action="GWShieldLogin.action" method="post">
	      <dl class="login_all_dl clearfix">
	        <dt>請輸入金道盾動態密碼：</dt><dd class="login_all_d1"><input type="text" value="" name="gw_shield_code" id="gw_shield_code" class="inp_a1 fd"></dd>
	        <dd class="login_all_d2">(可於金道盾終端獲取，註意動態密碼每分鍾更新一次)</dd>
	        
	        <dd class="login_all_d3">
	        	<a id="submit_btn" href="#" onclick="javascript:submitForm()">確認</a><a href="<%=request.getContextPath()%>">退出</a>
	        </dd>
	        
	        <dd id="errormsg_loginfail" style="display:none" class="tishi-info">動態密碼錯誤，請確認後重新輸入！</dd>
	        <dd id="errormsg_lock" style="display:none" class="tishi-info">金道盾動態密碼驗證功能已鎖定，若需解鎖請聯系客服！</dd>
	        <dd id="errormsg_dynamic_code_used" style="display:none" class="tishi-info">閣下輸入的動態密碼已使用，請輸入更新後的動態密碼！</dd>
	        <dd id="errormsg_5timelock" style="display:none" class="tishi-info">閣下輸入的動態密碼連續校驗5次沒有通過，<span id="countdownSpan">5</span> 秒後將自動退出。若有疑問請聯系在線客服！</dd>
      	</dl>
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

<div id="footer">
<p class="menu-link"><a href="javascript://" id="shengM">免責聲明</a>|<a href="#">隱私條款</a>|<a href="#">聯絡我們</a></p>
<p class="copy-info">Copyright &copy; 2009-2014 金道貴金屬有限公司 版權所有，不得轉載</p>
<p class="kexin-web"><a href="https://ss.knet.cn" target="_blank"><img src="<%=request.getContextPath()%>/images/cnnic.png" oncontextmenu="return false;" alt="可信網站"></a></p>
</div>

<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.9.2.min.js"></script>
<script type="text/javascript">
$(function(){
  $("#shengM").click(function(){
    $("#agreeCon").dialog({
      width:660,
      height:400,
      modal:true
      });
  });
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
