var pass         = document.getElementById('pass');
var pass2        = document.getElementById('pass2');
var imgPassOK1   = document.getElementById('imgPassOK1');
var imgPassFail1 = document.getElementById('imgPassFail1');
var imgPassOK2   = document.getElementById('imgPassOK2');
var imgPassFail2 = document.getElementById('imgPassFail2');
var pass2Error   = document.getElementById('pass2Error');
var xhr = new XMLHttpRequest();

login.onblur = function () 
{
	var login = document.getElementById('login');
	if (login.value == "")
		return;

	xhr.onreadystatechange = receive;
	var send = "&login=" + login.value;
	xhr.onreadystatechange = receive;
	xhr.open ('POST', "php/registerCheck.php", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(send);	
}

email.onblur = function ()
{
	var email = document.getElementById('email');
	if (email.value == "")
		return;

	xhr.onreadystatechange = receive;
	var send = "&email=" + email.value;
	xhr.onreadystatechange = receive;
	xhr.open ('POST', "php/registerCheck.php", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(send);	
}

pass.onblur = function () 
{
	strpass  = pass.value;
	strpass2 = pass2.value;
	str = passwordCheck (strpass, strpass2);
	if (str == true)
		styleCorrection (imgPassFail1, imgPassOK1);	
	else
		styleCorrection (imgPassOK1, imgPassFail1);
};

pass2.onblur = function () {
	strpass  = pass.value;
	strpass2 = pass2.value;
	str = passwordCheck (strpass2, strpass);
	if (str == true)
		styleCorrection (imgPassFail2, imgPassOK2);
	else
		styleCorrection (imgPassOK2, imgPassFail2);
};

function passwordCheck (strpass, strpass2) {
	if (strpass.length < 8)
		return false;
	
	if (strpass.search(/\d/) == -1)
		return false;
	
	if (strpass.search(/[a-zA-Z]/) == -1)
		return false;
	
	if (strpass2 != "" && strpass2 != strpass)
		return false;
				
	return true;
};

function receive () 
{
	if (xhr.readyState != 4) return;
				
	if (xhr.status != 200) 
	{
		alert ('Connection error');
	} 
	else 
	{
		var imgLoginOk   = document.getElementById('imgLoginOk');
		var imgLoginFail = document.getElementById('imgLoginFail');
		var imgEmailOk   = document.getElementById('imgEmailOk');
		var imgEmailFail = document.getElementById('imgEmailFail');
		var res = xhr.responseText;
		alert (res);
		if (res == 0) 
			styleCorrection (imgLoginFail, imgLoginOk);
		else if (res == 1)
			styleCorrection (imgLoginOk, imgLoginFail);
		else if (res == 2)
			styleCorrection (imgEmailFail, imgEmailOk);
		else if (res == 3)
			styleCorrection (imgEmailOk, imgEmailFail);
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
}