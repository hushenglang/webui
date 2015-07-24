<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="index_leftNewsDiv" style="display:none;overflow-y:auto;">
  <div class="shuj-biaog-box" id="newsList">
    <div class="shuj-biaog-con shuj-biaog-style">
      <ul class="news-list-inbox"></ul>
    </div>
      <input type="hidden" id="news_totalPages"/>
      <input type="hidden" id="news_pageNum"/>
      <p class="page-list-box" ><a href="javascript:news.gotoPage('pre')">上一頁</a><a href="javascript:news.gotoPage('next')">下一頁</a></p>
  </div> 
  
   <div class="shuj-biaog-box" id="news_content" style="display: none;">
    <div class="shuj-biaog-con shuj-biaog-style">
      <h2 id="news_content_title"></h2>
      <p class="news-time" id="news_content_time"></p>
      <div class="shuj-biaog-body" id="news_content_detail">
     </div>
    </div>
 </div>
 </div>
