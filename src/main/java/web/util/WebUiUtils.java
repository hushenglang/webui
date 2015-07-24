package web.util;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;

import com.gwghk.demo.gold.client.models.DemoApiResult;
import com.gwghk.gold.client.models.ApiResult;

public class WebUiUtils {
	
	private static final Logger logger = Logger.getLogger(WebUiUtils.class);

	public static ApiResult convertApiResult(DemoApiResult demoApiResult){
		ApiResult result = new ApiResult();
		try{
			PropertyUtils.copyProperties(result, demoApiResult);	
		}catch(Exception e){
			logger.error("", e);
		}
		return result;
		
	}
	
}
