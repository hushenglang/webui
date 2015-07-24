package web.action.accountadmin;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import net.sourceforge.tranxbean.TransXmlBean;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import web.bean.AdsVo;
import web.bean.VersionControlRecord;
import web.bean.VersionControlRecordList;
import web.component.GWAPIService;
import web.component.impl.APIServiceFactory;
import web.constant.Constant;
import web.filter.SystemDeviceFilter;
import web.util.LocaleUtil;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;
/**
 * 
 * Description: 跳到登录页面，获得cookie　username的值
 * 
 * @author Scott Li Email:scott@222m.net
 * @version 1.0 Create Time: 上午9:18:59 2014年3月11日
 * Update Time:
 */
@SuppressWarnings("serial")
public class LoginAction extends ActionSupport implements ServletRequestAware, Preparable
{
	private static final Logger logger = Logger.getLogger(LoginAction.class);
	protected HttpServletRequest request;
	
	private String lang;
	private String username;
	private static VersionControlRecord versionControlRecord;
	
	public HttpServletRequest getServletRequest()
	{
		return request;
	}
	
	public void setServletRequest(HttpServletRequest request)
	{
		this.request = request;
	}
	
	private Map<String, String> listPlatform;
	
	public Map<String, String> getListPlatform()
	{
		return listPlatform;
	}
	
	public void setListPlatform(Map<String, String> listPlatform)
	{
		this.listPlatform = listPlatform;
	}
	
	@Override
	public String execute()
	{
		String systemDevice=SystemDeviceFilter.getSystemDevice(request);
		String errorcode = request.getParameter("errorcode");
		//获取轮播图片对象gwapi获取.
		GWAPIService gwAPIService = APIServiceFactory.getGWAPIService();
		List<AdsVo> adsVoList = gwAPIService.adsIndex(lang);
		AdsVo adsVo = null;
		if(adsVoList!=null&&adsVoList.size()>0){
			adsVo = adsVoList.get(0);
		}
		request.setAttribute("adsVo", adsVo);
		
		if(!StringUtils.isEmpty(errorcode)){
			String errorMsg="";
			switch(Integer.valueOf(errorcode)) 
			{ 
			   case 1: 
				   errorMsg=this.getText("login.error.account.notexist");
			       break; 
			   case 2: 
				   errorMsg=this.getText("login.error.contactus");
			       break; 
			   case 3: 
				   errorMsg=this.getText("login.error.demoaccount.invalide");
			       break; 
			   case 4: 
				   errorMsg=this.getText("login.error.password.wrong");
			       break; 
			   case 5: 
				   errorMsg=this.getText("login.error.duplicate.login");
			       break; 
			   case 6: 
				   errorMsg=this.getText("login.error.version.invalide");
			       break; 
			   case 32: 
				   errorMsg=this.getText("login.error.account.lock");
			       break;
			   case 38: 
				   errorMsg=this.getText("login.error.account.network.disconnect");
			       break;
			   case 10101:
				   errorMsg=this.getText("login.error.account.timeout");
			       break;
			   case 54: 
				   errorMsg=this.getText("login.error.account.ret_err_no_activation");
				   errorMsg = String.format(errorMsg, username);
			       break; 
			} 
			this.addFieldError("errorMsg", errorMsg);
			return systemDevice+"_error"; // LOGIN
		}else{
			Cookie cookies[] = request.getCookies();
			username = this.getCookieValue(cookies, "username");
			return systemDevice;
		}
	}

	@Override
	public void prepare() throws Exception {
		getLastVersion();
	}
	
	@Override
	public void validate() {
		this.request.getSession().invalidate();
		Locale locale = LocaleUtil.getLocale(request);
		
		if(StringUtils.isBlank(lang)){
			lang = request.getParameter("lang");
		}
		
		if(StringUtils.isNotBlank(lang)){
			if(lang.equals("zh_TW") || lang.equals("tw")){
				locale = new Locale("zh", "TW");
			}else if(lang.equals("zh_CN") || lang.equals("zh")){
				locale = new Locale("zh", "CN");
			}else if(lang.equals("en_US") ||  lang.equals("en")){
				locale = new Locale("en", "US");
			}else if(lang.equals("vi_VN") || lang.equals("vi")){
				locale = new Locale("vi", "VN");
			}
    	}else {
    		lang = "zh";
    		locale = Locale.SIMPLIFIED_CHINESE;
    	}		
		
		String country = LocaleUtil.getLocaleCountry(locale);
		
		logger.warn("country:" + country + ", lang: " + lang);
		request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, locale);
		request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY, country);
	}
	
	private String getCookieValue(Cookie[] cookies, String str)
	{
		String result = null;
		if (cookies != null&&cookies.length>0)
		{
			for (Cookie cookie : cookies)
			{
				if (cookie.getName().equals(str))
				{
					result = cookie.getValue();
					break;
				}
			}
		}
		return result;
	}
	
	public String getUsername()
	{
		return username;
	}
	
	public void setUsername(String username)
	{
		this.username = username;
	}
	
	public String getCountry(){
		String c = (String) request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY);
		if(StringUtils.isEmpty(c)) {
			c = "zh";
		}
		
		if(!"tw".equals(c) && !"zh".equals(c)) {
			c = "zh";
		}
		logger.debug("c:" + c);
		return c;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
	
	public long getCurrentTime() {
		return System.currentTimeMillis();
	}

	public static VersionControlRecord getLastVersion() {
		try {			
			if(versionControlRecord == null) {
				TransXmlBean txf = new TransXmlBean();
				String path = LoginAction.class.getResource("/versions.xml").getPath();
				VersionControlRecordList recordList = txf.load(VersionControlRecordList.class, path, "UTF-8");
				
				if(recordList != null) {
					versionControlRecord = recordList.get(0);
				}
			}
		} catch (Exception e) {
			logger.error("", e);
			return null;
		}
		return versionControlRecord;
	}

	public VersionControlRecord getVersionControlRecord() {
		return versionControlRecord;
	}
}
