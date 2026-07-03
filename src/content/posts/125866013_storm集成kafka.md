---
title: "Storm集成Kafka"
pubDatetime: 2022-07-19T10:05:18
description: "一、整合说明 Storm 官方对 Kafka 的整合分为两个版本，官方说明文档分别如下： Storm Kafka Integration : 主要是针对 0.8.x 版本的 Kafka 提供整合支持； Storm Kafka Integration (0.10.x+) : 包含 Kafka 新版本的 consumer API，主要对 Kafka 0.10.x + 提供整合支持。 这里我服务端安装的"
tags: []
draft: false
---
### 一、整合说明

Storm 官方对 Kafka 的整合分为两个版本，官方说明文档分别如下：

  * [Storm Kafka Integration](<http://storm.apache.org/releases/2.0.0-SNAPSHOT/storm-kafka.html>) : 主要是针对 0.8.x 版本的 Kafka 提供整合支持；
  * [Storm Kafka Integration (0.10.x+)](<>) : 包含 Kafka 新版本的 consumer API，主要对 Kafka 0.10.x + 提供整合支持。

这里我服务端安装的 Kafka 版本为 2.2.0(Released Mar 22, 2019) ，按照官方 0.10.x+ 的整合文档进行整合，不适用于 0.8.x 版本的 Kafka。

### 二、写入数据到Kafka

#### 2.1 项目结构

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/421ed21dd0ba776abeb1619adc59b0e2.png#pic_center)

#### 2.2 项目主要依赖
    
    
    <properties>
        <storm.version>1.2.2</storm.version>
        <kafka.version>2.2.0</kafka.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-core</artifactId>
            <version>${storm.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-kafka-client</artifactId>
            <version>${storm.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.kafka</groupId>
            <artifactId>kafka-clients</artifactId>
            <version>${kafka.version}</version>
        </dependency>
    </dependencies>
    
    
    AI写代码xml
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
        * 7
        * 8
        * 9
        * 10
        * 11
        * 12
        * 13
        * 14
        * 15
        * 16
        * 17
        * 18
        * 19
        * 20
        * 21
        * 22
    
    

#### 2.3 DataSourceSpout
    
    
    /**
     * 产生词频样本的数据源
     */
    public class DataSourceSpout extends BaseRichSpout {
       
       
    
        private List<String> list = Arrays.asList("Spark", "Hadoop", "HBase", "Storm", "Flink", "Hive");
    
        private SpoutOutputCollector spoutOutputCollector;
    
        @Override
        public void open(Map map, TopologyContext topologyContext, SpoutOutputCollector spoutOutputCollector) {
       
       
            this.spoutOutputCollector = spoutOutputCollector;
        }
    
        @Override
        public void nextTuple() {
       
       
            // 模拟产生数据
            String lineData = productData();
            spoutOutputCollector.emit(new Values(lineData))
    
    AI写代码java
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
        * 7
        * 8
        * 9
        * 10
        * 11
        * 12
        * 13
        * 14
        * 15
        * 16
        * 17
        * 18
        * 19
        * 20
        * 21
        * 22
        * 23
        * 24