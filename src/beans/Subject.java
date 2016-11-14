package beans;

/**
 * Subject entity. @author MyEclipse Persistence Tools
 */

public class Subject implements java.io.Serializable {

	// Fields

	private String subid;
	private String teaid;
	private String subname;
	private String subcontent;
	private String subtime;

	// Constructors

	/** default constructor */
	public Subject() {
	}

	/** full constructor */
	public Subject(String subid, String teaid, String subname,
			String subcontent, String subtime) {
		this.subid = subid;
		this.teaid = teaid;
		this.subname = subname;
		this.subcontent = subcontent;
		this.subtime = subtime;
	}

	// Property accessors

	public String getSubid() {
		return this.subid;
	}

	public void setSubid(String subid) {
		this.subid = subid;
	}

	public String getTeaid() {
		return this.teaid;
	}

	public void setTeaid(String teaid) {
		this.teaid = teaid;
	}

	public String getSubname() {
		return this.subname;
	}

	public void setSubname(String subname) {
		this.subname = subname;
	}

	public String getSubcontent() {
		return this.subcontent;
	}

	public void setSubcontent(String subcontent) {
		this.subcontent = subcontent;
	}

	public String getSubtime() {
		return this.subtime;
	}

	public void setSubtime(String subtime) {
		this.subtime = subtime;
	}

}