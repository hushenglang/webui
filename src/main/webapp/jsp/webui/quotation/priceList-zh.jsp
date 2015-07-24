<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

 <!--产品属性 begin-->
 <div class="product_attr dn" id="gold_attribute_box">
     <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_gold_productAttribute">关闭</a><span class="name">产品属性</span></h2>
     <div id="jgConbox">
         <table border="0" cellspacing="0" cellpadding="0" class="jg_table hy_table"  width="100%">
          <tbody>
            <tr class="tr-bg">
             <td>合约单位(每手)</td>
             <td>100盎司</td>
            </tr>
            <tr>
             <td>货币单位</td>
             <td>USD</td>
            </tr>
            <tr class="tr-bg">
             <td>小数位</td>
             <td>2</td>
            </tr>
            <tr>
             <td>点差</td>
             <td><span id="pddesc_gold_spread">--</span>美元</td>
            </tr>
            <tr class="tr-bg">
             <td>单笔交易手数</td>
             <td><span id="pddesc_gold_min_lot">--</span>手~<span id="pddesc_gold_max_lot">--</span>手</td>
            </tr>
            <tr>
             <td>手数差值</td>
             <td><span id="pddesc_gold_lot_step">--</span>手</td>
            </tr>
            <tr class="tr-bg">
             <td>持仓上限</td>
             <td><span id="pddesc_gold_position_max">--</span>手</td>
            </tr>
            <tr>
             <td>即市保证金</td>
             <td><span id="pddesc_gold_immed_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>即市强制平仓</td>
             <td>保证金比例 ≤ <span id="pddesc_gold_margin_percent">--</span>%</td>
            </tr>
            <tr>
             <td>过市保证金(假日及周末)</td>
             <td><span id="pddesc_gold_after_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>过市强制平仓(假日及周末)</td>
             <td>低于2000美元/手</td>
            </tr>
            <tr>
             <td>锁仓保证金</td>
             <td>锁仓订单保证金总和的1/4</td>
            </tr>
            <tr class="tr-bg">
             <td>保证金风险提示</td>
             <td>保证金比例≤ <span id="pddesc_gold_margin_risktip">--</span>%</td>
            </tr>
            <tr>
             <td>隔夜利息(买/卖)</td>
             <td><span id="pddesc_gold_sell_interest">--</span>%/<span id="pddesc_gold_buy_interest">--</span>%</td>
            </tr>
            <tr class="tr-bg">
             <td>三天利息日</td>
             <td>周六</td>
            </tr>
            <tr>
             <td>交易时间</td>
             <td>周一08：00 至 周六03：00</td>
            </tr>
            <tr class="tr-bg">
             <td>结算时间</td>
             <td>04:00:00（每日)<br/>03:00:00（周末)</td>
            </tr>
            <tr>
             <td colspan="2"><p class="hy_info">注：本公司保留对以上数据可因应市场情况而调整的权利。</p></td>
            </tr>
          </tbody>
         </table>
       </div>
 </div>
 <!--产品属性 end-->
 
 <!-- 黄金价格明细 -->
<div class="price_dect_box dn" id="gold_tickPriceListBox">
  <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_gold_tickPriceList">关闭</a><span class="name">价格明细</span></h2>
  <div class="layer-con lay-no-pad">
    <div id="jgConbox">
      <div class="jg_head">
      	<table border="0" cellspacing="0" cellpadding="0" class="jg_table" width="100%">
           <colgroup>
           	<col width="72" />
           	<col/>
           </colgroup>
           <tr>
			 <th>时间</th>
             <th>价格</th>
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
<!--价格明细 end-->

<!-- 白银价格明细 -->
<div class="price_dect_box dn" id="silver_tickPriceListBox">
   <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_silver_tickPriceList">关闭</a><span class="name">价格明细</span></h2>
  <div class="layer-con lay-no-pad">
    <div id="jgConbox">
      <div class="jg_head">
      	<table border="0" cellspacing="0" cellpadding="0" class="jg_table" width="100%">
           <colgroup>
         	<col width="72" />
            <col/>
         	</colgroup>
           <tr>
			 <th>时间</th>
             <th>价格</th>
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
<!--价格明细 end-->

<!--产品属性 begin-->
 <div class="product_attr dn" id="silver_attribute_box">
     <h2 class="price_tit"><a href="javascript://" class="not_close" id="btn_close_silver_productAttribute">关闭</a><span class="name">产品属性</span></h2>
     <div id="jgConbox">
         <table border="0" cellspacing="0" cellpadding="0" class="jg_table hy_table"  width="100%">
          <tbody>
            <tr class="tr-bg">
             <td>合约单位(每手)</td>
             <td>5000盎司</td>
            </tr>
            <tr>
             <td>货币单位</td>
             <td>USD</td>
            </tr>
            <tr class="tr-bg">
             <td>小数位</td>
             <td>3</td>
            </tr>
            <tr>
             <td>点差</td>
             <td><span id="pddesc_silver_spread">--</span>美元</td>
            </tr>
            <tr class="tr-bg">
             <td>单笔交易手数</td>
             <td><span id="pddesc_silver_min_lot">--</span>手~<span id="pddesc_silver_max_lot">--</span>手</td>
            </tr>
            <tr>
             <td>手数差值</td>
             <td><span id="pddesc_silver_lot_step">--</span>手</td>
            </tr>
            <tr class="tr-bg">
             <td>持仓上限</td>
             <td><span id="pddesc_silver_position_max">--</span>手</td>
            </tr>
            <tr>
             <td>即市保证金</td>
             <td><span id="pddesc_silver_immed_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>即市强制平仓</td>
             <td>保证金比例 ≤ <span id="pddesc_silver_margin_percent">--</span>%</td>
            </tr>
            <tr>
             <td>过市保证金(假日及周末)</td>
             <td><span id="pddesc_silver_after_margin">--</span>美元/手</td>
            </tr>
            <tr class="tr-bg">
             <td>过市强制平仓(假日及周末)</td>
             <td>低于2000美元/手</td>
            </tr>
            <tr>
             <td>锁仓保证金</td>
             <td>锁仓订单保证金总和的1/4</td>
            </tr>
            <tr class="tr-bg">
             <td>保证金风险提示</td>
             <td>保证金比例≤ <span id="pddesc_silver_margin_risktip">--</span>%</td>
            </tr>
            <tr>
             <td>隔夜利息(买/卖)</td>
             <td><span id="pddesc_silver_buy_interest">--</span>%/<span id="pddesc_silver_sell_interest">--</span>%</td>
            </tr>
            <tr class="tr-bg">
             <td>三天利息日</td>
             <td>周六</td>
            </tr>
            <tr>
             <td>交易时间</td>
             <td>周一08：00 至 周六03：00</td>
            </tr>
            <tr class="tr-bg">
             <td>结算时间</td>
             <td>04:00:00（每日)<br/>03:00:00（周末)</td>
            </tr>
            <tr>
             <td colspan="2"><p class="hy_info">注：本公司保留对以上数据可因应市场情况而调整的权利。</p></td>
            </tr>
          </tbody>
         </table>
       </div>
 </div>
 <!--产品属性 end-->
 
<script type="text/javascript">
	//黄金价格明细
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
	
	//产品参数初始化
	$(function(){
		socket.listeners.$after({
			//取得点差
			"SymbolList": function(para, data){
				//产品参数初始化
				var goldPrdObj = QuotationGTS.getSymbolArrayByPrdcode("022");
				$("#pddesc_gold_min_lot").text(goldPrdObj.minlot); //最小手数
				$("#pddesc_gold_max_lot").text(goldPrdObj.maxlot); //最大手数
				$("#pddesc_gold_lot_step").text(goldPrdObj.unitlot); //手数步长
				$("#pddesc_gold_position_max").text(goldPrdObj.lotlimit); //最大持仓
				$("#pddesc_gold_immed_margin").text(goldPrdObj.inimargin); //即市保证金
				$("#pddesc_gold_after_margin").text(goldPrdObj.weekendmargin); //过市保证金
				$("#pddesc_gold_sell_interest").text(goldPrdObj.buyinterest*100); //隔夜利息(买)
				$("#pddesc_gold_buy_interest").text(goldPrdObj.sellinterest*100); //隔夜利息(卖)
			
				//产品参数初始化
				var siliverPrdObj = QuotationGTS.getSymbolArrayByPrdcode("023");
				$("#pddesc_silver_min_lot").text(siliverPrdObj.minlot); //最小手数
				$("#pddesc_silver_max_lot").text(siliverPrdObj.maxlot); //最大手数
				$("#pddesc_silver_lot_step").text(siliverPrdObj.unitlot); //手数步长
				$("#pddesc_silver_position_max").text(siliverPrdObj.lotlimit); //最大持仓
				$("#pddesc_silver_immed_margin").text(siliverPrdObj.inimargin); //即市保证金
				$("#pddesc_silver_after_margin").text(siliverPrdObj.weekendmargin); //过市保证金
				$("#pddesc_silver_sell_interest").text(siliverPrdObj.sellinterest*100); //隔夜利息(买)
				$("#pddesc_silver_buy_interest").text(siliverPrdObj.buyinterest*100); //隔夜利息(卖)
				
			},
			
			"tick": function(para, data){
				$("#pddesc_gold_spread").text(Tick.gold.spread); //点差
				$("#pddesc_silver_spread").text(Tick.silver.spread); //点差
			},
			
			"trade_config_notify": function(para, data){
				$("#pddesc_gold_margin_risktip").text(para.warnratio*100); //保证金风险提示
				$("#pddesc_silver_margin_risktip").text(para.warnratio*100); //保证金风险提示
				
				$("#pddesc_gold_margin_percent").text(para.minratio*100); //保证金比例
				$("#pddesc_silver_margin_percent").text(para.minratio*100); //保证金比例
			},
		});
		
	});
</script>
