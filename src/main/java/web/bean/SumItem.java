package web.bean;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;


@XmlRootElement(name = "SumItem")
public class SumItem {
	private static final long serialVersionUID = 1L;
	
	@XmlAttribute(name = "TotalChange")
	private String totalChange;

	@XmlAttribute(name = "PageChange")
	private String pageChange;
	
	@XmlAttribute(name = "PosiTotalChange")
	private String posiTotalChange;
	
	@XmlAttribute(name = "NegaTotalChange")
	private String negaTotalChange;

	@XmlTransient
	public String getTotalChange() {
		return totalChange;
	}

	public void setTotalChange(String totalChange) {
		this.totalChange = totalChange;
	}

	@XmlTransient
	public String getPageChange() {
		return pageChange;
	}

	public void setPageChange(String pageChange) {
		this.pageChange = pageChange;
	}

	@XmlTransient
	public String getPosiTotalChange() {
		return posiTotalChange;
	}

	public void setPosiTotalChange(String posiTotalChange) {
		this.posiTotalChange = posiTotalChange;
	}

	@XmlTransient
	public String getNegaTotalChange() {
		return negaTotalChange;
	}

	public void setNegaTotalChange(String negaTotalChange) {
		this.negaTotalChange = negaTotalChange;
	}
	
	
	
	
}
