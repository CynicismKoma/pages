---
title: "jsp页面获取用户输入，动态改变input标签中value值"
pubDatetime: 2019-04-02T08:44:58.000Z
description: "文章浏览阅读6.3k次。本文介绍如何使用JSTL和EL通过request.setAttribute存储数据并转发至新页面，同时展示了如何获取表单提交的数据。"
tags: []
draft: false
---

用 jstl 和el 利用 request.setAttribute 存起来 然后转发到新页面 新页面用 ${requestScope.键名} 获取  
  
如果是获取修改的 数据 在用户提交表单的方法里  
比如获取 name=[uid](<https://www.baidu.com/s?wd=uid&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao>)的值 $("input[name=[uid](<https://www.baidu.com/s?wd=uid&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao>)]").val()
