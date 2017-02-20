<?php
	include 'DBHelper.php';
	session_start();
	$pro_id=$_SESSION["pro_id"];
	if(isset($pro_id)){
		$checkSql = "select * from products where id = '$pro_id';";
		$array = query($checkSql);
	    echo json_encode($array,JSON_UNESCAPED_UNICODE);
	}else{
		echo'{"state":false,"account":"'.$_SESSION["pro_id"].'"}';
	}
?>