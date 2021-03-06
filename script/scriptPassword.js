var email 		 = document.getElementById('email');
var pass         = document.getElementById('pass');
var pass2        = document.getElementById('pass2');
var key 		 = document.getElementById('key');
var imgEmailOk   = document.getElementById('imgEmailOk');
var imgEmailFail = document.getElementById('imgEmailFail');
var imgPassOK1   = document.getElementById('imgPassOK1');
var imgPassFail1 = document.getElementById('imgPassFail1');
var imgPassOK2   = document.getElementById('imgPassOK2');
var imgPassFail2 = document.getElementById('imgPassFail2');
var imgKeyOK	 = document.getElementById('imgKeyOK');
var imgKeyFail	 = document.getElementById('imgKeyFail');
var btnsend      = document.getElementById('btnsend');
var btnget		 = document.getElementById('btnget');
var sendError	 = document.getElementById('sendError');
var emailError   = document.getElementById('emailError');
var passError    = document.getElementById('passError');
var pass2Error   = document.getElementById('pass2Error');
var keyError	 = document.getElementById('keyError');
var xhr          = new XMLHttpRequest();
var sendFlag	 = false;
var emailOK      = false;
var passOK       = false;
var pass2OK      = false;
var keyOK		 = false;
var emailVal;
var keyVal;

btnsend.onclick = checkBtnSend;
email.onblur    = checkEmail;
btnget.onclick	= checkBtnGet;
pass.onblur		= checkPass;
pass2.onblur	= checkPass2;
key.onblur		= checkKey;

function checkEmail ()
{
	emailVal = email.value;
	if (emailVal == "")
		return;

	if (emailVal.search( /^([a-zA-Z][\w\.-]*)@([\w\.-]+)\.([\w\.]{2,6})$/) == -1)
	{
		emailOK = false;
		emailError.innerHTML = "Email format is incorrect";
		styleCorrection (imgEmailOk, imgEmailFail);
		return;
	}
	var sendStr = "&email=" + emailVal;
	send (sendStr, "php/passwordCheck.php");
}

function checkBtnGet ()
{
	if (emailOK)
	{
		var sendStr = "&email=" + emailVal;
		send (sendStr, "php/password.php");
	}
	else
	{
		sendFlag = true;
		checkEmail ();
	}
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
		passError.innerHTML = "Password 1:" + str;
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
		pass2Error.innerHTML = "Password 2:" + str;
		styleCorrection (imgPassOK2, imgPassFail2);
	}
}

function checkKey ()
{
	keyVal = key.value;
	if (keyVal == "")
		return;

	if (keyVal.search(/\D/) != -1 || keyVal < 1000 || keyVal > 99999999)
	{
		styleCorrection (imgKeyOK, imgKeyFail);
		keyError.innerHTML = "Key is incorrect";
	}
	else
	{
		var sendStr = "&key=" + keyVal + "&email=" + emailVal;
		send (sendStr, "php/passwordCheck.php");
	}
}

function checkBtnSend ()
{
	if (keyOK && passOK && pass2OK)
	{
		var sendStr = "&pass=" + pass.value + "&email=" + emailVal;
		send (sendStr, "php/password.php");
	}
	else if (keyOK && passOK)
	{
		sendFlag = true;
		checkPass2();
	}
	else if (keyOK && pass2OK)
	{
		sendFlag = true;
		checkPass();	
	}
	else if (passOK && pass2OK)
	{
		sendFlag = true;
		checkKey ();
	}
	else
	{
		sendError.innerHTML = "Please check the correction of field filling";
		setTimeout(function(){sendError.innerHTML = ""}, 4000);
	}
}

function passwordCheck (strpass, strpass2) 
{
	if (strpass.length < 6 || strpass.length > 18)
		return "The password length must be in the range from 6 to 18 symbols";

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
		if (res >= 0 && res <= 4)
		{
			switch (res)
			{
			case "0":
				emailOK = true;
				emailError.innerHTML = "";
				styleCorrection (imgEmailFail, imgEmailOk);
				break;
			case "1":
				emailOK = false;
				emailError.innerHTML = "Input email is absent in data base";
				styleCorrection (imgEmailOk, imgEmailFail);
				break;
			case "2":
				keyOK = true;
				keyError.innerHTML = "";
				styleCorrection (imgKeyFail, imgKeyOK);
				break;
			case "3":
				keyOK = false;
				keyError.innerHTML = "Input key is incorrect";
				styleCorrection (imgKeyOK, imgKeyFail);
				break;
			case "4":
				document.getElementById('passChange').innerHTML = "Your password was changed. Please login with a new password";
				setTimeout(function(){document.location.href = "login.html"}, 5000);
				break;
			}
		}
		else if (res >= 1000)
		{
			sendFlag = false;
			emailOK = false;
			styleCorrection (document.getElementById('emailForm'), document.getElementById('keyForm'));
			console.log (res);
		}
		else
		{
			console.log (res);
			alert ("Reqest error");
		}
	}
}

function styleCorrection (hidd, show)
{
	hidd.style.display = 'none';
	hidd.style.visible = false;
	show.style.display = 'inline';
	show.style.visible = true;

	if (emailOK)
	{
		btnget.style.backgroundColor = "rgb(102, 233, 21)";
		btnget.style.color = 'white';
	}
	else if (keyOK && passOK && pass2OK)
	{
		btnsend.style.backgroundColor = "rgb(102, 233, 21)";
		btnsend.style.color = 'white';
	}

	if (sendFlag)
	{
		sendFlag = false;
		if (emailOK)
		{
			var sendStr = "&email=" + emailVal;
			send (sendStr, "php/password.php");
		}
		else if (keyOK && passOK && pass2OK)
		{
			var sendStr = "&pass=" + pass.value + "&email=" + emailVal;
			send (sendStr, "php/password.php");
		}
		else
		{
			sendError.innerHTML = "Please check the correction of field filling";
			setTimeout(function(){sendError.innerHTML = ""}, 4000);
		}
	}
}