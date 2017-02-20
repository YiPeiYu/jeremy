<?php
include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$pro_id=$_GET['id'];
	$checkSql = "select proid from cart where phone='$phone'";
	$array =json_decode(query($checkSql)[0]->proid,true);
	$keys = array_keys($array);  
    $index = array_search($pro_id,$keys);   
    array_splice($array,$index,1);
	if(count($array)==0){
		$array = '{}';
	}else{
		$array = json_encode($array);
	}
	$sql = "update cart set proid ='$array' where phone='$phone'";
	$result = excute($sql);                                                       
?>