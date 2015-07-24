package web.vo;

import java.io.Serializable;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

/**
 * 信用记录报表
 * @author SZPaul
 *
 */
@Element
public class CreditRecordReportSumInfoBean  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Attribute("TotalChange")
    private String totalChange;//总计
	@Attribute("PageChange")
    private String pageChange;//小计
	@Attribute("PosiTotalChange")
    private String posiTotalChange;//总收入
	@Attribute("NegaTotalChange")
    private String negaTotalChange;//总支出
	
	
	public String getTotalChange() {
		return totalChange;
	}
	public void setTotalChange(String totalChange) {
		this.totalChange = totalChange;
	}
	public String getPageChange() {
		return pageChange;
	}
	public void setPageChange(String pageChange) {
		this.pageChange = pageChange;
	}
	public String getPosiTotalChange() {
		return posiTotalChange;
	}
	public void setPosiTotalChange(String posiTotalChange) {
		this.posiTotalChange = posiTotalChange;
	}
	public String getNegaTotalChange() {
		return negaTotalChange;
	}
	public void setNegaTotalChange(String negaTotalChange) {
		this.negaTotalChange = negaTotalChange;
	}
 
	 
}
