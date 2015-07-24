package web.bean;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 报价历史vo对象
 * QuoteHistoryVo.java
 * @author Joe Hu Email:Joe.Hu@222m.net
 * @version 1.0 Create Time: 下午04:41:07 2014年6月30日
 * Update Time:
 */
public class QuoteHistoryVo {

	private String tickCode; //报价序号
	private BigDecimal ask; //买价
	private BigDecimal bid; //卖价
	private Date bidtime; //成交时间
	
	public QuoteHistoryVo(String tickCode, BigDecimal ask, BigDecimal bid, Date bidtime) {
		super();
		this.tickCode = tickCode;
		this.ask = ask;
		this.bid = bid;
		this.bidtime = bidtime;
	}
	public String getTickCode() {
		return tickCode;
	}
	public void setTickCode(String tickCode) {
		this.tickCode = tickCode;
	}
	public BigDecimal getAsk() {
		return ask;
	}
	public void setAsk(BigDecimal ask) {
		this.ask = ask;
	}
	public BigDecimal getBid() {
		return bid;
	}
	public void setBid(BigDecimal bid) {
		this.bid = bid;
	}
	public Date getBidtime() {
		return bidtime;
	}
	public void setBidtime(Date bidtime) {
		this.bidtime = bidtime;
	}
	
}
