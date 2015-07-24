package web.constant;
/**
* 加入GT1客戶狀態: 0为启用、1为冻结、-1为暂停与-2为禁用
* Update Time:上午10:34:51 2014-08-07 by Wilson Fung
*/
public enum AccountStatus implements EnumIntf{
	CS("CS", "enum.accountstatus.cs", 1, 	1),
	CR("CR", "enum.accountstatus.cr", 2, 	1),
	A("A", "enum.accountstatus.a", 0, 		0),
	M("M", "enum.accountstatus.m", 3, 		0),
	S("S", "enum.accountstatus.s", 4, 		-2),
	D("D", "enum.accountstatus.d", 5, 		-1),
	C("C", "enum.accountstatus.c", -1, 		-1),
	N("N", "enum.accountstatus.n", -3, 		-1),
	I("I", "enum.accountstatus.i", -4, 		-1);;

	private final String operator;   // in kilograms
	private final String labelKey;   // in kilograms
	private final int flagValue;
	private final int gt1Flag; 
	
	
	AccountStatus(String _operator, String labelKey, int flagValue, int gt1Flag) {
		this.operator = _operator;
		this.labelKey = labelKey;
		this.flagValue = flagValue;
		this.gt1Flag = gt1Flag;
	}

	public String getValue() {
        return this.operator;
    }
	public String getLabelKey() {
		return labelKey;
	}

	public int getFlagValue() {
		return flagValue;
	}
	
	public int getGt1Flag() {
		return gt1Flag;
	}
	
	public static int getFlagValue(String value) {
		int result =0;
		for(AccountStatus acStatus : AccountStatus.values()) {
			if(acStatus.getValue().equals(value)) {
				result = acStatus.getFlagValue();
				break;
			}
		}
		return result;
	}

}
