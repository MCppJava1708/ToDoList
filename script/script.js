var tasks = [];
var xmlhttp = new XMLHttpRequest();
var taskUl = document.getElementById('taskUl');
var count = 1;

var id;
var name = "Her";
var task = document.getElementById('taskInput');
var statusTask = true;

/////////////////////////////////////////////////////////
//Добавить таск в HTML
/////////////////////////////////////////////////////////

function createTask(task){
  var newLi = document.createElement('li');  
  var text = task.task ;
  var t = document.createTextNode(text);
  newLi.appendChild(t);
  
  if(task.statusTask == 0)
  {
    newLi.classList.add('checked')
  }
  taskUl.appendChild(newLi);

  //Создаем кнопку "close" и добавляем ее в <li>
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" \u00D7");
  span.className = "close";
  span.appendChild(txt);
  newLi.appendChild(span);
}

/////////////////////////////////////////////////////////
//Добавьте символ «checked» (перечеркнуть строку), когда вы нажимаете на 
//элемент списка) и удаление при нажатии на delete
/////////////////////////////////////////////////////////

var list = document.getElementById("taskUl");
list.addEventListener('click', function(ev) 
{
  if (ev.target.tagName === 'LI')  
  {
    //ev.target.classList.toggle('checked');
    var str = ev.target.parentElement.innerText;
    task = str.substring(0,str.indexOf(" "));
    UpdateStatusTaskInDB(task);
  }
  /*else if (ev.target.className === "close")
  {
    var str = ev.target.parentElement.innerText;
    task = str.substring(0,str.indexOf(" "));
    dellFromDbTask(task);
  }*/
});
//target- проверяет каждый элемент списка на котором у нас висит лиснер
/*Каждый HTML элемент содержит свойство classList, которое представляет
из себя объект,с доступнмы для обработки классами.*/
//classList.toggle - преключить класс (добавить, если его нет, или удалить, если он есть)

/////////////////////////////////////////////////////////
// Создайте новый элемент списка, нажав кнопку «Добавить»
/////////////////////////////////////////////////////////

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
      //alert(line)
    }
  }
}

/////////////////////////////////////////////////////////
// Взять statusTask из BD
/////////////////////////////////////////////////////////

function UpdateStatusTaskInDB(task) 
{
  xmlhttp.onreadystatechange = conn;
  xmlhttp.open("GET", "php/getStatusTask.php?&texttask="+"'"+task+"'", true);
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

/////////////////////////////////////////////////////////
// удалить таск из BD
/////////////////////////////////////////////////////////

function dellFromDbTask(task) 
{
  xmlhttp.onreadystatechange = conn;
  xmlhttp.open("GET", "php/dellTask.php?&texttask="+"'"+task+"'", true);
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
      //alert(line)
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

function readDb(login) 
{
  xmlhttp.onreadystatechange = conn;
  xmlhttp.open("GET", "php/readTask.php?name=" + login, true);
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

/////////////////////////////////////////////////////////
// взять имя юзера из ссылки
/////////////////////////////////////////////////////////

OnLoad();
function OnLoad() {
  var login = window.location.href.split("?")[1].split("=")[1];
  readDb(login);
  name = login;
}