<?php
$texttask = $_GET['texttask'];
$host='localhost';
$database='todolistdb';
$user='root';
$password='';

$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));

mysqli_set_charset($link, 'cp1251');
$query ="SELECT statusTask FROM task WHERE task = ".$texttask;
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
	$row = mysqli_fetch_row($result);
	
		echo $row[0] ;
	
	mysqli_free_result($result);
}

mysqli_close($link);
?>