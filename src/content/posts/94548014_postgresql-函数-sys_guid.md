---
title: "postgresql 函数 sys_guid()"
pubDatetime: 2019-07-03T09:34:47.000Z
description: "文章浏览阅读5k次。本文介绍了一个在PostgreSQL中创建的sys_guid函数，该函数通过组合客户端地址、服务器时间、服务器地址和客户端端口的MD5散列来生成一个全局唯一标识符（GUID）。此函数使用PL/pgSQL语言编写，返回一个VARCHAR类型的GUID。"
tags: []
draft: false
---
CREATE or REPLACE FUNCTION "sys_guid"()   
RETURNS "pg_catalog"."varchar" AS   
$BODY$   
DECLARE   
v_seed_value varchar(32);   
BEGIN   
select   
md5(   
inet_client_addr()::varchar ||   
timeofday() ||   
inet_server_addr()::varchar ||   
to_hex(inet_client_port())   
)   
into v_seed_value;   
  
  
return (substr(v_seed_value,1,8) ||   
substr(v_seed_value,9,4) ||   
substr(v_seed_value,13,4) ||   
substr(v_seed_value,17,4) ||   
substr(v_seed_value,21,12));   
END;   
$BODY$   
LANGUAGE ‘plpgsql‘ VOLATILE SECURITY DEFINER;
