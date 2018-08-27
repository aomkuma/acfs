-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 27, 2018 at 08:56 AM
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
-- Indexes for table `MOM_Files`
--
ALTER TABLE `MOM_Files`
  ADD PRIMARY KEY (`momFileID`),
  ADD KEY `meetingID_idx` (`meetingID`),
  ADD KEY `standardID_idx` (`standardID`),
  ADD KEY `adminUserID_idx` (`createBy`,`updateBy`);

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
-- AUTO_INCREMENT for table `MOM_Files`
--
ALTER TABLE `MOM_Files`
  MODIFY `momFileID` int(11) NOT NULL AUTO_INCREMENT;

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
