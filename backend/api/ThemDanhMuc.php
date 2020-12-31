<?php 
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	
	if(isset($_POST['tendanhmuc']))
		$tendanhmuc= $_POST['tendanhmuc'];
	else
		$tendanhmuc = "";

	$sql = "select count (*) from `danhmuc` where `danhmuc`.`tendanhmuc` = '$tendanhmuc'";
	$check = $m->ExecuteNonquery($sql);
	if ($check > 0){
		die();
	}

	$sql = "INSERT INTO `danhmuc` (`id`, `tendanhmuc`) VALUES (NULL, '$tendanhmuc');";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo 1;
	else 
		echo 0;