var login      = document.getElementById('login');
var email      = document.getElementById('email');
var pass       = document.getElementById('pass');
var pass2      = document.getElementById('pass2');
var imgOK1     = document.getElementById('imgOK1');
var imgCancel1 = document.getElementById('imgCancel1');
var imgOK2     = document.getElementById('imgOK2');
var imgCancel2 = document.getElementById('imgCancel2');
var pass2Error = document.getElementById('pass2Error');
var xhr = new XMLHttpRequest();

login.onblur = function () 
{
	xhr.onreadystatechange = receive;
	var send = "&login=" + login.value;
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
	{
		imgCancel1.style.display = 'none';
		imgCancel1.style.visible = false;
		imgOK1.style.display     = 'inline';
		imgOK1.style.visible     = true;
	}
	else
	{
		imgOK1.style.display     = 'none';
		imgOK1.style.visible     = false;
		imgCancel1.style.display = 'inline';
		imgCancel1.style.visible = true;
	}
};

pass2.onblur = function () {
	strpass  = pass.value;
	strpass2 = pass2.value;
	str = passwordCheck (strpass2, strpass);
	if (str == true)
	{
		imgCancel2.style.display = 'none';
		imgCancel2.style.visible = false;
		imgOK2.style.display     = 'inline';
		imgOK2.style.visible     = true;
	}
	else
	{
		imgOK2.style.display     = 'none';
		imgOK2.style.visible     = false;
		imgCancel2.style.display = 'inline';
		imgCancel2.style.visible = true;
	}
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
		var res = xhr.responseText;
		alert (res);
		if (res == 0) 
		{
			imgCancel1.style.display = 'none';
			imgCancel1.style.visible = false;
			imgOK1.style.display     = 'inline';
			imgOK1.style.visible     = true;
		} 
		else if (res == 1)
		{
			imgOK1.style.display     = 'none';
			imgOK1.style.visible     = false;
			imgCancel1.style.display = 'inline';
			imgCancel1.style.visible = true;
		}
		else
			alert ("Reqest error");
	}
}