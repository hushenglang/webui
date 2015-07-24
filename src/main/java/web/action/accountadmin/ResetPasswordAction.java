package web.action.accountadmin;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import web.constant.Constant;
import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.interfaces.AccountManager;
import com.gwghk.gold.client.interfaces.DemoAcManager;
import com.gwghk.gold.client.models.ApiResult;

/**
 * reset user's password（set new password）
 * ResetPasswordAction.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 上午10:39:59 2014年12月1日
 * Update Time:
 */

@SuppressWarnings("serial")
public class ResetPasswordAction extends BaseAction{
	private static final Logger logger = Logger.getLogger(ResetPasswordAction.class);

	private String newpassword;
	private String oldpassword;
	
	@Override
	protected String perform() {
		logger.debug("reset password!");
		String accountno = this.getPrincipal().getLoginName();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		logger.debug("reset password for "+accountno);
		//新老密码不能相同
		if(oldpassword.trim().equals(newpassword.trim())){
			logger.debug("reset password failed! new password can not be the same as the old one!");
			resultMap.put("code", "fail");
			resultMap.put("errorCode", "11026");
			resultMap.put("errorMsg", "");
		}else{
			Boolean isImitate = (Boolean)(request.getSession().getAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN));
			ApiResult apiResult = null;
			if(isImitate!=null&&isImitate==true){
				DemoAcManager accountManager = ClientManagerFactory.getInstance().getDemoAcManager();
				apiResult	=accountManager.changeGtsPwdByDemo(accountno.trim(), oldpassword.trim(), newpassword.trim(), "GW");
			}else{
				AccountManager accountManager = ClientManagerFactory.getInstance().getAccountManager();
				apiResult	=accountManager.changePwd(accountno.trim(), oldpassword.trim(), newpassword.trim(), "GW");
			}
			if(apiResult.getCode().equals(Constant.OK)){
				logger.debug("reset password successfully! ");
				resultMap.put("code", "success");
			}else{
				logger.debug("reset password failed!");
				resultMap.put("code", "fail");
				resultMap.put("errorCode", apiResult.getCode());
				resultMap.put("errorMsg", apiResult.getErrorMsg());
				logger.error("accountno:"+accountno+",apiResult.getCode():"+apiResult.getCode()+",apiResult.getErrorMsg():"+apiResult.getErrorMsg());
			}
		}
		responseJson(resultMap);
		return this.NONE;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public String getOldpassword() {
		return oldpassword;
	}

	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}

}
