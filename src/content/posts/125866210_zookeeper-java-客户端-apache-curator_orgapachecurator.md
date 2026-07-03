---
title: "Zookeeper Java 客户端 ——Apache Curator_org.apache.curator"
pubDatetime: 2022-07-19T10:11:19
description: "一、基本依赖 Curator 是 Netflix 公司开源的一个 Zookeeper 客户端，目前由 Apache 进行维护。与 Zookeeper 原生客户端相比，Curator 的抽象层次更高，功能也更加丰富，是目前 Zookeeper 使用范围最广的 Java 客户端。本篇文章主要讲解其基本使用，项目采用 Maven 构建，以单元测试的方法进行讲解，相关依赖如下： < dependencie"
tags: []
draft: false
---
### 一、基本依赖

Curator 是 Netflix 公司开源的一个 Zookeeper 客户端，目前由 Apache 进行维护。与 Zookeeper 原生客户端相比，Curator 的抽象层次更高，功能也更加丰富，是目前 Zookeeper 使用范围最广的 Java 客户端。本篇文章主要讲解其基本使用，项目采用 Maven 构建，以单元测试的方法进行讲解，相关依赖如下：
    
    
    <dependencies>
        <!--Curator 相关依赖-->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>4.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>4.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.13</version>
        </dependency>
        <!--单元测试相关依赖-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
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
    
    

### 二、客户端相关操作

#### 2.1 创建客户端实例

这里使用 `@Before` 在单元测试执行前创建客户端实例，并使用 `@After` 在单元测试后关闭客户端连接。
    
    
    public class BasicOperation {
       
       
    
        private CuratorFramework client = null;
        private static final String zkServerPath = "192.168.0.226:2181";
        private static final String nodePath = "/hadoop/yarn";
    
        @Before
        public void prepare() {
       
       
            // 重试策略
            RetryPolicy retryPolicy = new RetryNTimes(3, 5000);
            client = CuratorFrameworkFactory.builder()
            .connectString(zkServerPath)
            .sessionTimeoutMs(10000).
    
    AI写代码java
    
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