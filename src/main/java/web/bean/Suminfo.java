package web.bean;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name = "SumInfo")
public class Suminfo {
	private static final long serialVersionUID = 1L;
	
	@javax.xml.bind.annotation.XmlElement (name="SumItem")
	private SumItem sumItem;
	
	
	@XmlTransient
	public SumItem getSumItem() {
		return sumItem;
	}
	public void setSumItem(SumItem sumItem) {
		this.sumItem = sumItem;
	}

	
	
	
}
