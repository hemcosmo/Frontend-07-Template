# Abstract syntax tree(AST): 抽象语法树

<h5>
    <a>
        <img src="https://img.shields.io/badge/eslint-a685e2?style=flat&logo=eslint" />
    </a>
    <a>
        <img src="https://img.shields.io/badge/babel-393e46?style=flat&logo=babel" />
    </a>
    <a>
        <img src="https://img.shields.io/badge/jscodeshift-bbbbbb?style=flat" />
    </a>
</h5>

- _数据结构_ (一般被用来在编译器中来表示代码结构)

## 工作流

- 编程语言分词
- 词构成嵌套语法树
- 解析执行

## 语法分析(构建抽象语法树)

`LL parser`(从左到右, 自顶向下)
- 单独的数字看作是0次乘法.
- 单独的乘法看作是0次加法.
- 猜想和运算优先级有关, 加法优先级低所以加的是乘法, 乘法可以乘数字不可以乘加法.
- `regexp.exec(source)` 会对source进行逐条匹配, 正则对象会对上一次匹配的状态做记录(lastIndex).

## 遍历AST

`visitor pattern`
- 只告知所关注类型的节点, 获取到该类型节点的回调方法.

```
[object]
    |
[elements] accept(visitor) -- [visitor] visit(element)
```

## visualizer(TODO)

- sample expression `2 + 6`

```
                     expression
                     /        \
                 additive      EOF
                /   |   \
           additive + multiplicative
            /              \
    multiplicative        number(6)
        /
    number(2)
```