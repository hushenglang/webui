<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!--市价下单&委托下单 begin-->
<div class="layer-box" id="marketAndPendingOrderDiv" style="display: none">
  <div class="layer-con layer-con-weit">
    <h3 class="top-menubox" id="trade-prd-name"></h3>
    <div class="lay-kuang-fon">
      <div class="lay-kuang-con">
        <div class="navbox-c navbox-blin">
          <div class="nav-qh clearfix">
            <ul class="tan-ul fl" id="market-PendingOrder-fl">
              <li id="marketLi" class="on-na">市价下单</li>
              <li id="pendingOrderLi">委托下单</li>
            </ul>
          </div>
        </div>
          <!--市价下单begin-->
          
          <div>
            <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="marketTable">
             <tbody>
               <tr class="tr-bg">
                <th id="omDefaultTradeType">--</th>
                <td class="r-nonebor"><span class="t-sppad" id="tradePrice">---</span></td>
               </tr>
               <tr>
                <th valign="top">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</th>
                <td valign="top" class="r-nonebor">
                   <div class="shous-lay">
                     <input id="omVolumeInput" value="" class="input-text shous-inp-fon" type="text">
                     <div class="shang-xia" id="omVolumeSel-btn"><i class="down onn-mar"></i></div>
                     <ul class="shang-xia-con" id="omVolumeSel" style="display:none;"></ul>
                     <p class="shouw-lay-info"><input class="vcen" name="defaultOmVolumeCheckbox" id="defaultOmVolumeCheckbox" type="checkbox"> <span id="OmVolumeSpan">默认手数</span></p>
                  </div>
                  <p class="gez-ts-info" id="volumeRange"></p>
                </td>
               </tr>
               <tr class="tr-bg">
                <th>保&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;金：</th>
                <td class="r-nonebor"><span id="omMargin"></span>USD</td>
               </tr>
               <tr>
                <th valign="top">可成交范围：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" value="1000" class="input-text vcen" id="transactionRange"/>
                  </div>
                  <p class="gez-ts-info" id="transactionRangeSpan"></p>
                </td>
               </tr>
             </tbody>
           </table>
           <p class="more-lls-btn gez-btninfo" id="marketP"><a href="javascript:" id="btnOmOK">确定</a><a href="javascript:" id="btnOmCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="gez-qx-btn">取消</a></p>
           
           <!--市价下单提交中begin-->
          <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessMarketTable">
             <tbody>
               <tr class="tr-bg">
                <td class="t-bnone t-cen submit-t-fon r-nonebor">
                  <span id="marketSuccessMsg" class="mm-succ-icon bold" style="width:50px"></span>   <!-- 成功 -->
           	      <span id="marketPreSubmittingMsg" ></span> <!-- 提交中 -->
                </td>
               </tr>
               <tr>
                <td class="r-nonebor b-nonebor">
                  <ul class="subm-info">
                     <li><span id="tradeTypeTitleTd"></span><span id="submitedTradePriceSpan"></span><!-- 交易类型: 卖/买 --></li>
	                 <li><span class="text-space">手</span>数：<span id="submitedVolumeSpan"></span></li>
	                 <li>保&nbsp;&nbsp;证&nbsp;&nbsp;金&nbsp;：<span id="submitedMargin"></span>USD</li>
	                 <li id="doneRange"  style="display: none">成交范围&nbsp;：<span id="submitedTransactionRangeSpan"></span></li>
	                 <li id="uidId">订&nbsp;&nbsp;&nbsp;单&nbsp;号：<span id="submitedMarketUIDSpan"></span></li>
                  </ul>
                </td>
               </tr>
             </tbody>
            </table>      
          <!--市价下单提交中end-->
         
           
          <!--市价下单失败begin-->
           <div> 
            <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailMarketTable">
             <tbody>
               <tr class="tr-bg">
                <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失败</span></td>
               </tr>
               <tr>
                <td class="t-cen r-nonebor">
                  <p class="mm-fail-p"  id="marketErrorMessage"></p>
                </td>
               </tr>
             </tbody>
            </table>  
          <!--市价下单失败begin-->  
           </div> 
          </div>     
          <!--市价下单end-->
          
           <!--委托下单begin-->
          <div>
           <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="pendingOrderTable">
             <tbody>
               <tr>
                <th width="96" class="t-bnone">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</th>
                <td class="t-bnone r-nonebor">
                  <select id="orderBusiTypeSel" class="baob-slist vcen"></select>
                </td>
               </tr>
               <tr name="unadvance" class="tr-bg">
                <th>买&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖：</th>
                <td class="r-nonebor"><span class="t-sppad" id="pendingOrderTradedType">---</span></td>
               </tr>
               <tr name="unadvance" class="tr-bg">
                <th valign="top">限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="limitPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="limit_max" name="limit_max" /> <!-- 限价最大值 --> 
				  <input type="hidden" id="limit_min" name="limit_min" /> <!-- 限价最小值 --> 
                  <p class="gez-ts-info" id="limitOperate"></p>
                </td>
               </tr>
               <tr name="unadvance">
                <th valign="top">停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="stopPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="stop_max" name="stop_max" /> <!-- 止损限价最大值 --> 
				  <input type="hidden" id="stop_min" name="stop_min" /> <!-- 止损限价最小值 --> 
                  <p class="gez-ts-info" id="stopOperate"></p>
                </td>
               </tr>
               <tr class="tr-bg" name="unadvance">
                <th valign="top">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</th>
                <td class="r-nonebor">
                  <div class="shous-lay">
                     <input id="orderVolumeInput" value="" class="input-text shous-inp-fon" type="text">
                     <div class="shang-xia" id="orderVolumeSel-btn"><i class="down onn-mar"></i></div>
                     <ul class="shang-xia-con" id="orderVolumeSel" style="display:none;"></ul>
                     <p class="shouw-lay-info"><input class="vcen" name="defaultOrderVolumeCheckbox" id="defaultOrderVolumeCheckbox" type="checkbox">默认手数</p>
                  </div>
                  <p class="gez-ts-info" id="orderVolumeRange"></p>
                </td>
               </tr>
               <tr name="unadvance">
                <th>保&nbsp;&nbsp;证&nbsp;&nbsp;金：</th>
                <td class="r-nonebor"><span id="pendingMargin"></span>USD</td>
               </tr>
               <tr class="tr-bg" name="unadvance">
                <th>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</th>
                <td class="r-nonebor"><span class="t-sppad2"><input type="radio" id="defaultExpir" value='0' checked="checked"
						class="vcen" name="radioExpir"  /> 当日有效</span><input type="radio" id="defaultExpir" value='1'
					class="vcen" name="radioExpir"  /> 当周有效</td>
               </tr>
               
               <!-- 进阶委托单 -->
                <tr name="advance">
                <th width="96" class="t-bnone">开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仓：</th>
                <td class="t-bnone r-nonebor">
                  <select id="advance_open_orderBusiTypeSel"></select>
                </td>
               </tr>
               <tr class="tr-bg" name="advance">
                <th>买&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖：</th>
                <td class="r-nonebor"><span class="t-sppad" id="advance_open_pendingOrderTradedType">---</span></td>
               </tr>
               <tr class="tr-bg" name="advance">
                <th valign="top">限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="advance_open_limitPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="advance_open_Limit_max" name="advance_open_Limit_max" /> <!-- 限价最大值 --> 
				  <input type="hidden" id="advance_open_Limit_min" name="advance_open_Limit_min" /> <!-- 限价最小值 --> 
                  <p class="gez-ts-info" id="advance_open_limitOperate"></p>
                </td>
               </tr>
               <tr name="advance">
                <th valign="top">停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="advance_open_stopPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="advance_open_Stop_max" name="advance_open_Stop_max" /> <!-- 止损限价最大值 --> 
				  <input type="hidden" id="advance_open_Stop_min" name="advance_open_Stop_min" /> <!-- 止损限价最小值 --> 
                  <p class="gez-ts-info" id="advance_open_stopOperate"></p>
                </td>
               </tr>
               <tr class="tr-bg" name="advance">
                <th valign="top">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</th>
                <td class="r-nonebor">
                  <div class="shous-lay" id="advance_open_orderVolumeSelSpan">
                     <input id="advance_open_orderVolumeInput"  class="input-text shous-inp-fon" type="text">
                     <div class="shang-xia" id="advance_open_orderVolumeSel-btn"><i class="down onn-mar"></i></div>
                     <ul class="shang-xia-con" id="advance_open_orderVolumeSel" style="display:none;"></ul>
                     <p class="shouw-lay-info"><input class="vcen" name="advance_open_defaultOrderVolumeCheckbox" id="advance_open_defaultOrderVolumeCheckbox" type="checkbox">默认手数</p>
                  </div>
                  <p class="gez-ts-info" id="advance_open_orderVolumeRange"></p>
                </td>
               </tr>
               <tr name="advance">
                <th>保&nbsp;&nbsp;证&nbsp;&nbsp;金：</th>
                <td class="r-nonebor"><span id="advance_open_pendingMargin"></span>USD</td>
               </tr>
               
               <tr name="advance">
                <th width="96" class="t-bnone">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仓：</th>
                <td class="t-bnone r-nonebor">
                  <select id="advance_close_orderBusiTypeSel"></select>
                </td>
               </tr>
               <tr class="tr-bg" name="advance">
                <th>买&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖：</th>
                <td class="r-nonebor"><span class="t-sppad" id="advance_close_pendingOrderTradedType">---</span></td>
               </tr>
               <tr class="tr-bg" name="advance">
                <th valign="top">限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="advance_close_limitPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="advance_close_Limit_max" name="advance_close_Limit_max" /> <!-- 限价最大值 --> 
				  <input type="hidden" id="advance_close_Limit_min" name="advance_close_Limit_min" /> <!-- 限价最小值 --> 
                  <p class="gez-ts-info" id="advance_close_limitOperate"></p>
                </td>
               </tr>
               <tr name="advance">
                <th valign="top">停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损：</th>
                <td class="r-nonebor">
                  <div class="touz-addjian">
                    <input type="text" id="advance_close_stopPrice" class="input-text vcen" />
                  </div>
                  <input type="hidden" id="advance_close_Stop_max" name="advance_close_Stop_max" /> <!-- 止损限价最大值 --> 
				  <input type="hidden" id="advance_close_Stop_min" name="advance_close_Stop_min" /> <!-- 止损限价最小值 --> 
                  <p class="gez-ts-info" id="advance_close_stopOperate"></p>
                </td>
               </tr>
               
               <tr class="tr-bg" name="advance">
                <th>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</th>
                <td class="r-nonebor"><span class="t-sppad2"><input type="radio" id="advance_defaultExpir" value='0' checked="checked"
						class="vcen" name="advance_radioExpir"  /> 当日有效</span><input type="radio" id="advance_defaultExpir" value='1'
					class="vcen" name="advance_radioExpir"  /> 当周有效</td>
               </tr>
             </tbody>
           </table>
        <p class="more-lls-btn gez-btninfo"  id="pendingOrderP"><a href="javascript:" id="btnOrderOK">确定</a><a href="javascript:" id="btnOrderCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="gez-qx-btn">取消</a></p>
        <p class="more-lls-btn gez-btninfo"  id="advamcePendingOrderP"><a href="javascript:" id="btnAdvanceOrderOK">确定</a><a href="javascript:" id="btnAdvanceOrderCancel" onclick="closeWindowDiv('#marketAndPendingOrderDiv');" class="gez-qx-btn">取消</a></p>
        <!--委托下单End-->
    
      
     <!--委托下单提交中begin-->
         <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessPendingOrderTable">
          <tbody>
            <tr class="tr-bg" id="submitedSuccessPendingOrderTr">
             <td class="t-bnone t-cen submit-t-fon r-nonebor">
                 <span id="pendOrderSuccessMsg" class="mm-succ-icon bold" style="width:50px"></span>   <!-- 成功 -->
        	     <span id="pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 --> 
             </td>
            </tr>
          </tbody>
         </table>
        
    <!--委托下单提交中end-->
   
     <!--委托下单失败begin-->
        <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailedPendingOrderTable">
          <tbody>
            <tr class="tr-bg">
             <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失败</span></td>
            </tr>
            <tr>
             <td class="t-cen r-nonebor">
               <p class="mm-fail-p" id="pendingOrderErrorMessage"></p>
             </td>
            </tr>
          </tbody>
         </table>
          <!--委托下单失败end-->
       
 
    
    
    <!--进阶委托下单 提交中或成功 -->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedSuccessAdvancePendingOrderTable">
        <tbody>
           <tr class="tr-bg" id="submitedSuccessAdvancePendingOrderTr">
           	    <td class="t-bnone t-cen submit-t-fon r-nonebor">
           	        <span id="advance_pendOrderSuccessMsg" class="mm-succ-icon bold"></span>   <!-- 成功 -->
           	        <span id="advance_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span> <!-- 提交中 -->
           	    </td>
           </tr>
        </tbody>
    </table>
    <!--进阶委托下单提交失败-->
    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" id="submitedFailedAdvancePendingOrderTable">
       <tbody>	 
          <tr class="tr-bg">
              <td class="t-bnone t-cen r-nonebor"><span class="mm-fail-icon bold">失败</span></td>
          </tr>
	      <tr>
	          <td class="t-cen r-nonebor">
              	 <p class="mm-fail-p" id="advance_pendingOrderErrorMessage"></p>
              </td>
	     </tr>
      </tbody>
    </table>
    </div>
   <!--委托下单end-->
        
      </div>
      <p class="more-lls-btn gez-btninfo del-wid" id="marketC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
      <p class="more-lls-btn gez-btninfo del-wid" id="pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
      <p class="more-lls-btn gez-btninfo del-wid" id="marketFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p> 
      <p class="more-lls-btn gez-btninfo del-wid" id="pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
      <p class="more-lls-btn gez-btninfo del-wid" id="advance_pendingOrderC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
      <p class="more-lls-btn gez-btninfo del-wid" id="advance_pendingOrderFC"><a href="javascript:" onclick="closeWindowDiv('#marketAndPendingOrderDiv');">关闭</a></p>
    </div>
  </div>
</div>
<!--市价下单&委托下单 end-->