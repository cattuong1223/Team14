<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idbill']))
		$idbill = $_POST['idbill'];
	else
		$idbill = "";

	$sql = "SELECT monan.tenmonan,chitiethoadon.soluong,monan.gia,(chitiethoadon.soluong * monan.gia) as thanhtien FROM chitiethoadon,monan,hoadon WHERE chitiethoadon.idmonan = monan.id AND chitiethoadon.idhoadon = hoadon.id AND chitiethoadon.idhoadon=$idbill";

	$result = $m->ExecuteQuery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;