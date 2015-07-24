package web.action.accountadmin;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import web.constant.Constant;
import web.constant.GWShieldConstant;
import web.constant.UserAgentTool;

import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.rgs.client.constant.RGSSessionConstant;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

/**
 * 金道盾登陆验证
 * GWShieldLoginAction.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 上午10:00:12 2014年12月16日
 * Update Time:
 */
@SuppressWarnings("serial")
public class GWShieldLoginAction extends ActionSupport implements ServletRequestAware,
		ServletResponseAware, Preparable {

	private final static Logger logger = Logger.getLogger(HomeAction.class);
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	private String gw_shield_code;
	private String username;
	private String deviceType;
	private int count;
	
	@Override
	public String execute() {
		logger.debug("GWShield authentication!");
		String inputPath = getInputPath();
		try{
			if(!validateParam()){
				response.sendRedirect(request.getContextPath());
				return null;
			}
			Long onestopCusId= getOneStopCustomerID(username);
			ApiResult apiResult = null;
			if(gw_shield_code.length()==6){
				apiResult =	ClientManagerFactory.getInstance().getGwShieldManager().checkDynamicPwd(onestopCusId, gw_shield_code);
			}
			logger.debug("GWShield authentication apiResult:"+apiResult);
			if (apiResult!=null&&apiResult.isOk()) {
				logger.debug("GWShield authentication success!");
				request.getSession().setAttribute(Constant.SESSION_ISNEEDGW_SHIELD_AUTH, false);
				//set rgs param for gw shield authorization
				Map<String, String> rgsParamMap=new HashMap<String, String>();
				rgsParamMap.put(Constant.RGS_PARAM_GW_SHIELD_ISAUTHORIZED, "true");
				request.getSession().setAttribute(RGSSessionConstant.SESSION_RGS_REGISTER_ATTRIBUTE_MAP, rgsParamMap);
				return this.SUCCESS;
			}else{
				String errorMsg=null;
				if(apiResult!=null){
					errorMsg = apiResult.getErrorMsg();
				}
				logger.debug("GWShield authentication failed! errorMsg : "+errorMsg);
				if("TOKEN_IS_LOCKED".equals(errorMsg))
					request.setAttribute("msgcode", GWShieldConstant.SHIELDCODE_ERROR_LOCK);
				else if("DYNAMIC_CODE_USED".equals(errorMsg))
					request.setAttribute("msgcode", GWShieldConstant.SHIELDCODE_ERROR_DYNAMIC_CODE_USED);
				else {
					if(count==4){
						count=0;
						request.setAttribute("msgcode", GWShieldConstant.SHIELDCODE_ERROR_5TIMESFAIL);
					}else{
						count++;
						request.setAttribute("msgcode", GWShieldConstant.SHIELDCODE_ERROR_LOGINFAIL);
					}
				}
				request.getSession().setAttribute(Constant.SESSION_ISNEEDGW_SHIELD_AUTH, true);
				return inputPath;
			}
		}catch (Exception e) {
			logger.error(e);
			return inputPath;
		}
	}
	
	private String getInputPath(){
		if(StringUtils.isEmpty(deviceType)||"null".equals(deviceType)){
			String userAgent = request.getHeader("User-Agent");
			String terminalType = UserAgentTool.getTerminalDevice(userAgent);
			if("pc".equals(terminalType)){
				return this.INPUT+"_dt";
			}else{
				return this.INPUT+"_mb";
			}
		}
		else{
			if("dt".equals(deviceType)){
				return this.INPUT+"_dt";
			}else{
				return this.INPUT+"_mb";
			}
		}
	}
	
	/**
	 * validate wheather params is correct
	 * @return
	 */
	private boolean validateParam(){
		username = (String)request.getSession().getAttribute(Constant.SESSION_GW_SHIELD_USERNAME);
		if(org.apache.commons.lang.StringUtils.isEmpty(username)){
			return false;
		}
		return true;
	}

	/**
	 * get onestopCustomerID by Loginname
	 * @param logniname
	 * @return onestopCustomerId
	 */
	private Long getOneStopCustomerID(String logniname){
		com.gwghk.gold.client.models.FcustomerInfoParam customerInfoParam = ClientManagerFactory.getInstance().getAccountManager().getCustomerInfo(logniname);
		if(customerInfoParam!=null)
			return customerInfoParam.getOneStopCustomerInfoId();
		else
			return null;
	}

	@Override
	public void prepare() throws Exception {
		// TODO Auto-generated method stub
	}

	public String getGw_shield_code() {
		return gw_shield_code;
	}


	public void setGw_shield_code(String gw_shield_code) {
		this.gw_shield_code = gw_shield_code;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
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

	public int getCount() {
		return count;
	}

	public void setCount(String count) {
		if(count == null)
			this.count = 0;
		else
			this.count = Integer.valueOf(count);
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	
}
