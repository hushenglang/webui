package web.action.accountadmin;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import web.bean.AdminLoginInfo;
import web.bean.FcustomerInfoParam;
import web.bean.FcustomersParam;
import web.constant.Constant;
import web.util.Principal;

import com.gwghk.demo.gold.client.DemoClientManagerFactory;
import com.gwghk.demo.gold.client.interfaces.DemoAcManager;
import com.gwghk.demo.gold.client.models.DemoApiResult;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

/**
 * 模拟帐户跳转--已经有nodejs验证,只做跳转
 * @author Administrator
 *
 * 2013-12-24 paul.li create
 */
public class DemoLoginAction   extends ActionSupport implements ServletRequestAware, ServletResponseAware, Preparable {
	private static final long serialVersionUID = 1L;
	private static final Logger	logger = Logger.getLogger(DemoLoginAction.class);
	protected Principal principal;
	private String username;
	private String password;
	private String randomNumber;// 验证码
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	private String demoflag;
	private String rememberMe;
	private String usernamedemo;
	private String deviceType;
	
	@Override
	public void prepare() throws Exception {
		HttpSession session = request.getSession();
		// 清空(用户重新登入前)
		session.removeAttribute(Constant.SESSION_PRINCIPAL);
		session.removeAttribute(Constant.SESSION_ADMIN_LOGIN_INFO);
		session.removeAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD);
		session.removeAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN);
		session.removeAttribute(Constant.SESSION_USERNAMEDEMO);
		session.removeAttribute(Constant.SESSION_NODEJS_SID);
	}
	
	@Override
	public String execute() {
		try {
			if (StringUtils.isEmpty(this.username)) {
				logger.info("username is null...");
				return INPUT; // LOGIN
			}
			String random = (String) request.getSession()
					.getAttribute("random");
			if (randomNumber == null || !randomNumber.toLowerCase().equals(random)) {
				this.addFieldError("errorMsg",
						this.getText("error.captcha.not.correct"));
				return INPUT; // LOGIN
			}
			DemoAcManager dmanage=DemoClientManagerFactory.getInstance().getDemoAcManager();
			//使用goldapi验证账号
			DemoApiResult apiResult	= dmanage.loginUiDemo(username.trim(),password.trim(),request.getRemoteAddr());
			if(!apiResult.isOk()){
				this.addFieldError("errorMsg",
						this.getText("login.error."+apiResult.getCode()));
				return INPUT; // LOGIN
			}
			if (principal == null && request != null) {
				principal = new Principal(username, request.getRemoteAddr(), request.getRemotePort(), true);
				principal.setPlatform(Constant.PLATFORM_GT1);
				request.getSession().setAttribute(Constant.SESSION_PRINCIPAL, principal);
			}

			logger.debug("DemoLoginAction begin............");

			request.getSession().setAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN, true);// 标记为模拟帐户

			AdminLoginInfo info = new AdminLoginInfo();

			FcustomerInfoParam finfoParam = new FcustomerInfoParam();
			finfoParam.setAccountNo(this.username);
			FcustomersParam fcustomersParam = new FcustomersParam();
			fcustomersParam.setLoginname(this.username);

			info.setFcustomerInfoParam(finfoParam);
			info.setFcustomersParam(fcustomersParam);

			request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_INFO, info);
			request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD, password);
			request.getSession().setAttribute(Constant.SESSION_DEVICE_TYPE,this.getDeviceType());
			usernamedemo = username;
			if ("true".equals(rememberMe)) {
				this.clearCookie("usernamedemo");
				this.clearCookie("rememberMe");
				this.addCookie("usernamedemo", usernamedemo, 365);
				this.addCookie("rememberMe", "true", 365);
			} else {
				this.clearCookie("usernamedemo", usernamedemo);
				this.clearCookie("rememberMe", "true");
			}
			//增加demo帳戶session用於驗證登錄帳戶
			request.getSession().setAttribute(Constant.SESSION_USERNAMEDEMO, usernamedemo);
		} catch (Exception e) {
			logger.error("", e);
		}
		return SUCCESS;
	}

	/**
	 * 登陆出错
	 * @return
	 */
	public String infoErrorjump()
	{
		 
		request.getSession().setAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN, true);
	 
		return SUCCESS;
	}
	
	private void addCookie(String cookieName, String cookieValue, int day)
	{
		Cookie c = new Cookie(cookieName, cookieValue);
		// 设置Cookie有效期为365天
		c.setMaxAge(60 * 60 * 24 * day);
		c.setPath("/");
		response.addCookie(c);
		
	}
	
	private void clearCookie(String cookieName, String cookieValue)
	{
		Cookie[] cookies = request.getCookies();
		if (cookieValue != null)
		{
			if (cookies != null && cookies.length > 0)
			{
				Cookie cookie = getCookie(cookies, cookieName);
				if (cookie != null)
				{
					String _userName = cookie.getValue();
					if (cookieValue.equals(_userName))
					{
						cookie.setValue(null);
						cookie.setMaxAge(0);
						cookie.setPath("/");
						response.addCookie(cookie);
					}
				}
			}
		}
		
	}
	
	private void clearCookie(String cookieName)
	{
		Cookie[] cookies = request.getCookies();
		
		Cookie cookie = getCookie(cookies, cookieName);
		if (cookie != null)
		{
			cookie.setValue(null);
			cookie.setMaxAge(0);
			cookie.setPath("/");
			response.addCookie(cookie);
		}
		
	}
	
	private Cookie getCookie(Cookie[] cookies, String str)
	{
		Cookie result = null;
		for (Cookie cookie : cookies)
		{
			if (cookie.getName().equals(str))
			{
				result = cookie;
				break;
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


	public String getPassword()
	{
		return password;
	}


	public void setPassword(String password)
	{
		this.password = password;
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0)
	{
		response = arg0;
	}


	@Override
	public void setServletRequest(HttpServletRequest arg0)
	{
		request = arg0;
	}

	public Principal getPrincipal()
	{
		return principal;
	}


	public void setPrincipal(Principal principal)
	{
		this.principal = principal;
	}

	public String getDemoflag()
	{
		return demoflag;
	}

	public void setDemoflag(String demoflag)
	{
		this.demoflag = demoflag;
	}

	public String getRememberMe()
	{
		return rememberMe;
	}

	public void setRememberMe(String rememberMe)
	{
		this.rememberMe = rememberMe;
	}

	public String getUsernamedemo()
	{
		return usernamedemo;
	}

	public void setUsernamedemo(String usernamedemo)
	{
		this.usernamedemo = usernamedemo;
	}

	public String getCountry(){
		return (String) request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY);
	}

	public long getCurrentTime() {
		return System.currentTimeMillis();
	}
	
	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getRandomNumber() {
		return randomNumber;
	}

	public void setRandomNumber(String randomNumber) {
		this.randomNumber = randomNumber;
	}
	
	
}
