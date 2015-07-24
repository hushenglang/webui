package web.bean;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name = "Result")
@XmlAccessorType(XmlAccessType.FIELD)
public class AdminLoginInfo implements Serializable {
	private static final long serialVersionUID = -4230986072896344525L;
	@XmlAttribute(name = "Code")
	private String result;
	@XmlElement(name = "FCustomersParam")
	private FcustomersParam fcustomersParam;
	@XmlElement(name = "FCustomerInfoParam")
	private FcustomerInfoParam fcustomerInfoParam;
	@XmlElement(name = "SessionId")
	private String sessionId;

	@XmlTransient
	public FcustomersParam getFcustomersParam() {
		return this.fcustomersParam;
	}

	public void setFcustomersParam(FcustomersParam fcustomersParam) {
		this.fcustomersParam = fcustomersParam;
	}

	@XmlTransient
	public FcustomerInfoParam getFcustomerInfoParam() {
		return this.fcustomerInfoParam;
	}

	public void setFcustomerInfoParam(FcustomerInfoParam fcustomerInfoParam) {
		this.fcustomerInfoParam = fcustomerInfoParam;
	}

	@XmlTransient
	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	/**
	 * @return the sessionId
	 */
	@XmlTransient
	public String getSessionId() {
		return sessionId;
	}

	/**
	 * @param sessionId
	 *            the sessionId to set
	 */
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

}
