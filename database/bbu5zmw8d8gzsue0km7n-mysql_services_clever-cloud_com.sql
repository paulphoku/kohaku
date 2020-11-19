-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bbu5zmw8d8gzsue0km7n-mysql.services.clever-cloud.com:3306
-- Generation Time: Nov 10, 2020 at 07:20 PM
-- Server version: 8.0.15-5
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bbu5zmw8d8gzsue0km7n`
--
CREATE DATABASE IF NOT EXISTS `bbu5zmw8d8gzsue0km7n` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bbu5zmw8d8gzsue0km7n`;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `departure` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `destination` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `depart_date` date NOT NULL,
  `return_date` text NOT NULL,
  `duration` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '1 hour 30',
  `booking_status` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `total_amount` decimal(10,0) NOT NULL,
  `trip_type` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'domestic'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `uuid`, `class`, `departure`, `destination`, `depart_date`, `return_date`, `duration`, `booking_status`, `total_amount`, `trip_type`) VALUES
(1, '', 'Economy', 'Dubai DUB', 'Bloemfontain BFN', '2020-11-03', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(2, '', 'Economy', 'Dubai DUB', 'Bloemfontain BFN', '2020-11-03', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(3, '', 'Economy', 'Dubai DUB', 'Bloemfontain BFN', '2020-11-03', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(4, '', 'Economy', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-04', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(5, '', 'Economy', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-04', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(6, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(7, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(8, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(9, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(10, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(11, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(12, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Port Elizabeth PLZ', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(13, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(14, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(15, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(16, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(17, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(18, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(19, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(20, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(21, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(22, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(23, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '0', 'domestic'),
(24, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '2613', 'domestic'),
(25, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '2613', 'domestic'),
(26, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '2613', 'domestic'),
(27, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '2613', 'domestic'),
(28, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '2613', 'domestic'),
(29, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(30, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(31, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(32, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(33, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(34, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(35, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(36, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(37, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(38, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(39, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(40, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(41, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(42, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(43, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(44, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(45, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1476', 'domestic'),
(46, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Windhoek WDH', '2020-11-06', 'One Way', '1 hour 30', '0', '1463', 'domestic'),
(47, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Cape Town CPT', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '1993', 'domestic'),
(48, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Economy', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-06', 'One Way', '1 hour 30', '0', '1668', 'domestic'),
(49, 'b2888b92-6049-4fd8-ae23-252376afc222', 'Business', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-06', 'One Way', '1 hour 30', '0', '2010724', 'domestic'),
(50, 'b2888b92-6049-4fd8-ae23-252376afc222', 'Economy', 'Johannesburg JNB', 'Bloemfontain BFN', '2020-11-06', 'One Way', '1 hour 30', '0', '1968', 'domestic'),
(51, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy', 'Johannesburg JNB', 'Dubai DUB', '2020-11-06', 'One Way', '1 hour 30', '0', '18544', 'domestic'),
(52, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Windhoek WDH', '2020-11-09', '2020-11-09', '1 hour 30', '0', '1463', 'domestic'),
(53, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Bloemfontain BFN', 'Windhoek WDH', '2020-11-09', 'One Way Tr', '1 hour 30', '0', '1463', 'domestic'),
(54, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(55, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(56, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(57, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(58, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(59, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(60, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(61, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(62, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(63, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(64, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1583', 'domestic'),
(65, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Windhoek WDH', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '1498', 'domestic'),
(66, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Cape Town CPT', 'Bloemfontain BFN', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '2015', 'domestic'),
(67, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Cape Town CPT', 'Bloemfontain BFN', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '2018', 'domestic'),
(68, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Cape Town CPT', 'Dubai DUB', '2020-11-10', 'One Way Tr', '1 hour 30', '0', '14115', 'domestic'),
(69, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-10', 'One Way', '1 hour 30', '0', '1668', 'domestic'),
(70, '3ad41257-9b3a-4a62-87eb-7c1ddd3efab1', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-11', 'One Way Tr', '1 hour 30', '0', '1431', 'domestic'),
(71, '3ad41257-9b3a-4a62-87eb-7c1ddd3efab1', 'Economy Class', 'Johannesburg JNB', 'Cape Town CPT', '2020-11-14', 'One Way Tr', '1 hour 30', '0', '1431', 'domestic');

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

CREATE TABLE `meal` (
  `meal_id` int(11) NOT NULL,
  `t_id` int(11) NOT NULL,
  `meal_type` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `qty` text NOT NULL,
  `meal_price` decimal(10,0) NOT NULL,
  `bev_type` varchar(20) NOT NULL,
  `bev_price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meal`
--

INSERT INTO `meal` (`meal_id`, `t_id`, `meal_type`, `qty`, `meal_price`, `bev_type`, `bev_price`) VALUES
(1, 28, 'fish and chips', '1', '25', '', '0'),
(2, 29, 'fish and chips', '1', '25', '', '0'),
(3, 29, 'cola', '1', '13', '', '0'),
(4, 30, 'fish and chips', '1', '25', '', '0'),
(5, 30, 'cola', '1', '13', '', '0'),
(6, 31, 'fish and chips', '1', '25', '', '0'),
(7, 31, 'cola', '1', '13', '', '0'),
(8, 32, 'fish and chips', '1', '25', '', '0'),
(9, 32, 'cola', '1', '13', '', '0'),
(10, 33, 'fish and chips', '1', '25', '', '0'),
(11, 33, 'cola', '1', '13', '', '0'),
(12, 36, 'fish and chips', '1', '25', '', '0'),
(13, 36, 'cola', '1', '13', '', '0'),
(14, 38, 'fish and chips', '1', '25', '', '0'),
(15, 38, 'cola', '1', '13', '', '0'),
(16, 39, 'cola', '1', '13', '', '0'),
(17, 39, 'fish and chips', '1', '25', '', '0'),
(18, 40, 'fish and chips', '1', '25', '', '0'),
(19, 40, 'cola', '1', '13', '', '0'),
(20, 41, 'fish and chips', '1', '25', '', '0'),
(21, 41, 'cola', '1', '13', '', '0'),
(22, 42, 'fish and chips', '1', '25', '', '0'),
(23, 42, 'cola', '1', '13', '', '0'),
(24, 43, 'fish and chips', '1', '25', '', '0'),
(25, 43, 'cola', '1', '13', '', '0'),
(26, 44, 'fish and chips', '1', '25', '', '0'),
(27, 44, 'cola', '1', '13', '', '0'),
(28, 46, 'fish and chips', '1', '25', '', '0'),
(29, 47, 'fish and chips', '1', '25', '', '0'),
(30, 48, 'halal', '1', '250', '', '0'),
(31, 51, 'halal', '1', '250', '', '0'),
(32, 51, 'cola', '1', '13', '', '0'),
(33, 52, 'fish and chips', '1', '25', '', '0'),
(34, 53, 'fish and chips', '1', '25', '', '0'),
(35, 54, 'beef', '1', '165', '', '0'),
(36, 55, 'beef', '1', '165', '', '0'),
(37, 56, 'beef', '1', '165', '', '0'),
(38, 57, 'beef', '1', '165', '', '0'),
(39, 58, 'beef', '1', '165', '', '0'),
(40, 59, 'beef', '1', '165', '', '0'),
(41, 60, 'beef', '1', '165', '', '0'),
(42, 61, 'beef', '1', '165', '', '0'),
(43, 62, 'beef', '1', '165', '', '0'),
(44, 63, 'beef', '1', '165', '', '0'),
(45, 64, 'beef', '1', '165', '', '0'),
(46, 66, 'cocktail', '1', '47', '', '0'),
(47, 67, 'fish and chips', '2', '25', '', '0'),
(48, 68, 'chicken ala king', '7', '89', '', '0'),
(49, 68, 'beef risotto', '2', '165', '', '0'),
(50, 69, 'halal', '1', '250', '', '0'),
(51, 70, 'cola', '1', '13', '', '0'),
(52, 71, 'cola', '1', '13', '', '0');

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `id_number` int(11) NOT NULL,
  `title` varchar(5) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `payment_type` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `card_number` text NOT NULL,
  `cvv` int(11) NOT NULL,
  `expire_date` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `ticket_id`, `payment_type`, `amount`, `card_number`, `cvv`, `expire_date`, `status`) VALUES
(1, 1, 1, 122, '5555555555555555', 123, '2020-11', '1'),
(2, 46, 1, 1463, '67777', 333, '2020-11-06', '1'),
(3, 47, 1, 1993, '87878879879797980000', 333, '2020-11-06', '1'),
(4, 49, 1, 2010724, '5252366925145880', 309, '2020-11-06', '1'),
(5, 50, 1, 1968, '23525252525252530', 309, '2020-11-06', '1'),
(6, 51, 1, 18544, '44444444444444', 434, '2020-11-06', '1'),
(7, 52, 1, 1463, '777', 333, '2020-11-09', '1'),
(8, 66, 1, 2015, '7777888899990000', 999, '2020-11-10', '1'),
(9, 66, 1, 2015, '7777888899990000', 999, '2020-11-10', '1'),
(10, 67, 1, 2018, '87689987987989870000', 999, '2021-11-10', '1'),
(11, 68, 1, 14115, '8978987987987987', 777, '2020-11-10', '1'),
(12, 69, 1, 1668, '1.8379994076288855e25', 105, '2018-11-10', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticket_id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `airport_name` text NOT NULL,
  `flight_no` varchar(11) NOT NULL,
  `boarding_time` text NOT NULL,
  `departure_time` text NOT NULL,
  `seat` varchar(5) NOT NULL,
  `ispaid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `uuid`, `airport_name`, `flight_no`, `boarding_time`, `departure_time`, `seat`, `ispaid`) VALUES
(19, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '10:18', 'E55', 0),
(20, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '10:18', 'E4.', 0),
(21, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '10:18', 'E27', 0),
(22, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '10:18', 'E65', 0),
(23, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '10:18', 'E64', 0),
(24, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '11:59', 'E72', 0),
(25, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '11:59', 'E74', 0),
(26, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '11:59', 'E82', 0),
(27, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '11:59', 'E51', 0),
(28, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '11:59', 'E57', 0),
(29, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E64', 0),
(30, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E13', 0),
(31, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E30', 0),
(32, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E28', 0),
(33, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E88', 0),
(34, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E68', 0),
(35, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E12', 0),
(36, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E38', 0),
(37, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E41', 0),
(38, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E19', 0),
(39, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E27', 0),
(40, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E75', 0),
(41, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E10', 0),
(42, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E19', 0),
(43, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E74', 0),
(44, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E2.', 0),
(45, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '12:16', 'E56', 0),
(46, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '13:40', 'E14', 0),
(47, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Cape Town CPT', 'A909', '09:00', '13:47', 'E81', 0),
(48, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', 'Johannesburg JNB', 'A909', '09:00', '16:19', 'E36', 0),
(49, 'b2888b92-6049-4fd8-ae23-252376afc222', 'Johannesburg JNB', 'A909', '09:00', '16:08', 'B6.', 0),
(50, 'b2888b92-6049-4fd8-ae23-252376afc222', 'Johannesburg JNB', 'A909', '09:00', '16:28', 'E14', 0),
(51, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '22:30', 'E33', 0),
(52, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '23:10', 'E32', 0),
(53, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Bloemfontain BFN', 'A909', '09:00', '23:33', 'E50', 0),
(54, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E19', 0),
(55, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E54', 0),
(56, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E36', 0),
(57, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E67', 0),
(58, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E18', 0),
(59, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E8.', 0),
(60, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E85', 0),
(61, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E70', 0),
(62, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E73', 0),
(63, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E74', 0),
(64, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '14:55', 'E45', 0),
(65, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '15:30', 'E42', 0),
(66, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Cape Town CPT', 'A909', '09:00', '15:36', 'E43', 0),
(67, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Cape Town CPT', 'A909', '09:00', '16:10', 'E29', 0),
(68, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Cape Town CPT', 'A909', '09:00', '16:13', 'E26', 0),
(69, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', 'Johannesburg JNB', 'A909', '09:00', '16:47', 'E54', 0),
(70, '3ad41257-9b3a-4a62-87eb-7c1ddd3efab1', 'Johannesburg JNB', 'A909', '09:00', '20:08', 'E50', 0),
(71, '3ad41257-9b3a-4a62-87eb-7c1ddd3efab1', 'Johannesburg JNB', 'A909', '09:00', '20:18', 'E9.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(13) NOT NULL,
  `uuid` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `cell` text,
  `gender` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `province` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `salt` text NOT NULL,
  `encrypted_password` text NOT NULL,
  `role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'normal',
  `date_of_birth` date DEFAULT NULL,
  `one_time_pin` text NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uuid`, `created_at`, `updated_at`, `name`, `surname`, `email`, `cell`, `gender`, `province`, `salt`, `encrypted_password`, `role`, `date_of_birth`, `one_time_pin`, `isVerified`) VALUES
(6, '52767ebf-8536-452a-9503-d2e03547cbbb', '2020-10-31', '2020-10-31', 'fname', 'lname', 'paullla', '0970979078', 'male', 'Gauteng', 'ef409879b06ceeab', '67edc3094b63cf5214922b80815a8c32f24085aa8935387e4ddb2bf223b71b4d28cf61c0a4da6c53491ac6320b1c9b46d91c78726026eff432b0490534cb126a', 'normal', NULL, '2B87C5', 0),
(7, '01a09e1f-a2b8-4ab0-a5b1-7f1a659848a0', '2020-10-31', '2020-10-31', 'fname', 'lname', 'ema', NULL, NULL, NULL, '04a5a38afd85980a', '82b63810831c7a6a7cd8e208bbc15983a00efa7cc9d482c719155e184cd64f4d34d62945daf3b520f079fb6b83b1a12f398a621dae5d117c6e7f40f4b4356d6a', 'normal', NULL, '4BF16D', 0),
(8, 'ce339a66-fcab-4970-af7c-1549d4428227', '2020-10-31', '2020-10-31', 'fname', 'lname', 'em', NULL, NULL, NULL, '58234608c261a342', '6e7d755d480232e79ff09858d99eecc27c8ddf5483b42031fb0a00377a41bf7dc878b28f663799849614b0c4de3a3fadb1c5ac147f6a8f90ea820cc1e03838c9', 'normal', NULL, 'C08FAF', 0),
(13, 'f3f657ff-ffae-47b4-849f-3cd743c3c9d2', '2020-10-31', '2020-10-31', 'fname', 'lname', 'paul', NULL, NULL, NULL, 'e38e011f3087ff23', '0b9414030dd90d6b35d96fcd0c13a588ff77f5554205cb240f0b520a4095fd8e9be800144cc9c117b0fa559a2903686ba496da6ee90b8706a30c0ead487b53d4', '', NULL, 'D2C6F5', 0),
(14, 'a4630343-47c6-4cb4-902c-41190cd03214', '2020-10-31', '2020-10-31', 'fname', 'lname', 'paull', NULL, NULL, NULL, '82ede2016139e8c5', '60acdf258124a2bf7d29ef40f0ae39d46d18cd1ab89d9c8e31cafd4f12794bec0575aaa264a620eaf2be2a6e954b24a54f4e80c8668d0d2c2d45cfc60cca79e0', '', NULL, '3487E8', 0),
(17, '5656ef52-84f9-4f62-9fca-aa379f9c4404', '2020-11-01', '2020-11-01', 'n', 'n', 'n@gmail.com', NULL, NULL, NULL, '7da41470993d133d', 'a93ff40aff0abd81f5a4f8b1fc5ed3a19f1f1df25e9d0f6adaaabe3bf2574f7f52c7d93804a2148048dce2db16156283f8887ee17f53e5445be7bc9422965d40', 'normal', NULL, '168479', 1),
(18, '56d2fabd-b079-412e-b986-c4f46c34535f', '2020-11-01', '2020-11-01', 'p', 'p', 'p@gmail.com', NULL, NULL, NULL, '151139a2680782ce', 'c1d9f8cd325d1f3ff86a1f6f4a8ad84deed6d1f98a7e1cb5e63c7ed94ab025d66834e88f896c5e51a2c3f231d6b0989d0dab771f69acebbd617593fe8d1857cb', 'normal', NULL, '771315', 1),
(20, '5bb9dad8-f832-4ff7-b3e7-6ae5156faec1', '2020-11-01', '2020-11-01', 'paul', 'paul', 'paulphoku@gmail.com', NULL, NULL, NULL, 'a75996cd65a0104c', 'a05de3bf71a4ca4dff181197049555945d4a704d8e924a0447528a4db27a759800a37e81dcc8c172e9a47e4b974ec51132e9790e28deee155ed6de951817e8de', 'normal', NULL, '5B77CC', 1),
(21, '588cbc12-8c6e-4553-902d-fafb5b89e041', '2020-11-01', '2020-11-01', 'Mphai', 'Bodese', 'lazi.mphai@gmail.com', NULL, NULL, NULL, '7bddb2fcc0eb011b', '9ccfa270ba3f272b2f142b9f07561a64c41cc48f42c41e0b55440fbf668479057110c6080f414f14fd50e7949f98195c3db4f08263e03853af3b304ad4b2ea17', 'admin', NULL, 'DFFCBD', 1),
(22, 'dc21ba3b-1d62-42e4-991e-c0d8943a47fa', '2020-11-01', '2020-11-09', 'fname', 'lname', 'admin@admin.com', '0841231234', 'male', 'Limpopo', 'ab08ec54e1126edc', '76ee40cde22cc630c46331f5ac48d0112564003d1f4174204365274e3f7b1b7415bcc0121d0ef0fdd07d698a18c154f1f1d774ee0b86c4655eb41e036ca92d8a', 'normal', '1920-11-09', '9CFC2B', 1),
(23, '1c2a3052-4e87-4417-b13b-8fbfd3ee943d', '2020-11-01', '2020-11-01', 'fname', 'lname', 'a', NULL, NULL, NULL, 'a5c4abdd9b2ad130', '2fc1a1cc558a3aed47d57de7c8ac77bd69e003311a4e13d2ef97df347aecb00fcf5de8eb386bf03318f00f11afa24ca625f529981bd9991446e66e69708e5c69', 'normal', NULL, '9B7F6A', 0),
(24, '90c6aa37-f19a-4db2-b9a8-f3f78bc87428', '2020-11-04', '2020-11-04', 'p', 'p', 'p@g.com', NULL, NULL, NULL, '945d2b3a7e313917', '48e1c09bbba93c9dc7796cc89fb73ca9293d437577edbf6226b6f152106ebacb60c0a914c0449ab21fffbadf9486a8c68a43a88881ed1ef615edd8900e4599a2', 'normal', NULL, 'B5C940', 0),
(25, '9f1a5237-3102-4846-89bc-53d7407f89da', '2020-11-04', '2020-11-04', 'doe', 'jane', 'jane@doe.com', NULL, NULL, NULL, 'f8a0e358f790f2fd', '3a586def4b49563176a98eae6a727d1718efea6f21cd7dee055f54597d05bfa1d5c2c59af767fa9f44163f098c4041f6de252ef367769ce91487e7eaec7d8218', 'normal', NULL, 'BECBED', 0),
(26, 'b2888b92-6049-4fd8-ae23-252376afc222', '2020-11-06', '2020-11-06', 'Mbatha', 'Thembi', 'misokuhle.mbatha04@gmail.com', '0720412335', 'female', 'Gauteng', 'a5ae955d82a24646', '1fde9df5da483369e78a89c25684d55a750276a879285accab0357a6ae8328512e534e8292927ace4647abfd9e364ba5e1fb8c9d180ea2ac0683613a0da9c410', 'normal', NULL, '94FD9F', 1),
(27, '791dc386-10a2-4a54-924d-ac13692bdc66', '2020-11-10', '2020-11-10', 'ndala ', 'zama', 'zamandala@gmail.com', NULL, NULL, NULL, 'ba3fb658eae053ac', '8fe105087b79d47ccbd1e7633be8ef7347883260468812761c5f337aa3524f749a840db722bd53ae541d0ed48e0c6d752aae09c71570ae81fc0826f9bab0ca0f', 'normal', NULL, '92001B', 0),
(28, 'c85a236d-86b2-4e8f-81de-1c4ec02509e9', '2020-11-10', '2020-11-10', 'Sammy', 'Sammy ', 'mpholouischauke.ml@gmail.com.za.co', NULL, NULL, NULL, 'd0be4c84c8142af8', 'd5455a572c39901fd3cd2bae3ac2dc035305bd2ce76e1f17b532f35f3ae6d19f3f61f7c0f16c0d2267d1f02f38f8a2957c4f74297ba68786c344aa6ccae46612', 'normal', NULL, '0D3B4F', 0),
(29, '3ad41257-9b3a-4a62-87eb-7c1ddd3efab1', '2020-11-10', '2020-11-10', 'Seema', 'Neo', 'selowaneo@gmail.com', NULL, NULL, NULL, 'a6de59cdde7e729a', '532e585d498a4b3e4f5555c83a4b28c2af15310415019d671432657ab796da549526318d70c4835897765ec3728483a7b6aae1fcad010d081af695f9de99eefe', 'normal', NULL, '4665C5', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`meal_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `meal`
--
ALTER TABLE `meal`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
