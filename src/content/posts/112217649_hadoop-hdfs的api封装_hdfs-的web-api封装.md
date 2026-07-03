---
title: "hadoop HDFS的API封装_hdfs 的web api封装"
pubDatetime: 2021-01-05T10:51:26
description: "Configuration类：该类的对象封装了客户端或者服务端的配置。 FileSystem类：该类的对象是一个文件系统对象，可以用该队想的一些方法来对文件进行操作。 FSDataInputStream和FSDataOutputStream：这两个类是HDFS中的输入输出流。 基本流程： 得到Configuration对象 得到FileSystem对象 进行文件操作（读写、删除、改名） 所需引入的"
tags: []
draft: false
---
1. Configuration类：该类的对象封装了客户端或者服务端的配置。
      
        2. FileSystem类：该类的对象是一个文件系统对象，可以用该队想的一些方法来对文件进行操作。
      
        3. FSDataInputStream和FSDataOutputStream：这两个类是HDFS中的输入输出流。
      
        4.  
      
        5. 基本流程：
      
        6. 得到Configuration对象
      
        7. 得到FileSystem对象
      
        8. 进行文件操作（读写、删除、改名）
      
        9. 所需引入的库
      
        10.  
      
        11. import org.apache.hadoop.conf.Configuration;
      
        12. import org.apache.hadoop.fs.FSDataOutputStream;
      
        13. import org.apache.hadoop.fs.FileStatus;
      
        14. import org.apache.hadoop.fs.FileSystem;
      
        15. import org.apache.hadoop.fs.Path;
      
        16. import org.apache.hadoop.io.IOUtils;
      
        17.  
      
        18. 文件操作前的准备工作
      
        19. <br>获取配置信息
      
        20. Configuration conf = new Configuration();
      
        21. 建立文件系统对象
      
        22. FileSystem fs = FileSystem.get(conf);
      
        23. 写文件
      
        24. Path dstPath = new Path(dst);//目标路径
      
        25. FSDataOutputStream outputStream = fs.create(dstPath);//打开一个输出流
      
        26. outputStream.write(contents);
      
        27. outputStream.close();
      
        28. fs.close();
      
        29. 读文件
      
        30. InputStream in = null;
      
        31. in = fs.open(srcPath);
      
        32. IOUtils.copyBytes(in,System.out,4096,false);//复制到标准输出流
      
        33. IOUtils.closeStream(in);
      
        34. 上传文件到HDFS
      
        35. Path srcPath = new Path(src);//原路径
      
        36. Path dstPath = new Path(dst);//目标路径
      
        37. fs.copyFromLocalFile(false,srcPath,dstPath);
      
        38. 前面参数是指是否删除原文件，true为删除，默认为false
      
        39. 获取指定文件信息
      
        40. FileStatus[] fileStatus = fs.listStatus(dstPath);
      
        41. boolean isok=fs.rename(oldPath,newPath);
      
        42. boolean isok=fs.deleteOnExit(path);
      
        43. boolean isok=fs.mkdirs(srcPath);
    
    
    
    
    AI写代码java
    
    运行
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)
      
      1.  打开eclipse建立一个工程，将代码copy，逐步运行。
      
        2.  
      
        3.  在工程中建立一个conf目录，注意先将相关的配置文件拷贝过去主要是三个文件core-site.xml , mapred-site.xml,hdfs-site.xml
      
        4.  
      
        5.  并在project属性中设置java build path 单击addfolder 将conf目录加上
      
        6.  
      
        7.  import java.io.FileInputStream;
      
        8.  
      
        9.  import java.io.IOException;
      
        10.  
      
        11.  import java.io.InputStream;
      
        12.  
      
        13.  import org.apache.hadoop.conf.Configuration;
      
        14.  
      
        15.  import org.apache.hadoop.fs.FSDataOutputStream;
      
        16.  
      
        17.  import org.apache.hadoop.fs.FileStatus;
      
        18.  
      
        19.  import org.apache.hadoop.fs.FileSystem;
      
        20.  
      
        21.  import org.apache.hadoop.fs.Path;
      
        22.  
      
        23.  import org.apache.hadoop.io.IOUtils;
      
        24.  
      
        25.  public class HdfsFile {
      
        26.  
      
        27.      //创建新文件
      
        28.  
      
        29.      public static void createFile(String dst , byte[] contents) throws IOException{
      
        30.  
      
        31.          Configuration conf = new Configuration();
      
        32.  
      
        33.          FileSystem fs = FileSystem.get(conf);
      
        34.  
      
        35.          Path dstPath = new Path(dst); //目标路径
      
        36.  
      
        37.          //打开一个输出流
      
        38.  
      
        39.          FSDataOutputStream outputStream = fs.create(dstPath);
      
        40.  
      
        41.          outputStream.write(contents);
      
        42.  
      
        43.          outputStream.close();
      
        44.  
      
        45.          fs.close();
      
        46.  
      
        47.          System.out.println("文件创建成功！");
      
        48.  
      
        49.      }
      
        50.  
      
        51.      //上传本地文件
      
        52.  
      
        53.      public static void uploadFile(String src,String dst) throws IOException{
      
        54.  
      
        55.          Configuration conf = new Configuration();
      
        56.  
      
        57.          FileSystem fs = FileSystem.get(conf);
      
        58.  
      
        59.          Path srcPath = new Path(src); //原路径
      
        60.  
      
        61.          Path dstPath = new Path(dst); //目标路径
      
        62.  
      
        63.          //调用文件系统的文件复制函数,前面参数是指是否删除原文件，true为删除，默认为false
      
        64.  
      
        65.          fs.copyFromLocalFile(false,srcPath, dstPath);
      
        66.  
      
        67.          //打印文件路径
      
        68.  
      
        69.          System.out.println("Upload to "+conf.get("fs.default.name"));
      
        70.  
      
        71.          System.out.println("------------list files------------"+"\n");
      
        72.  
      
        73.          FileStatus [] fileStatus = fs.listStatus(dstPath);
      
        74.  
      
        75.          for (FileStatus file : fileStatus)
      
        76.  
      
        77.          {
      
        78.  
      
        79.              System.out.println(file.getPath());
      
        80.  
      
        81.          }
      
        82.  
      
        83.          fs.close();
      
        84.  
      
        85.      }
      
        86.  
      
        87.      //文件重命名
      
        88.  
      
        89.      public static void rename(String oldName,String newName) throws IOException{
      
        90.  
      
        91.          Configuration conf = new Configuration();
      
        92.  
      
        93.          FileSystem fs = FileSystem.get(conf);
      
        94.  
      
        95.          Path oldPath = new Path(oldName);
      
        96.  
      
        97.          Path newPath = new Path(newName);
      
        98.  
      
        99.          boolean isok = fs.rename(oldPath, newPath);
      
        100.  
      
        101.          if(isok){
      
        102.  
      
        103.              System.out.println("rename ok!");
      
        104.  
      
        105.          }else{
      
        106.  
      
        107.              System.out.println("rename failure");
      
        108.  
      
        109.          }
      
        110.  
      
        111.          fs.close();
      
        112.  
      
        113.      }
      
        114.  
      
        115.      //删除文件
      
        116.  
      
        117.      public static void delete(String filePath) throws IOException{
      
        118.  
      
        119.          Configuration conf = new Configuration();
      
        120.  
      
        121.          FileSystem fs = FileSystem.get(conf);
      
        122.  
      
        123.          Path path = new Path(filePath);
      
        124.  
      
        125.          boolean isok = fs.deleteOnExit(path);
      
        126.  
      
        127.          if(isok){
      
        128.  
      
        129.              System.out.println("delete ok!");
      
        130.  
      
        131.          }else{
      
        132.  
      
        133.              System.out.println("delete failure");
      
        134.  
      
        135.          }
      
        136.  
      
        137.          fs.close();
      
        138.  
      
        139.      }
      
        140.  
      
        141.      //创建目录
      
        142.  
      
        143.      public static void mkdir(String path) throws IOException{
      
        144.  
      
        145.          Configuration conf = new Configuration();
      
        146.  
      
        147.          FileSystem fs = FileSystem.get(conf);
      
        148.  
      
        149.          Path srcPath = new Path(path);
      
        150.  
      
        151.          boolean isok = fs.mkdirs(srcPath);
      
        152.  
      
        153.          if(isok){
      
        154.  
      
        155.              System.out.println("create dir ok!");
      
        156.  
      
        157.          }else{
      
        158.  
      
        159.              System.out.println("create dir failure");
      
        160.  
      
        161.          }
      
        162.  
      
        163.          fs.close();
      
        164.  
      
        165.      }
      
        166.  
      
        167.      //读取文件的内容
      
        168.  
      
        169.      public static void readFile(String filePath) throws IOException{
      
        170.  
      
        171.          Configuration conf = new Configuration();
      
        172.  
      
        173.          FileSystem fs = FileSystem.get(conf);
      
        174.  
      
        175.          Path srcPath = new Path(filePath);
      
        176.  
      
        177.          InputStream in = null;
      
        178.  
      
        179.          try {
      
        180.  
      
        181.              in = fs.open(srcPath);
      
        182.  
      
        183.              IOUtils.copyBytes(in, System.out, 4096, false); //复制到标准输出流
      
        184.  
      
        185.          } finally {
      
        186.  
      
        187.              IOUtils.closeStream(in);
      
        188.  
      
        189.          }
      
        190.  
      
        191.      }
      
        192.  
      
        193.      public static void main(String[] args) throws IOException {
      
        194.  
      
        195.          //测试上传文件
      
        196.  
      
        197.          //uploadFile("/home/hadoop/music1.txt","hdfs://master:9000/user/hadoop/test.txt");
      
        198.  
      
        199.          //测试创建文件
      
        200.  
      
        201.        //byte[] contents =  "hello world 世界你好\n".getBytes();
      
        202.  
      
        203.         //createFile("hdfs://master:9000/user/hadoop/test1/d.txt",contents);
      
        204.  
      
        205.          //测试重命名
      
        206.  
      
        207.          //rename("hdfs://master:9000/user/hadoop/test1/d.txt", "hdfs://master:9000/user/hadoop/test1/dd.txt");
      
        208.  
      
        209.          //测试删除文件
      
        210.  
      
        211.          //delete("hdfs://master:9000/user/hadoop/test1/d.txt"); //使用相对路径
      
        212.  
      
        213.         //delete("hdfs://master:9000/user/hadoop/test1");    //删除目录
      
        214.  
      
        215.          //测试新建目录
      
        216.  
      
        217.         // mkdir("hdfs://master:9000/user/hadoop/test1");
      
        218.  
      
        219.          //测试读取文件
      
        220.  
      
        221.          //readFile("hdfs://master:9000/user/hadoop/test1/d.txt");
      
        222.  
      
        223.      }
      
        224.  
      
        225.  }
    
    
    
    
    AI写代码java
    
    运行
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)