-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 12:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `be_fashion`
--

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `discount_percent` varchar(255) NOT NULL COMMENT 'Phần trăm giảm giá',
  `max_discount` decimal(15,0) NOT NULL,
  `max_set` bigint(20) NOT NULL COMMENT 'Số lượng mã tối đa user có thể lưu',
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `thumbnail` varchar(255) DEFAULT NULL,
  `quantity` bigint(20) NOT NULL,
  `number_used` bigint(20) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT '2024-10-29 19:30:21',
  `end_time` timestamp NOT NULL DEFAULT '2024-10-30 19:30:21',
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `description`, `code`, `type`, `discount_percent`, `max_discount`, `max_set`, `status`, `thumbnail`, `quantity`, `number_used`, `start_time`, `end_time`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Đồng hồ thông minh Xiaomi Redmi Watch 5 Lite', 'qưewqeqwewqeqw', 'ZI30r08O', 'Đặc biệt', '10', 1000000, 2, 'ĐÃ XOÁ', NULL, 100, 0, '2024-10-11 09:08:00', '2024-10-25 09:08:00', 2, '2024-10-31 02:08:27', '2024-10-31 02:21:40'),
(2, 'Ưu đãi tài khoản', 'Ưu đãi tài khoản', 'yob4t0rU', 'Đặc biệt', '20', 150000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/uwWzxvU8dtRxbdXbJuKXe8RMC3HJJPx5q32u1NGP.jpg', 1000000, 0, '2024-10-25 09:09:00', '2024-11-09 09:09:00', 2, '2024-10-31 02:09:29', '2024-10-31 02:16:01'),
(3, 'Mã giảm giá đặc biệt', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'sUVSOdJE', 'Đặc biệt', '15', 100000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/COq8PRtUjurD3HOUET8LFDxMEcjTEbmAxrfPK7De.jpg', 100000, 0, '2024-10-31 11:11:00', '2024-11-09 11:11:00', 2, '2024-10-31 04:12:02', '2024-10-31 04:12:02'),
(4, 'Mã miễn phí vận chuyển và giảm giá', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Q6oS6FZo', 'miễn phí vận chuyển', '10', 50000, 5, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/vHwLbs85K2JhCk8gAWJhqIwNI0Gc0w82W6nyN4Ah.jpg', 1000000, 0, '2024-10-08 11:12:00', '2024-10-25 11:12:00', 2, '2024-10-31 04:13:07', '2024-10-31 04:13:59'),
(5, 'Siêu ưu đãi toàn bộ ngành hàng', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'rb8mIMBZ', 'Ưu đãi', '12', 100000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/Zkgg3G01k692jk5qzoEqFfQ3zLWWTW4gAEkI3X8X.jpg', 100, 0, '2024-10-31 11:14:00', '2024-11-09 11:14:00', 2, '2024-10-31 04:14:58', '2024-10-31 04:14:58'),
(6, 'Giảm tối đa 300k Đơn Tối Thiểu 0₫', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'UpR8i49I', 'Đặc biệt', '50', 300000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/pEqz5pqDWOhQ3w5LjtKjrNZHAasRGaSaiakFcMxJ.jpg', 100000000, 0, '2024-10-12 11:15:00', '2024-12-28 11:15:00', 2, '2024-10-31 04:16:06', '2024-10-31 04:16:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`),
  ADD KEY `coupons_created_by_foreign` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
