<?php 
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	
	if(isset($_POST['iddanhmuc']))
		$iddanhmuc= $_POST['iddanhmuc'];
	else
		$iddanhmuc = "";


	$sql = "DELETE FROM `danhmuc` WHERE `danhmuc`.`id` = $iddanhmuc";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo 1;
	else 
		echo 0;