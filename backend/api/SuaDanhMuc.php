<?php 
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['id']))
		$idanhmuc = $_POST['id'];
	else
		$idanhmuc = null;

	if(isset($_POST['tendanhmuc']))
		$tendanhmuc= $_POST['tendanhmuc'];
	else
		$tendanhmuc = "";

	$sql = "UPDATE danhmuc SET tendanhmuc = '$tendanhmuc' WHERE id = $idanhmuc";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo 1;
	else 
		echo 0;