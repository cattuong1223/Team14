<?php
	include "../config/config.php";
	include "../lib/database.php";

    $m = new Database();

    if(isset($_POST['thoigianbd'])){
        $thoigianbd = $_POST['thoigianbd'];
        $ngaybd = substr($thoigianbd,0,2);
        $thangbd = substr($thoigianbd,3,2);
        $nambd = substr($thoigianbd,6,4);
        $thoigianbd=$nambd.'/'.$thangbd.'/'.$ngaybd;
    }
	else
        $thoigianbd = null;

    if(isset($_POST['thoigiankt'])){
        $thoigiankt = $_POST['thoigiankt'];
        $ngaykt = substr($thoigiankt,0,2);
        $thangkt = substr($thoigiankt,3,2);
        $namkt = substr($thoigiankt,6,4);  
        $thoigiankt=$namkt.'/'.$thangkt.'/'.$ngaykt;  
    }
	else
		$thoigiankt = null;

    $sql = "SELECT sum(thanhtien) as shd FROM hoadon WHERE (DATE_FORMAT(thoigiandi, '%Y/%m/%d') between '$thoigianbd' and '$thoigiankt') ";

    $result = $m->ExecuteQuery($sql)[0]['shd'];

    echo $result;
    