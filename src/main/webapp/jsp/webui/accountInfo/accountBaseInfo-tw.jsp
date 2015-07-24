<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="footer" id="accountBaseInfo">
	<ul class="fo_state">
    	<li><span class="net_state" id="sp_conn_status">連接中...</span></li>
        <li><span class="sy_time" id="sp_service_time">--</span></li>
    </ul>
    <ul class="facc_item">
    	<li class="acc"><span class="name">賬戶${SESSION_USERNAMEDEMO!=null?'(模擬)':'(真實)' }</span><br/><span class="value">${SESSION_ADMIN_LOGIN_INFO.fcustomersParam.loginname}</span></li>
        <li><span class="name">余額<a id="accountinfo_ask_tips" href="javascript:" class="ask_adm">?</a></span><br/><span class="value" id="balance">---</span></li>
        <li><span class="name">凈值</span><br/><span class="value" id="netValue">---</span></li>
        <li><span class="name">占用資金</span><br/><span class="value" id="availDisposableCapital">---</span></li>
        <li><span class="name">可用資金</span><br/><span class="value" id="availWithdrawCapital">---</span></li>
        <li><span class="name">總凈盈虧</span><br/><span class="value" id="floatPl">---</span></li>
        <li id="li_marginLevel" class="bao"><span class="name">按金水平%</span><br/><span class="value" id="marginLevel">---</span></li>
        <li><span class="name">強制平倉點%</span><br/><span class="value" id="cutMargin">---</span>%</li>
    </ul>
</div>


<!--賬戶信息  begin-->
<div class="layer-box dn" id="gezIbox20">
  <div class="layer-con layer-con-weit lay-no-pad">
        <table border="0" cellspacing="0" cellpadding="0" class="layer-tablist hy_table ">
         <tbody>
           <tr>
             <th width="96" >欄位名稱</th>
             <th class="r-nonebor">名稱解釋</th>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">余額</td>
            <td class="r-nonebor">當前的賬戶余額；</td>
           </tr>
           <tr>
            <td>凈值</td>
            <td class="r-nonebor">凈值=余額+總凈盈虧之和；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">占用資金</td>
            <td class="r-nonebor">當前的賬戶余額；</td>
           </tr>
           <tr>
            <td valign="top">可用資金</td>
            <td class="r-nonebor">該賬戶當前可用於交易的有效資金；<br />余額+總盈虧之和-占用保證金；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone">總凈盈虧</td>
            <td class="r-nonebor">當前的所有持倉頭寸的凈盈虧的綜合</td>
           </tr>
           <tr>
            <td>按金水平%</td>
            <td class="r-nonebor">當前凈值/占用保證金；</td>
           </tr>
           <tr class="tr-bg">            
            <td class="t-bnone" valign="top">強制平倉點%</td>
            <td class="r-nonebor">用於執行強制平倉的按金水平，當按金水平低於此值時，<br />賬戶將強制平倉；</td>
           </tr>
         </tbody>
       </table>
  </div>
</div>
<!--賬戶信息 end-->
