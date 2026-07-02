---
title: "java中instanceof的用法"
pubDatetime: 2018-09-16T07:31:24.000Z
description: "文章浏览阅读248次。本文详细解析了Java中的instanceof关键字，它是一个用于判断对象是否属于特定类或其子类的二元运算符，返回布尔类型结果。文章介绍了instanceof的语法、参数及其在子父类判断中的应用。"
tags: []
draft: false
---
java 中的instanceof 是一个二元操作符（运算符）运算符，由于是字母组成，所以是Java的保留关键字，但是和>=，<=，==属同一类，它的作用是用来判断，instanceof 左边对象是否为instanceof 右边类的实例，返回一个boolean类型值。还可以用来判断子父类的所属关系。

用法：   
boolean result = object instanceof class   
参数：   
Result：布尔类型。   
Object：必选项。任意对象表达式。   
Class：必选项。任意已定义的对象类。   
说明：   
如果 object 是 class 的一个实例，则 instanceof 运算符返回 true。如果 object 不是指定类的一个实例，或者 object 是 null，则返回 false。
