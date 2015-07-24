<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- 格子报价 -->
<div class="grid_quote_box">
	<div class="grid_scroll">
		<ul class="quote_item clearfix">
			
			<li id="li_llg">
	            <div id="close_div_llg" class="stop_div" style="display:none">
	            	<div class="closed_txt">已关闭</div>
	            </div>
	            <div id="timer_div_llg" class="stop_div" style="display:none">
	            	<div class="open_time">距离开市<br><span id="timer_time_llg" class="time">00:19:54</span></div>
	            </div>
				
				<div class="quote_top">
					<a href="javascript://" class="qt_icon1" title="产品属性" id="btn_gold_productAttribute">产品属性</a>
					<a href="javascript://" class="qt_icon2" title="价格明细" id="btn_gold_tickPriceList">价格明细</a>
					<strong class="name">伦敦金</strong>
					<span class="time" id="box_022_localTime">--</span>
				</div>
				<div class="min_max">
					<span class="max fr">最高<span id="box_022_high">---</span></span>
					<span class="min"   >最低<span id="box_022_low">---</span></span>
				</div>
				<div class="quote_price_box">
					<span class="quote_num" id="box_022_spread">---</span>
					<div class="quote_sell" onclick="QuotationGTS.callModifyFun('022', 1);">
						<strong class="name">卖出</strong> <span class="price" id="box_022_bid">---</span>
					</div>
					<div class="quote_buy" onclick="QuotationGTS.callModifyFun('022', 0);">
						<strong class="name">买入</strong> <span class="price" id="box_022_ask">---</span>
					</div>
				</div>
			</li>
			
			<li id="li_lls">
				<div id="close_div_lls" class="stop_div" style="display:none">
	            	<div class="closed_txt">已关闭</div>
	            </div>
	            <div id="timer_div_lls" class="stop_div" style="display:none">
	            	<div class="open_time">距离开市<br><span id="timer_time_lls" class="time">00:19:54</span></div>
	            </div>
			
				<div class="quote_top">
					<a href="javascript://" class="qt_icon1" title="产品属性" id="btn_silver_productAttribute">产品属性</a>
					<a href="javascript://" class="qt_icon2" title="价格明细" id="btn_silver_tickPriceList">价格明细</a>
					<strong class="name">伦敦银</strong>
					<span class="time" id="box_023_localTime">--</span>
					
				</div>
				<div class="min_max">
					<span class="max fr">最高<span id="box_023_high">---</span></span>
					<span class="min"   >最低<span id="box_023_low">---</span></span>
				</div>
				<div class="quote_price_box">
					<span class="quote_num" id="box_023_spread">---</span>
					<div class="quote_sell" onclick="QuotationGTS.callModifyFun('023', 1);">
						<strong class="name">卖出</strong> <span class="price" id="box_023_bid">---</span>
					</div>
					<div class="quote_buy" onclick="QuotationGTS.callModifyFun('023', 0);">
						<strong class="name">买入</strong> <span class="price" id="box_023_ask">---</span>
					</div>
				</div>
			</li>
			
			<li id="li_usdinx"  class="stop_business">
				<div class="quote_top">
					<strong class="name">美元指数</strong>
					<span class="time" id="box_050_localTime">--</span>
					
				</div>
				<div class="min_max">
					<span class="max fr">最高<span id="box_050_high">---</span></span>
					<span class="min"   >最低<span id="box_050_low">---</span></span>
				</div>
				<div class="quote_price_box">
					<span class="quote_num" style="display:none" id="box_050_spread">---</span>
					<div class="quote_sell" onclick="javascript:Alert('参考行情，不提供交易服务。')">
						<strong class="name">卖出</strong> <span class="price" id="box_050_bid">---</span>
					</div>
					<div class="quote_buy" onclick="javascript:Alert('参考行情，不提供交易服务。')">
						<strong class="name">买入</strong> <span class="price" id="box_050_ask">---</span>
					</div>
				</div>
			</li>
			
			<li id="li_oil" class="stop_business">
				<div class="quote_top">
					<strong class="name">纽约期油</strong>
					<span class="time" id="box_00E_localTime">--</span>
					
				</div>
				<div class="min_max">
					<span class="max fr">最高<span id="box_00E_high">---</span></span>
					<span class="min"   >最低<span id="box_00E_low">---</span></span>
				</div>
				<div class="quote_price_box">
					<span class="quote_num" style="display:none" id="box_00E_spread">---</span>
					<div class="quote_sell" onclick="javascript:Alert('参考行情，不提供交易服务。')">
						<strong class="name">卖出</strong> <span class="price" id="box_00E_bid">---</span>
					</div>
					<div class="quote_buy" onclick="javascript:Alert('参考行情，不提供交易服务。')">
						<strong class="name">买入</strong> <span class="price" id="box_00E_ask">---</span>
					</div>
				</div>
			</li>
			
		</ul>
	</div>
</div>

<script type="text/javascript">
//报价切换
$("#quoteTab li a").click(function(){
	var curEle = $(this);
	var curUb = $("#quoteTab li a").index(curEle);
	$("#quoteTab li a").removeClass("current").eq(curUb).addClass("current");
	$(".quote_content > div").eq(curUb).show().siblings().hide();
	
	$('#silver_attribute_box').hide();
	$('#gold_tickPriceListBox').hide();
	$('#silver_tickPriceListBox').hide();
	$('#gold_attribute_box').hide();
	
});

//放大 缩小
//mleft
$("#mleft_zoom").click(function(){ 
	var curEle = $(this);
	if(curEle.attr("class") === "zooming_btn"){
		$(".mleft_box").addClass("mleft_big");
		curEle.removeClass("zooming_btn").addClass("zooming_btn_shrink");
		$(".mright_box,.trade_data_box").hide();
	}else if(curEle.attr("class") === "zooming_btn_shrink"){
		$(".mleft_box").removeClass("mleft_big");
		curEle.removeClass("zooming_btn_shrink").addClass("zooming_btn");
		$(".mright_box,.trade_data_box").show(200);
	}
});
</script>
<!--格子报价 end-->