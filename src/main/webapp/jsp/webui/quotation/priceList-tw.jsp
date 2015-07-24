<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

 <!--產品屬性 begin-->
 <div class="product_attr dn" id="gold_attribute_box">
     <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_gold_productAttribute">關閉</a><span class="name">產品屬性</span></h2>
     <div id="jgConbox">
         <table border="0" cellspacing="0" cellpadding="0" class="jg_table hy_table"  width="100%">
          <tbody>
            <tr class="tr-bg">
             <td>合約單位(每手)</td>
             <td>100盎司</td>
            </tr>
            <tr>
             <td>貨幣單位</td>
             <td>USD</td>
            </tr>
            <tr class="tr-bg">
             <td>小數位</td>
             <td>2</td>
            </tr>
            <tr>
             <td>點差</td>
             <td><span id="pddesc_gold_spread">--</span>美元</td>
            </tr>
            <tr class="tr-bg">
             <td>單筆交易手數</td>
             <td><span id="pddesc_gold_min_lot">--</span>手~<span id="pddesc_gold_max_lot">--</span>手</td>
            </tr>
            <tr>
             <td>手數差值</td>
             <td><span id="pddesc_gold_lot_step">--</span>手</td>
            </tr>
            <tr class="tr-bg">
             <td>持倉上限</td>
             <td><span id="pddesc_gold_position_max">--</span>手</td>
            </tr>
            <tr>
             <td>即市保證金</td>
             <td><span id="pddesc_gold_immed_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>即市強制平倉</td>
             <td>保證金比例 ≤ <span id="pddesc_gold_margin_percent">--</span>%</td>
            </tr>
            <tr>
             <td>過市保證金(假日及周末)</td>
             <td><span id="pddesc_gold_after_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>過市強制平倉(假日及周末)</td>
             <td>低於2000美元/手</td>
            </tr>
            <tr>
             <td>鎖倉保證金</td>
             <td>鎖倉訂單保證金總和的1/4</td>
            </tr>
            <tr class="tr-bg">
             <td>保證金風險提示</td>
             <td>保證金比例≤ <span id="pddesc_gold_margin_risktip">--</span>%</td>
            </tr>
            <tr>
             <td>隔夜利息(買/賣)</td>
             <td><span id="pddesc_gold_sell_interest">--</span>%/<span id="pddesc_gold_buy_interest">--</span>%</td>
            </tr>
            <tr class="tr-bg">
             <td>三天利息日</td>
             <td>周六</td>
            </tr>
            <tr>
             <td>交易時間</td>
             <td>周一08：00 至 周六03：00</td>
            </tr>
            <tr class="tr-bg">
             <td>結算時間</td>
             <td>04:00:00（每日)<br/>03:00:00（周末)</td>
            </tr>
            <tr>
             <td colspan="2"><p class="hy_info">註：本公司保留對以上數據可因應市場情況而調整的權利。</p></td>
            </tr>
          </tbody>
         </table>
       </div>
 </div>
 <!--產品屬性 end-->
 
 <!-- 黃金價格明細 -->
<div class="price_dect_box dn" id="gold_tickPriceListBox">
  <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_gold_tickPriceList">關閉</a><span class="name">價格明細</span></h2>
  <div class="layer-con lay-no-pad">
    <div id="jgConbox">
      <div class="jg_head">
      	<table border="0" cellspacing="0" cellpadding="0" class="jg_table" width="100%">
           <colgroup>
           	<col width="72" />
           	<col/>
           </colgroup>
           <tr>
			 <th>時間</th>
             <th>價格</th>
           </tr>
         </table>
      </div>
      <div class="jg_body">
        <table border="0" cellspacing="0" cellpadding="1" class="jg_table"  width="100%">
		 <colgroup>
           	<col width="72" />
           	<col/>
           </colgroup>
         <tbody id="gold_tickPriceListTable">
         </tbody>
        </table>
       </div>
    </div>
  </div>
</div>
<!--價格明細 end-->

<!-- 白銀價格明細 -->
<div class="price_dect_box dn" id="silver_tickPriceListBox">
   <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_silver_tickPriceList">關閉</a><span class="name">價格明細</span></h2>
  <div class="layer-con lay-no-pad">
    <div id="jgConbox">
      <div class="jg_head">
      	<table border="0" cellspacing="0" cellpadding="0" class="jg_table" width="100%">
           <colgroup>
         	<col width="72" />
            <col/>
         	</colgroup>
           <tr>
			 <th>時間</th>
             <th>價格</th>
           </tr>
         </table>
      </div>
      <div class="jg_body">
        <table border="0" cellspacing="0" cellpadding="0" class="jg_table"  width="100%">
         <colgroup>
           	<col width="72" />
           	<col/>
           </colgroup>
         <tbody id="silver_tickPriceListTable">
         </tbody>
        </table>
        </div>
      </div>
   </div>
</div>
<!--價格明細 end-->

<!--產品屬性 begin-->
 <div class="product_attr dn" id="silver_attribute_box">
     <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_silver_productAttribute">關閉</a><span class="name">產品屬性</span></h2>
     <div id="jgConbox">
         <table border="0" cellspacing="0" cellpadding="0" class="jg_table hy_table"  width="100%">
          <tbody>
            <tr class="tr-bg">
             <td>合約單位(每手)</td>
             <td>5000盎司</td>
            </tr>
            <tr>
             <td>貨幣單位</td>
             <td>USD</td>
            </tr>
            <tr class="tr-bg">
             <td>小數位</td>
             <td>3</td>
            </tr>
            <tr>
             <td>點差</td>
             <td><span id="pddesc_silver_spread">--</span>美元</td>
            </tr>
            <tr class="tr-bg">
             <td>單筆交易手數</td>
             <td><span id="pddesc_silver_min_lot">--</span>手~<span id="pddesc_silver_max_lot">--</span>手</td>
            </tr>
            <tr>
             <td>手數差值</td>
             <td><span id="pddesc_silver_lot_step">--</span>手</td>
            </tr>
            <tr class="tr-bg">
             <td>持倉上限</td>
             <td><span id="pddesc_silver_position_max">--</span>手</td>
            </tr>
            <tr>
             <td>即市保證金</td>
             <td><span id="pddesc_silver_immed_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>即市強制平倉</td>
             <td>保證金比例 ≤ <span id="pddesc_silver_margin_percent">--</span>%</td>
            </tr>
            <tr>
             <td>過市保證金(假日及周末)</td>
             <td><span id="pddesc_silver_after_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>過市強制平倉(假日及周末)</td>
             <td>低於2000美元/手</td>
            </tr>
            <tr>
             <td>鎖倉保證金</td>
             <td>鎖倉訂單保證金總和的1/4</td>
            </tr>
            <tr class="tr-bg">
             <td>保證金風險提示</td>
             <td>保證金比例≤ <span id="pddesc_silver_margin_risktip">--</span>%</td>
            </tr>
            <tr>
             <td>隔夜利息(買/賣)</td>
             <td><span id="pddesc_silver_buy_interest">--</span>%/<span id="pddesc_silver_sell_interest">--</span>%</td>
            </tr>
            <tr class="tr-bg">
             <td>三天利息日</td>
             <td>周六</td>
            </tr>
            <tr>
             <td>交易時間</td>
             <td>周一08：00 至 周六03：00</td>
            </tr>
            <tr class="tr-bg">
             <td>結算時間</td>
             <td>04:00:00（每日)<br/>03:00:00（周末)</td>
            </tr>
            <tr>
             <td colspan="2"><p class="hy_info">註：本公司保留對以上數據可因應市場情況而調整的權利。</p></td>
            </tr>
          </tbody>
         </table>
       </div>
 </div>
 <!--產品屬性 end-->
 
<script type="text/javascript">
	//黃金價格明細
	$('#btn_close_gold_tickPriceList').click(function(){
		$('#gold_tickPriceListBox').hide();
	});
	
	$('#btn_close_silver_tickPriceList').click(function(){
		$('#silver_tickPriceListBox').hide();
	});
	$('#btn_close_gold_productAttribute').click(function(){
		$('#gold_attribute_box').hide();
	});
	$('#btn_close_silver_productAttribute').click(function(){
		$('#silver_attribute_box').hide();
	});
	
	//產品參數初始化
	$(function(){
		socket.listeners.$after({
			//取得點差
			"SymbolList": function(para, data){
				//產品參數初始化
				var goldPrdObj = QuotationGTS.getSymbolArrayByPrdcode("022");
				$("#pddesc_gold_min_lot").text(goldPrdObj.minlot); //最小手數
				$("#pddesc_gold_max_lot").text(goldPrdObj.maxlot); //最大手數
				$("#pddesc_gold_lot_step").text(goldPrdObj.unitlot); //手數步長
				$("#pddesc_gold_position_max").text(goldPrdObj.lotlimit); //最大持倉
				$("#pddesc_gold_immed_margin").text(goldPrdObj.inimargin); //即市保證金
				$("#pddesc_gold_after_margin").text(goldPrdObj.weekendmargin); //過市保證金
				$("#pddesc_gold_sell_interest").text(goldPrdObj.buyinterest*100); //隔夜利息(買)
				$("#pddesc_gold_buy_interest").text(goldPrdObj.sellinterest*100); //隔夜利息(賣)
			
				//產品參數初始化
				var siliverPrdObj = QuotationGTS.getSymbolArrayByPrdcode("023");
				$("#pddesc_silver_min_lot").text(siliverPrdObj.minlot); //最小手數
				$("#pddesc_silver_max_lot").text(siliverPrdObj.maxlot); //最大手數
				$("#pddesc_silver_lot_step").text(siliverPrdObj.unitlot); //手數步長
				$("#pddesc_silver_position_max").text(siliverPrdObj.lotlimit); //最大持倉
				$("#pddesc_silver_immed_margin").text(siliverPrdObj.inimargin); //即市保證金
				$("#pddesc_silver_after_margin").text(siliverPrdObj.weekendmargin); //過市保證金
				$("#pddesc_silver_sell_interest").text(siliverPrdObj.sellinterest*100); //隔夜利息(買)
				$("#pddesc_silver_buy_interest").text(siliverPrdObj.buyinterest*100); //隔夜利息(賣)
				
			},
			
			"tick": function(para, data){
				$("#pddesc_gold_spread").text(Tick.gold.spread); //點差
				$("#pddesc_silver_spread").text(Tick.silver.spread); //點差
			},
			
			"trade_config_notify": function(para, data){
				$("#pddesc_gold_margin_risktip").text(para.warnratio*100); //保證金風險提示
				$("#pddesc_silver_margin_risktip").text(para.warnratio*100); //保證金風險提示
				
				$("#pddesc_gold_margin_percent").text(para.minratio*100); //保證金比例
				$("#pddesc_silver_margin_percent").text(para.minratio*100); //保證金比例
			},
		});
		
	});
</script>
