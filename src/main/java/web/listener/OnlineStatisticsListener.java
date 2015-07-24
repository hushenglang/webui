package web.listener;

import java.util.Date;
import java.util.List;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.apache.log4j.Logger;
import web.constant.OnlineStatistics;
import web.util.ConstantsUtil;
import com.gwghk.demo.gold.client.DemoClientManagerFactory;
import com.gwghk.demo.gold.client.interfaces.DemoWebUiManager;
import com.gwghk.demo.gold.client.models.DemoApiResult;
import com.gwghk.demo.gold.client.models.StatisticsVo;

/**
 * web服务启动时候. 开启在线统计持久化的线程  
 * OnlineStatisticsListener.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午05:27:42 2014年6月5日
 * Update Time:
 */
public class OnlineStatisticsListener implements ServletContextListener{

	private Logger logger = Logger.getLogger(OnlineStatisticsListener.class);
	
	public static boolean isFixDbOlineStatistic = false;
	
	private OnlineStatisticsPersistenceThread t;
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		if(t!=null){
			logger.warn("stop online statistics persistence thread");
			t.stop();
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try{
			String isOpen = ConstantsUtil.getProp("online-isopen");
			if("true".equals(isOpen)){
				 if(!OnlineStatisticsListener.isFixDbOlineStatistic){
					//1.为了防止tomcat被异常关闭导致的数据库统计数据异常问题,启动tomcat后做一次数据库修复动作.
					 logger.info("fix db online statistics");
					 DemoClientManagerFactory.getInstance().getWebUiManager().fixOnlineStatisticDB();
					 OnlineStatisticsListener.isFixDbOlineStatistic=true;
				 }
				//2.开始持久化数据线程
				logger.info("start online statistics persistence thread");
				t = new OnlineStatisticsPersistenceThread();
				t.start();
			}
		}catch (Exception e) {
			logger.error("online statistics listener startup failed",e);
		}
	}

	/**
	 * 持久化线程
	 * OnlineStatisticsListener.java
	 * @author Joe Hu Email:Joe.Hu@222m.net
	 * @version 1.0 Create Time: 上午10:57:40 2014年6月11日
	 * Update Time:
	 */
	private class OnlineStatisticsPersistenceThread extends Thread {
	    private long interval = 99999999999l;
		
	    private OnlineStatisticsPersistenceThread() {
			super();
			try{
				interval = new Integer(ConstantsUtil.getProp("online-statistic-interval"))*1000 ;
			}catch(Exception e){
				logger.error(e);
			}
		}
		@Override
	    public void run() {
	         while(true){
	        	 try {
					Thread.sleep(interval);
				 } catch (InterruptedException e) {
					logger.error(e);
				}
	        	 //持久化数据到数据库
	        	 persistenceStatistics();
	         }
	    }
		/**
		 * 持久化数据到数据库
		 */
		private void persistenceStatistics(){
        	 try{
        		 //获取待同步的统计数据
        		 OnlineStatistics tool= new OnlineStatistics();
        		 List<StatisticsVo> statisticList = tool.getUnsyscStatistics();
        		 long currentTime = new Date().getTime();
        		 if(statisticList.size()>0){//若无记录, 则不做处理
        			 logger.debug("OnlineStatistics persistence start.......");
        			 DemoWebUiManager dmanage=DemoClientManagerFactory.getInstance().getWebUiManager();
        			 DemoApiResult result =dmanage.saveOnlineStatistic(statisticList, currentTime);
        			  if(DemoApiResult.OK.equals(result.getCode())){
	        			  //设置同步状态
	        			  tool.setSyscStatus(statisticList);
        			  }
        			  logger.debug("OnlineStatistics persistence completed! time:"+new Date().toString()+" result:"+result.getCode());
        		 }
        	 }catch(Exception e){
        		 logger.error(e);
        	 }
		}
	}
	
}
