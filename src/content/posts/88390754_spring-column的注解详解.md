---
title: "Spring @Column的注解详解"
pubDatetime: 2019-03-11T11:32:56.000Z
description: "文章浏览阅读499次。本文详细解析了JPA中@Column注解的使用方法及其属性，包括name、unique、nullable、insertable、updatable、columnDefinition、table、length、precision和scale。并通过实例展示了如何在实体类中应用这些属性，以实现对数据库字段的精确映射。"
tags: []
draft: false
---
转自：<https://www.cnblogs.com/PacinoY/p/7485304.html>

写的挺到位，特转载以便以后查看

就像@Table注解用来标识实体类与数据表的对应关系类似，@Column注解来标识实体类中属性与数据表中字段的对应关系。

该注解的定义如下：

@Target({METHOD, FIELD}) @Retention(RUNTIME)   
public @interface Column {   
String name() default "";   
boolean unique() default false;   
boolean nullable() default true;   
boolean insertable() default true;   
boolean updatable() default true;   
String columnDefinition() default "";   
String table() default "";   
int length() default 255;   
int precision() default 0;   
int scale() default 0;   
}

从定义可以看出，@Column注解一共有10个属性，这10个属性均为可选属性，各属性含义分别如下：

**name**  
name属性定义了被标注字段在数据库表中所对应字段的名称；

**unique**  
unique属性表示该字段是否为唯一标识，默认为false。如果表中有一个字段需要唯一标识，则既可以使用该标记，也可以使用@Table标记中的@UniqueConstraint。

**nullable**  
nullable属性表示该字段是否可以为null值，默认为true。

**insertable**  
insertable属性表示在使用“INSERT”脚本插入数据时，是否需要插入该字段的值。

**updatable**  
updatable属性表示在使用“UPDATE”脚本插入数据时，是否需要更新该字段的值。insertable和updatable属性一般多用于只读的属性，例如主键和外键等。这些字段的值通常是自动生成的。

**columnDefinition**  
columnDefinition属性表示创建表时，该字段创建的SQL语句，一般用于通过Entity生成表定义时使用。（也就是说，如果DB中表已经建好，该属性没有必要使用。）

**table**  
table属性定义了包含当前字段的表名。

**length**  
length属性表示字段的长度，当字段的类型为varchar时，该属性才有效，默认为255个字符。

**precision和scale**  
precision属性和scale属性表示精度，当字段类型为double时，precision表示数值的总长度，scale表示小数点所占的位数。

API文档地址： <http://docs.oracle.com/javaee/5/api/javax/persistence/Column.html>

在使用此@Column标记时，需要注意以下几个问题：

此标记可以标注在getter方法或属性前，例如以下的两种标注方法都是正确的：

标注在属性前：

import javax.persistence.Column;   
import javax.persistence.Entity;   
import javax.persistence.Table;   
  
@Entity   
@Table(name = "contact")   
public class ContactEO {   
  
@Column(name = " contact_name ")   
private String name;   
  
public String getName() {   
return name;   
}   
  
public void setName(String name) {   
this.name = name;   
}   
}

标注在getter方法前：

import javax.persistence.Column;   
import javax.persistence.Entity;   
import javax.persistence.Table;   
  
@Entity   
@Table(name = "contact")   
public class ContactEO {   
private String name;   
  
@Column(name = " contact_name ")   
public String getName() {   
return name;   
}   
  
public void setName(String name) {   
this.name = name;   
}   
}

提示：JPA规范中并没有明确指定那种标注方法，只要两种标注方式任选其一都可以。这根据个人的喜好来选择，笔者习惯使用第二种方法。

下面举几个小例子：

示例一：指定字段“contact_name”的长度是“512”，并且值不能为null。

private String name;   
@Column(name="contact_name",nullable=false,length=512)   
  
public String getName() {   
return name;   
}

创建的SQL语句如下所示。

CREATE TABLE contact (   
id integer not null,   
contact_name varchar (512) not null,   
primary key (id)   
)

示例二：指定字段“monthly_income”月收入的类型为double型，精度为12位，小数点位数为2位。

private BigDecimal monthlyIncome;   
@Column(name="monthly_income",precision=12, scale=2)   
public BigDecimal getMonthlyIncome() {   
return monthlyIncome;   
}

创建的SQL语句如下所示。

CREATE TABLE contact (   
id integer not null,   
monthly_income double(12,2),   
primary key (id)   
)

示例三：自定义生成CLOB类型字段的SQL语句。

private String name;   
@Column(name=" contact_name ",columnDefinition="clob not null")   
public String getName() {   
return name;   
}

生成表的定义SQL语句如下所示。

CREATE TABLE contact (   
id integer not null,   
contact_name clob (200) not null,   
primary key (id)   
)

其中，加粗的部分为columnDefinition属性设置的值。若不指定该属性，通常使用默认的类型建表，若此时需要自定义建表的类型时，可在该属性中设置。

提示：通过Entity定义生成表，还是通过表配置Entity，这是两种不同的ORM策略。

示例四：字段值为只读的，不允许插入和修改。通常用于主键和外键。

private Integer id;   
  
@Column(name="id",insertable=false,updatable=false)   
public Integer getId() {   
return id;   
}
