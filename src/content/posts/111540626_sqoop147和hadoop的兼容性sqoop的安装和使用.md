---
title: "sqoop1.4.7和hadoop的兼容性，sqoop的安装和使用"
pubDatetime: 2020-12-22T13:50:41.000Z
description: "文章浏览阅读3.6k次，点赞2次，收藏20次。本文介绍如何在Hadoop环境下安装配置Sqoop1.4.7版本，包括下载解压、环境变量设置、配置文件修改、JDBC驱动拷贝及常见问题解决等步骤。"
tags: []
draft: false
---

### sqoop1.4.7兼容hadoop2.6以上所有版本

### 1 下载并解压

**1）下载地址：http://mirrors.hust.edu.cn/apache/sqoop**

**2）上传安装包****sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz到服务器**

**3）解压sqoop安装包**
[code] 
     tar -zxf sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
[/code]

**4)添加环境变量**

### 2 修改配置文件

**1) 进入到/opt/module/sqoop/conf目录，重命名配置文件**
[code] 
     mv sqoop-env-template.sh sqoop-env.sh
[/code]

**2) 修改配置文件**
[code] 
    vi sqoop-env.sh 
[/code]

增加如下内容
[code] 
    export HADOOP_COMMON_HOME=/root/software/hadoop-3.2.1
    export HADOOP_MAPRED_HOME=/root/software/hadoop-3.2.1
[/code]

**3 拷贝JDBC驱动**

**下载jar包可以去**<https://mvnrepository.com/>**maven仓库进行下载**

**1）将mysql-connector-java-8.0.16.jar拷贝jdbc驱动到sqoop的lib目录下**

**4.修改配置文件**

**在bin目录下修改configure-sqoop，修改掉对hbase和ZOOKEEPER的验证**
[code] 
    ## Moved to be a runtime check in sqoop.
    #if [ ! -d "${HBASE_HOME}" ]; then
    # echo "Warning: $HBASE_HOME does not exist! HBase imports will fail."
    #  echo 'Please set $HBASE_HOME to the root of your HBase installation.'
    #fi
[/code]
[code] 
    #if [ ! -d "${ZOOKEEPER_HOME}" ]; then
    #  echo "Warning: $ZOOKEEPER_HOME does not exist! Accumulo imports will fail."
    #  echo 'Please set $ZOOKEEPER_HOME to the root of your Zookeeper installation.'
    #fi
[/code]

**5.可能会报错，说是Stringutils没找到**

下载并导入commons-lang-2.6.jar包即可

**6.测试运行**
[code] 
    bin/sqoop list-tables --connect jdbc:mysql://10.9.1.139:3306/cluster?serverTimezone=UTC --username root --password a
    
[/code]
