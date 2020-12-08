<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['iddanhmuc']))
		$iddanhmuc = $_POST['iddanhmuc'];
	else
	{
		$iddanhmuc = null;
	}

	if($iddanhmuc == 0 || $iddanhmuc == null)
	{
		$sql = "SELECT * FROM monan";

		$result = $m->Executequery($sql);

		$result = json_encode($result,JSON_UNESCAPED_UNICODE);

		echo $result;
	}
	else
	{
		$sql = "SELECT monan.*,tendanhmuc FROM monan,danhmuc WHERE monan.iddanhmuc = danhmuc.id AND danhmuc.id = $iddanhmuc";

		$result = $m->Executequery($sql);

		$result = json_encode($result,JSON_UNESCAPED_UNICODE);

		echo $result;
	}

	
	