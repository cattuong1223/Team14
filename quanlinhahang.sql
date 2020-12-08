-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 20, 2020 lúc 01:42 AM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlinhahang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ban`
--

CREATE TABLE `ban` (
  `id` int(11) NOT NULL,
  `idkhuvuc` int(11) NOT NULL,
  `tenban` varchar(50) NOT NULL,
  `trangthai` int(11) NOT NULL,
  `ghichu` text NOT NULL,
  `thoigianvao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `ban`
--

INSERT INTO `ban` (`id`, `idkhuvuc`, `tenban`, `trangthai`, `ghichu`, `thoigianvao`) VALUES
(1, 1, 'Bàn 1', 0, '', '0000-00-00 00:00:00'),
(2, 1, 'Bàn 2', 1, '', '2019-02-11 09:06:26'),
(3, 1, 'Bàn 3', 0, '', '0000-00-00 00:00:00'),
(4, 1, 'Bàn 4', 0, '', '0000-00-00 00:00:00'),
(5, 1, 'Bàn 5', 0, '', '0000-00-00 00:00:00'),
(6, 1, 'Bàn 6', 0, '', '0000-00-00 00:00:00'),
(7, 2, 'Bàn 1', 0, '', '0000-00-00 00:00:00'),
(8, 2, 'Bàn 2', 0, '', '0000-00-00 00:00:00'),
(9, 2, 'Bàn 3', 0, '', '0000-00-00 00:00:00'),
(10, 2, 'Bàn 4', 0, '', '0000-00-00 00:00:00'),
(11, 2, 'Bàn 5', 0, '', '0000-00-00 00:00:00'),
(12, 2, 'Bàn 6', 0, '', '0000-00-00 00:00:00'),
(13, 3, 'Bàn 1', 0, '', '0000-00-00 00:00:00'),
(14, 3, 'Bàn 2', 0, '', '0000-00-00 00:00:00'),
(15, 3, 'Bàn 3', 0, '', '0000-00-00 00:00:00'),
(16, 3, 'Bàn 4', 0, '', '0000-00-00 00:00:00'),
(17, 3, 'Bàn 5', 0, '', '0000-00-00 00:00:00'),
(18, 3, 'Bàn 6', 0, '', '0000-00-00 00:00:00'),
(19, 4, 'Bàn 1', 0, '', '2019-01-29 12:19:47'),
(20, 4, 'Bàn 2', 0, '', '0000-00-00 00:00:00'),
(21, 4, 'Bàn 3', 0, '', '0000-00-00 00:00:00'),
(22, 4, 'Bàn 4', 0, '', '0000-00-00 00:00:00'),
(23, 4, 'Bàn 5', 0, '', '0000-00-00 00:00:00'),
(24, 4, 'Bàn 6', 0, '', '2019-02-01 11:18:23'),
(25, 4, 'Bàn 7', 0, '', '0000-00-00 00:00:00'),
(26, 5, 'Bàn 1', 0, '', '0000-00-00 00:00:00'),
(27, 5, 'Bàn 2', 0, '', '0000-00-00 00:00:00'),
(28, 5, 'Bàn 3', 0, '', '0000-00-00 00:00:00'),
(29, 5, 'Bàn 4', 0, '', '0000-00-00 00:00:00'),
(30, 5, 'Bàn 5', 0, '', '0000-00-00 00:00:00'),
(31, 5, 'Bàn 6', 0, '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietban`
--

CREATE TABLE `chitietban` (
  `id` int(11) NOT NULL,
  `idmonan` int(11) NOT NULL,
  `idban` int(11) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `id` int(11) NOT NULL,
  `idmonan` int(11) NOT NULL,
  `idhoadon` int(11) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmuc`
--

CREATE TABLE `danhmuc` (
  `id` int(11) NOT NULL,
  `tendanhmuc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `danhmuc`
--

INSERT INTO `danhmuc` (`id`, `tendanhmuc`) VALUES
(2, 'Món Chính'),
(1, 'Món Khai Vị'),
(3, 'Món Tráng Miệng'),
(4, 'Nước Uống');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `id` int(11) NOT NULL,
  `idban` int(11) NOT NULL,
  `nhanvien` varchar(30) NOT NULL,
  `trangthai` int(11) NOT NULL,
  `thoigianden` datetime NOT NULL,
  `thoigiandi` datetime NOT NULL,
  `thanhtien` int(11) NOT NULL,
  `khuyenmai` int(11) NOT NULL,
  `ghichu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khuvuc`
--

CREATE TABLE `khuvuc` (
  `id` int(11) NOT NULL,
  `tenkhuvuc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `khuvuc`
--

INSERT INTO `khuvuc` (`id`, `tenkhuvuc`) VALUES
(1, 'Tầng 1'),
(2, 'Tầng 2'),
(3, 'Tầng 3'),
(4, 'Sân Thượng'),
(5, 'Ban Công');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monan`
--

CREATE TABLE `monan` (
  `id` int(11) NOT NULL,
  `iddanhmuc` int(11) NOT NULL,
  `tenmonan` varchar(255) DEFAULT NULL,
  `donvi` varchar(30) DEFAULT NULL,
  `gia` int(11) NOT NULL,
  `soluongcon` int(11) DEFAULT NULL,
  `avartar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `monan`
--

INSERT INTO `monan` (`id`, `iddanhmuc`, `tenmonan`, `donvi`, `gia`, `soluongcon`, `avartar`) VALUES
(1, 1, 'Salad Cải Bó Xôi', 'Đĩa', 70000, 100, 'salad-cai-bo-xoi.jpg'),
(2, 1, 'Nộm Sứa', 'Đĩa', 90000, 100, 'nom-sua.jpg'),
(3, 1, 'Nộm Rau Muống Bắp Bò', 'Đĩa', 60000, 100, 'nom-rau-muong-bap-bo.jpg'),
(4, 1, 'Măng Trúc Xào Tim', 'Đĩa', 110000, 100, 'mang-truc-xao-tim.jpg'),
(5, 1, 'Măng Trúc Xào Bò', 'Đĩa', 100000, 100, 'mang-truc-xao-bo.jpg'),
(6, 1, 'Cải Lăn Xào Tỏi', 'Đĩa', 75000, 100, 'cai-lan-xao-toi.jpg'),
(7, 2, 'Gà Nướng', 'Đĩa', 250000, 100, 'ga-nuong.jpg'),
(8, 2, 'Gà Hấp', 'Đĩa', 200000, 100, 'ga-hap.jpg'),
(9, 2, 'Bò Nướng Thái', 'Đĩa', 350000, 100, 'bo-nuong-thai.jpg'),
(10, 2, 'Bò Xào Cần Tỏi', 'Đĩa', 270000, 100, 'bo-xao-can-toi.jpg'),
(12, 3, 'Dưa Hấu', 'Đĩa', 20000, 100, 'dua-hau.jpg'),
(13, 3, 'Hoa Qủa Thập Cẩm', 'Đĩa', 25000, 100, 'hoa-qua-thap-cam.jpg'),
(14, 3, 'Súp Cua Măng Tây', 'Đĩa', 50000, 100, 'sup-cua-mang-tay.jpg'),
(15, 3, 'Súp Rau', 'Đĩa', 30000, 100, 'sup-rau.jpg'),
(16, 4, 'Cà Phê Sữa', 'Lon', 25000, 100, 'ca-phe-sua.jpg'),
(17, 4, 'Cocacola', 'Lon', 15000, 100, 'coca.jpg'),
(18, 4, 'Pepsi', 'Lon', 15000, 100, 'pepsi.jpg'),
(19, 4, 'Bia', 'Lon', 20000, 100, 'bia.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `id` int(11) NOT NULL,
  `tennhanvien` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(50) NOT NULL,
  `level` int(11) NOT NULL,
  `ngaytao` date DEFAULT NULL,
  `ngayupdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`id`, `tennhanvien`, `email`, `matkhau`, `level`, `ngaytao`, `ngayupdate`) VALUES
(2, 'trần cát tường', 'tuong@gmail.com', '123321', 2, NULL, NULL),
(10, 'Phước', 'phuoc123', '123321', 1, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ban`
--
ALTER TABLE `ban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_khuvuc` (`idkhuvuc`);

--
-- Chỉ mục cho bảng `chitietban`
--
ALTER TABLE `chitietban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ctb_idban` (`idban`),
  ADD KEY `chitietban_ibfk_2` (`idmonan`);

--
-- Chỉ mục cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cthd_idhoadon` (`idhoadon`),
  ADD KEY `idmonan` (`idmonan`);

--
-- Chỉ mục cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_tendanhmuc` (`tendanhmuc`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hd_idban` (`idban`);

--
-- Chỉ mục cho bảng `khuvuc`
--
ALTER TABLE `khuvuc`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `monan`
--
ALTER TABLE `monan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_danhmuc` (`iddanhmuc`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ban`
--
ALTER TABLE `ban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `chitietban`
--
ALTER TABLE `chitietban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT cho bảng `khuvuc`
--
ALTER TABLE `khuvuc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `monan`
--
ALTER TABLE `monan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ban`
--
ALTER TABLE `ban`
  ADD CONSTRAINT `ban_ibfk_1` FOREIGN KEY (`idkhuvuc`) REFERENCES `khuvuc` (`id`);

--
-- Các ràng buộc cho bảng `chitietban`
--
ALTER TABLE `chitietban`
  ADD CONSTRAINT `chitietban_ibfk_1` FOREIGN KEY (`idban`) REFERENCES `ban` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitietban_ibfk_2` FOREIGN KEY (`idmonan`) REFERENCES `monan` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`idhoadon`) REFERENCES `hoadon` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitiethoadon_ibfk_2` FOREIGN KEY (`idmonan`) REFERENCES `monan` (`id`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`idban`) REFERENCES `ban` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
