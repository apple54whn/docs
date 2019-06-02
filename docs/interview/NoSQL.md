# NoSQL

## Redis-6379

### 什么是Redis？用处？

Redis是一个开源**的高性能key-value数据库**。直接从内存中读取数据，**减少数据库访问压力**，**承受并发能力强**；应用场景如下：

- **缓存**（首页缓存、数据查询等）
- **消息中间件**
- 计数器/**排行榜**



### Redis和 memcached 的区别？

- Redis支持**丰富的数据类型**（5个）；memcached仅支持简单的数据类型String
- Redis**支持数据持久化**，可以将内存中数据保存到磁盘中，重启后再次加载使用；memcached不支持
- Redis**原生支持集群（cluster）**；memcached没有原生的方式



### Redis 常见数据结构以及使用场景分析

- String：可以是String、数字。常规**计数**：微博数、粉丝数

  set / get / del

- Hash：适合存储**对象**数据：购物车、商品

  hset / hget / hgetall / hdel

- List：内部是链表：**消息列表（高性能分页，下拉不断分页）**、关注列表、粉丝列表

  l/rpush / lrange / l/rpop

- Set：与List类似，去重。基于 set 轻易实现**交集、并集、差集**的操作。如**共同关注**、共同粉丝

  `sinterstore key1 key2 key3 `将交集存在key1内

  sadd / smembers / srem

- ZSet：相比Set多个**score权重**，按score排序。直播中**礼物排行榜、在线用户列表**

  zadd / zrange / zrem



### Redis 设置过期时间

> expire  /ɪkˈspaɪr/ 到期，期满；结束

set key 的时候，都可以给一个 **expire time**，就是过期时间。时间到后删除方式如下：

- **定期删除**：redis默认是**每隔 100ms 就随机抽取**一些设置了过期时间的key，检查其是否过期，如果过期就删除。注意这里是随机抽取的。为什么要随机呢？你想一想假如 redis 存了几十万个 key ，每隔100ms就遍历所有的设置过期时间的 key 的话，就会给 CPU 带来很大的负载！
- **惰性删除**：定期删除可能会导致很多过期 key 到了时间并没有被删除掉。所以就有了惰性删除。假如你的过期key，靠定期删除没有被删除掉，还停留在内存里，除非你的系统去查一下那个 key，才会被redis给删除掉，这就是所谓的惰性删除



### Redis 内存淘汰机制

但是若有的key没有被定期删除，也没有执行惰性删除。此时需要用到 Redis 内存淘汰机制

> MySQL里有2000w数据，Redis中只存20w的数据，如何保证Redis中的数据都是**热点数据**？

redis 提供 6 种数据淘汰策略：

- volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选**最近最少使用**的数据淘汰
- volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选**将要过期**的数据淘汰
- volatile-random：从已设置过期时间的数据集（server.db[i].expires）中**任意选择**数据淘汰
- allkeys-lru：当**内存不足以容纳新写入数据时**，在键空间中，**移除最近最少使用的key**（这个是最常用的）.
- allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰
- no-eviction：禁止驱逐数据，也就是说当内存不足以容纳新写入数据时，新写入操作会报错。这个应该没人使用吧！



### Redis 持久化机制

- **RDB**（快照，snapshotting）：**默认**方式，不需要进行配置。**在一定的间隔时间中，检测key的变化情况**，然后持久化数据

  ```nginx
  #   after 900 sec (15 min) if at least 1 key changed
  save 900 1
  #   after 300 sec (5 min) if at least 10 keys changed
  save 300 10
  #   after 60 sec if at least 10000 keys changed
  save 60 10000
  ```

- **AOF**（append-only ﬁle，只追加文件）：日志记录方式，可以每一次命令操作后，持久化数据。编辑redis.windwos.conf文件

  ```nginx
  appendonly no（关闭aof） --> appendonly yes （开启aof）
  
  # appendfsync always ： 每一次操作都进行持久化
  appendfsync everysec ： 每隔一秒进行一次持久化
  # appendfsync no	 ： 不进行持久化
  ```



### 缓存雪崩和缓存穿透问题解决方案

- 缓存雪崩：缓存同一时间大面积的失效，所以，后面的请求都会落到数据库上，造成数据库短时间内承受大量请求而崩掉。
  - 事前：尽量保证整个 **redis 集群的高可用性**，发现机器宕机尽快补上。选择合适的**内存淘汰策略**。
  - 事中：本地 ehcache缓存 + hystrix限流&降级，避免MySQL崩掉
  - 事后：利用 redis 持久化机制保存的数据尽快恢复缓存



### Redis-Cluster

Redis-Cluster采用**无中心结构**，每个节点保存数据和整个集群状态,每个节点都和其他所有节点连接

* **分布存储机制-槽**

  * redis-cluster 把所有的物理节点映射到[0-16383]slot（槽） 上，cluster 负责维护

  * Redis 集群中内置了 16384 个哈希槽，当需要在 Redis 集群中放置一个 key-value 时，redis 先对 key 使用 crc16 算法算出一个结果，然后把结果对 16384 求余数，这样每个key 都会对应一个编号在 0-16383 之间的哈希槽，redis 会根据节点数量大致均等的将哈希槽映射到不同的节点。

    例如三个节点：槽分布的值如下：SERVER1:  0-5460；SERVER2:  5461-10922；SERVER3:  10923-16383

* **容错机制-投票**

  * 选举过程是集群中所有master参与,如果半数以上master节点与故障节点通信超过(cluster-node-timeout)，认为该节点故障，自动触发故障转移操作，采用**投票机制**故障节点对应的从节点自动升级为主节点

  * 什么时候整个集群不可用(cluster_state:fail)? 

    如果集群任意master挂掉，且当前master没有slave，集群进入fail状态，也可以理解成集群的slot映射[0-16383]不完成时进入fail状态.。



### Redis 为什么是单线程的

* 因为**CPU**不是Redis的瓶颈，**瓶颈可能是内存或网络带宽**！

* 异步非阻塞 IO，避免线程切换及锁的资源损耗



