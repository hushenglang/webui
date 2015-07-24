<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <div id="accountBaseInfo"  class="zijin-baoj fl">
    <h3>账户汇总</h3>
    <div class="zijin-data">
      <table cellpadding="0" cellspacing="0" class="zijin-tabox">
        <tr>
          <th><span class="text-space">账</span>户</th>
          <td>${SESSION_ADMIN_LOGIN_INFO.fcustomersParam.loginname}${SESSION_USERNAMEDEMO!=null?'(模拟)':'(真实)' }</td>
        </tr>
        <tr>
          <th><span class="text-space">余</span>额</th>
          <td id="balance"></td>
        </tr>
        <tr>
          <th><span class="text-space">净</span>值</th>
          <td id="netValue"></td>
        </tr>
        <tr>
          <th>占用资金</th>
          <td id="availDisposableCapital"></td>
        </tr>
        <tr>
          <th>可用资金</th>
          <td id="availWithdrawCapital"></td>
        </tr>
        <tr>
          <th>总净盈亏</th>
          <td id="floatPl"></td>
        </tr>
        <tr>
          <th>按金水平%</th>
          <td id="marginLevel"></td>
        </tr>
        <tr>
          <th>强制平仓点%</th>
          <td id="cutMargin"></td>
        </tr>
      </table>
      
      <input type='hidden' name="usertype" id="usertype" value="${SESSION_USERNAMEDEMO!=null?'1':'0' }"/>
    </div>
 </div>