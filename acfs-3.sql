-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 01, 2018 at 06:22 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acfs`
--

-- --------------------------------------------------------

--
-- Table structure for table `Academic_Boards`
--

DROP TABLE IF EXISTS `Academic_Boards`;
CREATE TABLE `Academic_Boards` (
  `academicBoardID` int(11) NOT NULL,
  `stakeholderID` int(11) NOT NULL,
  `standardID` int(11) NOT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Academic_Boards`
--

INSERT INTO `Academic_Boards` (`academicBoardID`, `stakeholderID`, `standardID`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(6, 9810021, 3, '1093840', '2018-08-02 10:54:24', '1093840', '2018-08-02 10:54:24'),
(8, 9810022, 4, '1093840', '2018-08-11 10:43:25', '1093840', '2018-08-11 10:43:25'),
(9, 9810022, 3, '1093840', '2018-08-13 10:57:06', '1093840', '2018-08-13 10:57:06'),
(13, 9810021, 5, '1093840', '2018-08-25 10:42:10', '1093840', '2018-08-25 10:42:10');

-- --------------------------------------------------------

--
-- Table structure for table `Accreditation_Scopes`
--

DROP TABLE IF EXISTS `Accreditation_Scopes`;
CREATE TABLE `Accreditation_Scopes` (
  `id` int(11) NOT NULL,
  `val` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Accreditation_Scopes`
--

INSERT INTO `Accreditation_Scopes` (`id`, `val`) VALUES
(1, 'ISO 17065'),
(2, 'ISO 17020'),
(3, 'ISO 17021');

-- --------------------------------------------------------

--
-- Table structure for table `Admin_Users`
--

DROP TABLE IF EXISTS `Admin_Users`;
CREATE TABLE `Admin_Users` (
  `adminID` char(7) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `lastName` varchar(150) DEFAULT NULL,
  `position` varchar(250) DEFAULT NULL,
  `department` varchar(250) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Admin_Users`
--

INSERT INTO `Admin_Users` (`adminID`, `name`, `lastName`, `position`, `department`, `phone`, `email`, `password`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
('1093840', 'กรพจน์', 'อุโฆษกิจ', 'Admin Leader', 'IT', '0917196810', 'korapotu@gmail.com', 'Aommy1989', NULL, NULL, NULL, '2018-08-08 11:07:33'),
('8098729', 'aom', 'my', 'asd', 'asd', '0191238912', 'koaskd@gmail.com', '1234', '1093840', '2018-08-08 11:35:31', '1093840', '2018-08-08 11:35:31');

-- --------------------------------------------------------

--
-- Table structure for table `Answers`
--

DROP TABLE IF EXISTS `Answers`;
CREATE TABLE `Answers` (
  `answersID` int(11) NOT NULL,
  `standardID` int(11) DEFAULT NULL,
  `questionID` int(11) DEFAULT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `answerer` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `AttachFiles`
--

DROP TABLE IF EXISTS `AttachFiles`;
CREATE TABLE `AttachFiles` (
  `id` bigint(20) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `page_type` varchar(20) DEFAULT NULL,
  `menu_id` int(11) NOT NULL,
  `display_name` varchar(700) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(512) NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `file_size` decimal(10,2) DEFAULT NULL,
  `order_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Branchs`
--

DROP TABLE IF EXISTS `Branchs`;
CREATE TABLE `Branchs` (
  `branchID` int(11) NOT NULL,
  `branchNameThai` varchar(50) NOT NULL,
  `branchNameEng` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Branchs`
--

INSERT INTO `Branchs` (`branchID`, `branchNameThai`, `branchNameEng`) VALUES
(1, 'พืช', ''),
(2, 'ประมง', ''),
(3, 'ปศุสัตว์', ''),
(4, 'สินค้าที่ไม่ใช่อาหาร', '');

-- --------------------------------------------------------

--
-- Table structure for table `Commodity_Keywords`
--

DROP TABLE IF EXISTS `Commodity_Keywords`;
CREATE TABLE `Commodity_Keywords` (
  `keywordID` int(11) NOT NULL,
  `standardID` int(11) DEFAULT NULL,
  `keywordLang` char(2) NOT NULL COMMENT 'TH,EN',
  `keyword` varchar(45) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Commodity_Keywords`
--

INSERT INTO `Commodity_Keywords` (`keywordID`, `standardID`, `keywordLang`, `keyword`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(2, 3, 'TH', 'ทดสอบ', '1093840', '2018-07-29 11:42:06', '1093840', '2018-08-16 08:42:31'),
(3, 3, 'EN', 'test1', '1093840', '2018-07-29 11:42:06', '1093840', '2018-08-16 08:42:31'),
(4, 3, 'TH', 'เทส', '1093840', '2018-07-29 11:48:22', '1093840', '2018-08-16 08:42:31'),
(5, 3, 'EN', 'aasdasd', '1093840', '2018-07-29 11:49:42', '1093840', '2018-08-16 08:42:31'),
(6, 4, 'TH', 'sasdad', '1093840', '2018-08-08 11:36:52', '1093840', '2018-08-08 11:36:52'),
(7, 4, 'TH', 'asdasd', '1093840', '2018-08-08 11:36:52', '1093840', '2018-08-08 11:36:52'),
(8, 4, 'EN', 'asdasd', '1093840', '2018-08-08 11:36:52', '1093840', '2018-08-08 11:36:52'),
(9, 4, 'EN', 'qweqwe', '1093840', '2018-08-08 11:36:52', '1093840', '2018-08-08 11:36:52'),
(10, 5, 'TH', 'asd', '1093840', '2018-08-08 11:41:16', '1093840', '2018-08-25 11:34:33'),
(11, 5, 'EN', 'asd', '1093840', '2018-08-08 11:41:16', '1093840', '2018-08-25 11:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `Commodity_Standards`
--

DROP TABLE IF EXISTS `Commodity_Standards`;
CREATE TABLE `Commodity_Standards` (
  `standardID` int(11) NOT NULL,
  `years` varchar(10) DEFAULT NULL,
  `standardNameThai` varchar(128) DEFAULT NULL,
  `standardNameEng` varchar(128) DEFAULT NULL,
  `standardType` varchar(50) DEFAULT NULL,
  `standardCategory` varchar(45) DEFAULT NULL,
  `productType` varchar(45) DEFAULT NULL,
  `noThai` varchar(45) DEFAULT NULL,
  `bookNumberThai` varchar(128) DEFAULT NULL,
  `noEng` varchar(45) DEFAULT NULL,
  `bookNumberEng` varchar(128) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  `step` enum('1','2','3','4','5','6','7','8','9') DEFAULT '1',
  `status` enum('Active','Inactive') DEFAULT NULL,
  `standardFileName` varchar(255) DEFAULT NULL,
  `standardFilePath` varchar(500) DEFAULT NULL,
  `academicBoardName` varchar(50) DEFAULT NULL,
  `standardDefineType` varchar(50) DEFAULT NULL,
  `standardPublishingType` varchar(50) DEFAULT NULL,
  `standardGroup` varchar(50) DEFAULT NULL,
  `secondaryCode` varchar(50) DEFAULT NULL,
  `accreditationScope` varchar(50) DEFAULT NULL,
  `useDate` datetime DEFAULT NULL,
  `cancelledDate` datetime DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Commodity_Standards`
--

INSERT INTO `Commodity_Standards` (`standardID`, `years`, `standardNameThai`, `standardNameEng`, `standardType`, `standardCategory`, `productType`, `noThai`, `bookNumberThai`, `noEng`, `bookNumberEng`, `detail`, `step`, `status`, `standardFileName`, `standardFilePath`, `academicBoardName`, `standardDefineType`, `standardPublishingType`, `standardGroup`, `secondaryCode`, `accreditationScope`, `useDate`, `cancelledDate`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(3, '2561', 'asdasd', 'as asdasd', '1', '2', '2', '111', '222', '333', '444', 'รายละเอียดเพิ่มเติม', '1', 'Active', 'null', 'null', 'asdkjasd', 'Force', 'Force', '3', '111', 'ISO 17020', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'null', '2018-07-29 00:00:00', '1093840', '2018-08-16 08:42:31'),
(4, '2561', 'asdasd', 'asdasd', 'General', '2', '2', 'asdasd', 'and', 'andasd', 'asdasd', 'asdasd', '1', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1093840', '2013-11-09 11:36:52', '1093840', '2018-08-08 11:36:52'),
(5, '2561', 'ZX', 'asd', '2', '2', '1', 'asads', 'asd', 'asd', 'asd', 'asd', '1', 'Active', 'null', 'null', 'null', 'Force', 'General', '2', 'null', 'ISO 17065', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1093840', '2018-08-08 11:41:15', '1093840', '2018-08-25 11:34:33'),
(6, '2561', 'ZX', 'asd', 'General', '2', '1', 'asads', 'asd', 'asd', 'asd', 'asd', '9', 'Active', 'ระบบสนับสนุนมาตรฐานสินค้าเกษตร.xlsx', 'files/files/commodity-standard/20180814093238_451863.xlsx', 'null', NULL, NULL, NULL, NULL, NULL, '2018-08-13 17:00:00', '0000-00-00 00:00:00', '1093840', '2018-08-08 11:41:15', '1093840', '2018-08-14 09:32:38'),
(7, '2561', 'asdasd', 'asdasd', 'General', '2', '2', 'asdasd', 'and', 'andasd', 'asdasd', 'asdasd', '1', 'Inactive', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-08-14 00:00:00', NULL, '1093840', '2018-08-08 11:36:52', '1093840', '2018-08-08 11:36:52'),
(8, '2561', 'asdasd', 'as asdasd', 'General', '2', '2', '111', '222', '333', '444', 'รายละเอียดเพิ่มเติม', '9', 'Active', NULL, 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'null', '2018-07-29 00:00:00', '1093840', '2018-08-05 13:13:50');

-- --------------------------------------------------------

--
-- Table structure for table `Emails`
--

DROP TABLE IF EXISTS `Emails`;
CREATE TABLE `Emails` (
  `emailID` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Emails`
--

INSERT INTO `Emails` (`emailID`, `email`, `password`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(2, 'korapotu@gmail.com', 'Aommy1989', '1093840', '2018-08-09 09:54:57', '1093840', '2018-08-09 09:54:57');

-- --------------------------------------------------------

--
-- Table structure for table `Email_Commodity`
--

DROP TABLE IF EXISTS `Email_Commodity`;
CREATE TABLE `Email_Commodity` (
  `emailCommodityID` int(11) NOT NULL,
  `emailID` int(11) NOT NULL,
  `standardID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Email_Commodity`
--

INSERT INTO `Email_Commodity` (`emailCommodityID`, `emailID`, `standardID`) VALUES
(3, 2, 3),
(4, 2, 4),
(5, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Invite_Files`
--

DROP TABLE IF EXISTS `Invite_Files`;
CREATE TABLE `Invite_Files` (
  `inviteFileID` int(11) NOT NULL,
  `standardID` int(11) DEFAULT NULL,
  `meetingID` int(11) DEFAULT NULL,
  `fileName` varchar(45) DEFAULT NULL,
  `filePath` varchar(500) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Invite_Files`
--

INSERT INTO `Invite_Files` (`inviteFileID`, `standardID`, `meetingID`, `fileName`, `filePath`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(2, 3, 2, '2ตัวอย่างเมล.xlsx', 'files/files/commodity-standard/invite-files/2_20180816082217_118182.xlsx', '1093840', '2018-08-16 08:22:17', '1093840', '2018-08-16 08:22:17');

-- --------------------------------------------------------

--
-- Table structure for table `LinkUrl`
--

DROP TABLE IF EXISTS `LinkUrl`;
CREATE TABLE `LinkUrl` (
  `id` int(11) NOT NULL,
  `link_type` varchar(20) NOT NULL,
  `link_url` varchar(512) NOT NULL,
  `image_path` varchar(512) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LinkUrl`
--

INSERT INTO `LinkUrl` (`id`, `link_type`, `link_url`, `image_path`, `create_date`, `update_date`) VALUES
(1, 'a', 'https://google.co.th', 'files/img/link_url/20181001131900_602145.png', '2018-10-01 13:19:00', '2018-10-01 13:19:13'),
(2, '1', 'https://google.co.th', 'files/img/link_url/20181001131932_438030.png', '2018-10-01 13:19:32', '2018-10-01 13:19:32'),
(3, '1', 'https://google.co.th', 'files/img/link_url/20181001131943_534259.png', '2018-10-01 13:19:43', '2018-10-01 13:19:43'),
(4, '1', 'https://google.co.th', 'files/img/link_url/20181001131955_922021.png', '2018-10-01 13:19:55', '2018-10-01 13:19:55'),
(5, '1', 'https://google.co.th', 'files/img/link_url/20181001132006_745270.png', '2018-10-01 13:20:06', '2018-10-01 13:20:06'),
(6, '1', 'https://google.co.th', 'files/img/link_url/20181001132017_767355.png', '2018-10-01 13:20:17', '2018-10-01 13:20:17');

-- --------------------------------------------------------

--
-- Table structure for table `Meetings`
--

DROP TABLE IF EXISTS `Meetings`;
CREATE TABLE `Meetings` (
  `meetingID` int(11) NOT NULL,
  `standardID` int(11) DEFAULT NULL,
  `meetingName` varchar(45) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `meetingType` enum('convoke','seminar') DEFAULT NULL,
  `ConvenedStatus` enum('Y','N') DEFAULT 'N',
  `sentEmailStatus` varchar(15) DEFAULT NULL,
  `emailSentDate` datetime DEFAULT NULL,
  `isSendMail` char(1) NOT NULL DEFAULT 'N',
  `remark` varchar(512) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Meetings`
--

INSERT INTO `Meetings` (`meetingID`, `standardID`, `meetingName`, `address`, `startDate`, `endDate`, `startTime`, `endTime`, `meetingType`, `ConvenedStatus`, `sentEmailStatus`, `emailSentDate`, `isSendMail`, `remark`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(1, 3, 'and', 'asdasd', '2018-08-05 12:00:00', '2018-08-05 13:00:00', '00:00:00', '00:00:00', 'convoke', 'Y', 'Default', '2018-08-16 17:15:00', 'N', NULL, '1093840', '2018-08-05 13:31:34', '1093840', '2018-08-16 09:49:54'),
(2, 3, 'seminar 1', 'asdad', '2018-08-06 12:15:00', '2018-08-06 15:00:00', '00:00:00', '00:00:00', 'seminar', 'Y', 'TimeSetting', '2018-08-16 18:30:00', 'N', NULL, '1093840', '2018-08-06 09:58:55', '1093840', '2018-08-16 09:16:13'),
(3, 5, 'ประชุม มกอช.', 'ห้องประชุม 1', '2018-08-27 10:00:00', '2018-08-27 15:00:00', '00:00:00', '00:00:00', 'convoke', 'Y', 'Default', '2018-08-25 23:50:00', 'N', 'test remark', '1093840', '2018-08-25 10:49:50', '1093840', '2018-08-26 10:36:25'),
(4, 5, 'asd', 'asd', '2018-09-12 08:00:00', '2018-09-13 16:00:00', '00:00:00', '00:00:00', 'seminar', 'Y', 'Default', '1900-12-31 00:00:00', 'N', 'asdas', '1093840', '2018-08-26 11:03:38', '1093840', '2018-08-26 11:24:55'),
(5, 5, 'assay assay', 'asdasd', '2018-08-29 08:00:00', '2018-08-30 16:30:00', NULL, NULL, 'seminar', 'Y', 'Default', '0000-00-00 00:00:00', 'N', 'remark', '1093840', '2018-08-26 11:06:59', '1093840', '2018-08-26 11:06:59');

-- --------------------------------------------------------

--
-- Table structure for table `Meeting_attendees`
--

DROP TABLE IF EXISTS `Meeting_attendees`;
CREATE TABLE `Meeting_attendees` (
  `meetingAttendeeID` int(11) NOT NULL,
  `attendeeID` char(7) DEFAULT NULL,
  `meetingID` int(11) DEFAULT NULL,
  `standardID` int(11) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Meeting_attendees`
--

INSERT INTO `Meeting_attendees` (`meetingAttendeeID`, `attendeeID`, `meetingID`, `standardID`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(5, '9810021', 2, 3, '1093840', '0000-00-00 00:00:00', '1093840', '0000-00-00 00:00:00'),
(7, '9810022', 2, 3, '1093840', '0000-00-00 00:00:00', '1093840', '0000-00-00 00:00:00'),
(8, '9810021', 3, 5, '1093840', '0000-00-00 00:00:00', '1093840', '0000-00-00 00:00:00'),
(11, '9810021', 4, 5, '1093840', '0000-00-00 00:00:00', '1093840', '0000-00-00 00:00:00'),
(12, '9810021', 0, 5, '1093840', '0000-00-00 00:00:00', '1093840', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Meeting_Files`
--

DROP TABLE IF EXISTS `Meeting_Files`;
CREATE TABLE `Meeting_Files` (
  `meetingFileID` int(11) NOT NULL,
  `meetingID` int(11) DEFAULT NULL,
  `standardID` int(11) DEFAULT NULL,
  `fileName` varchar(45) DEFAULT NULL,
  `filePath` varchar(500) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Meeting_Files`
--

INSERT INTO `Meeting_Files` (`meetingFileID`, `meetingID`, `standardID`, `fileName`, `filePath`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(3, 1, 3, '233051.jpg', 'files/files/commodity-standard/meeting-files/1_20180805135431_306805.jpg', '1093840', '2018-08-05 13:54:31', '1093840', '2018-08-05 13:54:31'),
(5, 2, 3, 'structures.pdf', 'files/files/commodity-standard/meeting-files/2_20180806095855_899226.pdf', '1093840', '2018-08-06 09:58:55', '1093840', '2018-08-06 09:58:55'),
(9, 3, 5, 'แก้ไข dportal เฟส2.docx', 'files/files/commodity-standard/meeting-files/3_20180825142111_388666.docx', '1093840', '2018-08-25 14:21:11', '1093840', '2018-08-25 14:21:11'),
(10, 4, 5, 'structures-2.pdf', 'files/files/commodity-standard/meeting-files/4_20180826110338_407282.pdf', '1093840', '2018-08-26 11:03:38', '1093840', '2018-08-26 11:03:38'),
(11, 5, 5, 'งานส่วน เเก้ไข + เพิ่มเติม.pdf', 'files/files/commodity-standard/meeting-files/5_20180826110659_429645.pdf', '1093840', '2018-08-26 11:06:59', '1093840', '2018-08-26 11:06:59');

-- --------------------------------------------------------

--
-- Table structure for table `Menus`
--

DROP TABLE IF EXISTS `Menus`;
CREATE TABLE `Menus` (
  `id` int(11) NOT NULL,
  `menu_name_th` varchar(100) NOT NULL,
  `menu_name_en` varchar(100) NOT NULL,
  `parent_menu` int(11) NOT NULL,
  `menu_type` enum('PARENT','PAGE','INLINK','EXLINK','CUSTOM') NOT NULL,
  `menu_url` varchar(500) NOT NULL,
  `menu_order` int(11) NOT NULL,
  `menu_logo` varchar(500) NOT NULL,
  `actives` char(1) NOT NULL DEFAULT 'Y' COMMENT 'Y,N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Menus`
--

INSERT INTO `Menus` (`id`, `menu_name_th`, `menu_name_en`, `parent_menu`, `menu_type`, `menu_url`, `menu_order`, `menu_logo`, `actives`) VALUES
(1, 'เกี่ยวกับหน่วยงาน', 'About', 0, 'PARENT', 'about', 1, '', 'Y'),
(2, 'กฎ/ระเบียบ/ข้อบังคับ', 'Tradition', 0, 'PARENT', 'page/2', 2, '', 'Y'),
(3, 'บริการประชาชน', 'Services', 0, 'PARENT', 'page/3', 3, '', 'Y'),
(4, 'ข่าวสาร', 'News', 0, 'PARENT', 'page/4', 4, '', 'Y'),
(5, 'จัดซื้อจัดจ้าง', 'Purchase', 0, 'PARENT', 'page/5', 5, '', 'Y'),
(6, 'สื่อเผยแพร่', 'Media', 0, 'PARENT', 'page/6', 6, '', 'Y'),
(7, 'ติดต่อเรา', 'Contact Us', 0, 'PARENT', 'page/7', 7, '', 'Y'),
(8, 'ประวัติความเป็นมา', 'ประวัติความเป็นมา', 1, 'PAGE', 'page/8', 1, '', 'Y'),
(9, 'ความหมายของตรา มกอช.', 'ความหมายของตรา มกอช.', 1, 'PAGE', 'page/9', 2, '', 'Y'),
(10, 'วิสัยทัศน์/พันธกิจ/วัฒนธรรม/ค่านิยม', 'วิสัยทัศน์/พันธกิจ/วัฒนธรรม/ค่านิยม', 1, 'PAGE', 'page/10', 3, '', 'Y'),
(11, 'โครงสร้าง', 'โครงสร้าง', 1, 'PAGE', 'page/11', 4, '', 'Y'),
(12, 'ผู้บริหาร มกอช.', 'ผู้บริหาร มกอช.', 1, 'PARENT', 'page/1', 5, '', 'Y'),
(13, 'ผู้บริหารปัจจุบัน', 'ผู้บริหารปัจจุบัน', 12, 'PAGE', 'page/13', 1, '', 'Y'),
(14, 'CIO', 'CIO', 12, 'PAGE', 'page/14', 2, '', 'Y'),
(15, 'ที่ปรึกษา มกอช.', 'ที่ปรึกษา มกอช.', 12, 'PAGE', 'page/15', 3, '', 'Y'),
(16, 'ผู้เชี่ยวชาญ  มกอช.', 'ผู้เชี่ยวชาญ  มกอช.', 12, 'PAGE', 'page/16', 4, '', 'Y'),
(17, 'ทำเนียบผู้บริหาร', 'ทำเนียบผู้บริหาร', 1, 'PARENT', 'page/1', 6, '', 'Y'),
(18, 'ทำเนียบเลขาธิการ มกอช.', 'ทำเนียบเลขาธิการ มกอช.', 17, 'PAGE', 'page/18', 1, '', 'Y'),
(19, 'ทำเนียบรองเลขาธิการ มกอช.', 'ทำเนียบรองเลขาธิการ มกอช.', 17, 'PAGE', 'page/19', 2, '', 'Y'),
(20, 'ทำเนียบรองเลขาธิการ มกอช.', 'ทำเนียบรองเลขาธิการ มกอช.', 17, 'PAGE', 'page/20', 2, '', 'Y'),
(21, 'ทำเนียบ CIO', 'ทำเนียบ CIO', 17, 'PAGE', 'page/21', 3, '', 'Y'),
(22, 'ทำเนียบที่ปรึกษา มกอช.', 'ทำเนียบที่ปรึกษา มกอช.', 17, 'PAGE', 'page/22', 4, '', 'Y'),
(23, 'ทำเนียบผู้เชี่ยวชาญ มกอช.', 'ทำเนียบผู้เชี่ยวชาญ มกอช.', 17, 'PAGE', 'page/23', 5, '', 'Y'),
(24, 'อำนาจตามกฎกระทรวง', 'อำนาจตามกฎกระทรวง', 1, 'PAGE', 'page/24', 7, '', 'Y'),
(25, 'บทบาทภารกิจตามมติ ครม.', 'บทบาทภารกิจตามมติ ครม.', 1, 'PAGE', 'page/25', 8, '', 'Y'),
(26, 'ยุทธศาสตร์', 'ยุทธศาสตร์', 1, 'PARENT', 'page/1', 9, '', 'Y'),
(27, 'ยุทธศาสตร์และแผนงาน มกอช.', 'ยุทธศาสตร์และแผนงาน มกอช.', 26, 'PAGE', 'page/27', 1, '', 'Y'),
(28, 'กระทรวงเกษตร และสหกรณ์', 'กระทรวงเกษตร และสหกรณ์', 26, 'PAGE', 'page/28', 2, '', 'Y'),
(29, 'ยุทธศาสตร์ชาติ', 'ยุทธศาสตร์ชาติ', 26, 'PAGE', 'page/29', 3, '', 'Y'),
(30, 'ระบบบริหารราชการ', 'ระบบบริหารราชการ', 1, 'PARENT', 'page/1', 10, '', 'Y'),
(31, 'นโยบายการกากับดูแลองค์กร', 'นโยบายการกากับดูแลองค์กร', 30, 'PAGE', 'page/31', 1, '', 'Y'),
(32, 'คำรับรองการปฏิบัติราชการ มกอช. ปี 2547 – ปัจจุบัน', 'คำรับรองการปฏิบัติราชการ มกอช. ปี 2547 – ปัจจุบัน', 30, 'PAGE', 'page/32', 2, '', 'Y'),
(33, 'รายการผลการปฏิบัติราชการตามคารับรองการปฏิบัติราชการของ มกอช.', 'รายการผลการปฏิบัติราชการตามคารับรองการปฏิบัติราชการของ มกอช.', 30, 'PAGE', 'page/33', 3, '', 'Y'),
(34, 'รางวัลขององค์กร', 'รางวัลขององค์กร', 30, 'PARENT', 'page/1', 4, '', 'Y'),
(35, 'รางวัลบริการภาครัฐแห่งชาติ', 'รางวัลบริการภาครัฐแห่งชาติ', 34, 'PAGE', 'page/35', 1, '', 'Y'),
(36, 'รางวัลด้านความโปร่งใส', 'รางวัลด้านความโปร่งใส', 34, 'PAGE', 'page/36', 2, '', 'Y'),
(37, 'ผลการเบิกจ่ายงบประมาณ', 'ผลการเบิกจ่ายงบประมาณ', 30, 'PAGE', 'page/37', 5, '', 'Y'),
(38, 'รายงานประจำปี', 'รายงานประจำปี', 30, 'PAGE', 'page/38', 6, '', 'Y'),
(39, 'กฎบัตรการตรวจสอบภายใน', 'กฎบัตรการตรวจสอบภายใน', 30, 'PARENT', 'page/1', 7, '', 'Y'),
(40, 'กฎบัตรการตรวจสอบภายใน', 'กฎบัตรการตรวจสอบภายใน', 39, 'PAGE', 'page/40', 1, '', 'Y'),
(41, 'กรอบคุณธรรมของกลุ่มตรวจสอบภายใน', 'กรอบคุณธรรมของกลุ่มตรวจสอบภายใน', 39, 'PAGE', 'page/41', 2, '', 'Y'),
(42, 'พ.ร.บ. มาตรฐานสินค้าเกษตร', 'พ.ร.บ. มาตรฐานสินค้าเกษตร', 2, 'PARENT', 'page/1', 1, '', 'Y'),
(43, 'พ.ร.บ. มาตรฐานสินค้าเกษตร', 'พ.ร.บ. มาตรฐานสินค้าเกษตร', 42, 'PAGE', 'page/43', 1, '', 'Y'),
(44, 'กฎกระทรวง', 'กฎกระทรวง', 42, 'PARENT', 'page/1', 2, '', 'Y'),
(45, 'เรื่องทั่วไป', 'เรื่องทั่วไป', 44, 'PAGE', 'page/45', 1, '', 'Y'),
(46, 'เกี่ยวกับมาตรฐานบังคับ', 'เกี่ยวกับมาตรฐานบังคับ', 44, 'PAGE', 'page/46', 1, '', 'Y'),
(47, 'ประกาศกระทรวง', 'ประกาศกระทรวง', 42, 'PAGE', 'page/47', 3, '', 'Y'),
(48, 'กรรมการมาตรฐานสินค้าเกษตร', 'กรรมการมาตรฐานสินค้าเกษตร', 42, 'PAGE', 'page/48', 4, '', 'Y'),
(49, 'ประกาศสำนักงานมาตรฐานสินค้าเกษตร และอาหารแห่งชาติ', 'ประกาศสำนักงานมาตรฐานสินค้าเกษตร และอาหารแห่งชาติ', 42, 'PAGE', 'page/49', 5, '', 'Y'),
(50, 'คู่มือการปฏิบัติงาน', 'คู่มือการปฏิบัติงาน', 42, 'PAGE', 'page/50', 6, '', 'Y'),
(51, 'การรับฟังความคิดเห็น', 'การรับฟังความคิดเห็น', 42, 'PARENT', 'page/1', 7, '', 'Y'),
(52, 'เกี่ยวกับ พ.ร.บ. มาตรฐานสินค้าเกษตร', 'เกี่ยวกับ พ.ร.บ. มาตรฐานสินค้าเกษตร', 51, 'PAGE', 'page/52', 1, '', 'Y'),
(53, 'เกี่ยวกับตราอนุบัญญัติ', 'เกี่ยวกับตราอนุบัญญัติ', 51, 'PAGE', 'page/53', 2, '', 'Y'),
(54, 'เกี่ยวกับมาตรฐานบังคับ', 'เกี่ยวกับมาตรฐานบังคับ', 51, 'PAGE', 'page/54', 3, '', 'Y'),
(55, 'ประกาศ/ระเบียบ/คำสั่ง มกอช.', 'ประกาศ/ระเบียบ/คำสั่ง มกอช.', 2, 'PAGE', 'page/55', 2, '', 'Y'),
(56, 'กฎ/ระเบียบ/ข้อบังคับที่เกี่ยวกับการปฏิบัติงาน', 'กฎ/ระเบียบ/ข้อบังคับที่เกี่ยวกับการปฏิบัติงาน', 2, 'PAGE', 'page/56', 3, '', 'Y'),
(57, 'e-Service', 'e-Service', 3, 'PARENT', 'page/1', 1, '', 'Y'),
(58, 'TAS-License', 'TAS-License', 57, 'PAGE', 'page/58', 1, '', 'Y'),
(59, 'บริการค้นหาใบรังรองมาตรฐาน', 'บริการค้นหาใบรังรองมาตรฐาน', 57, 'PAGE', 'page/59', 2, '', 'Y'),
(60, 'บริการค้นหามาตรฐานสินค้าเกษตร', 'บริการค้นหามาตรฐานสินค้าเกษตร', 57, 'PAGE', 'page/60', 3, '', 'Y'),
(61, 'บริการ API มาตรฐานสินค้าเกษตร', 'บริการ API มาตรฐานสินค้าเกษตร', 57, 'PAGE', 'page/61', 4, '', 'Y'),
(62, 'ด้านมาตรฐานสินค้าเกษตร', 'ด้านมาตรฐานสินค้าเกษตร', 3, 'PARENT', 'page/1', 2, '', 'Y'),
(63, 'การกำหนดมาตรฐานสินค้า', 'การกำหนดมาตรฐานสินค้า', 62, 'PAGE', 'page/63', 1, '', 'Y'),
(64, 'ความหมายและวัตถุประสงค์', 'ความหมายและวัตถุประสงค์', 62, 'PAGE', 'page/64', 2, '', 'Y'),
(65, 'ขั้นตอนการจัดทาร่างมาตรฐาน', 'ขั้นตอนการจัดทาร่างมาตรฐาน', 62, 'PAGE', 'page/65', 3, '', 'Y'),
(66, 'ขั้นตอนการจัดทาร่างมาตรฐานบังคับ', 'ขั้นตอนการจัดทาร่างมาตรฐานบังคับ', 62, 'PAGE', 'page/66', 4, '', 'Y'),
(67, 'แผนปฏิบัติการกำหนดมาตรฐาน', 'แผนปฏิบัติการกำหนดมาตรฐาน', 62, 'PAGE', 'page/67', 5, '', 'Y'),
(68, 'มาตรฐานทั่วไป', 'มาตรฐานทั่วไป', 62, 'PARENT', 'page/1', 6, '', 'Y'),
(69, 'มาตรฐานสินค้า', 'มาตรฐานสินค้า', 68, 'PAGE', 'page/69', 1, '', 'Y'),
(70, 'มาตรฐานระบบ', 'มาตรฐานระบบ', 68, 'PAGE', 'page/70', 2, '', 'Y'),
(71, 'มาตรฐานข้อกาหนดทั่วไป', 'มาตรฐานข้อกาหนดทั่วไป', 68, 'PAGE', 'page/71', 3, '', 'Y'),
(72, 'แนวปฏิบัติในการใช้มาตรฐาน', 'แนวปฏิบัติในการใช้มาตรฐาน', 68, 'PAGE', 'page/72', 4, '', 'Y'),
(73, 'มาตรฐานบังคับ', 'มาตรฐานบังคับ', 62, 'PARENT', 'page/1', 7, '', 'Y'),
(74, 'มาตรฐานสินค้า', 'มาตรฐานสินค้า', 73, 'PAGE', 'page/74', 1, '', 'Y'),
(75, 'มาตรฐานระบบ', 'มาตรฐานระบบ', 73, 'PAGE', 'page/75', 2, '', 'Y'),
(76, 'มาตรฐานข้อกำหนดทั่วไป', 'มาตรฐานข้อกำหนดทั่วไป', 73, 'PAGE', 'page/76', 3, '', 'Y'),
(77, 'การรับฟังความคิดเห็น', 'การรับฟังความคิดเห็น', 62, 'PAGE', 'page/77', 8, '', 'Y'),
(78, 'การร้องเรียน', 'การร้องเรียน', 62, 'PAGE', 'page/78', 9, '', 'Y'),
(79, 'ด้านการรับรอง', 'ด้านการรับรอง', 3, 'PARENT', 'page/1', 3, '', 'Y'),
(80, 'ข้อมูลกองรับรองมาตรฐาน', 'ข้อมูลกองรับรองมาตรฐาน', 79, 'PAGE', 'page/80', 1, '', 'Y'),
(81, 'กองรับรองมาตรฐาน', 'กองรับรองมาตรฐาน', 79, 'PAGE', 'page/81', 2, '', 'Y'),
(82, 'The Pacific Accreditation Cooperation (PAC) ', 'The Pacific Accreditation Cooperation (PAC) ', 79, 'PAGE', 'page/82', 3, '', 'Y'),
(83, 'การยอมรับความสามารถของหน่วยงานรับรองสินค้าเกษตร และอาหาร ', 'การยอมรับความสามารถของหน่วยงานรับรองสินค้าเกษตร และอาหาร ', 79, 'PAGE', 'page/83', 4, '', 'Y'),
(84, 'มาตรฐานสากลการเป็นหน่วยรับรองระบบงาน CA (credittaion body : AB) ด้านสินค้าเกษตร และอาหาร', 'มาตรฐานสากลการเป็นหน่วยรับรองระบบงาน CA (credittaion body : AB) ด้านสินค้าเกษตร และอาหาร', 79, 'PAGE', 'page/84', 5, '', 'Y'),
(85, 'การรับรองระบบงาน', 'การรับรองระบบงาน', 79, 'PAGE', 'page/85', 4, '', 'Y'),
(86, 'รายชื่อหน่วยตรวจ และรับรอง ', 'รายชื่อหน่วยตรวจ และรับรอง ', 79, 'PAGE', 'page/86', 5, '', 'Y'),
(87, 'เอกสารและคลังข้อมูล ', 'เอกสารและคลังข้อมูล ', 79, 'PAGE', 'page/87', 6, '', 'Y'),
(88, 'ความร่วมมือระดับนานาชาติ', 'ความร่วมมือระดับนานาชาติ', 3, 'PARENT', 'page/1', 4, '', 'Y'),
(89, 'องค์การด้านความปลอดภัยอาหาร ', 'องค์การด้านความปลอดภัยอาหาร ', 88, 'PAGE', 'page/89', 1, '', 'Y'),
(90, 'สุขอนามัยและสุขอนามัยพืช ', 'สุขอนามัยและสุขอนามัยพืช ', 88, 'PAGE', 'page/90', 2, '', 'Y'),
(91, 'ASEAN FOOD SAFTY NETWORK ', 'ASEAN FOOD SAFTY NETWORK ', 88, 'PAGE', 'page/91', 3, '', 'Y'),
(92, 'ผลการประชุมนานาชาติ', 'ผลการประชุมนานาชาติ', 88, 'PAGE', 'page/92', 4, '', 'Y'),
(93, 'ด้านการควบคุม', 'ด้านการควบคุม', 3, 'PARENT', 'page/1', 4, '', 'Y'),
(94, 'การอนุญาต', 'การอนุญาต', 93, 'PAGE', 'page/94', 1, '', 'Y'),
(95, 'ตรวจสอบเฝ้าระวัง', 'ตรวจสอบเฝ้าระวัง', 93, 'PAGE', 'page/95', 2, '', 'Y'),
(96, 'การบูรณาการ', 'การบูรณาการ', 93, 'PAGE', 'page/96', 3, '', 'Y'),
(97, 'รายชื่อผู้ได้รับใบอนุญาต/ใบรับรองมาตรฐานบังคับ', 'รายชื่อผู้ได้รับใบอนุญาต/ใบรับรองมาตรฐานบังคับ', 93, 'PAGE', 'page/97', 4, '', 'Y'),
(98, 'Q Mark ', 'Q Mark ', 3, 'PARENT', 'page/1', 5, '', 'Y'),
(99, 'เกี่ยวกับ Q Mark ', 'เกี่ยวกับ Q Mark ', 98, 'PAGE', 'page/99', 1, '', 'Y'),
(100, 'ตรวจสอบรหัสเครื่องหมายรับรองมาตรฐาน ', 'ตรวจสอบรหัสเครื่องหมายรับรองมาตรฐาน ', 98, 'PAGE', 'page/100', 2, '', 'Y'),
(101, 'ศูนย์ข้อมูลข่าวสาร ', 'ศูนย์ข้อมูลข่าวสาร ', 3, 'PARENT', 'page/1', 6, '', 'Y'),
(102, 'ศูนย์ข้อมูลข่าวสาร ', 'ศูนย์ข้อมูลข่าวสาร ', 101, 'PAGE', 'page/102', 1, '', 'Y'),
(103, 'ข่าวประชาสัมพันธ์', 'ข่าวประชาสัมพันธ์', 101, 'PAGE', 'page/103', 2, '', 'Y'),
(104, 'ข้อมูลข่าวสารตาม มาตรา 7.', 'ข้อมูลข่าวสารตาม มาตรา 7.', 101, 'PAGE', 'page/104', 3, '', 'Y'),
(105, 'ข้อมูลข่าวสารตาม มาตรา 9.', 'ข้อมูลข่าวสารตาม มาตรา 9.', 101, 'PAGE', 'page/105', 4, '', 'Y'),
(106, 'สัญญาอื่นๆ', 'สัญญาอื่นๆ', 101, 'PAGE', 'page/106', 5, '', 'Y'),
(107, 'เอกสารอื่นๆ ที่ต้องรายงาน', 'เอกสารอื่นๆ ที่ต้องรายงาน', 101, 'PAGE', 'page/107', 6, '', 'Y'),
(108, 'ข้อมูลข่าวสารที่น่าสนใจ', 'ข้อมูลข่าวสารที่น่าสนใจ', 101, 'PAGE', 'page/108', 7, '', 'Y'),
(109, 'แบบขอใช้บริการออนไลน์', 'แบบขอใช้บริการออนไลน์', 101, 'PAGE', 'page/109', 8, '', 'Y'),
(110, 'แบบรับฟังความคิดเห็น', 'แบบรับฟังความคิดเห็น', 101, 'PAGE', 'page/110', 9, '', 'Y'),
(111, 'บริการอื่นๆ', 'บริการอื่นๆ', 3, 'PARENT', 'page/1', 6, '', 'Y'),
(112, 'ผลไม้ไทย ', 'ผลไม้ไทย ', 111, 'PAGE', 'page/112', 1, '', 'Y'),
(113, 'Q อาสา ', 'Q อาสา ', 111, 'PAGE', 'page/113', 2, '', 'Y'),
(114, 'โครงการส่งเสริมการบริโภค และใช้วัตถุดิบสินค้า Q', 'โครงการส่งเสริมการบริโภค และใช้วัตถุดิบสินค้า Q', 111, 'PAGE', 'page/114', 3, '', 'Y'),
(115, 'โครงการเกษตรเพื่อชีวิต', 'โครงการเกษตรเพื่อชีวิต', 111, 'PAGE', 'page/115', 4, '', 'Y'),
(116, 'DGT Fram', 'DGT Fram', 111, 'PAGE', 'page/116', 5, '', 'Y'),
(117, 'QR Trace on cloud', 'QR Trace on cloud', 111, 'PAGE', 'page/117', 6, '', 'Y'),
(118, 'คู่มือบริการประชาชน', 'คู่มือบริการประชาชน', 3, 'PAGE', 'page/118', 7, '', 'Y'),
(119, 'ข่าวประชาสัมพันธ์', 'ข่าวประชาสัมพันธ์', 4, 'PARENT', 'page/1', 1, '', 'Y'),
(120, 'ข่าว', 'ข่าว', 119, 'PAGE', 'page/120', 1, '', 'Y'),
(121, 'Clipping News', 'Clipping News', 119, 'PAGE', 'page/121', 2, '', 'Y'),
(122, 'เตือนภัยสินค้าเกษตร', 'เตือนภัยสินค้าเกษตร', 119, 'PAGE', 'page/122', 3, '', 'Y'),
(123, 'รับสมัครงาน ', 'รับสมัครงาน ', 119, 'PAGE', 'page/123', 4, '', 'Y'),
(124, 'อบรม/สัมมนา ', 'อบรม/สัมมนา ', 4, 'PARENT', 'page/1', 2, '', 'Y'),
(125, 'ฝึกอบรม ', 'ฝึกอบรม ', 124, 'PAGE', 'page/125', 1, '', 'Y'),
(126, 'สัมมนา ', 'สัมมนา ', 124, 'PAGE', 'page/126', 2, '', 'Y'),
(127, 'สัมมนามาตรฐานสินค้าเกษตร ', 'สัมมนามาตรฐานสินค้าเกษตร ', 124, 'PAGE', 'page/127', 3, '', 'Y'),
(128, 'แผนการจัดซื้อจัดจ้าง ', 'แผนการจัดซื้อจัดจ้าง ', 5, 'PAGE', 'page/128', 1, '', 'Y'),
(129, 'ประกาศราคากลาง ', 'ประกาศราคากลาง ', 5, 'PAGE', 'page/129', 2, '', 'Y'),
(130, 'จัดทำร่างเอกสารประกวดราคา  ', 'จัดทำร่างเอกสารประกวดราคา  ', 5, 'PAGE', 'page/130', 3, '', 'Y'),
(131, 'ประกาศเชิญชวนทั่วไป (e-Bidding)', 'ประกาศเชิญชวนทั่วไป (e-Bidding)', 5, 'PAGE', 'page/131', 4, '', 'Y'),
(132, 'ประกาศเชิญชวนทั่วไป  (e-Market)', 'ประกาศเชิญชวนทั่วไป  (e-Market)', 5, 'PAGE', 'page/132', 5, '', 'Y'),
(133, 'วิธีคัดเลือก ', 'วิธีคัดเลือก ', 5, 'PAGE', 'page/133', 6, '', 'Y'),
(134, 'วิธีเฉพาะเจาะจง ', 'วิธีเฉพาะเจาะจง ', 5, 'PAGE', 'page/134', 6, '', 'Y'),
(135, 'จ้างที่ปรึกษา ', 'จ้างที่ปรึกษา ', 5, 'PAGE', 'page/135', 7, '', 'Y'),
(136, 'ประกาศเปลี่ยนแปลง', 'ประกาศเปลี่ยนแปลง', 5, 'PAGE', 'page/136', 8, '', 'Y'),
(137, 'ประกาศยกเลิกการจัดซื้อจัดจ้าง', 'ประกาศยกเลิกการจัดซื้อจัดจ้าง', 5, 'PAGE', 'page/137', 9, '', 'Y'),
(138, 'ประกาสผลผู้ชนะ', 'ประกาสผลผู้ชนะ', 5, 'PAGE', 'page/138', 10, '', 'Y'),
(139, 'ขายทอดตลาด ', 'ขายทอดตลาด ', 5, 'PAGE', 'page/139', 11, '', 'Y'),
(140, 'ผลการดาเนินการจัดซื้อจัดจ้างประจาปี (สขร.1) ', 'ผลการดาเนินการจัดซื้อจัดจ้างประจาปี (สขร.1) ', 5, 'PAGE', 'page/140', 12, '', 'Y'),
(141, 'ผู้ทิ้งงาน', 'ผู้ทิ้งงาน', 5, 'PAGE', 'page/141', 13, '', 'Y'),
(142, 'สื่อวีดิทัศน์', 'สื่อวีดิทัศน์', 6, 'PAGE', 'page/142', 1, '', 'Y'),
(143, 'สื่อสิ่งพิมพ์', 'สื่อสิ่งพิมพ์', 6, 'PAGE', 'page/143', 2, '', 'Y'),
(144, 'Infographic ', 'Infographic ', 6, 'PAGE', 'page/144', 3, '', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `MOM_Files`
--

DROP TABLE IF EXISTS `MOM_Files`;
CREATE TABLE `MOM_Files` (
  `momFileID` int(11) NOT NULL,
  `meetingID` int(11) DEFAULT NULL,
  `standardID` int(11) DEFAULT NULL,
  `fileName` varchar(45) DEFAULT NULL,
  `filePath` varchar(500) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `crateDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

DROP TABLE IF EXISTS `News`;
CREATE TABLE `News` (
  `id` int(11) NOT NULL,
  `news_type` varchar(100) NOT NULL,
  `news_date` date NOT NULL,
  `image_cover_path` varchar(512) NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `contents` longblob NOT NULL,
  `contents_en` longblob,
  `actives` char(1) NOT NULL DEFAULT 'Y',
  `visit_count` int(11) NOT NULL,
  `show_homepage` char(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `News`
--

INSERT INTO `News` (`id`, `news_type`, `news_date`, `image_cover_path`, `title_th`, `title_en`, `create_date`, `update_date`, `contents`, `contents_en`, `actives`, `visit_count`, `show_homepage`) VALUES
(1, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001110456_920821.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 11:04:56', 0x3c703e3c7370616e207374796c653d22666f6e742d73697a653a31307074223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d612c73616e732d7365726966223ee0b8a7e0b8b1e0b899e0b897e0b8b5e0b98820313520e0b8aae0b8b4e0b887e0b8abe0b8b2e0b884e0b8a1203235363120e0b89ee0b8a5e0b980e0b8ade0b881266e6273703b3c7374726f6e673ee0b89be0b8a3e0b8b0e0b8a2e0b8b8e0b897e0b898e0b98c20e0b888e0b8b1e0b899e0b897e0b8a3e0b98ce0b982e0b8ade0b88ae0b8b23c2f7374726f6e673e266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b89ee0b8a3e0b989e0b8ade0b8a1e0b894e0b989e0b8a7e0b8a2266e6273703b3c7374726f6e673ee0b899e0b8b2e0b8a2e0b8a7e0b8b5e0b8a3e0b8b0e0b8a8e0b8b1e0b881e0b894e0b8b4e0b98c20e0b982e0b884e0b8a7e0b8aae0b8b8e0b8a3e0b8b1e0b895e0b899e0b98c3c2f7374726f6e673e266e6273703be0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b8a7e0b988e0b8b2e0b881e0b8b2e0b8a3e0b881e0b8a3e0b8b0e0b897e0b8a3e0b8a7e0b887e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b981e0b8a5e0b8b0e0b881e0b8b5e0b8ace0b8b2266e6273703b3c7374726f6e673ee0b899e0b8b2e0b8a2e0b8ade0b8b2e0b884e0b8a120e0b980e0b895e0b8b4e0b8a1e0b89ee0b8b4e0b897e0b8a2e0b8b2e0b984e0b89ee0b8aae0b8b4e0b8903c2f7374726f6e673e266e6273703be0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b8a7e0b988e0b8b2e0b881e0b8b2e0b8a3e0b881e0b8a3e0b8b0e0b897e0b8a3e0b8a7e0b887e0b884e0b8a1e0b899e0b8b2e0b884e0b8a1e0b897e0b8b5e0b98820e0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a1e0b8b2e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b981e0b8a5e0b8b0e0b981e0b899e0b8a7e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b8872028e0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad2920e0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b980e0b89ee0b8b7e0b988e0b8ade0b8a1e0b8b8e0b988e0b887e0b89ee0b8b1e0b892e0b899e0b8b2e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b982e0b8a2e0b887e0b983e0b8abe0b989e0b980e0b89be0b987e0b899e0b8a3e0b8b0e0b89ae0b89ae0b980e0b894e0b8b5e0b8a2e0b8a7e0b897e0b8b1e0b989e0b887e0b8a3e0b8b0e0b89ae0b89a20e0b8aae0b988e0b887e0b980e0b8aae0b8a3e0b8b4e0b8a1e0b881e0b8b2e0b8a3e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8aae0b8b2e0b898e0b8b2e0b8a3e0b893e0b8b020e0b8a5e0b894e0b89be0b8b1e0b88de0b8abe0b8b2e0b888e0b8a3e0b8b2e0b888e0b8a3e0b983e0b899e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b8993c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a3070783b20746578742d616c69676e3a2d7765626b69742d6c656674223e266e6273703b3c2f703e0d0a0d0a3c646976207374796c653d222d7765626b69742d746578742d7374726f6b652d77696474683a3070783b20746578742d616c69676e3a2d7765626b69742d6c656674223e0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b20266e6273703b20266e6273703be0b881e0b988e0b8ade0b899e0b8ade0b8ade0b881e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b982e0b894e0b8a2e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b888e0b8b2e0b881e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b8aae0b899e0b8b2e0b8a1e0b881e0b8b5e0b8ace0b8b2e0b981e0b8abe0b988e0b887e0b88ae0b8b2e0b895e0b8b42857312920266e6273703be0b984e0b89be0b8a2e0b8b1e0b887e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b285331322920266e646173683b20536b7977616c6b266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b266e646173683b266e6273703be0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b899e0b8b1e0b989e0b899266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5266e6273703be0b984e0b894e0b989e0b8a3e0b8b1e0b89ae0b8a1e0b8ade0b89ae0b89ae0b8b1e0b895e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b88be0b8b6e0b988e0b887e0b8a1e0b8b5e0b8a0e0b8b2e0b89ee0b896e0b988e0b8b2e0b8a2e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b882e0b893e0b8b0e0b881e0b8b3e0b8a5e0b8b1e0b887e0b89ae0b8b1e0b887e0b884e0b8b1e0b89ae0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b980e0b8a1e0b8b7e0b988e0b8ade0b884e0b8a3e0b8b1e0b989e0b887e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b984e0b89be0b980e0b89be0b8b4e0b894e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b8aae0b8b3e0b982e0b8a3e0b887e0b980e0b8a1e0b8b7e0b988e0b8ade0b89be0b8b5e0b897e0b8b5e0b988e0b89ce0b988e0b8b2e0b899e0b8a1e0b8b220e0b888e0b8b2e0b881e0b899e0b8b2e0b8a2e0b884e0b8b5e0b8a3e0b8b5266e6273703be0b881e0b8b2e0b88de0b888e0b899e0b89ee0b8b2e0b8aae0b899e0b98c266e6273703be0b89be0b8a3e0b8b0e0b898e0b8b2e0b899e0b881e0b8a3e0b8a3e0b8a1e0b881e0b8b2e0b8a3266e6273703be0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897266e6273703be0b89ae0b8b5e0b897e0b8b5e0b980e0b8ade0b8aa266e6273703be0b881e0b8a3e0b8b8e0b98ae0b89b266e6273703be0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887e0b8aae0b98c266e6273703be0b888e0b98de0b8b2e0b881e0b8b1e0b894266e6273703b28e0b8a1e0b8abe0b8b2e0b88ae0b89929266e6273703b266e6273703be0b982e0b894e0b8a2e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b881e0b8b2e0b8a8e0b89ae0b899e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b42545320266e6273703be0b882e0b893e0b8b0e0b897e0b8b5e0b988e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b8af20e0b8a2e0b8b1e0b887e0b980e0b89be0b8b4e0b894e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b895e0b8b2e0b8a1e0b89be0b881e0b895e0b8b420e0b88be0b8b6e0b988e0b887e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b89ee0b89ae0b89be0b8b0e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b899e0b8b1e0b881e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b897e0b8b5e0b988e0b8a1e0b8b2e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b8ade0b8a2e0b988e0b8b2e0b887e0b980e0b89be0b987e0b899e0b881e0b8b1e0b899e0b980e0b8ade0b88720e0b982e0b894e0b8a2e0b984e0b894e0b989e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b8b0e0b894e0b8a7e0b881e0b983e0b899e0b881e0b8b2e0b8a3e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b220e0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8ade0b8a2e0b8b9e0b988e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b881e0b8ade0b89ae0b8ade0b8b2e0b88ae0b8b5e0b89ee0b895e0b988e0b8b2e0b88720e0b98620e0b882e0b8ade0b887e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b894e0b989e0b8a7e0b8a2e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b899e0b983e0b88820e0b89ee0b8a3e0b989e0b8ade0b8a1e0b881e0b8b1e0b899e0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b980e0b8aae0b8b5e0b8a2e0b8aae0b8a5e0b8b0e0b897e0b8b5e0b988e0b899e0b8b1e0b988e0b887e0b882e0b8ade0b887e0b895e0b899e0b980e0b8ade0b887e0b89ae0b899e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b983e0b8abe0b989e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b88be0b8b6e0b988e0b887e0b980e0b89be0b987e0b899e0b8aae0b8b8e0b8a0e0b8b2e0b89ee0b8aae0b895e0b8a3e0b8b5e0b984e0b894e0b989e0b899e0b8b1e0b988e0b887e0b894e0b989e0b8a7e0b8a220e0b982e0b894e0b8a2e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b897e0b8b5e0b988e0b984e0b894e0b989e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b983e0b8abe0b989e0b881e0b8b3e0b8a5e0b8b1e0b887e0b983e0b888e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b983e0b899e0b881e0b8b2e0b8a3e0b897e0b8b3e0b887e0b8b2e0b899e0b981e0b8a5e0b8b0e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b8a3e0b8b2e0b88ae0b881e0b8b2e0b8a3e0b981e0b89ce0b988e0b899e0b894e0b8b4e0b899e0b8ade0b8b5e0b881e0b894e0b989e0b8a7e0b8a23c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b980e0b8a1e0b8b7e0b988e0b8ade0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b896e0b8b6e0b887e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b2853313229266e6273703be0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b895e0b988e0b8ade0b895e0b8b2e0b8a1e0b897e0b8b2e0b887e0b980e0b894e0b8b4e0b899e0b8a2e0b881e0b8a3e0b8b0e0b894e0b8b1e0b89a266e6273703b28536b7977616c6b29266e6273703be0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887e0b89be0b8a3e0b8b0e0b8a1e0b8b2e0b893266e6273703b323530266e6273703be0b980e0b8a1e0b895e0b8a3266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b88ae0b8b7e0b988e0b8ade0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b897e0b8b5e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703b28e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b22920266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b8a3e0b8b1e0b89ae0b89fe0b8b1e0b887e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b8a2e0b8aae0b8a3e0b8b8e0b89be0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b981e0b8a5e0b8b0e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887266e6273703b28e0b8a5e0b989e0b8ad266e6273703be0b8a3e0b8b2e0b887266e6273703be0b980e0b8a3e0b8b7e0b8ad29266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b981e0b8a5e0b8b0e0b981e0b89ce0b899e0b887e0b8b2e0b899e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b981e0b8a5e0b8b0e0b8aae0b988e0b8a7e0b899e0b895e0b988e0b8ade0b882e0b8a2e0b8b2e0b8a2e0b983e0b899e0b8ade0b899e0b8b2e0b884e0b89520e0b893266e6273703be0b89ae0b8a3e0b8b4e0b980e0b8a7e0b893e0b897e0b8b2e0b887e0b980e0b894e0b8b4e0b899e0b8a2e0b881e0b8a3e0b8b0e0b894e0b8b1e0b89a266e6273703b28e0b8aae0b881e0b8b2e0b8a2e0b8a7e0b8ade0b8a5e0b98ce0b88429266e6273703be0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b3c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b982e0b8ade0b881e0b8b2e0b8aae0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b881e0b8a5e0b988e0b8b2e0b8a7e0b88ae0b8b7e0b988e0b899e0b88ae0b8a1e0b980e0b881e0b8b5e0b988e0b8a2e0b8a7e0b881e0b8b1e0b89ae0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b899e0b8a7e0b988e0b8b2e0b8a1e0b8b5e0b884e0b8a7e0b8b2e0b8a1e0b884e0b8a5e0b988e0b8ade0b887e0b895e0b8b1e0b8a7e0b894e0b8b5e0b981e0b8a5e0b989e0b8a720e0b88be0b8b6e0b988e0b887e0b983e0b899e0b8ade0b899e0b8b2e0b884e0b895e0b895e0b989e0b8ade0b887e0b8a1e0b8b5e0b881e0b8b2e0b8a3e0b882e0b8a2e0b8b2e0b8a2e0b980e0b8a1e0b8b7e0b8ade0b887e0b981e0b8a5e0b8b0e0b89ee0b8b1e0b892e0b899e0b8b2e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b8ade0b8ade0b881e0b984e0b89be0b983e0b899e0b89ae0b8a3e0b8b4e0b980e0b8a7e0b893e0b8a3e0b8ade0b89ae0b899e0b8ade0b881e0b981e0b8a5e0b8b0e0b89be0b8a3e0b8b4e0b8a1e0b893e0b891e0b8a5e0b983e0b8abe0b989e0b8a1e0b8b2e0b881e0b882e0b8b6e0b989e0b89920e0b980e0b89ee0b8b7e0b988e0b8ade0b881e0b8a3e0b8b0e0b888e0b8b2e0b8a2e0b884e0b8a7e0b8b2e0b8a1e0b980e0b888e0b8a3e0b8b4e0b88de0b984e0b89be0b8aae0b8b9e0b988e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b8ade0b8b7e0b988e0b899e0b981e0b897e0b899e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b980e0b889e0b89ee0b8b2e0b8b0e0b983e0b899e0b980e0b882e0b895e0b980e0b8a1e0b8b7e0b8ade0b887e0b980e0b897e0b988e0b8b2e0b899e0b8b1e0b989e0b89920e0b88be0b8b6e0b988e0b887e0b888e0b8b0e0b8aae0b8b2e0b8a1e0b8b2e0b8a3e0b88ae0b988e0b8a7e0b8a2e0b89ae0b8a3e0b8a3e0b980e0b897e0b8b2e0b884e0b8a7e0b8b2e0b8a1e0b981e0b8ade0b8ade0b8b1e0b894e0b981e0b8a5e0b8b0e0b981e0b881e0b989e0b984e0b882e0b89be0b8b1e0b88de0b8abe0b8b2e0b881e0b8b2e0b8a3e0b888e0b8a3e0b8b2e0b888e0b8a3e0b984e0b894e0b989e0b894e0b989e0b8a7e0b8a220e0b982e0b894e0b8a2e0b981e0b89ce0b899e0b881e0b8b2e0b8a3e0b894e0b8b3e0b980e0b899e0b8b4e0b899e0b881e0b8b2e0b8a3e0b894e0b8b1e0b887e0b881e0b8a5e0b988e0b8b2e0b8a7e0b899e0b8b1e0b989e0b899e0b8ade0b8a2e0b8b9e0b988e0b983e0b899e0b8a2e0b8b8e0b897e0b898e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b88ae0b8b2e0b895e0b8b4266e6273703b3230266e6273703be0b897e0b8b5e0b988e0b8a3e0b8b1e0b890e0b89ae0b8b2e0b8a5e0b984e0b894e0b989e0b881e0b8b3e0b8abe0b899e0b894e0b984e0b8a7e0b989e0b980e0b8a3e0b8b5e0b8a2e0b89ae0b8a3e0b989e0b8ade0b8a2e0b981e0b8a5e0b989e0b8a73c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b881e0b8b1e0b899e0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b89ee0b89ae0b89be0b8b0e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b88ae0b8b2e0b8a7e0b89ae0b989e0b8b2e0b899e0b983e0b899e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b897e0b8b5e0b988e0b8a1e0b8b2e0b983e0b8abe0b989e0b881e0b8b2e0b8a3e0b895e0b989e0b8ade0b899e0b8a3e0b8b1e0b89ae0b8ade0b8a2e0b988e0b8b2e0b887e0b980e0b89be0b987e0b899e0b881e0b8b1e0b899e0b980e0b8ade0b88720e0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8ade0b8a2e0b8b9e0b98820e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b980e0b89ee0b8b2e0b8b0e0b89be0b8a5e0b8b9e0b881e0b89ee0b8b7e0b88ae0b895e0b988e0b8b2e0b88720e0b98620e0b983e0b899e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b894e0b8b1e0b887e0b881e0b8a5e0b988e0b8b2e0b8a720266e6273703be0b982e0b894e0b8a2e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b984e0b894e0b989e0b899e0b8b3e0b89ce0b8a5e0b8b4e0b895e0b8a0e0b8b1e0b893e0b891e0b98ce0b981e0b89be0b8a3e0b8a3e0b8b9e0b89be0b981e0b8a5e0b8b0e0b89ce0b8a5e0b89ce0b8a5e0b8b4e0b895e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b980e0b881e0b8a9e0b895e0b8a3e0b8a1e0b8b2e0b8a1e0b8ade0b89ae0b983e0b8abe0b989e0b881e0b8b1e0b89ae0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b894e0b989e0b8a7e0b8a220e0b983e0b899e0b982e0b8ade0b881e0b8b2e0b8aae0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a1e0b8b2e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b980e0b8a2e0b8b5e0b8a2e0b899e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b981e0b8a5e0b8b0e0b981e0b899e0b8a7e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b8872028e0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad2920e0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320266e6273703b3c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b888e0b8b2e0b881e0b899e0b8b1e0b989e0b899266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5266e6273703be0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b982e0b894e0b8a2e0b980e0b8a3e0b8b7e0b8ade0b897e0b8b5e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b984e0b89be0b8a2e0b8b1e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b881266e6273703be0b980e0b882e0b895e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88d266e6273703b266e6273703be0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887e0b89be0b8a3e0b8b0e0b8a1e0b8b2e0b893266e6273703b322e35266e6273703be0b881e0b8b4e0b982e0b8a5e0b980e0b8a1e0b895e0b8a3266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b8a3e0b8b1e0b89ae0b89fe0b8b1e0b887e0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b8a2e0b980e0b88ae0b8b4e0b887e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b896e0b8b6e0b887e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2e0b981e0b8a5e0b8b0e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b8b3e0b884e0b8b1e0b88de0b882e0b8ade0b887e0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ad266e6273703be0b8aae0b896e0b8b2e0b899e0b897e0b8b5e0b988e0b8aae0b8b3e0b884e0b8b1e0b88de0b888e0b8b2e0b881e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703be0b984e0b89be0b8a2e0b8b1e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b881266e6273703be0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b88ae0b8a1e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b89fe0b8b7e0b989e0b899e0b8a7e0b8b4e0b896e0b8b5e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b88ae0b8b8e0b8a1e0b88ae0b899e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887e0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8a2e0b988e0b8b2e0b899e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b881e0b8a3e0b8b8e0b887e0b898e0b899e0b89ae0b8b8e0b8a3e0b8b5266e6273703be0b981e0b8a5e0b8b0e0b895e0b8a3e0b8a7e0b888e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887266e6273703b28e0b8a5e0b989e0b8ad266e6273703be0b8a3e0b8b2e0b887266e6273703be0b980e0b8a3e0b8b7e0b8ad29266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3266e6273703be0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b8a5e0b988e0b8ade0b887e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b981e0b8a5e0b8b0e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887266e6273703be0b881e0b988e0b8ade0b899e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b895e0b988e0b8ade0b984e0b89be0b8a2e0b8b1e0b887e0b8a7e0b8b1e0b894e0b8ade0b8b4e0b899e0b897e0b8b2e0b8a3e0b8b2e0b8a12028e0b89ae0b8b2e0b887e0b8a2e0b8b5e0b988e0b980e0b8a3e0b8b7e0b8ad2920e0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887266e6273703b332e35266e6273703be0b881e0b8b4e0b982e0b8a5e0b980e0b8a1e0b895e0b8a320e0b980e0b89ee0b8b7e0b988e0b8ade0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b89fe0b8b7e0b989e0b899e0b8a7e0b8b4e0b896e0b8b5e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b88ae0b8b8e0b8a1e0b88ae0b899e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887e0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8a2e0b988e0b8b2e0b899e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b881e0b8a3e0b8b8e0b887e0b898e0b899e0b89ae0b8b8e0b8a3e0b8b5e0b895e0b988e0b8ade0b984e0b89b266e6273703b20266e6273703b20266e6273703b20266e6273703b3c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b897e0b8b1e0b989e0b887e0b899e0b8b5e0b98920e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b8a7e0b8b1e0b899e0b897e0b8b5e0b988266e6273703b3238266e6273703be0b881e0b8a3e0b881e0b88ee0b8b2e0b884e0b8a1266e6273703b32353631266e6273703be0b980e0b89be0b987e0b899e0b895e0b989e0b899e0b8a1e0b8b220e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3e0b984e0b894e0b989e0b980e0b89be0b8b4e0b894e0b897e0b894e0b8a5e0b8ade0b887e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b983e0b8abe0b8a1e0b98820e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b8992de0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a12028e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b22920e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88d20e0b896e0b8b6e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b88120e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b881e0b8ade0b881e0b983e0b8abe0b88de0b9882028e0b895e0b8a5e0b8b2e0b894e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b8872920e0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b982e0b8a2e0b887e0b8a3e0b8b0e0b89ae0b89ae0b884e0b8a1e0b899e0b8b2e0b884e0b8a1e0b897e0b8b2e0b887e0b899e0b989e0b8b3e0b881e0b8b1e0b89ae0b980e0b882e0b989e0b8b2e0b881e0b8b1e0b89ae0b982e0b884e0b8a3e0b887e0b882e0b988e0b8b2e0b8a2e0b8aae0b8b2e0b898e0b8b2e0b8a3e0b893e0b8b0e0b8ade0b8b7e0b988e0b89920e0b98620e0b895e0b8b2e0b8a1e0b899e0b982e0b8a2e0b89ae0b8b2e0b8a2266e6273703b266c6471756f3be0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad26726471756f3b266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b982e0b894e0b8a2e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b898e0b899e0b8b2e0b884e0b8a120e0b983e0b899e0b890e0b8b2e0b899e0b8b0e0b89ce0b8b9e0b989e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b8a3e0b8b0e0b89ae0b89ae0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad20e0b983e0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3e0b981e0b8a5e0b8b0e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b983e0b899e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b89920e0b8a1e0b8b2e0b980e0b89be0b987e0b899e0b89ce0b8b9e0b989e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b894e0b8a5e0b8ade0b88720e0b982e0b894e0b8a2e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b982e0b894e0b8a2e0b984e0b8a1e0b988e0b980e0b881e0b987e0b89ae0b884e0b988e0b8b2e0b982e0b894e0b8a2e0b8aae0b8b2e0b8a320e0b983e0b899e0b897e0b8b8e0b881e0b8a7e0b8b1e0b899e0b8abe0b8a2e0b8b8e0b894e0b980e0b8aae0b8b2e0b8a3e0b98ce0b8ade0b8b2e0b897e0b8b4e0b895e0b8a2e0b98ce0b981e0b8a5e0b8b0e0b8a7e0b8b1e0b899e0b8abe0b8a2e0b8b8e0b894e0b899e0b8b1e0b881e0b882e0b8b1e0b895e0b8a4e0b881e0b8a9e0b98c20e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b980e0b8a7e0b8a5e0b8b2266e6273703b30382e303020266e646173683b2031382e3030266e6273703be0b8992e20e0b980e0b8a3e0b8b7e0b8ade0b888e0b8b0e0b8ade0b8ade0b881e0b897e0b8b8e0b881266e6273703b3330266e6273703be0b899e0b8b2e0b897e0b8b520e0b8a1e0b8b5e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b897e0b8b5e0b988e0b983e0b881e0b8a5e0b989e0b881e0b8b1e0b89ae0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b220e0b981e0b8a5e0b8b0e0b888e0b8b8e0b894e0b888e0b8ade0b894e0b8a3e0b896e0b982e0b894e0b8a2e0b8aae0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b888e0b8b3e0b897e0b8b2e0b88720e0b88be0b8b6e0b988e0b887e0b89ce0b988e0b8b2e0b899e0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b897e0b8b5e0b988e0b980e0b89be0b987e0b899e0b8a2e0b988e0b8b2e0b899e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8aae0b8b3e0b884e0b8b1e0b88d20e0b980e0b88ae0b988e0b89920e0b895e0b8a5e0b8b2e0b894e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b88720e0b89ae0b989e0b8b2e0b899e0b8a8e0b8b4e0b8a5e0b89be0b8b4e0b89920e0b981e0b8a5e0b8b0e0b88ae0b8b8e0b8a1e0b88ae0b899e0b8a3e0b989e0b8b2e0b899e0b884e0b989e0b8b2e0b982e0b89ae0b8a3e0b8b2e0b89320e0b980e0b89be0b987e0b899e0b895e0b989e0b8993c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a3c2f6469763e0d0a, 0x3c703e3c7370616e207374796c653d22666f6e742d73697a653a31307074223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d612c73616e732d7365726966223ee0b8a7e0b8b1e0b899e0b897e0b8b5e0b98820313520e0b8aae0b8b4e0b887e0b8abe0b8b2e0b884e0b8a1203235363120e0b89ee0b8a5e0b980e0b8ade0b881266e6273703b3c7374726f6e673ee0b89be0b8a3e0b8b0e0b8a2e0b8b8e0b897e0b898e0b98c20e0b888e0b8b1e0b899e0b897e0b8a3e0b98ce0b982e0b8ade0b88ae0b8b23c2f7374726f6e673e266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b89ee0b8a3e0b989e0b8ade0b8a1e0b894e0b989e0b8a7e0b8a2266e6273703b3c7374726f6e673ee0b899e0b8b2e0b8a2e0b8a7e0b8b5e0b8a3e0b8b0e0b8a8e0b8b1e0b881e0b894e0b8b4e0b98c20e0b982e0b884e0b8a7e0b8aae0b8b8e0b8a3e0b8b1e0b895e0b899e0b98c3c2f7374726f6e673e266e6273703be0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b8a7e0b988e0b8b2e0b881e0b8b2e0b8a3e0b881e0b8a3e0b8b0e0b897e0b8a3e0b8a7e0b887e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b981e0b8a5e0b8b0e0b881e0b8b5e0b8ace0b8b2266e6273703b3c7374726f6e673ee0b899e0b8b2e0b8a2e0b8ade0b8b2e0b884e0b8a120e0b980e0b895e0b8b4e0b8a1e0b89ee0b8b4e0b897e0b8a2e0b8b2e0b984e0b89ee0b8aae0b8b4e0b8903c2f7374726f6e673e266e6273703be0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b8a7e0b988e0b8b2e0b881e0b8b2e0b8a3e0b881e0b8a3e0b8b0e0b897e0b8a3e0b8a7e0b887e0b884e0b8a1e0b899e0b8b2e0b884e0b8a1e0b897e0b8b5e0b98820e0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a1e0b8b2e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b981e0b8a5e0b8b0e0b981e0b899e0b8a7e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b8872028e0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad2920e0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b980e0b89ee0b8b7e0b988e0b8ade0b8a1e0b8b8e0b988e0b887e0b89ee0b8b1e0b892e0b899e0b8b2e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b982e0b8a2e0b887e0b983e0b8abe0b989e0b980e0b89be0b987e0b899e0b8a3e0b8b0e0b89ae0b89ae0b980e0b894e0b8b5e0b8a2e0b8a7e0b897e0b8b1e0b989e0b887e0b8a3e0b8b0e0b89ae0b89a20e0b8aae0b988e0b887e0b980e0b8aae0b8a3e0b8b4e0b8a1e0b881e0b8b2e0b8a3e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8aae0b8b2e0b898e0b8b2e0b8a3e0b893e0b8b020e0b8a5e0b894e0b89be0b8b1e0b88de0b8abe0b8b2e0b888e0b8a3e0b8b2e0b888e0b8a3e0b983e0b899e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b8993c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a3070783b20746578742d616c69676e3a2d7765626b69742d6c656674223e266e6273703b3c2f703e0d0a0d0a3c646976207374796c653d222d7765626b69742d746578742d7374726f6b652d77696474683a3070783b20746578742d616c69676e3a2d7765626b69742d6c656674223e0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b20266e6273703b20266e6273703be0b881e0b988e0b8ade0b899e0b8ade0b8ade0b881e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b982e0b894e0b8a2e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b888e0b8b2e0b881e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b8aae0b899e0b8b2e0b8a1e0b881e0b8b5e0b8ace0b8b2e0b981e0b8abe0b988e0b887e0b88ae0b8b2e0b895e0b8b42857312920266e6273703be0b984e0b89be0b8a2e0b8b1e0b887e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b285331322920266e646173683b20536b7977616c6b266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b266e646173683b266e6273703be0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b899e0b8b1e0b989e0b899266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5266e6273703be0b984e0b894e0b989e0b8a3e0b8b1e0b89ae0b8a1e0b8ade0b89ae0b89ae0b8b1e0b895e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b88be0b8b6e0b988e0b887e0b8a1e0b8b5e0b8a0e0b8b2e0b89ee0b896e0b988e0b8b2e0b8a2e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b882e0b893e0b8b0e0b881e0b8b3e0b8a5e0b8b1e0b887e0b89ae0b8b1e0b887e0b884e0b8b1e0b89ae0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b980e0b8a1e0b8b7e0b988e0b8ade0b884e0b8a3e0b8b1e0b989e0b887e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b984e0b89be0b980e0b89be0b8b4e0b894e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b8aae0b8b3e0b982e0b8a3e0b887e0b980e0b8a1e0b8b7e0b988e0b8ade0b89be0b8b5e0b897e0b8b5e0b988e0b89ce0b988e0b8b2e0b899e0b8a1e0b8b220e0b888e0b8b2e0b881e0b899e0b8b2e0b8a2e0b884e0b8b5e0b8a3e0b8b5266e6273703be0b881e0b8b2e0b88de0b888e0b899e0b89ee0b8b2e0b8aae0b899e0b98c266e6273703be0b89be0b8a3e0b8b0e0b898e0b8b2e0b899e0b881e0b8a3e0b8a3e0b8a1e0b881e0b8b2e0b8a3266e6273703be0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897266e6273703be0b89ae0b8b5e0b897e0b8b5e0b980e0b8ade0b8aa266e6273703be0b881e0b8a3e0b8b8e0b98ae0b89b266e6273703be0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887e0b8aae0b98c266e6273703be0b888e0b98de0b8b2e0b881e0b8b1e0b894266e6273703b28e0b8a1e0b8abe0b8b2e0b88ae0b89929266e6273703b266e6273703be0b982e0b894e0b8a2e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b881e0b8b2e0b8a8e0b89ae0b899e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b42545320266e6273703be0b882e0b893e0b8b0e0b897e0b8b5e0b988e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b8af20e0b8a2e0b8b1e0b887e0b980e0b89be0b8b4e0b894e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b895e0b8b2e0b8a1e0b89be0b881e0b895e0b8b420e0b88be0b8b6e0b988e0b887e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b89ee0b89ae0b89be0b8b0e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b899e0b8b1e0b881e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b897e0b8b5e0b988e0b8a1e0b8b2e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b8ade0b8a2e0b988e0b8b2e0b887e0b980e0b89be0b987e0b899e0b881e0b8b1e0b899e0b980e0b8ade0b88720e0b982e0b894e0b8a2e0b984e0b894e0b989e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b8b0e0b894e0b8a7e0b881e0b983e0b899e0b881e0b8b2e0b8a3e0b983e0b88ae0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b220e0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8ade0b8a2e0b8b9e0b988e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b881e0b8ade0b89ae0b8ade0b8b2e0b88ae0b8b5e0b89ee0b895e0b988e0b8b2e0b88720e0b98620e0b882e0b8ade0b887e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b894e0b989e0b8a7e0b8a2e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b899e0b983e0b88820e0b89ee0b8a3e0b989e0b8ade0b8a1e0b881e0b8b1e0b899e0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b980e0b8aae0b8b5e0b8a2e0b8aae0b8a5e0b8b0e0b897e0b8b5e0b988e0b899e0b8b1e0b988e0b887e0b882e0b8ade0b887e0b895e0b899e0b980e0b8ade0b887e0b89ae0b899e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b983e0b8abe0b989e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b88be0b8b6e0b988e0b887e0b980e0b89be0b987e0b899e0b8aae0b8b8e0b8a0e0b8b2e0b89ee0b8aae0b895e0b8a3e0b8b5e0b984e0b894e0b989e0b899e0b8b1e0b988e0b887e0b894e0b989e0b8a7e0b8a220e0b982e0b894e0b8a2e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b897e0b8b5e0b988e0b984e0b894e0b989e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b983e0b8abe0b989e0b881e0b8b3e0b8a5e0b8b1e0b887e0b983e0b888e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b983e0b899e0b881e0b8b2e0b8a3e0b897e0b8b3e0b887e0b8b2e0b899e0b981e0b8a5e0b8b0e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b8a3e0b8b2e0b88ae0b881e0b8b2e0b8a3e0b981e0b89ce0b988e0b899e0b894e0b8b4e0b899e0b8ade0b8b5e0b881e0b894e0b989e0b8a7e0b8a23c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b980e0b8a1e0b8b7e0b988e0b8ade0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b896e0b8b6e0b887e0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b2853313229266e6273703be0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b895e0b988e0b8ade0b895e0b8b2e0b8a1e0b897e0b8b2e0b887e0b980e0b894e0b8b4e0b899e0b8a2e0b881e0b8a3e0b8b0e0b894e0b8b1e0b89a266e6273703b28536b7977616c6b29266e6273703be0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887e0b89be0b8a3e0b8b0e0b8a1e0b8b2e0b893266e6273703b323530266e6273703be0b980e0b8a1e0b895e0b8a3266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b88ae0b8b7e0b988e0b8ade0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b897e0b8b5e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703b28e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b22920266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b8a3e0b8b1e0b89ae0b89fe0b8b1e0b887e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b8a2e0b8aae0b8a3e0b8b8e0b89be0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b981e0b8a5e0b8b0e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887266e6273703b28e0b8a5e0b989e0b8ad266e6273703be0b8a3e0b8b2e0b887266e6273703be0b980e0b8a3e0b8b7e0b8ad29266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b981e0b8a5e0b8b0e0b981e0b89ce0b899e0b887e0b8b2e0b899e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b981e0b8a5e0b8b0e0b8aae0b988e0b8a7e0b899e0b895e0b988e0b8ade0b882e0b8a2e0b8b2e0b8a2e0b983e0b899e0b8ade0b899e0b8b2e0b884e0b89520e0b893266e6273703be0b89ae0b8a3e0b8b4e0b980e0b8a7e0b893e0b897e0b8b2e0b887e0b980e0b894e0b8b4e0b899e0b8a2e0b881e0b8a3e0b8b0e0b894e0b8b1e0b89a266e6273703b28e0b8aae0b881e0b8b2e0b8a2e0b8a7e0b8ade0b8a5e0b98ce0b88429266e6273703be0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b2266e6273703b3c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b982e0b8ade0b881e0b8b2e0b8aae0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b881e0b8a5e0b988e0b8b2e0b8a7e0b88ae0b8b7e0b988e0b899e0b88ae0b8a1e0b980e0b881e0b8b5e0b988e0b8a2e0b8a7e0b881e0b8b1e0b89ae0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b899e0b8a7e0b988e0b8b2e0b8a1e0b8b5e0b884e0b8a7e0b8b2e0b8a1e0b884e0b8a5e0b988e0b8ade0b887e0b895e0b8b1e0b8a7e0b894e0b8b5e0b981e0b8a5e0b989e0b8a720e0b88be0b8b6e0b988e0b887e0b983e0b899e0b8ade0b899e0b8b2e0b884e0b895e0b895e0b989e0b8ade0b887e0b8a1e0b8b5e0b881e0b8b2e0b8a3e0b882e0b8a2e0b8b2e0b8a2e0b980e0b8a1e0b8b7e0b8ade0b887e0b981e0b8a5e0b8b0e0b89ee0b8b1e0b892e0b899e0b8b2e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b8ade0b8ade0b881e0b984e0b89be0b983e0b899e0b89ae0b8a3e0b8b4e0b980e0b8a7e0b893e0b8a3e0b8ade0b89ae0b899e0b8ade0b881e0b981e0b8a5e0b8b0e0b89be0b8a3e0b8b4e0b8a1e0b893e0b891e0b8a5e0b983e0b8abe0b989e0b8a1e0b8b2e0b881e0b882e0b8b6e0b989e0b89920e0b980e0b89ee0b8b7e0b988e0b8ade0b881e0b8a3e0b8b0e0b888e0b8b2e0b8a2e0b884e0b8a7e0b8b2e0b8a1e0b980e0b888e0b8a3e0b8b4e0b88de0b984e0b89be0b8aae0b8b9e0b988e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b8ade0b8b7e0b988e0b899e0b981e0b897e0b899e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b980e0b889e0b89ee0b8b2e0b8b0e0b983e0b899e0b980e0b882e0b895e0b980e0b8a1e0b8b7e0b8ade0b887e0b980e0b897e0b988e0b8b2e0b899e0b8b1e0b989e0b89920e0b88be0b8b6e0b988e0b887e0b888e0b8b0e0b8aae0b8b2e0b8a1e0b8b2e0b8a3e0b88ae0b988e0b8a7e0b8a2e0b89ae0b8a3e0b8a3e0b980e0b897e0b8b2e0b884e0b8a7e0b8b2e0b8a1e0b981e0b8ade0b8ade0b8b1e0b894e0b981e0b8a5e0b8b0e0b981e0b881e0b989e0b984e0b882e0b89be0b8b1e0b88de0b8abe0b8b2e0b881e0b8b2e0b8a3e0b888e0b8a3e0b8b2e0b888e0b8a3e0b984e0b894e0b989e0b894e0b989e0b8a7e0b8a220e0b982e0b894e0b8a2e0b981e0b89ce0b899e0b881e0b8b2e0b8a3e0b894e0b8b3e0b980e0b899e0b8b4e0b899e0b881e0b8b2e0b8a3e0b894e0b8b1e0b887e0b881e0b8a5e0b988e0b8b2e0b8a7e0b899e0b8b1e0b989e0b899e0b8ade0b8a2e0b8b9e0b988e0b983e0b899e0b8a2e0b8b8e0b897e0b898e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b88ae0b8b2e0b895e0b8b4266e6273703b3230266e6273703be0b897e0b8b5e0b988e0b8a3e0b8b1e0b890e0b89ae0b8b2e0b8a5e0b984e0b894e0b989e0b881e0b8b3e0b8abe0b899e0b894e0b984e0b8a7e0b989e0b980e0b8a3e0b8b5e0b8a2e0b89ae0b8a3e0b989e0b8ade0b8a2e0b981e0b8a5e0b989e0b8a73c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b881e0b8b1e0b899e0b899e0b8b5e0b98920e0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b520e0b984e0b894e0b989e0b89ee0b89ae0b89be0b8b0e0b89ee0b8b9e0b894e0b884e0b8b8e0b8a2e0b881e0b8b1e0b89ae0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b88ae0b8b2e0b8a7e0b89ae0b989e0b8b2e0b899e0b983e0b899e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b897e0b8b5e0b988e0b8a1e0b8b2e0b983e0b8abe0b989e0b881e0b8b2e0b8a3e0b895e0b989e0b8ade0b899e0b8a3e0b8b1e0b89ae0b8ade0b8a2e0b988e0b8b2e0b887e0b980e0b89be0b987e0b899e0b881e0b8b1e0b899e0b980e0b8ade0b88720e0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b8aae0b8ade0b89ae0b896e0b8b2e0b8a1e0b896e0b8b6e0b887e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8ade0b8a2e0b8b9e0b98820e0b981e0b8a5e0b8b0e0b881e0b8b2e0b8a3e0b980e0b89ee0b8b2e0b8b0e0b89be0b8a5e0b8b9e0b881e0b89ee0b8b7e0b88ae0b895e0b988e0b8b2e0b88720e0b98620e0b983e0b899e0b89ee0b8b7e0b989e0b899e0b897e0b8b5e0b988e0b894e0b8b1e0b887e0b881e0b8a5e0b988e0b8b2e0b8a720266e6273703be0b982e0b894e0b8a2e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b984e0b894e0b989e0b899e0b8b3e0b89ce0b8a5e0b8b4e0b895e0b8a0e0b8b1e0b893e0b891e0b98ce0b981e0b89be0b8a3e0b8a3e0b8b9e0b89be0b981e0b8a5e0b8b0e0b89ce0b8a5e0b89ce0b8a5e0b8b4e0b895e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b980e0b881e0b8a9e0b895e0b8a3e0b8a1e0b8b2e0b8a1e0b8ade0b89ae0b983e0b8abe0b989e0b881e0b8b1e0b89ae0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5e0b894e0b989e0b8a7e0b8a220e0b983e0b899e0b982e0b8ade0b881e0b8b2e0b8aae0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b8a1e0b8b2e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b980e0b8a2e0b8b5e0b8a2e0b899e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b981e0b8a5e0b8b0e0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b8a3e0b8b0e0b89ae0b89ae0b882e0b899e0b8aae0b988e0b887e0b8a1e0b8a7e0b8a5e0b88ae0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b981e0b8a5e0b8b0e0b981e0b899e0b8a7e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b8872028e0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad2920e0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320266e6273703b3c6272202f3e0d0a3c6272202f3e0d0a266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b888e0b8b2e0b881e0b899e0b8b1e0b989e0b899266e6273703be0b899e0b8b2e0b8a2e0b881e0b8a3e0b8b1e0b890e0b8a1e0b899e0b895e0b8a3e0b8b5266e6273703be0b984e0b894e0b989e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b982e0b894e0b8a2e0b980e0b8a3e0b8b7e0b8ade0b897e0b8b5e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703be0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b984e0b89be0b8a2e0b8b1e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b881266e6273703be0b980e0b882e0b895e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88d266e6273703b266e6273703be0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887e0b89be0b8a3e0b8b0e0b8a1e0b8b2e0b893266e6273703b322e35266e6273703be0b881e0b8b4e0b982e0b8a5e0b980e0b8a1e0b895e0b8a3266e6273703be0b89ee0b8a3e0b989e0b8ade0b8a1e0b8a3e0b8b1e0b89ae0b89fe0b8b1e0b887e0b881e0b8b2e0b8a3e0b89ae0b8a3e0b8a3e0b8a2e0b8b2e0b8a2e0b980e0b88ae0b8b4e0b887e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b896e0b8b6e0b887e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2e0b981e0b8a5e0b8b0e0b884e0b8a7e0b8b2e0b8a1e0b8aae0b8b3e0b884e0b8b1e0b88de0b882e0b8ade0b887e0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ad266e6273703be0b8aae0b896e0b8b2e0b899e0b897e0b8b5e0b988e0b8aae0b8b3e0b884e0b8b1e0b88de0b888e0b8b2e0b881e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b899266e6273703b266e646173683b266e6273703be0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a1266e6273703be0b984e0b89be0b8a2e0b8b1e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b881266e6273703be0b8a3e0b8a7e0b8a1e0b897e0b8b1e0b989e0b887e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b88ae0b8a1e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b89fe0b8b7e0b989e0b899e0b8a7e0b8b4e0b896e0b8b5e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b88ae0b8b8e0b8a1e0b88ae0b899e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887e0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8a2e0b988e0b8b2e0b899e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b881e0b8a3e0b8b8e0b887e0b898e0b899e0b89ae0b8b8e0b8a3e0b8b5266e6273703be0b981e0b8a5e0b8b0e0b895e0b8a3e0b8a7e0b888e0b881e0b8b2e0b8a3e0b89ee0b8b1e0b892e0b899e0b8b2e0b888e0b8b8e0b894e0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b895e0b988e0b8ade0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887266e6273703b28e0b8a5e0b989e0b8ad266e6273703be0b8a3e0b8b2e0b887266e6273703be0b980e0b8a3e0b8b7e0b8ad29266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3266e6273703be0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b8a5e0b988e0b8ade0b887e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b981e0b8a5e0b8b0e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887266e6273703be0b881e0b988e0b8ade0b899e0b980e0b894e0b8b4e0b899e0b897e0b8b2e0b887e0b895e0b988e0b8ade0b984e0b89be0b8a2e0b8b1e0b887e0b8a7e0b8b1e0b894e0b8ade0b8b4e0b899e0b897e0b8b2e0b8a3e0b8b2e0b8a12028e0b89ae0b8b2e0b887e0b8a2e0b8b5e0b988e0b980e0b8a3e0b8b7e0b8ad2920e0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b8b2e0b887266e6273703b332e35266e6273703be0b881e0b8b4e0b982e0b8a5e0b980e0b8a1e0b895e0b8a320e0b980e0b89ee0b8b7e0b988e0b8ade0b895e0b8a3e0b8a7e0b888e0b980e0b8a2e0b8b5e0b988e0b8a2e0b8a1e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b89fe0b8b7e0b989e0b899e0b8a7e0b8b4e0b896e0b8b5e0b88ae0b8b5e0b8a7e0b8b4e0b895e0b88ae0b8b8e0b8a1e0b88ae0b899e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b887e0b89ce0b988e0b8b2e0b899e0b881e0b8b2e0b8a3e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8a2e0b988e0b8b2e0b899e0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b8a8e0b8b2e0b8aae0b895e0b8a3e0b98ce0b881e0b8a3e0b8b8e0b887e0b898e0b899e0b89ae0b8b8e0b8a3e0b8b5e0b895e0b988e0b8ade0b984e0b89b266e6273703b20266e6273703b20266e6273703b20266e6273703b3c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a0d0a3c70207374796c653d226d617267696e2d6c6566743a3070783b206d617267696e2d72696768743a307078223e3c7370616e207374796c653d22666f6e742d73697a653a31337078223e3c7370616e207374796c653d22636f6c6f723a23303030303030223e3c7370616e207374796c653d22666f6e742d66616d696c793a5461686f6d61223e266e6273703b266e6273703b266e6273703b266e6273703b266e6273703be0b897e0b8b1e0b989e0b887e0b899e0b8b5e0b98920e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b8a7e0b8b1e0b899e0b897e0b8b5e0b988266e6273703b3238266e6273703be0b881e0b8a3e0b881e0b88ee0b8b2e0b884e0b8a1266e6273703b32353631266e6273703be0b980e0b89be0b987e0b899e0b895e0b989e0b899e0b8a1e0b8b220e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3e0b984e0b894e0b989e0b980e0b89be0b8b4e0b894e0b897e0b894e0b8a5e0b8ade0b887e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b983e0b8abe0b8a1e0b98820e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8aae0b8b0e0b89ee0b8b2e0b899e0b895e0b8b2e0b881e0b8aae0b8b4e0b8992de0b980e0b89ee0b88ae0b8a3e0b980e0b881e0b8a9e0b8a12028e0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b22920e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88d20e0b896e0b8b6e0b887e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b8a7e0b8b1e0b894e0b881e0b8b3e0b981e0b89ee0b887e0b89ae0b8b2e0b887e0b888e0b8b2e0b88120e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b881e0b8ade0b881e0b983e0b8abe0b88de0b9882028e0b895e0b8a5e0b8b2e0b894e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b8872920e0b980e0b89ee0b8b7e0b988e0b8ade0b980e0b88ae0b8b7e0b988e0b8ade0b8a1e0b982e0b8a2e0b887e0b8a3e0b8b0e0b89ae0b89ae0b884e0b8a1e0b899e0b8b2e0b884e0b8a1e0b897e0b8b2e0b887e0b899e0b989e0b8b3e0b881e0b8b1e0b89ae0b980e0b882e0b989e0b8b2e0b881e0b8b1e0b89ae0b982e0b884e0b8a3e0b887e0b882e0b988e0b8b2e0b8a2e0b8aae0b8b2e0b898e0b8b2e0b8a3e0b893e0b8b0e0b8ade0b8b7e0b988e0b89920e0b98620e0b895e0b8b2e0b8a1e0b899e0b982e0b8a2e0b89ae0b8b2e0b8a2266e6273703b266c6471756f3be0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad26726471756f3b266e6273703be0b882e0b8ade0b887e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a320e0b982e0b894e0b8a2e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b898e0b899e0b8b2e0b884e0b8a120e0b983e0b899e0b890e0b8b2e0b899e0b8b0e0b89ce0b8b9e0b989e0b89ae0b8a3e0b8b4e0b8abe0b8b2e0b8a3e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b8a3e0b8b0e0b89ae0b89ae0b8a5e0b989e0b8ad20e0b8a3e0b8b2e0b88720e0b980e0b8a3e0b8b7e0b8ad20e0b983e0b899e0b881e0b8a3e0b8b8e0b887e0b980e0b897e0b89ee0b8a1e0b8abe0b8b2e0b899e0b884e0b8a3e0b981e0b8a5e0b8b0e0b982e0b884e0b8a3e0b887e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b884e0b8a5e0b8ade0b887e0b8a0e0b8b2e0b8a9e0b8b5e0b980e0b888e0b8a3e0b8b4e0b88de0b983e0b899e0b89be0b8b1e0b888e0b888e0b8b8e0b89ae0b8b1e0b89920e0b8a1e0b8b2e0b980e0b89be0b987e0b899e0b89ce0b8b9e0b989e0b888e0b8b1e0b894e0b881e0b8b2e0b8a3e0b980e0b894e0b8b4e0b899e0b980e0b8a3e0b8b7e0b8ade0b983e0b899e0b8a3e0b8b0e0b8a2e0b8b0e0b897e0b894e0b8a5e0b8ade0b88720e0b982e0b894e0b8a2e0b983e0b8abe0b989e0b89ae0b8a3e0b8b4e0b881e0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b88ae0b8b2e0b88ae0b899e0b982e0b894e0b8a2e0b984e0b8a1e0b988e0b980e0b881e0b987e0b89ae0b884e0b988e0b8b2e0b982e0b894e0b8a2e0b8aae0b8b2e0b8a320e0b983e0b899e0b897e0b8b8e0b881e0b8a7e0b8b1e0b899e0b8abe0b8a2e0b8b8e0b894e0b980e0b8aae0b8b2e0b8a3e0b98ce0b8ade0b8b2e0b897e0b8b4e0b895e0b8a2e0b98ce0b981e0b8a5e0b8b0e0b8a7e0b8b1e0b899e0b8abe0b8a2e0b8b8e0b894e0b899e0b8b1e0b881e0b882e0b8b1e0b895e0b8a4e0b881e0b8a9e0b98c20e0b895e0b8b1e0b989e0b887e0b981e0b895e0b988e0b980e0b8a7e0b8a5e0b8b2266e6273703b30382e303020266e646173683b2031382e3030266e6273703be0b8992e20e0b980e0b8a3e0b8b7e0b8ade0b888e0b8b0e0b8ade0b8ade0b881e0b897e0b8b8e0b881266e6273703b3330266e6273703be0b899e0b8b2e0b897e0b8b520e0b8a1e0b8b5e0b897e0b988e0b8b2e0b980e0b8a3e0b8b7e0b8ade0b897e0b8b5e0b988e0b983e0b881e0b8a5e0b989e0b881e0b8b1e0b89ae0b8aae0b896e0b8b2e0b899e0b8b5e0b8a3e0b896e0b984e0b89fe0b89fe0b989e0b8b2266e6273703b425453266e6273703be0b89ae0b8b2e0b887e0b8abe0b8a7e0b989e0b8b220e0b981e0b8a5e0b8b0e0b888e0b8b8e0b894e0b888e0b8ade0b894e0b8a3e0b896e0b982e0b894e0b8a2e0b8aae0b8b2e0b8a3e0b89be0b8a3e0b8b0e0b888e0b8b3e0b897e0b8b2e0b88720e0b88be0b8b6e0b988e0b887e0b89ce0b988e0b8b2e0b899e0b980e0b8aae0b989e0b899e0b897e0b8b2e0b887e0b897e0b8b5e0b988e0b980e0b89be0b987e0b899e0b8a2e0b988e0b8b2e0b899e0b897e0b988e0b8ade0b887e0b980e0b897e0b8b5e0b988e0b8a2e0b8a7e0b8aae0b8b3e0b884e0b8b1e0b88d20e0b980e0b88ae0b988e0b89920e0b895e0b8a5e0b8b2e0b894e0b884e0b8a5e0b8ade0b887e0b89ae0b8b2e0b887e0b8abe0b8a5e0b8a7e0b88720e0b89ae0b989e0b8b2e0b899e0b8a8e0b8b4e0b8a5e0b89be0b8b4e0b89920e0b981e0b8a5e0b8b0e0b88ae0b8b8e0b8a1e0b88ae0b899e0b8a3e0b989e0b8b2e0b899e0b884e0b989e0b8b2e0b982e0b89ae0b8a3e0b8b2e0b89320e0b980e0b89be0b987e0b899e0b895e0b989e0b8993c2f7370616e3e3c2f7370616e3e3c2f7370616e3e3c2f703e0d0a3c2f6469763e0d0a, 'Y', 5, 'Y');
INSERT INTO `News` (`id`, `news_type`, `news_date`, `image_cover_path`, `title_th`, `title_en`, `create_date`, `update_date`, `contents`, `contents_en`, `actives`, `visit_count`, `show_homepage`) VALUES
(13, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001110410_699157.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 11:04:10', '', '', 'Y', 5, 'Y'),
(14, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001110341_128757.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 11:03:41', '', '', 'Y', 5, 'Y'),
(15, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001110226_330904.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 11:02:26', '', '', 'Y', 5, 'Y'),
(16, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001110125_496251.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 11:01:25', '', '', 'Y', 5, 'Y'),
(17, 'ข่าวประชาสัมพันธ์', '2018-08-15', 'files/img/news/20181001104555_878633.jpg', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', 'มกอช แจงสหรัฐไม่ได้เตรียมแบนสินค้าประมงไทย', '2018-06-19 14:39:20', '2018-10-01 10:49:40', '', NULL, 'Y', 5, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `Pages`
--

DROP TABLE IF EXISTS `Pages`;
CREATE TABLE `Pages` (
  `id` int(11) NOT NULL,
  `page_type` varchar(40) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `title_th` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `contents` longblob,
  `contents_en` longblob,
  `actives` char(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Pages`
--

INSERT INTO `Pages` (`id`, `page_type`, `menu_id`, `title_th`, `title_en`, `create_date`, `update_date`, `contents`, `contents_en`, `actives`) VALUES
(1, '', 8, 'ประวัติความเป็นมา', 'ประวัติความเป็นมา', '2018-10-01 17:41:16', '2018-10-01 17:41:16', 0x3c703ee0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b23c2f703e0d0a, 0x3c703ee0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b2266e6273703be0b89be0b8a3e0b8b0e0b8a7e0b8b1e0b895e0b8b4e0b884e0b8a7e0b8b2e0b8a1e0b980e0b89be0b987e0b899e0b8a1e0b8b23c2f703e0d0a, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `Questionnaires`
--

DROP TABLE IF EXISTS `Questionnaires`;
CREATE TABLE `Questionnaires` (
  `questionnaireID` int(11) NOT NULL,
  `standardID` int(11) NOT NULL,
  `questionName` varchar(255) DEFAULT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `filePath` varchar(512) DEFAULT NULL,
  `questionnaireType` enum('normal','online') NOT NULL,
  `questionnaireSubType` enum('committee','standard') NOT NULL,
  `subcommitteeID` int(11) DEFAULT NULL,
  `openDate` date DEFAULT NULL,
  `closeDate` date DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Questionnaires`
--

INSERT INTO `Questionnaires` (`questionnaireID`, `standardID`, `questionName`, `fileName`, `filePath`, `questionnaireType`, `questionnaireSubType`, `subcommitteeID`, `openDate`, `closeDate`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(2, 5, 'แบบสอบถามร่างมาตรฐาน', '285193.jpg', 'files/files/question/20180824123244_242457.jpg', 'normal', 'standard', 0, '2018-08-24', '2018-08-31', '1093840', '2018-08-24 12:32:44', '1093840', '2018-08-24 12:32:44'),
(5, 0, 'อนุ 2', '', 'gg.com', 'online', 'committee', 5, '0000-00-00', '0000-00-00', '1093840', '2018-08-24 13:10:17', '1093840', '2018-08-24 13:10:17');

-- --------------------------------------------------------

--
-- Table structure for table `Questionnaire_Person`
--

DROP TABLE IF EXISTS `Questionnaire_Person`;
CREATE TABLE `Questionnaire_Person` (
  `questionnairePersonID` int(11) NOT NULL,
  `questionaireID` int(11) NOT NULL,
  `stakeholderID` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Questionnaire_Person`
--

INSERT INTO `Questionnaire_Person` (`questionnairePersonID`, `questionaireID`, `stakeholderID`) VALUES
(1, 1, '4023144'),
(2, 1, '9810021'),
(3, 1, '9810022'),
(4, 5, '4023144');

-- --------------------------------------------------------

--
-- Table structure for table `Questions`
--

DROP TABLE IF EXISTS `Questions`;
CREATE TABLE `Questions` (
  `questionID` int(11) NOT NULL,
  `questionaireID` int(11) NOT NULL,
  `question` varchar(500) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Questions`
--

INSERT INTO `Questions` (`questionID`, `questionaireID`, `question`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
(1, 1, 'asdasd', '1093840', '2018-08-24 12:22:22', '1093840', '2018-08-24 12:44:30'),
(2, 1, 'asdasd', '1093840', '2018-08-24 12:23:02', '1093840', '2018-08-24 12:44:30'),
(3, 1, 'AS', '1093840', '2018-08-24 12:23:02', '1093840', '2018-08-24 12:44:30'),
(4, 1, 'addsasd asd', '1093840', '2018-08-24 12:23:02', '1093840', '2018-08-24 12:44:30'),
(6, 2, 'and', '1093840', '2018-08-24 12:32:44', '1093840', '2018-08-24 12:32:44'),
(7, 2, 'ASD', '1093840', '2018-08-24 12:32:44', '1093840', '2018-08-24 12:32:44'),
(8, 1, 'ฟหกฟหก', '1093840', '2018-08-24 12:44:30', '1093840', '2018-08-24 12:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `Slideshows`
--

DROP TABLE IF EXISTS `Slideshows`;
CREATE TABLE `Slideshows` (
  `id` int(11) NOT NULL,
  `slideshow_type` char(5) DEFAULT NULL,
  `contents_type` varchar(30) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(512) DEFAULT NULL,
  `text_desc` text,
  `order_no` int(11) DEFAULT NULL,
  `actives` char(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Slideshows`
--

INSERT INTO `Slideshows` (`id`, `slideshow_type`, `contents_type`, `file_name`, `file_path`, `text_desc`, `order_no`, `actives`) VALUES
(5, NULL, 'image/jpeg', 'slide1.jpg', 'files/img/slide/slide1.jpg', '<h3 style=\"color:#62A850;\">test test</h3>', NULL, 'Y'),
(7, NULL, 'image/jpeg', 'slide2.jpg', 'files/img/slide/slide2.jpg', 'rtes sdkjads asdkfj', NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `Stakeholders`
--

DROP TABLE IF EXISTS `Stakeholders`;
CREATE TABLE `Stakeholders` (
  `stakeholderID` char(7) NOT NULL,
  `nameThai` varchar(150) DEFAULT NULL,
  `lastNameThai` varchar(150) DEFAULT NULL,
  `nameEng` varchar(150) DEFAULT NULL,
  `lastNameEng` varchar(150) DEFAULT NULL,
  `positionThai` varchar(250) DEFAULT NULL,
  `positionEng` varchar(250) DEFAULT NULL,
  `responsible` varchar(400) DEFAULT NULL,
  `experience` varchar(45) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `institution` varchar(250) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `fax` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Stakeholders`
--

INSERT INTO `Stakeholders` (`stakeholderID`, `nameThai`, `lastNameThai`, `nameEng`, `lastNameEng`, `positionThai`, `positionEng`, `responsible`, `experience`, `branch`, `institution`, `address`, `phone`, `fax`, `email`, `status`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
('4023144', 'กนก', 'รักนะ', 'Kanok', 'Rakna', 'ทดสอบ', 'Test', 'and', '', 'ปศุสัตว์', '', '', '', '', '', 'Active', '1093840', '2018-08-09 08:32:13', '1093840', '2018-08-23 09:01:07'),
('4080666', 'สมพงษ์', 'มุมานะ', 'Sompong', 'Mumana', 'นักวิชาการ', 'Professor', 'ควบคุมคุณภาพ', 'ป โท', NULL, 'ภาควิจัย', '', '0912291100', '', 'sompong.m@gmail.com', 'Active', '1093840', '2018-08-08 11:43:42', '1093840', '2018-08-09 08:26:42'),
('9810021', 'กรพจน์', 'อุโฆษกิจ', 'Korapot', 'Ukoskit', 'นักวิชาการ', 'Professor', 'สอนงาน', 'ปริญญาเอก', NULL, 'มหาวิทยาลัยแม่โจ้', '206/61 หมู่ 3 ต.แม่เหียะ อ.เมือง จ.เชียงใหม่', '0917196810', '053839000', 'korapotu@gmail.com', 'Active', NULL, NULL, NULL, '2018-08-07 08:19:33'),
('9810022', 'กรกต', 'มามาก', 'Korakod', 'Mamag', 'นักวิชาการชำนาญ', 'Senior Professor', 'สอนงานวิจัย', 'ปริญญาเอก', NULL, 'มหาวิทยาลัยเชียงใหม่', '206/61 หมู่ 3 ต.แม่เหียะ อ.เมือง จ.เชียงใหม่', '0917196810', '053839000', 'korakod@gmail.com', 'Active', NULL, NULL, NULL, '2018-08-07 08:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `Subcommittee`
--

DROP TABLE IF EXISTS `Subcommittee`;
CREATE TABLE `Subcommittee` (
  `subcommitteeID` int(11) NOT NULL,
  `subcommitteeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Subcommittee`
--

INSERT INTO `Subcommittee` (`subcommitteeID`, `subcommitteeName`) VALUES
(5, 'Avengers');

-- --------------------------------------------------------

--
-- Table structure for table `Subcommittee_Person`
--

DROP TABLE IF EXISTS `Subcommittee_Person`;
CREATE TABLE `Subcommittee_Person` (
  `subcommitteePersonID` int(11) NOT NULL,
  `subcommitteeID` int(11) NOT NULL,
  `stakeholderID` char(7) NOT NULL,
  `positionName` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Subcommittee_Person`
--

INSERT INTO `Subcommittee_Person` (`subcommitteePersonID`, `subcommitteeID`, `stakeholderID`, `positionName`) VALUES
(1, 1, '9810021', ''),
(2, 1, '9810022', ''),
(6, 5, '9810021', '');

-- --------------------------------------------------------

--
-- Table structure for table `Substitute_Academic_Boards`
--

DROP TABLE IF EXISTS `Substitute_Academic_Boards`;
CREATE TABLE `Substitute_Academic_Boards` (
  `substituteID` int(11) NOT NULL,
  `academicBoardID` int(11) NOT NULL,
  `stakeholderID` int(11) NOT NULL,
  `standardID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Substitute_Academic_Boards`
--

INSERT INTO `Substitute_Academic_Boards` (`substituteID`, `academicBoardID`, `stakeholderID`, `standardID`) VALUES
(6, 6, 9810022, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `userID` char(7) NOT NULL,
  `stakeholderID` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `createBy` char(7) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateBy` char(7) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userID`, `stakeholderID`, `email`, `password`, `createBy`, `createDate`, `updateBy`, `updateDate`) VALUES
('6120347', 9810021, 'korapotu@gmail.com', '56026961', NULL, '2018-08-08 11:33:10', '1093840', '2018-08-08 11:33:10'),
('9088979', 9810022, 'korakod@gmail.com', '100000000', NULL, '2018-08-08 11:21:18', '1093840', '2018-08-08 11:31:24'),
('9271183', 4080666, 'sompong.m@gmail.com', '1234', '1093840', '2018-08-09 08:27:21', '1093840', '2018-08-09 08:27:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Academic_Boards`
--
ALTER TABLE `Academic_Boards`
  ADD PRIMARY KEY (`academicBoardID`),
  ADD KEY `stackholderID_idx` (`stakeholderID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `adminID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `Accreditation_Scopes`
--
ALTER TABLE `Accreditation_Scopes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Admin_Users`
--
ALTER TABLE `Admin_Users`
  ADD PRIMARY KEY (`adminID`),
  ADD KEY `adminID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `Answers`
--
ALTER TABLE `Answers`
  ADD PRIMARY KEY (`answersID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `questionID_idx` (`questionID`);

--
-- Indexes for table `AttachFiles`
--
ALTER TABLE `AttachFiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `page_type` (`page_type`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `Branchs`
--
ALTER TABLE `Branchs`
  ADD PRIMARY KEY (`branchID`);

--
-- Indexes for table `Commodity_Keywords`
--
ALTER TABLE `Commodity_Keywords`
  ADD PRIMARY KEY (`keywordID`),
  ADD KEY `commodityStandardID_idx` (`standardID`),
  ADD KEY `admin_UserID_idx` (`createBy`,`updateBy`),
  ADD KEY `keywordLang` (`keywordLang`);

--
-- Indexes for table `Commodity_Standards`
--
ALTER TABLE `Commodity_Standards`
  ADD PRIMARY KEY (`standardID`),
  ADD KEY `adminId_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `Emails`
--
ALTER TABLE `Emails`
  ADD PRIMARY KEY (`emailID`),
  ADD KEY `adminID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `Email_Commodity`
--
ALTER TABLE `Email_Commodity`
  ADD PRIMARY KEY (`emailCommodityID`),
  ADD KEY `emailID` (`emailID`),
  ADD KEY `standardID` (`standardID`);

--
-- Indexes for table `Invite_Files`
--
ALTER TABLE `Invite_Files`
  ADD PRIMARY KEY (`inviteFileID`),
  ADD KEY `meetingID_idx` (`meetingID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `adminUsersID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `LinkUrl`
--
ALTER TABLE `LinkUrl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `link_type` (`link_type`);

--
-- Indexes for table `Meetings`
--
ALTER TABLE `Meetings`
  ADD PRIMARY KEY (`meetingID`),
  ADD KEY `commodityStandardID_idx` (`standardID`),
  ADD KEY `adminUserID_idx` (`createBy`,`updateBy`),
  ADD KEY `sentEmailStatus` (`sentEmailStatus`);

--
-- Indexes for table `Meeting_attendees`
--
ALTER TABLE `Meeting_attendees`
  ADD PRIMARY KEY (`meetingAttendeeID`),
  ADD KEY `attendeeID_idx` (`attendeeID`),
  ADD KEY `meetingID_idx` (`meetingID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `adminID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `Meeting_Files`
--
ALTER TABLE `Meeting_Files`
  ADD PRIMARY KEY (`meetingFileID`),
  ADD KEY `adminUserID_idx` (`createBy`,`updateBy`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `meetingID_idx` (`meetingID`);

--
-- Indexes for table `Menus`
--
ALTER TABLE `Menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_menu` (`parent_menu`),
  ADD KEY `menuType` (`menu_type`),
  ADD KEY `menuOrder` (`menu_order`),
  ADD KEY `Actives` (`actives`);

--
-- Indexes for table `MOM_Files`
--
ALTER TABLE `MOM_Files`
  ADD PRIMARY KEY (`momFileID`),
  ADD KEY `meetingID_idx` (`meetingID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `adminUserID_idx` (`createBy`,`updateBy`);

--
-- Indexes for table `News`
--
ALTER TABLE `News`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actives` (`actives`),
  ADD KEY `page_type` (`news_type`),
  ADD KEY `news_type` (`news_type`),
  ADD KEY `actives_2` (`actives`),
  ADD KEY `show_homepage` (`show_homepage`);

--
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actives` (`actives`),
  ADD KEY `page_type` (`page_type`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `Questionnaires`
--
ALTER TABLE `Questionnaires`
  ADD PRIMARY KEY (`questionnaireID`),
  ADD KEY `questionID_idx` (`questionName`),
  ADD KEY `standardID` (`standardID`),
  ADD KEY `subcommitteeID` (`subcommitteeID`);

--
-- Indexes for table `Questionnaire_Person`
--
ALTER TABLE `Questionnaire_Person`
  ADD PRIMARY KEY (`questionnairePersonID`),
  ADD KEY `questionaireID` (`questionaireID`,`stakeholderID`);

--
-- Indexes for table `Questions`
--
ALTER TABLE `Questions`
  ADD PRIMARY KEY (`questionID`),
  ADD KEY `questionaireID` (`questionaireID`);

--
-- Indexes for table `Slideshows`
--
ALTER TABLE `Slideshows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slideshow_type` (`slideshow_type`);

--
-- Indexes for table `Stakeholders`
--
ALTER TABLE `Stakeholders`
  ADD PRIMARY KEY (`stakeholderID`),
  ADD KEY `adminID_idx` (`createBy`,`updateBy`),
  ADD KEY `nameThai` (`nameThai`),
  ADD KEY `lastNameThai` (`lastNameThai`),
  ADD KEY `nameEng` (`nameEng`),
  ADD KEY `lastNameEng` (`lastNameEng`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `Subcommittee`
--
ALTER TABLE `Subcommittee`
  ADD PRIMARY KEY (`subcommitteeID`);

--
-- Indexes for table `Subcommittee_Person`
--
ALTER TABLE `Subcommittee_Person`
  ADD PRIMARY KEY (`subcommitteePersonID`),
  ADD KEY `subcommitteeID` (`subcommitteeID`),
  ADD KEY `stakeholderID` (`stakeholderID`);

--
-- Indexes for table `Substitute_Academic_Boards`
--
ALTER TABLE `Substitute_Academic_Boards`
  ADD PRIMARY KEY (`substituteID`),
  ADD KEY `academicBoardID_idx` (`academicBoardID`),
  ADD KEY `stackeholderID_idx` (`stakeholderID`),
  ADD KEY `standardID_idx` (`standardID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `s_idx` (`stakeholderID`),
  ADD KEY `userID_idx` (`updateBy`),
  ADD KEY `adminUserID_idx` (`createBy`,`updateBy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Academic_Boards`
--
ALTER TABLE `Academic_Boards`
  MODIFY `academicBoardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Accreditation_Scopes`
--
ALTER TABLE `Accreditation_Scopes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `AttachFiles`
--
ALTER TABLE `AttachFiles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Branchs`
--
ALTER TABLE `Branchs`
  MODIFY `branchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Commodity_Keywords`
--
ALTER TABLE `Commodity_Keywords`
  MODIFY `keywordID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Commodity_Standards`
--
ALTER TABLE `Commodity_Standards`
  MODIFY `standardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Emails`
--
ALTER TABLE `Emails`
  MODIFY `emailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Email_Commodity`
--
ALTER TABLE `Email_Commodity`
  MODIFY `emailCommodityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Invite_Files`
--
ALTER TABLE `Invite_Files`
  MODIFY `inviteFileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `LinkUrl`
--
ALTER TABLE `LinkUrl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Meetings`
--
ALTER TABLE `Meetings`
  MODIFY `meetingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Meeting_attendees`
--
ALTER TABLE `Meeting_attendees`
  MODIFY `meetingAttendeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Meeting_Files`
--
ALTER TABLE `Meeting_Files`
  MODIFY `meetingFileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Menus`
--
ALTER TABLE `Menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `MOM_Files`
--
ALTER TABLE `MOM_Files`
  MODIFY `momFileID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Questionnaires`
--
ALTER TABLE `Questionnaires`
  MODIFY `questionnaireID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Questionnaire_Person`
--
ALTER TABLE `Questionnaire_Person`
  MODIFY `questionnairePersonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Questions`
--
ALTER TABLE `Questions`
  MODIFY `questionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Slideshows`
--
ALTER TABLE `Slideshows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Subcommittee`
--
ALTER TABLE `Subcommittee`
  MODIFY `subcommitteeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Subcommittee_Person`
--
ALTER TABLE `Subcommittee_Person`
  MODIFY `subcommitteePersonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Substitute_Academic_Boards`
--
ALTER TABLE `Substitute_Academic_Boards`
  MODIFY `substituteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
