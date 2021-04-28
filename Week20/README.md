## CI

- 客户端的持续集成体系

  - daily build [server side]
  - build verification test [smoke testing]

- 前端的持续集成体系(build 很快)

  - 提交前 build
  - 开发周期以周计
  - 端到端测试 -> `eslint` + `headless chrome`

```bash
# workflow
headless_browser>dom_tree<check
```

- 知识点

1. [githook](#githook)

2. [eslint](#eslint)

3. [headless chrome](#headless-chrome)

### githook

[link](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

```bash
# .git folder
ls -a
open
# suffix .sample -> exec[X]
# check access
ls -l [file]
# authorization
chmod +x [hook]
```

- client pre-commit(lint) pre-push(final check)
- server pre-receive

### eslint

[link](https://eslint.org/)

```bash
# initialize config file
npx eslint --init
```

- linter 检查 stage 的版本

```bash
# keep index
git stash -k
```

### headless chrome

[link](https://developers.google.com/web/updates/2017/04/headless-chrome)

[puppeteer](https://pptr.dev/)
