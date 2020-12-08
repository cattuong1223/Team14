<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	$sql = "SELECT * FROM khuvuc";

	$result = $m->Executequery($sql);

	// echo "<pre>";
	// var_dump($result);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;