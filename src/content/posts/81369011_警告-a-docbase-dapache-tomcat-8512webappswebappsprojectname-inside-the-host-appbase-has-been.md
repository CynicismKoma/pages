---
title: '警告: A docBase  D:\apache-tomcat-8.5.12\webapps\webapps\projectname inside the host appBase has been'
pubDatetime: 2018-08-02T22:44:52.000Z
description: "文章浏览阅读4.5k次。本文介绍了解决Tomcat中出现的警告信息的方法，并提供了一些提高Tomcat运行效率的建议。"
tags: []
draft: false
---

[警告: [SetContextPropertiesRule]{Context} Setting property 'source' to 'org.eclipse.jst.jee.server:20160928' did not find a matching property](<https://www.cnblogs.com/TTTTT/p/5917550.html>)

如果爆出上面的错误请看我上篇博客...

警告: A docBase D:\apache-tomcat-8.5.12\webapps\webapps\projectname inside the host appBase has been 这个警告的话看下面

请把Server Options下面的 Serve modules without publishing勾上，就不会出现这个警告了。

我现在的Server Options选的是：

![](/assets/81369011_0.jpeg)

这都是使得tomcat变慢的原因。。

如果这两个都还慢的话，可以去百度tomcat版本 优化 ，会出来很多的...
