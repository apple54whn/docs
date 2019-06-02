# 类与对象

## 枚举类型

在变量的取值只在一个有限的集合内时，可以用到枚举类型。

定义一个简单枚举类型：

```java
public enum Size {
    SMALL,MEDIUM,LARGE,EXTRA_LARGE；
}

//Size类型变量只能存储这个类型声明中给定的某个枚举值，或nul值！
Size s = Size.MEDIUM;
```

也可以在枚举类型中添加域，构造器（在构造枚举常量时被调用），方法。一般用在系统的返回对象的ResultCode中，如：

```java
//这个接口可以不用定义，但是由于每个服务的状态码不同，所以还是定义最好
public interface ResultCode {
    //操作是否成功,true为成功，false操作失败
    boolean success();
    //操作代码
    int code();
    //提示信息
    String message();
}
```

```java
@ToString
public enum CommonCode implements ResultCode{
    INVALID_PARAM(false,10003,"非法参数！"),
    SUCCESS(true,10000,"操作成功！"),
    FAIL(false,11111,"操作失败！");

    //操作是否成功
    boolean success;
    //操作代码
    int code;
    //提示信息
    String message;
    
    /*private*/ CommonCode(boolean success,int code, String message){
        this.success = success;
        this.code = code;
        this.message = message;
    }

    @Override
    public boolean success() {
        return success;
    }
    
    @Override
    public int code() {
        return code;
    }

    @Override
    public String message() {
        return message;
    }
}
```

所有的枚举类型都是Enum的子类，继承了其许多方法。

`toString()`，返回枚举常量名如。如`CommonCode.SUCCESS.toString()`返回的是`SUCCESS`。但是若是重写后，返回`CommonCode(success=true, code=10000, message=操作成功！)`。

`valueOf`是`toString()`的逆方法为，如`CommonCode SUCCESS = Enum.valueOf(CommonCode.class, "SUCCESS");`

`values` 每个枚举类型都有一个静态方法，返回一个包含全部枚举值的数组

`ordinal` 返回enum声明中枚举常量的位置，从0开始计数，如`CommonCode.FAIL.ordinal()`返回2





# API

## java.time

Instant：时间戳
Duration：持续时间，时间差
**LocalDate**：只包含日期，比如：2016-10-20
**LocalTime**：只包含时间，比如：23:12:10
**LocalDateTime**：包含日期和时间，比如：2016-10-20 23:14:21
Period：时间段
ZoneOffset：时区偏移量，比如：+8:00
ZonedDateTime：带时区的时间
Clock：时钟，比如获取目前美国纽约的时间
DateTimeFormatter

![1554259606743](./images/1554259606743.png)

```java
//2019-04-03
LocalDate todayDate = LocalDate.now();

//2019-04-01
LocalDate firstDay = todayDate.with(TemporalAdjusters.firstDayOfMonth());

//2019-04-01
LocalDate firstDay2 = todayDate.withDayOfMonth(1);

//2019-04-30
LocalDate lastDay = todayDate.with(TemporalAdjusters.lastDayOfMonth());

//当前日期-1天，plus为+1天。可以传负数
LocalDate tomorrow = todayDate.minusDays(1);

//判断是否为闰年
boolean isLeapYear = todayDate.isLeapYear();
```

生日检查或者账单日检查

```java
LocalDate birthday = LocalDate.of(1990, 10, 12);

MonthDay birthdayMd = MonthDay.of(birthday.getMonth(), birthday.getDayOfMonth());
MonthDay today = MonthDay.from(LocalDate.of(2016, 10, 12));
System.out.println(today.equals(birthdayMd));
```





