package web.vo;

import java.text.DecimalFormat;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;
import web.constant.ReportTradingType;
import web.util.StringUtil;

@Element
public class OpenPositionReportContent {
	
	DecimalFormat df = new DecimalFormat("#0.00");
	
	@Attribute("PosId")
	private String posId;

	@Attribute("Login")
	private String login;

	@Attribute("Symbol")
	private String symbol;
	
	@Attribute("ProductName")
	private String productName;

	@Attribute("UID")
	private String uid;

	@Attribute("Volume")
	private String volume;

	@Attribute("CreateTime")
	private String createTime;

	@Attribute("OpenPrice")
	private String openPrice;

	@Attribute("CurrentPrice")
	private String currentPrice;

	@Attribute("PriceSL")
	private String priceSL;

	@Attribute("PriceTP")
	private String priceTP;

	//利息
	@Attribute("Storage")
	private String storage;

	@Attribute("ActivationMode")
	private String activationMode;

	@Attribute("ActivationTime")
	private String activationTime;

	@Attribute("ActivationPrice")
	private String activationPrice;

	@Attribute("Type")
	private String type;

	@Attribute("ExtendedData")
	private String extendedData;
	
	//淨盈虧
	private String netProfit;
	private String tradeUtil;
	private String swap;
	//盈虧
	private String profit;

	public String getNetProfit() {
		double n = Double.parseDouble(this.getProfit()) + Double.parseDouble(this.getStorage());
		netProfit = df.format(n);
		return netProfit;
	}

	public void setNetProfit(String netProfit) {
		this.netProfit = netProfit;
	}

	public String getTradeUtil() {
		if(!StringUtil.isNullOrEmpty(extendedData) && extendedData.indexOf("TradeUnit")>0){
			String data2 = extendedData.split("TradeUnit")[1];
			if(data2.indexOf(";")>0){
				tradeUtil = data2.substring(1, data2.indexOf(";"));
			}else{
				tradeUtil = data2.substring(1, data2.length());
			}
		}else{
			tradeUtil = "0";
		}
		return df.format(new Double(tradeUtil));
	}

	public void setTradeUtil(String tradeUtil) {
		this.tradeUtil = tradeUtil;
	}

	public String getSwap() {
		if(!StringUtil.isNullOrEmpty(extendedData) && extendedData.indexOf("Swap")>0){
			String data2 = extendedData.split("Swap")[1];
			swap = data2.substring(1, data2.indexOf(";"));
		}else{
			swap = "0";
		}
		return df.format(new Double(swap));
	}

	public void setSwap(String swap) {
		this.swap = swap;
	}

	public String getPosId() {
		return posId;
	}

	public void setPosId(String posId) {
		this.posId = posId;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
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

	public String getVolume() {
		return df.format(new Double(volume));
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getOpenPrice() {
		return df.format(new Double(openPrice));
	}

	public void setOpenPrice(String openPrice) {
		this.openPrice = openPrice;
	}

	public String getCurrentPrice() {
		return df.format(new Double(currentPrice));
	}

	public void setCurrentPrice(String currentPrice) {
		this.currentPrice = currentPrice;
	}

	public String getPriceSL() {
		return priceSL;
	}

	public void setPriceSL(String priceSL) {
		this.priceSL = priceSL;
	}

	public String getPriceTP() {
		return priceTP;
	}

	public void setPriceTP(String priceTP) {
		this.priceTP = priceTP;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getActivationMode() {
		return activationMode;
	}

	public void setActivationMode(String activationMode) {
		this.activationMode = activationMode;
	}

	public String getActivationTime() {
		return activationTime;
	}

	public void setActivationTime(String activationTime) {
		this.activationTime = activationTime;
	}

	public String getActivationPrice() {
		return activationPrice;
	}

	public void setActivationPrice(String activationPrice) {
		this.activationPrice = activationPrice;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExtendedData() {
		return extendedData;
	}

	public void setExtendedData(String extendedData) {
		this.extendedData = extendedData;
	}

	public String getProfit() {
		double p = 0;
		if(ReportTradingType.BUY.getValue().equals(this.getType())) {
			p = Double.parseDouble(this.getCurrentPrice()) - Double.parseDouble(this.getOpenPrice());
		} else {
			p = Double.parseDouble(this.getOpenPrice()) - Double.parseDouble(this.getCurrentPrice());
		}
		
		p = p* Double.parseDouble(this.getTradeUtil())*Double.parseDouble(this.getVolume());
		profit = df.format(p);
		return profit;
	}

	public void setProfit(String profit) {
		this.profit = profit;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

}
