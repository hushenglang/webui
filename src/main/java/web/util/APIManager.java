package web.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

import net.sourceforge.tranxbean.TransXmlBean;
import net.sourceforge.tranxbean.TransXmlMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import web.bean.CreditResult;
import web.vo.CreditRecordReport;
import web.vo.EntrustmentRecordsReport;
import web.vo.OpenPositionReport;
import web.vo.SettlementReport;
import web.vo.TradeReport;

public class APIManager {
	private final static Logger logger = Logger.getLogger(APIManager.class);

	public static APIManager singObj = new APIManager();
	public static ThreadLocal<String> sessionId = new ThreadLocal<String>();
	
	
	/********************************************** UCWEB    Report**********************************************/
	private static final String	UCWEB_API = getProperties("reportApiUrl");	//报表（依次为交易、委托、额度、结算）
	private static final String	getTradeReport = UCWEB_API + getProperties("ucwebTradeReport");		//交易
	private static final String	getOpenPositionReport = UCWEB_API + getProperties("ucwebOpenPositionReport");	//仓位
	private static final String	getSettlementReport	= UCWEB_API + getProperties("ucwebSettlementReport"); //结算
	private static final String	getCreditRecordReport = UCWEB_API + getProperties("ucwebCriditRecordRoport"); //额度
	private static final String	getEntrustmentRecordReport = UCWEB_API + getProperties("ucwebEntrustmentRecordRoport"); 
	
	private APIManager() {
	}

	public static synchronized APIManager getInstance() {
		if (singObj == null) {
			singObj = new APIManager();
		}
		return singObj;
	}

	public void setSessionId(String sid) {
		sessionId.set(sid);
	}

	public static String getProperties(String name) {
		return ConstantsUtil.getProp(name);
	}

	public <T> T tranxBeanGet(String url, Class<T> clazz, P... parameters) {
		T obj = null;
		url = getUrl(url, parameters);
		try {
			logger.debug("=> " + url);
			String xml = HttpClientUtils.httpGetString(url);
			// logger.debug("<= " + xml);
			TransXmlBean txf = new TransXmlBean();
			obj = txf.parse(xml, clazz);
		} catch (Exception e) {
			logger.error("", e);
		}
		return obj;
	}

	public static Map<String, Object> tranxBeanGet(String url, P... parameters) {
		Map<String, Object> result = null;
		url = getUrl(url, parameters);
		try {
			TransXmlMap txm = new TransXmlMap();
			logger.debug("=> " + url);
			String xml = HttpClientUtils.httpGetString(url, null, "UTF-8");
			// logger.debug("<= " + xml);
			if(StringUtils.isNotBlank(xml)){
				result = txm.parse(xml);
			}
			logger.debug("<= " + result);
		} catch (Exception e) {
			logger.error("", e);
		}
		return result;
	}

	public static String getUrl(String url, P... parameters) {
		if (url.endsWith("?")) {
			url = url.substring(0, url.length() - 1);
		}
		StringBuilder sb = new StringBuilder();
		for (P p : parameters) {
			if (StringUtils.isNotBlank(p.name) && p.value != null) {
				if (sb.length() > 0) {
					sb.append("&");
				}
				sb.append(p.name);
				sb.append("=");
				try {
					sb.append(URLEncoder.encode(
							StringUtils.defaultString(p.value), "UTF8"));
				} catch (UnsupportedEncodingException e) {
					logger.error("", e);
				}
			}
		}
		if (sb.length() > 0) {
			url = url + "?" + sb.toString();
		}
		return url;
	}

	public Map<String, Object> getXml(String url, P... parameters) {
		Map<String, Object> result = tranxBeanGet(url, parameters);
		if (result == null) {
			logger.error("result null from url:" + url);
			return null;
		}
		return result;
	}

	

	/**
	 * 报表服务器返回flags
	 * 备注：报表服务器需要通过根据当前日期与loginname 返回uid进行加密匹配
	 * @param loginname
	 * @return flags
	 */
	private String[] getReportServiceFlags(String loginname){
		Date date=new Date();
		TimeZone newTime = TimeZone.getTimeZone("GMT+0"); 
		TimeZone oldTime = TimeZone.getDefault();
		date = new Date(date.getTime()- (oldTime.getRawOffset() - newTime.getRawOffset()));
		String dateStr=DateUtil.toYyyymmddHhmmss(date);
		return new String[]{dateStr, MD5.getMD5(loginname.concat(dateStr).concat("Goldway").getBytes())};
	}

	//starting getting GT1 report
	/**
	 * 
	 * @param loginname
	 * @param uid          订单号  
	 * @param symbol       产品   
	 * @param orderType    买卖类型 
	 * @param buyOrAsk     买卖   
	 * @param entry        开平仓  
	 * @param beiginTime
	 * @param endTime
	 * @param pangeNo
	 * @param pageCount
	 * @return
	 */
	public TradeReport getTradeReport(String loginname, String uid, String symbol, String orderType,String buyOrAsk, String entry, 
			String beiginTime, String endTime, String pangeNo, String pageCount){
		String[] flags = getReportServiceFlags(loginname);
		if(uid!=null && !uid.equals(""))
		{
			beiginTime="";
			endTime="";
		} 
		TradeReport report = tranxBeanGet(getTradeReport, TradeReport.class,
		new P("curtime",flags[0]),
		new P("sid",flags[1]),
		new P("Login", loginname),
		new P("UID", uid),
		new P("Symbol", symbol),
		new P("OrderType", orderType),
		new P("BuyOrAsk", buyOrAsk),
		new P("Entry", entry),
		new P("BeginTime", beiginTime),
		new P("EndTime", endTime),//DateUtil.toMaxHhMmss()
		new P("page_no", pangeNo),
		new P("page_count", pageCount));
		return report;
	}
	
	/**
	 * 委托记录报表
	 * @param uid          订单号  
	 * @param symbol       产品   
	 * @param dealType     交易类型 
	 * @param buyOrAsk     买卖   
	 * @param beiginTime
	 * @param endTime
	 * @param pangeNo
	 * @param pageCount
	 * @return
	 */
	public EntrustmentRecordsReport getEntrustmentRecordReport(String loginname, String uid, String symbol, String dealType, String buyOrAsk, String beiginTime, String endTime, String pangeNo, String pageCount){
		String[] flags = getReportServiceFlags(loginname);
		EntrustmentRecordsReport report = tranxBeanGet(getEntrustmentRecordReport, EntrustmentRecordsReport.class,
				new P("curtime",flags[0]),
				new P("sid",flags[1]),
				new P("Login", loginname),
				new P("UID", uid),
				new P("Symbol", symbol),
				new P("DealType", dealType),
				new P("BuyOrAsk",buyOrAsk),
				new P("BeginTime", beiginTime),
				new P("EndTime", endTime),//DateUtil.toMaxHhMmss()
				new P("page_no", pangeNo),
				new P("page_count", pageCount));
		return report;
	}
	
	public OpenPositionReport getOpenPositionReport( String loginname, String uid, String symbol,String pangeNo, String pageCount){
		String[] flags = getReportServiceFlags(loginname);
		OpenPositionReport report = tranxBeanGet(getOpenPositionReport, OpenPositionReport.class,
				new P("curtime",flags[0]),
				new P("sid",flags[1]),
				new P("Login", loginname),
				new P("UID", uid),
				new P("Symbol", symbol),
				new P("page_no", pangeNo),
				new P("page_count", pageCount));
		return report;
		
	}
	
	public SettlementReport getSettlementReport(String loginname, String beiginTime, String endTime, String pangeNo, String pageCount){
		String[] flags = getReportServiceFlags(loginname);
		SettlementReport report = tranxBeanGet(getSettlementReport, SettlementReport.class,
				new P("curtime",flags[0]),
				new P("sid",flags[1]),
				new P("loginname", loginname),
//				new P("type", type),
				new P("BeginTime", beiginTime),
				new P("EndTime", endTime),//DateUtil.toMaxHhMmss(endTime)
				new P("page_no", pangeNo),
				new P("page_count", pageCount));
		return report;
	}
	
	/**
	 * 信用记录报表
	 * @param loginname
	 * @param type
	 * @param beiginTime
	 * @param endTime
	 * @param pangeNo
	 * @param pageCount
	 * @return
	 */
	public CreditRecordReport getCreditRecordReport(String loginname, String beiginTime, String endTime, String pangeNo, String pageCount,String type){
		String[] flags = getReportServiceFlags(loginname);
		CreditRecordReport report = tranxBeanGet(getCreditRecordReport, CreditRecordReport.class,
				new P("curtime",flags[0]),
				new P("sid",flags[1]),
				new P("Login", loginname),
				new P("BeginTime", beiginTime),
				new P("EndTime", endTime), 
				new P("page_no", pangeNo),
				new P("page_count", pageCount),
				new P("type",type)
				);
		return report;
	}

	public CreditResult getCreditReport(String loginname,PaginationCriteria paginationCriteria,String type,String weekFlag,String startTime,String endTime){
		CreditResult result = new CreditResult();
//		http://218.213.241.124:5555/rpt_credit.ucs?Login=11014402&page_no=1&page_count=20&
//			WeekFlag=1&type=2&EndTime=2013-11-28%2007:54:33&by=desc&calltype=200&curtime=2013-11-28%
//			2007:54:33&sid=efae77731dd4caeee378d0bc11093eb0
		String[] flags = getReportServiceFlags(loginname);		
		result = tranxBeanGet(getCreditRecordReport, CreditResult.class,
				new P("Login", loginname),
				new P("page_no", String.valueOf(paginationCriteria.getWhichPage()+1)),
				new P("page_count", String.valueOf(paginationCriteria.getCountPerPage())),
				new P("WeekFlag",weekFlag),
				new P("type",type),
				new P("EndTime", endTime),
				new P("by","desc"),
				new P("BeginTime", startTime),
				new P("sid",flags[1]),
				new P("curtime",flags[0])
				);
		return result;
	}
}
