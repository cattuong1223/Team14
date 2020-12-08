<?php
	
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	$sql = "SELECT hoadon.nhanvien,TIMEDIFF(now(),thoigiandi) AS tg , hoadon.thanhtien from hoadon WHERE DATE_FORMAT(thoigiandi, '%d/%m/%Y') = DATE_FORMAT(now(), '%d/%m/%Y') ORDER BY tg ASC";

	$result = $m->ExecuteQuery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;

	