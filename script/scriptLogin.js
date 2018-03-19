var doc = document;
var divError = doc.getElementById('divAuth');
var xmlhttp = new XMLHttpRequest();
var userNameOrEmail = "";
var password = "";
var users = [];
var count = 1;
var node;

///////////////////////////////////////////
/////////// Object Login //////////////////
///////////////////////////////////////////

function Login (userNameOrEmail, password) {
	this.userNameOrEmail = userNameOrEmail;
	this.password = password;
}

Login.prototype.cheackUser = function(){
	for (var i = 0; i < users.length; i++) {
		if (users[i].login === this.userNameOrEmail &&
			users[i].password === this.password) {
		doc.location.href = "index.html";
		} else if (users[i].email === this.userNameOrEmail &&
			users[i].password === this.password) {
			doc.location.href = "index.html";
		}
		 else {
			shapeError ();
		}
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
	node = document.createElement('div');
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

readPHPCon();

function readPHPCon() {
	xmlhttp.onreadystatechange = conn;
	xmlhttp.open("GET", "php/readLogin.php", true);
	xmlhttp.send();
}

function conn() {
	var line;
	if (xmlhttp.readyState != 4) return;

	if (xmlhttp.status != 200) {
		console.log(xmlhttp.status + ': ' + xmlhttp.statusText);
	} else {
		line = xmlhttp.responseText;
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
				users.push(user);
				count = 0;
				break;
			}
		}
	}
}

///////////////////////////////////////////
/////////// VIEW //////////////////////////
///////////////////////////////////////////

doc.getElementById("btnSignIn").onclick = function () {
	var login = new Login(userNameOrEmail, password);
	login.cheackUser();
	if (count > 2) {
		divError.removeChild(node);
	} 
}

doc.getElementById('inputPassword').oninput = function () {
	password = this.value;
}

doc.getElementById('inputLogin').oninput = function () {
	userNameOrEmail = this.value;
}