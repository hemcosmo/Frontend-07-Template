/**
 * @todo 需要修改, 每个状态机都需要是纯函数, 目前依赖了外部变量i
 */

const kmp = (s, p) => {
  const l = p.length,
    t = Array(l).fill(0)

  if (!l) return 0

  {
    let i = 1,
      j = 0

    while (i < l) {
      if (p[i] === p[j]) {
        t[i++] = ++j
      } else if (j) j = t[j - 1]
      else i++
    }
  }

  let state = start,
    i = 1

  for (const c of s) {
    state = state(c)
  }

  function start(c) {
    if (c === p[0]) return process
    return start
  }

  function process(c) {
    if (c === p[i]) {
      if (i === l - 1) return end
      i++
      return process
    } else if (i) {
      i = t[i - 1]
      return process
    } else return start(c)
  }

  function end() {
    return end
  }

  return end === state
}
