<?php
	
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();


	$sql = "SELECT COUNT(id) as sl FROM ban WHERE trangthai  =  0";

	echo $m->ExecuteQuery($sql)[0]['sl'];