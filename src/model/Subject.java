package model;

/**
 * Subject entity. @author MyEclipse Persistence Tools
 */

public class Subject implements java.io.Serializable {

	// Fields

	private String subid;
	private Teacher teacher;
	private String subname;
	private String subcontent;
	private String starttime;
	private String endtime;

	// Constructors

	/** default constructor */
	public Subject() {
	}

	/** minimal constructor */
	public Subject(String subid) {
		this.subid = subid;
	}

	/** full constructor */
	public Subject(String subid, Teacher teacher, String subname,
			String subcontent, String starttime, String endtime) {
		this.subid = subid;
		this.teacher = teacher;
		this.subname = subname;
		this.subcontent = subcontent;
		this.starttime = starttime;
		this.endtime = endtime;
	}

	// Property accessors

	public String getSubid() {
		return this.subid;
	}

	public void setSubid(String subid) {
		this.subid = subid;
	}

	public Teacher getTeacher() {
		return this.teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
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

	public String getStarttime() {
		return this.starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return this.endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

}