# 浏览器的工作原理

## 总论

基础渲染流程

> `url` -- http -> `html` -- parse -> `dom` -- css computing -> `dom with css` -- layout -> `dom with position` -- render -> `bitmap` <- `graphics driver equipment` <- `light signal` <- 👀

浏览器的小目标: 从读取一个 url 最终给出一个 bitmap

## 状态机

![](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Automata_theory.svg/300px-Automata_theory.svg.png)

- 有限状态机(Finite-state machine)

> 每一个状态都是一个机器, 如果用函数来表示的话, 每个机器都是一个纯函数, 另外每个机器都知道下一个状态(moore & mealy)

```javascript
// mealy
function state(input) {
  // self logic
  return nextState // nextState: f
}
// invoke
while (input) {
  // get input
  state = state(input)
}
```
