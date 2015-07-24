package web.action.accountadmin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import web.bean.AdminLoginInfo;
import web.constant.Constant;
import web.util.APIManager;
import web.util.Principal;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public abstract class BaseAction extends ActionSupport implements
		ServletRequestAware, ServletResponseAware {
	public static final Logger logger = Logger.getLogger(BaseAction.class);

	protected HttpServletRequest request;
	protected HttpServletResponse response;

	public final static String ERROR = "error";
	public final static String ERROR_TIMEOUT = "errorTimeout";

	public final static String ERROR_EXCEPTION = "ERROR_EXCEPTION"; 
	protected Principal principal;
	protected AdminLoginInfo adminLoginInfo;
	protected APIManager manager = APIManager.getInstance();

	@Override
	public String execute() {
		try {
			principal = this.getPrincipal();
			adminLoginInfo = this.getLoginInfo();

			if ("/CreateImg.action".equals(request.getServletPath())) {
				return "createImg";
			} 
			
			if(request.getParameter("check") != null && "ajax".equals((String)request.getParameter("check"))){
				if (principal == null || adminLoginInfo == null) {
					responseJson("ERROR");
					return NONE;
				}
				
			}
			
			if (principal == null || adminLoginInfo == null) {
				logger.warn("principal is null...");
				return LOGIN;
			}/* else {
				logger.debug("adminLoginInfo.getSessionId()..." + adminLoginInfo.getSessionId());
				manager.setSessionId(adminLoginInfo.getSessionId());
				webuiManager.setSessionId(adminLoginInfo.getSessionId());
			}*/

			String result = perform();
			return result;

		} catch (Throwable e) {
			logger.error("", e);
			request.setAttribute(ERROR_EXCEPTION, e);
			return ERROR;
		}
	}

	protected abstract String perform();

	public Principal getPrincipal() {
		if (this.principal == null) {
			principal = (Principal) ServletActionContext.getRequest()
					.getSession().getAttribute(Constant.SESSION_PRINCIPAL);
		}
		return principal;
	}

	public AdminLoginInfo getLoginInfo() {
		if (adminLoginInfo == null) {
			adminLoginInfo = (AdminLoginInfo) request.getSession()
					.getAttribute(Constant.SESSION_ADMIN_LOGIN_INFO);
		}
		return adminLoginInfo;
	}

	public void saveLoginInfo(AdminLoginInfo info) {
		request.getSession().setAttribute(Constant.SESSION_ADMIN_LOGIN_INFO,
				info);
	}

	public void setServletRequest(HttpServletRequest arg0) {
		request = arg0;
	}

	public void setServletResponse(HttpServletResponse arg0) {
		response = arg0;
	}	

	public void setPrincipal(Principal principal) {
		this.principal = principal;
	}

	protected String responseJson(Map<String, Object> map) {
		String json = JSONObject.fromObject(map).toString();
		responseJson(json);
		return null;
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

	protected String responseJson(String json) {
		//logger.debug(this.getClass().getSimpleName() + " json size:" + json.length());
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("application/x-json;charset=utf-8");
		try {
			PrintWriter out = response.getWriter();
			out.print(json);
			out.close();
		} catch (Exception e) {
			logger.error("", e);
		}
		return null;
	}
   
	protected static final String JSON = "json";
	
	public void outJsonArray(Object array) {
		outJsonArray(JSONArray.fromObject(array).toString());
	}
	
	public void outJsonString(String str) {
		outString(str);
	}
	
	public void outJson(Object obj) {
		outJsonString(JSONObject.fromObject(obj).toString());
	}

	public void outString(String str) {
		PrintWriter pw = null;
		HttpServletResponse response = ServletActionContext.getResponse();
		try {
			 response.setHeader("content-length", String.valueOf(str.getBytes("UTF-8").length));
			pw = response.getWriter();
			pw.write(str);
		} catch (IOException e) {
			logger.error("", e);
		} finally {
			pw.close();
		}
	}
	
	public Boolean getIsDemo(){

		Object immitateObj = request.getSession().getAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN); // 标记为模拟帐户
		Boolean isDemo = false;
		if(immitateObj != null){
			isDemo = (Boolean)immitateObj;
		}
		return isDemo;
	}
	
	protected String getIpAddr(HttpServletRequest request) {  
	    String ip = request.getHeader("x-forwarded-for");  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("Proxy-Client-IP");  
	    }  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("WL-Proxy-Client-IP");  
	    }  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getRemoteAddr();  
	    }  
	    return ip;  
	}  
}
