const palette = document.getElementById('palette')
let baseX = 0
let baseY = 0
let timer

const getRes = (x) => {
  document.getElementById('res').textContent = `${x} 两`
}
const debouncing = (fn, dura) => {
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(args), dura)
  }
}

palette.addEventListener('mousedown', (e) => {
  let startX = e.clientX
  let startY = e.clientY

  const move = (e) => {
    const range = getNearest(e.clientX, e.clientY)
    const x = range.startContainer.wholeText.trim().slice(-1)
    debouncing(() => getRes(x), 260)()
    range.insertNode(palette)

    // palette.style.transform = `translate(${baseX + e.clientX - startX}px, ${
    //   baseY + e.clientY - startY
    // }px)`
  }

  const up = (e) => {
    baseX += e.clientX - startX
    baseY += e.clientY - startY
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})

const ranges = []
const container = document.getElementById('container')

for (let i = 0; i < container.childNodes[0].length; i++) {
  let range = new Range()
  range.setStart(container.childNodes[0], i)
  range.setEnd(container.childNodes[0], i)
  ranges.push(range)
}

const getNearest = (x, y) => {
  let min = Infinity
  let nearest = null

  for (const range of ranges) {
    const rect = range.getBoundingClientRect()
    const distance = (rect.x - x) ** 2 + (rect.y - y) ** 2
    if (distance < min) {
      min = distance
      nearest = range
    }
  }

  return nearest
}

document.addEventListener('selectstart', (e) => e.preventDefault())
