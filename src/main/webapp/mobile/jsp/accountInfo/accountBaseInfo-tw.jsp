<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <div id="accountBaseInfo"  class="zijin-baoj fl">
    <h3>賬戶匯總</h3>
    <div class="zijin-data">
      <table cellpadding="0" cellspacing="0" class="zijin-tabox">
        <tr>
          <th><span class="text-space">賬</span>戶</th>
          <td>${SESSION_ADMIN_LOGIN_INFO.fcustomersParam.loginname}${SESSION_USERNAMEDEMO!=null?'(模擬)':'(真實)' }</td>
        </tr>
        <tr>
          <th><span class="text-space">餘</span>額</th>
          <td id="balance"></td>
        </tr>
        <tr>
          <th><span class="text-space">凈</span>值</th>
          <td id="netValue"></td>
        </tr>
        <tr>
          <th>佔用資金</th>
          <td id="availDisposableCapital"></td>
        </tr>
        <tr>
          <th>可用資金</th>
          <td id="availWithdrawCapital"></td>
        </tr>
        <tr>
          <th>總凈盈虧</th>
          <td id="floatPl"></td>
        </tr>
        <tr>
          <th>按金水平%</th>
          <td id="marginLevel"></td>
        </tr>
        <tr>
          <th>強制平倉點%</th>
          <td id="cutMargin"></td>
        </tr>
      </table>
      
      <input type='hidden' name="usertype" id="usertype" value="${SESSION_USERNAMEDEMO!=null?'1':'0' }"/>
    </div>
 </div>