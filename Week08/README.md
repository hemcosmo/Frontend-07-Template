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

## http 协议解析

> url -> `html`, status, header, etc.

- ISO-OSI 七层网络模型 (b -> t)

  - 4g, 5g, wifi
    1. 物理层
    1. 数据链路层
  - internet
    1. 网络层 -> 因特网 ip 协议
  - tcp `net` lib
    1. 传输层
  - http `http` lib
    1. 会话层
    1. 表示层
    1. 应用层 -> 外网 应用层协议

- tcp(全双工通道, 不存在优先关系) | ip

  - 流 -> 传输数据的概念, 没有明显的分割单位
  - 端口 -> 软件从网卡拿数据, 依据端口进行分配
  - 包 -> 数据包, 大小取决于中间设备
  - ip 地址 -> ip 根据地址找到包从哪到哪, 唯一标识了连入因特网的每一个设备
  - libnet | libpcap -> ip 协议的底层库(cpp), 分别用于构造 ip 包并发送和负责从网卡抓取所有的 ip 包

- http(客户端发起, 服务端返回, 1 对 1 的关系)

文本型的协议(相对的有二进制的协议) -> 所有的内容都是字符串

_request_

- request line

1. method -> POST, GET, etc.
1. path -> default `/`
1. http | version

- headers key value pairs, 空行为结束标识

- body 按照 content type 的格式

```
POST/HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%3D1
```

_response_

- status line

1. http | version | status | status content

- headers 空行分割

- body node 默认返回 chunked body

1. 16 进制的数字单独占一行
1. 内容
1. 最后是一个 16 进制的 0

```
HTTP/1.1 200 OK
Content-Type: text/html
Date: Mon, 23 Dec 2019 06:46:19 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26
<html><body> 🏌️‍♂️</body></html>
0
```

> 设计步骤

1. 设计一个 http 请求的类
1. Content-Type 是一个必要的字段, 要有默认值
1. body 是键值对格式
1. 不同 Content-Type 影响 body 的格式

1. 在 request 构造器中收集必要的信息
1. 设计一个 send 函数, 把请求真实发送到服务器
1. send 函数应该是异步的, 所以返回 promise

1. 设计支持已有的 connection 或者自己新建 connection
1. 收到数据传给 parser
1. 根据 parser 的状态 resolve promise

1. response 必须分段构造, 所以需要一个 response parser 来装配
1. response parser 分段处理 response text, 用状态机来分析文本结构

1. response body 根据 Content-Type 有不同的结构, 因此我们会采用子 parser 的结构来解决
1. 以 trunkedbodyparser 为例, 同样用状态机来处理 body 的格式
