<?php
$host='localhost';
$database='todolistdb';
$user='root';
$password='';
$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));
mysqli_set_charset($link, 'utf8');

if (isset($_POST['key']) && isset($_POST['email']))
{

}
else if (isset($_POST['email']))
{
	$email = $_POST['email'];
	$key = rand(1000, 99999999);
	$query = "UPDATE users SET password2 = $key WHERE users.email = '$email';";
	$result = mysqli_query($link, $query) or die("Request error " . mysqli_error($link));
	echo $key;
} 
else
{
	echo "error";
}
mysqli_close($link);
?>