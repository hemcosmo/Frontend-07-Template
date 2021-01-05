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

> 是计算机科学中刻画形式文法(字符串的一套[产生式](#BNF)规则)表达能力的一个分类谱系.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chomsky-hierarchy.svg/190px-Chomsky-hierarchy.svg.png)

| Grammar | Languages | Automaton |
| - | - | - |
| Type-0 | recursively enumerable | Turing machine |
| Type-1 | context-sensitive | Linear-bounded non-deterministic Turing machine |
| Type-2 | context-free | Non-deterministic pushdown automaton |
| Type-3 | regular | Finite state automaton |

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