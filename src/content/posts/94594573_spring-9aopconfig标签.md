---
title: "Spring 9：aop:config标签"
pubDatetime: 2019-07-04T09:34:59.000Z
description: "文章浏览阅读438次。本文深入解析Spring AOP的配置方法，包括aop:config标签的使用、切入点表达式详解，以及通过XML和注解两种方式配置AOP的实例。涵盖了Spring AOP的核心概念，如代理对象、通知类型、切面、连接点等，帮助读者全面理解并掌握Spring AOP的应用。"
tags: []
draft: false
---
#### aop:config标签

使用aop的专用标签来完成相关的配置.（AOP标签库）  
其中主要表现是使用AspectJ的expression的操作:  

[code] 
    execution(modifiers-pattern ret-type-pattern
        declaring-type-pattern name-pattern(param-pattern)
[/code]

throws-pattern)除了返回类型模式,名字模式和参数模式以外,  
所有的部分都是可选的。 返回类型模式决定了方法的返回类型必须依次  
匹配一个连接点。 你会使用的最频繁的返回类型模式是 *,它代表了匹  
配任意的返回类型。 一个全称限定的类型名将只会匹配返回给定类型的方  
法。名字模式匹配的是方法名。 你可以使用 * 通配符作为所有或者部分  
命名模式。 参数模式稍微有点复杂:() 匹配了一个不接受任何参数的方  
法, 而 (..) 匹配了一个接受任意数量参数的方法(零或者更多)。  
模式 (*) 匹配了一个接受一个任何类型的参数的方法。 模式  
(*,String) 匹配了一个接受两个参数的方法,第一个可以是任  
意类型,第二个则必须是String类型  
注意在使用之前需要在xml文件的beans标签中加入新的schame文件:并在Eclipse中进行关联配置
[code] 
     <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:tx="http://www.springframework.org/schema/tx"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
               http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
               http://www.springframework.org/schema/context
               http://www.springframework.org/schema/context/spring-context-3.2.xsd
               http://www.springframework.org/schema/aop
               http://www.springframework.org/schema/aop/spring-aop-3.2.xsd">
    
[/code]

下面给出一些常见切入点表达式的例子。 

  
1)任意包下的任意类中的公共方法的执行: 
[code] 
    execution(public * *(..))
[/code]

2)任何一个以“set”开始的方法的执行:   

[code] 
    execution(* set*(..))
[/code]

3)AccountService 接口的任意方法的执行: 
[code] 
     execution(* com.briup.service.AccountService.*(..))
[/code]

4)定义在service包里的任意方法的执行: 
[code] 
    execution(* com.briup.service.*.*(..))
[/code]

5)定义在service包或者子包里的任意方法的执行: 
[code] 
    execution(* com.briup.service..*.*(..))
        
        execution(* com.briup.service..*.*(..)) or execution(* com.briup.dao..*.*(..))
[/code]

注意:  
1.从spring容器中拿代理对象的时候也是要用目标对象的名字来拿。  
2.没有实现任何接口的目标对象也能产生代理对象。  

[code] 
     <!-- 配置aop的代理 -->
        <aop:config>
            <!-- 定义一个切入点 并给切入点起名为myPointCut -->
            <!-- 切入点是一组连接点的集合 -->
            <aop:pointcut expression="execution(public * com.briup.aop.service.*.*(..))" id="myPointCut"/>
     
            <!-- 定义哪一个advice在哪一个切入点上面起作用 -->
            <aop:advisor advice-ref="beforeAdvice" pointcut-ref="myPointCut" />
        </aop:config>
        <!--
            expression="execution(public * com.briup.aop.service.*.*(..))"
            这个引号""里面就是用表达式的方式来定义切入点,只要是符合我们这个表达式要求的
            方法就是我们的连接点,连接点的集合就是我们要定义的切入点。
            表达式中从左到右的*号:
                第一个* 表示方法的返回类型不限。
                第二个* 表示包中的任意一个类
                第三个* 表示类中的任意一个方法
                
            同时方法的参数也没有限制.
         -->
[/code]

注意:<aop:config proxy-target-class="true"> 如果这样配置则是强制使用CGLIB方式进行代理
[code] 
    例：
    1.配置文件xml
     
    <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
              http://www.springframework.org/schema/beans/spring-beans.xsd
              http://www.springframework.org/schema/aop
              http://www.springframework.org/schema/aop/spring-aop.xsd
              ">
            <!-- 配置目标对象 -->
            <bean name="target" 
            class="com.briup.pojo.BookServiceImpl"></bean>
            <bean name="target1"
            class="com.briup.pojo.ProductService"></bean>
            <!-- 配置通知 -->
           <bean name="around" 
           class="com.briup.aop.spring.around.AroundAdviceTest"></bean>
              <!-- proxy-target-class构建代理对象的方式
              						true cglib代理
              						false jdk代理
            目标对象直接配置bean，
            获取代理对象基于bean标签的名字  						
             -->
    	<aop:config proxy-target-class="true">
    		<!-- 配置切面（目标对象哪些方法生效）
    		expression表达式
    		id 选中方法构建切面的名字
    		com.briup.pojo.BookServiceImpl.saveBook(long, String)
    		com.briup.pojo.ProductService.saveProduct(long, String)
    		 com.briup.pojo.*.save*(..)
    		 注意：用该中方式配置切面
    		 在构建目标对象方法的时候要注意方法名字
    		 的书写 saveXXX
    		 -->
    		<!-- <aop:pointcut expression="execution(* com.briup.pojo.*.save*(..))" 
    		id="mypointcut"/> -->
    		<!-- 配置通知 切面
    		通知和切面绑定
    		pointcut直接写表达式
    		pointcut-ref指向表达式对象
    		pointcut|pointcut-ref一般情况只写一个
    		 -->
    		<!-- <aop:advisor advice-ref="around"
    				 pointcut-ref="mypointcut"/> -->
    		<aop:advisor advice-ref="around"
    				 pointcut="execution(* com.briup.pojo.*.save*(..))"/>
    	</aop:config>
    </beans>
     
     
    2.测试类：
     
    package com.briup.aop.spring.aopConfig;
     
    import org.springframework.context.support.ClassPathXmlApplicationContext;
     
    import com.briup.pojo.BookService;
    import com.briup.pojo.ProductService;
     
    public class aopConfigTest {
    	public static void main(String[] args) {
    		ClassPathXmlApplicationContext cp=
    				new ClassPathXmlApplicationContext(
    						"com/briup/aop/spring/aopConfig/aopConfig.xml");
    		BookService bs=
    		cp.getBean("target",BookService.class);
    		bs.saveBook(1, "lisi");
    		bs.list();
    		ProductService ps=
    				cp.getBean("target1",ProductService.class);
    		ps.saveProduct(1, "lisi");
    		ps.getProduct();
    	}
    }
[/code]

※ 自定义通知类（自定义方法）

需要：[aspectjweaver.jar包](<https://pan.baidu.com/s/1OR9AsA9KBh-6xgSbxAwfeg>)

在一个切面类中定个多个方法,根据xml文件的配置每个方法都可以织入到切入点的  
不同位置,并且advice是在aop的标签中进行配置,不需要再写对应的advice类了  
例如:
[code] 
    //这个类相当于我们之前的切面类
        //只不过这个切面类中有很多方法都可以织入到切入点上面
        //我们可以控制把这里的任何一个方法织入到任何一个切入点上面
        public class XmlHandler {
            
            public void beforeTest(JoinPoint p){
                System.out.println(p.getSignature().getName()+" before...");
            }
            
            
            public void afterTest(JoinPoint p){
                System.out.println(p.getSignature().getName()+" after...");
            }
            
            public void afterReturningTest(JoinPoint p){
                
                System.out.println(p.getSignature().getName()+" afterReturning");
                
            }
            
            //在和aroundAdvice结合的时候,这个方法一定要加上这个ProceedingJoinPoint类型的参数
            public Object aroundTest(ProceedingJoinPoint pjp)throws Throwable{
                //JoinPoint对象不能调用连接点所表示的方法
                //ProceedingJoinPoint能调用连接点所表示的方法 pjp.proceed()
                System.out.println(pjp.getSignature().getName()+" is start..");
                //调用到连接点方法
                Object obj = pjp.proceed();
                System.out.println(pjp.getSignature().getName()+" is end..");
                return obj;
            }
            
            public void throwingTest(JoinPoint p,Exception ex){
                System.out.println(p.getSignature().getName()+" is throwing..."+ex.getMessage());
                
            }
        }
        
        xml文件配置:
        <!-- 配置dao层对象 -->
        <bean id="dao"
            class="com.briup.aop.dao.AccountDaoImpl"/>
        <!-- 配置目标对象 -->
        <bean name="target"
        class="com.briup.aop.service.AccountServiceImpl">
                <property name="accountDao" ref="dao"></property>
        </bean>
        <!-- 配置切面类 -->
        <bean name="handler" class="com.briup.aop.xml.XmlHandler"></bean>
        
        <!-- 配置aop的代理 -->
        <aop:config>
            <!-- 定义切入点名为myPointCut -->
            <aop:pointcut expression="execution(public * com.briup.aop.service.*.*(..))" id="myPointCut"/>
            
            <!-- 定义切面类 以及需要使用的advice -->
            <aop:aspect id="aspect" ref="handler">
                <!-- 表示beforeAdvice会把切面类handler中的beforeTest方法织入到名字叫myPointCut的切入点上面 -->
                <aop:before method="beforeTest" pointcut-ref="myPointCut"/>
     
                <!-- after表示不管方法是否正常结束都会起作用 -->
                <aop:after method="afterTest" pointcut-ref="myPointCut"/>
     
                <!-- after-returning表示方法正常结束才会起作用(抛异常时候不起作用) -->
                <aop:after-returning method="afterReturningTest" pointcut-ref="myPointCut"/>
     
                <aop:around method="aroundTest" pointcut-ref="myPointCut"/>
     
                <!-- throwing="ex"表示throwingTest方法中接收异常对象的名字一定要是ex -->
                <aop:after-throwing method="throwingTest" pointcut-ref="myPointCut" throwing="ex"/>
     
            </aop:aspect>
        </aop:config>
[/code]

注意:<aop:config proxy-target-class="true"> 如果这样配置则是强制使用CGLIB方式进行代理
[code] 
    例：
    1.自定义通知类
     
    package com.briup.aop.spring.defineAopConfig;
     
    import java.util.Arrays;
     
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.ProceedingJoinPoint;
     
    /*
     * 自定义通知类（自定义的方法)
     */
    public class DefineNoticeAdvice {
    		/*
    		 * 前置通知，
    		 * 参数必须是joinpoint
                     * 
    		 */
    	public void beforeTest(JoinPoint point){
    		System.out.println("before......");
    	}
    	/*
    	 * 后置通知
    	 */
    	public void after(JoinPoint point){
    		//获取方法的镜像
    //		System.out.println(point.getSignature());
    //		//获取方法镜像的名字
    //		System.out.println(
    //				point.getSignature().getName());
    		//获取目标对象方法执行的参数
    //		System.out.println(
    //				Arrays.toString(point.getArgs()));
    		//获取目标对象
    //		System.out.println(point.getTarget());
    //		System.out.println(point.getThis());
    		System.out.println("after....");
    	}
    	public void afterReturn(JoinPoint point){
    		System.out.println("after1.....");
    	}
    	public Object 
    		around(ProceedingJoinPoint point){
    //		System.out.println(point.getTarget());
    //		System.out.println(point.getThis());
    //		System.out.println(point.getSignature());
    //		System.out.println(point.getArgs());
    		Object obj=null;
    		try {
    			System.out.println("before.....");
    			//执行目标对象中的方法
    			obj=point.proceed();
    			System.out.println("after....");
    		} catch (Throwable e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		return obj;
    	}
    	/*
    	 * 异常通知的方法
    	 * 第一个参数joinPoint
    	 * 第二个参数异常类
    	 */
    	public void 
    	throwE(JoinPoint point,Exception ex){
    		System.out.println(
    				"exception..."+ex.getMessage());
    	}
    }
     
     
     
     
    2.配置文件xml
     
    <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
              http://www.springframework.org/schema/beans/spring-beans.xsd
              http://www.springframework.org/schema/aop
              http://www.springframework.org/schema/aop/spring-aop.xsd
              ">
              <!-- 配置目标对象 -->
             <bean name="target" 
           		 class="com.briup.pojo.BookServiceImpl"></bean>
           	 <bean name="target1"
           		 class="com.briup.pojo.ProductService"></bean>
             <!-- 自定义通知类的绑定 -->
             <bean name="notice" 
             class="com.briup.aop.spring.defineAopConfig.DefineNoticeAdvice"></bean>
              <aop:config>
              	<!-- 指定切面 -->
              	<aop:pointcut expression="execution(* com.briup.pojo.*.save*(..))"
              	 id="mypointcut"/>
             	<!-- 指定方法和切面绑定
                    此时需要添加jar包aspectjweaver.jar(如何把通知作用在切面上，切面的植入）
             	ref指向自定义通知的类-->
             	<aop:aspect ref="notice">
             		<!--method指向自定义类中的方法 
             		pointcut写表达式，作用与哪些方法
             		pointcut-ref 指向切面对象
             		 -->
             		 <!-- 前置通知 -->
             		<!-- <aop:before method="beforeTest" 
             					pointcut-ref="mypointcut"/> -->
             		<!-- 后置通知 ,目标对象执行方法
             		出异常的时候一定执行的通知 -->
             				<!-- <aop:after method="after"
             				pointcut-ref="mypointcut"/> -->
             				<!-- 后置通知，目标对象执行方法
             		出异常的时候不执行的通知 --> 
             				<!-- <aop:after-returning method="afterReturn"
             				pointcut-ref="mypointcut"/> -->
             				<!-- 环绕通知 -->
             				<!-- <aop:around method="around"
             				pointcut-ref="mypointcut"/> -->
             				<!-- 异常通知
             				throwing异常的名字
             				注意:该名字和自定义通知中方法的
             				参数保持一致
             				 -->
             				<aop:after-throwing method="throwE"
             				pointcut-ref="mypointcut"
             						throwing="ex"/>
             	</aop:aspect>
              </aop:config>
     </beans>   
     
     
     
           
    3. 测试类：
     
    package com.briup.aop.spring.defineAopConfig;
     
    import org.springframework.context.support.ClassPathXmlApplicationContext;
     
    import com.briup.pojo.BookService;
    import com.briup.pojo.ProductService;
     
    public class defineNoticeaopConfigTest {
    	public static void main(String[] args) {
    		ClassPathXmlApplicationContext cp=
    				new ClassPathXmlApplicationContext(
    						"com/briup/aop/spring/defineAopConfig/defineaopconfig.xml");
    		BookService bs=
    		cp.getBean("target",BookService.class);
    		bs.saveBook(1, "lisi");
    		bs.list();
    //		ProductService ps=
    //				cp.getBean("target1",ProductService.class);
    //		ps.saveProduct(1, "lisi");
    //		ps.getProduct();
    	}
    }
[/code]

※ 使用注解配置AOP:其实就是在上面的类XmlHandler中加入上注解,然后去掉xml中的aop标签配置,这里把类改名为AnnotationHandler,  

[code] 
    例子:
        @Component
        @Aspect
        public class AnnotationHandler {
            /*
             * 在一个方法上面加上注解来定义切入点
             * 这个切入点的名字就是这个方法的名字
             * 这个方法本身不需要有什么作用
             * 这个方法的意义就是:给这个 @Pointcut注解一个可以书写的地方
             * 因为注解只能写在方法、属性、类的上面,并且方法名作为切入点的名字
             * */
            @Pointcut("execution(public * com.briup.aop.service..*.*(..))")
            public void myPointCut(){}
            
            //注:这里面的所有方法的JoinPoint类型参数都可以去掉不写,如果确实用不上的话
            @Before("myPointCut()")
            public void beforeTest(JoinPoint p){
                System.out.println(p.getSignature().getName()+" before...");
            }
            
            
            /*
             * @After和@AfterReturning
             *
             * @After标注的方法会在切入点上的方法结束后被调用(不管是不是正常的结束).
             * @AfterReturning标注的方法只会在切入点上的方法正常结束后才被调用.
             * */
            @After("myPointCut()")
            public void afterTest(JoinPoint p){
                System.out.println(p.getSignature().getName()+" after...");
            }
            @AfterReturning("myPointCut()")
            public void afterReturningTest(JoinPoint p){
                
                System.out.println(p.getSignature().getName()+" afterReturning");
                
            }
            
            @Around("myPointCut()")
            public Object aroundTest(ProceedingJoinPoint pjp)throws Throwable{
                System.out.println(pjp.getSignature().getName()+" is start..");
                //调用连接点的方法去执行
                Object obj = pjp.proceed();
                System.out.println(pjp.getSignature().getName()+" is end..");
                return obj;
            }
            
            
            
            //在切入点中的方法执行期间抛出异常的时候,会调用这个 @AfterThrowing注解所标注的方法
            @AfterThrowing(value="myPointCut()",throwing="ex")
            public void throwingTest(JoinPoint p,Exception ex){
                System.out.println(p.getSignature().getName()+" is throwing..."+ex.getMessage());
                
            }
            
        }
        
        xml配置:注意给例子中使用的其他的类上面也使用注解
        <aop:aspectj-autoproxy/>
        <context:component-scan base-package="com.briup.aop"/>
[/code]

注意:<aop:aspectj-autoproxy proxy-target-class="true"/>这样配置则是强制使用CGLIB进行代理
[code] 
    例：
    1.
     
    package com.briup.pojo;
     
    import org.springframework.stereotype.Component;
    import org.springframework.stereotype.Controller;
    import org.springframework.stereotype.Repository;
    import org.springframework.stereotype.Service;
     
    @Component("target")
    //@Controller
    //@Service
    //@Repository
    public class BookServiceImpl
    	implements BookService{
    	
    	@Override
    	public void saveBook(long id, String name) {
    		// TODO Auto-generated method stub
    		System.out.println("saveBook....");
    		//int i=10/0;
    	}
     
    	@Override
    	public String get(long id) {
    		// TODO Auto-generated method stub
    		System.out.println("get....");
    		return "test...ok";
    	}
     
    	@Override
    	public void list() {
    		// TODO Auto-generated method stub
    		System.out.println("list....");
    	}
     
    	@Override
    	public void setTest() {
    		// TODO Auto-generated method stub
    		System.out.println("set.....");
    	}
     
    	@Override
    	public int getAge() {
    		// TODO Auto-generated method stub
    		System.out.println("getAge()....");
    		return 23;
    	}
     
    }
     
     
    package com.briup.pojo;
     
    import org.springframework.stereotype.Component;
     
    @Component("target1")
    public class ProductService {
    	public void saveProduct(long id,String name){
    		System.out.println("saveProduct...");
    	}
    	public int getProduct(){
    		System.out.println("getProduct....");
    		return 33;
    	}
    }
     
     
    2.自定义通知类
     
    package com.briup.aop.spring.AnnoAopConfig;
     
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.After;
    import org.aspectj.lang.annotation.AfterReturning;
    import org.aspectj.lang.annotation.AfterThrowing;
    import org.aspectj.lang.annotation.Around;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.stereotype.Component;
     
    /*
     * 自定义通知类（自定义的方法)
     * @Aspect表示单前类中的方法全是
     * 作用切面上的通知
     * 1.注解的方式构建切面(方法)
     * 2.通知上面加入注解 
     */
    @Component
    @Aspect
    public class AnnoNoticeAdvice {
    		/*
    		 * 构建切面的方法，切面的名字
    		 * 就是methodName(),
    		 * 该方法不使用
    		 */
    		//@Pointcut(value="")
    		@Pointcut("execution(* com.briup.pojo.*.save*(..))")
    		public void mypointcut(){}
    		/*
    		 * 前置通知，
    		 * 参数必须是joinpoint
    		 * @Before注解该方法前置通知
    		 * 参数是切面的名字
    		 */
    	@Before("mypointcut()")
    	public void beforeTest(JoinPoint point){
    		System.out.println("before......");
    	}
    	/*
    	 * 后置通知
    	 */
    	@After("mypointcut()")
    	public void after(JoinPoint point){
    		//获取方法的镜像
    //		System.out.println(point.getSignature());
    //		//获取方法镜像的名字
    //		System.out.println(
    //				point.getSignature().getName());
    		//获取目标对象方法执行的参数
    //		System.out.println(
    //				Arrays.toString(point.getArgs()));
    		//获取目标对象
    //		System.out.println(point.getTarget());
    //		System.out.println(point.getThis());
    		System.out.println("after....");
    	}
    	@AfterReturning("mypointcut()")
    	public void afterReturn(JoinPoint point){
    		System.out.println("after1.....");
    	}
    	@Around("mypointcut()")
    	public Object 
    		around(ProceedingJoinPoint point){
    //		System.out.println(point.getTarget());
    //		System.out.println(point.getThis());
    //		System.out.println(point.getSignature());
    //		System.out.println(point.getArgs());
    		Object obj=null;
    		try {
    			System.out.println("before.....");
    			//执行目标对象中的方法
    			obj=point.proceed();
    			System.out.println("after....");
    		} catch (Throwable e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		return obj;
    	}
    	/*
    	 * 异常通知的方法
    	 * 第一个参数joinPoint
    	 * 第二个参数异常类
    	 * @AfterThrowing中throwing对应的名字和参数
    	 * 异常的名字一致
    	 */
    	@AfterThrowing(value="mypointcut()",
    			throwing="ex")
    	public void 
    	throwE(JoinPoint point,Exception ex){
    		System.out.println(
    				"exception..."+ex.getMessage());
    	}
    }
     
     
     
     
    3.配置文件
     
    <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
              http://www.springframework.org/schema/beans/spring-beans.xsd
              http://www.springframework.org/schema/aop
              http://www.springframework.org/schema/aop/spring-aop.xsd
              http://www.springframework.org/schema/context
              http://www.springframework.org/schema/context/spring-context.xsd
              ">
              <!-- 配置目标对象 -->
             <!-- <bean name="target" 
           		 class="com.briup.pojo.BookServiceImpl"></bean>
           	 <bean name="target1"
           		 class="com.briup.pojo.ProductService"></bean> -->
           <!-- 自动给当前的目标对象绑定通知
           获取代理对象基于目标对象bean标签的名字
            -->
            <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
            <context:component-scan 
            base-package="com.briup.aop.spring.AnnoAopConfig,com.briup.pojo"></context:component-scan>
     </beans>   
     
     
     
    4.测试类：
     
    package com.briup.aop.spring.AnnoAopConfig;
     
    import org.springframework.context.support.ClassPathXmlApplicationContext;
     
    import com.briup.pojo.BookService;
    import com.briup.pojo.ProductService;
     
    public class AnnoaopConfigTest {
    	public static void main(String[] args) {
    		ClassPathXmlApplicationContext cp=
    				new ClassPathXmlApplicationContext(
    						"com/briup/aop/spring/AnnoAopConfig/annoaopconfig.xml");
    		BookService bs=
    		cp.getBean("target",BookService.class);
    		bs.saveBook(1, "lisi");
    		bs.list();
    //		ProductService ps=
    //				cp.getBean("target1",ProductService.class);
    //		ps.saveProduct(1, "lisi");
    //		ps.getProduct();
    	}
    }
[/code]

转载自：<https://blog.csdn.net/qq_42857603/article/details/83385102>
