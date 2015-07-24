package web.util;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="PaginationCriteria")
@XmlAccessorType(XmlAccessType.FIELD)
public class PaginationCriteria implements Serializable{

	public final static PaginationCriteria  DEFAULT_PAGINATION_CRITERIA = new PaginationCriteria().setWhichPageEx(0).setCountPerPageEx(20); 
	@XmlElement(name="CountPerPage")
	private int countPerPage ;
	@XmlElement(name="WhichPage")
	private int whichPage ; 
	@XmlElement(name="RowCount")
	private int rowCount ;
	@XmlElement(name="OrderBy")
	private OrderBy orderBy;

	public PaginationCriteria() {
		super();
	}
	public int getCountPerPage() {
		return countPerPage;
	}
	public void setCountPerPage(int countPerPage) {
		this.countPerPage = countPerPage;
	}
	public PaginationCriteria setCountPerPageEx(int countPerPage) {
		this.countPerPage = countPerPage;
		return this;
	}
	public int getWhichPage() {
		return whichPage;
	}
	public void setWhichPage(int whichPage) {
		this.whichPage = whichPage;
	}
	public PaginationCriteria setWhichPageEx(int whichPage) {
		this.whichPage = whichPage;
		return this;
	}
	public int getRowCount() {
		return rowCount;
	}
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	public int getPageCount(){
		int pageCount=0;
		if (countPerPage>0){
			pageCount = rowCount / countPerPage;
			if ((rowCount % countPerPage) > 0)
				pageCount++;
		}
		return pageCount;
	}
	
	
	public OrderBy getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(OrderBy orderBy) {
		this.orderBy = orderBy;
	}

	
}	
