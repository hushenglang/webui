<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div id="marketAndPendingOrderDiv" style="display: none">
	<div class="navbox-c navbox-blin">
		<div class="nav-qh clearfix">

			<ul class="tan-ul" id="market-PendingOrder-fl">
				<li id="marketLi" class="on-na">市价下单</li>
				<li id="pendingOrderLi">委託下单</li>
			</ul>
		</div>
	</div>
	<!--市价下单begin-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="marketTable">
         <tbody>
           <!-- 买卖   -->
           <tr>
	          <th width="96" class="t-bnone">
	          	<span class="text-space" id="omDefaultTradeType">---</span>
	          </th>
	          <td id="omPrice">
	               <span id="bidPrice"></span>&nbsp;&nbsp;<span id="tradePrice">---</span>
	          </td>
           </tr>
         
           <!-- 手数 -->
           <tr class="tr-bg">
             <th valign="top"><span class="text-space">手</span>数：</th> <!-- 手数 -->
             <td class="shous-tadfon" valign="top">
               <div class="shous-lay">
	               <span class="shous-lay-con1" id="omVolumeSelSpan">
	                 <select id="omVolumeSel" class="sel-shous-fon">
	                 </select>
	               </span> 
	               <span class="shous-lay-con2">
					 <input type="text"  id="omVolumeInput" value="" class="sel-shous-inp"/>
				   </span>
				   <span id="volumeRange" class="shous-lay-ts gray2"></span>
				   			   
			   </div>
              </td>
           </tr>
           
           <!-- 保证金   -->  
           <tr>
              <th>保&nbsp;证&nbsp;金：</th>
	          <td>
	              <span id="omMargin"></span>&nbsp;USD
	          </td>
           </tr>

 	 	   <!-- 可成交范围   -->             
           <tr class="tr-bg">
	          <th>成交范围：</th> <!-- 成交范围-->
	          <td>
	              <input type="text" id="transactionRange" class="input-spinner"/>&nbsp;&nbsp;<span id="transactionRangeSpan" class="gray2"></span>
	          </td>
          </tr>
         </tbody>
       </table>
    <p class="more-lls-btn gez-btninfo" id="marketP"><a href="javascript:" id="btnOmOK" class="sure_btn" class="sure_btn">确定</a><a href="javascript:" id="btnOmCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="cancel_btn">取消</a></p> 
    
    
    
    <!--市价下单 成功、提交中-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessMarketTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen">
                  <span id="marketSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	      <span id="marketPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
              </td>
          </tr>
          <tr>
              <td>
	              <ul class="subm-info">
	                 <li><span id="tradeTypeTitleTd"></span><span id="submitedTradePriceSpan"></span><!-- 交易类型: 卖/买 --></li>
	                <%--  <li>投资额度：<span id="submitedInvestmentQuotaSpan"></span></li> --%>
	                 <li><span class="text-space">手</span>数：<span id="submitedVolumeSpan"></span></li>
	                 <%-- <li>手&nbsp;&nbsp;&nbsp;续&nbsp;费：<span id="submitedServiceChargeSpan"></span></li> --%>
	                 <li>保&nbsp;&nbsp;证&nbsp;&nbsp;金&nbsp;：<span id="submitedMargin"></span>&nbsp;USD</li>
	                 <li id="doneRange" >可成交范围&nbsp;：<span id="submitedTransactionRangeSpan"></span></li>
	                 <li id="uidId">订&nbsp;&nbsp;&nbsp;单&nbsp;号：<span id="submitedMarketUIDSpan"></span></li>
	              </ul>
             </td>
          </tr>
       </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="marketC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p> 
    
    <!--市价下单提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailMarketTable">
        <tbody>	 
            <tr class="tr-bg">
                <td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
            </tr>
	        <tr>
	            <td class="t-cen">
              	   <p class="mm-fail-p" id="marketErrorMessage"></p>
                </td>
	        </tr>
      	</tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="marketFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
   <!--市价下单End-->

	  <!--委託下单begin-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="pendingOrderTable">
		<tbody>
	        <tr>
				<th class="text-space"><span class="text-space">
					类</span>型：
				</th>
				<!-- 类型 -->
				<td>
					<select id="orderBusiTypeSel"></select>
				</td>
			</tr>
		
		<tr name="unadvance" class="tr-bg">
			<th><span class="text-space">买</span>卖：</th>
			<!-- 买卖 -->
			<td><span class="text-space" id="pendingOrderTradedType">---</span>
			</td>
		</tr>
		<tr name="unadvance">
			<th><span class="text-space">限</span>价：</th>
			<!-- 限价-->
			<td>
				 <input type="text" id="limitPrice" class="input-spinner"/>
				
				<span id="limitOperate" class="gray2"></span> 
				<input type="hidden" id="limit_max" name="limit_max" /> <!-- 限价最大值 --> 
				<input type="hidden" id="limit_min" name="limit_min" /> <!-- 限价最小值 --> 
			</td>
		</tr>
		<tr name="unadvance" class="tr-bg">
			<th><span class="text-space">停</span>损：</th>
			<!-- 止蚀-->
			<td>
				<input type="text" id="stopPrice" class="input-spinner"/>
				
				<span id="stopOperate" class="gray2"></span>
				<input type="hidden" id="stop_max" name="stop_max" /> <!-- 止损限价最大值 --> 
				<input type="hidden" id="stop_min" name="stop_min" /> <!-- 止损限价最小值 --> 
			</td>
		</tr>
		<tr name="unadvance">
			<th valign="top"><span class="text-space">手</span>数：</th>
			<!-- 手数 -->
			<td class="shous-tadfon" valign="top">
				<div class="shous-lay">
					<span class="shous-lay-con1" id="orderVolumeSelSpan"> <select
						id="orderVolumeSel" class="sel-shous-fon">
					</select>
					</span> <span class="shous-lay-con2"> <input type="text"
						id="orderVolumeInput" value="" class="sel-shous-inp" />
					</span> <span id="orderVolumeRange" class="shous-lay-ts gray2"></span>
					<p style="display:none"  class="shouw-lay-info">
						<label>
							<input type="checkbox" id="defaultOrderVolumeCheckbox"
							name="defaultOrderVolumeCheckbox" class="vcen" /> <span
							id="OmVolumeSpan">设爲默认手数</span>
						</label>
					</p>
				</div>
			</td>
		</tr>
		<!-- 保证金   -->
		<tr name="unadvance" class="tr-bg">
			<th>保&nbsp;证&nbsp;金：</th>
			<td><span id="pendingMargin"></span>&nbsp;USD</td>
		</tr>

		<tr name="unadvance">
			<th><span class="text-space">期</span>限：</th>
			<!-- 期限-->
			<td><span class="t-sppad"> <label><input
						type="radio" id="defaultExpir" value='0' checked="checked"
						class="vcen" name="radioExpir" />当日有效</label>
			</span> <label> <input type="radio" id="defaultExpir" value='1'
					class="vcen" name="radioExpir" />当周有效
			</label></td>
		</tr>



			<!-- 进阶委托单 -->
			<tr name="advance">
				<th class="text-space"><span class="text-space">
					开</span>仓：
				</th>
				<!-- 开仓类型 -->
				<td>
					<select id="advance_open_orderBusiTypeSel"></select>
				</td>
			</tr>
			<tr name="advance" class="tr-bg">
				<th><span class="text-space">买</span>卖：</th>
				<!-- 买卖 -->
				<td><span class="text-space"
					id="advance_open_pendingOrderTradedType">---</span></td>
			</tr>
			<tr name="advance">
				<th><span class="text-space">限</span>价：</th>
				<!-- 限价-->
				<td><input type="text" id="advance_open_limitPrice" name="advance_open_limitPrice" />
					<span id="advance_open_limitOperate" class="gray2"></span> 
					<input type="hidden" id="advance_open_Limit_max" name="advance_open_Limit_max" /> <!-- 买入限价最大值 -->
					<input type="hidden" id="advance_open_Limit_min" name="advance_open_Limit_min" /> <!-- 卖出限价最小值 -->
				</td>
			</tr>
			<tr name="advance" class="tr-bg">
				<th><span class="text-space">停</span>损：</th>
				<!-- 止蚀-->
				<td><input type="text" id="advance_open_stopPrice" name="advance_open_stopPrice" class="input-spinner" />
					<span id="advance_open_stopOperate" class="gray2"></span>
					<input type="hidden" id="advance_open_Stop_max" name="advance_open_Stop_max" /> <!-- 买入止蚀最小值 -->
					<input type="hidden" id="advance_open_Stop_min" name="advance_open_Stop_min" /> <!-- 卖出止蚀最大值 -->
				</td>
			</tr>
			<tr name="advance">
				<th valign="top"><span class="text-space">手</span>数：</th>
				<!-- 手数 -->
				<td class="shous-tadfon" valign="top">
					<div class="shous-lay">
						<span class="shous-lay-con1" id="advance_open_orderVolumeSelSpan"> 
							<select id="advance_open_orderVolumeSel" class="sel-shous-fon">
							</select>
						</span> 
						
						<span class="shous-lay-con2"> 
							<input type="text" id="advance_open_orderVolumeInput" value="" class="sel-shous-inp" />
						</span> 
						
						<span id="advance_open_orderVolumeRange" class="shous-lay-ts gray2"></span>
						
						<p class="shouw-lay-info" style="display:none" >
							<label>
								<input type="checkbox" id="advance_open_defaultOrderVolumeCheckbox"
									name="advance_open_defaultOrderVolumeCheckbox" class="vcen" /> 
								<span id="advance_open_OmVolumeSpan">设爲默认手数</span>
							</label>
						</p>
					</div>
				</td>
			</tr>
			<!-- 保证金   -->
			<tr name="advance" class="tr-bg">
				<th>保&nbsp;证&nbsp;金：</th>
				<td><span id="advance_open_pendingMargin"></span>&nbsp;USD</td>
			</tr>

			<tr name="advance">
				<th class="text-space"><span class="text-space">
					平</span>仓：
				</th>
				<!-- 平仓类型 -->
				<td>
					<select id="advance_close_orderBusiTypeSel"></select>
				</td>
			</tr>

			<tr name="advance" class="tr-bg">
				<th><span class="text-space">买</span>卖：</th>
				<!-- 买卖 -->
				<td><span class="text-space"
					id="advance_close_pendingOrderTradedType">---</span></td>
			</tr>
			<tr name="advance">
				<th><span class="text-space">限</span>价：</th>
				<!-- 限价-->
				<td><input type="text" id="advance_close_limitPrice" name="advance_close_limitPrice" />
					<span id="advance_close_limitOperate" class="gray2"></span> 
					<input type="hidden" id="advance_close_Limit_max" name="advance_close_Limit_max" /> <!-- 买入限价最大值 -->
					<input type="hidden" id="advance_close_Limit_min" name="advance_close_Limit_min" /> <!-- 买入限价最小值 -->
				
				</td>
			</tr>
			<tr name="advance" class="tr-bg">
				<th><span class="text-space">停</span>损：</th>
				<!-- 止蚀-->
				<td><input type="text" id="advance_close_stopPrice" name="advance_close_stopPrice" class="input-spinner" />
					<span id="advance_close_stopOperate" class="gray2"></span>
					<input type="hidden" id="advance_close_Stop_max" name="advance_close_Stop_max" /> <!-- 买入止蚀最大值 -->
					<input type="hidden" id="advance_close_Stop_min" name="advance_close_Stop_min" /> <!-- 买入止蚀最小值 -->
				</td>
			</tr>


			<tr name="advance">
				<th><span class="text-space">期</span>限：</th>
				<!-- 期限-->
				<td><span class="t-sppad"> 
						<label><input type="radio" id="advance_defaultExpir" value='0' checked="checked" class="vcen" name="advance_radioExpir" />当日有效</label>
					</span> 
						<label> <input type="radio" id="advance_defaultExpir" value='1' class="vcen" name="advance_radioExpir" />当周有效</label>
				</td>
			</tr>

		</tbody>
	</table>

	<p class="more-lls-btn gez-btninfo"  id="pendingOrderP"><a href="javascript:" id="btnOrderOK" class="sure_btn">确定</a><a href="javascript:" id="btnOrderCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="cancel_btn">取消</a></p>
    <p class="more-lls-btn gez-btninfo"  id="advamcePendingOrderP"><a href="javascript:" id="btnAdvanceOrderOK" class="sure_btn">确定</a><a href="javascript:" id="btnAdvanceOrderCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="cancel_btn">取消</a></p>
    <!--委託下单End-->
    
    <!--委託下单 提交中或成功 -->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessPendingOrderTable">
        <tbody>
           <tr class="tr-bg" id="submitedSuccessPendingOrderTr">
           	    <td class="t-bnone t-cen">
           	        <span id="pendOrderSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	        <span id="pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
           	    </td>
           </tr>
        </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>

    <!--委託下单提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailedPendingOrderTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
          </tr>
	      <tr>
	          <td class="t-cen">
              	 <p class="mm-fail-p" id="pendingOrderErrorMessage"></p>
              </td>
	     </tr>
      </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
    
    
    
    
    
    <!--进阶委託下单 提交中或成功 -->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessAdvancePendingOrderTable">
        <tbody>
           <tr class="tr-bg" id="submitedSuccessAdvancePendingOrderTr">
           	    <td class="t-bnone t-cen">
           	        <span id="advance_pendOrderSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	        <span id="advance_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
           	    </td>
           </tr>
        </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="advance_pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>

    <!--进阶委託下单提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailedAdvancePendingOrderTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
          </tr>
	      <tr>
	          <td class="t-cen">
              	 <p class="mm-fail-p" id="advance_pendingOrderErrorMessage"></p>
              </td>
	     </tr>
      </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="advance_pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
    
</div>
