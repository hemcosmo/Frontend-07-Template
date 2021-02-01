排版

1. 正常流
1. flex
1. grid
1. css houdini

| axis               | row                 | column              |
| ------------------ | ------------------- | ------------------- |
| 主轴(main axis)    | width x left right  | height y top bottom |
| 交叉轴(cross axis) | height y top bottom | width x left right  |

- web 默认是 row, rn 默认是 column

分行

- 根据主轴尺寸, 把元素分进行
- 若设置了 no-wrap, 则强行分配进第一行

计算主轴方向

- 找出所有 flex 元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负, 所有 flex 元素为 0, 等比压缩剩余元素

计算交叉轴方向

- 根据每一行中最大元素尺寸计算行高
- 根据行高 flex-align 和 item-align, 确定元素具体位置

1. 绘制单个元素

- 需要依赖图形环境
- 用了图片库
- 绘制在 viewport 上进行
- 与绘制相关的属性有 background-color | border | background-image 等等
- 递归调用子元素的绘制方法完成 dom 树的绘制
- 忽略掉一些不需要绘制的节点
- 实际的浏览器中, 文字绘制是难点, 需要依赖字体库
- 实际的浏览器中, 还会对一些图层做 compositing
