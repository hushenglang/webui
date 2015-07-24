package web.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

public class HttpUrl {
	private static final String URL_PARAM_CONNECT_FLAG = "&";
	static Logger logger = Logger.getLogger(HttpUrl.class);
	// // For MT5 ////
	private static HttpClient client;

	public static HttpClient getHttpClient() {
		if (client == null) {
			client = new HttpClient(new MultiThreadedHttpConnectionManager());
		}
		return client;
	}

	// //////////

	public static String sendGet(String url, String param) {
		String result = "";
		try {
			String urlName = url + "?" + param;//

			URL U = new URL(urlName);
			URLConnection connection = U.openConnection();
			connection.connect();

			BufferedReader in = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
			in.close();
		} catch (Exception e) {
			logger.error("", e);
		}
		return result;
	}

	public static String sendPost(String url, String param) {
		logger.debug(url + "?" + param);
		String result = "";
		try {
			URL httpurl = new URL(url);
			HttpURLConnection httpConn = (HttpURLConnection) httpurl
					.openConnection();
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			PrintWriter out = new PrintWriter(httpConn.getOutputStream());
			out.print(param);
			out.flush();
			out.close();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					httpConn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
			logger.debug("result: " + result);
			in.close();
		} catch (Exception e) {
			logger.error("", e);
		}
		return result;
	}

	public static String sendPostWithoutLog(String url, String param) {
		String result = "";
		try {
			URL httpurl = new URL(url);
			HttpURLConnection httpConn = (HttpURLConnection) httpurl
					.openConnection();
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			PrintWriter out = new PrintWriter(httpConn.getOutputStream());
			out.print(param);
			out.flush();
			out.close();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					httpConn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}

			in.close();
		} catch (Exception e) {
			logger.error("", e);
		}
		return result;
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
						.append(String.valueOf(map.get(key)))
						.append(URL_PARAM_CONNECT_FLAG);
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

	public static List URLGet(String strUrl, Map map) throws IOException {
		String strtTotalURL = "";
		List result = new ArrayList();
		if (strtTotalURL.indexOf("?") == -1) {
			strtTotalURL = strUrl + "?" + getUrl(map);
		} else {
			strtTotalURL = strUrl + "&" + getUrl(map);
		}
		URL url = new URL(strtTotalURL);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setUseCaches(false);
		con.setFollowRedirects(true);
		BufferedReader in = new BufferedReader(new InputStreamReader(
				con.getInputStream()));
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

	public static List URLPost(String strUrl, Map map) throws IOException {
		final int byteArraySize = 100000;
		final int sleepTime = 1000;
		String content = "";
		content = getUrl(map);
		String totalURL = null;
		if (strUrl.indexOf("?") == -1) {
			totalURL = strUrl + "?" + content;
		} else {
			totalURL = strUrl + "&" + content;
		}
		// System.out.println("totalURL:" + totalURL);
		URL url = new URL(strUrl);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setAllowUserInteraction(false);
		con.setUseCaches(false);
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type",
				"application/x-www-form-urlencoded;charset=GBK");
		BufferedWriter bout = new BufferedWriter(new OutputStreamWriter(
				con.getOutputStream()));
		bout.write(content);
		// System.out.println("content:"+content);
		bout.flush();
		bout.close();

		byte[] byteAray = new byte[byteArraySize];
		int offset = 0;
		InputStream is = con.getInputStream();
		try {
			Thread.sleep(sleepTime);
		} catch (InterruptedException e) {
		}
		while (is.available() > 0) {
			int lengthThisTime = is.available();
			// System.out.println ("lengthThisTime"+lengthThisTime);
			is.read(byteAray, offset, lengthThisTime);
			offset += lengthThisTime;
		}
		byte[] byteArray_2 = new byte[offset];
		System.arraycopy(byteAray, 0, byteArray_2, 0, offset);
		String str = new String(byteArray_2, "GB2312");
		List<String> result = new ArrayList<String>();
		result.add(str);
		is.close();
		return (result);
	}

	// // For MT5 ///
	public static String HttpPostString(String url,
			Map<String, String> parameters) throws HttpException, IOException {
		return HttpPostString(url, parameters, null, null, null);
	}

	public static String HttpPostString(String url,
			Map<String, String> parameters, String content)
			throws HttpException, IOException {
		return HttpPostString(url, parameters, null, null, content);
	}

	public static String HttpPostString(String url,
			Map<String, String> parameters, Map<String, String> headerValues,
			String charset, String content) throws HttpException, IOException {
		logger.debug("Post request: " + url);

		String result = null;
		BufferedReader reader = null;
		PostMethod postMethod = new PostMethod(url);

		if (parameters != null) {
			for (String key : parameters.keySet()) {
				String value = parameters.get(key);
				postMethod.setParameter(key, value);
			}
		}

		if (headerValues != null) {
			for (String key : headerValues.keySet()) {
				String value = headerValues.get(key);
				postMethod.addRequestHeader(key, value);
			}
		}

		if (StringUtils.isNotEmpty(content)) {
			postMethod.setRequestEntity(new StringRequestEntity(content, null,
					"UTF-8"));
		}

		try {
			int returnCode = getHttpClient().executeMethod(postMethod);
			if (returnCode != HttpStatus.SC_OK) {
				logger.error("Method failed: " + postMethod.getStatusLine());
			} else {
				if (StringUtils.isNotEmpty(charset)) {
					reader = new BufferedReader(new InputStreamReader(
							postMethod.getResponseBodyAsStream(), charset));
				} else {
					reader = new BufferedReader(new InputStreamReader(
							postMethod.getResponseBodyAsStream()));
				}
				StringWriter writer = new StringWriter();
				char[] buffer = new char[512];
				int len = reader.read(buffer);
				while (len >= 0) {
					writer.write(buffer, 0, len);
					len = reader.read(buffer);
				}
				result = writer.toString();
				logger.trace("Result : " + result);
			}
		} finally {
			postMethod.releaseConnection();
			if (reader != null)
				try {
					reader.close();
				} catch (Exception fe) {
					logger.error("", fe);
				}
		}

		return result;
	}

}