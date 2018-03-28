<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
if (isset($_POST['key']) && isset($_POST['email']))
{
	$email = $_POST['email'];
	$key = $_POST['key'];
	$query = "SELECT * FROM users WHERE (email = '$email' AND password2 = $key);";
	$result = mysqli_query($link, $query) or die("Request error " . mysqli_error($link));
	$rows = mysqli_num_rows($result);
	if ($rows > 0)
		echo 2;
	else
		echo 3;
}
else if (isset($_POST['email']))
{
	$email = $_POST['email'];
	$query = "SELECT * FROM users WHERE email = '$email';";
	$result = mysqli_query($link, $query) or die("Request error " . mysqli_error($link));
	$rows = mysqli_num_rows($result);
	if ($rows == 1)
		echo 0;
	else
		echo 1;
} 
else
{
	echo "error";
}
mysqli_close($link);
?>