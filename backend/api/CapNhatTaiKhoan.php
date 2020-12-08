<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idtaikhoan']))
		$idtaikhoan = $_POST['idtaikhoan'];
	else
		die();

	if(isset($_POST['tennhanvien']))
		$tennhanvien = $_POST['tennhanvien'];
	else
		die();

	if(isset($_POST['email']))
		$email = $_POST['email'];
	else
		die();
	if(isset($_POST['matkhau']))
		$matkhau = $_POST['matkhau'];
	else
		die();

	if(isset($_POST['quyen']))
		$level = $_POST['quyen'];
	else {
		die();
	}

	$sql = "UPDATE `taikhoan` SET `tennhanvien` = '$tennhanvien', `email` = '$email', `matkhau` = '$matkhau', `level` = '$level' WHERE `taikhoan`.`id` = $idtaikhoan";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo 1;