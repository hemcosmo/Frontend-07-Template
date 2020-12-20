// script scope variables
const regexp = /([\d\.]+)|(\+)|(\-)|(\*)|(\/)|([\s\t]+)|([\r\n]+)/g
const dictionary = ['num', '+', '-', '*', '/', 'space', 'newline']
let input = '2 + 6' // default expression
let t = [] // tokens array

function* tokenize(exp) {
  let map, lastIndex = 0
  while(1) {
    lastIndex = regexp.lastIndex
    if((map = regexp.exec(exp)) === null) break
    if(regexp.lastIndex - lastIndex > map[0].length) break

    let token = {
      type: null,
      value: null
    }

    for(let i = 1; i <= dictionary.length; i++) {
      if(map[i]) token.type = dictionary[i - 1]
    }

    token.value = map[0]
    yield token
  }
  yield { type:'EOF' }
}

const multiplicative = src => {
  if(src[0].type === 'num') {
    let node = {
      type: 'multiplicative',
      children: [src[0]]
    }
    src[0] = node
    return multiplicative(src)
  }

  if(src[0].type === 'multiplicative') {
    if(src[1]?.type === '*') {
      let node = {
        type: 'multiplicative',
        operator: '*',
        children: []
      }
  
      node.children.push(src.shift())
      node.children.push(src.shift())
      node.children.push(src.shift())
  
      src.unshift(node)
      return multiplicative(src)
    }
    
    else if(src[1]?.type === '/') {
      let node = {
        type: 'multiplicative',
        operator: '/',
        children: []
      }

      node.children.push(src.shift())
      node.children.push(src.shift())
      node.children.push(src.shift())

      src.unshift(node)
      return multiplicative(src)
    }

    else return src[0]
  }
  
  return multiplicative(src)
}

const additive = src => {
  if(src[0].type === 'multiplicative') {
    let node = {
      type: 'additive',
      children: [src[0]]
    }
    src[0] = node
    return additive(src)
  }

  if(src[0].type === 'additive') {
    if(src[1]?.type === '+') {
      let node = {
        type: 'additive',
        operator: '+',
        children: []
      }

      node.children.push(src.shift())
      node.children.push(src.shift())
      multiplicative(src)
      node.children.push(src.shift())

      src.unshift(node)
      return additive(src) 
    }

    else if(src[1]?.type === '-') {
      let node = {
        type: 'additive',
        operator: '-',
        children: []
      }

      node.children.push(src.shift())
      node.children.push(src.shift())
      multiplicative(src)
      node.children.push(src.shift())

      src.unshift(node)
      return additive(src) 
    }

    else return src[0]
  }
  multiplicative(src)
  return additive(src)
}

// from top to bottom
const expression = src => {
  if(src[0].type === 'additive' && src[1]?.type === 'EOF') {
    let node = {
      type: 'expression',
      children: [src.shift(), src.shift()]
    }

    src.unshift(node)
    return node
  }

  additive(src)
  return expression(src)
}

// convert string to tokens array
const convert = (s, t) =>{
  for(const token of tokenize(s)) {
    if(token.type !== 'space' && token.type !== 'newline')
      t.push(token)
  }
}

// manipulate ast node
const renderBulletinBoard = (self, parent, index) => {
  const p = document.createElement('p')
  p.innerText = `👶🏽 ${self.type} | 🧔🏽 ${parent.type} | 🏆 ${index}`
  document.getElementById('board').appendChild(p)
}

// traverse ast
const traverse = async (o, p, idx, fn) => {
  fn(o, p, idx)
  await setTimeout(1)

  for (const key in o) {
    const prop = o[key]
    if (Array.isArray(prop)) {
      for (let i = 0; i < prop.length; i++) {
        traverse(prop[i], o, i, fn)// record index and parent node
      }
    }
  }
}

// add listener to button
document.getElementById('btn').onclick = () => {
  let t = [] // shadowing t
  input = document.getElementById('input').value
  if(input) {
    convert(input, t)
    let ast = expression(t)
    document.getElementById('preview').innerText = JSON.stringify(ast, null, 2)
    hljs.highlightBlock(document.querySelector('pre code'))
    document.getElementById('board').innerHTML = null // clear board
    traverse(ast, 'program', 0, renderBulletinBoard)
  }
}

// initialize
{
  hljs.initHighlightingOnLoad()
  convert(input, t)
  let ast = expression(t) // private ast
  document.getElementById('preview').innerText = JSON.stringify(ast, null, 2)
  traverse(ast, 'program', 0, renderBulletinBoard)
}