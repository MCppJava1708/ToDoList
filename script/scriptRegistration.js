var login 		 = document.getElementById('login');
var email 		 = document.getElementById('email');
var pass         = document.getElementById('pass');
var pass2        = document.getElementById('pass2');
var imgLoginOk   = document.getElementById('imgLoginOk');
var imgLoginFail = document.getElementById('imgLoginFail');
var imgEmailOk   = document.getElementById('imgEmailOk');
var imgEmailFail = document.getElementById('imgEmailFail');
var imgPassOK1   = document.getElementById('imgPassOK1');
var imgPassFail1 = document.getElementById('imgPassFail1');
var imgPassOK2   = document.getElementById('imgPassOK2');
var imgPassFail2 = document.getElementById('imgPassFail2');
var pass2Error   = document.getElementById('pass2Error');
var btnsend      = document.getElementById('btnsend');
var sendError	 = document.getElementById('sendError');
var loginError   = document.getElementById('loginError');
var emailError   = document.getElementById('emailError');
var passError    = document.getElementById('passError');
var pass2Error   = document.getElementById('pass2Error');
var xhr          = new XMLHttpRequest();
var sendFlag	 = false;
var nameOK       = false;
var emailOK      = false;
var passOK       = false;
var pass2OK      = false;

btnsend.onclick = checkBtn;
login.onblur    = checkLogin;
email.onblur    = checkEmail;
pass.onblur		= checkPass;
pass2.onblur	= checkPass2;

function checkLogin ()
{
	var val = login.value;
	if (val == "")
		return;

	if (val.search(/\W/) != -1)
	{
		nameOK = false;
		loginError.innerHTML = "Incorrect symbol in login";
		styleCorrection (imgLoginOk, imgLoginFail);
		return;
	}
	var sendStr = "&login=" + val;
	send (sendStr, "php/registerCheck.php");
}

function checkEmail ()
{
	var val = email.value;
	if (val == "")
		return;

	if (val.search( /^([a-zA-Z][\w\.-]*)@([\w\.-]+)\.([\w\.]{2,6})$/) == -1)
	{
		emailOK = false;
		emailError.innerHTML = "Email format is incorrect";
		styleCorrection (imgEmailOk, imgEmailFail);
		return;
	}
	var sendStr = "&email=" + email.value;
	send (sendStr, "php/registerCheck.php");
}

function checkPass () 
{
	strpass  = pass.value;
	if (strpass == "")
		return;
	
	strpass2 = pass2.value;
	str      = passwordCheck (strpass, strpass2);
	if (str == "OK")
	{
		passOK = true;
		if (strpass2 == strpass)
		{
			pass2OK = true;
			pass2Error.innerHTML = "";
			styleCorrection (imgPassFail2, imgPassOK2);	
		}

		passError.innerHTML = "";
		styleCorrection (imgPassFail1, imgPassOK1);	
	}
	else
	{
		passOK = false;
		passError.innerHTML = str;
		styleCorrection (imgPassOK1, imgPassFail1);
	}
}

function checkPass2 () 
{
	strpass2 = pass2.value;
	if (strpass2 == "")
		return;

	strpass  = pass.value;
	str = passwordCheck (strpass2, strpass);
	if (str == "OK")
	{
		pass2OK = true;
		if (strpass2 == strpass)
		{
			passOK = true;
			passError.innerHTML = "";
			styleCorrection (imgPassFail1, imgPassOK1);	
		}

		pass2Error.innerHTML = "";
		styleCorrection (imgPassFail2, imgPassOK2);
	}
	else
	{
		pass2OK = false;
		pass2Error.innerHTML = str;
		styleCorrection (imgPassOK2, imgPassFail2);
	}
}

function sendLogin ()
{
	var sendStr = "login=" + login.value + "&email=" + email.value + "&pass=" + pass.value;
	send (sendStr, "php/register.php");
}

function passwordCheck (strpass, strpass2) 
{
	if (strpass.length < 8)
		return "The password must be at least 8 symbols";

	if (strpass.search(/\W/) != -1)
		return "Uncorrect symbol in password";

	if (strpass.search(/\d/) == -1)
		return "Password must include at least 1 number";
	
	if (strpass.search(/[a-zA-Z]/) == -1)
		return "Password must include at least 1 latin letter";
	
	if (strpass2 != "" && strpass2 != strpass)
		return "Password 1 must equals to password 2";
				
	return "OK";
}

function checkBtn ()
{
	if (nameOK && emailOK && passOK && pass2OK)
		sendLogin ();

	sendFlag = true;
	if (nameOK && emailOK && passOK)
		checkPass2();
	else if (nameOK && emailOK && pass2OK)
		checkPass();
	else if (nameOK && passOK && pass2OK)
		checkEmail();
	else if (emailOK && passOK && pass2OK)
		checkLogin();
	else
	{
		sendFlag = false;
		sendError.innerHTML = "Please check that correction of field filling";
		setTimeout(function(){sendError.innerHTML = ""}, 4000);
	}
}

function send (sendStr, host)
{
	xhr.onreadystatechange = receive;
	xhr.open ('POST', host, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(sendStr);
}

function receive () 
{
	if (xhr.readyState != 4) return;
				
	if (xhr.status != 200) 
	{
		alert ('Connection error');
	} 
	else 
	{
		var res = xhr.responseText;
		if (res >= 0 && res <= 3)
		{
			switch (res)
			{
			case "0":
				nameOK = true;
				loginError.innerHTML = "";
				styleCorrection (imgLoginFail, imgLoginOk);
				break;
			case "1":
				nameOK = false;
				loginError.innerHTML = "Selected login is alredy used. Please select other login.";
				styleCorrection (imgLoginOk, imgLoginFail);
				break;
			case "2":
				emailOK = true;
				emailError.innerHTML = "";
				styleCorrection (imgEmailFail, imgEmailOk);
				break;
			case "3":
				emailOK = false;
				emailError.innerHTML = "Selected email is alredy used. Please select other email.";
				styleCorrection (imgEmailOk, imgEmailFail);
				break;

				if (sendFlag)
				{
					if (nameOK && emailOK && passOK && pass2OK)
						sendLogin ();
					else
					{
						sendError.innerHTML = "Please check that correction of field filling";
						sendFlag = false;
						setTimeout(function(){sendError.innerHTML = ""}, 4000);
					}
				}
			}
		}
		else if (res == 4)
			document.location.href = "index.html?login=" + login.value;
		else
			alert ("Reqest error");
	}
}

function styleCorrection (hidd, show)
{
	hidd.style.display = 'none';
	hidd.style.visible = false;
	show.style.display = 'inline';
	show.style.visible = true;

	if (nameOK && emailOK && passOK && pass2OK)
	{
		btnsend.style.backgroundColor = "rgb(102, 233, 21)";
		btnsend.style.color = 'white';
	}
}