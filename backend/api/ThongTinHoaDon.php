<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idbill']))
		$idbill = $_POST['idbill'];
	else
		$idbill = "";


	$sql = "SELECT hoadon.id,DATE_FORMAT(thoigianden, '%d/%m/%Y') AS ngay,CONCAT(DATE_FORMAT(thoigianden, '%H:%i'),' - ',DATE_FORMAT(thoigiandi, '%H:%i')) AS thoigian,thanhtien,khuyenmai,CONCAT(tenban,' - ',tenkhuvuc) as tenban,nhanvien,hoadon.ghichu FROM hoadon,ban,khuvuc WHERE hoadon.idban = ban.id AND ban.idkhuvuc = khuvuc.id AND hoadon.id = $idbill";

	$result = $m->ExecuteQuery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;