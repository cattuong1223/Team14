<?php
	include "../config/config.php";
	include "../lib/database.php";
	$m = new Database();

	if(isset($_POST['tennhanvien']))
		$tennhanvien = $_POST['tennhanvien'];
	else
		$tennhanvien = null;

	if(isset($_POST['email']))
		$email = $_POST['email'];
	else
		$email = null;

	if(isset($_POST['matkhau']))
		$matkhau = $_POST['matkhau'];
	else
		$matkhau = null;

	if(isset($_POST['quyen']))
		$quyen = $_POST['quyen'];
	else
		$quyen = null;
	$sql = "select count (*) from `taikhoan` where `taikhoan`.`email` = '$email'";
	$checkEmail = $m->ExecuteNonquery($sql);
	if ($checkEmail > 0){
		echo "Email trung!";
		die();
	}

	$sql = "INSERT INTO `taikhoan` (`id`, `tennhanvien`, `email`, `matkhau`, `level`, `ngaytao`, `ngayupdate`) VALUES (NULL, '$tennhanvien', '$email', '$matkhau', '$quyen', NULL, NULL)";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result)) 
		echo 1;