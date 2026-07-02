---
title: "PostgreSQL中function中实现类似Oracle的execute immediate的功能"
pubDatetime: 2019-07-03T09:41:36.000Z
description: "文章浏览阅读2.2k次。本文详细介绍了在PostgreSQL中如何通过函数实现类似于Oracle的execute immediate和dbms_output.put_line功能，包括如何在函数中使用pg_sleep实现延时，以及使用RAISE NOTICE进行消息输出。"
tags: []
draft: false
---
PostgreSQL中function中实现类似Oracle的execute immediate和dbms_output_putline的功能  
  
  
  
首先需要说明的是，PostgreSQL中没有像Oracle那样的procedure，只有function。如果在PostgreSQL提到了“过程”，其实指的是function，还有pg_proc系统表，里面也是function信息。  
  
在psql命令行中，直接执行 select pg_sleep(5); 就能实现睡眠5秒的功能，但是如何在function中也实现同样的效果呢？  
使用类似Oracle的写法全部不行。下面是正确的代码：  
  
CREATE OR REPLACE FUNCTION f_test()  
RETURNS integer AS  
$$  
DECLARE  
c_test_main CURSOR FOR SELECT id FROM t;  
v_id INT;  
BEGIN  
OPEN c_test_main;  
FETCH c_test_main INTO v_id;  
  
while found loop  
select pg_sleep(5); --编译不报错，执行报错  
select pg_sleep(5) into v_id; --编译不报错，执行报错  
\--perform 'select pg_sleep(5)'; --编译不报错，执行不报错，但不会sleep 5秒  
\--perform 'pg_sleep(5)'; --编译不报错，执行不报错，但不会sleep 5秒  
perform pg_sleep(5);  
RAISE NOTICE '5 seconds elapsed !';  
FETCH c_test_main INTO v_id;  
end loop;  
  
CLOSE c_test_main;  
return 0;  
END;  
$$  
LANGUAGE plpgsql;  
  
从上面的代码可以知道，想执行psql中的命令，使用 perform cmd; 即可，不需要像Oracle那样在execute immediate之后给命令加上引号；输出消息的话，使用RAISE NOTICE 'msg'。

转载自：<http://blog.chinaunix.net/uid-26600678-id-3928907.html>
