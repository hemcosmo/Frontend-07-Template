const kmpWithQuestionMark = (src, pattern) => {
  const table = new Array(pattern.length).fill(0)
  {
    let i = 1
    let j = 0

    while (i < pattern.length) {
      if (pattern[i] === pattern[j] || pattern[i] === '?') {
        j += 1
        table[i] = j
        i += 1
      } else if (j > 0) j = table[j - 1]
      else {
        table[i] = 0
        i += 1
      }
    }
  }

  {
    let i = 0
    let j = 0
    let ufo = []

    while (i < src.length) {
      if (pattern[j] === src[i] || pattern[j] === '?') {
        ufo.push(i)
        i += 1
        j += 1
      }
      if (j === pattern.length) {
        console.log(ufo)
        return ufo[ufo.length - 1]
      }
      if (i < src.length && pattern[j] !== src[i]) {
        if (j) {
          j = table[j - 1]
          ufo = ufo.slice(ufo.length - j)
        } else {
          i += 1
        }
      }
    }
    return false
  }
}

function find(src, pattern) {
  if (src === pattern) return true

  let startCount = 0
  // count *
  for (let i = 0; i < pattern.length; i += 1) {
    if (pattern[i] === '*') {
      startCount += 1
    }
  }

  if (src.length === 0 && startCount === 0) return false

  // no wildcard case
  if (!startCount) {
    for (let i = 0; i < pattern.length; i += 1) {
      if (![src[i], '?'].includes(pattern[i])) {
        return false
      }
    }
    // pattern[i] equals src[i] or ?
    if (pattern.length === src.length) return true
  }

  let p = 0 // pattern pointer
  let lastIndex = 0

  // before first *
  while (pattern[p] !== '*') {
    if (![src[p], '?'].includes(pattern[p])) return false
    p += 1
  }

  lastIndex = p

  for (let i = 0; i < startCount - 1; i += 1) {
    p += 1 // * next character
    console.log(p)
    let subPattern = ''
    while (pattern[p] !== '*') {
      subPattern += pattern[p]
      p += 1 // substring index
      console.log(p)
    }
    // ? match single character
    // const regexp = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    // regexp.lastIndex = lastIndex
    // if (!regexp.exec(src)) return false
    // lastIndex = regexp.lastIndex
    console.log(kmpWithQuestionMark(src.slice(lastIndex), subPattern))
    const ufo = kmpWithQuestionMark(src.slice(lastIndex), subPattern)
    if (!ufo) return false
    lastIndex += ufo + 1
    console.log(lastIndex)
  }

  if (lastIndex === src.length && p < pattern.length) return false

  // tail
  for (
    let i = 0;
    i <= src.length - lastIndex && pattern[pattern.length - i] !== '*';
    i += 1
  ) {
    if (
      pattern[pattern.length - i] !== src[src.length - i] &&
      pattern[pattern.length - i] !== '?'
    ) {
      return false
    }
  }

  return true
}

console.log(find('missssasasasas', 'm??*as*a?a*a*asas'))

const wc = () => {
  const ws = document.getElementById('ws').value
  const wp = document.getElementById('wp').value
  document.getElementById('result').textContent = find(ws, wp) ? '✔️' : '✖️'
}
