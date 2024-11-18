-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 10:26 AM
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
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Màu sắc(Color)', 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:01:37', '2024-11-05 11:01:37'),
(2, 'Kích thước(Size)', 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:01:44', '2024-11-05 11:01:44'),
(3, 'Chất liệu(Material)', 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:01:50', '2024-11-05 11:01:50'),
(4, 'Xuất xứ(Origin)', 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:02:55', '2024-11-05 11:02:55');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `values` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `product_id`, `quantity`, `user_id`, `values`, `created_at`, `updated_at`) VALUES
(14, 4, 1, 1, '18', '2024-11-07 04:01:08', '2024-11-07 04:01:08');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `thumbnail` longtext NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` bigint(20) DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `thumbnail`, `parent_id`, `deleted_at`, `deleted_by`, `created_by`, `updated_by`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Dày dép', 'http://127.0.0.1:8000/storage/category/CFs1dlOQNbTqwamqeIZZFkILzGUxzBTlSaN9fIKB.jpg', NULL, NULL, NULL, 2, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 10:58:55', '2024-11-05 10:58:55'),
(2, 'Phụ kiện', 'http://127.0.0.1:8000/storage/category/GXJawwCS3zkbMP3TS7Vd8oH3akOqlZ1GSXemYUql.jpg', NULL, NULL, NULL, 2, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 10:59:12', '2024-11-05 10:59:12'),
(3, 'Mắt kính', 'http://127.0.0.1:8000/storage/category/hDWYSmykW6ycE87FSBhGZt4JhdZKxGuTLQGBNK3D.jpg', NULL, NULL, NULL, 2, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 10:59:24', '2024-11-05 10:59:24'),
(4, 'Quần áo', 'http://127.0.0.1:8000/storage/category/FKevIk0jh4khNW7GZ1MA3lBa0J286LIhBKhFqiJc.jpg', NULL, NULL, NULL, 2, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 10:59:51', '2024-11-05 10:59:51'),
(5, 'Túi sách & Ví', 'http://127.0.0.1:8000/storage/category/1DKA7rcSNoH5fXX5mZUPB6ehXUxPo1FAqVp78syA.jpg', NULL, NULL, NULL, 2, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:00:44', '2024-11-05 11:00:44');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'CHỜ PHÊ DUYỆT',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `start_time` timestamp NOT NULL DEFAULT '2024-11-05 10:54:42',
  `end_time` timestamp NOT NULL DEFAULT '2024-11-06 10:54:42',
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `min_total` decimal(15,0) NOT NULL DEFAULT 0 COMMENT 'số tiền tối thiếu của đơn hàng để dùng mã giảm giá'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `description`, `code`, `type`, `discount_percent`, `max_discount`, `max_set`, `status`, `thumbnail`, `quantity`, `number_used`, `start_time`, `end_time`, `created_by`, `created_at`, `updated_at`, `min_total`) VALUES
(1, 'Giảm 10% Giảm tối đa ₫12k Đơn Tối Thiểu ₫99k', 'Giảm 10% Giảm tối đa ₫12k\r\nĐơn Tối Thiểu ₫99k', 'xL2MSksu', 'Đặc biệt', '10', 120000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/RvsrqXgf9dYlaTmCgkzpcNYsOxazqcWrWaZe6zuz.jpg', 1000, 0, '2024-11-01 11:51:00', '2024-11-30 11:51:00', 2, '2024-11-05 11:52:16', '2024-11-05 11:52:16', 99000),
(2, 'Giảm 15% Đơn Tối Thiểu ₫0', 'Giảm 15%\r\nĐơn Tối Thiểu ₫0', 'xNp4xNMd', 'Đặc biệt', '15', 10000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/7Fbsmv7ccZcwNgCm329FGBC5MASKWOvMV1vU172j.jpg', 100, 0, '2024-11-01 11:52:00', '2024-11-30 11:52:00', 2, '2024-11-05 11:53:09', '2024-11-05 11:53:09', 0),
(3, 'Giảm 10% Đơn Tối Thiểu ₫0', 'Giảm 10%\r\nĐơn Tối Thiểu ₫0', 'yzpIhePz', 'Ưu đãi', '10', 10000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/TAGP6Hxe3g1HDyuQO9yuTfCHbebEOJQ8uIEXDGLl.jpg', 100, 0, '2024-11-01 11:53:00', '2024-11-30 11:53:00', 2, '2024-11-05 11:53:48', '2024-11-05 11:53:48', 0),
(4, 'Giảm ₫1,7tr Đơn Tối Thiểu ₫0', 'Giảm ₫1,7tr\r\nĐơn Tối Thiểu ₫0', 'W8JID7fC', 'Đặc biệt', '50', 1700000, 1, 'ĐANG HOẠT ĐỘNG', 'http://127.0.0.1:8000/storage/coupon/8S8kSKloQjNKVUPIK2rD1v7gAXNiq1S1C2OXbBrw.jpg', 1000, 0, '2024-11-02 11:55:00', '2024-11-30 11:55:00', 2, '2024-11-05 11:55:37', '2024-11-05 11:55:37', 10000000);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_02_07_014934_create_roles_table', 1),
(6, '2024_02_07_015259_create_role_users_table', 1),
(7, '2024_10_02_065509_create_categories_table', 1),
(8, '2024_10_02_074423_create_products_table', 1),
(9, '2024_10_02_074850_insert_column_in_users_table', 1),
(10, '2024_10_02_081336_create_attributes_table', 1),
(11, '2024_10_02_081345_create_properties_table', 1),
(12, '2024_10_02_081409_create_product_options_table', 1),
(13, '2024_10_02_082305_create_carts_table', 1),
(14, '2024_10_02_101749_insert_column_in_properties_table', 1),
(15, '2024_10_09_041334_create_reviews_table', 1),
(16, '2024_10_09_042901_create_orders_table', 1),
(17, '2024_10_09_042904_create_order_items_table', 1),
(18, '2024_10_09_061158_create_revenues_table', 1),
(19, '2024_10_29_161216_create_coupons_table', 1),
(20, '2024_10_29_161223_create_my_coupons_table', 1),
(21, '2024_10_31_112403_insert_column_in_orders_table', 1),
(22, '2024_11_04_020231_create_contacts_table', 1),
(23, '2024_11_05_174743_insert_column_in_coupons_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `my_coupons`
--

CREATE TABLE `my_coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'CHƯA SỬ DỤNG',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `my_coupons`
--

INSERT INTO `my_coupons` (`id`, `user_id`, `coupon_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 'CHƯA SỬ DỤNG', '2024-11-05 11:58:05', '2024-11-05 11:58:05'),
(2, 1, 3, 'CHƯA SỬ DỤNG', '2024-11-05 11:58:07', '2024-11-05 11:58:07'),
(3, 1, 2, 'CHƯA SỬ DỤNG', '2024-11-05 11:58:09', '2024-11-05 11:58:09'),
(4, 1, 1, 'CHƯA SỬ DỤNG', '2024-11-05 11:58:11', '2024-11-05 11:58:11');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `reason_cancel` varchar(255) DEFAULT NULL,
  `products_price` decimal(15,0) NOT NULL COMMENT 'Giá toàn bộ sản phẩm',
  `shipping_price` decimal(15,0) NOT NULL COMMENT 'Giá tiền phí vận chuyển',
  `discount_price` decimal(15,0) NOT NULL COMMENT 'Giá tiền giảm giá',
  `total_price` decimal(15,0) NOT NULL COMMENT 'Tổng tiền thanh toán',
  `notes` longtext DEFAULT NULL COMMENT 'Ghi chú của khách hàng',
  `order_method` varchar(255) NOT NULL DEFAULT 'Thanh toán khi nhận hàng',
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG XỬ LÝ',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `coupon_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `full_name`, `email`, `phone`, `address`, `reason_cancel`, `products_price`, `shipping_price`, `discount_price`, `total_price`, `notes`, `order_method`, `status`, `created_at`, `updated_at`, `coupon_id`) VALUES
(1, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Gần hồ Tây, Tây Hồ, Hà Nội', NULL, 11160000, 0, 0, 11160000, 'ok', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:29:48', '2024-11-07 02:33:41', NULL),
(2, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Gần hồ Tây, Tây Hồ, Hà Nội', NULL, 800000, 0, 0, 800000, 'y', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:30:07', '2024-11-07 02:33:48', NULL),
(3, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, 43534', NULL, 10800000, 0, 0, 10800000, 'ok', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:30:28', '2024-11-07 02:33:54', NULL),
(4, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Hai Phong, Hai Phong, Hai Phong, Hai Phong', NULL, 3110000, 0, 0, 3110000, '444', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:30:59', '2024-11-07 02:34:02', NULL),
(5, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Hai Phong, Hai Phong, Hai Phong, Hai Phong', NULL, 160000, 0, 0, 160000, 'sss', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:31:21', '2024-11-07 02:34:10', NULL),
(6, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Gần hồ Tây, Tây Hồ, Hà Nội', NULL, 888000, 0, 0, 888000, 'a', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:31:37', '2024-11-07 02:34:19', NULL),
(7, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, 34', NULL, 1260000, 0, 0, 1260000, '345', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:32:15', '2024-11-07 02:34:59', NULL),
(8, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, 535345', NULL, 1960000, 0, 0, 1960000, '34543', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:32:36', '2024-11-07 02:35:07', NULL),
(9, 1, 'user', 'user@gmail.com', '0989889889', 'HAIPHONG, Gần hồ Tây, Tây Hồ, Hà Nội', NULL, 24442000, 0, 0, 24442000, 't', 'Thanh toán khi nhận hàng', 'ĐÃ HOÀN THÀNH', '2024-11-07 02:33:00', '2024-11-07 02:33:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `value` varchar(255) NOT NULL COMMENT 'Thuộc tính sản phẩm',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `value`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 1, 160000, '18', '2024-11-07 02:29:48', '2024-11-07 02:29:48'),
(2, 1, 6, 10, 1100000, '25', '2024-11-07 02:29:48', '2024-11-07 02:29:48'),
(3, 2, 4, 5, 160000, '18', '2024-11-07 02:30:07', '2024-11-07 02:30:07'),
(4, 3, 5, 6, 1800000, '21', '2024-11-07 02:30:28', '2024-11-07 02:30:28'),
(5, 4, 1, 1, 2222000, '1', '2024-11-07 02:30:59', '2024-11-07 02:30:59'),
(6, 4, 3, 1, 888000, '11', '2024-11-07 02:30:59', '2024-11-07 02:30:59'),
(7, 5, 4, 1, 160000, '18', '2024-11-07 02:31:21', '2024-11-07 02:31:21'),
(8, 6, 3, 1, 888000, '11', '2024-11-07 02:31:37', '2024-11-07 02:31:37'),
(9, 7, 4, 1, 160000, '18', '2024-11-07 02:32:15', '2024-11-07 02:32:15'),
(10, 7, 6, 1, 1100000, '25', '2024-11-07 02:32:15', '2024-11-07 02:32:15'),
(11, 8, 4, 1, 160000, '18', '2024-11-07 02:32:36', '2024-11-07 02:32:36'),
(12, 8, 5, 1, 1800000, '21', '2024-11-07 02:32:36', '2024-11-07 02:32:36'),
(13, 9, 1, 11, 2222000, '1', '2024-11-07 02:33:00', '2024-11-07 02:33:00');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_description` longtext NOT NULL,
  `description` longtext NOT NULL,
  `thumbnail` longtext NOT NULL,
  `gallery` longtext NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `sale_price` decimal(15,0) NOT NULL,
  `quantity` bigint(20) NOT NULL DEFAULT 1,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `deleted_by` bigint(20) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `description`, `thumbnail`, `gallery`, `price`, `sale_price`, `quantity`, `category_id`, `created_by`, `updated_by`, `deleted_by`, `deleted_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Áo Khoác Không Nón Vải Kaki Mặc Ấm Trơn Dáng Rộng Đơn Giản PREMIUM 73 Vol 24', '<p>&Aacute;o Kho&aacute;c Kh&ocirc;ng N&oacute;n Vải Kaki Mặc Ấm Trơn D&aacute;ng Rộng Đơn Giản PREMIUM 73 Vol 24</p>', '<p>1. Kiểu sản phẩm: &Aacute;o kho&aacute;c kh&ocirc;ng n&oacute;n,<br>2. Ưu điểm:<br>&bull; Giữ ấm, tr&aacute;nh nắng, thấm h&uacute;t mồ h&ocirc;i tốt,<br>&bull; Chất vải d&agrave;y dặn, lu&ocirc;n giữ được form &aacute;o như mới, mang lại vẻ ngo&agrave;i bụi bặm, năng động dễ phối với nhiều kiểu &aacute;o trong.<br>&bull; Nhiều m&agrave;u sắc để lựa chọn.<br>3. Chất liệu: Vải Denim (100% Cotton)<br>4. Kỹ thuật: N&uacute;t c&agrave;i bạc thời trang v&agrave; chắc chắn c&oacute; logo thương hiệu độc quyền.<br>5. Ph&ugrave; hợp với ai: Chất liệu n&agrave;y mang lại vẻ ngo&agrave;i vừa lịch l&atilde;m, vừa năng động, ph&ugrave; hợp với nhiều phong c&aacute;ch thời trang kh&aacute;c nhau.<br>6. Thuộc Bộ Sưu Tập: Premium, thời trang đẹp như may đo, chất liệu xịn, phụ kiện đi k&egrave;m sang trọng, c&oacute; gần 10 size kh&aacute;c nhau để vừa kh&iacute;t với từng người.<br>7. C&aacute;c t&ecirc;n thường gọi hoặc t&igrave;m kiếm: &Aacute;o kho&aacute;c kaki, &aacute;o kho&aacute;c jean, &aacute;o kho&aacute;c nam, &aacute;o kho&aacute;c kh&ocirc;ng n&oacute;n, &aacute;o jacket.</p>', 'http://127.0.0.1:8000/storage/product/8TtBYdUEOqi6Lft1a7mXMfNR5XqMrNBIAjfG7vJy.jpg', 'http://127.0.0.1:8000/storage/product/jk4st6aKkNBpF6fj82EAjk6sise7AT0vbWOwIosd.jpg,http://127.0.0.1:8000/storage/product/M2SfjehkxrpAtVfqczKtGodP1tU3SDGh5aC7izLY.jpg,http://127.0.0.1:8000/storage/product/VkfY1ImgMIoRfu9hAWV3DsdKi0t0wAiHrPehtJBw.jpg,http://127.0.0.1:8000/storage/product/Hzs8fcunuF1YEUUA5VlqUuIzxuIlwz8PqYs4faJa.jpg', 2400000, 2199000, 100, 4, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:18:09', '2024-11-05 18:21:35'),
(2, '(Mới) Mã D2003 Giá 1220K: Áo Khoác Nam Shryq Hàng Mùa Xuân Thu Đông Trung Niên Phục Cổ Cổ Điển Dày Ấm Thời Trang Nam Chất Liệu Vải Bông G04 Sản Phẩm Mới, (Miễn Phí Vận Chuyển Toàn Quốc).', '<h4 class=\"hidden-sm hidden-xs\">(Mới) M&atilde; D2003 Gi&aacute; 1220K: &Aacute;o Kho&aacute;c Nam Shryq H&agrave;ng M&ugrave;a Xu&acirc;n Thu Đ&ocirc;ng Trung Ni&ecirc;n Phục Cổ Cổ Điển D&agrave;y Ấm Thời Trang Nam Chất Liệu Vải B&ocirc;ng G04 Sản Phẩm Mới, (Miễn Ph&iacute; Vận Chuyển To&agrave;n Quốc).</h4>', '<p><img src=\"https://cbu01.alicdn.com/img/ibank/O1CN01spBvfP2MqdW55M6EH_!!2458389879-0-cib.jpg\"></p>', 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', 'http://127.0.0.1:8000/storage/product/uNAaJxIHLAeknvQeRy2EBMYzG2GR8k6DyWcPMHeu.jpg,http://127.0.0.1:8000/storage/product/8pQsWvWsOlpuNPpAXar3s6npUPXeem5vSq7ms15n.jpg,http://127.0.0.1:8000/storage/product/xdoZLYGzzLEaWf0ms7Oxy3ACtJrNjLwngWWWUIC2.jpg', 1300000, 1200000, 100, 4, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:25:52', '2024-11-05 18:25:52'),
(3, 'Áo polo nam cao cấp LPS096S4', '<p>- Kh&aacute;ch h&agrave;ng được sửa chữa miễn ph&iacute; trong trường hợp sản phẩm lỗi từ ph&iacute;a nh&agrave; sản xuất: đứt chỉ, bong chỉ, hư kho&aacute;, mất c&uacute;c, l&agrave; phẳng<br>- Đổi mới sản phẩm nếu sản phẩm kh&aacute;ch mua bị r&aacute;ch vải, x&ugrave; vải do lỗi nh&agrave; sản xuất<br>- Đổi mới sản phẩm nếu sản phẩm kh&aacute;ch mua bị ra m&agrave;u nhiều dẫn tới bạc vải, phai m&agrave;u sang m&agrave;u phối c&ugrave;ng (đối với quần/&aacute;o phối m&agrave;u)<br>- Đối với bộ đồ (bộ nỉ, bộ gi&oacute;) nếu sản phẩm bị lỗi &aacute;o hoặc quần th&igrave; sẽ bảo h&agrave;nh theo sản phẩm &aacute;o hoặc quần bị lỗi chứ kh&ocirc;ng bảo h&agrave;nh nguy&ecirc;n bộ.</p>', '<h3 class=\"title_info\">Th&ocirc;ng tin chi tiết</h3>\r\n<p class=\"title-info\">M&ocirc; tả chi tiết về sản phẩm</p>\r\n<p class=\"item-info\"><span class=\"left-tag\">Thương hiệu</span><span class=\"right-tag\">Savani</span></p>\r\n<p class=\"item-info\"><span class=\"left-tag\">M&atilde; sản phẩm</span><span class=\"right-tag\">LPS096S4</span></p>\r\n<p class=\"item-info\"><span class=\"left-tag\">Chất liệu</span><span class=\"right-tag\">85% Polyamide, 15% Spandex</span></p>\r\n<p class=\"item-info\"><span class=\"left-tag\">Xuất xứ</span><span class=\"right-tag\">Việt Nam</span></p>\r\n<p class=\"item-info\"><span class=\"left-tag\">Kiểu d&aacute;ng</span><span class=\"right-tag\">Slim fit</span></p>\r\n<p class=\"item-info\"><span class=\"left-tag\">Ưu điểm</span><span class=\"right-tag\">&Aacute;o polo nam cao cấp fit d&aacute;ng, vừa vặn với th&acirc;n h&igrave;nh đi c&ugrave;ng với c&aacute;c khuyến m&atilde;i cực hấp dẫn</span></p>\r\n<div class=\"content\">\r\n<h3>Th&ocirc;ng tin sản phẩm:</h3>\r\n<ul>\r\n<li>M&atilde; sản phẩm: LPS096S4</li>\r\n<li>Kiểu d&aacute;ng: Slim fit</li>\r\n<li>M&agrave;u sắc: &nbsp;Xanh navy, Cam, Trắng</li>\r\n<li>Th&ocirc;ng số size: &nbsp;S- M - L - XL - &nbsp;XXL - XXXL</li>\r\n<li>Chất liệu vải: Polyamide<em>&nbsp;(L&agrave; sợi tổng hợp được tạo ra từ c&aacute;c sợi polyme, h&igrave;nh th&agrave;nh qua phản ứng cacbon trong than v&agrave; dầu th&ocirc; dưới nhiệt độ cao)</em></li>\r\n<li>Th&agrave;nh phần: 85% Polyamide, 15% Spandex</li>\r\n</ul>\r\n<p><img src=\"https://savani.vn/upload_images/images/2024/09/24/chi-tiet-san-pham-ao-polo-nam(3).png\" alt=\"Chi tiết sản phẩm &aacute;o polo nam\"></p>\r\n<h3>Đặc điểm nổi bật:</h3>\r\n<h4>Thiết kế:</h4>\r\n<p>-&nbsp;<a href=\"https://savani.vn/ao-polo-nam-pc7.html\"><strong>&Aacute;o polo</strong></a>&nbsp;kết hợp h&agrave;i h&ograve;a giữa sự lịch l&atilde;m của &aacute;o sơ mi v&agrave; sự thoải m&aacute;i của &aacute;o thun, tạo n&ecirc;n phong c&aacute;ch vừa thanh lịch vừa năng động.<br>- Với thiết kế cổ bẻ đặc trưng, &aacute;o polo mang đến vẻ ngo&agrave;i chỉn chu nhưng kh&ocirc;ng k&eacute;m phần thoải m&aacute;i, ph&ugrave; hợp cho cả m&ocirc;i trường c&ocirc;ng sở lẫn c&aacute;c buổi dạo phố, gặp gỡ bạn b&egrave;.</p>\r\n<p><img src=\"https://savani.vn/upload_images/images/2024/09/24/dac-diem-noi-bat-cua-ao-polo-nam(3).png\" alt=\"Đặc điểm nổi bật của &aacute;o polo nam\"></p>\r\n<h4>Chất liệu:</h4>\r\n<ul>\r\n<li>Vải polyamide sở hữu khả năng chống thấm nước vượt trội, gi&uacute;p ngăn chặn ẩm mốc v&agrave; vi khuẩn một c&aacute;ch hiệu quả, mang lại độ bền cao v&agrave; sự an to&agrave;n cho người sử dụng.</li>\r\n<li>Với bề mặt nhẵn b&oacute;ng v&agrave; mịn m&agrave;ng, vải polyamide c&oacute; t&iacute;nh ứng dụng cao trong nhiều lĩnh vực, mang đến vẻ đẹp tinh tế v&agrave; chất lượng vượt trội cho c&aacute;c sản phẩm.</li>\r\n</ul>\r\n<h4>Ứng dụng:</h4>\r\n<p>- &Aacute;o polo thường được l&agrave;m từ chất liệu cotton hoặc polyamide, mang lại cảm gi&aacute;c tho&aacute;ng m&aacute;t v&agrave; dễ chịu cho người mặc. Chất liệu bền bỉ, &iacute;t nhăn v&agrave; dễ chăm s&oacute;c, gi&uacute;p &aacute;o polo giữ được vẻ đẹp l&acirc;u d&agrave;i v&agrave; lu&ocirc;n trong trạng th&aacute;i ho&agrave;n hảo. Đ&acirc;y ch&iacute;nh l&agrave; lựa chọn l&yacute; tưởng cho những ai t&igrave;m kiếm sự kết hợp giữa thời trang v&agrave; tiện lợi.</p>\r\n<p><img src=\"https://savani.vn/upload_images/images/2024/09/24/cac-uu-diem-cua-ao-polo-nam(3).png\" alt=\"C&aacute;c ưu điểm của &aacute;o polo nam\"></p>\r\n<h3>C&aacute;ch bảo quản &aacute;o polo nam đ&uacute;ng c&aacute;ch:&nbsp;</h3>\r\n<p>Mọi trang phục đều c&oacute; tuổi thọ nhất định. Nhưng nếu biết c&aacute;ch bạn c&oacute; thể giữ được form d&aacute;ng chuẩn v&agrave; k&eacute;o d&agrave;i được thời gian sử dụng của &aacute;o polo l&acirc;u hơn.</p>\r\n<ol>\r\n<li>Ph&acirc;n loại trước khi giặt.&nbsp;</li>\r\n<li>Chọn chế độ giặt nhẹ đối với m&aacute;y giặt</li>\r\n<li>Lộn tr&aacute;i sản phẩm để giặt v&agrave; phơi</li>\r\n<li>Sử dụng nước lạnh để giặt, kh&ocirc;ng ng&acirc;m l&acirc;u trong h&oacute;a chất</li>\r\n<li>D&ugrave;ng m&oacute;c để phơi đồ</li>\r\n<li>N&ecirc;n để kh&ocirc; tự nhi&ecirc;n v&agrave; kh&ocirc;ng phơi trực tiếp dưới &aacute;nh nắng mặt trời.</li>\r\n</ol>\r\n<h3>Ch&iacute;nh s&aacute;ch đổi trả:</h3>\r\n<ul>\r\n<li>&Aacute;p dụng đổi h&agrave;ng trong c&aacute;c trường hợp sản phẩm kh&aacute;ch mua kh&ocirc;ng hợp size, số, m&agrave;u sắc, kiểu d&aacute;ng</li>\r\n<li>Sản phẩm c&ograve;n nguy&ecirc;n vẹn, nguy&ecirc;n tem m&aacute;c, chưa giặt, chưa qua sử dụng v&agrave; sửa chữa</li>\r\n<li>Sản phẩm mua kh&ocirc;ng nằm trong nh&oacute;m sản phẩm sale sốc</li>\r\n<li>Gi&aacute; trị sản phẩm đổi: bằng hoặc cao hơn gi&aacute; trị sản phẩm đ&atilde; mua trước đ&oacute;</li>\r\n</ul>\r\n<p><img src=\"https://savani.vn/upload_images/images/2024/09/24/chinh-sach-mua-hang-tai-savani(3).png\" alt=\"Ch&iacute;nh s&aacute;ch mua h&agrave;ng tại Savani\"></p>\r\n<h3>Ch&iacute;nh s&aacute;ch bảo h&agrave;nh:</h3>\r\n<p>- Kh&aacute;ch h&agrave;ng được sửa chữa miễn ph&iacute; trong trường hợp sản phẩm lỗi từ ph&iacute;a nh&agrave; sản xuất: đứt chỉ, bong chỉ, hư kho&aacute;, mất c&uacute;c, l&agrave; phẳng<br>- Đổi mới sản phẩm nếu sản phẩm kh&aacute;ch mua bị r&aacute;ch vải, x&ugrave; vải do lỗi nh&agrave; sản xuất<br>- Đổi mới sản phẩm nếu sản phẩm kh&aacute;ch mua bị ra m&agrave;u nhiều dẫn tới bạc vải, phai m&agrave;u sang m&agrave;u phối c&ugrave;ng (đối với quần/&aacute;o phối m&agrave;u)<br>- Đối với bộ đồ (bộ nỉ, bộ gi&oacute;) nếu sản phẩm bị lỗi &aacute;o hoặc quần th&igrave; sẽ bảo h&agrave;nh theo sản phẩm &aacute;o hoặc quần bị lỗi chứ kh&ocirc;ng bảo h&agrave;nh nguy&ecirc;n bộ.</p>\r\n<h3>QUY ĐỊNH VỀ PH&Iacute; VẬN CHUYỂN ĐỐI VỚI ĐƠN H&Agrave;NG ONLINE</h3>\r\n<ul>\r\n<li><a href=\"https://savani.vn/\"><strong>Savani</strong></a>&nbsp;hỗ trợ ph&iacute; đổi h&agrave;ng 2 chiều cho c&aacute;c đơn h&agrave;ng online trong trường hợp: h&agrave;ng bị lỗi từ nh&agrave; sản xuất, giao kh&ocirc;ng đ&uacute;ng mẫu hoặc kh&ocirc;ng đ&uacute;ng size kh&aacute;ch y&ecirc;u cầu</li>\r\n<li>Free ship với tất cả c&aacute;c đơn h&agrave;ng c&oacute; gi&aacute; trị từ 499.000đ trở l&ecirc;n.</li>\r\n<li>Hỗ trợ đổi h&agrave;ng trong v&ograve;ng 30 ng&agrave;y v&agrave; miễn ph&iacute; tại tất cả chi nh&aacute;nh thuộc hệ thống thời trang Savani</li>\r\n</ul>\r\n</div>', 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', 'http://127.0.0.1:8000/storage/product/ZZFtyNm50R9tKa9gdT1Oe5FgoJzZLtN6wBA1BEBl.webp,http://127.0.0.1:8000/storage/product/sSwCgkoOEv2SJ3BfpOTfuPswte4ad7LXjXF6pLO7.webp,http://127.0.0.1:8000/storage/product/GxfF4AK3LXKaTWgtCjin90W9vgoX2w29hNu6Ts2U.webp', 900000, 800000, 100, 4, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:31:08', '2024-11-05 18:31:08'),
(4, '(Mới) Mã B6195 Giá 2310K: Dây Lưng Nam Gutde Đồng Hồ Phụ Kiện Nam Chất Liệu Da Bò G05 Sản Phẩm Mới, (Miễn Phí Vận Chuyển Toàn Quốc).', '<h4 class=\"hidden-sm hidden-xs\">(Mới) M&atilde; B6195 Gi&aacute; 2310K: D&acirc;y Lưng Nam Gutde Đồng Hồ Phụ Kiện Nam Chất Liệu Da B&ograve; G05 Sản Phẩm Mới, (Miễn Ph&iacute; Vận Chuyển To&agrave;n Quốc).</h4>', '<p><img src=\"https://cbu01.alicdn.com/img/ibank/O1CN01NBUdgh1rUsc9zneJS_!!3841055635-0-cib.jpg\"></p>', 'http://127.0.0.1:8000/storage/product/p4tsi32WUJEcW0X6KvSa3BCoto8OtWvZMevxG1nt.jpg', 'http://127.0.0.1:8000/storage/product/MnMQG3O1TTGa66XNsTTcDLmmqEUvGaXKiCOpCYjq.jpg,http://127.0.0.1:8000/storage/product/kYoIH0bODfOp0c6BtOLu2LaulRkjmIFIw2PmG3Ae.jpg,http://127.0.0.1:8000/storage/product/M5YMHZUMagZI3aIYQc8lLqHcu9UNFGhD8S74XAdl.jpg', 500000, 500000, 100, 2, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:33:50', '2024-11-05 18:33:50'),
(5, '(Mới) Mã B9139 Giá 1300K: Quần Nam Sutder Big Size Ngoại Cỡ Hàng Mùa Hè Trung Niên Thời Trang Nam Chất Liệu G04 Sản Phẩm Mới, (Miễn Phí Vận Chuyển Toàn Quốc).', '<p>(Mới) M&atilde; B9139 Gi&aacute; 1300K: Quần Nam Sutder Big Size Ngoại Cỡ H&agrave;ng M&ugrave;a H&egrave; Trung Ni&ecirc;n Thời Trang Nam Chất Liệu G04 Sản Phẩm Mới, (Miễn Ph&iacute; Vận Chuyển To&agrave;n Quốc).</p>', '<p><img src=\"https://cbu01.alicdn.com/img/ibank/O1CN01G01dnm1spmSn6FbMP_!!2206365235816-0-cib.jpg\"></p>', 'http://127.0.0.1:8000/storage/product/Hf0nBMziT9u1Bm65bPmga9fiqT7giPvbdsjlWiE6.jpg', 'http://127.0.0.1:8000/storage/product/drZ0QW6pWsII5AkH5t2L6fSs2ozdpLzlQX5NEkAR.jpg,http://127.0.0.1:8000/storage/product/gZQmrO7CoShJ9lOaXWeqYIl0dEItMhTMWXqiDk4G.jpg,http://127.0.0.1:8000/storage/product/LDDUKoiUU7okT10zhOH9baChvwIieW1mRxXisxpH.jpg', 1900000, 1800000, 100, 4, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:37:00', '2024-11-05 18:37:00'),
(6, '(Mới) Mã L2649 Giá 1220K: Áo Khoác Nam Sutdai Hàng Mùa Xuân Thu Đông Trung Niên Thời Trang Nam Chất Liệu G04 Sản Phẩm Mới, (Miễn Phí Vận Chuyển Toàn Quốc).', '<h4 class=\"hidden-sm hidden-xs\">(Mới) M&atilde; L2649 Gi&aacute; 1220K: &Aacute;o Kho&aacute;c Nam Sutdai H&agrave;ng M&ugrave;a Xu&acirc;n Thu Đ&ocirc;ng Trung Ni&ecirc;n Thời Trang Nam Chất Liệu G04 Sản Phẩm Mới, (Miễn Ph&iacute; Vận Chuyển To&agrave;n Quốc).</h4>', '<p><img src=\"https://188.com.vn/uploads/size-san-pham/bang-size-quan-ao.jpg\"></p>', 'http://127.0.0.1:8000/storage/product/NBihky1rmHhM52ykbagf1NHaHITyfgr2YXrjZepM.jpg', 'http://127.0.0.1:8000/storage/product/xsqFr8VBYtaVuH9VvnjEXyCTCOZ3WGzkR5xsg21w.jpg,http://127.0.0.1:8000/storage/product/t1DEt3hTMhLDPQtKGuvNVhWpVq9PrUZaLneXfATt.jpg,http://127.0.0.1:8000/storage/product/1xx9XIedRSjaO9nvDF3j1TBd2s0ke4OIECamdrDO.jpg', 1500000, 1200000, 389, 4, 2, 2, NULL, NULL, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:40:08', '2024-11-07 02:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `product_options`
--

CREATE TABLE `product_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `sale_price` decimal(15,0) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_options`
--

INSERT INTO `product_options` (`id`, `product_id`, `user_id`, `quantity`, `price`, `sale_price`, `thumbnail`, `value`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 88, 2400000, 2222000, 'http://127.0.0.1:8000/storage/product/8TtBYdUEOqi6Lft1a7mXMfNR5XqMrNBIAjfG7vJy.jpg', '[{\"attribute_item\":\"4\",\"property_item\":\"7\"},{\"attribute_item\":\"3\",\"property_item\":\"17\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"1\"}]', '', '2024-11-05 11:21:35', '2024-11-07 02:33:00'),
(2, 1, 2, 120, 2399998, 2250000, 'http://127.0.0.1:8000/storage/product/8TtBYdUEOqi6Lft1a7mXMfNR5XqMrNBIAjfG7vJy.jpg', '[{\"attribute_item\":\"4\",\"property_item\":\"7\"},{\"attribute_item\":\"3\",\"property_item\":\"17\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"2\"}]', '', '2024-11-05 11:21:35', '2024-11-05 11:21:35'),
(3, 1, 2, 150, 2399999, 2198999, 'http://127.0.0.1:8000/storage/product/8TtBYdUEOqi6Lft1a7mXMfNR5XqMrNBIAjfG7vJy.jpg', '[{\"attribute_item\":\"4\",\"property_item\":\"7\"},{\"attribute_item\":\"3\",\"property_item\":\"17\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"1\"}]', '', '2024-11-05 11:21:35', '2024-11-05 11:21:35'),
(4, 1, 2, 100, 2400000, 2100002, 'http://127.0.0.1:8000/storage/product/8TtBYdUEOqi6Lft1a7mXMfNR5XqMrNBIAjfG7vJy.jpg', '[{\"attribute_item\":\"4\",\"property_item\":\"7\"},{\"attribute_item\":\"3\",\"property_item\":\"17\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"2\"}]', '', '2024-11-05 11:21:35', '2024-11-05 11:21:35'),
(5, 2, 2, 102, 1300000, 1210001, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"5\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(6, 2, 2, 100, 1300000, 1000000, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"4\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(7, 2, 2, 100, 1300000, 1100000, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"3\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(8, 2, 2, 100, 1300000, 1090001, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"5\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(9, 2, 2, 100, 1300000, 1100000, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"4\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(10, 2, 2, 100, 1300000, 1110000, 'http://127.0.0.1:8000/storage/product/X7IdxdCFq7pmundZvpOZVBBhzlOWpamblDjdF3Cx.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"3\"}]', '', '2024-11-05 11:25:52', '2024-11-05 11:25:52'),
(11, 3, 2, 98, 900000, 888000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"2\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:31:08', '2024-11-07 02:31:37'),
(12, 3, 2, 100, 900000, 850000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"3\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(13, 3, 2, 100, 900000, 800001, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"4\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(14, 3, 2, 100, 900000, 888000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"5\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(15, 3, 2, 100, 900000, 850000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"2\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(16, 3, 2, 100, 900000, 888000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"4\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(17, 3, 2, 100, 900000, 899000, 'http://127.0.0.1:8000/storage/product/eCXPhpllPl8TaiEcOx3uJhrIQIA91WAzLh8QIkp1.webp', '[{\"attribute_item\":\"1\",\"property_item\":\"3\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"}]', '', '2024-11-05 11:31:08', '2024-11-05 11:31:08'),
(18, 4, 2, 91, 190000, 160000, 'http://127.0.0.1:8000/storage/product/p4tsi32WUJEcW0X6KvSa3BCoto8OtWvZMevxG1nt.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"5\"}]', '', '2024-11-05 11:33:50', '2024-11-07 02:32:36'),
(19, 4, 2, 100, 190000, 170000, 'http://127.0.0.1:8000/storage/product/p4tsi32WUJEcW0X6KvSa3BCoto8OtWvZMevxG1nt.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"1\"}]', '', '2024-11-05 11:33:50', '2024-11-05 11:33:50'),
(20, 4, 2, 100, 190000, 180000, 'http://127.0.0.1:8000/storage/product/p4tsi32WUJEcW0X6KvSa3BCoto8OtWvZMevxG1nt.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"2\"}]', '', '2024-11-05 11:33:50', '2024-11-05 11:33:50'),
(21, 5, 2, 93, 1900000, 1800000, 'http://127.0.0.1:8000/storage/product/Hf0nBMziT9u1Bm65bPmga9fiqT7giPvbdsjlWiE6.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"2\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:37:00', '2024-11-07 02:32:36'),
(22, 5, 2, 100, 1900000, 1799999, 'http://127.0.0.1:8000/storage/product/Hf0nBMziT9u1Bm65bPmga9fiqT7giPvbdsjlWiE6.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"2\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"}]', '', '2024-11-05 11:37:00', '2024-11-05 11:37:00'),
(23, 5, 2, 100, 1900000, 1699999, 'http://127.0.0.1:8000/storage/product/Hf0nBMziT9u1Bm65bPmga9fiqT7giPvbdsjlWiE6.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"5\"},{\"attribute_item\":\"2\",\"property_item\":\"13\"}]', '', '2024-11-05 11:37:00', '2024-11-05 11:37:00'),
(24, 5, 2, 100, 1900000, 1500000, 'http://127.0.0.1:8000/storage/product/Hf0nBMziT9u1Bm65bPmga9fiqT7giPvbdsjlWiE6.jpg', '[{\"attribute_item\":\"1\",\"property_item\":\"5\"},{\"attribute_item\":\"2\",\"property_item\":\"12\"}]', '', '2024-11-05 11:37:00', '2024-11-05 11:37:00'),
(27, 6, 2, 189, 1500000, 1100000, 'http://127.0.0.1:8000/storage/product/NBihky1rmHhM52ykbagf1NHaHITyfgr2YXrjZepM.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"13\"},{\"attribute_item\":\"1\",\"property_item\":\"2\"}]', '', '2024-11-07 02:43:40', '2024-11-07 02:43:40'),
(28, 6, 2, 200, 1500000, 1000000, 'http://127.0.0.1:8000/storage/product/NBihky1rmHhM52ykbagf1NHaHITyfgr2YXrjZepM.jpg', '[{\"attribute_item\":\"2\",\"property_item\":\"12\"},{\"attribute_item\":\"1\",\"property_item\":\"1\"}]', '', '2024-11-07 02:43:40', '2024-11-07 02:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `attribute_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `thumbnail` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `name`, `attribute_id`, `status`, `created_at`, `updated_at`, `thumbnail`) VALUES
(1, 'Màu đỏ', 1, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:05:20', '2024-11-05 11:05:20', 'http://127.0.0.1:8000/storage/property/7GG76euIO3MzjvQk2YWXD37m8DbaULDysZnJlASM.jpg'),
(2, 'Màu đen', 1, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:05:37', '2024-11-05 11:05:37', 'http://127.0.0.1:8000/storage/property/VldpLd8jjlJKGPri6dqPXIIbP9FshGkkGTCPJevT.jpg'),
(3, 'Màu xanh lá', 1, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:05:53', '2024-11-05 11:05:53', 'http://127.0.0.1:8000/storage/property/LzvnpnkAM866e9moJEEsFduYoFZCwlSqsd1KASu8.png'),
(4, 'Màu xanh nước biển', 1, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:06:07', '2024-11-05 11:06:07', 'http://127.0.0.1:8000/storage/property/pi7Ogv3trKQNXYiQ8GwGsTlxlTpHO77bPVsiUTfk.jpg'),
(5, 'Màu tím', 1, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:06:16', '2024-11-05 11:06:16', 'http://127.0.0.1:8000/storage/property/PLsTsKsGQPmg2CXGFiUI4x2G21bp1TM2MMQkHQ5v.jpg'),
(6, 'Nước ngoài', 4, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:08:10', '2024-11-05 11:08:10', 'http://127.0.0.1:8000/storage/property/OaPHAp6DZZLEc7hDnOK9DJxnNrDKcSYO4kcJBleX.jpg'),
(7, 'Trong nước', 4, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:08:21', '2024-11-05 11:08:21', 'http://127.0.0.1:8000/storage/property/0ifG1TQXJPN57ed2nw1sA3JaAWPy1SA3VVMJPpjf.jpg'),
(8, 'XS', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:11:51', '2024-11-05 11:11:51', 'http://127.0.0.1:8000/storage/property/LetUV0fq5gC2SpkUnWDgv1lQ0XXg2R14jGTI624c.png'),
(9, 'S', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:12:00', '2024-11-05 11:12:00', 'http://127.0.0.1:8000/storage/property/oGpjehBWN1L3TpkBPDZHhyKyO6TqnYeOsKoC56ZA.png'),
(10, 'M', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:12:17', '2024-11-05 11:12:17', 'http://127.0.0.1:8000/storage/property/biLqRKe0FZU9RbyizItCdliU8isgenBBjaQHjv9U.png'),
(11, 'L', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:12:29', '2024-11-05 11:12:29', 'http://127.0.0.1:8000/storage/property/sUCNYgU8c9oIlQTpZI7a8z6TGox4IQ9y7YTLnwL0.png'),
(12, 'XL', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:12:38', '2024-11-05 11:12:38', 'http://127.0.0.1:8000/storage/property/AsbFWyQku4YFoWhT2HyXBdVKoRKOBA6fh4mgS2KO.png'),
(13, 'XXL', 2, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:12:47', '2024-11-05 11:12:47', 'http://127.0.0.1:8000/storage/property/DQtrW84b25MEHuOxjHzNlmUHLztdDdLgjKxwiR0o.png'),
(14, 'Cotton', 3, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:14:44', '2024-11-05 11:14:44', 'http://127.0.0.1:8000/storage/property/k2jYSQ4PVy8EbeploOZUJkM1Vf4TjDU1oKGXWHAD.jpg'),
(15, 'Da', 3, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:15:06', '2024-11-05 11:15:06', 'http://127.0.0.1:8000/storage/property/dXgOI49TMjXfCilqW0lUjZWI24EUikbmVsegAv5c.jpg'),
(16, 'Gỗ', 3, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:15:15', '2024-11-05 11:15:15', 'http://127.0.0.1:8000/storage/property/J4O5gc0qZm7nzVZfySNz9b5xoIbzPRBpkDiDkFvG.jpg'),
(17, 'Vải thô', 3, 'ĐANG HOẠT ĐỘNG', '2024-11-05 11:16:10', '2024-11-05 11:16:10', 'http://127.0.0.1:8000/storage/property/wO5w8nxFHpVwpuXQLr3TPNTErM4M6sa8rrYsmL2m.png');

-- --------------------------------------------------------

--
-- Table structure for table `revenues`
--

CREATE TABLE `revenues` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `total` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL DEFAULT '5',
  `month` varchar(255) NOT NULL DEFAULT '11',
  `year` varchar(255) NOT NULL DEFAULT '2024',
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `revenues`
--

INSERT INTO `revenues` (`id`, `total`, `date`, `month`, `year`, `order_id`, `created_at`, `updated_at`) VALUES
(1, '24442000', '7', '1', '2024', 9, '2024-01-07 02:33:33', '2024-01-07 02:33:33'),
(2, '11160000', '7', '2', '2024', 1, '2024-02-07 02:33:41', '2024-02-07 02:33:41'),
(3, '800000', '7', '3', '2024', 2, '2024-03-07 02:33:48', '2024-03-07 02:33:48'),
(4, '10800000', '7', '4', '2024', 3, '2024-04-07 02:33:54', '2024-04-07 02:33:54'),
(5, '3110000', '7', '5', '2024', 4, '2024-05-07 02:34:02', '2024-05-07 02:34:02'),
(6, '160000', '7', '8', '2024', 5, '2024-08-07 02:34:10', '2024-08-07 02:34:10'),
(7, '888000', '7', '9', '2024', 6, '2024-09-07 02:34:19', '2024-09-07 02:34:19'),
(8, '1260000', '7', '10', '2024', 7, '2024-10-07 02:34:59', '2024-10-07 02:34:59'),
(9, '1960000', '7', '11', '2024', 8, '2024-11-07 02:35:07', '2024-11-07 02:35:07');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `stars` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `thumbnail` longtext DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) DEFAULT 'ĐƯỢC CHẤP NHẬN',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'USER', NULL, NULL),
(2, 'ADMIN', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_users`
--

CREATE TABLE `role_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 2, 2, NULL, NULL),
(2, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `about` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ĐANG HOẠT ĐỘNG',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `avt` longtext DEFAULT 'image/avatar-default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `phone`, `email`, `email_verified_at`, `password`, `address`, `about`, `status`, `remember_token`, `created_at`, `updated_at`, `token`, `avt`) VALUES
(1, 'user', '0989889889', 'user@gmail.com', NULL, '$2y$12$NJM99WRfHwAVTxFtR9yXQe1ofUMfu3QgRd5zR0hEwzbh5BG4G1sVa', 'HAIPHONG', NULL, 'ĐANG HOẠT ĐỘNG', NULL, NULL, '2024-11-05 11:43:02', NULL, 'http://127.0.0.1:8000/storage/avatars/nRdbhIa2OHx222x2yATcfvtg9HZEDASpm3Qi3VPa.jpg'),
(2, 'admin', '0986886886', 'admin@gmail.com', NULL, '$2y$12$IZoNvusxu/UQEe.iJFXMB.MZ4yZOJfA3D6D2F7Uclzvxkc8pX2tZW', 'HANOI', NULL, 'ĐANG HOẠT ĐỘNG', NULL, NULL, '2024-11-05 11:42:37', NULL, 'http://127.0.0.1:8000/storage/avatars/DGvoh4enF1hYK8z3UeQO63Q38DaUFB04WMgkDJBY.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_product_id_foreign` (`product_id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_created_by_foreign` (`created_by`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`),
  ADD KEY `coupons_created_by_foreign` (`created_by`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_coupons`
--
ALTER TABLE `my_coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `my_coupons_user_id_foreign` (`user_id`),
  ADD KEY `my_coupons_coupon_id_foreign` (`coupon_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_coupon_id_foreign` (`coupon_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_created_by_foreign` (`created_by`);

--
-- Indexes for table `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_options_product_id_foreign` (`product_id`),
  ADD KEY `product_options_user_id_foreign` (`user_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `properties_attribute_id_foreign` (`attribute_id`);

--
-- Indexes for table `revenues`
--
ALTER TABLE `revenues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `revenues_order_id_foreign` (`order_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_users`
--
ALTER TABLE `role_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_users_user_id_foreign` (`user_id`),
  ADD KEY `role_users_role_id_foreign` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `my_coupons`
--
ALTER TABLE `my_coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_options`
--
ALTER TABLE `product_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `revenues`
--
ALTER TABLE `revenues`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_users`
--
ALTER TABLE `role_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `my_coupons`
--
ALTER TABLE `my_coupons`
  ADD CONSTRAINT `my_coupons_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `my_coupons_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `product_options_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_options_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `revenues`
--
ALTER TABLE `revenues`
  ADD CONSTRAINT `revenues_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_users`
--
ALTER TABLE `role_users`
  ADD CONSTRAINT `role_users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
