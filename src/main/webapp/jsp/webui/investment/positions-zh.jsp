<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--持仓部位begin-->
<div id="accountPositions"></div>

<%-- 平仓窗口  --%>
<div id="c_marketAndPendingOrderDiv" style="display: none">
	<div class="navbox-c navbox-blin">
		<div class="nav-qh clearfix">
			<ul class="tan-ul" id="c_market-PendingOrder-fl">
				<li id="c_marketLi" class ="on-na">市价平仓</li>
				<li id="c_pendingOrderLi">委托平仓</li>
			</ul>
		</div>
	</div> 
   <!--市价平仓begin-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_marketTable">
         <tbody>
           <!-- 买卖   -->
          <tr>
             <th valign="top" style="padding-left: 25px;">
	          	<span class="text-space" id="c_omDefaultTradeType">---</span>
	          </th>
	          <td id="c_omPrice">
	               <span id="c_bidPrice"></span>&nbsp;&nbsp;<span id="c_tradePrice">---</span>
	          </td>
           </tr>
         
           <!-- 手数 -->
           <tr class="tr-bg">
             <th valign="top"><span class="text-space">手</span>数：</th> <!-- 手数 -->
             <td class="shous-tadfon" valign="top">
               <div class="shous-lay">
	               <input id="c_omVolumeInput" size="15"/>
			   </div>
              </td>
           </tr>

 	 	   <!-- 可成交范围   -->             
           <tr>
	          <th>成交范围：</th> <!-- 成交范围-->
	          <td>
	              <input type="text" id="c_transactionRange" class="input-spinner"/>&nbsp;&nbsp;<span id="c_transactionRangeSpan" class="gray2"></span>
	          </td>
          </tr>
         </tbody>
       </table>
    <p class="more-lls-btn gez-btninfo" id="c_marketP"><a href="javascript:" id="c_btnOmOK" class="sure_btn">确定</a><a href="javascript:" id="c_btnOmCancel" onclick="CloseCommon.closeWindowDiv();">取消</a></p> 
    
    
    
    <!--市价平仓 成功、提交中-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedSuccessMarketTable"  >
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen">
                  <span id="c_marketSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	      <span id="c_marketPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
              </td>
          </tr>
          <tr>
              <td>
	              <ul class="subm-info">
	                 <li><span id="c_tradeTypeTitleTd"></span><span id="c_submitedTradePriceSpan"></span><!-- 交易类型: 卖/买 --></li>
	                 <li><span class="text-space">手</span>数：<span id="c_submitedVolumeSpan"></span></li>
	                 <li id="c_doneRange">可成交范围：<span id="c_submitedTransactionRangeSpan"></span></li>
	                 <li id="c_uidId" >平&nbsp;&nbsp;&nbsp;仓&nbsp;号：<span id="c_submitedMarketUIDSpan"></span></li>
	              </ul>
             </td>
          </tr>
       </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="c_marketC"  ><a href="javascript:" onclick="CloseCommon.closeWindowDiv(this);">关闭</a></p> 
    
    <!--市价平仓提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedFailMarketTable"  >
        <tbody>	 
            <tr class="tr-bg">
                <td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
            </tr>
	        <tr>
	            <td class="t-cen">
              	   <p class="mm-fail-p" id="c_marketErrorMessage"></p>
                </td>
	        </tr>
      	</tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="c_marketFC"  ><a href="javascript:" onclick="CloseCommon.closeWindowDiv();">关闭</a></p>
   <!--市价平仓End-->
      
   <!--委託平仓begin-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_pendingOrderTable"  >
         <tbody>
	          <tr>
                <th width="96" class="t-bnone"><span class="text-space">类</span>型：</th> <!-- 类型 --> 
                <td class="t-bnone">
	                <select id="c_orderBusiTypeSel">
	                </select>
           		</td>
              </tr>
              <tr class="tr-bg">
                <th><span class="text-space">买</span>卖：</th> <!-- 买卖 --> 
                <td>
                    <span class="text-space" id="c_pendingOrderTradedType">---</span>
                </td>
              </tr>
          	 <tr>
                <th><span class="text-space">限</span>价：</th><!-- 限价-->
                <td>
                   <input type="text" id="c_limitPrice" name="limitPrice"/><span id="c_limitOperate" class="gray2"></span>
                   <input type="hidden" id="c_buyLimitMax" name="buyLimitMax" />  <!-- 买入限价最大值 -->
                   <input type="hidden" id="c_askLimitMin" name="askLimitMin" />  <!-- 卖出限价最小值 -->
                </td>
             	 </tr>
             <tr class="tr-bg">
                <th><span class="text-space">停</span>损：</th><!-- 止蚀-->
                <td>
                    <input type="text" id="c_stopPrice" name="c_stopPrice" class="input-spinner"/><span id="c_stopOperate" class="gray2"></span>
                    <input type="hidden" id="c_buyStopMin" name="c_buyStopMin" />  <!-- 买入止蚀最小值 -->
                    <input type="hidden" id="c_askStopMax" name="c_askStopMax" />  <!-- 卖出止蚀最大值 -->
                </td>
             </tr>
             <tr>
	             <th valign="top"><span class="text-space">手</span>数：</th> <!-- 手数 -->
	             <td class="shous-tadfon" valign="top">
	               <div class="shous-lay">
		               <input id="c_orderVolumeInput"  size="15"/>
				   </div>
	              </td>
          	</tr>
          	
          	<tr class="tr-bg">
                <th><span class="text-space">期</span>限：</th>      <!-- 期限-->
                <td>
                   <span class="t-sppad">
                       <input type="radio" id="c_defaultExpir" value='0' checked="checked" class="vcen" name="c_radioExpir"/>当日有效
                    </span>
                    <input type="radio" id="c_defaultExpir" value='1' class="vcen" name="c_radioExpir"/>当周有效
                </td>
            </tr>
         </tbody>
	 </table>
     <p class="more-lls-btn gez-btninfo" id="c_pendingOrderP"  ><a href="javascript:" id="c_btnOrderOK" class="sure_btn">确定</a><a href="javascript:" id="c_btnOrderCancel" onclick="CloseCommon.closeWindowDiv();">取消</a></p>
    <!--委託平仓End-->
    
    <!--委託平仓 提交中或成功 -->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedSuccessPendingOrderTable"  >
        <tbody>
           <tr class="tr-bg" id="c_submitedSuccessPendingOrderTr">
           	    <td class="t-bnone t-cen">
           	        <span id="c_pendOrderSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	        <span id="c_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
           	    </td>
           </tr>
        </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="c_pendingOrderC"  ><a href="javascript:" onclick="CloseCommon.closeWindowDiv(this);">关闭</a></p>

    <!--委託平仓提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedFailedPendingOrderTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen" id="c_pendingOrderErrorIcon" ><span class="mm-fail-icon bold">失败</span></td>
          </tr>
	      <tr>
	          <td class="t-cen">
              	 <p class="mm-fail-p" id="c_pendingOrderErrorMessage"></p>
              </td>
	     </tr>
      </tbody>
    </table>
    <p class="more-lls-btn gez-btninfo del-wid" id="c_pendingOrderFC"  ><a href="javascript:" onclick="CloseCommon.closeWindowDiv();">关闭</a></p>
</div>
