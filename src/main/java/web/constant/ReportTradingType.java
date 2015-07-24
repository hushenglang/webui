package web.constant;

public enum ReportTradingType implements EnumIntf{
	
	ALL("", "enum.report.all"),
	BUY("1", "enum.report.buy"),
	SELL("2", "enum.report.sell");
	

	private final String operator;   
	private final String labelKey;   
	
	ReportTradingType(String _operator, String labelKey) {
		this.operator = _operator;
		this.labelKey = labelKey;
	}

	public String getValue() {
        return this.operator;
    }
	public String getLabelKey() {
        return this.labelKey;
    }
}
