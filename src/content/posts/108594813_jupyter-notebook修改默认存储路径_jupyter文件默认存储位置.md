---
title: "Jupyter notebook修改默认存储路径_jupyter文件默认存储位置"
pubDatetime: 2020-09-15T10:34:28
description: "1、文件默认存储路径怎么查？ 安装Anaconda后，新建文件的默认存储路径一般在C系统盘，那么路径是什么呢？ 首先，新建一个.ipynb文件， 输入以下脚本，运行出的结果即是当前jupyter文件默认保存路径 import os print ( os . path .abspath( '.' )) AI写代码 2、 文件默认存储路径怎么改？ 第一步：找到配置文件 菜单中打开Anaconda Pr"
tags: []
draft: false
---
**1、文件默认存储路径怎么查？**

  * 安装Anaconda后，新建文件的默认存储路径一般在C系统盘，那么路径是什么呢？
  * 首先，新建一个.ipynb文件，

![](https://i-blog.csdnimg.cn/blog_migrate/0a702612a5e881eb695b49f03da73ff2.png)

  * 输入以下脚本，运行出的结果即是当前jupyter文件默认保存路径

      
      1. import os
      
        2. print(os.path.abspath('.'))
    
    
    
    
    AI写代码

![](https://i-blog.csdnimg.cn/blog_migrate/c8bda75aa8b5efc5d361caca3f3a3e54.png)

**2、 文件默认存储路径怎么改？**

  * 第一步：找到配置文件 
    * 菜单中打开Anaconda Prompt
    * 输入命令 **jupyter notebook --generate-config**
    * 根据上面运行处的路径打开C:\Users\HS\\.jupyter\jupyter_notebook_config.py文件
  * 第二步：更改配置 
    * 找到 **#c.NotebookApp.notebook_dir = ''** ，去掉该行前面的“#”；在打算存放文件的位置先新建一个文件夹（很重要，最好是英文的），然后将新的路径设置在单引号中，保存配置文件
    * 在开始菜单找到“Jupyte Notebook”快捷键，鼠标右击 -- 更多 -- 打开文件位置
    * 找到对应的“Jupyte Notebook”快捷图标，鼠标右击 -- 属性 -- 目标，去掉后面的 "%USERPROFILE%/"（很重要），然后点击“应用”，“确定” 
    * 重新启动Jupyte Notebook即可

![](https://i-blog.csdnimg.cn/blog_migrate/2253eacc3b36605c3059a31844d4dbd4.png)![](https://i-blog.csdnimg.cn/blog_migrate/2253eacc3b36605c3059a31844d4dbd4.png)

![](https://i-blog.csdnimg.cn/blog_migrate/9f3b5c70ad183a346bcecf8ae301c423.png)

![](https://i-blog.csdnimg.cn/blog_migrate/0342f2bdcec16c0377dc46bd066a6683.png)