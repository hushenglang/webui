<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="footer" id="accountBaseInfo">
	<ul class="fo_state">
    	<li><span class="net_state" id="sp_conn_status">连接中...</span></li>
        <li><span class="sy_time" id="sp_service_time">--</span></li>
    </ul>
    <ul class="facc_item">
    	<li class="acc"><span class="name">账户${SESSION_USERNAMEDEMO!=null?'(模拟)':'(真实)' }</span><br/><span class="value">${SESSION_ADMIN_LOGIN_INFO.fcustomersParam.loginname}</span></li>
        <li><span class="name">余额<a id="accountinfo_ask_tips" href="javascript:" class="ask_adm">?</a></span><br/><span class="value" id="balance">---</span></li>
        <li><span class="name">净值</span><br/><span class="value" id="netValue">---</span></li>
        <li><span class="name">占用资金</span><br/><span class="value" id="availDisposableCapital">---</span></li>
        <li><span class="name">可用资金</span><br/><span class="value" id="availWithdrawCapital">---</span></li>
        <li><span class="name">总净盈亏</span><br/><span class="value" id="floatPl">---</span></li>
        <li id="li_marginLevel" class="bao"><span class="name">按金水平%</span><br/><span class="value" id="marginLevel">---</span></li>
        <li><span class="name">强制平仓点%</span><br/><span class="value" id="cutMargin">---</span>%</li>
    </ul>
</div>


<!--账户信息  begin-->
<div class="layer-box dn" id="gezIbox20">
  <div class="layer-con layer-con-weit lay-no-pad">
        <table border="0" cellspacing="0" cellpadding="0" class="layer-tablist hy_table ">
         <tbody>
           <tr>
             <th width="96" >栏位名称</th>
             <th class="r-nonebor">名称解释</th>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">余额</td>
            <td class="r-nonebor">当前的账户余额；</td>
           </tr>
           <tr>
            <td>净值</td>
            <td class="r-nonebor">净值=余额+总净盈亏之和；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">占用资金</td>
            <td class="r-nonebor">当前的账户余额；</td>
           </tr>
           <tr>
            <td valign="top">可用资金</td>
            <td class="r-nonebor">该账户当前可用于交易的有效资金；<br />余额+总盈亏之和-占用保证金；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">总净盈亏</td>
            <td class="r-nonebor">当前的所有持仓头寸的净盈亏的综合</td>
           </tr>
           <tr>
            <td>按金水平%</td>
            <td class="r-nonebor">当前净值/占用保证金；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone" valign="top">强制平仓点%</td>
            <td class="r-nonebor">用于执行强制平仓的按金水平，当按金水平低于此值时，<br />账户将强制平仓；</td>
           </tr>
         </tbody>
       </table>
  </div>
</div>
<!--账户信息 end-->

