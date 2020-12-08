<?php

	$target_dir = "../../images/thucan/";
	$target_file = $target_dir . basename($_FILES["files"]["name"]);  // đường dẫn lưu file
	$uploadOk = 1;  // trạng thái thành công hay chưa

	// Kiểm tra xem tệp hình ảnh có phải là hình ảnh thực hay hình ảnh giả
	$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));  

    $check = getimagesize($_FILES["files"]["tmp_name"]);
    if($check !== false)  // nếu đúng thì ok
    {
       // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } 
    else  // nếu sai thì thông báo và trạng thái về 0
    {
        //echo "File is not an image.";
        echo "khongphaihinhanh";
        $uploadOk = 0;
        die();
    }

	// kiểm tra xem file đã tồn tại chưa
	if (file_exists($target_file)) 
	{
	    //echo "Sorry, file already exists.";
	    echo "filedatontai";
	    $uploadOk = 0;
	    die();
	}

	// kiểm tra kích thước của file tối đa 50MB
	if ($_FILES["files"]["size"] > 50000000) 
	{
	    //echo "Sorry, your file is too large.";
	    echo "kichthuocqualon";
	    $uploadOk = 0;
	    die();
	}

	// Những định dạng file cho phép là jpg,png,jpeg,gif
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) 
	{
	    //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	    echo "saidinhdang";
	    $uploadOk = 0;
	    die();
	}
	// kiểm tra trạng thái của biến $uploadOk 
	if ($uploadOk == 0) 
	{
	    //echo "Sorry, your file was not uploaded.";
	    echo "khongtaiduoc";

	} 
	else 
	{
	    if (move_uploaded_file($_FILES["files"]["tmp_name"], $target_file)) 
	    {
	        $arr = array("name"=>basename($_FILES["files"]["name"]));
		    echo json_encode($arr);
		       //echo basename($_FILES['file']['name']);
	    } 
	    else 
	    {
	        echo "Sorry, there was an error uploading your file.";
	    }
	}