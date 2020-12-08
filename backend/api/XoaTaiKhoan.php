<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idtaikhoan']))
		$idtaikhoan = $_POST['idtaikhoan'];
	else
		die();

	$sql = "DELETE FROM taikhoan WHERE id=$idtaikhoan";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo 1;