package web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
public class SetCharacterEncodingFilter implements Filter {
	private String encoding = "UTF-8";
	public void destroy() {}
	public void doFilter(ServletRequest req,
			ServletResponse res, FilterChain fc) throws
			IOException, ServletException {
		req.setCharacterEncoding(encoding);
		fc.doFilter(req, res);
	}
	public void init(FilterConfig fc) throws
	ServletException {
		String encodingParam =
			fc.getInitParameter("encoding");
		if (encodingParam != null)
			encoding =
				encodingParam;
	}
}
