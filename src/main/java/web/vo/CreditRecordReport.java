package web.vo;

import net.sourceforge.tranxbean.annotations.Element;

import com.gwghk.gold.client.models.ApiResult;
 

 
/**
 * 信用记录报表
 * @author SZPaul
 *
 */
public class CreditRecordReport extends ApiResult{

	@Element(name="DealList")
	private CreditRecordReportList creditRecordList;
	@Element(name="SumInfo")
	private  CreditRecordReportSumInfoList sumInfoList;

	public CreditRecordReportList getCreditRecordList() {
		if(creditRecordList==null) return new CreditRecordReportList();
		return creditRecordList;
	}

	public void setCreditRecordList(CreditRecordReportList creditRecordList) {
		this.creditRecordList = creditRecordList;
	}

	public CreditRecordReportSumInfoList getSumInfoList() {
		if(creditRecordList==null) return new CreditRecordReportSumInfoList();
		return sumInfoList;
	}

	public void setSumInfoList(CreditRecordReportSumInfoList sumInfoList) {
		this.sumInfoList = sumInfoList;
	}

 

 

    
}
