---
title: "oracle向PostgreSQL迁移"
pubDatetime: 2019-07-03T09:23:35.000Z
description: "文章浏览阅读2.7k次。本文详细对比了PostgreSQL与Oracle数据库在语法、功能及数据类型上的差异，包括伪视图、序列、字符串处理、类型转换、外连接、分页、函数使用等方面，为跨数据库迁移提供了实用指南。"
tags: []
draft: false
---
1\. postgreSQL 没有dual  
例子：  
oracle : select sysdate from dual;  
postgreSQL: select current_timestamp;  
  
为保证程序兼容性，可创建伪视图（view ）替代：  
  
CREATE OR REPLACE VIEW dual AS  
SELECT NULL::"unknown"  
WHERE 1 = 1;  
ALTER TABLE dual OWNER TO postgres;  
GRANT ALL ON TABLE dual TO postgres;  
GRANT SELECT ON TABLE dual TO public;  
必须授权public 以select 权限  
  
2\. sequence  
创建和oracle一样，不需要修改创建语句。  
例子：create sequence seq_test_1 INCREMENT by 1 MINVALUE 1 NO MAXVALUE start with 1 ; --NO MAXVALUE在oracle不支持  
使用有区别：  
1）查看序列 next 值  
select nextval('seq_test_1');  
2）查看序列最近使用值  
select currval('seq_test_1');  
3）序列重置  
方式一  
select setval('seq_test_1',100);  
  
select currval('seq_test_1');  
currval  
\---------  
100  
(1 row)  
select nextval('seq_test_1');  
nextval  
\---------  
101  
(1 row)  
方式二  
alter sequence seq_test_1 restart with 200; --注意这个不会修改 currval 的值  
select nextval('seq_test_1');  
nextval  
\---------  
200  
(1 row)  
另：postgreSQL支持使用以下语句查看序列属性  
select * from seq_test_1;  
  
3\. postgreSQL 中的||用法与其他数据库不同：  
select a||b from table1;  
当a或b其中一个为null时，该查询返回null。  
如果不希望要这个结果，可以使用COALESCE函数：  
select COALESCE(a,'')||COALESCE(b,'') from table1;  
  
4\. postgreSQL 一个类型转换声明一个从一种数据类型到另外一种数据类型的转换。  
  
CAST ( expression AS type )  
expression::type  
CAST语法遵循 SQL 标准；::语法是PostgreSQL历史用法。  
  
5\. COALESCE (expression_1, expression_2, ...,expression_n)  
依次参考各参数表达式，遇到非null值即停止并返回该值。如果所有的表达式都是空值，最终将返回一个空值。  
可以替换oracle中的nvl函数。  
  
6\. oracle中的MINUS 用 EXCEPT来替代  
  
7\. postgreSQL 在FROM子条件中字段须有列名，解决方法用AS 别名  
  
8\. 关于''  
oracle postgreSQL  
SELECT LENGTH('') AS VALUE1 FROM DUAL SELECT LENGTH('') AS VALUE1  
[Result]VALUE1=NULL [Result]VALUE1=0  
  
SELECT TO_DATE('','YYYYMMDD') AS VALUE2 SELECT TO_DATE('','YYYYMMDD') AS VALUE2  
FROM DUAL  
[Result]VALUE2=NULL [Result]VALUE2=0001-01-01 BC  
  
SELECT TO_NUMBER('',1) AS VALUE3 FROM DUAL SELECT TO_NUMBER('',1) AS VALUE3  
[Result]VALUE3=NULL [Result]不能执行  
  
INSERT INTO TEST(VALUE4)VALUES('') INSERT INTO TEST(VALUE4)VALUES('')  
[Result]VALUE4=NULL (注：VALUE4字段为数值类型) [Result]VALUE4=0 (注：VALUE4字段为数值类型)  
  
INSERT INTO TEST(VALUE5)VALUES('') INSERT INTO TEST(VALUE5)VALUES('')  
[Result]VALUE5=NULL (注：VALUE5字段为字符类型) [Result]VALUE5='' (注：VALUE5字段为字符类型,结果为长度为零的字符串)  
  
INSERT INTO TEST(VALUE6)VALUES(TO_DATE('','YYYYMMDD')) INSERT INTO TEST(VALUE6)VALUES(TO_DATE('','YYYYMMDD'))  
[Result]VALUE6=NULL (注：VALUE6字段为时间类型) [Result]VALUE6=0001-01-01 BC (注：VALUE7字段为时间类型)  
  
9\. 常用字符串函数  
函数 返回类型 描述 示例 结果  
substring(string [from int] [for int]) text 截取子字符串 substring('Thomas' from 2 for 3) hom  
substr(string, from [, count]) text 抽取子字符串。和substring(string from from for count))一样 substr('alphabet', 3, 2) ph  
trim([leading | trailing | both] [characters] from string) text 从字符串string的开头/结尾/两边删除只包含 characters中字符 (缺省是空白)的最长的字符串 trim(both 'x' from 'xTomxx') Tom  
  
10\. 聚集函数  
avg、count、max、min、sum用法一样。  
to_number to_char具体转换模式可能会有区别。  
  
11\. 关联查询  
  
ORACLE:  
  
简单外连接：  
SELECT COUNT(DISTINCT(A.COL1)) AS RCOUNT FROM  
SCHEMA.PREFIX_TABLE1 A,SCHEMA.PREFIX_TABLE2 B  
WHERE 1 = 1  
AND A.COL2 = B.COL2(+)  
AND A.COL3 > 0  
AND A.COL4 = '1'  
  
复杂外连接：  
SELECT COUNT(DISTINCT(A.COL1)) AS RCOUNT FROM  
SCHEMA.PREFIX_TABLE1 A,SCHEMA.PREFIX_TABLE2 B,SCHEMA.PREFIX_TABLE3 C,SCHEMA.PREFIX_TABLE4 D  
WHERE 1 = 1  
AND A.COL2 = B.COL2  
AND A.COL3 = C.COL3(+)  
AND A.COL4 = D.COL4(+)  
AND A.COL5 > 0  
AND A.COL6 = '1'  
  
  
postgreSQL:  
  
简单外连接：  
select count(distinct(a.col1)) as rcount from  
schema.prefix_table1 a left outer join schema.prefix_table2 b on (a.col2 = b.col2)  
where 1 = 1  
and a.col3 > 0  
and a.col4 = '1'  
  
复杂外连接：  
select count(distinct(a.col1)) as rcount from  
schema.prefix_table1 a inner join schema.prefix_table2 b on (a.col2 = b.col2)  
left outer join schema.prefix_table3 c on (a.col3 = c.col3)  
left outer join schema.prefix_table4 d on (a.col4 = d.col4)  
where 1 = 1  
and a.col5 > 0  
and a.col6 = '1'  
  
12\. PostgresQL 中子查询较为规范，子查询结果集必须拥有alias  
  
ORACLE:  
SELECT * FROM (  
SELECT * FROM (  
SELECT * FROM SCHEMA.PREFIX_TABLE ORDER BY COL1  
) WHERE X=1 ORDER BY COL2  
) WHERE Y=2 ORDER BY COL3  
  
postgreSQL:  
  
SELECT * FROM (  
SELECT * FROM (  
SELECT * FROM SCHEMA.PREFIX_TABLE ORDER BY COL1 ALIAS1  
) WHERE X=1 ORDER BY COL2 ALIAS2  
) WHERE Y=2 ORDER BY COL3  
  
13\. rownum  
PostgresQL 中没有rownum ，无法 使用where rownum < = X 的方法进行分页，取而代之的是limit X ，offset Y 方法, 而ORACLE 中不允许使用LIMIT X 的 方法  
ORACLE:  
  
SELECT * FROM ( SELECT * FROM (SELECT * FROM SCHEMA.PREFIX_TABLE1 ORDER BY COL1 DESC,COL2 ASC) where ROWNUM <= 50 ORDER BY COL3 ASC,COL4 DESC)  
WHERE ROWNUM <= 20 ORDER BY COL5 DESC,COL6 ASC;  
  
postgreSQL:  
  
select * from ( select * from (SELECT * FROM SCHEMA.PREFIX_TABLE1 ORDER BY COL1 DESC,COL2 ASC) selb order by col3 asc,col4 desc limit 50 ) sela  
order by col5 desc,col6 asc limit 20;  
  
\-- 注意！！limit 必须用于order by 之后  
  
\-- 例：取1 到50 条数据  
  
select * from VOIP_FEE_RATE temp offset 0 limit 50  
  
附加上 LIMIT和OFFSET 子句之后，你就可以检索原来查询语句查询出来的结果中的一部分数据行：  
  
SELECT select_list  
FROM table_expression  
[LIMIT { number | ALL }] [OFFSET number]  
  
如果给出了一个限制计数，那么返回不超过那么多的行。 （但可能更少些，因为查询本身可能生成的行数就比较少。） LIMIT ALL和省略 LIMIT子句一样。  
  
OFFSET说明在开始返回行之前忽略多少行。 OFFSET 0和省略OFFSET子句是一样的。 如果OFFSET和LIMIT都出现了， 那么在计算LIMIT个行之前忽略OFFSET行。  
  
如果使用LIMIT，那么用ORDER BY 子句把结果行约束成一个唯一的顺序是一个好主意。 否则你就会拿到一个不可预料的该查询的行的子集。 — 你要的可能是第十到二十行，但以什么顺序的十到二十？ 除非你声明了ORDER BY，否则顺序是不知道的。  
  
查询优化器在生成查询规划的时候会考虑LIMIT，因此如果你给 LIMIT和OFFSET不同的东西，那么你很可能收到不同的规划（产生不同的行顺序）。 因此，使用不同的LIMIT/OFFSET值选择不同的查询结果的子集将生成不一致的结果， 除非你用ORDER BY强制一个可预料的顺序。这可不是臭虫； 这是一个很自然的结果，因为 SQL 没有许诺把查询的结果按照任何特定的顺序发出，除非用了ORDER BY来约束顺序。  
  
OFFSET 子句忽略的行仍然需要在服务器内部计算；因此，一个很大的 OFFSET 可能还是不够有效率的。   
  
14\. postgreSQL 没有DECODE函数  
Oracle：  
SELECT DECODE(ENDFLAG,'1','A','B') ENDFLAGFROM TEST  
postgreSQL：  
SELECT (CASE ENDFLAG WHEN '1' THEN 'A'ELSE 'B' END) AS ENDFLAG FROM TEST  
  
15\. 当前日期/时间  
PostgreSQL提供许多返回当前日期和时间的函数。 这些符合 SQL 标准的函数全部都按照当前事务的开始时刻返回结果：  
  
CURRENT_DATE  
CURRENT_TIME  
CURRENT_TIMESTAMP  
CURRENT_TIME(precision)  
CURRENT_TIMESTAMP(precision)  
LOCALTIME  
LOCALTIMESTAMP  
LOCALTIME(precision)  
LOCALTIMESTAMP(precision)  
  
CURRENT_TIME和CURRENT_TIMESTAMP 返回带有时区的值；LOCALTIME和LOCALTIMESTAMP 返回不带时区的值。  
  
CURRENT_TIME,CURRENT_TIMESTAMP, LOCALTIME,LOCALTIMESTAMP 可以有选择地获取一个精度参数，  
该精度导致结果的秒数域园整到指定小数位。 如果没有精度参数，将给予所能得到的全部精度。  
  
一些例子：  
  
SELECT CURRENT_TIME;  
Result: 14:39:53.662522-05  
  
SELECT CURRENT_DATE;  
Result: 2001-12-23  
  
SELECT CURRENT_TIMESTAMP;  
Result: 2001-12-23 14:39:53.662522-05  
  
SELECT CURRENT_TIMESTAMP(2);  
Result: 2001-12-23 14:39:53.66-05  
  
SELECT LOCALTIMESTAMP;  
Result: 2001-12-23 14:39:53.662522  
  
16\. 常见数据类型中两者不同的部分  
  
Oracle数据类型 PostgresQL数据类型  
VARCHAR2 VARCHAR  
CLOB TEXT  
DATE DATE/TIME/TIMESTAMP(DATE仅包含日期、TIME仅包含时间、TIMESTAMP均包含,通常使用DATE)  
NUMBER SMALLINT/INTEGER/BIGINT/NUMERIC/REAL/DOUBLE PRECISION(通常可用NUMERIC)  
BLOB BYTEA  
  
17\. sql语句执行结果，sqlcode判断PostgresQL和Oracle不完全一样  
  
18\. PostgresQL  
当创建游标的事务用COMMIT或ROLLBACK终止之后，每个不可保持的已打开游标都隐含关闭。  
当创建游标的事务通过ROLLBACK退出之后，每个可以保持的游标都将隐含关闭。  
当创建游标的事务成功提交，那么可保持的游标保持打开，直到执行一个明确的CLOSE命令或者客户端断开。 

转载自：<https://blog.csdn.net/sxtobj/article/details/44201589>
