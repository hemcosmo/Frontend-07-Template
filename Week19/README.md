- 发布系统(3 个子系统)
  - 线上服务系统 -> 给用户提供线上服务
  - 向线上服务系统发布所用系统 -> 程序员(可以和线上服务系统同级部署, 或者分为两个独立的集群)
  - 发布工具 -> 命令行

```bash
# start openssh
service ssh start
# secure copy
scp -P [port] -r ./* [[user@]host]:[path]
```

- 流式传输

> 文件 -> http -> 文件

![](assets/diagram.png)

> 多文件 -> 压缩文件夹
>
> > 客户端压缩上传, 服务端解压

- 鉴权

> github OAuth workflow

- client

1. open url `/authorize`

2. create server -> receive token -> click to publish

- server

1. auth route -> receive code -- `code+client_id+client_secret` -> token

2. \*publish route -> token -> user info -> authentication
