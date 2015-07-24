package web.component.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.httpclient.HttpException;
import org.apache.log4j.Logger;

import com.gwghk.gold.util.ConfigLoader;

import web.bean.AdsVo;
import web.component.GWAPIService;
import web.util.AdsRetriveUtils;
import web.util.HttpClientUtils;
import web.util.MD5;
import web.util.StringUtil;

public class GWAPIServiceImpl implements GWAPIService {
	private final static Logger logger = Logger.getLogger(AdsRetriveUtils.class);
	private static GWAPIServiceImpl instant = null;
	
	protected static GWAPIServiceImpl getInstant(){
		if(instant==null){
			return new GWAPIServiceImpl();
		}
		return instant;
	}
	
	private GWAPIServiceImpl(){
		
	}
	
	/**
	 * 六.广告接口 接口地址:/GwAPI/restweb/ads/index 请求方式:post
	 * 
	 * @param lang [zh|tw]
	 * @throws HttpException
	 * @throws IOException
	 */
	@Override
	public List<AdsVo> adsIndex(String lang) {
		logger.debug("request gwapi advertisement interface! ");
		String web_URL = (String) ConfigLoader.getInstance().getProperties("/init.properties").get("gwAPIURL");
		String url = web_URL + "/GwAPI/restweb/ads/index";
		Map<String, String> paramaters = new HashMap<String, String>();
		String timeStamp = new Date().getTime() + ""; // 时间戳
		String platTypeKey = (String) ConfigLoader.getInstance().getProperties("/init.properties").get("gwPlatTypeKey");// 平台类型名称
		String platAccount = ""; // 加密盐, 默认为空字符串
		String oauthKey = (String) ConfigLoader.getInstance().getProperties("/init.properties").get("gwAPIOauthKey"); // oauthKey
		String token = platAccount + oauthKey + timeStamp; // token
		paramaters.put("token", MD5.encryptToMD5(token));
		paramaters.put("timeStamp", timeStamp);
		paramaters.put("platTypeKey", platTypeKey);
		paramaters.put("platAccount", platAccount);

		String siteflg = (String) ConfigLoader.getInstance().getProperties("/init.properties").get("gwSiteflg"); // 请求来源站点(详见站点对应附表)
		paramaters.put("lang", (StringUtil.isNullOrEmpty(lang))?"zh":lang);
		paramaters.put("siteflg", siteflg);
		String responseResult = null;
		List<AdsVo> adsVoList = null;
		try {
			responseResult = HttpClientUtils.httpsPostString(url, paramaters);
			logger.debug("responseResult: " + responseResult);
			adsVoList = getAdsJsonArray(responseResult);
		} catch (Exception e) {
			logger.error("gwapi request error!", e);
		}
		return adsVoList;
	}

	private List<AdsVo> getAdsJsonArray(String responseResult) {
		if (StringUtil.isNullOrEmpty(responseResult))
			return null;
		JSONObject responseObj = JSONObject.fromObject(responseResult);
		JSONObject adsobj = (JSONObject) responseObj.get("ads");
		Object obj = adsobj.get("adsList");
		JSONArray tickList = null;
		List<AdsVo> adsVoList = new ArrayList<AdsVo>();
		if (obj != null) {
			if (obj instanceof JSONArray) {
				tickList = (JSONArray) obj;// 数据集
			} else if (obj instanceof JSONObject) {// 只有一条数据时
				tickList = new JSONArray();
				tickList.add(obj);
			}
			
			for (int i = 0; i < tickList.size(); i++) {
				JSONObject adsJsonObj = (JSONObject) tickList.get(i);
				AdsVo adsVo = (web.bean.AdsVo) JSONObject.toBean(adsJsonObj, AdsVo.class);
				adsVoList.add(adsVo);
			}
		}
		return adsVoList;
	}

}
