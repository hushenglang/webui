package web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class NoCacheFilter implements Filter{

	private static Logger logger = Logger.getLogger(NoCacheFilter.class);
	
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest arg1, ServletResponse arg2,
			FilterChain filterChain) throws IOException, ServletException {
		try{
			HttpServletRequest request = (HttpServletRequest) arg1; 
			HttpServletResponse response = (HttpServletResponse) arg2;
			if(request.getParameter("v") == null){
				response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
				response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
				response.setDateHeader("Expires", 0); // Proxies.	
			}		
		}catch(Exception e){
			logger.error("", e);
		}finally{
			filterChain.doFilter(arg1, arg2);	
		}
	}

	@Override
	public void destroy() {
		
	}
	
}
