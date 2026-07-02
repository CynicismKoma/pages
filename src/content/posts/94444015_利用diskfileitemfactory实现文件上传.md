---
title: "利用DiskFileItemFactory实现文件上传"
pubDatetime: 2019-07-02T15:03:07.000Z
description: '文章浏览阅读520次。在JSP页面中，form表单中method必须设置为post，并且要设置enctype="multipart/form-data"：<%@ page contentType="text/html;charset=UTF-8" %><HTML><HEAD>    <title>上传文件</title></HEAD>..._new diskfileitemfactory()'
tags: []
draft: false
---

在JSP页面中**，form表单中method必须设置为post，并且要设置enctype=”multipart/form-data”** ：
[code] 
    <%@ page contentType="text/html;charset=UTF-8" %>
    <HTML>
    <HEAD>
        <title>上传文件</title>
    </HEAD>
       <body>
         <div>
             <form action="upFile.do" method="post" enctype="multipart/form-data">
                 <table>
                     <tr>
                         <td>姓名</td>
                         <td><input name="name" type="text"></td>
                         <td>年龄</td>
                         <td><input name="age" type="text"></td>
                         <td>上传文件</td>
                         <td><input name="file" type="file"></td>
                         <td><input type="submit" value="上传"></td>
                     </tr>
                 </table>
             </form>
         </div>
       </body>
    </HTML>
[/code]

核心API—DiskFileItemFactory   
DiskFileItemFactory 是创建FileItem 对象的工厂，这个工厂类常用方法：   
1、public void setSizeThreshold(int sizeThreshold) ：设置内存缓冲区的大小，默认值为10K。当上传文件大于缓冲区大小时，fileupload组件将使用临时文件缓存上传文件。   
2、public void setRepository(Java.io.File repository) ：指定临时文件目录，默认值为System.getProperty(“java.io.tmpdir”).   
3、public DiskFileItemFactory(int sizeThreshold,java.io.File repository) ：构造函数

核心API—-ServletFileUpload   
ServletFileUpload 负责处理上传的文件数据，并将表单中每个输入项封装成一个FileItem 对象中。常用方法有：   
1、boolean isMultipartContent(HttpServletRequest request) ：判断上传表单是否为multipart/form-data类型

2、List parseRequest(HttpServletRequest request)：解析request对象，并把表单中的每一个输入项包装成一个fileItem 对象，并返回一个保存了所有FileItem的list集合。

3、setFileSizeMax(long fileSizeMax) ：设置上传文件的最大值（单个文件），用于设置单个上传文件的最大尺寸限制，以防止客户端恶意上传超大文件来浪费服务器端的存储空间。其参数是以字节为单位的long型数字。

4、setSizeMax(long sizeMax) ：设置上传文件总量的最大值（所有上传文件），用于设置请求消息实体内容（即所有上传数据）的最大尺寸限制，以防止客户端恶意上传超大文件来浪费服务器端的存储空间。其参数是以字节为单位的long型数字。

5、setHeaderEncoding(java.lang.String encoding) ：设置编码格式。在文件上传请求的消息体中，除了普通表单域的值是文本内容以外，文件上传字段中的文件路径名也是文本，在内存中保存的是它们的某种字符集编码的字节数组，Apache文件上传组件在读取这些内容时，必须知道它们所采用的字符集编码，才能将它们转换成正确的字符文本返回。

核心API—FileItem   
FileItem类的常用方法：   
1、boolean isFormField()： isFormField方法用于判断FileItem类对象封装的数据是一个普通文本表单字段，还是一个文件表单字段，如果是普通表单字段则返回true，否则返回false。

2、 String getName()   
用于获得文件上传字段中的文件名。注意IE或FireFox中获取的文件名是不一样的，IE中是绝对路径，FireFox中只是文件名。

3、String getFieldName()   
用于返回表单标签name属性的值。

4、 void write(File file)：用于将FileItem对象中保存的主体内容保存到某个指定的文件中。如果FileItem对象中的主体内容是保存在某个临时文件中，该方法顺利完成后，临时文件有可能会被清除。该方法也可将普通表单字段内容写入到一个文件中，但它主要用途是将上传的文件内容保存在本地文件系统中。

5、 String getString()：用于将FileItem对象中保存的数据流内容以一个字符串返回，它有两个重载的定义形式：   
public Java.lang.String getString()；   
public java.lang.String getString(java.lang.String encoding) throws java.io.UnsupportedEncodingException   
前者使用缺省的字符集编码将主体内容转换成字符串，后者使用参数指定的字符集编码将主体内容转换成字符串。如果在读取普通表单字段元素的内容时出现了中文乱码现象，请调用第二个getString方法，并为之传递正确的字符集编码名称。

6、 void delete()：delete方法用来清空FileItem类对象中存放的主体内容，如果主体内容被保存在临时文件中，delete方法将删除该临时文件。尽管当FileItem对象被垃圾收集器收集时会自动清除临时文件，但及时调用delete方法可以更早的清除临时文件，释放系统存储资源。

实现步骤：   
1、创建DiskFileItemFactory对象，设置缓冲区大小和临时文件目录。   
2、使用DiskFileItemFactory 对象创建ServletFileUpload对象，并设置上传文件的大小限制。   
3、调用ServletFileUpload.parseRequest方法解析request对象，得到一个保存了所有上传内容的List对象。   
4、对list进行迭代，每迭代一个FileItem对象，调用其isFormField方法判断是否是上传文件：   
4.1、 为普通表单字段，则调用getFieldName、getString方法得到字段名和字段值。   
4.2、为上传文件，则调用getInputStream方法得到数据输入流，从而读取上传数据。

需要引入的jar包：  

[code] 
    <dependency>
          <groupId>commons-fileupload</groupId>
          <artifactId>commons-fileupload</artifactId>
          <version>1.3.1</version>
        </dependency>
        <dependency>
          <groupId>commons-io</groupId>
          <artifactId>commons-io</artifactId>
          <version>2.4</version>
        </dependency>
[/code]

代码实现：
[code] 
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException,IOException{
    
            response.setContentType("text/html;charset=UTF-8");
    
            //创建一个解析器工厂
            DiskFileItemFactory factory=new DiskFileItemFactory();
            //设置工厂的内存缓冲区大小，默认是10K
           // factory.setSizeThreshold(1024*1024);
            //设置工厂的临时文件目录：当上传文件的大小大于缓冲区大小时，将使用临时文件目录缓存上传的文件
            factory.setRepository(new File("D:\\YOHO\\"));
           //文件上传解析器
            ServletFileUpload upload=new ServletFileUpload(factory);
           //设置所有上传数据的最大值，单位字节long  1M
            upload.setSizeMax(1024*1024);
            //设置单个文件上传的最大值
            upload.setFileSizeMax(1024*1024);
            //设置编码格式
            upload.setHeaderEncoding("UTF-8");
    
            try {
                //解析请求，将表单中每个输入项封装成一个FileItem对象
                List<FileItem> itemList=upload.parseRequest(request);
                for(FileItem item:itemList){
                    //判断输入的类型是 普通输入项 还是文件
                    if(item.isFormField()){
                        //普通输入项 ,得到input中的name属性的值
                        String name=item.getFieldName();
                        //得到输入项中的值
                        String value=item.getString("UTF-8");
                        System.out.println("name="+name+"  value="+value);
                    }else{
                        //上传的是文件，获得文件上传字段中的文件名
                        //注意IE或FireFox中获取的文件名是不一样的，IE中是绝对路径，FireFox中只是文件名。
                        String fileName=item.getName();
                        System.out.println(fileName);
                        //返回表单标签name属性的值
                        String namede=item.getFieldName();
                        System.out.println(namede);
    
                       //方法一：保存上传文件到指定的文件路径
                        InputStream is=item.getInputStream();
                        FileOutputStream fos=new FileOutputStream("D:\\wps\\"+fileName);
                        byte[] buff=new byte[1024];
                        int len=0;
                        while((len=is.read(buff))>0){
                            fos.write(buff);
                        }
    
                        //方法二：保存到指定的路径
                        //将FileItem对象中保存的主体内容保存到某个指定的文件中。
                        // 如果FileItem对象中的主体内容是保存在某个临时文件中，该方法顺利完成后，临时文件有可能会被清除
                        item.write(new File("D:\\sohucache\\"+fileName));
                        is.close();
                        fos.close();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
    
        }
    //结果：
    //普通文本
    name=name  value=我等着
    name=age  value=25
    //文件名 ：火狐浏览器是 文件名，，IE浏览器是绝对路径
    asosResult.txt
    //jsp中name属性的值
    file
[/code]

转载自：<https://blog.csdn.net/u014785687/article/details/73863964>
