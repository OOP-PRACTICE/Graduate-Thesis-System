<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<!-- saved from url=(0054)http://jwgl.nwsuaf.edu.cn/academic/showPersonalInfo.do -->
<HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><META content="IE=7.0000" 
http-equiv="X-UA-Compatible">
<TITLE>我的信息</TITLE>
<META content="text/html; charset=utf-8" http-equiv=Content-Type>
<META content=no-cache http-equiv=pragma>
<META content=no-cache http-equiv=cache-control>
<META content=0 http-equiv=expires><!-- Mimic Internet Explorer 7 -->
<META content=IE=7 http-equiv=X-UA-Compatible><!-- IE7 mode --><LINK 
rel=stylesheet type=text/css href="showPersonalInfo_files/text.css"><LINK 
rel=stylesheet type=text/css href="showPersonalInfo_files/main.css">
<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/jquery.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/function.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/common.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/selectDate.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/selectTime.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/default/js/page.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/selectDateTime.js"></SCRIPT>

<SCRIPT language=javascript type=text/javascript 
src="/academic/styles/js/j_common.js"></SCRIPT>
<!--[if lt IE 7]>

      <script src="/academic/styles/js/jquery.bgiframe.min.js" type="text/javascript"></script>
      <![endif]-->
<META name=GENERATOR content="MSHTML 11.00.10570.1001"></HEAD>
<BODY>
<CENTER><LINK rel=stylesheet type=text/css 
href="showPersonalInfo_files/text.css"><LINK rel=stylesheet type=text/css 
href="showPersonalInfo_files/main.css">
<DIV class=title><SPAN class=left><EM>我的信息</EM></SPAN> <SPAN 
class=right>&nbsp;</SPAN> </DIV>
<s:form>
<TABLE class=form cellSpacing=0 cellPadding=0>
  <TBODY>
  
  <TR>
    <TH width="15%">学工号</TH>
    <TD> <s:property value="teacher.teaid"></s:property>&nbsp;</TD>
    <TH width="15%">真实姓名</TH>
  <TD> <s:property value="teacher.teaname"></s:property>&nbsp;</TD>
    <TD rowSpan=4><IMG src="showPersonalInfo_files/loadphoto_added.jpg" 
      height=108></TD></TR>
  <TR>
    <TH width="15%">所在院系</TH>
  <TD> <s:property value="teacher.teacollege"></s:property>&nbsp;</TD>
    <TH width="15%">专业</TH>
    <TD>计算机科学与技术&nbsp;</TD></TR>
  <TR>
    <TH>方向</TH>
    <TD>&nbsp;</TD>
    <TH>学生类别</TH>
    <TD>本科(本科)4年&nbsp;</TD></TR>
  <TR>
    <TH width="15%">年级</TH>
    <TD>2014级&nbsp;</TD>
    <TH width="15%">班级</TH>
    <TD>计算机141&nbsp;</TD></TR>
  <TR>
    <TH width="15%">证件类型</TH>
    <TD>中华人民共和国居民身份证&nbsp;</TD>
    <TH width="15%">证件号码</TH>
    <TD colSpan=2>412728199506241850&nbsp;</TD></TR>
  <TR>
    <TH width="15%">电子邮箱</TH>
    <TD>chaoyanglius@outlook.com&nbsp;</TD>
    <TH width="15%">联系电话</TH>
    <TD colSpan=2>&nbsp;</TD></TR>
  <TR>
    <TH width="15%">通讯地址</TH>
    <TD>&nbsp;</TD>
    <TH width="15%">邮政编码</TH>
    <TD colSpan=2>&nbsp;</TD></TR></TBODY></TABLE><BR>
</s:form>
</BODY></HTML>

