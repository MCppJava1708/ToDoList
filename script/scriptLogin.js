var doc = document;
var divError = doc.getElementById('divAuth');
var xmlhttp = new XMLHttpRequest();
var userNameOrEmail = "";
var password = "";
var count = 1;
var node;
var lgn;

///////////////////////////////////////////
/////////// Object Login //////////////////
///////////////////////////////////////////

function Login (userNameOrEmail, password) {
	this.userNameOrEmail = userNameOrEmail;
	this.password = password;
}

Login.prototype.cheackUser = function(users) {
	if (users.login === this.userNameOrEmail &&
		users.password === this.password) {
		doc.location.href = "index.html?login=" + users.login;
} else if (users.email === this.userNameOrEmail &&
	users.password === this.password) {
	doc.location.href = "index.html?login="+ users.login;
}
else {
	shapeError();
}
}

Login.prototype.loginRex = function(){
	 if (this.userNameOrEmail.search(/^[a-zA-Z0-9_-]{3,16}$/) !=-1 &&
	 	this.password.search(/^[a-z0-9_-]{6,18}$/) !=-1) {
	 		readPHPCon(lgn.userNameOrEmail);
	 } else if (this.userNameOrEmail.search( /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/) !=-1 &&
	 	this.password.search(/^[a-z0-9_-]{6,18}$/) !=-1) {
	 	
	 }
	  else {
	 		count = 0;
	 		shapeError();
	 }
}

///////////////////////////////////////////
/////////// Object User ///////////////////
///////////////////////////////////////////

function User (id, login, email, password) {
	this.id = id;
	this.login = login;
	this.email = email;
	this.password = password;
}

///////////////////////////////////////////
/////////// Error Shape ///////////////////
///////////////////////////////////////////

function shapeError () {
	node = doc.createElement('div');
	node.className = "divErr";
	node.innerHTML = "Incorrect username or password.";
	node.position = 'absolute';
	node.tabIndex = ++count;
	node.style.color = '#FFFFFFFF';
	node.style.borderRadius = 10 + 'px';
	node.style.backgroundColor =  '#FF6570FF';
	divError.appendChild(node);
}

///////////////////////////////////////////
/////////// Server Read Users /////////////
///////////////////////////////////////////

function readPHPCon(login) {
	xmlhttp.onreadystatechange = conn;
	xmlhttp.open("GET", "php/readLogin.php?name=" + login, true);
	xmlhttp.send();
}

function conn() {
	var line;
	if (xmlhttp.readyState != 4) return;

	if (xmlhttp.status != 200) {
		console.log(xmlhttp.status + ': ' + xmlhttp.statusText);
	} else {
		line = xmlhttp.responseText;
		console.log(line);
		if (line === "") {
			lgn.cheackUser(line);
		} else {
			var arrLine=[];
			arrLine = line.split(" ");
			var count = 0;
			var id;
			var login;
			var email;
			var pass;
			for (var i = 0; i < arrLine.length; i++) {
				switch (count) {
					case 0:
					id = arrLine[i];
					count++;
					break;
					case 1:
					login = arrLine[i];
					count++;
					break;
					case 2:
					email = arrLine[i];
					count++;
					break;
					case 3:
					pass = arrLine[i];
					var user = new User(id, login, email, pass);
					lgn.cheackUser(user);
					count = 0;
					break;
				}
			}
		}
	}
}

///////////////////////////////////////////
/////////// VIEW //////////////////////////
///////////////////////////////////////////

doc.getElementById("btnSignIn").onclick = function () {
	lgn = new Login(userNameOrEmail, password);
	lgn.loginRex();
	if (count > 1) {
		divError.removeChild(node);
	} 
}

doc.getElementById('inputPassword').oninput = function () {
	password = this.value;
}

doc.getElementById('inputLogin').oninput = function () {
	userNameOrEmail = this.value;
}
