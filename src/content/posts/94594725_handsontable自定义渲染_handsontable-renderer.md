---
title: "handsontable自定义渲染_handsontable renderer"
pubDatetime: 2019-07-04T09:36:58
description: "本文主要介绍在使用Handsontable过程中，对加载的数据进行字体颜色、样式（style）、数据格式化，对齐方式的处理，并添加自定义图片和单机事件功能。 代码如下： <!DOCTYPE html> <html> <head> <title>handsontable demo</title> <meta charset= 'utf-8' > <link rel= 'stylesheet' hre"
tags: []
draft: false
---
本文主要介绍在使用Handsontable过程中，对加载的数据进行字体颜色、样式（style）、数据格式化，对齐方式的处理，并添加自定义图片和单机事件功能。

代码如下：
      
      1. <!DOCTYPE html>
      
        2. <html>
      
        3. <head>
      
        4.     <title>handsontable demo</title>
      
        5.     <meta charset="utf-8">
      
        6.     <link rel="stylesheet" href="handsontable/htstyle.css">
      
        7.     <link rel="stylesheet" href="handsontable/htstyle-custom.css">
      
        8.     <script src="handsontable/jquery-1.12.1.js"></script>
      
        9.     <script src="handsontable/handsontable.full.js"></script>
      
        10. </head>
      
        11. <body>
      
        12.     <div id="example"></div>
      
        13.  
      
        14.     <script>
      
        15.             var data = [
      
        16.                 {riqi:'2017-01',address: '北京', goods:'冰箱',price: '3399',sales: 530,del:''},
      
        17.                 {riqi:'2017-01', address:'天津',goods: '空调', price:'4299',sales: 522,del:''},
      
        18.                 {riqi:'2017-01',address: '上海',goods: '洗衣机',price: '1299',sales: 544,del:''},
      
        19.                 {riqi:'2017-01', address:'广州',goods: '彩电',price: '4599',sales: 562,del:''},
      
        20.                 {riqi:'2017-01', address:'深圳', goods:'热水器', price:'1099',sales: 430,del:''},
      
        21.                 {riqi:'2017-02',address: '重庆',goods: '笔记本电脑',price: '4999',sales: 666,del:''},
      
        22.                 {riqi:'2017-02', address:'厦门',goods: '油烟机',price: '2899',sales: 438,del:''},
      
        23.                 {riqi:'2017-02',address: '青岛',goods: '饮水机', price:'899',sales: 620,del:''},
      
        24.                 {riqi:'2017-02', address: '大连', goods: '手机', price: '1999', sales: 500,del:''}
      
        25.             ];
      
        26.  
      
        27.             function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      
        28.                 Handsontable.renderers.TextRenderer.apply(this, arguments);
      
        29.                 if (prop == 'address') {//修改字体颜色
      
        30.                     td.style.color = '#32CD32';
      
        31.                  
      
        32.                     //如果要添加其他样式，可以用以下写法
      
        33.                     //td.style = 'font-weight: bold;';
      
        34.                 }
      
        35.                 else if (prop == 'price') {
      
        36.                     //格式化价格数据
      
        37.                     td.innerText = value != null ? numbro(value).format('0.00') : "";
      
        38.                 }
      
        39.                 else if (prop == 'sales') {
      
        40.                     //右对齐
      
        41.                     td.style.textAlign = 'right';
      
        42.                     td.innerText = value != null ? numbro(value).format('0,0.00') : "";
      
        43.                 }
      
        44.                 else if (prop == 'del') {
      
        45.                     //添加自定义的图片，并给图片的chick添加事件
      
        46.                     var escaped = Handsontable.helper.stringify(value),
      
        47.                       imgdel;
      
        48.  
      
        49.                     imgdel = document.createElement('IMG');
      
        50.                     imgdel.src = "handsontable/remove.png";
      
        51.                     imgdel.width = 20;
      
        52.                     imgdel.name = escaped;
      
        53.                     imgdel.style = 'cursor:pointer;';//鼠标移上去变手型
      
        54.                     Handsontable.dom.addEvent(imgdel, 'click', function (event) {
      
        55.                         hot.alter("remove_row", row);//删除当前行
      
        56.                     });
      
        57.  
      
        58.                     Handsontable.dom.empty(td);
      
        59.                     td.appendChild(imgdel);
      
        60.                     td.style.textAlign = 'center';//图片居中对齐
      
        61.                     return td;
      
        62.                 }
      
        63.             }
      
        64.             Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
      
        65.  
      
        66.             var hot = new Handsontable(document.getElementById('example'),{
      
        67.                 data: data,
      
        68.                 colHeaders: ['操作', '日期', '地点', '商品', '单价', '销量'], // 使用自定义列头
      
        69.                 rowHeaders: true,
      
        70.                 colWidths: 150, // 设置所有列宽为150像素
      
        71.                 filters: true,
      
        72.                 columnSorting: true,
      
        73.                 sortIndicator: true,
      
        74.                 autoColumnSize: true,
      
        75.                 manualColumnResize: true,
      
        76.                 undo: true,
      
        77.                 redo: true,
      
        78.                 wordWrap: true,
      
        79.                 copyable: true,
      
        80.                 mergeCells: false,
      
        81.                 manualRowResize: true,
      
        82.                 manualRowMove: true,
      
        83.                 manualColumnMove: false,
      
        84.                 renderAllRows: true,
      
        85.                 allowInsertRow: true,
      
        86.                 allowInsertColumn: false,
      
        87.                 fixedColumnsLeft: 1,
      
        88.                 columns: [ {
      
        89.                     data: 'del',
      
        90.                     type: 'text'
      
        91.                 }, {
      
        92.                     data: 'riqi',
      
        93.                     type: 'date',
      
        94.                     dateFormat: 'YYYY-MM-DD'
      
        95.                 },{
      
        96.                     data: 'address',
      
        97.                     type: 'text'
      
        98.                 },{
      
        99.                     data: 'goods',
      
        100.                     type: 'text'
      
        101.                 },{
      
        102.                     data: 'price',
      
        103.                     type: 'numeric'
      
        104.                 },{
      
        105.                     data: 'sales',
      
        106.                     type: 'numeric'
      
        107.                 }],
      
        108.                 contextMenu: ['row_above', 'row_below', '---------', 'remove_row','---------','undo','redo','---------','make_read_only','---------','alignment'],
      
        109.                 dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
      
        110.                 cells: function (row, col, prop) {
      
        111.                     var cellProperties = {};
      
        112.                     cellProperties.renderer = "negativeValueRenderer";
      
        113.                     return cellProperties;
      
        114.                 },
      
        115.             });
      
        116.  
      
        117.     </script>
      
        118. </body>
      
        119. </html>
    
    
    
    
    AI写代码java
    
    运行
    
    ![](https://csdnimg.cn/release/blogv2/dist/pc/img/runCode/icon-arrowwhite.png)

需要注意的是在Handsontable中，colHeaders与columns需要一一对应，数据是根据columns中设置的先后顺序加载的，效果如下：![](https://i-blog.csdnimg.cn/blog_migrate/3237c4f54610054080396b7cc53627ee.png)

如果contextMenu和dropdownMenu不需要原来组件提供的那么多选项，可以像代码中那样写，Handsontable也提供重写方法，可以参考官网：http://docs.handsontable.com/0.16.1/demo-context-menu.html

![](https://i-blog.csdnimg.cn/blog_migrate/5847887807f97de57a26d34806cdd7b2.png)

转载自：<https://www.cnblogs.com/QiuJL/p/6972327.html>