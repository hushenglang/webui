
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>		     
	<!--格子报价begin-->
           <div class="scroll-data scroll-data-jq clearfix">
              <ul class="gez-datalist fl" id='quotationBoxId'>
                <li class="clearfix">
                  <div class="lls-ldj fl">
                    <h3>伦敦金</h3>
                    <p class="gd-price">最高 <span id="box_022_high">--</span></p>
                    <p>最低 <span id="box_022_low">--</span></p>
                    <p class="date-fon">最后更新 <span id="box_022_localTime">16:12:12</span></p>
                  </div>
                  <div id="opentrade_gold" class="buy-sell fr">
                      <!-- 倒计时begin -->
		              <div id="timer_div1_llg" style="display:none" class="dajs-tim-ts"></div>
		              <div id="timer_div2_llg" style="display:none" class="dajs-text-ts">
		               <p class="djs-tt-at">距离开市</p>
		               <p><span id="timer_time_llg"></span></p>
		              </div>
	                 <!-- 倒计时end -->
	                 <!-- 交易关闭begin -->
	                 <div id="trade_swicth_div1_llg" style="" class="dajs-tim-ts"></div>
	                 <div id="trade_swicth_div2_llg" style="" class="dajs-text-ts">
	                 <p class="djs-tt-at"></p>
	                 <p>已关闭</p>
	                 </div>
	                 <!-- 交易关闭end -->
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
                    <h3>伦敦银</h3>
                    <p class="gd-price">最高 <span id="box_023_high">---</span></p>
                    <p>最低 <span id="box_023_low">---</span></p>
                    <p class="date-fon">最后更新 <span id="box_023_localTime"></span></p>
                  </div>
                  <div id="opentrade_siliver" class="buy-sell fr">
	                  <!-- 倒计时begin -->
		             <div id="timer_div1_lls" style="display:none" class="dajs-tim-ts"></div>
		             <div id="timer_div2_lls" style="display:none" class="dajs-text-ts">
		               <p class="djs-tt-at">距离开市：</p>
		               <p><span id="timer_time_lls"></span></p>
		             </div>
		             <!-- 倒计时end -->
		             <!-- 交易关闭begin -->
	             <div id="trade_swicth_div1_lls" style="" class="dajs-tim-ts"></div>
	             <div id="trade_swicth_div2_lls" style="" class="dajs-text-ts">
	               <p class="djs-tt-at"></p>
	               <p>已关闭</p>
	             </div>
	             <!-- 交易关闭end -->
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
				    <span style="color:black">暂停交易</span>
			      </div>
                </li>
              </ul>
                <!--资金begin-->
                <%@ include file="../accountInfo/accountBaseInfo-zh.jsp" %>
                <!--资金end-->
                <!--ad begin-->
                <div class="ad-box fl">
                  <div class="ad-data"><a href="http://www.24k.hk/zh/sponsorship/swansea-news.html" target="_blank"><img src="<%=request.getContextPath()%>/mobile/images/MobileGTS_Banner_CN.jpg" width="100%" height="168" alt=""></a></div>
                  <p class="online-service clearfix">
                    <a href="javascript:" id="btn_box_online" class="fl"><img src="<%=request.getContextPath()%>/mobile/images/btn-ser.png" alt="在线客服"></a>
                    <a href="javascript:" id="btn_box_qq" class="fl"><img src="<%=request.getContextPath()%>/mobile/images/btn-qq.png" alt="QQ客服"></a>
                  </p>
                </div>
                <!--ad end-->
              <!--动态报价牌begin-->
              <!--列表报价begin-->
			  <div id="Tick2List" class="dongt-data" style="overflow-x: scroll;">
			    <table tip="close" cellpadding="0" cellspacing="0" class="liebiao-tabox" id="quotationTableId">
				    <thead>
				    <tr>
						<th>名称</th>
						<th>卖价</th>
						<th>买价</th>
						<th>现价</th>
						<th>最高</th>
						<th>最低</th>
						<th>开盘</th>
						<th>昨收</th>
						<th>卖利率</th>
						<th>买利率</th>
						<th>升跌</th>
						<th>升跌幅度</th>
					    <th>时间</th>
					    <th>代码</th>
				    </tr>
				   </thead>
			    </table>
			  </div>
              <!--动态报价牌end-->
            </div>
		    <!--格子报价end-->