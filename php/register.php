<?php 
	include 'DBHelper.php';
	$account = $_POST['account'];
	$phone = $_POST['phone'];
	$psw = $_POST['password'];
	$sql = "insert into users(account,phone,password,head_img) values('$account','$phone','$psw','libs/image/user.jpg')";
	$sql_cart =  "insert into cart(phone,proid) values('$phone','{}')";
	$sql_order =  "insert into order(phone) values('$phone')";
	$checkSql = "select * from users where phone = '$phone';";
	$array = query($checkSql);
	if(count($array) > 0){
		echo '{"state": false, "message": "phone already exists!"}';
	}else{
		$result = excute($sql);
		if($result){
			excute($sql_cart);
			excute($sql_order);
			echo '{"state": true, "message":"register success!"}';
		}else{
			echo '{"state": false, "message": "register fail!"}';
		}
	}
?>