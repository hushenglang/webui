package web.action.accountadmin;

import java.io.PrintWriter;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import web.constant.AccountStatus;
import web.util.WebUiUtils;

import com.gwghk.demo.gold.client.DemoClientManagerFactory;
import com.gwghk.demo.gold.client.interfaces.DemoAcManager;
import com.gwghk.demo.gold.client.models.DemoApiResult;
import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.interfaces.AccountManager;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.gold.client.models.FcustomerInfoParam;
import com.opensymphony.xwork2.ActionSupport;

public class LoginCheckAction  extends ActionSupport implements ServletRequestAware{
	private static final Logger logger = Logger.getLogger(LoginAction.class);
	protected HttpServletRequest request;
	//将会被Struts2序列化为JSON字符串的对象
	private Map<String, Object> dataMap=new HashMap<String, Object>();
	private String username;
	private String password;
	private String randomNumber;// 验证码
	private String usertype; //0:真实  1:模拟
	@Override
	public String execute() throws Exception {
		dataMap.clear();
		JSONObject jsonObject = new JSONObject();
		dataMap.put("user", "user");
		// 放入一个是否操作成功的标识
		dataMap.put("success", true);
		
		//1、验证验证码是否正确
		String random = (String) request.getSession().getAttribute("random");
		if (randomNumber == null || !randomNumber.toLowerCase().equals(random)) {
			dataMap.put("errorcode", 1);
			dataMap.put("errormsg", URLEncoder.encode(this.getText("error.captcha.not.correct"),"UTF-8"));
			request.getSession().removeAttribute("random");
			//验证码出错
			jsonObject.accumulate("map", dataMap);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html");
			PrintWriter out;
			out = response.getWriter();
			out.println(jsonObject.toString());
			return null;
		}
		//2、通过api验证，返回相应的code		
		if("0".equalsIgnoreCase(usertype)){
			AccountManager accountManager = ClientManagerFactory.getInstance().getAccountManager();
			ApiResult apiResult=accountManager.loginUi(username.trim(),password.trim(),request.getRemoteAddr());
			if(apiResult!=null && !apiResult.isOk()){
				dataMap.put("errorcode", apiResult.getCode());
				dataMap.put("errormsg", URLEncoder.encode(this.getText("login.error."+apiResult.getCode()),"UTF-8"));
				request.getSession().removeAttribute("random");
			}else{
				dataMap.put("errorcode", 0);
				dataMap.put("errormsg", "");
				//after the authentication of account/password, need to be validate the account status
				boolean isValidatedAccount = validateAccountStatus(username.trim());
				if(!isValidatedAccount){
					dataMap.put("errorcode", 2);
					dataMap.put("errormsg", URLEncoder.encode(this.getText("login.error.1007"),"UTF-8"));
				}
			}
		}else{
			DemoAcManager dmanage=DemoClientManagerFactory.getInstance().getDemoAcManager();
			logger.info("dmanage is null : "+(dmanage == null));
			DemoApiResult demoApiResult = dmanage.loginUiDemo(username.trim(),password.trim(),request.getRemoteAddr());
			ApiResult apiResult = WebUiUtils.convertApiResult(demoApiResult); 
			if(apiResult!=null && !apiResult.isOk()){
				dataMap.put("errorcode", apiResult.getCode());
				dataMap.put("errormsg", URLEncoder.encode(this.getText("login.error."+apiResult.getCode()),"UTF-8"));
				request.getSession().removeAttribute("random");
			}else{
				dataMap.put("errorcode", 0);
				dataMap.put("errormsg", "");
			}
		}
		
		jsonObject.accumulate("map", dataMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html");
		PrintWriter out;
		out = response.getWriter();
		out.println(jsonObject.toString());
		return null;
	}
	
	/**
	 * validate if the account status is available
	 * @param loginname
	 * @return
	 */
	public boolean validateAccountStatus(String loginname){
		AccountManager accountManager = ClientManagerFactory.getInstance().getAccountManager();
		FcustomerInfoParam fcustomerInfoParam=accountManager.getCustomerInfo(loginname);
		String accountStatus = fcustomerInfoParam.getAccountStatus();
		boolean flag = true;
		if(AccountStatus.M.getValue().equals(accountStatus)){
			flag= false;
		}else if(AccountStatus.D.getValue().equals(accountStatus)){
			flag= false;
		}else if(AccountStatus.C.getValue().equals(accountStatus)){
			flag= false;
		}else if(AccountStatus.I.getValue().equals(accountStatus)){
			flag= false;
		}else if(AccountStatus.N.getValue().equals(accountStatus)){
			flag= false;
		}
		if(!flag){
			logger.debug("account status is not allowed to login . status:"+accountStatus);
		}else{
			logger.debug("account is allowed to login!");
		}
		return flag;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.request=req;
		
	}
	
	/**
	 * Struts2序列化指定属性时，必须有该属性的getter方法，实际上，如果没有属性，而只有getter方法也是可以的
	 * @return
	 */
	public Map<String, Object> getDataMap() {
	     return dataMap;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRandomNumber() {
		return randomNumber;
	}
	public void setRandomNumber(String randomNumber) {
		this.randomNumber = randomNumber;
	}
	public String getUsertype() {
		return usertype;
	}
	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
}
