---
title: "Storm 集成 Redis 详解_storm redis"
pubDatetime: 2022-07-19T10:08:27
description: "一、简介 Storm-Redis 提供了 Storm 与 Redis 的集成支持，你只需要引入对应的依赖即可使用： < dependency > < groupId > org.apache.storm </ groupId > < artifactId > storm-redis </ artifactId > < version > ${storm.version} </ version > "
tags: []
draft: false
---
### 一、简介

Storm-Redis 提供了 Storm 与 Redis 的集成支持，你只需要引入对应的依赖即可使用：
    
    
    <dependency>
        <groupId>org.apache.storm</groupId>
        <artifactId>storm-redis</artifactId>
        <version>${storm.version}</version>
        <type>jar</type>
    </dependency> 
    
    
    AI写代码xml
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
    
    

Storm-Redis 使用 Jedis 为 Redis 客户端，并提供了如下三个基本的 Bolt 实现：

  * **RedisLookupBolt** ：从 Redis 中查询数据；
  * **RedisStoreBolt** ：存储数据到 Redis；
  * **RedisFilterBolt** : 查询符合条件的数据；

`RedisLookupBolt`、`RedisStoreBolt`、`RedisFilterBolt ` 均继承自 `AbstractRedisBolt` 抽象类。我们可以通过继承该抽象类，实现自定义 RedisBolt，进行功能的拓展。

### 二、集成案例

#### 2.1 项目结构

这里首先给出一个集成案例：进行词频统计并将最后的结果存储到 Redis。项目结构如下：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fed844222fbb1dc598bac9cae36fec68.png#pic_center)

#### 2.2 项目依赖

项目主要依赖如下：
    
    
    <properties>
        <storm.version>1.2.2</storm.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-core</artifactId>
            <version>${storm.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.storm</groupId>
            <artifactId>storm-redis</artifactId>
            <version>${storm.version}</version>
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
            spoutOutputCollector.emit(new Values(lineData));
            Utils.sleep(1000);
        }
    
        @Override
        public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
       
       
            outputFieldsDeclarer.declare(new Fields("line"));
        }
    
    
        /**
         * 模拟数据
         */
        private String productData() {
       
       
            Collections.shuffle(list);
            Random random = new Random();
            int endIndex = random.nextInt(list.size()) % (list.size()) + 1;
            return StringUtils.join(list.toArray(), "\t", 0, endIndex);
        }
    
    }
    
    
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
        * 25
        * 26
        * 27
        * 28
        * 29
        * 30
        * 31
        * 32
        * 33
        * 34
        * 35
        * 36
        * 37
        * 38
        * 39
        * 40
        * 41
        * 42
        * 43
        * 44
        * 45
        * 46
        * 47
        * 48
        * 49
    
    

产生的模拟数据格式如下：
    
    
    Spark	HBase
    Hive	Flink	Storm	Hadoop	HBase	Spark
    Flink
    HBase	Storm
    HBase	Hadoop	Hive	Flink
    HBase	Flink	Hive	Storm
    Hive	Flink	Hadoop
    HBase	Hive
    Hadoop	Spark	HBase	Storm
    
    
    AI写代码properties
      
        * 1
        * 2
        * 3
        * 4
        * 5
        * 6
        * 7
        * 8
        * 9
    
    

#### 2.4 SplitBolt
    
    
    /**
     * 将每行数据按照指定分隔符进行拆分
     */
    public class SplitBolt extends BaseRichBolt {
       
       
    
        private OutputCollector collector;
    
        @Override
        public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
       
       
            this.collector = collector;
        }
    
        @Override
        public void execute(Tuple input) {
       
       
            String line = input.getStringByField("line");
            String[] words = line.split("\t");
            for (String word : words) {
       
       
                collector.emit(new Values(word, String.valueOf(1)));
            }
        }
    
        @Override
        public void declareOutputFields(OutputFieldsDeclarer declarer) {
       
       
            declarer.declare(new Fields("word", "count"));
        }
    }
    
    
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
        * 25
        * 26
        * 27
        * 28
        * 29
        * 30
        * 31
        * 32
        * 33
        * 34
        * 35
        * 36
    
    

#### 2.5 CountBolt
    
    
    /**
     * 进行词频统计
     */
    public class CountBolt extends BaseRichBolt {
       
       
    
    AI写代码java
      
        * 1
        * 2
        * 3
        * 4
        * 5