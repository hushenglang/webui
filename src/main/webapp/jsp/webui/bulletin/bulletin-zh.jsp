<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="layer-box dn" id="leftGg" style="display:none" tn="${session.SESSION_HAS_OPEN_BULLETIN}">
    <ul class="gongg-list" id="bulletinUL">
    </ul>
    <p id="noRecord" style="display:none;text-align: center;margin-top: 120px;">对不起,没有相关记录!</p>
</div>
<%
    request.getSession().setAttribute("SESSION_HAS_OPEN_BULLETIN",true); 
%>