var assert = require('assert')
import { parseHTML } from './parser'

describe('html parser testing', function () {
  it('<div></div>', function () {
    let tree = parseHTML('<div></div>')
    assert.strictEqual(tree.children[0].tagName, 'div')
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<div style="width: 2px"></div>', function () {
    let tree = parseHTML('<div style="width: 2px"></div>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href id ></a>', function () {
    let tree = parseHTML('<a href id ></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href="#" id ></a>', function () {
    let tree = parseHTML('<a href="#" id ></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a id=i ></a>', function () {
    let tree = parseHTML('<a id=i ></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a />', function () {
    let tree = parseHTML('<a />')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it("<a id='i' ></a>", function () {
    let tree = parseHTML("<a id='i' ></a>")
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it("<a id='i' ></a>", function () {
    let tree = parseHTML("<a id='i' ></a>")
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<A /> upper case', function () {
    let tree = parseHTML('<A />')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<>', function () {
    let tree = parseHTML('<>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].type, 'text')
  })
})
