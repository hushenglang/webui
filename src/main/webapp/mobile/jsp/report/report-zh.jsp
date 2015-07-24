<%@ page language="java" import="java.text.SimpleDateFormat,java.util.Date,java.util.Calendar;" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
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
        <li class="on-na">委托记录</li>
        <li>成交记录</li>
        <li>盈亏记录</li>
        <li>额度记录</li>
        <li>优惠记录</li>
      </ul>
    </div>
    <div id="report_content_container">
      <!--委托记录 begin-->
      <div>
        <div class="baob-select" id="report_weituo_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoWeituo" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesWeituo" />
           
           <ul class="clearfix">
             <li>订单号：<input type="text" class="input-text vcen" name="uid" oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
                <select class="baob-slist vcen" name="productId" id="productId">
                <option value="">所有产品 </option>
				<option value="0">伦敦金</option>
				<option value="1">伦敦银</option>
				</select>
			 </li> 
             <li>类&nbsp;&nbsp;&nbsp;别：
              <select class="baob-slist vcen" name="dealType" id="dealType">
                <option value="">所有 </option>
				<option value="1">开仓</option>
				<option value="0">平仓</option>
              </select>
              </li> 
             <li>开始时间：<input type="text" class="input-text vcen" value="<%=date%>" id="areaWeituo_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaWeituo_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">结束时间：<input type="text" class="input-text vcen" value="<%=date%>" id="areaWeituo_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaWeituo_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_weituo_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下载" id="report_btn_weituo_download"/></a> --></p></li>
           </ul>    
           </form>      
        </div>
        <div class="shuj-biaog-box">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_weituo_table">
              <thead>
                <tr>
                  <th>委托号</th>
                  <th>产品</th>
                  <th>类别</th>
                  <th>买/卖</th>
                  
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
             <div style="display:none;" id="report_weituo_title">
	            <span>委托号</span>
	            <span>产品</span> 
	            <span>类别</span> 
				<span>买/卖</span> 
				<span>类别</span> 
				<span>手数</span>
				<span>限价</span>
				<span>停损</span>
				<span>状态</span>
				<span>期限</span>
				<span>委托时间</span> 
				<span>执行时间</span> 
				<span>订单号</span> 
				<span>平仓号</span> 
             </div>
              <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一页</a><a href="javascript:Report.gotoPage('next')">下一页</a></p>
          </div>
        </div>
      </div>
      <!--委托记录 end-->
      <!--成交记录 begin-->
      <div class="dn">
        <div class="baob-select" id="report_trade_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoTrade" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesTrade" />
           <ul class="clearfix">
             <li>订单号：<input type="text" class="input-text vcen" name="uid" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
              <select class="baob-slist vcen" name="productId">
                <option value="">所有产品 </option>
				<option value="0">伦敦金</option>
				<option value="1">伦敦银</option>
			  </select>
			 </li> 
             <li>类&nbsp;&nbsp;&nbsp;别：
                <select class="baob-slist vcen" name="dealType">
                  <option value="">所有 </option>
				  <option value="1">开仓</option>
				  <option value="0">平仓</option>
                </select>
             </li> 
             <li>开始时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaTradeReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaTradeReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">结束时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaTradeReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaTradeReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_trade_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下载" id="report_btn_trade_download"/></a> --></p></li>
           </ul> 
           </form>         
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font"  style="width:100%" id="report_trade_table">
              <thead>
                <tr>
                  <th>交易时间</th>
                  <th>订单号</th>
                  <th>类别</th>
                  <th>产品</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
           <div style="display:none;" id="report_trade_title">
	        <span>交易时间</span>
			<span>订单号</span>
			<span>类别</span>
			<span>产品</span>
			<span>类别</span>
			<span>买/卖</span>
			<span>手数</span>
			<span>成交价</span>
			<span>报价序号</span>
			<span>平仓号</span>
			<span>交易编码</span>
			<span>交易编码费</span>
			<span>备注</span>
           </div>
           <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一页</a><a href="javascript:Report.gotoPage('next')">下一页</a></p>
          </div>
        </div>
      </div>
      <!--成交记录 end-->
      <!--盈亏记录 begin-->
      <div class="dn">
        <div class="baob-select" id="report_profit_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoProfit" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesProfit" />
           <ul class="clearfix">
             <li>订单号：<input type="text" class="input-text vcen" name="uid" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" /></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
              <select class="baob-slist vcen" name="productId">
                <option value="">所有产品 </option>
				<option value="0">伦敦金</option>
				<option value="1">伦敦银</option>
			  </select>
			 </li> 
             <!-- <li>类&nbsp;&nbsp;&nbsp;别：
                <select class="baob-slist vcen" name="dealType">
                  <option value="">所有 </option>
				  <option value="1">开仓</option>
				  <option value="0">平仓</option>
                </select>
             </li> --> 
             <li>开始时间：<input class="input-text vcen" type="text" value="<%=date%>" id="profitReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'profitReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input class="input-text vcen" type="text" value="<%=date%>" id="profitReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'profitReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_profit_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下载" id="report_btn_profit_download"/></a> --></p></li>
           </ul>  
           </form>        
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con" style="padding: 12px 12px 12px 0px;">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_profit_table">
              <thead>
                <tr>
                  <th>产品</th>
                  <th>平仓价格</th>
                  <th>净盈亏</th>
                  <th>平仓时间</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一页</a><a href="javascript:Report.gotoPage('next')">下一页</a></p>
             <div style="display:none;" id="report_profit_title">
	                <span>产品</span>
	                <span>平仓价格</span>
	                <span>净盈亏</span>
	                <span>平仓时间</span>
					<span>类别</span>
					<span>平仓号</span>
					<span>买/卖</span>
					<span>平仓手数</span>
					<span>订单号</span>
					<span>开仓手数</span>
					<span>开仓价格</span>
					<span>利息</span>
					<span>回赠金额</span>
					<span>开仓时间</span>
					<span>备注</span>
            </div>           
          </div>
          <div class="shuj-biaog-con m10" style="padding: 12px 12px 12px 0px;">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font"  style="width:100%" id="report_profit_count_table">
              <thead>
                <tr>
                  <th></th>
                  <th>平仓手数</th>
                  <th>开仓手数</th>
                  <th>利息</th>
                  <th>净盈亏</th>
                  <!-- <th style="text-align:left;">回赠金价</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>小计:</td>
                  <td id="report_profit_subtotal_01">--</td>
                  <td id="report_profit_subtotal_02">--</td>
                  <td id="report_profit_subtotal_03">--</td>
                  <td id="report_profit_subtotal_04">--</td>
                  <!-- <td id="report_profit_subtotal_05">--</td> -->
                </tr> 
                <tr>
                  <td>总计:</td>
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
      <!--盈亏记录 end-->
      <!--额度记录 begin-->
      <div class="dn">
        <div class="baob-select" id="report_balance_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoBalance" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesBalance" />
           <ul class="clearfix">
             <li>项&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目：
              <select class="baob-slist vcen" id="cusTranCode" name="cusTranCode">
              <option value="">所有 </option>
              <option value="MDEPOSIT">存款</option>
              <option value="WITHDRAW">取款</option>
              <option value="PC">盈亏</option>
              <option value="FEE">手续费</option>
              <option value="BET_YJ">佣金</option>
              <option value="SYSCLEARZERO">系统清零</option>
              <option value="CASH_BACK">回赠金额</option>
              <option value="COUPON_IN">代币优惠</option>
              <option value="COUPON_OUT">代币到期</option>
              <option value="AC_DRAW">自动取消取款</option>
              <option value="FEE_SYSADJUST">特殊金额调整</option>
              <option value="PRESENT">优惠</option>
              <option value="TRANS_IN_OUT">转账</option>
              <option value="CGSE_FEE">交易编码费</option>
              <option value="MISPAID_PAYMENT">交易编码费补缴</option>
              <option value="PC_CB">返佣</option>
              <option value="BFN">赠金</option>
              <option value="PT">保障优惠</option>
              </select>
             </li> 
             <li>开始时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaBalanceReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaBalanceReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">结束时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaBalanceReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaBalanceReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_balance_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下载" id="report_btn_balance_download"/></a> --></p></li>
           </ul>    
           </form>      
        </div>
        <div class="shuj-biaog-box" style="padding: 2px;">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_balance_table">
              <thead>
                <tr>
                  <th>时间</th>
                  <th>项目</th>
                  <th>交易前账户余额</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一页</a><a href="javascript:Report.gotoPage('next')">下一页</a></p>
            <div style="display:none;" id="report_balance_title">
	            <span>时间</span>
				<span>项目</span>
				<span>交易前账户余额</span>
				<span>收入</span>
				<span>支出</span>
				<span>交易後账户余额</span>
				<span>流水号</span>
				<span>备注</span>
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
                  <td>小计</td>
                  <td id="report_balance_subtotal_01">--</td>
                  <td id="report_balance_subtotal_02">--</td>
                </tr> 
                <tr>
                  <td>总计</td>
                  <td id="report_balance_total_01">--</td>
                  <td id="report_balance_total_02">--</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--额度记录 end-->
      <!--优惠记录 begin-->
      <div class="dn">
        <div class="baob-select" id="report_cashback_where">
           <form>
           <input type="hidden" name="pangeNo" id="pageNoCashBack" value="1" />
           <input type="hidden" name="totalPages" id="totalPagesCashBack" />
           <ul class="clearfix">
             <li><select id="rebateType" name="rebateType" class="baob-slist vcen"><option value="">所有 </option><option value="1">回赠 </option><option value="2">代币</option></select></li> 
             <li>开始时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaCashBackReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaCashBackReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li class="mid-padd">结束时间：<input class="input-text vcen" type="text" value="<%=date%>" id="areaCashBackReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-tw',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaCashBackReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li><p class="ch-cha-inpb"><a href="javascript://" class="ch-sou-btn vcen" title="搜索" id="report_btn_cashback_search"/></a><!-- <a href="javascript://" class="ch-down-btn vcen" title="下载" id="report_btn_cashback_download"/></a> --></p></li>
           </ul>  
           </form>        
        </div>
        <div class="shuj-biaog-box">
          <div class="shuj-biaog-con">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_cashback_table">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>可用优惠手数</th>
                  <th>可用优惠金额</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
             <div style="display:none;" id="report_cashback_title">
	            <span>类别</span>
	            <span>可用优惠手数</span>
				<span>可用优惠金额</span>
				<span>日期</span>
				<span>每手优惠金额</span>
				<span>优惠手数</span>
				<span>已用优惠手数/金额</span>
				<span>到期日</span>
            </div> 
            <p class="page-list-box"><a href="javascript:Report.gotoPage('pre')">上一页</a><a href="javascript:Report.gotoPage('next')">下一页</a></p>         
          </div>
          <div class="shuj-biaog-con m10">
            <table cellpadding="0" cellspacing="0" class="liebiao-tabox baob-tab-font" style="width:100%" id="report_cashback_count_table">
              <thead>
                <tr>
                  <th>总可用优惠金额:</th>
                  <th id="report_cashback_total_01">--</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <!--优惠记录 end-->
    </div>
  </div>
	
	<!--报表详情页模版 begin -->
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
	<!--报表详情页模版 end-->
	
	<!--tick history begin -->
	<div style="-webkit-user-select:none; -webkit-touch-callout:none;" onselectstart="return false;" oncontextmenu="return false;" oncopy="return false;" oncut="return false;" onpaste="return false" class="layer-con dn" id="tickhistory_detail_div">
	  <div class="layer-con layer-con-weit">
	    <div>
	    	<h3 class="top-menubox">
	    		<span id="tickhistory_detail_title"></span>
	    			<a href="javascript:" class="back-pre-page" id="btn_tickhistory_detail_back">返回</a>
	    	</h3>
	    </div>
	    <div class="lay-kuang-fon">
	      <div class="lay-kuang-con">
	        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist baobiao-tabfont" id="tickhistory_detail_table">
	         <thead>
	         	 <tr>
		             <th>报价序号</td>
		             <th>时间</th>
		             <th>卖出价 / 买入价</td>
	           <tr>
	         </thead>
	         <tbody>
	         </tbody>
	        </table>
	        
	         <div class="baoj-xu-intr">
	         <br>
	         <h4>免责声明</h4>
	         <ol>
	           <li>1. 报价序号为本公司对每一口报价之特定编号，客户可按此序号查询当时之报价。</li>
	           <li>2. 每一口报价的可成交量为：金100手/银30手。</li>
	           <li>3. 客户订单所对应的报价序号为订单触发后下一个可执行的最佳价格，成交时间与报价时间可能存在差异，于巿况剧烈波动时，系统处理时间可能延长。</li>
	         </ol>
	       </div>
	      </div>
	    </div>
	  </div>
	</div>
	<!--tick history end-->
	
</div>
<!--report template end-->
