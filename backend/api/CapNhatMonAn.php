<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idmonan']))
		$idmonan = $_POST['idmonan'];
	else
		$idmonan = null;

	if(isset($_POST['iddanhmuc']))
		$idanhmuc = $_POST['iddanhmuc'];
	else
		$iddanhmuc = null;

	if(isset($_POST['tenmonan']))
		$tenmonan = $_POST['tenmonan'];
	else
		$tenmonan = null;

	if(isset($_POST['gia']))
		$gia = $_POST['gia'];
	else
		$gia = null;

	if(isset($_POST['donvi']))
		$donvi = $_POST['donvi'];
	else
		$donvi = null;

	if(isset($_POST['soluong']))
		$soluong = $_POST['soluong'];
	else
		$soluong = null;

	if(isset($_POST['avatar']))
		$avatar = $_POST['avatar'];
	else
		$avatar = null;


	if($avatar == null)
	{
		$sql = "UPDATE `monan` SET `iddanhmuc` = '$idanhmuc', `tenmonan` = '$tenmonan', `donvi` = '$donvi', `gia` = '$gia', `soluongcon` = '$soluong' WHERE `monan`.`id` = $idmonan";
		$result = $m->ExecuteNonQuery($sql);
		if(is_numeric($result))
		{
			echo 1;
		}
	}
	else
	{
		$layanhdexoa = "SELECT avartar FROM monan WHERE monan.id = $idmonan";

		$anh = $m->ExecuteQuery($layanhdexoa)[0]['avartar'];

		$sql2 = "UPDATE `monan` SET `iddanhmuc` = '$idanhmuc', `tenmonan` = '$tenmonan', `donvi` = '$donvi', `gia` = '$gia', `soluongcon` = '$soluong',`avartar` = '$avatar' WHERE `monan`.`id` = $idmonan";
		$result = $m->ExecuteNonQuery($sql2);
		if(is_numeric($result))
		{
			if(file_exists("/images/thucan/".$anh));
			{  
				unlink("../../images/thucan/".$anh);
				echo 1;
			}
		}
	}
