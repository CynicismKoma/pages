---
title: "【JavaScript】一个简单的分页，显示页首，中间页，页尾，当前页的前后三页，省略其它页"
pubDatetime: 2019-07-02T15:31:27.000Z
description: "文章浏览阅读986次。本文介绍了一种智能分页策略，不仅展示页首、页尾，还显示中间页、当前页前后三页，巧妙使用省略号提升用户体验。通过HTML、JavaScript实现动态分页，适用于总页数较大的场景。"
tags: []
draft: false
---

有时候，比如共100页，并不一定要仅提供页首、页尾按钮，然后10页10页显示，

显示页首，中间页，页尾，当前页的前后三页，省略其它页也是一种不错的选择。

比如如下的分页：

![](/assets/94446715_0.gif)

首先，页面布局很简单，两个行内文本，一个显示当前的页数，与设定一个总页数。这里假定总页数共40页。

然后，用一个id="pagingDiv"的div放置分页链接。
[code] 
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>分页</title>
        </head>
        <body>
    	第<span id="pagingText"></span>页，共<span id="total">40</span>页
        	<div id="pagingDiv"></div>
        </body>
    </html>
[/code]

关键是如下的脚本。
[code] 
    <script>
    	//首先获取当前的总页数，一般是后台传递过来的，这里假定40页。
        var total = document.getElementById("total").innerHTML;
    	//id="pagingDiv"的div通过pagingConstruct函数构造，比如加载网页是第1页的
        pagingConstruct(1);
    	//形式参数paging是指当前页
        function pagingConstruct(paging){
    		//先更新一下行内文本
            document.getElementById("pagingText").innerHTML = paging;
            var pagingDivInnerHTML = "";
    		//这里是加载省略号的flag
            var isHiddenExist = 0;
    		//从第1页读到第40页。
            for (var i = 1; i <= total; i++) {
    			//如果读到当前页，就仅仅加载一个文本，不放链接
                if (i == paging) {
                    pagingDivInnerHTML += i + " ";
                }
                else {
    				//如果是页首，中间页，页尾，当前页的前后三页则不省略。
                    if (i < 4 || i < (paging + 3) && i > (paging - 3) || i > (total / 2 - 2) && i < (total / 2 + 2) || i > (total - 3)) {
                        pagingDivInnerHTML += "<a href='javascript:void(0)' onclick='pagingConstruct(" + i + ")'>" + i + "</a> ";
                        isHiddenExist = 0;
                    }
    				//否则就构造...
                    else {
                        if (isHiddenExist == 0) {
                            pagingDivInnerHTML += "...";
                            isHiddenExist = 1;
                        }
                    }
                }
            }
    		//把构造的内容放上去pagingDiv
            document.getElementById("pagingDiv").innerHTML = pagingDivInnerHTML;
        }
    </script>
[/code]

这个isHiddenExist的意思，是如果构造了一次...点点点，就不要再构造了。当你遇到不省略的内容之后，再构造...

转载自：<https://blog.csdn.net/yongh701/article/details/45031031>
