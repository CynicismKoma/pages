---
title: "Zookeeper常用Shell命令_zkcli.sh -server localhost:2181连接不成功怎么办"
pubDatetime: 2022-07-19T10:12:08
description: "一、节点增删改查 1.1 启动服务和连接服务 # 启动服务 bin/zkServer.sh start #连接服务 不指定服务地址则默认连接到localhost:2181 zkCli.sh -server hadoop001:2181 AI写代码 shell 1 2 3 4 5 1.2 help命令 使用 help 可以查看所有命令及格式。 1.3 查看节点列表 查看节点列表有 ls path 和"
tags: []
draft: false
---
### 一、节点增删改查

#### 1.1 启动服务和连接服务
    
    
    # 启动服务
    bin/zkServer.sh start
    
    #连接服务 不指定服务地址则默认连接到localhost:2181
    zkCli.sh -server hadoop001:2181
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
        * 5
    
    

#### 1.2 help命令

使用 `help` 可以查看所有命令及格式。

#### 1.3 查看节点列表

查看节点列表有 `ls path` 和 `ls2 path` 两个命令，后者是前者的增强，不仅可以查看指定路径下的所有节点，还可以查看当前节点的信息。
    
    
    [zk: localhost:2181(CONNECTED) 0] ls /
    [cluster, controller_epoch, brokers, storm, zookeeper, admin,  ...]
    [zk: localhost:2181(CONNECTED) 1] ls2 /
    [cluster, controller_epoch, brokers, storm, zookeeper, admin, ....]
    cZxid = 0x0
    ctime = Thu Jan 01 08:00:00 CST 1970
    mZxid = 0x0
    mtime = Thu Jan 01 08:00:00 CST 1970
    pZxid = 0x130
    cversion = 19
    dataVersion = 0
    aclVersion = 0
    ephemeralOwner = 0x0
    dataLength = 0
    numChildren = 11
    
    
    AI写代码shell
    
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
    
    

#### 1.4 新增节点
    
    
    create [-s] [-e] path data acl   #其中-s 为有序节点，-e 临时节点
    
    
    AI写代码shell
      
        * 1
    
    

创建节点并写入数据：
    
    
    create /hadoop 123456
    
    
    AI写代码shell
      
        * 1
    
    

创建有序节点，此时创建的节点名为指定节点名 + 自增序号：
    
    
    [zk: localhost:2181(CONNECTED) 23] create -s /a  "aaa"
    Created /a0000000022
    [zk: localhost:2181(CONNECTED) 24] create -s /b  
    
    AI写代码shell
      
        * 1
        * 2