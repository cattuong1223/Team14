<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();


	$sql = 'SELECT CONCAT(ban.tenban, " - ",khuvuc.tenkhuvuc) as name,ban.id,ban.trangthai FROM ban,khuvuc WHERE ban.idkhuvuc = khuvuc.id';

	$result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;