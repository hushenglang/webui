package web.constant;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户协议中的浏览器, 终端等判断工具类
 * BrowserTool.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午02:30:10 2014年6月5日
 * Update Time:
 */
public class UserAgentTool {  
	//浏览器类型
	private final static String IE11="MSIE 11";  
	private final static String IE10="MSIE 10";  
    private final static String IE9="MSIE 9.0";  
    private final static String IE8="MSIE 8.0";  
    private final static String IE7="MSIE 7.0";  
    private final static String IE6="MSIE 6.0";  
    private final static String MAXTHON="Maxthon";  
    private final static String QQ="QQBrowser";  
    private final static String UC="UCBrowser";  
    private final static String MIUI="MiuiBrowser";  
    private final static String GREEN="GreenBrowser";  
    private final static String SE360="360SE";  
    private final static String FIREFOX="Firefox";  
    private final static String OPERA="Opera";  
    private final static String CHROME="Chrome";  
    private final static String SAFARI="Safari";  
    private final static String OTHER="其它";  
    
    /**
     * 检查系统设备(是android还是ios还是其他）
     */
	public static String getSystemDevice(String userAgent){
		userAgent = userAgent.toLowerCase();
		String result = null;
		if(userAgent.contains("ipad")){
			result = "ios";
		}else if(userAgent.contains("iphone os")){
			result = "ios";
		}else if(userAgent.contains("android")){
			result = "android";
		}else if(userAgent.contains("windows")){
			result = "windows";
		}else if(userAgent.contains("ipad")){
			result = "ios";
		}else{
			result="others";
		}
		return result;
	}
	
	 /**
     * 检查系统设备(是手机, 平板, PC）
     */
	public static String getTerminalDevice(String userAgent){
		userAgent = userAgent.toLowerCase();
		String result = null;
		if(userAgent.contains("ipad")){
			result = "pad";
		}else if(userAgent.contains("iphone os")){
			result = "mb";
		}else if(userAgent.contains("android")){
			result = "mb";
		}else if(userAgent.contains("windows mobile")){
			result = "mb";
		}else if(userAgent.contains("windows")){
			result = "pc";
		}else{
			result="others";
		}
		return result;
	}
     
    
    /**
     * 获取浏览器类型
     * @param userAgent
     * @return
     */
    public static String getBrowseType(String userAgent){  
        if(regex(OPERA, userAgent))return OPERA;  
        if(regex(CHROME, userAgent))return CHROME;  
        if(regex(FIREFOX, userAgent))return FIREFOX;  
        if(regex(SE360, userAgent))return SE360;  
        if(regex(GREEN,userAgent))return GREEN;  
        if(regex(QQ,userAgent))return QQ;  
        if(regex(UC,userAgent))return UC;  
        if(regex(MIUI,userAgent))return MIUI;  
        if(regex(MAXTHON, userAgent))return MAXTHON;  
        if(regex(IE11,userAgent))return IE11;  
        if(regex(IE10,userAgent))return IE10;  
        if(regex(IE9,userAgent))return IE9;  
        if(regex(IE8,userAgent))return IE8;  
        if(regex(IE7,userAgent))return IE7;  
        if(regex(IE6,userAgent))return IE6;  
        if(regex(SAFARI, userAgent))return SAFARI;  
        return OTHER;  
    }  
    private static boolean regex(String regex,String str){  
        Pattern p =Pattern.compile(regex.toLowerCase(),Pattern.MULTILINE);  
        Matcher m=p.matcher(str.toLowerCase());  
        return m.find();  
    }  
  
}  
