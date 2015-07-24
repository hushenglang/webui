package web.vo;

import java.text.DecimalFormat;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

@Element
public class TradeReportContent {
	
	DecimalFormat df = new DecimalFormat("#0.00");
	
	@Attribute("Id")
	private String id;
	
	@Attribute("Login")
	private String login;

	@Attribute("ExternalId")
	private String externalId;

	@Attribute("OrderId")
	private String orderId;

	@Attribute("PosId")
	private String posId;

	@Attribute("Symbol")
	private String symbol;
	
	@Attribute("ProductName")
	private String productName;

	@Attribute("UID")
	private String uid;

	@Attribute("Time")
	private String time;

	@Attribute("Action")
	private String action;

	@Attribute("Entry")
	private String entry;

	@Attribute("Volume")
	private String volume;

	@Attribute("Price")
	private String price;

	@Attribute("Profit")
	private String netProfit; //淨盈虧

	@Attribute("ProfitRaw")
	private String profitRaw;

	@Attribute("Relate")
	private String relate;

	@Attribute("Commission") // 手續費
	private String commission;

	@Attribute("CommissionRaw")
	private String commissionRaw;

	@Attribute("CurrencyRaw")
	private String currencyRaw;

	@Attribute("ExtendedData")
	private String extendedData;
	
	@Attribute("OrderExtendeddData")
	private String orderExtendeddData;

	@Attribute("Comment")
	private String comment;
	
	
	@Attribute("Swap") //利息
	private String swap;
	
	@Attribute("SumValue")
	private String sumValue;
	//TODO add 調整
	
	private String profit; //淨盈虧 = profit + swap
	private String total; // 總額 = netProfit + commission + 調整
	
	//平仓号(针对平仓单)
	private String closeOrderId;
	
	//類型  1: 市價，2: 限價
	@Attribute("OrderType")
	private String orderType;
	
	@Attribute("OrderReason")
	private String orderReason;

	private String rolloverUID;//原仓单的单号
	
	private String buildPath;//途径 
	public String getBuildPath() {
		return buildPath;
	}

	public void setBuildPath(String buildPath) {
		this.buildPath = buildPath;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getExternalId() {
		return externalId;
	}

	public void setExternalId(String externalId) {
		this.externalId = externalId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getPosId() {
		return posId;
	}

	public void setPosId(String posId) {
		this.posId = posId;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getEntry() {
		return entry;
	}

	public void setEntry(String entry) {
		this.entry = entry;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getProfit() {
	//	double profit = Double.parseDouble(netProfit) - Double.parseDouble(this.getSwap());
		return profit;
	}

	public void setProfit(String profit) {
		this.profit = profit;
	}

	public String getProfitRaw() {
		return profitRaw;
	}

	public void setProfitRaw(String profitRaw) {
		this.profitRaw = profitRaw;
	}

	public String getRelate() {
		return relate;
	}

	public void setRelate(String relate) {
		this.relate = relate;
	}

	public String getCommission() {
//		double d = new Double(commission);
//		if(d != 0.0) {
//			d = d * -1;
//		}
		return commission;
	}

	public void setCommission(String commission) {
		this.commission = commission;
	}

	public String getCommissionRaw() {
		return commissionRaw;
	}

	public void setCommissionRaw(String commissionRaw) {
		this.commissionRaw = commissionRaw;
	}

	public String getCurrencyRaw() {
		return currencyRaw;
	}

	public void setCurrencyRaw(String currencyRaw) {
		this.currencyRaw = currencyRaw;
	}

	public String getExtendedData() {
		return extendedData;
	}

	public void setExtendedData(String extendedData) {
		this.extendedData = extendedData;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getSwap() {
//		if(!StringUtil.isNullOrEmpty(extendedData) && extendedData.indexOf("Swap")>0){
//			String data2 = extendedData.split("Swap")[1];
//			swap = data2.substring(1, data2.indexOf(";"));
//		}else{
//			swap = "0";
//		}
		return swap;//df.format(new Double());
	}

	public void setSwap(String swap) {
		this.swap = swap;
	}

	public String getNetProfit() {
		return netProfit;//df.format(new Double(netProfit));
	}

	public void setNetProfit(String netProfit) {
		this.netProfit = netProfit;
	}

	public String getTotal() {
		
		//double total = Double.parseDouble(this.getNetProfit()) - Double.parseDouble(commission);
		return total;//df.format(total);
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getOrderReason() {
		return orderReason;
	}

	public void setOrderReason(String orderReason) {
		this.orderReason = orderReason;
	}

	public String getCloseOrderId() {
		return closeOrderId;
	}

	public void setCloseOrderId(String closeOrderId) {
		this.closeOrderId = closeOrderId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRolloverUID() {
		return rolloverUID;
	}

	public void setRolloverUID(String rolloverUID) {
		this.rolloverUID = rolloverUID;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getOrderExtendeddData() {
		return orderExtendeddData;
	}

	public void setOrderExtendeddData(String orderExtendeddData) {
		this.orderExtendeddData = orderExtendeddData;
	}

	public String getSumValue() {
		return sumValue;
	}

	public void setSumValue(String sumValue) {
		this.sumValue = sumValue;
	}

	
	
}
