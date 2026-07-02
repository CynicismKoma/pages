---
title: "Spring Data JPA —— 分页PageRequest、PageImpl"
pubDatetime: 2019-04-03T08:58:31.000Z
description: "文章浏览阅读771次。项目中通过openid来查买家订单主表，那么多的话就的考虑分页显示了public interface OrderMasterRepository extends JpaRepository<OrderMaster, String> {// 根据openid来查询一条条的OrdeMaster以分页显示出来  Page<OrderMaster> find..._pageimpl"
tags: []
draft: false
---
项目中通过openid来查买家订单主表，那么多的话就的考虑分页显示了

public interface OrderMasterRepository extends JpaRepository<OrderMaster, String> {  
  
// 根据openid来查询一条条的OrdeMaster以分页显示出来  
Page<OrderMaster> findByBuyerOpenid(String buyerOpenid, Pageable pageable);  
}  
注意：在单元测试的时候、分页是从第0也开始的~

显示时，有三个参数，前两个必填，第几页，一页多少个size，第三个参数默认可以不填。

但是发现这个方法已经过时了，通过查看它的源码发现，新方法为静态方法PageRequest of（page，size）

  
使用PageImpl进行分页：  
@Override  
public Page<OrderDTO> findList(String buyerOpenid, Pageable pageable) {  
Page<OrderMaster> orderMasterPage = orderMasterRepository.findByBuyerOpenid(buyerOpenid, pageable);  
  
List<OrderDTO> orderDTOList = OrderMaster2OrderDTOConverter.convert(orderMasterPage.getContent());  
  
//TODO pageable  
return new PageImpl<OrderDTO>(orderDTOList, pageable, orderMasterPage.getTotalElements());

  
转载：https://blog.csdn.net/Jae_Wang/article/details/80630776   

