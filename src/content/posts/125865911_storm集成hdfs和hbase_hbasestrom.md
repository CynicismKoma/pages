---
title: "Storm集成HDFS和HBase_hbasestrom"
pubDatetime: 2022-07-19T10:02:18
description: "一、Storm集成HDFS 1.1 项目结构 1.2 项目主要依赖 项目主要依赖如下，有两个地方需要注意： 这里由于我服务器上安装的是 CDH 版本的 Hadoop，在导入依赖时引入的也是 CDH 版本的依赖，需要使用 <repository> 标签指定 CDH 的仓库地址； hadoop-common 、 hadoop-client 、 hadoop-hdfs 均需要排除 slf4j-log4j"
tags: []
draft: false
---
### 一、Storm集成HDFS

#### 1.1 项目结构

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6be015a6330733dd6eefaceac71b62c4.png#pic_center)

#### 1.2 项目主要依赖

项目主要依赖如下，有两个地方需要注意：

  * 这里由于我服务器上安装的是 CDH 版本的 Hadoop，在导入依赖时引入的也是 CDH 版本的依赖，需要使用 `<repository>` 标签指定 CDH 的仓库地址；
  * `hadoop-common`、`hadoop-client`、`hadoop-hdfs` 均需要排除 `slf4j-log4j12` 依赖，原因是 `storm-core` 中已经有该依赖，不排除的话有 JAR 包冲突的风险；

    
    
    <properties>
        <storm.version>1.2.2</storm.version>
    </properties>
    
    <repositories>
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
        </repository>
    </repositories>
    
    <dependencies>
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-core</artifactId>
            <version>${storm.version}</version>
        </dependency>
        <!--Storm 整合 HDFS 依赖-->
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-hdfs</artifactId>
            <version>${storm.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>2.6.0-cdh5.15.2</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>2.6.0-cdh5.15.2</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>
            <version>2.6.0-cdh5.15.2</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
    
    
    AI写代码xml
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
        * 7
        * 8
        * 9
        * 10
        * 11
        * 12
        * 13
        * 14
        * 15
        * 16
        * 17
        * 18
        * 19
        * 20
        * 21
        * 22
        * 23
        * 24
        * 25
        * 26
        * 27
        * 28
        * 29
        * 30
        * 31
        * 32
        * 33
        * 34
        * 35
        * 36
        * 37
        * 38
        * 39
        * 40
        * 41
        * 42
        * 43
        * 44
        * 45
        * 46
        * 47
        * 48
        * 49
        * 50
        * 51
        * 52
        * 53
        * 54
        * 55
        * 56
        * 57
    
    

#### 1.3 DataSourceSpout
    
    
    /**
     * 产生词频样本的数据源
     *
    
    AI写代码java
      
        * 1
        * 2