<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$checkSql = "select proid from cart where phone='$phone'";
	$array = query($checkSql)[0];
	$new_pro= json_decode($array->proid);
	$product = json_encode($new_pro);
	$sql = "insert into order(phone,proid) values('$phone','$product')";
	$result=excute($sql);
	if($result){
		echo '{"state": true, "message":"add success!"}';
	}else{
		echo '{"state": false, "message": "add fail!"}';
	}
?>