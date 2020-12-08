<?php 

	include "../config/config.php";

	if(!isset($_SESSION['trangthai']))
		die();

	$data = array(
		'trangthai' => $_SESSION['trangthai'],
		'idtaikhoan' => $_SESSION['idtaikhoan'],
		'tennhanvien' => $_SESSION['tennhanvien'],
		'level' => $_SESSION['level']
	);

	$data = json_encode($data,JSON_UNESCAPED_UNICODE);
	echo $data;
