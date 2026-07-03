---
title: "Sqoop教程：跨数据库与Hadoop的数据迁移与同步指南"
pubDatetime: 2022-07-18T10:58:32
description: "一、Sqoop 基本命令 1. 查看所有命令 # sqoop help AI写代码 shell 1 2. 查看某条命令的具体使用方法 # sqoop help 命令名 AI写代码 shell 1 二、Sqoop 与 MySQL 1. 查询MySQL所有数据库 通常用于 Sqoop 与 MySQL 连通测试： sqoop list-databases \ --connect jdbc:mysql:/"
tags: []
draft: false
---
### 一、Sqoop 基本命令

#### 1\. 查看所有命令
    
    
    # sqoop help
    
    
    AI写代码shell
      
        * 1
    
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a6a63d9ba0ff734adb6f9f2ed586066b.png#pic_center)

  

#### 2\. 查看某条命令的具体使用方法
    
    
    # sqoop help 命令名
    
    
    AI写代码shell
      
        * 1
    
    

### 二、Sqoop 与 MySQL

#### 1\. 查询MySQL所有数据库

通常用于 Sqoop 与 MySQL 连通测试：
    
    
    sqoop list-databases \
    --connect jdbc:mysql://hadoop001:3306/ \
    --username root \
    --password root
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
    
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2ee7512f95c9b179c0f49c2107a46de6.png#pic_center)

  

#### 2\. 查询指定数据库中所有数据表
    
    
    sqoop list-tables \
    --connect jdbc:mysql://hadoop001:3306/mysql \
    --username root \
    --password root
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
    
    

### 三、Sqoop 与 HDFS

#### 3.1 MySQL数据导入到HDFS

##### 1\. 导入命令

示例：导出 MySQL 数据库中的 `help_keyword` 表到 HDFS 的 `/sqoop` 目录下，如果导入目录存在则先删除再导入，使用 3 个 `map tasks` 并行导入。

> 注：help_keyword 是 MySQL 内置的一张字典表，之后的示例均使用这张表。
    
    
    sqoop import \
    --connect jdbc:mysql://hadoop001:3306/mysql \     
    --username root \
    --password root \
    --table help_keyword \           # 待导入的表
    --delete-target-dir \            # 目标目录存在则先删除
    --target-dir /sqoop \            # 导入的目标目录
    --fields-terminated-by '\t'  \   # 指定导出数据的分隔符
    -m 3                             # 指定并行执行的 map tasks 数量
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
        * 7
        * 8
        * 9
    
    

日志输出如下，可以看到输入数据被平均 `split` 为三份，分别由三个 `map task` 进行处理。数据默认以表的主键列作为拆分依据，如果你的表没有主键，有以下两种方案：

  * 添加 `-- autoreset-to-one-mapper` 参数，代表只启动一个 `map task`，即不并行执行；
  * 若仍希望并行执行，则可以使用 `--split-by <column-name>` 指明拆分数据的参考列。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/134ed8ed56ab6bb623be1239b10aed74.png#pic_center)

##### 2\. 导入验证
    
    
    # 查看导入后的目录
    hadoop fs -ls  -R /sqoop
    # 查看导入内容
    hadoop fs -text  /sqoop/part-m-00000
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
    
    

查看 HDFS 导入目录,可以看到表中数据被分为 3 部分进行存储，这是由指定的并行度决定的。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/53c0a88e828b176fd898b6b15468b235.png#pic_center)

  

#### 3.2 HDFS数据导出到MySQL