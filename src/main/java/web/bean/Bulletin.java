package web.bean;

import java.io.Serializable;

public class Bulletin  implements Serializable{

	private static final long serialVersionUID = 1L;

	// 公告Id
	private Long id ;
	
	// 标记
	private Long flags;
	
	// 公告时间
	private Long time;
	
	// 标题
	private String subject;
	
    //内容
	private String text ;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFlags() {
		return flags;
	}

	public void setFlags(Long flags) {
		this.flags = flags;
	}

	public Long getTime() {
		return time;
	}

	public void setTime(Long time) {
		this.time = time;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
