package controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import model.StudentDAO;

import com.opensymphony.xwork2.ActionSupport;

import beans.*;

public class loginaction extends ActionSupport{
	String selectcom;
	String username;
	String password;
	StudentDAO sd = new StudentDAO();
	Student student = new Student();
	public StudentDAO getSd() {
		return sd;
	}
	public void setSd(StudentDAO sd) {
		this.sd = sd;
	}
	Teacher teacher = new Teacher();
	public String getSelectcom() {
		return selectcom;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setSelectcom(String selectcom) {
		this.selectcom = selectcom;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public Teacher getTeacher() {
		return teacher;
	}
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	public String login(){
		String postion = getSelectcom();
		System.out.println(postion);
		String user = getUsername();
		String pw = getPassword();
		if(postion == "1"){
			Student st = sd.findById(user);
			HttpServletRequest HttpServletRequestrequest;
			if(pw.equals(st.getStupw())){
				student = st;
				System.out.println(st.getStuid()+st.getStuname()+st.getStucollege());
			}
		}
		return SUCCESS;
	}
		
		
	
}
