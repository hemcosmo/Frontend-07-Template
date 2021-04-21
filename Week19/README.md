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

![](assets/diagram.png)
