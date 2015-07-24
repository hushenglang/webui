package web.bean;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import web.util.BigDecimalAdapter;
import web.util.DateAdapter;
import web.util.LongAdapter;

@XmlRootElement(name = "FCustomersParam")
@XmlAccessorType(XmlAccessType.FIELD)
public class FcustomersParam extends SimpleVo implements Serializable {
	/**
	 * 
	 * FcustomersDao.java
	 * 
	 * @author Albert Email:albert@222m.net
	 * @version 1.0 Create Time: 下午03:27:38 2010-12-7 Update Time: 下午03:27:38
	 *          2010-12-7
	 * @param <E>
	 * 
	 *            增加字段：CLIENT_CLASS 0迷你 1 标准 2专业 3 代理
	 */

	@XmlAttribute(name = "FCUSTOMERS_ID")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long fcustomersId;
	@XmlAttribute(name = "AGCODE")
	private String agcode;
	@XmlAttribute(name = "LOGINNAME")
	private String loginname;
	@XmlAttribute(name = "PWD")
	private String pwd;
	@XmlAttribute(name = "ALIASNAME")
	private String aliasname;

	@XmlAttribute(name = "BALANCE")
	// 他們傳過來的值是互換 BALANCE是余额 CREDIT是信用
	@XmlJavaTypeAdapter(value = BigDecimalAdapter.class)
	private java.math.BigDecimal credit;
	@XmlAttribute(name = "CREDIT")
	@XmlJavaTypeAdapter(value = BigDecimalAdapter.class)
	private java.math.BigDecimal balance;

	@XmlAttribute(name = "ORDERLIMIT")
	@XmlJavaTypeAdapter(value = BigDecimalAdapter.class)
	private java.math.BigDecimal orderLimit;
	@XmlAttribute(name = "BEFORELOGINTIME")
	@XmlJavaTypeAdapter(value = DateAdapter.class)
	private java.util.Date beforelogintime;
	@XmlAttribute(name = "LASTLOGINTIME")
	@XmlJavaTypeAdapter(value = DateAdapter.class)
	private java.util.Date lastlogintime;
	@XmlAttribute(name = "BEFORELOGINIP")
	private String beforeloginip;
	@XmlAttribute(name = "LASTLOGINIP")
	private String lastloginip;
	@XmlAttribute(name = "LOGINTIMES")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long logintimes;
	@XmlAttribute(name = "E_PER")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long EPer;
	@XmlAttribute(name = "D_PER")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long DPer;
	@XmlAttribute(name = "C_PER")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long CPer;
	@XmlAttribute(name = "B_PER")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long BPer;
	@XmlAttribute(name = "A_PER")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long APer;
	@XmlAttribute(name = "JOINTIME")
	@XmlJavaTypeAdapter(value = DateAdapter.class)
	private java.util.Date jointime;
	@XmlAttribute(name = "PWDEXPIRETIME")
	@XmlJavaTypeAdapter(value = DateAdapter.class)
	private java.util.Date pwdexpiretime;
	@XmlAttribute(name = "CHATNAME")
	private String chatname;
	@XmlAttribute(name = "ODDTYPE")
	private String oddtype;
	@XmlAttribute(name = "FLAG")
	private Integer flag;
	@XmlAttribute(name = "CURRENCY")
	private String currency;
	@XmlAttribute(name = "REALNAME")
	private String realname;
	@XmlAttribute(name = "BINDACCOUNT")
	private String bindaccount;
	@XmlAttribute(name = "REGIP")
	private String regip;
	@XmlAttribute(name = "ACTIVE")
	private Integer active;
	@XmlAttribute(name = "A_DIS")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long ADis;
	@XmlAttribute(name = "B_DIS")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long BDis;
	@XmlAttribute(name = "C_DIS")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long CDis;
	@XmlAttribute(name = "D_DIS")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long DDis;
	@XmlAttribute(name = "E_DIS")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long EDis;
	@XmlAttribute(name = "LIMIT")
	@XmlJavaTypeAdapter(value = LongAdapter.class)
	private Long limit;
	@XmlAttribute(name = "POINTVALCODE")
	private String pointvalcode;
	@XmlAttribute(name = "TINYCGSE")
	private Integer tinyCgse;
	@XmlAttribute(name = "CLIENT_CLASS")
	private Integer clientClass;
	@XmlAttribute(name = "ERRORCOUNT")
	private Integer errorcount;

	// gtserver 登陆需要重新生成md5 hash
	private String gtPwd;

	public String getGtPwd() {
		return gtPwd;
	}

	public void setGtPwd(String gtPwd) {
		this.gtPwd = gtPwd;
	}

	/**
	 * @return the fcustomersId
	 */
	@XmlTransient
	public long getFcustomersId() {
		return fcustomersId;
	}

	/**
	 * @return the agcode
	 */
	@XmlTransient
	public String getAgcode() {
		return agcode;
	}

	/**
	 * @return the loginname
	 */
	@XmlTransient
	public String getLoginname() {
		return loginname;
	}

	/**
	 * @return the pwd
	 */
	@XmlTransient
	public String getPwd() {
		return pwd;
	}

	/**
	 * @return the aliasname
	 */
	@XmlTransient
	public String getAliasname() {
		return aliasname;
	}

	/**
	 * @return the credit
	 */
	@XmlTransient
	public java.math.BigDecimal getCredit() {
		return credit;
	}

	/**
	 * @return the orderLimit
	 */
	@XmlTransient
	public java.math.BigDecimal getOrderLimit() {
		return orderLimit;
	}

	/**
	 * @return the beforelogintime
	 */

	@XmlTransient
	public java.util.Date getBeforelogintime() {
		return beforelogintime;
	}

	/**
	 * @return the lastlogintime
	 */
	@XmlTransient
	public java.util.Date getLastlogintime() {
		return lastlogintime;
	}

	/**
	 * @return the beforeloginip
	 */
	@XmlTransient
	public String getBeforeloginip() {
		return beforeloginip;
	}

	/**
	 * @return the lastloginip
	 */
	@XmlTransient
	public String getLastloginip() {
		return lastloginip;
	}

	/**
	 * @return the logintimes
	 */
	@XmlTransient
	public long getLogintimes() {
		return logintimes;
	}

	/**
	 * @return the ePer
	 */
	@XmlTransient
	public long getEPer() {
		return EPer;
	}

	/**
	 * @return the dPer
	 */
	@XmlTransient
	public long getDPer() {
		return DPer;
	}

	/**
	 * @return the cPer
	 */
	@XmlTransient
	public long getCPer() {
		return CPer;
	}

	/**
	 * @return the bPer
	 */
	@XmlTransient
	public long getBPer() {
		return BPer;
	}

	/**
	 * @return the aPer
	 */
	@XmlTransient
	public long getAPer() {
		return APer;
	}

	/**
	 * @return the jointime
	 */
	@XmlTransient
	public java.util.Date getJointime() {
		return jointime;
	}

	/**
	 * @return the pwdexpiretime
	 */
	@XmlTransient
	public java.util.Date getPwdexpiretime() {
		return pwdexpiretime;
	}

	/**
	 * @return the chatname
	 */
	@XmlTransient
	public String getChatname() {
		return chatname;
	}

	/**
	 * @return the oddtype
	 */
	@XmlTransient
	public String getOddtype() {
		return oddtype;
	}

	/**
	 * @return the flag
	 */
	@XmlTransient
	public int getFlag() {
		return flag;
	}

	/**
	 * @return the currency
	 */
	@XmlTransient
	public String getCurrency() {
		return currency;
	}

	/**
	 * @return the realname
	 */
	@XmlTransient
	public String getRealname() {
		return realname;
	}

	/**
	 * @return the bindaccount
	 */
	@XmlTransient
	public String getBindaccount() {
		return bindaccount;
	}

	/**
	 * @return the regip
	 */
	@XmlTransient
	public String getRegip() {
		return regip;
	}

	/**
	 * @return the active
	 */
	@XmlTransient
	public Integer getActive() {
		return active;
	}

	/**
	 * @return the aDis
	 */
	@XmlTransient
	public long getADis() {
		return ADis;
	}

	/**
	 * @return the bDis
	 */
	@XmlTransient
	public long getBDis() {
		return BDis;
	}

	/**
	 * @return the cDis
	 */
	@XmlTransient
	public long getCDis() {
		return CDis;
	}

	/**
	 * @return the dDis
	 */
	@XmlTransient
	public long getDDis() {
		return DDis;
	}

	/**
	 * @return the eDis
	 */
	@XmlTransient
	public long getEDis() {
		return EDis;
	}

	/**
	 * @return the limit
	 */
	@XmlTransient
	public long getLimit() {
		return limit;
	}

	/**
	 * @return the pointvalcode
	 */
	@XmlTransient
	public String getPointvalcode() {
		return pointvalcode;
	}

	/**
	 * @return the tinyCgse
	 */
	@XmlTransient
	public int getTinyCgse() {
		return tinyCgse;
	}

	/**
	 * @return the clientClass
	 */
	@XmlTransient
	public Integer getClientClass() {
		return clientClass;
	}

	/**
	 * @return the errorcount
	 */
	@XmlTransient
	public int getErrorcount() {
		return errorcount;
	}

	/**
	 * @param fcustomersId
	 *            the fcustomersId to set
	 */
	public void setFcustomersId(long fcustomersId) {
		this.fcustomersId = fcustomersId;
	}

	/**
	 * @param agcode
	 *            the agcode to set
	 */
	public void setAgcode(String agcode) {
		this.agcode = agcode;
	}

	/**
	 * @param loginname
	 *            the loginname to set
	 */
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	/**
	 * @param pwd
	 *            the pwd to set
	 */
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	/**
	 * @param aliasname
	 *            the aliasname to set
	 */
	public void setAliasname(String aliasname) {
		this.aliasname = aliasname;
	}

	/**
	 * @param credit
	 *            the credit to set
	 */
	public void setCredit(java.math.BigDecimal credit) {
		this.credit = credit;
	}

	/**
	 * @param orderLimit
	 *            the orderLimit to set
	 */
	public void setOrderLimit(java.math.BigDecimal orderLimit) {
		this.orderLimit = orderLimit;
	}

	/**
	 * @param beforelogintime
	 *            the beforelogintime to set
	 */
	public void setBeforelogintime(java.util.Date beforelogintime) {
		this.beforelogintime = beforelogintime;
	}

	/**
	 * @param lastlogintime
	 *            the lastlogintime to set
	 */
	public void setLastlogintime(java.util.Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	/**
	 * @param beforeloginip
	 *            the beforeloginip to set
	 */
	public void setBeforeloginip(String beforeloginip) {
		this.beforeloginip = beforeloginip;
	}

	/**
	 * @param lastloginip
	 *            the lastloginip to set
	 */
	public void setLastloginip(String lastloginip) {
		this.lastloginip = lastloginip;
	}

	/**
	 * @param logintimes
	 *            the logintimes to set
	 */
	public void setLogintimes(long logintimes) {
		this.logintimes = logintimes;
	}

	/**
	 * @param per
	 *            the ePer to set
	 */
	public void setEPer(long per) {
		EPer = per;
	}

	/**
	 * @param per
	 *            the dPer to set
	 */
	public void setDPer(long per) {
		DPer = per;
	}

	/**
	 * @param per
	 *            the cPer to set
	 */
	public void setCPer(long per) {
		CPer = per;
	}

	/**
	 * @param per
	 *            the bPer to set
	 */
	public void setBPer(long per) {
		BPer = per;
	}

	/**
	 * @param per
	 *            the aPer to set
	 */
	public void setAPer(long per) {
		APer = per;
	}

	/**
	 * @param jointime
	 *            the jointime to set
	 */
	public void setJointime(java.util.Date jointime) {
		this.jointime = jointime;
	}

	/**
	 * @param pwdexpiretime
	 *            the pwdexpiretime to set
	 */
	public void setPwdexpiretime(java.util.Date pwdexpiretime) {
		this.pwdexpiretime = pwdexpiretime;
	}

	/**
	 * @param chatname
	 *            the chatname to set
	 */
	public void setChatname(String chatname) {
		this.chatname = chatname;
	}

	/**
	 * @param oddtype
	 *            the oddtype to set
	 */
	public void setOddtype(String oddtype) {
		this.oddtype = oddtype;
	}

	/**
	 * @param flag
	 *            the flag to set
	 */
	public void setFlag(int flag) {
		this.flag = flag;
	}

	/**
	 * @param currency
	 *            the currency to set
	 */
	public void setCurrency(String currency) {
		this.currency = currency;
	}

	/**
	 * @param realname
	 *            the realname to set
	 */
	public void setRealname(String realname) {
		this.realname = realname;
	}

	/**
	 * @param bindaccount
	 *            the bindaccount to set
	 */
	public void setBindaccount(String bindaccount) {
		this.bindaccount = bindaccount;
	}

	/**
	 * @param regip
	 *            the regip to set
	 */
	public void setRegip(String regip) {
		this.regip = regip;
	}

	/**
	 * @param active
	 *            the active to set
	 */
	public void setActive(Integer active) {
		this.active = active;
	}

	/**
	 * @param dis
	 *            the aDis to set
	 */
	public void setADis(long dis) {
		ADis = dis;
	}

	/**
	 * @param dis
	 *            the bDis to set
	 */
	public void setBDis(long dis) {
		BDis = dis;
	}

	/**
	 * @param dis
	 *            the cDis to set
	 */
	public void setCDis(long dis) {
		CDis = dis;
	}

	/**
	 * @param dis
	 *            the dDis to set
	 */
	public void setDDis(long dis) {
		DDis = dis;
	}

	/**
	 * @param dis
	 *            the eDis to set
	 */
	public void setEDis(long dis) {
		EDis = dis;
	}

	/**
	 * @param limit
	 *            the limit to set
	 */
	public void setLimit(long limit) {
		this.limit = limit;
	}

	/**
	 * @param pointvalcode
	 *            the pointvalcode to set
	 */
	public void setPointvalcode(String pointvalcode) {
		this.pointvalcode = pointvalcode;
	}

	/**
	 * @param tinyCgse
	 *            the tinyCgse to set
	 */
	public void setTinyCgse(int tinyCgse) {
		this.tinyCgse = tinyCgse;
	}

	/**
	 * @param clientClass
	 *            the clientClass to set
	 */
	public void setClientClass(Integer clientClass) {
		this.clientClass = clientClass;
	}

	/**
	 * @param errorcount
	 *            the errorcount to set
	 */
	public void setErrorcount(int errorcount) {
		this.errorcount = errorcount;
	}

	/**
	 * @return the balance
	 */
	public java.math.BigDecimal getBalance() {
		return balance;
	}

	/**
	 * @param balance
	 *            the balance to set
	 */
	public void setBalance(java.math.BigDecimal balance) {
		this.balance = balance;
	}

}
