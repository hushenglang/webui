package web.action.accountadmin;

import org.apache.log4j.Logger;

import web.constant.Constant;
import web.constant.OnlineStatistics;
import web.constant.UserAgentTool;
import web.util.ConstantsUtil;

/**
 * 用于webui保持session不过期和进行在线统计用的
 * AccountStatusAction.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 上午11:09:18 2014年6月6日
 * Update Time:
 */
@SuppressWarnings("serial")
public class AccountStatusAction extends BaseAction {
	private Logger logger = Logger.getLogger(AccountStatusAction.class);
	
	@Override
	protected String perform() {
		String isOpen = ConstantsUtil.getProp("online-isopen");
		if("true".equals(isOpen)){
			saveOnlineStatistic();
		}
		return NONE;
	}
	
	private void saveOnlineStatistic(){
		logger.debug("AccountStatusAction-saveOnlineStatistic");
		web.util.Principal principal= this.getPrincipal();
		String accountNo = principal.getLoginName();
		String loginType = request.getParameter("ptype");//dt-桌面版; mb-移动版
		Boolean isImitate = (Boolean) request.getSession().getAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN);
		String userAgent = request.getHeader("User-Agent");
		String terminalType = UserAgentTool.getTerminalDevice(userAgent);
		String systemType= UserAgentTool.getSystemDevice(userAgent);
		String browserType = UserAgentTool.getBrowseType(userAgent);
		String ip = getIpAddr(request);
		String accounttype = "d";//r-真实帐号, d-模拟帐号
		if(isImitate!=null&&isImitate!=true)
			accounttype = "r";
		
		new OnlineStatistics().saveStatistic(accountNo, loginType, terminalType, browserType, ip, accounttype, systemType, userAgent);
	}
}
