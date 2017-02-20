<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$pro_id=$_SESSION["pro_id"];
	$checkSql = "select proid from cart where phone='$phone'";
	$array = query($checkSql)[0];
	$new_pro= json_decode($array->proid);
	if(isset($new_pro->$pro_id)){
		$new_pro->$pro_id = $new_pro->$pro_id + 1;
	}else{
		$new_pro->$pro_id = 1;
	}
	$product = json_encode($new_pro);
	$sql="update cart set proid ='$product' where phone='$phone'";
	$result=excute($sql);
	if($result){
		echo '{"state": true, "message":"add success!"}';
	}else{
		echo '{"state": false, "message": "add fail!"}';
	}

?>