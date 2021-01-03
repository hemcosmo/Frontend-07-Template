const rgb = {
  r: 255,
  g: 255,
  b: 255,
}

const callbacks = new Map()
const reactivities = new Map()
let usedReactivies = []

const effect = (callback) => {
  usedReactivies = []
  callback()
  for (let reactivity of usedReactivies) {
    if (!callbacks.has(reactivity[0])) callbacks.set(reactivity[0], new Map())
    if (!callbacks.get(reactivity[0]).has(reactivity[1]))
      callbacks.get(reactivity[0]).set(reactivity[1], [])
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }
}

function reactive(target) {
  if (reactivities.has(target)) return reactivities.get(target)

  // target and handler -> trap
  const proxy = new Proxy(target, {
    set(obj, prop, val) {
      obj[prop] = val
      if (callbacks.get(obj))
        if (callbacks.get(obj).get(prop))
          for (let callback of callbacks.get(obj).get(prop)) {
            callback()
          }
    },
    get(obj, prop) {
      usedReactivies.push([obj, prop])
      if (typeof obj[prop] === 'object') return reactive(obj[prop])
      return obj[prop]
    },
  })

  reactivities.set(target, proxy)
  return proxy
}

const proxy = reactive(rgb)
const rgbCollections = document.querySelectorAll('input')

rgbCollections.forEach((node) => {
  effect(() => (proxy[node.id] = node.value))

  node.addEventListener('input', (e) => (proxy[node.id] = e.target.value))
})

effect(
  () =>
    (document.getElementById(
      'palette'
    ).style.backgroundColor = `rgb(${proxy.r}, ${proxy.g}, ${proxy.b})`)
)
