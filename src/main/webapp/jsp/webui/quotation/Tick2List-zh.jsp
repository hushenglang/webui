<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<div class="list_quote_box dn" id="Tick2List">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="lq_table">
	     <tr id="tr_llg">
	       <td class="lq_left"><span class="lq_name">伦敦金<br/><span id="list_022_localTime">---</span></span></td>
	       <td style="width:27px">
	       	<a href="javascript://" class="qt_icon2" title="价格明细" id="btn_tick_list_gold_tickPriceList">价格明细</a><br/>
	       	<a href="javascript://" class="qt_icon1" title="产品属性" id="btn_tick_list_gold_productAttribute">产品属性</a>
	      	</td>
	       <td class="lp_price_up" onclick="QuotationGTS.callModifyFun('022', 1);" style="cursor:pointer"><span id="list_022_bid" >---</span><br/>卖出</td>
	       <td class="lp_price_up" onclick="QuotationGTS.callModifyFun('022', 0);" style="cursor:pointer"><span id="list_022_ask" >---</span><br/>买入</td>
	       <td><span class="greencol" id="list_022_price">---</span><br/>现价</td>
	       <td><span class="redcol" id="list_022_high">---</span><br/>最高</td>
	       <td><span class="greencol" id="list_022_low">---</span><br/>最低</td>
	       <td><span id="list_022_open">---</span><br/>开盘</td>
	       <td><span id="list_022_lastclose">---</span><br/>昨收</td>
	       <td><span id="list_022_sellinterest">---</span><br/>卖利率</td>
	       <td><span id="list_022_buyinterest">---</span><br/>买利率</td>
	       <td><span id="list_022_change">---</span><br/>升跌</td>
	       <td><span id="list_022_changePercent">---</span>%<br/>升趺幅度</td>
	     </tr>
	     
	     <tr id="tr_lls">
	       <td class="lq_left"><span class="lq_name">伦敦银<br/><span id="list_023_localTime">---</span></span></td>
	       <td style="width:27px">
	       	<a href="javascript://" class="qt_icon2" title="价格明细" id="btn_tick_list_silver_tickPriceList">价格明细</a><br/>
	       	<a href="javascript://" class="qt_icon1" title="产品属性" id="btn_tick_list_silver_productAttribute">产品属性</a>
	       </td>
	       <td class="lp_price_ub" onclick="QuotationGTS.callModifyFun('023', 1);" style="cursor:pointer"><span id="list_023_bid" >---</span><br/>卖出</td>
	       <td class="lp_price_ub" onclick="QuotationGTS.callModifyFun('023', 0);" style="cursor:pointer"><span id="list_023_ask" >---</span><br/>买入</td>
	        <td><span class="greencol" id="list_023_price">---</span><br/>现价</td>
	        <td><span class="redcol" id="list_023_high">---</span><br/>最高</td>
	        <td><span class="greencol" id="list_023_low">---</span><br/>最低</td>
	        <td><span id="list_023_open">---</span><br/>开盘</td>
	        <td><span id="list_023_lastclose">---</span><br/>昨收</td>
	        <td><span id="list_023_sellinterest">---</span><br/>卖利率</td>
	        <td><span id="list_023_buyinterest">---</span><br/>买利率</td>
	        <td><span id="list_023_change">---</span><br/>升跌</td>
	        <td><span id="list_023_changePercent">---</span>%<br/>升趺幅度</td>
	      </tr>
	      
	      <tr id="tr_usdinx" class="stop_business">
	       <td class="lq_left"><span class="lq_name">美元指数<br/><span id="list_050_localTime">---</span></span></td>
	       <td style="width:27px">
	       </td>
	       <td class="lp_price_ub" onclick="javascript:Alert('参考行情，不提供交易服务')" style="cursor:pointer"><span id="list_050_bid" >---</span><br/>卖出</td>
	       <td class="lp_price_ub" onclick="javascript:Alert('参考行情，不提供交易服务')" style="cursor:pointer"><span id="list_050_ask" >---</span><br/>买入</td>
	        <td><span class="greencol" id="list_050_price">---</span><br/>现价</td>
	        <td><span class="redcol" id="list_050_high">---</span><br/>最高</td>
	        <td><span class="greencol" id="list_050_low">---</span><br/>最低</td>
	        <td><span id="list_050_open">---</span><br/>开盘</td>
	        <td><span id="list_050_lastclose">---</span><br/>昨收</td>
	        <td><span id="list_050_sellinterest">---</span><br/>卖利率</td>
	        <td><span id="list_050_buyinterest">---</span><br/>买利率</td>
	        <td><span id="list_050_change">---</span><br/>升跌</td>
	        <td><span id="list_050_changePercent">---</span>%<br/>升趺幅度</td>
	      </tr>
	      
	      <tr id="tr_oil" class="stop_business">
	       <td class="lq_left"><span class="lq_name">纽约期油<br/><span id="list_00E_localTime">---</span></span></td>
	       <td style="width:27px">
	       </td>
	       <td class="lp_price_ub" onclick="javascript:Alert('参考行情，不提供交易服务')" style="cursor:pointer"><span id="list_00E_bid" >---</span><br/>卖出</td>
	       <td class="lp_price_ub" onclick="javascript:Alert('参考行情，不提供交易服务')" style="cursor:pointer"><span id="list_00E_ask" >---</span><br/>买入</td>
	        <td><span class="greencol" id="list_00E_price">---</span><br/>现价</td>
	        <td><span class="redcol" id="list_00E_high">---</span><br/>最高</td>
	        <td><span class="greencol" id="list_00E_low">---</span><br/>最低</td>
	        <td><span id="list_00E_open">---</span><br/>开盘</td>
	        <td><span id="list_00E_lastclose">---</span><br/>昨收</td>
	        <td><span id="list_00E_sellinterest">---</span><br/>卖利率</td>
	        <td><span id="list_00E_buyinterest">---</span><br/>买利率</td>
	        <td><span id="list_00E_change">---</span><br/>升跌</td>
	        <td><span id="list_00E_changePercent">---</span>%<br/>升趺幅度</td>
	      </tr>
	      
    </table>
</div>

<!--列表报价 end-->