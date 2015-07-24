/*********************************************************
 * 网站跟踪统计分析代码
 ********************************************************/
/***google code***/
  _gaq.push(['_setAccount', 'UA-31478987-1']);
  _gaq.push(['_setDomainName', '24k.hk']);
  _gaq.push(['_addIgnoredRef', '24k.hk']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_addOrganic', 'soso', 'w']);
  _gaq.push(['_addOrganic', 'sogou', 'query']);
  _gaq.push(['_addOrganic', 'youdao', 'q']);
  _gaq.push(['_addOrganic', 'baidu', 'word']);
  _gaq.push(['_addOrganic', 'baidu', 'q1']);
  _gaq.push(['_addOrganic', 'ucweb', 'keyword']);
  _gaq.push(['_addOrganic', 'ucweb', 'word']);
  _gaq.push(['_addOrganic', '114so', 'kw']);
  _gaq.push(['_addOrganic', '360', 'q']);
  _gaq.push(['_addOrganic', 'so', 'q']);
  _gaq.push(['_trackPageview']);
  
/**
 * 页面js加载完成后再加载统计js代码，防止统计js加载异常影响页面效果
 */
$(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = "http://adguard.adsage.com/stat?wid=2022";
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
});

/**
 * 页面js加载完成后再加载统计js代码，防止统计js加载异常影响页面效果
 */
$(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
});
 
var analytics_container = $("#analytics_container");
if(analytics_container.length == 0){
	analytics_container = $("body");
}

/***baidu code***/
var _hmt = _hmt || [];
$(function() {
    var hm = document.createElement("script");
    hm.src = "http://hm.baidu.com/hm.js?710bd17d7623d568057916df18b9d3bd";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
});
  
var bd_cpro_rtid="Pjc1njn";
$(function() {

    var cpro = document.createElement("script");
    cpro.src = "http://cpro.baidu.com/cpro/ui/rt.js";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(cpro, s);
    
    analytics_container.append('<div style="display:inline;"><img height="0" width="0" style="border-style:none;" src="http://eclick.baidu.com/rt.jpg?t=noscript&rtid=Pjc1njn" /></div>');
    
});

/***youdao code***/
var youdao_conv_id = 229606; 
$(function() {
    var conv = document.createElement("script");
    conv.src = "http://conv.youdao.com/pub/conv.js";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(conv, s);

	/**新浪微博**/
    var sinajs = document.createElement("script");
    sinajs.src = "http://tjs.sjs.sinajs.cn/open/api/js/wb.js";
    s.parentNode.insertBefore(sinajs, s);
});