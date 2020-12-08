<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['iddanhmuc']))
		$iddanhmuc = $_POST['iddanhmuc'];
	else
		die();

	$sql = "SELECT DISTINCT tendanhmuc FROM monan,danhmuc WHERE monan.iddanhmuc = danhmuc.id AND monan.iddanhmuc = $iddanhmuc";

	$result = $m->ExecuteQuery($sql);

	if(isset($result[0]))
		echo $result[0]['tendanhmuc'];
