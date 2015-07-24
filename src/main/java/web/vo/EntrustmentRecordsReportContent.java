package web.vo;

import java.io.Serializable;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

/**
 * 委托记录报表
 * @author SZPaul
 *
 */
@Element
public class EntrustmentRecordsReportContent  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Attribute("SetupTime")
    private String entrustmentTime;//委托时间
	@Attribute("UID")
    private String entrustmentNo;//委托号
	@Attribute("Symbol")
    private String product;//产品code
	@Attribute("ProductName")
    private String productName;//产品
	@Attribute("OrderState")
    private String type;//类别 ‘等待’、‘已取消’或‘已拒绝’委托单不显示类别，以“-”表示 ‘已执行’的委托单显示为In、Out、Out/In    
	@Attribute("OrderType")
    private String inorout;//买/卖 
	@Attribute("InitialVolume")
    private String lot;//手数 
	@Attribute("OrderPrice")//限价
    private String limitPrice;  //
	@Attribute("PriceSL")
    private String stopLoss;//停损
	@Attribute("OrderState")
    private String state;//状态   
	@Attribute("OrderTime")
    private String limitDate;//期限 ExpirTime
	@Attribute("TriggerTime")
    private String performTime;//执行时间    
	@Attribute("Comment")
    private String remark; // 
	@Attribute("ExtendedData")
	private String extendedData;
	@Attribute("OrderExtendeddData")
	private String orderExtendedData;
	@Attribute("PriceTP")
	private String priceTP;
	@Attribute("DealUID")
	private String orderNum;
    
    private String buildPath;
    
	public String getEntrustmentTime() {
		return entrustmentTime;
	}
	public void setEntrustmentTime(String entrustmentTime) {
		this.entrustmentTime = entrustmentTime;
	}
	public String getEntrustmentNo() {
		return entrustmentNo;
	}
	public void setEntrustmentNo(String entrustmentNo) {
		this.entrustmentNo = entrustmentNo;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getInorout() {
		return inorout;
	}
	public void setInorout(String inorout) {
		this.inorout = inorout;
	}
	public String getLot() {
		return lot;
	}
	public void setLot(String lot) {
		this.lot = lot;
	}
	public String getLimitPrice() {
		return limitPrice;
	}
	public void setLimitPrice(String limitPrice) {
		this.limitPrice = limitPrice;
	}
	public String getStopLoss() {
		return stopLoss;
	}
	public void setStopLoss(String stopLoss) {
		this.stopLoss = stopLoss;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getLimitDate() {
		return limitDate;
	}
	public void setLimitDate(String limitDate) {
		this.limitDate = limitDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPerformTime() {
		return performTime;
	}
	public void setPerformTime(String performTime) {
		this.performTime = performTime;
	}
	public String getBuildPath() {
		return buildPath;
	}
	public void setBuildPath(String buildPath) {
		this.buildPath = buildPath;
	}
	public String getExtendedData() {
		return extendedData;
	}
	public void setExtendedData(String extendedData) {
		this.extendedData = extendedData;
	}
	public String getOrderExtendedData() {
		return orderExtendedData;
	}
	public void setOrderExtendedData(String orderExtendedData) {
		this.orderExtendedData = orderExtendedData;
	}
	public String getPriceTP() {
		return priceTP;
	}
	public void setPriceTP(String priceTP) {
		this.priceTP = priceTP;
	}
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getProductName()
	{
		return productName;
	}
	public void setProductName(String productName)
	{
		this.productName = productName;
	}
}
