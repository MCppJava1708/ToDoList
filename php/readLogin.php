<?php
$name = $_GET['name'];
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$query='';
$key = 'd4b494e4502a62edd695a903a94c2701';
$iv = '02f30dffbb0d084755f438f7d8be4a7d';
$str = "";

$link = mysqli_connect($host, $user, $password, $database) 
or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
if (filter_var($name, FILTER_VALIDATE_EMAIL)) {
	$query ="SELECT * FROM users WHERE email ='".$name."'";
}else {
	$query ="SELECT * FROM users WHERE name ='".$name."'";
}
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
if($result)
{
	$row = mysqli_fetch_row($result);
	for ($j = 0 ; $j < 4 ; ++$j){
		$str.= $row[$j] . " ";
	} 
	$encrypted = base64_encode(
	mcrypt_encrypt(MCRYPT_RIJNDAEL_256,
	$key, $str, MCRYPT_MODE_CBC, $iv));
	echo $encrypted;
	mysqli_free_result($result);
}
mysqli_close($link);
?>