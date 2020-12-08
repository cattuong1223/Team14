<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();


	if(isset($_POST['idban']))
		$idban = $_POST['idban'];
	else
		die();

	if(isset($_POST['nhanvien']))
		$nhanvien = $_POST['nhanvien'];
	else
		die();

	if(isset($_POST['thoigianden']))
		$thoigianden = $_POST['thoigianden'];
	else
		die();

	if(isset($_POST['thanhtien']))
		$thanhtien = $_POST['thanhtien'];
	else
		die();

	if(isset($_POST['khuyenmai']))
		$khuyenmai = $_POST['khuyenmai'];
	else
		die();

	if(isset($_POST['ghichu']))
		$ghichu = $_POST['ghichu'];
	else
		die();


	$sql = "INSERT INTO hoadon(id,idban,nhanvien,trangthai,thoigianden,thoigiandi,thanhtien,khuyenmai,ghichu) VALUES (NULL,$idban,'$nhanvien',1,'$thoigianden',NOW(),$thanhtien,$khuyenmai,'$ghichu')";

	$idhoadon = $m->ExecuteNonquery($sql);

	$query = "SELECT * FROM chitietban WHERE idban = $idban";


	$result = $m->Executequery($query);


	for($i = 0; $i < count($result) ; $i++)
	{
		$idmonan = $result[$i]['idmonan'];
		$soluong = $result[$i]['soluong'];

		$truyvan = "INSERT INTO chitiethoadon(id,idmonan,idhoadon,soluong) VALUES(NULL,$idmonan,$idhoadon,$soluong)";
		$m->ExecuteNonquery($truyvan);
	}

	$qr = "DELETE FROM chitietban WHERE idban = $idban";
	$m->ExecuteNonquery($qr);

	$str = "UPDATE ban SET trangthai = 0, ghichu = '',thoigianvao = '0000-00-00 00:00:00' WHERE id = $idban";

	$m->ExecuteNonquery($str);

	echo "1";

