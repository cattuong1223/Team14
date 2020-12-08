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

	if(isset($_POST['idmonan']))
		$idmonan = $_POST['idmonan'];
	else
		$idmonan = null;

	
	$sql = "INSERT INTO chitietban(idmonan,idban,soluong) VALUES ($idmonan,$idban,1)";

	$result = $m->ExecuteNonquery($sql);

	$query = "SELECT chitietban.id,monan.id AS idfood,monan.tenmonan,chitietban.soluong,monan.gia,(chitietban.soluong * monan.gia) as thanhtien FROM ban,monan,chitietban WHERE chitietban.idmonan = monan.id AND chitietban.idban = ban.id AND ban.id = $idban";

	$data = $m->Executequery($query);

	$data = json_encode($data,JSON_UNESCAPED_UNICODE);

	echo $data;