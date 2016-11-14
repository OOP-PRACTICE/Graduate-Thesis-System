function checkBoxSelected(inputName){
	var boxes = document.getElementsByName(inputName);
	if(boxes){
		for(var i = 0; i < boxes.length; i++){
			if(boxes[i].checked){
				return true;
			}
		}
	}
	return false;
}

function checkBoxSelectedNum(inputName){
	var boxes = document.getElementsByName(inputName);
	var num = 0;
	var boxvalue ;
	if(boxes){
		for(var i = 0; i < boxes.length; i++){
			if(boxes[i].checked){
				num++;
				if (num>1) {
					return false;
				}else{
					boxvalue = boxes[i].value;
				}
			}
		}
	}
	if (num==1){
		return boxvalue;
	}else{
		return false;
	}
}

/*function checkAll(inputName, isChecked){
	var boxes = document.getElementsByName(inputName);
	if(boxes){
		for(var i = 0; i < boxes.length; i++){
			if(boxes[i].disabled){
				continue;
			}
			boxes[i].checked = isChecked ? true : false;
		}
	}
}*/
function CheckAll(form){
	for (var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		e.checked == true ? e.checked = false : e.checked = true;
	}
}
function getChnLen(param1)
{
	l =0;
	for (var i=0;i<param1.length;i++)
	{
		if (param1.charCodeAt(i)<128)
			l=l+1;
		else
			l=l+2;
	}
	return l;
}
function havespace(str)                                         
{                                         
	i=0; 
	while ( i<str.length )
	{ 
	 if (str.charAt(i)==" "){
 		return true;                                         
	  }
	  i++;                                         
    }                                        
      return false; 
                                           
}  
function Jtrim(str)
{

        var i = 0;
        var len = str.length;
        if ( str == "" ) return( str );
        j = len -1;
        flagbegin = true;
        flagend = true;
        while ( flagbegin == true && i< len)
        {
           if ( str.charAt(i) == " " )
                {
                  i=i+1;
                  flagbegin=true;
                }
                else
                {
                        flagbegin=false;
                }
        }

        while  (flagend== true && j>=0)
        {
            if (str.charAt(j)==" ")
                {
                        j=j-1;
                        flagend=true;
                }
                else
                {
                        flagend=false;
                }
        }

        if ( i > j ) return ("")

        trimstr = str.substring(i,j+1);
        return trimstr;
}

function isWhiteSpace(c)
{
	return (c == ' ');
}

function isDigit(c)
{
	return ((c >= '0') && (c <= '9'));
}

function trim(str)
{
  if(str == null)
  {
    return str;
  }

  var strLen = str.length;
  if(strLen ==  0)
  {
    return str;
  }

  var startIndex = -1;
  var endIndex;
  var newStr;

  for(var i = 0; i < strLen; i++) 
  {
    if(!isWhiteSpace(str.charAt(i))) 
    {
      startIndex = i;
      break;
    }
  }

  if(startIndex == -1)
  {
    return "";
  }

  for(var i = strLen - 1; i >= startIndex; i--) 
  {
    if(!isWhiteSpace(str.charAt(i))) 
    {
      endIndex = i;
      break;
    }
  }

  newStr = str.substring(startIndex, endIndex + 1);

  return newStr;
}

function isEmpty(str)
{
  if(str == null)
  {
    return true;
  }

  var strLen = str.length;
  if(strLen == 0)
  {
    return true;
  }

  for(var i = 0; i < strLen; i++) 
  {
    if(!isWhiteSpace(str.charAt(i)))
    {
      return false;
    }
  }

  return true;
}

function isInteger(str,length)
{
	if(str.length<=0||str.length>length){
		return false;
	}
	for (var i=0; i<str.length; i++)
	{
		if(!isDigit(str.charAt(i))){
			return false;
		}
	}
	return true;
}


function isPositiveInteger(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  if(newStr.charAt(0) == '+') 
  {
    for(startIndex = 1; startIndex < strLen; startIndex++)
    {
      if(!isWhiteSpace(newStr.charAt(startIndex)))
      {
        break;
      }
    }

    if(startIndex >= strLen)
    {
      return false;
    }
  }

  for(var i = startIndex; i < strLen; i++) 
  {
    if (! isDigit(newStr.charAt(i)))
    {
      return false;
    }
  }

  return true;
}

function isEmail(str)
{
	if(isEmpty(str))
	{
		return false;
	}
	var strlen=str.length;
	var counterAt=0;
	var posAt=-1;
	var counterDot=0;
	var posDot=-1;
	var posLastDot=-1;
	if(strlen<=6){
		return false;
	}
	for(var i = 0 ; i < strlen ; i++){
		if(str.charAt(i)=='@'){
			counterAt+=1;
			if(counterAt==1){
				posAt=i;
			}
		}
		if(str.charAt(i)=='.'){
			counterDot+=1;
			if(counterDot==1){
				posDot=i;
			}
			posLastDot=i;
		}
	}
	if(counterAt==1&&counterDot>=1&&posAt<posLastDot&&posAt>=2&&posLastDot<strlen-2){
		return true;
	}
	return false;

}

function isDate(str)
{
	if(isEmpty(str))
	{
		return false;
	}
	var dateArray;
	dateArray=str.split("-");
	if(dateArray==str){
//		dateArray=str.split(".");
//		if(dateArray==str){
//			dateArray=str.split("/");
//			if(dateArray==str){
				return false;
//			}
//		}
	}
	if(dateArray.length!=3){
		return false;
	}
	if(!isNumber(dateArray[0])||!isNumber(dateArray[1])||!isNumber(dateArray[2])){
		return false;
	}
	if(dateArray[0].indexOf('.')>=0||dateArray[1].indexOf('.')>=0||dateArray[2].indexOf('.')>=0){
		return false;
	}
	if(parseInt(dateArray[0],10)<=2099&&parseInt(dateArray[0],10)>=1900&&parseInt(dateArray[1],10)>=1&&parseInt(dateArray[1],10)<=12&&parseInt(dateArray[2],10)>=1&&parseInt(dateArray[2],10)<=31)
	{
		if(parseInt(dateArray[0],10)%100==0&&parseInt(dateArray[0],10)%400!=0){
			if(parseInt(dateArray[1],10)==2){
				if(parseInt(dateArray[2],10)>28){
					return false;
				}
			}
		} else {
			if(parseInt(dateArray[0],10)%4==0){
				if(parseInt(dateArray[1],10)==2){
					if(parseInt(dateArray[2],10)>29){
						return false;
					}
				}
			}
		}
		var mon=parseInt(dateArray[1],10);
		if(mon==4||mon==6||mon==9||mon==11){
			if(parseInt(dateArray[2],10)>30){
				return false;
			}
		}
		if(parseInt(dateArray[0],10)%4!=0&&mon==2){
			if(parseInt(dateArray[2],10)>28){
				return false;
			}
		}

		return true;
	}
	return false;
}

function isTime(str) //Len
{
	if (isEmpty(str))
	{
		return false;
	}
	var timeArray;
	timeArray=str.split(":");
	if(timeArray.length!=3) return false;
    if(timeArray[0].indexOf('.')>=0||timeArray[1].indexOf('.')>=0||timeArray[2].indexOf('.')>=0) return false;
    if(timeArray[0].indexOf('-')>=0||timeArray[1].indexOf('-')>=0||timeArray[2].indexOf('-')>=0) return false;
    if(timeArray[0].indexOf('+')>=0||timeArray[1].indexOf('+')>=0||timeArray[2].indexOf('+')>=0) return false;
	if(!isNumber(timeArray[0])||!isNumber(timeArray[1])||!isNumber(timeArray[2])) return false;
	if(parseInt(timeArray[0])>24||parseInt(timeArray[1])>60||parseInt(timeArray[2])>60) return false;
	if(timeArray[0].length>2||timeArray[1].length>2||timeArray[2].length>2) return false;

	return true;
}

function isNumber(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  var dot=0;
  for(startIndex=0;startIndex<strLen;startIndex++) {
	  if(!isDigit(newStr.charAt(startIndex))){
		  if(startIndex==0){
			  if(newStr.charAt(startIndex)!='-'){
				  if(startIndex==0&&(newStr.charAt(startIndex)!='.')){
					  return false;
				  } else {
					  dot+=1;
				  }
			  } else {
				  if(strLen<=1){
					  return false;
				  }
			  }
		  } else {
			  if(dot==0&&(newStr.charAt(startIndex)=='.')){
				  dot+=1;
			  } else {
				  return false;
			  }
		  }
	  }
  }
  return true;
}

function isChar(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  var dot=0;
  var characters = "";
  for(startIndex=0;startIndex<strLen;startIndex++) {
	  characters = newStr.charAt(startIndex);
	  if(!("a"<=characters && characters <= "z") || ("A"<=characters && characters <= "Z"))
	  {
		 return false;
	  }
  }
  return true;
}

function checkLength(string,length)
{
	var strlen=string.length;
	if(strlen==0){
		return true;
	}
	if(strlen){
		if(strlen<=length){
			return true;
		}
	}
	return false;
}

function checkLength2(string,length)
{
	var strlen=string.length;
	if(strlen==0){
		return true;
	}
	if(strlen){
		if(strlen==length){
			return true;
		}
	}
	return false;
}

function isRadioChecked(frm, rdo)
{
	for (var i = 0; i < frm.elements.length; i++)
	{
		if (frm.elements[i].type == 'radio' && frm.elements[i].name == rdo && frm.elements[i].checked)
			return true;
	}
	return false;
}

function isCheckboxChecked(frm, cb)
{
	for (var i = 0; i < frm.elements.length; i++)
	{
		if (frm.elements[i].type == 'checkbox' && frm.elements[i].name == cb && frm.elements[i].checked)
			return true;
	}
	return false;
}

function isComboSelected(cmb, defaultval)
{
	if (typeof(cmb) == 'undefined' || cmb.value == defaultval)
		return false;
	else
		return true;
}

function hyFileReview(url)
{
	var nwin;
	if (isEmpty(url))
		alert('您没有选择文件');
	else
	{
		nwin = window.open(url, 'FileReview', 'width=600,height=400,top=50,left=100,resizable=yes,scrollbars=yes');
		nwin.focus();
	}
}


function isDateAOldB(date_a,date_b)
{
	if (isDate(date_a) && isDate(date_b))
	{
		arr_a = date_a.split("-");
		arr_b = date_b.split("-");
		//创建的da,db都比实际的大一个月,既: 字符串"2002-9-19" 实际创建Date对象是2002-10-19
		da=new Date(arr_a[0],arr_a[1],arr_a[2]);
		db=new Date(arr_b[0],arr_b[1],arr_b[2]);
		return (da>db);
	}
	else
		return false;
}

//判断时间是否在当前时间之前
function isCurrentDate(str)
{
	if (!isDate(str))
		return false;

	var d_now = new Date();
	str_now = d_now.getYear() + "-"+(d_now.getMonth()+1)+"-"+d_now.getDate();
	if (isDateAOldB(str,str_now))
		return false;
	else
		return true;
}


//判断两个时间是否正确:1.为日期格式 2.开始时间小于结束时间
function isCorrect2Date(str1,str2)
{
	if (!isDate(str1))
	{
		alert("起始时间不正确");	
		return false;
	}
	if (!isDate(str2))
	{
		alert("结束时间不正确");	
		return false;
	}
	if (!isCurrentDate(str1))
	{
		alert("起始时间不能超过当前时间");
		return false;
	}

	if (!isCurrentDate(str2))
	{
		alert("结束时间不能超过当前时间");
		return false;
	}
	
	if (isDateAOldB(str1,str2))
	{
		alert("起始时间不能超过结束时间");
		return false;
	}
	else
		return true;
}

function replaceCnNum(num_char){
	num_char=num_char.replace("０","0");
	num_char=num_char.replace("１","1");
	num_char=num_char.replace("２","2");
	num_char=num_char.replace("３","3");
	num_char=num_char.replace("４","4");
	num_char=num_char.replace("５","5");
	num_char=num_char.replace("６","6");
	num_char=num_char.replace("７","7");
	num_char=num_char.replace("８","8");
	num_char=num_char.replace("９","9");
	return num_char;
}

