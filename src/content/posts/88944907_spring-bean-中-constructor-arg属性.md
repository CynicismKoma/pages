---
title: "Spring bean 中 constructor-arg属性"
pubDatetime: 2019-04-01T11:51:21.000Z
description: "文章浏览阅读654次。本文详细介绍了Spring框架中如何使用构造函数注入的方式进行依赖注入，包括基本概念、使用方法及XML配置示例，并通过具体代码展示了如何为不同类型的变量设置构造函数参数。"
tags: []
draft: false
---
1、说明

constructor-arg：通过构造函数注入。   
property：通过setter对应的方法注入。

2、constructor-arg的使用示例

(1)、Model代码：
[code] 
     
[/code]

  1. `public class Student {`

  2. `private Integer id;`

  3. `private String name;`

  4. `private List<String> dream;`

  5. `private Map<String, Integer> score;`

  6. `private boolean graduation;`

  7.   8. `public Student() {`

  9.   10. `}`

  11.   12. `public Student(Integer id, String name, List<String> dream,`

  13. `Map<String, Integer> score, boolean graduation) {`

  14. `this.id = id;`

  15. `this.name = name;`

  16. `this.dream = dream;`

  17. `this.score = score;`

  18. `this.graduation = graduation;`

  19. `}`

  20.   21. `@Override`

  22. `public String toString() {`

  23. `return "Student [id=" + id + ", name=" + name + ", dream=" + dream`

  24. `+ ", score=" + score + ", graduation=" + graduation + "]";`

  25. `}`

  26.   27. `}`

(2)、xml配置：
[code] 
     
[/code]

  1. `<bean id="student" class="com.rc.sp.Student">`

  2. `<constructor-arg name="id" value="1"/>`

  3. `<constructor-arg name="name" value="student"/>`

  4. `<constructor-arg name="dream">`

  5. `<list>`

  6. `<value>soldier</value>`

  7. `<value>scientist</value>`

  8. `<value>pilot</value>`

  9. `</list>`

  10. `</constructor-arg>`

  11. `<constructor-arg name="score">`

  12. `<map>`

  13. `<entry key="math" value="90"/>`

  14. `<entry key="english" value="85"/>`

  15. `</map>`

  16. `</constructor-arg>`

  17. `<constructor-arg name="graduation" value="false"/>`

  18. `</bean>`

说明：`<``constructor-arg ``name``=``"id" ``value``=``"1"``/>也可以改成`<``constructor-arg ``index``=``"0" ``value``=``"1"``/>方式；boolean的值既可以用0/1填充，也可以用true/false填充。``

转载至 ： <http://racoguo.blog.51cto.com/2309068/1236379>

我觉得这篇是解释的比较清楚的一篇博客 。

这我还有一个自己的示例：
[code] 
     
[/code]

  1. `<bean id="jedisUtils" class="cms.common.util.JedisUtils" >`

  2. `<constructor-arg type="java.lang.String" value="classpath:application.properties" />`

  3. `</bean>`

  
这里 constructor-arg 其实是可以直接带参数的
[code] 
     
[/code]

  1. `public final class JedisUtils {`

  2. `private JedisPool jedisPool = null;`

  3. `private Map<String, String> config = null;`

  4. `private JedisProxy jedisProxy = null;`

  5.   6. `public JedisUtils(String path){`

  7. `Map<String, String> config = null;`

  8. `try {`

  9. `config = MiscUtils.convertPropertiesFileToMap(path);`

  10. `} catch (Exception e) {`

  11. `}`

  12. `if(config==null){`

  13. `config = new HashMap<String,String>();`

  14. `}`

  15. `this.config=config;`

  16. `}`

  17. `}`

constructor-arg属性通过指定type 类型来调用对应的构造函数，  
这里是通过构造函数来初始化 jedis 对象

调用时 
[code] 
     
[/code]

  1. `@Autowired(required=true)`

  2. `private JedisUtils jedisUtils;`

这主要是实现了通过配置文件注入jedis对象。  


转载：<https://blog.csdn.net/qq_27292113/article/details/78063696>
