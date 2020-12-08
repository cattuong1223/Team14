<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	$sql = "SELECT sum(thanhtien) as doanhthu FROM hoadon WHERE DATE_FORMAT(thoigiandi, '%d/%m/%Y') = DATE_FORMAT(now(), '%d/%m/%Y')";

	echo $m->ExecuteQuery($sql)[0]['doanhthu'];