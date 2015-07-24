package web.action.accountadmin;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import web.bean.QuoteHistoryVo;

import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.gold.client.models.QuoteHistory;

/**
 * 报价历史查询
 * QuoteHistoryAction.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午04:49:17 2014年6月30日
 * Update Time:
 */
@SuppressWarnings("serial")
public class QuoteHistoryAction extends BaseAction {

	public static final Logger logger = Logger.getLogger(QuoteHistoryAction.class);

	private String quoteTime;  //报价时间
	private String tickCode; //报价序列号
	
	@Override
	protected String perform() {
		logger.info("QuoteHistoryAction");
		/*if(!validateQuoteTime(quoteTime)){
			logger.info("10分钟内不允许查询历史报价 tickCode:"+tickCode);
			responseJson("{code:'fail'}");
			return NONE;
		}*/
		ApiResult result = ClientManagerFactory.getInstance().getWebUiManager().getQuoteHistory(quoteTime, tickCode, 10, 11); //取21条记录, 前十条, 后11条(包括自身报价)
		String code = result.getCode();
		if(ApiResult.OK.equals(code)){
			Object[] objects = result.getReturnObj();
			List<QuoteHistory> quoteHistoryList= (List<QuoteHistory>)objects[0];
			List<QuoteHistoryVo> quoteHistoryVoList= new ArrayList<QuoteHistoryVo>();
			for(QuoteHistory quoteHistory : quoteHistoryList){
				String tickCode = quoteHistory.getTickcode();
				BigDecimal ask = quoteHistory.getAsk();
				BigDecimal bid = quoteHistory.getBid();
				Date bidtime = quoteHistory.getBidtime();
				QuoteHistoryVo quoteHistoryVo = new QuoteHistoryVo(tickCode, ask, bid, bidtime);
				quoteHistoryVoList.add(quoteHistoryVo);
			}
			String responseResult = JSONArray.fromObject(quoteHistoryVoList).toString();
			responseJson(responseResult);
			logger.debug("responseResult");
		}else{
			responseJson("{code:'fail'}");
			logger.debug("{code:'fail'}");
		}
		return NONE;
	}
	
	/**
	 * 效验报价时间是否是10分钟之前的
	 * @param quoteTime 格式 yyyy-mm-dd hh:mm:ss
	 * @return
	 */
	private boolean validateQuoteTime(String quoteTime){
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");        
		try {
			Date date = format.parse(quoteTime);
			Calendar tickCalendar  = Calendar.getInstance();
			tickCalendar.setTime(date);
			Calendar currentCalendar  = Calendar.getInstance();
			currentCalendar.set(Calendar.MINUTE, currentCalendar.get(Calendar.MINUTE)-10);
			if(currentCalendar.after(tickCalendar)){//10mins后可以查看
				return true;
			}else{
				return false;
			}
		} catch (ParseException e) {
			logger.error(e);
			return false;
		}  
	}

	protected String responseJson(String json) {
		//logger.debug(this.getClass().getSimpleName() + " json size:" + json.length());
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("application/x-json;charset=utf-8");
		try {
			PrintWriter out = response.getWriter();
			out.print(json);
			out.close();
		} catch (Exception e) {
			logger.error("", e);
		}
		return null;
	}
	
	public String getQuoteTime() {
		return quoteTime;
	}

	public void setQuoteTime(String quoteTime) {
		this.quoteTime = quoteTime;
	}

	public String getTickCode() {
		return tickCode;
	}

	public void setTickCode(String tickCode) {
		this.tickCode = tickCode;
	}
	
	
}
