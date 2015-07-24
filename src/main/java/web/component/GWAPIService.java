package web.component;

import java.io.IOException;
import java.util.List;

import org.apache.commons.httpclient.HttpException;

import web.bean.AdsVo;

/**
 * gw api service
 * GWAPIService.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午02:36:03 2014年12月2日
 * Update Time:
 */
public interface GWAPIService {
	/**
	 * 六.广告接口
	 * 接口地址:/GwAPI/restweb/ads/index
	 * 请求方式:post
	 * @param lang [zh|tw], if ==null, then will be "zh"
	 * @throws HttpException
	 * @throws IOException
	 */
	public List<AdsVo> adsIndex(String lang);
}
