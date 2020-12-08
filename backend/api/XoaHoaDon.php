<?php 
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idbill']))
		$idbill = $_POST['idbill'];
	else
		$idbill = null;

	$truyvan = "DELETE FROM hoadon WHERE id = $idbill";

	$result = $m->ExecuteNonQuery($truyvan);

	if(is_numeric($result))
		echo 1;