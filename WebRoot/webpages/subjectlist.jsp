<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="Css/layout.css" rel="stylesheet" type="text/css" />
<link href="Css/cb.css" rel="stylesheet" type="text/css" />
<link href="Css/n.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" language="javascript"
	src="Scripts/common.js"></script>
<script src="Scripts/date.js"></script>
<style type="text/css">
<!--
.STYLE1 {
	color: #FF0000;
	font-weight: bold;
}
-->
</style>
	<script language="javascript">
	function deleteConfirm() {
		var message =${sessionScope.mess};
		var k=window.confirm('message');
		//alert(k);
		return k;
	}
	</script>
</head>

<body>
	<table width="99%" height="25" border="0" align="center"
		cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
		<tr>
			<td width="17" background="Images/bj4.gif"><img
				src="Picture/r.gif" width="16" height="16" /></td>
			<td width="466" background="Images/bj4.gif"></td>
			<td width="162" align="center" background="Images/bj4.gif"></td>
		</tr>
	</table>
	
	
	
	<form id="form1" name="form1" method="post" >
		<table width="99%" border="0" align="center" cellpadding="3"
			cellspacing="1" bgcolor="#AEDEF4">
			<tr>
				<td height="25" colspan="18" align="center" bgcolor="#D6F2FD"><input
					name="itemid" type="hidden" id="itemid" value="" /> 所有题目</td>
			</tr>
			<tr>
				<td height="25" align="center" bgcolor="#FFF9DF">题目编号</td>

				<td height="25" align="center" bgcolor="#FFF9DF">指导老师</td>
				<td align="center" bgcolor="#FFF9DF">论文题目</td>
				<td align="center" bgcolor="#FFF9DF">简介要求</td>
				<td align="center" bgcolor="#FFF9DF">开始时间</td>
				<td align="center" bgcolor="#FFF9DF">结束时间</td>
				<td align="center" bgcolor="#FFF9DF">操作</td>
			</tr>
			<!-- 下面这条是示例，实现时需要按照下面的格式从数据库获取 -->
			<s:iterator value="#request.subjectList" var="subject">
				<tr>
					<td height="25" align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.subid' /></td>
					<td height="25" align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.teacher.teaname' /></td>
					<td align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.subname' /></td>
					<td align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.subcontent' /></td>
					<td align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.starttime' /></td>
					<td align="center" bgcolor="#FFF9DF"><s:property
							value='#subject.endtime' /></td>
					<td align="center" bgcolor="#FFF9DF"><a href="select.action?subject.subid=${subject.subid }"
					 onClick="return deleteConfirm()">选择</a></td>
				
				</tr>
			</s:iterator>
		</table>
	</form>
	<script>
		
	</script>
</body>
</html>
