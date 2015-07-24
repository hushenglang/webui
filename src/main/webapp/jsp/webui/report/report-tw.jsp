<%@ page language="java" import="java.text.SimpleDateFormat,java.util.Date,java.util.Calendar;" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//設置日期格式
String date=df.format(new Date());

Calendar curr = Calendar.getInstance();
curr.set(Calendar.MONTH,curr.get(Calendar.MONTH)-3);
String date3=df.format(curr.getTime());

%>
<iframe id="downloadiframe" style="visibility:hidden;display:none"></iframe>
<!--左側導航報表layer by 11.27 begin-->
<div class="layer-box-report dn" id="leftBaobiao">
  <div class="layer-con">
    <div class="navbox-c">
      <div class="nav-qh clearfix">
        <ul class="tan-ul fl" id="baobiaoUlId">
      	   <li class="on-na">委託記錄</li>
			<li>成交記錄</li>
			<li>盈虧記錄</li>
			<li>額度記錄</li>
			<li>優惠記錄</li>
        </ul>
      </div>
    </div>
    <div id="baobiaoListId">

      <!--委託記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="areaWeituo">
        	<input type="hidden" name="pageNoWeituo" id= "pageNoWeituo" value=1 />
           <ul class="clearfix">
             <li><input  type="checkbox" class="vcen" name="box" id="weituo_checkbox"  onclick="checkTable(this,'areaWeituo')"/>&nbsp;單號：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>産&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <li>類別：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>         
             <li>開始時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaWeituo_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaWeituo_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>結束時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaWeituo_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaWeituo_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchWeituoHref">查詢</a><a href="javascript:" id="downloadWeituoHref">下載</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableWeituo">
           <thead>
          <tr>
					<th>委託號</th>
					<th>類型</th> 
					<th>類別</th> 
					<th>産品</th> 
					<th>買/賣</th>  
					<th>手數</th>
					<th>限價</th>
					<th>止蝕</th>
					<th>狀態</th>
					<th>期限</th>
					<th>委託時間</th> 
					<th>執行時間</th> 
					<th>訂單號</th> 
					<th>平倉號</th> 
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperWeituo">
       </div></div>
      </div>
      <!--委託記錄 end-->
      
      
      
      
      
      
      <!--成交記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="areaTradeReport">
        	<input type="hidden" name="pageNoTradeReport" id= "pageNoTradeReport" value=1 />
           <ul class="clearfix">
             <li><input  class="vcen" type="checkbox" name="box" id="tradeReport_checkbox"  onclick="checkTable(this,'areaTradeReport')"/>&nbsp;單號：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>産&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <li>類別：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>  
             <li>開始時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaTradeReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaTradeReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>結束時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaTradeReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaTradeReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchTradeReportHref">查詢</a><a href="javascript:" id="downloadTradeReportHref">下載</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableTradeReport">
           <thead>
          <tr>											
					<th>交易時間</th>
					<th>訂單號</th>
					<th>類型</th>
					<th>類別</th>
					<th>產品</th>
					<th>買/賣</th>
					<th>手數</th>
					<th>成交價</th>
					<th>報價序號</th>
					<th>平倉號</th>
					<th>交易編碼</th>
					<th>交易編碼費</th>
					<th>備註</th>
					
					
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperTradeReport">
       </div></div>
      </div>
      <!--成交記錄 end-->
      
      
      <!--盈虧記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="areaProfitReport">
        	<input type="hidden" name="pageNoProfitReport" id= "pageNoProfitReport" value=1 />
           <ul class="clearfix">
             <li><input class="vcen" type="checkbox" name="box" id="profitReport_checkbox"  onclick="checkTable(this,'areaProfitReport')"/>&nbsp;單號：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>産&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <!-- <li>類別：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>   -->  
             <li>開始時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaProfitReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaProfitReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>結束時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaProfitReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaProfitReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchProfitReportHref">查詢</a><a href="javascript:" id="downloadProfitReportHref">下載</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableProfitReport">
           <thead>
          <tr>																							
					<th>產品</th>
					<th>類型</th>
					<th>平倉號</th>
					<th>買/賣</th>
					<th>平倉手數</th>
					<th>平倉價格</th>
					<th>訂單號</th>
					<th>開倉手數</th>
					<th>開倉價格</th>
					<th>利息</th>
					<th>盈虧</th>
					<th>回贈金額</th>
					<th>開倉時間</th>
					<th>平倉時間</th>
					<th>備註</th>
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperProfitReport">
       </div></div>
      </div>
      <!--盈虧記錄 end-->
      
      
      
      <!--額度記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="areaBalanceReport">
        	<input type="hidden" name="pageNoBalanceReport" id= "pageNoBalanceReport" value=1 />
           <ul class="clearfix">
             <li>項&nbsp;&nbsp;目&nbsp;&nbsp;：<select class="baob-slist vcen" name="cusTranCode" id="cusTranCode"></select></li> 
             <li>開始時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaBalanceReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaBalanceReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>結束時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaBalanceReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaBalanceReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchBalanceReportHref">查詢</a><a href="javascript:" id="downloadBalanceReportHref">下載</a></p></li>
           </ul>          
        </div>
        <div>
        <table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableBalanceReport">
           <thead>
          	<tr>																												
					<th>時間</th>
					<th>項目</th>
					<th>交易前賬戶余額</th>
					<th>收入</th>
					<th>支出</th>
					<th>交易後賬戶余額</th>
					<th>流水號</th>
					<th>備註</th>	
					
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperBalanceReport">
       </div></div>
      </div>
      <!--額度記錄 end-->
      
      
      
      
      <!--回贈記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="areaCashBackReport">
        	<input type="hidden" name="pageNoCashBackReport" id= "pageNoCashBackReport" value=1 />
           <ul class="clearfix">
           	 
             <li><select class="baob-slist vcen" name="rebateType" id="rebateType"></select></li> 
             <li>開始時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaCashBackReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaCashBackReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>結束時間：<input type="text" value="<%=date%>" class="input-text vcen" id="areaCashBackReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaCashBackReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchCashBackReportHref">查詢</a><a href="javascript:" id="downloadCashBackReportHref">下載</a></p></li>
           </ul>          
        </div>
        <div>
        <table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableCashBackReport">
           <thead>
          	<tr>			
					<th>類別</th>
					<th>日期</th>
					<th>每手優惠金額</th>
					<th>優惠手數</th>
					<th>已用優惠手數/金額</th>
					<th>可用優惠手數</th>
					<th>可用優惠金額</th>
					<th>到期日</th>
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperCashBackReport"> </div>
       </div>
      </div>
      <!--回贈記錄 end-->
    </div>
    
  </div>
  
	  <!--報價序號 begin-->
	<div style="-webkit-user-select:none; -webkit-touch-callout:none;" onselectstart="return false;" oncontextmenu="return false;" oncopy="return false;" oncut="return false;" onpaste="return false" class="layer-box dn" id="priceSeq_dialog">
	  <div class="layer-con layer-con-weit3">
	        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist xuhao-tab-font">
	           <tr>
	             <td class="pingc-bgfon2" width="122">報價序號</td>
	             <td class="pingc-bgfon2 td-vcen" width="180">時間</th>
	             <td class="pingc-bgfon2 r-nonebor">賣出價/買入價</td>
	           <tr>
	       </table>
	       <div id="tick_history_scroll" class="xuhao-scroll">
		       <table id="table_tickhistory_list" border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist xuhao-tab-font">
		       </table>
	       </div>
	
	       <div class="baoj-xu-intr">
	         <h4>免責聲明</h4>
	         <ol>
	           <li>報價序號為本公司對每壹口報價之特定編號，客戶可按此序號查詢當時之報價。</li>
	           <li>每壹口報價的可成交量為：金100手/銀30手。</li>
	           <li>客戶訂單所對應的報價序號為訂單觸發後下壹個可執行的最佳價格，成交時間與報價時間可能存在差異，於市況劇烈波動時，系統處理時間可能延長。</li>
	         </ol>
	       </div>
	       <p class="more-lls-btn gez-btninfo del-wid"><a href="javascript:" id="priceSeq_dialog_cls_btn">關閉</a></p>
	  </div>
	</div>
  
</div>
<!--左側導航報表layer by 11.29 end-->
