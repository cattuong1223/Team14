<?php
	include "../config/config.php";
	include "../lib/database.php";

	$m = new Database();

	if(isset($_POST['idfrom']))
		$idfrom = $_POST['idfrom'];
	else
		die();


	if(isset($_POST['idto']))
		$_SESSION['idban'] = $_POST['idto']; 

	$idto = $_SESSION['idban'];


	$sql1 = "SELECT * FROM chitietban WHERE idban = $idfrom";

	$ketqua = $m->Executequery($sql1);

	$sql2 = "SELECT * FROM chitietban WHERE idban = $idto";

	$ketqua2 = $m->Executequery($sql2);

	$soluong = 0;

	for($i = 0; $i < count($ketqua) ; $i++)
	{
		//echo $ketqua[$i]['idmonan'];
		for($j = 0; $j < count($ketqua2) ; $j++)
		{
			if($ketqua[$i]['idmonan'] == $ketqua2[$j]['idmonan'])
			{
				//echo "có món ăn trùng nhau ".$ketqua2[$j]['idmonan'];

				$soluong = $ketqua[$i]['soluong'] + $ketqua2[$j]['soluong'];

				$idmonan = $ketqua2[$j]['idmonan'];

				$truyvan = "UPDATE chitietban SET soluong = $soluong WHERE idban = $idto AND idmonan = $idmonan";

				$m->ExecuteNonQuery($truyvan);

				$truyvan2 = "DELETE FROM chitietban WHERE idban = $idfrom  AND idmonan = $idmonan";

				$m->ExecuteNonQuery($truyvan2);
				break;
			}
		}

	}


	$sql = "UPDATE chitietban SET idban = $idto WHERE idban = $idfrom";

	$result = $m->ExecuteNonQuery($sql);

	if(is_numeric($result))
		echo "thanhcong";
	else
		echo "thatbai";

	$tgv = "SELECT * FROM ban WHERE id = $idfrom";

	$thoigianvao = $m->Executequery($tgv)[0]['thoigianvao'];

	$query = "UPDATE ban SET trangthai = 1, thoigianvao = '$thoigianvao' WHERE id = $idto";

	$m->ExecuteNonQuery($query);

	$query = "UPDATE ban SET trangthai = 0 WHERE id = $idfrom";

	$m->ExecuteNonQuery($query);


