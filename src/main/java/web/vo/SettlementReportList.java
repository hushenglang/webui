package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;
@Element
public class SettlementReportList {

	@Elements(name="id")
	private List<SettlementReportContent> contents;

	public List<SettlementReportContent> getContents() {
		if(contents == null){
			contents = new ArrayList<SettlementReportContent>();
		}
		return contents;
	}

	public void setContents(List<SettlementReportContent> contents) {
		this.contents = contents;
	}
	
}
