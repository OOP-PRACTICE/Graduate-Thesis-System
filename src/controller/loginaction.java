package controller;

import model.*;

import com.opensymphony.xwork2.ActionSupport;

import beans.*;

@SuppressWarnings("serial")
public class loginaction extends ActionSupport{
	private int selectcom;
	private String username;
	private String password;
	TeacherDAO td = new TeacherDAO();
	StudentDAO sd = new StudentDAO();
	private Student student;
	
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	Teacher teacher = new Teacher();
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
				
		String returntype = null;
		if(postion == 1){
			System.out.println("fasdfasdf");
			
			student= sd.findById(userid);
			
			System.out.println(student.getStupw());
			
			if(pw.equals(student.getStupw())){
				returntype =  "stusuccess";
			}
			else
				returntype = "error";
		}
		else if(postion == 2){
			Teacher te = td.findById(userid);
			if(pw.equals(te.getTeapw())){
				returntype = "teasuccess";
			}
			else
				returntype = "error";
		}
		return returntype;
	}
		
	
	public String baseInfo() {
		
		
		return SUCCESS;
		
	}	
	
}
