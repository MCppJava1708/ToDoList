var login      = document.getElementById('login');
var email      = document.getElementById('email');
var pass       = document.getElementById('pass');
var pass2      = document.getElementById('pass2');
var imgOK1     = document.getElementById('imgOK1');
var imgCancel1 = document.getElementById('imgCancel1');
var imgOK2     = document.getElementById('imgOK2');
var imgCancel2 = document.getElementById('imgCancel2');

pass.onblur = function () {
	strpass  = pass.value;
	strpass2 = pass2.value;
	str = passwordCheck (strpass, strpass2);
	if (str == "OK")
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
		imgCancel1.setAttribute('data-tooltip', str);
	}
};

pass2.onblur = function () {
	strpass  = pass.value;
	strpass2 = pass2.value;
	str = passwordCheck (strpass2, strpass);
	if (str == "OK")
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
		imgCancel2.setAttribute('data-tooltip', str);
	}
};

function passwordCheck (strpass, strpass2) {
	if (strpass.length < 8)
	{
		alert ('The length of password must be at least 8 symbols');
		return "The length of password must be at least 8 symbols";
	}
	if (strpass.search(/\d/) == -1)
	{
		alert ("The password must include at least one number");
		return "The password must include at least one number";
	}
	if (strpass.search(/[a-zA-Z]/) == -1)
	{
		alert ("The password must include at least one latin letter");
		return "The password must include at least one latin letter";
	}
	if (strpass2 != "")
	{
		if (strpass2 != strpass)
		{
			alert ("Password 1 must equals to password 2");
			return "Password 1 must equals to password 2";
		}
		else
		{
			return "OK";
		}
	}
	else
		return "OK";
};