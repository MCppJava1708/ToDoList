<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
if (isset($_POST['login']) && isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['pass2']))
{
	$login = $_POST['login'];
	$email = $_POST['email'];
	$pass  = $_POST['pass'];
	$pass2 = $_POST['pass2'];
	if ($pass == $pass2)
	{
		$query  = "INSERT INTO `users` VALUES ('".$login."', '".$email."', '".$pass."');";
		$link   = new mysqli ($host, $user, $password, $dbname) or die ("Connection Error". mysqli_error($link));
		$result = mysqli_query($link, $query) or die("Reqest error " . mysqli_error($link));
		echo 4;
	}
	else
		echo 5;
}
else
{
	echo "error";
}
mysqli_close($link);
?>