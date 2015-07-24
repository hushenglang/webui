package web.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * 
 * @author albert
 * 
 */
public class IllegalCharacterFilter implements Filter {
	private final static Logger	logger			= Logger.getLogger(IllegalCharacterFilter.class);
	private String[]			characterParams	= null;
	private boolean				OK				= true;

	@Override
	public void destroy() {}

	/**
	 * 此程序塊主要用來解決參數帶非法字符等過濾功能 中文字符有異常
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain arg2) throws IOException, ServletException {
		HttpServletResponse servletresponse = (HttpServletResponse) response;
		boolean status = false;
		java.util.Enumeration params = request.getParameterNames();
		String param = "";
		String paramValue = "";
		// servletresponse.setContentType("text/html");
		// servletresponse.setCharacterEncoding("utf-8");
		while (params.hasMoreElements()) {
			param = (String) params.nextElement();
			String[] values = request.getParameterValues(param);
			paramValue = "";
			if (OK) {// 過濾字符串為0個時 不對字符過濾
				for (String value : values) {
					paramValue = paramValue + value;
				}

				for (String characterParam : characterParams) {
					// System.out.println((paramValue.indexOf(characterParams[i])>=0)+"323="+paramValue+";");
					if (paramValue.indexOf(characterParam) >= 0) {
						status = true;
						break;
					}
				}
				if (status) {
					break;
				}
			}
		}
		if (status) {
			logger.debug("IllegalCharacter!!!!!" + request.getRemoteAddr());
			PrintWriter out = servletresponse.getWriter();
			out.print("<script language='javascript'>alert(\"IllegalCharacter! Your submitting form contains some illegal word, please cut out! \");history.go('-1');</script>");
		} else {
			// System.out.println("dddddd");
			arg2.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		if (config.getInitParameter("characterParams").length() < 1) {
			OK = false;
		} else {
			String characterParamsConf = config.getInitParameter("characterParams");
			characterParamsConf = characterParamsConf + ",<,>,select,delete,insert,update,SELECT,DELETE,INSERT,UPDATE,;";
			this.characterParams = characterParamsConf.split(",");
			// this.characterParams
		}
	}

}
