<?php
	include 'DBHelper.php';

    $sql = "select * from shopcar;";

    $result = query($sql);

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>