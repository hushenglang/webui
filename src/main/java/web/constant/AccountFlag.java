package web.constant;

/**
 * 会员状态：啟用、凍結、禁用、暫停
 */
public enum AccountFlag implements EnumIntf {
	ALL("", "enum.select.all"), 
	ENABLE("0", "enum.accountFlag.enable"), 
	FROZEN("1", "enum.accountFlag.frozen"), 
	DISABLE("-1", "enum.accountFlag.disable"), 
	PAUSE("-2", "enum.accountFlag.pause");

	private String value;
	private String labelKey;

	private AccountFlag(String value, String labelKey) {
		this.value = value;
		this.labelKey = labelKey;
	}

	@Override
	public String getValue() {
		return this.value;
	}

	@Override
	public String getLabelKey() {
		return this.labelKey;
	}
	
	public static AccountFlag getAccountFlag(String flag) {
		for(AccountFlag ac : AccountFlag.values()) {
			if(ac.getValue().equals(flag)) {
				return ac;
			}
		}
		return null;
	}

}