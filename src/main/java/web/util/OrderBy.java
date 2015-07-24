package web.util;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="OrderBy")
@XmlAccessorType(XmlAccessType.FIELD)
public class OrderBy implements Serializable{
	@XmlElement(name="Field")
	private String field;
	@XmlElement(name="Sort")
	private String sort;
	
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
	
}	
