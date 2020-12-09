const root = document.getElementById('container')
const light = ['red', 'yellow', 'green']
const time = [5, 2, 10]
let pos = -1

const render = () => {
  light.map(x => {
    const div = document.createElement('div')
    div.setAttribute('color', `${x}`)
    div.classList.add('circle')
    root.appendChild(div)
  })
}

const changeLight = () => {
  pos ++
  if(pos > 2) {
    pos = 0
  }
  const nodeList = document.querySelectorAll('.circle')
  nodeList[pos].classList.add(nodeList[pos].getAttribute('color'))
  clearStatus(nodeList[pos])
}

const clearStatus = x => {
  let nodeList = Array.from(document.getElementsByClassName('circle'))
  nodeList = nodeList.filter(node => node !== x)
  nodeList.map(node => node.classList.remove(node.getAttribute('color')))
}

// setTimeout recursion
const switchLightTimer = () => {
  changeLight()
  setTimeout(
    () => {
      changeLight()
      setTimeout(() => {
        changeLight()
        setTimeout(switchLightTimer, 10000)
      }, 2000)
    }, 
    5000
  );
}

// promise recursion
const swithLightPromise = () => {
  return new Promise(resolve => {
    changeLightPromise(5000)
      .then(() => changeLightPromise(2000))
      .then(() => changeLightPromise(10000))
      .then(swithLightPromise)
  })
}

const changeLightPromise = duration => {
  return new Promise(resolve => {
    changeLight()
    turnOn(duration).then(resolve)
  })
}

// async await recursion
const switchLightAsync = async () => {
  for(let i in light) {
    changeLight()
    await turnOn(time[pos] * 1000)
  }
  switchLightAsync()
}

// old school generator while loop
function* switchLightWithGenerator() {
  while(26) {
    changeLight()
    yield turnOn(5000)
    changeLight()
    yield turnOn(2000)
    changeLight()
    yield turnOn(10000)
  }
}

const getIteratorStatus = iterator => {
  const { value, done } = iterator.next()
  if(done) return
  if(value instanceof Promise) 
    value.then(() => getIteratorStatus(iterator))
}

const useGenerator = generator => getIteratorStatus(generator())

const generatorRunner = () => useGenerator(switchLightWithGenerator)

const turnOn = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const runner = x => x.map(x => x())

runner([render, generatorRunner])