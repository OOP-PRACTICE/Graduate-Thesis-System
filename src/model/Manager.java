package model;

/**
 * Manager entity. @author MyEclipse Persistence Tools
 */

public class Manager implements java.io.Serializable {

	// Fields

	private String manid;
	private String manname;
	private String manpw;

	// Constructors

	/** default constructor */
	public Manager() {
	}

	/** full constructor */
	public Manager(String manid, String manname, String manpw) {
		this.manid = manid;
		this.manname = manname;
		this.manpw = manpw;
	}

	// Property accessors

	public String getManid() {
		return this.manid;
	}

	public void setManid(String manid) {
		this.manid = manid;
	}

	public String getManname() {
		return this.manname;
	}

	public void setManname(String manname) {
		this.manname = manname;
	}

	public String getManpw() {
		return this.manpw;
	}

	public void setManpw(String manpw) {
		this.manpw = manpw;
	}

}