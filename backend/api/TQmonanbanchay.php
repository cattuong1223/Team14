<?php
	
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

$sql = "SELECT monan.tenmonan,sum(chitiethoadon.soluong) as tsl,monan.id FROM monan,chitiethoadon,hoadon WHERE chitiethoadon.idmonan = monan.id AND chitiethoadon.idhoadon = hoadon.id AND DATE_FORMAT(thoigiandi, '%d/%m/%Y') = DATE_FORMAT(now(), '%d/%m/%Y') GROUP BY monan.id ORDER BY tsl DESC LIMIT 0,10";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;