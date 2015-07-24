package web.action.accountadmin;

import java.util.Map;

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
import web.constant.UserAgentTool;
import web.filter.SystemDeviceFilter;
import web.util.Principal;

import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.interfaces.AccountManager;
import com.gwghk.gold.client.models.ApiResult;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

/**
 * 
 * Description: 真实账号的帐户跳转--已经有nodejs验证,只做跳转
 * 
 * @author Scott Li Email:scott@222m.net
 * @version 1.0 Create Time: Update Time:　上午9:22:38 2014年3月11日
 */
@SuppressWarnings("serial")
public class HomeAction extends ActionSupport implements ServletRequestAware, ServletResponseAware, Preparable {

	protected HttpServletRequest request;
	protected HttpServletResponse response;
	private final static Logger logger = Logger.getLogger(HomeAction.class);
	private String username;
	private String password;
	private String randomNumber;// 验证码
	private String check;
	private String deviceType;
	private String platform;
	private String rememberMe;
	private Map<String, String> listPlatform;
	private boolean imitate = false;// 模拟交易
	private String isRGSLogin;
	@Override
	public void prepare() throws Exception {
		// 清空(用户重新登入前)
		HttpSession session = request.getSession();
		username = (String)request.getSession().getAttribute(Constant.SESSION_GW_SHIELD_USERNAME);
		password = (String)request.getSession().getAttribute(Constant.SESSION_GW_SHIELD_PASSWORD);
		isRGSLogin = (String)request.getSession().getAttribute("ISRGS_LOGIN");
		logger.debug("home action params  isRGSLogin:"+isRGSLogin+"  username:"+username);
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
		logger.debug("start to validate account info!");
		
		if ("true".equals(isRGSLogin)||username == null||"".equals(username)) {// rgs autologin
			logger.debug("home action rgs autologin");
			String rgs_loginname = (String) request.getSession().getAttribute("rgs_loginname");
			username = rgs_loginname;

			if ("true".equals(rememberMe)) {
				this.clearCookie("username");
				this.clearCookie("rememberMe");
				this.addCookie("username", username, 365);
				this.addCookie("rememberMe", "true", 365);
			} else {
				this.clearCookie("username", username);
				this.clearCookie("rememberMe", "true");
			}
			logger.debug("homeaction begin............");
			String errorInput = "error";
			if (request == null || request.getSession() == null) {
				logger.debug("request.getSession() null, return login.");
				return errorInput;
			}

			if (StringUtils.isEmpty(this.username)) {
				logger.info("username is null...");
				return errorInput; // LOGIN
			}
			
			AdminLoginInfo info = new AdminLoginInfo();

			FcustomerInfoParam finfoParam = new FcustomerInfoParam();
			finfoParam.setAccountNo(this.username);
			FcustomersParam fcustomersParam = new FcustomersParam();
			fcustomersParam.setLoginname(this.username);
			info.setFcustomerInfoParam(finfoParam);
			info.setFcustomersParam(fcustomersParam);
			password = ClientManagerFactory.getInstance().getAccountManager().getCustomer(username, "GW").getPwd();

			request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_INFO, info);
			request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD, password);
			request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_NODE_TOKEN, "xxxxxx");

			Principal principal = new Principal(username, request.getRemoteAddr(), request.getRemotePort(), false);
			principal.setPlatform(Constant.PLATFORM_GT1);

			request.getSession().setAttribute(Constant.SESSION_PRINCIPAL, principal);

			// 用户登录后,要显示弹出公告的信息
			request.getSession().setAttribute("IS_JUST_LOGINED", true);
			request.getSession().setAttribute("SESSION_HAS_OPEN_BULLETIN", false);
			request.getSession().setAttribute(Constant.SESSION_DEVICE_TYPE, this.getDeviceType());
			logger.debug("user:" + this.username + " login success...");
			request.getSession().setAttribute("rgs_register_loginname", this.username);
			return SUCCESS;
		} else { // normal login
			try {
				logger.debug("normal login");
				String systemDevice = SystemDeviceFilter.getSystemDevice(request);
				String errorInput = "error";
				if (StringUtils.isEmpty(this.username)) {
					logger.info("username is null...");
					return errorInput; // LOGIN
				}
				String random = (String) request.getSession().getAttribute("random");
				if (randomNumber == null || !randomNumber.toLowerCase().equals(random)) {
					this.addFieldError("errorMsg", this.getText("error.captcha.not.correct"));
					return errorInput; // LOGIN
				}

				AccountManager accountManager = ClientManagerFactory.getInstance().getAccountManager();
				// 使用goldapi验证账号
				ApiResult apiResult = accountManager.loginUi(username.trim(), password.trim(), request.getRemoteAddr());
				if (!apiResult.isOk()) {
					this.addFieldError("errorMsg", this.getText("login.error." + apiResult.getCode()));
					return errorInput; // LOGIN
				}
				request.getSession().setAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN, imitate);

				if ("true".equals(rememberMe)) {
					this.clearCookie("username");
					this.clearCookie("rememberMe");
					this.addCookie("username", username, 365);
					this.addCookie("rememberMe", "true", 365);
				} else {
					this.clearCookie("username", username);
					this.clearCookie("rememberMe", "true");
				}
				logger.debug("homeaction begin............");

				if (request == null || request.getSession() == null) {
					logger.debug("request.getSession() null, return login.");
					return errorInput;
				}

				AdminLoginInfo info = new AdminLoginInfo();

				FcustomerInfoParam finfoParam = new FcustomerInfoParam();
				finfoParam.setAccountNo(this.username);
				FcustomersParam fcustomersParam = new FcustomersParam();
				fcustomersParam.setLoginname(this.username);

				info.setFcustomerInfoParam(finfoParam);
				info.setFcustomersParam(fcustomersParam);

				request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_INFO, info);
				request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD, password);
				request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_NODE_TOKEN, "xxxxxx");

				Principal principal = new Principal(username, request.getRemoteAddr(), request.getRemotePort(), false);
				principal.setPlatform(Constant.PLATFORM_GT1);

				request.getSession().setAttribute(Constant.SESSION_PRINCIPAL, principal);

				// 用户登录后,要显示弹出公告的信息
				request.getSession().setAttribute("ISLOGINED", null);
				request.getSession().setAttribute("SESSION_HAS_OPEN_BULLETIN", false);
				request.getSession().setAttribute(Constant.SESSION_DEVICE_TYPE, this.getDeviceType());
				setSesionIsIE8Method();
				logger.debug("user:" + this.username + " login success...");
				request.getSession().setAttribute("rgs_register_loginname", this.username);
			} catch (Exception e) {
				logger.error("", e);
			}
			return SUCCESS;
		}

	}

	/**
	 * check if user's browser is IE8 
	 */
	private void setSesionIsIE8Method(){
		String userAgent = request.getHeader("User-Agent");
		String broswerType = UserAgentTool.getBrowseType(userAgent);
		String IE8 = "MSIE 8.0";
		if(IE8.equals(broswerType)){
			request.getSession().setAttribute(Constant.SESSION_IS_IE8, "y");
		}else{
			request.getSession().setAttribute(Constant.SESSION_IS_IE8, "n");
		}
	}
	
	private void addCookie(String cookieName, String cookieValue, int day) {
		Cookie c = new Cookie(cookieName, cookieValue);
		// 设置Cookie有效期为365天
		c.setMaxAge(60 * 60 * 24 * day);
		c.setPath("/");
		response.addCookie(c);

	}

	private void clearCookie(String cookieName, String cookieValue) {
		Cookie[] cookies = request.getCookies();
		if (cookieValue != null) {
			if (cookies != null && cookies.length > 0) {
				Cookie cookie = getCookie(cookies, cookieName);
				if (cookie != null) {
					String _userName = cookie.getValue();
					if (cookieValue.equals(_userName)) {
						cookie.setValue(null);
						cookie.setMaxAge(0);
						cookie.setPath("/");
						response.addCookie(cookie);
					}
				}
			}
		}

	}

	private void clearCookie(String cookieName) {
		Cookie[] cookies = request.getCookies();

		Cookie cookie = getCookie(cookies, cookieName);
		if (cookie != null) {
			cookie.setValue(null);
			cookie.setMaxAge(0);
			cookie.setPath("/");
			response.addCookie(cookie);
		}

	}

	private Cookie getCookie(Cookie[] cookies, String str) {
		Cookie result = null;
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(str)) {
				result = cookie;
				break;
			}
		}
		return result;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username.trim();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password.trim();
	}

	public String getRandomNumber() {
		return randomNumber;
	}

	public void setRandomNumber(String randomNumber) {
		this.randomNumber = randomNumber;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public String getCheck() {
		return check;
	}

	public void setCheck(String check) {
		this.check = check;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public Map<String, String> getListPlatform() {
		return listPlatform;
	}

	public void setListPlatform(Map<String, String> listPlatform) {
		this.listPlatform = listPlatform;
	}

	public String getRememberMe() {
		return rememberMe;
	}

	public void setRememberMe(String rememberMe) {
		this.rememberMe = rememberMe;
	}

	public boolean isImitate() {
		return imitate;
	}

	public void setImitate(boolean imitate) {
		this.imitate = imitate;
	}

	public long getCurrentTime() {
		return System.currentTimeMillis();
	}

	public String getCountry() {
		String c = (String) request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY);
		if (StringUtils.isEmpty(c)) {
			c = "zh";
		}

		if (!"tw".equals(c) && !"zh".equals(c)) {
			c = "zh";
		}

		return c;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

}
