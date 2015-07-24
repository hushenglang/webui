
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>		     
	<!--格子報價begin-->
           <div class="scroll-data scroll-data-jq clearfix">
              <ul class="gez-datalist fl" id='quotationBoxId'>
                <li class="clearfix">
                  <div class="lls-ldj fl">
                    <h3>倫敦金</h3>
                    <p class="gd-price">最高 <span id="box_022_high">--</span></p>
                    <p>最低 <span id="box_022_low">--</span></p>
                    <p class="date-fon">最後更新 <span id="box_022_localTime">16:12:12</span></p>
                  </div>
                  <div id="opentrade_gold" class="buy-sell fr">
                      <!-- 倒計時begin -->
		              <div id="timer_div1_llg" style="display:none" class="dajs-tim-ts"></div>
		              <div id="timer_div2_llg" style="display:none" class="dajs-text-ts">
		               <p class="djs-tt-at">距離開市</p>
		               <p><span id="timer_time_llg"></span></p>
		              </div>
	                 <!-- 倒計時end -->
	                 <!-- 交易關閉begin -->
	                 <div id="trade_swicth_div1_llg" style="" class="dajs-tim-ts"></div>
	                 <div id="trade_swicth_div2_llg" style="" class="dajs-text-ts">
	                 <p class="djs-tt-at"></p>
	                 <p>已關閉</p>
	                 </div>
	                 <!-- 交易關閉end -->
                    <span class="lls-cdata bold" id="box_022_spread">0</span>
                    <div class="clearfix">
                      <p class="bs-jiaqian lls-box-fon5 fl" onclick="QuotationGTS.callModifyFun('022', 1);">
                        <span class="mai-cont1 bold" id="box_022_bid">---</span>
                      </p>
                      <p class="bs-count lls-box-fon6 fr" onclick="QuotationGTS.callModifyFun('022', 0);">
                        <span class="mai-cont2 bold" id="box_022_ask">---</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li class="clearfix">
                  <div class="lls-ldj fl">
                    <h3>倫敦銀</h3>
                    <p class="gd-price">最高 <span id="box_023_high">---</span></p>
                    <p>最低 <span id="box_023_low">---</span></p>
                    <p class="date-fon">最後更新 <span id="box_023_localTime"></span></p>
                  </div>
                  <div id="opentrade_siliver" class="buy-sell fr">
	                  <!-- 倒計時begin -->
		             <div id="timer_div1_lls" style="display:none" class="dajs-tim-ts"></div>
		             <div id="timer_div2_lls" style="display:none" class="dajs-text-ts">
		               <p class="djs-tt-at">距離開市：</p>
		               <p><span id="timer_time_lls"></span></p>
		             </div>
		             <!-- 倒計時end -->
		             <!-- 交易關閉begin -->
	             <div id="trade_swicth_div1_lls" style="" class="dajs-tim-ts"></div>
	             <div id="trade_swicth_div2_lls" style="" class="dajs-text-ts">
	               <p class="djs-tt-at"></p>
	               <p>已關閉</p>
	             </div>
	             <!-- 交易關閉end -->
                    <span class="lls-cdata bold" id="box_023_spread">0</span>
                    <div class="clearfix">
                      <p class="bs-jiaqian lls-box-fon5 fl" onclick="QuotationGTS.callModifyFun('023', 1);">
                        <span class="mai-cont1 bold" id="box_023_bid">---</span>
                      </p>
                      <p class="bs-count lls-box-fon6 fr" onclick="QuotationGTS.callModifyFun('023', 0);">
                        <span class="mai-cont2 bold" id="box_023_ask">---</span>
                      </p>
                    </div>
                  </div>
                  <div id="closetrade_siliver" style="display:none;margin:auto;" class="buy-sell">
				    <span style="color:black">暫停交易</span>
			      </div>
                </li>
              </ul>
                <!--資金begin-->
                <%@ include file="../accountInfo/accountBaseInfo-tw.jsp" %>
                <!--資金end-->
                <!--ad begin-->
                <div class="ad-box fl">
                  <div class="ad-data"><a href="http://www.24k.hk/zh/sponsorship/swansea-news.html" target="_blank""><img src="<%=request.getContextPath()%>/mobile/images/MobileGTS_Banner_B5.jpg" width="100%" height="168" alt=""></a></div>
                  <p class="online-service clearfix">
                    <a href="javascript:" id="btn_box_online" class="fl"><img src="<%=request.getContextPath()%>/mobile/images/btn-ser.png" alt="在線客服"></a>
                    <a href="javascript:" id="btn_box_qq" class="fl"><img src="<%=request.getContextPath()%>/mobile/images/btn-qq.png" alt="QQ客服"></a>
                  </p>
                </div>
                <!--ad end-->
              <!--動態報價牌begin-->
              <!--列表報價begin-->
			  <div id="Tick2List" class="dongt-data" style="overflow-x: scroll;">
			    <table tip="close" cellpadding="0" cellspacing="0" class="liebiao-tabox" id="quotationTableId">
				    <thead>
				    <tr>
						<th>名稱</th>
						<th>賣價</th>
						<th>買價</th>
						<th>現價</th>
						<th>最高</th>
						<th>最低</th>
						<th>開盤</th>
						<th>前收市</th>
						<th>賣利率</th>
						<th>買利率</th>
						<th>升跌</th>
						<th>升跌幅度</th>
					    <th>時間</th>
					    <th>代碼</th>
				    </tr>
				   </thead>
			    </table>
			  </div>
              <!--動態報價牌end-->
            </div>
		    <!--格子報價end-->