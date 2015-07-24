package web.bean;

import java.util.ArrayList;

import net.sourceforge.tranxbean.annotations.Attribute;
import net.sourceforge.tranxbean.annotations.Element;

/**
 * @author Charles So
 * @version 1.0 Create on: 2011/8/18
 */
@Element(name = "versions")
public class VersionControlRecordList extends ArrayList<VersionControlRecord> {

	private static final long serialVersionUID = -2577567083632107711L;

	@Attribute
	private String project;
	@Attribute
	private String manager;
	@Attribute
	private String email;

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
