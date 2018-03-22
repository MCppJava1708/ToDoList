<?php
$str = $_GET['str'];
$host='localhost';
$database='todolistdb';
$user='root';
$password='';

$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));

mysqli_set_charset($link, 'cp1251');

$query ="INSERT INTO task(name, task, statuStask) VALUES (".$str.")";
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if ($result) echo "Add in datBase.";
mysqli_close($link);
?>