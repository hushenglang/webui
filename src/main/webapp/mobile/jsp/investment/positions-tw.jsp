<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--持倉部位begin-->
<div id="accountPositions" class="touz-tabox"></div>

<!--市價平倉&委託平倉2 begin-->
<div class="layer-box dn" id="c_marketAndPendingOrderDiv">
  <div class="layer-con layer-con-weit3">
    <h3 class="top-menubox" id="c-trade-prd-name"></h3>
    <div class="lay-kuang-fon">
      <div class="lay-kuang-con">
        <div class="navbox-c navbox-blin">
          <div class="nav-qh clearfix">
            <ul class="tan-ul fl" id="c_market-PendingOrder-fl">
				<li id="c_marketLi" class ="on-na">市價平倉</li>
				<li id="c_pendingOrderLi">委託平倉</li>
			</ul>
          </div>
        </div>
        <div>
          <!--市價平倉begin-->
          <div>
            <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_marketTable">
             <tbody>
             <!-- 買賣   -->
               <tr>
                <th class="t-bnone"><span id="c_omDefaultTradeType">---</span></th>
                <td class="t-bnone r-nonebor" id="c_omPrice">
	               <span id="c_bidPrice"></span>&nbsp;&nbsp;<span id="c_tradePrice">---</span>
	           </td>
               </tr>
               <tr class="tr-bg">
                <th>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;數：</th>
                <td class="r-nonebor">
                   <div class="shous-lay">
                     <span class="shous-lay-con1" id="c_omVolumeSelSpan"></span>
                     <input id="c_omVolumeInput" class="input-text shous-inp-fon" type="text">
                  </div>
                </td>
               </tr>
               <tr>
                <th valign="top">可成交範圍：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text"  id="c_transactionRange"  class="input-text vcen" />
                  </div>
                  <p class="gez-ts-info" id="c_transactionRangeSpan"></p>
                </td>
               </tr>
             </tbody>
            </table>           
            <p class="more-lls-btn gez-btninfo" id="c_marketP"><a href="javascript:" id="c_btnOmOK">確定</a><a href="javascript:" id="c_btnOmCancel" onclick="CloseCommon.closeWindowDiv();"class="gez-qx-btn">取消</a></p>
          
           <!--市價平倉提交中begin-->
          <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedSuccessMarketTable">
             <tbody>
               <tr class="tr-bg">
                <td class="t-bnone t-cen submit-t-fon r-nonebor">
                  <span id="c_marketSuccessMsg" class="mm-succ-icon bold" style="width:50px"></span>   <!-- 成功 -->
           	      <span id="c_marketPreSubmittingMsg"></span> <!-- 提交中 -->
                </td>
               </tr>
               <tr>
                <td class="r-nonebor b-nonebor">
                  <ul class="subm-info">
                     <li><span id="c_tradeTypeTitleTd"></span><span id="c_submitedTradePriceSpan"></span><!-- 交易類型: 賣/買 --></li>
	                 <li><span class="text-space">手</span>數：<span id="c_submitedVolumeSpan"></span></li>
	                 <li id="c_doneRange" >成交範圍&nbsp;：<span id="c_submitedTransactionRangeSpan"></span></li>
	                 <li id="c_uidId" style="display: none">平&nbsp;&nbsp;&nbsp;倉&nbsp;號：<span id="c_submitedMarketUIDSpan"></span></li>
                  </ul>
                </td>
               </tr>
             </tbody>
            </table>      
          <!--市價平倉提交中end-->
          <p class="more-lls-btn gez-btninfo del-wid" id="c_marketC"><a href="javascript:" onclick="CloseCommon.closeWindowDiv(this);">關閉</a></p>
           
          <!--市價下單失敗begin-->
            <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedFailMarketTable">
             <tbody>
               <tr class="tr-bg">
                <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失敗</span></td>
               </tr>
               <tr>
                <td class="t-cen r-nonebor">
                  <p class="mm-fail-p"  id="c_marketErrorMessage"></p>
                </td>
               </tr>
             </tbody>
            </table>  
             <p class="more-lls-btn gez-btninfo del-wid" id="c_marketFC"><a href="javascript:" onclick="CloseCommon.closeWindowDiv('#marketAndPendingOrderDiv');">關閉</a></p>          
           <!--市價下單失敗begin-->   
          </div>     
          <!--市價平倉begin-->
          
          <!--委託平倉begin-->
          <div>
            <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_pendingOrderTable" > 
             <tbody>
               <tr>
                <th class="t-bnone">類&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</th>
                <td class="t-bnone r-nonebor">
                 <select id="c_orderBusiTypeSel" class="baob-slist vcen"></select>
                </td>
               </tr>
               <tr class="tr-bg">
                <th>買&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;賣：</th> <!-- 買賣 --> 
                <td>
                    <span class="text-space" id="c_pendingOrderTradedType">---</span>
                </td>
              </tr>
               <tr class="tr-bg">
                <th valign="top">限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;價：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="c_limitPrice" name="c_limitPrice" class="input-text vcen" />
                    <p class="gez-ts-info" id="c_limitOperate" ></p>
                  </div>
                   <input type="hidden" id="c_buyLimitMax" name="c_buyLimitMax" />  <!-- 買入限價最大值 -->
                   <input type="hidden" id="c_askLimitMin" name="c_askLimitMin" />  <!-- 賣出限價最小值 -->
                </td>
               </tr>
               <tr>
                <th valign="top" class="t-bnone">止&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蝕：</th>
                <td class="t-bnone r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="c_stopPrice" name="c_stopPrice" class="input-text vcen" />
                    <p class="gez-ts-info" id="c_stopOperate"></p>
                  </div>
                    <input type="hidden" id="c_buyStopMin" name="c_buyStopMin" />  <!-- 買入停損最小值 -->
                    <input type="hidden" id="c_askStopMax" name="c_askStopMax" />  <!-- 賣出停損最大值 -->
                </td>
               </tr>
               <tr class="tr-bg">
                <th>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;數：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                     <div class="shous-lay">
		               <span class="shous-lay-con1" id="c_orderVolumeSelSpan">
		               <input id="c_orderVolumeInput" class="input-text shous-inp-fon" type="text">
		               </span>
				    </div>
                  </div>
                </td>
               </tr>
               <tr>
                <th class="t-bnone">期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</th>
                <td class="r-nonebor">
                  <span class="t-sppad2"><input type="radio" id="c_defaultExpir" value='0' checked="checked" class="vcen" name="c_radioExpir"> 當日有效</span>
                  <input type="radio" id="c_defaultExpir" value='1' class="vcen" name="c_radioExpir"> 當周有效
                </td>
               </tr>
             </tbody>
            </table>
            <p class="more-lls-btn gez-btninfo" id="c_pendingOrderP"  ><a href="javascript:" id="c_btnOrderOK">確定</a><a href="javascript:" id="c_btnOrderCancel" onclick="CloseCommon.closeWindowDiv();" class="gez-qx-btn">取消</a></p>
          <!--委託平倉End-->
           <!--委託平倉 提交中或成功 -->
		    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedSuccessPendingOrderTable">
		        <tbody>
		           <tr class="tr-bg" id="c_submitedSuccessPendingOrderTr">
		           	    <td class="t-bnone t-cen submit-t-fon r-nonebor">
		           	        <span id="c_pendOrderSuccessMsg" class="mm-succ-icon bold" style="width:50px"></span>   <!-- 成功 -->
		           	        <span id="c_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
		           	    </td>
		           </tr>
		        </tbody>
		    </table>
		    <p class="more-lls-btn gez-btninfo del-wid" id="c_pendingOrderC"  ><a href="javascript:" onclick="CloseCommon.closeWindowDiv(this);">關閉</a></p>
	
	 
		    <!--委託平倉提交失敗-->
		    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="c_submitedFailedPendingOrderTable">
		       <tbody>	 
		          <tr class="tr-bg">
		              <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失敗</span></td>
		          </tr>
			      <tr>
			          <td class="t-cen r-nonebor">
		              	 <p class="mm-fail-p" id="c_pendingOrderErrorMessage"></p>
		              </td>
			     </tr>
		      </tbody>
		    </table>
		    <p class="more-lls-btn gez-btninfo del-wid" id="c_pendingOrderFC"><a href="javascript:" onclick="CloseCommon.closeWindowDiv('#marketAndPendingOrderDiv');">關閉</a></p>
          </div>
          <!--委託平倉end-->
        </div>
      </div>
    </div>
  </div>
</div>
<!--市價平倉&委託平倉2 end-->