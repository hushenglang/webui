package web.vo;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

@Element
public class SettlementReportSumInfoContent {
	
	@Attribute("TotalSettlementedCredit")
	private String totalSettlementedCredit;//总结	
	@Attribute("PageSettlementedCredit")
	private String pageSettlementedCredit;//小结
//	<SumItem TotalSettlementedCredit="0" PageSettlementedCredit="0" TotalProfit="0" 
//		PageProfit="0" TotalCommission="0" PageCommission="0" Totalinterest="0" Pageinterest="0" TotalInvest="0" 
//		PageInvest="0" TotalDivest="0" PageDivest="0" PageTotal="0" Total="0"/>
	@Attribute("TotalProfit")
	private String totalProfit;
	@Attribute("PageProfit")
	private String pageProfit;
	@Attribute("TotalCommission")
	private String totalCommission;
	@Attribute("PageCommission")
	private String pageCommission;
	@Attribute("Totalinterest")
	private String totalinterest;
	@Attribute("Pageinterest")
	private String pageinterest;
	@Attribute("TotalInvest")
	private String totalInvest;
	@Attribute("PageInvest")
	private String pageInvest;
	@Attribute("TotalDivest")
	private String totalDivest;
	@Attribute("PageDivest")
	private String pageDivest;
	@Attribute("PageTotal")
	private String pageTotal;
	@Attribute("Total")
	private String total;
	
	public String getTotalSettlementedCredit() {
		return totalSettlementedCredit;
	}
	public void setTotalSettlementedCredit(String totalSettlementedCredit) {
		this.totalSettlementedCredit = totalSettlementedCredit;
	}
	public String getPageSettlementedCredit() {
		return pageSettlementedCredit;
	}
	public void setPageSettlementedCredit(String pageSettlementedCredit) {
		this.pageSettlementedCredit = pageSettlementedCredit;
	}
	public String getTotalProfit() {
		return totalProfit;
	}
	public void setTotalProfit(String totalProfit) {
		this.totalProfit = totalProfit;
	}
	public String getPageProfit() {
		return pageProfit;
	}
	public void setPageProfit(String pageProfit) {
		this.pageProfit = pageProfit;
	}
	public String getTotalCommission() {
		return totalCommission;
	}
	public void setTotalCommission(String totalCommission) {
		this.totalCommission = totalCommission;
	}
	public String getPageCommission() {
		return pageCommission;
	}
	public void setPageCommission(String pageCommission) {
		this.pageCommission = pageCommission;
	}
	public String getTotalinterest() {
		return totalinterest;
	}
	public void setTotalinterest(String totalinterest) {
		this.totalinterest = totalinterest;
	}
	public String getPageinterest() {
		return pageinterest;
	}
	public void setPageinterest(String pageinterest) {
		this.pageinterest = pageinterest;
	}
	public String getTotalInvest() {
		return totalInvest;
	}
	public void setTotalInvest(String totalInvest) {
		this.totalInvest = totalInvest;
	}
	public String getPageInvest() {
		return pageInvest;
	}
	public void setPageInvest(String pageInvest) {
		this.pageInvest = pageInvest;
	}
	public String getTotalDivest() {
		return totalDivest;
	}
	public void setTotalDivest(String totalDivest) {
		this.totalDivest = totalDivest;
	}
	public String getPageDivest() {
		return pageDivest;
	}
	public void setPageDivest(String pageDivest) {
		this.pageDivest = pageDivest;
	}
	public String getPageTotal() {
		return pageTotal;
	}
	public void setPageTotal(String pageTotal) {
		this.pageTotal = pageTotal;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	} 
	
 

}
