# css 总论

## css 2.1 总体结构

- @charset
- @import
- rules
  - @media
  - @page
  - rule

## @规则的研究

## css 规则的结构

- selector
- declaration
  - key
  - value

## 总结

- css 语法
- @rule
- selector
- variables
- value
- 小爬虫

## css 选择器

1. 语法

- 简单选择器
  - `*` 通用选择器
  - `div svg|a` 类型选择器 tagname (html 命名空间: 1. html 2. svg 3. MathML)
  - `.cls` class 选择器 用空白做分隔符
  - `#id` id 选择器 严格匹配
  - `[attr=value]` 属性选择器 囊括了 class 和 id 选择器
  - `:hover` 伪类选择器 元素的特殊状态 多数用于交互
  - `::before` 伪元素选择器 原本不存在的元素
- 复合选择器
  - <复合选择器> -> <复合选择器>&<简单选择器>
  - \* 或者 div 必须写在前面
  - 伪类和伪元素必须写在最后面
- 复杂选择器 针对一个元素的结构来进行选择
  - <复合选择器>\<sp><复合选择器>
  - <复合选择器>">"<复合选择器>
  - <复合选择器>"~"<复合选择器>
  - <复合选择器>"+"<复合选择器>
  - <复合选择器>"||"<复合选择器>
  - `,`之间是或的关系 一般不算在复杂选择器中

2. 优先级

- 简单选择器计数

  - specificity (内联, id, 类名|属性|伪类, 元素|伪元素)
  - formula `S = s[0] * N ** 3 + s[1] * N ** 2 + s[2] * N + s[3]`

- 个人浅见: 由于很难出现有非常多简单选择器的情况, 故可以只对每一位进行权重比较能更快得出结论

## 伪类

- 链接/行为
  - :any-link
  - :link :visited 一旦使用无法对元素更改文字之外的属性
  - :hover
  - :active
  - :focus
  - :target
- 树结构 部分破坏回溯原则
  - :empty
  - :nth-child() ✅
  - :nth-last-child()
  - :first-child ✅ :last-child :only-child
- 逻辑型
  - :not() 现在可以用 写复合选择器
  - :where :has

## 伪元素

- ::before
- ::after
- ::first-line 可以覆盖 `!important`
- ::first-letter

```html
<div><::before /> content <::after /></div>
```

```html
<div><::first-letter> c </::first-letter> content</div>
```

> 思考题: 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
>
> [W3C](https://www.w3.org/TR/CSS2/selector.html#first-line-pseudo)
>
> > The first formatted line of an element may occur inside a block-level descendant in the same flow (i.e., a block-level descendant that is not out-of-flow due to floating or positioning). For example, the first line of the DIV in `<DIV><P>This line...</P></DIV>` is the first line of the P (assuming that both P and DIV are block-level).
