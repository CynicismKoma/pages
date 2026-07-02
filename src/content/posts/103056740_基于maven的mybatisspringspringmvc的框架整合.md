---
title: "基于maven的Mybatis+spring+springmvc的框架整合"
pubDatetime: 2019-11-13T21:46:04.000Z
description: "文章浏览阅读271次。一、maven下载及配置成功  如不清楚请百度下，maven下载完成需要在conf目录下修改settings配置文件，之后在eclipse导入后进行~二、创建maven项目三、创建成功后，修改运行tomcat环境四、再次勾选Dynamic web module,并 修改content directory五、修改pom.xml，引入依赖<projec..._简述基于maven项"
tags: []
draft: false
---

一、maven下载及配置成功

如不清楚请百度下，maven下载完成需要在conf目录下修改settings配置文件，之后在eclipse导入后进行~

二、创建maven项目

![](/assets/103056740_0.png)

三、创建成功后，修改运行tomcat环境

![](/assets/103056740_1.png)

四、再次勾选Dynamic web module,并 修改content directory

![](/assets/103056740_2.png)

五、修改pom.xml，引入依赖
[code] 
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
    
      <groupId>comXiaomaCarl</groupId>
      <artifactId>shoppingmall</artifactId>
      <version>0.0.1-SNAPSHOT</version>
      <packaging>war</packaging>
    
      <name>shoppingmall</name>
      <url>http://maven.apache.org</url>
    
      <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
       	<spring.version>4.0.2.RELEASE</spring.version>    
       	<mybatis.version>3.2.8</mybatis.version>    
        <slf4j.version>1.7.12</slf4j.version>    
        <log4j.version>1.2.17</log4j.version>
      </properties>
    
      <dependencies>
        <dependency>
    	    <groupId>junit</groupId>
    	    <artifactId>junit</artifactId>
    	    <version>4.11</version>
    	    <scope>test</scope>
        </dependency>
    
        <!-- 1.日志 -->
    		<!-- 实现slf4j接口并整合 -->
    		<dependency>
    			<groupId>ch.qos.logback</groupId>
    			<artifactId>logback-classic</artifactId>
    			<version>1.1.1</version>
    		</dependency>
    
    		<!-- 2.数据库 -->
    		<dependency>
    			<groupId>mysql</groupId>
    			<artifactId>mysql-connector-java</artifactId>
    			<version>5.1.37</version>
    			<scope>runtime</scope>
    		</dependency>
    		<dependency>
    			<groupId>c3p0</groupId>
    			<artifactId>c3p0</artifactId>
    			<version>0.9.1.2</version>
    		</dependency>
    
    		<!-- DAO: MyBatis -->
    		<dependency>
    			<groupId>org.mybatis</groupId>
    			<artifactId>mybatis</artifactId>
    			<version>3.3.0</version>
    		</dependency>
    		<dependency>
    			<groupId>org.mybatis</groupId>
    			<artifactId>mybatis-spring</artifactId>
    			<version>1.2.3</version>
    		</dependency>
    
    		<!-- 3.Servlet web -->
    		<dependency>
    			<groupId>taglibs</groupId>
    			<artifactId>standard</artifactId>
    			<version>1.1.2</version>
    		</dependency>
    		<dependency>
    			<groupId>jstl</groupId>
    			<artifactId>jstl</artifactId>
    			<version>1.2</version>
    		</dependency>
    		<dependency>
    			<groupId>com.fasterxml.jackson.core</groupId>
    			<artifactId>jackson-databind</artifactId>
    			<version>2.5.4</version>
    		</dependency>
    		<dependency>
    			<groupId>javax.servlet</groupId>
    			<artifactId>javax.servlet-api</artifactId>
    			<version>3.1.0</version>
    		</dependency>
    
    		<!-- 4.Spring -->
    		<!-- 1)Spring核心 -->
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-core</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-beans</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-context</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<!-- 2)Spring DAO层 -->
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-jdbc</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-tx</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<!-- 3)Spring web -->
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-web</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-webmvc</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    		<!-- 4)Spring test -->
    		<dependency>
    			<groupId>org.springframework</groupId>
    			<artifactId>spring-test</artifactId>
    			<version>4.1.7.RELEASE</version>
    		</dependency>
    
    		<!-- redis客户端:Jedis -->
    		<dependency>
    			<groupId>redis.clients</groupId>
    			<artifactId>jedis</artifactId>
    			<version>2.7.3</version>
    		</dependency>
    		<dependency>
    			<groupId>com.dyuproject.protostuff</groupId>
    			<artifactId>protostuff-core</artifactId>
    			<version>1.0.8</version>
    		</dependency>
    		<dependency>
    			<groupId>com.dyuproject.protostuff</groupId>
    			<artifactId>protostuff-runtime</artifactId>
    			<version>1.0.8</version>
    		</dependency>
    
    		<!-- Map工具类 -->
    		<dependency>
    			<groupId>commons-collections</groupId>
    			<artifactId>commons-collections</artifactId>
    			<version>3.2</version>
    		</dependency>    
      </dependencies>
      
    	<build>
    		<finalName>shoppingmall</finalName>
    	</build>
    </project>
    
[/code]

六、修改web.xml，添加配置
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns="http://java.sun.com/xml/ns/javaee" 
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" 
    id="WebApp_ID" version="3.0">
      <!-- <display-name>shoppingmall</display-name>
      <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
        <welcome-file>default.html</welcome-file>
        <welcome-file>default.htm</welcome-file>
        <welcome-file>default.jsp</welcome-file>
      </welcome-file-list> -->
      
      <!-- 定义前端控制器 -->
      <servlet>
        <servlet-name>spring-mvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 指定路径 -->
        <!-- 配置springMVC需要加载的配置文件
    		spring-dao.xml,spring-service.xml,spring-web.xml
    		Mybatis - > spring -> springmvc
    	 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/spring-*.xml</param-value>
        </init-param>
        <!-- 随spring启动而启动 -->
        <!-- <load-on-startup>1</load-on-startup> -->
      </servlet>
    
      <servlet-mapping>
        <servlet-name>spring-mvc</servlet-name>
        <url-pattern>/</url-pattern>
      </servlet-mapping>
    </web-app>
[/code]

七、在src/main/resource下创建spring文件夹，里面配置spring-dao，spring-service，spring-web分别对应mybatis，spring和springmvc的配置。其中spring-dao要延伸配置mybatis-config.xml，jdbc.properties数据源。

spring文件夹下spring-dao
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
    	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
    	xsi:schemaLocation="http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context.xsd">
    	<!-- 配置整合mybatis过程 -->
    	<!-- 1.配置数据库相关参数properties的属性：${url} -->
    	<context:property-placeholder location="classpath:jdbc.properties" />
    
    	<!-- 2.数据库连接池 -->
    	<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    		<!-- 配置连接池属性 -->
    		<property name="driverClass" value="${jdbc.driver}" />
    		<property name="jdbcUrl" value="${jdbc.url}" />
    		<property name="user" value="${jdbc.username}" />
    		<property name="password" value="${jdbc.password}" />
    
    		<!-- c3p0连接池的私有属性 -->
    		<property name="maxPoolSize" value="30" />
    		<property name="minPoolSize" value="10" />
    		<!-- 关闭连接后不自动commit -->
    		<property name="autoCommitOnClose" value="false" />
    		<!-- 获取连接超时时间 -->
    		<property name="checkoutTimeout" value="10000" />
    		<!-- 当获取连接失败重试次数 -->
    		<property name="acquireRetryAttempts" value="2" />
    	</bean>
    
    	<!-- 3.配置SqlSessionFactory对象 -->
    	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    		<!-- 注入数据库连接池 -->
    		<property name="dataSource" ref="dataSource" />
    		<!-- 配置MyBaties全局配置文件:mybatis-config.xml -->
    		<property name="configLocation" value="classpath:mybatis-config.xml" />
    		<!-- 扫描entity包 使用别名 -->
    		<property name="typeAliasesPackage" value="com.XiaomaCarl.shoppingmall.bean" />
    		<!-- 扫描sql配置文件:mapper需要的xml文件 -->
    		<property name="mapperLocations" value="classpath:mapper/*.xml" />
    	</bean>
    
    	<!-- 4.配置扫描Dao接口包，动态实现Dao接口，注入到spring容器中 -->
    	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    		<!-- 注入sqlSessionFactory -->
    		<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
    		<!-- 给出需要扫描Dao接口包 -->
    		<property name="basePackage" value="com.XiaomaCarl.shoppingmall.dao" />
    	</bean>
    </beans>
[/code]

spring文件夹下spring-service
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
    	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    	xmlns:context="http://www.springframework.org/schema/context"
    	xmlns:tx="http://www.springframework.org/schema/tx"
    	xsi:schemaLocation="http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context.xsd
    	http://www.springframework.org/schema/tx
    	http://www.springframework.org/schema/tx/spring-tx.xsd">
    	<!-- 扫描service包下所有使用注解的类型 -->
    	<context:component-scan base-package="com.XiaomaCarl.shoppingmall.service" />
    
    	<!-- 配置事务管理器 -->
    	<bean id="transactionManager"
    		class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    		<!-- 注入数据库连接池 -->
    		<property name="dataSource" ref="dataSource" />
    	</bean>
    
    	<!-- 配置基于注解的声明式事务 -->
    	<tx:annotation-driven transaction-manager="transactionManager" />
    </beans>
[/code]

spring文件夹下spring-web
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
    	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    	xmlns:context="http://www.springframework.org/schema/context"
    	xmlns:mvc="http://www.springframework.org/schema/mvc" 
    	xsi:schemaLocation="http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context.xsd
    	http://www.springframework.org/schema/mvc
    	http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">
    	<!-- 配置SpringMVC -->
    	<!-- 1.开启SpringMVC注解模式 -->
    	<!-- 简化配置： 
    		(1)自动注册DefaultAnootationHandlerMapping,AnotationMethodHandlerAdapter 
    		(2)提供一些列：数据绑定，数字和日期的format @NumberFormat, @DateTimeFormat, xml,json默认读写支持 
    	-->
    	<mvc:annotation-driven />
    	
    	<!-- 2.静态资源默认servlet配置
    		(1)加入对静态资源的处理：js,gif,png
    		(2)允许使用"/"做整体映射
    	 -->
    	 <mvc:default-servlet-handler/>
    	 
    	 <!-- 3.配置jsp 显示ViewResolver -->
    	 <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    	 	<property name="viewClass" value="org.springframework.web.servlet.view.JstlView" />
    	 	<property name="prefix" value="/WEB-INF/jsp/" />
    	 	<property name="suffix" value=".jsp" />
    	 </bean>
    	 
    	 <!-- 4.扫描web相关的bean -->
    	 <context:component-scan base-package="com.XiaomaCarl.shoppingmall" />
    </beans>
[/code]

主配置文件目录下，配置mybatis-config.xml
[code] 
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE configuration
      PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
      "http://mybatis.org/dtd/mybatis-3-config.dtd">
    <configuration>
    	<!-- 配置全局属性 -->
    	<settings>
    		<!-- 使用jdbc的getGeneratedKeys获取数据库自增主键值 -->
    		<setting name="useGeneratedKeys" value="true" />
    
    		<!-- 使用列别名替换列名 默认:true -->
    		<setting name="useColumnLabel" value="true" />
    
    		<!-- 开启驼峰命名转换:Table{create_time} -> Entity{createTime} -->
    		<setting name="mapUnderscoreToCamelCase" value="true" />
    	</settings>
    </configuration>
[/code]

主配置文件目录下，配置jdbc.properties
[code] 
    jdbc.driver=com.mysql.jdbc.Driver
    jdbc.url=jdbc:mysql://localhost:3306/shoppingmall?useUnicode=true&characterEncoding=utf8
    jdbc.username=root
    jdbc.password=a
[/code]

主配置文件目录下，配置log4j.properties
[code] 
    log4j.rootLogger=DEBUG, Console
    #Console
    log4j.appender.Console=org.apache.log4j.ConsoleAppender
    log4j.appender.Console.layout=org.apache.log4j.PatternLayout
    log4j.appender.Console.layout.ConversionPattern=%d [%t] %-5p [%c] - %m%n
    log4j.logger.java.sql.ResultSet=INFO
    log4j.logger.org.apache=INFO
    log4j.logger.java.sql.Connection=DEBUG
    log4j.logger.java.sql.Statement=DEBUG
    log4j.logger.java.sql.PreparedStatement=DEBUG
[/code]

主配置文件目录下，创建mapper文件夹，下面创建UserMapper.xml映射文件
[code] 
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="com.XiaomaCarl.shoppingmall.dao.UserDao">
        <select id="findByUsername" parameterType="string" resultType="User">
            SELECT * FROM user WHERE uname=#{uname}
        </select>
    </mapper>
[/code]

八、对应项目进行MVC架构配置，这里只创建实例所创。

bean层创建实体类User.java
[code] 
    package com.XiaomaCarl.shoppingmall.bean;
    
    import org.springframework.stereotype.Component;
    
    public class User {
        //用户id
        private int uid;
        //用户名
        private String uname;
        //密码
        private String password;
        //手机号
        private String phone;
        //送货地址
        private String address;
        //积分
        private int upoint;
        //前台登陆： 1 是正常登陆， 0 为禁止登陆
        private int allow_1;
        //订单管理： 1 可以登陆后台，对订单进行管理， 0 为无此权限
        private int allow_2;
        //录入数据： 1 可以登陆后台，可以对数据做增改查， 0 为此无权限
        private int allow_3;
        //超级管理员： 1 可以删除数据，可以对有管理员权限的用户进行管理， 0 为无此权限
        private int allow_4;
    
        public int getUid() {
            return uid;
        }
    
        public void setUid(int uid) {
            this.uid = uid;
        }
    
        public String getUname() {
            return uname;
        }
    
        public void setUname(String uname) {
            this.uname = uname;
        }
    
        public String getPassword() {
            return password;
        }
    
        public void setPassword(String password) {
            this.password = password;
        }
    
        public String getPhone() {
            return phone;
        }
    
        public void setPhone(String phone) {
            this.phone = phone;
        }
    
        public String getAddress() {
            return address;
        }
    
        public void setAddress(String address) {
            this.address = address;
        }
    
        public int getUpoint() {
            return upoint;
        }
    
        public void setUpoint(int upoint) {
            this.upoint = upoint;
        }
    
        public int getAllow_1() {
            return allow_1;
        }
    
        public void setAllow_1(int allow_1) {
            this.allow_1 = allow_1;
        }
    
        public int getAllow_2() {
            return allow_2;
        }
    
        public void setAllow_2(int allow_2) {
            this.allow_2 = allow_2;
        }
    
        public int getAllow_3() {
            return allow_3;
        }
    
        public void setAllow_3(int allow_3) {
            this.allow_3 = allow_3;
        }
    
        public int getAllow_4() {
            return allow_4;
        }
    
        public void setAllow_4(int allow_4) {
            this.allow_4 = allow_4;
        }
    }
    
[/code]

dao层创建接口UserDao.java
[code] 
    package com.XiaomaCarl.shoppingmall.dao;
    
    import org.springframework.stereotype.Repository;
    
    import com.XiaomaCarl.shoppingmall.bean.User;
    
    import java.util.List;
    
    public interface UserDao {
    	
    	User findByUsername(String username);
    	
    }
[/code]

controller层创建UserController.java
[code] 
    package com.XiaomaCarl.shoppingmall.controller;
    
    import com.XiaomaCarl.shoppingmall.bean.User;
    import com.XiaomaCarl.shoppingmall.dao.UserDao;
    import com.XiaomaCarl.shoppingmall.service.UserService;
    
    import java.util.List;
    
    import javax.annotation.Resource;
    import javax.servlet.http.HttpSession;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.ModelAndView;
    
    @Controller
    @RequestMapping(value = "/user")
    public class UserController {
    
    	@Resource
        private UserDao userDao;
    
        @RequestMapping(value = "/login")
        public String login(HttpSession session, Model model) {
        	User user = userDao.findByUsername("root");
        	model.addAttribute("user",user);
        	return "user";
            
        }
    
    }
    
[/code]

九、在web-inf中添加jsp文件夹，添加user.jsp文件
[code] 
    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>主页</title>
    </head>
    <body>
    <h3>欢迎，${user.uname }</h3>
    </body>
    </html>
[/code]

十、用mysql工具将mysql数据库表创建到mysql数据库中，然后项目右键，maven强制更新一下，然后放入tomcat中运行，若是运行无报错，在浏览器中输入<http://localhost:8080/shoppingmall/user/login>就可以访问了。

mysql数据库的sql语句实在太大了，我资源附近上传吧。

‌愿有人与你共黄昏，有人问你粥可温。
