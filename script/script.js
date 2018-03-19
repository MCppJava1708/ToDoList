// Создаем кнопку "close" и добавляем ее в <li>
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("  удалить");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Удаление записи
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
<<<<<<< HEAD
    div.style.display = "none";//отключение изображения div заменить на удаление из БД
  }
}

// Добавьте символ «checked», когда вы нажимаете на элемент списка(ставим слушатель).
var list = document.getElementById("taskUl");
=======
    div.style.display = "none";
  }
}

// Добавьте символ «checked», когда вы нажимаете на элемент списка.
var list = document.querySelector('ul');
>>>>>>> parent of 62f4883... 2132/19/03/2018
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Создайте новый элемент списка, нажав кнопку «Добавить»
<<<<<<< HEAD
document.getElementById("addBton").onclick = function newElement() {

  var li = document.createElement('li');
  var inputValue = document.getElementById("taskInput").value;
=======
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
>>>>>>> parent of 62f4883... 2132/19/03/2018
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}