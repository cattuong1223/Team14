<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	// $sql = "SELECT monan.*,tendanhmuc FROM monan,danhmuc WHERE monan.iddanhmuc = danhmuc.id";
	$sql = 'SELECT monan.* FROM monan';
	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;