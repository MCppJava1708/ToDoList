var doc = document;
var userNameOrEmail = "";
var password = "";

doc.getElementById("btnSignIn").onclick = function () {
	alert(userNameOrEmail + " " + password);
}

doc.getElementById('inputPassword').oninput = function () {
	password = this.value;
}

doc.getElementById('inputLogin').oninput = function () {
	userNameOrEmail = this.value;
}