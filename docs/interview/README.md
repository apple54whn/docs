# Java 基础

## 面向对象的三大特性

* **封装**：是指将**类的实现细节隐藏**起来，然后通过**公共的方法暴露**出该类的功能。

* **继承**：继承是面向对象实现**软件复用**的重要手段，是使用已存在的类作为基础建立新类的技术。

  但是继承是强耦合且破坏了封装性。

* **多态**：**一个对象有多种形态**，就是用同一对象调用同一方法但是做了不同的事。

  > 方法重载（@overload）实现编译时多态性；方法重写（@override）实现运行时多态性。

  实现运行时多态前提：**继承或实现**；**方法的重写**（不重写无意义）；**父类引用指向子类对象**（即向上转型）。

* 抽象：将一类事物抽取我们所关注的属性和行为，形成新的事物的思维过程。
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger STOP
This is a dangerous warning
:::




## JRE 和 JDK & 跨平台

- JRE(Java Runtime Environment)：是Java程序的运行时环境，包含 **JVM** 和运行时所需要的**核心类库** 。
- JDK (Java Development Kit)：是Java程序开发工具包，包含 **JRE** 和**开发人员使用的工具**。



## & 和 && 区别

* 都可以作为**逻辑与运算符**，运算符两边都为 true 时结果才为 true；
* && 还有**短路功能**，运算符左边为 false ，则不再计算右边的值；& 则需要都计算
* **& 可以做位运算符**，& 两边表达式不是布尔类型时表示按位与。整数与0x0F按位与表示取最低4位



## char 类型变量能否存储一个中文汉字？

char型变量是用来存储Unicode编码的字符的，读取到JVM中时会将字符编码转为UTF-16来存储，占两个字节，可以存储大部分非生僻字。（UTF-8位不定长，3个字节存储中文汉字。）



## Integer 与int 的区别

* int为基本数据类型，在堆中默认值为0；
* Integer为int类型的包装类型，在堆中默认值为null；可以区分出未赋值与0的区别；

## 静态变量和实例变量的区别

* **语法**：静态变量加**static**；实例变量不用加
* 运行时：
  * 静态变量属于类，只要程序加载了类的字节码，就能使用
  * 实例变量属于对象的属性，必须创建了对象，才能使用



## == & equals

- `==`：都是比较变量在内存（栈）中的值。**基本类型**：比较值是否相等；**引用类型**：比较地址值是否相等
- `equals()`：只能比较**引用类型**，底层调用`==`，比较地址值是否相等。一般根据需要重写，`String`重写了



## 作用域 private，，protected，public以及不写时的区别

* private：类访问权限
* 不写：包访问权限
* protected：子类访问权限、包访问权限
* public：都能被访问

外部类的修饰符只能是 public 或默认；类的成员（包括内部类）的修饰符可以是以上四种

一个Java文件中可以有多个类，但是public修饰的只能有一个，且类名和文件名一致！



## overload 和 overrid 的区别

* 重载：**同一类**中**方法名相同**，**参数列表不同**(类型 或 个数 或 多类型顺序 不同)

  与访问修饰符、返回值类型（可能只调用，不需要返回值）、参数名无关！

* 重写：**父子类**中，**方法名**、**参数列表必须相同**（不同则是特有方法）。满足以下条件为重写：

  * **访问权限**必须大于等于父类权限

  * **返回值类型**，对象类型必须小于等于父类（如Object、String）；基本类型必须一致！

  * **抛出的异常类型**小于等于父类方法的异常类型

    ```java
    class Father {
    
        int show(int a, int b) throws IOException { //重写中，子类方法抛出异常类型必须小于等于父类方法
            return 0;
        }
    }
    //下面哪些方法可以出现在Father的子类中？
    public/private/... short show(int a, long b){return 0;}//参数列表都不同了，是子类特有方法
    public int show(int a,int b){return 0;}//可以，方法重写
    private int show(int a,int b){return 0;}//不可以，权限小
    public short show(int a, int b){return 0;}//不可以，返回类型为基本类型必须一致！
    static int show(int a, int b){return 0;}//不可以，条件都满足，但是静态方法只能覆盖静态方法！！！
    ```

    若父类中有**私有方法、静态方法**，因为和**类相关**，子类也可以存在完全一样的方法，**不是重写**！



## 抽象类和接口的区别

* 接口中**没有成员变量**，**常量是静态其赋值**的，默认修饰符`[public static final]`；而抽象类都可以有

* 接口**没有静态代码块、构造代码块、构造方法**（其实现类继承`Object`，提供无参构造）；抽象类中都可以有

* 接口中**抽象方法有默认修饰符**`[public abstract]`。在Java 8 后有**默认方法可以实现**，有**静态方法**，但只能接口名调用！

  抽象类可以有抽象方法（用`abstract`修饰，除了不可以用`private`来权限修饰）或非抽象方法（也可以有静态方法）

  > 实现类实现的多个接口中，存在**重复的抽象方法**，那么**只需重写一次**即可
  >
  > 实现类实现的多个接口中，存在**重复的默认方法**，那么**必须重写**冲突的默认方法
  >
  > 实现类的**直接父类中的方法**和**接口中默认方法产生冲突**，则优先**使用父类**中的方法

* 一个类可以**实现多个接口（接口之间可以多继承）**，但**只能继承一个类**（包括抽象类）

* 一个类实现接口**必须实现除默认方法、静态方法外的所有抽象方法**，除非它是抽象类；继承抽象类同此

* 接口是**自上而下**，定义**通信规范**；抽象类是**自底而上**的设计，在子类中重复出现的工作，**抽象**到抽象类中



接口和抽象类的选择

* 如果要创建不带任何方法定义和成员变量的基类，那么就应该选择接口而不是抽象类
* 只有在必须要有方法定义和成员变量的时候，才应该选择抽象类



## String、StringBuffer、StringBuilder

- `String`对象**不可变**（引用可变），线程**安全**。**重写了`equals`和`hashCode`方法**
  - `String`**类**及其所有**属性如`char[]`（Java 9为`byte[]`）都被声明为`final`**，其**值在创建后不能被更改**
  - 由于它的不可变性，类似拼接，裁剪等操作，都**可能产生新的String对象**（取决于常量池中是否存在），对性能有影响。
  - ==**只有**通过引号**直接赋值**的方式定义的会放入字符串常量池中==；但是`new String`方式定义的**不会放入字符串常量池**
  - 字符串若是==**变量相加，先开空间再拼接**==；若是==**常量先加，然后在常量池中找**==，==有就返回，没有就创建==。
- **StringBuffer是同步的，数据安全，效率低；StringBuilder是不同步的，数据不安全，效率高**；都是可变的
  * 底层是维护了`char[]`（Java 9为`byte[]`），内部数组初始值为16。扩容利用了`System.arrayCopy()`方法
  * 但是这俩都**没有重写`equals`和`hashCode`方法**。作为元素放入Hash类集合中时会出现问题



* 下述两种方法分别创建了几个 Sring 对象？

  ```java
  // 第一种：直接赋一个字面量
  String str1 = "ABCD";
  // 第二种：通过构造器创建
  String str2 = new String("ABCD");
  ```

  * 第一个：最多创建一个String对象，最少不创建String对象。

    如果常量池中存在`ABCD`，那么str1直接引用，此时不创建String对象；否则先在常量池中创建`ABCD`内存空间再引用

  * 最多创建两个String对象，至少创建一个String对象。

    new关键字绝对会在堆空间创建一块新的内存区域，所以至少创建一个String对象



## 数组有length属性，String有length()



## try...finally return 问题

```java
public static int fin() {
    int a = 10;
    try {
        return a;
    } finally {
        a = 40;
        return a; //最终返回40。这里若修改为return 4，最终就返回4
        // 若没有return a;这行代码，则无论a怎么变化，还是会返回10；
    }
}
```

【注意】如果**finally有return语句**，将**覆盖**原始的返回值，永远返回finally中的值。一般应避免该情况

## final 关键字

**ﬁnal**：用于**修饰不可改变内容**。可以用于修饰类、变量和方法。 

- **类**：被修饰的类，**不能被继承**。 

- **方法**：被修饰的方法，**不能被重写**。 

- **变量**：被修饰的变量，**初始化之后不能改变**。

  - **成员变量**

    由于成员变量有默认值，用final修饰后**必须手动赋值**，否则编译失败

    要么**显示初始化**；要么通过**静态代码块、构造代码块、构造方法赋值**（并删除setter）

  - **局部变量**

    - 基本类型：只能**显示初始化赋值一次**，**不能再更改**。
    - 引用类型：只能指向一个对象，**地址不能再更改**。不影响内部成员变量的修改

## 参数传递问题

- 基本数据类型：形式参数的改变不影响实际参数
- 引用数据类型：形式参数的改变影响实际参数

【下题重点】在于**String内容不可变**并且变量相加需要开空间再拼接，StringBuilder等内容可以变

```java
  String s1 = "hello";
  String s2 = "world";
  System.out.println(s1+"---"+s2);//hello---world
  change(s1,s2);
  System.out.println(s1+"---"+s2);//hello---world
  
  StringBuffer sb1 = new StringBuffer("hello");
  StringBuffer sb2 = new StringBuffer("world");
  System.out.println(sb1+"---"+sb2);//hello---world
  change(sb1,sb2);
  System.out.println(sb1+"---"+sb2);//hello---worldworld
  
  public static void change(String s1, String s2) {
  	s1 = s2;
  	s2 = s1+s2;
  }
  public static void change(StringBuffer sb1, StringBuffer sb2) {
  	sb1 = sb2;
  	sb2 = sb1.append(sb2);
  }
```

![](/images/interview/形参实参问题.png)

​                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

## 数据类型转换

* **自动类型转换**(隐式)，范围**小**的类型向范围**大**的**类型提升**，如下：

  ==**参与运算时byte，short，char**——>**int**——>**long**——>**float**——>**double**(boolean不参与)==

  ==**编译器的常量优化**==

  ```java
  byte a = 3;//对于byte、short、char三种类型来说，若右侧赋值的数值(不能为变量)没有超过范围，
  byte b = 4;//javac编译器会自动隐含得帮我们补上(byte) (short) (char) ，否则编译报错
  
  byte c = a + b;//运算期间byte类型变量自动提升为int，但int类型不能赋值给byte类型，因此编译失败。
  byte d = 3 + 4;//常量在编译的时候（javac），已经确定了 3+4 的结果并没有超过byte类型的取值范围，可以赋值给d，成功
  
  char ch = 'A';
  System.out.println(ch + 1);//66
  ```

* **强制类型转换**(显式)。一般不推荐使用，有可能发生**精度损失**(浮点转成整数，直接取消小数)，**数据溢出**

  ```java
  int a = 3;
  byte b = (byte)a;
  ```

  ==**在使用+=、-=、*=、/=、%=运算符进行赋值时，强制类型转换会自动完成**==



## 装箱与拆箱

* 装箱：将基本数据类型的值转为引用数据类型。方法有如`Integer.valueOf(int num/String str)`
* 拆箱：将引用数据类型的值转为基本数据类型。方法有如`.intValue()`

**基本类型包装类（除浮点数）都有其缓存，Boolean为`true、false`，Character为`0~127`，其他为`-128~127`**

> 包装类都重写Object类中的`toString()` 方法，以**字符串**形式返回包装类的基本数据类型的值
>
> 除了Character外，包装类都有`valueOf(String s)`方法，根据String类型参数创建包装类对象
>
> 除了Character外，包装类都有`parseXXX(String s)`的静态方法，将字符串转为基本类型数据

## 取余取模

（C、C++、java、JavaScript中%是取余，Python中%是取模），只对于整数有意义

==区别在于第一步的商**趋于0(取余)**、**趋于负无穷(取模)**，**取余和取模同符号数结果相同**==

```java
取余(结果符号取决于被除数)				取模(结果符号取决于模数)
5%3=2；					 			5%3=2；
-5%-3=-2;							 -5%-3=-2；
5%-3=2;								 5%-3=-1；
-5%3=-2;							 -5%3=1；
```



* 



## ++i & i++

实际上，不管是前置 ++，还是后置 ++，都是先将变量的值加 1，然后才继续计算的。二者之间真正的区别是：

* 前置 ++ 是将变量的值加 1 后，使用增值后的变量进行运算的
* 后置 ++ 是首先将变量赋值给一个临时变量，接下来对原有变量的值加 1，然后使用那个临时变量进行运算。

都不是原子操作！！！



## 交换变量的三种方式

1. 第三个变量

2. 相加（不推荐，数值大的时候可能会溢出）

   ```java
   int a = 1;
   int b = 2;
   a = a + b;
   b = a - b;
   a = a - b;
   ```

3. 异或

   ```java
   int a = 1;
   int b = 2;
   a = a ^ b;
   b = a ^ b;
   a = a ^ b;
   ```

   

## Object类的常见方法

1. **`toString()`**返回对象的字符串表示。直接打印输出一个对象名称，默认调用该方法

   - **默认打印的地址值**是由类的全名+'@'+哈希值的十六进制表示，没意义所以一般由**子类重写**

     `getClass().getName()+"@"toHexString(hashCode());`

2. **`equals()`**比较两个对象是否相同，底层用的是**`==`**。`String`重写了该方法

   - **默认**情况下**比较的是对象地址值**是否相同，没意义所以一般由**子类重写**，注意多态向下转型问题
     - 与自身比较；
     - null或不属同一类；
     - 向下转型比较（基本类型用==，引用类型用**`Objects.equals()`**）

3. **`hashCode()`**返回**对象的哈希值**，十进制整数，不是实际地址值，是**逻辑地址值**

   - 使用**Set、Map中键**时需要**给添加的自定义类重写**`hashCode()`和`equals()`

4. `getClass()`返回对象的字节码文件对象，反射中讲解

5. `finalize()`**垃圾回收**，不确定时间，可以调用`System.gc()`立即回收

6. `clone()`实现对象**克隆**，包括成员变量的数据复制，但是它和两个引用指向同一个对象是有区别的 

7. `notify()`native方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。

8. `notifyAll()`native方法，并且不能重写。跟notify一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。

9. `wait(long timeout) throws InterruptedException`native方法，并且不能重写。暂停线程的执行。注意：sleep方法没有释放锁，而wait方法释放了锁 。timeout是等待时间。

10. `wait(long timeout, int nanos) throws InterruptedException`多了nanos参数，这个参数表示额外时间（以毫微秒为单位，范围是 0-999999）。 所以超时的时间还需要加上nanos毫秒。

11. `wait() throws InterruptedException`跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念

    ​																																	

## 一个对象的实例化过程

1. JVM加载`main()`所属的类的`.class`文件，**若有基类则先加载基类**（总是在使用时加载其`.class`文件）

   执行**根基类**对应`.class`中**static初始化**（<u>静态成员变量和静态代码块，按其定义顺序执行</u>)，然后是下一个派生类的static初始化，以此类推。（类**第一次**被**加载**或**创建**对象或访问静态数据成员时。只声明不能算是加载了）

2. 在用构造器**创建对象**时，在**堆中为对象分配空间**，执行构造器初始化

   1. 先根据隐藏的第一行**`super()`**来到**根基类**的无参构造器
   2. 执行根基类的**非静态成员变量的默认初始化，显式初始化**和**构造代码块的初始化**（<u>后俩按其定义顺序执行</u>）
   3. 然后执行根基类**构造器定义的初始化**
   4. 然后执行下一个派生类的`super()`后的以上操作

3. 初始化完毕后，将地址**赋值**给引用变量。

【注意】方法重写

```java
public class Father{
    private int i = test();
    private static int j = method();

    static{
        System.out.print("1 ");
    }
    public Father(){
        System.out.print("2 ");
    }
    {
        System.out.print("3 ");
    }
    public int test() {
        System.out.print("4 ");
        return 1;
    }
    public static int method() {
        System.out.print("5 ");
        return 1;
    }
}
```

```java
public class Son extends Father{
    private int i = test();
    private static int j = method();

    static{
        System.out.print("6 ");
    }
    public Son(){
        System.out.print("7 ");
    }
    {
        System.out.print("8 ");
    }
    @Override
    public int test(){
        System.out.print("9 ");
        return 1;
    }
    public static int method(){
        System.out.print("10 ");
        return 1;
    }

    public static void main(String[] args) { //也可以放在其他类中
        Son son1 = new Son();//5 1 10 6 9 3 2 9 8 7 
        System.out.println();
        Son son2 = new Son();//9 3 2 9 8 7 
    }
}
```



## 异常分类

* Java中所有异常的根类是`java.lang.Throwable`，其下有两个子类：
  * `java.lang.Error`：**程序无法处理的错误**，表示运行应用程序中较严重问题，如`OutOfMemoryError`
  * `java.lang.Exception`：程序可以处理的错误，根据在编译时期还是运行时期去检查异常分为如下两类：
    * `RuntimeException`：**运行时异常**，如`NullPointerException`，`ArrayIndexOutOfBoundsException`，`ArithmeticException`
    * 除过运行时异常外的都是**编译时异常**，如`IOException`，`ClassNotFoundException`

## throw 和 throws 区别

* `throw`和`throws`区别

  - `throw`：在**方法体中**抛出一个异常对象。程序执行到此时立即停止，它后面的语句不执行。说明这里**肯定有异常**产生。

    【注意】throw语句后不能跟其他代码，否则永远执行不到，编译错误

  - `throws`：在**方法声明上**，这个异常不一定会产生，是一种**可能性**

  

## final finally finallize 区别

- `final`：最终意思，可以修饰类、成员变量、成员方法。
- `finally`：异常处理，用于释放资源，finally中的代码一定会被执行，除非：
  - 执行之前jvm退出`System.exit(0)`；finally中发生异常；程序所在线程死亡；关闭CPU；
- `finalize`：Object类的一个方法，用于**垃圾回收**



## Java IO流有几种？抽象类有什么？

- 字节流：InputStream、OutputStream

- 字符流：Reader、Writer

  转换流的InputStreamReader、OutputStreamWriter也是字符流，唯一可以指定字符集的流！



##  什么是java 序列化，如何实现？

* 把**Java对象保存为二进制字节码**的过程，可用于传输。反序列化相反。
* 可以使用ObjectOutputStream的writeObject来实现；或让被传输的对象**实现 serializable 标记接口**，编译时就会特殊处理



## 能不能自己写个类，也叫java.lang.String？

可以，但是在使用的时候必须用自己的类加载器来加载，否则系统的类加载器只会加载jre.jar包中的String类。

在 Tomcat 的 web 应用，都是由 webapp 自己的类加载器先自己加载 WEB-INF/classess 目录中的类，若在这里面写了String 类，Servlet程序加载的就是自己写的String 类。



## Math.round(-11.5) = -11

算法为Math.floor(x+0.5)：为向下取小，并取整



## JVM 调优

* 内存泄漏检查：系统资源（各方面的资源，堆、栈、线程等）在错误使用的情况下，导致使用完毕的资源无法回收（或没有回收），从而导致新的资源分配请求无法完成，引起系统错误。

  根据垃圾回收前后情况对比，同时根据对象引用情况（常见的集合对象引用）分析，基本都可以找到泄漏点。

* 堆栈溢出，StackOverflowError：递归没返回，或者循环调用造成

* 线程堆栈满：一个线程的空间大小是有限制的（1M），增加线程栈大小。`-Xss2m`，查看代码是否有造成泄露部分

* 系统内存被占满，OutOfMemoryError：unable to create new native thread，操作系统没有足够的资源来产生这个线程造成的

  当系统内存固定时，分配给 Java 虚拟机的内存越多，那么，系统总共能够产生的线程也就越少，两者成反比的关系。修改`-Xss `来减少分配给单个线程的空间，也可以增加系统总共内生产的线程数。 

  

## JVM 如何加载类？如何分配空间？

指将 class 文件的二进制数据读入到**运行时数据区**（JVM运行起来时就给内存划分的空间）中，并在方法区内创建一个 class 对象：

* 栈

  每一个线程运行起来的时候就会对应一个栈（线程栈），栈中存放的数据被当前线程所独享（不会产生资源共享情况，所以线程是安全的）。而栈当中存放的是栈帧，当线程调用方法时，就是形成一个栈帧，并将这个栈帧进行压栈操作。方法执行完后，进行出栈操作。这个栈帧里面包括（局部变量，操作数栈，指向当前方法对应类的常量池引用，方法返回地址等信息）。

* 本地方法栈

  本地方法栈的机制和栈的相似，区别在于，栈运行的是Java 实现的方法，而本地方法栈运行的是本地方法。本地方法指的是 JVM 需要调用非Java 语言所实现的方法。在 JVM 规范中，没有强化性要求实现方一定要划分出本地方法栈（例如：HotSpot 虚拟机将本地方法栈和栈合二为一）和具体实现（不同的操作系统，对 JVM规范的具体实现都不一样）。

* 堆

  堆内存主要存放创建的对象和数组。堆内存在 JVM 中是唯一的，能被多个线程所共享。堆里面的每一个对象都存放着实例的实例变量。堆内存的对象没有被引用，会自动被 Java垃圾回收机制回收。JVM 为每一个 class 对象都维护一个常量池。

* 方法区

  和堆一样，可以被多个线程多共享。主要存放每一个加载 class 的信息。class 信息主要包含魔数（确定是否是一个 class 文件），访问标志（当前的类是普通类还是接口，是否是抽象类，是否被 public 修饰，是否使用了 final修饰等描述信息......），字段表集合信息（使用什么访问修饰符，是实例变量还是静态变量，是否使用了 final 修饰等描述信息.....），方法表集合信息（使用什么访问修饰符，是否静态方法，是否使用了 final 修饰，是否使用了 synchronized 修饰，是否是native 方法......）等内容。当一个类加载器加载了一个类的时候，会根据这个 class 文件创建一个class 对象，class 对象就包含了上述的信息。后续要创建这个类的实例，都根据这个 class 对象创建出来的。在1.8以后使用了元空间（meta space）来实现方法区。

* 程序计数器

  程序计数器也可以称为 PC 寄存器（通俗讲就是指令缓存）。它主要用于缓存当前程序下一条指令的指令地址，CPU 根据这个地址找到将要执行的指令。这个寄存器是 JVM内部实现的，不是物理概念上的计数器，不过和 JVM 的实现逻辑一样。

  

## 面向对象七大设计原则

- **开**：开闭原则。一个软件实体应当对扩展开发，对修改关闭
- **口**：接口隔离原则。使用多个专门的接口比使用单一的总接口要好
- **合**：组合/聚合复用原则。要尽量使用合成/聚合，尽量不要使用继承
- **里**：里式替换原则。所有引用基类的地方必须透明的使用其子类的对象
- **最**：最少知识原则（迪米特法则）。一个对象应当对其他对象有尽可能少的了解
- **单**：单一职责原则。把多于的职责分离出去，分别再创建一些类来完成每一个职责
- **依**：依赖倒置原则。实现类依赖接口或抽象类，减少类间的耦合性，提高系统的稳定



## 设计模式

* 创建型模式，共五种：抽象工厂模式、**工厂方法模式**、**单例模式**、建造者模式、原型模式。
* 结构型模式，共七种：适配器模式、**装饰器模式**、代理模式、外观模式、桥接模式、组合模式、享元模式。
* 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。



## 工厂方法模式

定义一个**创建对象的接口**，让其**子类自己决定实例化哪一个工厂类**，工厂模式使其创建过程延迟到子类进行

如果有新的对象增加，只需要增加一个**具体的类**和**具体的工厂类**即可

```java
public abstract class Animal {
	public abstract void eat();
}
public class Dog extends Animal {
	@Override
	public void eat() {
		System.out.println("狗吃肉");
	}
}
```

```java
public interface Factory {
	public abstract Animal creatAnimal();
}
public class DogFactory implements Factory {
	@Override
	public Animal creatAnimal() {
		return new Dog();
	}
}
```

```java
public static void main(String[] args) {
	Factory f = new DogFactory();
	Animal a = f.creatAnimal();
	a.eat();
}
```



## 单例模式

饿汉式

```java
public class Singleton {   
    private Singleton() {}  
    
    private static final Singleto1 single = new Singleton(); 
    
    public static Singleton getInstance() {
        return single;
    }
}
```

懒汉式

```java
public class Singleton {   
    private Singleton() {}  
    
    private static final Singleton single = null; 
    
    public /*synchronized*/ static Singleton getInstance() {
        if(single == null){
            single = new Singleton();
        }
        return single;
    }
}
```

线程安全的，内部类

```java
public class Singleton {
    private Singleton() {
    }

    private static class Inner {
        private static Singleton s = new Singleton();
    }

    public static Singleton getInstance() {
        return Inner.s;
    }
}
```



## 装饰者模式

**动态地给一个对象添加一些额外的职责**，同时又不改变其结构。就增加功能来说，装饰者模式相**比生成子类更为灵活**。

如IO流`BufferedReader br = new BufferedReader(new InputStreamReader(System.in))`







<br/>
<br/>
<br/>
<Valine></Valine>