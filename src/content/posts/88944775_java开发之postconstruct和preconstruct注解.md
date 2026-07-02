---
title: "Java开发之@PostConstruct和@PreConstruct注解"
pubDatetime: 2019-04-01T11:45:54.000Z
description: "文章浏览阅读192次。本文介绍了JavaEE5规范中引入的@PostConstruct和@PreDestroy注解，详细解释了它们在Servlet生命周期中的作用及使用方式，并通过一个具体的Servlet实例展示了这些注解的应用。"
tags: []
draft: false
---

从Java EE5规范开始，Servlet增加了两个影响Servlet生命周期的注解（Annotation）：@PostConstruct和@PreConstruct。这两个注解被用来修饰一个非静态的void()方法.而且这个方法不能有抛出异常声明。

使用方式，例如：

![复制代码](/assets/88944775_0.gif)

![复制代码](/assets/88944775_1.gif)
[code] 
    1     @PostConstruct                                 //方式1
    2     public void someMethod(){
    3         ...
    4     }
    5 
    6     public @PostConstruct void someMethod(){        //方式2
    7         ...  
    8     }
[/code]

![复制代码](/assets/88944775_2.gif)

![复制代码](/assets/88944775_3.gif)

1.@PostConstruct说明

被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器调用一次，类似于Serclet的inti()方法。被@PostConstruct修饰的方法会在构造函数之后，init()方法之前运行。

2.@PreConstruct说明

被@PreConstruct修饰的方法会在服务器卸载Servlet的时候运行，并且只会被服务器调用一次，类似于Servlet的destroy()方法。被@PreConstruct修饰的方法会在destroy()方法之后运行，在Servlet被彻底卸载之前。（详见下面的程序实践）

3.程序实践

web.xml

![复制代码](/assets/88944775_4.gif)

![复制代码](/assets/88944775_5.gif)
[code] 
    1 <!-- @PostConstruct和@PreDestroy注解 -->
    2   <servlet>
    3     <servlet-name>AnnotationServlet</servlet-name>
    4     <servlet-class>com.servlet.AnnotationServlet</servlet-class>
    5   </servlet>
    6 <servlet-mapping>
    7     <servlet-name>AnnotationServlet</servlet-name>
    8     <url-pattern>/servlet/AnnotationServlet</url-pattern>
    9   </servlet-mapping>
[/code]

![复制代码](/assets/88944775_6.gif)

![复制代码](/assets/88944775_7.gif)
[code] 
    AnnotationServlet
[/code]

![复制代码](/assets/88944775_8.gif)

![复制代码](/assets/88944775_9.gif)
[code] 
     1 package com.servlet;
     2 
     3 import java.io.IOException;
     4 import java.io.PrintWriter;
     5 import java.sql.Time;
     6 import java.text.SimpleDateFormat;
     7 import java.util.Date;
     8 
     9 import javax.annotation.PostConstruct;
    10 import javax.annotation.PreDestroy;
    11 import javax.servlet.ServletException;
    12 import javax.servlet.http.HttpServlet;
    13 import javax.servlet.http.HttpServletRequest;
    14 import javax.servlet.http.HttpServletResponse;
    15 
    16 public class AnnotationServlet extends HttpServlet {
    17     SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss.SSS");//设置日期格式,精确到毫秒
    18     
    19     public AnnotationServlet(){
    20         System.out.println("时间："+df.format(new Date())+"执行构造函数...");
    21     }
    22     
    23     public void destroy() {
    24         this.log("时间："+df.format(new Date())+"执行destroy()方法...");
    25         //super.destroy(); // Just puts "destroy" string in log
    26         // Put your code here
    27     }
    28 
    29     @PostConstruct
    30     public void someMethod(){
    31         //this.log("执行@PostConstruct修饰的someMethod()方法...");//注意：这样会出错
    32         System.out.println("时间："+df.format(new Date())+"执行@PostConstruct修饰的someMethod()方法...");
    33     }
    34     
    35     @PreDestroy
    36     public void otherMethod(){
    37         System.out.println("时间："+df.format(new Date())+"执行@PreDestroy修饰的otherMethod()方法...");
    38     }
    39     
    40     public void doGet(HttpServletRequest request, HttpServletResponse response)
    41             throws ServletException, IOException {
    42         this.log("时间："+df.format(new Date())+"执行doGet()方法...");
    43     }
    44 
    45     public void init() throws ServletException {
    46         // Put your code here
    47         this.log("时间："+df.format(new Date())+"执行init()方法...");
    48     }
    49     
    50     protected void service(HttpServletRequest request, HttpServletResponse response)
    51                throws ServletException, IOException{
    52         this.log("时间："+df.format(new Date())+"执行service()方法...");
    53         super.service(request, response);
    54     }
    55 
    56 }
[/code]

![复制代码](/assets/88944775_10.gif)

![复制代码](/assets/88944775_11.gif)

运行结果：

![](/assets/88944775_12.png)

4.注意事项

注解多少会影响服务器的启动速度。服务器在启动的时候，会遍历Web应用的WEB-INF/classes下的所有class文件与WEB-INF/lib下的所有jar文件，以检查哪些类使用了注解。如果程序中没有使用任何注解，可以在web.xml中设置<web-app>的metadatacomplete属性为true来关掉服务器启动时的例行检查。

![](/assets/88944775_13.png)

支持注解的服务器需要支持到Servlet2.5及以上规范，所以Tomcat要6.0.X及以上版本才行。

转载：<https://www.cnblogs.com/YuyuanNo1/p/8184003.html>
