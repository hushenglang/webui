package web.constant;


public class Constant {
	public final static String AMSOK = "AMS_OK";
	public static boolean IS_TESTING_FORURGENTCLOSE = false; // 測試環境
	public final static String SESSION_PRINCIPAL = "SESSION_PRINCIPAL";
	public final static String SESSION_MENUITEM = "SESSION_MENUITEM";
	public final static String SESSION_CURRENT_CUSTOMER = "SESSION_CURRENT_CUSTOMER";
	
	public final static String SESSION_CURRENT_CUSTOMER_INFO = "SESSION_CURRENT_CUSTOMER_INFO";
	public final static String SESSION_ADMIN_LOGIN_INFO = "SESSION_ADMIN_LOGIN_INFO";
	public final static String SESSION_ADMIN_SESSIONID = "SESSION_ADMIN_SESSIONID";
	public final static String SESSION_ADMIN_LOGIN_PASSWORD = "SESSION_ADMIN_LOGIN_PASSWORD";
	public final static String SESSION_ADMIN_LOGIN_NODE_TOKEN = "SESSION_ADMIN_LOGIN_NODE_TOKEN";
	public final static String SESSION_ADMIN_IMITATE_LOGIN = "SESSION_ADMIN_IMITATE_LOGIN";
	public final static String SESSION_USERNAMEDEMO = "SESSION_USERNAMEDEMO";

	public final static String WINDOW_EOL = "\r\n";
	public final static String UNIX_EOL = "\n";

	public final static String WW_TRANS_I18N_LOCALE = "WW_TRANS_I18N_LOCALE";
	public final static String WW_TRANS_I18N_LOCALE_COUNTRY = "WW_TRANS_I18N_LOCALE_COUNTRY";
	public final static String EXTENSION = "action";
	public final static String MD5_KEY = "\r\nAMS\r\n";

	public final static String PRODUCT_GOLD = "022";
	public final static String PRODUCT_SILVER = "023";

	public final static String LIVE800_URL = "http://crm2.qq.com/page/portalpage/wpa.php?uin=800088832&amp";
	public final static String LIVE800_VIP_URL = "http://www.onlinecustomer-service.com/live800/chatClient/chatbox.jsp?companyID=208&configID=23&enterurl=http://www.24k.hk/";
	public final static String LIVE800_OLD_URL = "http://chat16.live800.com/live800/chatClient/chatbox.jsp?jid=6011207993&companyID=108962&configID=23575&codeType=steady&enterurl=http://www.24k.hk/";

	public final static String DEFAULT_CURRENCY = "USD";
	public final static String CUSTOMER_SERVICE_CHII_PHONE = "10800-852-1807 "; // 中國網通
	public final static String CUSTOMER_SERVICE_CHINA_TELECOM_PHONE = "10800-152-1807"; // 中國電信
	public final static String HONG_KONG_CUSTOMER_SERVICE_PHONE = "(852) 3719 9945";
	public final static String HONG_KONG_CUSTOMER_SERVICE_FAX = "(852) 3691 9730";
	public final static String CS_EMAIL = "cs@24k.hk";
	public final static String QQ = "1204180458";
	public final static String OUR_COMPANY_STANDARD_CHARTER_BANK_USD_ACCOUNT = "003-574-1-162844-2";
	public final static String OUR_COMPANY_STANDARD_CHARTER_BANK_HKD_ACCOUNT = "003-574-1-162638-5";
	public final static int DECIMAL_PLACE = 2;
	public final static String ENCODING = "UTF-8";

	public final static int DIVIDE_DECIMAL = 2;


	public final static String PLATFORM_GW = "GW";
	public final static String PLATFORM_MT5 = "MT5";
	public final static String PLATFORM_MT4 = "MT4";
	public final static String PLATFORM_GT1 = "GT1";

	public final static String OK = "OK";

	public final static String GT_MD5_FORMAT = "%s\n%s\nGT";
	//设备类型(dt桌面版、mb移动版)
	public final static String SESSION_DEVICE_TYPE = "SESSION_DEVICE_TYPE";//用于主页（区分移动版还是桌面版）
	public final static String SESSION_IS_IE8 = "SESSION_IS_IE8";//浏览器类型是否是IE8. y-是, 其他否.
	public final static String SESSION_HAS_OPEN_BULLETIN = "SESSION_HAS_OPEN_BULLETIN";//是否已经弹出公告
	
	public final static String SESSION_NODEJS_SID = "SESSION_NODEJS_SID";
	
	public final static String SESSION_ISNEEDGW_SHIELD_AUTH = "SESSION_ISNEEDGW_SHIELD_AUTH"; //is nedd GWShield authenticated; true-need, false-no need
	public final static String SESSION_GW_SHIELD_USERNAME = "SESSION_GW_SHIELD_USERNAME"; 
	public final static String SESSION_GW_SHIELD_PASSWORD = "SESSION_GW_SHIELD_PASSWORD"; 
	public final static String RGS_PARAM_GW_SHIELD_ISAUTHORIZED = "RGS_PARAM_GW_SHIELD_ISAUTHORIZED"; //RGS parameter which indicate whether user has authorized GW-Shield
	public final static String RGS_PARAM_GW_SHIELD_ISONESTOP = "RGS_PARAM_GW_SHIELD_ISONESTOP"; //是否是金道通帐户登陆 "true"-是; 其他-不是;
	public final static String RGS_PARAM_GW_SHIELD_ONESTOP_ACCOUNT = "RGS_PARAM_GW_SHIELD_ONESTOP_ACCOUNT"; //金道通帐户的accountno;
}
