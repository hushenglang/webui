<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div id="modify_marketAndPendingOrderDiv" style="display: none">
<!--委托修改 begin-->
<div>
  <div class="layer-con layer-con-weit">
    <h3 class="top-menubox" id="modify-trade-prd-name"></h3>
    <div class="lay-kuang-fon">
      <div class="lay-kuang-con">
        <div class="navbox-c navbox-blin">
          <div class="nav-qh clearfix">
            <ul class="tan-ul fl" id="modify_market-PendingOrder-fl">
              <li class="on-na" id="modify_pendingOrderLi">委托修改</li>
            </ul>
          </div>
        </div>
        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="modify_pendingOrderTable">
         <tbody>
           <tr>
            <th class="t-bnone">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</th>
            <td class="t-bnone r-nonebor"><span id="modify_orderBusiType">---</span></td>
           </tr>
			<tr name="unadvance" id="modify_pendingOrder_limitPrice"
				class="tr-bg">
				<th valign="top"><span id="modify_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_limitPrice" name="modify_limitPrice">
              </div>
              <input type="hidden" id="modify_limit_max"
					name="modify_limit_max" />
				<!-- 买入限价最大值 --> <input type="hidden" id="modify_limit_min"
					name="modify_limit_min" /> 
              <p class="gez-ts-info" id="modify_limitOperate"></p>
            </td>	
			</tr>
			
			<tr name="unadvance" id="modify_pendingOrder_stopPrice"
				class="tr-bg">
				<th valign="top"><span
					id="modify_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_stopPrice" name="modify_stopPrice">
              </div>
              <input type="hidden" id="modify_stop_max" name="modify_stop_max" /> <!-- 买入停损最小值 -->
			  <input type="hidden" id="modify_stop_min" name="modify_stop_min" /><!-- 卖出停损最大值 -->
              <p class="gez-ts-info" id="modify_stopOperate"></p>
            </td>	
			</tr>
           <tr name="unadvance">
            <th>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</th>
            <td class="r-nonebor"><span id="modify_orderVolumeSpan"> --- </span></td>
           </tr>
           
            <tr name="unadvance">
            <th>保&nbsp;&nbsp;证&nbsp;&nbsp;金：</th>
            <td class="r-nonebor"><span id="modify_pendingMargin"></span>USD</td>
           </tr>
           
           <tr class="tr-bg" name="unadvance">
            <th>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</th>
            <td class="r-nonebor"><span class="t-sppad" id="modify_defaultExpir"> ---</span></td>
           </tr>
           <!-- 一般委托单end -->
           
           
           <!-- 进阶委托单 -->
            <tr name="advance">
            <th class="t-bnone"><span class="text-space"> 开</span>仓：</th>
            <td class="t-bnone r-nonebor"><span id="modify_advance_open_orderBusiType"></span></td>
            </tr>
            
			<tr name="advance" id="modify_advance_open_pendingOrder_limitPrice"
				class="tr-bg">
				<th valign="top"><span  id="modify_advance_open_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_advance_open_limitPrice" name="modify_advance_open_limitPrice">
              </div>
              <input type="hidden" id="modify_advance_open_Limit_max" name="modify_advance_open_Limit_max" /> <!-- 买入限价最大值 --> 
			  <input type="hidden" id="modify_advance_open_Stop_min" name="modify_advance_open_Stop_min" /> <!-- 卖出限价最小值 -->
              <p class="gez-ts-info" id="modify_advance_open_limitOperate"></p>
            </td>	
			</tr>
			
			<tr name="advance" id="modify_advance_open_pendingOrder_stopPrice"
				class="tr-bg">
				<th valign="top"><span id="modify_advance_open_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_advance_open_stopPrice" name="modify_advance_open_stopPrice">
              </div>
              <input type="hidden" id="modify_advance_open_Stop_max" name="modify_advance_open_Stop_max" /> <!-- 买入停损最小值 -->
			  <input type="hidden" id="modify_advance_open_Stop_min" name="modify_advance_open_Stop_min" /><!-- 卖出停损最大值 -->
              <p class="gez-ts-info" id="modify_advance_open_stopOperate"></p>
            </td>	
			</tr>
			

			<tr name="advance" class="tr-bg">
				<th><span class="text-space">手</span>数：</th>
				<!-- 手数 -->
				<td>
				<!-- 手数 -->
			    <span id="modify_advance_orderVolumeSpan"> --- </span>
				</td>
			</tr>
			<!-- 保证金   -->
			<tr name="advance">
				<th>保&nbsp;证&nbsp;金：</th>
				<td><span id="modify_advance_pendingMargin"></span></td>
			</tr>
			
            <tr name="advance">
            <th class="t-bnone"><span class="text-space"> 平</span>仓：</th>
            <td class="t-bnone r-nonebor"><span id="modify_advance_close_orderBusiType"></span></td>
            </tr>
			<tr name="advance" id="modify_advance_close_pendingOrder_limitPrice"
				class="tr-bg">
				<th valign="top"><span id="modify_advance_close_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_advance_close_limitPrice" name="modify_advance_close_limitPrice">
              </div>
              <input type="hidden" id="modify_advance_close_Limit_max" name="modify_advance_close_Limit_max" /> <!-- 买入限价最大值 --> 
			  <input type="hidden" id="modify_advance_close_Limit_min" name="modify_advance_close_Limit_min" /> <!-- 卖出限价最小值 -->
              <p class="gez-ts-info" id="modify_advance_close_limitOperate"></p>
            </td>	
			</tr>
			<tr name="advance" id="modify_advance_close_pendingOrder_stopPrice"
				class="tr-bg">
				<th valign="top"><span id="modify_advance_close_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 限价-->
			  <td class="r-nonebor">
              <div class="touz-addjian">
                <input class="input-text vcen" type="text" id="modify_advance_close_stopPrice" name="modify_advance_close_stopPrice">
              </div>
              <input type="hidden" id="modify_advance_close_Stop_max" name="modify_advance_close_Stop_max" /> <!-- 买入停损最小值 -->
			  <input type="hidden" id="modify_advance_close_Stop_min" name="modify_advance_close_Stop_min" /><!-- 卖出停损最大值 -->
              <p class="gez-ts-info" id="modify_advance_close_stopOperate"></p>
            </td>	
			</tr>
			<tr class="tr-bg" name="advance">
            <th>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</th>
            <td class="r-nonebor"><span class="t-sppad" id="modify_advance_defaultExpir">---</span></td>
           </tr>
         </tbody>
        </table>
        <p class="more-lls-btn gez-btninfo" id="modify_pendingOrderP"><a href="javascript:" id="modify_btnOrderOK">确定</a><a href="javascript:" class="gez-qx-btn" id="modify_btnOrderCancel" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">取消</a></p>
        <p class="more-lls-btn gez-btninfo" id="modify_advamcePendingOrderP"><a href="javascript:" id="modify_btnAdvanceOrderOK">确定</a><a href="javascript:" class="gez-qx-btn" id="modify_btnAdvanceOrderCancel" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">取消</a></p>
      
          <!--委托下单提交中begin-->
         <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="modify_submitedSuccessPendingOrderTable">
          <tbody>
            <tr class="tr-bg" id="modify_submitedSuccessPendingOrderTr">
             <td class="t-bnone t-cen submit-t-fon r-nonebor">
                 <span id="modify_pendOrderSuccessMsg" class="mm-succ-icon bold"  style="width:50px"></span>   <!-- 成功 -->
        	        <span id="modify_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 --> 
             </td>
            </tr>
          </tbody>
         </table>
         <p class="more-lls-btn gez-btninfo del-wid" id="modify_pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a></p>
    <!--委托下单提交中end-->
   
     <!--委托下单失败begin-->
        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="modify_submitedFailedPendingOrderTable">
          <tbody>
            <tr class="tr-bg">
             <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失败</span></td>
            </tr>
            <tr>
             <td class="t-cen r-nonebor">
               <p class="mm-fail-p" id="modify_pendingOrderErrorMessage"></p>
             </td>
            </tr>
          </tbody>
         </table>
          <!--委托下单失败end-->
         <p class="more-lls-btn gez-btninfo del-wid" id="modify_pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a></p>
 
    
    
    <!--进阶委托下单 提交中或成功 -->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="modify_submitedSuccessAdvancePendingOrderTable">
        <tbody>
           <tr class="tr-bg" id="modify_submitedSuccessAdvancePendingOrderTr">
           	    <td class="t-bnone t-cen submit-t-fon r-nonebor">
           	        <span id="modify_advance_pendOrderSuccessMsg" class="mm-succ-icon bold" style="width:50px"></span>   <!-- 成功 -->
           	        <span id="modify_advance_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
           	    </td>
           </tr>
        </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="modify_advance_pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a></p>

 
    <!--进阶委托下单提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="modify_submitedFailedAdvancePendingOrderTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失败</span></td>
          </tr>
	      <tr>
	          <td class="t-cen r-nonebor">
              	 <p class="mm-fail-p" id="modify_advance_pendingOrderErrorMessage"></p>
              </td>
	     </tr>
      </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="modify_advance_pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a></p>
    </div>
    </div>
  </div>
</div>
<!--委托修改 end-->
</div>