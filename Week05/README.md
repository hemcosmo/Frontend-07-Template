# 目录

- [Proxy](#Proxy)

  - [一些用例](#一些用例)
  - [双向数据绑定](#双向数据绑定)

- [Range](#Range)
  - [创建与设置](#创建与设置)
  - [鼠标事件拖拽 vs 拖放 API](#鼠标事件拖拽-vs-拖放-API)

# Proxy

<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIEf1KAcK6A8%2Fmaxresdefault.jpg&f=1&nofb=1" alt="es6" width="200" />

强大又危险的设计(虽然令人兴奋但是工作中要尽量少使用), 专门为底层库设计的特性

```javascript
// target can be any type of object
const proxy = new Proxy(target, handler)
// use traps to operate object
const handler = {
  // get: Reflect.get
  get: function () {
    return 'this is a getter trap'
  },
}
```

## 一些用例

- 校验, trap 做拦截判断是否合法
- 加工流入数据(个人感觉应该尽量少用)
- 构造可观察对象
- ...

## 双向数据绑定

- 个人拙见

想通过比较 `Angular` 和 `react💙` 两个组建化工具对 two way binding 的实现来理解. 也做了一些小小的总结以简化理解:

1. 数据改变视图
1. 视图改变数据

做到第一步是单向数据绑定, 做到一和二两步便是双向数据绑定, 一二两步合起来所表现出来的就是视图改变视图.

私以为 react 对双向数据绑定的实践更像是一个 trick, 利用回调函数配合 setState 来修改数据触发视图的更新, 可以说并不是严格意义上的双向数据绑定.
而在 Angular 中是通过 ngModel 这个关键字实现 form 中的双向绑定, 更像是一个专门为双向绑定而生的 api 供用户使用, 也在其官方文档中有所体现.
在不关注它的底层实现仅从工具角度来说 Angular 存在 built in 的双向绑定, 而 react 没有提供个人感觉可能其定位只是一个存在在 view layer 的库, 也是单向数据流设计思想的一种体现.

# Range

[docs](https://developer.mozilla.org/en-US/docs/Web/API/Range)

一个节点的起始边界点到终止边界点的范围

## 创建与设置

- 创建

1. `document.createRange()`
1. `new Range()` experimental

- 设置起始边界

如果父节点是元素节点, 则偏移量是子节点的编号, 对于文本节点, 则是文本中的位置.

`setStart(startNode, startOffset)`

`setEnd(endNode, endOffset)`

- 方法

`insertNode` 起点处插入节点

`getBoundingClientRect` 返回一个 ClientRect 对象的列表

## 鼠标事件拖拽 vs 拖放 API

[docs](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

drag events 实则继承自 mouse events

- 添加属性使得元素可以被拖拽

```html
<div id="box" draggable>📦</div>
```

- 添加事件监听(8 个事件可用)

```html
<div id="box" ondrag="handler(e)">📦</div>
<!-- or -->
<script>
  document.getElementById('box').addEventListener('drag', handler)
</script>
```

注意 handler 中需要调用 `preventDefault`

- `dataTransfer` 对象中的 `files: FileList`

拖拽文件到合法区域会追加进 `files`

- 小总结

拖放 API 可以使我们在简单场景下处理更便捷, 也提供了系统文件拖拽到浏览器窗口的能力. 但拖放 API 还是存在一些不足之处, 个人感觉如果是对拖拽自由度要求高或者是对拖拽区域有限制的场景下用 mouse event 可能是更好的选择.
