CREATE DATABASE  IF NOT EXISTS `projectone` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `projectone`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: projectone
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Table structure for table `user`
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp ,
  `vorname` varchar(100) NOT NULL DEFAULT '',
  `nachname` varchar(100) NOT NULL DEFAULT '',
  `benutzername` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `google_user_id` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `user`
DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `projektname` varchar(100) NOT NULL DEFAULT '',
  `laufzeit` INT(11) NOT NULL DEFAULT '0',
  `auftraggeber` varchar(100) NOT NULL DEFAULT '',
  `projektleiter` boolean,
  `availableHours` float NOT NULL DEFAULT '0',
  `user`int(11) NOT NULL DEFAULT '0',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `arbeitszeitkonto`
DROP TABLE IF EXISTS `arbeitszeitkonto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arbeitszeitkonto`(
  `id` INT(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `urlaubstage` float NOT NULL DEFAULT '0',
  `overtimehours` float NOT NULL DEFAULT '0',
  `user`INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `activity`
DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bezeichnung` varchar(100) NOT NULL DEFAULT '',
  `capacity` float NOT NULL DEFAULT '0', 
  `project` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `projektarbeit`
DROP TABLE IF EXISTS `projektarbeit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projektarbeit` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bezeichnung` varchar(110) NOT NULL DEFAULT '',
  `start` int(11) NOT NULL DEFAULT '0',
  `ende` int(11) NOT NULL DEFAULT '0',
  `zeitdifferenz` float NOT NULL DEFAULT '0',
  `activity` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `zeitintervallbuchung`
DROP TABLE IF EXISTS `zeitintervallbuchung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zeitintervallbuchung` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `arbeitskonto` int(11) NOT NULL DEFAULT '0',
  `user` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `ereginisbuchung`
DROP TABLE IF EXISTS `ereignisbuchung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ereignisbuchung` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `arbeitskonto` int(11) NOT NULL DEFAULT '0',
  `user` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `pause`
DROP TABLE IF EXISTS `pause`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pause` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start` int NOT NULL DEFAULT '0',
  `ende` int NOT NULL DEFAULT '0',
  `zeitdifferenz` float NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `abwesenheit`
DROP TABLE IF EXISTS `abwesenheit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abwesenheit` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `abwesenheitsart` int NOT NULL DEFAULT '0',
  `start` int NOT NULL DEFAULT '0',
  `ende` int NOT NULL DEFAULT '0',
  `zeitdifferenz` float NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `kommen`
DROP TABLE IF EXISTS `kommen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kommen` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `zeitpunkt` datetime NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `gehen`
DROP TABLE IF EXISTS `gehen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gehen` (
  `id`INT(11) NOT NULL DEFAULT '0',
  `timestamp`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `zeitpunkt` datetime NOT NULL DEFAULT '0',
  PRIMARY KEY(`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-15 15:46:51
