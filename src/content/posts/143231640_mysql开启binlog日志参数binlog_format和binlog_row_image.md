---
title: "MySQL：开启binlog日志（参数binlog_format和binlog_row_image）"
pubDatetime: 2024-10-25T12:50:02.000Z
description: "文章浏览阅读3k次，点赞17次，收藏26次。binlog日志只保留七天。_mysql binlog-format"
tags: []
draft: false
---
binlog日志只保留七天

### 一、mysql binlog 三种格式

mysql的binlog日志作用是用来记录mysql内部增删改等对mysql数据库有更新内容的记录（对数据库进行改动的操作），对数据库查询的语句如show，select开头的语句，不会被binlog日志记录，最大的作用是用来数据增量恢复和主从库复制

#### ROW

ROW格式会记录每行记录修改的记录，这样可能会产生大量的日志内容,比如一条update语句修改了100条记录，那么这100条记录的修改都会被记录在binlog日志中，这样造成binlog日志量会很大，这种日志格式会占用大量的系统资源，mysql5.7和myslq8.0安装后默认就是这种格式。

#### STATEMENT

记录每一条修改数据的SQL语句（批量修改时，记录的不是单条SQL语句，而是批量修改的SQL语句事件）所以大大减少了binlog日志量，节约磁盘IO，提高性能,看上面的图解可以很好的理解row和statement 两种模式的区别。但是STATEMENT对一些特殊功能的复制效果不是很好，比如：函数、存储过程的复制。由于row是基于每一行的变化来记录的，所以不会出现类似问题

#### MIXED

实际上就是前两种模式的结合。在Mixed模式下，MySQL会根据执行的每一条具体的sql语句来区分对待记录的日志形式，也就是在Statement和Row之间选择一种。

**相对较老的版本中默认使用的格式可能是STATEMENT，但是我装了5.7和mysql8.0的版本，默认的格式都是ROW，即便如此，还是比较推荐使用STATEMENT或MIXED**

#### 修改 binlog_format 参数

`binlog_format` 为 binlog 的记录模式，有以下三种：
