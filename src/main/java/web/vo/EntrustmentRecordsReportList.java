package web.vo;
 
import java.util.ArrayList;
import java.util.List;

import net.sourceforge.tranxbean.annotations.Element;
import net.sourceforge.tranxbean.annotations.Elements;

/**
 * 委托记录报表
 * @author SZPaul
 *
 */
@Element
public class EntrustmentRecordsReportList {

	@Elements(name="Deal")
	private List<EntrustmentRecordsReportContent> contents;

	public List<EntrustmentRecordsReportContent> getContents() {
		if(contents == null){
			contents = new ArrayList<EntrustmentRecordsReportContent>();
		}
		return contents;
	}

	public void setContents(List<EntrustmentRecordsReportContent> contents) {
		this.contents = contents;
	}
}
