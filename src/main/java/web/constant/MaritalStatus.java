package web.constant;

public enum MaritalStatus implements EnumIntf{
	Single("Single", "enum.maritalstatus.single"),
	Married("Married", "enum.maritalstatus.married");

	private final String operator;   // in kilograms
	private final String labelKey;   // in kilograms

	MaritalStatus(String _operator, String labelKey) {
		this.operator = _operator;
		this.labelKey = labelKey;
	}

	public String getValue() {
        return this.operator;
    }
	public String getLabelKey() {
		return labelKey;
	}

}
