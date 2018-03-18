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
for (i = 0; i < close.length; i++) 
{
  close[i].onclick = function() 
  {
    var div = this.parentElement;
    div.style.display = "none";//заменить на удаление из БД
  }
}

// Добавьте символ «checked», когда вы нажимаете на элемент списка.
//var list = document.querySelector('ul');
var list = getElementsByClassName('task-ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');//заменить и/или добавить замену статуса в БД
  }
}, false);

// Создайте новый элемент списка, нажав кнопку «Добавить»
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("taskInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("task-ul").appendChild(li);
  }
  document.getElementById("taskInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("  удалить");
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