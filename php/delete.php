<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$sql = "update cart set proid ='{}' where phone='$phone'";
	$result = excute($sql); 
	if($result){
		echo '{"state": true, "message":"del success!"}';
	}else{
		echo '{"state": false, "message": "del fail!"}';
	}                                                      
?>