let $ = Symbol('$') // symbol: cant repeat

class Trie {
  constructor() {
    // use null to avoid prototype pollution
    this.root = Object.create(null) // store values
  }
  insert(word) {
    let node = this.root

    for (let c of word) {
      // if child not exsit, create child
      if (!node[c]) node[c] = Object.create(null)
      // move to next level
      node = node[c]
    }
    // $: terminator
    if (!($ in node)) node[$] = 0
    node[$]++
  }
  // traverse tree
  most() {
    let max = 0
    let maxWord = null
    let visit = (node, word) => {
      // check terminator
      if (node[$] && node[$] > max) {
        max = node[$]
        maxWord = word
      }
      for (let p in node) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    console.log(maxWord, max)
  }
}

// generate random word
function randomWord(length) {
  let s = ''
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
  }
  return s
}

const trie = new Trie()

for (let i = 0; i < 10000; i++) {
  trie.insert(randomWord(4))
}

// assignment max & min
