<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="index_chart_div" style="display:none;overflow-y:auto;" fc="f">
<!--圖表begin-->
	<div>
          <div class="tubiao-data">
              <ul class="hu clearfix" style="float:none;width:auto;display:block;padding:5px 10px">
							       			<li><span class="huLabel">時間: </span><span id="huTime" class="huField"></span></li>
											<li><span class="huLabel">開市: </span><span id="huOpen" class="huField"></span></li>
											<li><span class="huLabel">最高: </span><span id="huHigh" class="huField"></span></li>
											<li><span class="huLabel">最低: </span><span id="huLow" class="huField"></span></li>
											<li><span class="huLabel">收市: </span><span id="huClose" class="huField"></span></li>
				</ul>
          		<!-- 工具列 -->
         	   <div class="tb-menubox clearfix">
            	<ul>
                <li class="lf-line"></li>
                <li class="select-list" style="margin-right:2px;padding-right:0px;">
                	<select class="sel-tpad" id="symbol-select" onchange="WebUiChart.changeChartBySymbol(this)">
                	 <option value="022" selected="selected">倫敦金</option>
                	   <option value="023">倫敦銀</option>
                	</select>
                </li>
                <li id="symbol_select_pcode" style="line-height:26px"></li>
                 <li class="select-list" >
                 		<select class="sel-tpad" id="stx-chart-type-select" onchange="WebUiChart.setChartTypeById(this)">
                 		 <option value="candle" >蠟燭圖</option>
                 		 <option value="hollow_candle">空心蠟燭圖</option>
                 		 <option value="bar" >棒型圖</option>
                 		 <option value="colored_bar">彩色棒型圖</option>
                 		 <option value="line" >折線圖</option>
                 		 <option value="mountain" >面積圖</option>
                 		</select>
                 </li>
                  <li class="select-list" >
                 		<select class="sel-tpad" id="stx-chart-tool-select" onchange="WebUiChart.setChartToolType(this)">
                 		 <option value="" selected="selected">工具</option>
                 		 <option value="none" >暫停</option>
                 		 <option value="crosshairs" >十字線</option>
                 		 <option value="annotation" >註解</option>
                 		 <option value="fibonacci" >斐波納契回撤</option>
                 		 <option value="horizontal" >水平線</option>
                 		 <option value="line" >直線</option>
                 		 <option value="ray" >射線</option>
                 		 <option value="segment" >段線</option>
                 		 <option value="rectangle" >矩形</option>
                 		 <option value="ellipse" >橢圓</option>
                 		  <option value="clearDrawings">消除所有</option>
                 		</select>
                 </li>
                 <li class="select-list" >
                 		<select class="sel-tpad" id="stx-chart-type-select" onchange="WebUiChart.studyDialog(this)">
	                 		 <option value="" selected="selected">指標</option>
							<option value="ma">移動平均線 (MA)</option>
							<option value="macd">指數平滑異同平均線 (MACD)</option>
							<option value="Acc Swing">累計擺動指數 (ACC Swing)</option>
							<option value="ATR">真實波幅 (ATR)</option>
							<option value="Bollinger Bands">布林帶指數 (Bollinger Bands) </option>
							<option value="CCI">順勢指標 (CCI)</option>
							<option value="PSAR">拋物線指標 (PSAR)</option>
							<option value="Price ROC">變動率指標 (ROC)</option>
							<option value="rsi">相對強弱指標 (RSI)</option>
							<option value="stochastics">隨機指標 (KDJ)</option>
							<option value="TRIX">三重平滑移動平均指標 (TRIX)</option>
							<option value="Williams %R">威廉指標(Williams %R)</option>
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
            
         	<div id="chart-div" style="height:350px;border-color:#C2C2C2;border-style:solid;border-width: 1px 0px 0px;">
          	<div id="chartContainer" class="chart-box-bg" style="width:100%;height:100%;float:left;"></div>
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
        <div onClick="WebUiChart.createStudy();STXDialogManager.dismissDialog()" class="btn">完成</div>
      </div>
    </div>
          	
          </div>
          
          </div>
	</div>			
	   <!--設定參數 begin-->
	   <div class="layer-box dn" id="chart-indicator-p">
		  <div class="layer-con layer-con-weit" style="width: 250px;">
		    <table border="0" cellspacing="0" cellpadding="0" class="zhisu-talist layer-tablist" style="line-height:0px;">
		     <tbody t="" id="chart-param-tb"></tbody>
		    </table>
		    <p class="more-lls-btn gez-btninfo"><a href="javascript:" id="indicator-submit">確認</a><a href="javascript:" onclick="$('#chart-indicator-p').dialog('close');">取消</a></p>
		  </div>
		</div>
</div>
<!--圖表end-->