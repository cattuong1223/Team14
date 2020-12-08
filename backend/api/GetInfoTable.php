<?php
	
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idtable']))
		$_SESSION['idban'] = $_POST['idtable'];
	
	$idtable = $_SESSION['idban'];
	
	$sql = "SELECT ban.*,khuvuc.tenkhuvuc FROM ban,khuvuc WHERE ban.idkhuvuc = khuvuc.id AND ban.id  = $idtable";

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;