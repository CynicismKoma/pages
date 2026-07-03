---
title: "Zookeeper ACL"
pubDatetime: 2022-07-19T10:09:49
description: "一、前言 为了避免存储在 Zookeeper 上的数据被其他程序或者人为误修改，Zookeeper 提供了 ACL(Access Control Lists) 进行权限控制。只有拥有对应权限的用户才可以对节点进行增删改查等操作。下文分别介绍使用原生的 Shell 命令和 Apache Curator 客户端进行权限设置。 二、使用Shell进行权限管理 2.1 设置与查看权限 想要给某个节点设置权"
tags: []
draft: false
---
### 一、前言

为了避免存储在 Zookeeper 上的数据被其他程序或者人为误修改，Zookeeper 提供了 ACL(Access Control Lists) 进行权限控制。只有拥有对应权限的用户才可以对节点进行增删改查等操作。下文分别介绍使用原生的 Shell 命令和 Apache Curator 客户端进行权限设置。

### 二、使用Shell进行权限管理

#### 2.1 设置与查看权限

想要给某个节点设置权限 (ACL)，有以下两个可选的命令：
    
    
     # 1.给已有节点赋予权限
     setAcl path acl
     
     # 2.在创建节点时候指定权限
     create [-s] [-e] path data acl
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
        * 5
    
    

查看指定节点的权限命令如下：
    
    
    getAcl path
    
    
    AI写代码shell
      
        * 1
    
    

#### 2.2 权限组成

Zookeeper 的权限由[scheme : id :permissions]三部分组成，其中 Schemes 和 Permissions 内置的可选项分别如下：

**Permissions 可选项** ：

  * **CREATE** ：允许创建子节点；
  * **READ** ：允许从节点获取数据并列出其子节点；
  * **WRITE** ：允许为节点设置数据；
  * **DELETE** ：允许删除子节点；
  * **ADMIN** ：允许为节点设置权限。

**Schemes 可选项** ：

  * **world** ：默认模式，所有客户端都拥有指定的权限。world 下只有一个 id 选项，就是 anyone，通常组合写法为 `world:anyone:[permissons]`；
  * **auth** ：只有经过认证的用户才拥有指定的权限。通常组合写法为 `auth:user:password:[permissons]`，使用这种模式时，你需要先进行登录，之后采用 auth 模式设置权限时，`user` 和 `password` 都将使用登录的用户名和密码；
  * **digest** ：只有经过认证的用户才拥有指定的权限。通常组合写法为 `auth:user:BASE64(SHA1(password)):[permissons]`，这种形式下的密码必须通过 SHA1 和 BASE64 进行双重加密；
  * **ip** ：限制只有特定 IP 的客户端才拥有指定的权限。通常组成写法为 `ip:182.168.0.168:[permissions]`；
  * **super** ：代表超级管理员，拥有所有的权限，需要修改 Zookeeper 启动脚本进行配置。

#### 2.3 添加认证信息

可以使用如下所示的命令为当前 Session 添加用户认证信息，等价于登录操作。
    
    
    # 格式
    addauth scheme auth 
    
    #示例：添加用户名为heibai,密码为root的用户认证信息
    addauth digest heibai:root 
    
    
    AI写代码shell
      
        * 1
        * 2
        * 3
        * 4
        * 5
    
    

#### 2.4 权限设置示例

##### 1\. world模式

world 是一种默认的模式，即创建时如果不指定权限，则默认的权限就是 world。
    
    
    [zk: localhost:2181(CONNECTED) 32] create /hadoop 123
    Created /hadoop
    [zk: localhost:2181(CONNECTED) 33] getAcl /hadoop
    'world,'anyone    #默认的权限
    : cdrwa
    [zk: localhost:2181(CONNECTED) 34] setAcl /hadoop world:anyone:cwda   # 修改节点，不允许所有客户端读
    ....
    [zk: localhost:2181(CONNECTED) 35] get /hadoop
    Authentication is not valid : /hadoop     # 权限不足
    
    
    
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
    
    

##### 2\. auth模式
    
    
    [zk: localhost:2181(CONNECTED) 36] addauth digest heibai:heibai  # 登录
    [zk: localhost:2181(CONNECTED) 37] setAcl /hadoop auth::cdrwa    # 设置权限
    [zk: localhost:2181(CONNECTED) 38] getAcl /hadoop                # 获取权限
    'digest,'heibai:sCxtVJ1gPG8UW/jzFHR0A1ZKY5s=   #用户名和密码 (密码经过加密处理)，注意返回的权限类型是 digest
    : cdrwa
    
    #用户名和密码都是使用登录的用户名和密码，即使你在创建权限时候进行指定也是无效的
    [zk: localhost:2181(CONNECTED) 39] setAcl /hadoop auth:root:root:cdrwa    #指定用户名和密码为 root
    [zk: localhost:2181(CONNECTED) 40] getAcl /hadoop
    'digest,'heibai:sCxtVJ1gPG8UW/jzFHR0A1ZKY5s=  #无效，使用的用户名和密码依然还是 heibai
    : cdrwa
    
    
    
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
    
    

##### 3\. digest模式
    
    
    [zk:44] create /spark "spark" digest:heibai:sCxtVJ1gPG8UW/jzFHR0A1ZKY5s=:cdrwa  #指定用户名和加密后的密码
    [zk:45] getAcl /spark  #获取权限
    
    
    AI写代码shell
      
        * 1
        * 2