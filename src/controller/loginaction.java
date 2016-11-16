package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

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
    private Subject subject;
    private List<Subject> subjectList = new ArrayList<Subject>();
    private String subid;
    private Select select;
    StudentDAO sd = new StudentDAO();
    TeacherDAO td = new TeacherDAO();
    SubjectDAO subdao=new SubjectDAO();
    SelectDAO selectdao=new SelectDAO(); 
    
    
	public Select getSelect() {
		return select;
	}
	public void setSelect(Select select) {
		this.select = select;
	}
	public String getSubid() {
		return subid;
	}
	public void setSubid(String subid) {
		this.subid = subid;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	public List<Subject> getSubjectList() {
		return subjectList;
	}
	public void setSubjectList(List<Subject> subjectList) {
		this.subjectList = subjectList;
	}
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
	
	@SuppressWarnings("unchecked")
	public String findall() {
		subjectList=subdao.findAll();
		ServletActionContext.getRequest().setAttribute("subjectList", subjectList);
		return SUCCESS;
	}
	
	public String select() {
		subid=subject.getSubid();
		subject=subdao.findById(subid);
		student=(Student) ActionContext.getContext().getSession().get("user");
		Select select1=new Select();
		select1=(Select) selectdao.findByProperty(student).get(0);
		if(select1==null)
		{
			System.out.println(student.getStuname());
			select=new Select(student, subject);
			selectdao.save(select);
			ServletActionContext.getRequest().setAttribute("mess","你已选题成功！");	
			System.out.println(subid);
			return "success";
		}else{
			ServletActionContext.getRequest().setAttribute("mess","你已经选过题目了，重选，请先退选已选题目！");	
			 return "fail";
		}
	}
	public String selected() {
		student=(Student) ActionContext.getContext().getSession().get("user");
		System.out.println(student.getStuid());
		//Integer stuInteger=Integer.valueOf(student.getStuid());
		select=(Select) selectdao.findByProperty(student).get(0);
	//	select=selectdao.findByStuid(student.getStuid());
		subject=select.getSubject();
		System.out.println(subject.getEndtime());
		return SUCCESS;
	}
	
	public String unselect() {
		student=(Student) ActionContext.getContext().getSession().get("user");
		select=(Select) selectdao.findByProperty(student).get(0);
		selectdao.delete(select);
		return SUCCESS;
	}


	
	
	
	
}
