package web.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import web.constant.Constant;
import web.util.StringUtil;

import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.enums.GwShieldSystemConfigType;
import com.gwghk.gold.client.enums.GwShieldUserStatus;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.gold.client.models.GwShieldCustomerRecordParam;
import com.gwghk.rgs.client.constant.RGSSessionConstant;

public class GWShieldFilter implements Filter {

	private final static Logger logger = Logger.getLogger(GWShieldFilter.class);
	
	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc) throws IOException, ServletException {
		logger.debug("GWShieldFilter start check");
		if(isRGSAuthorized((HttpServletRequest)request)){//rgs单点登陆, 如果跳转的终端没有进行过金道盾验证(如:pcui和app是不用的, 则还是需要走一遍判断是否此用户需要进行金道盾验证的逻辑);			
			logger.debug("rgs login has authorized gw-shield, directly go to the home page!");
			((HttpServletRequest)request).getSession().setAttribute("ISRGS_LOGIN", "true");
			fc.doFilter(request, response);
			return;
		}else{// 非rgs单点登陆或rgs单点登陆没有进行过金道盾验证(一般请求是来自pcui或app)
			logger.debug("非rgs单点登陆或rgs单点登陆没有进行过金道盾验证(一般请求是来自pcui或app)");
			HttpServletRequest httpRequest= (HttpServletRequest)request;
			String username = getUserNameAndNoteRGS(httpRequest);
			String password = request.getParameter("password");
			String deviceType = request.getParameter("deviceType");
			String lang = (String) httpRequest.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE_COUNTRY); //tw-繁体; zh-简体
			String shieldLoginPath = getShieldLoginPath(lang, deviceType);
			if(StringUtils.isEmpty(username)){
				logger.debug("GWShieldFilter go to login directly!");
				request.getRequestDispatcher("/").forward(request, response);
			}else{
				logger.debug("Check GWShieldFilter");
				httpRequest.getSession().setAttribute(Constant.SESSION_GW_SHIELD_USERNAME,username);
				httpRequest.getSession().setAttribute(Constant.SESSION_GW_SHIELD_PASSWORD,password);
				boolean isNeedShieldAuth = isNeedShieldAuthentication((HttpServletRequest)request, username);
				if(!isNeedShieldAuth){
					logger.debug("directly go to the home page!");
					fc.doFilter(request, response);
				}else{
					logger.debug("go to the gw shield authentification page!");
					request.getRequestDispatcher(shieldLoginPath).forward(request, response);
				}
			}
		}
	}

	private String getUserNameAndNoteRGS(HttpServletRequest request){
		String rgs_loginname = (String)request.getSession().getAttribute(RGSSessionConstant.SESSION_RGS_LOGINNAME);
		logger.debug("getUserNameAndNoteRGS rgs_loginname:"+rgs_loginname);
		if(!StringUtils.isEmpty(rgs_loginname)){
			request.getSession().setAttribute("ISRGS_LOGIN", "true");
		}
		String loginname = (StringUtils.isEmpty(request.getParameter("username")))?rgs_loginname:request.getParameter("username");
		logger.debug("loginname:"+loginname);
		return loginname;
	}
	
	/**
	 * rgs单点登陆, 如果跳转的终端没有进行过金道盾验证(如:pcui和app是不用的, 则还是需要走一遍判断是否此用户需要进行金道盾验证的逻辑);	
	 * @param request
	 * @return true-yes(已经在跳转终端验证过金道盾,则不用再次验证); false-no (需进行金道盾验证)
	 */
	private boolean isRGSAuthorized(HttpServletRequest request) {
		logger.debug("isRGSAuthorized! request : " + request);
		boolean flag = false;
		Map<String, String> rgsParamMap = null;
		String paramIsRGSAuthorized = null;
		Map<String, String> rgsRegisterParamMap = new HashMap<String, String>();
		try {
			rgsParamMap = (Map<String, String>) request.getSession().getAttribute(RGSSessionConstant.SESSION_RGS_ATTRIBUTE_MAP);
			if (rgsParamMap == null) {
				logger.debug("rgsParamMap is null");
				return false;
			}
			paramIsRGSAuthorized = (String) rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ISAUTHORIZED);
			logger.debug("RGS_PARAM_GW_SHIELD_ISAUTHORIZED : " + paramIsRGSAuthorized);
			if ("true".equals(paramIsRGSAuthorized)) {
				flag = true;
			}
		} catch (Exception e) {
			logger.error("error occured when get json attribute from rgs : " + rgsParamMap, e);
		}
		// 写回金道通帐户accountno和标识; 写回金道盾是否在第三方已经验证过标识
		if(!StringUtil.isNullOrEmpty(rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ISONESTOP)))
			rgsRegisterParamMap.put(Constant.RGS_PARAM_GW_SHIELD_ISONESTOP, rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ISONESTOP));
		if(!StringUtil.isNullOrEmpty(rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ONESTOP_ACCOUNT)))
			rgsRegisterParamMap.put(Constant.RGS_PARAM_GW_SHIELD_ONESTOP_ACCOUNT, rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ONESTOP_ACCOUNT));
		if(!StringUtil.isNullOrEmpty(rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ISAUTHORIZED)))
			rgsRegisterParamMap.put(Constant.RGS_PARAM_GW_SHIELD_ISAUTHORIZED, rgsParamMap.get(Constant.RGS_PARAM_GW_SHIELD_ISAUTHORIZED));
		request.getSession().setAttribute(RGSSessionConstant.SESSION_RGS_REGISTER_ATTRIBUTE_MAP, rgsRegisterParamMap);
		return flag;
	}
	
	/**
	 * get shield login path
	 * @param lang
	 * @return
	 */
	private String getShieldLoginPath(String lang, String deviceType){
		String zhPath="/jsp/webui/gw_shield_login_zh.jsp";
		String twPath="/jsp/webui/gw_shield_login_tw.jsp";
		if("mb".equals(deviceType)){
			zhPath="/mobile/jsp/gw_shield_login_zh.jsp";
			twPath="/mobile/jsp/gw_shield_login_tw.jsp";
		}
		if("tw".equalsIgnoreCase(lang))
			return twPath;
		else
			return zhPath;
	}
	
	public void init(FilterConfig fc) throws ServletException {
		
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
	
	/**
	 * whether or not user need to input GWShield code to be authentication
	 * @return false - no need to be authentication; true- need to be authentication.
	 */
	private boolean isNeedShieldAuthentication(HttpServletRequest request, String loginname){
		logger.debug("check if this account need to login with GWShield!");
		ApiResult apiResultcheck = ClientManagerFactory.getInstance().getGwShieldManager().checkGwShieldSystem(GwShieldSystemConfigType.GwShieldCloud.getValue());
		if(apiResultcheck.isOk()){
			String flag = (String)apiResultcheck.getReturnObj()[0];
			if("ON".equals(flag)){
				logger.debug("GWShield is open to WEBUI");
				boolean isNeedAuthentication = checkActiveGwShieldCustomer(request, loginname);
				if(isNeedAuthentication){
					logger.debug("need GWShield authentication");
				}else{
					logger.debug("no need GWShield authentication");
				}
				return isNeedAuthentication;
			}else{
				logger.debug("GWShield is close to WEBUI, no need to commit authentication");
				return false;
			}
		}else{
			logger.error("~~~十分紧急!~~~~金道盾开关检查接口异常, 请立即联系管理员!");
			return false;
		}
	}
	
	/**
	 * 
	 * @param request
	 * @param loginname
	 * @return false - no need to be authentication; true- need to be authentication.
	 */
	private boolean checkActiveGwShieldCustomer(HttpServletRequest request, String loginname){
		Boolean isNeedGWShieldAuth = (Boolean)request.getSession().getAttribute(Constant.SESSION_ISNEEDGW_SHIELD_AUTH);
		if(isNeedGWShieldAuth==null||isNeedGWShieldAuth==true){//invoke api interface to determine whether or not need to be authentication
			Long onestopCusId= getOneStopCustomerID(loginname);
			ApiResult apiResult =	ClientManagerFactory.getInstance().getGwShieldManager().getActiveGwShieldCustomerRecord(onestopCusId);
			logger.debug("apiResult:"+apiResult);
			if (apiResult.isOk()) {
				GwShieldCustomerRecordParam gwShield = (GwShieldCustomerRecordParam)apiResult.getReturnObj()[0];
				logger.debug("GwShieldCustomerRecordParam:"+gwShield);
				if (gwShield != null) {
					String jddStatus = gwShield.getGwShieldUserStatus();
					boolean lagGwShiled = GwShieldUserStatus.ACTIVATE.getValue().equals(jddStatus) || GwShieldUserStatus.REPORT_STOLEN.getValue().equals(jddStatus);//需要檢測金道盾
					request.getSession().setAttribute(Constant.SESSION_ISNEEDGW_SHIELD_AUTH, lagGwShiled);
					return lagGwShiled;
				}else{
					return false;
				}
			}else{
				if("NO_USER_RECORD".equals(apiResult.getErrorMsg())){
					return false;
				}else{
					return true;
				}
			}
		}else{
			return isNeedGWShieldAuth;
		}
	}
}
