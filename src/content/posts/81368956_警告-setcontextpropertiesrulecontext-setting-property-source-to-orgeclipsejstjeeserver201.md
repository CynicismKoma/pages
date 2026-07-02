---
title: "警告: [SetContextPropertiesRule]{Context} Setting property 'source' to 'org.eclipse.jst.jee.server:201"
pubDatetime: 2018-08-02T22:38:41.000Z
description: "文章浏览阅读1.9k次。本文分享了在Eclipse中优化Tomcat部署速度的方法，并解决了因重复Context元素导致的警告问题。"
tags: []
draft: false
---

当我以前eclipse里跑tomcat的时候5,6s；后来重装了系统之后他就变成了30s左右...

百度寻来寻去说是让我remove掉之后再改配置文件之后删除backup,但我删了之后肯定还得运行项目啊，我添加进去之后tomcat一运行，这些鬼又继续出现了。

所以后来我发现了，在tomcat工程下面的webapps里又多余的一些文件夹，其实只需要留下root就好了，其他的拷贝出来或者删除随意...

之后重启有15s左右

然后发现了这个错误

警告: [SetContextPropertiesRule]{Context} Setting property 'source' to 'org.eclipse.jst.jee.server:201

查来查去说什么删除context，我找来找去我就一个。。。

后来才发现是这样的。。。

在eclipse配置好的tomcat服务器上双击，打开tomcat服务器的配置界面。按如下操作配置服务器：在Server Options勾上的选项，会在你部署web项目20160928

![](/assets/81368956_0.png)

服务器会在tomcat根目录\conf\Catalina\localhost下自动创建的.xml的单应用配置文件，该文件定义如下：

![](/assets/81368956_1.png)

我们知道，eclipse下配置好tomcat服务器后，会自动创建一个Servers工程，打开Servers工程的config目录会看到一系列配置文件如下：

![](/assets/81368956_2.png)

而Tomcat服务器的config目录下也有一系列配置文件如下：

![](/assets/81368956_3.png)

但是当我们部署web应用时，配置信息会写在Servers工程的confi文件下的配置文件中，而不会写在tomcat的conf文件夹下的配置文件中，这些配置文件在eclipse的workspace文件夹的Server工程文件夹下：

![](/assets/81368956_4.png)

打开Servers工程下的server.xml，会发现，每部署一个web应用到tomcat服务器上就会产生一个描述单web应用配置信息的<Context>标签：

![](/assets/81368956_5.png)

至此，我们发现有两处会产生部署web应用的<Context>配置信息，

一处在tomcat根目录\conf\Catalina\localhost下自动创建的.xml的单应用配置文件，

另一处在Servers工程下的server.xml文件，tomcat服务器启动，当其加载一个web应用时，会先去Servers工程下的server.xml文件寻找<Context>元素，再查找conf\Catalina\localhost下的.xml文件的<Context>元素，那么就会因为出现重复的Context元素而报警告。

**解决办法：** 不影响程序运行，可以不用管
