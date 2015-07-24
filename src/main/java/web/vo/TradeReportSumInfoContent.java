package web.vo;

import java.text.DecimalFormat;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

@Element
public class TradeReportSumInfoContent {
	
	DecimalFormat df = new DecimalFormat("#0.00");
	
	
//	<SumItem TotalProfit="-89.970000" TotalCommission="246.000000" TotalSwap="0.000000" TotalAdjust="0.000000" TotalVol="56.740000"
//	PageProfit="-20.000000" PageCommission="21.000000" PageSwap="0.000000" PageAdjust="0.000000" PageVol="1.510000"/>
//	</SumInfo>
	
	@Attribute("TotalProfit")
	private String totalProfit  ;
	
	@Attribute("TotalCommission")
	private String totalCommission;

	@Attribute("TotalSwap")
	private String totalSwap;

	@Attribute("TotalAdjust")
	private String totalAdjust;

	@Attribute("TotalVol")
	private String totalVol;

	@Attribute("PageProfit")
	private String pageProfit;
	
	@Attribute("PageCommission")
	private String pageCommission;

	@Attribute("PageSwap")
	private String pageSwap;

	@Attribute("PageAdjust")
	private String pageAdjust;

	@Attribute("PageVol")
	private String pageVol;
	

	@Attribute("Total")
	private String total;

	@Attribute("PageTotal")
	private String pageTotal;

	public DecimalFormat getDf() {
		return df;
	}

	public void setDf(DecimalFormat df) {
		this.df = df;
	}

	public String getTotalProfit() {
		return totalProfit;
	}

	public void setTotalProfit(String totalProfit) {
		this.totalProfit = totalProfit;
	}

	public String getTotalCommission() {
		return totalCommission;
	}

	public void setTotalCommission(String totalCommission) {
		this.totalCommission = totalCommission;
	}

	public String getTotalSwap() {
		return totalSwap;
	}

	public void setTotalSwap(String totalSwap) {
		this.totalSwap = totalSwap;
	}

	public String getTotalAdjust() {
		return totalAdjust;
	}

	public void setTotalAdjust(String totalAdjust) {
		this.totalAdjust = totalAdjust;
	}

	public String getTotalVol() {
		return totalVol;
	}

	public void setTotalVol(String totalVol) {
		this.totalVol = totalVol;
	}

	public String getPageProfit() {
		return pageProfit;
	}

	public void setPageProfit(String pageProfit) {
		this.pageProfit = pageProfit;
	}

	public String getPageCommission() {
		return pageCommission;
	}

	public void setPageCommission(String pageCommission) {
		this.pageCommission = pageCommission;
	}

	public String getPageSwap() {
		return pageSwap;
	}

	public void setPageSwap(String pageSwap) {
		this.pageSwap = pageSwap;
	}

	public String getPageAdjust() {
		return pageAdjust;
	}

	public void setPageAdjust(String pageAdjust) {
		this.pageAdjust = pageAdjust;
	}

	public String getPageVol() {
		return pageVol;
	}

	public void setPageVol(String pageVol) {
		this.pageVol = pageVol;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getPageTotal() {
		return pageTotal;
	}

	public void setPageTotal(String pageTotal) {
		this.pageTotal = pageTotal;
	}

	 
	 
}
