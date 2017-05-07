/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50628
Source Host           : 127.0.0.1:3306
Source Database       : software

Target Server Type    : MYSQL
Target Server Version : 50628
File Encoding         : 65001

Date: 2016-11-17 12:57:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `manid` varchar(20) NOT NULL,
  `manname` varchar(80) NOT NULL,
  `manpw` varchar(80) NOT NULL,
  PRIMARY KEY (`manid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('20140001', 'wang', '123456');

-- ----------------------------
-- Table structure for select
-- ----------------------------
DROP TABLE IF EXISTS `select`;
CREATE TABLE `select` (
  `selid` int(20) NOT NULL AUTO_INCREMENT,
  `stuid` varchar(20) NOT NULL,
  `subid` varchar(20) NOT NULL,
  `grade` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`selid`),
  KEY `fk_stuid` (`stuid`),
  KEY `fk_subid` (`subid`),
  CONSTRAINT `fk_stuid` FOREIGN KEY (`stuid`) REFERENCES `student` (`stuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_subid` FOREIGN KEY (`subid`) REFERENCES `subject` (`subid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of select
-- ----------------------------
INSERT INTO `select` VALUES ('2', '2014012533', '11', '90');
INSERT INTO `select` VALUES ('3', '2014012535', '1', '85');
INSERT INTO `select` VALUES ('4', '2014012536', '1', '82');
INSERT INTO `select` VALUES ('23', '2014012538', '11', '80');
INSERT INTO `select` VALUES ('25', '2014012566', '1', '81');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `stuid` varchar(20) NOT NULL,
  `stuname` varchar(20) DEFAULT NULL,
  `stupw` varchar(20) DEFAULT NULL,
  `stucollege` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`stuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('2014012533', '刘惠森', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012534', '聂博文', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012535', '杨笑天', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012536', '史越', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012537', '刘朝洋', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012538', '吴恒', '123456', '信息工程学院');
INSERT INTO `student` VALUES ('2014012566', '刘志伟', '123456', '信息工程学院');

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `subid` varchar(20) NOT NULL,
  `teaid` varchar(20) DEFAULT NULL,
  `subname` varchar(80) DEFAULT NULL,
  `subcontent` text,
  `starttime` varchar(20) DEFAULT NULL,
  `endtime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`subid`),
  KEY `fk_teaid` (`teaid`),
  CONSTRAINT `fk_teaid` FOREIGN KEY (`teaid`) REFERENCES `teacher` (`teaid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES ('1', '20140125', '基于图像处理的航空红外相机自动调焦技术研究', '对自动调焦技术进行了深入调研,从光学系统的成像理论出发,针对传统自动调焦方法的局限性,探讨了图像调焦的工作原理以及优势所在,分析了采用图像调焦的目的和意义', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('10', '20140125', '网上论坛系统设计与实现', '论坛又被称为网络社区，英文简称为BBS（Bulletin Board System)。它是互联网上的一种电子信息服务系统，最初的原形是电子公告板，它和日常生活中的黑板报比较类似', '2016/9/2', '2017//9/1');
INSERT INTO `subject` VALUES ('11', '20140125', '基于无人机全景图自动拼接软件系统设计与实现', '全景图 自动拼接 虚拟现实', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('2', '20140126', '基于水平集的图像处理', '对自动调焦技术进行了深入调研,从光学系统的成像理论出发,针对传统自动调焦方法的局限性,探讨了图像调焦的工作原理以及优势所在,分析了采用图像调焦的目的和意义', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('3', '20140127', '基于FPGA视频图像处理的研究', '现有图像处理技术已经无法应对这么多的不同领域的需求和效率要求,本文正是基于这一点,对FPGA进行研究,分析其如何在图像处理中予以应用,满足当代对于图像处理技术的需求', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('4', '20140128', '基于图像处理的轮胎胎面自动测长系统', '了实现对轮胎胎面长度的在线自动测量,研究了生产过程中采用的图像处理及测量算法,建立了基于图像处理的轮胎胎面测长系统.为了避免现场光源的影响,分别采用了中值滤波、', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('5', '20140129', '压敏漆图像处理软件设计', '探讨了压敏漆图像处理软件设计中遇到的几个问题和解决思路.具体包括图像交互延迟,MDI窗体排列,遮挡判断和多相机图像处理,病态匹配关系.针对上述问题发展了图像快速缩放平移算法', '2016/9/1', '2017/7/1');
INSERT INTO `subject` VALUES ('6', '20140130', '基于图像处理的围棋自动识别系统', '随着图像处理技术和理论的不断发展,相关应用也出现在各种领域,尤其是在体育方面,由于竞技比赛的特殊性,一些基于计算机视频图像处理技术的辅助系统,在简化工作量的同时,也成了比赛公平性的有力保障', '2016/9/1', '2017/7/1');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teaid` varchar(20) NOT NULL,
  `teaname` varchar(20) DEFAULT NULL,
  `teapw` varchar(20) DEFAULT NULL,
  `teacollege` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`teaid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('20140125', '耿楠', '123456', '信息工程学院');
INSERT INTO `teacher` VALUES ('20140126', '胡少军', '12346', '信息工程学院');
INSERT INTO `teacher` VALUES ('20140127', '蔡骋', '12347', '信息工程学院');
INSERT INTO `teacher` VALUES ('20140128', '耿耀君', '12348', '信息工程学院');
INSERT INTO `teacher` VALUES ('20140129', '冯妍', '12349', '信息工程学院');
INSERT INTO `teacher` VALUES ('20140130', '代媛', '12350', '信息工程学院');
