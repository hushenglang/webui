package web.action.accountadmin;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import web.constant.Constant;

@SuppressWarnings("serial")
public class LogoffAction extends BaseAction {

	private String nodeSid;
	
	@Override
	protected String perform() {
		HttpSession session = request.getSession();
		String nodeSid = (String)session.getAttribute(Constant.SESSION_NODEJS_SID);
		String requestNodeSid = request.getParameter("nodeSid");
		logger.debug("Logout sid " + requestNodeSid + ", current sid " + nodeSid);
		// to check if logout current session.
		if(nodeSid == null || requestNodeSid == null || nodeSid.equals(requestNodeSid)){
			session.removeAttribute(Constant.SESSION_PRINCIPAL);
			session.removeAttribute(Constant.SESSION_ADMIN_LOGIN_INFO);
			session.removeAttribute(Constant.SESSION_ADMIN_LOGIN_PASSWORD);
			session.removeAttribute(Constant.SESSION_ADMIN_IMITATE_LOGIN);
			session.removeAttribute(Constant.SESSION_USERNAMEDEMO);
			session.removeAttribute(Constant.SESSION_NODEJS_SID);	
	   	    session.invalidate();
	   		ServletActionContext.getRequest().getSession().invalidate();	
	   		logger.debug("Invalidate session.");
		}
		return SUCCESS;
   }

	public String getNodeSid() {
		return nodeSid;
	}

	public void setNodeSid(String nodeSid) {
		this.nodeSid = nodeSid;
	}
}

