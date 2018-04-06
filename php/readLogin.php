<?php
$name = $_POST['name'];
$pass = $_POST['pass'];
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$query='';
$str = "";

$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
if(isset($_POST['name']) && isset($_POST['pass'])){
	if (filter_var($name, FILTER_VALIDATE_EMAIL)) {
		$query ="SELECT * FROM users WHERE email ='".$name."'";
	}else {
		$query ="SELECT * FROM users WHERE name ='".$name."'";
	}
}
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
	$rows = mysqli_num_rows($result);
	for ($i = 0 ; $i < $rows ; ++$i)
    {
    	$row = mysqli_fetch_row($result);
    	for ($j = 0 ; $j < 5 ; ++$j){
    		if ($row[$j] == $name) {
				$str .= 'true' . " ";
			} 
			if ($row[$j] == $pass) {
				$str .= 'true' . " ";
			}
    	}
	}
	echo $str;
	mysqli_free_result($result);
}
mysqli_close($link);
?>