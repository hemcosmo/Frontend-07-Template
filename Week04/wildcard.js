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
    let subPattern = ''
    while (pattern[p] !== '*') {
      subPattern += pattern[p]
      p += 1 // substring index
    }
    // ? match single character
    const regexp = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    regexp.lastIndex = lastIndex
    if (!regexp.exec(src)) return false
    lastIndex = regexp.lastIndex
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

const wc = () => {
  const ws = document.getElementById('ws').value
  const wp = document.getElementById('wp').value
  document.getElementById('result').textContent = find(ws, wp) ? '✔️' : '✖️'
}
