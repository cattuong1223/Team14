<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();


	if(isset($_POST['idmonan']))
		$idmonan = $_POST['idmonan'];
	else
		$idmonan = null;

	$truyvan = "SELECT avartar FROM monan WHERE id = $idmonan";

	$avartar = $m->ExecuteQuery($truyvan);

	//xóa món ăn lưu trong hóa đơn đi
	$xoatronghoadon = "DELETE FROM chitiethoadon WHERE idmonan = $idmonan";

	$m->ExecuteNonQuery($xoatronghoadon);

	$truyvanxoa = "DELETE FROM monan WHERE id = $idmonan";

	$m->ExecuteNonQuery($truyvanxoa);

	if(!empty($avartar[0]['avartar']))
	{
		if(file_exists("images/thucan/".$avartar[0]['avartar']));
		{  
			unlink("../../images/thucan/".$avartar[0]['avartar']);
			echo 1;
		}
	}