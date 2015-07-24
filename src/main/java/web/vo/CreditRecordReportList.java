package web.vo;

import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;

 
/**
 * 信用记录报表
 * @author SZPaul
 *
 */
@Element
public class CreditRecordReportList {

	@Elements(name="Item")
	private List<CreditRecordReportContent> contents;

	public List<CreditRecordReportContent> getContents() {
		if(contents == null){
			contents = new ArrayList<CreditRecordReportContent>();
		}
		return contents;
	}

	public void setContents(List<CreditRecordReportContent> contents) {
		this.contents = contents;
	}

 

    
}
