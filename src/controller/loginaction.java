package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.*;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class loginaction extends ActionSupport{
	private int selectcom;
	private String username;
	private String password;
	private Student student;
	private Teacher teacher;
    private HttpServletRequest request;
    private HttpSession session;
    private String pw;
    StudentDAO sd = new StudentDAO();
    TeacherDAO td = new TeacherDAO();
    
	
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public Teacher getTeacher() {
		return teacher;
	}
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	
	public int getSelectcom() {
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
	public void setSelectcom(int selectcom) {
		this.selectcom = selectcom;
	}
	

	public String login(){
		int postion = getSelectcom();
		System.out.println(postion);
		String userid = getUsername();
		System.out.println(userid);
		String pw = getPassword();
		System.out.println(pw);
		String returntype = null;
		if(postion == 1){
			System.out.println("去找学生!!!!");
			student= sd.findById(userid);
			System.out.println(student.getStupw());
			if(pw.equals(student.getStupw())&&(student!=null)){
				ActionContext.getContext().getSession().put("user", student);
				returntype =  "stusuccess";
			}
			else
				returntype = "error";
		}
		else if(postion == 2){
			
			 teacher = td.findById(userid);
			if(pw.equals(teacher.getTeapw())){
				ActionContext.getContext().getSession().put("user", teacher);
				returntype = "teasuccess";
			}
			else
				returntype = "error";
		}
		return returntype;
	}
		
	
	public String baseInfo() {
		
        student=(Student) ActionContext.getContext().getSession().get("user");
        System.out.println(student.toString());
        
        System.out.println(student.getStuname());
		//System.out.println(username);
		System.out.println("base!!!");
		return SUCCESS;
		
	}	
	public String modifypassword() {
		 student=(Student) ActionContext.getContext().getSession().get("user");
		 String newpw=getPw();
		 System.out.println(newpw);
		 sd.update(student, newpw);
		return SUCCESS;
		
		
	}
	
}
