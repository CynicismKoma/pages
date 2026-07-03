---
title: "Windows下 hadoop hdfs操作文件常用命令_window环境下的hadoop删除hdfs文件"
pubDatetime: 2020-11-13T14:19:09
description: "查看帮助 hdfs dfs -help AI写代码 查看当前目录信息 hdfs dfs - ls / AI写代码 上传文件 hdfs dfs -put / 本地路径 / hdfs路径 AI写代码 剪切文件 hdfs dfs -moveFromLocal a .txt / aa .txt AI写代码 下载文件到本地 hdfs dfs - get / hdfs路径 / 本地路径 AI写代码 合并下载 "
tags: []
draft: false
---
查看帮助
    
    
    hdfs dfs -help
    
    AI写代码

查看当前目录信息
    
    
    hdfs dfs -ls /
    
    AI写代码

上传文件
    
    
    hdfs dfs -put /本地路径 /hdfs路径
    
    AI写代码

剪切文件
    
    
    hdfs dfs -moveFromLocal a.txt /aa.txt
    
    AI写代码

下载文件到本地
    
    
    hdfs dfs -get /hdfs路径 /本地路径
    
    AI写代码

合并下载
    
    
    hdfs dfs -getmerge /hdfs路径文件夹 /合并后的文件
    
    AI写代码

创建文件夹
    
    
    hdfs dfs -mkdir /hello
    
    AI写代码

创建多级文件夹
    
    
    hdfs dfs -mkdir -p /hello/world
    
    AI写代码

移动hdfs文件
    
    
    hdfs dfs -mv /hdfs路径 /hdfs路径
    
    AI写代码

复制hdfs文件
    
    
    hdfs dfs -cp /hdfs路径 /hdfs路径
    
    AI写代码

删除hdfs文件
    
    
    hdfs dfs -rm /aa.txt
    
    AI写代码

删除hdfs文件夹
    
    
    hdfs dfs -rm -r /hello
    
    AI写代码

查看hdfs中的文件
      
      1. hdfs dfs -cat /文件
      
        2. hdfs dfs -tail -f /文件
    
    
    
    
    AI写代码

查看文件夹中有多少个文件
    
    
    hdfs dfs -count /文件夹
    
    AI写代码

查看hdfs的总空间
      
      1. hdfs dfs -df /
      
        2. hdfs dfs -df -h /
    
    
    
    
    AI写代码

修改副本数
    
    
    hdfs dfs -setrep 1 /a.txt
    
    AI写代码