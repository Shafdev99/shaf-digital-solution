/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 8.0.30 : Database - shaf_ns_landing_page_v2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shaf_ns_landing_page_v2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `shaf_ns_landing_page_v2`;

/*Table structure for table `faqs` */

DROP TABLE IF EXISTS `faqs`;

CREATE TABLE `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `status` enum('draft','published') DEFAULT 'published',
  `order` int DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `faqs` */

insert  into `faqs`(`id`,`question`,`answer`,`status`,`order`,`created_at`,`updated_at`) values 
(1,'Apakah bisa konsultasi dulu?','Bisa. Ceritakan saja masalah atau targetnya. Dari situ kita lihat kebutuhan yang paling masuk akal.','published',5,'2026-09-18 01:53:47.018000','2026-09-20 17:31:01.168000'),
(2,'Apakah bisa untuk pekerjaan kecil?','Bisa. Tidak semua kebutuhan harus menjadi project besar.','published',1,'2026-09-18 01:53:47.020000','2026-09-20 17:29:38.112000'),
(3,'Apakah website bisa dibuat custom?','Bisa. Struktur, tampilan, fitur, dan integrasi dapat disesuaikan dengan kebutuhan project.','published',1,'2026-09-18 01:53:47.025000','2026-09-20 17:30:49.331000'),
(6,'Bagaimana cara memulai?','Hubungi SHAF melalui WhatsApp. Jelaskan kebutuhan singkat, lalu kita lanjutkan dari sana.','published',4,'2026-09-19 15:07:40.984000','2026-09-19 15:07:40.984000');

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `read_status` tinyint(1) DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `messages` */

/*Table structure for table `portfolio` */

DROP TABLE IF EXISTS `portfolio`;

CREATE TABLE `portfolio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'WEB DESIGN',
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'published',
  `featured` tinyint(1) DEFAULT '0',
  `order` int DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `portfolio_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `portfolio` */

insert  into `portfolio`(`id`,`title`,`slug`,`category`,`description`,`image`,`url`,`status`,`featured`,`order`,`created_at`,`updated_at`) values 
(2,'Shaf tool','shaf-tool','tool','ini ada tool','/images/uploads/1789747969634-chatgpt-image-sep-2-2026-09-14-01-am.png','facebook.com','published',1,2,'2026-09-18 16:12:49.667000','2026-09-18 16:12:49.667000'),
(3,'SHAF Digital Solution','shaf-digital-solution','WEB DESIGN','Eksplorasi website personal brand yang menggabungkan layanan, portfolio, dan produk digital dalam satu tempat.','/images/uploads/1789751950703-chatgpt-image-sep-2-2026-09-14-01-am.png','https://wa.me/6285163561008','published',1,1,'2026-09-18 16:46:26.976000','2026-09-18 17:19:10.727000');

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`price`,`createdAt`,`updatedAt`) values 
(23123,'Jamu',25000,'2026-09-09 13:56:01.000000','2026-09-09 13:56:05.000000');

/*Table structure for table `products_catalog` */

DROP TABLE IF EXISTS `products_catalog`;

CREATE TABLE `products_catalog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_description` text,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT 'digital',
  `status` enum('draft','published') DEFAULT 'published',
  `featured` tinyint(1) DEFAULT '0',
  `order` int DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_catalog_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `products_catalog` */

insert  into `products_catalog`(`id`,`name`,`slug`,`short_description`,`description`,`image`,`category`,`status`,`featured`,`order`,`created_at`,`updated_at`) values 
(1,'SHAF Node StarterKit','shaf-node-starterkit','Fondasi Node.js + Express untuk membangun aplikasi dengan struktur yang rapi dan mudah dipahami.','StarterKit yang dipakai untuk membangun aplikasi SHAF dengan struktur backend, template, dan auth yang siap dikembangkan.','/images/uploads/1789748309750-chatgpt-image-sep-2-2026-09-14-01-am.png','starter-kit','published',1,1,'2026-09-18 01:53:47.010000','2026-09-18 16:18:29.773000'),
(2,'Dashboard Starter','dashboard-starter','UI dashboard modular untuk kebutuhan data, CRUD, pencarian, filter, dan pagination.','Template dashboard berbasis EJS untuk admin dengan struktur data dan pengelolaan content yang rapi.',NULL,'template','published',0,2,'2026-09-18 01:53:47.011000','2026-09-18 01:53:47.011000'),
(4,'Template & Resource','template-resource','Berbagai aset digital yang dibuat supaya pekerjaan administratif dan teknis lebih cepat.','Substansi aset dan template yang mempermudah eksekusi pekerjaan digital dan dokumentasi bisnis.',NULL,'resource','published',0,3,'2026-09-18 16:46:27.008000','2026-09-18 16:46:27.008000');

/*Table structure for table `services` */

DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `order` int DEFAULT '0',
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `services` */

insert  into `services`(`id`,`title`,`slug`,`description`,`icon`,`order`,`status`,`created_at`,`updated_at`) values 
(1,'Pengolahan Dokumen','pengolahan-dokumen','Rapikan, susun, konversi, dan siapkan dokumen agar siap dipakai atau dipresentasikan.','doc',1,'published','2026-09-18 01:53:46.965000','2026-09-18 01:53:46.965000'),
(2,'Pengolahan Data','pengolahan-data','Ubah data mentah menjadi tabel, laporan, rekap, atau informasi yang lebih mudah dipahami.','data',2,'published','2026-09-18 01:53:46.994000','2026-09-18 01:53:46.994000'),
(3,'Desain & Website','desain-website','Landing page, company profile, website bisnis, dan web app yang dibuat sesuai kebutuhan nyata.','web',3,'published','2026-09-18 01:53:47.001000','2026-09-18 01:53:47.001000'),
(4,'IT Support & Remote Desktop','it-support-remote-desktop','Bantu diagnosis, konfigurasi, troubleshooting, dan pendampingan teknis secara langsung atau remote.','it',4,'published','2026-09-18 01:53:47.003000','2026-09-18 01:53:47.003000'),
(9,'servis laptop','servis-laptop','servis ldptop','cog',5,'published','2026-09-18 16:14:16.580000','2026-09-18 16:14:16.580000');

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` text,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `settings` */

insert  into `settings`(`id`,`key`,`value`,`created_at`,`updated_at`) values 
(1,'site_name','SHAF Digital Solution','2026-09-18 01:53:47.031000','2026-09-18 01:53:47.031000'),
(2,'whatsapp_url','https://wa.me/6285163561008','2026-09-18 01:53:47.032000','2026-09-18 01:53:47.032000'),
(3,'contact_email','hello@shaf.id','2026-09-18 01:53:47.034000','2026-09-18 01:53:47.034000');

/*Table structure for table `testimonials` */

DROP TABLE IF EXISTS `testimonials`;

CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `quote` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'published',
  `order` int DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `testimonials` */

insert  into `testimonials`(`id`,`name`,`role`,`quote`,`image`,`status`,`order`,`created_at`,`updated_at`) values 
(1,'Ijat','Sekretaris','Shaf memang hebat bisa diandalkan',NULL,'published',1,'2026-09-18 14:19:55.228000','2026-09-18 14:19:55.228000');


/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `recovery_code_hash` varchar(255) NOT NULL,
  `name` varchar(150) NOT NULL DEFAULT 'Admin SHAF',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
