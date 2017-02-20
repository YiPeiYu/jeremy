<?php
	include "DBHelper.php";
	session_start();
	$account = $_SESSION["account"];

	$pwd = $_POST["password"];
	$resetpwd = $_POST["psw"];
	$sql = "update users set password = '$resetpwd' where account = '$account';";
	$checkSql = "select * from users where account = '$account' and password = '$pwd';";
	$array = query($checkSql);
	if(count($array) < 1){
		echo '{"state": false, "message": "原密码错误！"}';
	}else{
		$result = excute($sql);
		if($result){
			echo '{"state": true, "message":"密码修改成功!"}';
		}else{
			echo '{"state": false, "message": "密码修改失败！"}';
		}
	}
?>