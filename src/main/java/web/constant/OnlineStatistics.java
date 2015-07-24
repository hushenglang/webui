package web.constant;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import web.util.ConstantsUtil;

import com.gwghk.demo.gold.client.models.StatisticsVo;


/**
 * 用户在线统计类 OnlineStatistics.java
 * 
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午12:06:51 2014年6月5日 Update Time:
 */
public class OnlineStatistics {

	private static long timeInterval=2000l;// webui请求的时间间隔,因为可能有稍许网络延时

	private static List<StatisticsVo> statisticsVoList = new ArrayList<StatisticsVo>(); // 统计缓存集合对象

	/**
	 * 保存单个用户的数据
	 */
	public void saveStatistic(String accountNo, String loginType, String terminalType, String browserType, String ip, String accountType, String systemType, String useragent) {
		// 1.检测当前是否已经记录a ccountno. 若有则不做处理,只是更新最近一次请求时间; 若没有则加入缓存
		if (!isAccountStatisticExsited(accountNo)) {// 不存在于缓存, 可以加入缓存
			StatisticsVo statisticsVo = new StatisticsVo(accountNo, new Date().getTime(), loginType, terminalType, browserType,
					ip, accountType, systemType, useragent);
			statisticsVoList.add(statisticsVo);
		} else {// 存在于缓存, 只需更新时间and logintype
			StatisticsVo statisticsVo = getStatisticsVo(accountNo);
			statisticsVo.setUpdateTime(new Date().getTime());
			statisticsVo.setLoginType(loginType);
			statisticsVo.setBrowserType(browserType);
			statisticsVo.setSystemType(systemType);
			statisticsVo.setUseragent(useragent);
		}
	}


	//获取待同步数据(注:只有在需持久化数据时候调用此方法)
	public List<StatisticsVo> getUnsyscStatistics(){
		//清除下线用户的同步状态
		setOfflineUserLoginStatus();
		//获取所有待同步的对象
		List<StatisticsVo> unSyscStatisticList = new ArrayList<StatisticsVo>();
		for (StatisticsVo statisticsVo : statisticsVoList) {
			int isSysc = statisticsVo.getIsSysc(); //0-未同步, 1-已同步
			if(isSysc==0){
				unSyscStatisticList.add(statisticsVo);
			}
		}
		//清空所有下线用户的统计数据
		clearOfflineUserStatisticVo();
		return unSyscStatisticList;
	}
	
	//修改同步状态为已同步
	public void setSyscStatus(List<StatisticsVo> unSyscStatisticList){
		for (StatisticsVo statisticsVo : unSyscStatisticList) {
			statisticsVo.setIsSysc(1);
		}
	}
	
	/**
	 * 检查帐号统计时间已经存在于缓存中
	 * 
	 * @param accountNo
	 * @return
	 */
	private boolean isAccountStatisticExsited(String accountNo) {
		for (StatisticsVo statisticsVo : statisticsVoList) {
			if (accountNo.equals(statisticsVo.getAccountNo())) {// 帐号已经存在
				return true;
			}
		}
		return false;
	}

	/**
	 * 获取用户统计vo对象
	 * 
	 * @param accountNo
	 * @return
	 */
	private StatisticsVo getStatisticsVo(String accountNo) {
		for (StatisticsVo statisticsVo : statisticsVoList) {
			if (accountNo.equals(statisticsVo.getAccountNo())) {// 帐号已经存在
				return statisticsVo;
			}
		}
		return null;
	}
	
	//清除下线用户的状态
	private void setOfflineUserLoginStatus(){
		for (StatisticsVo statisticsVo : statisticsVoList) {
			long updateTime = statisticsVo.getUpdateTime();
			long currentime = new Date().getTime();
			if (currentime > (updateTime + timeInterval)) {// 用户已经下线了,修改登陆状态
				statisticsVo.setLoginOffTime(new Date().getTime());
				statisticsVo.setIsSysc(0); //登陆状态改了, 下线记录需同步
			}
		}
	}
	
	/**
	 * 因为webui客户端是每隔一段时间会发一个维持session的请求的, 所以在此时可以触发清理那些在时间间隔后没有收到
	 */
	private void clearOfflineUserStatisticVo() {
		List<StatisticsVo> readyRemoveVo = new ArrayList<StatisticsVo>();
		for (StatisticsVo statisticsVo : statisticsVoList) {
			long updateTime = statisticsVo.getUpdateTime();
			long currentime = new Date().getTime();
			if (currentime > (updateTime + timeInterval)) {// 用户已经下线了,
															// 缓存中清除改用户的统计数据
				readyRemoveVo.add(statisticsVo);
			}
		}
		// 删除下线的用户
		for (StatisticsVo statisticsVo : readyRemoveVo) {
			statisticsVoList.remove(statisticsVo);
		}
	}
	
	//静态游离块初始化时间间隔.
	static{
		try{
			timeInterval = new Integer(ConstantsUtil.getProp("online-statistic-interval"))*1000;
		}catch(Exception e){
		}
	}

}
