package web.vo;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

@Element
public class SettlementReportContent {
	
	@Attribute("time")
	private String createTime;//时间	
	@Attribute("available_credit_before")
	private String preAvailablieCredit;//可用信用结算前	
	@Attribute("credit")
	private String settledCredit;//已结信用	
	@Attribute("available_credit_after")
	private String afteravailableCredit;//可用信用结算	
	@Attribute("invested_credit")
	private String investedCredit;//投资信用	
	@Attribute("realized_pl")
	private String realizedPL;//已实现盈亏
	@Attribute("id")
	private String id;
	
	@Attribute("type")
	private String type;
	@Attribute("server_id")
	private String serverid;
	@Attribute("profit")
	private String profit;
	@Attribute("commission")
	private String commission;
	@Attribute("interest")
	private String interest;
	@Attribute("invest")
	private String invest;
	@Attribute("divest")
	private String divest;
	@Attribute("SettlementedCredit")
	private String settlementedCredit;
	
	@Attribute("rowsum")
	private String rowsum;
	
//	<id id="4967" time="2013-10-16 03:45:03" loginname="11009017" credit="0" 
//	available_credit_before="500000" available_credit_after="500000" invested_credit="0" 
//		realized_pl="0" type="1" server_id="10" profit="0"已经  commission="0"手续费 interest="0" 利息
//			invest="0"入 divest="0"出  SettlementedCredit="0" rowsum="0"总/>
	
	
//	<id id="17031" time="2013-09-09 08:30:31" loginname="11000085" 
//		credit="90000000" available_credit_before="90000000"
//		available_credit_after="90000000" invested_credit="0" realized_pl="0" type="1" server_id=""/>
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getPreAvailablieCredit() {
		return preAvailablieCredit;
	}
	public void setPreAvailablieCredit(String preAvailablieCredit) {
		this.preAvailablieCredit = preAvailablieCredit;
	}
	public String getSettledCredit() {
		return settledCredit;
	}
	public void setSettledCredit(String settledCredit) {
		this.settledCredit = settledCredit;
	}
	public String getAfteravailableCredit() {
		return afteravailableCredit;
	}
	public void setAfteravailableCredit(String afteravailableCredit) {
		this.afteravailableCredit = afteravailableCredit;
	}
	public String getInvestedCredit() {
		return investedCredit;
	}
	public void setInvestedCredit(String investedCredit) {
		this.investedCredit = investedCredit;
	}
	public String getRealizedPL() {
		return realizedPL;
	}
	public void setRealizedPL(String realizedPL) {
		this.realizedPL = realizedPL;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getServerid() {
		return serverid;
	}
	public void setServerid(String serverid) {
		this.serverid = serverid;
	}
	public String getProfit() {
		return profit;
	}
	public void setProfit(String profit) {
		this.profit = profit;
	}
	public String getCommission() {
		return commission;
	}
	public void setCommission(String commission) {
		this.commission = commission;
	}
	public String getInterest() {
		return interest;
	}
	public void setInterest(String interest) {
		this.interest = interest;
	}
	public String getInvest() {
		return invest;
	}
	public void setInvest(String invest) {
		this.invest = invest;
	}
	public String getDivest() {
		return divest;
	}
	public void setDivest(String divest) {
		this.divest = divest;
	}
	public String getSettlementedCredit() {
		return settlementedCredit;
	}
	public void setSettlementedCredit(String settlementedCredit) {
		this.settlementedCredit = settlementedCredit;
	}
	public String getRowsum() {
		return rowsum;
	}
	public void setRowsum(String rowsum) {
		this.rowsum = rowsum;
	}
	
	
//	DecimalFormat df = new DecimalFormat("#0.00");
//	
//	@Attribute("loginname")
//	private String loginname;
//
//	@Attribute("profit")
//	private String profit;
//
//	@Attribute("swap")
//	private String swap;
//
//	@Attribute("commission")
//	private String commission;
//
//	@Attribute("adjust")
//	private String adjust;
//
//	@Attribute("type")
//	private String type;
//
//	@Attribute("seq_no")
//	private String seqNo;
//
//	@Attribute("total")
//	private String total;
//
//	@Attribute("remark")
//	private String remark;
//
//	@Attribute("settlement_time")
//	private String settlementTime;

	
//	public String getLoginname() {
//		return loginname;
//	}
//
//	public void setLoginname(String loginname) {
//		this.loginname = loginname;
//	}
//
//	public String getProfit() {
//		return df.format(new Double(profit));
//	}
//
//	public void setProfit(String profit) {
//		this.profit = profit;
//	}
//
//	public String getSwap() {
//		return swap;
//	}
//
//	public void setSwap(String swap) {
//		this.swap = swap;
//	}
//
//	public String getCommission() {
//		return df.format(new Double(commission));
//	}
//
//	public void setCommission(String commission) {
//		this.commission = commission;
//	}
//
//	public String getAdjust() {
//		return df.format(new Double(adjust));
//	}
//
//	public void setAdjust(String adjust) {
//		this.adjust = adjust;
//	}
//
//	public String getType() {
//		return type;
//	}
//
//	public void setType(String type) {
//		this.type = type;
//	}
//
//	public String getSeqNo() {
//		return seqNo;
//	}
//
//	public void setSeqNo(String seqNo) {
//		this.seqNo = seqNo;
//	}
//
//	public String getTotal() {
//		return total;
//	}
//
//	public void setTotal(String total) {
//		this.total = total;
//	}
//
//	public String getRemark() {
//		return remark;
//	}
//
//	public void setRemark(String remark) {
//		this.remark = remark;
//	}
//
//	public String getSettlementTime() {
//		return settlementTime;
//	}
//
//	public void setSettlementTime(String settlementTime) {
//		this.settlementTime = settlementTime;
//	}
//
//	
//	


	

}
