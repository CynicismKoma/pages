---
title: "firstChild.nodeValue"
pubDatetime: 2019-07-02T15:13:20.000Z
description: "文章浏览阅读563次。本文详细介绍了在JavaScript中如何正确地从DOM对象中获取title标签及其文本内容的方法，包括跨浏览器兼容性的处理技巧。"
tags: []
draft: false
---

假设我们已经有一个dom对象，其内容如  
内容

在javascript中，我们为了获得title的标签和文本，一般需要这样做  
var title =dom.getElementsByTagName(”title”);  
alert(title[0].nodeName);//得到“title”  
alert(title[0].nodeValue)的时候，FF只能获得#text，而IE只能得到null  
后来查了很多资料，object text类型或者object element，本身也是一个结点  
上例中“标题”不是一个简单的文本内容，而是一个文本结点  
它也有自己的nodeName，只是不该也不会用到  
所以应该写成：  
alert(title[0].firstChild.nodeValue);//得到“标题”

另一方面，反过来想，生成一个文本的时候，也是用create_text_node方法  
还使用了append_child把它添加在一个父结点下  
说明它其实是一个结点，需要多使用一次firstChild 

转载自：<https://blog.csdn.net/bananabear/article/details/1553082>
