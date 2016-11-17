<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link  href="Css/layout.css" rel="stylesheet" type="text/css" />
<link href="Css/cb.css" rel="stylesheet" type="text/css"   />
<link  href="Css/n.css" rel="stylesheet" type="text/css" />
<style>
.biankuangs {
	border: solid #A6D2FF 1px;
	border-top: 0px;
}
#xueke, #item_text2, #item_text1, #itemtypes2, #item_text3 { /**/
	display: none;
}
</style>
<script>
function change_itemtypes(name){
	document.getElementById("itemtypes2").value="";
	document.getElementById("xueke").value="";
	if(name==2){
	    document.getElementById("itemtypes2").style.display="block";
		document.getElementById("item_text1").style.display="block";
		//document.getElementById("xueke").style.display="block";
	}else{
		document.getElementById("itemtypes2").style.display="none"; 
		document.getElementById("xueke").style.display="none"; 
		document.getElementById("item_text1").style.display="none"; 
		document.getElementById("item_text2").style.display="none"; 
	}
	
}

function change_itemtypes2(name){
 	document.getElementById("types2").value="";
	document.getElementById("types3").value="";
	if(name=='1'){
       document.getElementById("item_text2").style.display="block"; 
	   
	   document.getElementById("item_text3").style.display="none"; 
	   
	}else if(name=='3'){
 
		document.getElementById("item_text2").style.display="none";
		document.getElementById("item_text3").style.display="block"; 	
	}else{
 
		document.getElementById("item_text2").style.display="none";
		document.getElementById("item_text3").style.display="none"; 
	}
}
</script>
</head>

<body>
<table width="99%" height="25" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
  <tr>
    <td width="17" background="Images/bj4.gif"><img src="Picture/r.gif" width="16" height="16" /></td>
    <td width="466" background="Images/bj4.gif"></td>
    <td width="162" align="center" background="Images/bj4.gif"></td>
  </tr>
</table>
<table width="50%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="5"></td>
  </tr>
</table>
<table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="1%" align="left" background="Images/b2.jpg"><img src="Picture/b1.jpg" width="10" height="26" /></td>
    <td width="68%" background="Images/b2.jpg"><table width="124" border="0" align="left" cellpadding="0" cellspacing="0">
        <tr>
          <td width="20" align="left"><img src="Picture/tz.gif" width="10" height="16" /></td>
          <td width="104" align="left" class="biao">选题结果</td>
        </tr>
      </table></td>
    <td width="31%" align="right" background="Images/b2.jpg"><img src="Picture/b3.jpg" width="9" height="26" /></td>
  </tr>
</table>
<table width="99%" border="0" align="center" cellpadding="3" cellspacing="1" bgcolor="#AEDEF4" style="border:1px solid #AEDEF4">
 
  <tr>
    <td width="5%" height="25" align="center" bgcolor="#EFFBFE">题目编号</td>
    <td align="center" bgcolor="#EFFBFE">题目名称</td>
    <td align="center" bgcolor="#EFFBFE">学生学号</td>
    <td align="center" bgcolor="#EFFBFE">学生姓名</td>
  </tr>
  
  	<s:iterator value="#request.selectList" var="select">
				<tr>
					<td height="25" align="center" bgcolor="#FFF9DF">
					<s:property value='#select.subject.subid' />
					</td>
					<td height="25" align="center" bgcolor="#FFF9DF">
					<s:property value='#select.subject.subname' />
					</td>
					<td height="25" align="center" bgcolor="#FFF9DF">
					<s:property value='#select.student.stuid' />
					</td>
					<td height="25" align="center" bgcolor="#FFF9DF">
					<s:property value='#select.student.stuname' />
					</td>
				</tr>
</s:iterator>
</table>
</body>
</html>
