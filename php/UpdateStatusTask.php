<?php
$texttask = $_GET['texttask'];
$statusTask = $_GET['statusTask'];
$host='localhost';
$database='todolistdb';
$user='root';
$password='';

$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));

mysqli_set_charset($link, 'cp1251');
$query ="UPDATE task SET statusTask= ".$statusTask." WHERE task = ".$texttask;
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if ($result) echo "statusTask update into".$statusTask;

mysqli_close($link);
?>