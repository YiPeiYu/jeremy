<?php
	include 'DBHelper.php';
	$account = $_POST["account"];
	$phone = $_POST["phone"];
	$address = $_POST["address"];
	$sql = "insert into address(account,phone,address) values('$account','$phone','$address')";
	$result=excute($sql);
	if($result){
		echo '{"state": true, "message":"add success!"}';
	}else{
		echo '{"state": false, "message": "add fail!"}';
	}
?>