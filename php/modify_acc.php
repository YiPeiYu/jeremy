<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$account = $_POST['account'];
	$sql = "update users set account='$account' where phone='$phone' ";
	$result = excute($sql);
	if($result){
		echo '{"state": true, "message":"修改成功!"}';
	}else{
		echo '{"state": false, "message": "请重试"}';
	}                                                       

?>