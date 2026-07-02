---
title: "【HTML】使用a标签以post方式提交"
pubDatetime: 2019-04-03T08:47:05.000Z
description: "文章浏览阅读2k次。本文介绍了在HTML中使用a标签实现POST提交的三种方法：通过增加form表单、使用Ajax以及利用echopostjs插件。每种方法均有详细的代码示例。"
tags: []
draft: false
---

在HTML中a标签默认是使用GET方式跳转的，如果需要使用post跳转可以这样用：

一：增加一个form表单
[code] 
    <span style="font-family:SimSun;font-size:18px;"><body>
        <a href="javascript:doPost("addStudent.action", {"name":"张三"})">提交</a>
     
        <script>
            function doPost(to, p) {  // to:提交动作（action）,p:参数
            	var myForm = document.createElement("form");     
            	myForm.method = "post";
            	myForm.action = to; 
    		for (var i in p){    
                    	var myInput = document.createElement("input");     
                    	myInput.setAttribute("name", i);  // 为input对象设置name
                    	myInput.setAttribute("value", p[i]);  // 为input对象设置value
                    	myForm.appendChild(myInput);
                    }   
                    document.body.appendChild(myForm);   
                    myForm.submit(); 
                    document.body.removeChild(myForm);  // 提交后移除创建的form
            }
        </script>
    </body></span>
    
    
[/code]

二：使用Ajax
[code] 
    <span style="font-family:SimSun;font-size:18px;"><body>
        <a href="addStudent.action" class="a_post">提交</a>
     
        <script>
            $(".a_post").on("click",function(event){
        	    event.preventDefault();  // 使a自带的方法失效，即无法向addStudent.action发出请求
                $.ajax({
                    type: "POST",  // 使用post方式
                    url: "addStudent.action",
                    contentType:"application/json",
                    data: JSON.stringify({param1:value1, param2:value2}),  // 参数列表，stringify()方法用于将JS对象序列化为json字符串
                    dataType:"json",
                    success: function(result){
                       // 请求成功后的操作
                    },
                    error: function(result){
                       // 请求失败后的操作
                    }
        	    });
    	});
        </script>
    </body></span>
    
    
[/code]

转自：<https://blog.csdn.net/lzgs_4/article/details/43156133>

三：使用echopost js插件，内部实现还是使用ajax请求，只不过免去自己写了
[code] 
    <body>  
    <a class="echo-post echo-confirm" action-url="后台方法" redirect-url="后台完成操作后需要跳转的地址" confirm-msg="提醒内容">操作</a>  
    </body>  
     <script>  
        $(function () {  
           $('body').echopost();  
        })  
    </script>  
    
[/code]

echopost js插件下载：[http://www.51softs.com/aspnet/如何使用a标签实现post提交请求.html](<http://www.51softs.com/aspnet/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8a%E6%A0%87%E7%AD%BE%E5%AE%9E%E7%8E%B0post%E6%8F%90%E4%BA%A4%E8%AF%B7%E6%B1%82.html>)  
echopost js使用说明：<http://www.51softs.com/luoyufuli/echopost-ajax-post-mvc-asp-net.html>

说明文档中的的下面的返回类型的工具类没有找到，使用这个一直提示参数错误。
[code] 
    return Json(new BaseRequest<int>
        {
            Code = 0,
            Message = "ID:" + id + "删除成功",
            Result = id
        });
[/code]
