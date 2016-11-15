<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<link href="Css/cb.css" rel="stylesheet" type="text/css" />
<link href="Css/n.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE1 {
	color: #ffffff;
	font-size: 12px;
}
.STYLE4 {
	color: #8da8c3;
	font-size: 12px;
}
.STYLE6 {
	font-size: 12px;
	color: #5593ce;
}
-->
</style>
<link  href="Css/layout.css" rel="stylesheet" type="text/css" />
<script>
function f(){
	f=document.form1;
	if(f.username.value==""){
		alert("请填写用户名");
		return false;
	}
	if(f.password.value==""){
		alert("请填写密码");
		return false;
	}
	if(f.selectcom.headerKey=="0"){
		alert("请选择用户类型");
		return false;
	}
}
</script>
</head>

<body>
<table width="100%" height="594" border="0" align="center" cellpadding="0" cellspacing="0"  style="margin:0px; padding:0px">
  <tr>
    <td height="594"  align="center" valign="top" background="Images/bj.gif">
	<table width="465" height="414" border="0" align="center" cellpadding="0" cellspacing="0" >
      <tr>
        <td  height="152" colspan="3" valign="bottom"><img src="../webpages/Picture/toplogin.jpg" width="460" height="152" /></td>
      </tr>
      <tr>
        <td width="15" height="262" background="Images/bj1.gif">&nbsp;</td>
        <td width="420" valign="middle" background="Images/bj2.gif">
		<form id="form1" name="form1" method="post" onsubmit="return f();" action="login.action" >
		<table width="100%" height="170" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td width="31%" align="right"><span class="STYLE1">用户名：</span></td>
              <td colspan="3" align="left"><label>
                <input name="username" type="text" id="username" />
              </label></td>
            </tr>
            <tr>
              <td align="right"><span class="STYLE1">密码：</span></td>
              <td colspan="3" align="left"><label>
                <input name="password" type="password" id="password" />
              </label></td>
            </tr>
            <tr>
              <td align="right"><span class="STYLE1">身份：</span></td>
              <td colspan="3" align="left">
                <label>
                <%
					HashMap map =new LinkedHashMap();
					map.put(1,"学生");
					map.put(2,"指导教师");
					map.put(3,"管理员");
					request.setAttribute("map",map);
					request.setAttribute("aa","0");
 				%>
				<s:select list="#request.map"  name="selectcom" listKey="key" listValue="value" value="#request.aa"  headerKey="0" headerValue="请选择..">
				</s:select>
                </label> 
               </td>
            </tr>
         
            <tr>
              <td>&nbsp;</td>
              <td width="34%" height="55" align="left"> 
			  <input type="submit" value="登录" />			  </td>
            </tr>
        </table>
		 </form>		</td>
        <td width="13" background="Images/bj3.gif">&nbsp;</td>
      </tr>
    </table>
	<table width="465" height="76" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td height="76">&nbsp;</td>
      </tr>
    </table>
	<br />
	<table width="100%" height="64" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td height="64" align="center" valign="middle"><span class="STYLE6">版权所有：西北农林科技大学 <br />
              <br />
          陕西省咸阳市杨凌区 西北农林科技大学信息工程学院 邮编:712100</span></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
