package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;
@Element
public class SettlementReportSumInfoList {

	@Elements(name="SumItem")
	private List<SettlementReportSumInfoContent> sumInfo;

	public List<SettlementReportSumInfoContent> getSumInfo() {
		if(sumInfo == null){
			sumInfo = new ArrayList<SettlementReportSumInfoContent>();
		}
		return sumInfo;
	}

	public void setSumInfo(List<SettlementReportSumInfoContent> sumInfo) {
		this.sumInfo = sumInfo;
	}

	 
	
}
