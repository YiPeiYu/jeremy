<?php
	include "fileupload.php";
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	
    $array = '';

    if(isset($_FILES)){
        //实例化上传插件
        $uploadFileObject = new FileUpload();
        // $uploadFileObject->path = "upload";//文件存放目录
        $uploadFileObject->allowtype = array('jpg','gif','png','jpeg');//可以不设置，类中有默认类型
        // $uploadFileObject->maxsize = "100000000";//可以不设置，类中有默认
        //调用上传方法开始上传文件，上传的文件保存到 file 文件夹
        //第一个参数为提交的 file 元素名称，第二个参数为要上传的文件夹名称
        $uploadFileObject->upload("file", "../head_img");
        //获取上传结果
        $returnStatus = $uploadFileObject->getErrorMsg();
        if(empty($returnStatus)){//returnStatus错误信息数据
            //成功
            
			$fileName = $uploadFileObject->getFileName();          
			$src ="libs/head_img/" . $fileName;
            $sql = "update user_info set head_img='$src' where phone='$phone' ";
			$result = excute($sql);
            $array = json_encode($array, JSON_UNESCAPED_UNICODE);
            $array = array(
                "status"=>true,
                "fileName"=>$fileName,
            );
            $array = json_encode($array);
        } else {
            //失败
        	$array = array(
                "status"=> false,
                "fileName"=> "",
                "message" => $returnStatus
            );

			
        }
    }
    echo $array;
	 
?>