const regexp = /([\d\.]+)|(\+)|(\-)|(\*)|(\/)|([\s\t]+)|([\r\n]+)/g
const dictionary = ['num', '+', '-', '*', '/', 'space', 'newline']

let src = []

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

for(const token of tokenize('25 + 2 * 6')) {
  if(token.type !== 'space' && token.type !== 'newline')
    src.push(token)
}

console.log(expression(src))