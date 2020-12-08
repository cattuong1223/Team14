<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idkhuvuc']))
		$idkhuvuc = $_POST['idkhuvuc'];
	else
	{
		$sql = "SELECT * FROM khuvuc";
		$idkhuvuc = $m->Executequery($sql)[0]['id'];
	}


	
	$sql = "SELECT ban.*,tenkhuvuc FROM ban,khuvuc WHERE ban.idkhuvuc = khuvuc.id AND khuvuc.id = $idkhuvuc";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;

