package web.vo;

import java.io.Serializable;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

/**
 * 信用记录报表
 * @author SZPaul
 *
 */
@Element
public class CreditRecordReportContent  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Attribute("CreateTime")
    private String createTime;//时间
	@Attribute("Type")
    private String type;//类型
	@Attribute("PrevAvailCredit")
    private String beforeCredit;//可用信用变化前
	@Attribute("Change")
    private String changeCredit;//变化
	@Attribute("NewAvailCredit")
    private String afterCredit;//可用信用变化后
	@Attribute("Login")
	private String login;
	@Attribute("id")
    private String waterFallNo;//流水号Login
	@Attribute("Comment")
	private String comment;
    
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getBeforeCredit() {
		return beforeCredit;
	}
	public void setBeforeCredit(String beforeCredit) {
		this.beforeCredit = beforeCredit;
	}
	public String getChangeCredit() {
		return changeCredit;
	}
	public void setChangeCredit(String changeCredit) {
		this.changeCredit = changeCredit;
	}
	public String getAfterCredit() {
		return afterCredit;
	}
	public void setAfterCredit(String afterCredit) {
		this.afterCredit = afterCredit;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getWaterFallNo() {
		return waterFallNo;
	}
	public void setWaterFallNo(String waterFallNo) {
		this.waterFallNo = waterFallNo;
	}
    
}
