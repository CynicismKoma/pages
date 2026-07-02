---
title: "JavaScript中let 和 const有何区别，如何使用？"
pubDatetime: 2020-03-10T13:25:08.000Z
description: "文章浏览阅读363次。本文深入解析JavaScript中let和const的用法，探讨变量作用域、初始化特性及值的可变性，对比var，帮助读者掌握现代JS编程的关键概念。"
tags: []
draft: false
---
let 声明的变量只在 let 命令所在的代码块内有效。

const 声明一个只读的常量，一旦声明，常量的值就不能改变。
[code] 
    { 
        var x = 2; 
    }
    // 这里可以使用 x 变量
[/code]

证明了var是全局变量。
[code] 
    { 
        let x = 2;
    }
    // 这里不能使用 x 变量
[/code]

证明了let是局部变量。

### const 关键字

const 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改：
[code] 
    const PI = 3.141592653589793;
    PI = 3.14;      // 报错
    PI = PI + 10;   // 报错
[/code]

`const`定义常量与使用`let` 定义的变量相似：

  * 二者都是块级作用域
  * 都不能和它所在作用域内的其他变量或函数拥有相同的名称

两者还有以下两点区别：

  * `const`声明的常量必须初始化，而`let`声明的变量不用
  * const 定义常量的值不能通过再赋值修改，也不能再次声明。而 let 定义的变量值可以修改。

#### 理解上const与java中的final可类似，而let与var区别就是let是局部变量，var是全局变量。
