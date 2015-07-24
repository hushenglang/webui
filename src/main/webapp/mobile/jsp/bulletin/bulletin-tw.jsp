<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<div id="index_leftGg" tn="${session.SESSION_HAS_OPEN_BULLETIN}" style="display:none;overflow-y:auto;">
  <div class="shuj-biaog-box">
    <div class="shuj-biaog-con shuj-biaog-style" style="overflow-y:auto;height:350px;">
      <ul class="news-list-inbox" id="bulletinUL"></ul>
    </div>
    <p id="noRecord" style="display:none;text-align: center;margin-top: 120px;">對不起,沒有相關記錄!</p>
  </div> 
</div>
<%
    request.getSession().setAttribute("SESSION_HAS_OPEN_BULLETIN",true); 
%>