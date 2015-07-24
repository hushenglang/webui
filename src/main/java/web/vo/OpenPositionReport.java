package web.vo;

import net.sourceforge.tranxbean.annotations.Element;

import com.gwghk.gold.client.models.ApiResult;

public class OpenPositionReport extends ApiResult{
	
	@Element(name="ProductList")
	private OpenPositionReportProductList productList;

	public OpenPositionReportProductList getProductList() {
		if(productList==null) return new OpenPositionReportProductList();
		return productList;
	}

	public void setProductList(OpenPositionReportProductList productList) {
		this.productList = productList;
	}
	
	
	

}
