<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
if (isset($_POST['login']) && isset($_POST['email']) && isset($_POST['pass']))
{
	$login = $_POST['login'];
	$email = $_POST['email'];
	$pass  = $_POST['pass'];
	$query = "INSERT INTO users VALUES (NULL, '".$login."', '".$email."', '".$pass."', NULL);";
	$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));
	mysqli_set_charset($link, 'utf8');
	$result = mysqli_query($link, $query) or die("Reqest error " . mysqli_error($link));
	echo 4;
}
else
{
	echo "error";
}
mysqli_close($link);
?>