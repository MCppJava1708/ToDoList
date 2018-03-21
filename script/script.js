var tasks = [];
var xmlhttp = new XMLHttpRequest();
var taskUl = document.getElementById('taskUl');
var count = 1;

var id;
var name = "Nikita";
var task = document.getElementById('taskInput');
var statusTask = true;

function createTask(task){
  var newLi = document.createElement('li');  
  newLi.innerHTML = task.task ;
  taskUl.appendChild(newLi);

  //Создаем кнопку "close" и добавляем ее в <li>
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("  удалить");
  span.className = "close";
  span.appendChild(txt);
  newLi.appendChild(span);
}

// Удаление записи
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) 
{
  close[i].onclick = function() 
  {
    createTask(tasks[0]);
    /*console.log(name);
    var div = this.parentElement;
    task = div.textContent;
    console.log(task);
    div.style.display = "none";//отключение изображения div заменить на удаление из БД
  */
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
document.getElementById("addBton").onclick = function newElement() 
{

  xmlhttp.onreadystatechange = conn;
  str = "'"+ name + "','"+ task.value + "'," + statusTask;
  console.log(str);
  xmlhttp.open("GET", "php/createTask.php?&str="+str, true);
  xmlhttp.send();


  function conn() 

  { 

    if (xmlhttp.readyState != 4) return;

    if (xmlhttp.status != 200) 
    {
      alert(xhr.status + ': ' + xhr.statusText);
    } 
    else 
    {
      var line = xmlhttp.responseText;
      alert(line)
    }
  }
}

///////////////////////////////////////////
/////////// Object Task ///////////////////
///////////////////////////////////////////

function Task (id, name, task, statusTask) {
  this.id = id;
  this.name = name;
  this.task = task;
  this.statusTask = statusTask;
}

///////////////////////////////////////////
/////////// Server Read Task /////////////
///////////////////////////////////////////

readDb();

function readDb() 
{
  xmlhttp.onreadystatechange = conn;
  xmlhttp.open("GET", "php/readTask.php", true);
  xmlhttp.send();
}

function conn() 
{
  var line;
  if (xmlhttp.readyState != 4) return;

  if (xmlhttp.status != 200) {
    console.log(xmlhttp.status + ': ' + xmlhttp.statusText);
  } else {

    line = xmlhttp.responseText;

    var arrLine=[];
    arrLine = line.split(" ");
    var count = 0;
       
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
        var task = new Task(id, name, task, statusTask);
        tasks.push(task);
        createTask(task);
        console.log(task);
        count = 0;
        break;
      }
    }
  }
}

///////////////////////////////////////////
/////////// Server Read Task /////////////
///////////////////////////////////////////