<?php

	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idtable']))
		$_SESSION['idban'] = $_POST['idtable'];
	
	$idtable = $_SESSION['idban'];
	
	$sql = "SELECT chitietban.id,monan.id AS idfood,monan.tenmonan,chitietban.soluong,monan.gia,(chitietban.soluong * monan.gia) as thanhtien FROM ban,monan,chitietban WHERE chitietban.idmonan = monan.id AND chitietban.idban = ban.id AND ban.id = $idtable";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;