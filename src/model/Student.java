package model;

/**
 * Student entity. @author MyEclipse Persistence Tools
 */

public class Student implements java.io.Serializable {

	// Fields

	private String stuid;
	private String stuname;
	private String stupw;
	private String stucollege;

	// Constructors

	/** default constructor */
	public Student() {
	}

	/** full constructor */
	public Student(String stuid, String stuname, String stupw, String stucollege) {
		this.stuid = stuid;
		this.stuname = stuname;
		this.stupw = stupw;
		this.stucollege = stucollege;
	}

	// Property accessors

	public String getStuid() {
		return this.stuid;
	}

	public void setStuid(String stuid) {
		this.stuid = stuid;
	}

	public String getStuname() {
		return this.stuname;
	}

	public void setStuname(String stuname) {
		this.stuname = stuname;
	}

	public String getStupw() {
		return this.stupw;
	}

	public void setStupw(String stupw) {
		this.stupw = stupw;
	}

	public String getStucollege() {
		return this.stucollege;
	}

	public void setStucollege(String stucollege) {
		this.stucollege = stucollege;
	}

}