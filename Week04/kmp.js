function kmp(src, pattern) {
  const table = new Array(pattern.length).fill(0)
  {
    let i = 1 // index
    let j = 0 // count

    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
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
    let i = 0 // source
    let j = 0 // pattern
    let res = [] // record

    while (i < src.length) {
      if (pattern[j] === src[i]) {
        res.push(i)
        i += 1
        j += 1
      }
      // base case
      if (j === pattern.length) {
        return res
      }
      if (i < src.length && pattern[j] !== src[i]) {
        if (j) {
          j = table[j - 1]
          res = res.slice(res.length - j)
        } else {
          i += 1
        }
      }
    }
    return 'no matching 👀'
  }
}

const match = () => {
  const src = document.getElementById('source').value
  const pattern = document.getElementById('pattern').value
  const previewer = document.getElementById('p')

  previewer.innerHTML = `<p>index: ${kmp(src, pattern)}</p>`
}
