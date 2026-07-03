---
title: "实时计算框架比较：Storm、SparkStreaming与Flink"
pubDatetime: 2022-07-19T09:43:12
description: "一、Storm 1.1 简介 Storm 是一个开源的分布式实时计算框架，可以以简单、可靠的方式进行大数据流的处理。通常用于实时分析，在线机器学习、持续计算、分布式 RPC、ETL 等场景。Storm 具有以下特点： 支持水平横向扩展； 具有高容错性，通过 ACK 机制每个消息都不丢失； 处理速度非常快，每个节点每秒能处理超过一百万个 tuples ； 易于设置和操作，并可以与任何编程语言一起使用"
tags: []
draft: false
---
### 一、Storm

##### 1.1 简介

Storm 是一个开源的分布式实时计算框架，可以以简单、可靠的方式进行大数据流的处理。通常用于实时分析，在线机器学习、持续计算、分布式 RPC、ETL 等场景。Storm 具有以下特点：

  * 支持水平横向扩展；
  * 具有高容错性，通过 ACK 机制每个消息都不丢失；
  * 处理速度非常快，每个节点每秒能处理超过一百万个 tuples ；
  * 易于设置和操作，并可以与任何编程语言一起使用；
  * 支持本地模式运行，对于开发人员来说非常友好；
  * 支持图形化管理界面。

##### 1.2 Storm 与 Hadoop对比

Hadoop 采用 MapReduce 处理数据，而 MapReduce 主要是对数据进行批处理，这使得 Hadoop 更适合于海量数据离线处理的场景。而 Strom 的设计目标是对数据进行实时计算，这使得其更适合实时数据分析的场景。

##### 1.3 Storm 与 Spark Streaming对比

Spark Streaming 并不是真正意义上的流处理框架。 Spark Streaming 接收实时输入的数据流，并将数据拆分为一系列批次，然后进行微批处理。只不过 Spark Streaming 能够将数据流进行极小粒度的拆分，使得其能够得到接近于流处理的效果，但其本质上还是批处理（或微批处理）。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0048bedab99628f0b9aaf19d1b5de17b.png#pic_center)

##### 1.4 Strom 与 Flink对比

storm 和