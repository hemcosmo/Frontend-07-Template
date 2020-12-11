const MAP_SIZE = 50
const colors = ['#46b5d1']

let map = localStorage['map'] ? JSON.parse(localStorage['map']) : Array(10000).fill(0)
let root = document.getElementById('root')
let mousedown = false
let clear = false

class Sorted {
  constructor(data, compare) {
    this.data = data
    this.compare = compare || ((a, b) => a - b)
  }
  take() {
    if(!this.data.length) return
    let min = this.data[0]
    let minIndex = 0
    for(let i = 1; i < this.data.length; i++) {
      if(this.compare(this.data[i], min) < 0) {
        min = this.data[i]
        minIndex = i
      }      
    }
    this.data[minIndex] = this.data[this.data.length - 1]
    this.data.pop()
    return min
  }
  give(v) {
    this.data.push(v)
  }
}

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
  let queue = new Sorted([start], (a, b) => distance(a) - distance(b))

  const distance = point => (point[0] - end[0]) ** 2 - (point[1] - end[1]) ** 2 

  const insert = async (x, y, prev) => {
    if(x < 0 || x >= MAP_SIZE || y < 0 || y >= MAP_SIZE)
      return
    if(table[y * MAP_SIZE + x]) return
    table[y * MAP_SIZE + x] = prev
    await sleep(30)
    root.children[y * MAP_SIZE + x].style.backgroundColor = '#a7d129'
    queue.give([x, y])
  }

  while(queue.data.length) {
    let [x, y] = queue.take()
    if(x === end[0] && y === end[1]) {
      let path = []
      while(x !== start[0] || y !== start[1]) {
        path.push(map[y * MAP_SIZE + x]);
        [x, y] = table[y * MAP_SIZE + x]
        await sleep(30)
        root.children[y * MAP_SIZE + x].style.backgroundColor = '#f60'
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