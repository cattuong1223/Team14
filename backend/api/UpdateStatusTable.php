<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idban']))
		$idban = $_POST['idban'];
	else
	{
		$idban = null;
	}

	$sql = "UPDATE ban SET trangthai = 1, thoigianvao = NOW() WHERE id = $idban";

	$result = $m->ExecuteNonquery($sql);

	if(is_numeric($result))
		echo "success";
	else
		echo "error";

