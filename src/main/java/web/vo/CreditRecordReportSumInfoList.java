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
public class CreditRecordReportSumInfoList {

	@Elements(name="SumItem")
	private List<CreditRecordReportSumInfoBean> contents;

	public List<CreditRecordReportSumInfoBean> getContents() {
		if(contents == null){
			contents = new ArrayList<CreditRecordReportSumInfoBean>();
		}
		return contents;
	}

	public void setContents(List<CreditRecordReportSumInfoBean> contents) {
		this.contents = contents;
	}

 

    
}
