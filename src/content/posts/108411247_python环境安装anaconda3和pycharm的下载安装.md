---
title: "python环境安装(Anaconda3和pycharm的下载安装)"
pubDatetime: 2020-09-05T09:51:55.000Z
description: "文章浏览阅读595次。@[TOC]python环境安装(Anaconda3和pycharm的下载安装)Anaconda3的下载和安装你好！ 这是你第一次使用 Markdown编辑器 所展示的欢迎页。如果你想学习如何使用Markdown编辑器, 可以仔细阅读这篇文章，了解一下Markdown的基本语法知识。众所周知，Anaconda3新的改变我们对Markdown编辑器进行了一些功能拓展与语法支持，"
tags: []
draft: false
---
python环境安装(Anaconda3和pycharm的下载安装)

## Anaconda3的下载和安装

众所周知，**Anaconda3** 是一个非常好用的python3项目管理工具，内含conda和python3等众多环境

### 下载地址

链接: [Anaconda3传送门](<https://www.anaconda.com/products/individual/get-started>).

### 安装

傻瓜式下一步安装就好了， 可以自己选择安装位置

### 检测是否安装成功

使用以下这个命令进行测试

> conda --version

如果显示了conda版本就证明安装成功

## pycharm社区版的下载和安装

众所周知，**pycharm** 是由JetBrains打造的一款Python IDE，个人认为是最好用的开发工具，类似于java中，eclipse还是没有IDEA好用一些。然而收费限制了想象，所以我们选择社区版下载，感觉好像目前也没有遇到什么瓶颈，可以正常使用。有些东西只是搭建麻烦而已，不过仍然可以使用。

### 下载地址

链接: [pycharm传送门](<https://www.jetbrains.com/pycharm/download/download-thanks.html?platform=windows&code=PCC>).

### 安装

傻瓜式下一步安装就好了， 可以自己选择安装位置  
记得点击这里添加一个桌面快捷方式  
![记得在合理勾选桌面快捷方式](/assets/108411247_0.png)

### pycharm配置ananconda3环境

1.pycharm配置python和解释器的环境  
打开pycharm，File->setting->project …->python Interpreter->右边python Interpreter最后面的设置->add->Existing environment->选择anaconda文件夹下的python.exe,然后就OK了  
2.设置pycharm的字体大小  
File->setting->Editor->Font->  
Font;Source Code Pro(这个字体看起来比较舒服，收费版默认是这个字体)  
Size:16  
Line spacing:1.0

### 检测是否安装成功

在自己的文件夹下，右键->New->Python File->创建一个test.py的python测试文件  
输入以下Hello world打印语句
[code] 
    print('Hello world')
    
[/code]

右键Run ‘test’  
在下面看见打印结果即可得出结论

其实pycharm社区版与pycharm收费版相对比的话，收费版多了一些快速搭建web等的插件，然而pycharm社区版其实也可以搭建django，过两天再写一个pycharm社区版搭建django框架的文章吧…
