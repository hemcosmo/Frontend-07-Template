/**
 * @argument x: pattern
 * @argument y: val
 */

const pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
const piece = ['', '🥑', '🍌']
const board = window.board
let val = 1, over = false

const render = (x) => {
  board.innerHTML = ''
  
  for(let i in x) {
    for(let j in x[i]) {
      const cell = document.createElement('div')

      if(over && x[i][j] === val)
        cell.classList.add('lose')
      
      cell.classList.add('cell')
      cell.innerText = piece[x[i][j]]

      if(cell.innerText === '' && !over)
        cell.addEventListener('click', () => move(i, j))

      board.appendChild(cell)
    }
  }
}

const move = (i, j) => {
  pattern[i][j] = val
  over = check(pattern, val)
  computeMove(pattern, 3 - val)
  render(pattern)
}

const computeMove = (x, y) => {
  const ai = bestChoice(x, y)
  if(ai.xy) x[ai.xy[1]][ai.xy[0]] = y
  over = check(x, y)
}

const check = (x, y) => {
  for(let i in x) {
    let win = true
    for(let j in x[i]) {
      if(x[i][j] !== y)
        win = false
    }
    if(win) return true
  }

  for(let i in x) {
    let win = true
    for(let j in x[i]) {
      if(x[j][i] !== y)
        win = false
    }
    if(win) return true
  }

  {
    let win = true
    for(let i in x) {
      if(x[i][x.length-1-i] !== y)
        win = false
    }
    if(win) return true
  }

  {
    let win = true
    for(let i in x) {
      if(x[i][i] !== y)
        win = false
    }
    if(win) return true
  }

  return false
}

const clone = x => {
  const copyCat = []

  for(let i in x) {
    copyCat[i] = Object.create(x[i])
  }

  return copyCat
}

const willWin = (x, y) => {
  for(let i in x) {
    for(let j in x[i]) {
      if(x[i][j]) 
        continue
      
      let tmp = clone(x)
      tmp[i][j] = y

      if(check(tmp, y)) 
        return [j, i]
    }
  }

  return null
}

const bestChoice = (x, y) => {
  let xy; // coordinate
  if(xy = willWin(x, y))
    return {
      xy,
      score: 1
    }
  
  let score = -2
  xy = null

  for(let i in x) {
    for(let j in x[i]) {
      if(x[i][j])
        continue
      
      let tmp = clone(x)
      tmp[i][j] = y
      
      const oppoScore = bestChoice(tmp, 3 - y).score
      if(-oppoScore > score) {
        score = -oppoScore
        xy = [j, i]
      }
    }
  }

  return {
    xy,
    score: xy ? score : 0
  }
}

render(pattern)