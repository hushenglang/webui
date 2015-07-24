package web.action.accountadmin;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import web.bean.FcustomersParam;
import web.constant.Constant;

public class InitGoldMainAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private static final Logger	logger = Logger.getLogger(InitGoldMainAction.class);

	@Override
	protected String perform() {
		try {
			Map<String, String> initConfig = new HashMap<String, String>();
			
			this.adminLoginInfo = this.getLoginInfo();
			String rgs_loginname = (String) request.getSession().getAttribute("rgs_loginname");
			String isRGSLogin = "false";
			if(!StringUtils.isEmpty(rgs_loginname))
				isRGSLogin="true";
			if (adminLoginInfo != null) {
				FcustomersParam customer = adminLoginInfo.getFcustomersParam();
				
				String genId = request.getParameter("genId");
				String nodeSid = null;
				if("true".equals(genId)){
					nodeSid = UUID.randomUUID().toString();
					request.getSession().setAttribute(Constant.SESSION_NODEJS_SID, nodeSid);	
					logger.debug("Login nodejs, loginname " + customer.getLoginname() + ", sid " + nodeSid);
				}
				
				initConfig.put("loginname", customer.getLoginname());
				String pwd = (String) request.getSession().getAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD);
				pwd = pwd + ":" + principal.getToken();
				if(StringUtils.isNotEmpty(genId)){
					pwd = pwd + ":" + nodeSid;
				}
				initConfig.put("pwd", pwd);
				initConfig.put("loginname", customer.getLoginname());
				initConfig.put("isRGSLogin", isRGSLogin);
				initConfig.put("nodeUrl", this.getPrincipal().getUrlTrade());
				initConfig.put("newsUrl", this.getPrincipal().getUrlNews());
				initConfig.put("flag", "success");
				initConfig.put("nodeSid", nodeSid);
				logger.warn("nodeUrl:" + this.getPrincipal().getUrlTrade() + ", newsUrl:" + this.getPrincipal().getUrlNews());
			} else {
				logger.warn("adminLoginInfo null");
				initConfig.put("flag", "error");
			}
			JSONObject jsonObject = new JSONObject();
			jsonObject.accumulate("initConfig", initConfig);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html");
			String jsonResult = jsonObject.toString();
			PrintWriter out;
			out = response.getWriter();
			out.println(jsonResult);
			logger.debug("jsonResult : "+jsonResult);
		} catch (Exception e) {
			logger.error("", e);
		}
		return null;
	}

}
