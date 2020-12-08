<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['trangthai']))
		$trangthai = $_POST['trangthai'];
	else
	{
		$trangthai = 0;
	}

	if($trangthai == 2)
	{
		$sql = "SELECT ban.*,tenkhuvuc FROM ban,khuvuc WHERE ban.idkhuvuc = khuvuc.id";

		$result = $m->Executequery($sql);

		$result = json_encode($result,JSON_UNESCAPED_UNICODE);

		echo $result;
	}
	
	else
	{
		$sql = "SELECT ban.*,tenkhuvuc FROM ban,khuvuc WHERE ban.idkhuvuc = khuvuc.id AND trangthai = $trangthai";

		$result = $m->Executequery($sql);

		$result = json_encode($result,JSON_UNESCAPED_UNICODE);

		echo $result;
	}
