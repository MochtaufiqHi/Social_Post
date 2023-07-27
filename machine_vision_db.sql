-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2023 at 05:48 AM
-- Server version: 8.0.33-0ubuntu0.22.04.2
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `machine_vision_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `caption`, `tags`, `likes`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Work', '#pc', 1, 'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', '2023-07-27 02:47:19', '2023-07-27 03:13:09'),
(2, 1, 'Image', '#abstract', 1, 'https://images.unsplash.com/photo-1690320276492-08823be529d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', '2023-07-27 02:48:29', '2023-07-27 03:13:14'),
(3, 1, 'Caemel', '#mesir', NULL, 'https://images.unsplash.com/photo-1690282419530-f908158270da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:05:09'),
(4, 1, 'Iam here', '#adventure', NULL, 'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:05:36'),
(5, 2, 'light ', '#smoke', NULL, 'https://images.unsplash.com/photo-1690311724917-9307b2fd0cb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:06:37'),
(6, 2, 'Sunset', '#sun', NULL, 'https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:06:51'),
(7, 2, 'Bird', '#black bird', NULL, 'https://images.unsplash.com/photo-1690275176891-4718337fd788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:07:15'),
(8, 2, 'Home', '#window', 1, 'https://images.unsplash.com/photo-1688733962404-557e69853f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:13:17'),
(9, 2, 'My Computer', '#work', NULL, 'https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:08:26'),
(10, 3, 'Sand', '#mesir', NULL, 'https://images.unsplash.com/photo-1690311075738-30513e417e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:09:27'),
(11, 3, 'Where I am ?', '#adventure', NULL, 'https://images.unsplash.com/photo-1682685797406-97f364419b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:09:43'),
(12, 3, 'Home', '#home', NULL, 'https://images.unsplash.com/photo-1690086142286-caccce218c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:09:58'),
(13, 3, 'River', '#adventure', NULL, 'https://images.unsplash.com/photo-1690106431514-123a069f5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:10:17'),
(14, 3, 'Virus', '#virus', NULL, 'https://images.unsplash.com/photo-1661475357622-b43b4cabb7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', NULL, '2023-07-27 03:10:32');

-- --------------------------------------------------------

--
-- Table structure for table `UserLikeds`
--

CREATE TABLE `UserLikeds` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `UserLikeds`
--

INSERT INTO `UserLikeds` (`id`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(1, '2023-07-27 03:13:09', '2023-07-27 03:13:09', 3, 1),
(2, '2023-07-27 03:13:14', '2023-07-27 03:13:14', 3, 2),
(3, '2023-07-27 03:13:18', '2023-07-27 03:13:18', 3, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `photo`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Admin1', 'mochammadtaufiq67@gmail.com', '$2b$10$vUnqTadt8iCwYswpFZEU.utc2WHySk/xw6D7lIZoBpVvmgqjbRbbS', '1690425751987-pexels-sohail-nachiti-807598.jpg', '2023-07-27 02:42:32', '2023-07-27 02:42:32'),
(2, 'Mochammad Taufiq Hidayat', 'taufiq', 'mochammadtaufiq779@gmail.com', '$2b$10$6m4Y4BumoLLKC3SUxQS60.4iZty57AbRkeyBIknYPrHevsGtPWSpW', '1690425825268-20230623_142705.jpg', '2023-07-27 02:43:45', '2023-07-27 02:43:45'),
(3, 'Hamka Sidik', 'Hamka', 'wisnuhamka20@gmail.com', '$2b$10$96AZwh9x6OwNfIWqBmfKbeXQrtfp0LYLzb7TrLGrn6Gub3lpZcpB2', '1690425865010-wallpaperflare.com_wallpaper(1).jpg', '2023-07-27 02:44:25', '2023-07-27 02:44:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `UserLikeds`
--
ALTER TABLE `UserLikeds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UserLikeds_postId_userId_unique` (`userId`,`postId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `UserLikeds`
--
ALTER TABLE `UserLikeds`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `UserLikeds`
--
ALTER TABLE `UserLikeds`
  ADD CONSTRAINT `UserLikeds_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `UserLikeds_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
