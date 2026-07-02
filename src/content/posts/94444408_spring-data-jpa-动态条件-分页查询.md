---
title: "spring-data-jpa 动态条件 分页查询"
pubDatetime: 2019-07-02T15:09:45.000Z
description: "文章浏览阅读298次。本文详细介绍如何在Spring Boot项目中使用JPA进行数据库操作，包括pom.xml配置、数据库连接配置、实体类定义、DAO层接口编写、Service层业务逻辑实现及Controller层接口设计。通过Postman测试接口，展示完整的开发流程。"
tags: []
draft: false
---
## pom.xml配置
[code] 
    <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
     </dependency>
    
[/code]

## 数据库连接配置
[code] 
    ############################################################
    #
    # 数据源配置 
    #
    ############################################################
    spring.datasource.url=jdbc:mysql://localhost:3306/xxxx
    spring.datasource.username=xxxx
    spring.datasource.password=xxxx
    spring.datasource.driver-class-name=com.mysql.jdbc.Driver
    spring.datasource.druid.initial-size=1
    spring.datasource.druid.min-idle=1
    spring.datasource.druid.max-active=20
    spring.datasource.druid.test-on-borrow=true
    spring.datasource.druid.stat-view-servlet.allow=true
[/code]

## 实体类user ，省去部分字段及set、get方法
[code] 
    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    import javax.persistence.Table;
    import javax.validation.constraints.NotNull;
     
    @Entity
    @Table(name = "gr_user")
    public class User {
    	@Id
    	@GeneratedValue(strategy = GenerationType.IDENTITY)
    	private Integer id;
    	
    	@NotNull(message="不能为空")
    	@Column(name="name")
        private String name;
    	
        private String pwd;
     
        private String nick;
        @Column(name="role_id")
        private String roleId;
        
        @Column(name="depart_id")
        private String departId;
[/code]

## dao层用UserRepository
[code] 
    import org.springframework.data.jpa.repository.JpaRepository;
     
    public interface UserRepository extends JpaRepository<User, Integer>  {
    	 
    }
[/code]

## userService层用 UserService 
[code] 
    @Service
    @Transactional
    public class UserService {
     
    	@Autowired
    	private UserRepository userRepository;
        
        	public Page<User> findByPage(User user, Integer pageNum, Integer pageSize){
    		Pageable pageAble = new PageRequest(pageNum,pageSize,new Sort(Direction.DESC,"id"));
    		Specification<User> spec = new Specification<User>() {
    			private static final long serialVersionUID = -594262632507712037L;
    			@Override
    			public Predicate toPredicate(Root<User> root, CriteriaQuery<?> crite, CriteriaBuilder cb) {
    				List<Predicate> pr = new ArrayList<>();
    				if( user!= null && user.getName() != null){
    					pr.add(cb.like(root.get("name").as(String.class), "%"+user.getName()+"%"));
    				  //  pr.add(cb.like(root.<String>get("name"), "%"+user.getName()+"%"));
    				}
    				return cb.and(pr.toArray(new Predicate[pr.size()]));
    			}
    		};
    		return userRepository.findAll(spec,pageAble);
    	}
     
     
     
    }
[/code]

## usercontroller
[code] 
    @RestController
    @RequestMapping("/user")
    public class UserController {
    	
    	@Autowired
    	private UserRepository userRep;
    	@Autowired
    	private UserService userService;
     
        @RequestMapping("/page")
    	//@RequestBody(required=false)不校验参数为空的
    	public Page<User> findByPage(@RequestBody(required=false) User user,
    			@RequestParam(required=false) Integer pageNum,
    			@RequestParam(required=false) Integer pageSize ){
    		if(pageNum == null){
    			pageNum = 0;
    		}
    		if(pageSize == null){
    			pageSize = 10;
    		}
    		return userService.findByPage(user, pageNum, pageSize);
    	}
     
     
     
    }
[/code]

## 测试 Postman

![](/assets/94444408_0.png)

测试结果

![](/assets/94444408_1.png)

转载自：<https://blog.csdn.net/sinat_38314794/article/details/81083112>
