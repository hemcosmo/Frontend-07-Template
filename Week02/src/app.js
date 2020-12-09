const MAP_SIZE = 100
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']

let map = localStorage['map'] ? JSON.parse(localStorage['map']) : Array(10000).fill(0)
let root = document.getElementById('root')
let mousedown = false
let clear = false

document.addEventListener('mousedown', e => {
  mousedown = true
  clear = (e.buttons === 2)
})
document.addEventListener('mouseup', () => mousedown = false)
document.addEventListener('contextmenu', e => e.preventDefault())

const colorPicker = () => colors[Math.floor(Math.random() * colors.length)] 

const switchColor = (grid, status) => {
  const color = colorPicker()
  grid.style.backgroundColor = status ? color : '#1d1d1d'
  grid.style.boxShadow = status ? `0 0 .5px ${color}, 0 .5px ${color}` : `0 0 .5px #000`
}

for(let i = 0; i < MAP_SIZE; i++) {
  for(let j =0; j < MAP_SIZE; j++) {
    const grid = document.createElement('div')
    grid.classList.add('grid')

    if(map[MAP_SIZE*i + j] === 1)
      switchColor(grid, true)

    grid.addEventListener('mousemove', () => {
      if(mousedown) {
        if(clear) {
          switchColor(grid, false)
          map[MAP_SIZE*i + j] = 0
        }
        else {
          switchColor(grid, true)
          map[MAP_SIZE*i + j] = 1
        }
      }
    })
    root.appendChild(grid)
  }
}

// window.onbeforeunload = () => {
//   localStorage['map'] = JSON.stringify(map)
//   return ''
// }

const findPath = async (map, start, end) => {
  let table = Object.create(map)
  let queue = [start]

  const insert = async (x, y, prev) => {
    if(x < 0 || x > 99 || y < 0 || y > 99)
      return
    if(table[y * MAP_SIZE + x]) return
    // await sleep(30)
    table[y * MAP_SIZE + x] = prev
    root.children[y * MAP_SIZE + x].style.backgroundColor = '#adefd1'
    queue.push([x, y])
  }

  while(queue.length) {
    let [x, y] = queue.shift()
    if(x === end[0] && y === end[1]) {
      let path = []
      while(x !== start[0] || y !== start[1]) {
        path.push(map[y * MAP_SIZE + x])
        [x, y] = table[y * MAP_SIZE + x]
        root.children[y * MAP_SIZE + x].style.backgroundColor = '#00203f'
      }
      return path
    }

    await insert(x-1, y, [x, y])
    await insert(x+1, y, [x, y])
    await insert(x, y-1, [x, y])
    await insert(x, y+1, [x, y])
    await insert(x-1, y-1, [x, y])
    await insert(x+1, y+1, [x, y])
    await insert(x+1, y-1, [x, y])
    await insert(x-1, y+1, [x, y])
  }
  return null
}

const sleep = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}