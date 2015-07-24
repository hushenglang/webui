package web.action.accountadmin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import web.util.Principal;

import com.opensymphony.xwork2.ActionSupport;
 
 
public class RandonCodeAction   extends ActionSupport implements ServletRequestAware,ServletResponseAware {
 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final Logger	logger = Logger.getLogger(RandonCodeAction.class);
	protected Principal principal;
	private String username;
	private String password;
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	private String country;

	
	public String getDomeCode() throws IOException
	{
		Map<String, String> map = new HashMap<String, String>();
		 
		if(request.getSession().getAttribute("random")==null)
		{
			map.put("random", "test");
		}
		else
		{
			map.put("random", (String)request.getSession().getAttribute("random"));
		}
		 
		logger.info("Code:"+map.get("random"));
		JSONObject jsonObject = new JSONObject();
		jsonObject.accumulate("map", map);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html");
		PrintWriter out;
		out = response.getWriter();
		out.println(jsonObject.toString());
		return null;
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

 

	public String getCountry()
	{
		return country;
	}


	public void setCountry(String country)
	{
		this.country = country;
	}


	public Principal getPrincipal()
	{
		return principal;
	}


	public void setPrincipal(Principal principal)
	{
		this.principal = principal;
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0)
	{
		response=arg0;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0)
	{
		request=arg0;
	}

}
