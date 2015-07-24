package web.util;

import java.util.HashMap;

/**
 * 功能：简易版的缓存类
 * @author Gavin
 */
public class CacheManager {
	
	private static HashMap<String,Object>cacheMap = new HashMap<String,Object>();
	
    public synchronized static void putCache(String key, Object value) { 
        cacheMap.put(key, value);   
    } 
    
    public synchronized static Object getCache(String key) { 
    	return cacheMap.get(key);
    } 
    
	private CacheManager(){
	}
	
	private static class CacheManagerHolder{
		private final static  CacheManager INSTANCE=new CacheManager();
	}  
	
	public static CacheManager getInstance(){
		return CacheManagerHolder.INSTANCE;
	}
}
