---
title: "The requested resource is not available的7种解决方案"
pubDatetime: 2019-04-02 08:35:50.000Z
description: "文章浏览阅读895次。本文提供了一套全面的排查方案来解决HTTP Status 404异常问题，主要从检查Web应用部署状态、URL输入准确性、文件存放位置合规性、web.xml配置等方面入手，并提供了替换大法等额外思路。"
tags: []
draft: false
---

HTTP Status 404(The requested resource is not available)异常主要是路径错误或拼写错误造成的,请按以下步骤逐一排查:

1．未部署Web应用

2．URL输入错误

a.查看URL的IP地址和端口号是否书写正确。 

b.查看上下文路径是否正确 Project--------Properties------MyElipse-----Web----- Web Context-root检查这个路径名称是否书写正确。

c.检查一下文件名称是否书写正确。

3．目录不能被引用

在 Eclipse的“包资源管理器(Package Explorer)”检查文件存放的位置。由于META-INF WEB-INF文件夹下的内容无法对外发布，所以，如果你引用了带这两个目录的文件，肯定是不允许。

例如： http://localhost:8080/guestbook/WEB-INF/index.html就是错误的,文件位置存放错误  
4． Tomcat服务器中web.xml中的问题   
如果你的web应用程序有多个jsp页面的话，当你点击你web应用程序的虚拟根目录时可能会出现404错 误，只是你只需要修改Tomcat服务器中web.xml 
    
    
     

  1. `<init-param>`

  2. `<param-name>listings</param-name>`

  3. `<param-value>false(将其该为true)</param-value>`

  4. `</init-param> `




5．WEB-INF下面必须要有几个固定的文件夹和文件   
web.xml 该web app的配置文件

lib 该web app用到的库文件

classes存放编译好的servlet

请注意他们的名字，不要把classes写成class  
6． 如果要运行的不是.jsp文件，而是servlet（.class）文件，要配置web.xml(当然是WEB-INF下面的)，加上以下字段：
    
    
     

  1. `<servlet>`

  2. `<servlet-name>HelloWorldServlet</servlet-name>`

  3. `<servlet-class>HelloWorldServlet</servlet-class>`

  4. `</servlet>`

  5. `<servlet-mapping>`

  6. `<servlet-name>HelloWorldServlet</servlet-name>`

  7. `<url-pattern>/HelloWorldServlet</url-pattern>`

  8. `</servlet-mapping>`




其中的“HelloWorldServlet”改为你要运行的文件名

7．其他解决思路

以上方法无果,介于"HTTP Status 404(The requested resource is not available"异常发生情况的多样性,采用替换大法:

步骤:

a.找一份正常的相同环境(找同学同事相同开发环境机子或者网上下载的正常demo等)

b.依次替换问题项目文件,进行排除,定位.直到解决.

转载：<https://blog.csdn.net/csdn___lyy/article/details/72801526>