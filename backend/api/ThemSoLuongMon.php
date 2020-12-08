<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idorder']))
		$idorder = $_POST['idorder'];
	else
	{
		die();
	}

	if(isset($_POST['soluong']))
	{ 
		if(is_numeric($_POST['soluong']))
			$soluong = $_POST['soluong'];
		else
			$soluong = 1;
	}

	else
		$soluong = 1;


	if(isset($_POST['idban']))
		$idban = $_POST['idban'];
	else
	{
		die();
	}

	$sql = "UPDATE chitietban SET soluong = $soluong WHERE chitietban.id = $idorder";

	$result = $m->ExecuteNonQuery($sql);

	$query = "SELECT chitietban.id,monan.id AS idfood,monan.tenmonan,chitietban.soluong,monan.gia,(chitietban.soluong * monan.gia) as thanhtien FROM ban,monan,chitietban WHERE chitietban.idmonan = monan.id AND chitietban.idban = ban.id AND ban.id = $idban";

	$data = $m->Executequery($query);

	$data = json_encode($data,JSON_UNESCAPED_UNICODE);

	echo $data;