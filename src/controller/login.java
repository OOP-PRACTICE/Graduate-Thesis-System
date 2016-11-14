package controller;

import beans.*;
import model.*;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class login extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1607012821917211667L;

	/**
	 * Constructor of the object.
	 */
	public login() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		System.out.println("lihaine");
		String uName = request.getParameter("username");
		String passwd = request.getParameter("password");
		String position = request.getParameter("select");
		StudentDAO sd = new StudentDAO();
		TeacherDAO td = new TeacherDAO();
		Student stu = sd.findById(uName);
		Teacher tea = td.findById(uName);
		if(position == "1"){
			if(stu!=null&&passwd==stu.getStupw())
				response.sendRedirect("index.html");
			else
				response.sendRedirect("error.html");
			System.out.println("登录成功！");
			return;
		}
		else if(position == "2"){
			if(tea!=null&&passwd==tea.getTeapw())
				response.sendRedirect("index.html");
			else
				response.sendRedirect("error.html");
			System.out.println("登录成功！");
			return;
		}
		
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
