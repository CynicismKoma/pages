---
title: "HTML input required 属性"
pubDatetime: 2019-04-28T15:32:59.000Z
description: "文章浏览阅读705次。本文深入探讨了HTML表单中required属性的使用方法及其作用。required属性作为布尔属性，确保用户在提交表单前必须填写指定的输入字段。适用于多种input类型，包括text、search、url等，有效提升了用户体验和数据完整性。"
tags: []
draft: false
---

[code]
    <form action="demo-form.php">
      Username: <input type="text" name="usrname" required>
      <input type="submit">
    </form>
[/code]

### 定义和用法

required 属性是一个布尔属性。

required 属性规定必需在提交表单之前填写输入字段。

**注意：** required 属性适用于下面的 input 类型：text、search、url、tel、email、password、date pickers、number、checkbox、radio 和 file。
