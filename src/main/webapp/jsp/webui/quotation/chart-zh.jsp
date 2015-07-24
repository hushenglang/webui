<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
	<!--图表begin-->
	<div class="chat-box">
		<!-- 图表hear bar -->
		<div class="navbox clearfix">
			<div class="navbox-l fl"></div>
			<div class="navbox-c fl">
				<div class="nav-qh clearfix">
					<a href="javascript://" class="zooming_btn" id="mright_zoom"></a>
					<ul class="fl">
						<li class="on-na">图表</li>
					</ul>
					<ul class="hu">
				       			<li><span class="huLabel">时间: </span><span id="huTime" class="huField" style="color: #DDBBBB;"></span></li>
								<li><span class="huLabel">开市: </span><span id="huOpen" class="huField" style="color: #DDBBBB;"></span></li>
								<li><span class="huLabel">最高: </span><span id="huHigh" class="huField" style="color: #DDBBBB;"></span></li>
								<li><span class="huLabel">最低: </span><span id="huLow" class="huField" style="color: #DDBBBB;"></span></li>
								<li><span class="huLabel">收市: </span><span id="huClose" class="huField" style="color: #DDBBBB;"></span></li>
				        </ul>
				</div>
			</div>
		</div>
         	
         	
        <div class="tubiao-data">
        		<!-- 工具列 -->
       	   <div class="tb-menubox clearfix">
          	<ul>
              <li class="lf-line"></li>
              <li class="select-list" style="padding-top:1.5px">
              	<select class="sel-tpad" id="symbol-select">
              	 <option value="022" selected="selected">伦敦金</option>
              	   <option value="023">伦敦银</option>
              	</select>
              </li>
               <li class="select-list" style="padding-top:1.5px">
               		<select class="sel-tpad" id="stx-chart-type-select">
               		 <option value="candle" >蜡烛图</option>
               		 <option value="colored_bar" >彩色棒型图</option>
               		 <option value="bar" >棒型图</option>
               		 <option value="hollow_candle">空心蜡烛图</option>
               		 <option value="line" >折线图</option>
               		 <option value="mountain">面积图</option>
               		</select>
               </li>
               
               <li class="select-list" style="padding-top:1.5px">
               		<select class="sel-tpad" id="stx-chart-indicator-select">
					<option value="ma">移动平均线 (MA)</option>
					<option value="macd">指数平滑异同平均线 (MACD)</option>
					<option value="Acc Swing">累计摆动指数 (ACC Swing)</option>
					<option value="ATR">真实波幅 (ATR)</option>
					<option value="Bollinger Bands">布林带指数 (Bollinger Bands) </option>
					<option value="CCI">顺势指标 (CCI)</option>
					<option value="PSAR">抛物线指标 (PSAR)</option>
					<option value="Price ROC">变动率指标 (ROC)</option>
					<option value="rsi">相对强弱指标 (RSI)</option>
					<option value="stochastics">随机指标 (KDJ)</option>
					<option value="TRIX">三重平滑移动平均指标 (TRIX)</option>
					<option value="Williams %R">威廉指标(Williams %R)</option>
               		</select>
               	
               </li>
              
                <li class="select-list" style="padding-top:1.5px">
               		<select class="sel-tpad" id="stx-chart-tool-select">
               		 <option value="" selected="selected">工具</option>
               		 <option value="none" >暂停</option>
               		 <option value="crosshairs" >十字线</option>
               		 <option value="annotation" >注解</option>
               		 <option value="fibonacci" >斐波纳契回撤</option>
               		 <option value="horizontal" >水平线</option>
               		 <option value="line" >直线</option>
               		 <option value="ray" >射线</option>
               		 <option value="segment" >段线</option>
               		 <option value="rectangle" >矩形</option>
               		 <option value="ellipse" >椭圆</option>
               		  <option value="clearDrawings">消除所有</option>
               		</select>
               </li>
               
                <li>
               
               	<div class="stx-drawing">
				<div class="stx-draw-settings stxToolbarFill">
					<div class="heading">Fill:</div>
					<div class="color stxFillColorPicker" style="background-color: #7DA6F5;"><span></span></div>
				</div>
				<div class="stx-drawing-color-and-line stxToolbarLine">
					<div class="heading">Line:</div>
					<div class="color stxLineColorPicker" style="background-color: transparent;"><span></span></div>
					<div class="stx-line-style btn menu stxMenu stxToolbarLinePicker"> <span class="stx-line style1 weight1 stxLineDisplay"></span><em></em>
						<ul id="stx-line-style-menu" class="stx-line-style-menu menuSelect menuOutline" style="display:none;">
							<li stxToggle="STXDrawingToolbar.setLine(1,'solid')"><span class="stx-line style1 weight1"></span></li>
							<li stxToggle="STXDrawingToolbar.setLine(3,'solid')"><span class="stx-line style1 weight2"></span></li>
							<li stxToggle="STXDrawingToolbar.setLine(5,'solid')"><span class="stx-line style1 weight3"></span></li>
							
							<li class="stxToolbarDotted" stxToggle="WebUiChart.setLine(1,'dotted')"><span class="stx-line style2 weight1"></span></li>
							<li class="stxToolbarDotted" stxToggle="WebUiChart.setLine(3,'dotted')"><span class="stx-line style2 weight2"></span></li>
							<li class="stxToolbarDotted" stxToggle="WebUiChart.setLine(5,'dotted')"><span class="stx-line style2 weight3"></span></li>
							<li class="stxToolbarDashed divider"></li>
							<li class="stxToolbarDashed" stxToggle="WebUiChart.setLine(1,'dashed')"><span class="stx-line style3 weight1"></span></li>
							<li class="stxToolbarDashed" stxToggle="WebUiChart.setLine(3,'dashed')"><span class="stx-line style3 weight2"></span></li>
							<li class="stxToolbarDashed" stxToggle="WebUiChart.setLine(5,'dashed')"><span class="stx-line style3 weight3"></span></li>
							<li class="stxToolbarNone divider"></li>
							<li class="stxToolbarNone" stxToggle="WebUiChart.setLine(0,'none')">None</li>
						</ul>
					</div>
				</div>
			</div>
               </li>
              
              <li class="cf-line"></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('1', 'tmclick1')" class="tp-icon-hov" id="tmclick1" lb="tmclick" tp="1" tm="1" ><span class="f11">M1</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('5', 'tmclick2')" class="tp-icon-hov" id="tmclick2" lb="tmclick" tp="1" tm="5"><span class="f11">M5</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('15', 'tmclick3')" class="tp-icon-hov" id="tmclick3" lb="tmclick" tp="1" tm="15"><span class="f11">M15</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('30', 'tmclick4')" class="tp-icon-hov" id="tmclick4" lb="tmclick" tp="1" tm="30"><span class="f11">M30</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('1h', 'tmclick5')" class="tp-icon-hov" id="tmclick5" lb="tmclick" tp="2" tm="1"><span class="f11">H1</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('4h', 'tmclick6')" class="tp-icon-hov" id="tmclick6" lb="tmclick" tp="2" tm="4"><span class="f11">H4</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('day', 'tmclick7')" class="tp-icon-hov tp-icon-on2" id="tmclick7" lb="tmclick" tp="3" tm="1"><span class="f11">D</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('week', 'tmclick8')" class="tp-icon-hov" id="tmclick8" lb="tmclick" tp="4" tm="1"><span class="f11">W</span></a></li>
              <li><a href="javascript:WebUiChart.changePeriodicity('month', 'tmclick9')" class="tp-icon-hov" id="tmclick9" lb="tmclick" tp="5" tm="1"><span class="f11">MN</span></a></li>
              <li class="rf-line"></li>
            </ul>
          </div>
          <!-- End 工具列 -->
       	<div id="chart-div" style="height:365px;border-color:#C2C2C2;border-style:solid;border-width: 1px 0px 0px;">
         	<div id="chartContainer" style="width:100%;height:100%;float:left;"></div>
         	 <!-- Indicator Dialogs -->
	    <div class="dialogContainer"> 
	      <!-- The studyDialog is a general purpose dialog for entering the parameters for studies. It may be customized so long
	    as the id an class names remain the same. Note that it contains templates which are replicated dynamically -->
	      <div id="studyDialog" style="display:none;" class="dialog">
	       <div class="title"></div>
	        <div onClick="STXDialogManager.dismissDialog()" class="btn icon close"><span class="close"></span></div>
	        <div id="inputs">
	          <div class="inputTemplate" style="display:none">
	            <div class="heading"></div>
	            <div class="data"></div>
	          </div>
	        </div>
	        <div id="outputs">
	          <hr/>
	          <div class="outputTemplate" style="display:none">
	            <div class="heading"></div>
	            <div class="color"><span></span></div>
	          </div>
	        </div>
	        <div id="parameters"></div>
	        <div onClick="WebUiChart.createStudy();STXDialogManager.dismissDialog()" class="btn" align="center">完成</div>
	      </div>
	    </div>
       		</div>
       	</div>
	</div>			
	 
	  <!--设定参数 begin-->
	  <div class="layer-box dn" id="chart-indicator-p">
	  <div class="layer-con layer-con-weit" style="width: 250px;">
	    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" style="line-height:0px;">
	     <tbody t="" id="chart-param-tb"></tbody>
	    </table>
	    <p class="more-lls-btn gez-btninfo"><a href="javascript:" id="indicator-submit">确认</a><a href="javascript:" onclick="$('#chart-indicator-p').dialog('close');">取消</a></p>
	  </div>
	</div>
	<!--设定参数 end-->
	
<script type="text/javascript">
$(function(){
	//mright
	$("#mright_zoom").click(function(){
		var curEle = $(this);
		if(curEle.attr("class") === "zooming_btn"){
			$(".mright_box").addClass("mright_big");
			curEle.removeClass("zooming_btn").addClass("zooming_btn_shrink");
			$(".mleft_box,.trade_data_box").hide();
		}else if(curEle.attr("class") === "zooming_btn_shrink"){
			$(".mright_box").removeClass("mright_big");
			curEle.removeClass("zooming_btn_shrink").addClass("zooming_btn");
			$(".mleft_box,.trade_data_box").show(200);
		}
		WebUiChart.trigerResizeChart();
	});

	//select menu init
	//1.
	$("#symbol-select").selectmenu({
		  "width" : 114,
		  change : function(event, selectedItem){
			  WebUiChart.changeChartBySymbolCode(selectedItem.item.value);
			  },
	});
	$("#symbol-select-button").mouseenter(
		function() {
			$("#symbol-select").selectmenu("open");
		} 
	);
	$("#symbol-select-button, #symbol-select-menu").mouseleave(
		function(){
			var thisFunc = function() {
			if (!$('#symbol-select-menu').is(':hover')&&!$('#symbol-select-button').is(':hover')) {
		        $('#symbol-select').selectmenu('close');
		    }
			};
			setTimeout(thisFunc,50);
		}
	);
	
	//2.
	$("#stx-chart-type-select").selectmenu({
		  "width" : 114,
		  change : function(event, selectedItem){
			  WebUiChart.setChartTypeByChartType(selectedItem.item.value);
			  },
	});
	$("#stx-chart-type-select-button").mouseenter(
		function() {
			$("#stx-chart-type-select").selectmenu("open");
		} 
	);
	$("#stx-chart-type-select-button, #stx-chart-type-select-menu").mouseleave(
		function() {
			var thisFunc = function() {
				if (!$('#stx-chart-type-select-menu').is(':hover')&&!$('#stx-chart-type-select-button').is(':hover')) {
		        $('#stx-chart-type-select').selectmenu('close');
		    	}
			};
			setTimeout(thisFunc,50);
		} 
	);

	var indicatorFlag =false;//此flag是解决jquery ui selectmenu控件的一个bug而设置的.
	//3.
	$("#stx-chart-indicator-select").selectmenu({
		  "width" : 114,
		  select : function(event, selectedItem){
			  WebUiChart.studyDialogByIdText(selectedItem.item.value, selectedItem.item.label);
			  $("#stx-chart-indicator-select-button .ui-selectmenu-text").text("指标");
			  },
		  create : function(event, selectedItem){
			  $("#stx-chart-indicator-select-button .ui-selectmenu-text").text("指标");
		  }
	});
	$("#stx-chart-indicator-select-button").mouseenter(
		function() {
			$("#stx-chart-indicator-select").selectmenu("open");
		} 
	);
	$("#stx-chart-indicator-select-button, #stx-chart-indicator-select-menu").mouseleave(
		function() {
			var thisFunc = function() {
				if (!$('#stx-chart-indicator-select-menu').is(':hover')&&!$('#stx-chart-indicator-select-button').is(':hover')) {
			        $('#stx-chart-indicator-select').selectmenu('close');
			    }
			};
			setTimeout(thisFunc,50);
		} 
	);
	
	//4.
	$("#stx-chart-tool-select").selectmenu({
		  "width" : 114,
		  change : function(event, selectedItem){
			  WebUiChart.setChartToolTypeByToolType(selectedItem.item.value);
			  },
	});
	$("#stx-chart-tool-select-button").mouseenter(
		function() {
			$("#stx-chart-tool-select").selectmenu("open");
		} 
	);
	$("#stx-chart-tool-select-button, #stx-chart-tool-select-menu").mouseleave(
		function() {
			var thisFunc = function() {
				if (!$('#stx-chart-tool-select-menu').is(':hover')&&!$('#stx-chart-tool-select-button').is(':hover')) {
			        $('#stx-chart-tool-select').selectmenu('close');
			    }
			};
			setTimeout(thisFunc,50);
		} 
	);
	
});

</script>
<!--图表end-->