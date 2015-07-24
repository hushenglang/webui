package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;
@Element
public class TradeReportDealList {
	@Elements(name="Deal")
	private List<TradeReportContent> contents;
 
	public List<TradeReportContent> getContents() {
		if(contents == null){
			contents = new ArrayList<TradeReportContent>();
		}
		return contents;
	}

	public void setContents(List<TradeReportContent> contents) {
		this.contents = contents;
	}

}
