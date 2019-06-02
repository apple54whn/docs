# Spring

## 反射

**运行状态中，对于任意类、对象都可以调用其属性和方法的能力**

> 原理：javac 编译 .java文件为.class文件，JVM通过类加载器将.class文件加载到内存，用Class表示
>
> 类加载器：当程序要使用某个类时，若该类还未被加载到内存中，则系统会通过**加载，连接，初始化**对这个类进行初始化。`ClassLoader classLoader = clazz.getClassLoader();`获取类加载器；
>
> `URL resource/[InputStream inputStream] = clazz.getResource[AsStream]("application.yml");`获取classes下的任何URL资源

* `Calss c = Student.class`通过**类名**得到。多用于参数传递
* `Class c = stu.getClass()`通过**对象**得到，此方法在Object类中定义。多用于对象获取字节码
* `Class c = Class.forName(String name)`：包括包名的**全类名**。多用于**配置文件**
  - `String getName();`获取全类名；`String getPackageName();`获取包名

**同一个字节码文件(*.class)在一次程序运行过程中只会被加载一次，以上方式获取的Class对象都是同一个。**

通过反射分析类的能力：包括有**域(成员变量)**；**构造器**；**方法**；

* **不带Declare**返回类提供的**public**域、方法和构造器的**数组**，包括**超类的public成员**
* **带Declare**返回类提供的**全部**域、方法和构造器，**包括私有和保护成员**，但不包括超类的成员
  - 操作私有成员时**`setAccessible(flag)`**中flag设置为true

用途：可以**越过泛型检查**（泛型是给编译器看的）；给任意的一个对象的任意的属性**赋值**为指定的值

```java
//若类中没有域(成员变量)或者Class对象描述的是基本类型或数组类型，则返回一个长度为0的数组
Field get(Declare)Field(String name)
Field[] get(Declare)Fields()

Method get(Declare)Method(String name, Class<?>... parameterTypes)
Method[] get(Declare)Methods()

Constructor<T> get(Declare)Construcotr(Class<?>... parameterTypes)//返回一个构造器
Constructor[] get(Declare)Construcotrs()
//可以通过Constructor对象的newInstance(可传递参数列表)来创建对象；不要直接使用Class对象来创建！

setAccessible(boolean b)//为以上三种反射对象设置可访问标志，true为屏蔽java语言访问检查
```

```java
Class<Student> studentClass = (Class<Student>) Class.forName(("com.conanan.spring.Student"));
Constructor<Student> constructor = studentClass.getConstructor(String.class, int.class, String.class);
constructor.getName(); //获取构造器名称（没意义，一般就是public类的全类名，除非一个文件多个类）
Student student = constructor.newInstance("zhangsan", 33, "beijing");


Field nameField = studentClass.getDeclaredField("name");
nameField.setAccessible(true);
String fieldName = nameField.getName();//获取name Field 的名称，String
Object o = nameField.get(student);//获取name Field 的值，Object对象
nameField.set(student,"wangwu"); //设置name Field 的值


Method addMethod = studentClass.getDeclaredMethod("add", int.class, int.class); //不带参可以不写.class
String methodName = addMethod.getName(); //获取add Method 的名称，String
Object invoke = addMethod.invoke(student, 1, 2); //若是静态方法，第一个参数置null，不需要实例对象
System.out.println(invoke);//方法的返回值
```



## 动态代理

> 静态代理：字节码一上来就创建好，并完成加载。装饰者模式就是静态代理的一种体现。

动态代理：**程序运行过程**，在**内存中**动态的为目标对象**创建**一个虚拟的代理对象。字节码随用随创建，随用随加载。 

* JDK代理要求**被代理类最少实现一个接口（方法）**。 `java.lang.reflect`包下提供了`Proxy`类和`InvocationHandler`接口

  ```java
  public static void main(String[] args) {
  
      // 被代理对象
      /*final*/ Target target = new Target();// Java 8中，只要局部变量事实不变，那么final关键字可以省略
      
      // 动态创建代理对象
      TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
          target.getClass().getClassLoader(), 
          target.getClass().getInterfaces(), 
          new InvocationHandler() {
          /**
               * 被执行几次？---看代理对象调用方法几次;代理对象调用接口相应方法，都是调用该invoke方法
               * proxy：是代理对象，一般不用
               * method：代理对象调用的方法被封装为Method对象
               * args：代理对象调用方法时传递的实际参数，封装为数组，即参数列表
               */
          @Override
          public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
              // 反射知识点。使用目标对象调用目标方法并传递参数，返回目标方法的返回值。
              Object value = method.invoke(target, args);
              // retrun返回的值给代理对象
              return value;
          }
  
      });
      //调用代理对象
      int add = proxy.add(1, 2);
  }
  ```

  ```java
  public interface TargetInterface {
      int add(int a, int b); 
  }
  ```

  ```java
  public class Target implements TargetInterface {
      @Override
      public int add(int a, int b) { return a + b; }
  }
  ```

  

  增强方式：（invoke方法中）

  1. 增强**参数列**表：通过**`method.getName()`判断要增强的方法**，并对**参数`args[]`数组进行修改**
  2. 增强**方法体**执行逻辑：**反射方法`invoke()`执行前后修改**
  3. 增强**返回值**：通过**对`return`返回值的修改**

* 基于**子类的动态代理**（第三方的 **CGLib**）要求：被代理类不能是被 final 修饰的类（最终类）。

  可以使用`org.springframework.cglib.proxy`包下的`Enhancer`类和`MethodInterceptor`接口

  > Enhancer /ɪnˈhæn.sɚ/ 提高或增强
  >
  > Interceptor /ˌɪn.t̬ɚˈsep.t̬ɚ/ 拦截

  ```java
  public static void main(String[] args) {
      // 被代理对象
      /*final*/ Actor actor = new Actor(); // Java 8中，只要局部变量事实不变，那么final关键字可以省略
      
      // 代理对象
      Actor cglibActor = (Actor) Enhancer.create(actor.getClass(), new MethodInterceptor() {
          /**
               * 执行被代理对象的任何方法，都会经过该方法。在此方法内部就可以对被代理对象的任何方法进行增强。
               * 参数：
               *  前三个和基于接口的动态代理是一样的。
               *  MethodProxy：当前执行方法的代理对象。
               *  返回值：当前执行方法的返回值
               */
          @Override
          public Object intercept(Object proxy, 
                                  Method method, 
                                  Object[] args, 
                                  MethodProxy methodProxy) throws Throwable {
              String name = method.getName();
              Double money = (Double) args[0];
              Object rtValue = null;
              if ("basicAct".equals(name)) {
                  //基本演出，代理扣除1/10
                  rtValue = method.invoke(actor, money * 0.9);
              }
              if ("dangerAct".equals(name)) {
                  //危险演出，代理扣除2/10
                  rtValue = method.invoke(actor, money * 0.8);
              }
              return rtValue;
          }
      });
      System.out.println(cglibActor.basicAct(10000)); //演员拿4500
      System.out.println(cglibActor.dangerAct(10000)); //演员拿6000
  }
  ```

  ```java
  //被代理类
  public class Actor {
      public double basicAct(double money){ return money*2/4; } // 普通表演，演员拿2/4
      public double dangerAct(double money){ return money*3/4; } // 危险表演，演员拿3/4
  }
  ```








## Spring 中用到的设计模式

* **工厂方法模式**：BeanFactory/ApplicationContext用到
* **单例模式**：Spring默认的Bean为单例，可通过Scope修改
* **代理模式**：AOP使用了，JDK动态代理/CGLib
* **模板方法模式**：RestTemplate，JdbcTemplate等
* ……



## IoC 与 DI

一个概念的不同角度的解释：

* IoC：控制反转，**对象**的**创建、销毁，之间的关系**由IoC容器来控制
* DI：依赖注入，**被注入对象依赖IoC容器配置**（它）



## AOP

- **@EnableAspectJAutoProxy**：开启注解AOP
- **@Aspect**：切面类
  - **@Pointcut**：切点，execution表达式
  - **Advice**：通知
    - @Before / AfterReturning / AfterThrowing / After：前置，后置，异常，最终通知
    - @Around：环绕通知，通过ProceedingJoinPoint对象调用proceed方法

## Spring Bean 的作用域/生命周期

`@Scope`：用于指定bean的作用范围。也可以放置注解在定义的4个组件上

- `value`指定范围的取值。常用有：
  - **singleton**：默认**单例**，一个应用只有一个对象的实例，IoC容器启动时会创建对象并放入容器。**生命周期同容器**
    - `@Lazy`：懒加载，修改单例对象创建时间，变为获取对象时才创建，但还是单例
  - **prototype**：**多例**，每次**获取**对象时，都会**重新创建**对象实例。**长时间不使用，且没有别的对象引用时，GC回收**
  - **request**：WEB 项目中，Spring 为**每个请求**创建一个bean实例，请求完成后则GC回收
  - **session**：WEB 项目中，Spring 为**每个会话**创建一个bean实例，Session过期后则GC回收
  - global-session：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session



## SpringMVC 的流程

> ClassPathXmlApplicationContext、AnnotationConfigApplicationContext

SpringMVC是一个 Java实现MVC模型的轻量级WEB框架。底部封装了ServletAPI。

> 启动Tomcat，根据load-on-startup来决定何时创建DispatcherServlet：默认-1则访问时创建；非负整数则按顺序创建（>=1）

1. 客户端发送HTTP请求到前端控制器**DispatcherServlet**
2. DispatcherServlet调用**HandlerMapping**根据URL找到对应@**RequestMapping的Controller**，生成对象并返回给DS
3. DispatcherServlet通过**HandlerAdapter**调用Controller执行逻辑，返回**ModelAndView**给DS
4. DispatcherServlet将ModelAndView传给**ViewResolver**，**解析后返回具体View给DS**
5. DispatcherServlet**对View进行渲染并响应给客户端**
6. 若指定了@**ResponseBody**注解，则返回JSON字符串，不会再去查找视图



## 过滤器和拦截器区别

* Filter**依赖于Servlet容器**；Interceptor是Spring MVC框架的，**不依赖Servlet容器**
* Filter在配置了`/*`后，可以对**所有要访问的资源进行拦截**。`/`仅不拦截JSP；Interceptor只会**拦截访问控制器的方法**





## 为什么使用Spring Boot

* Spring Boot是为了解决依赖管理麻烦、配置繁重等问题。其中最核心的两个功能为：
  * 起步依赖：本质利用Maven的依赖传递功能，非常简单即可引入需要的jar包
  * 自动配置：Spring Boot采用约定大于配置的理念，启动类上有@SpringBootApplication注解，通过@EnableAutoConfiguration来加载spring.factories中记录的类xxAutoConfiguration类，完成自动配置。