var login = document.getElementById('login');

login.onblur = function () {
	alert ('Checking');
};

login.onfocus = function () {
	login.value = "value";
};