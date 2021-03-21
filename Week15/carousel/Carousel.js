import { Component } from './lib'

class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    const { src, type, delay, width } = this.attributes

    for (let record of src) {
      let child = document.createElement('span')
      child.textContent = record
      this.root.appendChild(child)
    }

    switch (type) {
      case 'swipe': {
        // dnd
        let position = 0
        this.root.addEventListener('mousedown', (event) => {
          let startX = event.clientX
          let children = this.root.children

          let move = (event) => {
            let x = event.clientX - startX
            let current = position - (x - (x % width)) / width

            for (let offset of [-1, 0, 1]) {
              let index = current + offset
              index = (index + children.length) % children.length

              children[index].style.transition = 'none'
              children[index].style.transform = `translateX(${
                (offset - index) * width + (x % width)
              }px)`
            }
          }
          let up = (event) => {
            let x = event.clientX - startX
            position -= Math.round(x / width)

            for (let offset of [
              0,
              -Math.sign(
                Math.round(x / width) - x + (width / 2) * Math.sign(x)
              ),
            ]) {
              let index = position + offset
              index = (index + children.length) % children.length

              children[index].style.transition = ''
              children[index].style.transform = `translateX(${
                (offset - index) * width
              }px)`
            }

            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
          }

          document.addEventListener('mousemove', move)
          document.addEventListener('mouseup', up)
        })
        break
      }

      case 'autoplay': {
        let currentIndex = 0
        setInterval(() => {
          let children = this.root.children

          let nextIndex = (currentIndex + 1) % children.length
          let current = children[currentIndex]
          let next = children[nextIndex]

          next.style.transition = 'none'
          next.style.transform = `translateX(${100 - nextIndex * 100}%)`

          setTimeout(() => {
            next.style.transition = '' // -> css
            current.style.transform = `translateX(${
              -100 - currentIndex * 100
            }%)`
            next.style.transform = `translateX(${-nextIndex * 100}%)`

            currentIndex = nextIndex
          }, 16) // 1 frame in browser
        }, delay)
        break
      }
    }

    return this.root
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  mountOn(parent) {
    parent.appendChild(this.render())
  }
}

export default Carousel
