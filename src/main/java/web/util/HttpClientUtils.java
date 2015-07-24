package web.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.ByteArrayPartSource;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class HttpClientUtils {
	
	private static final Logger logger = Logger.getLogger(HttpClientUtils.class);
	
	private static HttpClient client;
	
	public static HttpClient getHttpClient(){
		if(client == null){
			client = new HttpClient(new MultiThreadedHttpConnectionManager());	
		}
		return client;
	}
	
	public static String httpsPostString(String url, Map<String, String> parameters) throws HttpException, IOException{
		//注册HTTPS
		Protocol https = new Protocol("https",
				new HTTPSSecureProtocolSocketFactory(), 443);
		Protocol.registerProtocol("https", https);
		//发送请求
		String responseStr = httpPostString(url, parameters, null, null); 
		//释放HTTPS
		Protocol.unregisterProtocol("https");
		return responseStr;
	}
	
	public static String httpPostString(String url, Map<String, String> parameters) throws HttpException, IOException{
		return httpPostString(url, parameters, null, null); 
	}
	
	public static String httpPostString(String url, 
			Map<String, String> parameters, Map<String, String> headerValues,
			String charset) throws HttpException, IOException{
		String debugFullUrl = GetFullUrl(url, parameters);
		logger.debug("Post request: " + debugFullUrl);
		String result = null;
		BufferedReader reader = null;
		PostMethod postMethod = new PostMethod(url);

		if(parameters != null){
			for(String key : parameters.keySet() ){
				String value = parameters.get(key);
				postMethod.setParameter(key,value);
			}			
		}
		
		if(headerValues != null){
			for(String key : headerValues.keySet() ){
				String value = headerValues.get(key);
				postMethod.addRequestHeader(key, value);	
			}			
		}
		
		try {
			int returnCode = getHttpClient().executeMethod(postMethod);
			if (returnCode != HttpStatus.SC_OK) {
				logger.error("Method failed: " + postMethod.getStatusLine());
			} else {
				if(StringUtils.isNotEmpty(charset)){
					reader = new BufferedReader(new InputStreamReader(postMethod.getResponseBodyAsStream(), charset));
				}else{
					reader = new BufferedReader(new InputStreamReader(postMethod.getResponseBodyAsStream()));
				}
				StringWriter writer = new StringWriter();
		        char[] buffer = new char[512];
				int len = reader.read(buffer);
				while(len >= 0){
					writer.write(buffer, 0, len);
					len = reader.read(buffer);
				}
				result = writer.toString();
				logger.trace("Result : "+result);
			}			
		} finally {
			postMethod.releaseConnection();
			if(reader != null) try { reader.close(); } catch (Exception fe) {}		    
		}
		
		return result;
	}
	
	
	// TODO have't tested.
	public static String httpPostMultipart(String url, 
			Map<String, String> parameters, Map<String, String> headerValues,
			Map<String, byte[]> fileBytes,
			String charset) throws HttpException, IOException{
		logger.debug("Post request: " + url);
		String result = null;
		BufferedReader reader = null;
		PostMethod postMethod = new PostMethod(url);

		if(parameters != null){
			for(String key : parameters.keySet() ){
				String value = parameters.get(key);
				postMethod.setParameter(key,value);
			}			
		}
		
		if(headerValues != null){
			for(String key : headerValues.keySet() ){
				String value = headerValues.get(key);
				postMethod.addRequestHeader(key, value);	
			}			
		}
		
		// multiple parts
		if(fileBytes != null && fileBytes.size() > 0){
			postMethod.getParams().setBooleanParameter(HttpMethodParams.USE_EXPECT_CONTINUE, true);
			Part[] parts = new Part[fileBytes.size()];
			int i = 0;
			for(String fileName : fileBytes.keySet()){
				byte[] bytes = fileBytes.get(fileName);
				parts[i] = new FilePart(fileName, new ByteArrayPartSource(fileName, bytes));
				i++;
			}
			postMethod.setRequestEntity(new MultipartRequestEntity(parts, postMethod.getParams()));
		}
		
		try {
			int returnCode = getHttpClient().executeMethod(postMethod);
			if (returnCode != HttpStatus.SC_OK) {
				logger.error("Method failed: " + postMethod.getStatusLine());
			} else {
				if(StringUtils.isNotEmpty(charset)){
					reader = new BufferedReader(new InputStreamReader(postMethod.getResponseBodyAsStream(), charset));
				}else{
					reader = new BufferedReader(new InputStreamReader(postMethod.getResponseBodyAsStream()));
				}
				StringWriter writer = new StringWriter();
		        char[] buffer = new char[512];
				int len = reader.read(buffer);
				while(len >= 0){
					writer.write(buffer, 0, len);
					len = reader.read(buffer);
				}
				result = writer.toString();
				logger.trace("Result : "+result);
			}			
		} finally {
			postMethod.releaseConnection();
			if(reader != null) try { reader.close(); } catch (Exception fe) {}		    
		}
		
		return result;
	}
	
	public static String httpGetString(String url) throws HttpException, IOException{
		return httpGetString(url, null, null);
	}
	
	public static String httpGetString(String url, Map<String, String> headerValues, String charset) throws HttpException, IOException{
		logger.debug("Send request: " + url);
		
		GetMethod getMethod = new GetMethod(url);
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler(3, false));
		getMethod.setFollowRedirects(true);
		String result = null;
		
		if(headerValues != null){
			for(String key : headerValues.keySet() ){
				String value = headerValues.get(key);
				getMethod.addRequestHeader(key, value);	
			}			
		}
		
		try {
			int statusCode = getHttpClient().executeMethod(getMethod);
			if (statusCode != HttpStatus.SC_OK) {
				logger.error("Method failed: " + getMethod.getStatusLine());
			}else{
				BufferedReader reader = null;
				if(StringUtils.isNotEmpty(charset)){
					reader = new BufferedReader(
							new InputStreamReader(getMethod.getResponseBodyAsStream(), charset));
				}else{
					reader = new BufferedReader(
							new InputStreamReader(getMethod.getResponseBodyAsStream()));
				}

				StringWriter writer = new StringWriter();
				char[] buffer = new char[512];
				int len = reader.read(buffer);
				while(len >= 0){
					writer.write(buffer, 0, len);
					len = reader.read(buffer);
				}
				result = writer.toString();
				logger.trace("Result : "+result);
			}
		} finally {
			getMethod.releaseConnection();
		}
		return result;
	}
	
	public static byte[] httpGetBytes(String url) throws HttpException, IOException{
		return HttpGetBytes(url, null);
	}
	
	public static byte[] HttpGetBytes(String url, Map<String, String> headerValues) throws HttpException, IOException{
		logger.debug("Send request: " + url);
		
		GetMethod getMethod = new GetMethod(url);
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler(3, false));
		getMethod.setFollowRedirects(true);
		byte[] result = null;
		
		if(headerValues != null){
			for(String key : headerValues.keySet() ){
				String value = headerValues.get(key);
				getMethod.addRequestHeader(key, value);	
			}			
		}
		
		try {
			int statusCode = getHttpClient().executeMethod(getMethod);
			if (statusCode != HttpStatus.SC_OK) {
				logger.error("Method failed: " + getMethod.getStatusLine());
			}else{
				BufferedInputStream in = new BufferedInputStream(getMethod.getResponseBodyAsStream());
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				try{
					byte[] buffer = new byte[512];
					int len = in.read(buffer);
					while(len >= 0){
						out.write(buffer, 0, len);
						len = in.read(buffer);
					}					
				}finally{
					out.close();
				}
				result = out.toByteArray();
			}
		} finally {
			getMethod.releaseConnection();
		}
		return result;
	}
	
	
	public static String GetFullUrl(String strUrl, Map map) {
		String strtTotalURL = "";
		if (strtTotalURL.indexOf("?") == -1) {
			strtTotalURL = strUrl + "?" + getUrl(map);
		} else {
			strtTotalURL = strUrl + "&" + getUrl(map);
		}

		return strtTotalURL;
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
				url.append(key).append("=").append(String.valueOf(map.get(key))).append("&");
			}
		}
		String strURL = "";
		strURL = url.toString();
		if ("&".equals("" + strURL.charAt(strURL.length() - 1))) {
			strURL = strURL.substring(0, strURL.length() - 1);
		}
		return (strURL);
	}
	
}
