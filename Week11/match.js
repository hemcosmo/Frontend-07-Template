/**
 * 练习链表
 */
class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

class List {
  constructor() {
    this.head = null
  }

  unshift(val) {
    const node = new Node(val)

    if (!this.head) this.head = node
    else [this.head, node.next] = [node, this.head]
  }
}

function match(s, ele) {
  // 用链表来存储简单选择器节点
  const list = new List()
  // 拆分复合选择器
  const tmp = s.match(/(\w+)|(\.\w+)|(\#\w+)/g)
  // 逆序构造链表
  for (const i of tmp) {
    list.unshift(i)
  }

  let cur = list.head,
    _p = ele
  while (cur.next) {
    const val = cur.val
    // 从目标节点出发向父节点遍历并作校验
    if (
      (val.includes('.') && _p.classList.contains(val.slice(1))) ||
      (val.includes('#') && _p.id === val.slice(1)) ||
      _p.tagName === val.toUpperCase()
    ) {
      _p = _p.parentNode
      cur = cur.next
      continue
    }

    return false
  }

  return true
}
