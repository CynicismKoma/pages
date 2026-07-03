---
title: "Storm 核心概念详解_strom详解"
pubDatetime: 2022-07-19T09:46:30
description: "一、Storm核心概念 1.1 Topologies（拓扑） 一个完整的 Storm 流处理程序被称为 Storm topology(拓扑)。它是一个是由 Spouts 和 Bolts 通过 Stream 连接起来的有向无环图，Storm 会保持每个提交到集群的 topology 持续地运行，从而处理源源不断的数据流，直到你将其主动杀死 (kill) 为止。 1.2 Streams（流） Stre"
tags: []
draft: false
---
### 一、Storm核心概念

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2b5283da1e197f8b360209ce8b078b2b.png#pic_center)

#### 1.1 Topologies（拓扑）

一个完整的 Storm 流处理程序被称为 Storm topology(拓扑)。它是一个是由 `Spouts` 和 `Bolts` 通过 `Stream` 连接起来的有向无环图，Storm 会保持每个提交到集群的 topology 持续地运行，从而处理源源不断的数据流，直到你将其主动杀死 (kill) 为止。

#### 1.2 Streams（流）

`Stream` 是 Storm 中的核心概念。一个 `Stream` 是一个无界的、以分布式方式并行创建和处理的 `Tuple` 序列。Tuple 可以包含大多数基本类型以及自定义类型的数据。简单来说，Tuple 就是流数据的实际载体，而 Stream 就是一系列 Tuple。

#### 1.3 Spouts

`Spouts` 是流数据的源头，一个 Spout 可以向不止一个 `Streams` 中发送数据。`Spout` 通常分为**可靠** 和**不可靠** 两种：可靠的 ` Spout` 能够在失败时重新发送 Tuple, 不可靠的 `Spout` 一旦把 Tuple 发送出去就置之不理了。

#### 1.4 Bolts

`Bolts` 是