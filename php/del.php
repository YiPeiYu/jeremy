<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$id = $_GET['id'];
	$sql = "delete from products where id='$id'";
	$result = excute($sql); 
	if($result){
		echo '{"state": true, "message":"del success!"}';
	}else{
		echo '{"state": false, "message": "del fail!"}';
	}
?>