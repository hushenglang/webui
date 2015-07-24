package web.filter;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class SystemDeviceFilter{
	private static final Logger	logger = Logger.getLogger(SystemDeviceFilter.class);
	 /**
     * 检查系统设备(移动版还是桌面版） 
     */
	public static String getSystemDevice(HttpServletRequest request){
		String userAgent = "";  
		if(StringUtils.isNotBlank(request.getHeader("User-Agent"))){
			userAgent=request.getHeader("User-Agent").toLowerCase();
		}else{
			logger.error("User-Agent is blank,ip:"+request.getRemoteAddr());
		}
		return ((userAgent.contains("ipad")||
				userAgent.contains("iphone os")||
				userAgent.contains("midp")||
				userAgent.contains("rv:1.2.3.4")||
				userAgent.contains("ucweb")|| 
				userAgent.contains("android")||
				userAgent.contains("windows ce")||
				userAgent.contains("windows mobile")))?"mb":"dt";
	}
}
