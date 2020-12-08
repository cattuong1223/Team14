<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST["ghichu"]))
		$ghichu = $_POST["ghichu"];
	else
		$ghichu = "";

	if(isset($_POST['idban']))
		$idban = $_POST['idban'];
	else
	{
		$idban = null;
	}

	$sql  = "UPDATE ban SET ghichu = '$ghichu' WHERE id = $idban";

	$m->ExecuteNonquery($sql);

	echo $ghichu;

