<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$old_psw = $_POST['old_password'];
	$psw = $_POST['password'];
	$sql = "update users set password='$psw' where phone='$phone' ";
	$checkSql = "select * from users where phone='$phone' and password='$old_psw'";
	$array = query($checkSql);
	if(count($array) < 1){
		echo '{"state": false, "message": "原密码错误！！"}';
	}else{
		$result = excute($sql);
		if($result){
			echo '{"state": true, "message":"修改成功!"}';
		}else{
			echo '{"state": false, "message": "请重试"}';
		}                                                       
	}
?>