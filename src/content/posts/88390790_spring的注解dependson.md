---
title: "Spring的注解@DependsOn"
pubDatetime: 2019-03-11T11:35:42.000Z
description: "文章浏览阅读172次。本文深入解析Spring框架中@DependsOn注解的用途与用法，详细阐述如何使用该注解来确保bean的实例化顺序，适用于那些在实例化过程中隐式依赖另一个bean的情况。"
tags: []
draft: false
---
用途  
注解@DependsOn位于如下包

org.springframework.context.annotation  
1  
该注解用于声明当前bean依赖于另外一个bean。所依赖的bean会被容器确保在当前bean实例化之前被实例化。

举例来讲，如果容器通过@DependsOn注解方式定义了bean plant依赖于bean water,那么容器在会确保bean water的实例在实例化bean plant之前完成。

一般用在一个bean没有通过属性或者构造函数参数显式依赖另外一个bean，但实际上会使用到那个bean或者那个bean产生的某些结果的情况。

用法  
直接或者间接标注在带有@Component注解的类上面;  
使用@DependsOn注解到类层面仅仅在使用component scanning方式时才有效;

如果带有@DependsOn注解的类通过XML方式使用，该注解会被忽略，<bean depends-on="..."/>这种方式会生效;

直接或者间接标注在带有@Bean 注解的方法上面;  
用法举例  
注解在@Bean定义方法上  
该例子使用方法方式定义了一个bean entityManager,并指出它依赖于bean transactionManager。虽然bean entityManager实例化过程中没有通过属性或者构造函数参数方式依赖于bean transactionManager，但是其过程中会牵涉到对transactionManager的使用，如果此时transactionManager没有被实例化，entityManager的实例化过程会失败。这就是一种典型的不通过属性或者构造方法参数方式依赖，但是实际上存在依赖的情况，这种情况正是注解@DependsOn的用武之地。

@Bean(name = "entityManager")  
@DependsOn("transactionManager")  
public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws Throwable {   
LocalContainerEntityManagerFactoryBean entityManager =   
new LocalContainerEntityManagerFactoryBean();  
// 省略无关的实现部分  
// ...  
return entityManager;  
}  
  
转自：https://blog.csdn.net/andy_zhang2007/article/details/78859949   

