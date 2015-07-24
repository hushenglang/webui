<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div id="modify_marketAndPendingOrderDiv" style="display: none">
	<div class="navbox-c">
		<div class="nav-qh clearfix">
			<ul class="tan-ul" id="modify_market-PendingOrder-fl">
				<li id="modify_pendingOrderLi">委托修改</li>
			</ul>
		</div>
	</div>

	<!--委托修改begin-->
	<table border="0" cellspacing="0" cellpadding="0"
		class="zhisu-talist layer-tablist" id="modify_pendingOrderTable">
		<tbody>
			<tr>
				<th class="text-space"><span class="text-space"> 类</span>型：</th>
				<!-- 类型 -->
				<td><span id="modify_orderBusiType">---</span></td>
			</tr>

			<tr name="unadvance" id="modify_pendingOrder_limitPrice"
				class="tr-bg">
				<th><span class="text-space"
					id="modify_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
				<td><input type="text" id="modify_limitPrice"
					name="modify_limitPrice" /> <span id="modify_limitOperate"
					class="gray2"></span> <input type="hidden" id="modify_limit_max"
					name="modify_limit_max" />
				<!-- 买入限价最大值 --> <input type="hidden" id="modify_limit_min"
					name="modify_limit_min" /> <!-- 卖出限价最小值 --></td>
			</tr>
			<tr name="unadvance" id="modify_pendingOrder_stopPrice">
				<th><span class="text-space"
					id="modify_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 停损-->
				<td><input type="text" id="modify_stopPrice"
					name="modify_stopPrice" class="input-spinner" /> <span
					id="modify_stopOperate" class="gray2"></span> <input type="hidden"
					id="modify_stop_max" name="modify_stop_max" /> <!-- 买入停损最小值 -->
					<input type="hidden" id="modify_stop_min" name="modify_stop_min" />
					<!-- 卖出停损最大值 --></td>
			</tr>


			<tr name="unadvance" class="tr-bg">
				<th valign="top"><span class="text-space">手</span>数：</th>
				<!-- 手数 -->
				<td class="shous-tadfon" valign="top">
					<div class="shous-lay">
						<!-- 手数 -->
						<span id="modify_orderVolumeSpan"> --- </span>
					</div>
				</td>
			</tr>
			<!-- 保证金   -->
			<tr name="unadvance">
				<th>保&nbsp;证&nbsp;金：</th>
				<td><span id="modify_pendingMargin"></span>&nbsp;USD</td>
			</tr>

			<tr name="unadvance">
				<th><span class="text-space">期</span>限：</th>
				<!-- 期限-->
				<td><span class="t-sppad" id="modify_defaultExpir"> ---
				</span></td>
			</tr>
			<!-- 一般委托单end -->


			<!-- 进阶委托单 -->
			<tr name="advance">
				<th class="text-space"><span class="text-space"> 开</span>仓：</th>
				<!-- 开仓类型 -->
				<td><span id="modify_advance_open_orderBusiType"></span></td>
			</tr>

			<tr name="advance" id="modify_advance_open_pendingOrder_limitPrice"
				class="tr-bg">
				<th><span class="text-space"
					id="modify_advance_open_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
				<td><input type="text" id="modify_advance_open_limitPrice"
					name="modify_advance_open_limitPrice" /> <span
					id="modify_advance_open_limitOperate" class="gray2"></span> <input
					type="hidden" id="modify_advance_open_Limit_max"
					name="modify_advance_open_Limit_max" />
				<!-- 买入限价最大值 --> <input type="hidden"
					id="modify_advance_open_Limit_min"
					name="modify_advance_open_Limit_min" /> <!-- 卖出限价最小值 --></td>
			</tr>
			<tr name="advance" id="modify_advance_open_pendingOrder_stopPrice">
				<th><span class="text-space"
					id="modify_advance_open_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 停损-->
				<td><input type="text" id="modify_advance_open_stopPrice"
					name="modify_advance_open_stopPrice" class="input-spinner" /> <span
					id="modify_advance_open_stopOperate" class="gray2"></span> <input
					type="hidden" id="modify_advance_open_Stop_max"
					name="modify_advance_open_Stop_max" /> <!-- 买入停损最小值 --> <input
					type="hidden" id="modify_advance_open_Stop_min"
					name="modify_advance_open_Stop_min" /> <!-- 卖出停损最大值 --></td>
			</tr>

			<tr name="advance" class="tr-bg">
				<th valign="top"><span class="text-space">手</span>数：</th>
				<!-- 手数 -->
				<td class="shous-tadfon" valign="top">
					<div class="shous-lay">
						<!-- 手数 -->
						<span id="modify_advance_orderVolumeSpan"> --- </span>
					</div>
				</td>
			</tr>
			<!-- 保证金   -->
			<tr name="advance">
				<th>保&nbsp;证&nbsp;金：</th>
				<td><span id="modify_advance_pendingMargin"></span></td>
			</tr>

			<tr name="advance">
				<th class="text-space"><span class="text-space"> 平</span>仓：</th>
				<!-- 平仓类型 -->
				<td><span id="modify_advance_close_orderBusiType"></span></td>
			</tr>

			<tr name="advance" class="tr-bg"
				id="modify_advance_close_pendingOrder_limitPrice">
				<th><span class="text-space"
					id="modify_advance_close_pendingOrderTradedType_limitPrice">---</span></th>
				<!-- 限价-->
				<td><input type="text" id="modify_advance_close_limitPrice"
					name="modify_advance_close_limitPrice" /> <span
					id="modify_advance_close_limitOperate" class="gray2"></span> <input
					type="hidden" id="modify_advance_close_Limit_max"
					name="modify_advance_close_Limit_max" /> <!-- 买入限价最大值 --> <input
					type="hidden" id="modify_advance_close_Limit_min"
					name="modify_advance_close_Limit_min" /> <!-- 卖出限价最小值 --></td>
			</tr>
			<tr name="advance" id="modify_advance_close_pendingOrder_stopPrice">
				<th><span class="text-space"
					id="modify_advance_close_pendingOrderTradedType_stopPrice">---</span></th>
				<!-- 停损-->
				<td><input type="text" id="modify_advance_close_stopPrice"
					name="modify_advance_close_stopPrice" class="input-spinner" /> <span
					id="modify_advance_close_stopOperate" class="gray2"></span> <input
					type="hidden" id="modify_advance_close_Stop_max"
					name="modify_advance_close_Stop_max" /> <!-- 买入停损最小值 --> <input
					type="hidden" id="modify_advance_close_Stop_min"
					name="modify_advance_close_Stop_min" /> <!-- 卖出停损最大值 --></td>
			</tr>


			<tr name="advance">
				<th><span class="text-space">期</span>限：</th>
				<!-- 期限-->
				<td><span class="t-sppad" id="modify_advance_defaultExpir">
						--- </span></td>
			</tr>

		</tbody>
	</table>

	<p class="more-lls-btn gez-btninfo" id="modify_pendingOrderP">
		<a href="javascript:" id="modify_btnOrderOK" class="sure_btn">确定</a><a
			href="javascript:" id="modify_btnOrderCancel"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">取消</a>
	</p>
	<p class="more-lls-btn gez-btninfo" id="modify_advamcePendingOrderP">
		<a href="javascript:" id="modify_btnAdvanceOrderOK" class="sure_btn">确定</a><a
			href="javascript:" id="modify_btnAdvanceOrderCancel"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">取消</a>
	</p>
	<!--委托下单End-->

	<!--modify委托下单 提交中或成功 -->
	<table border="0" cellspacing="0" cellpadding="0"
		class="zhisu-talist layer-tablist"
		id="modify_submitedSuccessPendingOrderTable">
		<tbody>
			<tr class="tr-bg" id="modify_submitedSuccessPendingOrderTr">
				<td class="t-bnone t-cen"><span id="modify_pendOrderSuccessMsg"
					class="mm-succ-icon bold"></span> <!-- 成功 --> <span
					id="modify_pendOrderPreSubmittingMsg" class="t-bnone t-cen bold"></span>
					<!-- 提交中 --></td>
			</tr>
		</tbody>
	</table>
	<p class="more-lls-btn gez-btninfo del-wid" id="modify_pendingOrderC">
		<a href="javascript:"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a>
	</p>

	<!--委托下单提交失败-->
	<table border="0" cellspacing="0" cellpadding="0"
		class="zhisu-talist layer-tablist"
		id="modify_submitedFailedPendingOrderTable">
		<tbody>
			<tr class="tr-bg">
				<td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
			</tr>
			<tr>
				<td class="t-cen">
					<p class="mm-fail-p" id="modify_pendingOrderErrorMessage"></p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="more-lls-btn gez-btninfo del-wid" id="modify_pendingOrderFC">
		<a href="javascript:"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a>
	</p>

	<!--进阶委托下单 提交中或成功 -->
	<table border="0" cellspacing="0" cellpadding="0"
		class="zhisu-talist layer-tablist"
		id="modify_submitedSuccessAdvancePendingOrderTable">
		<tbody>
			<tr class="tr-bg" id="modify_submitedSuccessAdvancePendingOrderTr">
				<td class="t-bnone t-cen"><span
					id="modify_advance_pendOrderSuccessMsg" class="mm-succ-icon bold"></span>
					<!-- 成功 --> <span id="modify_advance_pendOrderPreSubmittingMsg"
					class="t-bnone t-cen bold"></span> <!-- 提交中 --></td>
			</tr>
		</tbody>
	</table>
	<p class="more-lls-btn gez-btninfo del-wid"
		id="modify_advance_pendingOrderC">
		<a href="javascript:"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a>
	</p>

	<!--进阶委托下单提交失败-->
	<table border="0" cellspacing="0" cellpadding="0"
		class="zhisu-talist layer-tablist"
		id="modify_submitedFailedAdvancePendingOrderTable">
		<tbody>
			<tr class="tr-bg">
				<td class="t-bnone t-cen"><span class="mm-fail-icon bold">失败</span></td>
			</tr>
			<tr>
				<td class="t-cen">
					<p class="mm-fail-p" id="modify_advance_pendingOrderErrorMessage"></p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="more-lls-btn gez-btninfo del-wid"
		id="modify_advance_pendingOrderFC">
		<a href="javascript:"
			onclick="closeWindowDiv('#modify_marketAndPendingOrderDiv');">关闭</a>
	</p>


</div>