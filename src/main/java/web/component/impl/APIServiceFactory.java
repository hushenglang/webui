package web.component.impl;

import web.component.GWAPIService;

/**
 * Api Service Factory provides gwapi and other api service interface
 * APIServiceFactory.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午03:00:20 2014年12月2日
 * Update Time:
 */
public class APIServiceFactory {
	/**
	 * 获取gwapi service interface
	 * @return
	 */
	public static GWAPIService getGWAPIService(){
		return GWAPIServiceImpl.getInstant();
	}

}
