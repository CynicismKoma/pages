---
title: "安装jdk1.8后，修改%JAVA_HOME%为jdk1.6的路径,但运行java -version没有变化"
pubDatetime: 2019-04-03T08:50:59.000Z
description: "文章浏览阅读743次。本文详细记录了解决JAVA_HOME配置无效的问题过程，包括调整Path变量顺序、删除误配置的文件等步骤，最终通过正确设置JAVA_HOME环境变量解决了java版本识别错误的问题。"
tags: []
draft: false
---

1.按照网上的教程，jdk1.8会在C:windows/system32下生成java.exe等文件，而PATH路径中%SystemRoot%\system32排在了%JAVA_HOME%\bin和%JAVA_HOME%\jre\bin前面，导致先调用system32下的jdk，将%JAVA_HOME%\bin和%JAVA_HOME%\jre\bin调整到Path变量最前面即可。操作后问题还是没有解决。

2.删除C:windows/system32下生成的java.exe等文件，问题还是没有解决。

3.运行where java显示的是E:\XXXX\XXXX\oracle\product\11.2.0\dbhome_1\bin,此路径排在%JAVA_HOME%\bin和%JAVA_HOME%\jre\bin后面，猜测%JAVA_HOME%\bin和%JAVA_HOME%\jre\bin无效

4.运行echo %JAVA_HOME%显示%JAVA_HOME%而非JAVA_HOME的值，运行echo %Path%，%JAVA_HOME%也没有被JAVA_HOME的值替换，说明JAVA_HOME无效，将其修改为123，再次运行还是显示%JAVA_HOME%，有点无奈了。

5.重启--运行echo %JAVA_HOME%，显示123，修改为jdk路径，再次运行显示正常结果。运行java -version，变回jdk1.6了。

  
转载：https://blog.csdn.net/xx244/article/details/72123107   

