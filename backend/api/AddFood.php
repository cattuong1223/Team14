<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['iddanhmuc']))
		$idanhmuc = $_POST['iddanhmuc'];
	else
		$iddanhmuc = null;

	if(isset($_POST['tenmonan']))
		$tenmonan = $_POST['tenmonan'];
	else
		$tenmonan = null;

	if(isset($_POST['gia']))
		$gia = $_POST['gia'];
	else
		$gia = null;

	if(isset($_POST['donvi']))
		$donvi = $_POST['donvi'];
	else
		$donvi = null;

	if(isset($_POST['soluong']))
		$soluong = $_POST['soluong'];
	else
		$soluong = null;

	if(isset($_POST['avatar']))
		$avatar = $_POST['avatar'];
	else
		$avatar = null;

	$sql = "INSERT INTO `monan` (`id`, `iddanhmuc`, `tenmonan`, `donvi`, `gia`, `soluongcon`, `avartar`) VALUES (NULL, '$idanhmuc', '$tenmonan', '$donvi', '$gia', '$soluong', '$avatar')";

	$result = $m->executeNonQuery($sql);

	if(is_numeric($result))
		echo 1;
	else
		echo 0;