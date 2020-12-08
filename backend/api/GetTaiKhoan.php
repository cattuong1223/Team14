<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	$sql = "SELECT * FROM taikhoan";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;
