## Table of Contents

- [语言](#语言)

- [乔姆斯基谱系](#Chomsky-hierarchy)

- [BNF](#BNFBackus-Naur-Form)

- [形式语言的分类](#形式语言的分类)

- [命令式语言一般设计方式](#命令式语言一般设计方式)

- [基本类型](#基本类型)

## 语言

> 是一类复合交流系统, 某一门语言则是这类系统的具体例子. 以`Rousseau`为代表的一些思想家认为语言源自情绪, 而`Kant`认为其源于理性和逻辑的思辨.

- 形式语言(文法和语义)

> 是用精确的数学或机器可处理的公式定义的语言, 是一个特定的`alphabet`上的某些有限长字符串的集合. 不像自然语言, 一个形式语言作为一个集合, 需要有某种明确的标准来定义一个字符串是否是它的元素.

- 一些标准
  - `枚举` 有限元素的情况下, 枚举各个字符串
  - `形式文法` [乔姆斯基谱系](#chomsky-hierarchy)
  - `正则表达式` 语法区别于编程语言中的正则表达式
  - `自动机` 图灵机

## Chomsky hierarchy

> 是计算机科学中刻画形式文法(字符串的一套[产生式](#BNFBackus-Naur-Form)规则)表达能力的一个分类谱系.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chomsky-hierarchy.svg/190px-Chomsky-hierarchy.svg.png)

| Grammar | Languages              | Automaton                                       |
| ------- | ---------------------- | ----------------------------------------------- |
| Type-0  | recursively enumerable | Turing machine                                  |
| Type-1  | context-sensitive      | Linear-bounded non-deterministic Turing machine |
| Type-2  | context-free           | Non-deterministic pushdown automaton            |
| Type-3  | regular                | Finite state automaton                          |

> 上下文无关语言为大多数程序设计语言的语法提供了理论基础

## BNF(Backus-Naur Form)

> 是推导规则(产生式)的集合, 写为`<符号> ::= <使用符号的表达式>`这里的 <符号> 是`非终结符`, 而表达式由一个符号序列, 或用`|`分隔的多个符号序列构成, 每个符号序列整体都是左端的符号的一种可能的替代. 从未在左端出现的符号叫做`终结符`.

- 例子

```
<letter> ::= 'a' | 'b' | ...
<word> ::= <letter> | <letter><word>
<phrase> ::= <word> | <word>' '<phrase>
```

`::=` 定义

`|` 或

`<word>` 以及 `<phrase>` 用到了递归

- ecma

[docs](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-grammar-summary)

- 小总结

![0](assets/summary0.png)

一套产生式可以用来区分字符串是否属于某个形式语言集合. 乔姆斯基谱系对产生式表达能力进行了分类.

## 形式语言的分类

- 按用途划分

1. `数据描述语言` html css
1. `编程语言` javascript

- 按表达方式

1. `命令式语言` 关注过程 js(oop)
1. `声明式语言` 关注结果 js(fp)

### 图灵完备性

<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg1.wikia.nocookie.net%2F__cb20060714193405%2Fpsychology%2Fimages%2F5%2F57%2FAlan_Turing.jpg&f=1&nofb=1" width="50" />

> 具备图灵完备性的语言可以描述所有可计算的问题

实现方式

- 命令式(图灵机) if while
- 声明式(lambda 演算) recursion

### 动态与静态

- 动态 runtime 运行时改变程序结构

- 静态 compiletime

### 类型系统

- 静态类型 编译阶段确定所有变量的类型

- 动态类型(相较之下时间和空间上都有性能损耗) 执行阶段确定所有变量的类型

- 强类型 不允许改变变量类型(除非进行强制类型转换)

- 弱类型 变量可以被赋予不同的类型

- 泛型 不预先确定的数据类型, 在使用的时候传入具体的类型参数

- 协变与逆变 子类型更加具体, 父类型更宽泛. 所以子类型可以赋值给父类型, 与集合中的父子概念相悖. 而函数这种复合类型则体现为逆变, 即是反向赋值, 此时和集合论相吻合. `ts`中参数类型默认是双向协变的.

## 命令式语言一般设计方式

1. [Atom](#Atom) `0`
1. Expression `i += 1;`
1. Statement `while(i < 6) ++i` <- 图灵完备
1. Structure `function`
1. Program `module`

### Atom

grammar

- literal
- variable
- keywords
- whitespace
- line terminator

runtime

- types
- execution context

## 基本类型

`Number`

<img src="https://media.geeksforgeeks.org/wp-content/uploads/Double-Precision-IEEE-754-Floating-Point-Standard-1024x266.jpg" width="550" />

`String`

- 字符集
  - ASCII 127 个字符
  - Unicode 分配片区
  - UCS
  - GB 国标 不兼容 Unicode 省空间
    - GB2312 第一个版本
    - GBK(GB13000)
    - GB18030 大全版本
  - ISO-8859 东欧
  - BIG5 大五码 台湾
- 码点
- 编码方式
  - UTF
    - UTF-8 一个字节表示一个字符 兼容 ASCII 码
    - UTF-16 两个字节表示一个字符

模板语法解析

- `s${
- }s${
- }s`

在引擎看来变量反而是暴露出来的

还可以作为一种语言让函数去处理

`Boolean`

- 形而上学

`Null`

- 只有 1 个值就是他本身

`Undefined`

- 是全局变量, 不是关键字

- 用`void`关键字产生 undefined 比较安全

`Object`

- 类是一种常见的描述对象的方式

- 归类(自下向上, 多继承)和分类(自上而下, 单继承)

- 设计对象状态和行为时, 不应该受到语言描述的干扰, 总是遵循"行为改变状态的原则"

- prototype(在原型链上一直找到最上面的原型)

  - 不做严谨的分类, 采用相似的方式去描述对象
  - 任何对象只需要描述自己与原型的区别即可
  - 适合比较自由的场景

- js 对象中的属性既可以描述状态也可以描述行为, 用内存地址展现对象的唯一性

- 属性

  - key 的类型 String 或者 Symbol
  - value 的形态 数据属性(状态或行为)和访问器属性(行为)

- Api/Grammar

  - `{}` `.` `[]` `defineProperty` 提供了基本的对象机制, 可以创建对象, 访问属性和定义新的属性以及改变属性的特征值(基本的面向对象能力)
  - `create` `setPrototypeOf` `getPrototypeOf` 基于原型的描述对象的方法
  - `new` `class` `extends` 以基于分类的方式去描述对象
  - `new` `function` `prototype` es3

- function(function type)

  - 带 \[[call]](内置的行为, js 中无法访问, 引擎中可以调用)的对象
  - 没有 setPrototypeOf 方法

- host object(not native)

`Symbol`

- 唯一性(除 Symbol.for('desc')可共享)
