<?php
	include 'DBHelper.php';
	session_start();
	if(isset($_SESSION['phone'])){
		$phone = $_SESSION['phone'];
		$checkSql = "select * from users where phone = '$phone';";
		$account = query($checkSql)[0]->account;
		$img = query($checkSql)[0]->head_img;
		echo '{"state":true,"account":"'. $account .'","img":"'. $img .'","phone":"'. $phone .'"}';
	}else{
		echo'{"state":false}';
	}
?>