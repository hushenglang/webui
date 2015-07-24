package web.vo;
 

import net.sourceforge.tranxbean.annotations.Element;

import com.gwghk.gold.client.models.ApiResult;

/**
 * 委托记录报表
 * @author SZPaul
 *
 */ 
public class EntrustmentRecordsReport  extends ApiResult{

	@Element(name="OrderList")
	private EntrustmentRecordsReportList entrustmentRecordList;

	public EntrustmentRecordsReportList getEntrustmentRecordList() {
		if(entrustmentRecordList==null) return new EntrustmentRecordsReportList();
		return entrustmentRecordList;
	}

	public void setEntrustmentRecordList(
			EntrustmentRecordsReportList entrustmentRecordList) {
		this.entrustmentRecordList = entrustmentRecordList;
	}
}
