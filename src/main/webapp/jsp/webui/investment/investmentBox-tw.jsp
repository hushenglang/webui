<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="trade_data_box">
	<div class="titBar_box">
		<a href="javascript://" class="zooming_btn" id="trade_zoom"></a>
		<ul class="tab_item data_tab clearfix" id="posDataTab">
			<li>
				<a href="javascript://" class="current">持倉部位
					<span class="pos_num" id="accountPositions_posnum">0</span>
				</a>
			</li>
			<li class="yet"><a href="javascript://">已平倉部位
					<span class="pos_num" id="closedPosition_amount_num">0</span>
				</a></li>
			<li>
				<a href="javascript://">當日委托
					<span class="pos_num" id="pendingOrder_posnum">0</span>
				</a>
			</li>
			<li class="acc">
				<a href="javascript://">賬戶總結(<span class="acc_num" id="accountSummary_amount_num">--</span>)
				</a>
			</li>
			<li><a href="javascript://">實時動態</a></li>
		</ul>
	</div>
	<div class="trade_data_content">
		
		<!-- 1. the part of 持倉部位 -->
		<div class="data_content">
			<table id="accountPositionsTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="da_table line_bet1">
			</table>
			<div class="dynamicinfo_data_info"></div>
		</div>

		<!-- 2. the part of 已平倉部位 -->
		<div class="data_content" style="display: none">
			<table id="closedPositionTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="da_table line_bet2">
			</table>
			<div class="dynamicinfo_data_info"></div>
		</div>
		
		<!-- 3. the part of 當日委托-->
		<div class="data_content" style="display: none">
			<table id="pendingOrderTables" width="100%" border="0" cellspacing="0" cellpadding="0" class="da_table line_bet3">
			</table>
			<div class="dynamicinfo_data_info"></div>
		</div>
		
		<!-- 4. the part of 帳戶總結-->
		<div class="data_content" style="display: none">
			<table id="accountSummaryTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="da_table line_bet4">
			</table>
			<div class="dynamicinfo_data_info"></div>
		</div>
		
		<!-- 5. the part of 實時動態-->
		<div class="data_content" style="display: none">
			<table id="dynamicUpdatesTable" width="100%" border="0" cellspacing="0" cellpadding="0"
				class="da_table da_3noborer">
			</table>
			<div class="dynamicinfo_data_info"></div>
		</div>

	</div>
	
</div>

<script type="text/javascript">
$(function(){

	//持倉切換
	$("#posDataTab li a").click(function(){
		var curEle = $(this);
		var curUb = $("#posDataTab li a").index(curEle);
		$("#posDataTab li a").removeClass("current").eq(curUb).addClass("current");
		$(".trade_data_content > div").eq(curUb).show().siblings().hide();
	});
	
	//trade
	$("#trade_zoom").click(function(){
		var curEle = $(this);
		if(curEle.attr("class") === "zooming_btn"){
			$(".trade_data_box").addClass("trade_big");
			curEle.removeClass("zooming_btn").addClass("zooming_btn_shrink");
			$(".mright_box,.mleft_box").hide();
			$(".trade_data_content .dataTables_scrollBody").height(500);
			//autoScreenHeight();
		}else if(curEle.attr("class") === "zooming_btn_shrink"){
			$(".trade_data_box").removeClass("trade_big");
			curEle.removeClass("zooming_btn_shrink").addClass("zooming_btn");
			$(".mright_box,.mleft_box").show(200);
			$(".trade_data_content .dataTables_scrollBody").height("auto");
			autoScreenHeight();
		}
	});
	
	//自適應屏高
	autoScreenHeight();
	$(window).resize(autoScreenHeight);
	
	function autoScreenHeight(){
		var bodyH = $(window).height();
		var addH = bodyH - 771;
		if(addH > 0){
			$(".trade_data_content .dataTables_scrollBody").height(addH + 120);
		}else{
			$(".trade_data_content .dataTables_scrollBody").height(" ");
		}
		
		var bodyW = $(window).width();
		var addW = bodyW - 37;
		if(addW>=1108){
			$(".da_table").width(addW);
		}else{
			$(".da_table").width(" ");
		}
	}
	
});
</script>