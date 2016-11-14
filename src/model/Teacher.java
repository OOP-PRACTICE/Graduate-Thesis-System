package model;

/**
 * Teacher entity. @author MyEclipse Persistence Tools
 */

public class Teacher implements java.io.Serializable {

	// Fields

	private String teaid;
	private String teaname;
	private String teapw;
	private String teacollege;

	// Constructors

	/** default constructor */
	public Teacher() {
	}

	/** full constructor */
	public Teacher(String teaid, String teaname, String teapw, String teacollege) {
		this.teaid = teaid;
		this.teaname = teaname;
		this.teapw = teapw;
		this.teacollege = teacollege;
	}

	// Property accessors

	public String getTeaid() {
		return this.teaid;
	}

	public void setTeaid(String teaid) {
		this.teaid = teaid;
	}

	public String getTeaname() {
		return this.teaname;
	}

	public void setTeaname(String teaname) {
		this.teaname = teaname;
	}

	public String getTeapw() {
		return this.teapw;
	}

	public void setTeapw(String teapw) {
		this.teapw = teapw;
	}

	public String getTeacollege() {
		return this.teacollege;
	}

	public void setTeacollege(String teacollege) {
		this.teacollege = teacollege;
	}

}