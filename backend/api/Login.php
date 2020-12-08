<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();


	if(isset($_POST["email"]))
		$email = $_POST['email'];
	else
		$email = null;

	if(isset($_POST['pass']))
		$pass = $_POST['pass'];
	else
		die();


	$sql = "SELECT taikhoan.* FROM taikhoan WHERE email = '$email' AND matkhau = '$pass'";

	//echo $sql;
	
	$result = $m->Executequery($sql);

	$kq = $result[0]['email'];
	$kq2 = $result[0]['matkhau'];

	if($email == $kq && $pass == $kq2)
	{
		$_SESSION['trangthai'] = 'thanhcong';
		$_SESSION['idtaikhoan'] = $result[0]['id'];
		$_SESSION['tennhanvien'] = $result[0]['tennhanvien'];
		$_SESSION['level'] = $result[0]['level'];
		echo 'thanhcong';
	}
	else{
		unset($_SESSION['trangthai']);
		unset($_SESSION['idtaikhoan']);
		unset($_SESSION['tennhanvien']);
		unset($_SESSION['level']);
		die();
	}