var tasks = [];
var xmlhttp = new XMLHttpRequest();

readDB();
function readDB(){
  for(i = 0; i < tasks.length; i++)
  {
    var newLi = document.createElement('li');
    newLi.innerHTML = tasks[i].task;
    taskUl.appendChild(newLi);
  }
}

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
    div.style.display = "none";//отключение изображения div заменить на удаление из БД
  }
}

// Добавьте символ «checked», когда вы нажимаете на элемент списка(ставим слушатель).
var list = document.getElementById("taskUl");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI')  
  {
    ev.target.classList.toggle('checked');// добавить замену статуса в БД
  }
});
//target- проверяет каждый элемент списка на котором у нас висит лиснер
/*Каждый HTML элемент содержит свойство classList, которое представляет
из себя объект,с доступнмы для обработки классами.*/
//classList.toggle - преключить класс (добавить, если его нет, или удалить, если он есть)


// Создайте новый элемент списка, нажав кнопку «Добавить»
document.getElementById("addBton").onclick = function newElement() {

  var li = document.createElement('li');
  var inputValue = document.getElementById("taskInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("taskUl").appendChild(li);
  }
  document.getElementById("taskInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("  удалить");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) 
  {
    close[i].onclick = function() 
    {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

///////////////////////////////////////////
/////////// Object Task ///////////////////
///////////////////////////////////////////

function Task (task, statusTask) {
  this.task = task;
  this.statusTask = statusTask;
}

///////////////////////////////////////////
/////////// Server Read Task /////////////
///////////////////////////////////////////

readPHPCon();

function readPHPCon() {
  xmlhttp.onreadystatechange = conn;
  xmlhttp.open("GET", "php/readTask.php", true);
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
    var name;
    var task;
    var statusTask;
    for (var i = 0; i < arrLine.length; i++) {
      switch (count) {
        case 0:
        id = arrLine[i];
        count++;
        break;
        case 1:
        name = arrLine[i];
        count++;
        break;
        case 2:
        task = arrLine[i];
        count++;
        break;
        case 3:
        statusTask = arrLine[i];
        var task = new Task(task, statusTask);
        tasks.push(task);
        count = 0;
        break;
      }
    }
  }
}