-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 04:09 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `editor`
--

-- --------------------------------------------------------

--
-- Table structure for table `collaboration_master`
--

CREATE TABLE IF NOT EXISTS `collaboration_master` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `uid1` int(11) NOT NULL,
  `uid2` int(11) NOT NULL,
  `permission_type` int(11) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `collaboration_master`
--

INSERT INTO `collaboration_master` (`cid`, `project_id`, `uid1`, `uid2`, `permission_type`) VALUES
(1, 1, 3, 1, 1),
(2, 1, 3, 1, 1),
(3, 1, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_master`
--

CREATE TABLE IF NOT EXISTS `project_master` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `project_name` varchar(75) NOT NULL,
  `project_path` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `project_master`
--

INSERT INTO `project_master` (`project_id`, `userid`, `project_name`, `project_path`, `time`) VALUES
(1, 1, 'intro.html', 'projects/intro.html', '2025-03-06 14:13:36'),
(2, 4, 'demo.html', 'projects/demo.html', '2025-03-07 16:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE IF NOT EXISTS `user_master` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(75) NOT NULL,
  `pwd` varchar(30) NOT NULL,
  `pfp` text NOT NULL,
  `active` int(11) NOT NULL,
  `isadmin` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`userid`, `fullname`, `username`, `email`, `pwd`, `pfp`, `active`, `isadmin`, `created_at`) VALUES
(1, 'Vaishnavi Pandya', 'Vaishnavi', 'vaishnavi@gmail.com', 'vaishnavi123', 'default.jpg', 1, 0, '2025-03-05 18:52:28'),
(2, 'Kavya Patel', 'Kavya', 'kavya@gmail.com', 'kavya123', 'default.jpg', 1, 0, '2025-03-05 18:53:49'),
(3, 'Sanjay Pandya', 'Sanjay', 'sanjay@gmail.com', 'sanjay123', 'default.jpg', 1, 1, '2025-03-05 19:09:41'),
(4, 'Khushi Bhatt', 'Khushi', 'khushi@gmail.com', 'khushi123', 'default.jpg', 1, 0, '2025-03-07 16:39:37');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
