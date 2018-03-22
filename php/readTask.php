<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
$query ="SELECT * FROM task";
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
    $rows = mysqli_num_rows($result);
    for ($i = 0 ; $i < $rows ; ++$i)
    {
    	$row = mysqli_fetch_row($result);
    	for ($j = 0 ; $j < 4 ; ++$j){
    		echo "$row[$j] ";
    	}
    }
    mysqli_free_result($result);
}
mysqli_close($link);
?>