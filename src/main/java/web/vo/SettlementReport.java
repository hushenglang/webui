package web.vo;

import net.sourceforge.tranxbean.annotations.Element;

import com.gwghk.gold.client.models.ApiResult;

public class SettlementReport extends ApiResult{
	
	@Element(name="SettleList")
	private SettlementReportList settlementList;
	@Element(name="SumInfo")
	private SettlementReportSumInfoList sumInfoList;

	public SettlementReportList getSettlementList() {
		if(settlementList==null) return new SettlementReportList();
		return settlementList;
	}

	public void setSettlementList(SettlementReportList settlementList) {
		this.settlementList = settlementList;
	}

	public SettlementReportSumInfoList getSumInfoList() {
		if(sumInfoList==null)return new SettlementReportSumInfoList();
		return sumInfoList;
	}

	public void setSumInfoList(SettlementReportSumInfoList sumInfoList) {
		this.sumInfoList = sumInfoList;
	}
 
 
	
}
