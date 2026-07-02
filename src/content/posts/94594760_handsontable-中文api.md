---
title: "Handsontable 中文API"
pubDatetime: 2019-07-04T09:37:56.000Z
description: "文章浏览阅读1.7w次。本文详细介绍了表格配置的各项功能，包括固定行列、拖拽调整大小、列宽自适应、数据分组、排序、显示行头列头、数据加载与显示、右键菜单、列隐藏等，帮助用户灵活定制表格布局。"
tags: []
draft: false
---
常规配置：

1.固定行列位置

fixedRowsTop:行数 //固定顶部多少行不能垂直滚动

fixedColumnsLeft:列数 //固定左侧多少列不能水平滚动

2.拖拽行头或列头改变行或列的大小

manualColumnResize:true/false//当值为true时，允许拖动，当为false时禁止拖动

manualRowResize:true/false//当值为true时，允许拖动，当为false时禁止拖动

3.延伸列的宽度

stretchH：last/all/none   
//last：延伸最后一列，all：延伸所有列，none默认不延伸。

4.手动固定某一列

manualColumnFreeze:   
true/false

//当值为true时，选中某一列，右键菜单会出现freeze   
this column选项，该选项的作用是固定这一列不可水平滚动，并会将这一列移动到非固定列的前面。再次右键菜单会出现unfreeze this column，意思是取消该列的固定，并将其还原到初始位置。

5.拖动行或列到某一行或列之后

manualColumnMove：true/false   
当值为true时，列可拖拽移动到指定列

manualRowMove:true/false   
当值为true时，行可拖拽至指定行

当属性的值为true时，行头或列头可以被拖拽移动，移动后该行或列将会被移动到指定位置，原先该行或列的后面部分自动上移或后退。移动的时候鼠标需选中行线或列线才行。

6.设置当前行或列的样式

currentRowClassName：当前行样式的名称

currentColClassName：当前列样式的名称

7.行分组或列分组

groups:[{cols:[0,2]},{cols:[3,5]},{rows:[0,4]},{rows:[5,7]}]

上面的例子介绍了4个分组，第0-2列为一组，第3-5列为第二组，第0-4行为一组，第5-7列为第二组。分组可在行头或列头看见，分组可被展开或隐藏。

8.允许排序

columnSorting：true/false/对象   
//当值为true时，表示启用排序插件

当值为true时，排序插件的使用可通过点击列头文字实现。当值为false时表示禁用排序。当值为对象时，该对象包含两个属性：column：列数。sortOrder：true/false，升序或降序，true为升序排列。当用对象启动插件后可用如下方式禁用插件：

hot.updateSettings({

columnSorting:false

});

排序的使用也可已直接调用sort()方法实现。如下操作：

if(hot.sortingEnabled){

hot.sort(行数，true/false);   
//true为升序，false为降序

}

9.显示行头列头

colHeaders:true/fals/数组   
//当值为true时显示列头，当值为数组时，列头为数组的值

rowHeaders：true/false/数组   
//当值为true时显示行头，当值为数组时，行头为数组的值

10.数据显示

data：[[第一行数据],[第二行数据],…[第n行数据]]/对象数组

获取数据的方法：hot.getData()。

加载数据的方法：hot.loadData(data)。

当不需要显示某一列的时候可用如下格式设置：

columns：[

{data:0},

{data:2}

]

这里就不显示第二列数据，只有第1、3列数据

11.右键菜单展示

contextMenu：true/false/自定义数组 //当值为true时，启用右键菜单，为false时禁用

12.自适应列大小

autoColumnSize：true/false //当值为true且列宽未设置时，自适应列大小

13.minCols：最小列数

minRows：最小行数

minSpareCols：最小列空间，不足则添加空列

maxCols：最大列数

maxRows：最大行数

minSpareRows：最小行空间，不足则添加空行

14.observeChanges：true/false //当值为true时，启用observeChanges插件

15.colWidths:[列宽1，列宽2，…]/列宽值
