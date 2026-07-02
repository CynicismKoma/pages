---
title: "多线程——继承Thread 类和实现Runnable 接口的区别"
pubDatetime: 2018-08-03T19:10:37.000Z
description: "文章浏览阅读507次。本文探讨Java中实现多线程的两种方法：继承Thread类与实现Runnable接口。通过具体示例展示了这两种方法在资源共享方面的差异，并分析了为何通常推荐使用Runnable接口。"
tags: []
draft: false
---

java中我们想要实现多线程常用的有两种方法，继承Thread 类和实现Runnable 接口，有经验的程序员都会选择实现Runnable接口 ，其主要原因有以下两点：

首先，java只能单继承，因此如果是采用继承Thread的方法，那么在以后进行代码重构的时候可能会遇到问题，因为你无法继承别的类了。

其次，如果一个类继承Thread，则不适合资源共享。但是如果实现了Runable接口的话，则很容易的实现资源共享。

通过下面的实例可以清晰的看出两种方式的区别所在。

## 1.继承Thread 类
[code] 
    
     
[/code]

`package test;`

`/**`

`* 继承thread类`

`* @author hongxin`

`*`

`*/`

`public class testThread extends Thread{`

`private int count=5;`

`private String name;`

`public testThread(String name) {`

`this.name=name;`

`}`

`public void run() {`

`for (int i = 0; i < 5; i++) {`

`System.out.println(name + "运行 count= " + count--);`

`try {`

`sleep((int) Math.random() * 10);`

`} catch (InterruptedException e) {`

`e.printStackTrace();`

`}`

`}`

`}`

`}`
[code] 
    
     
[/code]

`package test;`

`public class main1 {`

`public static void main(String[] args) {`

`testThread mTh1=new testThread("A");`

`testThread mTh2=new testThread("B");`

`mTh1.start();`

`mTh2.start();`

`}`

`}`

### 运行结果

### 代码分析

线程1和线程2之间的变量是不能共享的，每次count--都有各自的变量和结果。

## 2.Runnable 接口
[code] 
    
     
[/code]

`package test;`

`/**`

`* 实现runnable接口`

`* @author hongxin`

`*`

`*/`

`public class testRunnable implements Runnable{`

`private int count=15;`

`@Override`

`public void run() {`

`for (int i = 0; i < 5; i++) {`

`System.out.println(Thread.currentThread().getName() + "运行 count= " + count--);`

`try {`

`Thread.sleep((int) Math.random() * 10);`

`} catch (InterruptedException e) {`

`e.printStackTrace();`

`}`

`}`

`}`

`}`
[code] 
    
     
[/code]

`package test;`

`public class main2 {`

`public static void main(String[] args) {`

`testRunnable mTh = new testRunnable();`

`new Thread(mTh, "C").start();//同一个mTh，但是在Thread中就不可以，如果用同一个实例化对象mt，就会出现异常 `

`new Thread(mTh, "D").start();`

`new Thread(mTh, "E").start();`

`}`

`}`

### 运行结果

### 代码分析

三个不同的线程之间的变量是共享的，每次count--得到的记过都是再上一个线程运行结果之上得到的
