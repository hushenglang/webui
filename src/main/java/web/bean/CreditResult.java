package web.bean;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;



@XmlRootElement(name = "Result")
@XmlAccessorType(XmlAccessType.FIELD)
public class CreditResult {
	
	@XmlAttribute(name="Count")
	private String count;
	
	@XmlAttribute(name="TotalCount")
	private String totalCount;
	
	@XmlAttribute(name = "Code")
	private String code;

	@XmlElementWrapper(name = "DealList")
	@XmlElement(name = "Item")
	private List<Credit> dealList;
	
	
	@XmlElement(name = "SumInfo")
	private Suminfo suminfo;
	
	@XmlTransient
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	@XmlTransient
	public List<Credit> getDealList() {
		return dealList;
	}
	public void setDealList(List<Credit> dealList) {
		this.dealList = dealList;
	}
	@XmlTransient
	public Suminfo getSuminfo() {
		return suminfo;
	}
	public void setSuminfo(Suminfo suminfo) {
		this.suminfo = suminfo;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}
	
	
	
}
