---
title: "echart datazoom配置"
pubDatetime: 2019-07-03T09:03:51.000Z
description: "文章浏览阅读6.6k次。本文详细介绍了ECharts中的dataZoom组件配置项，包括显示组件、背景样式、数据阴影、填充颜色等，并阐述了其如何影响不同类型的轴，如x轴、y轴、radius轴和angle轴的数据范围。"
tags: []
draft: false
---
dataZoom=[ //区域缩放  
{  
id: 'dataZoomX',  
show:true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。  
backgroundColor:"rgba(47,69,84,0)", //组件的背景颜色  
type: 'slider', //slider表示有滑动块的，inside表示内置的  
dataBackground:{ //数据阴影的样式。  
lineStyle:mylineStyle, //阴影的线条样式  
areaStyle:myareaStyle, //阴影的填充样式  
},  
fillerColor:"rgba(167,183,204,0.4)", //选中范围的填充颜色。  
borderColor:"#ddd", //边框颜色。  
filterMode: 'filter', //'filter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。  
//'weakFilter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只有当全部维度都在数据窗口同侧外部，整个数据项才会被过滤掉。  
//'empty'：当前数据窗口外的数据，被 设置为空。即 不会 影响其他轴的数据范围。  
//'none': 不过滤数据，只改变数轴范围。  
xAxisIndex:0, //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴  
yAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴  
radiusAxisIndex:3, //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴  
angleAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴  
start: 30, //数据窗口范围的起始百分比,表示30%  
end: 70, //数据窗口范围的结束百分比,表示70%  
startValue:10, //数据窗口范围的起始数值  
endValue:100, //数据窗口范围的结束数值。  
orient:"horizontal", //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。  
zoomLock:false, //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。  
throttle:100, //设置触发视图刷新的频率。单位为毫秒（ms）。  
zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。  
moveOnMouseMove:true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。  
left:"center", //组件离容器左侧的距离,'left', 'center', 'right','20%'  
top:"top", //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'  
right:"auto", //组件离容器右侧的距离,'20%'  
bottom:"auto", //组件离容器下侧的距离,'20%'  
  
},  
{  
id: 'dataZoomY',  
type: 'inside',  
filterMode: 'empty',  
disabled:false, //是否停止组件的功能。  
xAxisIndex:0, //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴  
yAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴  
radiusAxisIndex:3, //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴  
angleAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴  
start: 30, //数据窗口范围的起始百分比,表示30%  
end: 70, //数据窗口范围的结束百分比,表示70%  
startValue:10, //数据窗口范围的起始数值  
endValue:100, //数据窗口范围的结束数值。  
orient:"horizontal", //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。  
zoomLock:false, //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。  
throttle:100, //设置触发视图刷新的频率。单位为毫秒（ms）。  
zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。  
moveOnMouseMove:true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。  
}  
]
