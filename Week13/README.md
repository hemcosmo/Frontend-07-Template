> javascript(定义) -> 语法 \* 语义 \* 运行时 <- 程序语言

> html(inspire) -> xml ∈ sgml[60's] <- 数据描述语言

```
xhtml
  |
xhtml2 ✖
  |
html5
```

> DTD? sgml 规定的定义它子集的一种文档格式

1. nbsp 的弊端 - solution - css `white-space`

1. & > < " - solution - 转义

## html 标签语义

- `hr` 改变走向

- `strong` 重点词

- `em` 辅助的语气表示

- `ol` 与 `ul` 的区别有序和无序

## html 语法

### 合法元素

1. element &lt;tagname> ... &lt;/tagname>

1. text

1. comment &lt;!-- -->

1. document type &lt;Doctype html>

1. processing instruction(预处理语法) &lt;?a 1?>

1. cdata(不需要考虑转义的文本节点) &lt;![CDATA[ ]]>

### 字符引用

- \&#97;

- \&amp;

- \&lt;

- \&quot;
