package web.bean;

import java.io.Serializable;

import net.sourceforge.tranxbean.annotations.Element;

/**
 * @author Charles So
 * @version 1.0 Create on: 2011/8/18
 */
@Element(name = "record")
public class VersionControlRecord implements Serializable {
	private static final long serialVersionUID = -2292207405949764613L;
	@Element
	private String version;
	@Element
	private String date;
	@Element
	private String programmer;
	@Element
	private String module;
	@Element
	private String function;
	@Element
	private String comment;
	@Element
	private String tag;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getProgrammer() {
		return programmer;
	}

	public void setProgrammer(String programmer) {
		this.programmer = programmer;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
