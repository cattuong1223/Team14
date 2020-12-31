<?php
	include "../config/config.php";
	include "../lib/database.php";

    $m = new Database();


    if(isset($_POST['namTK'])){
        $namTK = $_POST['namTK'];
    }
	else
        $namTK= null;

    $sql = "SELECT month(DATE_FORMAT(thoigiandi, '%Y/%m/%d')) AS status, sum(thanhtien) AS size_status FROM hoadon WHERE year(DATE_FORMAT(thoigiandi, '%Y/%m/%d'))='$namTK'  GROUP BY status asc";
    
    $result = $m->Executequery($sql);

	$result = json_encode($result,JSON_UNESCAPED_UNICODE);

	echo $result;
    