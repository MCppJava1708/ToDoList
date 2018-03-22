<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');
if (isset($_POST['login']))
{
	$login = $_POST['login'];
	$query ="SELECT * FROM users WHERE name = '$login';";
	$result = mysqli_query($link, $query) or die("Request error " . mysqli_error($link));
	$rows = mysqli_num_rows($result);
	if ($rows == 0)
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