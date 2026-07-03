---
title: "Escape character is '^]' Connection closed by foreign host._escape character is '^]'. connection closed by for"
pubDatetime: 2019-07-12T15:43:12
description: "[root @pengman Desktop]# telnet 10.223 .30 .128 7027 Tring 10.223 .30 .128 .7027 Connected to 10.223 .30 .128 ( 10.223 .30 .128 ) // 表示已经成功连接 Escape character is '^]' // 不是报错,'^]' 中的^ 表示 ctrl键,表示此时 同时"
tags: []
draft: false
---
1. [root@pengman Desktop]# telnet 10.223.30.128 7027
      
        2.  
      
        3. Tring 10.223.30.128.7027
      
        4.  
      
        5. Connected to 10.223.30.128 (10.223.30.128)  // 表示已经成功连接
      
        6.  
      
        7. Escape character is '^]'  // 不是报错,"^]" 中的^ 表示 ctrl键,表示此时 同时按 Ctrl 和 ］   两个键进入telnet客户端的命令模式
      
        8.  
      
        9. Connection closed by foreign host. //长时间没有其他命令数据输入,linux自动关闭相应的连接
    
    
    
    
    AI写代码java
    
    运行