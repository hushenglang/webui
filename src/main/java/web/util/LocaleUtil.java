package web.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import web.constant.Constant;

public class LocaleUtil {

	public static void initLocale(HttpServletRequest request){
		// chrom zh-TW,zh;q=0.8,zh-CN;
		// firefox zh-tw,en-us;q=0.8,zh-cn;q=0.5,zh;q=0.3
		// IE accept-language:zh-HK,zh-MO;q=0.8,zh-TW;q=0.6,zh-SG;q=0.4,zh-CN;q=0.2
//		logger.debug ("accept-language:"+request.getHeader("accept-language"));
		String acceptLanguage = request.getHeader("accept-language").toLowerCase();
		int trad;
		{
			int tradTW = acceptLanguage.indexOf("zh-tw");
//			logger.debug ("tradTW:"+tradTW);
			if (tradTW < 0)
				tradTW = Integer.MAX_VALUE;
			int tradHK = acceptLanguage.indexOf("zh-hk");
//			logger.debug ("tradHK:"+tradHK);
			if (tradHK < 0)
				tradHK = Integer.MAX_VALUE;
			int tradMO = acceptLanguage.indexOf("zh-mo");
//			logger.debug ("tradMO:"+tradMO);
			if (tradMO < 0)
				tradMO = Integer.MAX_VALUE;
			trad = tradTW;
			if (tradHK < trad)
				trad = tradHK;
			if (tradMO < trad)
				trad = tradMO;
//			logger.debug ("trad:"+trad);
		}
		int simp = 0;
		{
			int simpCN = acceptLanguage.indexOf("zh-cn");
//			logger.debug ("simpCN:"+simpCN);
			if (simpCN < 0)
				simpCN = Integer.MAX_VALUE;
			simp= simpCN; 
		}
		if (simp > trad)
			request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, Locale.TRADITIONAL_CHINESE);
		else
			request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, Locale.SIMPLIFIED_CHINESE);
		
	}
//	{//firefox "zh-tw"  //ie zh-HK  
//		// chrom zh-TW,zh;q=0.8,zh-CN;
//		// firefox zh-tw,en-us;q=0.8,zh-cn;q=0.5,zh;q=0.3
//		// accept-language:zh-HK,zh-MO;q=0.8,zh-TW;q=0.6,zh-SG;q=0.4,zh-CN;q=0.2
//		logger.debug ("accept-language:"+request.getHeader("accept-language"));
//		String acceptLanguage = request.getHeader("accept-language").toLowerCase();
//		int trad;
//		{
//			int tradTW = acceptLanguage.indexOf("zh-tw");
//			if (tradTW < 0)
//				tradTW = Integer.MAX_VALUE;
//			int tradHK = acceptLanguage.indexOf("zh-hk");
//			if (tradHK < 0)
//				tradHK = Integer.MAX_VALUE;
//			int tradMO = acceptLanguage.indexOf("zh-mo");
//			if (tradMO < 0)
//				tradMO = Integer.MAX_VALUE;
//			trad = tradTW;
//			if (tradHK < trad)
//				trad = tradHK;
//			if (tradMO < trad)
//				trad = tradMO;
//		}
//		int simp = 0;
//		{
//			int simpCN = acceptLanguage.indexOf("zh-cn");
//			if (simpCN < 0)
//				simpCN = Integer.MAX_VALUE;
//			simp= simpCN; 
//		}
//		if (simp > trad)
//			request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, Locale.TRADITIONAL_CHINESE);
//		else
//			request.getSession().setAttribute(Constant.WW_TRANS_I18N_LOCALE, Locale.SIMPLIFIED_CHINESE);
//	}

	public static Locale getLocale(HttpServletRequest request){
		{
			Locale locale = (Locale)request.getSession().getAttribute(Constant.WW_TRANS_I18N_LOCALE);
			if (locale== null ){
				locale = Locale.SIMPLIFIED_CHINESE;
			}
			
			if(locale != Locale.SIMPLIFIED_CHINESE && locale != Locale.TRADITIONAL_CHINESE) {
				locale = Locale.SIMPLIFIED_CHINESE;
			}
			
			return locale;
		}
	}
	
	public static String getLocaleCountry(Locale locale){
		String country = null;
		if(locale != null){
			country = locale.getCountry().toLowerCase();
			if(country == null){
				country = locale.getLanguage();
			}else if("cn".equals(country) ){
				country = "zh";
			}
		}
		
		if(!"zh".equals(country) && !"tw".equals(country)){
			country = "zh";
		}
		
		return country;
	}

}
