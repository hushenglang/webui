<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>重設密碼</title>
<meta content="金道,GTS,客戶,WEB UI,繫統" name="keywords" />
<meta content="金道,GTS,客戶,WEB UI,繫統" name="description" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link href="<%=request.getContextPath()%>/mobile/css/login-mobile.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"	src="<%=request.getContextPath()%>/js/lib/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_i18n/deviceCheck.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery-ui-1.10.3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery.placeholder.1.3.min.js"></script>	
<script type="text/javascript">
$(function(){
	$("#shengM").click(function(){
	    $("#disclaimerDiv").dialog({
	      width:300,
		  height:350,
	      modal:true
	     });
	});
});
</script>
</head>

<body>
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
貴金屬交易涉及相當大的風險，其並非對每個投資者都適合。請參照風險披露聲明和本協議，了解有關風險的詳細資料。雖然網上交易爲客戶帶來很多方便或更有效率，但它並不降低貴金屬交易本身的風險。因此客戶在交易前，須准備承擔此風險。</li>
        <li><strong>iii. 密碼保護</strong><br />
客戶必須將密碼保密，確保沒有第三方取用其交易設施。客戶同意對所有經電郵或電子交易平台傳送來的指示和對所有經由電郵、電子交易平台、電話或書面向金道貴金屬發出的指示確實負責，即使是由第三方發出，這些指示已和客戶密碼采取的或不采取的行動所造成之後果負責。客戶須對密碼的保密性、安全性及其使用獨自承擔責任。</li>
        <li class="li-bg"><strong>iv.報價錯誤</strong><br />
倘若報價或成交價出現錯誤時，金道貴金屬對于賬戶結餘相應錯誤並不負責。有關錯誤可能包括但不限于：交易員的錯誤報價，非國際市場價之報價、或是任何報價錯誤（例如由于硬件、軟件或者通訊線路或系統故障導致報價錯誤或者第三者提供了錯誤的外部數據數據）。金道貴金屬不需爲錯誤所導致的賬戶余額負責，客戶下單時需預留足夠的時間執行訂單和系統計算所需保證金的時間。若訂單的執行價格或訂單設定和市場價格過于接近，這可能會觸發其他訂單（所有訂單類型）或發出保證金提示。金道貴金屬不會對由於系統沒有足夠時間執行訂單或進行運算所產生的保證金提示、賬戶結餘或賬戶頭寸負責。上文不得視作內容盡列，一旦發生報價或執行錯誤，金道貴金屬保留對有關賬戶進行必要更正或調整的權利。對於報價或執行錯誤而産生的任何爭議，我們將依據絕對酌情權進行解決。若因此帶來任何損失、損害或責任，客戶同意予以賠償使金道貴金屬不受損害。</li>
        <li><strong>v. 套等</strong><br />
互聯網、聯機延誤及報價上的誤差有時會造成在金道貴金屬交易平台上的報價無法准確地反映實時市場價格。 「套等」及「切彙」，或因網絡連接的延誤而利用差價獲利的行爲，並不能存在于客戶直接向莊家進行買賣的場外交易市場​​中。金道貴金屬不容許客戶在本公司的交易平台上進行此等套等行為。依據因價格滯後帶來的套等機會進行的交易有可能會被撤銷。金道貴金屬保留權利對涉及上述交易的賬戶進行必要的修正和調整。金道貴金屬可依據絕對酌情權，要求交易員進行幹預或核准所有下單以及或終止有關客戶的賬戶，而不需事先通知客戶。對套戥及/或操控價格而産生的糾紛，金道貴金屬將依據絕對酌情權進行解決。金道貴金屬保留凍結客戶提款的權利直至能夠完全解決上述的問題爲止。于此陳述的任何行動或決議將不會損害或放棄令金道貴金屬對客戶和其僱員擁有之任何權力或賠償。</li>
        <li class="li-bg"><strong>vi. 操控價格、執行及平台</strong><br />
金道貴金屬絕對嚴禁以任何形式對其價格、執行及平台進行操控。若金道貴金屬懷疑任何賬戶從事操控，金道貴金屬保留對賬戶進行調查及審核等的相關權利，並從涉嫌賬戶中扣除由相關活動所賺取的盈利款項。金道貴金屬保留對相關賬戶進行必要更正或調整的權利。對于涉嫌從事操控的賬戶，金道貴金屬依據絕對酌情權，要求交易員進行幹預、對下單進行核准以及或終止有關客戶的賬戶。對於由套戥及或操控所産生的任何糾紛，金道貴金屬將依據絕對酌情權進行解決。金道貴金屬可依據酌情權決定向任何相關監管機構或執法機構報告有關事件。于此處所陳述的任何行動或決議並不免除或損害金道貴金屬對客戶和其雇員擁有之任何權利或賠償。</li>
      </ul>
    </div>
  </div>
</div>
<!-- layer end -->

<div id="header" class="clearfix">
  <a href="retakePassword.action?lang=zh_CN" class="fr">简体</a>
</div>

<div id="con-bgbox">
  <h1 class="logo"><a href="http://www.24k.hk" class="hide-t">金道貴金屬</a></h1>
  <!-- login begin -->
  <div class="login-wrapper">
    <div class="user-dengl">
      <div class="login-box">
        <!-- 真实交易begin -->
        <div class="form-box" id="trueTrade">
          <h2>重設密碼</h2>
          <h3>您已成功重設密碼</h3>
          <p class="log-set-info log-set-pad">新密碼將發送到您的登記電郵地址。<br />為保障您的賬戶安全，請收到新密碼後，自行更改密碼。<br />如有任何查詢，請聯絡<a onclick="window.open('http://www.onlineservice-hk.com/k800/chatClient/chatbox.jsp?companyID=209&amp;configID=16&amp;enterurl=http://www.24k.hk/', 'window1', 'HEIGHT=420, WIDTH=565,top=0,left=0');" href="javascript:void(0);">在線客服</a></p>
        </div>      
        <!-- 真实交易end --> 
        </div>
        <p class="login-pwd-btn"><a href="Login.action?lang=zh_TW">客戶登錄</a></p>
      </div>
    </div>  
  <!-- login end -->
</div>
<div id="footer">
  <p class="menu-link"><a href="javascript://" id="shengM">免責聲明</a>|<a href="http://www.24k.hk/zh/contact.html" target="_blank">聯絡我們</a></p>
  <p class="copy-info">Copyright &copy; 2009-2014 金道貴金屬有限公司 版權所有，不得轉載</p>
  <p class="kexin-web"><a href="https://ss.knet.cn" target="_blank"><img src="<%=request.getContextPath()%>/images/cnnic.png" oncontextmenu="return false;" alt="可信網站"></a></p>
</div>
</body>
</html>
