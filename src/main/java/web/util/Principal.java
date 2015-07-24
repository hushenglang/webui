package web.util;

import java.io.Serializable;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger; 

@SuppressWarnings("serial")
public class Principal implements Serializable {
	private static final Logger	logger  = Logger.getLogger(Principal.class);
	private String loginName;
	private String fullName;
	private String token;
	private String reportIpAddress;
	private int remotePort;
	private String platform;
	private String urlTrade;
	private String urlNews;

	public Principal(String loginName, String reportIpAddress, int remotePort, boolean isDemo) {
		super();
		this.loginName = loginName;
		this.reportIpAddress = reportIpAddress;
		this.remotePort = remotePort;
		this.initTokenUrl(isDemo);
	}
	
	public void initTokenUrl(boolean isDemo){
		String demoPara = isDemo ? "&demo=1" : "&demo=0";
		String url = ConstantsUtil.getProp("tokenUrl"); 
		String jsonString = HttpUrl.sendGet(url, "loginname=" + this.loginName + demoPara);
		jsonString = jsonString.trim();
		JSONObject jsonObject=new JSONObject();
		try{
			 jsonObject = JSONObject.fromObject(jsonString.substring(jsonString.indexOf('{')));
		}catch(Exception e){
			//做日志确定具体ucweb返回内容，再做进一步处理
			logger.error("url:"+url+"?loginname=" + this.loginName + demoPara);
			logger.error("ucweb返回出错，jsonString:"+jsonString);
			logger.error("",e);
		}
		final String url_trade = (String) jsonObject.get("url_trade");
		final String url_news = (String) jsonObject.get("url_news");
		final String token = (String) jsonObject.get("token");
		this.setToken(token);
		this.setUrlNews(url_news);
		this.setUrlTrade(url_trade);
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getReportIpAddress() {
		return reportIpAddress;
	}

	public void setReportIpAddress(String reportIpAddress) {
		this.reportIpAddress = reportIpAddress;
	}

	public int getRemotePort() {
		return remotePort;
	}

	public void setRemotePort(int remotePort) {
		this.remotePort = remotePort;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUrlTrade() {
		return urlTrade;
	}

	public void setUrlTrade(String urlTrade) {
		this.urlTrade = urlTrade;
	}

	public String getUrlNews() {
		return urlNews;
	}

	public void setUrlNews(String urlNews) {
		this.urlNews = urlNews;
	}
	
	

	
}
