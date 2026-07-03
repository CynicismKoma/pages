---
title: "hadoop hdfs文件读取写入流程_服务器从hdfs服务器上读取文件到写到本地服务器"
pubDatetime: 2021-01-05T10:48:20
description: "HDFS文件读取的过程 1).使用HDFS提供的客户端开发库Client，向远程的Namenode发起RPC请求； 2).Namenode会视情况返回文件的部分或者全部block列表，对于每个block，Namenode都会返回有该block拷贝的DataNode地址； 3).客户端开发库Client会选取离客户端最接近的DataNode来读取block；如果客户端本身就是DataNode,那么将"
tags: []
draft: false
---
#### HDFS文件读取的过程

1).使用HDFS提供的客户端开发库Client，向远程的Namenode发起RPC请求；

2).Namenode会视情况返回文件的部分或者全部block列表，对于每个block，Namenode都会返回有该block拷贝的DataNode地址；

3).客户端开发库Client会选取离客户端最接近的DataNode来读取block；如果客户端本身就是DataNode,那么将从本地直接获取数据.

4).读取完当前block的数据后，关闭与当前的DataNode连接，并为读取下一个block寻找最佳的DataNode；

5).当读完列表的block后，且文件读取还没有结束，客户端开发库会继续向Namenode获取下一批的block列表。

6).读取完一个block都会进行checksum验证，如果读取datanode时出现错误，客户端会通知Namenode，然后再从下一个拥有该block拷贝的datanode继续读。

#### HDFS写入文件的过程

HDFS写入文件的过程：

1).使用HDFS提供的客户端开发库Client，向远程的Namenode发起RPC请求；

2).Namenode会检查要创建的文件是否已经存在，创建者是否有权限进行操作，成功则会为文件创建一个记录，否则会让客户端抛出异常；

3).当客户端开始写入文件的时候，开发库会将文件切分成多个packets，并在内部以数据队列"data queue"的形式管理这些packets，并向Namenode申请新的blocks，获取用来存储replicas的合适的datanodes列表，列表的大小根据在Namenode中对replication的设置而定。

4).开始以pipeline（管道）的形式将packet写入所有的replicas中。开发库把packet以流的方式写入第一个datanode，该datanode把该packet存储之后，再将其传递给在此pipeline中的下一个datanode，直到最后一个datanode，这种写数据的方式呈流水线的形式。

5).最后一个datanode成功存储之后会返回一个ack packet，在pipeline里传递至客户端，在客户端的开发库内部维护着"ack queue"，成功收到datanode返回的ack packet后会从"ack queue"移除相应的packet。

6).如果传输过程中，有某个datanode出现了故障，那么当前的pipeline会被关闭，出现故障的datanode会从当前的pipeline中移除，剩余的block会继续剩下的datanode中继续以pipeline的形式传输，同时Namenode会分配一个新的datanode，保持replicas设定的数量。

#### **HDFS的shell操作**

**1\. 直接访问Hadoop程序**

在/etc/prifile中加入
      
      1. export HADOOP_HOME=/home/hduser/hadoop （hadoop的安装目录）
      
        2. export PATH=$HADOOP_HOME/bin:$PATH
    
    
    
    
    AI写代码

source /etc/profile 是环境变量生效

**2\. HDFS命令格式：**
      
      1. HDFS基本命令（在hadoop目录下执行为例）
      
        2.  
      
        3. bin/hadoop fs -cmd <args>
      
        4.  
      
        5.            cmd:具体的操作，基本上与UNIX的命令行相同
      
        6.  
      
        7.            <args>:有时需包含参数
      
        8.  
      
        9.              例如：bin/hadoop fs -ls /
    
    
    
    
    AI写代码

**3\. 常见的hadoop命令解析：**

> put命令只能从本地的文件复制到HDFS上；
> 
> get命令将HDFS上的文件复制到本地；
> 
> cp命令只能在相同的文件系统上互相复制文件。这三个命令都可以复制多个文件。复制单个文件时，目标路径可以是目录也可以是文件，目标路径是目录时，文件名不改变，目标路径是文件时，可以修改文件名；复制多个文件时，目标路径必须是目录，文件名不能修改。
> 
> copyFromLocal命令，此命令与put命令相似，区别是此命令只能复制一个文件。目标路径是目录时，文件名不改变，目标路径是文件时，可以修改文件名。
> 
> copyToLocal命令，此命令与get命令相似，区别是此命令只能复制一个文件。目标路径是目录时，文件名不改变，目标路径是文件时，可以修改文件名。
> 
> mv命令只能在相同的文件系统上移动文件，可以移动多个文件。标路径是目录时，文件名不改变，目标路径是文件时，可以修改文件名。
> 
> 以上所有目录必须是存在的。

**4\. 常见的hadoop命令示例**
      
      1. mkdir 使用方法：hadoop fs -mkdir <paths>
      
        2.  
      
        3.       示例：hadoop fs -mkdir /user
      
        4.  
      
        5. ls 列出path目录下的内容，包括文件名，权限，所有者，大小和修改时间
      
        6.  
      
        7. 　　hadoop fs -ls /
      
        8.  
      
        9. 　　hadoop fs -ls -R /
      
        10.  
      
        11. put 使用方法：hadoop fs -put <localsrc> ... <dst>
      
        12.  
      
        13. 　　从本地文件系统中复制单个或多个源路径到目标文件系统。也支持从标准输入中读取输入写入目标文件系统。
      
        14.  
      
        15. 　　hadoop fs -put localfile /user/ 拷贝localfile文件到hdfs的user目录下
      
        16.  
      
        17. 　　hadoop fs -put localfile1 localfile2 /user/ 同时拷贝localfile1和localfile2文件到hdfs的user目录下
      
        18.  
      
        19. 　　hadoop fs -put - /user/hadoopfile 在hadoopfile文件里手工录入内容（录入之前hadoopfile文件不存在），按Ctrl+C键录入结束　
      
        20.  
      
        21. get 使用方法：hadoop fs -get [-ignorecrc] [-crc]    <src> <localdst> 复制文件到本地文件系统
      
        22.  
      
        23. 　　示例：hadoop fs -get /user/hadoop/file localfile
      
        24.  
      
        25. cat 使用方法：hadoop fs -cat URI [URI ...]
      
        26.  
      
        27. 　　示例：hadoop fs -ls /user/hadoopfile 查看文件内容
      
        28.  
      
        29. rm 使用方法：hadoop fs -rm URI [URI ...]
      
        30.  
      
        31. 　　删除指定的文件。只删除非空目录和文件。请参考rmr命令了解递归删除。
      
        32.  
      
        33. 　　示例：hadoop fs -rm /user/read.txt 删除文件
      
        34.  
      
        35. 　　示例：hadoop fs -rm  -f /user/read.txt 强制删除文件
      
        36.  
      
        37. rmr 使用方法：hadoop fs -rmr URI [URI ...]
      
        38.  
      
        39. 　　示例：hadoop fs -rmr /user/     删除/usr/下所有的文件和目录
      
        40.  
      
        41. delete的递归版本。
      
        42.  
      
        43. 　　示例：hadoop fs -rm -r /user/hadoop/dir
      
        44.  
      
        45. getmerge 使用方法：hadoop fs -getmerge <src> <localdst> [addnl]
      
        46.  
      
        47. 　　接受一个源目录和一个目标文件作为输入，并且将源目录中所有的文件连接成本地目标文件。addnl是可选的，用于指定在每个文件结尾添加一个换行符。
      
        48.  
      
        49. 　　示例：hadoop fs -getmerge /input2 file2.txt
      
        50.  
      
        51. mv 使用方法：hadoop fs -mv URI [URI ...] <dest>
      
        52.  
      
        53. 　　将文件从源路径移动到目标路径。这个命令允许有多个源路径，此时目标路径必须是一个目录。
      
        54.  
      
        55. 　　不允许在不同的文件系统间移动文件。
      
        56.  
      
        57. 　　也可以重命名文件
      
        58.  
      
        59. 　　示例：hadoop fs -mv /hadoop/file1 /hadoop/file2
      
        60.  
      
        61. 　　　　  hadoop fs -mv /hadoop/file1.txt  /hadoop/file1.txt.bak.0722　　
      
        62.  
      
        63. stat 使用方法：hadoop fs -stat URI [URI ...]
      
        64.  
      
        65. 　　返回指定路径的统计信息。
      
        66.  
      
        67. 　　示例：hadoop fs -stat /input2
      
        68.  
      
        69. tail 使用方法：hadoop fs -tail [-f] URI
      
        70.  
      
        71. 　　将文件尾部1k字节的呢绒输出到stdout。支持-f选项，行为和Unix中一致。
      
        72.  
      
        73. 　　示例：hadoop fs -tail pathname
      
        74.  
      
        75. chmod 使用方法：hadoop fs -chmod [-R] <MODE[,MODE]... | OCTALMODE> URI [URI ...]
      
        76.  
      
        77. 　　设为所有人皆可读取
      
        78.  
      
        79. 　　chmod a+r file1.txt
      
        80.  
      
        81. chown 使用方法：hadoop fs -chown [-R] [OWNER][:[GROUP]] URI [URI]
      
        82.  
      
        83. touchz 使用方法：hadoop fs -touchz URI [URI ...]
      
        84.  
      
        85. 　　创建一个0字节的空文件。
      
        86.  
      
        87. 　　示例：hadoop fs -touchz pathname
      
        88.  
      
        89. copyToLocal 使用方法：hadoop fs -copyToLocal [ignorecrc] [-crc] URI <localdst>
      
        90.  
      
        91. 　　除了限定目标路径是一个本地文件外，和get命令类似。
      
        92.  
      
        93. copyFromLocal 使用方法：hadoop fs -copyFromLocal <localsrc> URI
      
        94.  
      
        95. 　　除了限定源路径是一个本地文件外，和put命令相似。
      
        96.  
      
        97. cp 使用方法：hadoop fs -cp URI [URI ...] <dest>
      
        98.  
      
        99. 　　将文件从源路径复制到目标路径。这个命令允许有多个源路径，此时目标路径必须是一个目录。
      
        100.  
      
        101. 　　示例： hadoop fs -cp /user/hadoop/file1 /user/hadoop/file2
      
        102.  
      
        103. du 使用方法：hadoop fs -du URI [URI ...]
      
        104.  
      
        105. 　　显示目录中所有文件的大小
      
        106.  
      
        107. 　　示例：hadoop fs -du /user/hadoop/dir1
      
        108.  
      
        109. du -s 使用方法：hadoop fs -du -s <args>
      
        110.  
      
        111. 　　显示文件的大小
      
        112.  
      
        113. 　　常用：hadoop fs -du -h /srv/smart/hhh.txt
      
        114.  
      
        115. expunge 使用方法：hadoop fs -expunge
      
        116. 　　清空回收站
      
        117. 回收站： hadoop fs -ls /安装目录下/.trash
      
        118.        Hadoop文件删除后可以放在回收站内
    
    
    
    
    AI写代码
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)