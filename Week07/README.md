## grammar

tree vs priority

expressions h -> l

> member

- a.b get `reference`(标准中的类型, 不是语言中的类型)

- a[b]

- f\`s` s: string -> Array(s)

```javascript
const log = (val) => console.log(val);

log`🐇`; // ["🐇"]
```

- super.b

- super['b']

- new.target

- new F()

> new

- new F

> reference

- object

- key: string | symbol

javascipt 在运行时用引用类型来处理写相关的操作(delete, assign)

> call

- f()

- super()

- f()['b'] m -> c 优先级降低

- f().b

- f()`s`

语法结构(产生式)所能表达的内容多于运算符优先级

> left handside vs right handside

依据表达式能否放左边, left 也是 right

> update

- a++, a--

- ++a, --a

> unary

- delete a.b

- void f() 类似空格和回车, 起到改变语法结构的作用

- typeof a

- +a

- -a

- ~a

- !a

- await a

> exponental

- \*\* 右结合

> multiplicative

- \* / %

> additive

- \+ -

> shift

- << >> >>>

> relationship

- < > <= >= instanceof in

> equality

- == 类型不同时优先把 boolean 类型的变量转换成 number 类型

- !=

- ===

- !==

> bitwise

- & ^ |

> logical

短路原则

- &&

- ||

> conditional

短路原则

- ? :

> type convertion

<img src="assets/type_convertion_table.png" width="500"/>

- a + b string, number

- 'false' == false // false

- a[o] = 1

> unboxing

拆箱转换 object -> primitive values

- to primitive

- toString and valueOf string, number

- Symbol.toPrimitive

> boxing

装箱转换 primitive values -> object

- new Number(1)

- new String('a')

- new Boolean(true)

- new Object(Symbol('a'))
