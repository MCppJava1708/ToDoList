var tasks = [];
var xmlhttp = new XMLHttpRequest();
var taskUl = document.getElementById('taskUl');
var taskTextInput = document.getElementById('taskInput');

var id;
var name = "H";
var taskText;
var statusTask = 1;



/////////////////////////////////////////////////////////
// Создайте новый элемент списка, нажав кнопку «Добавить»
/////////////////////////////////////////////////////////

document.getElementById("addBton").onclick = function newElement() 
{
  xmlhttp.onreadystatechange = conn;
  str = "'"+ name + "','"+ taskTextInput.value + "'," + 1;
  console.log(str);
  xmlhttp.open("GET", "php/createTask.php?&str="+str, true);
  xmlhttp.send();

  taskTextInput.value="";
  

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
      readDb(name);
    }
  }
}

/////////////////////////////////////////////////////////
// Обновить statusTask из BD
/////////////////////////////////////////////////////////

//Добавьте символ «checked» (перечеркнуть строку), когда вы нажимаете на 
//элемент списка) и удаление при нажатии на delete

var list = document.getElementById("taskUl");
list.addEventListener('click', function(ev) 
{
  if (ev.target.tagName === 'LI')  
  {
    //ev.target.classList.toggle('checked');
    var str = ev.target.innerText;
    taskText = str.substring(0,str.indexOf(" "));
    UpdateStatusTaskInDB(taskText);
    
  }
  else if (ev.target.className === "close")
  {
    var str = ev.target.parentElement.innerText;
    taskText = str.substring(0,str.indexOf(" "));
    dellFromDbTask(taskText);
    
  }
});
//target- проверяет каждый элемент списка на котором у нас висит лиснер
/*Каждый HTML элемент содержит свойство classList, которое представляет
из себя объект,с доступнмы для обработки классами.*/
//classList.toggle - преключить класс (добавить, если его нет, или удалить, если он есть)



function UpdateStatusTaskInDB(taskText) 
{
  alert(GetStatusTaskInDB(taskText));
 //GetStatusTaskInDB(taskText)
 if(statusTask == 0)
 {
  statusTask = 1;
}
else
{
  statusTask = 0;
}

xmlhttp.onreadystatechange = conn;
xmlhttp.open("GET", "php/UpdateStatusTask.php?texttask=" + "'" +taskText+ "'" + "&statusTask=" + statusTask, true);
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
    readDb(name);
  }
}
}

function GetStatusTaskInDB(taskText) 
{
  xmlhttp.open("GET", "php/getStatusTask.php?&texttask="+"'"+taskText+"'", true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = conn;

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
      alert("statusTask was: "+line)
      return statusTask = line;
    }
  }
}

/////////////////////////////////////////////////////////
// удалить таск из BD
/////////////////////////////////////////////////////////

function dellFromDbTask(taskText) 
{
  xmlhttp.open("GET", "php/dellTask.php?&texttask="+"'"+taskText+"'", true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = conn;

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
      readDb(name);
    }
  }
}

///////////////////////////////////////////
/////////// Object Task ///////////////////
///////////////////////////////////////////

function Task (id, name, taskText, statusTask) {
  this.id = id;
  this.name = name;
  this.taskText = taskText;
  this.statusTask = statusTask;
}

///////////////////////////////////////////
///////////  Read Task из бд /////////////
///////////////////////////////////////////

function readDb(login) 
{
  document.getElementById('taskUl').innerHTML = '';

  xmlhttp.open("GET", "php/readTask.php?name=" + login, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = conn;
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
        taskText = arrLine[i];
        count++;
        break;
        case 3:
        statusTask = arrLine[i];
        var task = new Task(id, name, taskText, statusTask);
        tasks.push(task);
        createTask(task);
        console.log(task);
        count = 0;
        break;
      }
    }
  }
}

//Добавить таск в HTML

function createTask(task){
  var newLi = document.createElement('li');  
  var taskText = task.taskText ;
  var t = document.createTextNode(taskText);
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
// взять имя юзера из ссылки
/////////////////////////////////////////////////////////

OnLoad();
function OnLoad() {
  var login = window.location.href.split("?")[1].split("=")[1];
  readDb(login);
  name = login;
}