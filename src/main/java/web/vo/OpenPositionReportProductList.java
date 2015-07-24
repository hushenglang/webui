package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Elements;

public class OpenPositionReportProductList {

	@Elements(name="Position")
	private List<OpenPositionReportContent> contents;

	public List<OpenPositionReportContent> getContents() {
		if(contents == null){
			contents = new ArrayList<OpenPositionReportContent>();
		}
		return contents;
	}

	public void setContents(List<OpenPositionReportContent> contents) {
		this.contents = contents;
	}
	
}
