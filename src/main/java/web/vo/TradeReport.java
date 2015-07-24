package web.vo;

import net.sourceforge.tranxbean.annotations.Element;

import com.gwghk.gold.client.models.ApiResult;

public class TradeReport extends ApiResult{

	@Element(name="DealList")
	private TradeReportDealList dealList;
	@Element(name="SumInfo")
	private  TradeReportSumInfoList sumList;
 
	public TradeReportDealList getDealList() {
		if(dealList==null) return new TradeReportDealList();
		return dealList;
	}

	public void setDealList(TradeReportDealList dealList) {
		this.dealList = dealList;
	}

	public TradeReportSumInfoList getSumList() {
		if(sumList==null) return new TradeReportSumInfoList();
		return sumList;
	}

	public void setSumList(TradeReportSumInfoList sumList) {
		this.sumList = sumList;
	}
	
}
