package model;

/**
 * Select entity. @author MyEclipse Persistence Tools
 */

public class Select implements java.io.Serializable {

	// Fields

	private Integer selid;
	private Student student;
	private Subject subject;
	private String grade;

	// Constructors

	/** default constructor */
	public Select() {
	}

	/** minimal constructor */
	public Select(Student student, Subject subject) {
		this.student = student;
		this.subject = subject;
	}

	/** full constructor */
	public Select(Student student, Subject subject, String grade) {
		this.student = student;
		this.subject = subject;
		this.grade = grade;
	}

	// Property accessors

	public Integer getSelid() {
		return this.selid;
	}

	public void setSelid(Integer selid) {
		this.selid = selid;
	}

	public Student getStudent() {
		return this.student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Subject getSubject() {
		return this.subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

}