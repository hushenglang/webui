<%@ page language="java" import="java.text.SimpleDateFormat,java.util.Date,java.util.Calendar;" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//設置日期格式
String date=df.format(new Date());

Calendar curr = Calendar.getInstance();
curr.set(Calendar.MONTH,curr.get(Calendar.MONTH)-3);
String date3=df.format(curr.getTime());

%>
<!--report template begin-->
<div id="index_report_container" style="display:none;overflow-y:auto;">
  <iframe id="downloadiframe" style="visibility:hidden;display:none"></iframe>
  <div class="layer-con" id="report_container_sub"> 
    <div class="top-menubox clearfix">
      <ul class="clearfix" id="report_tab_container">
        <li class="on-na">委託記錄</li>
        <li>成交記錄</li>
        <li>盈虧記錄</li>
        <li>額度記錄</li>
        <li>優惠記錄</li>
      </ul>
    </div>
    <div id="report_content_container">
      <!--委託記錄 begin-->
      <div>
        <div class="baob-select" id="report_weituo_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoWeituo" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesWeituo" />
           
           <ul class="clearfix">
             <li>訂單號：<input type="text" class="input-text vcen" name="uid" oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>產&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
                <select class="baob-slist vcen" name="productId" id="productId">
                <option value="">所有產品 </option>
				<option value="0">倫敦金</option>
				<option value="1">倫敦銀</option>
				</select>
			 </li> 
             <li>類&nbsp;&nbsp;&nbsp;別：
              <select class="baob-slist vcen" name="dealType" id="dealType">
                <option value="">所有 </option>
				<option value="1">開倉</option>
				<option value="0">平倉</option>
              </select>
              </li> 
             <li>開始時間：<input type="text" class="input-text vcen" value="<%=date%>" id="areaWeituo_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaWeituo_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">結束時間：<input type="text" class="input-text vcen" value="<%=date%>" id="areaWeituo_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaWeituo_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_weituo_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下載" id="report_btn_weituo_download"/></a> --></p></li>
           </ul>    
           </form>      
        </div>
        <div class="shuj-biaog-box">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_weituo_table">
              <thead>
                <tr>
                  <th>委託號</th>
                  <th>產品</th>
                  <th>類別</th>
                  <th>買/賣</th>
                  
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
             <div style="display:none;" id="report_weituo_title">
	            <span>委託號</span>
	            <span>産品</span> 
	            <span>類別</span> 
				<span>買/賣</span> 
				<span>類型</span> 
				<span>手數</span>
				<span>限價</span>
				<span>止蝕</span>
				<span>狀態</span>
				<span>期限</span>
				<span>委託時間</span> 
				<span>執行時間</span> 
				<span>訂單號</span> 
				<span>平倉號</span> 
             </div>
              <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一頁</a><a href="javascript:Report.gotoPage('next')">下一頁</a></p>
          </div>
        </div>
      </div>
      <!--委託記錄 end-->
      <!--成交記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="report_trade_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoTrade" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesTrade" />
           <ul class="clearfix">
             <li>訂單號：<input type="text" class="input-text vcen" name="uid" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>產&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
              <select class="baob-slist vcen" name="productId">
                <option value="">所有產品 </option>
				<option value="0">倫敦金</option>
				<option value="1">倫敦銀</option>
			  </select>
			 </li> 
             <li>類&nbsp;&nbsp;&nbsp;別：
                <select class="baob-slist vcen" name="dealType">
                  <option value="">所有 </option>
				  <option value="1">開倉</option>
				  <option value="0">平倉</option>
                </select>
             </li> 
             <li>開始時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaTradeReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaTradeReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">結束時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaTradeReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaTradeReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_trade_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下載" id="report_btn_trade_download"/></a> --></p></li>
           </ul> 
           </form>         
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font"  style="width:100%" id="report_trade_table">
              <thead>
                <tr>
                  <th>交易時間</th>
                  <th>訂單號</th>
                  <th>類別</th>
                  <th>產品</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
           <div style="display:none;" id="report_trade_title">
	        <span>交易時間</span>
			<span>訂單號</span>
			<span>類別</span>
			<span>產品</span>
			<span>類別</span>
			<span>買/賣</span>
			<span>手數</span>
			<span>成交價</span>
			<span>平倉號</span>
			<span>交易編碼</span>
			<span>交易編碼費</span>
			<span>備註</span>
           </div>
           <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一頁</a><a href="javascript:Report.gotoPage('next')">下一頁</a></p>
          </div>
        </div>
      </div>
      <!--成交記錄 end-->
      <!--盈虧記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="report_profit_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoProfit" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesProfit" />
           <ul class="clearfix">
             <li>訂單號：<input type="text" class="input-text vcen" name="uid" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>產&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
              <select class="baob-slist vcen" name="productId">
                <option value="">所有產品 </option>
				<option value="0">倫敦金</option>
				<option value="1">倫敦銀</option>
			  </select>
			 </li> 
             <!-- <li>類&nbsp;&nbsp;&nbsp;別：
                <select class="baob-slist vcen" name="dealType">
                  <option value="">所有 </option>
				  <option value="1">開倉</option>
				  <option value="0">平倉</option>
                </select>
             </li>  -->
             <li>開始時間：<input class="input-text vcen" type="text" value="<%=date%>" id="profitReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'profitReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">結束時間：<input class="input-text vcen" type="text" value="<%=date%>" id="profitReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'profitReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_profit_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下載" id="report_btn_profit_download"/></a> --></p></li>
           </ul>  
           </form>        
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con" style="padding: 12px 12px 12px 0px;">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_profit_table">
              <thead>
                <tr>
                  <th>產品</th>
                  <th>平倉價格</th>
                  <th>凈盈虧</th>
                  <th>平倉時間</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一頁</a><a href="javascript:Report.gotoPage('next')">下一頁</a></p>
             <div style="display:none;" id="report_profit_title">
	                <span>產品</span>
	                <span>平倉價格</span>
	                <span>凈盈虧</span>
	                <span>平倉時間</span>
					<span>類別</span>
					<span>平倉號</span>
					<span>買/賣</span>
					<span>平倉手數</span>
					<span>訂單號</span>
					<span>開倉手數</span>
					<span>開倉價格</span>
					<span>利息</span>
					<span>回贈金額</span>
					<span>開倉時間</span>
					<span>備註</span>
            </div>           
          </div>
          <div class="shuj-biaog-con m10" style="padding: 12px 12px 12px 0px;">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font"  style="width:100%" id="report_profit_count_table">
              <thead>
                <tr>
                  <th></th>
                  <th>平倉手數</th>
                  <th>開倉手數</th>
                  <th>利息</th>
                  <th>凈盈虧</th>
                  <!-- <th>回贈金價</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td>小計:</td>
                  <td id="report_profit_subtotal_01">--</td>
                  <td id="report_profit_subtotal_02">--</td>
                  <td id="report_profit_subtotal_03">--</td>
                  <td id="report_profit_subtotal_04">--</td>
                  <!-- <td id="report_profit_subtotal_05">--</td> -->
                </tr> 
                <tr>
                  <td>總計:</td>
                  <td id="report_profit_total_01">--</td>
                  <td id="report_profit_total_02">--</td>
                  <td id="report_profit_total_03">--</td>
                  <td id="report_profit_total_04">--</td>
                 <!--  <td id="report_profit_total_05">--</td> -->
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--盈虧記錄 end-->
      <!--額度記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="report_balance_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoBalance" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesBalance" />
           <ul class="clearfix">
             <li>項&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目：
              <select class="baob-slist vcen" id="cusTranCode" name="cusTranCode">
              <option value="">所有 </option>
              <option value="MDEPOSIT">存款</option>
              <option value="WITHDRAW">取款</option>
              <option value="PC">盈虧</option>
              <option value="FEE">手續費</option>
              <option value="BET_YJ">傭金</option>
              <option value="SYSCLEARZERO">繫統清零</option>
              <option value="CASH_BACK">回贈金額</option>
              <option value="COUPON_IN">代幣優惠</option>
              <option value="COUPON_OUT">代幣到期</option>
              <option value="AC_DRAW">自動取消取款</option>
              <option value="FEE_SYSADJUST">特殊金額調整</option>
              <option value="PRESENT">優惠</option>
              <option value="TRANS_IN_OUT">轉賬</option>
              <option value="CGSE_FEE">交易編碼費</option>
              <option value="MISPAID_PAYMENT">交易編碼費補繳</option>
              <option value="PC_CB">返傭</option>
              <option value="BFN">贈金</option>
              <option value="PT">保障優惠</option>
              </select>
             </li> 
             <li>開始時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaBalanceReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaBalanceReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">結束時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaBalanceReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaBalanceReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_balance_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下載" id="report_btn_balance_download"/></a> --></p></li>
           </ul>    
           </form>      
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_balance_table">
              <thead>
                <tr>
                  <th>時間</th>
                  <th>項目</th>
                  <th>交易前賬戶余額</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一頁</a><a href="javascript:Report.gotoPage('next')">下一頁</a></p>
            <div style="display:none;" id="report_balance_title">
	            <span>時間</span>
				<span>項目</span>
				<span>交易前賬戶餘額</span>
				<span>收入</span>
				<span>支出</span>
				<span>交易後賬戶餘額</span>
				<span>流水號</span>
				<span>備註</span>
            </div>          
          </div>
          <div class="shuj-biaog-con m10">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_balance_count_table">
              <thead>
                <tr>
                  <th></th>
                  <th>收入</th>
                  <th>支出</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>小計</td>
                  <td id="report_balance_subtotal_01">--</td>
                  <td id="report_balance_subtotal_02">--</td>
                </tr> 
                <tr>
                  <td>總計</td>
                  <td id="report_balance_total_01">--</td>
                  <td id="report_balance_total_02">--</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--額度記錄 end-->
      <!--優惠記錄 begin-->
      <div class="dn">
        <div class="baob-select" id="report_cashback_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoCashBack" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesCashBack" />
           <ul class="clearfix">
             <li><select id="rebateType" name="rebateType" class="baob-slist vcen"><option value="">所有 </option><option value="1">回贈 </option><option value="2">代幣</option></select></li> 
             <li>開始時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaCashBackReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaCashBackReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">結束時間：<input class="input-text vcen" type="text" value="<%=date%>" id="areaCashBackReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaCashBackReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_cashback_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下載" id="report_btn_cashback_download"/></a> --></p></li>
           </ul>  
           </form>        
        </div>
        <div class="shuj-biaog-box">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_cashback_table">
              <thead>
                <tr>
                  <th>類別</th>
                  <th>可用優惠手數</th>
                  <th>可用優惠金額</th>
                  <!-- <th>到期日</th> -->
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
             <div style="display:none;" id="report_cashback_title">
	            <span>類別</span>
	            <span>可用優惠手數</span>
				<span>可用優惠金額</span>
				<span>日期</span>
				<span>每手優惠金額</span>
				<span>優惠手數</span>
				<span>已用優惠手數/金額</span>
				<span>到期日</span>
            </div> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一頁</a><a href="javascript:Report.gotoPage('next')">下一頁</a></p>         
          </div>
          <div class="shuj-biaog-con m10">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_cashback_count_table">
              <thead>
                <tr>
                  <th>總可用優惠金額:</th>
                  <th id="report_cashback_total_01">--</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <!--優惠記錄 end-->
    </div>
  </div>
    <!--報表詳情頁模版 begin -->
	<div class="layer-con dn" id="report_detail_div">
	  <div class="layer-con layer-con-weit">
	    <div><h3 class="top-menubox"><span id="report_detail_title"></span><a href="javascript:" class="back-pre-page" id="btn_report_detail_back">返回</a></h3></div>
	    <div class="lay-kuang-fon">
	      <div class="lay-kuang-con">
	        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist baobiao-tabfont" id="report_detail_table">
	         <tbody>
	         </tbody>
	        </table>
	      </div>
	    </div>
	  </div>
	</div>
	<!--報表詳情頁模版 end-->
	
	<!--tick history begin -->
	<div style="-webkit-user-select:none; -webkit-touch-callout:none;" onselectstart="return false;" oncontextmenu="return false;" oncopy="return false;" oncut="return false;" onpaste="return false" class="layer-con dn" id="tickhistory_detail_div">
	  <div class="layer-con layer-con-weit">
	    <div><h3 class="top-menubox"><span id="tickhistory_detail_title"></span><a href="javascript:" class="back-pre-page" id="btn_tickhistory_detail_back">返回</a></h3></div>
	    <div class="lay-kuang-fon">
	      <div class="lay-kuang-con">
	        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist baobiao-tabfont" id="tickhistory_detail_table">
	         <thead>
	         	 <tr>
		            <th>報價序號</td>
		            <th>時間</th>
		            <th>賣出價 / 買入價</td>
	           <tr>
	         </thead>
	         <tbody>
	         </tbody>
	        </table>
	        
	        <div class="baoj-xu-intr">
	         <br>
	         <h4>免責聲明</h4>
	         <ol>
	           <li>1. 報價序號為本公司對每壹口報價之特定編號，客戶可按此序號查詢當時之報價。</li>
	           <li>2. 每壹口報價的可成交量為：金100手/銀30手。</li>
	           <li>3. 客戶訂單所對應的報價序號為訂單觸發後下壹個可執行的最佳價格，成交時間與報價時間可能存在差異，於市況劇烈波動時，系統處理時間可能延長。</li>
	         </ol>
	       </div>
	      </div>
	    </div>
	  </div>
	</div>
	<!--tick history end-->

</div>
<!--report template end-->
