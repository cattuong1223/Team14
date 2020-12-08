<?php 
	class Database
	{
		private $_sql;
		private $_conn;

		public function __construct()
		{
			
		}
		public function SetQuery($sql)
		{
			$this->_sql = $sql;
		}

		public function connect()
		{
			global $sever;
			global $username;
			global $password;
			global $database;
			global $option;
			try
			{

			$this->_conn = new PDO("mysql:host=$sever;dbname=$database",$username,$password,$option);
			$this->_conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			}
			catch(Exception $e)
			{
				echo "Lỗi kết nối tới cơ sở dữ liệu";
				echo $e->getMessage();
				die();
			}
		}
		public function disconnect()
		{
			$this->_conn = NULL;
		}

		public function Executequery($sql)
		{
			$this->connect();
			$this->SetQuery($sql);

			$stmt = $this->_conn->prepare($this->_sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$this->disconnect();
			return $result;
		}
		public function ExecuteNonquery($sql)
		{
			$this->Connect();
			$this->SetQuery($sql);
			try
			{
				$result = $this->_conn->prepare($this->_sql);
				$result->execute();
				$lastId = $this->_conn->lastInsertId();
				$this->Disconnect();
				return $lastId;
			}
			catch(Exception $e)
			{
				echo 'Câu truy vẫn lỗi hoặc bị lỗi đâu đó <br>';
				echo $e->getMessage();
				$this->Disconnect();
				die;
			}
		}
	}