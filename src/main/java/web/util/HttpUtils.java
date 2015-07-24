package web.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.SocketException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

/**
 * 
 * <p>
 * Title:
 * </p>
 * <p>
 * Description: http utils
 * </p>
 * <p>
 * Copyright: Copyright (c) 2006
 * </p>
 * <p>
 * Company:
 * </p>
 * 
 * @author LiLu
 * @version 1.0
 */
@SuppressWarnings("unchecked")
public class HttpUtils {

	private  final static Logger logger = Logger.getLogger(HttpUtils.class);
	private static final String URL_PARAM_CONNECT_FLAG = "&";
	private final static int SLEEP_DELAY = 1000;
	private final static String ENCODING = "UTF-8"; //"GBK";//"UTF-8";

	private HttpUtils() {
	}

	public static List URLGet(String strUrl, Map map) throws Exception {
		List list = null;
		boolean flag = true;
		int count = 0;
		while (flag) {
			try {
				count++;
				// 最多重复尝试3次
				if (count > 3) {
					break;
				}
				list = Get(strUrl, map);
				flag = false;
			} catch (SocketException e) {
				logger.error("Connection reset,重新get一次");
				flag = true;
			} catch (Exception e) {
				throw e;
			}
		}
		return list;
	}

	/**
	 * GET METHOD
	 * 
	 * @param strUrl
	 *            String
	 * @param map
	 *            Map
	 * @throws IOException
	 * @return List
	 */
	@SuppressWarnings("static-access")
	public static List Get(String strUrl, Map map) throws IOException {
		String strtTotalURL = "";
		List result = new ArrayList();
		if (strtTotalURL.indexOf("?") == -1) {
			strtTotalURL = strUrl + "?" + getUrl(map);
		} else {
			strtTotalURL = strUrl + "&" + getUrl(map);
		}
		logger.debug("url:" + strtTotalURL);
		URL url = new URL(strtTotalURL);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setUseCaches(false);
		con.setFollowRedirects(true);
		BufferedReader in = new BufferedReader(new InputStreamReader(con
				.getInputStream()));
		while (true) {
			String line = in.readLine();
			if (line == null) {
				break;
			} else {
				result.add(line);
			}
		}
		in.close();
		return (result);
	}

	/**
	 * POST METHOD
	 * 
	 * @param strUrl
	 *            String
	 * @param content
	 *            Map
	 * @throws IOException
	 * @return List
	 */
	public static List URLPost(String strUrl, Map map) throws Exception {
		List list = null;
		boolean flag = true;
		int count = 0;
		while (flag) {
			try {
				count++;
				// 最多重复尝试3次
				if (count > 3) {
					break;
				}
				list = Post(strUrl, map);
				flag = false;
			} catch (SocketException e) {
				logger.error("Connection reset,重新post一次");
				flag = true;
			} catch (Exception e) {
				throw e;
			}
		}
		return list;
	}

	private static List<String> Post(String strUrl, Map map) throws Exception {
		String content = "";
		content = getUrl(map);
		logger.debug("Content is: " + content );
		String totalURL = null;
		if (strUrl.indexOf("?") == -1) {
			totalURL = strUrl + "?" + content;
		} else {
			totalURL = strUrl + "&" + content;
		}
		logger.debug("url:" + totalURL);
		URL url = new URL(strUrl);
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection) url.openConnection();
		} catch (Exception e) {
			// 处理打开连接失败
			if (con == null) {
				con = (HttpURLConnection) url.openConnection();
				System.out.println("URL POST连接打开失败，重新打开连接!");
			}
		}
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setAllowUserInteraction(false);
		con.setUseCaches(true);
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type",
		"application/x-www-form-urlencoded;charset=GBK");
		BufferedWriter bout = new BufferedWriter(new OutputStreamWriter(con
				.getOutputStream()));
		bout.write(content);
		bout.flush();
		bout.close();

		InputStream is = con.getInputStream();
		try{
			Thread.sleep(SLEEP_DELAY);
		}
		catch (InterruptedException e){
		}
		List <byte []> receiveBuffer = new ArrayList <byte []>();
		//		while (is.available()>0){
		//			int lengthThisTime = is.available();
		//			byte [] byteArray = new byte [lengthThisTime];
		//			is.read(byteArray, 0, lengthThisTime);
		//			receiveBuffer.add(byteArray);
		//		}
		int readed = -1;
		byte[] bytes = new byte[1024];
		while ((readed = is.read(bytes))!= -1) {
			//System.out.println("reads: " + readed);
			byte [] byteArray = new byte [readed];
			System.arraycopy(bytes, 0 ,byteArray, 0, readed);
			receiveBuffer.add(byteArray);
		}
		int totalLength = 0;
		for (byte[] byteArr_1: receiveBuffer){
			totalLength += byteArr_1.length;
		}
		byte [] byteArray_2 = new byte [totalLength];
		int offset = 0;
		for (byte[] byteArr_1: receiveBuffer){
			//System.out.println ("byteArr_1.length:"+byteArr_1.length);
			System.arraycopy(byteArr_1, 0, byteArray_2, offset, byteArr_1.length);
			offset += byteArr_1.length;
		}

		String str = new String (byteArray_2, ENCODING);
		List<String> result = new ArrayList<String>();
		result.add(str.trim());
		con.disconnect();
		return (result);

	}

	private static String getUrl(Map map) {
		if (null == map || map.keySet().size() == 0) {
			return ("");
		}
		StringBuffer url = new StringBuffer();
		Set keys = map.keySet();
		for (Iterator i = keys.iterator(); i.hasNext();) {
			String key = String.valueOf(i.next());
			if (map.containsKey(key)) {
				url.append(key).append("=")
				.append(String.valueOf(map.get(key))).append(
						URL_PARAM_CONNECT_FLAG);
			}
		}
		String strURL = "";
		strURL = url.toString();
		if (URL_PARAM_CONNECT_FLAG.equals(""
				+ strURL.charAt(strURL.length() - 1))) {
			strURL = strURL.substring(0, strURL.length() - 1);
		}
		return (strURL);
	}


	@SuppressWarnings("unused")
	private static void debugRequestParams(HttpServletRequest request) {
		String uri = request.getRequestURI();
		Enumeration e = request.getParameterNames();
		StringBuffer logBf = new StringBuffer();
		while (e.hasMoreElements()) {
			String paramName = (String) e.nextElement();
			logBf.append(paramName).append("=").append(
					request.getParameter(paramName)).append("&");
		}
		uri = uri + "?" + logBf.toString();
	}


}
