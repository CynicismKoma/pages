---
title: "postgreSQL函数UUID"
pubDatetime: 2019-07-03T09:36:50.000Z
description: "文章浏览阅读693次。本文详细介绍了一个使用PostgreSQL的PL/pgSQL语言创建的UUID生成函数。该函数通过结合MAC地址和当前时间戳，利用MD5算法生成唯一标识符，确保了在分布式系统中生成的UUID的唯一性。"
tags: []
draft: false
---
CREATE OR REPLACE FUNCTION uuid()  
RETURNS text AS  
$$  
declare  
str1 text;  
str2 text;  
Mac text;

begin  
\-- MAC地址

Mac='aa:aa:aa:aa:aa:aa';  
str1 := md5(MAC || now());  
str2 := SUBSTRING(str1, 1,8)||'-'|| SUBSTRING(str1,9,4) ||'-'|| SUBSTRING(str1,13,4) ||'-'|| SUBSTRING(str1,17,4) ||'-'|| SUBSTRING(str1,21,12);  
RETURN cast(str2 as varchar(36));  
end;  
$$  
LANGUAGE 'plpgsql' VOLATILE;
