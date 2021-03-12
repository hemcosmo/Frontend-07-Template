# 组件化 \* 架构模式

> 组件化从扩展 html 标签开始的前端架构体系, 主要目标是**复用**. 架构模式(MVVM)主要关心前端和数据逻辑层是如何去交互的.

## 对象与组件

> 组件会区别于模块和对象, 和 UI 强相关, 是特殊的模块或对象. 以树形结构来进行组合, 有模板化配置的能力.

- 对象

  - properties 属性
  - methods 方法
  - inherit 继承关系

- 组件

  - properties 强调从属关系
  - methods
  - inherit
  - attribute 特性 html/jsx...(markup code) 强调描述性
  - config & state 配置(构造函数传参)和状态
  - event 事件机制(往外传递)
  - lifecycle 生命周期
  - children 🌲 结构的必要性

## 设计组件状态

|           | markup set | javasript set | javascript change | user input change |
| --------- | ---------- | ------------- | ----------------- | ----------------- |
| property  | ❌         | ⭕            | ⭕                | ❓                |
| attribute | ⭕         | ⭕            | ⭕                | ❓                |
| config    | ❌         | ⭕            | ❌                | ❌                |
| state     | ❌         | ❌            | ❌                | ⭕                |

- 生命周期

```
created -> mount -> unmount -> created/destroyed
```

```
created -> javascript set/change -> render/update -> created/destroyed
```

```
created -> user input -> render/update -> created/destroyed
```

- children

  - content
  - template

## 搭建组件系统

- 类 react 的 jsx(纯粹的语言扩展)

- 类 vue 的 markup parser
