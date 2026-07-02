---
title: "RequestMappingHandlerMapping的用法"
pubDatetime: 2019-04-01T11:47:43.000Z
description: "文章浏览阅读2.4k次。有时候，想查看应用请求对应的ur和方法l情况，可以用RequestMappingHandlerMapping这个类来处理，下面这个方法可以解决：Java代码packagecn.pclby.controller.util;		importjava.io.IOException;	importjava.io.OutputStream;	importjav..._requestm"
tags: []
draft: false
---

有时候，想查看应用请求对应的ur和方法l情况，可以用RequestMappingHandlerMapping这个类来处理，下面这个方法可以解决：

Java代码 

![收藏代码](/assets/88944818_0.png)

  1. package cn.pclby.controller.util; 
  2.   3. import java.io.IOException; 
  4. import java.io.OutputStream; 
  5. import java.io.PrintWriter; 
  6. import java.util.Map; 
  7.   8. import javax.servlet.http.HttpServletResponse; 
  9.   10. import org.springframework.beans.factory.annotation.Autowired; 
  11. import org.springframework.stereotype.Controller; 
  12. import org.springframework.web.bind.annotation.RequestMapping; 
  13. import org.springframework.web.bind.annotation.ResponseBody; 
  14. import org.springframework.web.method.HandlerMethod; 
  15. import org.springframework.web.servlet.mvc.method.RequestMappingInfo; 
  16. import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping; 
  17.   18. /** 
  19. * 查看项目所有URL对应的Controller和方法 
  20. */ 
  21. @Controller 
  22. public class Url2ControllerUtils { 
  23.   24. @Autowired 
  25. private RequestMappingHandlerMapping requestMappingHandlerMapping; 
  26.   27. @RequestMapping(value = "/admin/util/url2controller") 
  28. @ResponseBody 
  29. public void list(HttpServletResponse response) { 
  30. StringBuilder sb = new StringBuilder(); 
  31. sb.append("URL").append("--").append("Class").append("--").append("Function").append('\n'); 
  32.   33. Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods(); 
  34. for (Map.Entry<RequestMappingInfo, HandlerMethod> m : map.entrySet()) { 
  35. RequestMappingInfo info = m.getKey(); 
  36. HandlerMethod method = m.getValue(); 
  37. sb.append(info.getPatternsCondition()).append("--"); 
  38. sb.append(method.getMethod().getDeclaringClass()).append("--"); 
  39. sb.append(method.getMethod().getName()).append('\n'); 
  40. } 
  41.   42. PrintWriter writer = null; 
  43. try { 
  44. writer = response.getWriter(); 
  45. writer.print(sb.toString()); 
  46. } catch (IOException e) { 
  47. e.printStackTrace(); 
  48. } finally { 
  49. writer.close(); 
  50. } 
  51.   52. } 
  53. } 

需要注意下面几点：

（1）RequestMappingHandlerMapping这个类在程序中用@Autowired来自动装配得到对象，但实际上，spring容器是没有注入到这个bean的，这个可以用applicationContext.getBean("requestMappingHandlerMapping")方法来验证得到。

（2）RequestMappingHandlerMapping这个类的对象，只能在controller层用，并且要在申明了@RequestMapping的方法里面用，从RequestMappingHandlerMapping的源码注释里面可以看出：

Java代码 

![收藏代码](/assets/88944818_1.png)

  1. /** 
  2. * Creates {@link RequestMappingInfo} instances from type and method-level 
  3. * {@link RequestMapping @RequestMapping} annotations in 
  4. * {@link Controller @Controller} classes. 
  5. * 
  6. * @author Arjen Poutsma 
  7. * @author Rossen Stoyanchev 
  8. * @since 3.1 
  9. */ 
  10. public class RequestMappingHandlerMapping extends RequestMappingInfoHandlerMapping { 
  11. //省略 
  12. } 

（3）其它一般用@Autowired来自动装配得到对象的bean，前提是要在spring容器里面注入，这个RequestMappingHandlerMapping不用注入，估计是spring里springMVC自己的机制引起的。

转载：<https://breezylee.iteye.com/blog/2160876>
