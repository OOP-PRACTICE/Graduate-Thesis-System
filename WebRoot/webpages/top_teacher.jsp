<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>安全退出</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
ul, li {
	list-style: none;
}
.topnav, .topnav a, .topnav a:hover {
	color: #FFFFFF;
	font-size: 12px;
	text-decoration: none;
}
.topnav ul {
	list-style: none;
	padding: 0px;
	margin: 0px;
}
.topnav ul li {
	list-style: none;
	float: left;
	width: 80px;
	height: 25px;
	text-align: center;
	line-height: 25px;
}
.topnav ul li a:hover {
	background-color: #59ACFF;
	border: 1px solid #18518F;
	display: block;
	width: 80px;
	height: 23px;
}
.d1_headg {
	background-image: url(/images/dao.gif);
}
.d2_headg {
	background-image: url(/images/dao.gif);
	background-position: 0px 25px;
	background-color: #99CC33
}
.d3_headg {
	background-image: url(/images/dao.gif);
}
.d4_headg {
	background-image: url(/images/dao.gif);
}
-->
</style>
<script>
	function headtop(id,type){
	}
</script>
</head>

<body>
<table width="100%" height="67" border="0" cellpadding="0" cellspacing="0">
  <tbody>
    <tr>
      <td width="32%" background="Images/bj5.gif"><img src="Images//tb.jpg" width="320" height="67"></td>
      <td width="68%" background="Images/bj5.gif"><style>
	.dao_right{ width:381px; margin-top:46px; overflow:hidden; background-image:url(images/dao.gif)}
	.dao_right li { float:left; width:86px;}
	.dao_right li a#dao_a1{ height:25px; width:86px; display:block;}
	.dao_right li a#dao_a1:hover{ height:25px; width:86px;}
	.dao_right li a#dao_a2{ height:25px; width:86px; display:block;}
	.dao_right li a#dao_a2:hover{ height:25px; width:86px; }
	.dao_right li a#dao_a3{ height:25px; width:86px; display:block;}
	.dao_right li a#dao_a3:hover{ height:25px; width:86px; }
	.dao_right li a#dao_a4{ height:25px; width:86px; display:block;}
	.dao_right li a#dao_a4:hover{ height:25px; width:86px; }
	.dao_nav a{ text-decoration:none;}
	.dao_nav ul{ padding:0px; margin:0px; list-style:none;}
	.dao_nav ul li { width:78px; float:left; text-align:center; list-style:none;}
	.dao_nav ul li a.dao_nav_a{ width:72px; height:17px; display:block; padding-top:8px;}
	.dao_nav ul li a.dao_nav_a:hover{ width:72px; background-image:url(/images/db.jpg); color:#FFFFFF}
	.dao_nav ul .fen{ width:5px; padding-top:5px; float:left;   overflow:hidden; margin-right:5px;}
	
	</style>
        <div id="dao_right_bg" style="float:right;background-image:url(/images/san.jpg); height:69px; width:371px; margin-left:140px; overflow:hidden;">
          <ul class="dao_right" id="dao_right_id">
             <li><a href="login.html" target="_parent" id="dao_a1" onfocus="this.blur()"> </a></li>
            <li><a href="mypw.html" target="main" id="dao_a2" onfocus="this.blur()" > </a></li>
            <li><a href="login.html" target="_parent" onclick="return confirm('ç¡®å®éåºå?')" id="dao_a3" onfocus="this.blur()" > </a></li>
            <li><a href="helplist.html" target="main" id="dao_a4" onfocus="this.blur()"> </a></li>
          
           </ul>
        </div></td>
    </tr>
  </tbody>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#5293D5">
  <tbody>
    <tr>
      <td width="2%" height="30">&nbsp;</td>
      <td width="98%"><div class="topnav">
          
        <ul>
          
                       您好！
    <s:property value="#session.user.stuid"></s:property>
    
     
          </ul></div></td>
    </tr>
  </tbody>
</table>
<script>
	function chanage(id,tt){
		window.top.frames['leftFrame'].location.href="left_apply"+id+".html";
		window.top.frames['main'].location.href=""+tt+"";
	}
</script>
</body>
</html>