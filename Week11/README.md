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
> > 没有得到确定答案, 只是猜想
> >
> > 思路是先比较两个伪元素的异同, 首先摘抄了两段话
> >
> > > 0️⃣ The "first formatted line" of an element may occur inside a block-level descendant in the same flow (i.e., a block-level descendant that is not positioned and not a float).
> > >
> > > 1️⃣ This type of initial letter is similar to an inline-level element if its 'float' property is 'none', otherwise it is similar to a floated element.
> >
> > 虽然和问题并不强相关但是从中隐约能感觉到有一些线索, 个人的理解 first-line 类似于对应 block-level, 而 first-letter 对应的是 inline-level, 虽然两者都不能作为 html 元素但是如果把 first-line 想象成是块级元素, 第一段话有提到需要和父元素处在同一个流, 即不能脱离正常的流, 因此不能 float, 另外 first-letter 的样式会覆盖 first-line 的样式, 也就是说 first-letter 也可以假定是 first-line 的子元素
> >
> > 再看回 first-line 可以使用的属性, 只能产生重绘, 不会触发回流, 限制了测量和计算, 或许也是因为第一行和第一个字很大的区别在于第一行很难确定, 但第一个字更容易确定
> >
> > 总结下来, 既然这两个伪元素都是对文本内容的处理, 所以可能说 first-line 更像是一个标准版的伪元素, 而因为 first-letter 更容易测量与计算所以对其做了一些拓展与加强, 是加强版的伪元素
