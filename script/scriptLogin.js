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

Login.prototype.cheackUser = function(name, pass) {
	if (name === 'true' && pass === 'true') {
		doc.location.href = "index.html?login=" + this.userNameOrEmail;
	} else {
		shapeError();
	}
}

Login.prototype.loginRex = function(){
	if (this.userNameOrEmail.search(/^[a-zA-Z0-9_-]{3,16}$/) !=-1 &&
		this.password.search(/^[a-z0-9_-]{6,18}$/) !=-1) {
		readPHPCon(lgn.userNameOrEmail, lgn.password);
} else if (this.userNameOrEmail.search( /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/) !=-1 &&
	this.password.search(/^[a-z0-9_-]{6,18}$/) !=-1) {
	readPHPCon(lgn.userNameOrEmail, lgn.password);
} else {
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
	node.style.height = 50 + 'px';
	node.innerHTML = "Incorrect username or password.";
	node.style.color = '#000000FF';
	node.style.borderRadius = 10 + 'px';
	node.style.backgroundColor =  '#FF003DFF';
	divError.appendChild(node);
	count++;
}

///////////////////////////////////////////
/////////// Server Read Users //////////////
///////////////////////////////////////////

function readPHPCon(login, pass) {
	xmlhttp.onreadystatechange = conn;
	console.log(login, pass);
	xmlhttp.open("GET", "php/readLogin.php?name=" + login + "&pass=" + pass, true);
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
		deCrypt(line);
	}
}

function deCrypt (encrypted) {
	var key = 'd4b494e4502a62edd695a903a94c2701';
	var iv = '02f30dffbb0d084755f438f7d8be4a7d';
	var decrypted = mcrypt.Decrypt(atob(encrypted), iv, key, 'rijndael-256', 'cbc');
	console.log(decrypted);
	var arrLine=[];
	arrLine = decrypted.split(" ");
	var count = 0;
	var name;
	var pass;
	for (var i = 0; i < arrLine.length; i++) {
		console.log(arrLine[i]);
		switch (count) {
			case 0:
			name = arrLine[i];
			count++;
			break;
			case 1:
			pass = arrLine[i];
			lgn.cheackUser(name, pass);
			count = 0;
			break;
		}
	}
}

///////////////////////////////////////////
/////////// VIEW //////////////////////////
///////////////////////////////////////////

doc.getElementById("btnSignIn").onclick = function () {
	lgn = new Login(userNameOrEmail, password);
	if (count > 1) {
		divError.removeChild(node);
	} 
	lgn.loginRex();
}

doc.getElementById('inputPassword').oninput = function () {
	password = this.value;
}

doc.getElementById('inputLogin').oninput = function () {
	userNameOrEmail = this.value;
}
