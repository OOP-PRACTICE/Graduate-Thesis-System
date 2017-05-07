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
public class loginaction extends ActionSupport {
	private int selectcom;
	private String username;
	private String password;
	private Student student;
	private Teacher teacher;
	private Manager manager;
	private HttpServletRequest request;
	private HttpSession session;
	private String pw;
	private Subject subject;
	private List<Subject> subjectList;

	private List<Select> selectList;
	
	List<Select> selectList1 = new ArrayList<Select>();

	List<Select> selectList2 = new ArrayList<Select>();
	
	List<Student> studentList = new ArrayList<Student>();
	private String subid;
	private String teaid;
	private Select select;
	StudentDAO sd = new StudentDAO();
	TeacherDAO td = new TeacherDAO();
	ManagerDAO md = new ManagerDAO();
	SubjectDAO subdao = new SubjectDAO();
	SelectDAO selectdao = new SelectDAO();

	// private String subid;
	private String subname;
	private String subcontent;
	private String teaid1;
	private String starttime;
	private String endtime;
	private String grade;
	private String stuid;

	public String getTeaid() {
		return teaid;
	}

	public void setTeaid(String teaid) {
		this.teaid = teaid;
	}

	public String getSubname() {
		return subname;
	}

	public void setSubname(String subname) {
		this.subname = subname;
	}

	public String getSubcontent() {
		return subcontent;
	}

	public void setSubcontent(String subcontent) {
		this.subcontent = subcontent;
	}

	public String getTeaid1() {
		return teaid1;
	}

	public void setTeaid1(String teaid) {
		this.teaid1 = teaid;
	}

	public String getStarttime() {
		return starttime;
	}

	public String getStuid() {
		return stuid;
	}

	public void setStuid(String stuid) {
		this.stuid = stuid;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public Select getSelect() {
		return select;
	}

	public void setSelect(Select select) {
		this.select = select;
	}

	public String getSubid() {
		return subid;
	}

	public String getgrade() {
		return grade;
	}

	public void setgrade(String grade) {
		this.grade = grade;
	}

	public void setSubid(String subid) {
		this.subid = subid;
	}

	public Subject getSubject() {
		return subject;
	}

	
	public Manager getManager() {
		return manager;
	}

	public void setManager(Manager manager) {
		this.manager = manager;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public List<Select> getselectList() {
		return selectList;
	}

	public void setselectList(List<Select> selectList) {
		this.selectList = selectList;
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

	public String login() {
		int postion = getSelectcom();
		System.out.println(postion);

		String userid = getUsername();
		System.out.println(userid);
		String pw = getPassword();
		System.out.println(pw);
		String returntype = null;
		if (postion == 1) {
			System.out.println("去找学生!!!!");
			student = sd.findById(userid);
			System.out.println(student.getStupw());
			if (pw.equals(student.getStupw()) && (student != null)) {
				ActionContext.getContext().getSession().put("user", student);
				returntype = "stusuccess";
			} else
				returntype = "error";
		 	} 
		else if (postion == 2) {

			teacher = td.findById(userid);
			if (pw.equals(teacher.getTeapw())&& (teacher != null)) {
				ActionContext.getContext().getSession().put("user", teacher);
				returntype = "teasuccess";
				}
		 	}
		else if(postion == 3){
			manager = md.findById(userid);
			System.out.println(manager.getManpw());
			System.out.println(manager.getManname());
			
			if (pw.equals(manager.getManpw())&&(manager!= null)) {
				System.out.println("我到登录界面！！！");
				ActionContext.getContext().getSession().put("user", manager);
				returntype = "mansuccess";
			}
		}else
			returntype = "error";
		return returntype;
	}

	public String baseinfoteacher() {
		teacher = (Teacher) ActionContext.getContext().getSession().get("user");
		System.out.println("base!!!");
		return SUCCESS;
	}

	public String baseinfoman() {
		manager = (Manager) ActionContext.getContext().getSession().get("user");
		System.out.println("base!!!");
		return SUCCESS;
	}
	
	public String baseinfo() {

		student = (Student) ActionContext.getContext().getSession().get("user");
		System.out.println(student.toString());
		System.out.println(student.getStuname());
		// System.out.println(username);
		System.out.println("base!!!");
		return SUCCESS;

	}

	public String modifypassword() {
		student = (Student) ActionContext.getContext().getSession().get("user");
		String newpw = getPw();
		System.out.println(newpw);
		sd.update(student, newpw);
		return SUCCESS;
	}
	
	
	
	
	
	
	
	public String modifypasswordman() {
		manager = (Manager) ActionContext.getContext().getSession().get("user");
		String newpw = getPw();
		System.out.println(newpw);
		md.update(manager, newpw);
		return SUCCESS;
	}
	
	public String modifypasswordtea() {
		teacher = (Teacher) ActionContext.getContext().getSession().get("user");
		String newpw = getPw();
		System.out.println(newpw);
		td.update(teacher, newpw);
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String findall() {
		subjectList = subdao.findAll();
		ServletActionContext.getRequest().setAttribute("subjectList",
				subjectList);
		return SUCCESS;
	}

	public String publish() {
		subid = getSubid();
		subname = getSubname();
		subcontent = getSubcontent();
		teaid1 = getTeaid1();
		teacher = td.findById(teaid1);
		starttime = getStarttime();
		endtime = getEndtime();
		subject = new Subject(subid, teacher, subname, subcontent, starttime,
				endtime);
		subdao.save(subject);
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String selecttea() {
		teacher = (Teacher) ActionContext.getContext().getSession().get("user");
		System.out.println(teacher.getTeaname());
		subjectList = subdao.findByProperty(teacher);
		System.out.println(subjectList.size());	
		for (Subject sub : subjectList) {
			System.out.println(sub.getSubname());
			selectList1 = selectdao.findByPropertysub(sub);
			System.out.println(selectList1.size());
			if (selectList1.size() == 0) {
				continue;
			} else {
				for (Select sel : selectList1) {
					selectList2.add(sel);
				}

			}
		}
		selectList = selectList2;
		ServletActionContext.getRequest().setAttribute("selectList",
				selectList);
		return SUCCESS;
	}
	
	@SuppressWarnings("unchecked")
	public String selectresultman() {
		selectList = selectdao.findAll();
		System.out.println(selectList.size());
		ServletActionContext.getRequest().setAttribute("selectList",
				selectList);
		return SUCCESS;
	}
	
	@SuppressWarnings("unchecked")
	public String modifygrade() {
		selectList = selectdao.findAll();
		System.out.println(selectList.size());
		ServletActionContext.getRequest().setAttribute("selectList",
				selectList);
		return SUCCESS;
	}
	
	
	public String updategrade() {		
		stuid = select.getStudent().getStuid();
		student = sd.findById(stuid);
		select = (Select)selectdao.findByProperty(student).get(0);
		ActionContext.getContext().getSession().put("select", select);
		return SUCCESS;
	}
	
	
	public String updatesuccess() {
		stuid = select.getStudent().getStuid();
		student = sd.findById(stuid);
		grade = select.getGrade();
		select = (Select)selectdao.findByProperty(student).get(0);
		selectdao.update(select, grade);
		return SUCCESS;
	}
	
	
	
	
	
	@SuppressWarnings("unchecked")
	public String selectresultman1() {
		selectList = selectdao.findAll();
		System.out.println(selectList.size());
		ServletActionContext.getRequest().setAttribute("selectList",
				selectList);
		return SUCCESS;
	}
	
	

	
	
	
	
	@SuppressWarnings("unchecked")
	public String select() {
		subid = subject.getSubid();
		subject = subdao.findById(subid);
		student = (Student) ActionContext.getContext().getSession().get("user");
		// Select select1 = new Select();

		subjectList = selectdao.findByProperty(student);

		int num = subjectList.size();
		System.out.println("num的值" + num);
		if (num == 0) {
			System.out.println(student.getStuname());
			select = new Select(student, subject);
			selectdao.save(select);
			ActionContext.getContext().getSession().put("mess", "你已选题成功！");
			System.out.println(subid);
			return "success";
		} else {
			ActionContext.getContext().getSession()
					.put("mess", "你已经选过题目了，重选，请先退选已选题目！");
			return "fail";
		}
	}

	public String selected() {
		student = (Student) ActionContext.getContext().getSession().get("user");
		System.out.println(student.getStuid());
		// Integer stuInteger=Integer.valueOf(student.getStuid());
		select = (Select) selectdao.findByProperty(student).get(0);
		// select=selectdao.findByStuid(student.getStuid());
		subject = select.getSubject();
		System.out.println(subject.getEndtime());
		return SUCCESS;
	}
	
	public String grade() {
		student = (Student) ActionContext.getContext().getSession().get("user");
		System.out.println(student.getStuid());
		// Integer stuInteger=Integer.valueOf(student.getStuid());
		select = (Select) selectdao.findByProperty(student).get(0);
		System.out.println(select.getSelid());
		ServletActionContext.getRequest().setAttribute("select",select);
		return SUCCESS;
	}

	public String unselect() {
		student = (Student) ActionContext.getContext().getSession().get("user");
		select = (Select) selectdao.findByProperty(student).get(0);
		selectdao.delete(select);
		return SUCCESS;
	}

}
