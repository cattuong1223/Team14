function thongbao(thongbao)
{
	$.notify({
		// options
		icon: 'fas fa-bell',
		message: thongbao
	},{
		// settings
		element: 'body',
		position: null,
		type: "info",
		allow_dismiss: true,
		newest_on_top: false,
		showProgressbar: false,
		placement: {
			from: "top",
			align: "right"
		},
		offset: 20,
		spacing: 10,
		z_index: 1031,
		delay: 3000,
		timer: 1000,
		url_target: '_blank',
		mouse_over: null,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
		onShow: null,
		onShown: null,
		onClose: null,
		onClosed: null,
		icon_type: 'class',
		template: '<div data-notify="container" class="col-xs-11 col-sm-2 alert alert-{0}" role="alert">' +
			'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
			'<span data-notify="icon" style="margin-right:5px;font-size:20px"></span> ' +
			'<span data-notify="title">{1}</span> ' +
			'<span data-notify="message">{2}</span>' +
			'<div class="progress" data-notify="progressbar">' +
				'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
			'</div>' +
			'<a href="{3}" target="{4}" data-notify="url"></a>' +
		'</div>' 
	});
}

function IsNotEmail(email) {  
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(email))
    	return true;
    return false;
} 


var app = angular.module('myApp',['ngRoute','angularUtils.directives.dirPagination']);




app.config(function($routeProvider,$locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/',{
		templateUrl: 'chung/index.html',
		controller : 'MyController'
	})
	.when('/table',{
		templateUrl: 'chung/table.html',
		controller : 'TableController'
	})
	.when('/detail-table',{
		templateUrl: 'chung/detail-table.html',
		controller : 'DetailController'
	})
	.when('/bill',{
		templateUrl: 'chung/bill.html',
		controller : 'BillController'
	})
	.when('/food',{
		templateUrl: 'chung/food.html',
		controller : 'FoodController'
	})
	.when('/employee',{
		templateUrl: 'chung/employee.html',
		controller : 'EmployeeController'
	})
	.otherwise({redirectTo: '/'})

})

app.controller('LoginController', function($scope,$http,$rootScope,$location){

	$scope.dangnhap = function(email,pass)
	{
		
		if(email == null)
		{
			alert("Email không được để trống");
			return;
		}
		if(pass == null)
		{
			alert("Mật khẩu không được để trống");
			return;
		}
		if(IsNotEmail(email) || email.length > 50)
		{
			alert("Email không hợp lệ");
			return;
		}
		if(pass.length < 1 || pass.length > 15)
		{
			alert("Mật khẩu không hợp lệ");
			return;
		} 
		var data = $.param({
	    	email: email,
	    	pass: pass
	    }); 
    	var config = {
    		headers : {
    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
    		}
    	};
	    $http.post('backend/api/Login.php', data, config).then(function(response){
		    	var ketqua = response.data;
		    	if(ketqua == 'thanhcong')
		    	{
					$rootScope.trangthaidangnhap = "khongthanhcong";
					window.location.href = "quanlinhahang";
					alert("Đăng nhập thành công");
		    	}
		    	else
		    	{
		    		//$rootScope.dn = 'khongthanhcong';
		    		alert("Email hoặc mật khẩu không chính xác");
		    	}
	    	}, function(response){
	    		console.log(response.data);
		});
	}
})

// -----------------------------------------------------------------------------


app.controller('LogoutController', function($scope,$http,$rootScope,$location){

	$scope.logout = function()
	{
		$http.get("backend/api/Logout.php")
	    .then(function(response) {
		   	
	    });
	    window.location.href = "quanlinhahang";
	}
})



// ------------------------------------------------------------------------



app.controller('MyController', function($scope,$http,$rootScope,$location){

	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	    {
	    	$rootScope.dn = "khongthanhcong";
	    }
	    else
	    {
	    	$rootScope.dn = 'thanhcong'; // test 
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
			$rootScope.level = ketqua.level;
			// Nếu là nhân viên sẽ ẩn các chức năng của admin
			if(ketqua.level=="1"){
				$rootScope.MyStyle={display:'none'}
			}
				
	    }
    }); 

    $http.get("backend/api/TQdangcokhach.php")
    .then(function(response) {
	    $scope.dangcokhach  = response.data;
    });
    $http.get("backend/api/TQtonghoadon.php")
    .then(function(response) {
	    $scope.tonghoadon  = response.data;
    });
    $http.get("backend/api/TQdoanhthu.php")
    .then(function(response) {
	    $scope.doanhthu  = response.data;
    });
     $http.get("backend/api/TQbancontrong.php")
    .then(function(response) {
	    $scope.bancontrong  = response.data;
    });
     $http.get("backend/api/TQmonanbanchay.php")
    .then(function(response) {
	    $scope.monanbanchay  = response.data;
    });
    $http.get("backend/api/TQhoatdongganday.php")
    .then(function(response) {
	    $scope.hoatdongganday  = response.data;
    });


})
//--------------------------------------------------------------------------------------------------


app.controller('EmployeeController', function($scope,$http,$rootScope,$location){

	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	    {
	    	window.location.href = "";
	    }
	    else
	    {
	    	$rootScope.dn = 'thanhcong';
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
			$rootScope.level = ketqua.level;
			//Kiểm tra quyền truy cập
			if(ketqua.level=='1'){
				alert("Bạn không có quyền truy cập!");
				window.location.href = "";				
			}
		}
    });

    $http.get("backend/api/GetTaiKhoan.php")
    .then(function(response) {
    	ketqua = response.data;
    	for(i= 0 ;i<ketqua.length;i++)
    	{
    		if(ketqua[i].level == 2)
    			ketqua[i].level = "Quản Lý";
    		else
    			ketqua[i].level = "Nhân Viên";
    	}
	    $scope.ListTaiKhoan = ketqua;
    });


   $scope.quyen = [{quyen:'Quản Lý',level:'2'},{quyen:'Nhân Viên',level:'1'}];
   $scope.Select = $scope.quyen[0];

 
   

   // xử lí giao diện
   $scope.chitiet = function(taikhoan)
   {
   	   taikhoan.display = !taikhoan.display;
   	   taikhoan.select = $scope.quyen[0];
   }

    // xư lí tab pane
    $scope.ac1 = "active";
    $scope.ac2 = "ac2";
    $scope.xuli = function(){
    	$scope.ac1 = "active";
    	$scope.ac2 = "ac2";
    }
    $scope.xuli2 = function(){
    	$scope.ac1 = "ac2";
    	$scope.ac2 = "active";
    }

    // xử lý giao diện thêm nv
    $scope.themnv = function(){
    	$scope.hl = 'hl';
    }
    $scope.huythem = function(){
    	$scope.hl = "";
    }

    // xử lí thêm vào csdl
    //------------------------------ Thêm tài khoản ---------------------------------
    $scope.luuthem = function(name,email,matkhau)
    {
    	if(name == null)
    	{
    		alert("Nhập tên nhân viên");
    		return;
    	}
    	if(email == null)
    	{
    		alert("Nhập địa chỉ email");
    		return;
    	}
    	if(matkhau == null)
    	{
    		alert("Nhập mật khẩu");
    		return;
    	}
    	var data = $.param({
	    		tennhanvien: name,
	    		email: email,
	    		matkhau: matkhau,
	    		quyen: $scope.Select.level
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/ThemTaiKhoan.php', data, config).then(function(response)
	    	{
	    		if(response.data == 1)
	    		{
	    			$http.get("backend/api/GetTaiKhoan.php")
				    .then(function(response) {
				    	ketqua = response.data;
				    	for(i= 0 ;i<ketqua.length;i++)
				    	{
				    		if(ketqua[i].level == 2)
				    			ketqua[i].level = "Quản Lý";
				    		else
				    			ketqua[i].level = "Nhân Viên";
				    	}
					    $scope.ListTaiKhoan = ketqua;
				    });
				    //thongbao("Thêm thành công");
				    alert("Thêm thành công");
	    		}
	    		else
	    		{
	    			alert("Thêm thất bại");
	    		}
	    	}, function(response){
	    		console.log(response.data);
	    });
    }
    //----------------------------------------------------------------------------------

    $scope.xoa = function(taikhoan)
    {
    	var data = $.param({
	    		idtaikhoan: taikhoan.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/XoaTaiKhoan.php', data, config).then(function(response)
	    	{
	    		if(response.data == 1)
	    		{
	    			 $http.get("backend/api/GetTaiKhoan.php")
				    .then(function(response) {
				    	ketqua = response.data;
				    	for(i= 0 ;i<ketqua.length;i++)
				    	{
				    		if(ketqua[i].level == 2)
				    			ketqua[i].level = "Quản Lý";
				    		else
				    			ketqua[i].level = "Nhân Viên";
				    	}
					    $scope.ListTaiKhoan = ketqua;
				    });
	    		}
	    	}, function(response){
	    		console.log(response.data);
	    });	
    }

    $scope.capnhattaikhoan = function(taikhoan)
    {
    	var data = $.param({
    		idtaikhoan: taikhoan.id,
    		tennhanvien:taikhoan.tennhanvien,
    		email:taikhoan.email,
    		matkhau:taikhoan.matkhau,
    		quyen:taikhoan.select.level
    	}); 
    	var config = {
    		headers : {
    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
    		}
    	};
    	$http.post('backend/api/CapNhatTaiKhoan.php', data, config).then(function(response)
    	{
    		if(response.data == 1)
    		{
			     thongbao("Cập nhật thành công");
    		}
    		else
    		{
    			alert("Cập nhật thất bại");
    		}
    	}, function(response){
    		console.log(response.data);
	    });	
    }
})

// ---------------------------------------------------------------------------------------------------



app.controller('FoodController',function($scope,$http,$rootScope,$location){

	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	    {
	    	window.location.href = "";
	    }
	    else
	    {
	    	$rootScope.dn = 'thanhcong';
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
			$rootScope.level = ketqua.level;
			//Kiểm tra quyền truy cập
			if($rootScope.level=='1'){
				alert("Bạn không có quyền truy cập!");
				window.location.href = "";
			}
	    }
    });
	
    // load danh muc mon an 
   	$http.get("backend/api/GetDanhMuc.php")
    .then(function(response) {
       	$scope.ListDanhMuc = response.data;
       	$scope.select = $scope.ListDanhMuc[0];
    });

    // load tat ca mon an
    $http.get("backend/api/GetThucAn.php")
    .then(function(response) {
       	$scope.ListMonAn = response.data;
    });



    // xư lí tab pane
    $scope.ac1 = "active";
    $scope.ac2 = "ac2";
    $scope.xuli = function(){
    	$scope.ac1 = "active";
    	$scope.ac2 = "ac2";
    }
    $scope.xuli2 = function(){
    	$scope.ac1 = "ac2";
    	$scope.ac2 = "active";
    }

    // xử lý trên giao diện
    $scope.themthucan = function(){
    	// xử lý giao diện 
    	$scope.dpl = "hl";
    }
    // xử lý lưu vào csdl
    $scope.themmonan = function(monan)
    {
    	if(monan.tenmonan == null)
    	{
    		alert('Nhập tên món ăn');
    		return;
    	}
    	else if(monan.gia == null)
    	{
    		alert("Nhập giá");
    		return;
    	}
    	else if(monan.donvi == null)
    	{
    		alert("Nhập đơn vị");
    		return;
    	}

    	var fd = new FormData();
		var files = document.getElementById('file').files[0];
		if(files == null)
		{
			alert("Chọn ảnh");
			return;
		}
		fd.append('file',files);

		$http({
		   method: 'post',
		   url: 'backend/api/ThemMonAn.php',
		   data: fd,
		   headers: {'Content-Type': undefined},
		  }).then(function successCallback(response) {
		  	if(response.data == 'khongphaihinhanh')
		  	{
		  		alert("Tệp đã chọn không phải hình ảnh");
		  		return;
		  	}
		  	else if(response.data == 'filedatontai')
		  	{
		  		alert("file trùng tên");
		  		return;
		  	}
		  	else if(response.data == 'kichthuocqualon')
		  	{
		  		alert("Kích thước file quá lớn");
		  		return;
		  	}
		  	else if(response.data == 'saidinhdang')
		  	{
		  		alert("Sai định dạng hình ảnh");
		  		return;
		  	}
		  	else if(response.data == 'khongtaiduoc')
		  	{
		  		alert("Không thể tải file lên");
		  		return;
		  	}
		  	else
		  	{
		  		 $scope.avatar = response.data;
			    var data = $.param({
		    		iddanhmuc: $scope.select.id,
		    		tenmonan: monan.tenmonan,
		    		gia: monan.gia,
		    		donvi: monan.donvi,
		    		soluong: monan.soluong,
		    		avatar: $scope.avatar.name
		    	}); 
		    	var config = {
		    		headers : {
		    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
		    		}
		    	};
		    	$http.post('backend/api/AddFood.php', data, config).then(function(response){
		    		if(response.data == 1)
		    		{
		    			$http.get("backend/api/GetThucAn.php")
					    .then(function(response) {
					       	$scope.ListMonAn = response.data;
					    });


					    thongbao('thêm thành công');
		    		}

		    	}, function(res){
		    		console.log(response.data);
		    	});
		  	}
		});

    }

    // xóa món ăn
    $scope.xoamonan = function(monan){
    	var xacnhan = confirm("Xác nhận xóa");
    	if(xacnhan == false)
    		return;

    	var data = $.param({
	    		idmonan: monan.id 
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/XoaMonAn.php', data, config).then(function(response){
	    		if(response.data == 1)
	    		{
	    			$http.get("backend/api/GetThucAn.php")
				    .then(function(response) {
				       	$scope.ListMonAn = response.data;
				    });
	    		}
	    		else
	    		{
	    			alert("Xóa thất bại");
	    		}

	    	}, function(res){
	    		console.log(response.data);
	    });
    }
    // xử lý giao diện 
    $scope.huy = function(){
    	$scope.dpl = "";
    }

    // lấy tất cả danh sách món ăn 
    $scope.loctatca = function(){
    	$http.get("backend/api/GetThucAn.php")
	    .then(function(response) {
	       	$scope.ListMonAn = response.data;
	    });
    }

    $scope.locdanhmuc = function(danhmuc)
    {
    	var data = $.param({
	    		iddanhmuc: danhmuc.id 
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/GetFood.php', data, config).then(function(response){

	    		$scope.ListMonAn = response.data;

	    	}, function(res){
	    		console.log(response.data);
	    });
    }


    // cap nhat mon an 
    $scope.capnhat = function(monan){
    	monan.display = !monan.display;
    	for(i=0;i<$scope.ListDanhMuc.length;i++)
    	{
    		if(monan.iddanhmuc == $scope.ListDanhMuc[i].id)
    		{
    			$scope.select = $scope.ListDanhMuc[i];
    		}
    	}

    	var data = $.param({
	    		iddanhmuc: monan.iddanhmuc
    	}); 
    	var config = {
    		headers : {
    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
    		}
    	};
    	$http.post('backend/api/GetTenDanhMuc.php', data, config).then(function(response){
    		monan.tendanhmuc = response.data;
    	}, function(response){
    		console.log(response.data);
	    });
    }

    // lưu cập nhật món ăn
    $scope.luumonan = function(monan)
    {
    	var fd = new FormData();
		var files = document.getElementById(''+monan.id+'').files[0]; 
		fd.append('files',files);

		if(files == null)
		{
			if(monan.tenmonan == null)
	    	{
	    		alert('Nhập tên món ăn');
	    		return;
	    	}
	    	else if(monan.gia == null)
	    	{
	    		alert("Nhập giá");
	    		return;
	    	}
	    	else if(monan.donvi == null)
	    	{
	    		alert("Nhập đơn vị");
	    		return;
	    	}

			var data = $.param({
					idmonan: monan.id,
		    		iddanhmuc: monan.select.id,
		    		tenmonan: monan.tenmonan,
		    		gia: monan.gia,
		    		donvi: monan.donvi,
		    		soluong: monan.soluongcon
		    	}); 
		    	var config = {
		    		headers : {
		    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
		    		}
		    	};
		    	$http.post('backend/api/CapNhatMonAn.php', data, config).then(function(response){
		    		if(response.data == 1)
		    		{
		    			thongbao("Cập nhật thành công");
		    		}
		    	}, function(res){
		    		console.log(response.data);
		    	});
		}
		else
		{
			if(monan.tenmonan == null)
	    	{
	    		alert('Nhập tên món ăn');
	    		return;
	    	}
	    	else if(monan.gia == null)
	    	{
	    		alert("Nhập giá");
	    		return;
	    	}
	    	else if(monan.donvi == null)
	    	{
	    		alert("Nhập đơn vị");
	    		return;
	    	}

			$http({
			   method: 'post',
			   url: 'backend/api/CapNhatAnhMonAn.php',
			   data: fd,
			   headers: {'Content-Type': undefined},
			}).then(function successCallback(response) {
			  	if(response.data == 'khongphaihinhanh')
			  	{
			  		alert("Tệp đã chọn không phải hình ảnh");
			  		return;
			  	}
			  	else if(response.data == 'filedatontai')
			  	{
			  		alert("file trùng tên");
			  		return;
			  	}
			  	else if(response.data == 'kichthuocqualon')
			  	{
			  		alert("Kích thước file quá lớn");
			  		return;
			  	}
			  	else if(response.data == 'saidinhdang')
			  	{
			  		alert("Sai định dạng hình ảnh");
			  		return;
			  	}
			  	else if(response.data == 'khongtaiduoc')
			  	{
			  		alert("Không thể tải file lên");
			  		return;
			  	}
			  	else
			  	{
			  		$scope.avatar = response.data;
				    var data = $.param({
				    	idmonan: monan.id,
			    		iddanhmuc: $scope.select.id,
			    		tenmonan: monan.tenmonan,
			    		gia: monan.gia,
			    		donvi: monan.donvi,
			    		soluong: monan.soluongcon,
			    		avatar: $scope.avatar.name
			    	}); 
			    	var config = {
			    		headers : {
			    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
			    		}
			    	};
			    	$http.post('backend/api/CapNhatMonAn.php', data, config).then(function(response){
			    		if(response.data == 1)
			    		{
			    			thongbao("Cập nhật thành công");
			    		}

			    	}, function(res){
			    		console.log(response.data);
			    	});
			  	}
			});
		}
    }


    // đánh chỉ mục khi phân trang 
    $scope.currentPage = 1;
    $scope.pageChangeHandler = function(newPageNumber)
    {
    	$scope.currentPage =  newPageNumber * 17 - 16;
    }

    // không cho phép nhập chữ vào giá
    $scope.gia = function(gia)
    {
    	var reg = /([0-9])+/;
   		if(reg.test(gia) == false)
   		{
   			$scope.monan.gia = "";
   			return;
   		}
    }

    // không cho phép nhập chữ vào số lượng
    $scope.soluong = function(soluong)
    {
    	var reg = /([0-9])+/;
   		if(reg.test(soluong) == false)
   		{
   			$scope.monan.soluong = "";
   			return;
   		}
    }
    // -------------- Danh MỤC Món Ăn -------------------------------
    
    // xử lí giao diện 
    $scope.gd = 'dm';
    $scope.gd2 = '';
    $scope.themdanhmuc = function()
    {
    	$scope.gd2 = 'dm';
    	$scope.gd = '';
    }

    // lưu vào csdl
    $scope.luuthem = function()
    {
    	$scope.gd2 = '';
    	$scope.gd = 'dm';

    	if($scope.tendanhmuc == null || $scope.tendanhmuc == "")
    		return; 
    	var data = $.param({
	    		tendanhmuc: $scope.tendanhmuc
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/ThemDanhMuc.php', data, config).then(function(response)
	    	{
	    		$http.get("backend/api/GetGroupDanhMuc.php")
				    .then(function(response) {
					    $scope.ListDanhMuc = response.data;
					    $scope.select = $scope.ListDanhMuc[0];
				    });
				// thông báo
	    		if(response.data == 1)
	    		{
	    			// hiển thị thông báo 
		    		thongbao('Thêm thành công');
	    		}
	    	}, function(response){
	    		console.log(response.data);
	    });
    }
    // xóa danh mục
    $scope.xoadanhmuc = function(danhmuc)
    {
    	var xacnhan = confirm("Xác nhận xóa");
    	if(xacnhan == false)
    		return;

    	var data = $.param({
	    		iddanhmuc: danhmuc.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/XoaDanhMuc.php', data, config).then(function(response)
	    	{
	    		$http.get("backend/api/GetGroupDanhMuc.php")
				.then(function(response) {
					$scope.ListDanhMuc = response.data;
				});
				
	    	}, function(response){
	    		console.log(response.data);
	    });
    }

    // xử lý giao diện
    $scope.suadanhmuc = function(danhmuc)
    {
    	danhmuc.display = !danhmuc.display;
    }
    // lưu sửa vào csdl
    $scope.luusuadanhmuc = function(danhmuc)
    {
    	danhmuc.display = !danhmuc.display;

    	var data = $.param({
    			id: danhmuc.id,
	    		tendanhmuc: danhmuc.tendanhmuc
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/SuaDanhMuc.php', data, config).then(function(response)
	    	{
				// thông báo
	    		if(response.data == 1)
	    		{

	    			// hiển thị thông báo 
		    		thongbao("Sửa thành công");
	    		}
	    		else
	    		{
	    			thongbao("Sửa thất bại");
	    		}
	    	}, function(response){
	    		console.log(response.data);
	    });
    }
    
})



// ---------------------------------------------------------------------------------------------------



app.controller('BillController', function($scope,$http,$rootScope,$location){

	// kiểm tra đăng nhập
	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	    {
	    	window.location.href = "";
	    }
	    else
	    {
	    	$rootScope.dn = 'thanhcong';
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
			$rootScope.level = ketqua.level;
			//Kiểm tra quyền truy cập
			if($rootScope.level=='1'){
				alert("Bạn không có quyền truy cập!");
				window.location.href = "";
			}
	    }
    });

    // Danh Sách Hóa Đơn
	$http.get("backend/api/GetBill.php")
    .then(function(response) {
	  	$scope.danhsachbill = response.data;
    });

    // lọc hóa đơn
    $scope.xuat = function()
    {
    	tg = $("#tg").val();
    	var data = $.param({
	    		thoigiandi: tg
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/LocHoaDon.php', data, config).then(function(response)
	    	{
	    		$scope.danhsachbill = response.data;
	    	}, function(response){
	    		console.log(response.data);
	    });
    }

    // ẩn giao diện 
    $scope.andi = function()
	{
	   	$scope.hienra = "";
	}

    $scope.thongtinhoadon = function(bill)
    {
    	// xử lý giao diện
    	var h = $('html>body').height();
    	$(".info-bill").css({
    		height: h+'px',
    	});

    	// hiển thị giao diện 
    	$scope.hienra = "hienlen";

    	// lấy thông tin hóa đơn
    	var data = $.param({
	    		idbill: bill.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/ThongTinHoaDon.php', data, config).then(function(response)
	    	{
	    		var bill = response.data;

	    		$scope.mhd = bill[0].id;
	    		$scope.vt = bill[0].tenban;
	    		$scope.tnv = bill[0].nhanvien;
	    		$scope.nd = bill[0].ngay;
	    		$scope.tg = bill[0].thoigian;
	    		$scope.km = parseInt(bill[0].khuyenmai);
	    		$scope.tc = parseInt(bill[0].thanhtien);
	    		$scope.gc = bill[0].ghichu;
	    	}, function(response){
	    		console.log(response.data);
	    });

	   // lấy danh sách order trong hóa đơn
	   	var data = $.param({
	    		idbill: bill.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	    	$http.post('backend/api/ChiTietHoaDon.php', data, config).then(function(response)
	    	{
	    		$rootScope.orderhoadon = response.data;
	    	}, function(response){
	    		console.log(response.data);
	    });
    }

    // xóa hóa đơn
    $scope.xoahoadon = function(bill)
    {
    	var xacnhan = confirm('Xác nhận xóa');
    	if(xacnhan == false)
    		return;

		var data = $.param({
    		idbill: bill.id
    	}); 
    	var config = {
    		headers : {
    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
    		}
    	};
    	$http.post('backend/api/XoaHoaDon.php', data, config).then(function(response)
    	{
    		$http.get("backend/api/GetBill.php")
		    .then(function(response) {
			  	$scope.danhsachbill = response.data;
		    });
    	}, function(response){
    		console.log(response.data);
	    });
    }

    // đánh chỉ mục khi phân trang 
    $scope.currentPage = 1;
    $scope.pageChangeHandler = function(newPageNumber)
    {
    	$scope.currentPage =  newPageNumber * 19 - 18;
    }

    $scope.currentPage2 = 1;
    $scope.pageChangeHandler2 = function(newPageNumber)
    {
    	$scope.currentPage2 =  newPageNumber * 10 - 9;
    }
})

//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

app.controller('TableController', function($scope,$http,$rootScope,$location){
	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	       	window.location.href = "";
	    else
	    {
	    	$rootScope.dn = 'thanhcong';
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
	    	$rootScope.level = ketqua.level;
	    }
    })

	// Load Danh Sách Bàn
	$http.get("backend/api/LocTatCaBan.php")
    .then(function(response) {

     	var ketqua = response.data;

     	for(i = 0;i<ketqua.length;i++)
     	{
     		if(ketqua[i].trangthai == 0)
     			ketqua[i].trangthai = "Empty";
     		else
     			ketqua[i].trangthai = "Active";
     	}

     	$scope.DanhSachBan = ketqua;
       
    });

    // Load Khu Vực
	$http.get("backend/api/GetKhuVuc.php")
    .then(function(response) {
       	$scope.DanhSachKhuVuc = response.data;
        $scope.selectedItem = $scope.DanhSachKhuVuc[0];
    });

    // Load Bàn Theo Khu Vực
    $scope.getTable = function(id)
	{
			var data = $.param({
	    		idkhuvuc: id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/GetTable.php', data, config).then(function(response)
	    	{

	    		var ketqua = response.data;

		     	for(i = 0;i<ketqua.length;i++)
		     	{
		     		if(ketqua[i].trangthai == 0)
		     			ketqua[i].trangthai = "Empty";
		     		else
     					ketqua[i].trangthai = "Active";
		     	}

		     	$scope.DanhSachBan = ketqua;

	    	}, function(response){
	    		console.log(response.data);
	    	});
    }

    // Mở bàn
    $scope.OpenTable = function(ban)
    {
    	var xacnhan = confirm("Xác nhận mở bàn");
    	if(xacnhan == false)
    		return;

		var data = $.param({
    		idban: ban.id
    	}); 
    	var config = {
    		headers : {
    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
    		}
    	};
    	$http.post('backend/api/UpdateStatusTable.php', data, config).then(function(res){
    		console.log(res.data);
    	}, function(res){
    		console.log(res.data);
    	});

		var data2 = $.param({
	    		idtable: ban.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};

	    	$http.post('backend/api/GetDetailTable.php', data2, config).then(function(response){

	    	}, function(res){
	    		console.log(response.data);
	    	});	

    	
    	var dt = $.param({
	    		idtable: ban.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};

	    	$http.post('backend/api/GetInfoTable.php', dt, config).then(function(response){
	    		//$rootScope.InfoTable = response.data;
	    	}, function(res){
	    		console.log(response.data);
	    });	

	    $location.path('/detail-table');
    }

    // Xem Chi Tiết Bàn
    $scope.detailTable = function(ban){

		var data = $.param({
	    		idtable: ban.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};

	    	$http.post('backend/api/GetDetailTable.php', data, config).then(function(response){

	    	}, function(res){
	    		console.log(response.data);
	    	});	

	    // load thông tin bàn 
	   	var dt = $.param({
	    		idtable: ban.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};

	    	$http.post('backend/api/GetInfoTable.php', dt, config).then(function(response){
	    		// $rootScope.InfoTable = response.data;
	    	}, function(res){
	    		console.log(response.data);
	    	});	

    	$location.path('/detail-table');
    }

    // lọc bàn theo trạng thái
    $scope.trangthai = [{name:'Tất Cả',value:'2'},{name:'Bàn Trống',value:'0'},{name:'Bàn Có Khách',value:'1'}];
    $scope.selectedTrangThai = $scope.trangthai[0];
    $scope.LocTrangThai = function(trangthai)
    {
    	var data = $.param({
	    		trangthai: trangthai
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/LocBanTheoTrangThai.php', data, config).then(function(response)
	    	{

	    		var ketqua = response.data;

		     	for(i = 0;i<ketqua.length;i++)
		     	{
		     		if(ketqua[i].trangthai == 0)
		     			ketqua[i].trangthai = "Empty";
		     		else
     					ketqua[i].trangthai = "Active";
		     	}

		     	$scope.DanhSachBan = ketqua;

	    	}, function(response){
	    		console.log(response.data);
	    	});
    }

})

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------




app.controller('DetailController', function($scope,$http,$rootScope,$location){

	// kiểm tra đăng nhập
	$http.get("backend/api/LuuThongTinDangNhap.php")
    .then(function(response) {
	    var ketqua = response.data;
	    if(ketqua.trangthai != 'thanhcong')
	       	window.location.href = "";
	    else
	    {
	    	$rootScope.dn = 'thanhcong';
	    	$rootScope.tennhanvien = ketqua.tennhanvien;
	    	$rootScope.idtaikhoan = ketqua.idtaikhoan;
	    	$rootScope.level = ketqua.level;
	    }
    })

	// load thông tin bàn
	$http.get("backend/api/GetInfoTable.php")
    .then(function(response) {

       	$scope.InfoTable = response.data;
    });
    // load order bàn
	$http.get("backend/api/GetDetailTable.php")
    .then(function(response) {
    	var ketqua = response.data;
    	var tongtien = 0;
    	for(i=0; i<ketqua.length ;i++)
    	{	
    		tongtien += Number(ketqua[i].thanhtien);
    	}
    	$scope.tongtien = tongtien;
    	$scope.tongcong = tongtien;
    	$scope.ListOrder = response.data;
    });



	// load danh mục món ăn
	$http.get("backend/api/GetDanhMuc.php")
    .then(function(response) {
    	var dm = {'id':'0','tendanhmuc':'Tất Cả'};
       	$scope.ListDanhMuc = response.data;
       	$scope.ListDanhMuc.unshift(dm);
        $scope.selectedItem = $scope.ListDanhMuc[0];
    });

    //load món ăn
    $http.get("backend/api/GetFood.php")
    .then(function(response) {
		$scope.ListMonAn = response.data;
    });


    // load món ăn theo danh mục
    $scope.getFood = function(id)
	{
			var data = $.param({
	    		iddanhmuc: id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/GetFood.php', data, config).then(function(response){

	    		$scope.ListMonAn = response.data;

	    	}, function(res){
	    		console.log(response.data);
	    	});
    }

    // load tất cả bàn

    $http.get("backend/api/GetAllTable.php")
    .then(function(response) {
       $scope.alltable = response.data;
       for(i = 0; i < $scope.alltable.length ;i++)
       {
       		if($scope.alltable[i].id == $scope.InfoTable[0].id)
       		{
       			$scope.selectedTable = $scope.alltable[i];
       			break;
       		}
       }
      
    });


    // thêm 1 món ăn
   	$scope.AddOrder = function(monan)
   	{	
   		for(i = 0; i < $scope.ListOrder.length ; i++)
   		{
   			if(monan.id == $scope.ListOrder[i].idfood)
   			{
   				alert("Món ăn đã có rồi");
   				return;
   			}

   		}
   		var data = $.param({
	    		idban: $scope.InfoTable[0].id,
	    		idmonan: monan.id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/AddOrder.php', data, config).then(function(response){

	    		var ketqua = response.data;
	    		var tongtien = 0;
	    		for(i=0; i<ketqua.length ;i++)
	    		{	
	    			tongtien += Number(ketqua[i].thanhtien);
	    		}
	    		$scope.tongtien = tongtien;
	    		$scope.tongcong = tongtien;
	    		$scope.ListOrder = response.data;

	    		// hiển thị thông báo 
	    		thongbao("Đã thêm một món ăn");

	    	}, function(res){
	    		console.log(response.data);
	    	});
   	}

   	// khuyến mãi theo VNĐ
   	$scope.khuyenmai = function(giamgia)
   	{
   		
   		var reg = /^(\d)+$/;
   		if(reg.test(giamgia) == false)
   		{
   			$scope.giamgia = "";
   			return;
   		}
   		if(giamgia > $scope.tongtien)
   		{
   			alert("Khuyến mãi không hợp lệ");
   			$scope.giamgia = "";
   			$scope.tongcong = $scope.tongtien;
   			return;
   		}

   		$scope.tongcong = $scope.tongtien - giamgia; 
   	}
   	// khuyến mãi theo %
   	$scope.khuyenmai2 = function(giamgia)
   	{
   		var reg = /^(\d)+$/;
   		if(reg.test(giamgia) == false)
   		{
   			$scope.giamgia2 = "";
   			return;
   		}
   		if($scope.giamgia2 > 100 || $scope.giamgia2 < 0)
   		{	
   			alert("Khuyến mãi không hợp lệ");
   			$scope.giamgia2 = "";
   			$scope.tongcong = $scope.tongtien;
   			return;
   		}
   		$scope.tongcong = $scope.tongtien - ($scope.tongtien*giamgia/100);  
   	}


   	// xóa 1 order
   	
   	$scope.del = function(order)
   	{
   		var data = $.param({
	    		idorder: order.id,
	    		idban : $scope.InfoTable[0].id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/DeleteOrder.php', data, config).then(function(response){

	    		var ketqua = response.data;
	    		var tongtien = 0;
	    		for(i=0; i<ketqua.length ;i++)
	    		{	
	    			tongtien += Number(ketqua[i].thanhtien);
	    		}	    		

	    		$scope.tongtien = tongtien;
	    		$scope.tongcong = tongtien;
	    		$scope.ListOrder = response.data;

	    	}, function(res){
	    		console.log(response.data);
	    });
   	}


   	// thay đổi số lượng món ăn 
   	
   	$scope.ThemSoLuong = function(order,sl)
   	{
   		var data = $.param({
	    		idorder: order.id,
	    		soluong : sl,
	    		idban : $scope.InfoTable[0].id
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/ThemSoLuongMon.php', data, config).then(function(response){

	    		var ketqua = response.data;
	    		var tongtien = 0;
	    		for(i=0; i<ketqua.length ;i++)
	    		{	
	    			tongtien += Number(ketqua[i].thanhtien);
	    		}

	    		$scope.tongtien = tongtien;
	    		$scope.tongcong = tongtien;
	    		$scope.ListOrder = response.data;

	    	}, function(res){
	    		console.log(response.data);
	    });
   	}
   	// đổi hiển thị
   	$scope.display = false;
   	$scope.doi = function(){
   		$scope.display = !$scope.display;
   	}
   	// lưu ghi chú
   	$scope.luu = function(gc){
   		$scope.display = !$scope.display;

   		var data = $.param({
	    		ghichu: gc,
	    		idban: $scope.InfoTable[0].id
	    	}); 
	    	var config = {
	    		headers : { 
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/UpdateGhiChu.php', data, config).then(function(response){
	    		$scope.InfoTable[0].ghichu = response.data;
	    	}, function(res){
	    		console.log(response.data);
	    });
   	}

   	// đổi bàn 
   	$scope.DoiBan = function(id)
	{	
		var xacnhan = confirm("Xác nhận chuyển bàn");
	    	if(xacnhan == false)
	    		return;

   		var data = $.param({
	    		idfrom: $scope.InfoTable[0].id,
	    		idto: id 
	    	}); 
	    	var config = {
	    		headers : {
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};

	    	$http.post('backend/api/ChangeTable.php', data, config).then(function(response){
	    		// load thông tin bàn
				$http.get("backend/api/GetInfoTable.php")
			    .then(function(response) {
			       	$scope.InfoTable = response.data;
			    });
			    // load order bàn
				$http.get("backend/api/GetDetailTable.php")
			    .then(function(response) {
			    	var ketqua = response.data;
			    	var tongtien = 0;
			    	for(i=0; i<ketqua.length ;i++)
			    	{	
			    		  tongtien += Number(ketqua[i].thanhtien);
			    	}

			    	$scope.tongtien = tongtien;
			    	$scope.tongcong = tongtien;
			    	$scope.ListOrder = response.data;
			    });
	    	}, function(res){
	    		console.log(response.data);
	    });
   	}


   	// thanh toán 
   	

   	$scope.thanhtoan = function()
   	{
   		var xacnhan = confirm("Thanh toán: "+$scope.tongcong);
   		if(xacnhan == false)
   			return;

   	 	var data = $.param({
	    		idban: $scope.InfoTable[0].id,
	    		nhanvien: $rootScope.tennhanvien,
	    		thoigianden: $scope.InfoTable[0].thoigianvao,
	    		thanhtien: $scope.tongcong,
	    		khuyenmai: $scope.tongtien - $scope.tongcong,
	    		ghichu: $scope.InfoTable[0].ghichu
	    	}); 
	    	var config = {
	    		headers : { 
	    			'content-type': 'application/x-www-form-urlencoded charset=utf-8'
	    		}
	    	};
	
	    	$http.post('backend/api/ThanhToan.php', data, config).then(function(response){
	    		console.log(response.data);
	    		$location.path('/table');
	    	}, function(res){
	    		console.log(response.data);
	    });
   	}

   	// đánh chỉ mục khi phân trang 
    $scope.currentPage = 1;
    $scope.pageChangeHandler = function(newPageNumber)
    {
    	// công thức : chỉ mục = trang hiện tại * size trang - (size trang - 1);
    	$scope.currentPage =  newPageNumber * 5 - 4;
    }

})
