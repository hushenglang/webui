package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;

@Element
public class TradeReportSumInfoList {
	@Elements(name="SumItem")
	private List<TradeReportSumInfoContent> sumInfoContent;

	public List<TradeReportSumInfoContent> getSumInfoContent() {
		if(sumInfoContent==null)
		{
			sumInfoContent=new ArrayList<TradeReportSumInfoContent>();
		}
		return sumInfoContent;
	}

	public void setSumInfoContent(List<TradeReportSumInfoContent> sumInfoContent) {
		this.sumInfoContent = sumInfoContent;
	}
}
