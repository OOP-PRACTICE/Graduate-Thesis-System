<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
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
display:
}
</style>
</head>

<body>
<table width="99%" height="25" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
  <tr>
    <td width="17" background="Images/bj4.gif"><img src="Picture/r.gif" width="16" height="16" /></td>
    <td width="466" background="Images/bj4.gif"></td>
    <td width="162" align="center" background="Images/bj4.gif"></td>
  </tr>
</table>
<table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="1%" align="left" background="Images/b2.jpg"><img src="Picture/b1.jpg" width="10" height="26" /></td>
    <td width="68%" background="Images/b2.jpg"><table width="124" border="0" align="left" cellpadding="0" cellspacing="0">
        <tr>
          <td width="20" align="left"><img src="Picture/tz.gif" width="10" height="16" /></td>
          <td width="104" align="left" class="biao">选题信息</td>
        </tr>
      </table></td>
    <td width="31%" align="right" background="Images/b2.jpg"><img src="Picture/b3.jpg" width="9" height="26" /></td>
  </tr>
</table>
<form id="form1" name="form1" method="post" action="?action=save">
  <table width="99%" border="0" align="center" cellpadding="3" cellspacing="1" bgcolor="#AEDEF4">
    <tr>
      <td width="21%" height="25" align="right" bgcolor="#D6F2FD">论文题目&nbsp;</td>
      <td width="79%" bgcolor="#FFFFFF"><fieldset>
          <s:property value='select.subject.subname'/>
        </fieldset></td>
    </tr>
    <tr>
      <td height="25" align="right" bgcolor="#EFFBFE">指导老师&nbsp;</td>
      <td bgcolor="#FFFFFF"><fieldset>
          <s:property value='select.subject.teacher.teaname'/>
        </fieldset></td>
    </tr>
    
    
     <tr>
      <td height="25" align="right" bgcolor="#EFFBFE">成绩&nbsp;</td>
      <td bgcolor="#FFFFFF"><fieldset>
          <s:property value='select.grade'/>
        </fieldset></td>
    </tr>
    
    <tr>
      <td colspan="2" align="center" bgcolor="#FFFFFF"><label> </label></td>
    </tr>
  </table>
</form>
</body>
</html>
