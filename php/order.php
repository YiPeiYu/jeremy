<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION['phone'];
	$sql = "select proid from cart where phone = '$phone';";
	$array =json_decode(query($sql)[0]->proid);
	$pros = array();
	foreach($array as $x=>$x_value) 
	{
		$sql_se = "select * from products where id = '$x';";
		$pro = query($sql_se)[0];
		$pro->num = $x_value;
		$pros[] =  $pro;
	} 
	echo(json_encode($pros));
?>