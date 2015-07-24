<%@ page language="java" import="java.text.SimpleDateFormat,java.util.Date,java.util.Calendar;" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
String date=df.format(new Date());

Calendar curr = Calendar.getInstance();
curr.set(Calendar.MONTH,curr.get(Calendar.MONTH)-3);
String date3=df.format(curr.getTime());

%>
<iframe id="downloadiframe" style="visibility:hidden;display:none"></iframe>
<!--左侧导航报表layer by 11.27 begin-->
<div class="layer-box-report dn" id="leftBaobiao">
  <div class="layer-con">
    <div class="navbox-c">
      <div class="nav-qh clearfix">
        <ul class="tan-ul fl" id="baobiaoUlId">
      	   <li class="on-na">委托记录</li>
			<li>成交记录</li>
			<li>盈亏记录</li>
			<li>额度记录</li>
			<li>优惠记录</li>
        </ul>
      </div>
    </div>
    <div id="baobiaoListId">

      <!--委托记录 begin-->
      <div class="dn">
        <div class="baob-select" id="areaWeituo">
        	<input type="hidden" name="pageNoWeituo" id= "pageNoWeituo" value=1 />
           <ul class="clearfix">
             <li><input  type="checkbox" class="vcen" name="box" id="weituo_checkbox"  onclick="checkTable(this,'areaWeituo')"/>&nbsp;单号：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <li>类别：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>         
             <li>开始时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaWeituo_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaWeituo_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaWeituo_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaWeituo_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchWeituoHref">查询</a><a href="javascript:" id="downloadWeituoHref">下载</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableWeituo">
           <thead>
          <tr>
					<th>委托号</th>
					<th>类型</th> 
					<th>类别</th> 
					<th>产品</th> 
					<th>买/卖</th>  
					<th>手数</th>
					<th>限价</th>
					<th>停损</th>
					<th>状态</th>
					<th>期限</th>
					<th>委托时间</th> 
					<th>执行时间</th> 
					<th>订单号</th> 
					<th>平仓号</th> 
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperWeituo">
       </div></div>
      </div>
      <!--委托记录 end-->
      
      
      
      
      
      
      <!--成交记录 begin-->
      <div class="dn">
        <div class="baob-select" id="areaTradeReport">
        	<input type="hidden" name="pageNoTradeReport" id= "pageNoTradeReport" value=1 />
           <ul class="clearfix">
             <li><input  class="vcen" type="checkbox" name="box" id="tradeReport_checkbox"  onclick="checkTable(this,'areaTradeReport')"/>&nbsp;单号：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <li>类别：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>  
             <li>开始时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaTradeReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaTradeReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaTradeReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaTradeReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchTradeReportHref">查询</a><a href="javascript:" id="downloadTradeReportHref">下载</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableTradeReport">
           <thead>
          <tr>											
					<th>交易时间</th>
					<th>订单号</th>
					<th>类型</th>
					<th>类别</th>
					<th>产品</th>
					<th>买/卖</th>
					<th>手数</th>
					<th>成交价</th>
					<th>报价序号</th>
					<th>平仓号</th>
					<th>交易编码</th>
					<th>交易编码费</th>
					<th>备注</th>
					
					
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperTradeReport">
       </div></div>
      </div>
      <!--成交记录 end-->
      
      
      <!--盈亏记录 begin-->
      <div class="dn">
        <div class="baob-select" id="areaProfitReport">
        	<input type="hidden" name="pageNoProfitReport" id= "pageNoProfitReport" value=1 />
           <ul class="clearfix">
             <li><input class="vcen" type="checkbox" name="box" id="profitReport_checkbox"  onclick="checkTable(this,'areaProfitReport')"/>&nbsp;单号：<input disabled="disabled"  onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onblur="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"  type="text" class="input-text vcen" name="uid"/></li> 
             <li>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：
	             <select class="baob-slist vcen" name="productId" id="productId">
	             </select>
             </li> 
             
             <!-- <li>类别：<select class="baob-slist vcen" name="dealType" id="dealType"></select></li>     -->
             <li>开始时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaProfitReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaProfitReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaProfitReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaProfitReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchProfitReportHref">查询</a><a href="javascript:" id="downloadProfitReportHref">下载</a></p></li>
           </ul>          
        </div>
        <div><table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableProfitReport">
           <thead>
          <tr>																							
					<th>产品</th>
					<th>类型</th>
					<th>平仓号</th>
					<th>买/卖</th>
					<th>平仓手数</th>
					<th>平仓价格</th>
					<th>订单号</th>
					<th>开仓手数</th>
					<th>开仓价格</th>
					<th>利息</th>
					<th>盈亏</th>
					<th>回赠金额</th>
					<th>开仓时间</th>
					<th>平仓时间</th>
					<th>备注</th>
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperProfitReport">
       </div></div>
      </div>
      <!--盈亏记录 end-->
      
      
      
      <!--额度记录 begin-->
      <div class="dn">
        <div class="baob-select" id="areaBalanceReport">
        	<input type="hidden" name="pageNoBalanceReport" id= "pageNoBalanceReport" value=1 />
           <ul class="clearfix">
             <li>项&nbsp;&nbsp;目&nbsp;&nbsp;：<select class="baob-slist vcen" name="cusTranCode" id="cusTranCode"></select></li> 
             <li>开始时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaBalanceReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaBalanceReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaBalanceReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaBalanceReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchBalanceReportHref">查询</a><a href="javascript:" id="downloadBalanceReportHref">下载</a></p></li>
           </ul>          
        </div>
        <div>
        <table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableBalanceReport">
           <thead>
          	<tr>																												
					<th>时间</th>
					<th>项目</th>
					<th>交易前账户余额</th>
					<th>收入</th>
					<th>支出</th>
					<th>交易后账户余额</th>
					<th>流水号</th>
					<th>备注</th>	
					
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperBalanceReport">
       </div></div>
      </div>
      <!--额度记录 end-->
      
      
      
      
      <!--回赠记录 begin-->
      <div class="dn">
        <div class="baob-select" id="areaCashBackReport">
        	<input type="hidden" name="pageNoCashBackReport" id= "pageNoCashBackReport" value=1 />
           <ul class="clearfix">
           	 
             <li><select class="baob-slist vcen" name="rebateType" id="rebateType"></select></li> 
             <li>开始时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaCashBackReport_beiginTime" name="beiginTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'<%=date3%>', maxDate:'#F{$dp.$D(\'areaCashBackReport_endTime\')}',readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li> 
             <li>结束时间：<input type="text" value="<%=date%>" class="input-text vcen" id="areaCashBackReport_endTime" name="endTime" onclick="WdatePicker({lang:'zh-cn',startDate:'%y-%M-01',minDate:'#F{$dp.$D(\'areaCashBackReport_beiginTime\')}',maxDate:'%y-%M-%d', readOnly:true,dateFmt:'yyyy-MM-dd',alwaysUseStartDate:false,isShowClear:false })"/></li>
             <li style="padding:0px;"><p class="more-lls-btn chax-down"><a href="javascript:" id="searchCashBackReportHref">查询</a><a href="javascript:" id="downloadCashBackReportHref">下载</a></p></li>
           </ul>          
        </div>
        <div>
        <table border="0" cellspacing="0" cellpadding="0" class="liebiao-tabox baob-tablist" id="tableCashBackReport">
           <thead>
          	<tr>			
					<th>类别</th>
					<th>日期</th>
					<th>每手优惠金额</th>
					<th>优惠手数</th>
					<th>已用优惠手数/金额</th>
					<th>可用优惠手数</th>
					<th>可用优惠金额</th>
					<th>到期日</th>
				</tr>
          </thead>
          <tbody>
          </tbody>
       </table>
       <div class="page-box" id="paperCashBackReport"> </div>
       </div>
      </div>
      <!--回赠记录 end-->
    </div>
  </div>
  
  
	<!--报价序号 begin-->
	<div style="-webkit-user-select:none; -webkit-touch-callout:none;" onselectstart="return false;" oncontextmenu="return false;" oncopy="return false;" oncut="return false;" onpaste="return false" class="layer-box dn" id="priceSeq_dialog">
	  <div class="layer-con layer-con-weit3">
	        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist xuhao-tab-font">
	           <tr>
	             <td class="pingc-bgfon2" width="122">报价序号</td>
	             <td class="pingc-bgfon2 td-vcen" width="190">时间</th>
	             <td class="pingc-bgfon2 r-nonebor">卖出价 / 买入价</td>
	           <tr>
	       </table>
	       <div id="tick_history_scroll" class="xuhao-scroll">
		        <table id="table_tickhistory_list" border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist xuhao-tab-font">
		        </table>
	       </div>
	
	       <div class="baoj-xu-intr">
	         <h4>免责声明</h4>
	         <ol>
	           <li>报价序号为本公司对每一口报价之特定编号，客户可按此序号查询当时之报价。</li>
	           <li>每一口报价的可成交量为：金100手/银30手。</li>
	           <li>客户订单所对应的报价序号为订单触发后下一个可执行的最佳价格，成交时间与报价时间可能存在差异，于巿况剧烈波动时，系统处理时间可能延长。</li>
	         </ol>
	       </div>
	       <p class="more-lls-btn gez-btninfo del-wid"><a href="javascript:" id="priceSeq_dialog_cls_btn">关闭</a></p>
	  </div>
	</div>

</div>


<!--左侧导航报表layer by 11.29 end-->
