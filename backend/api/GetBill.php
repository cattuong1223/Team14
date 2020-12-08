<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	$sql = "SELECT hoadon.id,DATE_FORMAT(thoigianden, '%d/%m/%Y %H:%i') AS thoigianden,DATE_FORMAT(thoigiandi, '%d/%m/%Y %H:%i') AS thoigiandi,thanhtien,CONCAT(tenban,' - ',tenkhuvuc) as tenban,nhanvien FROM hoadon,ban,khuvuc WHERE hoadon.idban = ban.id AND ban.idkhuvuc = khuvuc.id ORDER BY hoadon.id DESC";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;