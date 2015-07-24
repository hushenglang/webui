package web.bean;

public class AdsVo {

	private String language; //[zh|tw]
	private String no;
	private String pic1; //picture url
	private String pictext; //tag a's alt
	private String siteFlg; 
	private String target; //tag a's target
	private String url; //tag a's href
	
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getPic1() {
		return pic1;
	}
	public void setPic1(String pic1) {
		this.pic1 = pic1;
	}
	public String getPictext() {
		return pictext;
	}
	public void setPictext(String pictext) {
		this.pictext = pictext;
	}
	public String getSiteFlg() {
		return siteFlg;
	}
	public void setSiteFlg(String siteFlg) {
		this.siteFlg = siteFlg;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public String toString() {
		return "AdsVo [language=" + language + ", no=" + no + ", pic1=" + pic1 + ", pictext=" + pictext + ", siteFlg=" + siteFlg
				+ ", target=" + target + ", url=" + url + "]";
	}
	
}
