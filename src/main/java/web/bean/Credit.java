package web.bean;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;



@XmlRootElement(name = "Item")
public class Credit implements Serializable  {
	private static final long serialVersionUID = 778023424454505333L;
	@XmlAttribute(name = "id")
	private String id;
	@XmlAttribute(name="CreateTime")
	private String createTime;
	@XmlAttribute(name="Login")
	private String login;
	@XmlAttribute(name="Type")
	private String type;
	@XmlAttribute(name="PrevAvailCredit")
	private String prevAvailCredit;
	@XmlAttribute(name="Change")
	private String change;
	@XmlAttribute(name="NewAvailCredit")
	private String newAvailCredit;
	@XmlAttribute(name="AgName")
	private String AgName;
	@XmlAttribute(name="AgCode")
	private String agCode;
	@XmlAttribute(name="ExtendedData")
	private String extendedData;
	@XmlAttribute(name="Comment")
	private String comment;
	@XmlAttribute(name="Comment2")
	private String comment2;
	
	
	
	@XmlTransient
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@XmlTransient
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	@XmlTransient
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	@XmlTransient
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@XmlTransient
	public String getPrevAvailCredit() {
		return prevAvailCredit;
	}
	public void setPrevAvailCredit(String prevAvailCredit) {
		this.prevAvailCredit = prevAvailCredit;
	}
	@XmlTransient
	public String getChange() {
		return change;
	}
	public void setChange(String change) {
		this.change = change;
	}
	@XmlTransient
	public String getNewAvailCredit() {
		return newAvailCredit;
	}
	public void setNewAvailCredit(String newAvailCredit) {
		this.newAvailCredit = newAvailCredit;
	}
	@XmlTransient
	public String getAgName() {
		return AgName;
	}
	public void setAgName(String agName) {
		AgName = agName;
	}
	@XmlTransient
	public String getAgCode() {
		return agCode;
	}
	public void setAgCode(String agCode) {
		this.agCode = agCode;
	}
	@XmlTransient
	public String getExtendedData() {
		return extendedData;
	}
	public void setExtendedData(String extendedData) {
		this.extendedData = extendedData;
	}
	@XmlTransient
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@XmlTransient
	public String getComment2() {
		return comment2;
	}
	public void setComment2(String comment2) {
		this.comment2 = comment2;
	}
	
	
	
	
}
