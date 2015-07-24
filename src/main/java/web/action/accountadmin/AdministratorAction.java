package web.action.accountadmin;

import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import web.bean.AdminLoginInfo;
import web.constant.Constant;
import web.constant.UserAgentTool;
import web.util.LocaleUtil;
import web.util.StringUtil;

@SuppressWarnings("serial")
public class AdministratorAction extends BaseAction {

	private final static Logger logger = Logger.getLogger(AdministratorAction.class);
	private String lang;
	
	@Override
	protected String perform() {
		try {
			if (adminLoginInfo == null) {
				logger.warn("loginname is null...");
				return LOGIN;
			}
					
			String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
			if (StringUtils.isEmpty(loginname)) {
				loginname = (String) request.getSession().getAttribute("rgs_loginname");
				if (StringUtils.isEmpty(loginname)) {
					logger.warn("loginname is null...");
					return LOGIN;
				}
			}

			logger.debug("loginname: + " + loginname + " isDemo = " + request.getSession().getAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN)); // 是否模拟账户
			Locale locale = (Locale) request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE);
			
			if(lang==null){
				lang = (String) request.getSession().getAttribute("rgs_lang");
				logger.debug("rgs_lang:"+lang); 
			}
			
			logger.debug("lang:"+lang); 
			
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
				request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE,locale);
				request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY, LocaleUtil.getLocaleCountry(locale));
	    	}else if(locale == null) {
				locale = Locale.SIMPLIFIED_CHINESE;
				request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, locale);
				request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY, LocaleUtil.getLocaleCountry(locale));
	    	}
		} catch (Exception e) {
			logger.error("", e);
		}
		String dv=(String)request.getParameter("deviceType");
		if(StringUtil.isNullOrEmpty(dv)){
			dv=(String)request.getSession().getAttribute(Constant.SESSION_DEVICE_TYPE);
		}else{
			request.getSession().setAttribute(Constant.SESSION_DEVICE_TYPE,dv.toString());
		}
		String path = getDirectPath((String)dv);
		logger.debug("AdministratorAction path : "+path+" dv : "+dv);
		return path;
	}
	
	public String getDirectPath(String dv){
		if(dv==null||"null".equals(dv)||StringUtils.isEmpty(dv)){
			String userAgent = request.getHeader("User-Agent");
			String terminalType = UserAgentTool.getTerminalDevice(userAgent);
			if("pc".equals(terminalType)){
				return "dt";
			}else{
				return "mb";
			}
		}else{
			return dv;
		}
	}
	
	public AdminLoginInfo getAdminLoginInfo() {
		return adminLoginInfo;
	}

	public void setAdminLoginInfo(AdminLoginInfo adminLoginInfo) {
		this.adminLoginInfo = adminLoginInfo;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

}