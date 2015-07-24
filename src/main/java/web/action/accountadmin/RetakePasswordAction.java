package web.action.accountadmin;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import web.constant.Constant;
import web.util.LocaleUtil;

import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.interfaces.AccountManager;
import com.gwghk.gold.client.models.ApiResult;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

/**
 * 重置密码
 * @author Ben.wang
 * @time: 2014-6-4
 */
@SuppressWarnings("serial")
public class RetakePasswordAction extends ActionSupport implements ServletRequestAware, Preparable{
	
	private static final Logger logger = Logger.getLogger(RetakePasswordAction.class);
	protected HttpServletRequest request;
	private String code;
	private String accountno;
	private String platform;
	private String accountname;
	private String lang;
	@Override
	public void prepare() throws Exception {
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

	@Override
	public String execute() throws Exception {
		
		return super.execute();
	}
	
	public String show() throws Exception {
		return SUCCESS;
	}
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public String retakePassword(){
		if(StringUtils.isBlank(code) ||!code.toLowerCase().equals(request.getSession().getAttribute("random"))){
			request.setAttribute("code_error", 1000);
			return "back";
		}
		logger.debug("accountno:"+accountno+",platform:"+platform+",accountname:"+accountname);
		AccountManager accountManager = ClientManagerFactory.getInstance().getAccountManager();
		ApiResult apiResult	=accountManager.getPwd(accountno.trim(), platform.trim(), accountname.trim());
		if(apiResult.getCode().equals(Constant.OK)){
			request.getSession().removeAttribute("random");//成功後清除驗證碼 
			return SUCCESS;
		}else{
			logger.error("accountno:"+accountno+",apiResult.getCode():"+apiResult.getCode()+",apiResult.getErrorMsg():"+apiResult.getErrorMsg());
			request.setAttribute("code_error", StringUtils.isNotBlank(apiResult.getCode())?apiResult.getCode():1024);
			return "back";
		}
	}
	
	public String getCountry(){
		String c = (String) request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY);
		if(StringUtils.isEmpty(c)) {
			c = "zh";
		}
		
		if(!"tw".equals(c) && !"zh".equals(c)) {
			c = "zh";
		}
		
		return c;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getAccountno() {
		return accountno;
	}

	public void setAccountno(String accountno) {
		this.accountno = accountno;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
	
}
