<?php
	include 'DBHelper.php';
	$phone = $_POST['phone'];
	$psw = $_POST['password'];
	$checksql = "select * from users where phone='$phone' and password='$psw';";
	$result = query($checksql);
	if(count($result) < 1){
		echo '{"state":false,"message":"登录名或密码错误！！！"}';
	} else {
		echo '{"state":true,"message":"登录成功！！！"}';
		session_start();
		$_SESSION['phone']=$phone;
	}
?>